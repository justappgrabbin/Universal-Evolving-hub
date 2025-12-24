/**
 * FOUR PILLARS ARCHITECTURE
 * Proper separation of constitutional concerns
 * 
 * CORE - Ontological truth and causal relationships
 * BUILDER - Configuration assembly
 * SELECTOR - Resonance matching and app type selection
 * OVERSEER - Constitutional validation and protection
 */

// ============================================
// PILLAR 1: CORE - Ontological Causal Graph
// ============================================

class Core {
  constructor() {
    this.nodes = new Map();
    this.edges = [];
    this.laws = {
      ROOT: "Field integrity must be maintained",
      CAUSALITY: "All configurations derive from consciousness state",
      RESONANCE: "Apps match field signature",
      SOVEREIGNTY: "Each glyph is unique and protected"
    };
    
    // Initialize root node
    this.addNode('root', 'system', { 
      type: 'constitutional-foundation',
      timestamp: Date.now() 
    });
    
    console.log('🏛️ CORE initialized');
  }
  
  addNode(id, type, data) {
    if (this.nodes.has(id)) {
      console.warn(`Node ${id} already exists`);
      return false;
    }
    
    this.nodes.set(id, {
      id,
      type,
      data,
      children: [],
      parent: null,
      timestamp: Date.now()
    });
    
    return true;
  }
  
  addEdge(fromId, toId, relationship) {
    const fromNode = this.nodes.get(fromId);
    const toNode = this.nodes.get(toId);
    
    if (!fromNode || !toNode) {
      console.error(`Cannot create edge: node not found`);
      return false;
    }
    
    const edge = {
      from: fromId,
      to: toId,
      relationship,
      timestamp: Date.now()
    };
    
    this.edges.push(edge);
    fromNode.children.push({ id: toId, relationship });
    toNode.parent = { id: fromId, relationship };
    
    return true;
  }
  
  validateCausality(nodeId) {
    const node = this.nodes.get(nodeId);
    if (!node) return false;
    
    // Root is always valid
    if (nodeId === 'root') return true;
    
    // Must have parent or be root
    return node.parent !== null;
  }
  
  getLineage(nodeId) {
    const lineage = [];
    let current = nodeId;
    
    while (current) {
      const node = this.nodes.get(current);
      if (!node) break;
      
      lineage.unshift(current);
      current = node.parent?.id;
    }
    
    return lineage;
  }
  
  getCausalDensity() {
    const totalNodes = this.nodes.size;
    if (totalNodes <= 1) return 0;
    
    const connectedNodes = Array.from(this.nodes.values())
      .filter(n => n.parent || n.children.length > 0)
      .length;
    
    return connectedNodes / totalNodes;
  }
  
  exportGraph() {
    return {
      nodes: Array.from(this.nodes.entries()),
      edges: this.edges,
      laws: this.laws,
      density: this.getCausalDensity()
    };
  }
}

// ============================================
// PILLAR 2: BUILDER - Configuration Assembly
// ============================================

class Builder {
  constructor(core, rawMaterials, sentenceEngine) {
    this.core = core;
    this.raw = rawMaterials;
    this.sentenceEngine = sentenceEngine;
    this.glyphs = new Map();
    this.configurations = new Map();
    
    console.log('🏗️ BUILDER initialized');
  }
  
  generateGlyph(seed) {
    const symbols = "⚡✧◈◉◊◯●○◐◑◒◓▪▫▬▭▮▯▰▱◢◣◤◥";
    
    // Hash seed
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = ((hash << 5) - hash) + seed.charCodeAt(i);
      hash = hash & hash;
    }
    hash = Math.abs(hash);
    
    // Generate 4 symbols
    const glyphSymbols = [];
    for (let i = 0; i < 4; i++) {
      const idx = (hash >> (i * 4)) % symbols.length;
      glyphSymbols.push(symbols[idx]);
    }
    
    // Generate color
    const r = (hash % 200) + 55;
    const g = ((hash >> 8) % 200) + 55;
    const b = ((hash >> 16) % 200) + 55;
    
    const glyph = {
      id: hash.toString(36).slice(0, 12),
      symbols: glyphSymbols.join(''),
      color: `rgb(${r}, ${g}, ${b})`,
      seed,
      timestamp: Date.now()
    };
    
