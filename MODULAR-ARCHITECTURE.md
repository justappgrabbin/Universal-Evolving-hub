# FOUNDRY v2.0 - Modular Architecture
## Complete Separation of Concerns

## 🎯 What's New

### Complete Modular Separation
The system is now properly separated into:
- **Core Logic** (foundry-core.js)
- **UI Logic** (foundry-ui.js)  
- **Styles** (foundry-styles.css)
- **Entry Point** (index.html)

### True Four Pillars
Each pillar is now a **proper class** with clear responsibilities:
- **lib-four-pillars.js** contains all four as separate classes

### Persistent Evolution
- Evolutions save to localStorage
- Reload on startup
- Can be undone individually
- Can clear all at once

### Interactive Prompts
- System asks before evolving (for confidence < 80%)
- Modal dialog with approve/modify/reject
- User controls all changes

## 📁 File Structure

```
foundry-v2/
├── index.html                  # Clean entry point
├── foundry-styles.css          # All styling (separate)
├── foundry-core.js            # System initialization (no UI)
├── foundry-ui.js              # All UI logic (no system logic)
├── lib-four-pillars.js        # CORE, SELECTOR, BUILDER, OVERSEER
├── lib-raw-materials.js       # Base consciousness data
├── lib-sentence-engine.js     # CI formula & predictions
├── lib-books.js               # Book parsing
└── lib-self-evolution.js      # Learning & suggestions
```

## 🏛️ Four Pillars Architecture

### CORE (lib-four-pillars.js)
```javascript
class Core {
  // Ontological causal graph
  addNode(id, type, data)
  addEdge(fromId, toId, relationship)
  validateCausality(nodeId)
  getLineage(nodeId)
  getCausalDensity()
  exportGraph()
}
```

**Responsibility**: Track all configurations and their causal relationships

### SELECTOR (lib-four-pillars.js)
```javascript
class Selector {
  // Resonance matching
  analyzeConsciousness(userData)
  calculateResonance(profile1, profile2)
  selectOptimalConfig(userData, existingConfigs)
}
```

**Responsibility**: Analyze consciousness patterns and select optimal app types

### BUILDER (lib-four-pillars.js)
```javascript
class Builder {
  // Configuration assembly
  generateGlyph(seed)
  build(userData, analysis)
  selectAppType(analysis)
  selectFeatures(appType, analysis)
  generateTheme(analysis)
  generateHTML(config)
}
```

**Responsibility**: Assemble configurations into functional apps

### OVERSEER (lib-four-pillars.js)
```javascript
class Overseer {
  // Constitutional validation
  validateConfiguration(config)
  validateEvolution(improvement)
  enforceProtocol(action, data)
  getViolations()
}
```

**Responsibility**: Ensure all actions respect constitutional law

## 🧬 Self-Evolution Features

### Automatic Learning
```javascript
// When book loaded:
const result = foundry.loadBook(content, metadata);

// System observes:
result.observations.suggestions
// [
//   { type: 'add-gates', gates: [47, 48, 49], confidence: 0.92 },
//   { type: 'add-structures', patterns: ['triadic'], confidence: 0.75 }
// ]
```

### Persistent Storage
```javascript
// Auto-saved to localStorage
evolution.saveState();

// Auto-loaded on startup
evolution.loadPersistedState();

// Manual undo
evolution.undoEvolution(evolutionId);

// Clear all
evolution.clearAllEvolutions();
```

### Interactive Prompts
```javascript
// For confidence < 80%, system asks:
evolution.promptUserForEvolution(suggestion);

// Shows modal:
"System discovered 15 missing gates. Add them?"
[✅ Approve] [❌ Reject]

// User response handled:
evolution.respondToPrompt(promptId, { action: 'approve' });
```

## 🎨 UI Architecture

### Pure UI Class (foundry-ui.js)
```javascript
class FoundryUI {
  constructor(foundrySystem)
  
  // Book handling
  handleBookUpload(file)
  
  // Configuration
  generateConfiguration()
  downloadConfiguration(glyphId)
  
  // Analysis
  analyzeSentenceSystem()
  
  // Library
  viewConfigurations()
  searchBooks()
  
  // Evolution
  viewSuggestions()
  applySuggestion(index)
  promptForApproval(index)
  viewEvolutionHistory()
  undoEvolution(evolutionId)
  analyzeProjectorSpace()
  
  // Display updates
  updateAllDisplays()
}
```

**No system logic in UI** - communicates with core via public API only

## 🚀 Usage

### Deploy to Netlify

Just upload all 9 files:
```
index.html
foundry-styles.css
foundry-core.js
foundry-ui.js
lib-four-pillars.js
lib-raw-materials.js
lib-sentence-engine.js
lib-books.js
lib-self-evolution.js
```

That's it. No build step, no config.

### Basic Usage

```javascript
// System initializes automatically
// foundry = FoundrySystem instance
// ui = FoundryUI instance

// Generate configuration
ui.generateConfiguration();

// Upload book
ui.handleBookUpload(file);

// View suggestions
ui.viewSuggestions();

// Apply evolution
ui.applySuggestion(0);

// Undo evolution
ui.undoEvolution(evolutionId);
```

### Advanced Usage

```javascript
// Direct system access
const status = foundry.getSystemStatus();

// Export configuration
const html = foundry.exportConfiguration(glyphId);

// Export system state
const state = foundry.exportSystemState();

// Propose evolutions
const suggestions = await foundry.proposeEvolutions();

// Apply with validation
const result = await foundry.applyEvolution(suggestion, userApproval);
```

