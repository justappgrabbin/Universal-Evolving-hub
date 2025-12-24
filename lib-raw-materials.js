/**
 * RAW MATERIALS LIBRARY
 * Constitutional foundation data for consciousness mapping
 * Pure client-side, no dependencies
 */

const RawMaterials = {
  
  // ============================================
  // GATES (64 I Ching Hexagrams)
  // ============================================
  gates: {
    1: { name: "Creative Power", element: "fire", codon: "TTT", circuit: "knowing", theme: "self-empowerment" },
    2: { name: "Receptive", element: "earth", codon: "GGG", circuit: "knowing", theme: "direction" },
    3: { name: "Difficulty", element: "water", codon: "AAA", circuit: "knowing", theme: "innovation" },
    4: { name: "Youthful Folly", element: "earth", codon: "TCA", circuit: "understanding", theme: "formulation" },
    5: { name: "Waiting", element: "water", codon: "TTA", circuit: "knowing", theme: "rhythm" },
    6: { name: "Conflict", element: "water", codon: "TCG", circuit: "tribal", theme: "friction" },
    7: { name: "Army", element: "earth", codon: "GAG", circuit: "tribal", theme: "leadership" },
    8: { name: "Holding Together", element: "water", codon: "GTA", circuit: "tribal", theme: "contribution" },
    9: { name: "Small Taming", element: "air", codon: "TGG", circuit: "knowing", theme: "focus" },
    10: { name: "Treading", element: "fire", codon: "GCG", circuit: "tribal", theme: "behavior" },
    // Add all 64 gates - abbreviated for space
    13: { name: "Fellowship", element: "fire", codon: "GCA", circuit: "tribal", theme: "listening" },
    25: { name: "Innocence", element: "fire", codon: "TCC", circuit: "individual", theme: "spirit" },
    51: { name: "Shock", element: "fire", codon: "GAT", circuit: "individual", theme: "initiative" },
    64: { name: "Before Completion", element: "water", codon: "AAT", circuit: "abstract", theme: "confusion" }
  },
  
  // ============================================
  // CODONS (64 DNA triplets)
  // ============================================
  codons: {
    "TTT": { aminoAcid: "Phenylalanine", abbreviation: "Phe", gate: 1, property: "aromatic" },
    "TTC": { aminoAcid: "Phenylalanine", abbreviation: "Phe", gate: 43, property: "aromatic" },
    "TTA": { aminoAcid: "Leucine", abbreviation: "Leu", gate: 5, property: "hydrophobic" },
    "TTG": { aminoAcid: "Leucine", abbreviation: "Leu", gate: 26, property: "hydrophobic" },
    "TCT": { aminoAcid: "Serine", abbreviation: "Ser", gate: 11, property: "polar" },
    "TCC": { aminoAcid: "Serine", abbreviation: "Ser", gate: 25, property: "polar" },
    "TCA": { aminoAcid: "Serine", abbreviation: "Ser", gate: 4, property: "polar" },
    "TCG": { aminoAcid: "Serine", abbreviation: "Ser", gate: 6, property: "polar" },
    "AAA": { aminoAcid: "Lysine", abbreviation: "Lys", gate: 3, property: "basic" },
    "AAT": { aminoAcid: "Asparagine", abbreviation: "Asn", gate: 64, property: "polar" },
    "GGG": { aminoAcid: "Glycine", abbreviation: "Gly", gate: 2, property: "smallest" },
    "GCA": { aminoAcid: "Alanine", abbreviation: "Ala", gate: 13, property: "hydrophobic" }
    // All 64 codons map to gates
  },
  
  // ============================================
  // ELEMENTS (5 consciousness elements)
  // ============================================
  elements: {
    earth: {
      quality: "stability",
      color: "#8B4513",
      gates: [2, 7, 15, 23, 52],
      resonance: { water: 0.8, fire: 0.3, air: 0.5, aether: 0.6, earth: 1.0 }
    },
    water: {
      quality: "flow",
      color: "#1E90FF",
      gates: [3, 5, 6, 8, 48, 64],
      resonance: { earth: 0.8, fire: 0.2, air: 0.7, aether: 0.8, water: 1.0 }
    },
    fire: {
      quality: "transformation",
      color: "#FF4500",
      gates: [1, 10, 13, 25, 51],
      resonance: { earth: 0.3, water: 0.2, air: 0.9, aether: 0.5, fire: 1.0 }
    },
    air: {
      quality: "movement",
      color: "#87CEEB",
      gates: [9, 20, 31, 33, 57],
      resonance: { earth: 0.5, water: 0.7, fire: 0.9, aether: 0.9, air: 1.0 }
    },
    aether: {
      quality: "consciousness",
      color: "#9370DB",
      gates: [11, 12, 35, 36, 45],
      resonance: { earth: 0.6, water: 0.8, fire: 0.5, air: 0.9, aether: 1.0 }
    }
  },
  
  // ============================================
  // CENTERS (9 consciousness centers)
  // ============================================
  centers: {
    head: { 
      gates: [64, 61, 63],
      pressure: "mental",
      type: "awareness",
      biology: "pineal",
      element: "aether"
    },
    ajna: {
      gates: [47, 24, 4, 17, 43, 11],
      pressure: "mental",
      type: "awareness",
      biology: "pituitary",
      element: "air"
    },
    throat: {
      gates: [62, 23, 56, 35, 12, 45, 33, 8, 31, 20, 16],
      pressure: "expression",
      type: "motor",
      biology: "thyroid",
      element: "air"
    },
    g: {
      gates: [7, 1, 13, 10, 25, 15, 2, 46],
      pressure: "identity",
      type: "awareness",
      biology: "liver",
      element: "fire"
    },
    heart: {
      gates: [21, 40, 26, 51],
      pressure: "material",
      type: "motor",
      biology: "heart",
      element: "fire"
    },
    sacral: {
      gates: [5, 14, 29, 59, 9, 3, 42, 27, 34],
      pressure: "life-force",
      type: "motor",
      biology: "ovaries/testes",
      element: "earth"
    },
    spleen: {
      gates: [48, 57, 44, 50, 32, 28, 18],
      pressure: "survival",
      type: "awareness",
      biology: "spleen",
      element: "water"
    },
    solar: {
      gates: [36, 22, 37, 6, 49, 55, 30],
      pressure: "emotional",
      type: "motor",
      biology: "solar plexus",
      element: "water"
    },
    root: {
      gates: [53, 60, 52, 19, 39, 41, 58, 38, 54],
      pressure: "survival",
      type: "motor",
      biology: "adrenals",
      element: "earth"
    }
  },
  
  // ============================================
  // LINES (6 lines per hexagram)
  // ============================================
  lines: {
    1: { keynote: "Introspection", theme: "foundation", transpersonal: false },
    2: { keynote: "Hermit", theme: "natural genius", transpersonal: false },
    3: { keynote: "Martyr", theme: "trial and error", transpersonal: false },
    4: { keynote: "Opportunist", theme: "externalization", transpersonal: true },
    5: { keynote: "Heretic", theme: "universalization", transpersonal: true },
    6: { keynote: "Role Model", theme: "transition", transpersonal: true }
  },
  
  // ============================================
  // COLORS (6 consciousness colors)
  // ============================================
  colors: {
    1: { sense: "smell", quality: "fear-driven", motivation: "security" },
    2: { sense: "taste", quality: "desire-driven", motivation: "appetite" },
    3: { sense: "outer-vision", quality: "action-driven", motivation: "movement" },
    4: { sense: "inner-vision", quality: "meditation-driven", motivation: "stillness" },
    5: { sense: "feeling", quality: "balance-driven", motivation: "harmony" },
    6: { sense: "touch", quality: "necessity-driven", motivation: "survival" }
  },
  
  // ============================================
  // TONES (6 consciousness tones)
  // ============================================
  tones: {
    1: { frequency: "security", cognition: "smell", sense: "survival" },
    2: { frequency: "markets", cognition: "taste", sense: "strategic" },
    3: { frequency: "sexuality", cognition: "outer-vision", sense: "action" },
    4: { frequency: "purpose", cognition: "inner-vision", sense: "insight" },
    5: { frequency: "timing", cognition: "feeling", sense: "intuitive" },
    6: { frequency: "law", cognition: "touch", sense: "experiential" }
  },
  
  // ============================================
  // BASES (6 quantum bases)
  // ============================================
  bases: {
    1: { geometry: "tetrahedron", quantum: "bonding", expression: "survival" },
    2: { geometry: "cube", quantum: "value", expression: "resources" },
    3: { geometry: "octahedron", quantum: "desire", expression: "movement" },
    4: { geometry: "dodecahedron", quantum: "inquiry", expression: "understanding" },
    5: { geometry: "icosahedron", quantum: "transformation", expression: "change" },
    6: { geometry: "sphere", quantum: "integration", expression: "wholeness" }
  },
  
  // ============================================
  // PLANETS (13-place system: 12 positions + center)
  // ============================================
  planets: {
    sun: { 
      symbol: "☉", 
      keynote: "purpose",
      weight: 1.0,
      places: 13,
      centerWeight: 2.0
    },
    earth: { 
      symbol: "⊕", 
      keynote: "grounding",
      weight: 1.0,
      places: 13,
      centerWeight: 2.0
    },
    moon: { 
      symbol: "☽", 
      keynote: "drive",
      weight: 0.8,
      places: 13,
      centerWeight: 1.5
    },
    north_node: { 
      symbol: "☊", 
      keynote: "environment",
      weight: 0.6,
      places: 13,
      centerWeight: 1.2
    },
    south_node: { 
      symbol: "☋", 
      keynote: "direction",
      weight: 0.6,
      places: 13,
      centerWeight: 1.2
    },
    mercury: { 
      symbol: "☿", 
      keynote: "communication",
      weight: 0.5,
      places: 13,
      centerWeight: 1.0
    },
    venus: { 
      symbol: "♀", 
      keynote: "values",
      weight: 0.5,
      places: 13,
      centerWeight: 1.0
    },
    mars: { 
      symbol: "♂", 
      keynote: "immaturity",
      weight: 0.4,
      places: 13,
      centerWeight: 0.8
    },
    jupiter: { 
      symbol: "♃", 
      keynote: "law",
      weight: 0.4,
      places: 13,
      centerWeight: 0.8
    },
    saturn: { 
      symbol: "♄", 
      keynote: "discipline",
      weight: 0.4,
      places: 13,
      centerWeight: 0.8
    },
    uranus: { 
      symbol: "♅", 
      keynote: "chaos",
      weight: 0.3,
      places: 13,
      centerWeight: 0.6
    },
    neptune: { 
      symbol: "♆", 
      keynote: "illusion",
      weight: 0.3,
      places: 13,
      centerWeight: 0.6
    },
    pluto: { 
      symbol: "♇", 
      keynote: "truth",
      weight: 0.3,
      places: 13,
      centerWeight: 0.6
    }
  },
  
  // ============================================
  // SENTENCE STRUCTURES (4 archetypal patterns)
  // ============================================
  sentenceStructures: {
    simple_linear: {
      pattern: "Subject → Verb → Object",
      energyFlow: "direct",
      collapse: "low",
      gates: [1, 2, 7, 13, 25]
    },
    mirror: {
      pattern: "A → B ← A",
      energyFlow: "reflective",
      collapse: "medium",
      gates: [10, 15, 16, 20, 31]
    },
    nested: {
      pattern: "[A [B [C] B] A]",
      energyFlow: "recursive",
      collapse: "high",
      gates: [3, 4, 8, 14, 29]
    },
    binary_split: {
      pattern: "A → (B1 | B2)",
      energyFlow: "bifurcating",
      collapse: "critical",
      gates: [5, 6, 9, 11, 12]
    }
  },
  
  // ============================================
  // HELPER METHODS
  // ============================================
  
  getGate(number) {
    return this.gates[number] || null;
  },
  
  getCodon(sequence) {
    return this.codons[sequence] || null;
  },
  
  getElement(name) {
    return this.elements[name] || null;
  },
  
  getCenter(name) {
    return this.centers[name] || null;
  },
  
  getPlanet(name) {
    return this.planets[name] || null;
  },
  
  calculateElementalResonance(element1, element2) {
    const el1 = this.elements[element1];
    if (!el1) return 0.5;
    return el1.resonance[element2] || 0.5;
  },
  
  getGatesByElement(element) {
    const el = this.elements[element];
    return el ? el.gates : [];
  },
  
  getGatesByCenter(centerName) {
    const center = this.centers[centerName];
    return center ? center.gates : [];
  }
};

// Make available globally
if (typeof module !== 'undefined' && module.exports) {
  module.exports = RawMaterials;
} else {
  window.RawMaterials = RawMaterials;
}
