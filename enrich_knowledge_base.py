#!/usr/bin/env python3
"""
KNOWLEDGE BASE ENRICHMENT ENGINE
Integrates all uploaded data sources into unified consciousness database
"""

import json
import csv
import re
from pathlib import Path

class KnowledgeBaseEnricher:
    def __init__(self, base_kb_path):
        """Load existing knowledge base"""
        with open(base_kb_path, 'r', encoding='utf-8') as f:
            self.kb = json.load(f)
        
        print(f"✅ Loaded base KB with {len(self.kb['gates'])} gates")
    
    def add_center_mappings(self, csv_path):
        """Add biological center-to-organ mappings"""
        print("\n🧬 ADDING CENTER MAPPINGS...")
        
        centers = {}
        with open(csv_path, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                center_name = row['center'].strip()
                centers[center_name] = {
                    'name': center_name,
                    'color': row['color'].strip(),
                    'function': row['function'].strip(),
                    'biological_anchor': row['glands_organs'].strip()
                }
        
        self.kb['centers'] = centers
        print(f"   ✓ Added {len(centers)} centers with biological mappings")
    
    def add_incarnation_crosses(self, txt_path):
        """Parse and add incarnation cross descriptions"""
        print("\n⚔️ ADDING INCARNATION CROSSES...")
        
        with open(txt_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Parse cross entries
        # Format: "The [Angle] Cross of [Name] [Number]? (gates)"
        pattern = r'The (Right Angle|Juxtaposition|Left Angle) Cross of ([^\(]+)\(([^\)]+)\)\s*\n([^\n]+(?:\n(?!The )[^\n]+)*)'
        
        matches = re.findall(pattern, content, re.MULTILINE)
        
        crosses = {}
        for match in matches:
            angle, name, gates, description = match
            
            # Extract gate numbers from pattern like "1/2 | 7/13"
            gate_pattern = r'(\d+)/(\d+)\s*\|\s*(\d+)/(\d+)'
            gate_match = re.search(gate_pattern, gates)
            
            if gate_match:
                sun, earth, nodes_n, nodes_s = gate_match.groups()
                
                cross_key = f"{angle}_{name}".replace(' ', '_').lower()
                
                crosses[cross_key] = {
                    'angle': angle,
                    'name': name.strip(),
                    'gates': {
                        'sun': int(sun),
                        'earth': int(earth),
                        'north_node': int(nodes_n),
                        'south_node': int(nodes_s)
                    },
                    'description': description.strip(),
                    'life_purpose': self.extract_purpose(description)
                }
        
        self.kb['incarnation_crosses'] = crosses
        print(f"   ✓ Added {len(crosses)} incarnation crosses")
    
    def extract_purpose(self, description):
        """Extract key life purpose from description"""
        # Look for "You are here to..." patterns
        purpose_match = re.search(r'You are here to ([^.]+)', description)
        if purpose_match:
            return purpose_match.group(1).strip()
        
        # Fallback: first sentence
        first_sentence = description.split('.')[0]
        return first_sentence
    
    def add_power_expressions(self):
        """Add Shadow/Gift/Mastery expressions to gates"""
        print("\n⚡ ADDING POWER FIELD EXPRESSIONS...")
        
        # Base power expression patterns
        power_templates = {
            'distortion': {
                'feels': 'Experiencing {shadow}, feeling {theme} is blocked',
                'looks': 'Struggling with {theme}, inconsistent expression',
                'scenarios': 'When {theme} feels impossible • Inner conflict'
            },
            'resonance': {
                'feels': 'Natural {gift} flowing, confident in {theme}',
                'looks': 'Demonstrating {gift} regularly, inspiring others',
                'scenarios': 'Living {theme} authentically • Making positive impact'
            },
            'convergence': {
                'feels': 'Effortless {mastery}, magnetic presence',
                'looks': 'Others seek your {mastery}, natural mastery',
                'scenarios': '{mastery} without effort • Teaching through being'
            }
        }
        
        gates_updated = 0
        for gate_num, gate_data in self.kb['gates'].items():
            # Generate power expressions if not already present
            if 'power_expressions' not in gate_data:
                theme = gate_data.get('name', 'expression').lower()
                keywords = gate_data.get('keywords', [])
                
                shadow = keywords[0] if len(keywords) > 0 else 'blocked'
                gift = keywords[1] if len(keywords) > 1 else 'flowing'
                mastery = f"{theme} mastery"
                
                gate_data['power_expressions'] = {
                    'distortion': {
                        'feels': power_templates['distortion']['feels'].format(
                            shadow=shadow, theme=theme
                        ),
                        'looks': power_templates['distortion']['looks'].format(theme=theme),
                        'scenarios': power_templates['distortion']['scenarios'].format(theme=theme)
                    },
                    'resonance': {
                        'feels': power_templates['resonance']['feels'].format(
                            gift=gift, theme=theme
                        ),
                        'looks': power_templates['resonance']['looks'].format(gift=gift),
                        'scenarios': power_templates['resonance']['scenarios'].format(theme=theme)
                    },
                    'convergence': {
                        'feels': power_templates['convergence']['feels'].format(mastery=mastery),
                        'looks': power_templates['convergence']['looks'].format(mastery=mastery),
                        'scenarios': power_templates['convergence']['scenarios'].format(mastery=mastery)
                    }
                }
                gates_updated += 1
        
        print(f"   ✓ Added power expressions to {gates_updated} gates")
    
    def add_zodiac_archetypes(self):
        """Add zodiac sign key phrases"""
        print("\n♈ ADDING ZODIAC ARCHETYPES...")
        
        zodiac = {
            'aries': {
                'element': 'Fire',
                'modality': 'Cardinal',
                'keywords': ['Desire', 'Will', 'Impulse'],
                'archetype': 'The Warrior'
            },
            'taurus': {
                'element': 'Earth',
                'modality': 'Fixed',
                'keywords': ['Materialism', 'Practicality', 'Inertia'],
                'archetype': 'The Builder'
            },
            'gemini': {
                'element': 'Air',
                'modality': 'Mutable',
                'keywords': ['Changeability', 'Duality', 'Expansion'],
                'archetype': 'The Messenger'
            },
            'cancer': {
                'element': 'Water',
                'modality': 'Cardinal',
                'keywords': ['Receptivity', 'Sensitivity', 'Home'],
                'archetype': 'The Nurturer'
            },
            'leo': {
                'element': 'Fire',
                'modality': 'Fixed',
                'keywords': ['Self-expression', 'Pleasure', 'Authority'],
                'archetype': 'The King'
            },
            'virgo': {
                'element': 'Earth',
                'modality': 'Mutable',
                'keywords': ['Mental Detail', 'Service', 'Judgment'],
                'archetype': 'The Analyst'
            },
            'libra': {
                'element': 'Air',
                'modality': 'Cardinal',
                'keywords': ['Comparison', 'Appreciation', 'Evaluation'],
                'archetype': 'The Diplomat'
            },
            'scorpio': {
                'element': 'Water',
                'modality': 'Fixed',
                'keywords': ['Transcendence', 'Sex', 'Regeneration'],
                'archetype': 'The Alchemist'
            },
            'sagittarius': {
                'element': 'Fire',
                'modality': 'Mutable',
                'keywords': ['Philosophy', 'Religion', 'Idealism'],
                'archetype': 'The Seeker'
            },
            'capricorn': {
                'element': 'Earth',
                'modality': 'Cardinal',
                'keywords': ['Ambition', 'Government', 'Status'],
                'archetype': 'The Master'
            },
            'aquarius': {
                'element': 'Air',
                'modality': 'Fixed',
                'keywords': ['Science', 'Humanitarianism', 'Music'],
                'archetype': 'The Innovator'
            },
            'pisces': {
                'element': 'Water',
                'modality': 'Mutable',
                'keywords': ['Openness', 'Devotion', 'Conflict'],
                'archetype': 'The Mystic'
            }
        }
        
        self.kb['zodiac'] = zodiac
        print(f"   ✓ Added 12 zodiac archetypes")
    
    def generate_statistics(self):
        """Generate KB statistics"""
        stats = {
            'gates': len(self.kb.get('gates', {})),
            'colors': len(self.kb.get('colors', {})),
            'tones': len(self.kb.get('tones', {})),
            'bases': len(self.kb.get('bases', {})),
            'centers': len(self.kb.get('centers', {})),
            'incarnation_crosses': len(self.kb.get('incarnation_crosses', {})),
            'zodiac_signs': len(self.kb.get('zodiac', {})),
            'total_combinations': 64 * 6 * 6 * 6 * 5  # gates × lines × colors × tones × bases
        }
        
        # Calculate line coverage
        total_lines = 0
        for gate in self.kb['gates'].values():
            total_lines += len(gate.get('lines', {}))
        
        stats['lines_extracted'] = total_lines
        stats['line_coverage'] = f"{(total_lines / 384) * 100:.1f}%"
        
        return stats
    
    def export(self, output_path):
        """Export enriched knowledge base"""
        # Update version
        self.kb['version'] = '2.0.0-enriched'
        self.kb['enriched'] = True
        
        # Add statistics
        self.kb['statistics'] = self.generate_statistics()
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(self.kb, f, indent=2, ensure_ascii=False)
        
        print(f"\n💾 EXPORTED ENRICHED KB: {output_path}")
        print(f"   Size: {Path(output_path).stat().st_size / 1024:.1f} KB")
    
    def print_summary(self):
        """Print enrichment summary"""
        stats = self.kb['statistics']
        
        print("\n" + "="*60)
        print("📊 KNOWLEDGE BASE ENRICHMENT COMPLETE")
        print("="*60)
        print(f"Gates: {stats['gates']}")
        print(f"Lines: {stats['lines_extracted']} ({stats['line_coverage']} coverage)")
        print(f"Colors: {stats['colors']}")
        print(f"Tones: {stats['tones']}")
        print(f"Bases: {stats['bases']}")
        print(f"Centers: {stats['centers']}")
        print(f"Incarnation Crosses: {stats['incarnation_crosses']}")
        print(f"Zodiac Archetypes: {stats['zodiac_signs']}")
        print(f"\nTotal Unique Combinations: {stats['total_combinations']:,}")
        print("="*60)


def main():
    # Paths
    base_kb = '/mnt/user-data/outputs/knowledge_base.json'
    centers_csv = '/mnt/user-data/uploads/centers_colors.csv'
    crosses_txt = '/mnt/user-data/uploads/IncarnationCrossInfo.txt'
    output = '/mnt/user-data/outputs/knowledge_base_enriched.json'
    
    # Initialize enricher
    enricher = KnowledgeBaseEnricher(base_kb)
    
    # Add all data
    enricher.add_center_mappings(centers_csv)
    enricher.add_incarnation_crosses(crosses_txt)
    enricher.add_power_expressions()
    enricher.add_zodiac_archetypes()
    
    # Export
    enricher.export(output)
    enricher.print_summary()


if __name__ == '__main__':
    main()
