/**
 * BOOKS LIBRARY
 * Detailed parsing system for consciousness texts
 * Maintains embedded context and extracts relevant patterns
 */

class BooksLibrary {
  
  constructor() {
    this.books = new Map();
    this.index = new Map(); // keyword -> [book references]
    this.chunks = new Map(); // book -> chunks with context
  }
  
  // ============================================
  // BOOK LOADING AND STORAGE
  // ============================================
  
  addBook(bookData) {
    /**
     * bookData = {
     *   id: "unique-id",
     *   title: "Book Title",
     *   author: "Author Name",
     *   content: "Full text content...",
     *   metadata: {
     *     type: "manual" | "reference" | "theory",
     *     topics: ["consciousness", "gates"],
     *     year: 2024
     *   }
     * }
     */
    
    const book = {
      ...bookData,
      addedAt: Date.now(),
      wordCount: this.countWords(bookData.content),
      chunks: [],
      index: {}
    };
    
    // Parse into chunks with context windows
    book.chunks = this.chunkText(bookData.content, book.id);
    
    // Build index for this book
    book.index = this.buildBookIndex(book.chunks, book.id);
    
    // Store book
    this.books.set(book.id, book);
    
    // Update global index
    this.updateGlobalIndex(book.id, book.index);
    
    return book;
  }
  
  chunkText(text, bookId, chunkSize = 500, overlap = 100) {
    /**
     * Split text into overlapping chunks with context
     * Each chunk retains awareness of surrounding content
     */
    
    const words = text.split(/\s+/);
    const chunks = [];
    
    for (let i = 0; i < words.length; i += (chunkSize - overlap)) {
      const chunkWords = words.slice(i, i + chunkSize);
      const chunk = {
        id: `${bookId}-chunk-${chunks.length}`,
        bookId: bookId,
        text: chunkWords.join(' '),
        startIndex: i,
        endIndex: i + chunkWords.length,
        wordCount: chunkWords.length,
        context: {
          before: i > 0 ? words.slice(Math.max(0, i - 50), i).join(' ') : null,
          after: i + chunkSize < words.length ? words.slice(i + chunkSize, Math.min(words.length, i + chunkSize + 50)).join(' ') : null
        },
        entities: this.extractEntities(chunkWords.join(' ')),
        sentences: this.extractSentences(chunkWords.join(' '))
      };
      
      chunks.push(chunk);
      this.chunks.set(chunk.id, chunk);
    }
    
    return chunks;
  }
  
  countWords(text) {
    return text.split(/\s+/).filter(w => w.length > 0).length;
  }
  
  // ============================================
  // ENTITY EXTRACTION
  // ============================================
  
