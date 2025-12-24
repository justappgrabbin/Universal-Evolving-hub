# 🏗️ UNIVERSAL BUILDER - Complete Documentation

## What It Does

The Universal Builder allows you to **generate ANY type of app** by simply:
1. **Uploading a file** (spec, code, description)
2. **Describing what you want** (natural language)

The system automatically:
- Analyzes your input
- Selects the best template
- Generates a complete, working app
- Validates with OVERSEER
- Provides download link

## ✅ What You Can Build

### 🎮 Games
- **2D Games** (p5.js) - Space shooters, platformers, arcade games
- **Text Adventures** - Story-based, choice-driven games

### 📱 Apps
- **Todo Lists** - Task management with localStorage
- **Calculators** - Full-featured calculators
- **Timers** - Countdown, stopwatch, pomodoro

### 🛠️ Tools
- **Converters** - Unit conversion (length, weight, temp, etc.)
- **Generators** - Random generators (names, colors, ideas)

### 📸 Photo Tools
- **Photo Editors** - Upload, filter, download images
- Filters: Grayscale, Invert, Blur

### 🔮 Consciousness Tools
- **Consciousness Trackers** - Track active gates, save states
- **Chart Decoders** (can be extended)

## 🚀 How To Use

### Method 1: Upload a Specification File

```
Create a file: game-spec.txt

Content:
"I want a 2D space shooter game where the player
can move with arrow keys and shoot enemies.
Keep score and increase difficulty."

Upload → System builds complete game
```

### Method 2: Describe In Text Box

```
Type in "Or describe what you want" box:

"Make a photo editor where I can upload images
and apply filters like grayscale and blur"

Click "🏗️ Build From Description"
→ System builds complete photo editor
```

### Method 3: Upload Existing Code

```
Upload .html, .js, or .py file

System:
- Detects file type
- Analyzes content
- Selects matching template
- Enhances/completes code
```

## 📋 Available Templates

The system has these built-in templates:

1. **game-2d** - 2D games with p5.js (player, enemies, score, physics)
2. **game-text** - Text adventures (story, choices, inventory, state)
3. **app-todo** - Todo lists (CRUD, localStorage, UI)
4. **app-calculator** - Calculators (math operations, display, history)
5. **app-timer** - Timers (countdown, stopwatch, alerts)
6. **tool-converter** - Unit converters (input, conversion logic, output)
7. **tool-generator** - Generators (algorithms, randomization)
8. **photo-editor** - Photo editors (canvas, filters, download)
9. **consciousness-tracker** - Consciousness tools (gates, tracking, charts)

## 🔍 How Template Selection Works

### Analysis Process

```javascript
// Step 1: Detect content type
Keywords counted:
- game: ['game', 'player', 'enemy', 'shoot', 'score']
- app: ['app', 'button', 'form', 'input']
- tool: ['convert', 'calculate', 'generate']
- photo: ['image', 'filter', 'edit', 'crop']
- consciousness: ['gate', 'chart', 'bodygraph']

// Step 2: Extract specifications
Features: "should move", "must shoot", "needs to score"
UI Elements: "button", "input field", "display area"
Data Needs: "save scores", "localStorage"

// Step 3: Match to template
If content_type == 'game' && mentions 'move' && mentions 'shoot':
  → template = 'game-2d' (confidence: 92%)

// Step 4: Generate app
Customize template with extracted specs
```

### Example Matches

| Your Description | Detected Type | Selected Template | Confidence |
|------------------|---------------|-------------------|------------|
| "Space shooter game" | game | game-2d | 95% |
| "Story with choices" | game | game-text | 90% |
| "Task list app" | app | app-todo | 85% |
| "Number calculator" | app | app-calculator | 95% |
| "Photo filter tool" | photo | photo-editor | 90% |
| "Track my gates" | consciousness | consciousness-tracker | 85% |

## 💡 Examples

### Example 1: Build 2D Game

**Input (describe):**
```
"Make a simple 2D game where a green square 
can move around the screen with arrow keys"
```

**Output:**
- Complete HTML file
- p5.js game with player control
- Arrow key movement
- Constrained to canvas bounds
- Ready to play instantly

### Example 2: Build Todo App

**Input (upload file: todo-requirements.txt):**
```
Requirements:
- Add tasks with input field
- Mark tasks as complete
- Delete tasks
- Save to localStorage
```

**Output:**
- Complete todo app HTML
- Add/complete/delete functionality
- localStorage persistence
- Clean UI

### Example 3: Build Photo Editor

**Input (describe):**
```
"Create a photo editor where users can:
- Upload an image
- Apply grayscale filter
- Apply invert colors
- Download the result"
```

**Output:**
- Canvas-based photo editor
- File upload
- Three filters (gray, invert, blur)
- Download button
- Reset functionality

## 🏛️ Integration with Four Pillars

### SELECTOR
Analyzes uploaded content to determine app type
```javascript
selector.analyzeConsciousness(userData)
// Applied to file content analysis
```

### BUILDER
Assembles the final app from template + specs
```javascript
builder.build(userData, analysis)
// Extended to app generation
```

