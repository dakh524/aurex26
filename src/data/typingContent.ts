export interface TypingItem {
  id: string;
  tamil: string;
  transliteration?: string;
  meaningEn?: string;
}

export interface TypingLevel {
  levelNumber: number;
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  badge: string;
  badgeEn: string;
  targetCount: number;
  items: TypingItem[];
}

export interface Achievement {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
  condition: (stats: TypingStats) => boolean;
}

export interface TypingStats {
  totalCompleted: number;
  bestWpm: number;
  bestAccuracy: number;
  totalCharactersTyped: number;
  levelProgress: Record<number, number>; // levelNumber -> percentage (0-100)
  unlockedAchievements: string[]; // achievement ids
  dailyChallengeBest?: {
    wpm: number;
    accuracy: number;
    completedAt: string;
  };
}

// 5 Practice Levels
export const TYPING_LEVELS: TypingLevel[] = [
  {
    levelNumber: 1,
    id: "level-1",
    title: "1. எழுத்துப் பயிற்சி",
    titleEn: "1. Letter Practice",
    description: "உயிர் மற்றும் மெய் எழுத்துகளை ஒவ்வொன்றாக தட்டச்சு செய்து விரல்களைப் பழக்கப்படுத்தவும்.",
    descriptionEn: "Practice individual Tamil vowels and consonants to train your finger coordination.",
    badge: "எழுத்துகள்",
    badgeEn: "Letters",
    targetCount: 15,
    items: [
      { id: "l1", tamil: "அ", transliteration: "a", meaningEn: "Short vowel A" },
      { id: "l2", tamil: "ஆ", transliteration: "aa", meaningEn: "Long vowel AA" },
      { id: "l3", tamil: "இ", transliteration: "i", meaningEn: "Short vowel I" },
      { id: "l4", tamil: "ஈ", transliteration: "ee", meaningEn: "Long vowel EE" },
      { id: "l5", tamil: "உ", transliteration: "u", meaningEn: "Short vowel U" },
      { id: "l6", tamil: "ஊ", transliteration: "oo", meaningEn: "Long vowel OO" },
      { id: "l7", tamil: "எ", transliteration: "e", meaningEn: "Short vowel E" },
      { id: "l8", tamil: "ஏ", transliteration: "ae", meaningEn: "Long vowel AE" },
      { id: "l9", tamil: "ஐ", transliteration: "ai", meaningEn: "Vowel AI" },
      { id: "l10", tamil: "ஒ", transliteration: "o", meaningEn: "Short vowel O" },
      { id: "l11", tamil: "ஓ", transliteration: "oa", meaningEn: "Long vowel OA" },
      { id: "l12", tamil: "ஔ", transliteration: "au", meaningEn: "Vowel AU" },
      { id: "l13", tamil: "க்", transliteration: "k", meaningEn: "Consonant K" },
      { id: "l14", tamil: "ச்", transliteration: "ch", meaningEn: "Consonant Ch" },
      { id: "l15", tamil: "த்", transliteration: "th", meaningEn: "Consonant Th" },
      { id: "l16", tamil: "ப்", transliteration: "p", meaningEn: "Consonant P" },
      { id: "l17", tamil: "ம்", transliteration: "m", meaningEn: "Consonant M" },
      { id: "l18", tamil: "ர்", transliteration: "r", meaningEn: "Consonant R" },
      { id: "l19", tamil: "ல்", transliteration: "l", meaningEn: "Consonant L" },
      { id: "l20", tamil: "ழ்", transliteration: "zh", meaningEn: "Consonant Zha" }
    ]
  },
  {
    levelNumber: 2,
    id: "level-2",
    title: "2. எளிய சொற்கள்",
    titleEn: "2. Easy Words",
    description: "இரண்டு மற்றும் மூன்று எழுத்துகள் கொண்ட எளிய தமிழ்ச் சொற்கள்.",
    descriptionEn: "Type simple 2 and 3 letter foundational Tamil vocabulary.",
    badge: "எளியவை",
    badgeEn: "Easy",
    targetCount: 12,
    items: [
      { id: "w1", tamil: "தமிழ்", transliteration: "Thamizh", meaningEn: "Tamil" },
      { id: "w2", tamil: "மண்", transliteration: "Mann", meaningEn: "Soil" },
      { id: "w3", tamil: "கல்", transliteration: "Kal", meaningEn: "Stone" },
      { id: "w4", tamil: "அறம்", transliteration: "Aram", meaningEn: "Virtue" },
      { id: "w5", tamil: "நீர்", transliteration: "Neer", meaningEn: "Water" },
      { id: "w6", tamil: "மரம்", transliteration: "Maram", meaningEn: "Tree" },
      { id: "w7", tamil: "பல்", transliteration: "Pal", meaningEn: "Tooth" },
      { id: "w8", tamil: "சொல்", transliteration: "Sol", meaningEn: "Word" },
      { id: "w9", tamil: "நாடு", transliteration: "Naadu", meaningEn: "Country" },
      { id: "w10", tamil: "ஊர்", transliteration: "Oor", meaningEn: "Town" },
      { id: "w11", tamil: "கண்", transliteration: "Kann", meaningEn: "Eye" },
      { id: "w12", tamil: "வான்", transliteration: "Vaan", meaningEn: "Sky" },
      { id: "w13", tamil: "அன்பு", transliteration: "Anbu", meaningEn: "Love" },
      { id: "w14", tamil: "பாட்டு", transliteration: "Paattu", meaningEn: "Song" },
      { id: "w15", tamil: "மலை", transliteration: "Malai", meaningEn: "Mountain" }
    ]
  },
  {
    levelNumber: 3,
    id: "level-3",
    title: "3. பொதுவான சொற்கள்",
    titleEn: "3. Common Words",
    description: "அன்றாடப் பயன்பாடு மற்றும் வரலாற்று கலைச்சொற்கள்.",
    descriptionEn: "Practice everyday common and cultural Tamil words.",
    badge: "நடுத்தரம்",
    badgeEn: "Medium",
    targetCount: 10,
    items: [
      { id: "c1", tamil: "கல்வெட்டு", transliteration: "Kalvettu", meaningEn: "Stone Inscription" },
      { id: "c2", tamil: "வரலாறு", transliteration: "Varalaaru", meaningEn: "History" },
      { id: "c3", tamil: "கோவில்", transliteration: "Kovil", meaningEn: "Temple" },
      { id: "c4", tamil: "தமிழகம்", transliteration: "Thamizhagam", meaningEn: "Tamil Homeland" },
      { id: "c5", tamil: "பண்பாடு", transliteration: "Pannpaadu", meaningEn: "Culture" },
      { id: "c6", tamil: "இலக்கியம்", transliteration: "Ilakkiyam", meaningEn: "Literature" },
      { id: "c7", tamil: "அறிவியல்", transliteration: "Ariviyal", meaningEn: "Science" },
      { id: "c8", tamil: "புத்தகம்", transliteration: "Puthagam", meaningEn: "Book" },
      { id: "c9", tamil: "ஆராய்ச்சி", transliteration: "Aaraaichi", meaningEn: "Research" },
      { id: "c10", tamil: "சாசனம்", transliteration: "Saasanam", meaningEn: "Epigraph / Decree" },
      { id: "c11", tamil: "செப்பேடு", transliteration: "Seppaedu", meaningEn: "Copper Plate" },
      { id: "c12", tamil: "மன்னன்", transliteration: "Mannan", meaningEn: "King" },
      { id: "c13", tamil: "ஆட்சி", transliteration: "Aatchi", meaningEn: "Governance" }
    ]
  },
  {
    levelNumber: 4,
    id: "level-4",
    title: "4. வாக்கியப் பயிற்சி",
    titleEn: "4. Sentence Practice",
    description: "வரலாற்றுச் சிறப்புமிக்க தமிழ் வாக்கியங்களை முழுமையாக தட்டச்சு செய்யவும்.",
    descriptionEn: "Type full sentences related to Tamil heritage and history.",
    badge: "வாக்கியங்கள்",
    badgeEn: "Sentences",
    targetCount: 6,
    items: [
      { 
        id: "s1", 
        tamil: "தமிழ் ஒரு பழமையான மொழியாகும்.", 
        transliteration: "Thamizh oru pazhamaiyaana mozhiyaagum.", 
        meaningEn: "Tamil is an ancient language." 
      },
      { 
        id: "s2", 
        tamil: "தமிழகத்தில் பல வரலாற்றுச் சிறப்புமிக்க கோவில்கள் உள்ளன.", 
        transliteration: "Thamizhagathil pala varalaatruch chirappumikka kovilgal ullana.", 
        meaningEn: "There are many historically significant temples in Tamil Nadu." 
      },
      { 
        id: "s3", 
        tamil: "கல்வெட்டுகள் நமது வரலாற்றை அறிய உதவுகின்றன.", 
        transliteration: "Kalvettugal namadhu varalaatrai ariya udhavuginrana.", 
        meaningEn: "Stone inscriptions help us understand our history." 
      },
      { 
        id: "s4", 
        tamil: "தமிழ் இலக்கியம் மிகவும் வளமானது.", 
        transliteration: "Thamizh ilakkiyam migavum valamaanadhu.", 
        meaningEn: "Tamil literature is extraordinarily rich." 
      },
      { 
        id: "s5", 
        tamil: "யாதும் ஊரே யாவரும் கேளிர் என்பது தமிழரின் பண்பாடு.", 
        transliteration: "Yaadhum oorae yaavarum kaelir enbadhu thamizharin pannpaadu.", 
        meaningEn: "To us all towns are our homeland and all people our kin." 
      },
      { 
        id: "s6", 
        tamil: "கீழடி அகழாய்வு தமிழரின் தொன்மையை உலகிற்கு உணர்த்துகிறது.", 
        transliteration: "Keeladi agazhaaivu thamizharin thonmaiyai ulagirku unarthugiradhu.", 
        meaningEn: "Keeladi excavations prove the antiquity of Tamil civilization." 
      }
    ]
  },
  {
    levelNumber: 5,
    id: "level-5",
    title: "5. நேரக் கட்டுப்பாட்டு சோதனை",
    titleEn: "5. Timed Speed Challenge",
    description: "60 வினாடிகளில் அதிகபட்ச வேகத்தில் தட்டச்சு செய்து உங்கள் WPM மற்றும் துல்லியத்தை அறியவும்.",
    descriptionEn: "Test your peak typing speed and accuracy under a 60-second timer challenge.",
    badge: "வேக சோதனை",
    badgeEn: "Speed Test",
    targetCount: 8,
    items: [
      { id: "t1", tamil: "செம்மொழித் தமிழாய்வு மத்திய நிறுவனம் சென்னையில் உள்ளது.", transliteration: "CICT is located in Chennai.", meaningEn: "Central Institute of Classical Tamil is located in Chennai." },
      { id: "t2", tamil: "தஞ்சைப் பெரிய கோவில் சோழர்களின் மாபெரும் கலைப்படைப்பு.", transliteration: "Thanjavur Big Temple is Chola art.", meaningEn: "Brihadisvara Temple is a masterpiece of the Chola empire." },
      { id: "t3", tamil: "திருக்குறள் மனித வாழ்வியலுக்கான உலகப் பொதுமறையாகும்.", transliteration: "Thirukkural is a universal handbook.", meaningEn: "Thirukkural is the universal book of human ethics." },
      { id: "t4", tamil: "தமிழ்-பிராமி எழுத்துக்கள் பழந்தமிழரின் எழுத்தறிவை பறைசாற்றுகின்றன.", transliteration: "Tamil-Brahmi scripts reflect literacy.", meaningEn: "Tamil-Brahmi scripts reflect ancient Tamil literacy." },
      { id: "t5", tamil: "தொல்காப்பியம் தமிழின் மிகத் தொன்மையான இலக்கண நூலாகும்.", transliteration: "Tolkappiyam is the oldest grammar.", meaningEn: "Tolkappiyam is the most ancient extant Tamil grammatical treatise." },
      { id: "t6", tamil: "கல்வெட்டியல் ஆய்வு வரலாற்று உண்மைகளை வெளிக்கொணர்கிறது.", transliteration: "Epigraphy unveils historical truths.", meaningEn: "Epigraphical studies unveil historical truths." }
    ]
  }
];

