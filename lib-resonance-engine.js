/**
 * RESONANCE ENGINE
 * Pure JavaScript implementation for consciousness field resonance calculations
 * NO PYTHON - runs entirely client-side
 * 
 * Calculates resonance between:
 * - Consciousness profiles (gates, centers, channels)
 * - Field patterns (mind, body, heart)
 * - Elemental signatures (earth, water, fire, air, aether)
 * - Sentence structures (simple, mirror, nested, binary)
 */

class ResonanceEngine {
  constructor(rawMaterials) {
    this.raw = rawMaterials;
    
    // Resonance calculation constants
    this.GATE_WEIGHT = 1.0;
    this.CENTER_WEIGHT = 0.8;
    this.CHANNEL_WEIGHT = 1.2;
    this.ELEMENT_WEIGHT = 0.6;
    this.STRUCTURE_WEIGHT = 0.7;
    
    // Cache for performance
    this.resonanceCache = new Map();
    
    console.log('🌊 Resonance Engine initialized');
  }
  
  // ============================================
  // CORE RESONANCE CALCULATION
  // ============================================
  
  calculateResonance(profile1, profile2, options = {}) {
    /**
     * Calculate overall resonance between two consciousness profiles
     * 
     * profile = {
     *   gates: [25, 51, 10, ...],
     *   centers: { g: true, sacral: true, heart: false, ... },
     *   channels: [[25, 51], [10, 20], ...],
     *   element: 'fire',
     *   structure: 'nested',
     *   mind: 75,
     *   body: 60,
     *   heart: 85
     * }
     * 
     * Returns: {
     *   overall: 0.78,  // 0-1 scale
     *   components: {
     *     gates: 0.82,
     *     centers: 0.71,
     *     channels: 0.85,
     *     elements: 0.60,
     *     structure: 0.75,
     *     fields: 0.80
     *   },
     *   interpretation: "High Resonance - Strong Compatibility"
     * }
     */
    
    // Check cache
    const cacheKey = this.getCacheKey(profile1, profile2);
    if (this.resonanceCache.has(cacheKey) && !options.skipCache) {
      return this.resonanceCache.get(cacheKey);
    }
    
    const components = {};
    
    // Calculate gate resonance
    if (profile1.gates && profile2.gates) {
      components.gates = this.calculateGateResonance(profile1.gates, profile2.gates);
    }
    
    // Calculate center resonance
    if (profile1.centers && profile2.centers) {
      components.centers = this.calculateCenterResonance(profile1.centers, profile2.centers);
    }
    
    // Calculate channel resonance
    if (profile1.channels && profile2.channels) {
      components.channels = this.calculateChannelResonance(profile1.channels, profile2.channels);
    }
    
    // Calculate elemental resonance
    if (profile1.element && profile2.element) {
      components.elements = this.calculateElementalResonance(profile1.element, profile2.element);
    }
    
    // Calculate structure resonance
    if (profile1.structure && profile2.structure) {
      components.structure = this.calculateStructureResonance(profile1.structure, profile2.structure);
    }
    
    // Calculate field resonance (mind/body/heart)
    if (this.hasFieldData(profile1) && this.hasFieldData(profile2)) {
      components.fields = this.calculateFieldResonance(profile1, profile2);
    }
    
    // Calculate weighted overall resonance
    const overall = this.calculateWeightedAverage(components);
    
    const result = {
      overall,
      components,
      interpretation: this.interpretResonance(overall),
      recommendation: this.generateRecommendation(overall, components)
    };
    
    // Cache result
    this.resonanceCache.set(cacheKey, result);
    
    return result;
  }
  
  // ============================================
  // GATE RESONANCE
  // ============================================
  
  calculateGateResonance(gates1, gates2) {
    /**
     * Calculate resonance based on gate overlap and compatibility
     * High resonance = many shared gates or complementary gates
     */
    
    if (gates1.length === 0 || gates2.length === 0) return 0.5;
    
    const set1 = new Set(gates1);
    const set2 = new Set(gates2);
    
    // Count shared gates
    const shared = [...set1].filter(g => set2.has(g)).length;
    
    // Count complementary gates (form channels)
    const complementary = this.countComplementaryGates(gates1, gates2);
    
    // Calculate base resonance
    const totalGates = set1.size + set2.size;
    const sharedRatio = (shared * 2) / totalGates;
    const complementaryRatio = complementary / Math.max(set1.size, set2.size);
    
    // Weighted combination
    const resonance = (sharedRatio * 0.6) + (complementaryRatio * 0.4);
    
    return Math.min(1.0, resonance);
  }
  