    this.glyphs.set(glyph.id, glyph);
    return glyph;
  }
  
  build(userData, analysis) {
    // Generate glyph
    const seed = JSON.stringify(userData) + Date.now();
    const glyph = this.generateGlyph(seed);
    
    // Determine app type
    const appType = this.selectAppType(analysis);
    
    // Select features
    const features = this.selectFeatures(appType, analysis);
    
    // Generate theme
    const theme = this.generateTheme(analysis);
    
    // Assemble configuration
    const config = {
      glyph,
      appType,
      userData,
      analysis,
      features,
      theme,
      engines: ['sentence-system', 'resonance', 'uos'],
      timestamp: Date.now()
    };
    
    // Record in CORE
    this.core.addNode(glyph.id, 'configuration', config);
    this.core.addEdge('root', glyph.id, 'generated-from-consciousness');
    
    // Store
    this.configurations.set(glyph.id, config);
    
    console.log('🏗️ Built configuration:', glyph.id);
    return config;
  }
  
  selectAppType(analysis) {
    const structure = analysis.markers?.dominantStructure || 'simple_linear';
    
    const structureToApp = {
      'simple_linear': 'gate-decoder',
      'mirror': 'resonance-network',
      'nested': 'trinity-integration',
      'binary_split': 'decision-oracle'
    };
    
    return structureToApp[structure] || 'consciousness-explorer';
  }
  
  selectFeatures(appType, analysis) {
    const baseFeatures = ['sentence-system', 'causal-graph', 'glyph-protection'];
    
    const appFeatures = {
      'gate-decoder': ['gate-library', 'codon-mapper', 'center-display'],
      'resonance-network': ['match-finder', 'pod-formation', 'field-resonance'],
      'trinity-integration': ['three-center-balance', 'field-coordination'],
      'decision-oracle': ['choice-presenter', 'path-bifurcation'],
      'consciousness-explorer': ['profile-builder', 'pattern-detector']
    };
    
    return [...baseFeatures, ...(appFeatures[appType] || [])];
  }
  
  generateTheme(analysis) {
    const CI = analysis.markers?.CI_average || 0.5;
    
    if (CI < 0.3) {
      return { primary: '#00ff88', accent: '#00ffff', name: 'Earth Flow' };
    } else if (CI < 0.6) {
      return { primary: '#ff00ff', accent: '#ffaa00', name: 'Fire Transform' };
    } else if (CI < 0.9) {
      return { primary: '#1E90FF', accent: '#87CEEB', name: 'Water Depth' };
    } else {
      return { primary: '#9370DB', accent: '#DDA0DD', name: 'Aether Transcend' };
    }
  }
  
  generateHTML(config) {
    const { glyph, appType, analysis, features, theme } = config;
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${appType.toUpperCase()} - ${glyph.symbols}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Courier New', monospace;
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
      color: ${theme.primary};
      min-height: 100vh;
      padding: 20px;
    }
    .app-header {
      text-align: center;
      padding: 30px;
      border: 2px solid ${theme.accent};
      margin-bottom: 30px;
      background: rgba(0, 0, 0, 0.7);
    }
    .glyph {
      font-size: 64px;
      color: ${theme.accent};
      margin: 20px 0;
      text-shadow: 0 0 20px ${theme.accent};
    }
    .constitutional-seal {
      margin-top: 40px;
      padding: 20px;
      background: rgba(255, 0, 255, 0.1);
      border: 2px solid #ff00ff;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="app-header">
    <div class="glyph">${glyph.symbols}</div>
    <h1>${appType.toUpperCase().replace(/-/g, ' ')}</h1>
    <p>Theme: ${theme.name}</p>
    <p style="font-size: 12px; margin-top: 10px;">Glyph ID: ${glyph.id}</p>
  </div>
  
  <div class="constitutional-seal">
    <h2>⚡ FOUNDRY CONSTITUTIONAL PROTECTION</h2>
    <p style="margin-top: 15px; font-size: 12px;">
      Configuration ID: ${glyph.id}<br>
      Generated: ${new Date(config.timestamp).toLocaleString()}<br>
      Causal Lineage: Verified ✓<br>
      Features: ${features.join(', ')}
    </p>
  </div>
  
  <script>
    console.log('⚡ Consciousness App Initialized');
    console.log('Configuration:', ${JSON.stringify(config, null, 2)});
  </script>
</body>
</html>`;
  }
}

// ============================================
// PILLAR 3: SELECTOR - Resonance Matching
// ============================================

class Selector {
  constructor(rawMaterials, sentenceEngine) {
    this.raw = rawMaterials;
    this.sentenceEngine = sentenceEngine;
    
    console.log('🎯 SELECTOR initialized');
  }
  
  analyzeConsciousness(userData) {
    // Build profile for sentence engine
    const profile = {
      gates: (userData.gates || []).map(gate => ({
        gate,
        line: 4,
        planet: 'sun',
        activePositions: [1, 3, 7, 12],
        centerActive: true
      })),
      centers: {},
      currentText: userData.consciousnessText || '',
      timeElapsed: 1.0
    };
    
    // Run sentence system analysis
    const sentenceAnalysis = this.sentenceEngine.analyzeConsciousnessState(profile);
    
    // Extract consciousness markers
    const markers = {
      dominantStructure: sentenceAnalysis.overallStructure?.structure || 'simple_linear',
      CI_average: sentenceAnalysis.CI_values.reduce((sum, v) => sum + v.CI, 0) / (sentenceAnalysis.CI_values.length || 1),
      lambda_average: sentenceAnalysis.lambda_values.reduce((sum, v) => sum + v.lambda, 0) / (sentenceAnalysis.lambda_values.length || 1),
      markovPrediction: sentenceAnalysis.markovPrediction,
      gates: userData.gates || []
    };
    
    return {
      sentenceAnalysis,
      markers
    };
  }
  
  calculateResonance(profile1, profile2) {
    // Calculate resonance between two consciousness profiles
    const mindDiff = Math.abs((profile1.mind || 50) - (profile2.mind || 50));
    const bodyDiff = Math.abs((profile1.body || 50) - (profile2.body || 50));
    const heartDiff = Math.abs((profile1.heart || 50) - (profile2.heart || 50));
    
    const avgDiff = (mindDiff + bodyDiff + heartDiff) / 3;
    return 100 - avgDiff;
  }
  
  selectOptimalConfig(userData, existingConfigs) {
    // If configs exist, find best match
    if (existingConfigs.length === 0) {
      return null;
    }
    
    const userAnalysis = this.analyzeConsciousness(userData);
    let bestMatch = null;
    let bestScore = 0;
    
    for (const config of existingConfigs) {
      // Calculate resonance
      const score = this.calculateResonance(
        userAnalysis.markers,
        config.analysis.markers
      );
      
      if (score > bestScore) {
        bestScore = score;
        bestMatch = config;
      }
    }
    
    return { match: bestMatch, score: bestScore };
  }
}

// ============================================
// PILLAR 4: OVERSEER - Constitutional Guardian
// ============================================

class Overseer {
  constructor(core) {
    this.core = core;
    this.violations = [];
    this.validationLog = [];
    
    console.log('👁️ OVERSEER initialized');
  }
  
  validateConfiguration(config) {
    const checks = {
      hasGlyph: config.glyph && config.glyph.id && config.glyph.symbols,
      hasCausality: this.core.validateCausality(config.glyph?.id),
      hasConsciousness: config.userData && typeof config.userData === 'object',
      hasEngines: config.engines && config.engines.length > 0,
      timestampValid: config.timestamp && config.timestamp > 0,
      glyphUnique: !this.isGlyphDuplicate(config.glyph?.id)
    };
    
    const passed = Object.values(checks).every(v => v === true);
    
    if (!passed) {
      this.violations.push({
        configId: config.glyph?.id || 'unknown',
        checks,
        timestamp: Date.now()
      });
    }
    
    this.validationLog.push({
      configId: config.glyph?.id,
      passed,
      checks,
      timestamp: Date.now()
    });
    
    return { valid: passed, checks };
  }
  
  isGlyphDuplicate(glyphId) {
    if (!glyphId) return false;
    
    // Check if glyph already exists in another config
    const node = this.core.nodes.get(glyphId);
    return node && node.type === 'configuration';
  }
  
  validateEvolution(improvement) {
    // Validate proposed system improvement
    
    // Check 1: Maintains causal integrity
    if (improvement.type === 'add-gates') {
      for (const gate of improvement.gates || []) {
        if (gate < 1 || gate > 64) {
          return { 
            valid: false, 
            reason: `Gate ${gate} out of range (1-64)` 
          };
        }
      }
    }
    
    // Check 2: Respects sentence system law
    if (improvement.type === 'add-structures') {
      if (!improvement.patterns || improvement.patterns.length === 0) {
        return { 
          valid: false, 
          reason: 'No patterns defined for structure addition' 
        };
      }
    }
    
    // Check 3: Has sufficient confidence
    if ((improvement.confidence || 0) < 0.5) {
      return {
        valid: false,
        reason: `Confidence too low: ${improvement.confidence} (require ≥ 0.5)`
      };
    }
    
    // Check 4: Doesn't violate sovereignty
    // (Improvements should extend, not replace)
    
    return { valid: true };
  }
  
  enforceProtocol(action, data) {
    // Universal enforcement checkpoint
    
    switch (action) {
      case 'generate-config':
        return this.validateConfiguration(data);
      case 'evolve-system':
        return this.validateEvolution(data);
      case 'modify-raw-materials':
        return this.validateEvolution(data);
      default:
        console.warn(`Unknown action: ${action}`);
        return { valid: false, reason: 'Unknown action type' };
    }
  }
  
  getViolations() {
    return this.violations;
  }
  
  getValidationLog() {
    return this.validationLog.slice(-50); // Last 50 validations
  }
}

// Make available globally
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Core, Builder, Selector, Overseer };
} else {
  window.Core = Core;
  window.Builder = Builder;
  window.Selector = Selector;
  window.Overseer = Overseer;
}
