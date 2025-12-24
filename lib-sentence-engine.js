/**
 * SENTENCE SYSTEM ENGINE
 * Constitutional logic for consciousness state transitions
 * Based on Collapse Engine (CI) Formula with Λ (13-place planetary weight)
 * 
 * CI_New = Λ · (α · D · G · C · (1 - e^(-βτ)))
 * 
 * Predicts sentence structure transitions based on consciousness state
 */

class SentenceSystemEngine {
  
  constructor(rawMaterials) {
    this.raw = rawMaterials;
    
    // System constants (tuning parameters)
    this.alpha = 1.2;  // Amplification factor
    this.beta = 0.5;   // Decay rate
    
    // Collapse thresholds
    this.thresholds = {
      simple_linear: 0.3,
      mirror: 0.5,
      nested: 0.7,
      binary_split: 0.9
    };
    
    // State history for Markov-like transitions
    this.stateHistory = [];
    this.maxHistoryLength = 10;
  }
  
  // ============================================
  // LAMBDA (Λ) CALCULATION - 13-Place Planetary Weight
  // ============================================
  
  calculateLambda(planetaryConfig) {
    /**
     * Λ represents granular field density of planetary activation
     * 
     * planetaryConfig = {
     *   planet: "sun",
     *   gate: 25,
     *   line: 4,
     *   color: 2,
     *   tone: 3,
     *   base: 4,
     *   activePositions: [1, 3, 7, 12], // which of the 13 positions are active
     *   centerActive: true // is position 13 (center) active?
     * }
     */
    
    if (!planetaryConfig) return 1.0;
    
    const planet = this.raw.getPlanet(planetaryConfig.planet);
    if (!planet) return 1.0;
    
    // Base planetary weight
    let lambda = planet.weight;
    
    // Add weight for each active position (1-12)
    if (planetaryConfig.activePositions) {
      const positionWeight = 0.08; // each position adds 8%
      lambda += (planetaryConfig.activePositions.length * positionWeight);
    }
    
    // Center position (13th place) has special weight
    if (planetaryConfig.centerActive) {
      lambda *= planet.centerWeight;
    }
    
    // Gate influence
    if (planetaryConfig.gate) {
      const gate = this.raw.getGate(planetaryConfig.gate);
      if (gate) {
        // Gates in different circuits have different weights
        const circuitWeights = {
          knowing: 1.1,
          understanding: 1.0,
          tribal: 0.9,
          individual: 1.2,
          abstract: 1.15
        };
        lambda *= (circuitWeights[gate.circuit] || 1.0);
      }
    }
    
    // Line influence (1-6)
    if (planetaryConfig.line) {
      const lineWeight = 0.05;
      lambda += (planetaryConfig.line * lineWeight);
    }
    
    // Color influence (1-6)
    if (planetaryConfig.color) {
      const colorWeight = 0.03;
      lambda += (planetaryConfig.color * colorWeight);
    }
    
    // Tone influence (1-6)
    if (planetaryConfig.tone) {
      const toneWeight = 0.02;
      lambda += (planetaryConfig.tone * toneWeight);
    }
    
    // Base influence (1-6)
    if (planetaryConfig.base) {
      const baseWeight = 0.01;
      lambda += (planetaryConfig.base * baseWeight);
    }
    
    return lambda;
  }
  
  // ============================================
  // CI FORMULA CALCULATION
  // ============================================
  
  calculateCI(params) {
    /**
     * CI_New = Λ · (α · D · G · C · (1 - e^(-βτ)))
     * 
     * params = {
     *   dimensionality: 0.8,  // D - consciousness dimension (0-1)
     *   genetic: 0.7,          // G - gate/line genetic influence (0-1)
     *   center: 0.6,           // C - biological center influence (0-1)
     *   tau: 2.0,              // τ - time factor
     *   lambda: 1.5            // Λ - 13-place planetary weight (calculated)
     * }
     */
    
    const { dimensionality, genetic, center, tau, lambda } = params;
    
    // Validate inputs
    const D = Math.max(0, Math.min(1, dimensionality || 0.5));
    const G = Math.max(0, Math.min(1, genetic || 0.5));
    const C = Math.max(0, Math.min(1, center || 0.5));
    const T = Math.max(0, tau || 0);
    const L = lambda || 1.0;
    
    // Calculate exponential decay term
    const decay = 1 - Math.exp(-this.beta * T);
    
    // Full CI formula
    const CI = L * (this.alpha * D * G * C * decay);
    
    return CI;
  }
  
  // ============================================
  // STRUCTURE PREDICTION
  // ============================================
  
