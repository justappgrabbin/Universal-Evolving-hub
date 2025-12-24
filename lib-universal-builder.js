/**
 * UNIVERSAL BUILDER
 * Generates ANY type of app/game/tool from uploaded specifications
 * Integrates with Foundry Four Pillars architecture
 */

class UniversalBuilder {
  constructor(foundrySystem) {
    this.foundry = foundrySystem;
    this.templates = new Map();
    this.uploadQueue = [];
    this.buildHistory = [];
    
    // Initialize templates
    this.initializeTemplates();
    
    console.log('🏗️ Universal Builder initialized');
  }
  
  // ============================================
  // TEMPLATE INITIALIZATION
  // ============================================
  
  initializeTemplates() {
    // Game templates
    this.templates.set('game-2d', {
      type: 'game',
      framework: 'p5.js',
      features: ['player', 'enemies', 'score', 'physics'],
      baseCode: this.getGame2DTemplate()
    });
    
    this.templates.set('game-text', {
      type: 'game',
      framework: 'vanilla',
      features: ['story', 'choices', 'inventory', 'state'],
      baseCode: this.getTextGameTemplate()
    });
    
    // App templates
    this.templates.set('app-todo', {
      type: 'app',
      framework: 'react',
      features: ['crud', 'storage', 'ui'],
      baseCode: this.getTodoAppTemplate()
    });
    
    this.templates.set('app-calculator', {
      type: 'app',
      framework: 'vanilla',
      features: ['math', 'ui', 'history'],
      baseCode: this.getCalculatorTemplate()
    });
    
    this.templates.set('app-timer', {
      type: 'app',
      framework: 'vanilla',
      features: ['time', 'alerts', 'ui'],
      baseCode: this.getTimerTemplate()
    });
    
    // Tool templates
    this.templates.set('tool-converter', {
      type: 'tool',
      framework: 'vanilla',
      features: ['input', 'conversion', 'output'],
      baseCode: this.getConverterTemplate()
    });
    
    this.templates.set('tool-generator', {
      type: 'tool',
      framework: 'vanilla',
      features: ['input', 'algorithm', 'output'],
      baseCode: this.getGeneratorTemplate()
    });
    
    // Photo/Image tools
    this.templates.set('photo-editor', {
      type: 'tool',
      framework: 'canvas',
      features: ['upload', 'filters', 'download'],
      baseCode: this.getPhotoEditorTemplate()
    });
    
    // Consciousness apps
    this.templates.set('consciousness-tracker', {
      type: 'app',
      framework: 'vanilla',
      features: ['consciousness', 'gates', 'tracking'],
      baseCode: this.getConsciousnessTrackerTemplate()
    });
  }
  
  // ============================================
  // FILE ANALYSIS
  // ============================================
  
  analyzeUpload(file, content) {
    /**
     * Analyze uploaded file to determine what kind of app to build
     */
    
    const analysis = {
      fileName: file.name,
      fileType: this.detectFileType(file.name),
      contentType: this.detectContentType(content),
      extractedSpecs: this.extractSpecifications(content),
      suggestedTemplate: null,
      confidence: 0
    };
    
    // Determine suggested template
    const suggestion = this.suggestTemplate(analysis);
    analysis.suggestedTemplate = suggestion.template;
    analysis.confidence = suggestion.confidence;
    
    return analysis;
  }
  
  detectFileType(fileName) {
    const ext = fileName.split('.').pop().toLowerCase();
    const typeMap = {
      'txt': 'text',
      'md': 'markdown',
      'html': 'html',
      'js': 'javascript',
      'py': 'python',
      'json': 'json',
      'jpg': 'image',
      'png': 'image',
      'pdf': 'document'
    };
    return typeMap[ext] || 'unknown';
  }
  