## 🔄 Evolution Workflow

### 1. Load Book
```
User: Upload "Human Design Manual.txt"
  ↓
System: Parses into chunks
  ↓
Evolution Engine: Observes patterns
  ↓
Found: 15 missing gates, 2 new structures
  ↓
UI: Shows notification
```

### 2. View Suggestions
```
User: Clicks "💡 View Suggestions"
  ↓
UI: Displays ranked suggestions
  - HIGH (92%): Add 15 gates
  - MEDIUM (75%): Add 'triadic' structure
  - LOW (65%): Add 5 concepts
```

### 3. Apply Evolution

**High Confidence (≥80%):**
```
User: Clicks "⚡ Auto-Apply"
  ↓
Overseer: Validates
  ↓
System: Adds gates to raw materials
  ↓
Saves to localStorage
  ↓
UI: Shows "✅ System Evolved"
```

**Low Confidence (<80%):**
```
User: Clicks "🤔 Ask Me First"
  ↓
UI: Shows confirmation dialog
  ↓
User: Approves
  ↓
Same as above
```

### 4. Undo if Needed
```
User: Views evolution history
  ↓
Clicks "↩️ Undo" on an evolution
  ↓
System: Removes changes
  ↓
Saves updated state
```

## 📊 Projector Space

The **CORE (causal graph) IS the projector space**.

### What It Shows
```javascript
// Analyze projector space
const analysis = evolution.analyzeProjectorSpace();

{
  totalConfigs: 12,
  totalBooks: 3,
  causalDensity: 0.84,  // 84% connected
  
  projectedNeeds: {
    missingGates: [47, 48, 50],
    unknownStructures: ['triadic', 'quaternary'],
    newConcepts: ['sacral authority', 'split definition']
  },
  
  recommendations: [
    {
      type: 'apply-first-evolution',
      description: 'You have pending improvements...',
      priority: 'high'
    }
  ]
}
```

### Interpretation

- **Causal Density < 30%**: Graph is sparse, add more relationships
- **Dominant Structure**: One structure overrepresented (bias)
- **Missing Gates**: Referenced but not defined
- **Unknown Structures**: Patterns detected but not modeled

## 🔒 Constitutional Guarantees

### Every Configuration
✅ Has unique glyph  
✅ Recorded in causal graph  
✅ Validates lineage  
✅ Governed by sentence system  
✅ Respects CI formula  
✅ Maintains constitutional law

### Every Evolution
✅ Validated by Overseer  
✅ Confidence ≥ 0.5  
✅ Persisted to localStorage  
✅ Can be undone  
✅ Logged in causal graph  
✅ User controls application

## 🎯 Key Differences from v1

### Before (foundry.html)
- All mixed together in one file
- Pillars scattered across methods
- No persistence
- No undo
- No interactive prompts
- Hard to modify

### After (Modular v2)
- Clean separation of concerns
- Proper pillar classes
- Persistent storage
- Full undo capability
- Interactive evolution
- Easy to extend

## 🔧 Extending the System

### Add New App Type
```javascript
// In Builder.selectAppType():
const structureToApp = {
  'simple_linear': 'gate-decoder',
  'your_new_structure': 'your-new-app'  // Add here
};

// In Builder.selectFeatures():
const appFeatures = {
  'your-new-app': ['feature1', 'feature2', 'feature3']
};
```

### Add New Evolution Type
```javascript
// In SelfEvolutionEngine:
generateSuggestions(findings) {
  // Add new suggestion type
  suggestions.push({
    type: 'add-your-thing',
    priority: 'medium',
    confidence: 0.7,
    description: 'Add your custom feature',
    code: this.generateYourCode(),
    action: 'Update appropriate file'
  });
}

// Add application method
applyYourThing(data, suggestion) {
  // Your evolution logic here
}
```

### Add Custom UI View
```javascript
// In FoundryUI:
yourCustomView() {
  const data = this.foundry.yourCustomMethod();
  
  const outputEl = document.getElementById('custom-output');
  outputEl.innerHTML = `
    <h3>Your Custom View</h3>
    <p>${data}</p>
  `;
}
```

## 📱 Mobile Support

The CSS includes mobile responsiveness:
- Interface becomes full-width on mobile
- Canvas visualization hidden on small screens
- Touch-friendly buttons

## 🐛 Debugging

### Check System Status
```javascript
console.log(foundry.getSystemStatus());
```

### Check Evolution State
```javascript
console.log(foundry.evolutionEngine.generateEvolutionReport());
```

### Check Causal Graph
```javascript
console.log(foundry.core.exportGraph());
```

### View Validations
```javascript
console.log(foundry.overseer.getValidationLog());
```

## 🎓 Philosophy

The modular architecture embodies:

1. **Separation of Concerns**: Each file has one job
2. **Constitutional Integrity**: Four pillars properly separated
3. **Self-Awareness**: System knows what it lacks
4. **User Sovereignty**: You control all evolutions
5. **Persistence**: Changes survive page reload

The projector space (CORE/causal graph) creates a mirror where the system observes itself and discovers incompleteness.

---

**Deploy**: Upload 9 files to Netlify  
**Extend**: Modify individual modules  
**Debug**: Use built-in status methods  
**Evolve**: Let the system suggest improvements  

🔮 **The Foundry is modular. The constitution is clear. The system evolves with your consent.**