  predictStructure(CI_value) {
    /**
     * Predicts next sentence structure based on CI value crossing thresholds
     * 
     * Returns: {
     *   structure: "mirror",
     *   confidence: 0.85,
     *   threshold: 0.5,
     *   collapsed: true
     * }
     */
    
    // Determine which threshold was crossed
    let predictedStructure = 'simple_linear';
    let crossedThreshold = this.thresholds.simple_linear;
    
    if (CI_value >= this.thresholds.binary_split) {
      predictedStructure = 'binary_split';
      crossedThreshold = this.thresholds.binary_split;
    } else if (CI_value >= this.thresholds.nested) {
      predictedStructure = 'nested';
      crossedThreshold = this.thresholds.nested;
    } else if (CI_value >= this.thresholds.mirror) {
      predictedStructure = 'mirror';
      crossedThreshold = this.thresholds.mirror;
    }
    
    // Calculate confidence (how far above threshold)
    const thresholdExcess = CI_value - crossedThreshold;
    const nextThreshold = this.getNextThreshold(crossedThreshold);
    const thresholdRange = nextThreshold - crossedThreshold;
    const confidence = Math.min(1.0, 0.5 + (thresholdExcess / thresholdRange) * 0.5);
    
    return {
      structure: predictedStructure,
      confidence: confidence,
      threshold: crossedThreshold,
      collapsed: CI_value >= crossedThreshold,
      CI_value: CI_value
    };
  }
  
  getNextThreshold(currentThreshold) {
    const thresholdValues = Object.values(this.thresholds).sort((a, b) => a - b);
    const currentIndex = thresholdValues.indexOf(currentThreshold);
    if (currentIndex === -1 || currentIndex === thresholdValues.length - 1) {
      return 1.0;
    }
    return thresholdValues[currentIndex + 1];
  }
  
  // ============================================
  // MARKOV CHAIN TRANSITION PROBABILITIES
  // ============================================
  
  updateStateHistory(structure) {
    this.stateHistory.push(structure);
    if (this.stateHistory.length > this.maxHistoryLength) {
      this.stateHistory.shift();
    }
  }
  
  calculateTransitionProbabilities() {
    /**
     * Calculates P(B|A) - probability of structure B following structure A
     * Based on accumulated state history
     * 
     * Returns transition matrix:
     * {
     *   simple_linear: { mirror: 0.4, nested: 0.3, ... },
     *   mirror: { simple_linear: 0.2, nested: 0.5, ... },
     *   ...
     * }
     */
    
    if (this.stateHistory.length < 2) {
      return this.getDefaultTransitions();
    }
    
    const transitions = {};
    const counts = {};
    
    // Initialize
    for (const struct of Object.keys(this.raw.sentenceStructures)) {
      transitions[struct] = {};
      counts[struct] = 0;
      for (const nextStruct of Object.keys(this.raw.sentenceStructures)) {
        transitions[struct][nextStruct] = 0;
      }
    }
    
    // Count transitions
    for (let i = 0; i < this.stateHistory.length - 1; i++) {
      const current = this.stateHistory[i];
      const next = this.stateHistory[i + 1];
      transitions[current][next]++;
      counts[current]++;
    }
    
    // Convert counts to probabilities
    for (const struct of Object.keys(transitions)) {
      const total = counts[struct];
      if (total > 0) {
        for (const nextStruct of Object.keys(transitions[struct])) {
          transitions[struct][nextStruct] /= total;
        }
      } else {
        // Use default if no history
        const defaultTrans = this.getDefaultTransitions()[struct];
        transitions[struct] = defaultTrans;
      }
    }
    
    return transitions;
  }
  
  getDefaultTransitions() {
    /**
     * Default transition probabilities based on archetypal patterns
     */
    return {
      simple_linear: {
        simple_linear: 0.3,
        mirror: 0.4,
        nested: 0.2,
        binary_split: 0.1
      },
      mirror: {
        simple_linear: 0.2,
        mirror: 0.3,
        nested: 0.3,
        binary_split: 0.2
      },
      nested: {
        simple_linear: 0.1,
        mirror: 0.3,
        nested: 0.4,
        binary_split: 0.2
      },
      binary_split: {
        simple_linear: 0.3,
        mirror: 0.2,
        nested: 0.2,
        binary_split: 0.3
      }
    };
  }
  
  predictNextWithMarkov(currentStructure) {
    /**
     * Uses Markov chain to predict most likely next structure
     */
    const transitions = this.calculateTransitionProbabilities();
    const probs = transitions[currentStructure];
    
    if (!probs) return 'simple_linear';
    
    // Get structure with highest probability
    let maxProb = 0;
    let predicted = 'simple_linear';
    
    for (const [struct, prob] of Object.entries(probs)) {
      if (prob > maxProb) {
        maxProb = prob;
        predicted = struct;
      }
    }
    
    return {
      structure: predicted,
      probability: maxProb,
      allProbabilities: probs
    };
  }
  