// Daily Challenge Pool
export const DAILY_CHALLENGE_WORDS = [
  "தமிழ்", "மொழி", "கல்வி", "வரலாறு", "கோவில்", "கல்வெட்டு", "தமிழகம்", "பண்பாடு",
  "இலக்கியம்", "அறிவியல்", "சாசனம்", "மன்னன்", "அரசி", "கொடை", "ஓலைச்சுவடி",
  "அகழாய்வு", "கீழடி", "முரசு", "செம்மொழி", "பாரம்பரியம்"
];

// 7 Non-AI Achievements
export const ACHIEVEMENTS_LIST: Achievement[] = [
  {
    id: "ach-first-test",
    title: "முதல் சோதனை (First Test)",
    titleEn: "First Test",
    description: "உங்கள் முதல் தட்டச்சு சோதனையை வெற்றிகரமாக முடித்துவிட்டீர்கள்!",
    descriptionEn: "Successfully completed your very first typing test!",
    icon: "🎯",
    condition: (stats) => stats.totalCompleted >= 1
  },
  {
    id: "ach-20-wpm",
    title: "20 WPM வேகம்",
    titleEn: "20 WPM Speed",
    description: "ஒரு நிமிடத்திற்கு 20 சொற்கள் தட்டச்சு வேகத்தை எட்டிவிட்டீர்கள்.",
    descriptionEn: "Achieved a typing speed of 20 Words Per Minute.",
    icon: "⚡",
    condition: (stats) => stats.bestWpm >= 20
  },
  {
    id: "ach-30-wpm",
    title: "30 WPM மின்னல் வேகம்",
    titleEn: "30 WPM Master",
    description: "மின்னல் வேகத்தில் நிமிடத்திற்கு 30 சொற்கள் தட்டச்சு செய்த சாதனை!",
    descriptionEn: "Reached an impressive speed of 30 Words Per Minute!",
    icon: "🚀",
    condition: (stats) => stats.bestWpm >= 30
  },
  {
    id: "ach-95-accuracy",
    title: "95% துல்லியம் (High Accuracy)",
    titleEn: "95% Accuracy",
    description: "பிழைகளின்றி 95% அல்லது அதற்கு மேற்பட்ட துல்லியத்தை அடைந்தீர்கள்.",
    descriptionEn: "Maintained 95% or higher precision across a test.",
    icon: "🎯",
    condition: (stats) => stats.bestAccuracy >= 95
  },
  {
    id: "ach-100-accuracy",
    title: "100% பூரண துல்லியம்",
    titleEn: "100% Perfection",
    description: "ஒரு பிழையும் இன்றி 100% துல்லியமாக தட்டச்சு செய்து முடித்தீர்கள்!",
    descriptionEn: "Zero errors! Scored a flawless 100% typing accuracy.",
    icon: "🌟",
    condition: (stats) => stats.bestAccuracy >= 100
  },
  {
    id: "ach-tamil99-master",
    title: "தமிழ்99 தேர்ச்சி (Tamil99 Master)",
    titleEn: "Tamil99 Master",
    description: "தமிழ்99 முறையில் 3 நிலைகளை வெற்றிகரமாக நிறைவு செய்துள்ளீர்கள்.",
    descriptionEn: "Completed at least 3 practice levels using Tamil99 layout.",
    icon: "⌨️",
    condition: (stats) => stats.totalCompleted >= 3
  },
  {
    id: "ach-anjal-master",
    title: "அஞ்சல் தட்டச்சு மேதை (Anjal Master)",
    titleEn: "Anjal Master",
    description: "அஞ்சல் முறையில் சிறந்த தட்டச்சு பயிற்சியாளராகத் தேர்ச்சி பெற்றீர்கள்.",
    descriptionEn: "Demonstrated typing fluency using Anjal phonetic mapping.",
    icon: "🏆",
    condition: (stats) => stats.totalCompleted >= 5
  }
];

