# FOUNDRY Constitutional Layer - Deployment Guide

## Overview
The Foundry is a **pure client-side static system** that generates custom consciousness apps based on resonance patterns. It uses your **sentence system** as its constitutional foundation.

## Architecture

### Three Libraries (All Client-Side JS)
1. **lib-raw-materials.js** - Gates, codons, elements, centers, planets (raw consciousness data)
2. **lib-sentence-engine.js** - CI formula with Λ (13-place weight), structure prediction, Markov chains
3. **lib-books.js** - Detailed text parsing with context windows, entity extraction, pattern detection

### Sentence System Constitutional Law
```
CI_New = Λ · (α · D · G · C · (1 - e^(-βτ)))
```

Where:
- **Λ (Lambda)** = 13-place planetary weight (12 positions + center)
- **D** = Dimensionality (consciousness dimension)
- **G** = Genetic Code (gate/line influence)
- **C** = Center (biological anchor)
- **α, β** = System constants
- **τ (tau)** = Time factor

### Four Pillars
1. **CORE** - Ontological causal graph (tracks all configurations)
2. **BUILDER** - Assembles configurations from consciousness data
3. **SELECTOR** - Matches apps to resonance patterns
4. **OVERSEER** - Validates constitutional compliance

### Glyph System
Each configuration gets a unique **glyph** (4 symbols + color) that serves as:
- Constitutional ID
- Protection signature
- Causal lineage marker

## Files

### Main Application
- **foundry.html** - Main interface (single HTML file)

### Libraries
- **lib-raw-materials.js** - Base consciousness data
- **lib-sentence-engine.js** - Sentence system engine
- **lib-books.js** - Book parsing and indexing

## Deployment to Netlify

### Option 1: Drag and Drop
1. Go to Netlify dashboard
2. Drag all 4 files into a single folder
3. Drop the folder onto "Sites" area
4. Done! Your site is live

### Option 2: Git Deployment
```bash
# Create new repo
git init
git add foundry.html lib-*.js
git commit -m "Initial Foundry deployment"

# Push to GitHub/GitLab
git remote add origin YOUR_REPO_URL
git push -u origin main

# Connect to Netlify
# - Go to Netlify dashboard
# - Click "New site from Git"
# - Select your repo
# - Build settings: Leave empty (static site)
# - Publish directory: Leave empty or "."
```

### File Structure
```
/
├── foundry.html          # Main app (entry point)
├── lib-raw-materials.js  # Raw consciousness data
├── lib-sentence-engine.js # Sentence system
└── lib-books.js          # Book parsing
```

## Usage

### 1. Load Books
- Click "📚 Upload Book" to load consciousness texts
- Books are parsed into chunks with context windows
- Automatic entity extraction (gates, centers, planets)
- Builds searchable index

### 2. Generate Configuration
- Enter gates (comma-separated): `25, 51, 10`
- Describe consciousness state in text box
- Click "⚡ Generate App"
- System analyzes using sentence engine
- Generates unique glyph and custom HTML app

### 3. Download Custom App
- Each generated app is a standalone HTML file
- Embedded sentence system engine
- Embedded resonance engine
- Protected by constitutional layer
- Can be deployed independently

### 4. Search Books
- Click "🔍 Search Books"
- Enter query (e.g., "gate 25", "sacral center")
- Returns relevant chunks with context

## How It Works

### Consciousness Analysis
1. User provides gates + text description
2. **Sentence Engine** calculates:
   - Λ for each gate (13-place weight)
   - CI values (collapse intensity)
   - Structure prediction (Simple/Mirror/Nested/Binary)
3. **Markov Chain** predicts next state
4. **Builder** selects optimal app type

### App Generation
1. **Glyph** generated from consciousness signature
2. **Causal node** added to graph
3. **Features** selected based on structure
4. **Theme** determined by CI average
5. **HTML** generated with embedded engines

### Structure Transitions
Based on CI threshold crossing:
- **< 0.3**: Simple Linear (direct communication)
- **0.3-0.5**: Mirror (reflective patterns)
- **0.5-0.7**: Nested (recursive complexity)
- **> 0.7**: Binary Split (choice bifurcation)

## Customization

### Tuning Constants
In `lib-sentence-engine.js`:
```javascript
this.alpha = 1.2;  // Amplification factor
this.beta = 0.5;   // Decay rate

this.thresholds = {
  simple_linear: 0.3,
  mirror: 0.5,
  nested: 0.7,
  binary_split: 0.9
};
```

### Adding Gates
In `lib-raw-materials.js`:
```javascript
gates: {
  // Add more gates...
  65: { name: "New Gate", element: "fire", codon: "AAA", ... }
}
```

### Custom App Types
In `foundryCore.selectAppType()`:
```javascript
const structureToApp = {
  'simple_linear': 'your-custom-app',
  // ...
};
```

## Key Features

### ✓ Pure Client-Side
- No server required
- No Python/Node.js
- Runs entirely in browser
- Perfect for Netlify static hosting

### ✓ Sentence System Integration
- CI formula with 13-place Λ
- Structure prediction
- Markov state transitions
- Constitutional foundation

### ✓ Three Libraries
- Raw materials (gates, codons, elements)
- Completed pieces (configurations)
- Books (detailed parsing with context)

### ✓ Causal Graph
- Tracks all configurations
- Validates constitutional compliance
- Maintains lineage

### ✓ Glyph Protection
- Unique identifiers
- Constitutional seals
- Tamper-evident

## Example Workflow

1. **Upload book**: Human Design manual
2. **System indexes**: 500 chunks, extracts gates/centers
3. **User inputs**: Gates 25, 51 + consciousness description
4. **Sentence engine calculates**:
   - Λ = 1.82 (13-place weight)
   - CI = 0.67 (crosses "nested" threshold)
   - Structure = "nested"
5. **Builder generates**: Trinity Integration app
6. **User downloads**: Standalone HTML with glyph ◉◈○▰

## Technical Notes

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript
- p5.js for visualization
- No build step required

### Performance
- Book indexing: ~1 second per 100k words
- Configuration generation: ~100ms
- Causal graph: Handles 1000+ nodes
- Search: Real-time across all books

### Storage
- All data stored in browser memory (Map objects)
- Configurations persist in `Map`
- Books persist in `Map`
- Can be extended to IndexedDB if needed

## Troubleshooting

### "Libraries not loading"
Make sure all 4 files are in the same directory:
- foundry.html
- lib-raw-materials.js
- lib-sentence-engine.js
- lib-books.js

### "Book upload not working"
- Check file format (.txt or .md)
- Check file size (< 10MB recommended)
- Check browser console for errors

### "Configuration not generating"
- Ensure gates are valid (1-64)
- Provide consciousness description
- Check browser console for errors

## Next Steps

### Extend the System
1. Add more gates/codons to raw materials
2. Add custom app types to builder
3. Extend sentence structures beyond 4 types
4. Add more sophisticated Markov chains
5. Integrate with external APIs (optional)

### Deploy Multiple Instances
Each generated app can be deployed independently:
1. Generate configuration
2. Download HTML
3. Deploy to separate Netlify site
4. Each gets unique glyph protection

## Constitutional Compliance

Every app generated by Foundry:
- ✓ Has unique glyph
- ✓ Recorded in causal graph
- ✓ Validates lineage
- ✓ Governed by sentence system
- ✓ Respects CI formula
- ✓ Maintains constitutional law

---

**Remember**: The Foundry doesn't just create apps—it generates **constitutionally protected consciousness configurations** that respect the fundamental laws of field resonance and causal structure.

🔮 **Foundry is the law. The apps are sovereign.**