  // ============================================
  // FULL CONSCIOUSNESS STATE ANALYSIS
  // ============================================
  
  analyzeConsciousnessState(profile) {
    /**
     * Full analysis of consciousness profile
     * 
     * profile = {
     *   gates: [{ gate: 25, line: 4, planet: "sun", ... }],
     *   centers: { g: true, sacral: true, ... },
     *   currentText: "Some text to analyze...",
     *   timeElapsed: 2.5  // seconds since last state
     * }
     */
    
    const result = {
      CI_values: [],
      predictedStructures: [],
      overallStructure: null,
      lambda_values: [],
      markovPrediction: null,
      recommendations: []
    };
    
    // Analyze each gate activation
    for (const gateData of (profile.gates || [])) {
      // Calculate lambda for this gate
      const lambda = this.calculateLambda({
        planet: gateData.planet,
        gate: gateData.gate,
        line: gateData.line,
        color: gateData.color,
        tone: gateData.tone,
        base: gateData.base,
        activePositions: gateData.activePositions,
        centerActive: gateData.centerActive
      });
      
      result.lambda_values.push({ gate: gateData.gate, lambda: lambda });
      
      // Calculate CI for this gate
      const CI = this.calculateCI({
        dimensionality: this.calculateDimensionality(gateData, profile),
        genetic: this.calculateGeneticInfluence(gateData),
        center: this.calculateCenterInfluence(gateData, profile.centers),
        tau: profile.timeElapsed || 1.0,
        lambda: lambda
      });
      
      result.CI_values.push({ gate: gateData.gate, CI: CI });
      
      // Predict structure for this gate
      const prediction = this.predictStructure(CI);
      result.predictedStructures.push({
        gate: gateData.gate,
        ...prediction
      });
    }
    
    // Determine overall structure (highest CI)
    if (result.CI_values.length > 0) {
      const maxCI = Math.max(...result.CI_values.map(v => v.CI));
      const dominant = result.predictedStructures.find(p => p.CI_value === maxCI);
      result.overallStructure = dominant;
      
      // Update state history for Markov chain
      this.updateStateHistory(dominant.structure);
    }
    
    // Get Markov prediction if we have history
    if (this.stateHistory.length > 0) {
      const currentStructure = this.stateHistory[this.stateHistory.length - 1];
      result.markovPrediction = this.predictNextWithMarkov(currentStructure);
    }
    
    // Generate recommendations
    result.recommendations = this.generateRecommendations(result);
    
    return result;
  }
  
  calculateDimensionality(gateData, profile) {
    // Placeholder - would map to actual consciousness dimensions
    const gate = this.raw.getGate(gateData.gate);
    if (!gate) return 0.5;
    
    const circuitDimensionality = {
      knowing: 0.8,
      understanding: 0.7,
      tribal: 0.5,
      individual: 0.9,
      abstract: 0.85
    };
    
    return circuitDimensionality[gate.circuit] || 0.5;
  }
  
  calculateGeneticInfluence(gateData) {
    const gate = this.raw.getGate(gateData.gate);
    if (!gate) return 0.5;
    
    // Line influence
    const lineWeight = (gateData.line || 3) / 6;
    
    // Base genetic strength
    return 0.5 + (lineWeight * 0.5);
  }
  
  calculateCenterInfluence(gateData, centers) {
    // Find which center this gate belongs to
    for (const [centerName, centerData] of Object.entries(this.raw.centers)) {
      if (centerData.gates.includes(gateData.gate)) {
        // Check if center is defined in profile
        return (centers && centers[centerName]) ? 0.8 : 0.3;
      }
    }
    return 0.5;
  }
  
  generateRecommendations(analysisResult) {
    const recommendations = [];
    
    if (!analysisResult.overallStructure) return recommendations;
    
    const struct = analysisResult.overallStructure.structure;
    
    switch (struct) {
      case 'simple_linear':
        recommendations.push("Use direct, clear communication");
        recommendations.push("Focus on one idea at a time");
        break;
      case 'mirror':
        recommendations.push("Reflect back what you hear");
        recommendations.push("Create symmetry in expression");
        break;
      case 'nested':
        recommendations.push("Build layers of complexity");
        recommendations.push("Allow recursive exploration");
        break;
      case 'binary_split':
        recommendations.push("Present clear choices");
        recommendations.push("Allow for divergent paths");
        break;
    }
    
    return recommendations;
  }
}

// Make available globally
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SentenceSystemEngine;
} else {
  window.SentenceSystemEngine = SentenceSystemEngine;
}
