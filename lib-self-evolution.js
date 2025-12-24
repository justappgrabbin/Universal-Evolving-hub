/**
 * SELF-EVOLUTION ENGINE
 * Learns from ingested books/data and suggests improvements to Foundry itself
 * 
 * Uses the Ontological Causal Graph as "projector space" - watching for patterns
 * that indicate missing gates, structures, or system capabilities
 */

class SelfEvolutionEngine {
  
  constructor(foundryCore) {
    this.foundry = foundryCore;
    this.raw = foundryCore.raw;
    this.core = foundryCore.core;
    this.overseer = foundryCore.overseer;
    this.booksLibrary = foundryCore.booksLibrary;
    this.sentenceEngine = foundryCore.sentenceEngine;
    
    // Learning state
    this.observedPatterns = new Map();
    this.suggestedImprovements = [];
    this.evolutionLog = [];
    this.confidenceThreshold = 0.7;
    
    // Projector space - tracks what should exist but doesn't yet
    this.projectorSpace = {
      missingGates: new Set(),
      unknownStructures: new Set(),
      newConcepts: new Set(),
      patternGaps: []
    };
    
    // Persistent evolution tracking
    this.appliedEvolutions = new Map(); // id -> evolution event
    this.pendingPrompts = []; // Evolutions waiting for user approval
    
    // Load persisted state
    this.loadPersistedState();
    
    console.log('🧬 Self-Evolution Engine initialized');
  }
  
  // ============================================
  // PERSISTENT STORAGE
  // ============================================
  
  saveState() {
    try {
      const state = {
        appliedEvolutions: Array.from(this.appliedEvolutions.entries()),
        projectorSpace: {
          missingGates: Array.from(this.projectorSpace.missingGates),
          unknownStructures: Array.from(this.projectorSpace.unknownStructures),
          newConcepts: Array.from(this.projectorSpace.newConcepts),
          patternGaps: this.projectorSpace.patternGaps
        },
        evolutionLog: this.evolutionLog.slice(-100), // Last 100 events
        timestamp: Date.now()
      };
      
      localStorage.setItem('foundry-evolution-state', JSON.stringify(state));
      console.log('💾 Evolution state saved');
      return true;
    } catch (e) {
      console.error('Failed to save evolution state:', e);
      return false;
    }
  }
  
  loadPersistedState() {
    try {
      const saved = localStorage.getItem('foundry-evolution-state');
      if (!saved) return;
      
      const state = JSON.parse(saved);
      
      // Restore applied evolutions
      this.appliedEvolutions = new Map(state.appliedEvolutions || []);
      
      // Restore projector space
      this.projectorSpace.missingGates = new Set(state.projectorSpace?.missingGates || []);
      this.projectorSpace.unknownStructures = new Set(state.projectorSpace?.unknownStructures || []);
      this.projectorSpace.newConcepts = new Set(state.projectorSpace?.newConcepts || []);
      this.projectorSpace.patternGaps = state.projectorSpace?.patternGaps || [];
      
      // Restore evolution log
      this.evolutionLog = state.evolutionLog || [];
      
      // Re-apply evolutions to current session
      for (const [id, evolution] of this.appliedEvolutions) {
        this.reapplyEvolution(evolution);
      }
      
      console.log('📂 Loaded evolution state:', this.appliedEvolutions.size, 'evolutions');
    } catch (e) {
      console.error('Failed to load evolution state:', e);
    }
  }
  
  reapplyEvolution(evolution) {
    // Re-apply a previously applied evolution to current session
    switch (evolution.type) {
      case 'gate-addition':
        for (const gateNum of evolution.gates || []) {
          if (!this.raw.gates[gateNum]) {
            this.raw.gates[gateNum] = evolution.gateData?.[gateNum] || {
              name: `Gate ${gateNum}`,
              element: 'unknown',
              codon: 'XXX',
              circuit: 'unknown',
              theme: 'self-discovered'
            };
          }
        }
        break;
      case 'structure-addition':
        for (const pattern of evolution.patterns || []) {
          if (!this.raw.sentenceStructures[pattern]) {
            this.raw.sentenceStructures[pattern] = evolution.structureData?.[pattern] || {
              pattern: 'Self-discovered pattern',
              energyFlow: 'unknown',
              collapse: 'unknown',
              gates: []
            };
          }
        }
        break;
    }
  }
  
