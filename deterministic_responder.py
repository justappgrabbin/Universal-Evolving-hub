#!/usr/bin/env python3
"""
DETERMINISTIC CONSCIOUSNESS RESPONDER
Meaning Collapse Engine - No LLM, Pure Structure

Architecture:
1. Parse user grammar → Detect field + emotional state
2. Calculate coordinate → Planet/Sign/House/Gate/Line/Color/Tone/Base
3. Collapse meaning → Layer by layer synthesis
4. Assemble response → Compositional rules
"""

import json
import re
from datetime import datetime
from typing import Dict, List, Tuple

# ═══════════════════════════════════════════════════════════════════
# LAYER 1: DATA TABLES (Meaning Fragments)
# ═══════════════════════════════════════════════════════════════════

PLANETS = {
    'sun': {
        'energy': 'consciousness',
        'action': 'illuminates',
        'keywords': ['identity', 'core self', 'purpose'],
        'sentence_fragment': 'your consciousness'
    },
    'moon': {
        'energy': 'feeling',
        'action': 'reflects',
        'keywords': ['emotion', 'instinct', 'need'],
        'sentence_fragment': 'your emotional nature'
    },
    'mercury': {
        'energy': 'communication',
        'action': 'connects',
        'keywords': ['thought', 'expression', 'exchange'],
        'sentence_fragment': 'your mental processing'
    },
    'venus': {
        'energy': 'value',
        'action': 'attracts',
        'keywords': ['beauty', 'harmony', 'relationship'],
        'sentence_fragment': 'your sense of value'
    },
    'mars': {
        'energy': 'action',
        'action': 'drives',
        'keywords': ['will', 'desire', 'initiation'],
        'sentence_fragment': 'your driving force'
    },
    'jupiter': {
        'energy': 'expansion',
        'action': 'amplifies',
        'keywords': ['growth', 'wisdom', 'abundance'],
        'sentence_fragment': 'your expansive nature'
    },
    'saturn': {
        'energy': 'structure',
        'action': 'defines',
        'keywords': ['limitation', 'mastery', 'discipline'],
        'sentence_fragment': 'your structural integrity'
    },
    'uranus': {
        'energy': 'awakening',
        'action': 'revolutionizes',
        'keywords': ['change', 'innovation', 'freedom'],
        'sentence_fragment': 'your awakening impulse'
    },
    'neptune': {
        'energy': 'dissolution',
        'action': 'transcends',
        'keywords': ['mysticism', 'unity', 'imagination'],
        'sentence_fragment': 'your transcendent vision'
    },
    'pluto': {
        'energy': 'transformation',
        'action': 'transmutes',
        'keywords': ['power', 'depth', 'rebirth'],
        'sentence_fragment': 'your transformative power'
    }
}

ZODIAC_SIGNS = {
    'aries': {
        'element': 'Fire',
        'modality': 'Cardinal',
        'archetype': 'The Warrior',
        'keywords': ['desire', 'will', 'impulse'],
        'filter': 'through initiating action'
    },
    'taurus': {
        'element': 'Earth',
        'modality': 'Fixed',
        'archetype': 'The Builder',
        'keywords': ['materialism', 'practicality', 'stability'],
        'filter': 'through grounded presence'
    },
    'gemini': {
        'element': 'Air',
        'modality': 'Mutable',
        'archetype': 'The Messenger',
        'keywords': ['duality', 'communication', 'curiosity'],
        'filter': 'through mental exchange'
    },
    'cancer': {
        'element': 'Water',
        'modality': 'Cardinal',
        'archetype': 'The Nurturer',
        'keywords': ['receptivity', 'sensitivity', 'protection'],
        'filter': 'through emotional care'
    },
    'leo': {
        'element': 'Fire',
        'modality': 'Fixed',
        'archetype': 'The King',
        'keywords': ['expression', 'creativity', 'radiance'],
        'filter': 'through creative power'
    },
    'virgo': {
        'element': 'Earth',
        'modality': 'Mutable',
        'archetype': 'The Analyst',
        'keywords': ['precision', 'service', 'refinement'],
        'filter': 'through careful analysis'
    },
    'libra': {
        'element': 'Air',
        'modality': 'Cardinal',
        'archetype': 'The Diplomat',
        'keywords': ['balance', 'relationship', 'harmony'],
        'filter': 'through aesthetic balance'
    },
    'scorpio': {
        'element': 'Water',
        'modality': 'Fixed',
        'archetype': 'The Alchemist',
        'keywords': ['intensity', 'transformation', 'depth'],
        'filter': 'through penetrating depth'
    },
    'sagittarius': {
        'element': 'Fire',
        'modality': 'Mutable',
        'archetype': 'The Seeker',
        'keywords': ['expansion', 'philosophy', 'freedom'],
        'filter': 'through questing spirit'
    },
    'capricorn': {
        'element': 'Earth',
        'modality': 'Cardinal',
        'archetype': 'The Master',
        'keywords': ['ambition', 'structure', 'authority'],
        'filter': 'through disciplined mastery'
    },
    'aquarius': {
        'element': 'Air',
        'modality': 'Fixed',
        'archetype': 'The Innovator',
        'keywords': ['innovation', 'humanity', 'rebellion'],
        'filter': 'through revolutionary insight'
    },
    'pisces': {
        'element': 'Water',
        'modality': 'Mutable',
        'archetype': 'The Mystic',
        'keywords': ['dissolution', 'compassion', 'unity'],
        'filter': 'through oceanic oneness'
    }
}

