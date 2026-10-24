(function () {
  'use strict';
  const CFG = window.PRACTICE_CONFIG || {};
  const PACKS = window.PRACTICE_PACKS || [];
  const $ = s => document.querySelector(s);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const params = new URLSearchParams(location.search);
  const ROOM = params.get('room') || CFG.ROOM || 'main';
  const PACK = PACKS.find(p => p.id === params.get('pack')) || PACKS.find(p => String(p.week) === params.get('week')) || PACKS[PACKS.length - 1];
  const WEEK = String(params.get('week') || (PACK && PACK.week) || '');
  const POLL = Math.max(2000, Number(params.get('poll')) || 4000);
  let api = params.get('api') || CFG.ENDPOINT || sessionStorage.getItem('board-api') || '';
  const T0KEY = `board-t0-${WEEK}-${ROOM}`;
  let t0 = Number(localStorage.getItem(T0KEY)) || Date.now();
  localStorage.setItem(T0KEY, String(t0));
  let mask = localStorage.getItem('board-mask') === '1';
  let prevRank = {};
  let last = null;

  const qIds = PACK ? PACK.questions.map(q => q.id) : [];
  const qTitle = id => { const q = PACK && PACK.questions.find(x => x.id === id); return q ? q.title : id; };
  const showSid = sid => (mask ? '•••' + String(sid).slice(-3) : sid);

  function header() {
    $('#bTitle').textContent = PACK ? `${PACK.date}　${PACK.title}` : `第 ${WEEK} 週`;
    $('#bEyebrow').textContent = `SQL 課堂練習・即時排行榜・教室代碼 ${ROOM}`;
    $('#bMask').textContent = mask ? '學號：只顯示末 3 碼' : '學號：完整';
  }
  function tick() {
    const s = Math.max(0, Math.floor((Date.now() - t0) / 1000));
    $('#bTimer').textContent = `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  }

  function render(d) {
    last = d;
    const total = qIds.length || 10;
    $('#bCount').textContent = d.count;
    $('#bAll').textContent = d.players.filter(p => p.solved >= total).length;
    const top = d.players.slice(0, 15);
    $('#bList').innerHTML = top.length ? top.map((p, i) => {
      const rank = i + 1;
      const was = prevRank[p.sid];
      const move = was === undefined ? 'new' : was > rank ? 'up' : was < rank ? 'down' : '';
      const dots = qIds.map(q => {
        const s = p.detail[q] ? p.detail[q].score : -1;
        return `<i class="qd ${s === 100 ? 'full' : s > 0 ? 'part' : s === 0 ? 'zero' : ''}" title="${esc(q)}：${s < 0 ? '未作答' : s + ' 分'}"></i>`;
      }).join('');
      return `<li class="brow ${move} r${rank <= 3 ? rank : ''}">
        <span class="brank">${rank}</span>
        <span class="bname"><b>${esc(p.nick)}</b><small>${esc(showSid(p.sid))}</small></span>
        <span class="bdots">${dots}</span>
        <span class="bsolved">${p.solved}<small>/${total}</small></span>
        <span class="btotal">${p.total}</span>
      </li>`;
    }).join('') + (d.players.length > 15 ? `<li class="board-more">還有 ${d.players.length - 15} 位同學正在努力中…</li>` : '')
      : '<li class="board-empty">等待第一位同學提交…</li>';
    prevRank = {}; d.players.forEach((p, i) => { prevRank[p.sid] = i + 1; });
    const qmap = {}; d.questions.forEach(q => { qmap[q.q] = q; });
    const n = Math.max(1, d.count);
    $('#bQs').innerHTML = qIds.map((id, i) => {
      const q = qmap[id] || { solved: 0, tried: 0 };
      return `<div class="qbar"><span class="qlab">${i + 1}</span><span class="qtrack" title="${esc(qTitle(id))}"><i class="qtry" style="width:${q.tried / n * 100}%"></i><i class="qok" style="width:${q.solved / n * 100}%"></i></span><span class="qnum">${q.solved}</span></div>`;
    }).join('') + '<p class="fineprint"><i class="legend ok"></i>完全正確　<i class="legend try"></i>有作答</p>';
    $('#bUpdated').textContent = '最後更新 ' + new Date().toLocaleTimeString('zh-TW', { hour12: false });
  }

  async function poll() {
    if (!api) return;
    try {
      const url = `${api}${api.includes('?') ? '&' : '?'}action=board&week=${encodeURIComponent(WEEK)}&room=${encodeURIComponent(ROOM)}&t=${Date.now()}`;
      const res = await fetch(url, { cache: 'no-store' });
      const d = await res.json();
      if (d && d.ok) render(d);
    } catch (e) {
      $('#bUpdated').textContent = '連線失敗，稍後重試…';
    }
  }

  function startLoop() {
    $('#bSetup').hidden = true;
    poll(); setInterval(poll, POLL);
  }

  window.addEventListener('DOMContentLoaded', () => {
    header(); tick(); setInterval(tick, 1000);
    $('#bStart').onclick = () => { t0 = Date.now(); localStorage.setItem(T0KEY, String(t0)); tick(); };
    $('#bMask').onclick = () => { mask = !mask; localStorage.setItem('board-mask', mask ? '1' : '0'); header(); if (last) render(last); };
    if (!api) {
      $('#bSetup').hidden = false;
      $('#sGo').onclick = () => { api = $('#sApi').value.trim(); if (!api) return; sessionStorage.setItem('board-api', api); startLoop(); };
    } else startLoop();
  });
})();
