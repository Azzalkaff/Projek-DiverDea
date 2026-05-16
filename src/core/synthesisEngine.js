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
                    'FUNGSI: Ubah Fungsi Global Menjadi ES6 Classes: Jangan gunakan fungsi biasa atau objek literal untuk mengatur scene. Gunakan class NamaScene extends Phaser.Scene. Ini penting untuk mengisolasi variabel agar tidak saling bertabrakan.',
                    'ASSETS: Buat bentuk objek menggunakan SVG inline untuk menciptakan bentuk assets objek yang akan dibuat, untuk pixel art pakai Base64 PNG + HTML5 <canvas> (Paling Direkomendasikan), Kamu tetap menggambar pakai aplikasi pixel art biasa (seperti Piskel/Aseprite), lalu ekspor jadi .png. Setelah itu, ubah file PNG tersebut menjadi kode Base64 string.',
                    'PHASER ARCHITECTURE: Pisahkan logika ke 3 Class Scene (BootScene, PlayScene, GameOverScene). Gunakan Phaser.Physics.Arcade. WAJIB pakai primitif (Phaser.Graphics), DILARANG meload gambar/Base64. Gunakan Phaser.Scale.FIT. Gambar bentuk primitif hanya sekali di BootScene, ubah menjadi tekstur menggunakan .generateTexture(), lalu gunakan sebagai sprite biasa di PlayScene',
                    'INPUT & COLLISION: Wajib gunakan `createCursorKeys()` untuk polling input di `update()` (bukan addEventListener). Gunakan `this.physics.add.collider()` untuk tabrakan, jangan tulis rumus fisika manual.',
                    'ENVIRONMENT DEPTH: Jangan biarkan background kosong/hitam mati. Buat elemen dinamis yang estetik dan sesuai dengan konsep aplikasi',
                    'PROGRESSION & DIFFICULTY: Terapkan kurva kesulitan dinamis (kecepatan/spawn rate musuh naik seiring waktu). Simpan "High Score" ke LocalStorage secara real-time agar persaingan terasa nyata, namun untuk game story berikan beberapa ending yang dapat terjadi',
                    'DOPAMINE LOOP (HOOK): Jangan hanya cetak skor. Implementasikan sistem "Combo Multiplier" jika pemain bermain agresif tanpa gagal, dan jatuhkan "Power-Ups" secara acak (misal: perisai, tembakan ganda, pelambat waktu).',
                    'DESKTOP-FIRST CONTROLS: EKSKLUSIF untuk Desktop. Gunakan Keyboard (WASD/Arrows/Space) dan Mouse (Pointer/Klik). DILARANG menulis kontrol sentuh (mobile UI).',
                    'PROCEDURAL AUDIO: Gunakan sintesis Web Audio API (OscillatorNode) untuk membuat efek suara yang ada digame, JANGAN meload file audio eksternal. AudioContext harus diinisialisasi atau di-resume tepat saat pemain menekan tombol "Start" di Menu'
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
        
        const mechanicsCount = (source.mechanics || []).length;
        const mechanicsList = (source.mechanics || []).map((m, i) => `  ${i + 1}. "${m}"`).join('\n');
        const aesthetics = (source.styles || []).join(', ') || 'Modern Minimalist';
        const activeConstraint = (source.constraints && source.constraints.length > 0) 
            ? source.constraints.join(', ') 
            : "Must be highly functional, clean, and accessible";
        
        // Memformat Category Directives agar terlihat lebih rapi seperti di contoh (Bold di awal kata)
        const formattedCategoryDirectives = config.directives.map(d => {
            const splitIndex = d.indexOf(':');
            if (splitIndex !== -1) {
                return `- **${d.substring(0, splitIndex)}:**${d.substring(splitIndex + 1)}`;
            }
            return `- ${d}`;
        }).join('\n');

        return `### SYSTEM ROLE:
Berperanlah sebagai **Principal Software Architect & Lead Product Designer** dengan spesialisasi kategori [${source.category.toUpperCase()}]. Tugasmu adalah menciptakan prototype yang melampaui standar MVP biasa.

### PROJECT IDENTITY:
- **Project Name:** "${source.appName}"
- **Domain Focus:** ${source.category}
- **Product Concept:** "${source.product}"
- **Core Mechanics (Multi-Feature Synthesis):**
${mechanicsList}
- **Design Aesthetic:** "${aesthetics}"
- **Design Constraint:** ${activeConstraint}
- **Language:** Bahasa Indonesia, untuk hal2 teknis tetap gunakan bahasa inggris

### TECHNICAL SPECIFICATION:
- **Core Engine:** ${coreEngine}
- **Extended Libraries:** ${libStacks[source.category] || 'GSAP, Lucide Icons'}
- **Environment:** Single File HTML Prototype (Zero Build Step).

---

### EXECUTIVE DIRECTIVES:

#### 1. THE MULTI-FEATURE SYNTHESIS (STRATEGY)
Analisis secara mendalam bagaimana **${mechanicsCount} mekanik** berikut berinteraksi dan saling memperkuat di dalam "${source.product}":
${mechanicsList}
Jangan hanya menggabungkan secara terpisah — **SINTESIS** ketiganya menjadi satu pengalaman yang kohesif dan saling terkait. Setiap mekanik harus terasa seperti bagian integral dari produk, bukan fitur tambahan. Jelaskan rasionalitas strategis di bagian "Rationale".

#### 2. ARCHITECTURE & STATE MANAGEMENT
- Gunakan pola arsitektur yang bersih (Clean Architecture).
- Implementasikan **Reactive State Management** yang robust.
- Pastikan logika setiap mekanik bersifat **Deep Logic** (bukan simulasi visual semata).
- Ketiga mekanik harus memiliki **state yang saling terhubung** — perubahan di satu fitur harus berdampak pada fitur lainnya.

#### 3. DESIGN SYSTEM & MICRO-INTERACTIONS
- **Grid:** Gunakan sistem grid 8pt/4pt untuk konsistensi layout.
- **Palette:** Gunakan Hero: ${colors?.color1 || '#8FD903'}, Neutral: ${colors?.color2 || '#F4D3FF'}, Accent: ${colors?.color3 || '#24C574'}. (Harmonisasikan saturasi agar sesuai dengan gaya "${aesthetics}").
- **Typography:** Gunakan hierarki tipografi yang jelas (Contrast & Readability) dan sesuai dengan tema ${aesthetics}.
- **Juice:** Tambahkan micro-animations (GSAP/CSS) pada setiap interaksi (hover, click, state change).

#### 4. UX CLARITY & LOW COGNITIVE LOAD
- **WAJIB:** Sertakan section "How It Works" atau onboarding tooltip yang menjelaskan cara kerja aplikasi kepada user baru dalam 3-5 langkah sederhana.
- **Information Architecture:** Gunakan progressive disclosure — jangan tampilkan semua fitur sekaligus. Tampilkan fitur utama terlebih dahulu, fitur lanjutan di-reveal bertahap.
- **Visual Hierarchy:** Pastikan user langsung mengerti apa yang harus dilakukan pertama kali tanpa membaca instruksi panjang.
- **Feedback Loop:** Setiap aksi user harus menghasilkan feedback visual/audio yang jelas dan instan.
- **Settings:** berisi toggle untuk on/off audio, on/off darkmode & lightmode

#### 5. ASSETS, ACCESSIBILITY & ROBUSTNESS
- **data:** minimal 20 table data jika aplikasi ini bukan game, untuk game minimal data assets svg chacacter ada 5 yang benar2 bagus; tingkat kesulitan ada hard-medium-low atau jumlah levelnya ada 7 —pilih salahsatu—.
- **Icons:** Lucide Icons (Mandatory).
- **Images:** Unsplash API.
- **Tone:** Playful with strategic Emojis.
- **A11y:** Pastikan elemen interaktif memiliki ARIA labels dan state yang jelas.
- **Error Handling:** Implementasikan penanganan error yang elegan (try-catch, fallback UI).
- **Loading States:** Sediakan skeleton screen atau spinner saat simulasi proses data.
- **Persistence:** Sinkronisasi data secara otomatis ke **LocalStorage**.

#### 6. CREATIVE CONSTRAINT
Semua desain WAJIB mematuhi batasan berikut: **"${activeConstraint}"**. Batasan ini bukan opsional — ini adalah filter utama dalam setiap keputusan desain. Jelaskan bagaimana batasan ini mempengaruhi arsitektur dan UX di bagian Rationale.

---

### CATEGORY SPECIFIC FOCUS:
${formattedCategoryDirectives}

---

### RESPONSE FORMAT (MANDATORY):
1. **Rationale:** Mengapa kombinasi ${mechanicsCount} mekanik ini adalah "Game Changer"? Bagaimana mereka berinteraksi?
2. **Feature Map:** Diagram singkat (teks) yang menunjukkan hubungan antar ${mechanicsCount} mekanik dalam produk.
3. **Technical Architecture:** Penjelasan pola state dan implementasi mekanik inti.
4. **The Prototype (Full Code):** Satu blok kode HTML utuh (CSS & JS di dalamnya).
5. **Production Roadmap:** Strategi skalabilitas, optimasi performa, dan integrasi backend.`;
    },

    generateMasterPrompt(source, libStacks, categoryFocusMap, colors) {
        const mechanicsList = (source.mechanics || []).map(m => `  - ${m}`).join('\n');
        const stylesList = (source.styles || []).length ? `- **Styles/Themes**:\n${source.styles.map(s => `  - ${s}`).join('\n')}` : '';
        const audiencesList = (source.audiences || []).length ? `- **Target Audiences**:\n${source.audiences.map(a => `  - ${a}`).join('\n')}` : '';
        const constraintsList = (source.constraints || []).length ? `- **Design Constraints**:\n${source.constraints.map(c => `  - ${c}`).join('\n')}` : '';

        // Category configs khusus untuk Full-Stack Build (Bukan sekedar Prototype HTML)
        const masterCategoryConfigs = {
            'Productivity': {
                role: 'Principal Workflow & Systems Architect',
                directives: [
                    'SYSTEM ARCHITECTURE: Implement centralized state management for task lifecycles using Zustand/Pinia. Use a Command Pattern for primary user actions.',
                    'KEYBOARD-FIRST UX: Mandatory global hotkeys. Implement focus-trap for modals and highly accessible tab navigation.',
                    'PERFORMANCE: Use Virtual Scrolling for large lists (e.g., tanstack-virtual). Implement optimistic UI updates for database interactions.'
                ]
            },
            'Game 2D': {
                role: 'Principal Game Architect & Creative Technologist',
                directives: [
                    'PHASER ARCHITECTURE: Set up a robust Vite + React/Vue + Phaser 3 integration. Structure game logic into clean Class Scenes (Boot, Preload, Play, UI).',
                    'STATE INTEGRATION: Synchronize Game State (Phaser) with UI State (React/Vue) using an Event Emitter or shared store context.',
                    'PERFORMANCE: Use Phaser Object Pooling for projectiles/enemies to avoid memory leaks and garbage collection spikes.'
                ]
            },
            'Social': {
                role: 'Principal Social Architecture & Growth Engineer',
                directives: [
                    'INTERACTION ARCHITECTURE: Implement an Event-Driven system for Likes/Follows. Ensure optimistic UI updates to mask network latency.',
                    'CONTENT FEED: Design a high-performance infinite scroll with robust data fetching strategies (React Query/SWR).',
                    'REAL-TIME: Prepare the architecture for WebSocket/Supabase Realtime integration for notifications or chat.'
                ]
            },
            'Fintech': {
                role: 'Principal Fintech Security & Data Architect',
                directives: [
                    'DATA PRECISION: Strictly use Dinero.js or Big.js for monetary calculations. No floating-point math for currency.',
                    'SECURITY UX: Implement secure local states, handle JWT best practices conceptually, and design biometric/PIN simulation UI flows.',
                    'TRANSACTION FLOW: Build robust multi-step Wizard forms using React Hook Form + Zod for strict payload validation.'
                ]
            },
            'Health': {
                role: 'Principal Health-Tech & Calm UI Specialist',
                directives: [
                    'DATA PRIVACY: Architect secure patient-data handling logic. Implement "Private Vault" view modes.',
                    'ACCESSIBILITY: Strict WCAG 2.1 AA compliance. Use semantic HTML and ensure health metrics are screen-reader optimized.',
                    'HABIT ARCHITECTURE: Focus on local-first streak tracking (LocalStorage/IndexedDB) that can sync with a backend.'
                ]
            },
            'Education': {
                role: 'Principal Learning Architect & EdTech Engineer',
                directives: [
                    'KNOWLEDGE ARCHITECTURE: Implement Spaced Repetition (SRS) algorithms logic and learning progress persistence.',
                    'STATE MANAGEMENT: Handle complex, deeply nested state for courses, modules, and quiz progress safely.',
                    'GAMIFICATION: Build XP calculation and leveling logic tied securely to user interaction states.'
                ]
            },
            'E-commerce': {
                role: 'Principal Conversion & E-commerce Architect',
                directives: [
                    'CONVERSION FUNNEL: Optimize Cart state management. Ensure the cart persists reliably across sessions.',
                    'PERFORMANCE: Optimize images (Next/Image) and ensure components are structured to support Server-Side Rendering (SSR) for SEO.',
                    'STATE: Handle complex product variant selections (Size/Color matrix) seamlessly without UI lag.'
                ]
            },
            'Utility': {
                role: 'Principal Systems & Tooling Engineer',
                directives: [
                    'EXECUTION SPEED: Integrate Web Workers for heavy data processing to keep the UI thread completely unblocked.',
                    'PERSISTENCE: Use IndexedDB wrappers (like localForage) for handling large files or heavy caching locally.',
                    'ERROR HANDLING: Implement robust Global Error Boundaries and comprehensive fallback UI states.'
                ]
            },
            'Services': {
                role: 'Principal Service-Flow & Logistics Architect',
                directives: [
                    'BOOKING ARCHITECTURE: Implement complex date/time manipulation logic cleanly using date-fns or dayjs.',
                    'SPATIAL DATA: Structure components ready for Leaflet/Google Maps integration with geospatial data handling.',
                    'STATE TIMELINE: Use a strict state machine approach for handling service progression statuses (Pending -> Active -> Done).'
                ]
            },
            'Creative': {
                role: 'Principal Creative Tools & Graphics Architect',
                directives: [
                    'CANVAS ARCHITECTURE: Build robust state management for Canvas Undo/Redo stacks (History API logic).',
                    'PERFORMANCE: Optimize React/Vue component re-renders strictly to prevent frame drops when interacting with Canvas/WebGL contexts.',
                    'EXPORT ENGINE: Implement Blob manipulation and stream handling for saving/exporting user creations.'
                ]
            },
            'Game 3D': {
                role: 'Principal 3D Game Architect & WebGL Engineer',
                directives: [
                    '3D ENGINE: Integrate Babylon.js or React Three Fiber (R3F) cleanly within the modern UI framework.',
                    'PHYSICS: Set up Havok/Cannon.js physics integration, ideally isolating physics calculations in a Web Worker.',
                    'ASSET MANAGEMENT: Implement smart preloading and lazy-loading strategies for heavy GLTF/GLB models to prevent UI freezing.'
                ]
            },
            'Green-Tech': {
                role: 'Principal Eco-Tech & Sustainability Specialist',
                directives: [
                    'IMPACT VISUALIZATION: Integrate Chart.js/Recharts beautifully with dynamic data feeding and responsive resizing.',
                    'PERFORMANCE: Write "Green Code"—highly optimized, minimal re-renders to save client device battery/processing power.',
                    'ACCESSIBILITY: Ensure earthy, eco-friendly themes maintain high contrast ratios that comply with accessibility standards.'
                ]
            },
            'Music': {
                role: 'Principal Web-Audio & DSP Engineer',
                directives: [
                    'AUDIO ARCHITECTURE: Manage Tone.js or Web Audio API contexts safely across React/Vue component lifecycles (unmount/cleanup).',
                    'PRECISION TIMING: Handle audio context resumes seamlessly on first user interaction to comply with browser autoplay policies.',
                    'STATE: Serialize and save complex synth/patch parameter states into robust JSON schemas for local storage.'
                ]
            }
        };

        const config = masterCategoryConfigs[source.category] || {
            role: 'Principal Full-Stack Architect & Lead UI/UX Engineer',
            directives: [
                'ARCHITECTURE: Use Clean Architecture or Feature-Sliced Design (FSD).',
                'UX: Focus on "Keyboard-First" workflow and accessible UI.',
                'QUALITY: Strict TypeScript, zero any types, comprehensive error handling.'
            ]
        };

        const masterEngineMap = {
            'Productivity': 'Next.js (App Router) + Tailwind CSS + Zustand',
            'Game 2D': 'Vite + React + Phaser 3 + Tailwind CSS',
            'Social': 'Next.js (App Router) + Tailwind CSS + Supabase (Architecture)',
            'Fintech': 'Next.js (App Router) + Tailwind CSS + Zod + Dinero.js',
            'Health': 'Next.js (App Router) + Tailwind CSS + Zustand',
            'Education': 'Next.js (App Router) + Tailwind CSS + Zustand',
            'E-commerce': 'Next.js (App Router) + Tailwind CSS + Zustand',
            'Utility': 'Vite + React + Tailwind CSS + Web Workers + IndexedDB',
            'Services': 'Next.js (App Router) + Tailwind CSS + Leaflet',
            'Creative': 'Vite + React + Zustand + Canvas API/Fabric.js',
            'Game 3D': 'Vite + React + React Three Fiber (R3F) / Babylon.js',
            'Green-Tech': 'Next.js + Tailwind CSS + Recharts',
            'Music': 'Vite + React + Tailwind CSS + Tone.js + Zustand'
        };
        const coreMasterEngine = masterEngineMap[source.category] || 'Next.js (App Router) + Tailwind CSS + Zustand';

        return `### SYSTEM ROLE & PRIME DIRECTIVE
Act as a **${config.role}** and **DevSecOps Specialist**. 
Your goal is to architect and build a production-ready, highly scalable, and flawless modern web application using **${coreMasterEngine}**. You write clean, modular, heavily commented, and highly performant code.

---

### 1. PROJECT IDENTITY & SCOPE
- **App Name:** ${source.appName || 'Untitled App'}
- **Category Focus:** ${source.category || 'General Software'}
- **Product Vision:** "${source.product || 'Innovative Web App'}"
- **Core Mechanics (Implement Fully):**
${mechanicsList}
${stylesList}
${audiencesList}
${constraintsList}
- **Brand Color Design Tokens:** 
  - Primary/Hero: \`${colors?.color1 || '#3B82F6'}\`
  - Surface/Neutral: \`${colors?.color2 || '#F3F4F6'}\`
  - Accent/Interactive: \`${colors?.color3 || '#10B981'}\`

---

### 2. STRICT ARCHITECTURAL & CODING STANDARDS
1. **Tech Stack:** You MUST use **${coreMasterEngine}**. **TypeScript is MANDATORY.**
2. **Type Safety:** Use strict TypeScript interfaces/types. Absolutely NO \`any\` types.
3. **Architecture Pattern:** Follow Clean Architecture or Feature-Sliced Design (FSD). Strictly separate:
   - *UI/View Layer* (Dumb components, highly reusable)
   - *State Management* (Zustand/Context, separating UI state from Data state)
   - *Business Logic & Services* (API wrappers, complex math/data parsing)
4. **Styling:** Use Tailwind CSS. Utilize arbitrary values or extend the \`tailwind.config\` to strictly implement the provided Color Tokens. Include modern UI aesthetics (Bento grids, smooth transitions) based on the app's theme.
5. **Zero-Tolerance Quality:** 
   - DO NOT leave placeholders like \`// write logic here\` or \`// to be implemented\`. Write the ACTUAL functional code.
   - Implement robust Error Boundaries and \`try/catch\` logic.
   - Ensure Accessibility (a11y) using ARIA roles and semantic HTML.
   - **Realistic Mock Data:** When creating state or testing logic, generate highly realistic and detailed mock data (not just "Test 1"). Use the project context to generate believable content.

---

### 3. DOMAIN EXPERTISE & SPECIFIC DIRECTIVES (${source.category.toUpperCase()} FOCUS)
${config.directives.map((d, i) => `${i + 1}. ${d}`).join('\n')}${
categoryFocusMap && categoryFocusMap[source.category] ? `\n\n**PSYCHOLOGY & DOMAIN FOCUS:**\n${categoryFocusMap[source.category]}` : ''
}${
libStacks && libStacks[source.category] ? `\n\n**RECOMMENDED DOMAIN LIBRARIES:**\n${libStacks[source.category]}` : ''
}

---

### 4. OUTPUT FORMATTING & BEHAVIOR (CRITICAL FOR AI GENERATION)
- **ZERO YAPPING:** Do not write polite introductions, explanations, or conclusions. Output ONLY the code, CLI commands, and the exact phase completion question at the end.
- **FILE NAMING RULE:** Before EVERY code block, you MUST specify the exact file path inside a markdown header (e.g., \`### File: src/components/ui/Button.tsx\`). 

---

### 5. INTERACTIVE GENERATION PROTOCOL (CRITICAL TO AVOID TOKEN LIMITS)
**PHASE 1: Project Scaffolding & Architecture**
- Output the exact CLI commands to initialize the project for ${coreMasterEngine}.
- List the required NPM dependencies (Tailwind, Lucide icons, State managers, specific domain tools, etc.).
- Output a precise ascii tree of the Folder Structure.
- Provide the configuration files (\`tailwind.config.ts\`, \`tsconfig.json\`, \`vite.config.ts\` / \`next.config.js\`).
- *STOP AND ASK: "Phase 1 Complete. Reply 'next' to generate the Global State, Schema & Utility functions."*

**PHASE 2: Core State Management, Data Schema & Services**
- Write the global state stores (defining the exact TypeScript interfaces and schema).
- Write the utility functions, custom hooks, mock API logic, or Domain logic wrappers (e.g. Physics, Audio, Financial Math).
- *STOP AND ASK: "Phase 2 Complete. Reply 'next' to generate the Master Layout & UI Components."*

**PHASE 3: Reusable UI Components & Master Layout**
- Provide the Master Layout file (Navbars, Sidebars, Footer).
- Provide highly reusable core UI components tailored to the domain (e.g., secure inputs for Fintech, specialized canvas wrappers for Games/Creative).
- *STOP AND ASK: "Phase 3 Complete. Reply 'next' to generate the Core Features & Main Application Pages."*

**PHASE 4: Core Mechanics Implementation**
- Write the main application pages that integrate the State, Components, and fully functionalize the specific **Core Mechanics** requested above.

---
**UNDERSTOOD?** Begin by executing **PHASE 1** immediately. Do not write code for Phase 2 until I say "next".`;
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
