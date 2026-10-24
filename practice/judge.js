/* SQL 課堂練習：結果集比對判分（瀏覽器與 Node 共用）
   不比較 SQL 寫法，只比較「查出來的結果」：欄位依值對應（別名、欄位順序不影響），列以多重集合比對。 */
(function (root) {
  'use strict';

  function normNum(n) {
    if (!isFinite(n)) return String(n);
    if (Number.isInteger(n)) return String(n);
    return String(Math.round(n * 100) / 100);
  }
  function norm(v) {
    if (v === null || v === undefined) return '∅';
    if (typeof v === 'number') return normNum(v);
    if (typeof v === 'bigint') return String(v);
    if (v instanceof Uint8Array) return '<blob ' + v.length + '>';
    const s = String(v).trim();
    if (/^-?\d+(\.\d+)?$/.test(s)) return normNum(Number(s));
    return s;
  }
  const SEP = '\u0001';

  function multisetOverlap(a, b) {
    const m = new Map();
    a.forEach(k => m.set(k, (m.get(k) || 0) + 1));
    let hit = 0;
    b.forEach(k => { const c = m.get(k) || 0; if (c > 0) { hit++; m.set(k, c - 1); } });
    return hit;
  }

  /* expected / actual: { columns: [...], values: [[...], ...] }
     回傳 { score: 0~100, correct: bool, notes: [...] } */
  function judge(expected, actual, opts) {
    opts = opts || {};
    const notes = [];
    const E = expected.values.map(r => r.map(norm));
    const A = (actual.values || []).map(r => r.map(norm));
    const ec = expected.columns.length;
    const ac = (actual.columns || []).length;

    if (!ac) return { score: 0, correct: false, notes: ['沒有查詢結果（最後一句要是 SELECT）'] };

    // 1) 欄位對應：每個預期欄位找「值重疊最多」、尚未用過的實際欄位
    const colVals = (rows, j) => rows.map(r => r[j]);
    const colOverlap = (a, b) => { const d = Math.max(a.length, b.length); return d ? multisetOverlap(a, b) / d : 1; };
    const used = new Set();
    const map = [], colScore = [];
    for (let j = 0; j < ec; j++) {
      const ev = colVals(E, j);
      let k = -1, best = -1;
      for (let c = 0; c < ac; c++) {
        if (used.has(c)) continue;
        const o = colOverlap(ev, colVals(A, c));
        if (o > best) { best = o; k = c; }
      }
      if (k >= 0 && best > 0) { used.add(k); map.push(k); colScore.push(best); } else { map.push(-1); colScore.push(0); }
    }
    const mapped = colScore.filter(s => s === 1).length;
    const P = A.map(r => map.map(k => (k >= 0 ? r[k] : '∅missing')));

    // 2) 列比對（多重集合）
    const ek = E.map(r => r.join(SEP));
    const pk = P.map(r => r.join(SEP));
    const denom = Math.max(ek.length, pk.length);
    const overlap = denom ? multisetOverlap(ek, pk) / denom : 1;

    // 3) 分數：全對才 100；否則欄位對應程度與列重疊各占一半
    const avgCol = ec ? colScore.reduce((s, x) => s + x, 0) / ec : 1;
    let score = overlap === 1 && mapped === ec ? 100 : 100 * (0.5 * avgCol + 0.5 * overlap);
    if (ac !== ec) notes.push(`欄位數：預期 ${ec} 個，你的有 ${ac} 個`);
    if (mapped < ec) notes.push(`有 ${ec - mapped} 個欄位的值和答案不完全相同`);
    if (ek.length !== pk.length) notes.push(`列數：預期 ${ek.length} 列，你的有 ${pk.length} 列`);
    if (overlap < 1 && overlap > 0) notes.push(`列的內容符合約 ${Math.round(overlap * 100)}%`);
    if (score >= 100 && ac > ec) { score = 95; notes.push('結果正確，但多了不需要的欄位'); }

    if (opts.ordered && overlap === 1 && mapped === ec) {
      const orderOk = ek.every((k, i) => k === pk[i]);
      if (!orderOk) { score = Math.min(score, 85); notes.push('資料都對，但排序不正確'); }
    }
    score = Math.max(0, Math.min(100, Math.round(score)));
    const correct = score === 100;
    if (correct) notes.unshift('完全正確！');
    return { score, correct, notes };
  }

  // 輕度混淆（避免直接在原始碼看到答案）
  const KEY = 'nmq-practice';
  function decode(s) {
    let bin;
    if (typeof atob === 'function') bin = atob(s);
    else bin = Buffer.from(s, 'base64').toString('binary');
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i) ^ KEY.charCodeAt(i % KEY.length);
    const txt = typeof TextDecoder !== 'undefined' ? new TextDecoder().decode(bytes) : Buffer.from(bytes).toString('utf8');
    return JSON.parse(txt);
  }
  function encode(obj) {
    const bytes = Buffer.from(JSON.stringify(obj), 'utf8');
    for (let i = 0; i < bytes.length; i++) bytes[i] ^= KEY.charCodeAt(i % KEY.length);
    return bytes.toString('base64');
  }

  const api = { judge, norm, decode, encode };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.PJudge = api;
})(typeof window !== 'undefined' ? window : globalThis);