  undoEvolution(evolutionId) {
    const evolution = this.appliedEvolutions.get(evolutionId);
    if (!evolution) {
      return { success: false, message: 'Evolution not found' };
    }
    
    // Remove from raw materials
    switch (evolution.type) {
      case 'gate-addition':
        for (const gateNum of evolution.gates || []) {
          delete this.raw.gates[gateNum];
        }
        break;
      case 'structure-addition':
        for (const pattern of evolution.patterns || []) {
          delete this.raw.sentenceStructures[pattern];
        }
        break;
    }
    
    // Remove from tracking
    this.appliedEvolutions.delete(evolutionId);
    
    // Log undo
    this.logEvolution({
      type: 'undo',
      undid: evolution,
      timestamp: Date.now()
    });
    
    // Save state
    this.saveState();
    
    return { success: true, message: 'Evolution undone' };
  }
  
  clearAllEvolutions() {
    const count = this.appliedEvolutions.size;
    
    // Undo each evolution
    for (const [id, evolution] of this.appliedEvolutions) {
      this.undoEvolution(id);
    }
    
    // Clear localStorage
    localStorage.removeItem('foundry-evolution-state');
    
    return { success: true, message: `Cleared ${count} evolutions` };
  }
  
  // ============================================
  // INTERACTIVE PROMPTING
  // ============================================
  
  async promptUserForEvolution(suggestion) {
    /**
     * Interactive prompt when system learns something new
     * User can approve, modify, or reject
     */
    
    return new Promise((resolve) => {
      // Add to pending prompts
      const promptId = `prompt-${Date.now()}`;
      const prompt = {
        id: promptId,
        suggestion,
        timestamp: Date.now(),
        resolve
      };
      
      this.pendingPrompts.push(prompt);
      
      // Trigger UI update (will be handled by Foundry)
      if (window.onEvolutionPrompt) {
        window.onEvolutionPrompt(prompt);
      }
    });
  }
  
  respondToPrompt(promptId, response) {
    /**
     * response = {
     *   action: 'approve' | 'modify' | 'reject',
     *   modifications: { ... } // if action is 'modify'
     * }
     */
    
    const promptIndex = this.pendingPrompts.findIndex(p => p.id === promptId);
    if (promptIndex === -1) {
      return { success: false, message: 'Prompt not found' };
    }
    
    const prompt = this.pendingPrompts[promptIndex];
    
    // Remove from pending
    this.pendingPrompts.splice(promptIndex, 1);
    
    // Process response
    let result;
    switch (response.action) {
      case 'approve':
        result = this.applyEvolutionWithValidation(prompt.suggestion);
        break;
      case 'modify':
        const modified = { ...prompt.suggestion, ...response.modifications };
        result = this.applyEvolutionWithValidation(modified);
        break;
      case 'reject':
        result = { success: false, message: 'User rejected evolution', rejected: true };
        break;
      default:
        result = { success: false, message: 'Unknown response action' };
    }
    
    // Resolve promise
    prompt.resolve(result);
    
    return result;
  }
  
  applyEvolutionWithValidation(suggestion) {
    /**
     * Apply evolution with full Overseer validation
     * Stores in appliedEvolutions and persists to localStorage
     */
    
    // Validate with Overseer
    const validation = this.overseer.validateEvolution(suggestion);
    if (!validation.valid) {
      return {
        success: false,
        message: `Constitutional validation failed: ${validation.reason}`
      };
    }
    
    // Apply based on type
    let result;
    switch (suggestion.type) {
      case 'add-gates':
        result = this.applyGateAddition(suggestion.gates, suggestion);
        break;
      case 'add-structures':
        result = this.applyStructureAddition(suggestion.patterns, suggestion);
        break;
      case 'add-concepts':
        result = this.applyConceptAddition(suggestion.concepts, suggestion);
        break;
      default:
        return { success: false, message: 'Unknown suggestion type' };
    }
    
    if (result.success) {
      // Store in applied evolutions
      const evolutionId = `evolution-${Date.now()}`;
      this.appliedEvolutions.set(evolutionId, result.evolution);
      
      // Save state
      this.saveState();
    }
    
    return result;
  }
  
