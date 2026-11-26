// NusaStats — data layer. Every figure carries its source and year.
// Figures are hard numbers from BPS (Statistics Indonesia) releases and
// the World Bank's World Development Indicators, as published in 2025–2026.
// Nothing here is fetched at run time: the site is fully static.

export const META = {
  country: 'Indonesia',
  updated: '26 November 2026',
  currency: 'Rupiah (Rp)',
  note: 'Angka dibulatkan dari publikasi resmi; lihat halaman Metodologi untuk sumber tiap seri.',
};

// Headline indicators shown on the home page.
export const HEADLINES = [
  { key: 'pop', label: 'Penduduk', value: '284,67 jt', sub: 'Jiwa, 2025', source: 'BPS, SUPAS 2025' },
  { key: 'gdp', label: 'PDB nominal', value: 'Rp 23.821 T', sub: 'Harga berlaku, 2025', source: 'BPS, Pendapatan Nasional 2021–2025' },
  { key: 'growth', label: 'Pertumbuhan ekonomi', value: '5,11%', sub: 'Tahun 2025 (y-on-y)', source: 'BPS, rilis 5 Feb 2026' },
  { key: 'gdpCap', label: 'PDB per kapita', value: 'Rp 83,7 jt', sub: '≈ US$ 5.083, 2025', source: 'BPS, Pendapatan Nasional 2021–2025' },
  { key: 'infl', label: 'Inflasi', value: '1,9%', sub: 'Harga konsumen, 2025', source: 'World Bank, WDI 2025' },
  { key: 'tpt', label: 'Pengangguran terbuka', value: '4,74%', sub: 'TPT, 2025', source: 'BPS, Sakernas 2025' },
  { key: 'poor', label: 'Penduduk miskin', value: '8,47%', sub: '23,85 jt jiwa, Mar 2025', source: 'BPS, Profil Kemiskinan Mar 2025' },
  { key: 'life', label: 'Harapan hidup', value: '71,3 thn', sub: 'Saat lahir, 2024', source: 'World Bank, WDI 2024' },
];

// Yearly table used by the home year-picker and the Economy page.
// gdp: Rp triliun, harga berlaku. growth/inflation in percent.
export const YEARLY = [
  { year: 2021, growth: 3.70, gdp: 16977, inflation: 1.87, tpt: 6.49, poverty: 10.14 },
  { year: 2022, growth: 5.31, gdp: 19588, inflation: 5.51, tpt: 5.86, poverty: 9.54 },
  { year: 2023, growth: 5.05, gdp: 20983, inflation: 2.61, tpt: 5.32, poverty: 9.36 },
  { year: 2024, growth: 5.03, gdp: 22074, inflation: 1.57, tpt: 4.91, poverty: 9.03 },
  { year: 2025, growth: 5.11, gdp: 23821, inflation: 1.90, tpt: 4.74, poverty: 8.47 },
];

// Quarterly GDP growth 2025 (y-on-y, percent). Source: BPS BRS No. 102/11/Th. XXVIII.
export const QUARTERLY_2025 = [
  { q: 'Tw I', value: 4.87 },
  { q: 'Tw II', value: 5.12 },
  { q: 'Tw III', value: 5.04 },
  { q: 'Tw IV', value: 5.39 },
];

// Census population (millions). Source: BPS Sensus Penduduk 2010 & 2020, SUPAS 2025.
export const POP_CENSUS = [
  { year: 2010, value: 237.6 },
  { year: 2020, value: 270.2 },
  { year: 2025, value: 284.7 },
];

// Age structure 2025 (percent of population). Source: World Bank, WDI 2025.
export const AGE_STRUCTURE = [
  { label: '0–14 tahun', value: 24.3 },
  { label: '15–64 tahun', value: 68.2 },
  { label: '65 tahun ke atas', value: 7.5 },
];

// Open unemployment rate, August series (percent). Source: BPS, Sakernas.
export const TPT_SERIES = [
  { year: 2020, value: 7.07 },
  { year: 2021, value: 6.49 },
  { year: 2022, value: 5.86 },
  { year: 2023, value: 5.32 },
  { year: 2024, value: 4.91 },
  { year: 2025, value: 4.74 },
];