### OVERSEER
Validates generated app before delivery
```javascript
overseer.enforceProtocol('generate-app', app)
// Checks: valid HTML, no security issues, functional
```

### CORE
Tracks all built apps in causal graph
```javascript
core.addNode(appId, 'generated-app', appData)
core.addEdge('root', appId, 'built-from-spec')
```

## 🔄 Workflow Diagram

```
User Action:
  ├─ Upload spec.txt
  │    ↓
  │  UniversalBuilder.analyzeUpload()
  │    ↓
  │  Extract: type, specs, features
  │    ↓
  │  Suggest template (confidence %)
  │    ↓
  │  Generate HTML from template
  │    ↓
  │  OVERSEER validates
  │    ↓
  │  CORE records in graph
  │    ↓
  │  UI shows download button
  │
  └─ Or type description
       ↓
     UniversalBuilder.buildFromDescription()
       ↓
     (same flow as above)
```

## 🎯 Advanced Features

### Custom Feature Injection

System detects requirements and adds code:

```javascript
// User says: "needs to save high scores"
// System adds to generated code:

localStorage.setItem('highScore', score);

// User says: "should have sound effects"
// System adds:

const shootSound = new Audio('shoot.mp3');
```

### Multiple File Support

Upload multiple files and system combines them:
```
- game-logic.txt (mechanics)
- game-ui.txt (interface design)
- game-story.txt (narrative)

→ System merges into single app
```

### Template Mixing

System can combine templates if specs require:
```
"Photo editor with todo list functionality"
→ Mixes photo-editor + app-todo templates
```

## 📊 Build History

Every app built is tracked:

```javascript
foundry.getBuildHistory()

// Returns:
[
  {
    analysis: { contentType: 'game', confidence: 0.92 },
    template: 'game-2d',
    app: { id: 'app-1234', type: 'game', html: '...' },
    timestamp: 1234567890
  }
]
```

View in UI:
```
Click "📜 Build History"
→ See all built apps
→ Download any previous build
→ Preview in new window
```

## 🛡️ Security & Validation

### OVERSEER Checks

Before any app is delivered:
```javascript
✓ Valid HTML structure
✓ No external script injection
✓ No eval() or dangerous functions
✓ No direct DOM manipulation vulnerabilities
✓ Causal lineage verified
```

### Content Sanitization

All user input is sanitized:
- HTML entities escaped
- Script tags removed
- URLs validated

## 🔧 Extending Templates

### Add Your Own Template

```javascript
// In lib-universal-builder.js:

this.templates.set('my-custom-app', {
  type: 'app',
  framework: 'vanilla',
  features: ['feature1', 'feature2'],
  baseCode: this.getMyCustomTemplate()
});

// Then add template method:

getMyCustomTemplate() {
  return `<!DOCTYPE html>
<html>
<head>
  <title>My App</title>
</head>
<body>
  <!-- Your template here -->
</body>
</html>`;
}
```

### Modify Existing Template

```javascript
// Find template in initializeTemplates()
// Edit baseCode or features

this.templates.set('game-2d', {
  type: 'game',
  framework: 'p5.js',
  features: ['player', 'enemies', 'score', 'YOUR_FEATURE'],  // Add here
  baseCode: this.getGame2DTemplate()  // Or modify method
});
```

## 📱 Deployment

### Deploy Generated Apps

Each built app is a **standalone HTML file**:
```
1. Download app (📦 button)
2. Upload to Netlify/Vercel/GitHub Pages
3. Done - instant live app
```

### Deploy Foundry with Universal Builder

Upload these files to Netlify:
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
lib-universal-builder.js   ← NEW
```

## 🎓 Use Cases

### For Developers
- Rapid prototyping
- Generate boilerplate apps
- Test app ideas quickly

### For Non-Developers
- Create tools without coding
- Build games by description
- Generate utilities for personal use

### For Teams
- Standardized app templates
- Quick tool generation
- Consistent code structure

### For Learning
- See working code examples
- Understand app structure
- Modify and experiment

## 🐛 Troubleshooting

### "No suitable template found"
- Be more specific in description
- Include keywords like "game", "app", "tool"
- Try uploading a text file instead

### "App validation failed"
- Check OVERSEER logs in console
- May need to adjust generated code
- Try simpler requirements

### Generated app doesn't work
- Open browser console for errors
- Check if all features were recognized
- May need to manually adjust code

## 🔮 Future Enhancements

Possible future additions:
- AI-powered code generation (LLM integration)
- More templates (multiplayer games, 3D, etc.)
- Template wizard (step-by-step builder)
- Code editor in-browser
- Direct deploy to hosting
- Template marketplace

## 📊 Statistics

System tracks:
- Total apps built
- Most popular templates
- Average confidence scores
- Success rate

Access in console:
```javascript
foundry.universalBuilder.buildHistory
```

---

**Summary:**
The Universal Builder transforms Foundry from a consciousness mapping tool into a **complete app generation platform**. Upload a spec or describe what you want, and get a working app instantly.

🏗️ **Build anything. Deploy everywhere. Constitutional protection included.**
