/**
 * Synthesis Engine for DiverDea
 * Core logic for idea generation and AI prompt building.
 *
 * Changelog:
 * - Internalized categoryFocusMap into _categoryConfigs (single source of truth)
 * - Extracted _sharedDirectives to eliminate cross-category duplication
 * - Trimmed boilerplate: removed redundant/unverifiable instructions
 * - Language consistency: generatePrompt = Bahasa Indonesia, generateMasterPrompt = English
 */

// =============================================================================
// SHARED DIRECTIVES (applied to all non-game categories)
// Extracted to eliminate duplication across category configs.
// =============================================================================

const _sharedDirectives = {
  dataAndAssets: `- **Data:** Sertakan minimal 20 entri data realistis yang relevan dengan konteks aplikasi.
- **Icons:** Gunakan Lucide Icons secara konsisten di seluruh UI.
- **Images:** Gunakan \`picsum.photos\` atau \`placehold.co\` untuk dummy image. Dilarang Unsplash API.`,

  persistenceAndSettings: `- **Data Persistence:** Simpan state aplikasi ke LocalStorage secara real-time.
- **Global Settings Menu:** Sediakan menu Settings (ikon gear) dengan opsi: Dark/Light Mode, Sound Toggle, dan Clear Data.`,

  accessibility: `- **A11y:** Gunakan semantik HTML5 dan ARIA roles. Pastikan rasio kontras warna memadai.
- **Error Handling:** Implementasikan "Graceful Failure" — tampilkan fallback UI yang tetap estetik saat terjadi error.`,

  microInteractions: `- **Micro-interactions:** Setiap interaksi (hover, focus, active, success, error) harus memiliki animasi GSAP yang halus (durasi 0.3s–0.5s).
- **Onboarding:** Tampilkan panduan visual singkat (max 4 langkah) saat pertama kali aplikasi di-load.`,
};

const _sharedGameDirectives = {
  assetsAndPersistence: `- **Asset Generation:** Hasilkan semua visual secara prosedural (Canvas API, primitive shapes). Dilarang external URL untuk sprite/texture.
- **Data Persistence:** Simpan High Score, Save State, dan preferensi ke LocalStorage secara real-time.`,

  settingsOverlay: `- **Global Settings Overlay:** Sediakan overlay Settings (ikon gear) untuk Sound Toggle, Fullscreen, dan Reset State.`,

  performance: `- **Performance:** Kode WAJIB stabil di 60 FPS tanpa memory leak atau garbage collection spikes.`,
};

// =============================================================================
// CATEGORY CONFIGS
// Each entry contains: role, focus (domain psychology/expertise), directives (specific to category)
// =============================================================================

