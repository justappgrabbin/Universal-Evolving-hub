/**
 * FOUNDRY UI
 * User interface logic - completely separate from core system
 * Communicates with FoundrySystem via public API only
 */

class FoundryUI {
  constructor(foundrySystem) {
    this.foundry = foundrySystem;
    this.currentView = 'main';
    this.evolutionPrompts = [];
    
    console.log('🎨 UI Initialized');
    this.initialize();
  }
  
  initialize() {
    this.updateAllDisplays();
    this.setupEventListeners();
    
    // Register for evolution prompts
    window.onEvolutionPrompt = (prompt) => this.handleEvolutionPrompt(prompt);
  }
  
  // ============================================
  // EVENT LISTENERS
  // ============================================
  
  setupEventListeners() {
    // Book upload
    document.getElementById('book-upload')?.addEventListener('change', (e) => {
      if (e.target.files[0]) {
        this.handleBookUpload(e.target.files[0]);
      }
    });
    
    // App spec upload
    document.getElementById('app-upload')?.addEventListener('change', (e) => {
      if (e.target.files[0]) {
        this.handleAppUpload(e.target.files[0]);
      }
    });
  }
  
  // ============================================
  // BOOK HANDLING
  // ============================================
  
  async handleBookUpload(file) {
    this.setStatus('LOADING BOOK...');
    
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      const content = e.target.result;
      
      const result = this.foundry.loadBook(content, {
        title: file.name.replace(/\.(txt|md)$/, ''),
        author: 'Unknown',
        type: 'reference'
      });
      
      console.log('📚 Book loaded:', result.book.title);
      
      // Show evolution observations if any
      if (result.observations && result.observations.suggestions.length > 0) {
        this.showEvolutionNotification(result.observations.suggestions.length);
      }
      
      this.updateAllDisplays();
      this.setStatus('READY');
    };
    