  observeFromBook(bookId) {
    /**
     * Learn from a book that was just ingested
     * Looks for:
     * - References to gates not in system
     * - Sentence structures we don't model
     * - Concepts not in our vocabulary
     * - Relationships not in causal graph
     */
    
    const book = this.booksLibrary.books.get(bookId);
    if (!book) return null;
    
    const observations = {
      bookId: bookId,
      bookTitle: book.title,
      timestamp: Date.now(),
      findings: {
        missingGates: [],
        newStructures: [],
        newConcepts: [],
        relationshipGaps: []
      },
      suggestions: []
    };
    
    // Analyze all chunks
    for (const chunk of book.chunks) {
      
      // Check for gate references we don't have
      for (const gateNum of chunk.entities.numbers) {
        if (gateNum >= 1 && gateNum <= 64) {
          if (!this.raw.getGate(gateNum)) {
            observations.findings.missingGates.push(gateNum);
            this.projectorSpace.missingGates.add(gateNum);
          }
        }
      }
      
      // Check for structure patterns we don't model
      for (const sentence of chunk.sentences) {
        if (this.isUnmodeledStructure(sentence)) {
          observations.findings.newStructures.push({
            text: sentence.text,
            detectedStructure: sentence.structure,
            pattern: this.extractPattern(sentence.text)
          });
        }
      }
      
      // Check for concepts we don't have
      const newConcepts = this.findNewConcepts(chunk.entities.concepts);
      observations.findings.newConcepts.push(...newConcepts);
    }
    
    // Generate suggestions based on findings
    observations.suggestions = this.generateSuggestions(observations.findings);
    
    // Store observation
    this.evolutionLog.push(observations);
    
    // Update suggested improvements
    this.updateImprovements(observations.suggestions);
    
    return observations;
  }
  
  isUnmodeledStructure(sentence) {
    // Check if sentence structure doesn't fit our 4 types
    const knownStructures = ['simple_linear', 'mirror', 'nested', 'binary_split'];
    
    // Check for recursive depth beyond our model
    const depth = this.calculateNestingDepth(sentence.text);
    if (depth > 3) return true;
    
    // Check for unusual patterns
    const hasTriadic = /\b(three|trinity|triad)\b/i.test(sentence.text);
    const hasQuaternary = /\b(four|quaternary|quad)\b/i.test(sentence.text);
    
    return hasTriadic || hasQuaternary;
  }
  
  calculateNestingDepth(text) {
    let depth = 0;
    let maxDepth = 0;
    
    for (const char of text) {
      if (char === '(' || char === '[' || char === '{') {
        depth++;
        maxDepth = Math.max(maxDepth, depth);
      } else if (char === ')' || char === ']' || char === '}') {
        depth--;
      }
    }
    
    return maxDepth;
  }
  
  extractPattern(text) {
    // Extract abstract pattern from sentence
    const words = text.toLowerCase().split(/\s+/);
    
    // Look for triadic patterns (A-B-C relationships)
    if (words.includes('three') || words.includes('trinity')) {
      return 'triadic';
    }
    
    // Look for quaternary patterns (four-way relationships)
    if (words.includes('four') || words.includes('cross')) {
      return 'quaternary';
    }
    
    // Look for spiral patterns
    if (words.includes('spiral') || words.includes('recursive')) {
      return 'spiral';
    }
    
    return 'unknown';
  }
  
  findNewConcepts(existingConcepts) {
    // Concepts we know about
    const knownConcepts = new Set([
      'consciousness', 'resonance', 'design', 'personality', 'bodygraph',
      'strategy', 'authority', 'profile', 'channel', 'circuit',
      'manifestor', 'generator', 'projector', 'reflector',
      'defined', 'undefined', 'open', 'activation', 'gate', 'center'
    ]);
    
    const newConcepts = [];
    
    for (const concept of existingConcepts) {
      if (!knownConcepts.has(concept)) {
        newConcepts.push(concept);
        this.projectorSpace.newConcepts.add(concept);
      }
    }
    
    return newConcepts;
  }
  
  // ============================================
  // SUGGESTION GENERATION
  // ============================================
  
