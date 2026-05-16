/**
 * Synthesis Engine for DiverDea
 * Core logic for idea generation and AI prompt building.
 */

export const SynthesisEngine = {
    generatePrompt(source, libStacks, categoryFocusMap, colors) {
        const categoryConfigs = {
            'Productivity': {
                role: 'Principal Workflow & Systems Architect',
                directives: [
                    'SYSTEM ARCHITECTURE: Implement a centralized state management for task lifecycles (CRUD + Undo/Redo). Use a Command Pattern for all primary actions.',
                    'KEYBOARD-FIRST UX: Mandatory global hotkeys (Ctrl+K for Palette, Esc to blur, Arrow keys for navigation). Implement focus-trap for modals.',
                    'DENSITY & CLARITY: Design a high-density Bento Grid or Eisenhower Matrix. Use clear priority visual cues and subtle micro-labels.',
                    'PERFORMANCE: Use Virtual Scrolling for large lists. Implement optimistic updates for status toggles to ensure zero-latency feel.',
                    'GAMIFICATION: Add a "Productivity Pulse" or streak counter that rewards consecutive task completions with GSAP animations.',
                    'DATA OPERATIONS: Support batch editing, drag-and-drop reordering (SortableJS), and advanced search/filter with Regex support.'
                ]
            },
            'Game 2D': {
                role: 'Principal Game Architect & Creative Technologist',
                directives: [
                    'PHASER ARCHITECTURE: Pisahkan logika ke 3 Class Scene (BootScene, PlayScene, GameOverScene). Gunakan Phaser.Physics.Arcade. WAJIB pakai primitif (Phaser.Graphics), DILARANG meload gambar/Base64. Gunakan Phaser.Scale.FIT.',
                    'INPUT & COLLISION: Wajib gunakan `createCursorKeys()` untuk polling input di `update()` (bukan addEventListener). Gunakan `this.physics.add.collider()` untuk tabrakan, jangan tulis rumus fisika manual.',
                    'ENVIRONMENT DEPTH: Jangan biarkan background kosong/hitam mati. Buat elemen dinamis sederhana seperti "Scrolling Grid" (garis neon) atau "Moving Starfield" menggunakan array objek ringan untuk memberikan ilusi kecepatan/parallax.',
                    'PROGRESSION & DIFFICULTY: Terapkan kurva kesulitan dinamis (kecepatan/spawn rate musuh naik seiring waktu). Simpan "High Score" ke LocalStorage secara real-time agar persaingan terasa nyata.',
                    'DOPAMINE LOOP (HOOK): Jangan hanya cetak skor. Implementasikan sistem "Combo Multiplier" jika pemain bermain agresif tanpa gagal, dan jatuhkan "Power-Ups" secara acak (misal: perisai, tembakan ganda, pelambat waktu).',
                    'GAME FEEL & PHYSICS: Gunakan Camera Shake, Camera Flash, dan `tweens` untuk animasi. Terapkan "Hit-Stop" (pause singkat ~50ms) saat benturan mematikan. Gunakan Arcade Physics dan Object Pooling (Phaser Groups) untuk proyektil/musuh.',
                    'DESKTOP-FIRST CONTROLS: EKSKLUSIF untuk Desktop. Gunakan Keyboard (WASD/Arrows/Space) dan Mouse (Pointer/Klik). DILARANG menulis kontrol sentuh (mobile UI).',
                    'PROCEDURAL AUDIO: Gunakan sintesis Web Audio API (OscillatorNode) untuk membuat efek suara "Bleep/Bloop/Ledakan" saat event penting (Mulai, Kena Hit, Power-up, Game Over). JANGAN meload file audio eksternal.'
                ]
            },
            'Social': {
                role: 'Principal Social Architecture & Growth Engineer',
                directives: [
                    'INTERACTION ARCHITECTURE: Implement an Event-Driven system for all social actions (Likes, Follows, Posts). Ensure optimistic UI updates with immediate visual feedback.',
                    'ENGAGEMENT LOOPS: Use subtle physics-based animations (Animate.css/GSAP) for notifications. Implement "Social Proof" indicators (view counters, activity heatmaps).',
                    'CONTENT FEED: Design a high-performance infinite scroll with media-rich cards. Implement "Lazy Loading" for images and auto-play logic for previews.',
                    'IDENTITY & UX: Focus on profile-centric navigation. Use customizable theme accents and prominent verified status badges.',
                    'TRUST & SAFETY: Add visual cues for E2EE (End-to-End Encryption) and clear reporting/blocking UI flows.',
                    'SOCIAL GRAPH: Visualize connections using a simple node-based view or a "Mutual Friends" grid component.'
                ]
            },
            'Fintech': {
                role: 'Principal Fintech Security & Data Architect',
                directives: [
                    'DATA PRECISION: Use Dinero.js for all monetary calculations. Implement professional currency masking with Cleave.js.',
                    'SECURITY UX: Design a "Security-First" UI with prominent trust signals, secure PIN entry modals, and biometric simulation (Lottie animations).',
                    'ANALYTICS: Create interactive, responsive trend charts using Chart.js with dynamic gain/loss color indicators (HSL based).',
                    'TRANSACTION FLOW: Implement a robust multi-step "Wizard" for transfers with clear confirmation steps and loading skeletons.',
                    'PERSISTENCE & LOGGING: Maintain a secure, searchable transaction history in LocalStorage with auto-export options (CSV/JSON).',
                    'ACCESSIBILITY: Ensure high-contrast ratios for all financial metrics. Large touch targets for crucial "Send/Pay" buttons.'
                ]
            },
            'Health': {
                role: 'Principal Health-Tech & Calm UI Specialist',
                directives: [
                    'CALM DESIGN SYSTEM: Use a desaturated, harmonious palette. Implement "Breathing" UI elements (slow opacity/scale pulses).',
                    'HABIT ARCHITECTURE: Focus on "Small Wins" with visual progress streaks and celebratory reward animations (Canvas-confetti).',
                    'DATA PRIVACY: Add a "Private Vault" visual mode. Ensure sensitive data is obfuscated in the UI unless explicitly toggled.',
                    'ACCESSIBILITY: Large, readable typography for health metrics. Implement voice-to-text simulation for quick data entry.',
                    'INTERACTIVE TRENDS: Use Rough.js for "Sketchy/Organic" charts that feel less clinical and more human.',
                    'EMERGENCY UX: A prominent, unmistakable "Quick Action" or SOS button that overrides the standard navigation flow.'
                ]
            },
            'Education': {
                role: 'Principal Learning Architect & EdTech Engineer',
                directives: [
                    'KNOWLEDGE ARCHITECTURE: Implement a "Skill Tree" or path-based progress map. Use a Spaced Repetition (SRS) logic for flashcards.',
                    'ACTIVE RECALL: Design gamified quiz modules with instant feedback loops. Use Tone.js for "Success/Fail" audio cues.',
                    'INTERACTIVITY: Build interactive diagrams or code sandboxes. Implement "Learning by Doing" mechanics (Drag-to-Order, Spot-the-Error).',
                    'XP & LEVELING: Comprehensive leveling system with celebratory unlock moments. Use GSAP for "Badge Reveal" animations.',
                    'CONTENT HIERARCHY: Focus on "Chunking" information. Use progressive disclosure to reveal lessons step-by-step.',
                    'COLLABORATION: Implement a "Study Buddy" or peer-review simulation UI with AI-driven feedback placeholders.'
                ]
            },
            'E-commerce': {
                role: 'Principal Conversion & E-commerce Architect',
                directives: [
                    'CONVERSION FUNNEL: Design a "One-Click" checkout simulation. Minimize friction with auto-fill logic and minimal form fields.',
                    'SOCIAL PROOF ENGINE: Integrate real-time "Sales Popups", customer ratings, and dynamic "Limited Stock" scarcity indicators.',
                    'VISUAL COMMERCE: Use high-quality image galleries with PhotoSwipe zoom. Implement a "3D Try-on" or AR-preview simulation.',
                    'SEARCH & DISCOVERY: Implement an "Instant Search" with image previews and dynamic category filters.',
                    'TRUST SIGNALS: Prominent "Verified Seller" badges and transparent shipping/return policy modals.',
                    'RETENTION: Implement a "Loyalty Points" dashboard and personalized "Recently Viewed" horizontal sliders.'
                ]
            },
            'Utility': {
                role: 'Principal Systems & Tooling Engineer',
                directives: [
                    'EXECUTION SPEED: Focus on heavy-duty client-side processing (File conversion, Compression). Use Web Workers for non-blocking UI.',
                    'DATA INTEGRITY: Implement robust error handling (Try-Catch) with clear, actionable error messages and fallback states.',
                    'HIGH-DENSITY UI: Maximize information real estate. Use retractable sidebars and tabbed tool interfaces.',
                    'PERSISTENCE: Mandatory auto-save and local session history. Implement a "Drafts" system in LocalStorage.',
                    'POWER TOOLS: Provide a "Raw Data" view or JSON editor for advanced users. Support CLI-style command inputs.',
                    'PROGRESS FEEDBACK: Precise, real-time progress bars and status indicators for all async operations.'
                ]
            },
            'Services': {
                role: 'Principal Service-Flow & Logistics Architect',
                directives: [
                    'BOOKING ARCHITECTURE: Seamless calendar-based scheduling with real-time slot availability logic.',
                    'LOGISTICS UX: Integrate interactive maps (Leaflet.js) for service area checking and provider tracking.',
                    'TRUST & RATINGS: Detailed provider profiles with portfolios and client testimonials. Implement a "Trust Score" metric.',
                    'STATUS TIMELINE: A clear, visual vertical timeline for service progress (Request -> Confirmed -> In-Progress -> Complete).',
                    'COMMUNICATION: Implement a real-time "Chat with Provider" simulation with quick-reply templates.',
                    'PAYMENT & ESCROW: Clear invoicing system with "Payment Held in Escrow" visual cues until service completion.'
                ]
            },
            'Creative': {
                role: 'Principal Creative Tools & Graphics Architect',
                directives: [
                    'CANVAS ARCHITECTURE: Implement a multi-layer drawing or editing system. Use Paper.js for vector manipulation.',
                    'NON-DESTRUCTIVE EDITS: Mandatory Undo/Redo stack. Implement an "Adjustment Layers" style logic.',
                    'TOOLING UX: Floating, retractable tool palettes. Implement "Zen Mode" to focus exclusively on the creative canvas.',
                    'ASSET MANAGEMENT: Rich library of presets, textures, and brushes. Support drag-and-drop for external assets.',
                    'EXPORT ENGINE: Provide multiple export formats (PNG, SVG, JSON). Implement high-resolution render simulation.',
                    'INSPIRATION HOOKS: Integrated "Moodboard" or "AI Suggestion" panel that generates color palettes based on the current canvas.'
                ]
            },
            'Game 3D': {
                role: 'Principal 3D Game Architect & WebGL Engineer',
                directives: [
                    '3D GAME ENGINE: Wajib gunakan Babylon.js (melalui CDN) sebagai engine utama. Inisialisasi engine dan scene dengan standar Babylon.',
                    'NATIVE PHYSICS & COLLISION: Gunakan HavokPlugin atau built-in physics Babylon untuk fisika. Manfaatkan UniversalCamera dengan checkCollisions dan applyGravity.',
                    'OPTIMIZATION & PERFORMANCE: Gunakan InstancedMesh untuk objek yang banyak (peluru, musuh). Hindari deeply nested parent di scene graph.',
                    'INTERACTION & CONTROLS: Implementasikan pointer lock API untuk kontrol bergaya FPS yang natural.',
                    'AESTHETICS & JUICE: Gunakan StandardMaterial dengan warna Emissive untuk objek interaktif, serta ParticleSystem bawaan untuk efek ledakan.',
                    'RESPONSIVE DESIGN: Pastikan fungsi engine.resize() dipanggil pada event window resize.'
                ]
            },
            'Green-Tech': {
                role: 'Principal Eco-Tech & Sustainability Specialist',
                directives: [
                    'IMPACT VISUALIZATION: Transform dry data into inspiring metrics (e.g., "Trees Saved" or "CO2 Reduced"). Use organic, flowing charts.',
                    'CIRCULAR ECONOMY: Focus on UI elements that facilitate swapping, recycling, or sharing resources.',
                    'ECO-DESIGN SYSTEM: Use earthy, natural palettes. Implement "Dark Mode" as the default "Energy Saving Mode".',
                    'COMMUNITY GOALS: Collaborative progress bars where users see their contribution to a global environmental target.',
                    'TRANSPARENCY: Detailed "Supply Chain" or "Impact Audit" modals with clear, verifiable iconography.',
                    'HABIT NUDGING: Subliminal UI cues that encourage sustainable choices (e.g., highlighting "Low Carbon" options).'
                ]
            },
            'Music': {
                role: 'Principal Web-Audio & DSP Engineer',
                directives: [
                    'AUDIO ARCHITECTURE: Connect oscillators/samples to an Effects Chain (Tone.js) with Reverb, Delay, and Master Limiter.',
                    'PRECISION TIMING: Schedule all events using the AudioContext timeline (not JS timer) to prevent rhythmic jitter.',
                    'VISUAL FEEDBACK: High-FPS audio visualizers (FFT Spectrum or Oscilloscope) reacting in real-time to the output.',
                    'TACTILE UI: "Physical" pads and keys with press/release physics. Use color-coded notes based on pitch class.',
                    'MUSIC THEORY: Implement scale/key constraints so all interactions remain musical. Scale-aware chord generation logic.',
                    'STATE & EXPORT: Save sequences/patches to LocalStorage. Implement a "Record to WAV" simulation UI.'
                ]
            }
        };

        const config = categoryConfigs[source.category] || {
            role: 'Lead Software Architect & Product Designer',
            directives: [
                'LAYOUT: Use modern dynamic compositions (Bento Grid or Asymmetric).',
                'ANIMATION: Implement high-end GSAP micro-interactions.',
                'UX: Focus on "Keyboard-First" workflow and Command Palettes.'
            ]
        };

        const engineMap = {
            'Productivity': 'Vue.js 3 (Composition API) + Tailwind CSS (Optimized for complex reactive state)',
            'Game 2D': 'Phaser 3 (via CDN) + Vanilla JS (Gunakan global Phaser object, atur scene di dalam satu file script)',
            'Social': 'Vue.js 3 + Tailwind CSS (Optimized for infinite Virtual DOM rendering)',
            'Fintech': 'Vanilla JS (ES6+) + Tailwind CSS (Zero-dependency for maximum security & speed)',
            'Health': 'Vue.js 3 (Composition API) + Tailwind CSS (Optimized for smooth transitions)',
            'Education': 'Vue.js 3 + Tailwind CSS (Optimized for text-heavy accessible rendering)',
            'E-commerce': 'Vue.js 3 + Tailwind CSS (Optimized for layout shifts and fast LCP)',
            'Utility': 'Vanilla JS (ES6+) + Web Workers + Tailwind CSS (For heavy client-side processing)',
            'Services': 'Vue.js 3 + Tailwind CSS + Leaflet.js (For spatial/mapping capabilities)',
            'Creative': 'Canvas API / Paper.js + Vanilla JS (For low-latency drawing & DOM manipulation)',
            'Game 3D': 'Babylon.js (3D Engine via CDN) + Havok Physics + Vanilla JS',
            'Green-Tech': 'Vue.js 3 + Tailwind CSS (Optimized for data-heavy visualizations)',
            'Music': 'Web Audio API / Tone.js Context + Vanilla JS (For precise audio scheduling)'
        };
        const coreEngine = engineMap[source.category] || 'Vue.js 3 (Composition API) & Tailwind CSS';
        
        return `### SYSTEM ROLE:
Berperanlah sebagai **Principal Software Architect & Lead Product Designer** dengan spesialisasi kategori [${source.category.toUpperCase()}]. Tugasmu adalah menciptakan prototype yang melampaui standar MVP biasa — fokus pada "State-of-the-Art" implementation.

### PROJECT IDENTITY:
- **Project Name:** "${source.appName}"
- **Domain Focus:** ${source.category}
- **Product Concept:** "${source.product}"
- **Core Mechanics (Multi-Feature Synthesis):**
  ${(source.mechanics || []).map((m, i) => `${i + 1}. "${m}"`).join('\n  ')}
- **Design Aesthetic:** "${(source.styles || []).join(', ') || 'Modern Premium Minimalist'}"
- **Target Audience:** ${(source.audiences || []).join(', ') || 'High-end General Users'}
### TECHNICAL SPECIFICATION:
- **Core Engine:** ${coreEngine}
- **Extended Libraries:** ${libStacks[source.category] || 'GSAP (Animations), Lucide (Icons)'}
- **Environment:** Single File HTML Prototype (Zero Build Step). WAJIB gunakan tautan CDN yang valid (misal: unpkg, jsdelivr, script cdn.tailwindcss.com) di dalam tag <head> atau <body> agar kode langsung jalan di browser tanpa instalasi NPM.
- **Architecture Pattern:** Reactive Component-Based Architecture with Clean SoC (Separation of Concerns).
- **Code Output Restriction:** Tulis KESELURUHAN kode hanya di dalam SATU blok markdown \`\`\`html saja. JANGAN memecah menjadi beberapa blok file.

---

### EXECUTIVE DIRECTIVES:

#### 1. THE MULTI-FEATURE SYNTHESIS (STRATEGY)
Analisis secara mendalam bagaimana **${(source.mechanics || []).length} mekanik** berikut berinteraksi:
  ${(source.mechanics || []).map((m, i) => `${i + 1}. "${m}"`).join('\n  ')}
**SINTESIS KRITIS:** Jangan hanya menggabungkan secara terpisah — buatlah "Synergy Hook". Setiap mekanik harus memiliki dampak langsung pada data atau perilaku mekanik lainnya (Cross-Feature Dependency). Jelaskan rasionalitas strategis di bagian "Rationale".

#### 2. ARCHITECTURE, STATE SCHEMA & LOGIC
- **Clean Architecture:** Pisahkan Logic (State/Actions) dari View (HTML/CSS).
- **Reactive State Schema:** Definisikan skema state global yang komprehensif (seperti Vue/React store).
- **Deep Logic Implementation:** Pastikan logika mekanik inti memiliki algoritma yang nyata (bukan sekadar manipulasi UI). Jika ada "Procedural Generation", gunakan seeding atau noise logic yang valid.

${['Game 2D', 'Game 3D'].includes(source.category) ? `#### 3. CANVAS/WEBGL INTEGRATION & OVERLAY UI
- **Canvas First:** Fokus utama adalah rendering di \`<canvas>\`. Gunakan elemen DOM/HTML HANYA untuk overlay UI (seperti Main Menu, HUD, Settings, Game Over).
- **Diegetic UI/Tutorial:** Hindari tooltip HTML biasa. Berikan instruksi langsung di dalam dunia game (misal: teks di lantai atau animasi tombol berkedip).
- **Global Settings Overlay:** WAJIB sediakan menu Settings overlay (icon gear) untuk mengatur Sound/Audio Toggle, Fullscreen, dan Reset State.

#### 4. ASSETS & ROBUSTNESS (ZERO TOLERANCE)
- **ZERO TOLERANCE CODE:** Code WAJIB no bug, no error, dan no bottleneck. Performa WAJIB stabil 60 FPS tanpa *memory leak* atau *garbage collection spikes*.
- **Asset Generation:** DILARANG menggunakan banyak external URL untuk sprite/texture. Sebisa mungkin hasilkan visual secara prosedural (menggunakan Canvas drawing API, primitive shapes, atau shader) agar file tetap murni mandiri.
- **Data Persistence:** Simpan High Score, Save State, atau preferensi ke **LocalStorage** secara real-time.
- **Bahasa:** Gunakan **Bahasa Indonesia** untuk seluruh teks UI, instruksi, dan menu overlay.` : `#### 3. COLOR SYSTEM & DESIGN TOKENS
- **Hero Color:** ${colors?.color1 || '#3B82F6'} (Gunakan sebagai Brand/Primary Action).
- **Neutral Color:** ${colors?.color2 || '#F3F4F6'} (Gunakan untuk Background/Surface).
- **Accent Color:** ${colors?.color3 || '#10B981'} (Gunakan untuk Highlights/Badges/Interactive feedback).
- **60-30-10 Rule:** Terapkan proporsi warna ini secara ketat untuk mencapai harmoni visual yang premium.
- **Design Tokens:** Gunakan variabel CSS untuk spacing (scale: 4, 8, 16, 24, 32, 48, 64px) dan font-sizes.

#### 4. UX CLARITY, ONBOARDING & FEEDBACK
- **Self-Explanatory UX:** Desain WAJIB minimalis, low cognitive load, dan self-explanatory. User harus langsung paham tanpa harus banyak berpikir.
- **Onboarding (How It Works):** Sediakan panduan visual atau teks (max 4 langkah) yang muncul saat pertama kali aplikasi di-load.
- **Global Settings Menu:** WAJIB sediakan menu Settings/Pengaturan (misal: icon gear) yang berfungsi untuk mengatur Dark/Light Mode, Sound/Audio Toggle, dan Clear Data (Reset).
- **Progressive Disclosure:** Sembunyikan kompleksitas. Tampilkan fitur lanjutan hanya saat user membutuhkannya (Contextual UI).
- **Micro-interactions (Juice):** Setiap interaksi (hover, focus, active, success, error) WAJIB memiliki animasi GSAP yang halus (0.3s - 0.5s duration).

#### 5. ASSETS, ACCESSIBILITY & ROBUSTNESS (ZERO TOLERANCE)
- **ZERO TOLERANCE CODE:** Code WAJIB no bug, no error, dan no bottleneck. Performa harus sangat dioptimalkan tanpa ada memory leak atau lag.
- **Icons:** Lucide Icons (Gunakan secara konsisten).
- **Images:** Gunakan direct link dari penyedia dummy image gratis (seperti https://picsum.photos atau https://placehold.co) yang tidak memerlukan API key agar gambar langsung dirender. DILARANG menggunakan Unsplash API karena membutuhkan otentikasi (Bearer Token) yang akan membuat gambar gagal dimuat.
- **A11y (Accessibility):** Gunakan semantik HTML5, ARIA roles, dan pastikan rasio kontras warna memadai.
- **Error Handling:** Implementasikan "Graceful Failure" dengan fallback UI yang tetap estetik.
- **Data Persistence:** Simpan state aplikasi ke **LocalStorage** secara real-time agar user tidak kehilangan progres.

#### 6. VOICE, TONE & MICRO-COPY
- **BAHASA (MANDATORY):** Gunakan **Bahasa Indonesia** yang profesional, inspiratif, dan user-friendly untuk seluruh elemen UI, teks onboarding, tombol, dan micro-copy.
- Tentukan personality aplikasi berdasarkan kategori [${source.category}]. Hindari bahasa teknis yang membosankan.`}

---

### CATEGORY SPECIFIC FOCUS:
${config.directives.map((d, i) => `${i + 1}. ${d}`).join('\n')}

**DOMAIN EXPERTISE & PSYCHOLOGY:**
${categoryFocusMap[source.category] || ''}

---

### RESPONSE FORMAT (MANDATORY):
PENTING: Karena batasan token, PRIORITASKAN penulisan KODE LENGKAP di atas segalanya. DILARANG KERAS menyingkat kode dengan komentar (seperti "// sisa kode di sini" atau "// logic dilanjutkan nanti").

1. **The Prototype (Full Code):** (TULISKAN INI PERTAMA KALI). WAJIB dalam bentuk Single File HTML utuh di dalam SATU blok markdown \`\`\`html. (Integrasikan semua HTML, CSS, dan JS). Pastikan UI memiliki "WOW factor" pada render pertama.
2. **Executive Rationale:** Penjelasan singkat (maksimal 2 paragraf) tentang sinergi antar mekanik (Synergy Hook) dan mengapa ini menjadi "Game Changer".
3. **Architecture & State Schema:** Rangkuman singkat skema JSON dari state utama aplikasi.
4. **Roadmap & Testing:** Poin-poin singkat (bullet points) untuk fase pengembangan berikutnya dan strategi testing mekanik inti.`;
    },

    generateMasterPrompt(source, colors) {
        return `Act as a "Principal Full-Stack Architect & Senior UI/UX Engineer".

Your primary goal is to build, scale, and debug modern web applications. You have absolute freedom to use modern frameworks and tooling such as React, Next.js, Angular, Vue, Svelte, Vite, TypeScript, and Tailwind CSS.

### THE PROJECT (DiverDea Ideation):
- **App Name**: ${source.appName}
- **Category**: ${source.category}
- **Core Concept**: ${source.product}
- **Mechanics/Features**:
${source.mechanics.map(m => `  - ${m}`).join('\n')}
${source.styles.length ? `- **Styles/Themes**:\n${source.styles.map(s => `  - ${s}`).join('\n')}` : ''}
${source.audiences.length ? `- **Target Audiences**:\n${source.audiences.map(a => `  - ${a}`).join('\n')}` : ''}
${source.constraints.length ? `- **Design Constraints**:\n${source.constraints.map(c => `  - ${c}`).join('\n')}` : ''}
- **Color Palette (Hex)**: Hero(${colors.color1}), Neutral(${colors.color2}), Accent(${colors.color3})

### STRICT ARCHITECTURAL DIRECTIVES:

1. **TECH STACK INITIATION**:
   - Always start by defining the exact CLI commands needed to scaffold the project (e.g., \`npm create vite@latest my-app -- --template react-ts\`).
   - Specify the exact \`npm install\` commands for dependencies.

2. **FOLDER STRUCTURE & MODULARITY**:
   - Never provide a monolithic block of code.
   - Map out a clean, modular folder structure before writing code.
   - Strictly separate UI components from business logic.

3. **TYPESCRIPT & MODERN STANDARDS (If applicable)**:
   - Enforce strict typing via Interfaces or Types. Avoid \`any\`.
   - Use ES6+ modern syntax.

4. **UI/UX & STYLING AESTHETICS**:
   - Use the provided Color Palette effectively.
   - Implement micro-interactions (hover states, skeletons, transitions) for a premium feel.

5. **STEP-BY-STEP EXECUTION**:
   - Do not overwhelm with massive blocks of code.
   - Provide the code file by file, starting from config -> state -> components -> main entry.`;
    },

    randomizeGroup(slots, count, pool) {
        if (!pool || !pool.length) return;
        const used = new Set(slots.filter(s => s.locked).map(s => s.value));
        slots.forEach((slot, i) => {
            if (i < count && !slot.locked) {
                let available = pool.filter(p => !used.has(p));
                slot.value = _.sample(available.length ? available : pool);
                used.add(slot.value);
            }
        });
    }
};