  countComplementaryGates(gates1, gates2) {
    /**
     * Count how many gates from profile1 form channels with gates from profile2
     */
    
    let count = 0;
    
    for (const g1 of gates1) {
      for (const g2 of gates2) {
        if (this.formsChannel(g1, g2)) {
          count++;
        }
      }
    }
    
    return count;
  }
  
  formsChannel(gate1, gate2) {
    /**
     * Check if two gates form a channel
     * Simplified - in full system would check actual channel definitions
     */
    
    const channels = [
      [1, 8], [2, 14], [3, 60], [4, 63], [5, 15], [6, 59],
      [7, 31], [9, 52], [10, 20], [11, 56], [12, 22], [13, 33],
      [16, 48], [17, 62], [18, 58], [19, 49], [21, 45], [23, 43],
      [24, 61], [25, 51], [26, 44], [27, 50], [28, 38], [29, 46],
      [30, 41], [32, 54], [34, 57], [35, 36], [37, 40], [39, 55],
      [42, 53], [47, 64]
    ];
    
    for (const [g1, g2] of channels) {
      if ((gate1 === g1 && gate2 === g2) || (gate1 === g2 && gate2 === g1)) {
        return true;
      }
    }
    
    return false;
  }
  
  // ============================================
  // CENTER RESONANCE
  // ============================================
  
  calculateCenterResonance(centers1, centers2) {
    /**
     * Calculate resonance based on defined/undefined centers
     * High resonance = complementary definition or similar patterns
     */
    
    const centerNames = ['head', 'ajna', 'throat', 'g', 'heart', 'sacral', 'spleen', 'solar', 'root'];
    
    let matches = 0;
    let complements = 0;
    let total = 0;
    
    for (const center of centerNames) {
      const c1 = centers1[center] || false;
      const c2 = centers2[center] || false;
      
      if (c1 === c2) {
        matches++; // Both defined or both undefined
      } else {
        complements++; // One defined, one undefined (can be complementary)
      }
      
      total++;
    }
    
    // Match resonance (similar patterns)
    const matchRatio = matches / total;
    
    // Complement resonance (complementary patterns - also valuable)
    const complementRatio = complements / total;
    
    // Balanced combination (both similarity and complementarity are good)
    const resonance = (matchRatio * 0.7) + (complementRatio * 0.3);
    
    return resonance;
  }
  
  // ============================================
  // CHANNEL RESONANCE
  // ============================================
  
  calculateChannelResonance(channels1, channels2) {
    /**
     * Calculate resonance based on formed channels
     * High resonance = shared or complementary channels
     */
    
    if (channels1.length === 0 || channels2.length === 0) return 0.5;
    
    // Convert to comparable format
    const set1 = new Set(channels1.map(ch => ch.sort().join('-')));
    const set2 = new Set(channels2.map(ch => ch.sort().join('-')));
    
    // Count shared channels
    const shared = [...set1].filter(ch => set2.has(ch)).length;
    
    // Calculate resonance
    const totalChannels = set1.size + set2.size;
    const resonance = totalChannels > 0 ? (shared * 2) / totalChannels : 0.5;
    
    return Math.min(1.0, resonance);
  }
  
  // ============================================
  // ELEMENTAL RESONANCE
  // ============================================
  
  calculateElementalResonance(element1, element2) {
    /**
     * Calculate resonance between elemental signatures
     * Uses compatibility matrix from raw materials
     */
    
    if (element1 === element2) return 1.0;
    
    return this.raw.calculateElementalResonance(element1, element2);
  }
  
  // ============================================
  // STRUCTURE RESONANCE
  // ============================================
  
  calculateStructureResonance(structure1, structure2) {
    /**
     * Calculate resonance between sentence structures
     */
    
    if (structure1 === structure2) return 1.0;
    
    // Structure compatibility matrix
    const compatibility = {
      'simple_linear': { 'simple_linear': 1.0, 'mirror': 0.7, 'nested': 0.5, 'binary_split': 0.6 },
      'mirror': { 'simple_linear': 0.7, 'mirror': 1.0, 'nested': 0.8, 'binary_split': 0.6 },
      'nested': { 'simple_linear': 0.5, 'mirror': 0.8, 'nested': 1.0, 'binary_split': 0.7 },
      'binary_split': { 'simple_linear': 0.6, 'mirror': 0.6, 'nested': 0.7, 'binary_split': 1.0 }
    };
    
    return compatibility[structure1]?.[structure2] || 0.5;
  }
  
