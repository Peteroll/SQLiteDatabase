/* 夜市快送 期中闖關：遊戲、批改工具、驗證腳本共用 */
(function (root) {
  'use strict';
  const SALT = 'nmq-2026-midterm-7c41e9';

  function utf8(str) {
    if (typeof TextEncoder !== 'undefined') return new TextEncoder().encode(str);
    return Uint8Array.from(Buffer.from(str, 'utf8'));
  }

  // 純 JS SHA-256（file:// 下也能用，不依賴 crypto.subtle）
  const K = new Uint32Array([
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2]);
  function sha256(str) {
    const msg = utf8(String(str));
    const len = msg.length;
    const nBlocks = ((len + 9 + 63) >> 6);
    const buf = new Uint8Array(nBlocks * 64);
    buf.set(msg); buf[len] = 0x80;
    const bitLen = len * 8;
    const dv = new DataView(buf.buffer);
    dv.setUint32(buf.length - 4, bitLen >>> 0);
    dv.setUint32(buf.length - 8, Math.floor(bitLen / 0x100000000));
    const H = new Uint32Array([0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19]);
    const W = new Uint32Array(64);
    const rotr = (x, n) => (x >>> n) | (x << (32 - n));
    for (let b = 0; b < nBlocks; b++) {
      for (let i = 0; i < 16; i++) W[i] = dv.getUint32(b * 64 + i * 4);
      for (let i = 16; i < 64; i++) {
        const s0 = rotr(W[i - 15], 7) ^ rotr(W[i - 15], 18) ^ (W[i - 15] >>> 3);
        const s1 = rotr(W[i - 2], 17) ^ rotr(W[i - 2], 19) ^ (W[i - 2] >>> 10);
        W[i] = (W[i - 16] + s0 + W[i - 7] + s1) >>> 0;
      }
      let a = H[0], bb = H[1], c = H[2], d = H[3], e = H[4], f = H[5], g = H[6], h = H[7];
      for (let i = 0; i < 64; i++) {
        const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
        const ch = (e & f) ^ (~e & g);
        const t1 = (h + S1 + ch + K[i] + W[i]) >>> 0;
        const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
        const maj = (a & bb) ^ (a & c) ^ (bb & c);
        const t2 = (S0 + maj) >>> 0;
        h = g; g = f; f = e; e = (d + t1) >>> 0; d = c; c = bb; bb = a; a = (t1 + t2) >>> 0;
      }
      H[0] += a; H[1] += bb; H[2] += c; H[3] += d; H[4] += e; H[5] += f; H[6] += g; H[7] += h;
    }
    return Array.from(H, x => x.toString(16).padStart(8, '0')).join('');
  }

  const toHalf = s => String(s == null ? '' : s)
    .replace(/[\uFF01-\uFF5E]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0))
    .replace(/\u3000/g, ' ').trim();
  const digitsOnly = s => toHalf(s).replace(/[^0-9]/g, '').replace(/^0+(?=\d)/, '');
  function normDate(s) {
    const groups = toHalf(s).match(/\d+/g) || [];
    let mm, dd;
    if (groups.length >= 3) { mm = groups[groups.length - 2]; dd = groups[groups.length - 1]; }
    else if (groups.length === 2) { mm = groups[0]; dd = groups[1]; }
    else if (groups.length === 1) {
      const g = groups[0];
      if (g.length === 8) { mm = g.slice(4, 6); dd = g.slice(6); }
      else if (g.length === 4) { mm = g.slice(0, 2); dd = g.slice(2); }
      else if (g.length === 3) { mm = g.slice(0, 1); dd = g.slice(1); }
      else return '';
    } else return '';
    return '2026-' + String(+mm).padStart(2, '0') + '-' + String(+dd).padStart(2, '0');
  }
  const NORMALIZE = {
    L1: s => toHalf(s).toUpperCase().replace(/\s+/g, ''),
    L2: digitsOnly,
    L3: normDate,
    L4: s => { let t = toHalf(s).replace(/\s+/g, ''); if (t && !t.endsWith('夜市')) t += '夜市'; return t; },
    L5: s => toHalf(s).replace(/\s+/g, '').replace(/時段$/, ''),
    L6: digitsOnly,
    L7: s => {
      const t = toHalf(s).toUpperCase().replace(/\s+/g, '');
      const m = t.match(/^O?(\d+)$/);
      return m ? 'O' + String(+m[1]).padStart(4, '0') : t;
    },
    L8: s => toHalf(s).toLowerCase().replace(/\s+/g, ''),
    F: s => toHalf(s).toUpperCase().replace(/\s+/g, '')
  };
  const LEVEL_KEYS = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'F'];

  function normalize(key, raw) { return (NORMALIZE[key] || (x => toHalf(x)))(raw); }
  function answerHash(version, key, raw) {
    return sha256(SALT + '|v' + version + '|' + key + '|' + normalize(key, raw));
  }
  function versionOf(studentId) {
    const m = toHalf(studentId).match(/(\d)\s*$/);
    return m ? (+m[1]) % 5 : -1;
  }
  function signPayload(payload) { return sha256(SALT + '|report|' + JSON.stringify(payload)); }

  // 期中前沒教過的語法：不擋，只記錄
  const NON_WHITELIST = [
    ['GROUP BY', /\bGROUP\s+BY\b/],
    ['HAVING', /\bHAVING\b/],
    ['SUM()', /\bSUM\s*\(/],
    ['AVG()', /\bAVG\s*\(/],
    ['MAX()', /\bMAX\s*\(/],
    ['MIN()', /\bMIN\s*\(/],
    ['COUNT(欄位/DISTINCT)', /\bCOUNT\s*\(\s*(?!\*\s*\))/],
    ['GROUP_CONCAT()', /\bGROUP_CONCAT\s*\(/],
    ['UNION', /\bUNION\b/],
    ['INTERSECT/EXCEPT', /\b(INTERSECT|EXCEPT)\b/],
    ['子查詢', /\(\s*SELECT\b/],
    ['WITH (CTE)', /^\s*WITH\b/],
    ['EXISTS', /\bEXISTS\b/],
    ['RIGHT/FULL JOIN', /\b(RIGHT|FULL)\s+(OUTER\s+)?JOIN\b/],
    ['視窗函數 OVER', /\bOVER\s*\(/],
    ['日期/字串函數', /\b(STRFTIME|DATE|TIME|DATETIME|JULIANDAY|SUBSTR|SUBSTRING|INSTR|LENGTH|REPLACE|TRIM|UPPER|LOWER)\s*\(/]
  ];
  function stripSql(sql) {
    return String(sql)
      .replace(/--[^\n]*/g, ' ')
      .replace(/\/\*[\s\S]*?\*\//g, ' ')
      .replace(/'(?:[^']|'')*'/g, "''")
      .replace(/"(?:[^"]|"")*"/g, '""')
      .toUpperCase();
  }
  function detectNonWhitelist(sql) {
    const s = stripSql(sql);
    return NON_WHITELIST.filter(([, re]) => re.test(s)).map(([name]) => name);
  }

  const api = { SALT, sha256, normalize, answerHash, versionOf, signPayload, detectNonWhitelist, LEVEL_KEYS, toHalf };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.NMQ = api;
})(typeof window !== 'undefined' ? window : globalThis);
