import { categories, libStacks, categoryPalettes, colorHarmonies, categoryFocusMap } from './data/config.js';
import { generalMechanics, conceptsList1, conceptsListLateral } from './data/mechanics.js';
import { generalProducts, conceptsList2 } from './data/products.js';
import { conceptsList3, targetAudiences, constraints } from './data/extras.js';
import { AudioEngine } from './core/audioEngine.js';
import { ColorEngine } from './core/colorEngine.js';
import { SynthesisEngine } from './core/synthesisEngine.js';

// --- TAILWIND CONFIGURATION ---
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            },
            colors: {
                'matcha': '#9cb48c',
                'matcha-dark': '#1a1c18',
                'matcha-surface': '#232620',
                'cream': '#fdfcf9',
                'cream-dark': '#f4f2e6',
                'cream-dim': '#b5bcad',
                'oatmeal': '#d5d0c4',
            }
        }
    }
};

const { createApp } = Vue;

createApp({
    data() {
        return {
            // App State
            synthesisMode: 'standard',
            generatedIdea: true,
            savedIdeas: [],
            isFocusMode: false,
            isDarkMode: false,
            appName: 'NeoZen',
            selectedCategory: 'Productivity',
            lateralCategory: 'Game 2D',
            promptMode: 'standard',
            generatedPrompt: '',
            audioInitialized: false,
            
            // Debug & Trace System
            isDebugMode: false,
            lastPerf: 0,
            errorLog: [],
            traceLog: [],
            
            // Unified State
            productSlot: { value: '', locked: false },
            mechanicSlots: Array.from({ length: 5 }, () => ({ value: '', locked: false })),
            styleSlots: Array.from({ length: 5 }, () => ({ value: '', locked: false })),
            audienceSlots: Array.from({ length: 5 }, () => ({ value: '', locked: false })),
            constraintSlots: Array.from({ length: 5 }, () => ({ value: '', locked: false })),

            // Configuration
            mechanicCount: 2,
            styleCount: 1,
            audienceCount: 1,
            constraintCount: 1,
            useThirdConcept: false,
            useAudience: false,
            useConstraint: false,

            // CRUD & Navigation
            showCrudModal: false,
            modalCategory: 'Productivity',
            targetListForCustom: 'conceptsList1',
            newCustomConcept: '',
            editingSlot: null,
            editingValue: '',
            currentFocus: { type: 'product', index: 0 },
            
            // UI State
            color1: '#9cb48c',
            color2: '#3a3c39',
            color3: '#f0efe9',
            activeHarmony: '',
            orbAnimations: [],

            // Data Pools
            categories, libStacks, generalMechanics, generalProducts, 
            conceptsList1, conceptsListLateral, conceptsList2, conceptsList3, 
            targetAudiences, constraints, categoryPalettes, colorHarmonies, categoryFocusMap
        };
    },
    computed: {
        pools() {
            return {
                mechanic: this.getMechanicPool(),
                product: this.getProductPool(),
                style: this.conceptsList3,
                audience: this.targetAudiences,
                constraint: this.constraints
            };
        }
    },
    methods: {
        // --- DELEGATED ENGINES ---
        initAudioContext() { 
            AudioEngine.init(); 
            this.audioInitialized = true;
        },
        toggleAudio() {
            const isMuted = AudioEngine.toggleMute();
            this.audioInitialized = !isMuted;
            if (!isMuted) this.playPop();
        },
        playPop() { AudioEngine.playPop(); },
        playHoverTick() { AudioEngine.playTick(); },

        // --- TRACE & DEBUG ---
        trace(msg, type = 'info') {
            const entry = { time: new Date().toLocaleTimeString(), msg, type };
            this.traceLog.unshift(entry);
            if (this.traceLog.length > 50) this.traceLog.pop();
            if (this.isDebugMode) console[type === 'error' ? 'error' : 'log'](`[DiverDea ${type.toUpperCase()}] ${msg}`);
        },
        measurePerf(label, fn) {
            const start = performance.now();
            fn();
            const end = performance.now();
            this.lastPerf = (end - start).toFixed(2);
            this.trace(`Perf: ${label} took ${this.lastPerf}ms`, 'info');
        },
        toggleDebug() { this.isDebugMode = !this.isDebugMode; this.trace(`Debug Mode: ${this.isDebugMode ? 'ON' : 'OFF'}`); },
        clearLogs() { this.errorLog = []; this.traceLog = []; },
        checkDataHealth() {
            this.trace('Checking Data Integrity...');
            let issues = 0;
            this.categories.forEach(cat => {
                if (!this.conceptsList1[cat]) { this.trace(`Missing conceptsList1 for ${cat}`, 'error'); issues++; }
                if (!this.conceptsList2[cat]) { this.trace(`Missing conceptsList2 for ${cat}`, 'error'); issues++; }
            });
            this.trace(`Health Check Complete. Issues found: ${issues}`, issues > 0 ? 'error' : 'info');
        },

        // --- THEME & COLORS ---
        toggleTheme() {
            this.playPop();
            this.isDarkMode = !this.isDarkMode;
            document.documentElement.classList.toggle('dark', this.isDarkMode);
        },
        randomizeColors() {
            this.color1 = ColorEngine.getRandomHex(); 
            this.color2 = ColorEngine.getRandomHex(); 
            this.color3 = ColorEngine.getRandomHex();
            this.activeHarmony = ''; this.playHoverTick();
        },
        applyCategoryPalette() {
            const p = this.categoryPalettes[this.selectedCategory];
            if (p) { this.color1 = p.hero; this.color2 = p.neutral; this.color3 = p.accent; this.activeHarmony = ''; this.playPop(); }
        },
        applyColorHarmony(type) {
            this.playPop();
            const { color2, color3 } = ColorEngine.generateHarmony(this.color1, type);
            this.color2 = color2;
            this.color3 = color3;
            this.activeHarmony = type;
        },
        resetToSignature() {
            this.color1 = '#9cb48c'; this.color2 = '#1a1c18'; this.color3 = '#fdfcf9';
            this.activeHarmony = 'signature'; this.playPop();
        },

        // --- POOL LOGIC ---
        getGlobalPool(sourceName) {
            return Object.values(this[sourceName]).flat();
        },
        getMechanicPool() {
            if (this.synthesisMode === 'general') return this.generalMechanics[this.selectedCategory] || [];
            if (this.synthesisMode === 'lateral') return this.getGlobalPool('conceptsListLateral');
            return this.conceptsList1[this.selectedCategory] || [];
        },
        getProductPool() {
            if (this.synthesisMode === 'general') return this.generalProducts[this.selectedCategory] || [];
            if (this.synthesisMode === 'lateral') return this.getGlobalPool('conceptsList2');
            return this.conceptsList2[this.selectedCategory] || [];
        },

        // --- CORE SYNTHESIS ---
        generateLateralIdea(skipAnim = false) {
            this.measurePerf('Idea Synthesis', () => {
                this.playPop(); this.generatedPrompt = '';
                
                if (!this.productSlot.locked) {
                    const prodPool = this.getProductPool();
                    if (prodPool?.length) this.productSlot.value = _.sample(prodPool);
                }

                SynthesisEngine.randomizeGroup(this.mechanicSlots, this.mechanicCount, this.pools.mechanic);
                if (this.useThirdConcept) SynthesisEngine.randomizeGroup(this.styleSlots, this.styleCount, this.pools.style);
                if (this.useAudience) SynthesisEngine.randomizeGroup(this.audienceSlots, this.audienceCount, this.pools.audience);
                if (this.useConstraint) SynthesisEngine.randomizeGroup(this.constraintSlots, this.constraintCount, this.pools.constraint);

                this.generatedIdea = true;
            });

            if (!skipAnim) {
                this.$nextTick(() => {
                    gsap.fromTo(".framework-item", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.05 });
                });
            }
        },
        updateSlot(type, index, direction) {
            const slot = type === 'product' ? this.productSlot : this[type + 'Slots'][index];
            if (slot.locked) return;
            const pool = this.pools[type];
            if (!pool?.length) return;
            const currentIdx = pool.indexOf(slot.value);
            const nextIdx = (currentIdx + direction + pool.length) % pool.length;
            slot.value = pool[nextIdx];
            this.playHoverTick();
        },

        // --- NAVIGATION ---
        handleKeyDown(e) {
            if (this.showCrudModal || e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;

            const activeGroups = [
                { type: 'product', count: 1 },
                { type: 'mechanic', count: this.mechanicCount },
                { type: 'style', count: this.useThirdConcept ? this.styleCount : 0 },
                { type: 'audience', count: this.useAudience ? this.audienceCount : 0 },
                { type: 'constraint', count: this.useConstraint ? this.constraintCount : 0 }
            ].filter(g => g.count > 0);

            const flat = activeGroups.flatMap(g => Array.from({ length: g.count }, (_, i) => ({ type: g.type, index: i })));
            const currentIdx = flat.findIndex(f => f.type === this.currentFocus.type && f.index === this.currentFocus.index);

            if (e.key === 'ArrowUp') {
                this.currentFocus = flat[(currentIdx - 1 + flat.length) % flat.length];
                this.playHoverTick();
            } else if (e.key === 'ArrowDown') {
                this.currentFocus = flat[(currentIdx + 1) % flat.length];
                this.playHoverTick();
            } else if (e.key === 'ArrowRight') {
                this.updateSlot(this.currentFocus.type, this.currentFocus.index, 1);
            } else if (e.key === 'ArrowLeft') {
                this.updateSlot(this.currentFocus.type, this.currentFocus.index, -1);
            } else if (e.key === ' ' || e.key === 'Enter') {
                this.generateLateralIdea();
            }
        },

        // --- PROMPT GENERATION ---
        generateAiPrompt(idea = null) {
            this.playPop();
            const source = idea || {
                appName: this.appName,
                category: this.selectedCategory,
                product: this.productSlot.value,
                mechanics: this.mechanicSlots.slice(0, this.mechanicCount).map(s => s.value),
                styles: this.useThirdConcept ? this.styleSlots.slice(0, this.styleCount).map(s => s.value) : [],
                audiences: this.useAudience ? this.audienceSlots.slice(0, this.audienceCount).map(s => s.value) : [],
                constraints: this.useConstraint ? this.constraintSlots.slice(0, this.constraintCount).map(s => s.value) : []
            };

            if (this.promptMode === 'master') {
                this.generatedPrompt = SynthesisEngine.generateMasterPrompt(
                    source,
                    { color1: this.color1, color2: this.color2, color3: this.color3 }
                );
            } else {
                this.generatedPrompt = SynthesisEngine.generatePrompt(
                    source, 
                    this.libStacks, 
                    this.categoryFocusMap, 
                    { color1: this.color1, color2: this.color2, color3: this.color3 }
                );
            }
        },

        // --- STORAGE & CRUD ---
        saveCurrentIdea() {
            this.playPop();
            const idea = {
                id: Date.now(), appName: this.appName, category: this.selectedCategory,
                product: this.productSlot.value,
                mechanics: this.mechanicSlots.slice(0, this.mechanicCount).map(s => s.value),
                styles: this.useThirdConcept ? this.styleSlots.slice(0, this.styleCount).map(s => s.value) : [],
                audiences: this.useAudience ? this.audienceSlots.slice(0, this.audienceCount).map(s => s.value) : [],
                constraints: this.useConstraint ? this.constraintSlots.slice(0, this.constraintCount).map(s => s.value) : []
            };
            this.savedIdeas.unshift(idea);
            localStorage.setItem('diverdeaIdeas', JSON.stringify(this.savedIdeas));
        },
        loadIdeas() {
            const saved = localStorage.getItem('diverdeaIdeas');
            if (saved) {
                const parsed = JSON.parse(saved);
                this.savedIdeas = parsed.map(idea => ({
                    ...idea,
                    mechanics: idea.mechanics || (idea.currentConcept1 ? [idea.currentConcept1] : [])
                }));
            }
        },
        deleteIdea(id) {
            this.savedIdeas = this.savedIdeas.filter(i => i.id !== id);
            localStorage.setItem('diverdeaIdeas', JSON.stringify(this.savedIdeas));
        },
        
        openCrudManager() {
            this.playPop(); this.modalCategory = this.selectedCategory; this.showCrudModal = true;
        },
        isFlatList(list) { return ['conceptsList3', 'targetAudiences', 'constraints'].includes(list); },
        addCrudItemDirect(list, event) {
            const val = event.target.value.trim();
            if (val) {
                const target = this.isFlatList(list) ? this[list] : this[list][this.modalCategory];
                target.unshift(val);
                event.target.value = ''; this.playPop();
            }
        },
        startCrudEdit(list, index) {
            this.editingSlot = { list, index };
            const target = this.isFlatList(list) ? this[list] : this[list][this.modalCategory];
            this.editingValue = target[index];
        },
        saveCrudEdit() {
            const target = this.isFlatList(this.editingSlot.list) ? this[this.editingSlot.list] : this[this.editingSlot.list][this.modalCategory];
            target[this.editingSlot.index] = this.editingValue.trim();
            this.editingSlot = null; this.playPop();
        },
        deleteCrudItem(list, index) {
            const target = this.isFlatList(list) ? this[list] : this[list][this.modalCategory];
            target.splice(index, 1); this.playHoverTick();
        },

        // --- UTILS ---
        toggleState(key) { this[key] = !this[key]; this.playPop(); },
        setCount(key, val) { this[key] = val; this.playPop(); },
        getData(list) { 
            if (this.isFlatList(list)) return this[list];
            return this[list][this.modalCategory] || [];
        },
        copyToClipboard(event) {
            navigator.clipboard.writeText(this.generatedPrompt);
            const btn = event.currentTarget;
            const original = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
            this.playPop();
            setTimeout(() => { btn.innerHTML = original; this.generatedPrompt = ''; }, 1500);
        },
        initOrbs() {
            gsap.utils.toArray('.orb').forEach(orb => {
                const anim = gsap.to(orb, {
                    x: () => gsap.utils.random(-100, 100), y: () => gsap.utils.random(-100, 100),
                    duration: () => gsap.utils.random(8, 15), ease: "sine.inOut", repeat: -1, yoyo: true
                });
                this.orbAnimations.push(anim);
            });
        }
    },
    watch: {
        synthesisMode(newVal) {
            if (newVal === 'lateral') this.lateralCategory = _.sample(this.categories.filter(c => c !== this.selectedCategory));
            this.generateLateralIdea(true);
            this.trace(`Mode changed to: ${newVal}`);
        },
        selectedCategory() { 
            this.generateLateralIdea(true); 
            this.applyCategoryPalette();
        }
    },
    mounted() {
        window.onerror = (msg, url, line, col, error) => {
            this.trace(`${msg} at ${line}:${col}`, 'error');
            this.errorLog.push({ msg, line, col, time: new Date().toLocaleTimeString() });
            return false;
        };

        this.loadIdeas();
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keydown', (e) => {
            if (e.shiftKey && e.key === 'D') this.toggleDebug();
        });

        this.appName = _.sample(['Neo','Zen','Omni','Flux','Aura']) + _.sample(['Flow','Grid','Mind','Sync','Hub']);
        this.randomizeColors();
        this.checkDataHealth();
        this.generateLateralIdea(true);
        this.$nextTick(this.initOrbs);
        this.trace('DiverDea src/main.js Loaded');
    }
}).mount('#app');