  // ============================================
  // FIELD RESONANCE (Mind/Body/Heart)
  // ============================================
  
  calculateFieldResonance(profile1, profile2) {
    /**
     * Calculate resonance between consciousness fields
     * Uses mind/body/heart energy values
     */
    
    const mindDiff = Math.abs((profile1.mind || 50) - (profile2.mind || 50));
    const bodyDiff = Math.abs((profile1.body || 50) - (profile2.body || 50));
    const heartDiff = Math.abs((profile1.heart || 50) - (profile2.heart || 50));
    
    // Average difference (0-100 scale)
    const avgDiff = (mindDiff + bodyDiff + heartDiff) / 3;
    
    // Convert to resonance (0-1 scale, inverted)
    const resonance = 1 - (avgDiff / 100);
    
    return Math.max(0, Math.min(1, resonance));
  }
  
  // ============================================
  // GROUP RESONANCE
  // ============================================
  
  calculateGroupResonance(profiles) {
    /**
     * Calculate overall resonance within a group
     * Returns average pairwise resonance
     */
    
    if (profiles.length < 2) return 1.0;
    
    let totalResonance = 0;
    let pairCount = 0;
    
    for (let i = 0; i < profiles.length; i++) {
      for (let j = i + 1; j < profiles.length; j++) {
        const resonance = this.calculateResonance(profiles[i], profiles[j]);
        totalResonance += resonance.overall;
        pairCount++;
      }
    }
    
    return pairCount > 0 ? totalResonance / pairCount : 0;
  }
  
  // ============================================
  // MATCHING ALGORITHMS
  // ============================================
  
  findBestMatches(sourceProfile, candidateProfiles, limit = 10) {
    /**
     * Find best matching profiles for source profile
     * Returns sorted list of matches with resonance scores
     */
    
    const matches = candidateProfiles.map(candidate => {
      const resonance = this.calculateResonance(sourceProfile, candidate);
      return {
        profile: candidate,
        resonance: resonance.overall,
        details: resonance.components,
        interpretation: resonance.interpretation
      };
    });
    
    // Sort by resonance (highest first)
    matches.sort((a, b) => b.resonance - a.resonance);
    
    return matches.slice(0, limit);
  }
  
  formOptimalGroup(profiles, groupSize = 3) {
    /**
     * Form optimal group based on collective resonance
     * Uses greedy algorithm to maximize group resonance
     */
    
    if (profiles.length <= groupSize) {
      return {
        group: profiles,
        resonance: this.calculateGroupResonance(profiles)
      };
    }
    
    let bestGroup = [];
    let bestResonance = 0;
    
    // Try different combinations (simplified for performance)
    const iterations = Math.min(1000, this.factorial(profiles.length) / this.factorial(profiles.length - groupSize));
    
    for (let i = 0; i < iterations; i++) {
      const group = this.getRandomSubset(profiles, groupSize);
      const resonance = this.calculateGroupResonance(group);
      
      if (resonance > bestResonance) {
        bestResonance = resonance;
        bestGroup = group;
      }
    }
    
    return {
      group: bestGroup,
      resonance: bestResonance,
      interpretation: this.interpretResonance(bestResonance)
    };
  }
  
  // ============================================
  // RESONANCE PATTERNS
  // ============================================
  
  detectResonancePattern(profile1, profile2) {
    /**
     * Detect specific resonance patterns between profiles
     * Returns pattern type and strength
     */
    
    const resonance = this.calculateResonance(profile1, profile2);
    const components = resonance.components;
    
    // Identify dominant resonance type
    const dominant = Object.entries(components)
      .reduce((a, b) => components[a[0]] > b[1] ? a : b);
    
    const patterns = {
      'gates': 'Archetypal Resonance',
      'centers': 'Definition Harmony',
      'channels': 'Connection Alignment',
      'elements': 'Elemental Compatibility',
      'structure': 'Pattern Synchronicity',
      'fields': 'Field Coherence'
    };
    
    return {
      pattern: patterns[dominant[0]] || 'Balanced Resonance',
      strength: dominant[1],
      primaryComponent: dominant[0]
    };
  }
  
  // ============================================
  // INTERFERENCE DETECTION
  // ============================================
  