HOUSES = {
    1: {
        'area': 'Self & Identity',
        'context': 'in the field of personal emergence',
        'keywords': ['self', 'appearance', 'initiation']
    },
    2: {
        'area': 'Resources & Values',
        'context': 'in the field of material grounding',
        'keywords': ['value', 'security', 'embodiment']
    },
    3: {
        'area': 'Communication & Learning',
        'context': 'in the field of mental exchange',
        'keywords': ['thought', 'connection', 'curiosity']
    },
    4: {
        'area': 'Home & Foundation',
        'context': 'in the field of inner sanctuary',
        'keywords': ['roots', 'emotion', 'belonging']
    },
    5: {
        'area': 'Creativity & Joy',
        'context': 'in the field of self-expression',
        'keywords': ['play', 'creation', 'radiance']
    },
    6: {
        'area': 'Service & Health',
        'context': 'in the field of refinement',
        'keywords': ['service', 'health', 'precision']
    },
    7: {
        'area': 'Partnership & Other',
        'context': 'in the field of relationship',
        'keywords': ['partnership', 'mirror', 'balance']
    },
    8: {
        'area': 'Transformation & Depth',
        'context': 'in the field of transmutation',
        'keywords': ['depth', 'power', 'rebirth']
    },
    9: {
        'area': 'Expansion & Meaning',
        'context': 'in the field of higher vision',
        'keywords': ['meaning', 'travel', 'philosophy']
    },
    10: {
        'area': 'Career & Legacy',
        'context': 'in the field of public contribution',
        'keywords': ['mastery', 'authority', 'legacy']
    },
    11: {
        'area': 'Community & Vision',
        'context': 'in the field of collective innovation',
        'keywords': ['community', 'future', 'ideals']
    },
    12: {
        'area': 'Dissolution & Unity',
        'context': 'in the field of transcendence',
        'keywords': ['unity', 'mysticism', 'surrender']
    }
}

# Load from knowledge base
def load_gates():
    """Load gate data from enriched KB"""
    with open('/mnt/user-data/outputs/knowledge_base_enriched.json', 'r') as f:
        kb = json.load(f)
    return kb['gates']

def load_colors():
    """Load color (motivation) data"""
    with open('/mnt/user-data/outputs/knowledge_base_enriched.json', 'r') as f:
        kb = json.load(f)
    return kb['colors']

def load_tones():
    """Load tone (sense) data"""
    with open('/mnt/user-data/outputs/knowledge_base_enriched.json', 'r') as f:
        kb = json.load(f)
    return kb['tones']

def load_bases():
    """Load base (environment) data"""
    with open('/mnt/user-data/outputs/knowledge_base_enriched.json', 'r') as f:
        kb = json.load(f)
    return kb['bases']


# ═══════════════════════════════════════════════════════════════════
# LAYER 2: GRAMMAR PARSER (Detect Intent + Field)
# ═══════════════════════════════════════════════════════════════════