const _categoryConfigs = {
  'Productivity': {
    role: 'Principal Workflow & Systems Architect',
    focus: 'Rancang untuk mengurangi cognitive load dan memaksimalkan flow state. Pengguna produktif menghargai kecepatan dan kontrol penuh atas task mereka.',
    directives: [
      '**STATE MANAGEMENT:** Implementasikan state terpusat untuk siklus hidup task (CRUD + Undo/Redo) menggunakan Command Pattern.',
      '**KEYBOARD-FIRST UX:** Wajib global hotkey (Ctrl+K untuk Command Palette, Esc untuk blur, Arrow keys untuk navigasi list). Implementasikan focus-trap untuk modal.',
      '**LAYOUT:** Desain high-density Bento Grid atau Eisenhower Matrix dengan visual cue prioritas yang jelas.',
      '**PERFORMANCE:** Gunakan Virtual Scrolling untuk daftar panjang. Implementasikan optimistic update untuk status toggle.',
      '**GAMIFIKASI:** Tambahkan streak counter atau "Productivity Pulse" dengan animasi GSAP saat task diselesaikan berturut-turut.',
      '**OPERASI DATA:** Dukung batch editing, drag-and-drop reordering (SortableJS), dan filter lanjutan.',
    ],
  },

  'Game 2D': {
    role: 'Principal Game Architect & Creative Technologist',
    focus: 'Bangun dopamine loop yang adiktif. Pemain harus merasakan agency dan progression yang jelas setiap sesi bermain.',
    directives: [
      '**SCENE ARCHITECTURE:** Gunakan ES6 Classes untuk semua scene: `class NamaScene extends Phaser.Scene`. Pisahkan ke 3 scene: BootScene, PlayScene, GameOverScene.',
      '**PIXEL ART:** Definisikan semua sprite sebagai JS Matrix (2D Array) dengan Color Palette Dictionary (angka → hex). Gambar menggunakan `Phaser.Graphics` + `fillRect`, lalu `generateTexture()` di BootScene.',
      '**INPUT & COLLISION:** Gunakan `createCursorKeys()` untuk polling input di `update()`. Gunakan `this.physics.add.collider()` — dilarang menulis rumus fisika manual.',
      '**ENVIRONMENT:** Background dilarang kosong/hitam. Buat elemen prosedural yang estetik (bintang bergerak, parallax, grid neon) sesuai konsep game.',
      '**PROGRESSION:** Terapkan kurva kesulitan dinamis (kecepatan/spawn rate naik seiring waktu). Implementasikan Combo Multiplier dan Power-Ups acak.',
      '**AUDIO:** Gunakan Web Audio API (`OscillatorNode`) untuk semua efek suara. Inisialisasi `AudioContext` saat pemain menekan "Start".',
      '**CONTROLS:** Desktop-only. Keyboard (WASD/Arrows/Space) dan Mouse. Dilarang kontrol sentuh.',
    ],
  },

  'Social': {
    role: 'Principal Social Architecture & Growth Engineer',
    focus: 'Rancang untuk membangun kepercayaan dan koneksi antarpengguna. Setiap interaksi sosial harus terasa instan dan bermakna.',
    directives: [
      '**INTERACTION ARCHITECTURE:** Implementasikan Event-Driven system untuk semua aksi sosial (Like, Follow, Post) dengan optimistic UI update.',
      '**ENGAGEMENT LOOP:** Gunakan animasi berbasis fisika (GSAP) untuk notifikasi. Tampilkan "Social Proof" (view counter, activity heatmap).',
      '**CONTENT FEED:** Desain infinite scroll dengan kartu rich-media. Implementasikan Lazy Loading untuk gambar.',
      '**IDENTITAS:** Navigasi berbasis profil dengan badge verified yang menonjol dan tema yang dapat dikustomisasi.',
      '**KEAMANAN:** Tampilkan visual cue E2EE dan sediakan alur pelaporan/pemblokiran yang jelas.',
      '**SOCIAL GRAPH:** Visualisasikan koneksi dengan tampilan node sederhana atau grid "Mutual Friends".',
    ],
  },

  'Fintech': {
    role: 'Principal Fintech Security & Data Architect',
    focus: 'Kepercayaan adalah produk utama. Setiap elemen UI harus memperkuat rasa aman dan transparansi kepada pengguna.',
    directives: [
      '**PRESISI DATA:** Gunakan Dinero.js untuk semua kalkulasi moneter. Implementasikan currency masking dengan Cleave.js.',
      '**KEAMANAN UX:** Desain UI "Security-First" dengan trust signal yang menonjol, modal PIN entry yang aman, dan simulasi biometrik (animasi Lottie).',
      '**ANALITIK:** Buat trend chart interaktif menggunakan Chart.js dengan indikator warna gain/loss dinamis (berbasis HSL).',
      '**ALUR TRANSAKSI:** Implementasikan "Wizard" multi-step untuk transfer dengan langkah konfirmasi yang jelas dan loading skeleton.',
      '**LOG:** Jaga riwayat transaksi yang dapat dicari di LocalStorage dengan opsi export (CSV/JSON).',
      '**AKSESIBILITAS:** Rasio kontras tinggi untuk semua metrik finansial. Touch target besar untuk tombol "Kirim/Bayar".',
    ],
  },

  'Health': {
    role: 'Principal Health-Tech & Calm UI Specialist',
    focus: 'Desain untuk mengurangi kecemasan dan membangun kebiasaan positif. Pengguna datang saat mereka rentan — UI harus terasa seperti teman, bukan klinik.',
    directives: [
      '**SISTEM DESAIN TENANG:** Gunakan palet warna desaturasi yang harmonis. Implementasikan elemen UI "Bernapas" (pulsa opacity/scale lambat).',
      '**ARSITEKTUR KEBIASAAN:** Fokus pada "Kemenangan Kecil" dengan visual progress streak dan animasi reward perayaan (canvas-confetti).',
      '**PRIVASI DATA:** Tambahkan mode visual "Private Vault". Data sensitif disamarkan di UI kecuali secara eksplisit di-toggle.',
      '**AKSESIBILITAS:** Tipografi besar dan mudah dibaca untuk metrik kesehatan. Simulasi voice-to-text untuk input data cepat.',
      '**TREN INTERAKTIF:** Gunakan Rough.js untuk chart "Sketchy/Organik" yang terasa manusiawi.',
      '**DARURAT UX:** Tombol "Quick Action" atau SOS yang menonjol, tidak ambigu, dan mengoverride navigasi standar.',
    ],
  },

  'Education': {
    role: 'Principal Learning Architect & EdTech Engineer',
    focus: 'Belajar efektif terjadi saat pengguna merasakan progress yang nyata. Rancang untuk Active Recall, bukan passive consumption.',
    directives: [
      '**ARSITEKTUR PENGETAHUAN:** Implementasikan "Skill Tree" atau peta progres berbasis jalur. Gunakan logika Spaced Repetition (SRS) untuk flashcard.',
      '**ACTIVE RECALL:** Desain modul kuis tergamifikasi dengan feedback loop instan. Gunakan Tone.js untuk audio cue "Berhasil/Gagal".',
      '**INTERAKTIVITAS:** Bangun diagram interaktif atau mekanik "Learning by Doing" (Drag-to-Order, Spot-the-Error).',
      '**XP & LEVELING:** Sistem leveling dengan momen unlock yang merayakan pencapaian menggunakan animasi GSAP "Badge Reveal".',
      '**KONTEN:** Gunakan progressive disclosure — tampilkan pelajaran selangkah demi selangkah.',
      '**KOLABORASI:** Implementasikan UI simulasi "Study Buddy" atau peer-review dengan placeholder feedback berbasis AI.',
    ],
  },

  'E-commerce': {
    role: 'Principal Conversion & E-commerce Architect',
    focus: 'Setiap pixel adalah peluang konversi. Minimalkan gesekan di checkout dan maksimalkan kepercayaan di halaman produk.',
    directives: [
      '**CORONG KONVERSI:** Desain simulasi checkout "One-Click". Minimalkan gesekan dengan logika auto-fill dan form field seminimal mungkin.',
      '**SOCIAL PROOF:** Integrasikan "Sales Popup" real-time, rating pelanggan, dan indikator kelangkaan "Stok Terbatas" yang dinamis.',
      '**VISUAL COMMERCE:** Galeri gambar dengan zoom PhotoSwipe. Implementasikan simulasi "3D Try-on" atau AR-preview.',
      '**PENCARIAN:** Implementasikan "Instant Search" dengan preview gambar dan filter kategori yang dinamis.',
      '**KEPERCAYAAN:** Badge "Verified Seller" yang menonjol dan modal kebijakan pengiriman/pengembalian yang transparan.',
      '**RETENSI:** Dashboard "Loyalty Points" dan slider horizontal "Recently Viewed" yang dipersonalisasi.',
    ],
  },

  'Utility': {
    role: 'Principal Systems & Tooling Engineer',
    focus: 'Pengguna utility tools menghargai kecepatan, keandalan, dan kontrol. Hilangkan semua yang tidak fungsional.',
    directives: [
      '**KECEPATAN:** Fokus pada pemrosesan client-side berat (konversi file, kompresi). Gunakan Web Workers untuk UI non-blocking.',
      '**INTEGRITAS DATA:** Error handling solid (try/catch) dengan pesan error yang jelas dan actionable, serta fallback state.',
      '**HIGH-DENSITY UI:** Maksimalkan real estate informasi. Gunakan sidebar yang bisa disembunyikan dan antarmuka tool bertab.',
      '**PERSISTENSI:** Auto-save wajib dan riwayat sesi lokal. Implementasikan sistem "Drafts" di LocalStorage.',
      '**POWER TOOLS:** Sediakan tampilan "Raw Data" atau JSON editor untuk pengguna mahir. Dukung input bergaya CLI.',
      '**PROGRESS:** Progress bar real-time yang presisi untuk semua operasi async.',
    ],
  },

  'Services': {
    role: 'Principal Service-Flow & Logistics Architect',
    focus: 'Kepercayaan dibangun melalui transparansi status dan komunikasi yang proaktif. Pengguna ingin tahu "di mana" layanan mereka setiap saat.',
    directives: [
      '**BOOKING:** Penjadwalan berbasis kalender yang mulus dengan logika ketersediaan slot real-time.',
      '**LOGISTIK UX:** Integrasikan peta interaktif (Leaflet.js) untuk pengecekan area layanan dan pelacakan penyedia.',
      '**KEPERCAYAAN:** Profil penyedia layanan dengan portofolio, testimoni, dan metrik "Trust Score".',
      '**TIMELINE STATUS:** Timeline vertikal visual untuk progres layanan (Permintaan → Dikonfirmasi → Berlangsung → Selesai).',
      '**KOMUNIKASI:** Simulasi "Chat dengan Penyedia" real-time dengan template quick-reply.',
      '**PEMBAYARAN:** Invoicing yang jelas dengan visual cue "Pembayaran Ditahan dalam Escrow" hingga layanan selesai.',
    ],
  },

  'Creative': {
    role: 'Principal Creative Tools & Graphics Architect',
    focus: 'Alat kreatif harus invisible — pengguna tidak boleh memikirkan toolnya, hanya idenya. Rancang untuk flow state.',
    directives: [
      '**CANVAS ARCHITECTURE:** Implementasikan sistem gambar multi-layer. Gunakan Paper.js untuk manipulasi vektor.',
      '**NON-DESTRUKTIF:** Undo/Redo stack wajib. Implementasikan logika bergaya "Adjustment Layers".',
      '**TOOLING UX:** Tool palette mengambang yang bisa disembunyikan. Implementasikan "Zen Mode" untuk fokus eksklusif pada canvas.',
      '**MANAJEMEN ASET:** Pustaka preset, tekstur, dan kuas yang kaya. Dukung drag-and-drop untuk aset eksternal.',
      '**EKSPOR:** Berbagai format ekspor (PNG, SVG, JSON). Implementasikan simulasi render resolusi tinggi.',
      '**INSPIRASI:** Panel "Moodboard" terintegrasi yang menghasilkan palet warna berdasarkan canvas saat ini.',
    ],
  },

  'Game 3D': {
    role: 'Principal 3D Game Architect & WebGL Engineer',
    focus: 'Immersion adalah segalanya. Pemain harus lupa bahwa mereka sedang di browser.',
    directives: [
      '**ENGINE:** Wajib gunakan Babylon.js (via CDN). Inisialisasi engine dan scene dengan standar Babylon.',
      '**PHYSICS:** Gunakan HavokPlugin atau built-in Babylon physics. Manfaatkan `UniversalCamera` dengan `checkCollisions` dan `applyGravity`.',
      '**OPTIMIZATION:** Gunakan `InstancedMesh` untuk objek yang banyak (peluru, musuh). Hindari deeply nested parent di scene graph.',
      '**CONTROLS:** Implementasikan Pointer Lock API untuk kontrol bergaya FPS yang natural.',
      '**AESTHETICS:** Gunakan `StandardMaterial` dengan warna Emissive untuk objek interaktif, serta `ParticleSystem` bawaan untuk efek ledakan.',
      '**RESPONSIVE:** Pastikan `engine.resize()` dipanggil pada event `window.resize`.',
    ],
  },

  'Green-Tech': {
    role: 'Principal Eco-Tech & Sustainability Specialist',
    focus: 'Data lingkungan yang kering harus diubah menjadi narasi yang inspiratif. Pengguna harus merasa bahwa tindakan kecil mereka berarti.',
    directives: [
      '**VISUALISASI DAMPAK:** Ubah data kering menjadi metrik inspiratif ("Pohon Diselamatkan", "CO2 Dikurangi"). Gunakan chart organik yang mengalir.',
      '**EKONOMI SIRKULAR:** Elemen UI yang memfasilitasi pertukaran, daur ulang, atau berbagi sumber daya.',
      '**SISTEM DESAIN ECO:** Palet warna tanah yang alami. Dark Mode sebagai "Mode Hemat Energi" default.',
      '**TARGET KOMUNITAS:** Progress bar kolaboratif yang menampilkan kontribusi pengguna terhadap target lingkungan global.',
      '**TRANSPARANSI:** Modal "Audit Dampak" yang detail dengan ikonografi yang jelas dan dapat diverifikasi.',
      '**NUDGING:** Visual cue yang mendorong pilihan berkelanjutan (sorot opsi "Karbon Rendah").',
    ],
  },

  'Music': {
    role: 'Principal Web-Audio & DSP Engineer',
    focus: 'Latensi adalah musuh. Setiap millisecond antara input dan suara merusak feel musikal. Rancang untuk zero-latency perception.',
    directives: [
      '**ARSITEKTUR AUDIO:** Hubungkan oscillator/sample ke Effects Chain (Tone.js) dengan Reverb, Delay, dan Master Limiter.',
      '**PRESISI TIMING:** Jadwalkan semua event menggunakan timeline `AudioContext` — bukan JS `setTimeout` — untuk mencegah jitter ritmis.',
      '**VISUAL FEEDBACK:** Audio visualizer high-FPS (FFT Spectrum atau Oscilloscope) yang bereaksi real-time terhadap output.',
      '**TACTILE UI:** Pad dan key yang terasa "fisik" dengan fisika tekan/lepas. Gunakan warna berbasis pitch class untuk setiap not.',
      '**TEORI MUSIK:** Implementasikan kendala scale/key agar semua interaksi tetap musikal. Logika generasi chord yang scale-aware.',
      '**STATE & EKSPOR:** Simpan sequence/patch ke LocalStorage. Implementasikan UI simulasi "Record to WAV".',
    ],
  },
};

