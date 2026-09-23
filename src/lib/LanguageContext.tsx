"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ta';

type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  en: {
    // Header & Nav
    govtTitle: "Ministry of Education • Govt of India",
    skipMain: "Skip to Main Content",
    deptTitle: "Central Institute of Classical Tamil (CICT)",
    deptSub: "Ministry of Education • Government of India",
    digitalInitiative: "Central Institute of Classical Tamil e-Governance Initiative",
    navHome: "Home",
    navResearch: "Inscriptions",
    navLearn: "Learn Tamil",
    navSpellCheck: "Spelling Checker",
    navPlagiarism: "Plagiarism Checker",
    navHistory: "History & Map",

    // Learn Hub Page
    learnHeroTag: "Tamil Language & Epigraphy Hub",
    learnHeroTitle1: "Voice of Tamil",
    learnHeroTitle2: "Sleeping in Inscriptions",
    learnHeroSub: "Read ancient stone inscriptions and explore 2,000 years of Tamil history, literature, and vocabulary.",
    startLearningBtn: "Start Learning",
    statsInscriptions: "100+ Inscriptions",
    statsLiterature: "50+ Literary Works",
    statsVerified: "100% Verified Records",

    // Learn Feature Cards
    card1Title: "Learn Stone Inscriptions",
    card1Sub: "READ INSCRIPTIONS",
    card1Desc: "Script forms, pronunciation audio, and epigraphical records.",
    
    card2Title: "Sample Inscriptions",
    card2Sub: "HISTORICAL SAMPLES",
    card2Desc: "History, Tamil translations, and detailed explanations.",
    
    card3Title: "Practice & Quiz",
    card3Sub: "TEST YOUR KNOWLEDGE",
    card3Desc: "Test your learning with interactive quizzes and earn points.",
    
    card4Title: "Learning Progress",
    card4Sub: "TRACK PROGRESS",
    card4Desc: "Track your completed lessons, badges, and learning level.",

    // Pills Bar
    pillTemples: "Temples Guide",
    pillDocs: "Documents & Publications",
    pillCommunity: "Community Contribution",
    pillStudents: "Students Zone",
    pillFavorites: "Favorites",

    // Word Evolution Explorer
    wordExplorerTag: "Word Evolution Explorer",
    wordExplorerTitle: "A Word's Journey (ஒரு சொல்லின் பயணம்)",
    wordExplorerSub: "Discover the meaning, usage, and 2,000-year historical journey of Tamil words.",
    searchBoxTitle: "Explore the History of a Word",
    searchBoxSub: "Enter a Tamil word to uncover its documented evolution across history",
    searchPlaceholder: "Enter Tamil word... (e.g. அகம், அறம், நீர்)",
    searchBtn: "Search",
    suggestedLabel: "Suggested Words:",
    timelineTitle: "Historical Timeline (சொல்லின் பயணம்)",
    meaningEvolutionTitle: "Meaning Evolution",
    literaryExamplesTitle: "Literary Examples",
    relatedWordsTitle: "Related Words (Click to Explore)",
    wordNotFound: "Historical data for this word is not in our dataset yet.",
    wordNotFoundSub: "We will add this word in future dataset updates. Try exploring sample words below:",

    // Daily Wisdom
    wisdomTag: "Daily Tamil Wisdom",
    wisdomTitle: "Thirukkural Nectar (திருக்குறள் அமுதம்)",
    listenAudioBtn: "🔊 Listen Pronunciation",
    playingAudioBtn: "Playing...",
    newKuralBtn: "New Kural",
    tamilMeaningLabel: "📖 Tamil Explanation:",
    englishMeaningLabel: "🌐 English Translation:",

    // Pronunciation Practice
    pronunciationTag: "Speech Recognition",
    pronunciationTitle: "Tamil Pronunciation Practice",
    pronunciationSub: "Listen, Speak, and Master Accurate Tamil Pronunciation",
    streakLabel: "Day Streak",
    practiceCountLabel: "Practice",
    tabAll: "All",
    tabWords: "Words",
    tabSentences: "Sentences",
    tabPoetry: "Poetry Lines",
    sampleLabel: "Sample:",
    tapToSpeak: "🎙️ Tap to Speak",
    listeningState: "🔴 Listening... Speak now",
    processingState: "⏳ Analyzing your pronunciation...",
    resultReady: "✅ View Result Below",
    retryBtn: "🔄 Try Again",
    nextBtn: "➡️ Next Practice",
    matchScore: "Match",
    wordComparison: "Word-by-Word Breakdown:",

    // Script Evolution
    scriptTag: "Historical Evolution",
    scriptTitle: "Tamil Script Evolution (2000 Years)",
    scriptSub: "From Tamil-Brahmi to Vatteluttu and Modern Tamil Script",
    selectLetterLabel: "Select Letter:",

    // Research (Kalvettu) Page
    researchTitle: "Research an Inscription",
    researchSub: "Upload a Tamil inscription image to extract its text.",
    uploadBox: "Choose an Image",
    supportedFormats: "Supported formats: JPG, PNG",
    tipsTitle: "Tips for better OCR",
    tip1: "• Capture the inscription clearly",
    tip2: "• Avoid heavy shadows",
    tip3: "• Keep the text area visible",
    tip4: "• Use a high-resolution image",
    tip5: "• Make sure the inscription is not heavily blurred",
    startAnalysis: "Start Analysis",
    extractingText: "Extracting text...",
    originalImage: "ORIGINAL INSCRIPTION",
    extractedText: "EXTRACTED TAMIL TEXT",
    ocrDisclaimer: "⚠️ AI-generated / OCR-based, unverified. Output may contain errors.",

    // Admin
    adminLogin: "Admin Login",
    usernameLabel: "Username",
    passwordLabel: "Password",
    loginBtn: "Secure Login",
    adminDashboardTitle: "Admin Settings Dashboard",
  },
  ta: {
    // Header & Nav
    govtTitle: "கல்வி அமைச்சகம் • இந்திய அரசு",
    skipMain: "முக்கிய பகுதிக்குச் செல்க",
    deptTitle: "செம்மொழித் தமிழாய்வு மத்திய நிறுவனம் (CICT)",
    deptSub: "கல்வி அமைச்சகம் • இந்திய அரசு",
    digitalInitiative: "செம்மொழித் தமிழாய்வு திட்டம்",
    navHome: "முகப்பு",
    navResearch: "கல்வெட்டு ஆராய்ச்சி",
    navLearn: "தமிழ் கற்போம்",
    navSpellCheck: "எழுத்துச் சரிபார்ப்பு",
    navPlagiarism: "நகல் பரிசோதனை",
    navHistory: "வரலாறு & வரைபடம்",

    // Learn Hub Page
    learnHeroTag: "தமிழ் வளர்ச்சி & கல்வெட்டு ஆய்வுப் பிரிவு",
    learnHeroTitle1: "கல்வெட்டில் உறங்கும்",
    learnHeroTitle2: "தமிழின் குரல்",
    learnHeroSub: "பண்டைய கல்வெட்டுகளை வாசித்து, தமிழின் 2000 ஆண்டு கால வரலாற்றையும் சொற்களின் பரிணாமத்தையும் எளிதாகக் கற்றுக்கொள்ளுங்கள்.",
    startLearningBtn: "கற்றல் தொடங்குங்கள்",
    statsInscriptions: "100+ கல்வெட்டுகள்",
    statsLiterature: "50+ இலக்கியங்கள்",
    statsVerified: "100% நம்பகமான சான்றுகள்",

    // Learn Feature Cards
    card1Title: "கல்வெட்டு படிக்க கற்றல்",
    card1Sub: "READ INSCRIPTIONS",
    card1Desc: "எழுத்து வடிவம், ஒலிப்பயிற்சி மற்றும் வரலாற்றுச் சான்றுகள்.",
    
    card2Title: "எடுத்துக்காட்டு கல்வெட்டுகள்",
    card2Sub: "HISTORICAL SAMPLES",
    card2Desc: "வரலாறு, தமிழ் மொழிபெயர்ப்பு மற்றும் தெளிவுரைகள்.",
    
    card3Title: "பயிற்சி & வினாடி வினா",
    card3Sub: "TEST YOUR KNOWLEDGE",
    card3Desc: "உங்கள் அறிவை சோதித்து புள்ளிகளைப் பெறலாம்.",
    
    card4Title: "முன்னேற்றம்",
    card4Sub: "TRACK PROGRESS",
    card4Desc: "நீங்கள் கற்றதன் நிலையும் புள்ளிகளும் பார்க்கவும்.",

    // Pills Bar
    pillTemples: "கோயில்கள் வழிகாட்டி",
    pillDocs: "ஆவணங்கள் & வெளியீடுகள்",
    pillCommunity: "சமூக பங்களிப்பு",
    pillStudents: "மாணவர்கள் பகுதி",
    pillFavorites: "பிடித்தவை",

    // Word Evolution Explorer
    wordExplorerTag: "சொல் பரிணாமம்",
    wordExplorerTitle: "ஒரு சொல்லின் பயணம்",
    wordExplorerSub: "ஒரு தமிழ் சொல்லின் பொருள், பயன்பாடு மற்றும் வரலாற்றுப் பயணத்தை அறிந்துகொள்ளுங்கள்.",
    searchBoxTitle: "ஒரு சொல்லின் வரலாற்றைத் தேடுங்கள்",
    searchBoxSub: "தமிழ் சொல்லை உள்ளிட்டு அதன் வரலாற்றுப் பரிணாமத்தைக் கண்டறியவும்",
    searchPlaceholder: "தமிழ் சொல்லை உள்ளிடுங்கள்... (எ.கா: அகம், அறம், நீர்)",
    searchBtn: "தேடு",
    suggestedLabel: "மாதிரி சொற்கள்:",
    timelineTitle: "சொல்லின் பயணம் (Historical Timeline)",
    meaningEvolutionTitle: "பொருள் மாற்றம் (Meaning Evolution)",
    literaryExamplesTitle: "இலக்கியப் பயன்பாடு (Literary Examples)",
    relatedWordsTitle: "தொடர்புடைய சொற்கள் (Click to Explore)",
    wordNotFound: "இந்த சொல்லுக்கான வரலாற்றுத் தகவல் தற்போது எங்கள் தரவுத்தொகுப்பில் இல்லை.",
    wordNotFoundSub: "இந்த சொல்லை பின்னர் எங்கள் தரவுத்தொகுப்பில் சேர்க்கலாம். கீழே உள்ள மாதிரி சொற்களைத் தேடவும்:",

    // Daily Wisdom
    wisdomTag: "தினசரி நற்சிந்தனை",
    wisdomTitle: "திருக்குறள் அமுதம்",
    listenAudioBtn: "🔊 ஒலியைக் கேட்க",
    playingAudioBtn: "ஒலிக்கிறது...",
    newKuralBtn: "புதிய குறள்",
    tamilMeaningLabel: "📖 தமிழ் உரை:",
    englishMeaningLabel: "🌐 ENGLISH MEANING:",

    // Pronunciation Practice
    pronunciationTag: "குரல் அங்கீகாரம்",
    pronunciationTitle: "தமிழ் உச்சரிப்பு பயிற்சி",
    pronunciationSub: "கேட்டு, பேசி, சரியான உச்சரிப்பை கற்றுக்கொள்வோம்",
    streakLabel: "நாள் தொடர்",
    practiceCountLabel: "பயிற்சி",
    tabAll: "அனைத்தும்",
    tabWords: "சொற்கள்",
    tabSentences: "வாக்கியங்கள்",
    tabPoetry: "கவிதை வரிகள்",
    sampleLabel: "மாதிரி:",
    tapToSpeak: "🎙️ பேச தொடங்கு (Tap to Speak)",
    listeningState: "🔴 கேட்கிறது... பேசவும்",
    processingState: "⏳ உங்கள் உச்சரிப்பை சரிபார்க்கிறது...",
    resultReady: "✅ முடிவு கீழே பார்க்கவும்",
    retryBtn: "🔄 மீண்டும் முயற்சி",
    nextBtn: "➡️ அடுத்த பயிற்சி",
    matchScore: "Match",
    wordComparison: "சொல் வாரியான ஒப்பீடு:",

    // Script Evolution
    scriptTag: "வரலாற்றுப் பரிணாமம்",
    scriptTitle: "எழுத்து வளர்ச்சி நிலைகள்",
    scriptSub: "தமிழ்ப் பிராமி முதல் நவீன தமிழ் வரை எழுத்துக்களின் 2000 ஆண்டு கால வரலாற்று மாற்றம்",
    selectLetterLabel: "எழுத்தைத் தேர்ந்தெடுக்கவும்:",

    // Research
    researchTitle: "கல்வெட்டை ஆராய்க",
    researchSub: "கல்வெட்டு படத்தைப் பதிவேற்றி அதிலுள்ள எழுத்துக்களைப் பிரித்தெடுக்கவும்.",
    uploadBox: "பதிலேற்ற படத்தைத் தேர்ந்தெடுக்கவும்",
    supportedFormats: "ஏற்கப்படும் வடிவங்கள்: JPG, PNG",
    tipsTitle: "சிறந்த முடிவுகளுக்கான குறிப்புகள்",
    tip1: "• கல்வெட்டைத் தெளிவாகப் புகைப்படம் எடுக்கவும்",
    tip2: "• அடர்ந்த நிழல்களைத் தவிர்க்கவும்",
    tip3: "• எழுத்துக்கள் தெளிவாகத் தெரிவதை உறுதி செய்யவும்",
    tip4: "• உயர் துல்லியப் படத்தைப் பயன்படுத்தவும்",
    tip5: "• படம் மங்கலாக இல்லாமல் இருப்பதை உறுதி செய்யவும்",
    startAnalysis: "பகுப்பாய்வைத் தொடங்கு",
    extractingText: "எழுத்துக்களைப் பிரித்தெடுக்கிறது...",
    originalImage: "அசல் கல்வெட்டுப் படம்",
    extractedText: "பிரித்தெடுக்கப்பட்ட தமிழ் உரை",
    ocrDisclaimer: "⚠️ AI-உருவாக்கியது / சரிபார்க்கப்படாதது. பிழைகள் இருக்கலாம்.",

    // Admin
    adminLogin: "நிர்வாகி உள்நுழைவு",
    usernameLabel: "பயனர்பெயர்",
    passwordLabel: "கடவுச்சொல்",
    loginBtn: "உள்நுழைக",
    adminDashboardTitle: "நிர்வாகி அமைப்புகள்",
  }
};

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('ta');

  useEffect(() => {
    const savedLang = localStorage.getItem('appLang') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'ta')) {
      setLangState(savedLang);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('appLang', newLang);
  };

  const t = (key: string): string => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