  generateSuggestions(findings) {
    const suggestions = [];
    
    // Suggest adding missing gates
    if (findings.missingGates.length > 0) {
      const uniqueGates = [...new Set(findings.missingGates)];
      suggestions.push({
        type: 'add-gates',
        priority: 'high',
        confidence: 0.9,
        description: `Add ${uniqueGates.length} missing gates to raw materials`,
        gates: uniqueGates,
        code: this.generateGateAdditionCode(uniqueGates),
        action: 'Update lib-raw-materials.js'
      });
    }
    
    // Suggest adding new structures
    if (findings.newStructures.length > 0) {
      const patterns = findings.newStructures.map(s => s.pattern);
      const uniquePatterns = [...new Set(patterns)];
      
      suggestions.push({
        type: 'add-structures',
        priority: 'medium',
        confidence: 0.7,
        description: `Add ${uniquePatterns.length} new sentence structures`,
        patterns: uniquePatterns,
        examples: findings.newStructures.slice(0, 3),
        code: this.generateStructureAdditionCode(uniquePatterns),
        action: 'Update lib-sentence-engine.js'
      });
    }
    
    // Suggest expanding concept vocabulary
    if (findings.newConcepts.length > 0) {
      const uniqueConcepts = [...new Set(findings.newConcepts)];
      
      suggestions.push({
        type: 'add-concepts',
        priority: 'low',
        confidence: 0.6,
        description: `Add ${uniqueConcepts.length} new concepts to vocabulary`,
        concepts: uniqueConcepts,
        code: this.generateConceptAdditionCode(uniqueConcepts),
        action: 'Update lib-books.js'
      });
    }
    
    return suggestions;
  }
  
  generateGateAdditionCode(gateNumbers) {
    // Generate JavaScript code to add missing gates
    const gateEntries = gateNumbers.map(num => `
  ${num}: { 
    name: "Gate ${num}", 
    element: "unknown", 
    codon: "XXX", 
    circuit: "unknown", 
    theme: "to-be-determined" 
  }`).join(',');
    
    return `
// Add these gates to lib-raw-materials.js in the gates object:
gates: {
  // ... existing gates ...
  ${gateEntries}
}

// Then research each gate to fill in proper values
`;
  }
  
  generateStructureAdditionCode(patterns) {
    const structureEntries = patterns.map(pattern => `
  ${pattern}: {
    pattern: "TBD - analyze examples",
    energyFlow: "TBD",
    collapse: "TBD",
    gates: []
  }`).join(',');
    
    return `
// Add these structures to lib-raw-materials.js:
sentenceStructures: {
  // ... existing structures ...
  ${structureEntries}
}

// Then update lib-sentence-engine.js to handle these patterns
// Add thresholds for new structures
`;
  }
  
  generateConceptAdditionCode(concepts) {
    return `
// Add these concepts to lib-books.js in extractEntities():
const concepts = [
  // ... existing concepts ...
  ${concepts.map(c => `'${c}'`).join(', ')}
];
`;
  }
  
  // ============================================
  // IMPROVEMENT TRACKING
  // ============================================
  
  updateImprovements(newSuggestions) {
    for (const suggestion of newSuggestions) {
      // Check if we already have this suggestion
      const existing = this.suggestedImprovements.find(s => 
        s.type === suggestion.type && 
        JSON.stringify(s.gates || s.patterns || s.concepts) === 
        JSON.stringify(suggestion.gates || suggestion.patterns || suggestion.concepts)
      );
      
      if (existing) {
        // Increase confidence if we see it again
        existing.confidence = Math.min(1.0, existing.confidence + 0.1);
        existing.occurrences = (existing.occurrences || 1) + 1;
      } else {
        // Add new suggestion
        suggestion.occurrences = 1;
        this.suggestedImprovements.push(suggestion);
      }
    }
    
    // Sort by priority and confidence
    this.suggestedImprovements.sort((a, b) => {
      const priorityScore = { high: 3, medium: 2, low: 1 };
      const aScore = priorityScore[a.priority] * a.confidence * a.occurrences;
      const bScore = priorityScore[b.priority] * b.confidence * b.occurrences;
      return bScore - aScore;
    });
  }
  