class GrammarParser:
    """
    Analyzes sentence structure to detect:
    - Which field (mind/heart/body/soul/etc)
    - Emotional state (shadow/neutral/gift/convergence)
    - Question type (why/how/what/when)
    """
    
    FIELD_KEYWORDS = {
        'mind': ['think', 'thought', 'mental', 'mind', 'understand', 'know', 'logic', 'reason'],
        'heart': ['feel', 'emotion', 'heart', 'love', 'passion', 'care', 'empathy', 'intimacy', 'relationship', 'connect'],
        'body': ['body', 'physical', 'energy', 'vitality', 'health', 'strength', 'sacral'],
        'soul': ['purpose', 'meaning', 'soul', 'destiny', 'calling', 'path', 'life'],
        'spirit': ['spirit', 'inspiration', 'creative', 'expression', 'vision'],
        'observer': ['see', 'observe', 'witness', 'aware', 'notice', 'perceive'],
        'unity': ['connect', 'unite', 'together', 'oneness', 'whole', 'integration'],
        'source': ['origin', 'source', 'beginning', 'root', 'foundation', 'essence']
    }
    
    STATE_KEYWORDS = {
        'shadow': ['block', 'stuck', 'struggle', 'fear', 'problem', 'issue', 'difficult', 'pain'],
        'gift': ['express', 'flow', 'natural', 'gift', 'strength', 'positive'],
        'convergence': ['master', 'transcend', 'highest', 'divine', 'pure', 'ultimate']
    }
    
    def parse(self, text: str) -> Dict:
        """Parse user input and extract meaning"""
        text_lower = text.lower()
        
        # Detect field
        field = self.detect_field(text_lower)
        
        # Detect emotional state
        state = self.detect_state(text_lower)
        
        # Detect question type
        question_type = self.detect_question_type(text_lower)
        
        return {
            'field': field,
            'state': state,
            'question_type': question_type,
            'original_text': text
        }
    
    def detect_field(self, text: str) -> str:
        """Detect which consciousness field is being referenced"""
        scores = {}
        for field, keywords in self.FIELD_KEYWORDS.items():
            score = sum(1 for kw in keywords if kw in text)
            if score > 0:
                scores[field] = score
        
        if scores:
            return max(scores, key=scores.get)
        return 'mind'  # default
    
    def detect_state(self, text: str) -> str:
        """Detect emotional/consciousness state"""
        for state, keywords in self.STATE_KEYWORDS.items():
            if any(kw in text for kw in keywords):
                return state
        return 'gift'  # default to positive
    
    def detect_question_type(self, text: str) -> str:
        """Detect question structure"""
        if text.startswith('why'):
            return 'why'
        elif text.startswith('how'):
            return 'how'
        elif text.startswith('what'):
            return 'what'
        elif text.startswith('when'):
            return 'when'
        elif text.startswith('where'):
            return 'where'
        else:
            return 'statement'


# ═══════════════════════════════════════════════════════════════════
# LAYER 3: COORDINATE CALCULATOR
# ═══════════════════════════════════════════════════════════════════

