// NusaStats — hash router. One route per section; links are plain anchors,
// so every page is reachable by link and the back button works.

import {
  viewHome, viewPopulation, viewEconomy, viewWork, viewPoverty,
  viewRegions, viewMethods,
} from './views.js';

export const ROUTES = [
  { path: '', label: 'Beranda', view: viewHome },
  { path: 'penduduk', label: 'Penduduk', view: viewPopulation },
  { path: 'ekonomi', label: 'Ekonomi', view: viewEconomy },
  { path: 'kerja', label: 'Tenaga Kerja', view: viewWork },
  { path: 'miskin', label: 'Kemiskinan', view: viewPoverty },
  { path: 'daerah', label: 'Daerah', view: viewRegions },
  { path: 'metode', label: 'Metodologi', view: viewMethods },
];

export function parseHash(hash) {
  const raw = (hash || '#/').replace(/^#\/?/, '');
  const [path, query] = raw.split('?');
  const params = new URLSearchParams(query || '');
  return { path, params };
}

export function currentRoute(hash) {
  const { path } = parseHash(hash);
  return ROUTES.find((r) => r.path === path) || ROUTES[0];
}