  detectContentType(content) {
    const keywords = {
      game: ['game', 'player', 'score', 'level', 'enemy', 'shoot', 'move'],
      app: ['app', 'application', 'button', 'form', 'input', 'crud'],
      tool: ['tool', 'convert', 'calculate', 'generate', 'utility'],
      photo: ['image', 'photo', 'filter', 'edit', 'crop', 'resize'],
      consciousness: ['consciousness', 'gate', 'chart', 'bodygraph', 'design']
    };
    
    const scores = {};
    for (const [type, words] of Object.entries(keywords)) {
      scores[type] = words.reduce((sum, word) => {
        const regex = new RegExp(word, 'gi');
        return sum + (content.match(regex) || []).length;
      }, 0);
    }
    
    const maxType = Object.entries(scores).reduce((a, b) => 
      scores[a[0]] > b[1] ? a : b
    );
    
    return maxType[0];
  }
  
  extractSpecifications(content) {
    /**
     * Extract specific requirements from content
     */
    
    const specs = {
      features: [],
      requirements: [],
      ui: [],
      data: []
    };
    
    // Extract features (lines with "should", "must", "needs to")
    const featureRegex = /(should|must|needs? to|requires?)\s+([^.!?\n]+)/gi;
    let match;
    while ((match = featureRegex.exec(content)) !== null) {
      specs.features.push(match[2].trim());
    }
    
    // Extract UI elements
    const uiKeywords = ['button', 'input', 'form', 'display', 'show', 'menu', 'screen'];
    for (const keyword of uiKeywords) {
      const regex = new RegExp(`\\b${keyword}\\b[^.!?\n]*`, 'gi');
      const matches = content.match(regex);
      if (matches) specs.ui.push(...matches);
    }
    
    // Extract data requirements
    const dataKeywords = ['store', 'save', 'load', 'data', 'database', 'localStorage'];
    for (const keyword of dataKeywords) {
      if (content.toLowerCase().includes(keyword)) {
        specs.data.push(keyword);
      }
    }
    
    return specs;
  }
  
  suggestTemplate(analysis) {
    /**
     * Suggest best template based on analysis
     */
    
    const contentType = analysis.contentType;
    const specs = analysis.extractedSpecs;
    
    // Match content type to template category
    const templateMap = {
      game: ['game-2d', 'game-text'],
      app: ['app-todo', 'app-calculator', 'app-timer'],
      tool: ['tool-converter', 'tool-generator'],
      photo: ['photo-editor'],
      consciousness: ['consciousness-tracker']
    };
    
    const candidates = templateMap[contentType] || [];
    
    if (candidates.length === 0) {
      return { template: 'app-todo', confidence: 0.5 }; // Default
    }
    
    // Simple heuristic: first candidate
    return { template: candidates[0], confidence: 0.8 };
  }
  
  // ============================================
  // APP GENERATION
  // ============================================
  
  async buildFromUpload(file, content, userPreferences = {}) {
    /**
     * Build app from uploaded file
     */
    
    // Analyze upload
    const analysis = this.analyzeUpload(file, content);
    
    // Get template
    const template = this.templates.get(analysis.suggestedTemplate);
    if (!template) {
      throw new Error('No suitable template found');
    }
    
    // Generate app
    const app = await this.generateApp(template, analysis, userPreferences);
    
    // Store in build history
    this.buildHistory.push({
      analysis,
      template: analysis.suggestedTemplate,
      app,
      timestamp: Date.now()
    });
    
    // Validate with OVERSEER
    const validation = this.foundry.overseer.enforceProtocol('generate-app', app);
    if (!validation.valid) {
      throw new Error('App validation failed: ' + JSON.stringify(validation.checks));
    }
    
    return app;
  }
  
  async buildFromDescription(description, appType = null) {
    /**
     * Build app from text description
     */
    
    const analysis = {
      fileName: 'description.txt',
      fileType: 'text',
      contentType: appType || this.detectContentType(description),
      extractedSpecs: this.extractSpecifications(description),
      suggestedTemplate: null,
      confidence: 0
    };
    
    const suggestion = this.suggestTemplate(analysis);
    analysis.suggestedTemplate = suggestion.template;
    analysis.confidence = suggestion.confidence;
    
    const template = this.templates.get(analysis.suggestedTemplate);
    if (!template) {
      throw new Error('No suitable template found');
    }
    
    const app = await this.generateApp(template, analysis, {});
    
    this.buildHistory.push({
      analysis,
      template: analysis.suggestedTemplate,
      app,
      timestamp: Date.now()
    });
    
    return app;
  }
  