// Virtual Keyboard Layouts
export interface KeyInfo {
  key: string;
  tamilChar: string;
  shiftChar?: string;
  label?: string;
  width?: string;
}

export const TAMIL99_KEYBOARD: KeyInfo[][] = [
  [
    { key: "1", tamilChar: "௧", shiftChar: "!" },
    { key: "2", tamilChar: "௨", shiftChar: "@" },
    { key: "3", tamilChar: "௩", shiftChar: "#" },
    { key: "4", tamilChar: "௪", shiftChar: "$" },
    { key: "5", tamilChar: "௫", shiftChar: "%" },
    { key: "6", tamilChar: "௬", shiftChar: "^" },
    { key: "7", tamilChar: "௭", shiftChar: "&" },
    { key: "8", tamilChar: "௮", shiftChar: "*" },
    { key: "9", tamilChar: "௯", shiftChar: "(" },
    { key: "0", tamilChar: "௰", shiftChar: ")" },
    { key: "-", tamilChar: "-", shiftChar: "_" },
    { key: "=", tamilChar: "=", shiftChar: "+" }
  ],
  [
    { key: "q", tamilChar: "ஆ", shiftChar: "ஔ" },
    { key: "w", tamilChar: "ஈ", shiftChar: "ஐ" },
    { key: "e", tamilChar: "ஊ", shiftChar: "ஓ" },
    { key: "r", tamilChar: "ஏ", shiftChar: "ஏ" },
    { key: "t", tamilChar: "ஐ", shiftChar: "ஐ" },
    { key: "y", tamilChar: "ள", shiftChar: "ள" },
    { key: "u", tamilChar: "ற", shiftChar: "ற" },
    { key: "i", tamilChar: "ன", shiftChar: "ன" },
    { key: "o", tamilChar: "ட", shiftChar: "ட" },
    { key: "p", tamilChar: "ண", shiftChar: "ண" }
  ],
  [
    { key: "a", tamilChar: "அ", shiftChar: "ஃ" },
    { key: "s", tamilChar: "இ", shiftChar: "ஸ்ரீ" },
    { key: "d", tamilChar: "உ", shiftChar: "உ" },
    { key: "f", tamilChar: "எ", shiftChar: "எ" },
    { key: "g", tamilChar: "ஒ", shiftChar: "ஒ" },
    { key: "h", tamilChar: "க", shiftChar: "க" },
    { key: "j", tamilChar: "ப", shiftChar: "ப" },
    { key: "k", tamilChar: "ம", shiftChar: "ம" },
    { key: "l", tamilChar: "த", shiftChar: "த" },
    { key: ";", tamilChar: "ந", shiftChar: "ந" }
  ],
  [
    { key: "z", tamilChar: "ய", shiftChar: "ய" },
    { key: "x", tamilChar: "வ", shiftChar: "வ" },
    { key: "c", tamilChar: "ங", shiftChar: "ங" },
    { key: "v", tamilChar: "ச", shiftChar: "ச" },
    { key: "b", tamilChar: "ஞ", shiftChar: "ஞ" },
    { key: "n", tamilChar: "ர", shiftChar: "ர" },
    { key: "m", tamilChar: "ல", shiftChar: "ல" },
    { key: ",", tamilChar: "ழ", shiftChar: "ழ" },
    { key: ".", tamilChar: "ஃ", shiftChar: "ஃ" }
  ]
];

