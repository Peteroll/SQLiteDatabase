// 高雄交通事故儀表板：在瀏覽器載入 SQLite 資料庫，即時執行 SQL 畫圖
(function () {
  'use strict';
  var P = window.DEMO_PANELS;
  var H = P && P.H;
  var SQL_CDN = 'https://cdn.jsdelivr.net/npm/sql.js@1.10.3/dist/';
  var CACHE_NAME = 'kh-traffic-demo';
  var BODY = '"Noto Sans TC", "Microsoft JhengHei", sans-serif';
  var MONO = 'Consolas, "JetBrains Mono", monospace';
  var C = {
    bg: '#111217', panel: '#181B1F', border: '#2C3235', ink: '#E6E8EB', soft: '#9AA3AD',
    orange: '#FF9830', red: '#F2495C', green: '#73BF69', blue: '#5794F2', dim: '#3D4F6B',
  };
  var TAG = { stat: 'STAT', bar: 'BAR', groupbar: 'BAR', line: 'LINE', heat: 'HEAT', table: 'TABLE', cards: 'STAT', record: 'TABLE', schema: 'TABLE' };
  var MAX_ROWS = 50;

  var db = null;
  var G = {};            // 各查詢鍵的即時結果（頁面載入時跑的那一次）
  var tabsDone = {};     // 已建立 DOM 的分頁
  var current = null;
  var dbSource = '';     // 資料庫來源：快取或下載
  var building = null;   // 建立分頁時收集該分頁的面板

  function $(id) { return document.getElementById(id); }
  function col(n) { return C[n] || n || C.dim; }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = String(text);
    return e;
  }
  function fmtNum(v) {
    if (typeof v !== 'number') return v == null ? 'NULL' : String(v);
    return v.toLocaleString('en-US', { maximumFractionDigits: 4 });
  }
  function fmtV(v, dec) {
    if (typeof v !== 'number') return String(v);
    if (dec == null && !Number.isInteger(v)) dec = 1;
    return H.fmt(v, dec);
  }

  // ===== 載入畫面 =====
  function step(text) { $('ld-step').textContent = text; }
  function progress(got, total) {
    var bar = $('ld-bar'), fill = $('ld-fill'), meta = $('ld-meta');
    var m = function (n) { return (n / 1048576).toFixed(1); };
    if (total > 0 && got <= total) {
      bar.classList.remove('indet');
      var p = Math.floor(got / total * 100);
      fill.style.width = p + '%';
      meta.textContent = m(got) + ' MB / ' + m(total) + ' MB · ' + p + '%';
    } else {
      bar.classList.add('indet');
      fill.style.width = '';
      meta.textContent = m(got) + ' MB';
    }
  }
  function fail(msg) {
    var box = $('loading');
    box.classList.add('error');
    box.classList.remove('done');
    $('ld-bar').hidden = true;
    $('ld-meta').hidden = true;
    step('載入失敗');
    $('ld-err').textContent = msg;
    $('ld-err').hidden = false;
    $('ld-retry').hidden = false;
  }
  function wait() { return new Promise(function (r) { setTimeout(r, 30); }); }

  // ===== 下載資料庫（Cache Storage 優先）=====
  function loadDb() {
    var url = new URL(P.db.file + '?v=' + P.db.hash, location.href).href;
    var cache = null;
    var opened = ('caches' in window)
      ? caches.open(CACHE_NAME).then(function (c) { cache = c; return c.match(url); }).catch(function () { cache = null; return null; })
      : Promise.resolve(null);
    return opened.then(function (hit) {
      if (hit) {
        dbSource = '快取';
        step('從快取載入');
        var t0 = Date.now();
        return hit.arrayBuffer().then(function (buf) {
          progress(buf.byteLength, buf.byteLength);
          // 讓「從快取載入」至少停留一下，不會一閃即逝
          var left = 400 - (Date.now() - t0);
          return new Promise(function (r) { setTimeout(function () { r(new Uint8Array(buf)); }, left > 0 ? left : 0); });
        });
      }
      dbSource = '下載';
      return download(url).then(function (u8) {
        if (!cache) return u8;
        // 存一份，並刪掉舊版本
        return cache.put(url, new Response(new Blob([u8]), { headers: { 'Content-Type': 'application/octet-stream' } }))
          .then(function () { return cache.keys(); })
          .then(function (reqs) { reqs.forEach(function (r) { if (r.url !== url) cache.delete(r); }); })
          .catch(function (e) { console.warn('快取寫入失敗', e); })
          .then(function () { return u8; });
      });
    });
  }
  function download(url) {
    return fetch(url).catch(function () {
      throw new Error('無法下載資料庫，請確認網路連線。');
    }).then(function (res) {
      if (!res.ok) throw new Error('下載資料庫失敗（HTTP ' + res.status + '）。');
      var total = Number(res.headers.get('Content-Length')) || 0;
      var enc = res.headers.get('Content-Encoding');
      if (enc && enc !== 'identity') total = 0;      // 壓縮傳輸時長度對不上解壓後的位元組數
      progress(0, total);
      if (!res.body || !res.body.getReader) {
        return res.arrayBuffer().then(function (b) { progress(b.byteLength, b.byteLength); return new Uint8Array(b); });
      }
      var reader = res.body.getReader(), chunks = [], got = 0;
      function pump() {
        return reader.read().then(function (r) {
          if (r.done) return;
          chunks.push(r.value);
          got += r.value.length;
          progress(got, total);
          return pump();
        });
      }
      return pump().then(function () {
        var u8 = new Uint8Array(got), off = 0;
        chunks.forEach(function (c) { u8.set(c, off); off += c.length; });
        return u8;
      }, function () { throw new Error('下載資料庫時連線中斷，請重新載入。'); });
    });
  }

  // ===== 執行 SQL =====
  function userErr(msg) { var e = new Error(msg); e.user = true; return e; }
  // 去掉開頭的註解與空白
  function stripLead(s) {
    var prev;
    do {
      prev = s;
      s = s.replace(/^\s+/, '').replace(/^--[^\n]*(\n|$)/, '').replace(/^\/\*[\s\S]*?\*\//, '');
    } while (s !== prev);
    return s;
  }
  // 分號之後是否還有別的語句（略過字串與註解）
  function extraStatement(s) {
    var i = 0, n = s.length;
    while (i < n) {
      var ch = s[i];
      if (ch === "'" || ch === '"') {
        var q = ch; i++;
        while (i < n) { if (s[i] === q) { if (s[i + 1] === q) { i += 2; continue; } break; } i++; }
        i++;
      } else if (ch === '-' && s[i + 1] === '-') {
        while (i < n && s[i] !== '\n') i++;
      } else if (ch === '/' && s[i + 1] === '*') {
        var e = s.indexOf('*/', i + 2); i = e < 0 ? n : e + 2;
      } else if (ch === ';') {
        return stripLead(s.slice(i + 1)).replace(/^;+/, '').trim() !== '';
      } else i++;
    }
    return false;
  }
  function runSql(sql) {
    var s = stripLead(String(sql));
    if (!/^(SELECT|WITH)\b/i.test(s)) throw userErr('這裡只能查詢：請用 SELECT 或 WITH 開頭的語句。');
    if (extraStatement(s)) throw userErr('這裡只能查詢：一次只能執行一句 SQL。');
    var t0 = performance.now(), st = null;
    try {
      st = db.prepare(s);
      var cols = st.getColumnNames();
      if (!cols.length) throw userErr('這裡只能查詢：這句 SQL 不會回傳結果。');
      var rows = [];
      while (st.step()) rows.push(st.get());
      return { cols: cols, rows: rows, ms: performance.now() - t0 };
    } finally {
      if (st) st.free();
    }
  }

  // ===== 自我檢查 =====
  function same(a, b) {
    if (typeof a === 'number' && typeof b === 'number') return Math.abs(a - b) <= 1e-9;
    return a === b;
  }
  function sameRes(g, e) {
    if (!g || g.error) return false;
    if (g.cols.length !== e.cols.length || g.rows.length !== e.rows.length) return false;
    for (var i = 0; i < g.cols.length; i++) if (g.cols[i] !== e.cols[i]) return false;
    for (var r = 0; r < g.rows.length; r++) {
      if (g.rows[r].length !== e.rows[r].length) return false;
      for (var c = 0; c < g.rows[r].length; c++) if (!same(g.rows[r][c], e.rows[r][c])) return false;
    }
    return true;
  }
  function check() {
    var keys = Object.keys(P.queries), failed = [];
    keys.forEach(function (k) { if (!sameRes(G[k], P.queries[k].expect)) failed.push(k); });
    return { total: keys.length, ok: keys.length - failed.length, failed: failed };
  }
  window.__demoCheck = function () {
    if (!db) return { total: P ? Object.keys(P.queries).length : 0, ok: 0, failed: ['資料庫尚未載入'] };
    return check();
  };
  function showCheck() {
    var r = check(), box = $('check');
    if (r.failed.length) {
      box.className = 'check bad';
      box.textContent = r.ok + '/' + r.total + ' 個查詢與預期一致，' + r.failed.length + ' 個不同：' + r.failed.join('、');
      console.error('自我檢查：以下查詢結果與預期不同', r.failed);
    } else {
      box.className = 'check';
      box.textContent = r.ok + '/' + r.total + ' 個查詢與預期一致';
    }
    if (dbSource) box.appendChild(el('span', 'check-src', '資料庫：' + dbSource));
  }

  // ===== 強調與標註規則 =====
  function matches(rule, it, items) {
    if (rule.label !== undefined) {
      var ls = [].concat(rule.label).map(String);
      return ls.indexOf(String(it.key)) >= 0 || ls.indexOf(it.label) >= 0;
    }
    if (rule.rank) {
      var vs = items.map(function (x) { return x.value; }).filter(H.isNum);
      if (!vs.length) return false;
      return it.value === (rule.rank === 'min' ? Math.min.apply(null, vs) : Math.max.apply(null, vs));
    }
    if (rule.index != null) return it.i === rule.index;
    if (rule.test) return !!rule.test(it);
    return false;
  }
  function colorFor(rules, it, items) {
    if (typeof rules === 'function') return rules(it) || null;
    var list = [].concat(rules || []);
    for (var k = 0; k < list.length; k++) if (matches(list[k], it, items)) return list[k].color;
    return null;
  }
  function itemsOf(labels, keys, values, objs) {
    return values.map(function (v, i) { return { i: i, key: keys ? keys[i] : labels[i], label: labels[i], value: v, obj: objs ? objs[i] : null }; });
  }

  // 圖上標註、數值標籤、參考線（Chart.js 外掛，每張圖一個）
  function annotPlugin(list, horiz, ref) {
    return {
      id: 'demoAnnot',
      afterDatasetsDraw: function (chart) {
        var ctx = chart.ctx;
        ctx.save();
        list.forEach(function (a) {
          var meta = chart.getDatasetMeta(a.ds);
          if (!meta || meta.hidden || !chart.isDatasetVisible(a.ds)) return;
          var e = meta.data[a.i];
          if (!e || e.skip) return;
          var p = e.getProps(['x', 'y', 'base'], true);
          if (!isFinite(p.x) || !isFinite(p.y)) return;
          var size = a.size || 13;
          ctx.font = (a.bold === false ? '' : 'bold ') + size + 'px ' + MONO;
          ctx.fillStyle = col(a.color || 'ink');
          if (horiz && isFinite(p.base)) {
            var neg = p.x < p.base, x = p.x + (neg ? -6 : 6);
            ctx.textBaseline = 'middle';
            ctx.textAlign = neg ? 'right' : 'left';
            ctx.fillText(a.text, x, p.y);
            if (a.sub) {
              var w = ctx.measureText(a.text).width;
              ctx.font = '13px ' + BODY;
              ctx.fillStyle = C.soft;
              ctx.fillText(a.sub, x + (neg ? -1 : 1) * (w + 8), p.y);
            }
          } else {
            var top = isFinite(p.base) ? Math.min(p.y, p.base) : p.y;
            var y = top - (isFinite(p.base) ? 6 : 10);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillText(a.text, p.x, y);
            if (a.sub) {
              ctx.font = '13px ' + BODY;
              ctx.fillStyle = C.soft;
              ctx.fillText(a.sub, p.x, y - size - 2);
            }
          }
        });
        if (ref && isFinite(ref.value)) {
          var sc = chart.scales[horiz ? 'x' : 'y'], ca = chart.chartArea, v = sc.getPixelForValue(ref.value);
          ctx.strokeStyle = C.soft;
          ctx.lineWidth = 1;
          ctx.setLineDash([5, 4]);
          ctx.beginPath();
          if (horiz) { ctx.moveTo(v, ca.top); ctx.lineTo(v, ca.bottom); } else { ctx.moveTo(ca.left, v); ctx.lineTo(ca.right, v); }
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.fillStyle = C.soft;
          ctx.font = '12px ' + BODY;
          ctx.textAlign = 'left';
          ctx.textBaseline = 'bottom';
          if (horiz) ctx.fillText(ref.text, v + 4, ca.top - 2); else ctx.fillText(ref.text, ca.left + 4, v - 2);
        }
        ctx.restore();
      },
    };
  }
  function annotList(d, itemsByDs) {
    var out = [], used = {};
    [].concat(d.annot || []).forEach(function (rule) {
      var ds = rule.ds || 0, items = itemsByDs[ds] || [];
      items.forEach(function (it) {
        if (!H.isNum(it.value) || !matches(rule, it, items)) return;
        used[ds + ':' + it.i] = true;
        out.push({
          ds: ds, i: it.i, color: rule.color, size: rule.size || 16,
          text: rule.text ? rule.text(it.value, it) : fmtV(it.value, rule.dec != null ? rule.dec : d.dec) + (rule.suffix || d.suffix || ''),
          sub: rule.sub ? rule.sub(it) : '',
        });
      });
    });
    if (d.valueLabels) {
      itemsByDs.forEach(function (items, ds) {
        items.forEach(function (it) {
          if (!H.isNum(it.value) || used[ds + ':' + it.i]) return;
          out.push({ ds: ds, i: it.i, color: 'ink', size: 12, bold: false, text: fmtV(it.value, d.dec) + (d.suffix || '') });
        });
      });
    }
    return out;
  }
  function tickText(v) { return Number.isInteger(v) ? H.fmt(v) : String(+v.toFixed(2)); }

  function drawChart(inst, box, m) {
    var d = inst.def, kind = d.type, horiz = !!d.horizontal;
    var datasets, itemsByDs;
    if (kind === 'bar') {
      if (!m.values || !m.labels || m.values.length !== m.labels.length) H.bad();
      var items = itemsOf(m.labels, m.keys, m.values, m.objs);
      datasets = [{ data: m.values, borderRadius: 2, maxBarThickness: 56,
        backgroundColor: items.map(function (it) { return col(colorFor(d.highlight, it, items) || 'dim'); }) }];
      itemsByDs = [items];
    } else {
      if (!m.series || !m.series.length) H.bad();
      itemsByDs = m.series.map(function (s) {
        if (s.values.length !== m.labels.length) H.bad();
        return itemsOf(m.labels, m.keys, s.values, null);
      });
      if (kind === 'groupbar') {
        datasets = m.series.map(function (s) {
          return { label: String(s.name), data: s.values, backgroundColor: col(s.color), borderRadius: 2, maxBarThickness: 44 };
        });
      } else {
        datasets = m.series.map(function (s, k) {
          var items = itemsByDs[k];
          var pc = items.map(function (it) { return k === 0 ? colorFor(d.highlight, it, items) : null; });
          return {
            label: String(s.name), data: s.values, borderColor: col(s.color), backgroundColor: col(s.color),
            borderWidth: s.width || 2, tension: 0.25, spanGaps: false,
            pointRadius: pc.map(function (c) { return c ? 6 : 0; }), pointHoverRadius: 5,
            pointBackgroundColor: pc.map(function (c) { return col(c || s.color); }), pointBorderWidth: 0,
          };
        });
      }
    }
    if (kind === 'line' && m.series.length > 1) {
      var key = el('div', 'legend');
      m.series.forEach(function (s) {
        var item = el('span', 'lg-item');
        var sw = el('span', 'lg-sw'); sw.style.background = col(s.color);
        item.appendChild(sw); item.appendChild(document.createTextNode(String(s.name)));
        key.appendChild(item);
      });
      box.appendChild(key);
    }
    var wrap = el('div', 'chart' + (d.tall ? ' tall' : ''));
    var cv = document.createElement('canvas');
    wrap.appendChild(cv);
    box.appendChild(wrap);
    if (m.note) box.appendChild(el('div', 'chart-note', m.note));

    var valAxis = {
      beginAtZero: kind !== 'line', grace: horiz ? '22%' : '16%',
      grid: { color: C.border }, border: { display: false },
      ticks: { color: C.soft, font: { family: MONO, size: 12 }, callback: tickText },
    };
    var catAxis = {
      grid: { display: false }, border: { color: C.border },
      ticks: { color: C.soft, font: { family: BODY, size: 12 }, maxRotation: 0, autoSkip: !m.tick },
    };
    if (m.tick) catAxis.ticks.callback = function (v) { return m.tick(this.getLabelForValue(v)); };
    var chart = new Chart(cv, {
      type: kind === 'line' ? 'line' : 'bar',
      data: { labels: m.labels.map(String), datasets: datasets },
      options: {
        responsive: true, maintainAspectRatio: false, animation: { duration: 300 },
        indexAxis: horiz ? 'y' : 'x',
        layout: { padding: { top: 30, right: horiz ? 16 : 8 } },
        scales: horiz ? { x: valAxis, y: catAxis } : { x: catAxis, y: valAxis },
        interaction: { mode: 'nearest', intersect: kind !== 'line', axis: horiz ? 'y' : 'x' },
        plugins: {
          legend: { display: kind === 'groupbar', position: 'top', align: 'end', labels: { color: C.soft, boxWidth: 12, font: { family: BODY, size: 12 } } },
          tooltip: { callbacks: { label: function (c) {
            var v = horiz ? c.parsed.x : c.parsed.y;
            return (c.dataset.label ? c.dataset.label + '：' : '') + fmtNum(v) + (d.suffix || '');
          } } },
        },
      },
      plugins: [annotPlugin(annotList(d, itemsByDs), horiz, m.refLine)],
    });
    inst.chart = chart;
  }

  // ===== 各類型面板內容 =====
  function renderStat(box, m) {
    if (m.pair) {
      var w = el('div', 'pair');
      [m.a, m.b].forEach(function (s, k) {
        var c = el('div', 'pair-item');
        var n = el('div', 'num ' + (k ? 'md' : 'lg'), s.v);
        n.style.color = col(s.color || 'soft');
        c.appendChild(n);
        c.appendChild(el('div', 'lab', s.label));
        w.appendChild(c);
      });
      box.appendChild(w);
      if (m.ratio) {
        var mx = Math.max(Math.abs(m.ratio[0]), Math.abs(m.ratio[1])) || 1;
        var bars = el('div', 'ratio');
        m.ratio.forEach(function (v, k) {
          var b = el('div', 'rbar');
          b.style.width = (Math.abs(v) / mx * 100) + '%';
          b.style.background = k ? C.soft : col(m.a.color || 'soft');
          if (k && m.b.color === 'soft' && m.a.color === 'soft') b.style.background = C.dim;
          bars.appendChild(b);
        });
        box.appendChild(bars);
      }
      if (m.notes) {
        var ns = el('div', 'pair-notes');
        m.notes.forEach(function (t) { ns.appendChild(el('span', null, t || '')); });
        box.appendChild(ns);
      }
    } else {
      if (!m.items || !m.items.length) H.bad();
      var g = el('div', 'stat-items' + (m.items.length > 1 ? ' multi' : ''));
      m.items.forEach(function (it) {
        var c = el('div', 'stat-item');
        if (it.pre) c.appendChild(el('div', 'pre', it.pre));
        var line = el('div', 'stat-line');
        var n = el('span', 'num ' + (it.small ? 'sm' : 'lg'), it.v);
        n.style.color = col(it.color || 'ink');
        line.appendChild(n);
        if (it.unit) line.appendChild(el('span', 'unit', it.unit));
        c.appendChild(line);
        if (it.note) c.appendChild(el('div', 'note', it.note));
        g.appendChild(c);
      });
      box.appendChild(g);
    }
    if (m.foot) box.appendChild(el('div', 'chart-note', m.foot));
  }
  function mixHex(a, b, t) {
    var A = parseInt(a.slice(1), 16), B = parseInt(b.slice(1), 16), out = '#';
    [16, 8, 0].forEach(function (s) {
      var x = (A >> s) & 255, y = (B >> s) & 255;
      out += Math.round(x + (y - x) * t).toString(16).padStart(2, '0');
    });
    return out;
  }
  function renderHeat(box, m) {
    if (!m.rows || !m.rows.length || !m.cols || !m.cols.length) H.bad();
    var vals = [];
    m.cells.forEach(function (r) { r.forEach(function (v) { if (H.isNum(v)) vals.push(v); }); });
    if (!vals.length) H.bad();
    var lo = Math.min.apply(null, vals), hi = Math.max.apply(null, vals);
    var g = el('div', 'heat');
    g.style.gridTemplateColumns = 'minmax(80px, auto) repeat(' + m.cols.length + ', 1fr)';
    g.appendChild(el('div', 'heat-corner'));
    m.cols.forEach(function (c) { g.appendChild(el('div', 'heat-h', c)); });
    m.rows.forEach(function (r, ri) {
      g.appendChild(el('div', 'heat-r', r));
      m.cells[ri].forEach(function (v) {
        var cell = el('div', 'heat-c', H.isNum(v) ? H.fmt(v, m.dec) : '—');
        var t = H.isNum(v) && hi > lo ? (v - lo) / (hi - lo) : 0;
        cell.style.background = mixHex('#1B2230', C.red, 0.08 + 0.92 * t);
        g.appendChild(cell);
      });
    });
    box.appendChild(g);
  }
  function resultTable(res, limit) {
    var wrap = el('div', 'tbl-wrap'), t = el('table', 'tbl'), thead = el('thead'), tr = el('tr');
    res.cols.forEach(function (c) { tr.appendChild(el('th', null, c)); });
    thead.appendChild(tr); t.appendChild(thead);
    var tb = el('tbody');
    res.rows.slice(0, limit || MAX_ROWS).forEach(function (r) {
      var row = el('tr');
      r.forEach(function (v) {
        var td = el('td', typeof v === 'number' ? 'n' : (v == null ? 'null' : null), v == null ? 'NULL' : (typeof v === 'number' ? fmtNum(v) : (v instanceof Uint8Array ? '(BLOB ' + v.length + ' bytes)' : v)));
        row.appendChild(td);
      });
      tb.appendChild(row);
    });
    t.appendChild(tb); wrap.appendChild(t);
    return wrap;
  }
  function renderCards(box, m) {
    if (!m.cards || !m.cards.length) H.bad();
    var g = el('div', 'cards' + (m.small ? ' small' : ''));
    m.cards.forEach(function (c) {
      var k = el('div', 'card');
      k.style.borderLeftColor = col(c.color || 'orange');
      if (c.top) k.appendChild(el('div', 'card-top', c.top));
      if (c.name) k.appendChild(el('div', 'card-name', c.name));
      var line = el('div', 'stat-line');
      var n = el('span', 'num ' + (m.small ? 'md' : 'lg'), c.big);
      // 資料來源卡片的大數字用主要色（色條表示來源）；其他卡片的大數字用強調色
      n.style.color = c.top ? C.ink : col(c.color);
      line.appendChild(n);
      if (c.unit) line.appendChild(el('span', 'unit', c.unit));
      k.appendChild(line);
      (c.lines || []).forEach(function (s) { k.appendChild(el('div', 'note', s)); });
      g.appendChild(k);
    });
    box.appendChild(g);
  }
  function renderRecord(box, m) {
    if (!m.pairs || !m.pairs.length) H.bad();
    var dl = el('dl', 'record');
    m.pairs.forEach(function (p) {
      dl.appendChild(el('dt', null, p[0]));
      dl.appendChild(el('dd', null, p[1] == null ? 'NULL' : p[1]));
    });
    box.appendChild(dl);
  }
  function chip(text, key) { return el('span', 'chip' + (key ? ' key' : ''), text); }
  function renderSchema(box, m) {
    var g = el('div', 'schema');
    var a = el('div', 'tbox');
    var ah = el('div', 'tbox-h'); ah.appendChild(el('span', 'tname', m.acc.name)); ah.appendChild(el('span', 'tmeta', m.acc.meta));
    a.appendChild(ah);
    m.acc.groups.forEach(function (gr) {
      var row = el('div', 'cgroup');
      row.appendChild(el('div', 'cg-name', gr[0]));
      var cs = el('div', 'chips');
      gr[1].forEach(function (c) { cs.appendChild(chip(c, c === m.acc.key)); });
      row.appendChild(cs);
      a.appendChild(row);
    });
    var j = el('div', 'join');
    j.appendChild(el('div', 'join-line'));
    j.appendChild(el('div', 'join-label', 'JOIN'));
    j.appendChild(el('div', 'join-on', '行政區 = 行政區'));
    var b = el('div', 'tbox');
    var bh = el('div', 'tbox-h'); bh.appendChild(el('span', 'tname', m.dist.name)); bh.appendChild(el('span', 'tmeta', m.dist.meta));
    b.appendChild(bh);
    var bc = el('div', 'chips');
    m.dist.cols.forEach(function (c) { bc.appendChild(chip(c, c === m.dist.key)); });
    b.appendChild(bc);
    b.appendChild(resultTable({ cols: m.dist.cols, rows: m.dist.rows }, 10));
    g.appendChild(a); g.appendChild(j); g.appendChild(b);
    box.appendChild(g);
  }
  function renderNote(box, d) {
    var n = el('div', 'note-row');
    var cs = el('div', 'codes');
    (d.codes || []).forEach(function (c) { var s = el('span', 'code', c[0]); s.style.color = col(c[1]); cs.appendChild(s); });
    n.appendChild(cs);
    if (d.text) n.appendChild(el('div', 'note-text', d.text));
    box.appendChild(n);
  }
  function renderSteps(box, m) {
    var g = el('div', 'steps');
    m.steps.forEach(function (s, i) {
      if (i) g.appendChild(el('div', 'arrow', '→'));
      var c = el('div', 'step');
      c.appendChild(el('div', 'step-n', i + 1));
      c.appendChild(el('div', 'step-q', s.q));
      c.appendChild(el('div', 'step-ex', s.ex));
      g.appendChild(c);
    });
    box.appendChild(g);
  }
  function svg(tag, attrs, text) {
    var e = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.keys(attrs || {}).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    if (text != null) e.textContent = text;
    return e;
  }
  function renderMindmap(box, d) {
    var W = 1000, Hh = 540, cx = 500, cy = 270;
    var s = svg('svg', { viewBox: '0 0 ' + W + ' ' + Hh, class: 'mindmap', role: 'img' });
    var pos = [[300, 120, -1], [700, 120, 1], [300, 420, -1], [700, 420, 1]];
    var lines = svg('g'), nodes = svg('g');
    d.branches.forEach(function (b, k) {
      var p = pos[k % 4], bx = p[0], by = p[1], side = p[2], c = col(b.color);
      lines.appendChild(svg('path', { d: 'M' + cx + ' ' + cy + ' C' + ((cx + bx) / 2) + ' ' + cy + ' ' + ((cx + bx) / 2) + ' ' + by + ' ' + bx + ' ' + by, stroke: c, 'stroke-width': 3, fill: 'none' }));
      var n = b.leaves.length;
      b.leaves.forEach(function (lf, j) {
        var lx = bx + side * 170, ly = by + (j - (n - 1) / 2) * 34;
        lines.appendChild(svg('path', { d: 'M' + (bx + side * 62) + ' ' + by + ' C' + (bx + side * 110) + ' ' + by + ' ' + (bx + side * 110) + ' ' + ly + ' ' + (lx - side * 8) + ' ' + ly, stroke: c, 'stroke-width': 1.5, fill: 'none', opacity: 0.7 }));
        nodes.appendChild(svg('text', { x: lx, y: ly + 6, 'text-anchor': side > 0 ? 'start' : 'end', class: 'mm-leaf' }, lf));
      });
      nodes.appendChild(svg('rect', { x: bx - 62, y: by - 22, width: 124, height: 44, rx: 8, fill: C.panel, stroke: c, 'stroke-width': 2 }));
      nodes.appendChild(svg('text', { x: bx, y: by + 7, 'text-anchor': 'middle', class: 'mm-branch' }, b.name));
      nodes.appendChild(svg('text', { x: bx, y: by + (by < cy ? 50 : -36), 'text-anchor': 'middle', class: 'mm-ex' }, b.ex));
    });
    nodes.appendChild(svg('rect', { x: cx - 80, y: cy - 28, width: 160, height: 56, rx: 10, fill: C.panel, stroke: C.orange, 'stroke-width': 3 }));
    nodes.appendChild(svg('text', { x: cx, y: cy + 8, 'text-anchor': 'middle', class: 'mm-center' }, d.center));
    s.appendChild(lines); s.appendChild(nodes);
    box.appendChild(s);
    if (d.foot) box.appendChild(el('div', 'mm-foot', d.foot));
  }

  // ===== 面板 =====
  function makeR(inst) {
    return function (k) {
      if (inst.over[k]) return inst.over[k];
      var g = G[k];
      if (!g || g.error) H.bad('查詢 ' + k + ' 沒有結果');
      return g;
    };
  }
  function render(inst) {
    var d = inst.def, box = inst.body;
    if (inst.chart) { inst.chart.destroy(); inst.chart = null; }
    box.textContent = '';
    box.classList.remove('bad-shape');
    if (d.type === 'note') { renderNote(box, d); return true; }
    if (d.type === 'mindmap') { renderMindmap(box, d); return true; }
    try {
      var R = makeR(inst);
      var m = d.build ? d.build(R) : (d.type === 'table' ? R([].concat(d.q)[0]) : null);
      if (d.type === 'bar' || d.type === 'groupbar' || d.type === 'line') drawChart(inst, box, m);
      else if (d.type === 'stat') renderStat(box, m);
      else if (d.type === 'heat') renderHeat(box, m);
      else if (d.type === 'table') { if (!m || !m.cols) H.bad(); box.appendChild(resultTable(m)); }
      else if (d.type === 'cards') renderCards(box, m);
      else if (d.type === 'record') renderRecord(box, m);
      else if (d.type === 'schema') renderSchema(box, m);
      else if (d.type === 'steps') renderSteps(box, m);
      return true;
    } catch (e) {
      if (!e.shape) console.warn('面板繪製失敗', d.title || d.type, e);
      if (inst.chart) { inst.chart.destroy(); inst.chart = null; }
      box.textContent = '';
      box.classList.add('bad-shape');
      box.appendChild(el('div', 'shape-msg', '這個結果畫不成這種圖，請看下方表格'));
      return false;
    }
  }

  function makeEditor(inst) {
    var keys = [].concat(inst.def.q);
    var box = el('div', 'sqlbox');
    box.hidden = true;
    var active = keys[0];
    var chooser = null;
    if (keys.length > 1) {
      chooser = el('div', 'sql-keys');
      keys.forEach(function (k) {
        var b = el('button', 'btn small' + (k === active ? ' on' : ''), k);
        b.type = 'button';
        b.addEventListener('click', function () { inst.sql[active] = ta.value; active = k; ta.value = inst.sql[k]; sync(); msg.textContent = ''; out.textContent = ''; });
        chooser.appendChild(b);
      });
      box.appendChild(chooser);
    }
    var ta = el('textarea', 'sql');
    ta.spellcheck = false;
    ta.setAttribute('autocomplete', 'off');
    ta.setAttribute('autocorrect', 'off');
    ta.setAttribute('autocapitalize', 'off');
    ta.value = inst.sql[active];
    var bar = el('div', 'sql-bar');
    var run = el('button', 'btn run', '執行'); run.type = 'button';
    var reset = el('button', 'btn', '還原'); reset.type = 'button';
    var hint = el('span', 'hint', 'Ctrl+Enter 執行 · 資料庫只在記憶體裡，重新整理就還原');
    bar.appendChild(run); bar.appendChild(reset); bar.appendChild(hint);
    var msg = el('div', 'sql-msg');
    var out = el('div', 'sql-out');
    box.appendChild(ta); box.appendChild(bar); box.appendChild(msg); box.appendChild(out);
    function sync() {
      if (!chooser) return;
      Array.prototype.forEach.call(chooser.children, function (b) { b.classList.toggle('on', b.textContent === active); });
    }
    function fit() { ta.style.height = 'auto'; ta.style.height = Math.min(480, ta.scrollHeight + 4) + 'px'; }
    ta.addEventListener('input', fit);
    function exec() {
      msg.textContent = ''; msg.className = 'sql-msg';
      var res;
      try { res = runSql(ta.value); } catch (e) {
        msg.className = 'sql-msg err';
        msg.textContent = e.user ? e.message : 'SQL 錯誤：' + (e.message || String(e));
        return;
      }
      inst.over[active] = res;
      inst.sql[active] = ta.value;
      render(inst);
      out.textContent = '';
      var info = '共 ' + res.rows.length.toLocaleString('en-US') + ' 列' + (res.rows.length > MAX_ROWS ? '（顯示前 ' + MAX_ROWS + ' 列）' : '') + ' · ' + res.ms.toFixed(1) + ' ms';
      out.appendChild(el('div', 'sql-info', info));
      out.appendChild(resultTable(res));
    }
    run.addEventListener('click', exec);
    ta.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); exec(); }
    });
    reset.addEventListener('click', function () {
      inst.sql[active] = P.queries[active].sql;
      ta.value = inst.sql[active];
      delete inst.over[active];
      msg.textContent = ''; out.textContent = '';
      render(inst);
      fit();
    });
    box._fit = fit;
    return box;
  }

  function makePanel(d) {
    var sec = el('section', 'panel p-' + d.type);
    sec.style.gridColumn = 'span ' + (d.w || 12);
    if (d.type === 'ask' || d.type === 'close') {
      sec.appendChild(el('div', 'big-text', d.words ? null : d.text));
      if (d.words) {
        var bt = sec.firstChild;
        d.words.forEach(function (w, i) {
          if (i) bt.appendChild(el('span', 'dot', '·'));
          bt.appendChild(el('span', null, w));
        });
      }
      if (d.sub) sec.appendChild(el('div', 'big-sub', d.sub));
      return sec;
    }
    var inst = { def: d, over: {}, sql: {}, chart: null };
    if (building) building.push(inst);
    var head = el('header', 'ph');
    head.appendChild(el('div', 'pt', d.title || ''));
    var right = el('div', 'pr');
    if (TAG[d.type]) right.appendChild(el('span', 'tag', TAG[d.type]));
    head.appendChild(right);
    sec.appendChild(head);
    if (d.sub) sec.appendChild(el('div', 'psub', d.sub));
    inst.body = el('div', 'pbody');
    sec.appendChild(inst.body);
    if (d.q) {
      [].concat(d.q).forEach(function (k) { inst.sql[k] = P.queries[k].sql; });
      var btn = el('button', 'sqlbtn', 'SQL'); btn.type = 'button';
      btn.setAttribute('aria-expanded', 'false');
      right.appendChild(btn);
      var ed = makeEditor(inst);
      sec.appendChild(ed);
      btn.addEventListener('click', function () {
        ed.hidden = !ed.hidden;
        btn.classList.toggle('on', !ed.hidden);
        btn.setAttribute('aria-expanded', String(!ed.hidden));
        if (!ed.hidden) ed._fit();
      });
    }
    if (!d.title && !TAG[d.type] && !d.q) head.hidden = true;
    render(inst);
    return sec;
  }

  // ===== 分頁 =====
  function buildTab(t) {
    var page = el('div', 'page');
    page.id = 'page-' + t.id;
    page._insts = building = [];
    t.sections.forEach(function (s) {
      var sec = el('div', 'section');
      if (s.title) sec.appendChild(el('h2', 'sec-title', s.title));
      var grid = el('div', 'grid');
      s.panels.forEach(function (d) { grid.appendChild(makePanel(d)); });
      sec.appendChild(grid);
      page.appendChild(sec);
    });
    building = null;
    $('main').appendChild(page);
    tabsDone[t.id] = page;
  }
  // 圖表在隱藏或尚未放進頁面時建立，畫布尺寸是 0；顯示後重新量尺寸並重畫（標註層跟著重畫）
  function refreshCharts(page) {
    (page && page._insts || []).forEach(function (inst) {
      if (!inst.chart) return;
      inst.chart.resize();
      inst.chart.update('none');
    });
  }
  function show(id) {
    var t = P.tabs.filter(function (x) { return x.id === id; })[0] || P.tabs[0];
    if (!tabsDone[t.id]) buildTab(t);
    Object.keys(tabsDone).forEach(function (k) { tabsDone[k].hidden = k !== t.id; });
    Array.prototype.forEach.call($('tabs').children, function (b) {
      var on = b.dataset.id === t.id;
      b.classList.toggle('on', on);
      b.setAttribute('aria-selected', String(on));
    });
    $('crumb').textContent = '／ ' + t.name;
    if (current !== null && current !== t.id) window.scrollTo(0, 0);
    current = t.id;
    var page = tabsDone[t.id];
    refreshCharts(page);
    requestAnimationFrame(function () { if (current === t.id) refreshCharts(page); });
  }
  function fromHash() { return location.hash.replace(/^#/, ''); }
  function buildNav() {
    var nav = $('tabs');
    nav.setAttribute('role', 'tablist');
    P.tabs.forEach(function (t) {
      var b = el('button', 'tab', t.name);
      b.type = 'button';
      b.dataset.id = t.id;
      b.setAttribute('role', 'tab');
      b.addEventListener('click', function () { location.hash = t.id; });
      nav.appendChild(b);
    });
    window.addEventListener('hashchange', function () { show(fromHash()); });
    window.addEventListener('resize', function () { if (current) refreshCharts(tabsDone[current]); });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      if (e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) return;
      var tg = e.target, tn = tg && tg.tagName;
      if (tn === 'TEXTAREA' || tn === 'INPUT' || tn === 'SELECT' || (tg && tg.isContentEditable)) return;
      var ids = P.tabs.map(function (t) { return t.id; });
      var i = ids.indexOf(current) + (e.key === 'ArrowRight' ? 1 : -1);
      if (i < 0 || i >= ids.length) return;
      e.preventDefault();
      location.hash = ids[i];
    });
  }

  function period() {
    var g = G.ov_total;
    if (!g || g.error) return;
    var o = H.objs(g)[0];
    if (!o) return;
    $('period').textContent = H.ym(o['最早']) + ' ～ ' + H.ym(o['最晚']) + ' · ' + H.fmt(o['件數']) + ' 筆';
  }

  // ===== 啟動 =====
  function start() {
    $('ld-retry').addEventListener('click', function () { location.reload(); });
    if (!P || !P.queries || !P.tabs) { fail('網頁檔案不完整（找不到 panels.js），請重新載入。'); return; }
    if (typeof initSqlJs === 'undefined') { fail('SQL 引擎（sql.js）載入失敗，請確認網路連線後重新載入。'); return; }
    if (typeof Chart === 'undefined') { fail('圖表函式庫（Chart.js）載入失敗，請確認網路連線後重新載入。'); return; }
    Chart.defaults.color = C.soft;
    Chart.defaults.font.family = BODY;
    Chart.defaults.borderColor = C.border;
    step('正在載入資料庫');
    loadDb().then(function (u8) {
      step('啟動 SQL 引擎');
      return wait().then(function () {
        return initSqlJs({ locateFile: function (f) { return SQL_CDN + f; } }).catch(function () {
          throw new Error('SQL 引擎啟動失敗，請確認網路連線後重新載入。');
        });
      }).then(function (SQL) {
        try { db = new SQL.Database(u8); } catch (e) { throw new Error('資料庫檔案無法開啟（' + e.message + '）。'); }
      });
    }).then(function () {
      step('執行查詢');
      $('ld-bar').classList.add('indet');
      return wait();
    }).then(function () {
      Object.keys(P.queries).forEach(function (k) {
        try { G[k] = runSql(P.queries[k].sql); } catch (e) {
          G[k] = { error: e.message || String(e) };
          console.error('查詢失敗', k, e);
        }
      });
      period();
      buildNav();
      show(fromHash());
      showCheck();
      // 等儀表板在不透明的載入畫面後面畫好，再藏起載入文字並淡出
      var ld = $('loading');
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          ld.classList.add('done');
          setTimeout(function () { ld.hidden = true; }, 500);
        });
      });
    }).catch(function (e) {
      console.error(e);
      fail(e && e.message ? e.message : '載入失敗。');
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