// =============================================================================
// ENGINE MAP (prototype stack per category)
// =============================================================================

const _engineMap = {
  'Productivity':  'Vue.js 3 (Composition API) + Tailwind CSS',
  'Game 2D':       'Phaser 3 (via CDN) + Vanilla JS',
  'Social':        'Vue.js 3 + Tailwind CSS',
  'Fintech':       'Vanilla JS (ES6+) + Tailwind CSS',
  'Health':        'Vue.js 3 (Composition API) + Tailwind CSS',
  'Education':     'Vue.js 3 + Tailwind CSS',
  'E-commerce':    'Vue.js 3 + Tailwind CSS',
  'Utility':       'Vanilla JS (ES6+) + Web Workers + Tailwind CSS',
  'Services':      'Vue.js 3 + Tailwind CSS + Leaflet.js',
  'Creative':      'Canvas API / Paper.js + Vanilla JS',
  'Game 3D':       'Babylon.js (via CDN) + Havok Physics + Vanilla JS',
  'Green-Tech':    'Vue.js 3 + Tailwind CSS',
  'Music':         'Tone.js + Web Audio API + Vanilla JS',
};

const _masterEngineMap = {
  'Productivity':  'Next.js (App Router) + Tailwind CSS + Zustand',
  'Game 2D':       'Vite + React + Phaser 3 + Tailwind CSS',
  'Social':        'Next.js (App Router) + Tailwind CSS + Supabase',
  'Fintech':       'Next.js (App Router) + Tailwind CSS + Zod + Dinero.js',
  'Health':        'Next.js (App Router) + Tailwind CSS + Zustand',
  'Education':     'Next.js (App Router) + Tailwind CSS + Zustand',
  'E-commerce':    'Next.js (App Router) + Tailwind CSS + Zustand',
  'Utility':       'Vite + React + Tailwind CSS + Web Workers + IndexedDB',
  'Services':      'Next.js (App Router) + Tailwind CSS + Leaflet.js',
  'Creative':      'Vite + React + Zustand + Canvas API / Fabric.js',
  'Game 3D':       'Vite + React + React Three Fiber (R3F) / Babylon.js',
  'Green-Tech':    'Next.js + Tailwind CSS + Recharts',
  'Music':         'Vite + React + Tailwind CSS + Tone.js + Zustand',
};