export const ANJAL_KEYBOARD: KeyInfo[][] = [
  [
    { key: "1", tamilChar: "1", label: "1" },
    { key: "2", tamilChar: "2", label: "2" },
    { key: "3", tamilChar: "3", label: "3" },
    { key: "4", tamilChar: "4", label: "4" },
    { key: "5", tamilChar: "5", label: "5" },
    { key: "6", tamilChar: "6", label: "6" },
    { key: "7", tamilChar: "7", label: "7" },
    { key: "8", tamilChar: "8", label: "8" },
    { key: "9", tamilChar: "9", label: "9" },
    { key: "0", tamilChar: "0", label: "0" }
  ],
  [
    { key: "q", tamilChar: "க்", label: "q" },
    { key: "w", tamilChar: "வ்", label: "w" },
    { key: "e", tamilChar: "எ", label: "e" },
    { key: "r", tamilChar: "ர்", label: "r" },
    { key: "t", tamilChar: "த்", label: "t" },
    { key: "y", tamilChar: "ய்", label: "y" },
    { key: "u", tamilChar: "உ", label: "u" },
    { key: "i", tamilChar: "இ", label: "i" },
    { key: "o", tamilChar: "ஒ", label: "o" },
    { key: "p", tamilChar: "ப்", label: "p" }
  ],
  [
    { key: "a", tamilChar: "அ", label: "a" },
    { key: "s", tamilChar: "ச்", label: "s" },
    { key: "d", tamilChar: "ட்", label: "d" },
    { key: "f", tamilChar: "ஃ", label: "f" },
    { key: "g", tamilChar: "ங்", label: "g" },
    { key: "h", tamilChar: "ஹ்", label: "h" },
    { key: "j", tamilChar: "ஜ்", label: "j" },
    { key: "k", tamilChar: "க்", label: "k" },
    { key: "l", tamilChar: "ல்", label: "l" }
  ],
  [
    { key: "z", tamilChar: "ழ்", label: "zh" },
    { key: "x", tamilChar: "ஷ்", label: "sh" },
    { key: "c", tamilChar: "ச்", label: "c" },
    { key: "v", tamilChar: "வ்", label: "v" },
    { key: "b", tamilChar: "ப்", label: "b" },
    { key: "n", tamilChar: "ந்", label: "n" },
    { key: "m", tamilChar: "ம்", label: "m" },
    { key: "R", tamilChar: "ற்", label: "R" },
    { key: "L", tamilChar: "ள்", label: "L" },
    { key: "N", tamilChar: "ண்", label: "N" }
  ]
];