// Poverty rate, March series (percent). Source: BPS, Profil Kemiskinan.
export const POVERTY_SERIES = [
  { year: 2021, value: 10.14 },
  { year: 2022, value: 9.54 },
  { year: 2023, value: 9.36 },
  { year: 2024, value: 9.03 },
  { year: 2025, value: 8.47 },
];

// Provinces with the most poor people, March 2025 (people). Source: BPS.
export const PROV_POVERTY_COUNT = [
  { prov: 'Jawa Timur', count: 3875880 },
  { prov: 'Jawa Barat', count: 3654740 },
  { prov: 'Jawa Tengah', count: 3366690 },
  { prov: 'Sumatera Utara', count: 1140250 },
  { prov: 'Nusa Tenggara Timur', count: 1088780 },
  { prov: 'Sumatera Selatan', count: 919600 },
  { prov: 'Lampung', count: 887020 },
  { prov: 'Banten', count: 772780 },
  { prov: 'Aceh', count: 704690 },
  { prov: 'Sulawesi Selatan', count: 698130 },
];

// Highest and lowest provincial poverty rates, March 2025 (percent). Source: BPS.
export const PROV_RATE_HIGH = [
  { prov: 'Papua Pegunungan', rate: 30.03 },
  { prov: 'Papua Tengah', rate: 28.90 },
  { prov: 'Papua Barat', rate: 20.66 },
  { prov: 'Papua Selatan', rate: 19.71 },
  { prov: 'Nusa Tenggara Timur', rate: 18.60 },
];
export const PROV_RATE_LOW = [
  { prov: 'Bali', rate: 3.72 },
  { prov: 'Kalimantan Selatan', rate: 3.84 },
  { prov: 'DKI Jakarta', rate: 4.28 },
];

// GDP by expenditure, 2025 (percent of GDP). Source: BPS; "Lainnya" is the
// residual (government consumption, net exports, NPISH) so the shares sum to 100.
export const EXPENDITURE_2025 = [
  { label: 'Konsumsi rumah tangga', value: 53.88 },
  { label: 'Investasi (PMTB)', value: 28.77 },
  { label: 'Lainnya', value: 17.35 },
];

// Method notes shown on the Metodologi page.
export const SOURCES = [
  { topic: 'Penduduk', source: 'BPS — Sensus Penduduk 2010 & 2020; Survei Penduduk Antar Sensus (SUPAS) 2025', detail: 'Jumlah penduduk pertengahan tahun 2025: 284,67 juta jiwa.' },
  { topic: 'PDB & pertumbuhan', source: 'BPS — Pendapatan Nasional Indonesia 2021–2025; Berita Resmi Statistik No. 102/11/Th. XXVIII, 5 Nov 2025', detail: 'PDB harga berlaku 2025 Rp 23.821 triliun; tumbuh 5,11% (y-on-y). Triwulan III 2025 tumbuh 5,04%.' },
  { topic: 'Inflasi', source: 'BPS — Indeks Harga Konsumen (Desember ke Desember); World Bank WDI 2025', detail: 'Inflasi tahunan 2025: 1,9% (World Bank). Seri 2021–2024 mengikuti IHK Desember BPS.' },
  { topic: 'Ketenagakerjaan', source: 'BPS — Survei Angkatan Kerja Nasional (Sakernas), Agustus', detail: 'Tingkat Pengangguran Terbuka turun dari 7,07% (2020) menjadi 4,74% (2025). Bekerja 2025: 147,91 juta orang.' },
  { topic: 'Kemiskinan', source: 'BPS — Profil Kemiskinan di Indonesia, Maret 2025', detail: '8,47% (23,85 juta jiwa), garis kemiskinan Rp 609.160 per kapita per bulan. Terendah dalam dua dekade.' },
  { topic: 'Perbandingan dunia', source: 'World Bank — World Development Indicators, edisi November 2026', detail: 'PDB US$ 1,45 triliun (peringkat 17 dunia), PDB per kapita US$ 5.060, harapan hidup 71,3 tahun.' },
];