const _libStacks = {
  'Productivity':  'GSAP (Animations), SortableJS (Drag-and-drop), Lucide Icons',
  'Game 2D':       'Web Audio API (OscillatorNode)',
  'Social':        'GSAP, Animate.css, Lucide Icons',
  'Fintech':       'Dinero.js, Cleave.js, Chart.js, Lottie, Lucide Icons',
  'Health':        'Rough.js (Charts), canvas-confetti, Lottie, Lucide Icons',
  'Education':     'Tone.js, GSAP, Lucide Icons',
  'E-commerce':    'PhotoSwipe, GSAP, Lucide Icons',
  'Utility':       'GSAP, Lucide Icons',
  'Services':      'Leaflet.js, GSAP, Lucide Icons',
  'Creative':      'Paper.js, GSAP, Lucide Icons',
  'Game 3D':       'Havok Physics (via Babylon.js CDN)',
  'Green-Tech':    'Chart.js, GSAP, Lucide Icons',
  'Music':         'Tone.js, Web Audio API',
};

const _fallbackConfig = {
  role: 'Lead Software Architect & Product Designer',
  focus: 'Rancang dengan prinsip universal: kecepatan, kejelasan, dan keindahan.',
  directives: [
    '**LAYOUT:** Gunakan komposisi dinamis modern (Bento Grid atau Asymmetric).',
    '**ANIMATION:** Implementasikan micro-interactions GSAP berkualitas tinggi.',
    '**UX:** Fokus pada alur kerja "Keyboard-First" dan Command Palette.',
  ],
};

