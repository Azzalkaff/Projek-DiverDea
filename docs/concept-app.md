# Concept Document: DiverDea (Synthesis Engine)

## 1. Executive Summary
**DiverDea** adalah aplikasi web yang dirancang untuk membantu pengembang dan desainer keluar dari kebuntuan kreatif (*creative block*). Menggunakan mesin sintesis tiga-mode, aplikasi ini menggabungkan beberapa mekanik fitur, wadah produk, dan variabel opsional untuk menghasilkan konsep proyek yang unik, kompleks, dan siap untuk dieksekusi oleh AI.

## 2. Masalah & Solusi
- **Masalah:** Banyak pengembang terjebak pada ide proyek yang sederhana dan "satu fitur saja" (misal: To-Do List standar, Weather App biasa), sehingga menghasilkan prototype yang kurang berbobot.
- **Solusi:** DiverDea memaksa mesin untuk mensintesis **2 hingga 3 mekanik fitur sekaligus** ke dalam satu wadah produk, menciptakan konsep yang jauh lebih kaya dan kompleks. Mode operasi bisa dipilih sesuai tingkat kreativitas yang diinginkan.

## 3. Synthesis Mode (Mode Utama)
Aplikasi memiliki **3 mode sintesis** yang dapat dipilih via *Segmented Control* di sidebar:

| Mode | Deskripsi | Data Source |
|---|---|---|
| **General** | Fitur fundamental & produk umum, disesuaikan per kategori | `generalMechanics[category]`, `generalProducts[category]` |
| **Standard** | Mekanik wajar + wadah produk dari kategori yang sama | `conceptsList1[category]`, `conceptsList2[category]` |
| **Lateral** | Mekanik ekstrem/psikologis *lintas kategori* secara acak | `conceptsListLateral[random]`, `conceptsList2[category]` |

## 4. Fitur Utama (Core Features)

### 4.1 Multi-Feature Synthesis Engine
- Menghasilkan **2 atau 3 mekanik unik** sekaligus (dikontrol via toggle **×2 / ×3**).
- Setiap mekanik diambil secara acak dan dijamin unik (tidak duplikat) dalam satu sesi roll.
- Prompt AI yang dihasilkan memerintahkan AI untuk **mensintesis** semua mekanik menjadi satu produk yang kohesif, bukan hanya menggabungkan.

### 4.2 Variabel Opsional (Off by Default)
- **UI Style (Gaya Visual):** Toggle untuk menambahkan gaya visual spesifik (Glassmorphism, Y2K, Neo-Brutalism, dll.) ke dalam prompt.
- **Target Audience (Persona):** Toggle untuk menetapkan target pengguna spesifik (misal: *Gen-Z, Digital Nomads, Kids*). Jika aktif, AI diperintahkan untuk menyesuaikan seluruh UX/UI untuk persona tersebut.
- **Constraint / Twist (Batasan Kreatif):** Toggle untuk memberikan batasan desain yang memaksa inovasi (misal: *"No text — icons only"*, *"Max 10 seconds of interaction"*). Jika aktif, AI wajib mematuhi batasan ini sebagai filter utama.
- Jika variabel opsional **dimatikan**, variabel tersebut **tidak ditampilkan di UI maupun di dalam prompt AI**.

### 4.3 AI Prototype Compiler (Prompt Generator)
- Menghasilkan prompt bertingkat level **Hyper-Expert** yang mencakup:
  - Multi-feature synthesis strategy
  - Clean Architecture & reactive state management
  - UX Clarity & Low Cognitive Load (dengan mandatory "How It Works" section)
  - Design system (8pt grid, palette, micro-animations)
  - Category-specific technical focus (`categoryFocusMap`)
  - Optional: audience adaptation & creative constraint directives

### 4.4 Concept Vault Engine (CRUD)
- Modal manajemen data 3-kolom untuk mengedit langsung daftar mekanik, produk, dan gaya UI.
- Sadar mode (*Mode-aware*): tampilan dan target operasi CRUD otomatis berubah sesuai mode aktif (General / Standard / Lateral).
- Tombol *lock* individual di setiap slot mekanik agar bisa mengacak hanya sebagian.