class CoordinateCalculator:
    """
    Calculates exact position:
    Planet → Sign → House → Gate → Line → Color → Tone → Base
    With degree/minute/second precision
    """
    
    def __init__(self, birth_data: Dict):
        """Initialize with birth data"""
        self.birth_data = birth_data
        self.gates = load_gates()
        self.colors = load_colors()
        self.tones = load_tones()
        self.bases = load_bases()
    
    def calculate_coordinate(self, field_name: str) -> Dict:
        """
        Calculate complete coordinate for a specific field
        Returns: {
            planet, sign, house, gate, line, color, tone, base,
            degree, minute, second
        }
        """
        # Get field data from birth chart
        field = self.birth_data['fields'][field_name]
        
        # In real implementation, this would use Swiss Ephemeris
        # For now, we use the data structure you already have
        
        coordinate = {
            'planet': self.get_planet_for_field(field_name),
            'sign': self.calculate_sign(field),
            'house': self.calculate_house(field),
            'gate': field['gate'],
            'line': field['line'],
            'color': field.get('color', 1),  # Default to color 1
            'tone': field.get('tone', 1),    # Default to tone 1
            'base': field.get('base', 1),    # Default to base 1
            'degree': field.get('degree', 0),
            'minute': field.get('minute', 0),
            'second': field.get('second', 0)
        }
        
        return coordinate
    
    def get_planet_for_field(self, field_name: str) -> str:
        """Map field to planet"""
        field_planet_map = {
            'mind': 'mercury',
            'heart': 'moon',
            'body': 'mars',
            'soul': 'sun',
            'spirit': 'jupiter',
            'shadow': 'saturn',
            'observer': 'uranus',
            'unity': 'neptune',
            'source': 'pluto'
        }
        return field_planet_map.get(field_name, 'mercury')
    
    def calculate_sign(self, field: Dict) -> str:
        """Calculate zodiac sign from gate position"""
        # Simplified: Map gate to sign
        # In real version, use actual ecliptic longitude
        gate = field['gate']
        signs = list(ZODIAC_SIGNS.keys())
        sign_index = ((gate - 1) // 6) % 12
        return signs[sign_index]
    
    def calculate_house(self, field: Dict) -> int:
        """Calculate house from gate position"""
        gate = field['gate']
        return ((gate - 1) // 6) % 12 + 1


# ═══════════════════════════════════════════════════════════════════
# LAYER 4: MEANING COLLAPSE ENGINE
# ═══════════════════════════════════════════════════════════════════

class MeaningCollapseEngine:
    """
    Collapses meaning through layers:
    Planet → Sign → House → Gate → Line → Color → Tone → Base
    
    Each layer modifies and refines the layer below.
    No AI. Just structured synthesis.
    """
    
    def __init__(self):
        self.gates = load_gates()
        self.colors = load_colors()
        self.tones = load_tones()
        self.bases = load_bases()
    
    def collapse(self, coordinate: Dict, state: str = 'gift') -> Dict:
        """
        Collapse meaning from coordinate
        Returns semantic layers
        """
        gate_data = self.gates[str(coordinate['gate'])]
        planet_data = PLANETS[coordinate['planet']]
        sign_data = ZODIAC_SIGNS[coordinate['sign']]
        house_data = HOUSES[coordinate['house']]
        color_data = self.colors[str(coordinate['color'])]
        tone_data = self.tones[str(coordinate['tone'])]
        base_data = self.bases[str(coordinate['base'])]
        
        # Layer 1: Planet energy
        planet_fragment = planet_data['sentence_fragment']
        planet_action = planet_data['action']
        
        # Layer 2: Sign filter
        sign_filter = sign_data['filter']
        
        # Layer 3: House context
        house_context = house_data['context']
        
        # Layer 4: Gate theme
        gate_name = gate_data['name']
        gate_keywords = gate_data.get('keywords', ['essence'])
        
        # Layer 5: Color motivation
        color_name = color_data['name']
        
        # Layer 6: Tone perception
        tone_name = tone_data['name']
        
        # Layer 7: Base environment
        base_name = base_data['name']
        
        return {
            'planet': {'fragment': planet_fragment, 'action': planet_action},
            'sign': {'filter': sign_filter},
            'house': {'context': house_context},
            'gate': {'name': gate_name, 'keywords': gate_keywords},
            'color': {'name': color_name},
            'tone': {'name': tone_name},
            'base': {'name': base_name},
            'state': state
        }


# ═══════════════════════════════════════════════════════════════════
# LAYER 5: RESPONSE COMPOSITOR
# ═══════════════════════════════════════════════════════════════════

class ResponseCompositor:
    """
    Assembles final response from collapsed meaning layers
    Uses compositional rules (not templates)
    """
    
    def compose(self, meaning_layers: Dict, question_type: str) -> str:
        """
        Compose response from meaning layers
        """
        planet = meaning_layers['planet']
        sign = meaning_layers['sign']
        house = meaning_layers['house']
        gate = meaning_layers['gate']
        color = meaning_layers['color']
        tone = meaning_layers['tone']
        base = meaning_layers['base']
        state = meaning_layers['state']
        
        # Build response compositionally
        response_parts = []
        
        # Opening: Planet through Sign in House
        opening = f"{planet['fragment'].capitalize()} {planet['action']} {sign['filter']} {house['context']}."
        response_parts.append(opening)
        
        # Core: Gate theme
        gate_statement = f"This activates {gate['name']}, bringing the quality of {gate['keywords'][0]}."
        response_parts.append(gate_statement)
        
        # Depth layers
        depth = f"Your motivation stems from {color['name'].lower()}, perceived through {tone['name'].lower()}, grounded in {base['name'].lower()}."
        response_parts.append(depth)
        
        # State-specific guidance
        if state == 'shadow':
            guidance = f"The shadow here is feeling {gate['keywords'][0]} as a struggle. Move toward acceptance."
        elif state == 'gift':
            guidance = f"The gift is expressing {gate['keywords'][0]} naturally. Trust this flow."
        else:  # convergence
            guidance = f"The convergence is embodying {gate['keywords'][0]} as pure consciousness."
        
        response_parts.append(guidance)
        
        return " ".join(response_parts)


# ═══════════════════════════════════════════════════════════════════
# LAYER 6: MAIN RESPONDER
# ═══════════════════════════════════════════════════════════════════

class DeterministicResponder:
    """
    Complete responder system
    No LLM. Pure structure.
    """
    
    def __init__(self, birth_data: Dict):
        self.parser = GrammarParser()
        self.calculator = CoordinateCalculator(birth_data)
        self.engine = MeaningCollapseEngine()
        self.compositor = ResponseCompositor()
    
    def respond(self, user_input: str) -> Dict:
        """
        Generate deterministic response
        """
        # Parse input
        parsed = self.parser.parse(user_input)
        
        # Calculate coordinate for detected field
        coordinate = self.calculator.calculate_coordinate(parsed['field'])
        
        # Collapse meaning
        meaning_layers = self.engine.collapse(coordinate, parsed['state'])
        
        # Compose response
        response_text = self.compositor.compose(meaning_layers, parsed['question_type'])
        
        return {
            'response': response_text,
            'metadata': {
                'field': parsed['field'],
                'state': parsed['state'],
                'coordinate': coordinate,
                'layers': meaning_layers
            }
        }


# ═══════════════════════════════════════════════════════════════════
# EXAMPLE USAGE
# ═══════════════════════════════════════════════════════════════════

def demo():
    """Demonstrate the system"""
    
    # Example birth data
    birth_data = {
        'birth_date': '1990-09-18',
        'birth_time': '21:34',
        'location': 'San Francisco, CA',
        'fields': {
            'mind': {'gate': 59, 'line': 2, 'color': 3, 'tone': 4, 'base': 2, 'degree': 259, 'minute': 50, 'second': 54},
            'heart': {'gate': 6, 'line': 4, 'color': 2, 'tone': 5, 'base': 1},
            'body': {'gate': 46, 'line': 2, 'color': 1, 'tone': 3, 'base': 4},
            'soul': {'gate': 25, 'line': 2, 'color': 4, 'tone': 2, 'base': 3}
        }
    }
    
    # Initialize responder
    responder = DeterministicResponder(birth_data)
    
    # Test queries
    queries = [
        "Why do I struggle with intimacy?",
        "How can I express my heart?",
        "What is my purpose?",
        "How do I master my mind?"
    ]
    
    print("=" * 80)
    print("DETERMINISTIC CONSCIOUSNESS RESPONDER - DEMO")
    print("=" * 80)
    
    for query in queries:
        print(f"\n📝 USER: {query}")
        print("-" * 80)
        
        result = responder.respond(query)
        
        print(f"🤖 SYSTEM: {result['response']}")
        print(f"\n📊 METADATA:")
        print(f"   Field: {result['metadata']['field']}")
        print(f"   State: {result['metadata']['state']}")
        print(f"   Coordinate: Gate {result['metadata']['coordinate']['gate']}.{result['metadata']['coordinate']['line']}")
        print(f"   Planet: {result['metadata']['coordinate']['planet']}")
        print(f"   Sign: {result['metadata']['coordinate']['sign']}")
        print(f"   House: {result['metadata']['coordinate']['house']}")
        print("=" * 80)


if __name__ == '__main__':
    demo()