// =============================================================================
// PRIVATE HELPERS
// =============================================================================

function _validateSource(source, fnName) {
  const required = ['appName', 'category', 'product', 'mechanics'];
  const missing = required.filter(k => !source?.[k]);
  if (missing.length) {
    throw new Error(`[SynthesisEngine.${fnName}] Field wajib tidak ada: ${missing.join(', ')}`);
  }
  if (!Array.isArray(source.mechanics) || source.mechanics.length === 0) {
    throw new Error(`[SynthesisEngine.${fnName}] source.mechanics harus array dan tidak boleh kosong.`);
  }
}

function _buildHeader(source) {
  const coreEngine = _engineMap[source.category] || 'Vue.js 3 (Composition API) + Tailwind CSS';
  const libs = _libStacks[source.category] || 'GSAP, Lucide Icons';

  return `### PERAN SISTEM:
Berperanlah sebagai **${(_categoryConfigs[source.category] || _fallbackConfig).role}**. Tugasmu adalah menciptakan prototype yang melampaui standar MVP.

### IDENTITAS PROYEK:
- **Nama Proyek:** "${source.appName}"
- **Kategori:** ${source.category}
- **Konsep Produk:** "${source.product}"
- **Mekanik Inti:**
  ${(source.mechanics || []).map((m, i) => `${i + 1}. "${m}"`).join('\n  ')}
- **Estetika Desain:** "${(source.styles || []).join(', ') || 'Modern Premium Minimalist'}"
- **Target Pengguna:** ${(source.audiences || []).join(', ') || 'General Users'}
- **Bahasa UI:** Bahasa Indonesia (istilah teknis tetap Inggris).

### SPESIFIKASI TEKNIS:
- **Core Engine:** ${coreEngine}
- **Extended Libraries:** ${libs}
- **Environment:** Single File HTML Prototype (Zero Build Step). Wajib gunakan CDN yang valid (unpkg, jsdelivr, cdn.tailwindcss.com) di dalam \`<head>\`.
- **Output:** Tulis SELURUH kode dalam SATU blok markdown \`\`\`html. Dilarang memecah menjadi beberapa blok.`;
}

