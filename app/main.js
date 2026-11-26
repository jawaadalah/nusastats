// NusaStats — bootstrap. Renders the current route, wires its controls,
// and keeps the nav in sync. No network, no storage, no cookies.

import { ROUTES, parseHash, currentRoute } from './router.js';
import { viewHome, viewPopulation, viewEconomy, viewRegions } from './views.js';
import { YEARLY } from './data.js';

const app = document.getElementById('app');
const nav = document.getElementById('nav');

function navHtml(active) {
  return ROUTES.map((r) => `<a href="#/${r.path}"${r.path === active ? ' aria-current="page"' : ''}>${r.label}</a>`).join('');
}

function yearFacts(year) {
  const y = YEARLY.find((r) => r.year === year) || YEARLY[YEARLY.length - 1];
  const fmt = (v) => v.toLocaleString('id-ID');
  return `
    <div><strong>${fmt(y.growth)}%</strong><span>Pertumbuhan PDB ${y.year}</span></div>
    <div><strong>Rp ${fmt(y.gdp)} T</strong><span>PDB nominal ${y.year}</span></div>
    <div><strong>${fmt(y.inflation)}%</strong><span>Inflasi ${y.year}</span></div>
    <div><strong>${fmt(y.tpt)}%</strong><span>Pengangguran ${y.year}</span></div>
    <div><strong>${fmt(y.poverty)}%</strong><span>Kemiskinan, Mar ${y.year}</span></div>`;
}

function render() {
  const { path, params } = parseHash(location.hash);
  const route = currentRoute(location.hash);
  nav.innerHTML = navHtml(route.path);
  if (path === '') {
    const year = Number(params.get('year') || 2025);
    app.innerHTML = viewHome(year);
    const pick = document.getElementById('yearPick');
    pick.addEventListener('change', () => {
      const y = Number(pick.value);
      document.getElementById('yearFacts').innerHTML = yearFacts(y);
      history.replaceState(null, '', `#/?year=${y}`);
    });
  } else if (path === 'penduduk') {
    const mode = params.get('mode') === 'age' ? 'age' : 'census';
    app.innerHTML = viewPopulation(mode);
    app.querySelectorAll('[data-mode]').forEach((b) => b.addEventListener('click', () => {
      location.hash = `#/penduduk?mode=${b.dataset.mode}`;
    }));
  } else if (path === 'ekonomi') {
    const kind = params.get('kind') === 'line' ? 'line' : 'bar';
    app.innerHTML = viewEconomy(kind);
    app.querySelectorAll('[data-kind]').forEach((b) => b.addEventListener('click', () => {
      location.hash = `#/ekonomi?kind=${b.dataset.kind}`;
    }));
  } else if (path === 'daerah') {
    const query = params.get('q') || '';
    const sortKey = params.get('sort') === 'prov' ? 'prov' : 'count';
    const sortDir = params.get('dir') === 'asc' ? 1 : -1;
    app.innerHTML = viewRegions(query, sortKey, sortDir);
    const search = document.getElementById('provSearch');
    search.addEventListener('input', () => {
      const q = new URLSearchParams(location.hash.split('?')[1] || '');
      q.set('q', search.value);
      history.replaceState(null, '', `#/daerah?${q.toString()}`);
      const rows = document.querySelectorAll('tbody tr');
      const needle = search.value.trim().toLowerCase();
      rows.forEach((tr) => {
        tr.style.display = tr.textContent.toLowerCase().includes(needle) ? '' : 'none';
      });
    });
    app.querySelectorAll('[data-sort]').forEach((b) => b.addEventListener('click', () => {
      const key = b.dataset.sort;
      const dir = sortKey === key && sortDir === -1 ? 'asc' : 'desc';
      location.hash = `#/daerah?sort=${key}&dir=${dir}${query ? `&q=${encodeURIComponent(query)}` : ''}`;
    }));
  } else {
    app.innerHTML = route.view();
  }
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);
render();
