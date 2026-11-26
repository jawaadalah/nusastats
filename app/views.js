// NusaStats — page views. Each view returns HTML for one hash route.
// All figures come from data.js; every chart and table names its source.

import {
  HEADLINES, YEARLY, QUARTERLY_2025, POP_CENSUS, AGE_STRUCTURE,
  TPT_SERIES, POVERTY_SERIES, PROV_POVERTY_COUNT, PROV_RATE_HIGH,
  PROV_RATE_LOW, EXPENDITURE_2025, SOURCES, META,
} from './data.js';
import { barChart, lineChart, hbarChart, donutChart, fmtNum } from './charts.js';

function srcLine(text) {
  return `<p class="src">Sumber: ${text}</p>`;
}

function kpiCard(h) {
  return `<article class="kpi"><p class="kpi-label">${h.label}</p>
    <p class="kpi-value">${h.value}</p>
    <p class="kpi-sub">${h.sub}</p>
    <p class="kpi-src">${h.source}</p></article>`;
}

function yearOptions(selected) {
  return YEARLY.map((y) => `<option value="${y.year}"${y.year === selected ? ' selected' : ''}>${y.year}</option>`).join('');
}

export function viewHome(year = 2025) {
  const y = YEARLY.find((r) => r.year === year) || YEARLY[YEARLY.length - 1];
  const gdpRows = YEARLY.map((r) => ({ label: String(r.year), value: r.growth }));
  const hi = YEARLY.findIndex((r) => r.year === y.year);
  return `
  <section class="hero">
    <p class="eyebrow">Portal statistik Indonesia &middot; diperbarui ${META.updated}</p>
    <h1>Indonesia dalam angka, <span>tanpa ribet.</span></h1>
    <p class="lede">Penduduk, ekonomi, pekerjaan, dan kemiskinan — angka resmi terbaru
    dengan sumber dan tahun yang jelas, dalam satu situs yang cepat.</p>
    <p class="hero-cta"><a class="btn" href="#/ekonomi">Lihat ekonomi 2025</a>
    <a class="btn ghost" href="#/daerah">Bandingkan provinsi</a></p>
  </section>
  <section class="grid kpis" aria-label="Indikator utama">${HEADLINES.map(kpiCard).join('')}</section>
  <section class="panel">
    <div class="panel-head"><h2>Pertumbuhan ekonomi, 2021–2025</h2>
      <label class="picker">Tahun sorotan
        <select id="yearPick" data-years>${yearOptions(y.year)}</select></label></div>
    ${barChart(gdpRows, { title: 'Pertumbuhan PDB 2021–2025', highlight: hi, valueFmt: (v) => v.toLocaleString('id-ID') + '%' })}
    <div class="year-facts" id="yearFacts">
      <div><strong>${y.growth.toLocaleString('id-ID')}%</strong><span>Pertumbuhan PDB ${y.year}</span></div>
      <div><strong>Rp ${fmtNum(y.gdp)} T</strong><span>PDB nominal ${y.year}</span></div>
      <div><strong>${y.inflation.toLocaleString('id-ID')}%</strong><span>Inflasi ${y.year}</span></div>
      <div><strong>${y.tpt.toLocaleString('id-ID')}%</strong><span>Pengangguran ${y.year}</span></div>
      <div><strong>${y.poverty.toLocaleString('id-ID')}%</strong><span>Kemiskinan, Mar ${y.year}</span></div>
    </div>
    ${srcLine('BPS, Pendapatan Nasional Indonesia 2021–2025 &amp; Sakernas; inflasi 2025 dari World Bank WDI.')}
  </section>
  <section class="grid two">
    <article class="panel"><h2>Yang paling dicari</h2>
      <ul class="links">
        <li><a href="#/penduduk">Berapa penduduk Indonesia 2025? &rarr;</a></li>
        <li><a href="#/ekonomi">Berapa PDB per kapita Indonesia? &rarr;</a></li>
        <li><a href="#/kerja">Berapa tingkat pengangguran terbaru? &rarr;</a></li>
        <li><a href="#/miskin">Berapa persen penduduk miskin? &rarr;</a></li>
        <li><a href="#/daerah">Provinsi mana paling banyak penduduk miskin? &rarr;</a></li>
      </ul></article>
    <article class="panel"><h2>Tiga angka minggu ini</h2>
      <ul class="notes">
        <li><strong>5,11%</strong> — ekonomi tumbuh sepanjang 2025, naik dari 5,03% pada 2024 (BPS).</li>
        <li><strong>8,47%</strong> — kemiskinan Maret 2025, terendah dalam dua dekade (BPS).</li>
        <li><strong>284,67 juta</strong> — penduduk hasil SUPAS 2025, terbanyak keempat di dunia (BPS).</li>
      </ul>
      <p>${srcLine('BPS, 2025–2026.')}</p></article>
  </section>`;
}