function _buildDirectives(source, colors) {
  const config = _categoryConfigs[source.category] || _fallbackConfig;
  const isGame = ['Game 2D', 'Game 3D'].includes(source.category);
  const mechanicsCount = (source.mechanics || []).length;
  const mechanicsList = (source.mechanics || []).map((m, i) => `  ${i + 1}. "${m}"`).join('\n');
  const activeConstraint = (source.constraints?.length > 0)
    ? source.constraints.join(', ')
    : 'Harus sangat fungsional, bersih, dan accessible';

  const formattedDirectives = config.directives.map(d => `- ${d}`).join('\n');

  const colorAndUXBlock = isGame
    ? `${_sharedGameDirectives.assetsAndPersistence}
${_sharedGameDirectives.settingsOverlay}
${_sharedGameDirectives.performance}`
    : `#### 3. COLOR SYSTEM & DESIGN TOKENS
- **Hero Color:** \`${colors?.color1 || '#3B82F6'}\` — Brand/Primary Action.
- **Neutral Color:** \`${colors?.color2 || '#F3F4F6'}\` — Background/Surface.
- **Accent Color:** \`${colors?.color3 || '#10B981'}\` — Highlights/Interactive feedback.
- **Aturan 60-30-10:** Terapkan proporsi ini secara ketat untuk harmoni visual.

#### 4. UX, ONBOARDING & FEEDBACK
${_sharedDirectives.microInteractions}
- **Progressive Disclosure:** Sembunyikan kompleksitas. Tampilkan fitur lanjutan hanya saat pengguna membutuhkannya.
${_sharedDirectives.persistenceAndSettings}

#### 5. ASET, AKSESIBILITAS & DATA
${_sharedDirectives.dataAndAssets}
${_sharedDirectives.accessibility}

#### 6. CREATIVE CONSTRAINT
Semua keputusan desain WAJIB melewati filter ini: **"${activeConstraint}"**.`;

  return `---

### ARAHAN EKSEKUTIF:

#### 1. SINTESIS MULTI-MEKANIK (STRATEGI)
Analisis secara mendalam bagaimana **${mechanicsCount} mekanik** berikut berinteraksi dan saling memperkuat di dalam "${source.product}":
${mechanicsList}

**SINTESIS KRITIS:** Jangan gabungkan secara terpisah — ciptakan "Synergy Hook". Setiap mekanik harus berdampak langsung pada data atau perilaku mekanik lainnya (Cross-Feature Dependency).

#### 2. ARSITEKTUR & STATE SCHEMA
- **Clean Architecture:** Pisahkan Logic (State/Actions) dari View (HTML/CSS).
- **Reactive State Schema:** Definisikan state global yang komprehensif. Perubahan di satu fitur harus berdampak pada fitur lainnya.
- **Deep Logic:** Pastikan algoritma mekanik inti nyata, bukan sekadar manipulasi UI.

${colorAndUXBlock}

---

### FOKUS DOMAIN (${source.category.toUpperCase()}):
${formattedDirectives}

**PSIKOLOGI PENGGUNA:**
${config.focus}

---

### FORMAT OUTPUT (WAJIB):
> Karena batasan token, PRIORITASKAN kode lengkap. DILARANG menyingkat dengan komentar seperti "// sisa kode di sini".

1. **Rationale:** Mengapa kombinasi ${mechanicsCount} mekanik ini adalah "Game Changer"? Bagaimana interaksinya?
2. **Feature Map:** Diagram teks singkat yang menunjukkan hubungan antar mekanik.
3. **Prototype (Full Code):** Single File HTML dalam satu blok \`\`\`html. UI harus memiliki "WOW factor" pada render pertama.
4. **State Schema:** Rangkuman singkat skema JSON dari state utama aplikasi.
5. **Production Roadmap:** Strategi skalabilitas dan integrasi backend.`;
}

// =============================================================================
// PUBLIC API
// =============================================================================

