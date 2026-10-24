(function () {
  'use strict';
  const CFG = window.PRACTICE_CONFIG || {};
  const PACKS = window.PRACTICE_PACKS || [];
  const J = window.PJudge;
  const STORE = 'nmq-practice-v1';
  const $ = s => document.querySelector(s);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const now = () => Date.now();
  const ICON = {
    arrow: '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'
  };
  const params = new URLSearchParams(location.search);
  const ROOM = (params.get('room') || CFG.ROOM || 'main').slice(0, 20);
  const ENDPOINT = params.get('api') || CFG.ENDPOINT || '';

  let S = null;            // 本機狀態
  let SQLlib = null, db = null, dbBytes = null;
  let pack = null;         // 目前單元（含解碼後的題目）
  let mode = 'course';     // course：計分；free：自由練習
  let dbLabel = '';
  let view = 'Q1';

  /* ---------- state ---------- */
  function load() { try { return JSON.parse(localStorage.getItem(STORE)) || null; } catch (e) { return null; } }
  function save() { try { localStorage.setItem(STORE, JSON.stringify(S)); } catch (e) { /* ignore */ } }
  function packState(id) {
    S.packs[id] = S.packs[id] || { startedAt: now(), q: {} };
    return S.packs[id];
  }
  function qState(qid) {
    const ps = packState(pack.id);
    ps.q[qid] = ps.q[qid] || { best: 0, attempts: 0, hints: [false, false], bestAt: null, lastSql: '', bestSql: '' };
    return ps.q[qid];
  }

  /* ---------- toast ---------- */
  let tt = null;
  function toast(m) { const t = $('#toast'); t.textContent = m; t.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('show'), 2600); }

  /* ---------- 排行榜傳送（失敗會排隊重送） ---------- */
  function enqueue(item) { S.queue = S.queue || []; S.queue.push(item); save(); flush(); }
  let flushing = false;
  async function flush() {
    if (!ENDPOINT || flushing || !S || !S.queue || !S.queue.length) return;
    flushing = true;
    try {
      while (S.queue.length) {
        const item = S.queue[0];
        await fetch(ENDPOINT, { method: 'POST', mode: 'no-cors', body: JSON.stringify(item) });
        S.queue.shift(); save();
      }
    } catch (e) { /* 網路斷線：留在佇列，稍後重送 */ }
    flushing = false;
    renderBoardStatus();
  }
  setInterval(flush, 15000);
  function renderBoardStatus() {
    const el = $('#boardStatus');
    const pending = S && S.queue ? S.queue.length : 0;
    const txt = !ENDPOINT ? '排行榜尚未設定，成績只存在這台電腦。' : pending ? `有 ${pending} 筆成績等待上傳（網路恢復後會自動送出）。` : `排行榜已連線（教室代碼：${ROOM}）。`;
    if (el) el.textContent = txt;
  }

  /* ---------- 資料庫 ---------- */
  async function ensureSql() {
    if (!SQLlib) SQLlib = await initSqlJs({ locateFile: f => 'https://cdn.jsdelivr.net/npm/sql.js@1.10.3/dist/' + f });
  }
  function openBytes(bytes) {
    if (db) db.close();
    db = new SQLlib.Database(bytes);
  }
  function scalar(sql) { try { const r = db.exec(sql); return r.length ? r[0].values[0][0] : null; } catch (e) { return undefined; } }
  function matchesFingerprint(p) {
    return (p.fingerprint || []).every(([sql, v]) => J.norm(scalar(sql)) === J.norm(v));
  }
  function tableNames() {
    try { return db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name")[0].values.map(r => r[0]); } catch (e) { return []; }
  }

  /* ---------- 開場 ---------- */
  function renderIntro() {
    $('#packSel').innerHTML = PACKS.map(p => `<option value="${p.id}">${esc(p.date)}　${esc(p.title)}</option>`).join('');
    const saved = load();
    if (saved) { $('#sid').value = saved.sid || ''; $('#nick').value = saved.nick || ''; if (saved.lastPack) $('#packSel').value = saved.lastPack; }
    const want = params.get('pack'); if (want && PACKS.some(p => p.id === want)) $('#packSel').value = want;
    S = saved || { sid: '', nick: '', packs: {}, queue: [] };
    renderBoardStatus();
    $('#startCourse').onclick = () => start('course');
    $('#dbFile').onchange = e => { if (e.target.files[0]) start('upload', e.target.files[0]); };
    $('#loading').hidden = true; $('#intro').hidden = false;
  }
  function readIdentity(sidEl, nickEl, errEl) {
    const sid = sidEl.value.trim().replace(/\s+/g, '').toUpperCase();
    const nick = nickEl.value.trim().slice(0, 12);
    if (!/^[A-Z0-9]{5,15}$/.test(sid)) { errEl.textContent = '請輸入正確的學號（英文字母與數字）'; return null; }
    if (!nick) { errEl.textContent = '請輸入暱稱'; return null; }
    errEl.textContent = '';
    return { sid, nick };
  }
  async function start(kind, file) {
    const id = readIdentity($('#sid'), $('#nick'), $('#startErr'));
    if (!id) { $('#dbFile').value = ''; return; }
    S.sid = id.sid; S.nick = id.nick; S.lastPack = $('#packSel').value; save();
    const def = PACKS.find(p => p.id === $('#packSel').value);
    $('#intro').hidden = true; $('#loading').hidden = false; $('#loading').textContent = '開啟資料庫中…';
    try {
      await ensureSql();
      if (kind === 'course') {
        const res = await fetch(def.db.url, { cache: 'no-cache' });
        if (!res.ok) throw new Error('下載課程資料庫失敗（' + res.status + '）');
        dbBytes = new Uint8Array(await res.arrayBuffer());
        dbLabel = def.db.name;
      } else {
        dbBytes = new Uint8Array(await file.arrayBuffer());
        dbLabel = file.name;
      }
      openBytes(dbBytes);
      if (!tableNames().length) throw new Error('這個檔案不是 SQLite 資料庫，或裡面沒有資料表');
    } catch (e) {
      $('#loading').hidden = true; $('#intro').hidden = false;
      $('#startErr').textContent = String(e.message || e);
      $('#dbFile').value = '';
      return;
    }
    pack = def;
    pack.qs = def.questions.map(q => Object.assign({}, q, J.decode(q.secret)));
    mode = matchesFingerprint(def) ? 'course' : 'free';
    if (kind === 'upload' && mode === 'course') toast('這是課程資料庫，題目可以計分');
    if (kind === 'upload' && mode === 'free') toast('自訂資料庫：自由練習模式，不計分');
    if (kind === 'course' && mode === 'free') toast('課程資料庫版本不符，改為自由練習');
    packState(pack.id); save();
    const firstOpen = pack.qs.find(q => qState(q.id).best < 100);
    view = mode === 'course' ? (firstOpen ? firstOpen.id : pack.qs[0].id) : '';
    $('#sql').value = (S.drafts && S.drafts[pack.id + ':' + mode]) || (mode === 'course' ? '-- 在這裡寫 SQL\n-- 執行（Ctrl+Enter）看結果；提交判分（Ctrl+Shift+Enter）計分\n' : `-- 自由練習：${dbLabel}\nSELECT name FROM sqlite_master WHERE type = 'table';\n`);
    $('#loading').hidden = true; $('#game').hidden = false;
    renderAll();
  }

  /* ---------- 版面 ---------- */
  function renderAll() { renderHeader(); renderQuestion(); renderSchema(); renderCards(); }
  function totalScore() { return pack.qs.reduce((s, q) => s + qState(q.id).best, 0); }
  function renderHeader() {
    $('#packTitle').textContent = `${pack.date}　${pack.title}`;
    $('#whoBtn').textContent = `${S.nick} · ${S.sid}`;
    $('#dbChip').innerHTML = mode === 'course' ? `<i class="dot ok"></i>${esc(dbLabel)}` : `<i class="dot free"></i>自由練習：${esc(dbLabel)}`;
    $('#scoreChip').innerHTML = mode === 'course' ? `<b>${totalScore()}</b> / ${pack.qs.length * 100}` : '';
    $('#qNav').innerHTML = mode !== 'course' ? '' : pack.qs.map((q, i) => {
      const st = qState(q.id);
      const cls = ['step', st.best === 100 ? 'passed' : st.best > 0 ? 'partial' : '', q.id === view ? 'current' : '', 'open'].join(' ');
      const line = i ? `<span class="step-line ${qState(pack.qs[i - 1].id).best === 100 ? 'done' : ''}"></span>` : '';
      return `${line}<button class="${cls}" data-q="${q.id}" title="${esc(q.title)}（${st.best} 分）">${i + 1}</button>`;
    }).join('');
    $('#qNav').querySelectorAll('button').forEach(b => { b.onclick = () => goTo(b.dataset.q); });
  }
  function goTo(qid) { view = qid; animateNext = true; renderHeader(); renderQuestion(); renderCards(); $('#colCase').scrollTo({ top: 0, behavior: 'smooth' }); }
  let animateNext = true;
  const levelCls = l => (l === '基礎' ? 'lv1' : l === '進階' ? 'lv2' : 'lv3');

  function renderQuestion() {
    const anim = animateNext ? ' enter' : '';
    animateNext = false;
    if (mode !== 'course') {
      $('#qCard').innerHTML = `<article class="shell case enter"><div class="core">
        <div class="case-meta"><span class="eyebrow">自由練習</span><span class="status">不計分</span></div>
        <h2 class="case-title">${esc(dbLabel)}</h2>
        <p class="story">這個資料庫和「${esc(pack.title)}」的課程資料庫不同，所以不出題、不計分。你可以在這裡自由寫 SQL、看結果；右邊列出這個資料庫的所有資料表與欄位。</p>
        <div class="task"><span class="label">想計分？</span><p>按右上角「換單元／資料庫」，選「使用課程資料庫」。如果你上傳的是做過 HW2 的資料庫（新增過 C101、改過價格），也會被判定為不同版本。</p></div>
      </div></article>`;
      $('#qNote').innerHTML = '';
      return;
    }
    const q = pack.qs.find(x => x.id === view), st = qState(q.id), idx = pack.qs.indexOf(q);
    const next = pack.qs[idx + 1];
    const uses = (q.cards || []).map(id => { const c = pack.cards.find(x => x.id === id); return c ? `<button class="use-chip" data-card="${id}">${esc(c.title)}</button>` : ''; }).join('');
    const hint = (i, title) => {
      const opened = st.hints[i], disabled = i === 1 && !st.hints[0];
      return `<div class="hint"><button class="hint-toggle" id="h${i + 1}" ${disabled ? 'disabled' : ''}><span class="hint-no">提示 ${i + 1}</span>${title}<span class="hint-state">${opened ? '已開啟' : disabled ? '先看提示 1' : '打開（排行榜會記錄）'}</span></button>
        ${opened ? `<div class="hint-body"><pre>${esc(q.hints[i])}</pre></div>` : ''}</div>`;
    };
    const status = st.best === 100 ? `<div class="solved pop">
        <div class="solved-head"><span class="check">${ICON.check}</span>完全正確　<span class="muted" style="font-weight:400">嘗試 ${st.attempts} 次</span></div>
        ${next ? `<button class="cta cta-lg next-cta" id="nextBtn">下一題：${esc(next.title)}<span class="cta-icon">${ICON.arrow}</span></button>` : '<p class="clue">這個單元全部完成了，太強了！可以回頭看看哪幾題能寫得更簡潔。</p>'}
      </div>` : `<div class="answer"><div class="score-line">
        <span class="label">目前最高分</span><b class="big-score ${st.best ? 'part' : ''}">${st.best}</b><span class="muted">/ 100　·　嘗試 ${st.attempts} 次</span></div>
        <p class="feedback" id="fb"></p></div>`;
    $('#qCard').innerHTML = `<article class="shell case${anim}"><div class="core">
      <div class="case-meta"><span class="eyebrow">第 ${idx + 1} 題 · <span class="lv ${levelCls(q.level)}">${esc(q.level)}</span></span><span class="status ${st.best === 100 ? 'solved' : ''}">${st.best === 100 ? '已完成' : st.best ? '部分正確' : '未完成'}</span></div>
      <h2 class="case-title">${esc(q.title)}</h2>
      <div class="task"><span class="label">題目</span><p>${esc(q.task)}</p></div>
      <div class="uses"><span class="label">會用到</span>${uses}</div>
      ${status}
      <div class="hints">${hint(0, '方向')}${hint(1, '語法骨架')}</div>
    </div></article>`;
    if ($('#nextBtn')) $('#nextBtn').onclick = () => goTo(next.id);
    $('#qCard').querySelectorAll('.use-chip').forEach(b => { b.onclick = () => revealCard(b.dataset.card); });
    $('#h1').onclick = () => { if (!st.hints[0]) { st.hints[0] = true; save(); renderQuestion(); } };
    $('#h2').onclick = () => { if (st.hints[0] && !st.hints[1]) { st.hints[1] = true; save(); renderQuestion(); } };
    $('#qNote').innerHTML = st.best === 100 ? `<section class="shell notebook${anim}" style="--d:.06s"><div class="core">
        <span class="eyebrow">解說</span><h3>參考寫法</h3>
        <div class="nb-head"><span>參考解法</span><button class="mini" id="useRef">加到編輯器</button></div>
        <pre class="code">${esc(q.ref)}</pre>
        <ul>${(q.explain || []).map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        <div class="nb-head"><span>你拿到滿分的寫法</span></div>
        <pre class="code">${esc(st.bestSql || '')}</pre>
      </div></section>` : '';
    if ($('#useRef')) $('#useRef').onclick = () => appendAndSelect(q.ref);
  }

  /* ---------- 執行與判分 ---------- */
  function currentSql() {
    const ta = $('#sql');
    const sel = ta.value.slice(ta.selectionStart, ta.selectionEnd);
    return (sel.trim() ? sel : ta.value).trim();
  }
  function execSql(text) {
    const res = db.exec(text);
    return { res, last: res.length ? res[res.length - 1] : null, changed: db.getRowsModified() };
  }
  function showResult(out, extraHtml) {
    let meta = '', body = '';
    if (out.error) {
      meta = '<span class="err">錯誤</span>';
      body = `<div class="result-note err">錯誤：${esc(out.error)}</div>${errorTip(out.error)}`;
    } else if (out.last) {
      const r = out.last, shown = r.values.slice(0, 300);
      meta = `<span class="result-meta-count">共 <b>${r.values.length}</b> 列${r.values.length > 300 ? '（只顯示前 300 列）' : ''}</span>`;
      body = `<table class="grid"><thead><tr><th>#</th>${r.columns.map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${shown.map((row, i) => `<tr><td class="num">${i + 1}</td>${row.map(v => v === null ? '<td><span class="null">NULL</span></td>' : `<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
    } else {
      meta = '執行成功';
      body = `<div class="result-note okay">執行成功${out.changed ? `，影響 ${out.changed} 列` : '（沒有回傳資料列）'}。</div>`;
    }
    $('#resultMeta').innerHTML = meta;
    $('#result').innerHTML = (extraHtml || '') + body;
    $('#result').scrollTop = 0;
  }
  function errorTip(msg) {
    const tips = [
      [/no such table/i, '資料表名稱打錯了嗎？看右邊「資料表」，也可以直接點表名插入。'],
      [/no such column/i, '欄位名稱打錯，或 JOIN 時忘了加表別名（例如 o.amount）。'],
      [/ambiguous column/i, '兩張表都有這個欄位，請在前面加表別名。'],
      [/misuse of aggregate/i, '統計函數（COUNT、SUM…）不能放在 WHERE 裡；要篩選統計結果，下週會教 HAVING。'],
      [/syntax error/i, '語法錯誤：檢查逗號、引號、括號是否成對，以及關鍵字順序。'],
      [/incomplete input/i, 'SQL 好像沒寫完，檢查括號或引號有沒有成對。']
    ];
    const hit = tips.find(([re]) => re.test(msg));
    return hit ? `<div class="result-note tip">${esc(hit[1])}</div>` : '';
  }
  function persistDraft() { S.drafts = S.drafts || {}; S.drafts[pack.id + ':' + mode] = $('#sql').value; save(); }
  function run() {
    const text = currentSql(); if (!text) return;
    persistDraft();
    try { showResult(execSql(text)); if (/^\s*(INSERT|UPDATE|DELETE|CREATE|DROP|ALTER)/im.test(text)) renderSchema(); }
    catch (e) { showResult({ error: String(e.message || e) }); }
  }
  function submit() {
    if (mode !== 'course') { toast('自由練習模式不計分，請按「執行」'); run(); return; }
    const text = currentSql(); if (!text) return;
    persistDraft();
    const q = pack.qs.find(x => x.id === view), st = qState(q.id);
    st.attempts++; st.lastSql = text.slice(0, 2000);
    let out, verdict;
    try { out = execSql(text); } catch (e) { out = { error: String(e.message || e) }; }
    if (out.error) verdict = { score: 0, correct: false, notes: ['SQL 執行錯誤'] };
    else verdict = J.judge(q.expected, out.last || { columns: [], values: [] }, { ordered: q.ordered });
    const improved = verdict.score > st.best;
    if (improved) { st.best = verdict.score; st.bestAt = now(); st.bestSql = text.slice(0, 2000); }
    save();
    const ps = packState(pack.id);
    enqueue({ room: ROOM, week: String(pack.week), sid: S.sid, nick: S.nick, q: q.id, score: verdict.score, attempts: st.attempts, hints: st.hints.filter(Boolean).length, elapsed: Math.round((now() - ps.startedAt) / 1000), sql: text.slice(0, 2000), client: 'practice-v1' });
    const cls = verdict.correct ? 'okay' : verdict.score >= 60 ? 'tip' : 'err';
    const head = `<div class="result-note ${cls} verdict"><b>${verdict.score} 分</b>　${verdict.notes.map(esc).join('；')}${improved && !verdict.correct ? '（最高分已更新）' : ''}</div>`;
    showResult(out, head);
    if (verdict.correct) toast(`✔ ${q.id} 完全正確！`);
    renderHeader(); renderQuestion();
    if (!verdict.correct && $('#fb')) $('#fb').innerHTML = `<span class="${verdict.score >= 60 ? 'warn' : 'err'}">這次 ${verdict.score} 分：${verdict.notes.map(esc).join('；')}</span>`;
  }

  /* ---------- 編輯器輔助 ---------- */
  function insertAtCursor(text) {
    const ta = $('#sql'), s = ta.selectionStart, e = ta.selectionEnd, v = ta.value;
    const before = v.slice(0, s), after = v.slice(e);
    const pre = before && !/[\s(,.]$/.test(before) ? ' ' : '';
    const post = after && !/^[\s),;.]/.test(after) ? ' ' : '';
    ta.value = before + pre + text + post + after;
    const pos = (before + pre + text).length; ta.focus(); ta.setSelectionRange(pos, pos); persistDraft();
  }
  function appendAndSelect(text) {
    const ta = $('#sql'), base = ta.value.replace(/\s+$/, ''), start = base ? base.length + 2 : 0;
    ta.value = (base ? base + '\n\n' : '') + text;
    ta.focus(); ta.setSelectionRange(start, ta.value.length); ta.scrollTop = ta.scrollHeight; persistDraft();
    toast('已加到編輯器並選取，按「執行」就只跑這一段');
  }

  /* ---------- 參考欄 ---------- */
  function renderSchema() {
    const box = $('#schema');
    const openNow = new Set([...box.querySelectorAll('details[open]')].map(d => d.dataset.t));
    const names = tableNames();
    box.innerHTML = names.map(t => {
      let cols = [], n = '?';
      try { cols = db.exec(`PRAGMA table_info("${t.replace(/"/g, '""')}")`)[0].values.map(r => [r[1], r[2]]); n = scalar(`SELECT COUNT(*) FROM "${t.replace(/"/g, '""')}"`); } catch (e) { /* ignore */ }
      return `<details class="tbl" data-t="${esc(t)}" ${openNow.has(t) ? 'open' : ''}>
        <summary><span class="caret"></span><span class="tbl-name">${esc(t)}</span><span class="tbl-count">${n} 列</span><button class="mini" data-preview="${esc(t)}">預覽</button></summary>
        <div class="tbl-body"><div class="cols"><button class="colchip tname" data-ins="${esc(t)}">${esc(t)}</button>${cols.map(([c, ty]) => `<button class="colchip" data-ins="${esc(c)}" title="${esc(ty || '')}">${esc(c)}</button>`).join('')}</div></div>
      </details>`;
    }).join('') || '<p class="empty">沒有資料表</p>';
    box.querySelectorAll('[data-preview]').forEach(b => {
      b.onclick = e => {
        e.preventDefault(); e.stopPropagation();
        const t = b.dataset.preview;
        try { showResult(execSql(`SELECT * FROM "${t.replace(/"/g, '""')}" LIMIT 10;`), `<div class="result-note tip">預覽 ${esc(t)} 的前 10 列（你的 SQL 沒有被改動）</div>`); } catch (err) { showResult({ error: String(err.message || err) }); }
      };
    });
    box.querySelectorAll('[data-ins]').forEach(b => { b.onclick = () => insertAtCursor(b.dataset.ins); });
  }
  function renderCards() {
    const q = mode === 'course' ? pack.qs.find(x => x.id === view) : null;
    const hotIds = q ? q.cards || [] : [];
    const syn = (c, hot) => `<details class="syn ${hot ? 'hot' : ''}" data-card="${c.id}" ${hot ? 'open' : ''}>
      <summary><span class="caret"></span><span class="syn-title">${esc(c.title)}</span><span class="syn-week">${esc(c.week)}</span></summary>
      <div class="syn-body"><p>${esc(c.desc)}</p><pre class="code">${esc(c.sql)}</pre><div class="syn-actions"><button class="mini" data-c="${c.id}">加到編輯器</button></div></div></details>`;
    const hot = pack.cards.filter(c => hotIds.includes(c.id)), rest = pack.cards.filter(c => !hotIds.includes(c.id));
    $('#cards').innerHTML = (hot.length ? `<div class="syn-group hot">這題會用到</div>${hot.map(c => syn(c, true)).join('')}` : '') +
      `<div class="syn-group">${hot.length ? '其他語法' : '本單元語法'}</div>${rest.map(c => syn(c, false)).join('')}` +
      '<p class="relations">範例是寫給課程資料庫 chain_store_1000.db 的；「加到編輯器」會接在你的 SQL 後面並選取。</p>';
    $('#cards').querySelectorAll('button[data-c]').forEach(b => { b.onclick = () => appendAndSelect(pack.cards.find(c => c.id === b.dataset.c).sql); });
  }
  function revealCard(id) {
    const el = $(`#cards details[data-card="${id}"]`); if (!el) return;
    el.open = true; const box = $('#cards');
    box.scrollTo({ top: el.offsetTop - box.offsetTop - 8, behavior: 'smooth' });
    if (window.innerWidth <= 1280) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash');
  }

  /* ---------- 綁定 ---------- */
  function bind() {
    $('#runBtn').onclick = run;
    $('#submitBtn').onclick = submit;
    $('#clearBtn').onclick = () => { $('#sql').value = ''; persistDraft(); $('#sql').focus(); };
    $('#resetDbBtn').onclick = () => { if (!confirm('把資料庫還原成剛載入的狀態？（成績不受影響）')) return; openBytes(dbBytes); renderSchema(); $('#resultMeta').textContent = ''; $('#result').innerHTML = '<div class="result-note okay">資料庫已重置。</div>'; };
    $('#switchBtn').onclick = () => { $('#game').hidden = true; $('#intro').hidden = false; $('#dbFile').value = ''; renderBoardStatus(); };
    $('#whoBtn').onclick = () => { $('#editSid').value = S.sid; $('#editNick').value = S.nick; $('#editErr').textContent = ''; $('#profileModal').hidden = false; };
    $('#editCancel').onclick = () => { $('#profileModal').hidden = true; };
    $('#editSave').onclick = () => {
      const id = readIdentity($('#editSid'), $('#editNick'), $('#editErr')); if (!id) return;
      S.sid = id.sid; S.nick = id.nick; save(); $('#profileModal').hidden = true; renderHeader();
    };
    let t = null;
    $('#sql').addEventListener('input', () => { clearTimeout(t); t = setTimeout(persistDraft, 600); });
    $('#sql').addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); if (e.shiftKey) submit(); else run(); }
      else if (e.key === 'Tab' && !e.shiftKey) {
        e.preventDefault(); const ta = e.target, s = ta.selectionStart;
        ta.value = ta.value.slice(0, s) + '  ' + ta.value.slice(ta.selectionEnd); ta.selectionStart = ta.selectionEnd = s + 2;
      }
    });
    window.addEventListener('online', flush);
  }

  window.addEventListener('DOMContentLoaded', () => {
    if (typeof initSqlJs === 'undefined') { $('#loading').innerHTML = '<p class="err">SQL 引擎載入失敗，請確認網路連線後重新整理。</p>'; return; }
    bind(); renderIntro(); flush();
  });
  window.__practice = { state: () => S, mode: () => mode };
})();
