export interface TamilPronunciationItem {
  id: string;
  category: 'words' | 'sentences' | 'poetry';
  categoryLabel: 'சொற்கள்' | 'வாக்கியங்கள்' | 'கவிதை வரிகள்';
  text: string;
  difficulty: 'EASY' | 'MEDIUM' | 'CLASSICAL';
  difficultyLabel: string;
  meaning?: string;
  source?: string;
}

export const TAMIL_PRONUNCIATION_DATA: TamilPronunciationItem[] = [
  // EASY - WORDS & SIMPLE SENTENCES
  {
    id: 'w1',
    category: 'words',
    categoryLabel: 'சொற்கள்',
    text: 'தமிழ்',
    difficulty: 'EASY',
    difficultyLabel: 'எளிது',
    meaning: 'தமிழ் மொழி (Sweet Tamil language)',
  },
  {
    id: 'w2',
    category: 'words',
    categoryLabel: 'சொற்கள்',
    text: 'வணக்கம்',
    difficulty: 'EASY',
    difficultyLabel: 'எளிது',
    meaning: 'மரியாதைக்குரிய வாழ்த்து (Greetings)',
  },
  {
    id: 'w3',
    category: 'words',
    categoryLabel: 'சொற்கள்',
    text: 'அன்பு',
    difficulty: 'EASY',
    difficultyLabel: 'எளிது',
    meaning: 'பாசம் / நேசம் (Love / Affection)',
  },
  {
    id: 'w4',
    category: 'words',
    categoryLabel: 'சொற்கள்',
    text: 'நன்றி',
    difficulty: 'EASY',
    difficultyLabel: 'எளிது',
    meaning: 'நன்றியுணர்வு (Thank you)',
  },

  // SENTENCES
  {
    id: 's1',
    category: 'sentences',
    categoryLabel: 'வாக்கியங்கள்',
    text: 'அம்மா உணவு சமைக்கிறார்.',
    difficulty: 'EASY',
    difficultyLabel: 'எளிது',
    meaning: 'அம்மா சமையல் செய்கிறார் (Mother is cooking food)',
  },
  {
    id: 's2',
    category: 'sentences',
    categoryLabel: 'வாக்கியங்கள்',
    text: 'தமிழ் எங்கள் உயிருக்கு நேர்.',
    difficulty: 'MEDIUM',
    difficultyLabel: 'நடுத்தரம்',
    meaning: 'பாரதிதாசன் வரி - தமிழ் மொழி எங்கள் உயிர போன்றது',
    source: 'பாரதிதாசன்',
  },
  {
    id: 's3',
    category: 'sentences',
    categoryLabel: 'வாக்கியங்கள்',
    text: 'வாய்மையே வெல்லும்.',
    difficulty: 'EASY',
    difficultyLabel: 'எளிது',
    meaning: 'உண்மையே எப்போதும் வெற்றி பெறும் (Truth alone triumphs)',
    source: 'தமிழ்நாடு அரசு முழக்கம்',
  },
  {
    id: 's4',
    category: 'sentences',
    categoryLabel: 'வாக்கியங்கள்',
    text: 'கற்க கசடற கற்பவை கற்றபின் நிற்க அதற்கு தக.',
    difficulty: 'MEDIUM',
    difficultyLabel: 'நடுத்தரம்',
    meaning: 'குறள் 391 - பிழையின்றி கற்று கற்றபடி வாழ வேண்டும்',
    source: 'திருக்குறள்',
  },

  // POETRY / CLASSICAL
  {
    id: 'p1',
    category: 'poetry',
    categoryLabel: 'கவிதை வரிகள்',
    text: 'யாதும் ஊரே யாவரும் கேளிர்.',
    difficulty: 'CLASSICAL',
    difficultyLabel: 'சங்கத் தமிழ்',
    meaning: 'எல்லா ஊரும் எம் ஊர், எல்லோரும் எம் உறவினர்',
    source: 'புறநானூறு 192 - கணியன் பூங்குன்றனார்',
  },
  {
    id: 'p2',
    category: 'poetry',
    categoryLabel: 'கவிதை வரிகள்',
    text: 'அகர முதல எழுத்தெல்லாம் ஆதி பகவன் முதற்றே உலகு.',
    difficulty: 'CLASSICAL',
    difficultyLabel: 'சங்கத் தமிழ்',
    meaning: 'எழுத்துக்களுக்கு அகரம் முதல்; உலகுக்கு இறைவன் முதல்',
    source: 'திருக்குறள் - முதல் குறள்',
  },
  {
    id: 'p3',
    category: 'poetry',
    categoryLabel: 'கவிதை வரிகள்',
    text: 'வாழ்க நிரந்தரம் வாழ்க தமிழ்மொழி வாழிய வாழியவே.',
    difficulty: 'MEDIUM',
    difficultyLabel: 'நடுத்தரம்',
    meaning: 'தமிழ் மொழி என்றென்றும் வாழ்க',
    source: 'மகாகவி பாரதியார்',
  },
  {
    id: 'p4',
    category: 'poetry',
    categoryLabel: 'கவிதை வரிகள்',
    text: 'தீதும் நன்றும் பிறர்தர வாரா.',
    difficulty: 'CLASSICAL',
    difficultyLabel: 'சங்கத் தமிழ்',
    meaning: 'நன்மையும் தீமையும் நம்மாலேயே விளைகின்றன',
    source: 'புறநானூறு 192',
  },
];