export function viewPopulation(mode = 'census') {
  const census = POP_CENSUS.map((r) => ({ label: String(r.year), value: r.value }));
  const age = AGE_STRUCTURE.map((r) => ({ label: r.label, value: r.value }));
  const chart = mode === 'age'
    ? hbarChart(age, { title: 'Struktur usia 2025', valueFmt: (v) => v.toLocaleString('id-ID') + '%' })
    : barChart(census, { title: 'Penduduk sensus 2010–2025', valueFmt: (v) => v.toLocaleString('id-ID', { maximumFractionDigits: 1 }) + ' jt' });
  return `
  <section class="page-head"><h1>Penduduk</h1>
    <p class="lede">284,67 juta jiwa pada 2025 — negara keempat terpadat di dunia.</p></section>
  <section class="panel">
    <div class="panel-head"><h2>${mode === 'age' ? 'Struktur usia, 2025' : 'Jumlah penduduk, sensus'}</h2>
      <div class="toggle" role="group" aria-label="Jenis grafik">
        <button data-mode="census" class="${mode === 'census' ? 'on' : ''}">Jumlah</button>
        <button data-mode="age" class="${mode === 'age' ? 'on' : ''}">Struktur usia</button>
      </div></div>
    ${chart}
    ${mode === 'age'
      ? srcLine('World Bank, World Development Indicators 2025. Kelompok 65+ mencapai 7,5% — Indonesia mulai menua.')
      : srcLine('BPS, Sensus Penduduk 2010 &amp; 2020; SUPAS 2025.')}
  </section>
  <section class="grid two">
    <article class="panel"><h2>Demografi singkat</h2>
      <dl class="facts">
        <div><dt>Pertumbuhan penduduk</dt><dd>0,78% per tahun (2025)</dd></div>
        <div><dt>Harapan hidup</dt><dd>71,3 tahun (2024)</dd></div>
        <div><dt>Fertilitas</dt><dd>2,12 anak per perempuan (2024)</dd></div>
        <div><dt>Angkatan kerja</dt><dd>147,91 juta orang bekerja (2025)</dd></div>
      </dl>
      ${srcLine('World Bank WDI 2024–2025; BPS Sakernas 2025.')}</article>
    <article class="panel"><h2>Membaca angka ini</h2>
      <p>Pertumbuhan penduduk melambat dari 1,36% (2016) menjadi di bawah 1% —
      bonus demografi masih berjalan karena 68,2% penduduk berusia produktif
      (15–64 tahun). Tantangannya: pekerjaan untuk 147,91 juta orang yang bekerja
      dan layanan kesehatan bagi 7,5% penduduk lanjut usia.</p></article>
  </section>`;
}

export function viewEconomy(kind = 'bar') {
  const rows = YEARLY.map((r) => ({ label: String(r.year), value: r.growth }));
  const q = QUARTERLY_2025.map((r) => ({ label: r.q, value: r.value }));
  const chart = kind === 'line'
    ? lineChart(rows, { title: 'Pertumbuhan PDB 2021–2025', valueFmt: (v) => v.toLocaleString('id-ID') + '%' })
    : barChart(rows, { title: 'Pertumbuhan PDB 2021–2025', valueFmt: (v) => v.toLocaleString('id-ID') + '%' });
  return `
  <section class="page-head"><h1>Ekonomi</h1>
    <p class="lede">PDB Rp 23.821 triliun pada 2025, tumbuh 5,11% — ekonomi terbesar ke-17 dunia.</p></section>
  <section class="panel">
    <div class="panel-head"><h2>Pertumbuhan PDB, 2021–2025</h2>
      <div class="toggle" role="group" aria-label="Jenis grafik">
        <button data-kind="bar" class="${kind === 'bar' ? 'on' : ''}">Batang</button>
        <button data-kind="line" class="${kind === 'line' ? 'on' : ''}">Garis</button>
      </div></div>
    ${chart}
    ${srcLine('BPS, Pendapatan Nasional Indonesia 2021–2025 (rilis 5 Feb 2026).')}
  </section>
  <section class="grid two">
    <article class="panel"><h2>Triwulan 2025 (y-on-y)</h2>
      ${barChart(q, { title: 'Pertumbuhan triwulanan 2025', valueFmt: (v) => v.toLocaleString('id-ID') + '%' })}
      ${srcLine('BPS, BRS No. 102/11/Th. XXVIII, 5 Nov 2025; Tw IV 2025 dari rilis tahunan BPS.')}</article>
    <article class="panel"><h2>PDB menurut pengeluaran, 2025</h2>
      <div class="donut-wrap">${donutChart(EXPENDITURE_2025, { center: '100%', centerSub: 'persen PDB' })}
      <ul class="legend">${EXPENDITURE_2025.map((e, i) => `<li><span class="sw" style="background:${['#0c3b3e', '#e9a319', '#7fb069'][i]}"></span>${e.label} — <strong>${e.value.toLocaleString('id-ID')}%</strong></li>`).join('')}</ul></div>
      ${srcLine('BPS 2025; “Lainnya” mencakup konsumsi pemerintah, ekspor neto, dan LNPRT (sisa agar total 100%).')}</article>
  </section>
  <section class="panel"><h2>PDB per kapita menanjak</h2>
    <p>Rp 83,7 juta per orang pada 2025 (sekitar US$ 5.083), naik dari Rp 78,6 juta
    pada 2024. Dengan paritas daya beli, PDB Indonesia mencapai US$ 5,05 triliun —
    ekonomi terbesar ke-7 dunia dalam ukuran PPP.</p>
    ${srcLine('BPS; World Bank WDI 2025.')}</section>`;
}