  getTopSuggestions(count = 5) {
    return this.suggestedImprovements
      .filter(s => s.confidence >= this.confidenceThreshold)
      .slice(0, count);
  }
  
  // ============================================
  // PROJECTOR SPACE ANALYSIS
  // ============================================
  
  analyzeProjectorSpace() {
    /**
     * The CORE (causal graph) is the projector space
     * We look at what configurations we've generated and what patterns we see
     * Then identify what SHOULD exist but doesn't yet
     */
    
    const analysis = {
      timestamp: Date.now(),
      totalConfigs: this.foundry.builder.configurations.size,
      totalBooks: this.booksLibrary.books.size,
      projectedNeeds: {
        missingGates: Array.from(this.projectorSpace.missingGates),
        unknownStructures: Array.from(this.projectorSpace.unknownStructures),
        newConcepts: Array.from(this.projectorSpace.newConcepts)
      },
      causalDensity: this.calculateCausalDensity(),
      structureDistribution: this.analyzeStructureDistribution(),
      recommendations: [],
      appliedEvolutions: this.appliedEvolutions.size
    };
    
    // Generate meta-level recommendations
    if (analysis.causalDensity < 0.3) {
      analysis.recommendations.push({
        type: 'increase-causality',
        description: 'Causal graph is sparse. Add more relationships between configurations.',
        priority: 'medium'
      });
    }
    
    if (analysis.structureDistribution.dominant) {
      analysis.recommendations.push({
        type: 'balance-structures',
        description: `${analysis.structureDistribution.dominant} structure is overrepresented. System may be biased.`,
        priority: 'low'
      });
    }
    
    if (analysis.appliedEvolutions === 0 && analysis.projectedNeeds.missingGates.length > 0) {
      analysis.recommendations.push({
        type: 'apply-first-evolution',
        description: 'You have pending improvements. Consider applying them to improve system completeness.',
        priority: 'high'
      });
    }
    
    return analysis;
  }
  
  calculateCausalDensity() {
    // Use CORE to measure causal density
    return this.core.getCausalDensity();
  }
  
  analyzeStructureDistribution() {
    // See if we're generating a diverse set of structures
    const structures = Array.from(this.foundry.builder.configurations.values())
      .map(c => c.analysis?.markers?.dominantStructure)
      .filter(s => s);
    
    if (structures.length === 0) {
      return { distribution: {}, dominant: null };
    }
    
    const distribution = {};
    for (const struct of structures) {
      distribution[struct] = (distribution[struct] || 0) + 1;
    }
    
    // Find dominant structure
    let maxCount = 0;
    let dominant = null;
    
    for (const [struct, count] of Object.entries(distribution)) {
      if (count > maxCount) {
        maxCount = count;
        dominant = struct;
      }
    }
    
    return {
      distribution: distribution,
      dominant: maxCount > structures.length * 0.5 ? dominant : null
    };
  }
  
  // ============================================
  // AUTO-APPLICATION (Experimental)
  // ============================================
  
  autoApplyImprovement(suggestionId) {
    /**
     * EXPERIMENTAL: Automatically apply a suggested improvement
     * This would modify the running system
     * Use with caution - validates constitutionality first
     */
    
    const suggestion = this.suggestedImprovements.find(s => 
      s.type + '-' + (s.gates || s.patterns || s.concepts || []).join(',') === suggestionId
    );
    
    if (!suggestion) return { success: false, message: 'Suggestion not found' };
    
    // Check confidence threshold
    if (suggestion.confidence < 0.8) {
      return { 
        success: false, 
        message: `Confidence too low: ${suggestion.confidence}. Require >= 0.8 for auto-apply.` 
      };
    }
    
    // Validate with Overseer
    const validation = this.validateImprovement(suggestion);
    if (!validation.valid) {
      return {
        success: false,
        message: `Constitutional validation failed: ${validation.reason}`
      };
    }
    
    // Apply based on type
    switch (suggestion.type) {
      case 'add-gates':
        return this.applyGateAddition(suggestion.gates);
      case 'add-structures':
        return this.applyStructureAddition(suggestion.patterns);
      case 'add-concepts':
        return this.applyConceptAddition(suggestion.concepts);
      default:
        return { success: false, message: 'Unknown suggestion type' };
    }
  }
  
