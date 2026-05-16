# AI Instruction Guide — Projek DiverDea

Dokumen ini berisi panduan dan instruksi teknis bagi AI Assistant untuk mengelola, mengembangkan, dan memelihara codebase **DiverDea (Synthesis Engine)**.

---

## 1. Visi & Konsep Proyek
**DiverDea** adalah *Multi-Feature Synthesis Engine* untuk developer yang menghasilkan konsep proyek kompleks dengan menggabungkan **2 hingga 3 mekanik fitur** ke dalam satu wadah produk, dilengkapi variabel opsional (Target Audience, Constraint, UI Style) dan generator prompt AI level *Hyper-Expert*.

- **Tujuan Utama:** Menghasilkan prompt AI yang sangat detail untuk membangun prototype fungsional dalam satu file HTML, dengan beberapa fitur yang terintegrasi secara kohesif.
- **Filosofi Desain:** *"Serene, Precise, and Organic"*. Palet warna Matcha & Cream, animasi halus, *low cognitive load*.

---

## 2. Stack Teknologi Utama
Setiap modifikasi **harus** mengikuti stack yang sudah ada:
- **Core:** HTML5, Vanilla JavaScript (ESM Modules).
- **Framework:** [Vue.js 3](https://vuejs.org/) (Global Build, Options API via `data/methods`).
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (via CDN, konfigurasi kustom di `script.js`).
- **Animations:** [GSAP](https://greensock.com/gsap/) (animasi UI dinamis & background orbs).
- **Audio:** [Tone.js](https://tonejs.github.io/) (feedback audio — `playPop`, `playHoverTick`).
- **Utilities:** [Lodash](https://lodash.com/) (`_.sample`, `_.sampleSize` untuk sampling data).
- **Icons:** [Font Awesome 6](https://fontawesome.com/).

---

## 3. Sistem Desain (Branding DiverDea)
**Jangan mengubah variabel warna inti tanpa instruksi eksplisit.**

- **Tailwind Custom Colors:**
  - `matcha`: `#9cb48c` — Primary / Brand
  - `matcha-dark`: `#1a1c18` — Text & Dark Background
  - `matcha-surface`: `#232620` — Dark Mode Surface
  - `cream`: `#fdfcf9` — Light Background
  - `cream-dark`: `#f4f2e6` — Light Surface
  - `cream-dim`: `#b5bcad` — Muted Text
  - `oatmeal`: `#d5d0c4` — Borders & Dividers
- **Typography:** `Inter`, sans-serif (Google Fonts).
- **Aesthetics:** High whitespace, subtle shadows, `rounded-lg` hingga `rounded-3xl`, glassmorphism pada modal overlay.
- **Accent Colors untuk Variabel Opsional:**
  - Target Audience → `amber-400`
  - Constraint / Twist → `violet-400`
  - Lateral Mode → `red-400`

---

## 4. Struktur File Proyek

```
/Projek DiverDea
├── index.html        — UI utama (Vue template, layout, semua komponen inline)
├── script.js         — Vue app instance, state, semua methods, logika utama
├── data.js           — Semua data pool (ESM exports)
├── style.css         — CSS kustom (animasi orbs, transitions, overrides)
├── concept-app.md    — Dokumen konsep produk (ini)
└── ai_readme_instruction.md — Panduan teknis untuk AI (ini)
```

---

## 5. Struktur Data (`data.js`)

### Export yang tersedia:
| Export | Tipe | Mode | Deskripsi |
|---|---|---|---|
| `categories` | `Array` | — | 12 kategori domain (Productivity, Game, dll.) |
| `libStacks` | `Object` | — | Library stack per kategori untuk dimasukkan ke prompt |
| `generalMechanics` | `Array (flat)` | General | 37 mekanik fundamental web |
| `generalProducts` | `Array (flat)` | General | 32 wadah produk umum |
| `conceptsList1` | `Object (per-cat)` | Standard | 14 mekanik standar per kategori |
| `conceptsListLateral` | `Object (per-cat)` | Lateral | 14 mekanik ekstrem/psikologis per kategori |
| `conceptsList2` | `Object (per-cat)` | Standard/Lateral | 13 wadah produk per kategori |
| `conceptsList3` | `Array (flat)` | Opsional | 25 gaya visual/UI |
| `targetAudiences` | `Array (flat)` | Opsional | 20 persona pengguna spesifik |
| `constraints` | `Array (flat)` | Opsional | 20 batasan kreatif / design twists |
| `categoryFocusMap` | `Object` | — | Instruksi teknis per kategori (bahasa Inggris) untuk prompt AI |

> **⚠️ Note — Kategori `Game`:** Entry `'Game'` menggunakan **template literal multi-line** (bukan single-line string) karena berisi 5 modul direktif game design psychology yang sangat detail:
> 1. **Core Fun Loop** — Definisi loop 30 detik sebelum menulis kode.
> 2. **Game Feel & Juice** — 6 elemen wajib: screen shake, squash & stretch, particles, sound, camera lerp, hit flash.
> 3. **Psychological Reward Architecture** — 7 psychological hooks (Skinner Box, Loss Aversion, Near-Miss, dll.).
> 4. **Difficulty & Flow State** — Kurva Csikszentmihalyi: Early/Mid/Late Game + Rubber Band mechanic.
> 5. **Feedback Clarity & Technical Engine** — HUD rules, color coding, frame-independent loop, object pooling.
>
> **JANGAN** ubah format `'Game'` menjadi single-line string — panjangnya sengaja untuk menghasilkan game yang benar-benar *fun*, *playable*, dan *addictive*.

### Aturan Tipe Data:
- **Flat array** (`generalMechanics`, `conceptsList3`, `targetAudiences`, `constraints`): `isFlatList()` akan mengembalikan `true` → operasi CRUD menggunakan index langsung.
- **Object per-category** (`conceptsList1`, `conceptsListLateral`, `conceptsList2`): operasi CRUD menggunakan `[selectedCategory]` sebagai key.

---

## 6. State Utama (`script.js`)

### Synthesis Engine State:
| State | Tipe | Deskripsi |
|---|---|---|
| `synthesisMode` | `'general' \| 'standard' \| 'lateral'` | Mode sintesis aktif |
| `mechanicCount` | `2 \| 3` | Jumlah mekanik yang diroll dan dimasukkan ke prompt |
| `selectedCategory` | `String` | Kategori aktif (hanya digunakan di Standard & Lateral) |
| `currentConcept1` | `String` | Mekanik utama (selalu aktif) |
| `currentConcept1b` | `String` | Mekanik ke-2 (selalu aktif) |
| `currentConcept1c` | `String` | Mekanik ke-3 (hanya aktif jika `mechanicCount === 3`) |
| `currentConcept2` | `String` | Wadah produk |
| `currentConcept3` | `String` | Gaya UI (hanya aktif jika `useThirdConcept === true`) |
| `currentAudience` | `String` | Target audience (hanya aktif jika `useAudience === true`) |
| `currentConstraint` | `String` | Batasan kreatif (hanya aktif jika `useConstraint === true`) |

### Lock State:
Setiap slot konsep memiliki pasangan `isLockedX` yang mencegah slot tersebut di-roll ulang saat "Synthesize Idea" ditekan.

### Toggle State (Opsional):
| State | Default | Efek jika `true` |
|---|---|---|
| `useThirdConcept` | `false` | UI Style muncul di layar & masuk prompt |
| `useAudience` | `false` | Audience badge muncul & directive masuk prompt |
| `useConstraint` | `false` | Constraint badge muncul & directive masuk prompt |

---

## 7. Method Utama (`script.js`)

### `getMechanicPool()`
Mengembalikan array pool mekanik yang sesuai dengan `synthesisMode` aktif:
- `'general'` → `generalMechanics`
- `'lateral'` → `conceptsListLateral[_.sample(categories)]` (lintas kategori acak)
- `'standard'` → `conceptsList1[selectedCategory]`

### `generateLateralIdea()`
Core roll engine. Mengambil sampel dari pool yang sesuai untuk semua slot aktif, memastikan mekanik tidak duplikat (best effort), lalu memicu animasi GSAP pada elemen yang baru diroll.

### `generateAiPrompt(idea?)`
Menghasilkan string prompt Markdown bertingkat. Mencakup:
1. Multi-feature synthesis directive (berdasarkan `mechanicCount`)
2. Architecture & state management
3. Design system
4. **UX Clarity & Low Cognitive Load** (mandatory "How It Works" section)
5. Assets, accessibility & robustness
6. Optional: Target Audience directive (jika `useAudience` aktif)
7. Optional: Creative Constraint directive (jika `useConstraint` aktif)
8. Category-specific focus dari `categoryFocusMap`

### `isFlatList(listName)`
Mengembalikan `true` untuk: `['conceptsList3', 'generalMechanics', 'generalProducts', 'targetAudiences', 'constraints']`.
Digunakan di semua operasi CRUD untuk menentukan apakah mengakses dengan index langsung atau dengan `[selectedCategory]`.

---

## 8. Aturan Pengembangan

### Do's ✅
- Gunakan `_.sample()` / `_.sampleSize()` dari Lodash untuk semua pengambilan data acak.
- Pastikan setiap interaksi penting memiliki feedback audio via `playPop()` atau `playHoverTick()`.
- Gunakan GSAP untuk setiap elemen yang muncul secara dinamis (`v-if`).
- Pertahankan dukungan **Dark Mode** menggunakan class `dark` di `<html>`.
- Saat menambah data pool baru, daftarkan di `isFlatList()` jika tipenya flat array.
- Gunakan `synthesisMode` untuk gate semua logika yang bergantung pada mode.

### Don'ts ❌
- Jangan menggunakan library eksternal baru tanpa menambahkan CDN-nya di `index.html`.
- Jangan menghapus sistem `LocalStorage` untuk penyimpanan ide (`savedIdeas`).
- Jangan mengubah struktur per-category di `data.js` menjadi flat array tanpa memperbarui `isFlatList()`.
- Jangan mengubah konfigurasi warna Tailwind kustom tanpa instruksi eksplisit.
- Jangan pernah menampilkan variabel opsional (Audience, Constraint) di prompt jika toggle-nya mati.

---

## 9. Workflow Penambahan Fitur Baru
1. Tentukan apakah fitur memerlukan data baru → tambahkan ke `data.js` & import di `script.js`.
2. Jika data baru bertipe flat array → daftarkan di `isFlatList()`.
3. Update `data()` di `script.js` jika ada state baru.
4. Tambahkan elemen UI di `index.html` menggunakan Tailwind utility class.
5. Hubungkan logic di `methods`.
6. Jika elemen bersifat opsional (toggle) → pastikan variabel tidak masuk ke prompt jika toggle mati.
7. Tambahkan animasi GSAP jika elemen bersifat interaktif atau muncul secara dinamis.
8. Update kedua file `.md` ini untuk mencerminkan perubahan.

---
*Dokumen ini dibuat untuk memastikan konsistensi antara AI dan Developer Manusia.*
*Last updated: Mei 2026 — v4.0 (Multi-Feature Synthesis Engine)*