export function viewWork() {
  const rows = TPT_SERIES.map((r) => ({ label: String(r.year), value: r.value }));
  return `
  <section class="page-head"><h1>Tenaga Kerja</h1>
    <p class="lede">147,91 juta orang bekerja pada 2025; pengangguran terbuka 4,74%.</p></section>
  <section class="panel">
    <div class="panel-head"><h2>Tingkat Pengangguran Terbuka, 2020–2025</h2></div>
    ${lineChart(rows, { title: 'TPT 2020–2025', valueFmt: (v) => v.toLocaleString('id-ID') + '%' })}
    ${srcLine('BPS, Survei Angkatan Kerja Nasional (Sakernas), seri Agustus.')}
  </section>
  <section class="grid two">
    <article class="panel"><h2>Apa yang berubah</h2>
      <p>TPT turun dari 7,07% pada 2020 — puncak pandemi — menjadi 4,74% pada 2025,
      dengan 9,39 juta pekerja baru dibanding 2015. Penyerapan tenaga kerja ditopang
      kualitas sumber daya manusia dan pertumbuhan ekonomi yang stabil di atas 5%.</p></article>
    <article class="panel"><h2>Angka kunci 2025</h2>
      <dl class="facts">
        <div><dt>Bekerja</dt><dd>147,91 juta orang</dd></div>
        <div><dt>Angkatan kerja</dt><dd>147,1 juta orang (World Bank)</dd></div>
        <div><dt>Partisipasi angkatan kerja</dt><dd>68,0% penduduk 15+</dd></div>
        <div><dt>Pengangguran muda (15–24)</dt><dd>13% (World Bank, 2025)</dd></div>
      </dl>
      ${srcLine('BPS Sakernas 2025; World Bank WDI 2025.')}</article>
  </section>`;
}

export function viewPoverty() {
  const rows = POVERTY_SERIES.map((r) => ({ label: String(r.year), value: r.value }));
  return `
  <section class="page-head"><h1>Kemiskinan</h1>
    <p class="lede">8,47% pada Maret 2025 — 23,85 juta jiwa, terendah dalam dua dekade.</p></section>
  <section class="panel">
    <div class="panel-head"><h2>Tingkat kemiskinan, Maret 2021–2025</h2></div>
    ${barChart(rows, { title: 'Kemiskinan Maret 2021–2025', valueFmt: (v) => v.toLocaleString('id-ID') + '%' })}
    ${srcLine('BPS, Profil Kemiskinan di Indonesia, Maret 2025 (rilis 25 Jul 2025).')}
  </section>
  <section class="grid two">
    <article class="panel"><h2>Garis kemiskinan</h2>
      <p>Rp 609.160 per kapita per bulan pada Maret 2025. Penduduk di bawah garis
      ini berkurang sekitar 200 ribu jiwa dalam enam bulan — dari 24,06 juta
      (September 2024) menjadi 23,85 juta.</p>
      <dl class="facts">
        <div><dt>Gini (ketimpangan)</dt><dd>0,375 (Mar 2025)</dd></div>
        <div><dt>Kemiskinan ekstrem (US$ 3/hari)</dt><dd>3,7% (World Bank, 2025)</dd></div>
      </dl>
      ${srcLine('BPS, Maret 2025; World Bank WDI 2025.')}</article>
    <article class="panel"><h2>Di mana kemiskinan berada</h2>
      <p>Jumlahnya terbesar di Jawa — 12,56 juta jiwa atau 52,66% dari seluruh
      penduduk miskin nasional. Persentasenya tertinggi di timur: Papua Pegunungan
      30,03% dan Papua Tengah 28,90%. Kalimantan paling rendah: 0,89 juta jiwa.</p>
      <p><a href="#/daerah">Lihat tabel provinsi &rarr;</a></p>
      ${srcLine('BPS, Profil Kemiskinan Maret 2025.')}</article>
  </section>`;
}