  extractEntities(text) {
    /**
     * Extract consciousness-relevant entities from text
     * Returns: { gates: [], centers: [], planets: [], concepts: [] }
     */
    
    const entities = {
      gates: [],
      centers: [],
      planets: [],
      elements: [],
      concepts: [],
      numbers: []
    };
    
    // Extract gate references (e.g., "Gate 25", "gate 64")
    const gateMatches = text.match(/gate\s+(\d{1,2})/gi);
    if (gateMatches) {
      entities.gates = [...new Set(gateMatches.map(m => {
        const num = parseInt(m.match(/\d+/)[0]);
        return num >= 1 && num <= 64 ? num : null;
      }).filter(n => n !== null))];
    }
    
    // Extract center references
    const centerNames = ['head', 'ajna', 'throat', 'g center', 'heart', 'sacral', 'spleen', 'solar plexus', 'root'];
    for (const center of centerNames) {
      if (text.toLowerCase().includes(center)) {
        entities.centers.push(center.replace(' center', '').replace(' plexus', ''));
      }
    }
    
    // Extract planet references
    const planetNames = ['sun', 'earth', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto', 'north node', 'south node'];
    for (const planet of planetNames) {
      if (text.toLowerCase().includes(planet)) {
        entities.planets.push(planet.replace(' node', '_node'));
      }
    }
    
    // Extract element references
    const elementNames = ['earth', 'water', 'fire', 'air', 'aether'];
    for (const element of elementNames) {
      const regex = new RegExp(`\\b${element}\\b`, 'i');
      if (regex.test(text) && !entities.planets.includes(element)) {
        entities.elements.push(element);
      }
    }
    
    // Extract key consciousness concepts
    const concepts = [
      'consciousness', 'resonance', 'design', 'personality', 'bodygraph',
      'strategy', 'authority', 'profile', 'channel', 'circuit',
      'manifestor', 'generator', 'projector', 'reflector',
      'defined', 'undefined', 'open', 'activation'
    ];
    
    for (const concept of concepts) {
      if (text.toLowerCase().includes(concept)) {
        entities.concepts.push(concept);
      }
    }
    
    // Extract all numbers (could be gate references, lines, etc)
    const numbers = text.match(/\b\d{1,2}\b/g);
    if (numbers) {
      entities.numbers = [...new Set(numbers.map(n => parseInt(n)))];
    }
    
    return entities;
  }
  
  extractSentences(text) {
    /**
     * Split into sentences and analyze structure
     */
    
    const sentenceDelimiters = /[.!?]+\s+/;
    const sentences = text.split(sentenceDelimiters)
      .filter(s => s.trim().length > 10)
      .map((sentence, idx) => ({
        index: idx,
        text: sentence.trim(),
        wordCount: sentence.trim().split(/\s+/).length,
        structure: this.analyzeSentenceStructure(sentence)
      }));
    
    return sentences;
  }
  
  analyzeSentenceStructure(sentence) {
    /**
     * Detect basic sentence structure patterns
     */
    
    const words = sentence.trim().split(/\s+/);
    
    // Check for mirror structure (palindromic-ish)
    const firstHalf = words.slice(0, Math.floor(words.length / 2));
    const secondHalf = words.slice(Math.ceil(words.length / 2));
    const isMirror = firstHalf.some((w, i) => secondHalf[secondHalf.length - 1 - i] === w);
    
    // Check for nested structure (embedded clauses)
    const hasNesting = (sentence.match(/,/g) || []).length >= 2;
    
    // Check for binary structure (contains "or", "either/or", etc)
    const isBinary = /\b(or|either|neither|versus|vs)\b/i.test(sentence);
    
    if (isBinary) return 'binary_split';
    if (hasNesting) return 'nested';
    if (isMirror) return 'mirror';
    return 'simple_linear';
  }
  
  // ============================================
  // INDEXING
  // ============================================
  
  buildBookIndex(chunks, bookId) {
    /**
     * Build searchable index for a book
     * Maps keywords to chunk references
     */
    
    const bookIndex = new Map();
    
    for (const chunk of chunks) {
      // Index gates
      for (const gate of chunk.entities.gates) {
        const key = `gate-${gate}`;
        if (!bookIndex.has(key)) bookIndex.set(key, []);
        bookIndex.get(key).push(chunk.id);
      }
      
      // Index centers
      for (const center of chunk.entities.centers) {
        const key = `center-${center}`;
        if (!bookIndex.has(key)) bookIndex.set(key, []);
        bookIndex.get(key).push(chunk.id);
      }
      
      // Index planets
      for (const planet of chunk.entities.planets) {
        const key = `planet-${planet}`;
        if (!bookIndex.has(key)) bookIndex.set(key, []);
        bookIndex.get(key).push(chunk.id);
      }
      
      // Index concepts
      for (const concept of chunk.entities.concepts) {
        const key = `concept-${concept}`;
        if (!bookIndex.has(key)) bookIndex.set(key, []);
        bookIndex.get(key).push(chunk.id);
      }
    }
    
    return bookIndex;
  }
  
  updateGlobalIndex(bookId, bookIndex) {
    /**
     * Update the library-wide index
     */
    
    for (const [key, chunkIds] of bookIndex) {
      if (!this.index.has(key)) {
        this.index.set(key, []);
      }
      this.index.get(key).push(...chunkIds);
    }
  }
  
  // ============================================
  // SEARCH AND RETRIEVAL
  // ============================================
  
  search(query) {
    /**
     * Search across all books
     * Returns ranked results with context
     * 
     * query can be:
     * - "gate 25"
     * - "sacral center"
     * - "consciousness resonance"
     * - natural language
     */
    
    const results = [];
    
    // Parse query for entities
    const queryEntities = this.extractEntities(query);
    const queryWords = query.toLowerCase().split(/\s+/);
    
    // Search by entities first
    for (const gate of queryEntities.gates) {
      const key = `gate-${gate}`;
      const chunkIds = this.index.get(key) || [];
      for (const chunkId of chunkIds) {
        const chunk = this.chunks.get(chunkId);
        if (chunk) {
          results.push({
            chunk: chunk,
            score: 1.0,
            matchType: 'gate',
            matchValue: gate
          });
        }
      }
    }
    
    for (const center of queryEntities.centers) {
      const key = `center-${center}`;
      const chunkIds = this.index.get(key) || [];
      for (const chunkId of chunkIds) {
        const chunk = this.chunks.get(chunkId);
        if (chunk) {
          results.push({
            chunk: chunk,
            score: 0.9,
            matchType: 'center',
            matchValue: center
          });
        }
      }
    }
    
    // Full-text search for other terms
    for (const [chunkId, chunk] of this.chunks) {
      const chunkText = chunk.text.toLowerCase();
      let score = 0;
      
      for (const word of queryWords) {
        if (chunkText.includes(word)) {
          score += 0.1;
        }
      }
      
      if (score > 0) {
        results.push({
          chunk: chunk,
          score: score,
          matchType: 'fulltext',
          matchValue: query
        });
      }
    }
    
    // Remove duplicates and sort by score
    const uniqueResults = this.deduplicateResults(results);
    uniqueResults.sort((a, b) => b.score - a.score);
    
    return uniqueResults;
  }
  
  deduplicateResults(results) {
    const seen = new Set();
    const unique = [];
    
    for (const result of results) {
      if (!seen.has(result.chunk.id)) {
        seen.add(result.chunk.id);
        unique.push(result);
      }
    }
    
    return unique;
  }
  
  getChunkWithContext(chunkId) {
    /**
     * Get a chunk with its full context
     */
    
    const chunk = this.chunks.get(chunkId);
    if (!chunk) return null;
    
    const book = this.books.get(chunk.bookId);
    
    return {
      chunk: chunk,
      book: {
        id: book.id,
        title: book.title,
        author: book.author
      },
      context: chunk.context
    };
  }
  
  // ============================================
  // PATTERN DETECTION
  // ============================================
  
  findPattern(pattern) {
    /**
     * Find consciousness patterns across books
     * 
     * pattern = {
     *   gates: [25, 51],
     *   centers: ['g', 'heart'],
     *   structure: 'mirror'
     * }
     */
    
    const results = [];
    
    for (const [chunkId, chunk] of this.chunks) {
      let matches = true;
      
      // Check gate matches
      if (pattern.gates) {
        const hasAllGates = pattern.gates.every(g => chunk.entities.gates.includes(g));
        if (!hasAllGates) matches = false;
      }
      
      // Check center matches
      if (pattern.centers) {
        const hasAllCenters = pattern.centers.every(c => chunk.entities.centers.includes(c));
        if (!hasAllCenters) matches = false;
      }
      
      // Check sentence structure
      if (pattern.structure) {
        const hasStructure = chunk.sentences.some(s => s.structure === pattern.structure);
        if (!hasStructure) matches = false;
      }
      
      if (matches) {
        results.push(this.getChunkWithContext(chunkId));
      }
    }
    
    return results;
  }
  
  // ============================================
  // STATISTICS
  // ============================================
  
  getStatistics() {
    return {
      bookCount: this.books.size,
      chunkCount: this.chunks.size,
      indexSize: this.index.size,
      totalWords: Array.from(this.books.values()).reduce((sum, book) => sum + book.wordCount, 0)
    };
  }
  
  listBooks() {
    return Array.from(this.books.values()).map(book => ({
      id: book.id,
      title: book.title,
      author: book.author,
      wordCount: book.wordCount,
      chunkCount: book.chunks.length,
      metadata: book.metadata
    }));
  }
}

// Make available globally
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BooksLibrary;
} else {
  window.BooksLibrary = BooksLibrary;
}
