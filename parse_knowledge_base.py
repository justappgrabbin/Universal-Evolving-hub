#!/usr/bin/env python3
"""
CONSCIOUSNESS KNOWLEDGE BASE PARSER
Extracts gate data from Rave I'Ching PDF into structured JSON
"""

import PyPDF2
import re
import json
from collections import defaultdict

class KnowledgeBaseParser:
    def __init__(self):
        self.gates = {}
        self.colors = self.initialize_colors()
        self.tones = self.initialize_tones()
        self.bases = self.initialize_bases()
        
    def initialize_colors(self):
        """Initialize Color (Motivation) definitions"""
        return {
            "1": {
                "number": 1,
                "name": "Fear",
                "motivation": "fear",
                "description": "Survival through fear",
                "keywords": ["survival", "fear", "safety", "vigilance"]
            },
            "2": {
                "number": 2,
                "name": "Hope",
                "motivation": "hope",
                "description": "Aspiration toward hope",
                "keywords": ["aspiration", "hope", "optimism", "future"]
            },
            "3": {
                "number": 3,
                "name": "Desire",
                "motivation": "desire",
                "description": "Drive through desire",
                "keywords": ["desire", "want", "longing", "passion"]
            },
            "4": {
                "number": 4,
                "name": "Need",
                "motivation": "need",
                "description": "Necessity creates need",
                "keywords": ["need", "necessity", "must", "requirement"]
            },
            "5": {
                "number": 5,
                "name": "Guilt",
                "motivation": "guilt",
                "description": "Correction via guilt",
                "keywords": ["guilt", "correction", "shame", "responsibility"]
            },
            "6": {
                "number": 6,
                "name": "Innocence",
                "motivation": "innocence",
                "description": "Purity of innocence",
                "keywords": ["innocence", "purity", "natural", "unconditioned"]
            }
        }
    
    def initialize_tones(self):
        """Initialize Tone (Sense) definitions"""
        return {
            "1": {
                "number": 1,
                "name": "Smell",
                "sense": "smell",
                "description": "Olfactory awareness",
                "keywords": ["smell", "scent", "nose", "olfactory"]
            },
            "2": {
                "number": 2,
                "name": "Taste",
                "sense": "taste",
                "description": "Gustatory discernment",
                "keywords": ["taste", "flavor", "tongue", "gustatory"]
            },
            "3": {
                "number": 3,
                "name": "Outer Vision",
                "sense": "outer-vision",
                "description": "External seeing",
                "keywords": ["sight", "external", "observe", "visual"]
            },
            "4": {
                "number": 4,
                "name": "Inner Vision",
                "sense": "inner-vision",
                "description": "Internal seeing",
                "keywords": ["insight", "internal", "perceive", "vision"]
            },
            "5": {
                "number": 5,
                "name": "Feeling",
                "sense": "feeling",
                "description": "Tactile knowing",
                "keywords": ["feeling", "sense", "awareness", "intuition"]
            },
            "6": {
                "number": 6,
                "name": "Touch",
                "sense": "touch",
                "description": "Physical contact",
                "keywords": ["touch", "tactile", "contact", "physical"]
            }
        }
    
    def initialize_bases(self):
        """Initialize Base (Environment) definitions"""
        return {
            "1": {
                "number": 1,
                "name": "Caves",
                "environment": "caves",
                "description": "Enclosed safety",
                "keywords": ["caves", "enclosed", "protected", "sheltered"]
            },
            "2": {
                "number": 2,
                "name": "Markets",
                "environment": "markets",
                "description": "Social exchange",
                "keywords": ["markets", "social", "exchange", "commerce"]
            },
            "3": {
                "number": 3,
                "name": "Kitchens",
                "environment": "kitchens",
                "description": "Nourishment center",
                "keywords": ["kitchens", "nourishment", "preparation", "sustenance"]
            },
            "4": {
                "number": 4,
                "name": "Mountains",
                "environment": "mountains",
                "description": "Elevated perspective",
                "keywords": ["mountains", "elevation", "perspective", "height"]
            },
            "5": {
                "number": 5,
                "name": "Valleys",
                "environment": "valleys",
                "description": "Receptive gathering",
                "keywords": ["valleys", "receptive", "gathering", "depth"]
            }
        }
    
    def parse_pdf(self, pdf_path):
        """Extract all gate data from PDF"""
        print(f"📖 Reading PDF: {pdf_path}")
        
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            total_pages = len(reader.pages)
            print(f"   Total pages: {total_pages}")
            
            current_gate = None
            current_line = None
            
            for page_num in range(total_pages):
                text = reader.pages[page_num].extract_text()
                
                # Detect gate header
                gate_match = self.detect_gate(text)
                if gate_match:
                    gate_num = gate_match['number']
                    if gate_num not in self.gates:
                        self.gates[gate_num] = gate_match
                        current_gate = gate_num
                        print(f"   ✓ Found Gate {gate_num}: {gate_match['name']}")
                
                # Extract line data for current gate
                if current_gate:
                    lines = self.extract_lines(text)
                    if lines:
                        if 'lines' not in self.gates[current_gate]:
                            self.gates[current_gate]['lines'] = {}
                        self.gates[current_gate]['lines'].update(lines)
        
        print(f"\n✅ Extracted {len(self.gates)} gates")
        return self.compile_knowledge_base()
    
    def detect_gate(self, text):
        """Detect gate header and extract basic info"""
        # Pattern: "7 THE GATE OF THE ROLE OF THE SELF"
        gate_pattern = r'(\d+)\s+THE GATE OF\s+([A-Z\s]+)'
        match = re.search(gate_pattern, text)
        
        if match:
            gate_num = match.group(1)
            gate_name = match.group(2).strip()
            
            # Extract I Ching name (appears in different formats)
            iching_pattern = r'(\d+)\s+([A-Z\s]+)\s+\d+'
            iching_match = re.search(iching_pattern, text)
            iching_name = iching_match.group(2).strip() if iching_match else ""
            
            # Extract keywords from description
            keywords = self.extract_keywords(text, gate_name)
            
            return {
                'number': int(gate_num),
                'name': self.format_gate_name(gate_name),
                'alt_names': {
                    'human_design': self.format_gate_name(gate_name),
                    'iching_traditional': iching_name
                },
                'keywords': keywords,
                'yijing': self.extract_yijing_phrase(text),
                'hexagram': self.number_to_hexagram(int(gate_num)),
                'lines': {}
            }
        
        return None
    
    def format_gate_name(self, raw_name):
        """Format gate name to title case"""
        words = raw_name.lower().split()
        return ' '.join(word.capitalize() for word in words)
    
    def extract_keywords(self, text, gate_name):
        """Extract semantic keywords from text"""
        # Look for key phrases in the gate description
        keywords = []
        
        # Common keyword patterns
        keyword_patterns = [
            r'This is (?:a|the) gate of ([a-z\s,]+)',
            r'gate of ([a-z\s,]+)',
            r'design of ([a-z\s,]+)',
        ]
        
        for pattern in keyword_patterns:
            matches = re.findall(pattern, text.lower())
            for match in matches:
                words = [w.strip() for w in match.split(',')]
                keywords.extend([w for w in words if len(w) > 3 and w not in keywords])
        
        # Add gate name words
        name_words = [w.lower() for w in gate_name.split() if len(w) > 3]
        keywords.extend([w for w in name_words if w not in keywords])
        
        return keywords[:6]  # Limit to 6 keywords
    
    def extract_yijing_phrase(self, text):
        """Extract the I Ching reference phrase"""
        # Look for patterns like "The Creative" or "Holding Together"
        yijing_pattern = r'I\'Ching name[^.]*is\s+([A-Z][a-z\s]+)'
        match = re.search(yijing_pattern, text)
        
        if match:
            return match.group(1).strip()
        
        # Fallback: look for quoted phrases
        quote_pattern = r"'([A-Z][^']+)'"
        quotes = re.findall(quote_pattern, text)
        if quotes:
            return quotes[0]
        
        return "creative force"
    
    def extract_lines(self, text):
        """Extract line texts and keywords"""
        lines = {}
        
        # Pattern for line entries: [SYMBOL] p [TEXT] [NUMBER] [NAME]
        # Example: "Ã p The gift of attracting loyalty  55  The general"
        line_pattern = r'([ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏàáâãäåæçèéêëìíîï])\s+(p|s)\s+([^0-9]{20,}?)\s+(\d{2})\s+([A-Z][^\n]+)'
        
        matches = re.findall(line_pattern, text)
        
        for match in matches:
            line_symbol, exalt_type, line_text, number, title = match
            
            # Convert symbol to number
            line_num = self.symbol_to_line_number(line_symbol)
            
            if line_num and line_num <= 6:
                line_keyword = self.extract_line_keyword(line_text)
                
                lines[str(line_num)] = {
                    'number': line_num,
                    'text': line_text.strip(),
                    'title': title.strip(),
                    'keywords': [line_keyword],
                    'type': 'exaltation' if exalt_type == 'p' else 'detriment'
                }
        
        return lines
    
    def symbol_to_line_number(self, symbol):
        """Convert unicode symbols to line numbers"""
        # Exaltation symbols (p)
        symbols = {
            # Line 6
            'È': 6, 'Ì': 6, 'Ö': 6, 'è': 6, 'ì': 6,
            # Line 5  
            'Ã': 5, 'Å': 5, 'Ñ': 5, 'ã': 5, 'å': 5,
            # Line 4
            'À': 4, 'Á': 4, 'É': 4, 'à': 4, 'á': 4, 'é': 4,
            # Line 3
            'Â': 3, 'Ä': 3, 'Ç': 3, 'â': 3, 'ä': 3, 'ç': 3,
            # Line 2
            'Á': 2, 'É': 2, 'á': 2,
            # Line 1
            'Â': 1, 'â': 1
        }
        
        # Try direct mapping first
        if symbol in symbols:
            return symbols[symbol]
        
        # Fallback based on ASCII value ranges
        code = ord(symbol)
        if 192 <= code <= 197:  # À-Å range
            return ((code - 192) % 6) + 1
        if 224 <= code <= 229:  # à-å range  
            return ((code - 224) % 6) + 1
        if 200 <= code <= 207:  # È-Ï range
            return ((code - 200) % 6) + 1
            
        return None
    
    def extract_line_keyword(self, line_text):
        """Extract meaningful keyword from line text"""
        # Remove common prefixes
        text = line_text.lower()
        text = re.sub(r'^(the|a|an)\s+', '', text)
        
        # Extract first significant word (>4 chars, not filler)
        words = text.split()
        fillers = ['that', 'with', 'through', 'from', 'into', 'which', 'whose']
        
        for word in words:
            clean = re.sub(r'[^a-z]', '', word)
            if len(clean) > 4 and clean not in fillers:
                return clean
        
        return 'foundation'
    
    def extract_planet(self, text, planet_type):
        """Extract exaltation/detriment planet"""
        # This would need more sophisticated parsing
        # For now, placeholder
        return None
    
    def number_to_hexagram(self, gate_num):
        """Convert gate number to I Ching hexagram unicode"""
        # Map of gate numbers to hexagram unicode
        hexagrams = {
            1: "䷀", 2: "䷁", 3: "䷂", 4: "䷃", 5: "䷄", 6: "䷅",
            7: "䷆", 8: "䷇", 9: "䷈", 10: "䷉", 11: "䷊", 12: "䷋",
            13: "䷌", 14: "䷍", 15: "䷎", 16: "䷏", 17: "䷐", 18: "䷑",
            19: "䷒", 20: "䷓", 21: "䷔", 22: "䷕", 23: "䷖", 24: "䷗",
            25: "䷘", 26: "䷙", 27: "䷚", 28: "䷛", 29: "䷜", 30: "䷝",
            31: "䷞", 32: "䷟", 33: "䷠", 34: "䷡", 35: "䷢", 36: "䷣",
            37: "䷤", 38: "䷥", 39: "䷦", 40: "䷧", 41: "䷨", 42: "䷩",
            43: "䷪", 44: "䷫", 45: "䷬", 46: "䷭", 47: "䷮", 48: "䷯",
            49: "䷰", 50: "䷱", 51: "䷲", 52: "䷳", 53: "䷴", 54: "䷵",
            55: "䷶", 56: "䷷", 57: "䷸", 58: "䷹", 59: "䷺", 60: "䷻",
            61: "䷼", 62: "䷽", 63: "䷾", 64: "䷿"
        }
        return hexagrams.get(gate_num, "䷀")
    
    def compile_knowledge_base(self):
        """Compile complete knowledge base structure"""
        return {
            'version': '1.0.0',
            'source': 'Complete Rave I\'Ching - Ra Uru Hu',
            'gates': self.gates,
            'colors': self.colors,
            'tones': self.tones,
            'bases': self.bases
        }
    
    def validate(self, kb):
        """Validate knowledge base completeness"""
        print("\n🔍 VALIDATING KNOWLEDGE BASE")
        print("=" * 60)
        
        issues = []
        
        # Check all 64 gates present
        if len(kb['gates']) != 64:
            issues.append(f"❌ Only {len(kb['gates'])}/64 gates extracted")
        else:
            print("✅ All 64 gates present")
        
        # Check each gate has 6 lines
        for gate_num, gate in kb['gates'].items():
            if 'lines' not in gate or len(gate['lines']) != 6:
                line_count = len(gate.get('lines', {}))
                issues.append(f"❌ Gate {gate_num} has {line_count}/6 lines")
        
        if not issues:
            print("✅ All gates have 6 lines")
        
        # Check keywords present
        gates_without_keywords = [
            num for num, gate in kb['gates'].items() 
            if not gate.get('keywords')
        ]
        if gates_without_keywords:
            issues.append(f"⚠️  {len(gates_without_keywords)} gates missing keywords")
        else:
            print("✅ All gates have keywords")
        
        print("\n" + "=" * 60)
        if issues:
            print("⚠️  VALIDATION ISSUES:")
            for issue in issues:
                print(f"   {issue}")
        else:
            print("✅ VALIDATION PASSED - Knowledge base is complete!")
        
        return len(issues) == 0
    
    def export_json(self, kb, output_path):
        """Export knowledge base to JSON"""
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(kb, f, indent=2, ensure_ascii=False)
        print(f"\n💾 Exported to: {output_path}")


def main():
    parser = KnowledgeBaseParser()
    
    # Parse the combined PDF
    pdf_path = '/mnt/user-data/uploads/Complete_Rave_IChing_and_Gene_Keys_Combined.pdf'
    
    knowledge_base = parser.parse_pdf(pdf_path)
    
    # Validate
    is_valid = parser.validate(knowledge_base)
    
    # Export
    output_path = '/mnt/user-data/outputs/knowledge_base.json'
    parser.export_json(knowledge_base, output_path)
    
    # Print sample
    print("\n📊 SAMPLE GATE DATA:")
    print("=" * 60)
    if '7' in knowledge_base['gates']:
        gate_7 = knowledge_base['gates']['7']
        print(json.dumps(gate_7, indent=2))


if __name__ == '__main__':
    main()