export function viewRegions(query = '', sortKey = 'count', sortDir = -1) {
  const q = query.trim().toLowerCase();
  let rows = PROV_POVERTY_COUNT.filter((r) => !q || r.prov.toLowerCase().includes(q));
  rows = [...rows].sort((a, b) => (sortKey === 'prov'
    ? a.prov.localeCompare(b.prov, 'id') * sortDir
    : (a.count - b.count) * sortDir));
  const arrow = sortDir === -1 ? ' ▼' : ' ▲';
  return `
  <section class="page-head"><h1>Daerah</h1>
    <p class="lede">Kemiskinan per provinsi, Maret 2025. Ketik untuk mencari, klik judul kolom untuk mengurutkan.</p></section>
  <section class="panel">
    <div class="panel-head"><h2>Provinsi dengan penduduk miskin terbanyak</h2>
      <label class="picker">Cari provinsi
        <input id="provSearch" type="search" placeholder="mis. Jawa" value="${query.replace(/"/g, '&quot;')}" autocomplete="off"></label></div>
    <div class="table-wrap"><table>
      <thead><tr>
        <th><button data-sort="prov">Provinsi${sortKey === 'prov' ? arrow : ''}</button></th>
        <th class="num"><button data-sort="count">Penduduk miskin${sortKey === 'count' ? arrow : ''}</button></th>
      </tr></thead>
      <tbody>${rows.length ? rows.map((r) => `<tr><td>${r.prov}</td><td class="num">${r.count.toLocaleString('id-ID')}</td></tr>`).join('') : '<tr><td colspan="2">Tidak ada provinsi yang cocok.</td></tr>'}</tbody>
    </table></div>
    ${srcLine('BPS, Profil Kemiskinan di Indonesia, Maret 2025.')}
  </section>
  <section class="grid two">
    <article class="panel"><h2>Persentase tertinggi</h2>
      <ol class="rank">${PROV_RATE_HIGH.map((r) => `<li><span>${r.prov}</span><strong>${r.rate.toLocaleString('id-ID')}%</strong></li>`).join('')}</ol>
      ${srcLine('BPS, Maret 2025.')}</article>
    <article class="panel"><h2>Persentase terendah</h2>
      <ol class="rank">${PROV_RATE_LOW.map((r) => `<li><span>${r.prov}</span><strong>${r.rate.toLocaleString('id-ID')}%</strong></li>`).join('')}</ol>
      ${srcLine('BPS, Maret 2025.')}</article>
  </section>`;
}

export function viewMethods() {
  return `
  <section class="page-head"><h1>Metodologi &amp; Sumber</h1>
    <p class="lede">Setiap angka di situs ini berasal dari publikasi resmi. Ini daftar lengkapnya.</p></section>
  <section class="panel"><h2>Dari mana datanya</h2>
    <div class="table-wrap"><table>
      <thead><tr><th>Topik</th><th>Sumber</th><th>Catatan</th></tr></thead>
      <tbody>${SOURCES.map((s) => `<tr><td>${s.topic}</td><td>${s.source}</td><td>${s.detail}</td></tr>`).join('')}</tbody>
    </table></div></section>
  <section class="grid two">
    <article class="panel"><h2>Cara kami menyajikan</h2>
      <ul class="notes">
        <li>Angka dibulatkan ke dua desimal; persen memakai koma desimal Indonesia.</li>
        <li>Tahun di tiap grafik adalah tahun data, bukan tahun publikasi.</li>
        <li>“Lainnya” pada diagram pengeluaran adalah sisa aritmetik agar total 100%.</li>
        <li>Situs ini statis: tidak ada pelacakan, tidak ada data yang diambil dari server lain.</li>
      </ul></article>
    <article class="panel"><h2>Unduh datanya</h2>
      <p>Seluruh angka pada situs ini tersedia sebagai CSV untuk dipakai ulang.</p>
      <p><a class="btn" href="data.csv" download>Unduh data.csv</a></p>
      <p class="src">Lisensi data: angka BPS &amp; World Bank dikutip dengan sumber; pengolahan oleh NusaStats.</p></article>
  </section>`;
}