### 4.5 Fitur Pendukung
- **Data Injector:** Tambahkan mekanik atau produk kustom langsung ke pool data.
- **Library (Saved Ideas):** Simpan, lihat, dan regenerate prompt dari ide-ide sebelumnya.
- **Prototype Palette:** Pilih warna tema (Hero, Neutral, Accent) yang disuntikkan ke dalam prompt AI.
- **Zen/Focus Mode:** Mematikan animasi background orb untuk fokus penuh.
- **Dark Mode:** Didukung penuh via class `dark`.

## 5. Arsitektur Teknis
- **Frontend:** Vue.js 3 (Options API via `data/methods`), HTML5, Vanilla JS (ESM).
- **Styling:** Tailwind CSS (CDN) dengan konfigurasi tema kustom (Matcha, Cream, Oatmeal).
- **Motion:** GSAP untuk animasi orbs background dan transisi elemen dinamis.
- **Audio:** Tone.js untuk micro-interaction audio feedback (`playPop`, `playHoverTick`).
- **Utilities:** Lodash (`_.sample`, `_.sampleSize`).
- **Icons:** Font Awesome 6.
- **Persistence:** LocalStorage untuk `savedIdeas` (tidak ada backend/database).

## 6. Struktur Data (`data.js`)

| Export | Tipe | Deskripsi |
|---|---|---|
| `categories` | `Array` | Daftar 13 kategori domain |
| `libStacks` | `Object` | Library stack per kategori untuk prompt |
| `generalMechanics` | `Object (per-category)` | 14 mekanik fundamental per kategori (Mode General) |
| `generalProducts` | `Object (per-category)` | 13 wadah produk umum per kategori (Mode General) |
| `conceptsList1` | `Object (per-category)` | 14 mekanik standar per kategori (Mode Standard) |
| `conceptsListLateral` | `Object (per-category)` | 14 mekanik ekstrem/psikologis per kategori (Mode Lateral) |
| `conceptsList2` | `Object (per-category)` | 13 wadah produk per kategori |
| `conceptsList3` | `Array (flat)` | 25 gaya visual/UI |
| `targetAudiences` | `Array (flat)` | 20 persona pengguna (Opsional) |
| `constraints` | `Array (flat)` | 20 batasan kreatif (Opsional) |
| `categoryFocusMap` | `Object` | Instruksi teknis spesifik per kategori untuk prompt AI |

## 7. Target Pengguna
- **Siswa/Mahasiswa:** Mencari ide proyek akhir atau portofolio yang berbeda.
- **Hackathon Participants:** Membutuhkan ide cepat, unik, dan kompleks dalam waktu singkat.
- **Solo Developers:** Mencari inspirasi untuk proyek sampingan (*side project*) yang berbobot.

## 8. Roadmap Pengembangan
- [x] **Phase 1 (MVP):** Pengacak dasar, penyimpanan lokal, dan generator prompt. *(Selesai)*
- [x] **Phase 2:** Penambahan lebih banyak kategori (12 total) dan mekanik. *(Selesai)*
- [x] **Phase 3:** Tri-State Synthesis Engine (General / Standard / Lateral). *(Selesai)*
- [x] **Phase 4:** Multi-Feature Synthesis (×2 / ×3 Mechanics) + Optional Variables (Audience, Constraint). *(Selesai)*
- [x] **Phase 4.1:** Deep Game Design Psychology Directives untuk kategori Game (Fun Loop, Juice, Addiction Engine, Flow State, Rubber Band). *(Selesai)*
- [x] **Phase 4.2:** Penambahan kategori **Music** (ke-13) dengan 14 Standard Mechanics, 14 Lateral Mechanics, 13 Product Containers, dedicated `libStacks`, `categoryPalettes` (Sonic Neon), dan `categoryFocusMap` (Audio Engine directives). *(Selesai)*
- [ ] **Phase 5:** Integrasi API langsung ke LLM untuk preview kode instan. *(Rencana)*
- [ ] **Phase 6:** Fitur "Community Ideas" untuk berbagi sintesis ide secara publik. *(Rencana)*

---
*DiverDea — Berhenti meniru, mulai mensintesis.*
