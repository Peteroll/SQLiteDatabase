(function () {
  'use strict';
  const G = window.GAME, C = window.CASE, N = window.NMQ;
  const STORE = 'nmq-midterm-2026';
  const LKEYS = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8'];
  const ALL = LKEYS.concat('F');
  const MAX_QUERIES = 40;
  const $ = s => document.querySelector(s);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const nowIso = () => new Date().toISOString();
  const fmt = iso => { if (!iso) return '—'; const d = new Date(iso); const p = n => String(n).padStart(2, '0'); return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`; };
  const levelOf = k => G.LEVELS.find(l => l.key === k);

  let S = null;
  let SQLlib = null, db = null;
  let view = 'L1';
  let tab = 'result';

  /* ---------- state ---------- */
  function blankLevel() { return { passed: false, passedAt: null, attempts: 0, answer: null, hints: [false, false], queries: [], passSql: null }; }
  function blankState(id, name) {
    const levels = {}; ALL.forEach(k => { levels[k] = blankLevel(); });
    return { app: 'nmq-midterm', schema: 1, studentId: id, name, version: N.versionOf(id), startedAt: nowIso(), updatedAt: nowIso(), levels, finale: { method: '', ev1: '', ev2: '', limit: '' }, nonWhitelist: [], runs: 0, draft: '' };
  }
  function save() { S.updatedAt = nowIso(); try { localStorage.setItem(STORE, JSON.stringify(S)); } catch (e) { /* 空間不足時忽略 */ } }
  function load() { try { const x = JSON.parse(localStorage.getItem(STORE)); return x && x.app === 'nmq-midterm' ? x : null; } catch (e) { return null; } }
  const unlocked = k => k === 'L1' || (k === 'F' ? S.levels.L8.passed : S.levels[LKEYS[LKEYS.indexOf(k) - 1]].passed);
  const passedCount = () => LKEYS.filter(k => S.levels[k].passed).length;
  const fill = t => String(t).replace(/\{(L\d)\}/g, (_, k) => S.levels[k] && S.levels[k].answer ? S.levels[k].answer : '＿＿');

  function validateId(id, name) {
    const sid = N.toHalf(id).replace(/\s+/g, '');
    if (!sid) return '請輸入學號';
    if (N.versionOf(sid) < 0) return '學號最後一碼必須是數字（用來決定你的卷宗版本）';
    if (!N.toHalf(name)) return '請輸入姓名';
    return '';
  }

  /* ---------- database ---------- */
  async function openDb() {
    if (!SQLlib) SQLlib = await initSqlJs({ locateFile: f => 'https://cdn.jsdelivr.net/npm/sql.js@1.10.3/dist/' + f });
    if (db) db.close();
    db = new SQLlib.Database();
    db.exec(C.versions[S.version]);
  }

  /* ---------- intro ---------- */
  function renderIntro() {
    $('#introTitle').textContent = G.PROLOGUE.title;
    $('#introLead').textContent = G.PROLOGUE.lead;
    $('#introBody').innerHTML = G.PROLOGUE.body.map(p => `<p>${esc(p)}</p>`).join('');
    $('#rules').innerHTML = [
      ['截止', C.meta.deadline],
      ['配分（期中 100 分）', '8 關 × 8 分 = 64<br>指認攤商 16<br>推理簡答 20（老師評）'],
      ['卷宗版本', '依學號最後一碼分成 5 個版本：0/5、1/6、2/7、3/8、4/9。同組的人答案相同，查法大家都一樣，歡迎討論「怎麼查」。'],
      ['語法範圍', '期中前學過的 SQL 就能破案。用到還沒教的語法不會被擋，但會記錄在報告裡。'],
      ['提示', '每關兩層提示，打開不扣分；過關後會看到參考解法與解說。'],
      ['繳交', '完成後按「下載進度報告」，把 .html 檔上傳到教學平台。沒全破也可以交，依進度給分。']
    ].map(([t, d]) => `<div class="rule"><b>${t}</b>${d}</div>`).join('');
    const saved = load();
    if (saved) {
      $('#resumeCard').hidden = false;
      $('#resumeText').innerHTML = `這台電腦有 <b>${esc(saved.name)}（${esc(saved.studentId)}）</b> 的調查進度：第 ${saved.version + 1} 號卷宗，已過 ${LKEYS.filter(k => saved.levels[k] && saved.levels[k].passed).length} / 8 關。`;
    }
    const preview = () => { const v = N.versionOf($('#sid').value); $('#versionPreview').textContent = v >= 0 ? `你會拿到：第 ${v + 1} 號卷宗` : ''; };
    $('#sid').addEventListener('input', preview);
    $('#startBtn').onclick = () => {
      const err = validateId($('#sid').value, $('#sname').value);
      $('#startErr').textContent = err;
      if (err) return;
      if (load() && !confirm('這台電腦已有一份調查進度，開始新的調查會覆蓋它。確定嗎？')) return;
      S = blankState(N.toHalf($('#sid').value).replace(/\s+/g, ''), N.toHalf($('#sname').value));
      save(); enterGame();
    };
    $('#resumeBtn').onclick = () => { S = load(); enterGame(); };
    $('#switchBtn').onclick = () => { $('#resumeCard').hidden = true; $('#sid').focus(); };
    $('#loading').hidden = true;
    $('#intro').hidden = false;
  }

  /* ---------- game shell ---------- */
  async function enterGame() {
    $('#intro').hidden = true; $('#loading').hidden = false; $('#loading').textContent = '開啟案件資料庫中…';
    try { await openDb(); }
    catch (e) { $('#loading').innerHTML = `<p class="err">SQL 引擎載入失敗，請確認網路連線後重新整理頁面。</p><p class="muted">${esc(e.message || e)}</p>`; return; }
    $('#loading').hidden = true; $('#game').hidden = false;
    view = ALL.find(k => unlocked(k) && !S.levels[k].passed) || 'F';
    $('#sql').value = S.draft || `-- 在這裡寫 SQL，按 Ctrl+Enter 執行\nSELECT * FROM complaints LIMIT 5;`;
    renderHeader(); renderNav(); renderLevel(); renderSchema(); renderCards();
  }

  function renderHeader() {
    $('#dossier').textContent = `第 ${S.version + 1} 號卷宗`;
    $('#who').innerHTML = `調查員 <button id="whoBtn" title="修改學號／姓名">${esc(S.name)}（${esc(S.studentId)}）</button>`;
    $('#whoBtn').onclick = openProfile;
    const n = passedCount() + (S.levels.F.passed ? 1 : 0);
    $('#progText').textContent = `${passedCount()} / 8 關${S.levels.F.passed ? '・已結案' : ''}`;
    $('#progBar').style.width = (n / 9 * 100) + '%';
  }

  function renderNav() {
    $('#levelNav').innerHTML = ALL.map(k => {
      const cls = [k === 'F' ? 'final' : '', S.levels[k].passed ? 'passed' : '', k === view ? 'current' : '', unlocked(k) ? '' : 'locked'].join(' ');
      const label = k === 'F' ? '結案' : k.slice(1);
      return `<button class="${cls}" data-k="${k}" ${unlocked(k) ? '' : 'aria-disabled="true"'} title="${k === 'F' ? '結案' : '第 ' + k.slice(1) + ' 關'}">${label}</button>`;
    }).join('');
    $('#levelNav').querySelectorAll('button').forEach(b => {
      b.onclick = () => { const k = b.dataset.k; if (!unlocked(k)) return; view = k; renderNav(); renderLevel(); renderCards(); };
    });
  }

  /* ---------- level view ---------- */
  function renderLevel() {
    if (view === 'F') return renderFinale();
    const L = levelOf(view), st = S.levels[view];
    const cardChips = L.cards.map(id => `<span class="chip hot">${esc(G.CARDS.find(c => c.id === id).title)}</span>`).join('');
    $('#caseFile').innerHTML = `
      <span class="stamp ${st.passed ? 'done' : ''}">${st.passed ? '已破解' : '機密'}</span>
      <div class="case-no">CASE ${S.version + 1}-${L.no} ／ 第 ${L.no} 關</div>
      <h2>${esc(L.title)}</h2>
      <p class="story">${esc(fill(L.story))}</p>
      <div class="task"><b>任務</b><br>${esc(fill(L.task))}</div>
      <div class="chips">${cardChips}</div>
      <div class="field" style="margin-top:14px"><label for="ans">${esc(L.prompt)}</label>
        <div class="answer-row"><input id="ans" placeholder="${esc(L.placeholder)}" value="${esc(st.passed ? st.answer : '')}" ${st.passed ? 'disabled' : ''}>
        <button class="btn primary" id="ansBtn" ${st.passed ? 'disabled' : ''}>送出線索</button></div>
      </div>
      <div class="feedback" id="fb">${st.passed ? '<span class="ok">✔ 已過關</span>' : (st.attempts ? `<span class="muted">已嘗試 ${st.attempts} 次</span>` : '')}</div>
      <div class="hints">
        <div class="hint-buttons">
          <button class="btn small" id="h1">${st.hints[0] ? '提示一（已開啟）' : '💡 提示一：方向'}</button>
          <button class="btn small" id="h2" ${st.hints[0] ? '' : 'disabled'}>${st.hints[1] ? '提示二（已開啟）' : '🧩 提示二：語法骨架'}</button>
        </div>
        ${st.hints[0] ? `<div class="hint-box"><b>提示一</b><pre>${esc(fill(L.hints[0]))}</pre></div>` : ''}
        ${st.hints[1] ? `<div class="hint-box"><b>提示二</b><pre>${esc(fill(L.hints[1]))}</pre></div>` : ''}
      </div>`;
    const submit = () => checkAnswer(view, $('#ans').value);
    $('#ansBtn').onclick = submit;
    $('#ans').addEventListener('keydown', e => { if (e.key === 'Enter') submit(); });
    $('#h1').onclick = () => { if (!st.hints[0]) { st.hints[0] = true; save(); renderLevel(); } };
    $('#h2').onclick = () => { if (st.hints[0] && !st.hints[1]) { st.hints[1] = true; save(); renderLevel(); } };
    renderNotebook();
  }

  function renderNotebook() {
    const box = $('#notebook');
    if (view === 'F' || !S.levels[view].passed) { box.innerHTML = ''; return; }
    const L = levelOf(view), st = S.levels[view];
    const ref = fill(L.ref);
    const mine = st.passSql;
    const nw = mine ? N.detectNonWhitelist(mine) : [];
    box.innerHTML = `
      <div class="card notebook">
        <h3>破案筆記・第 ${L.no} 關</h3>
        <p class="clue">${esc(fill(L.clue))}</p>
        <div class="code-head"><b>參考解法</b><button class="btn small" id="useRef">放入編輯器</button></div>
        <pre class="code">${esc(ref)}</pre>
        <ul>${L.notes.map(n => `<li>${esc(n)}</li>`).join('')}</ul>
        <div class="code-head"><b>你的寫法（過關前最後一次成功執行）</b></div>
        ${mine ? `<pre class="code">${esc(mine)}</pre>` : '<p class="muted">沒有紀錄到成功執行的查詢。</p>'}
        ${nw.length ? `<div class="gentle">你的寫法用到了 <b>${esc(nw.join('、'))}</b>，這些期中後才會教。上面的參考解法只用學過的語法，可以對照看看。</div>` : ''}
        ${mine ? '<p class="muted" style="font-size:13px;margin-top:8px">寫法不一樣沒關係，只要邏輯對、結果能支持答案就好。比較看看欄位、條件、排序有什麼差別。</p>' : ''}
      </div>`;
    $('#useRef').onclick = () => { $('#sql').value = ref; persistDraft(); $('#sql').focus(); };
  }

  function checkAnswer(k, raw) {
    const st = S.levels[k];
    if (st.passed) return;
    if (!N.toHalf(raw)) { $('#fb').innerHTML = '<span class="err">請先輸入答案</span>'; return; }
    st.attempts++;
    if (N.answerHash(S.version, k, raw) === C.ansHash[S.version][k]) {
      st.passed = true; st.passedAt = nowIso(); st.answer = N.normalize(k, raw);
      const ok = st.queries.filter(q => q.ok);
      st.passSql = ok.length ? ok[ok.length - 1].sql : null;
      save(); renderHeader(); renderNav(); renderLevel();
      $('#notebook').scrollIntoView({ behavior: 'smooth', block: 'start' });
      const next = ALL[ALL.indexOf(k) + 1];
      if (next) {
        const nb = document.createElement('button');
        nb.className = 'btn primary'; nb.style.marginTop = '8px';
        nb.textContent = next === 'F' ? '前往結案 →' : `前往第 ${next.slice(1)} 關 →`;
        nb.onclick = () => { view = next; renderNav(); renderLevel(); renderCards(); window.scrollTo({ top: 0, behavior: 'smooth' }); };
        $('#notebook .notebook').appendChild(nb);
      }
    } else {
      save();
      $('#fb').innerHTML = `<span class="err">線索對不上，再查查看。</span> <span class="muted">（第 ${st.attempts} 次嘗試）</span>`;
    }
  }

  /* ---------- finale ---------- */
  function renderFinale() {
    const st = S.levels.F, F = G.FINALE;
    if (!unlocked('F')) { $('#caseFile').innerHTML = '<h2>結案</h2><p class="muted">完成第 8 關後解鎖。</p>'; $('#notebook').innerHTML = ''; return; }
    const opts = C.vendors.map(v => `<option value="${v[0]}" ${st.answer === v[0] ? 'selected' : ''}>${v[0]}｜${esc(v[1])}（${esc(v[2])}）</option>`).join('');
    $('#caseFile').innerHTML = `
      <span class="stamp ${st.passed ? 'done' : ''}">${st.passed ? '已結案' : '結案'}</span>
      <div class="case-no">CASE ${S.version + 1}-FINAL</div>
      <h2>${esc(F.title)}</h2>
      <div class="task">${esc(F.task)}</div>
      <div class="final-grid">
        <div class="field"><label for="culprit">幕後主使的攤商</label>
          <select id="culprit" ${st.passed ? 'disabled' : ''}><option value="">— 請選擇 —</option>${opts}</select></div>
        ${F.fields.map(f => `<div class="field"><label for="f_${f.id}">${esc(f.label)}</label>
          <textarea id="f_${f.id}" placeholder="${esc(f.ph)}">${esc(S.finale[f.id])}</textarea>
          <div class="counter" id="c_${f.id}"></div></div>`).join('')}
      </div>
      <button class="btn primary" id="finalBtn" style="margin-top:12px">${st.passed ? '更新推理簡答' : '送出指認'}</button>
      <div class="feedback" id="fb"></div>`;
    const count = () => F.fields.forEach(f => {
      const n = N.toHalf($('#f_' + f.id).value).length;
      const el = $('#c_' + f.id); el.textContent = `${n} 字（至少 ${F.minChars} 字）`; el.className = 'counter' + (n < F.minChars ? ' short' : '');
    });
    F.fields.forEach(f => $('#f_' + f.id).addEventListener('input', () => { S.finale[f.id] = $('#f_' + f.id).value; save(); count(); }));
    count();
    $('#finalBtn').onclick = () => {
      const short = F.fields.filter(f => N.toHalf(S.finale[f.id]).length < F.minChars);
      if (short.length) { $('#fb').innerHTML = `<span class="err">還有欄位不到 ${F.minChars} 字：${short.map(f => f.label).join('、')}</span>`; return; }
      if (st.passed) { S.finale.updatedAt = nowIso(); save(); $('#fb').innerHTML = '<span class="ok">推理簡答已更新，記得重新下載報告。</span>'; return; }
      const pick = $('#culprit').value;
      if (!pick) { $('#fb').innerHTML = '<span class="err">請選擇攤商</span>'; return; }
      st.attempts++;
      if (N.answerHash(S.version, 'F', pick) === C.ansHash[S.version].F) {
        st.passed = true; st.passedAt = nowIso(); st.answer = pick; S.finale.submittedAt = nowIso();
        save(); renderHeader(); renderNav(); renderFinale();
      } else {
        st.answer = null; save();
        $('#fb').innerHTML = `<span class="err">證據還串不起來，回頭看看第 8 關的結果。</span> <span class="muted">（第 ${st.attempts} 次嘗試）</span>`;
      }
    };
    $('#notebook').innerHTML = st.passed ? `
      <div class="card notebook epilogue">
        <h3>結案報告</h3>
        <p class="clue">真相大白：<b>${esc(C.vendors.find(v => v[0] === st.answer)[1])}</b> 的老闆用兩支手機開了一批人頭帳號，在夜市沒營業的時段刷新會員券，再登入自家後台把訂單按成「已完成」，詐領平台補貼。</p>
        <p>${esc(F.epilogue[0])}</p>
        <ul>${F.epilogue.slice(1, -1).map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        <p class="muted">${esc(F.epilogue[F.epilogue.length - 1])}</p>
        <button class="btn amber" id="reportBtn2">下載結案報告（.html）</button>
        <p class="muted" style="font-size:13px">下載後把檔案上傳到教學平台。之後修改推理簡答，記得重新下載。</p>
      </div>` : '';
    if (st.passed) $('#reportBtn2').onclick = downloadReport;
  }

  /* ---------- SQL runner ---------- */
  function persistDraft() { S.draft = $('#sql').value; save(); }
  function runSql() {
    const ta = $('#sql');
    const sel = ta.value.slice(ta.selectionStart, ta.selectionEnd);
    const text = (sel.trim() ? sel : ta.value).trim();
    if (!text) return;
    persistDraft();
    S.runs++;
    const rec = { t: nowIso(), sql: text.slice(0, 4000), ok: true, rows: 0, err: null };
    const nw = N.detectNonWhitelist(text);
    if (nw.length) S.nonWhitelist.push({ level: view, items: nw, sql: text.slice(0, 1000), t: rec.t });
    let html = '';
    try {
      const res = db.exec(text);
      const changed = db.getRowsModified();
      if (res.length) {
        const r = res[res.length - 1];
        rec.rows = r.values.length;
        const shown = r.values.slice(0, 300);
        html = `<div class="result-meta">共 <b>${r.values.length}</b> 列${r.values.length > 300 ? '（只顯示前 300 列）' : ''}${res.length > 1 ? `・共執行 ${res.length} 段查詢，顯示最後一段` : ''}</div>
          <table class="grid"><thead><tr>${r.columns.map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead>
          <tbody>${shown.map(row => `<tr>${row.map(v => v === null ? '<td><span class="null">NULL</span></td>' : `<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
      } else {
        html = `<div class="result-meta ok">執行成功${changed ? `，影響 ${changed} 列` : '（沒有回傳資料列）'}。</div>`;
        if (/^\s*(INSERT|UPDATE|DELETE)/i.test(text)) html += '<p class="muted" style="font-size:13px">你修改了瀏覽器裡的案件資料。想還原，按「重置資料庫」。</p>';
      }
    } catch (e) {
      rec.ok = false; rec.err = String(e.message || e);
      html = `<div class="result-meta err">錯誤：${esc(rec.err)}</div>${errorTip(rec.err)}`;
    }
    if (nw.length) html = `<div class="gentle note-nw" style="margin:0 0 10px">（已記錄）這句用到了期中前還沒教的 <b>${esc(nw.join('、'))}</b>。可以執行，不扣分；但這次只用學過的語法就能破案，試試看「語法手冊」裡的寫法。</div>` + html;
    const qs = S.levels[view].queries;
    qs.push(rec); if (qs.length > MAX_QUERIES) qs.splice(0, qs.length - MAX_QUERIES);
    save();
    showTab('result');
    $('#tab-result').innerHTML = html;
  }
  function errorTip(msg) {
    const tips = [
      [/no such table/i, '資料表名稱打錯了嗎？到「資料表」分頁確認名稱。'],
      [/no such column/i, '欄位名稱打錯，或忘了在欄位前加上表別名（例如 o.order_id）。'],
      [/ambiguous column/i, '兩張表都有這個欄位，請在前面加上表別名，例如 o.member_id。'],
      [/syntax error/i, '語法錯誤：檢查逗號、引號是否成對、關鍵字順序（SELECT → FROM → JOIN → WHERE → ORDER BY → LIMIT）。'],
      [/incomplete input/i, 'SQL 好像沒寫完，檢查括號或引號有沒有成對。']
    ];
    const hit = tips.find(([re]) => re.test(msg));
    return hit ? `<div class="gentle">${esc(hit[1])}</div>` : '';
  }

  /* ---------- tabs ---------- */
  function showTab(name) {
    tab = name;
    document.querySelectorAll('.tabs button').forEach(b => b.classList.toggle('active', b.dataset.tab === name));
    ['result', 'schema', 'cards'].forEach(n => { $('#tab-' + n).hidden = n !== name; });
  }
  function renderSchema() {
    const names = Object.keys(G.TABLE_DOCS);
    $('#tab-schema').innerHTML = names.map(t => {
      let cols = [], n = '?';
      try { cols = db.exec(`PRAGMA table_info(${t})`)[0].values.map(r => r[1]); n = db.exec(`SELECT COUNT(*) FROM ${t}`)[0].values[0][0]; } catch (e) { /* 被刪表時忽略 */ }
      return `<div class="schema-item"><h4><span>${t} <span class="muted" style="font-family:var(--sans);font-size:12px">${n} 列</span></span><button class="btn small" data-t="${t}">預覽</button></h4>
        <p>${esc(G.TABLE_DOCS[t])}</p><p style="font-family:var(--mono)">${cols.map(esc).join(', ')}</p></div>`;
    }).join('') + '<p class="muted" style="font-size:13px">關聯：orders.member_id → members；orders.vendor_id → vendors；orders.coupon_code → coupons；deliveries.order_id → orders；vendor_logins.vendor_id → vendors。</p>';
    $('#tab-schema').querySelectorAll('button[data-t]').forEach(b => { b.onclick = () => { $('#sql').value = `SELECT * FROM ${b.dataset.t} LIMIT 10;`; runSql(); }; });
  }
  function cardHtml(c, hot) {
    return `<div class="syntax-card ${hot ? 'hot' : ''}"><h4><span><span class="week">${esc(c.week)}</span>${esc(c.title)}</span><button class="btn small" data-c="${c.id}">放入編輯器</button></h4>
      <p>${esc(c.desc)}</p><pre class="code">${esc(c.sql)}</pre></div>`;
  }
  function renderCards() {
    const hotIds = view === 'F' ? [] : levelOf(view).cards;
    const hot = G.CARDS.filter(c => hotIds.includes(c.id));
    const weeks = [...new Set(G.CARDS.map(c => c.week))];
    $('#tab-cards').innerHTML =
      (hot.length ? `<div class="section-label">第 ${view.slice(1)} 關會用到</div>${hot.map(c => cardHtml(c, true)).join('')}` : '') +
      `<div class="section-label">全部學過的語法</div>` +
      weeks.map(w => G.CARDS.filter(c => c.week === w).map(c => cardHtml(c, false)).join('')).join('') +
      '<p class="muted" style="font-size:13px">範例都在本案資料庫上執行，可以放心改寫來試。</p>';
    $('#tab-cards').querySelectorAll('button[data-c]').forEach(b => {
      b.onclick = () => { $('#sql').value = G.CARDS.find(c => c.id === b.dataset.c).sql; persistDraft(); $('#sql').focus(); };
    });
  }

  /* ---------- profile ---------- */
  function openProfile() {
    $('#editSid').value = S.studentId; $('#editName').value = S.name; $('#editErr').textContent = ''; $('#editNote').textContent = '';
    $('#profileModal').hidden = false;
    $('#editSid').oninput = () => {
      const v = N.versionOf($('#editSid').value);
      $('#editNote').textContent = v >= 0 && v !== S.version ? `⚠ 尾數改變後會變成第 ${v + 1} 號卷宗，目前進度會重新開始。` : '';
    };
  }
  function bindProfile() {
    $('#editCancel').onclick = () => { $('#profileModal').hidden = true; };
    $('#editSave').onclick = async () => {
      const err = validateId($('#editSid').value, $('#editName').value);
      $('#editErr').textContent = err; if (err) return;
      const sid = N.toHalf($('#editSid').value).replace(/\s+/g, ''), name = N.toHalf($('#editName').value);
      const v = N.versionOf(sid);
      if (v !== S.version) {
        if (!confirm(`卷宗會從第 ${S.version + 1} 號換成第 ${v + 1} 號，目前進度會清空重新開始。確定嗎？`)) return;
        S = blankState(sid, name); save();
        $('#profileModal').hidden = true; $('#game').hidden = true; await enterGame(); return;
      }
      S.studentId = sid; S.name = name; save();
      $('#profileModal').hidden = true; renderHeader();
    };
  }

  /* ---------- report ---------- */
  function payload() {
    const levels = {};
    ALL.forEach(k => { const s = S.levels[k]; levels[k] = { passed: s.passed, passedAt: s.passedAt, attempts: s.attempts, answer: s.answer, hints: s.hints.slice(), passSql: s.passSql, queries: s.queries.map(q => ({ t: q.t, sql: q.sql, ok: q.ok, rows: q.rows, err: q.err })) }; });
    return { app: 'nmq-midterm', schema: 1, studentId: S.studentId, name: S.name, version: S.version, startedAt: S.startedAt, generatedAt: nowIso(), runs: S.runs, levels, finale: { method: S.finale.method, ev1: S.finale.ev1, ev2: S.finale.ev2, limit: S.finale.limit }, nonWhitelist: S.nonWhitelist.slice() };
  }
  function buildReport() {
    const p = payload();
    const sig = N.signPayload(p);
    const auto = passedCount() * 8 + (S.levels.F.passed ? 16 : 0);
    const culprit = S.levels.F.passed ? C.vendors.find(v => v[0] === S.levels.F.answer) : null;
    const row = k => {
      const s = S.levels[k], L = levelOf(k);
      return `<tr><td>${L.no}. ${esc(L.title)}</td><td>${s.passed ? '✔' : '—'}</td><td>${esc(s.answer || '')}</td><td>${s.attempts}</td><td>${s.hints.filter(Boolean).length}</td><td>${fmt(s.passedAt)}</td></tr>`;
    };
    const sqlBlocks = LKEYS.map(k => {
      const s = S.levels[k], L = levelOf(k);
      const okQ = s.queries.filter(q => q.ok).length, errQ = s.queries.length - okQ;
      return `<section><h3>第 ${L.no} 關：${esc(L.title)}</h3>
        <p class="m">執行紀錄：成功 ${okQ} 次、錯誤 ${errQ} 次（最多保留最近 ${MAX_QUERIES} 次）</p>
        ${s.passSql ? `<pre>${esc(s.passSql)}</pre>` : '<p class="m">（尚無過關 SQL）</p>'}
        ${s.queries.length ? `<details><summary>完整執行紀錄</summary>${s.queries.map(q => `<div class="q ${q.ok ? '' : 'bad'}"><span>${fmt(q.t)}・${q.ok ? q.rows + ' 列' : '錯誤：' + esc(q.err)}</span><pre>${esc(q.sql)}</pre></div>`).join('')}</details>` : ''}
      </section>`;
    }).join('');
    const nw = S.nonWhitelist.length
      ? `<table><tr><th>關卡</th><th>語法</th><th>時間</th><th>SQL</th></tr>${S.nonWhitelist.map(x => `<tr><td>${x.level === 'F' ? '結案' : x.level.slice(1)}</td><td>${esc(x.items.join('、'))}</td><td>${fmt(x.t)}</td><td><pre>${esc(x.sql)}</pre></td></tr>`).join('')}</table>`
      : '<p class="m">無</p>';
    const json = JSON.stringify({ payload: p, sig }).replace(/</g, '\\u003c');
    return `<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>期中闖關報告｜${esc(S.studentId)} ${esc(S.name)}</title>
<style>
body{font-family:"Noto Sans TC","Microsoft JhengHei",sans-serif;max-width:900px;margin:24px auto;padding:0 18px;color:#221b2e;line-height:1.7}
h1{font-size:24px;margin:0 0 4px;color:#b3264c}h2{border-bottom:2px solid #ffb547;padding-bottom:4px;margin-top:28px;font-size:19px}h3{font-size:16px;margin:18px 0 4px}
table{border-collapse:collapse;width:100%;font-size:14px}th,td{border:1px solid #d9d2e6;padding:5px 8px;text-align:left;vertical-align:top}th{background:#f6f1fb}
pre{background:#f7f5fa;border:1px solid #e3ddec;border-radius:8px;padding:8px 10px;white-space:pre-wrap;font-family:Consolas,monospace;font-size:13px;margin:4px 0}
.m{color:#6e6680;font-size:13px}.box{border:1px solid #d9d2e6;border-radius:10px;padding:10px 14px;margin:8px 0}.score{font-size:20px;font-weight:700;color:#b3264c}
.q span{font-size:12px;color:#6e6680}.q.bad pre{border-color:#f3b3c2;background:#fff5f7}details{margin:6px 0}summary{cursor:pointer;color:#6e6680;font-size:13px}
.sig{font-family:Consolas,monospace;font-size:11px;color:#8a83a0;word-break:break-all}@media print{details{display:none}}
</style></head><body>
<h1>夜市快送・優惠券詐領案　期中闖關報告</h1>
<p class="m">大數據資料庫應用實務｜報告產生時間 ${fmt(p.generatedAt)}</p>
<div class="box"><b>學號</b> ${esc(S.studentId)}　<b>姓名</b> ${esc(S.name)}　<b>卷宗</b> 第 ${S.version + 1} 號<br>
<b>開始調查</b> ${fmt(S.startedAt)}　<b>SQL 執行次數</b> ${S.runs}</div>
<div class="box"><span class="score">自動計分 ${auto} / 80</span>　<span class="m">（8 關 × 8 分 + 指認 16 分；推理簡答 20 分由老師評分）</span><br>
結案指認：${culprit ? `${esc(culprit[0])}｜${esc(culprit[1])}（${esc(culprit[2])}）` : '尚未結案'}</div>
<h2>關卡進度</h2>
<table><tr><th>關卡</th><th>過關</th><th>線索答案</th><th>嘗試</th><th>提示</th><th>過關時間</th></tr>${LKEYS.map(row).join('')}
<tr><td>結案：指認攤商</td><td>${S.levels.F.passed ? '✔' : '—'}</td><td>${esc(S.levels.F.answer || '')}</td><td>${S.levels.F.attempts}</td><td>—</td><td>${fmt(S.levels.F.passedAt)}</td></tr></table>
<h2>推理簡答</h2>
${G.FINALE.fields.map(f => `<h3>${esc(f.label)}</h3><div class="box">${esc(S.finale[f.id] || '（未填）').replace(/\n/g, '<br>')}</div>`).join('')}
<h2>各關 SQL</h2>${sqlBlocks}
<h2>期中前未教語法使用紀錄</h2>${nw}
<p class="sig">驗證碼：${sig}</p>
<script type="application/json" id="nmq-report">${json}</` + `script>
</body></html>`;
  }
  function downloadReport() {
    const html = buildReport();
    const safe = s => String(s).replace(/[\\/:*?"<>|\s]+/g, '_');
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `期中_${safe(S.studentId)}_${safe(S.name)}.html`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  }

  /* ---------- boot ---------- */
  function bindGame() {
    $('#runBtn').onclick = runSql;
    $('#clearBtn').onclick = () => { $('#sql').value = ''; persistDraft(); $('#sql').focus(); };
    $('#resetDbBtn').onclick = async () => { if (!confirm('把案件資料庫還原成原始狀態？（你的關卡進度不受影響）')) return; await openDb(); renderSchema(); $('#tab-result').innerHTML = '<p class="ok">資料庫已重置。</p>'; showTab('result'); };
    $('#reportBtn').onclick = downloadReport;
    $('#restartBtn').onclick = () => {
      if (!confirm('重新開始會清除這台電腦上的所有進度（建議先下載進度報告）。確定嗎？')) return;
      localStorage.removeItem(STORE); location.reload();
    };
    document.querySelectorAll('.tabs button').forEach(b => { b.onclick = () => { showTab(b.dataset.tab); if (b.dataset.tab === 'schema') renderSchema(); }; });
    let t = null;
    $('#sql').addEventListener('input', () => { clearTimeout(t); t = setTimeout(persistDraft, 600); });
    $('#sql').addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); runSql(); }
      else if (e.key === 'Tab' && !e.shiftKey) {
        e.preventDefault();
        const ta = e.target, s = ta.selectionStart;
        ta.value = ta.value.slice(0, s) + '  ' + ta.value.slice(ta.selectionEnd);
        ta.selectionStart = ta.selectionEnd = s + 2;
      }
    });
    bindProfile();
  }

  window.addEventListener('DOMContentLoaded', () => {
    if (typeof initSqlJs === 'undefined') { $('#loading').innerHTML = '<p class="err">SQL 引擎載入失敗，請確認網路連線後重新整理頁面。</p>'; return; }
    bindGame();
    renderIntro();
  });
  // 測試用：讓自動化測試能讀取報告內容
  window.__nmq = { buildReport: () => buildReport(), state: () => S };
})();