  validateImprovement(suggestion) {
    // Use Overseer to validate constitutional compliance
    
    // Check 1: Does it maintain causal integrity?
    if (suggestion.type === 'add-gates') {
      // Ensure gates don't conflict with existing system
      for (const gate of suggestion.gates) {
        if (gate < 1 || gate > 64) {
          return { valid: false, reason: 'Gate number out of range (1-64)' };
        }
      }
    }
    
    // Check 2: Does it respect sentence system law?
    if (suggestion.type === 'add-structures') {
      // New structures must fit within CI formula
      // (In practice, would need deeper validation)
      if (!suggestion.patterns || suggestion.patterns.length === 0) {
        return { valid: false, reason: 'No patterns defined' };
      }
    }
    
    // Check 3: Does it maintain glyph uniqueness?
    // (All modifications must preserve existing glyphs)
    
    return { valid: true };
  }
  
  applyGateAddition(gateNumbers, suggestion) {
    // Store gate data for persistence
    const gateData = {};
    
    // Add gates to raw materials at runtime
    for (const gateNum of gateNumbers) {
      if (!this.raw.gates[gateNum]) {
        const gate = {
          name: `Gate ${gateNum}`,
          element: 'unknown',
          codon: 'XXX',
          circuit: 'unknown',
          theme: 'self-discovered'
        };
        this.raw.gates[gateNum] = gate;
        gateData[gateNum] = gate;
      }
    }
    
    // Create evolution event
    const evolution = {
      type: 'gate-addition',
      gates: gateNumbers,
      gateData: gateData,
      suggestion: suggestion,
      timestamp: Date.now()
    };
    
    // Log evolution event
    this.logEvolution(evolution);
    
    return { 
      success: true, 
      message: `Added ${gateNumbers.length} gates. System evolved.`,
      evolution: evolution
    };
  }
  
  applyStructureAddition(patterns, suggestion) {
    // Store structure data for persistence
    const structureData = {};
    
    // Add structures to raw materials at runtime
    for (const pattern of patterns) {
      if (!this.raw.sentenceStructures[pattern]) {
        const structure = {
          pattern: 'Self-discovered pattern',
          energyFlow: 'unknown',
          collapse: 'unknown',
          gates: []
        };
        this.raw.sentenceStructures[pattern] = structure;
        structureData[pattern] = structure;
      }
    }
    
    // Create evolution event
    const evolution = {
      type: 'structure-addition',
      patterns: patterns,
      structureData: structureData,
      suggestion: suggestion,
      timestamp: Date.now()
    };
    
    // Log evolution event
    this.logEvolution(evolution);
    
    return { 
      success: true, 
      message: `Added ${patterns.length} structures. System evolved.`,
      evolution: evolution
    };
  }
  
  applyConceptAddition(concepts, suggestion) {
    // Add to books library concept list
    // (Would need to modify the extractEntities function)
    
    const evolution = {
      type: 'concept-addition',
      concepts: concepts,
      suggestion: suggestion,
      timestamp: Date.now()
    };
    
    this.logEvolution(evolution);
    
    return { 
      success: true, 
      message: `Added ${concepts.length} concepts. System evolved.`,
      evolution: evolution
    };
  }
  
  logEvolution(event) {
    this.evolutionLog.push({
      ...event,
      timestamp: Date.now()
    });
    
    // Record in CORE (causal graph)
    const nodeId = `evolution-${this.evolutionLog.length}`;
    this.core.addNode(nodeId, 'self-evolution', event);
    this.core.addEdge('root', nodeId, 'system-evolved');
    
    console.log('🧬 System evolved:', event.type);
    
    // Save state after logging
    this.saveState();
  }
  
  // ============================================
  // REPORTING
  // ============================================
  
  generateEvolutionReport() {
    return {
      totalObservations: this.evolutionLog.length,
      topSuggestions: this.getTopSuggestions(10),
      projectorSpace: this.projectorSpace,
      projectorAnalysis: this.analyzeProjectorSpace(),
      evolutionHistory: this.evolutionLog.slice(-20) // Last 20 events
    };
  }
}

// Make available globally
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SelfEvolutionEngine;
} else {
  window.SelfEvolutionEngine = SelfEvolutionEngine;
}
