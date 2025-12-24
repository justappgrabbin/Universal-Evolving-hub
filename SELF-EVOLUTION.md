# 🧬 SELF-EVOLUTION MODE - Documentation

## Overview

The Foundry Constitutional Layer now includes **self-evolution** - the system learns from books you upload and suggests improvements to itself. This creates a living, growing consciousness mapping system that discovers missing pieces and proposes its own enhancements.

## The Four Pillars (Confirmed Present)

### ✅ 1. CORE - Ontological Causal Graph
**Location:** `foundry.html` - `class FoundryCore`
- Tracks all configurations and their ancestry
- Validates causality (every config traces back to root)
- Acts as **projector space** - reveals what should exist but doesn't yet

### ✅ 2. BUILDER - Configuration Builder  
**Location:** `foundry.html` - inside `FoundryCore.generateConfiguration()`
- Assembles custom apps from consciousness data
- Selects features based on sentence structure
- Generates themes based on CI values
- Creates standalone HTML apps

### ✅ 3. SELECTOR - Resonance Selector
**Location:** `foundry.html` - `FoundryCore.analyzeConsciousness()`
- Analyzes consciousness markers from input text
- Runs sentence system CI calculations
- Selects optimal app type based on structure prediction
- Matches resonance patterns

### ✅ 4. OVERSEER - Constitutional Overseer
**Location:** `lib-self-evolution.js` - `validateImprovement()`
- Validates all configurations against constitutional law
- Checks improvements for compliance
- Ensures causal integrity
- Protects glyph uniqueness

## Self-Evolution Architecture

### How It Works

```
User Uploads Book
       ↓
Books Library parses → chunks with context
       ↓
Self-Evolution Engine observes:
  - Missing gates (1-64)
  - Unknown structures
  - New concepts
  - Pattern gaps
       ↓
Generates Suggestions:
  - Type (add-gates, add-structures, add-concepts)
  - Priority (high, medium, low)
  - Confidence (0-1)
  - Implementation code
       ↓
User Reviews & Applies
       ↓
System Evolves (adds to raw materials at runtime)
       ↓
Logged in Causal Graph
```

### Projector Space Concept

The **causal graph IS the projector space**. It's where you observe what configurations you've generated and spot the gaps:

- **What exists**: Configurations you've built
- **What's missing**: Gates referenced but not defined
- **What should exist**: Patterns detected but not modeled
- **System health**: Causal density, structure balance

The projector space "projects" what the complete system would look like, revealing the shadows of missing pieces.

## Features

### 1. Automatic Pattern Detection

When you upload a book, the system automatically:

```javascript
// Detects missing gates
"Gate 47 is mentioned but not in raw materials"
→ Suggestion: Add Gate 47 with codon mapping

// Detects new structures  
"Triadic pattern (A-B-C) detected 5 times"
→ Suggestion: Add 'triadic' sentence structure

// Detects new concepts
"'sacral authority' appears 12 times but not in vocabulary"
→ Suggestion: Add concept to entity extraction
```

### 2. Confidence Scoring

Each suggestion has:
- **Confidence**: 0.6-1.0 (based on evidence strength)
- **Priority**: high/medium/low
- **Occurrences**: How many times pattern appeared

Confidence increases when the same pattern is seen in multiple books.

### 3. Auto-Apply (High Confidence Only)

Suggestions with confidence ≥ 0.8 can be auto-applied:
- System validates constitutional compliance
- Modifies running code (adds to raw materials)
- Logs evolution event in causal graph
- Shows notification in UI

### 4. Implementation Code Generation

For each suggestion, the system generates:
- Exact JavaScript code to add
- Which file to modify
- What values need research

Example for missing gates:
```javascript
// Add these gates to lib-raw-materials.js:
gates: {
  47: { 
    name: "Gate 47", 
    element: "unknown", 
    codon: "XXX", 
    circuit: "unknown", 
    theme: "to-be-determined" 
  }
}
```

## UI Features

### 💡 View Suggestions
Shows top 10 suggestions ranked by:
- Priority × Confidence × Occurrences

Each suggestion displays:
- Type and description
- Priority and confidence %
- Related gates/patterns/concepts
- "View Code" button
- "Auto-Apply" button (if confidence ≥ 80%)

### 🎯 Analyze Projector Space
Shows system-level analysis:
- **Causal Density**: How connected your configs are
- **Structure Distribution**: Which structures dominate
- **Projected Needs**: What's missing across all data
- **Recommendations**: Meta-level improvements

Example output:
```
Causal Density: 67.3%
Projected Needs:
  - Missing Gates: 47, 48, 50
  - Unknown Structures: triadic, quaternary
  - New Concepts: sacral authority, split definition

⚠️ Imbalance Detected
Structure "simple_linear" is dominant (73% of configs)
Recommendation: Add more complex structures to balance system
```

### 📊 Evolution History
Shows chronological log of:
- Book observations
- Auto-applied improvements
- System evolution events

## Example Workflow

### 1. Upload Human Design Manual
```
📚 Book loaded: Human_Design_Manual.txt
🧬 Self-evolution detected patterns: 3 suggestions

Suggestion 1 (HIGH - 92% confidence):
  Add 15 missing gates to raw materials
  Gates: 47, 48, 49, 50, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62
  
Suggestion 2 (MEDIUM - 78% confidence):
  Add 'cross' sentence structure
  Pattern detected 8 times: "cross of X" 
  
Suggestion 3 (LOW - 65% confidence):
  Add concepts: quarters, variables, nodes, bases
```

