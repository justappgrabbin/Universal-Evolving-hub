/**
 * FOUNDRY CORE
 * Constitutional system initialization
 * NO UI CODE - pure system logic
 */

class FoundrySystem {
  constructor() {
    // Initialize raw materials
    this.raw = window.RawMaterials;
    
    // Initialize sentence engine
    this.sentenceEngine = new window.SentenceSystemEngine(this.raw);
    
    // Initialize resonance engine
    this.resonanceEngine = new window.ResonanceEngine(this.raw);
    
    // Initialize books library
    this.booksLibrary = new window.BooksLibrary();
    
    // Initialize Four Pillars
    this.core = new window.Core();
    this.selector = new window.Selector(this.raw, this.sentenceEngine);
    this.builder = new window.Builder(this.core, this.raw, this.sentenceEngine);
    this.overseer = new window.Overseer(this.core);
    
    // Initialize self-evolution engine
    this.evolutionEngine = new window.SelfEvolutionEngine(this);
    
    // Initialize Universal Builder
    this.universalBuilder = new window.UniversalBuilder(this);
    
    // System state
    this.ready = false;
    
    console.log('🏛️ Four Pillars Architecture Initialized');
    console.log('  ├── CORE: Ontological causal graph');
    console.log('  ├── SELECTOR: Resonance matching');
    console.log('  ├── BUILDER: Configuration assembly');
    console.log('  └── OVERSEER: Constitutional validation');
    console.log('🌊 Resonance Engine: ACTIVE');
    console.log('🧬 Self-Evolution: ACTIVE');
    console.log('🏗️ Universal Builder: ACTIVE');
    
    this.ready = true;
  }
  
  // ============================================
  // PUBLIC API
  // ============================================
  
  generateConfiguration(userData) {
    if (!this.ready) {
      throw new Error('System not ready');
    }
    
    // Analyze with SELECTOR
    const analysis = this.selector.analyzeConsciousness(userData);
    
    // Build with BUILDER
    const config = this.builder.build(userData, analysis);
    
    // Validate with OVERSEER
    const validation = this.overseer.validateConfiguration(config);
    
    if (!validation.valid) {
      console.error('Configuration failed validation:', validation.checks);
      throw new Error('Configuration validation failed');
    }
    
    return config;
  }
  
  loadBook(fileContent, metadata) {
    const book = this.booksLibrary.addBook({
      id: `book-${Date.now()}`,
      title: metadata.title || 'Untitled',
      author: metadata.author || 'Unknown',
      content: fileContent,
      metadata: {
        type: metadata.type || 'reference',
        topics: metadata.topics || [],
        year: metadata.year || new Date().getFullYear()
      }
    });
    
    // SELF-EVOLUTION: Observe and learn
    const observations = this.evolutionEngine.observeFromBook(book.id);
    
    return {
      book,
      observations
    };
  }
  
  async proposeEvolutions() {
    // Get suggestions that meet confidence threshold
    const suggestions = this.evolutionEngine.getTopSuggestions(10)
      .filter(s => s.confidence >= 0.7);
    
    return suggestions;
  }
  
  async applyEvolution(suggestion, userApproval = false) {
    if (!userApproval && suggestion.confidence < 0.8) {
      throw new Error('User approval required for confidence < 80%');
    }
    
    const result = this.evolutionEngine.applyEvolutionWithValidation(suggestion);
    return result;
  }
  
  undoEvolution(evolutionId) {
    return this.evolutionEngine.undoEvolution(evolutionId);
  }
  
  getSystemStatus() {
    return {
      ready: this.ready,
      pillars: {
        core: {
          nodes: this.core.nodes.size,
          edges: this.core.edges.length,
          density: this.core.getCausalDensity()
        },
        builder: {
          configurations: this.builder.configurations.size,
          glyphs: this.builder.glyphs.size
        },
        overseer: {
          violations: this.overseer.violations.length,
          validations: this.overseer.validationLog.length
        }
      },
      evolution: {
        observations: this.evolutionEngine.evolutionLog.length,
        suggestions: this.evolutionEngine.suggestedImprovements.length,
        applied: this.evolutionEngine.appliedEvolutions.size,
        projectorSpace: {
          missingGates: this.evolutionEngine.projectorSpace.missingGates.size,
          unknownStructures: this.evolutionEngine.projectorSpace.unknownStructures.size,
          newConcepts: this.evolutionEngine.projectorSpace.newConcepts.size
        }
      },
      books: {
        loaded: this.booksLibrary.books.size,
        chunks: this.booksLibrary.chunks.size
      }
    };
  }
  
  exportConfiguration(glyphId) {
    const config = this.builder.configurations.get(glyphId);
    if (!config) {
      throw new Error('Configuration not found');
    }
    
    return this.builder.generateHTML(config);
  }
  
  exportSystemState() {
    return {
      causalGraph: this.core.exportGraph(),
      configurations: Array.from(this.builder.configurations.entries()),
      evolutionState: {
        applied: Array.from(this.evolutionEngine.appliedEvolutions.entries()),
        log: this.evolutionEngine.evolutionLog
      },
      timestamp: Date.now()
    };
  }
  
  // ============================================
  // UNIVERSAL BUILDER API
  // ============================================
  
  async buildAppFromFile(file, content) {
    if (!this.ready) {
      throw new Error('System not ready');
    }
    
    return await this.universalBuilder.buildFromUpload(file, content);
  }
  
  async buildAppFromDescription(description, appType) {
    if (!this.ready) {
      throw new Error('System not ready');
    }
    
    return await this.universalBuilder.buildFromDescription(description, appType);
  }
  
  getBuildHistory() {
    return this.universalBuilder.buildHistory;
  }
  
  getAvailableTemplates() {
    return Array.from(this.universalBuilder.templates.keys());
  }
  
  // ============================================
  // RESONANCE ENGINE API
  // ============================================
  
  calculateResonance(profile1, profile2) {
    if (!this.ready) {
      throw new Error('System not ready');
    }
    
    return this.resonanceEngine.calculateResonance(profile1, profile2);
  }
  
  findMatches(sourceProfile, candidateProfiles, limit = 10) {
    if (!this.ready) {
      throw new Error('System not ready');
    }
    
    return this.resonanceEngine.findBestMatches(sourceProfile, candidateProfiles, limit);
  }
  
  formGroup(profiles, groupSize = 3) {
    if (!this.ready) {
      throw new Error('System not ready');
    }
    
    return this.resonanceEngine.formOptimalGroup(profiles, groupSize);
  }
  
  detectInterference(profile1, profile2) {
    if (!this.ready) {
      throw new Error('System not ready');
    }
    
    return this.resonanceEngine.detectInterference(profile1, profile2);
  }
  
  generateResonanceReport(profile1, profile2) {
    if (!this.ready) {
      throw new Error('System not ready');
    }
    
    return this.resonanceEngine.generateResonanceReport(profile1, profile2);
  }
}

// Make available globally
window.FoundrySystem = FoundrySystem;