    reader.readAsText(file);
  }
  
  showEvolutionNotification(count) {
    const notification = document.createElement('div');
    notification.className = 'status';
    notification.style.background = 'rgba(255, 0, 255, 0.2)';
    notification.style.border = '1px solid #ff00ff';
    notification.innerHTML = `🧬 <strong>System Learning:</strong> Found ${count} potential improvements`;
    
    const interface = document.getElementById('foundry-interface');
    interface.insertBefore(notification, interface.children[3]);
    
    setTimeout(() => notification.remove(), 5000);
  }
  
  // ============================================
  // APP BUILDING
  // ============================================
  
  async handleAppUpload(file) {
    this.setStatus('ANALYZING UPLOAD...');
    
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const content = e.target.result;
        
        const app = await this.foundry.buildAppFromFile(file, content);
        
        console.log('🏗️ App built:', app.id);
        
        this.displayBuiltApp(app);
        this.updateAllDisplays();
        this.setStatus('READY');
        
      } catch (error) {
        console.error('App build failed:', error);
        alert('❌ ' + error.message);
        this.setStatus('ERROR');
      }
    };
    
    reader.readAsText(file);
  }
  
  async buildFromDescription() {
    const description = document.getElementById('app-description')?.value;
    if (!description) {
      alert('Please enter a description');
      return;
    }
    
    this.setStatus('BUILDING APP...');
    
    try {
      const app = await this.foundry.buildAppFromDescription(description);
      
      this.displayBuiltApp(app);
      this.updateAllDisplays();
      this.setStatus('READY');
      
    } catch (error) {
      console.error('App build failed:', error);
      alert('❌ ' + error.message);
      this.setStatus('ERROR');
    }
  }
  
  displayBuiltApp(app) {
    const outputEl = document.getElementById('app-output');
    if (!outputEl) return;
    
    outputEl.style.display = 'block';
    outputEl.innerHTML = `
      <h3>🏗️ App Built Successfully</h3>
      <p><strong>Type:</strong> ${app.type}</p>
      <p><strong>Framework:</strong> ${app.framework}</p>
      <p><strong>Template:</strong> ${app.template.features.join(', ')}</p>
      <p><strong>Features Found:</strong> ${app.specs.features.slice(0, 3).join(', ')}${app.specs.features.length > 3 ? '...' : ''}</p>
      <button onclick="ui.downloadApp('${app.id}')">📦 Download App</button>
      <button onclick="ui.previewApp('${app.id}')">👁️ Preview</button>
    `;
  }
  
  downloadApp(appId) {
    const history = this.foundry.getBuildHistory();
    const build = history.find(b => b.app.id === appId);
    
    if (!build) {
      alert('❌ App not found');
      return;
    }
    
    const blob = new Blob([build.app.html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${build.app.type}-${appId}.html`;
    a.click();
    
    URL.revokeObjectURL(url);
  }
  
  previewApp(appId) {
    const history = this.foundry.getBuildHistory();
    const build = history.find(b => b.app.id === appId);
    
    if (!build) {
      alert('❌ App not found');
      return;
    }
    
    // Open in new window
    const preview = window.open('', '_blank');
    preview.document.write(build.app.html);
    preview.document.close();
  }
  
  viewBuildHistory() {
    const history = this.foundry.getBuildHistory();
    
    const outputEl = document.getElementById('app-output');
    if (!outputEl) return;
    
    outputEl.style.display = 'block';
    outputEl.innerHTML = `
      <h3>🏗️ Build History (${history.length})</h3>
      ${history.map(build => `
        <div class="config-item">
          <strong>${build.app.type.toUpperCase()}</strong> - ${build.template}<br>
          <small>${new Date(build.app.timestamp).toLocaleString()}</small><br>
          <button onclick="ui.downloadApp('${build.app.id}')" style="padding: 5px 10px; margin-top: 5px;">📦 Download</button>
          <button onclick="ui.previewApp('${build.app.id}')" style="padding: 5px 10px; margin-top: 5px;">👁️ Preview</button>
        </div>
      `).join('')}
    `;
  }
  
  viewTemplates() {
    const templates = this.foundry.getAvailableTemplates();
    
    const outputEl = document.getElementById('app-output');
    if (!outputEl) return;
    
    outputEl.style.display = 'block';
    outputEl.innerHTML = `
      <h3>📋 Available Templates (${templates.length})</h3>
      ${templates.map(t => `
        <div class="config-item">
          <strong>${t.toUpperCase()}</strong>
        </div>
      `).join('')}
      <p style="margin-top: 15px; font-size: 11px; color: #888;">
        Upload a file or describe your app, and the system will choose the best template automatically.
      </p>
    `;
  }
  
  // ============================================
  // CONFIGURATION GENERATION
  // ============================================
  
  async generateConfiguration() {
    this.setStatus('GENERATING...');
    
    try {
      const userData = {
        name: document.getElementById('user-name')?.value,
        gates: document.getElementById('user-gates')?.value
          .split(',')
          .map(g => parseInt(g.trim()))
          .filter(g => !isNaN(g)),
        consciousnessText: document.getElementById('consciousness-input')?.value
      };
      
      const config = this.foundry.generateConfiguration(userData);
      
      this.displayConfiguration(config);
      this.updateAllDisplays();
      this.setStatus('READY');
      
    } catch (error) {
      console.error('Generation failed:', error);
      alert('❌ ' + error.message);
      this.setStatus('ERROR');
    }
  }
  
  displayConfiguration(config) {
    const outputEl = document.getElementById('config-output');
    if (!outputEl) return;
    
    outputEl.style.display = 'block';
    outputEl.innerHTML = `
      <h3>Configuration Generated</h3>
      <div class="glyph">${config.glyph.symbols}</div>
      <p><strong>App Type:</strong> ${config.appType}</p>
      <p><strong>Structure:</strong> ${config.analysis.markers.dominantStructure}</p>
      <p><strong>CI Average:</strong> ${config.analysis.markers.CI_average.toFixed(3)}</p>
      <p><strong>Features:</strong> ${config.features.join(', ')}</p>
      <button onclick="ui.downloadConfiguration('${config.glyph.id}')">📦 Download HTML</button>
    `;
  }
  
  downloadConfiguration(glyphId) {
    try {
      const html = this.foundry.exportConfiguration(glyphId);
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `consciousness-app-${glyphId}.html`;
      a.click();
      
      URL.revokeObjectURL(url);
    } catch (error) {
      alert('❌ ' + error.message);
    }
  }
  
  // ============================================
  // SENTENCE ANALYSIS
  // ============================================
  
  analyzeSentenceSystem() {
    const userData = {
      gates: document.getElementById('user-gates')?.value
        .split(',')
        .map(g => parseInt(g.trim()))
        .filter(g => !isNaN(g)),
      consciousnessText: document.getElementById('consciousness-input')?.value
    };
    
    const analysis = this.foundry.selector.analyzeConsciousness(userData);
    
    const outputEl = document.getElementById('analysis-output');
    if (!outputEl) return;
    
    outputEl.style.display = 'block';
    outputEl.innerHTML = `
      <h3>Sentence System Analysis</h3>
      ${analysis.sentenceAnalysis.CI_values.map(v => 
        `<p>Gate ${v.gate}: CI = ${v.CI.toFixed(3)}</p>`
      ).join('')}
      <p><strong>Predicted Structure:</strong> ${analysis.sentenceAnalysis.overallStructure?.structure || 'N/A'}</p>
      <p><strong>Confidence:</strong> ${((analysis.sentenceAnalysis.overallStructure?.confidence || 0) * 100).toFixed(1)}%</p>
      ${analysis.sentenceAnalysis.recommendations.length > 0 ? 
        `<p><strong>Recommendations:</strong><br>${analysis.sentenceAnalysis.recommendations.join('<br>')}</p>` : ''}
    `;
  }
  
  // ============================================
  // LIBRARY VIEWS
  // ============================================
  
  viewConfigurations() {
    const configs = Array.from(this.foundry.builder.configurations.values());
    
    const outputEl = document.getElementById('library-output');
    if (!outputEl) return;
    
    outputEl.style.display = 'block';
    outputEl.innerHTML = `
      <h3>All Configurations (${configs.length})</h3>
      ${configs.map(c => `
        <div class="config-item" onclick="ui.downloadConfiguration('${c.glyph.id}')">
          <span class="glyph" style="font-size: 24px;">${c.glyph.symbols}</span>
          ${c.appType} - ${c.glyph.id}<br>
          <small>${new Date(c.timestamp).toLocaleString()}</small>
        </div>
      `).join('')}
    `;
  }
  
  searchBooks() {
    const query = prompt('Search books for:');
    if (!query) return;
    
    const results = this.foundry.booksLibrary.search(query);
    
    const outputEl = document.getElementById('library-output');
    if (!outputEl) return;
    
    outputEl.style.display = 'block';
    outputEl.innerHTML = `
      <h3>Search Results (${results.length})</h3>
      ${results.slice(0, 10).map(r => `
        <div class="config-item">
          <strong>${r.matchType}:</strong> ${r.matchValue}<br>
          <small>${r.chunk.text.slice(0, 200)}...</small>
        </div>
      `).join('')}
    `;
  }
  
  // ============================================
  // EVOLUTION UI
  // ============================================
  
  async viewSuggestions() {
    const suggestions = await this.foundry.proposeEvolutions();
    
    const outputEl = document.getElementById('evolution-output');
    if (!outputEl) return;
    
    if (suggestions.length === 0) {
      outputEl.style.display = 'block';
      outputEl.innerHTML = '<h3>No Suggestions Yet</h3><p>Load more books to enable learning.</p>';
      return;
    }
    
    outputEl.style.display = 'block';
    outputEl.innerHTML = `
      <h3>🧬 Suggested Improvements (${suggestions.length})</h3>
      ${suggestions.map((s, idx) => `
        <div class="config-item" style="border-left-color: ${this.getPriorityColor(s.priority)};">
          <strong>${s.type.toUpperCase()}</strong> 
          <span style="float: right; color: #ff00ff;">${(s.confidence * 100).toFixed(0)}%</span><br>
          <small>${s.description}</small><br>
          <small style="color: #888;">Priority: ${s.priority} | Occurrences: ${s.occurrences}</small><br>
          ${s.gates ? `<small>Gates: ${s.gates.join(', ')}</small><br>` : ''}
          ${s.patterns ? `<small>Patterns: ${s.patterns.join(', ')}</small><br>` : ''}
          ${s.concepts ? `<small>Concepts: ${s.concepts.slice(0, 5).join(', ')}</small><br>` : ''}
          <button onclick="ui.viewSuggestionCode(${idx})" style="margin-top: 5px; padding: 5px 10px;">📝 View Code</button>
          ${s.confidence >= 0.8 ? 
            `<button onclick="ui.applySuggestion(${idx})" style="margin-top: 5px; padding: 5px 10px;">⚡ Auto-Apply</button>` : 
            `<button onclick="ui.promptForApproval(${idx})" style="margin-top: 5px; padding: 5px 10px;">🤔 Ask Me First</button>`}
        </div>
      `).join('')}
    `;
  }
  
  getPriorityColor(priority) {
    const colors = {
      high: '#ff0000',
      medium: '#ffaa00',
      low: '#00ff88'
    };
    return colors[priority] || '#00ffff';
  }
  
  async viewSuggestionCode(index) {
    const suggestions = await this.foundry.proposeEvolutions();
    const suggestion = suggestions[index];
    
    if (!suggestion) return;
    
    const outputEl = document.getElementById('evolution-output');
    outputEl.innerHTML = `
      <h3>📝 Implementation Code</h3>
      <p><strong>Type:</strong> ${suggestion.type}</p>
      <p><strong>Action:</strong> ${suggestion.action}</p>
      <pre style="background: #000; padding: 10px; overflow-x: auto; font-size: 10px;">${suggestion.code}</pre>
      <button onclick="ui.viewSuggestions()">← Back to Suggestions</button>
    `;
  }
  
  async applySuggestion(index) {
    const suggestions = await this.foundry.proposeEvolutions();
    const suggestion = suggestions[index];
    
    if (!suggestion) return;
    
    this.setStatus('EVOLVING...');
    
    try {
      const result = await this.foundry.applyEvolution(suggestion, false);
      
      if (result.success) {
        alert('✅ ' + result.message);
        this.viewSuggestions();
        this.setStatus('EVOLVED');
        setTimeout(() => this.setStatus('READY'), 3000);
      } else {
        alert('❌ ' + result.message);
        this.setStatus('READY');
      }
      
      this.updateAllDisplays();
    } catch (error) {
      alert('❌ ' + error.message);
      this.setStatus('READY');
    }
  }
  
  async promptForApproval(index) {
    const suggestions = await this.foundry.proposeEvolutions();
    const suggestion = suggestions[index];
    
    if (!suggestion) return;
    
    const userApproved = confirm(
      `Apply this improvement?\n\n` +
      `${suggestion.description}\n\n` +
      `Confidence: ${(suggestion.confidence * 100).toFixed(0)}%\n` +
      `This will modify the running system.`
    );
    
    if (userApproved) {
      this.setStatus('EVOLVING...');
      
      try {
        const result = await this.foundry.applyEvolution(suggestion, true);
        
        if (result.success) {
          alert('✅ ' + result.message);
          this.viewSuggestions();
          this.setStatus('EVOLVED');
          setTimeout(() => this.setStatus('READY'), 3000);
        } else {
          alert('❌ ' + result.message);
          this.setStatus('READY');
        }
        
        this.updateAllDisplays();
      } catch (error) {
        alert('❌ ' + error.message);
        this.setStatus('READY');
      }
    }
  }
  
  handleEvolutionPrompt(prompt) {
    // Store prompt
    this.evolutionPrompts.push(prompt);
    
    // Show modal
    this.showEvolutionPromptModal(prompt);
  }
  
  showEvolutionPromptModal(prompt) {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.9);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    
    overlay.innerHTML = `
      <div style="
        background: #0a0a0a;
        border: 2px solid #ff00ff;
        padding: 30px;
        max-width: 600px;
        color: #00ff88;
        font-family: 'Courier New', monospace;
      ">
        <h2 style="color: #ff00ff; margin-bottom: 20px;">🧬 System Evolution Request</h2>
        <p style="margin-bottom: 15px;"><strong>${prompt.suggestion.description}</strong></p>
        <p style="font-size: 12px; color: #888; margin-bottom: 20px;">
          Confidence: ${(prompt.suggestion.confidence * 100).toFixed(0)}%<br>
          Priority: ${prompt.suggestion.priority}
        </p>
        <div style="display: flex; gap: 10px;">
          <button onclick="ui.respondToEvolutionPrompt('${prompt.id}', 'approve')" style="
            background: #00ff88;
            color: #000;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
            font-family: 'Courier New', monospace;
            font-weight: bold;
          ">✅ Approve</button>
          <button onclick="ui.respondToEvolutionPrompt('${prompt.id}', 'reject')" style="
            background: #ff0000;
            color: #fff;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
            font-family: 'Courier New', monospace;
            font-weight: bold;
          ">❌ Reject</button>
        </div>
      </div>
    `;
    
    overlay.id = `prompt-${prompt.id}`;
    document.body.appendChild(overlay);
  }
  
  respondToEvolutionPrompt(promptId, action) {
    const response = { action };
    this.foundry.evolutionEngine.respondToPrompt(promptId, response);
    
    // Remove modal
    const modal = document.getElementById(`prompt-${promptId}`);
    if (modal) modal.remove();
    
    // Update displays
    this.updateAllDisplays();
  }
  
  viewEvolutionHistory() {
    const report = this.foundry.evolutionEngine.generateEvolutionReport();
    
    const outputEl = document.getElementById('evolution-output');
    if (!outputEl) return;
    
    outputEl.style.display = 'block';
    outputEl.innerHTML = `
      <h3>📊 Evolution History</h3>
      <p><strong>Total Observations:</strong> ${report.totalObservations}</p>
      <p><strong>Active Suggestions:</strong> ${report.topSuggestions.length}</p>
      <p><strong>Applied Evolutions:</strong> ${this.foundry.evolutionEngine.appliedEvolutions.size}</p>
      
      ${this.foundry.evolutionEngine.appliedEvolutions.size > 0 ? `
        <button onclick="ui.viewAppliedEvolutions()" style="margin: 10px 0;">🔄 View Applied</button>
        <button onclick="ui.clearEvolutions()" style="margin: 10px 0; background: #ff0000; color: #fff;">🗑️ Clear All</button>
      ` : ''}
      
      <h4 style="margin-top: 15px;">Recent Events</h4>
      ${report.evolutionHistory.reverse().map(event => `
        <div class="config-item">
          <strong>${event.type || 'observation'}</strong>
          <span style="float: right; font-size: 9px;">${new Date(event.timestamp).toLocaleString()}</span><br>
          ${event.bookTitle ? `<small>Book: ${event.bookTitle}</small><br>` : ''}
          ${event.findings ? `
            <small>
              ${event.findings.missingGates?.length > 0 ? `Missing Gates: ${event.findings.missingGates.length} | ` : ''}
              ${event.findings.newStructures?.length > 0 ? `New Structures: ${event.findings.newStructures.length} | ` : ''}
              ${event.findings.newConcepts?.length > 0 ? `New Concepts: ${event.findings.newConcepts.length}` : ''}
            </small>
          ` : ''}
          ${event.gates ? `<small>Evolved: ${event.gates.join(', ')}</small>` : ''}
        </div>
      `).join('')}
    `;
  }
  
  viewAppliedEvolutions() {
    const applied = Array.from(this.foundry.evolutionEngine.appliedEvolutions.entries());
    
    const outputEl = document.getElementById('evolution-output');
    if (!outputEl) return;
    
    outputEl.style.display = 'block';
    outputEl.innerHTML = `
      <h3>🔄 Applied Evolutions (${applied.length})</h3>
      ${applied.map(([id, evolution]) => `
        <div class="config-item">
          <strong>${evolution.type.toUpperCase()}</strong>
          <span style="float: right; font-size: 9px;">${new Date(evolution.timestamp).toLocaleString()}</span><br>
          ${evolution.gates ? `<small>Gates: ${evolution.gates.join(', ')}</small><br>` : ''}
          ${evolution.patterns ? `<small>Patterns: ${evolution.patterns.join(', ')}</small><br>` : ''}
          <button onclick="ui.undoEvolution('${id}')" style="margin-top: 5px; padding: 5px 10px; background: #ff0000; color: #fff;">↩️ Undo</button>
        </div>
      `).join('')}
      <button onclick="ui.viewEvolutionHistory()">← Back</button>
    `;
  }
  
  undoEvolution(evolutionId) {
    if (!confirm('Undo this evolution? This will remove the changes from the system.')) {
      return;
    }
    
    const result = this.foundry.undoEvolution(evolutionId);
    
    if (result.success) {
      alert('✅ ' + result.message);
      this.viewAppliedEvolutions();
    } else {
      alert('❌ ' + result.message);
    }
    
    this.updateAllDisplays();
  }
  
  clearEvolutions() {
    if (!confirm('Clear ALL evolutions? This will reset the system to its original state.')) {
      return;
    }
    
    const result = this.foundry.evolutionEngine.clearAllEvolutions();
    
    alert('✅ ' + result.message);
    this.viewEvolutionHistory();
    this.updateAllDisplays();
  }
  
  analyzeProjectorSpace() {
    const analysis = this.foundry.evolutionEngine.analyzeProjectorSpace();
    
    const outputEl = document.getElementById('evolution-output');
    if (!outputEl) return;
    
    outputEl.style.display = 'block';
    outputEl.innerHTML = `
      <h3>🎯 Projector Space Analysis</h3>
      <p><strong>Total Configurations:</strong> ${analysis.totalConfigs}</p>
      <p><strong>Total Books:</strong> ${analysis.totalBooks}</p>
      <p><strong>Causal Density:</strong> ${(analysis.causalDensity * 100).toFixed(1)}%</p>
      <p><strong>Applied Evolutions:</strong> ${analysis.appliedEvolutions}</p>
      
      <h4 style="margin-top: 15px;">Projected Needs</h4>
      <p><strong>Missing Gates:</strong> ${analysis.projectedNeeds.missingGates.length > 0 ? analysis.projectedNeeds.missingGates.join(', ') : 'None'}</p>
      <p><strong>Unknown Structures:</strong> ${analysis.projectedNeeds.unknownStructures.length > 0 ? Array.from(analysis.projectedNeeds.unknownStructures).join(', ') : 'None'}</p>
      <p><strong>New Concepts:</strong> ${analysis.projectedNeeds.newConcepts.length > 0 ? Array.from(analysis.projectedNeeds.newConcepts).slice(0, 10).join(', ') : 'None'}</p>
      
      ${analysis.recommendations.length > 0 ? `
        <h4 style="margin-top: 15px;">Recommendations</h4>
        ${analysis.recommendations.map(r => `
          <div class="config-item" style="border-left-color: ${this.getPriorityColor(r.priority)};">
            <strong>${r.type}</strong><br>
            <small>${r.description}</small>
          </div>
        `).join('')}
      ` : ''}
    `;
  }
  
  // ============================================
  // STATUS & DISPLAY UPDATES
  // ============================================
  
  showResonanceForm() {
    const outputEl = document.getElementById('resonance-output');
    if (!outputEl) return;
    
    outputEl.style.display = 'block';
    outputEl.innerHTML = `
      <h3>🌊 Resonance Calculator</h3>
      <p style="font-size: 11px;">Enter gates for two profiles</p>
      
      <div style="margin: 15px 0;">
        <strong>Profile 1:</strong><br>
        <input type="text" id="res-gates-1" placeholder="Gates (e.g., 25, 51, 10)" style="width: 100%; margin: 5px 0;">
        <input type="number" id="res-mind-1" placeholder="Mind %" min="0" max="100" style="width: 30%; margin: 5px 1%;">
        <input type="number" id="res-body-1" placeholder="Body %" min="0" max="100" style="width: 30%; margin: 5px 1%;">
        <input type="number" id="res-heart-1" placeholder="Heart %" min="0" max="100" style="width: 30%; margin: 5px 1%;">
      </div>
      
      <div style="margin: 15px 0;">
        <strong>Profile 2:</strong><br>
        <input type="text" id="res-gates-2" placeholder="Gates (e.g., 13, 33, 20)" style="width: 100%; margin: 5px 0;">
        <input type="number" id="res-mind-2" placeholder="Mind %" min="0" max="100" style="width: 30%; margin: 5px 1%;">
        <input type="number" id="res-body-2" placeholder="Body %" min="0" max="100" style="width: 30%; margin: 5px 1%;">
        <input type="number" id="res-heart-2" placeholder="Heart %" min="0" max="100" style="width: 30%; margin: 5px 1%;">
      </div>
      
      <button onclick="ui.calculateResonance()">⚡ Calculate</button>
    `;
  }
  
  calculateResonance() {
    try {
      // Get profile 1
      const gates1 = document.getElementById('res-gates-1')?.value
        .split(',').map(g => parseInt(g.trim())).filter(g => !isNaN(g)) || [];
      const mind1 = parseInt(document.getElementById('res-mind-1')?.value) || 50;
      const body1 = parseInt(document.getElementById('res-body-1')?.value) || 50;
      const heart1 = parseInt(document.getElementById('res-heart-1')?.value) || 50;
      
      // Get profile 2
      const gates2 = document.getElementById('res-gates-2')?.value
        .split(',').map(g => parseInt(g.trim())).filter(g => !isNaN(g)) || [];
      const mind2 = parseInt(document.getElementById('res-mind-2')?.value) || 50;
      const body2 = parseInt(document.getElementById('res-body-2')?.value) || 50;
      const heart2 = parseInt(document.getElementById('res-heart-2')?.value) || 50;
      
      const profile1 = { gates: gates1, mind: mind1, body: body1, heart: heart1 };
      const profile2 = { gates: gates2, mind: mind2, body: body2, heart: heart2 };
      
      const result = this.foundry.calculateResonance(profile1, profile2);
      
      this.displayResonanceResult(result);
      
    } catch (error) {
      alert('❌ ' + error.message);
    }
  }
  
  displayResonanceResult(result) {
    const outputEl = document.getElementById('resonance-output');
    if (!outputEl) return;
    
    const getColor = (value) => {
      if (value >= 0.8) return '#00ff88';
      if (value >= 0.6) return '#ffaa00';
      return '#ff0000';
    };
    
    outputEl.innerHTML = `
      <h3>🌊 Resonance Result</h3>
      <div style="padding: 20px; background: rgba(0,255,136,0.1); border: 2px solid ${getColor(result.overall)}; margin: 15px 0;">
        <div style="font-size: 48px; text-align: center; color: ${getColor(result.overall)};">
          ${(result.overall * 100).toFixed(1)}%
        </div>
        <div style="text-align: center; font-size: 14px; margin-top: 10px;">
          ${result.interpretation}
        </div>
      </div>
      
      <h4>Component Breakdown:</h4>
      ${Object.entries(result.components).map(([component, value]) => `
        <div style="margin: 8px 0;">
          <strong>${component.toUpperCase()}:</strong> 
          <span style="color: ${getColor(value)}">${(value * 100).toFixed(1)}%</span>
          <div style="background: #333; height: 10px; margin-top: 3px;">
            <div style="background: ${getColor(value)}; height: 100%; width: ${value * 100}%;"></div>
          </div>
        </div>
      `).join('')}
      
      ${result.recommendation && result.recommendation.length > 0 ? `
        <h4 style="margin-top: 15px;">Recommendations:</h4>
        <ul style="font-size: 11px; margin-left: 20px;">
          ${result.recommendation.map(r => `<li>${r}</li>`).join('')}
        </ul>
      ` : ''}
      
      <button onclick="ui.showResonanceForm()">← Calculate Another</button>
    `;
  }
  
  findMatches() {
    // Simplified - would need profile database in full implementation
    alert('Match finding requires a database of profiles. Create profiles first using Generate Configuration.');
  }
  
  formOptimalGroup() {
    // Simplified - would need multiple profiles
    alert('Group formation requires multiple saved profiles. Generate configurations to create a profile pool.');
  }
  
  // ============================================
  // STATUS & DISPLAY UPDATES
  // ============================================
  
  setStatus(status) {
    const statusEl = document.getElementById('status');
    if (statusEl) {
      statusEl.textContent = status;
      statusEl.style.color = status === 'EVOLVED' ? '#ff00ff' : '';
    }
  }
  
  updateAllDisplays() {
    const status = this.foundry.getSystemStatus();
    
    // Update config count
    const configCountEl = document.getElementById('config-count');
    if (configCountEl) {
      configCountEl.textContent = status.pillars.builder.configurations;
    }
    
    // Update book count
    const bookCountEl = document.getElementById('book-count');
    if (bookCountEl) {
      bookCountEl.textContent = status.books.loaded;
    }
    
    // Update library stats
    const statsEl = document.getElementById('library-stats');
    if (statsEl) {
      statsEl.innerHTML = `
        Raw Materials: Ready<br>
        Completed Pieces: ${status.pillars.builder.configurations}<br>
        Books: ${status.books.chunks} chunks indexed<br>
        Evolutions: ${status.evolution.applied} applied
      `;
    }
    
    // Update book list if visible
    this.displayBookList();
  }
  
  displayBookList() {
    const books = this.foundry.booksLibrary.listBooks();
    const listEl = document.getElementById('book-list');
    
    if (!listEl) return;
    
    listEl.innerHTML = books.map(book => `
      <div class="config-item">
        📚 ${book.title}<br>
        <small>${book.wordCount} words, ${book.chunkCount} chunks</small>
      </div>
    `).join('');
  }
}

// Make available globally
window.FoundryUI = FoundryUI;