  async generateApp(template, analysis, preferences) {
    /**
     * Generate complete app from template and specs
     */
    
    const app = {
      id: `app-${Date.now()}`,
      type: template.type,
      framework: template.framework,
      template: template,
      specs: analysis.extractedSpecs,
      html: '',
      timestamp: Date.now()
    };
    
    // Generate HTML based on template
    switch (template.framework) {
      case 'p5.js':
        app.html = this.generateP5App(template, analysis, preferences);
        break;
      case 'react':
        app.html = this.generateReactApp(template, analysis, preferences);
        break;
      case 'canvas':
        app.html = this.generateCanvasApp(template, analysis, preferences);
        break;
      default:
        app.html = this.generateVanillaApp(template, analysis, preferences);
    }
    
    return app;
  }
  
  // ============================================
  // APP GENERATORS
  // ============================================
  
  generateVanillaApp(template, analysis, preferences) {
    const baseCode = template.baseCode;
    const specs = analysis.extractedSpecs;
    
    // Customize based on specs
    let customCode = baseCode;
    
    // Add features mentioned in specs
    if (specs.features.length > 0) {
      customCode = customCode.replace(
        '// CUSTOM_FEATURES',
        `// Features: ${specs.features.join(', ')}\n    // CUSTOM_FEATURES`
      );
    }
    
    return customCode;
  }
  
  generateP5App(template, analysis, preferences) {
    return template.baseCode;
  }
  
  generateReactApp(template, analysis, preferences) {
    return template.baseCode;
  }
  
  generateCanvasApp(template, analysis, preferences) {
    return template.baseCode;
  }
  
  // ============================================
  // TEMPLATES (Base Code)
  // ============================================
  