  detectInterference(profile1, profile2) {
    /**
     * Detect potential interference patterns
     * Low resonance in critical areas = interference
     */
    
    const resonance = this.calculateResonance(profile1, profile2);
    const components = resonance.components;
    
    const interferences = [];
    
    // Check each component for low resonance
    for (const [component, value] of Object.entries(components)) {
      if (value < 0.3) {
        interferences.push({
          type: component,
          severity: 1 - value,
          description: this.getInterferenceDescription(component, value)
        });
      }
    }
    
    return {
      hasInterference: interferences.length > 0,
      interferences: interferences,
      overallRisk: this.calculateInterferenceRisk(interferences)
    };
  }
  
  getInterferenceDescription(component, value) {
    const descriptions = {
      gates: 'Conflicting archetypal patterns may cause friction',
      centers: 'Definition mismatch may create energetic tension',
      channels: 'Channel incompatibility may hinder connection flow',
      elements: 'Elemental discord may generate instability',
      structure: 'Structural dissonance may impede understanding',
      fields: 'Field misalignment may create energetic drain'
    };
    
    return descriptions[component] || 'Potential interference detected';
  }
  
  calculateInterferenceRisk(interferences) {
    if (interferences.length === 0) return 0;
    
    const avgSeverity = interferences.reduce((sum, i) => sum + i.severity, 0) / interferences.length;
    return Math.min(1, avgSeverity);
  }
  
  // ============================================
  // HELPER METHODS
  // ============================================
  
  hasFieldData(profile) {
    return profile.mind !== undefined || 
           profile.body !== undefined || 
           profile.heart !== undefined;
  }
  
  calculateWeightedAverage(components) {
    const weights = {
      gates: this.GATE_WEIGHT,
      centers: this.CENTER_WEIGHT,
      channels: this.CHANNEL_WEIGHT,
      elements: this.ELEMENT_WEIGHT,
      structure: this.STRUCTURE_WEIGHT,
      fields: 1.0
    };
    
    let totalWeight = 0;
    let weightedSum = 0;
    
    for (const [component, value] of Object.entries(components)) {
      const weight = weights[component] || 1.0;
      weightedSum += value * weight;
      totalWeight += weight;
    }
    
    return totalWeight > 0 ? weightedSum / totalWeight : 0.5;
  }
  
  interpretResonance(value) {
    if (value >= 0.9) return 'Exceptional Resonance - Profound Compatibility';
    if (value >= 0.8) return 'High Resonance - Strong Compatibility';
    if (value >= 0.7) return 'Good Resonance - Compatible';
    if (value >= 0.6) return 'Moderate Resonance - Workable';
    if (value >= 0.5) return 'Neutral Resonance - Balanced';
    if (value >= 0.4) return 'Low Resonance - Challenging';
    if (value >= 0.3) return 'Very Low Resonance - Significant Friction';
    return 'Minimal Resonance - High Interference';
  }
  
  generateRecommendation(overall, components) {
    const recommendations = [];
    
    if (overall >= 0.8) {
      recommendations.push('Excellent match for collaboration or connection');
    } else if (overall >= 0.6) {
      recommendations.push('Good potential with conscious awareness');
    } else {
      recommendations.push('May require extra effort to harmonize');
    }
    
    // Component-specific recommendations
    for (const [component, value] of Object.entries(components)) {
      if (value < 0.4) {
        recommendations.push(`Focus on ${component} alignment to improve resonance`);
      }
    }
    
    return recommendations;
  }
  
  getCacheKey(profile1, profile2) {
    const key1 = JSON.stringify(profile1.gates?.sort() || []);
    const key2 = JSON.stringify(profile2.gates?.sort() || []);
    return key1 < key2 ? key1 + key2 : key2 + key1;
  }
  
  getRandomSubset(array, size) {
    const shuffled = [...array].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, size);
  }
  
  factorial(n) {
    if (n <= 1) return 1;
    return n * this.factorial(n - 1);
  }
  
  // ============================================
  // EXPORT / REPORTING
  // ============================================
  
  generateResonanceReport(profile1, profile2) {
    const resonance = this.calculateResonance(profile1, profile2);
    const pattern = this.detectResonancePattern(profile1, profile2);
    const interference = this.detectInterference(profile1, profile2);
    
    return {
      overall: resonance.overall,
      interpretation: resonance.interpretation,
      components: resonance.components,
      pattern: pattern,
      interference: interference,
      recommendations: resonance.recommendation,
      timestamp: Date.now()
    };
  }
  
  clearCache() {
    this.resonanceCache.clear();
  }
}

// Make available globally
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ResonanceEngine;
} else {
  window.ResonanceEngine = ResonanceEngine;
}