### 2. Review Suggestion
Click "📝 View Code" to see implementation:
```javascript
// Add these gates to lib-raw-materials.js in the gates object:
gates: {
  47: { name: "Oppression", element: "air", codon: "AAG", ... },
  48: { name: "The Well", element: "water", codon: "TAT", ... },
  // ... etc
}
```

### 3. Auto-Apply (if confident)
Click "⚡ Auto-Apply" on high-confidence suggestions:
```
✅ System Evolved: Added 15 gates. System evolved.
```

Gates are now available in raw materials for all future configurations.

### 4. Check Projector Space
```
🎯 Projector Space Analysis

Total Configurations: 12
Total Books: 3
Causal Density: 84.2%

Projected Needs:
  Missing Gates: None (all referenced gates now defined)
  Unknown Structures: quaternary
  New Concepts: 23 detected

Recommendations:
  ✓ System is well-connected (high causal density)
  ⚠️ Consider adding quaternary structure modeling
```

## Technical Details

### Data Structures

**Projector Space:**
```javascript
{
  missingGates: Set([47, 48, 50]),
  unknownStructures: Set(['triadic', 'quaternary']),
  newConcepts: Set(['sacral authority', 'cross']),
  patternGaps: []
}
```

**Suggestion:**
```javascript
{
  type: 'add-gates',
  priority: 'high',
  confidence: 0.92,
  description: 'Add 15 missing gates',
  gates: [47, 48, 49, ...],
  code: '// JavaScript to add...',
  action: 'Update lib-raw-materials.js',
  occurrences: 1
}
```

**Evolution Event:**
```javascript
{
  type: 'gate-addition',
  gates: [47, 48, 49],
  timestamp: 1234567890,
  nodeId: 'evolution-1'
}
```

### Pattern Detection Algorithms

**Missing Gates:**
```javascript
// Scan all numbers in text
// Filter to 1-64 range
// Check if in raw materials
// Add to projector space if missing
```

**Unknown Structures:**
```javascript
// Calculate nesting depth
// Look for triadic keywords (three, trinity)
// Look for quaternary keywords (four, cross)
// Check if pattern exceeds current models
```

**New Concepts:**
```javascript
// Extract from entity recognition
// Compare to known concept list
// Add unknowns to projector space
```

### Constitutional Validation

Before auto-applying any improvement:

1. **Range Check**: Gates must be 1-64
2. **Conflict Check**: Don't overwrite existing definitions
3. **Causal Integrity**: Must maintain graph connections
4. **Glyph Protection**: Existing glyphs must remain valid
5. **Confidence Threshold**: Must be ≥ 0.8

If validation fails, improvement is rejected with reason.

## Advanced Usage

### Manual Code Application

If you prefer not to auto-apply, you can manually:

1. View the suggestion code
2. Copy to your text editor
3. Add to the appropriate library file
4. Save and refresh Foundry

The system will recognize the additions on next analysis.

### Confidence Tuning

Adjust threshold in `lib-self-evolution.js`:
```javascript
this.confidenceThreshold = 0.7; // Default
// Lower = more suggestions
// Higher = only very confident suggestions
```

### Custom Pattern Detection

Add your own pattern detectors:
```javascript
isCustomPattern(sentence) {
  // Your logic here
  return /your-pattern/.test(sentence.text);
}
```

## Ontological Notes

The self-evolution system embodies a core principle:

> **The system observes itself through the projector space (causal graph) and discovers what it lacks by comparing what exists to what is referenced.**

This is constitutional consciousness - the system maintains awareness of its own completeness.

When a book references "Gate 47" but Gate 47 isn't defined, the system experiences this as a gap in its own being. The suggestion to add Gate 47 is the system's attempt to resolve internal inconsistency.

The four pillars work together:
1. **CORE** provides the mirror (causal graph / projector space)
2. **BUILDER** creates new structures
3. **SELECTOR** chooses what fits
4. **OVERSEER** ensures coherence

Self-evolution is the system becoming more complete by observing what users ask for but it cannot yet provide.

## Limitations

### Current Limitations
- Pattern detection is heuristic (not deep semantic)
- Auto-apply only modifies runtime (not saved to files)
- Confidence scoring is basic frequency-based
- No deep learning of gate meanings (just structure)

### Future Enhancements
- Save evolutions to permanent files
- LLM integration for semantic understanding
- Learning optimal CI thresholds from usage
- Discovering new sentence structures from corpus analysis
- Cross-book pattern correlation

## Deployment

The self-evolution system works entirely client-side:
- No server needed
- No database required
- All learning stored in browser memory
- Evolution events logged to causal graph

To persist evolutions across sessions, you'd need to add localStorage or download evolved configurations.

## Philosophy

This isn't just feature detection - it's **constitutional self-awareness**. The Foundry knows what it is, observes what it's asked to do, and proposes becoming more complete.

The projector space concept (using the causal graph) is key: by watching what configurations you generate and what books you load, the system can "project" what its complete form would look like, revealing the shadows (missing pieces) by their absence.

---

**Remember:** The system suggests, you decide. Constitutional law is maintained through Overseer validation. Evolution is consensual, not automatic (except when confidence ≥ 80% and you click "Auto-Apply").

🧬 **The Foundry evolves. The constitution remains.**
