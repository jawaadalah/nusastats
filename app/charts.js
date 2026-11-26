// NusaStats — chart builders. Plain SVG, no library, no network.
// Every builder returns an SVG string; callers inject it into the page.

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

function niceMax(v) {
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  const n = v / p;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * p;
}

// Vertical bar chart. rows: [{label, value}], valueFmt formats the label on top.
export function barChart(rows, opts = {}) {
  const w = opts.width || 640;
  const h = opts.height || 300;
  const padL = 44, padR = 12, padT = 30, padB = 34;
  const max = niceMax(Math.max(...rows.map((r) => r.value)) * 1.05);
  const iw = w - padL - padR;
  const ih = h - padT - padB;
  const bw = Math.min(64, (iw / rows.length) * 0.62);
  const gap = iw / rows.length;
  const color = opts.color || '#0c3b3e';
  const hi = opts.highlight;
  let s = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.title || 'Grafik batang')}">`;
  for (let g = 0; g <= 4; g++) {
    const y = padT + (ih * g) / 4;
    const v = max * (1 - g / 4);
    s += `<line x1="${padL}" y1="${y}" x2="${w - padR}" y2="${y}" stroke="#e3e0d5" stroke-width="1"/>`;
    s += `<text x="${padL - 6}" y="${y + 4}" text-anchor="end" font-size="11" fill="#5a6b6a">${fmtNum(v)}</text>`;
  }
  rows.forEach((r, i) => {
    const bh = (r.value / max) * ih;
    const x = padL + gap * i + (gap - bw) / 2;
    const y = padT + ih - bh;
    const fill = hi !== undefined && i === hi ? '#e9a319' : color;
    s += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="3" fill="${fill}"/>`;
    s += `<text x="${(x + bw / 2).toFixed(1)}" y="${(y - 6).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="#1c2b2a">${esc(opts.valueFmt ? opts.valueFmt(r.value) : fmtNum(r.value))}</text>`;
    s += `<text x="${(x + bw / 2).toFixed(1)}" y="${h - 12}" text-anchor="middle" font-size="11" fill="#5a6b6a">${esc(r.label)}</text>`;
  });
  return s + '</svg>';
}

// Line chart with dots. rows: [{label, value}].
export function lineChart(rows, opts = {}) {
  const w = opts.width || 640;
  const h = opts.height || 300;
  const padL = 44, padR = 20, padT = 30, padB = 34;
  const vals = rows.map((r) => r.value);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const lo = Math.floor((min - (max - min) * 0.25) * 10) / 10;
  const hi = Math.ceil((max + (max - min) * 0.25) * 10) / 10;
  const iw = w - padL - padR;
  const ih = h - padT - padB;
  const x = (i) => padL + (iw * i) / (rows.length - 1);
  const y = (v) => padT + ih - ((v - lo) / (hi - lo)) * ih;
  const color = opts.color || '#0c3b3e';
  let s = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.title || 'Grafik garis')}">`;
  for (let g = 0; g <= 4; g++) {
    const yy = padT + (ih * g) / 4;
    const v = hi - ((hi - lo) * g) / 4;
    s += `<line x1="${padL}" y1="${yy}" x2="${w - padR}" y2="${yy}" stroke="#e3e0d5" stroke-width="1"/>`;
    s += `<text x="${padL - 6}" y="${yy + 4}" text-anchor="end" font-size="11" fill="#5a6b6a">${fmtNum(v)}</text>`;
  }
  const pts = rows.map((r, i) => `${x(i).toFixed(1)},${y(r.value).toFixed(1)}`).join(' ');
  s += `<polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round"/>`;
  rows.forEach((r, i) => {
    s += `<circle cx="${x(i).toFixed(1)}" cy="${y(r.value).toFixed(1)}" r="4.5" fill="#e9a319" stroke="#fff" stroke-width="1.5"/>`;
    s += `<text x="${x(i).toFixed(1)}" y="${(y(r.value) - 10).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="#1c2b2a">${esc(opts.valueFmt ? opts.valueFmt(r.value) : fmtNum(r.value))}</text>`;
    s += `<text x="${x(i).toFixed(1)}" y="${h - 12}" text-anchor="middle" font-size="11" fill="#5a6b6a">${esc(r.label)}</text>`;
  });
  return s + '</svg>';
}

// Horizontal bars, good for ranked lists and age structure.
export function hbarChart(rows, opts = {}) {
  const w = opts.width || 640;
  const rowH = opts.rowH || 44;
  const h = rowH * rows.length + 16;
  const padL = 150, padR = 64, padT = 8;
  const max = niceMax(Math.max(...rows.map((r) => r.value)) * 1.05);
  const iw = w - padL - padR;
  let s = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.title || 'Grafik batang horizontal')}">`;
  rows.forEach((r, i) => {
    const y = padT + i * rowH;
    const bw = (r.value / max) * iw;
    s += `<text x="${padL - 10}" y="${y + 22}" text-anchor="end" font-size="12" fill="#1c2b2a">${esc(r.label)}</text>`;
    s += `<rect x="${padL}" y="${y + 6}" width="${bw.toFixed(1)}" height="20" rx="3" fill="${opts.color || '#0c3b3e'}"/>`;
    s += `<text x="${padL + bw + 8}" y="${y + 22}" font-size="12" font-weight="700" fill="#1c2b2a">${esc(opts.valueFmt ? opts.valueFmt(r.value) : fmtNum(r.value))}</text>`;
  });
  return s + '</svg>';
}

// Donut chart with a legend. rows: [{label, value}] summing near 100.
export function donutChart(rows, opts = {}) {
  const size = opts.size || 220;
  const c = size / 2;
  const r = c - 18;
  const circ = 2 * Math.PI * r;
  const colors = opts.colors || ['#0c3b3e', '#e9a319', '#7fb069', '#4a7d8c'];
  let off = 0;
  let s = `<svg viewBox="0 0 ${size} ${size}" role="img" aria-label="${esc(opts.title || 'Diagram lingkaran')}">`;
  s += `<circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="#eeeadd" stroke-width="30"/>`;
  rows.forEach((row, i) => {
    const frac = row.value / 100;
    const len = frac * circ;
    s += `<circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="${colors[i % colors.length]}" stroke-width="30" stroke-dasharray="${len.toFixed(1)} ${(circ - len).toFixed(1)}" stroke-dashoffset="${(-off).toFixed(1)}" transform="rotate(-90 ${c} ${c})"/>`;
    off += len;
  });
  s += `<text x="${c}" y="${c - 4}" text-anchor="middle" font-size="22" font-weight="800" fill="#1c2b2a">${esc(opts.center || '')}</text>`;
  s += `<text x="${c}" y="${c + 18}" text-anchor="middle" font-size="11" fill="#5a6b6a">${esc(opts.centerSub || '')}</text></svg>`;
  return s;
}

export function fmtNum(v) {
  if (Math.abs(v) >= 1000) return v.toLocaleString('id-ID', { maximumFractionDigits: 0 });
  if (Number.isInteger(v)) return String(v);
  return v.toLocaleString('id-ID', { maximumFractionDigits: 2 });
}