export const SynthesisEngine = {

  /**
   * Generates a rapid-prototype prompt (Single File HTML, CDN-based).
   * Language: Bahasa Indonesia.
   * @param {object} source - App config (appName, category, product, mechanics, styles, audiences, constraints)
   * @param {object} colors - Brand color tokens { color1, color2, color3 }
   */
  generatePrompt(source, colors) {
    _validateSource(source, 'generatePrompt');
    return _buildHeader(source) + '\n\n' + _buildDirectives(source, colors);
  },

  /**
   * Generates a production-grade, phased prompt (Next.js/Vite + TypeScript).
   * Language: English.
   * @param {object} source - App config
   * @param {object} colors - Brand color tokens { color1, color2, color3 }
   */
  generateMasterPrompt(source, colors) {
    _validateSource(source, 'generateMasterPrompt');

    const config = _categoryConfigs[source.category] || _fallbackConfig;
    const coreEngine = _masterEngineMap[source.category] || 'Next.js (App Router) + Tailwind CSS + Zustand';

    const mechanicsList    = (source.mechanics   || []).map(m => `  - ${m}`).join('\n');
    const stylesList       = (source.styles      || []).length ? `- **Styles/Themes:**\n${source.styles.map(s => `  - ${s}`).join('\n')}` : '';
    const audiencesList    = (source.audiences   || []).length ? `- **Target Audiences:**\n${source.audiences.map(a => `  - ${a}`).join('\n')}` : '';
    const constraintsList  = (source.constraints || []).length ? `- **Design Constraints:**\n${source.constraints.map(c => `  - ${c}`).join('\n')}` : '';

    // Master-level directives are more architecture-focused than prototype directives.
    const masterDirectives = {
      'Productivity': [
        'STATE MANAGEMENT: Use Zustand with a Command Pattern for all primary actions (Undo/Redo support).',
        'KEYBOARD-FIRST: Implement global hotkeys and a Command Palette (Cmdk). Use focus-trap for modals.',
        'PERFORMANCE: Use `tanstack-virtual` for long lists. Implement optimistic UI updates.',
      ],
      'Game 2D': [
        'PHASER INTEGRATION: Set up a clean Vite + React + Phaser 3 bridge using an Event Emitter or shared store.',
        'OBJECT POOLING: Use Phaser Object Pooling for projectiles/enemies to prevent GC spikes.',
        'STATE SYNC: Synchronize Phaser game state with React UI state cleanly.',
      ],
      'Social': [
        'REAL-TIME: Architect for WebSocket / Supabase Realtime integration (notifications, chat).',
        'OPTIMISTIC UI: Implement optimistic updates for all social actions (Like, Follow) to mask latency.',
        'FEED PERFORMANCE: Use React Query / SWR with infinite query for the content feed.',
      ],
      'Fintech': [
        'DATA PRECISION: Use Dinero.js or Big.js strictly. No floating-point math for currency.',
        'FORM VALIDATION: Use React Hook Form + Zod for all transaction forms with strict payload validation.',
        'SECURITY UX: Design biometric/PIN simulation UI flows with safe local state handling.',
      ],
      'Health': [
        'DATA PRIVACY: Architect "Private Vault" view modes with masked sensitive data.',
        'ACCESSIBILITY: Strict WCAG 2.1 AA compliance. Screen-reader optimize all health metrics.',
        'LOCAL-FIRST: Use IndexedDB (localForage) for streak/habit data that can sync to a backend.',
      ],
      'Education': [
        'SRS ALGORITHM: Implement Spaced Repetition logic (SM-2 or similar) with persistent progress.',
        'STATE: Handle deeply nested state for courses, modules, and quiz progress safely.',
        'GAMIFICATION: Build XP calculation and leveling logic tied to verifiable user interactions.',
      ],
      'E-commerce': [
        'CART PERSISTENCE: Ensure cart state persists reliably across sessions (LocalStorage + server sync).',
        'SSR: Optimize components for Server-Side Rendering for SEO. Use Next/Image for all images.',
        'VARIANT STATE: Handle complex product variant selections (Size/Color matrix) without UI lag.',
      ],
      'Utility': [
        'WEB WORKERS: Offload all heavy processing (file conversion, compression) to Web Workers.',
        'INDEXEDDB: Use localForage for large file caching and heavy state persistence.',
        'ERROR BOUNDARIES: Implement global React Error Boundaries and comprehensive fallback UI.',
      ],
      'Services': [
        'DATE/TIME: Use date-fns or dayjs for all date/time manipulation. No native Date arithmetic.',
        'STATE MACHINE: Use a strict state machine (XState or manual reducer) for service status transitions.',
        'MAPS: Prepare components for clean Leaflet / Google Maps integration.',
      ],
      'Creative': [
        'UNDO/REDO: Build a robust History API (Command Pattern) for canvas state management.',
        'RENDER PERFORMANCE: Prevent React re-renders from causing Canvas/WebGL frame drops.',
        'EXPORT: Implement Blob manipulation and ReadableStream for saving/exporting user creations.',
      ],
      'Game 3D': [
        '3D ENGINE: Integrate Babylon.js or React Three Fiber (R3F) cleanly within the React component tree.',
        'PHYSICS WORKER: Isolate physics calculations (Havok/Cannon.js) in a Web Worker.',
        'ASSET LOADING: Implement lazy-loading for GLTF/GLB models to prevent UI blocking.',
      ],
      'Green-Tech': [
        'CHARTS: Integrate Recharts or Chart.js with responsive resizing and dynamic data feeds.',
        'GREEN CODE: Write highly optimized components with minimal re-renders to conserve client battery.',
        'A11Y: Ensure earthy/eco themes maintain WCAG AA contrast ratios.',
      ],
      'Music': [
        'AUDIO LIFECYCLE: Manage Tone.js / Web Audio contexts safely across React component unmounts.',
        'AUTOPLAY POLICY: Handle AudioContext resume on first user interaction to comply with browser policies.',
        'STATE SERIALIZATION: Save synth/patch parameters as structured JSON schemas to LocalStorage.',
      ],
    };

    const domainDirectives = (masterDirectives[source.category] || [
      'ARCHITECTURE: Use Clean Architecture or Feature-Sliced Design (FSD).',
      'TYPE SAFETY: Strict TypeScript. Zero `any` types.',
      'ERROR HANDLING: Implement global Error Boundaries and comprehensive try/catch coverage.',
    ]).map((d, i) => `${i + 1}. ${d}`).join('\n');

    return `### SYSTEM ROLE & PRIME DIRECTIVE
Act as a **${config.role}** and **DevSecOps Specialist**.
Build a production-ready, scalable web application using **${coreEngine}**.
Write clean, modular, heavily commented, and performant code.

---

### 1. PROJECT IDENTITY & SCOPE
- **App Name:** ${source.appName}
- **Category:** ${source.category}
- **Product Vision:** "${source.product}"
- **Core Mechanics (Implement Fully):**
${mechanicsList}
${stylesList}
${audiencesList}
${constraintsList}
- **Brand Color Tokens:**
  - Primary/Hero: \`${colors?.color1 || '#3B82F6'}\`
  - Surface/Neutral: \`${colors?.color2 || '#F3F4F6'}\`
  - Accent/Interactive: \`${colors?.color3 || '#10B981'}\`

---

### 2. STRICT ARCHITECTURAL & CODING STANDARDS
1. **Tech Stack:** MUST use **${coreEngine}**. **TypeScript is MANDATORY.**
2. **Type Safety:** Strict TypeScript interfaces/types. Absolutely NO \`any\` types.
3. **Architecture:** Follow Clean Architecture or Feature-Sliced Design (FSD):
   - *View Layer* — Dumb, reusable components
   - *State Layer* — Zustand/Context (UI state separated from Data state)
   - *Service Layer* — API wrappers, complex business logic, data parsing
4. **Styling:** Tailwind CSS with the provided Color Tokens implemented via \`tailwind.config\`.
5. **Quality:**
   - No placeholder comments like \`// write logic here\`. Write the actual code.
   - Robust Error Boundaries and \`try/catch\` throughout.
   - Accessibility: ARIA roles, semantic HTML, WCAG AA contrast.
   - Mock data must be realistic and contextually appropriate (minimum 20 entries).

---

### 3. DOMAIN-SPECIFIC DIRECTIVES (${source.category.toUpperCase()})
${domainDirectives}

**Domain Psychology:** ${config.focus}

---

### 4. OUTPUT FORMAT
- **NO PREAMBLE.** Output only code, CLI commands, and the phase-end prompt.
- **File headers:** Before every code block, specify the exact path: \`### File: src/components/ui/Button.tsx\`

---

### 5. PHASED GENERATION PROTOCOL
**PHASE 1 — Scaffolding & Architecture**
- CLI commands to initialize the project.
- Required NPM dependencies.
- Full folder structure (ASCII tree).
- Config files: \`tailwind.config.ts\`, \`tsconfig.json\`, \`vite.config.ts\` / \`next.config.js\`.
- *END: "Phase 1 complete. Reply 'next' to generate State, Schema & Services."*

**PHASE 2 — State, Schema & Services**
- Global state stores with TypeScript interfaces.
- Utility functions, custom hooks, mock API/domain logic.
- *END: "Phase 2 complete. Reply 'next' to generate Layout & UI Components."*

**PHASE 3 — Layout & Reusable UI Components**
- Master layout (Navbar, Sidebar, Footer).
- Core reusable components tailored to the domain.
- *END: "Phase 3 complete. Reply 'next' to generate Core Features & Pages."*

**PHASE 4 — Core Mechanics Implementation**
- Main application pages integrating State, Components, and all Core Mechanics above.

---
**UNDERSTOOD?** Execute **PHASE 1** now.`;
  },

  /**
   * Randomizes unlocked slots from a pool without repeating values.
   * @param {Array} slots - Array of slot objects with { locked, value }
   * @param {number} count - Number of slots to fill
   * @param {Array} pool - Array of possible values
   */
  randomizeGroup(slots, count, pool) {
    if (!pool?.length) return;
    const used = new Set(slots.filter(s => s.locked).map(s => s.value));
    const getRandom = arr => arr[Math.floor(Math.random() * arr.length)];
    slots.forEach((slot, i) => {
      if (i < count && !slot.locked) {
        const available = pool.filter(p => !used.has(p));
        slot.value = getRandom(available.length ? available : pool);
        used.add(slot.value);
      }
    });
  },
};