  getGame2DTemplate() {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>2D Game</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js"></script>
  <style>
    body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #000; }
    canvas { border: 2px solid #00ff88; }
  </style>
</head>
<body>
<script>
let player;
let score = 0;

function setup() {
  createCanvas(800, 600);
  player = { x: width/2, y: height-50, w: 40, h: 40, speed: 5 };
}

function draw() {
  background(20);
  
  // Player
  fill(0, 255, 136);
  rect(player.x - player.w/2, player.y - player.h/2, player.w, player.h);
  
  // Controls
  if (keyIsDown(LEFT_ARROW)) player.x -= player.speed;
  if (keyIsDown(RIGHT_ARROW)) player.x += player.speed;
  if (keyIsDown(UP_ARROW)) player.y -= player.speed;
  if (keyIsDown(DOWN_ARROW)) player.y += player.speed;
  
  // Keep in bounds
  player.x = constrain(player.x, player.w/2, width - player.w/2);
  player.y = constrain(player.y, player.h/2, height - player.h/2);
  
  // Score
  fill(255);
  textSize(24);
  text('Score: ' + score, 20, 40);
  
  // CUSTOM_FEATURES
}
</script>
</body>
</html>`;
  }
  
  getTextGameTemplate() {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Text Adventure</title>
  <style>
    body { font-family: 'Courier New', monospace; background: #0a0a0a; color: #00ff88; padding: 40px; }
    #story { max-width: 800px; margin: 0 auto; line-height: 1.8; }
    .choice { background: #00ff88; color: #000; padding: 10px 20px; margin: 10px 5px; border: none; cursor: pointer; font-family: 'Courier New', monospace; }
    .choice:hover { background: #00ffff; }
  </style>
</head>
<body>
<div id="story"></div>
<script>
const story = {
  start: {
    text: "You wake up in a mysterious place...",
    choices: [
      { text: "Look around", next: "lookAround" },
      { text: "Call out", next: "callOut" }
    ]
  },
  lookAround: {
    text: "You see a door ahead.",
    choices: [
      { text: "Open door", next: "openDoor" },
      { text: "Go back", next: "start" }
    ]
  },
  callOut: {
    text: "Your voice echoes...",
    choices: [
      { text: "Continue", next: "start" }
    ]
  },
  openDoor: {
    text: "You found the exit!",
    choices: []
  }
};

let current = "start";

function showScene() {
  const scene = story[current];
  const storyEl = document.getElementById('story');
  
  storyEl.innerHTML = \`
    <p>\${scene.text}</p>
    \${scene.choices.map(c => 
      \`<button class="choice" onclick="goTo('\${c.next}')">\${c.text}</button>\`
    ).join('')}
  \`;
}

function goTo(scene) {
  current = scene;
  showScene();
}

showScene();
</script>
</body>
</html>`;
  }
  
  getTodoAppTemplate() {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Todo App</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
    input { padding: 10px; width: 70%; margin-right: 10px; }
    button { padding: 10px 20px; background: #00ff88; border: none; cursor: pointer; }
    ul { list-style: none; padding: 0; }
    li { padding: 10px; margin: 5px 0; background: #f0f0f0; display: flex; justify-content: space-between; }
    .done { text-decoration: line-through; opacity: 0.5; }
  </style>
</head>
<body>
  <h1>📝 Todo List</h1>
  <div>
    <input id="todoInput" placeholder="What needs to be done?" />
    <button onclick="addTodo()">Add</button>
  </div>
  <ul id="todoList"></ul>
<script>
let todos = JSON.parse(localStorage.getItem('todos') || '[]');

function render() {
  const list = document.getElementById('todoList');
  list.innerHTML = todos.map((todo, i) => \`
    <li class="\${todo.done ? 'done' : ''}">
      <span onclick="toggleTodo(\${i})">\${todo.text}</span>
      <button onclick="deleteTodo(\${i})">🗑️</button>
    </li>
  \`).join('');
}

function addTodo() {
  const input = document.getElementById('todoInput');
  if (input.value.trim()) {
    todos.push({ text: input.value, done: false });
    input.value = '';
    save();
  }
}

function toggleTodo(i) {
  todos[i].done = !todos[i].done;
  save();
}

function deleteTodo(i) {
  todos.splice(i, 1);
  save();
}

function save() {
  localStorage.setItem('todos', JSON.stringify(todos));
  render();
}

render();
</script>
</body>
</html>`;
  }
  
  getCalculatorTemplate() {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Calculator</title>
  <style>
    body { display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #222; font-family: Arial; }
    .calc { background: #333; padding: 20px; border-radius: 10px; box-shadow: 0 10px 50px rgba(0,0,0,0.5); }
    #display { width: 100%; height: 60px; font-size: 32px; text-align: right; padding: 10px; margin-bottom: 10px; background: #000; color: #0f0; border: none; }
    .buttons { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
    button { padding: 20px; font-size: 20px; background: #555; color: #fff; border: none; cursor: pointer; border-radius: 5px; }
    button:hover { background: #777; }
    .operator { background: #ff8800; }
    .operator:hover { background: #ffaa00; }
  </style>
</head>
<body>
<div class="calc">
  <input id="display" readonly value="0" />
  <div class="buttons">
    <button onclick="clear()">C</button>
    <button onclick="append('/')" class="operator">/</button>
    <button onclick="append('*')" class="operator">*</button>
    <button onclick="backspace()">←</button>
    <button onclick="append('7')">7</button>
    <button onclick="append('8')">8</button>
    <button onclick="append('9')">9</button>
    <button onclick="append('-')" class="operator">-</button>
    <button onclick="append('4')">4</button>
    <button onclick="append('5')">5</button>
    <button onclick="append('6')">6</button>
    <button onclick="append('+')" class="operator">+</button>
    <button onclick="append('1')">1</button>
    <button onclick="append('2')">2</button>
    <button onclick="append('3')">3</button>
    <button onclick="calculate()" class="operator" style="grid-row: span 2">=</button>
    <button onclick="append('0')" style="grid-column: span 2">0</button>
    <button onclick="append('.')">.</button>
  </div>
</div>
<script>
let current = '0';

function append(val) {
  if (current === '0') current = val;
  else current += val;
  document.getElementById('display').value = current;
}

function clear() {
  current = '0';
  document.getElementById('display').value = current;
}

function backspace() {
  current = current.slice(0, -1) || '0';
  document.getElementById('display').value = current;
}

function calculate() {
  try {
    current = String(eval(current));
    document.getElementById('display').value = current;
  } catch(e) {
    document.getElementById('display').value = 'Error';
    current = '0';
  }
}
</script>
</body>
</html>`;
  }
  
  getTimerTemplate() {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Timer</title>
  <style>
    body { display: flex; justify-content: center; align-items: center; min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-family: Arial; }
    .timer { text-align: center; background: rgba(255,255,255,0.1); padding: 60px; border-radius: 20px; backdrop-filter: blur(10px); }
    #display { font-size: 80px; color: #fff; margin: 30px 0; font-weight: 200; letter-spacing: 10px; }
    button { padding: 15px 30px; margin: 10px; font-size: 18px; background: #fff; border: none; border-radius: 30px; cursor: pointer; }
    button:hover { transform: scale(1.05); }
  </style>
</head>
<body>
<div class="timer">
  <div id="display">00:00</div>
  <button onclick="start()">▶️ Start</button>
  <button onclick="pause()">⏸️ Pause</button>
  <button onclick="reset()">🔄 Reset</button>
</div>
<script>
let seconds = 0;
let interval = null;

function update() {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  document.getElementById('display').textContent = m + ':' + s;
}

function start() {
  if (!interval) {
    interval = setInterval(() => {
      seconds++;
      update();
    }, 1000);
  }
}

function pause() {
  clearInterval(interval);
  interval = null;
}

function reset() {
  pause();
  seconds = 0;
  update();
}
</script>
</body>
</html>`;
  }
  
  getConverterTemplate() {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Unit Converter</title>
  <style>
    body { font-family: Arial; max-width: 500px; margin: 50px auto; padding: 20px; }
    input, select { width: 100%; padding: 10px; margin: 10px 0; font-size: 16px; }
    button { width: 100%; padding: 15px; background: #00ff88; border: none; font-size: 18px; cursor: pointer; }
    #result { margin-top: 20px; padding: 20px; background: #f0f0f0; font-size: 24px; text-align: center; }
  </style>
</head>
<body>
  <h1>🔄 Unit Converter</h1>
  <input id="value" type="number" placeholder="Enter value" />
  <select id="from">
    <option value="m">Meters</option>
    <option value="km">Kilometers</option>
    <option value="ft">Feet</option>
    <option value="mi">Miles</option>
  </select>
  <select id="to">
    <option value="m">Meters</option>
    <option value="km">Kilometers</option>
    <option value="ft">Feet</option>
    <option value="mi">Miles</option>
  </select>
  <button onclick="convert()">Convert</button>
  <div id="result">-</div>
<script>
const conversions = {
  m: 1,
  km: 1000,
  ft: 0.3048,
  mi: 1609.34
};

function convert() {
  const value = parseFloat(document.getElementById('value').value);
  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;
  
  const meters = value * conversions[from];
  const result = meters / conversions[to];
  
  document.getElementById('result').textContent = result.toFixed(2) + ' ' + to;
}
</script>
</body>
</html>`;
  }
  
  getGeneratorTemplate() {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Generator</title>
  <style>
    body { font-family: Arial; max-width: 600px; margin: 50px auto; padding: 20px; }
    button { width: 100%; padding: 15px; background: #00ff88; border: none; font-size: 18px; cursor: pointer; margin: 10px 0; }
    #output { padding: 20px; background: #f0f0f0; min-height: 100px; margin: 20px 0; font-size: 18px; }
  </style>
</head>
<body>
  <h1>✨ Generator</h1>
  <button onclick="generate()">Generate</button>
  <div id="output">Click to generate...</div>
<script>
function generate() {
  // Customize this based on what you want to generate
  const items = ['Idea 1', 'Idea 2', 'Idea 3', 'Idea 4', 'Idea 5'];
  const random = items[Math.floor(Math.random() * items.length)];
  document.getElementById('output').textContent = random;
}
</script>
</body>
</html>`;
  }
  
  getPhotoEditorTemplate() {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Photo Editor</title>
  <style>
    body { font-family: Arial; max-width: 900px; margin: 20px auto; padding: 20px; }
    input[type="file"] { margin: 20px 0; }
    canvas { border: 2px solid #00ff88; max-width: 100%; }
    .controls { margin: 20px 0; }
    button { padding: 10px 20px; margin: 5px; background: #00ff88; border: none; cursor: pointer; }
  </style>
</head>
<body>
  <h1>📸 Photo Editor</h1>
  <input type="file" id="upload" accept="image/*" onchange="loadImage(event)" />
  <div class="controls">
    <button onclick="applyFilter('grayscale')">Grayscale</button>
    <button onclick="applyFilter('invert')">Invert</button>
    <button onclick="applyFilter('blur')">Blur</button>
    <button onclick="reset()">Reset</button>
    <button onclick="download()">Download</button>
  </div>
  <canvas id="canvas"></canvas>
<script>
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let img = null;

function loadImage(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = (event) => {
    img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

function applyFilter(filter) {
  if (!img) return;
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  if (filter === 'grayscale') {
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i+1] + data[i+2]) / 3;
      data[i] = data[i+1] = data[i+2] = avg;
    }
  } else if (filter === 'invert') {
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i];
      data[i+1] = 255 - data[i+1];
      data[i+2] = 255 - data[i+2];
    }
  } else if (filter === 'blur') {
    // Simple blur
    ctx.filter = 'blur(5px)';
    ctx.drawImage(canvas, 0, 0);
    ctx.filter = 'none';
    return;
  }
  
  ctx.putImageData(imageData, 0, 0);
}

function reset() {
  if (img) ctx.drawImage(img, 0, 0);
}

function download() {
  const link = document.createElement('a');
  link.download = 'edited-photo.png';
  link.href = canvas.toDataURL();
  link.click();
}
</script>
</body>
</html>`;
  }
  
  getConsciousnessTrackerTemplate() {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Consciousness Tracker</title>
  <style>
    body { font-family: 'Courier New', monospace; background: #0a0a0a; color: #00ff88; padding: 40px; max-width: 800px; margin: 0 auto; }
    h1 { color: #ffaa00; }
    .tracker { margin: 30px 0; }
    .gate { display: inline-block; width: 50px; height: 50px; border: 2px solid #00ff88; margin: 5px; text-align: center; line-height: 50px; cursor: pointer; }
    .gate.active { background: #00ff88; color: #000; }
    button { background: #ff00ff; color: #fff; padding: 10px 20px; border: none; cursor: pointer; margin: 10px 0; }
    #summary { margin-top: 30px; padding: 20px; background: rgba(0,255,136,0.1); border: 1px solid #00ff88; }
  </style>
</head>
<body>
  <h1>🔮 Consciousness Tracker</h1>
  <p>Click gates to activate/deactivate</p>
  <div class="tracker" id="gates"></div>
  <button onclick="saveCurrent()">💾 Save Current State</button>
  <button onclick="clearAll()">🗑️ Clear All</button>
  <div id="summary"></div>
<script>
let activeGates = new Set();

function init() {
  const gatesDiv = document.getElementById('gates');
  for (let i = 1; i <= 64; i++) {
    const gate = document.createElement('div');
    gate.className = 'gate';
    gate.textContent = i;
    gate.onclick = () => toggleGate(i);
    gate.id = 'gate-' + i;
    gatesDiv.appendChild(gate);
  }
  updateSummary();
}

function toggleGate(num) {
  const el = document.getElementById('gate-' + num);
  if (activeGates.has(num)) {
    activeGates.delete(num);
    el.classList.remove('active');
  } else {
    activeGates.add(num);
    el.classList.add('active');
  }
  updateSummary();
}

function saveCurrent() {
  const state = {
    gates: Array.from(activeGates),
    timestamp: new Date().toLocaleString()
  };
  const saved = JSON.parse(localStorage.getItem('consciousness-states') || '[]');
  saved.push(state);
  localStorage.setItem('consciousness-states', JSON.stringify(saved));
  alert('✅ State saved!');
}

function clearAll() {
  activeGates.clear();
  document.querySelectorAll('.gate').forEach(g => g.classList.remove('active'));
  updateSummary();
}

function updateSummary() {
  const summary = document.getElementById('summary');
  summary.innerHTML = \`
    <strong>Active Gates:</strong> \${Array.from(activeGates).sort((a,b) => a-b).join(', ') || 'None'}<br>
    <strong>Total:</strong> \${activeGates.size} / 64
  \`;
}

init();
</script>
</body>
</html>`;
  }
}

// Make available globally
window.UniversalBuilder = UniversalBuilder;
