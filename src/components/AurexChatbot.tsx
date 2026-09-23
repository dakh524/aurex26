"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  RefreshCw, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Key, 
  Landmark, 
  BookOpen, 
  ShieldCheck, 
  SpellCheck, 
  Gamepad2, 
  Compass, 
  MessageSquare, 
  HelpCircle, 
  ChevronDown, 
  Loader2, 
  ExternalLink 
} from 'lucide-react';
import ApiKeyModal from '@/components/ApiKeyModal';
import { useLanguage } from '@/lib/LanguageContext';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  quickReplies?: string[];
  isFormatted?: boolean;
}

export default function AurexChatbot() {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Default welcome message detailing all core features of Aurex
  const initialMessages: Message[] = [
    {
      id: 'welcome-1',
      sender: 'bot',
      text: lang === 'en' 
        ? `Hello! 🏛️ I am **Aurex - Tamil Heritage & Epigraphy AI Support Center**.

I can guide you on all features of this portal. Please click a suggested question below or type your inquiry:`
        : `வணக்கம்! 🏛️ நான் **Aurex - தமிழ் உலகம் மின்னாளுமை AI உதவி மையம்** (Tamil Heritage & Epigraphy Assistant).

இந்தச் செயலியில் உள்ள அனைத்து வசதிகள் மற்றும் பயன்பாடுகள் பற்றிய தகவல்களை நான் உங்களுக்கு விரிவாக வழங்க இயலும். 

கீழே உள்ள கேள்விகளில் ஒன்றை அழுத்தவும் அல்லது உங்களின் கேள்விகளைத் தட்டச்சு செய்யவும்:`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickReplies: lang === 'en' ? [
        '👨‍💻 Who built this Aurex app?',
        '📊 Where did we get the Dataset & How it was built?',
        '🏛️ About Aurex Platform',
        '📜 How Inscription Analyzer works',
        '📚 247 Tamil Letters with TTS Audio',
        '🎓 Learn Tamil Grammar & Rules',
        '💬 Everyday Tamil-English Conversations',
        '🛡️ Tamil Plagiarism Checker',
        '✍️ Tamil Spellchecker Feature',
        '⌨️ Tamil Typewriting Tutor',
        '🎙️ Pronunciation & Speech Practice',
        '🗺️ Ancient Inscriptions Map & History',
        '🎮 Epigraphy Games',
        '🔑 How to set up Gemini API Key?'
      ] : [
        '👨‍💻 Aurex செயலியை உருவாக்கியவர்கள் யார்?',
        '📊 தரவுத்தொகுப்பு (Dataset) & கட்டமைப்பு முறை?',
        '🏛️ இந்த Aurex செயலியைப் பற்றிச் சொல்',
        '📜 கல்வெட்டு ஆய்வகம் எவ்வாறு இயங்குகிறது?',
        '📚 247 தமிழ் எழுத்துகள் ஒலிப்பயிற்சி',
        '🎓 தமிழ் இலக்கணப் பயிலகம்',
        '💬 எளிய தமிழ்-ஆங்கில உரையாடல்கள்',
        '🛡️ தமிழ் கட்டுரை நகல் பரிசோதனை',
        '✍️ தமிழ் பிழைதிருத்தி வசதி',
        '⌨️ தமிழ் தட்டச்சுப் பயிற்சி',
        '🎙️ தமிழ் உச்சரிப்பு மற்றும் பேச்சுப் பயிற்சி',
        '🗺️ வரலாற்று வரைபடம் & கல்வெட்டுகள்',
        '🎮 கல்வெட்டு விளையாட்டுகள்',
        '🔑 Gemini API Key அமைப்பது எப்படி?'
      ]
    }
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);

  // Reset messages when language changes
  useEffect(() => {
    setMessages(initialMessages);
  }, [lang]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
    }
  }, [messages, isOpen]);

  // App Knowledge Base Rules for Instant Offline Intelligence
  const getAppKnowledgeResponse = (userQuery: string): string => {
    const q = userQuery.toLowerCase().trim();

    // 1. App Creators & Developers (Dhivakar, Anishruban, Jason)
    if (q.includes('who built') || q.includes('who created') || q.includes('who made') || q.includes('developed by') || q.includes('creator') || q.includes('developer') || q.includes('dhivakar') || q.includes('anishruban') || q.includes('jason') || q.includes('உருவாக்கியவர்கள்') || q.includes('யார் உருவாக்கினார்') || q.includes('தேவ்ஸ்')) {
      return lang === 'en'
        ? `👨‍💻 **Aurex App Creators & Engineering Team:**

This platform was designed and developed with high passion by:

1. 🌟 **Dhivakar**
2. 🌟 **Anishruban**
3. 🌟 **Jason**

Built for the **Central Institute of Classical Tamil (CICT), Ministry of Education, Govt of India** to digitize 2,000+ years of Tamil epigraphy, ancient inscriptions, script evolution, literature, and educational AI tools.`
        : `👨‍💻 **Aurex செயலியை உருவாக்கியவர்கள் (Engineering Team):**

இத்தளம் மிகச் சிறந்த வடிவமைப்பு மற்றும் AI தொழில்நுட்பத்துடன் இவர்களால் உருவாக்கப்பட்டது:

1. 🌟 **Dhivakar** (திவாகர்)
2. 🌟 **Anishruban** (அனிஷ்ரூபன்)
3. 🌟 **Jason** (ஜேசன்)

இந்திய அரசு **கல்வி அமைச்சகத்தின் செம்மொழித் தமிழாய்வு மத்திய நிறுவனத்தின் (CICT)** கீழ் தமிழ் கல்வெட்டுகள், எழுத்து வளர்ச்சி, இலக்கணம் மற்றும் மின்னாளுமை வசதிகளை டிஜிட்டல் மயமாக்க இச்செயலி உருவாக்கப்பட்டது.`;
    }

    // 1.1 Dataset Sources & Engineering Architecture
    if (q.includes('dataset') || q.includes('தரவு') || q.includes('source') || q.includes('எங்கிருந்து') || q.includes('how was it built') || q.includes('how it was made') || q.includes('architecture') || q.includes('எப்படி உருவாக்கப்பட்டது') || q.includes('தொல்லியல் தரவு') || q.includes('எப்படி செஞ்சீங்க')) {
      return lang === 'en'
        ? `📊 **Dataset Sources & Engineering Architecture:**

🏛️ **1. Epigraphy & Inscription Corpus:**
- **Archaeological Survey of India (ASI) - Epigraphy Branch:** South Indian Inscriptions (SII Volumes I to XXXIV) and Epigraphia Indica.
- **Tamil Nadu State Department of Archaeology (TNDA):** Excavation reports and stone epigraphy logs from Keeladi, Kodumanal, Mayiladumparai, and Porunai.
- **Tamil Virtual Academy (TVA) & CICT:** Digitized Tamil-Brahmi (தமிழி), Vatteluttu (வட்டெழுத்து), and medieval Chola/Pandya stone inscription archives.

📚 **2. Grammar & Linguistic Corpus:**
- **Tolkappiyam (தொல்காப்பியம்)** & **Nannul (நன்னூல்):** Authentic rules for phonetics (மாத்திரை), 5 genders, 8 cases, and sandhi (புணர்ச்சி) mutations.
- **University of Madras Tamil Lexicon** & **Kriya Contemporary Tamil Dictionary** for root lemmas and spellchecking validation.

⚙️ **3. Technology & AI Pipeline:**
- **Vision OCR:** Multimodal Google Gemini Vision models for extracting Brahmi/Tamil scripts from stone photos.
- **NLP Plagiarism Engine:** Custom N-Gram Tokenizer & TF-IDF Cosine Similarity vector space matching.
- **Speech Engine:** Web Speech Acoustic Synthesis configured for native \`ta-IN\` phonetic playback.`
        : `📊 **தரவுத்தொகுப்பு மூலங்கள் (Dataset Sources) & கட்டமைப்பு முறை:**

🏛️ **1. கல்வெட்டு மற்றும் தொல்லியல் தரவுகள் (Epigraphical Corpus):**
- **இந்தியத் தொல்லியல் துறை (ASI - Epigraphy Branch):** தென்னிந்திய கல்வெட்டுகள் (South Indian Inscriptions - SII தொகுதிகள் I முதல் XXXIV வரை).
- **தமிழ்நாடு அரசு தொல்லியல் துறை (TNDA):** கீழடி, கொடுமணல், மயிலாடும்பாறை, பொருந்தல் ஆகிய அகழாய்வு அறிக்கைகள் மற்றும் கல்வெட்டுப் பதிவுகள்.
- **செம்மொழித் தமிழாய்வு மத்திய நிறுவனம் (CICT) & தமிழ் இணையக் கல்விக்கழகம் (TVA):** தமிழ் பிராமி (தமிழி), வட்டெழுத்து, மற்றும் சோழர்/பாண்டியர் காலக் கல்வெட்டு டிஜிட்டல் ஆவணங்கள்.

📚 **2. இலக்கணம் மற்றும் மொழித் தரவுகள்:**
- **தொல்காப்பியம் & நன்னூல்:** மாத்திரை ஒலி அளவு, வல்லினம்/மெல்லினம்/இடையினம், திணை-பால், 8 வேற்றுமைகள், சந்திப் புணர்ச்சி விதிகள்.
- **சென்னைப் பல்கலைக்கழக தமிழ்ப் பேரகராதி (Tamil Lexicon)** மற்றும் **க்ரியாவின் தற்காலத் தமிழ் அகராதி** சொற்களஞ்சியம்.

⚙️ **3. தொழில்நுட்பம் & AI கட்டமைப்பு (How it was built):**
- **கல்வெட்டு AI OCR:** கல்வெட்டுப் படங்களை வாசிக்க Google Gemini Vision Multimodal மாதிரிகள்.
- **நகல் பரிசோதனை (Plagiarism):** தமிழ் எழுத்துருவிற்கான N-Gram Tokenizer மற்றும் TF-IDF வெக்டர் ஒப்பீட்டு முறைமை.
- **ஒலிப்பயிற்சி (TTS):** உலாவி சார்ந்த Web Speech API (ta-IN) மூலம் 247 எழுத்துகளுக்கும் எளிய உரையாடல்களுக்கும் துல்லியமான தமிழ் உச்சரிப்பு.`;
    }

    // 2. About App
    if (q.includes('செயலியைப் பற்றி') || q.includes('aurex') || q.includes('தமிழ் உலகம்') || q.includes('பற்றிச் சொல்') || q.includes('about app') || q.includes('about aurex')) {
      return lang === 'en'
        ? `🏛️ **Aurex - Tamil World e-Governance & Heritage Portal**

Official digital platform under the **Central Institute of Classical Tamil (CICT), Ministry of Education, Govt of India**.

🌟 **Key Modules & Features:**
1. 📜 **Inscription Analyzer (\`/kalvettu\`):** AI OCR tool to read Tamil-Brahmi, Vatteluttu, and ancient inscriptions.
2. 📚 **247 Tamil Alphabet Academy (\`/learn/letters\`):** Audio TTS pronunciation for all 247 Tamil letters.
3. 🎓 **Tamil Grammar Academy (\`/learn/grammar\`):** 5 core lessons covering Phonetics, Parts of Speech, Genders, Tenses, and Sentence Structure.
4. 💬 **Tamil Conversations (\`/learn/conversation\`):** Everyday Tamil-English phrases with native audio.
5. 🛡️ **Plagiarism Checker (\`/plagiarism\`):** N-Gram & TF-IDF similarity calculator for Tamil articles.
6. ✍️ **Spellchecker (\`/spellcheck\`):** AI & rule-based grammar and spelling corrector.
7. 🎮 **Epigraphy Games (\`/games\`):** Tamil Brahmi matching & historical quizzes.`
        : `🏛️ **Aurex - தமிழ் உலகம் மின்னாளுமை இணையவாசல் (Tamil World Portal)**

இந்திய அரசு **கல்வி அமைச்சகத்தின் செம்மொழித் தமிழாய்வு மத்திய நிறுவனத்தின் (CICT)** மின்னாளுமைத் திட்டங்களின் கீழ் உருவாக்கப்பட்ட ஒரு உயர்தர டிஜிட்டல் தளமாகும்.

🌟 **முக்கியக் கூறுகளும் சிறப்பம்சங்களும்:**
1. 📜 **கல்வெட்டு ஆய்வகம் (Epigraphy OCR Analyzer):** புகைப்படங்களில் உள்ள தமிழ் பிராமி, வட்டெழுத்து மற்றும் பழந்தமிழ்க் கல்வெட்டுகளை AI மூலம் வாசித்து, அரசர், காலம் மற்றும் செய்திகளைத் தரும்.
2. 📚 **247 தமிழ் எழுத்துகள் அகாடமி:** 12 உயிர், 18 மெய், 1 ஆய்தம், 216 உயிர்மெய் எழுத்துகள் ஒலி வடிவத்துடன்.
3. 🎓 **தமிழ் இலக்கணப் பயிலகம்:** எழுத்து, சொல், திணை-பால், காலங்கள் மற்றும் வாக்கிய அமைப்பு.
4. 💬 **எளிய உரையாடல்கள்:** அறிமுகம், பயணம், கடை, உணவகம் தமிழ்-ஆங்கில உரையாடல்கள்.
5. 🛡️ **தமிழ் கட்டுரை நகல் பரிசோதனை (Plagiarism Checker):** N-Gram & TF-IDF பகுப்பாய்வுத் தளம்.
6. ✍️ **தமிழ் பிழைதிருத்தி (Spellchecker):** இலக்கணப் பிழைகள் மற்றும் சந்திப்பிழைகளைச் சரிசெய்யும் கருவி.`;
    }

    // 3. Inscription Analyzer
    if (q.includes('கல்வெட்டு') || q.includes('inscription') || q.includes('kalvettu') || q.includes('ocr') || q.includes('புகைப்படம்')) {
      return lang === 'en'
        ? `📜 **Epigraphy & Inscription Analyzer (\`/kalvettu\`)**

Analyzes ancient stone inscriptions and copper plates using AI vision & OCR models.

✨ **How to Use:**
- Upload an inscription photo (Upload Image).
- AI automatically extracts text and detects **Dynasty (Ruler)**, **Century/Period**, **Donations**, and **Historical References**!`
        : `📜 **கல்வெட்டு ஆய்வகம் (Inscription Analyzer / \`/kalvettu\`)**

இவ்வசதி தமிழ்நாட்டின் தொன்மை வாய்ந்த கல்வெட்டுகளையும் செப்பேடுகளையும் AI தொழில்நுட்பம் மூலம் பகுப்பாய்வு செய்கிறது.

✨ **பயன்படுத்தும் முறை:**
- கல்வெட்டுப் புகைப்படத்தைப் பதிவேற்றவும் (Upload Inscription Image).
- AI அமைப்பானது **அரசர் (Dynasty)**, **காலம் (Century/Period)**, **கொடைச் செய்திகள் (Donations)** மற்றும் **தொல்லியல் சான்றுகளுடன்** விரிவான அறிக்கையைத் தரும்!`;
    }

    // 4. 247 Tamil Letters
    if (q.includes('247') || q.includes('letters') || q.includes('alphabet') || q.includes('எழுத்து') || q.includes('பிராமி') || q.includes('வட்டெழுத்து') || q.includes('brahmi')) {
      return lang === 'en'
        ? `📚 **Complete 247 Tamil Alphabet Academy (\`/learn/letters\`)**

Master all 247 Tamil letters with TTS audio pronunciation and filter tabs:
- **12 Vowels (Uyir)**
- **18 Consonants (Mei)**
- **1 Ayutham (ஃ)**
- **216 Combined Letters (Uyirmei)**
- **18 Consonant Series Filters (Ka, Cha, Ta, Tha, Pa, Zha, etc.)**`
        : `📚 **247 தமிழ் எழுத்துகள் முழுத் தொகுப்பு (\`/learn/letters\`)**

12 உயிரெழுத்துகள், 18 மெய்யெழுத்துகள், 1 ஆய்த எழுத்து, 216 உயிர்மெய் எழுத்துகள் ஆகிய 247 தமிழ் எழுத்துகளையும் ஒலிப்பயிற்சியுடன் கற்றுக்கொள்ளுங்கள். 18 உயிர்மெய் வர்க்கத் தெரிவு பொத்தான்களும் இதில் அடங்கும்.`;
    }

    // 5. Grammar Academy
    if (q.includes('grammar') || q.includes('இலக்கணம்') || q.includes('sov') || q.includes('tenses') || q.includes('gender') || q.includes('case') || q.includes('sandhi')) {
      return lang === 'en'
        ? `🎓 **Tamil Grammar Academy (\`/learn/grammar\`)**

Interactive 9 grammar modules with native audio examples:
1. **Phonetics & Letter Classification (Kuril/Nedil, Vallinam/Mellinam/Idaiyinam)**
2. **Parts of Speech (Noun, Verb, Particle, Adjective)**
3. **Class & Gender Rules (Uyarthinai, Ahrinai, 5 Genders)**
4. **Three Tenses (Past, Present, Future)**
5. **Tamil Sentence Structure (SOV Pattern)**
6. **8 Noun Cases & Suffixes (Vibhakti)**
7. **Word Fusion & Sandhi Rules (Insertion, Mutation, Elision)**
8. **Tamil Numerals & Glyphs (௧, ௨, ௩)**
9. **Questions & Negation Rules (Illai vs Alla)**`
        : `🎓 **தமிழ் இலக்கணப் பயிலகம் (\`/learn/grammar\`)**

9 விரிவான தமிழ் இலக்கணக் கோட்பாடுகள்:
1. எழுத்து இலக்கணம் (குறில்-நெடில் & வல்லினம்-மெல்லினம்-இடையினம்)
2. சொல் இலக்கணம் (பெயர், வினை, இடை, உரி)
3. திணை & பால் (உயர்திணை-அஃறிணை & ஐம்பால்கள்)
4. முக்காலம் (இறந்த, நிகழ், எதிர் காலம்)
5. தமிழ் வாக்கிய அமைப்பு (SOV Pattern)
6. வேற்றுமை உருபுகள் (8 வேற்றுமைகள்)
7. புணர்ச்சி & சந்தி விதிகள்
8. எண்ணுப்பெயர்கள் & தமிழ் எண்கள் (௧, ௨, ௩)
9. வினா & எதிர்மறை வாக்கியங்கள் (இல்லை vs அல்ல)`;
    }

    // 6. Conversations
    if (q.includes('conversation') || q.includes('உரையாடல்') || q.includes('greetings') || q.includes('phrases')) {
      return lang === 'en'
        ? `💬 **Everyday Tamil-English Conversations (\`/learn/conversation\`)**

Practice spoken Tamil phrases across key categories with native TTS audio & English translations:
1. **Greetings & Introductions**
2. **Asking Directions & Travel**
3. **Shopping & Dining**
4. **Asking for Help & Daily Phrases**`
        : `💬 **தமிழ்-ஆங்கில எளிய உரையாடல்கள் (\`/learn/conversation\`)**

அறிமுகம், வழிகேட்டல், கடை, உணவகம் மற்றும் அன்றாட சூழல்களில் பேசப்படும் தமிழ் வாக்கியங்களை ஆங்கில விளக்கத்துடன் ஒலி வடிவில் கேட்டுப் பயிற்சி செய்யுங்கள்.`;
    }

    // 7. Plagiarism Checker
    if (q.includes('நகல்') || q.includes('plagiarism') || q.includes('தனித்துவம்') || q.includes('திருட்டு')) {
      return lang === 'en'
        ? `🛡️ **Tamil Plagiarism Checker (\`/plagiarism\`)**

Evaluates originality score (0-100%) and detects copied lines in Tamil articles using N-Gram and TF-IDF similarity algorithms.`
        : `🛡️ **தமிழ் கட்டுரை நகல் பரிசோதனை (Plagiarism Checker / \`/plagiarism\`)**

தமிழ் கட்டுரைகள் மற்றும் ஆய்வேடுகளின் தனித்துவத்தைக் கணக்கிடும் தளம். 0% முதல் 100% வரை தனித்துவச் சான்றும் நகல் வரிகளின் பட்டியலையும் தரும்.`;
    }

    // 8. Spellchecker
    if (q.includes('பிழை') || q.includes('spell') || q.includes('சந்தி')) {
      return lang === 'en'
        ? `✍️ **Tamil Spell Checker & Grammar Corrector (\`/spellcheck\`)**

Checks Tamil spelling errors, grammar mistakes, and word sandhi rules using local rules and Gemini AI.`
        : `✍️ **தமிழ் பிழைதிருத்தி (Tamil Spellchecker / \`/spellcheck\`)**

தமிழ் சொற்கள் மற்றும் வாக்கியங்களில் உள்ள எழுத்துப் பிழைகள், சந்திப்பிழைகளைத் தானாகக் கண்டறியும் கருவி.`;
    }

    // 8.1 Tamil Typewriting Tutor
    if (q.includes('typing') || q.includes('தட்டச்சு') || q.includes('typewriting') || q.includes('tamil99') || q.includes('anjal') || q.includes('அஞ்சல்')) {
      return lang === 'en'
        ? `⌨️ **Tamil Typewriting Tutor (\`/learn/typing\`)**

Master Tamil typing with interactive real-time visual feedback:
1. ⌨️ **Two Layouts:** Tamil99 (தமிழ்99) and Anjal Phonetic (அஞ்சல்).
2. 🎯 **5 Practice Levels:**
   - Level 1: Letter Practice (எழுத்துப் பயிற்சி)
   - Level 2: Easy Words (எளிய சொற்கள்)
   - Level 3: Common Words (பொதுவான சொற்கள்)
   - Level 4: Sentence Practice (வாக்கியப் பயிற்சி)
   - Level 5: Timed Speed Challenge (நேரக் கட்டுப்பாட்டு சோதனை)
3. ⚡ **Live Metrics:** Real-time WPM, Accuracy %, and Character Highlighting.
4. 🏆 **7 Achievements & Daily 2-Min Challenge:** Track your best speed in local storage!`
        : `⌨️ **தமிழ் தட்டச்சுப் பயிற்சி (\`/learn/typing\`)**

தமிழ் தட்டச்சை எளிதாகக் கற்க உதவும் சிறப்புப் பயிலகம்:
1. ⌨️ **இரு விசைப்பலகை அமைப்புகள்:** தமிழ்99 (Tamil99) மற்றும் அஞ்சல் (Anjal).
2. 🎯 **5 பயிற்சி நிலைகள்:**
   - நிலை 1: எழுத்துப் பயிற்சி
   - நிலை 2: எளிய சொற்கள்
   - நிலை 3: பொதுவான சொற்கள்
   - நிலை 4: வாக்கியப் பயிற்சி
   - நிலை 5: நேரக் கட்டுப்பாட்டு சோதனை
3. ⚡ **நேரடி அளவீடுகள்:** உடனடி WPM வேகம், துல்லியம், மற்றும் விசைப்பலகை காட்சி.
4. 🏆 **7 சாதனைகள் & தினசரி 2 நிமிட சவால்:** உங்கள் வேகத்தை உள்ளூரிலேயே (localStorage) சேமிக்கும் வசதி.`;
    }

    // 9. Games
    if (q.includes('விளையாட்டு') || q.includes('game') || q.includes('புதிர்') || q.includes('quiz')) {
      return lang === 'en'
        ? `🎮 **Epigraphy & History Games (\`/games\`)**

Interactive educational games:
- **Tamil Brahmi Script Matching**
- **Historical Inscription Quiz**
- **Tamil Word Search Puzzle**`
        : `🎮 **கல்வெட்டு & தமிழ் வரலாற்று விளையாட்டுகள் (\`/games\`)**

பிராமி எழுத்துப் புதிர்கள், வரலாற்று கல்வெட்டு வினாடி-வினா மற்றும் தமிழ் சொல் தேடல் விளையாட்டுகள்.`;
    }

    // 10. API Key
    if (q.includes('api') || q.includes('key') || q.includes('சாவி') || q.includes('gemini')) {
      return lang === 'en'
        ? `🔑 **Gemini API Key Setup**

Configure your personal Gemini API key for unlimited AI operations:
1. Click **'API Key'** in the top navigation bar.
2. Get your free key at [Google AI Studio (aistudio.google.com)](https://aistudio.google.com/app/apikey).
3. Enter your \`AIzaSy...\` key and click **'Replace & Save'**.`
        : `🔑 **Gemini API Key அமைக்கும் முறை**

Aurex தளத்தில் AI பகுப்பாய்வு செய்ய உங்களின் சொந்த Gemini API Key-ஐப் பயன்படுத்தலாம்:
1. மேல்பட்டியில் உள்ள **'API Key'** பட்டனை அழுத்தவும்.
2. [Google AI Studio (aistudio.google.com)](https://aistudio.google.com/app/apikey) தளத்திற்குச் சென்று இலவச API சாவி பெறவும்.
3. பெற்ற சாவியை உள்ளிட்டு **'Replace & Save'** அழுத்தவும்.`;
    }

    // Default intelligent fallback
    return lang === 'en'
      ? `🏛️ **Aurex AI Response:**

Your Inquiry: *"${userQuery}"*

Core modules available in Aurex Portal:
1. 👨‍💻 **Creators Info:** Built by Dhivakar, Anishruban, and Jason for CICT.
2. 📜 **Inscription Analyzer (\`/kalvettu\`):** AI OCR for ancient inscriptions.
3. 📚 **247 Tamil Letters (\`/learn/letters\`):** Full alphabet with audio.
4. 🎓 **Tamil Grammar (\`/learn/grammar\`):** Grammar rules & SOV sentence structure.
5. 💬 **Conversations (\`/learn/conversation\`):** Everyday Tamil-English phrases.
6. 🛡️ **Plagiarism Checker (\`/plagiarism\`):** Originality meter & report.
7. ✍️ **Spell Checker (\`/spellcheck\`):** AI grammar & spelling corrector.

Click any button below or ask more questions!`
      : `🏛️ **Aurex AI உதவி பதில்:**

உங்களின் கேள்வி: *"${userQuery}"*

Aurex தமிழ் உலகம் மின்னாளுமைத் தளத்தில் உள்ள பிரதான தொகுதிகள்:
1. 👨‍💻 **உருவாக்கியவர்கள்:** Dhivakar, Anishruban, Jason (CICT)
2. 📜 **கல்வெட்டு ஆய்வகம் (\`/kalvettu\`)** - கல்வெட்டு வாசிப்பு
3. 📚 **247 தமிழ் எழுத்துகள் (\`/learn/letters\`)** - ஒலிப்பயிற்சி
4. 🎓 **தமிழ் இலக்கணம் (\`/learn/grammar\`)** - இலக்கண விதிகள்
5. 💬 **எளிய உரையாடல்கள் (\`/learn/conversation\`)** - தமிழ்-ஆங்கில உரையாடல்
6. 🛡️ **நகல் பரிசோதனை (\`/plagiarism\`)** - Plagiarism Checker
7. ✍️ **தமிழ் பிழைதிருத்தி (\`/spellcheck\`)** - Spell Checker

கூடுதல் விவரங்களுக்கு மேலே உள்ள பொத்தான்களை அழுத்தவும்!`;
  };

  const handleSend = async (customText?: string) => {
    const textToSend = customText || inputText.trim();
    if (!textToSend) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputText('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const botResponseText = getAppKnowledgeResponse(textToSend);

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickReplies: lang === 'en' ? [
          '👨‍💻 Who built this Aurex app?',
          '📜 How Inscription Analyzer works',
          '📚 247 Tamil Letters with Audio',
          '🎓 Learn Tamil Grammar & Rules',
          '💬 Everyday Tamil-English Conversations',
          '🔑 API Key Setup'
        ] : [
          '👨‍💻 Aurex செயலியை உருவாக்கியவர்கள் யார்?',
          '📜 கல்வெட்டு ஆய்வகம் பற்றி',
          '📚 247 தமிழ் எழுத்துகள் ஒலிப்பயிற்சி',
          '🎓 தமிழ் இலக்கணப் பயிலகம்',
          '💬 எளிய தமிழ்-ஆங்கில உரையாடல்கள்',
          '🔑 API Key அமைப்பது எப்படி?'
        ]
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 500);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text.replace(/[*#]/g, ''));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (id: string, text: string) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking === id) {
        window.speechSynthesis.cancel();
        setIsSpeaking(null);
        return;
      }
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[*#🏛️📜𑀅🛡️✍️🎮🔑✨⚡🎯🌟]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'ta-IN';
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(null);
      utterance.onerror = () => setIsSpeaking(null);
      setIsSpeaking(id);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <>
      {/* Floating Action Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3">
        
        {!isOpen && hasUnread && (
          <div className="hidden sm:flex items-center space-x-2 bg-[#581515] text-amber-300 px-3.5 py-2 rounded-2xl shadow-xl border-2 border-[#C89551] text-xs font-black animate-bounce">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{lang === 'en' ? 'Aurex AI Assistant!' : 'Aurex AI உதவி மையம்!'}</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#581515] via-[#800000] to-[#420f0f] border-2 border-[#C89551] text-amber-300 shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 cursor-pointer relative group ${
            isOpen ? 'rotate-90' : ''
          }`}
          title="Aurex AI Assistant"
        >
          {isOpen ? (
            <X className="w-7 h-7 text-amber-300" />
          ) : (
            <div className="relative">
              <Bot className="w-8 h-8 text-amber-300 group-hover:animate-pulse" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
          )}
        </button>
      </div>

      {/* Floating Chat Modal Box */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[80vh] bg-white rounded-3xl shadow-2xl border-2 border-[#C89551] z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
          
          {/* Header Banner - Heritage Maroon & Gold */}
          <div className="bg-gradient-to-r from-[#581515] via-[#420f0f] to-[#581515] text-white p-4 flex items-center justify-between border-b-2 border-[#C89551] shadow-md">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0 shadow-inner">
                <Bot className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <h3 className="font-black text-sm text-[#fbf7f0] flex items-center space-x-1.5 leading-tight">
                  <span>{lang === 'en' ? 'Aurex AI Support' : 'Aurex AI உதவி மையம்'}</span>
                  <span className="bg-amber-400 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded uppercase">
                    PRO
                  </span>
                </h3>
                <p className="text-[11px] text-amber-200/80 font-medium">
                  {lang === 'en' ? 'Tamil Epigraphy & Portal Assistant' : 'தமிழ் கல்வெட்டு & தளம் பற்றிய அனைத்து விவரங்களும்'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => setIsKeyModalOpen(true)}
                className="p-1.5 text-amber-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                title="Configure API Key"
              >
                <Key className="w-4 h-4 text-amber-300" />
              </button>
              
              <button
                onClick={() => {
                  setMessages(initialMessages);
                }}
                className="p-1.5 text-amber-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                title="Reset Chat"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-amber-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#fbf7f0]/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed font-medium shadow-sm space-y-2 ${
                    msg.sender === 'user'
                      ? 'bg-[#581515] text-amber-50 rounded-br-none border border-[#800000]'
                      : 'bg-white text-slate-800 border-2 border-[#e6dac8] rounded-bl-none'
                  }`}
                >
                  {/* Formatted Content */}
                  <div className="whitespace-pre-wrap font-sans">
                    {msg.text.split('\n').map((line, lIdx) => {
                      if (line.startsWith('🏛️') || line.startsWith('📜') || line.startsWith('𑀅') || line.startsWith('🛡️') || line.startsWith('✍️') || line.startsWith('🎮') || line.startsWith('🔑')) {
                        return (
                          <div key={lIdx} className="font-extrabold text-[#581515] text-sm my-1 pt-1 border-t border-slate-100">
                            {line}
                          </div>
                        );
                      }
                      return (
                        <p key={lIdx} className={line.startsWith('-') ? 'pl-3 font-semibold' : ''}>
                          {line}
                        </p>
                      );
                    })}
                  </div>

                  {/* Actions for Bot Message: Speech & Copy */}
                  {msg.sender === 'bot' && (
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-400">
                      <span className="font-mono text-[10px]">{msg.timestamp}</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleSpeak(msg.id, msg.text)}
                          className="p-1 hover:text-[#581515] transition-colors cursor-pointer"
                          title="Listen Speech"
                        >
                          {isSpeaking === msg.id ? (
                            <VolumeX className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
                          ) : (
                            <Volume2 className="w-3.5 h-3.5 text-slate-500" />
                          )}
                        </button>
                        <button
                          onClick={() => handleCopy(msg.id, msg.text)}
                          className="p-1 hover:text-[#581515] transition-colors cursor-pointer"
                          title="Copy Answer"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 text-slate-500" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {msg.sender === 'user' && (
                    <div className="text-[10px] opacity-75 text-right font-mono pt-1">
                      {msg.timestamp}
                    </div>
                  )}
                </div>

                {/* Quick Reply Chips */}
                {msg.quickReplies && msg.quickReplies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[90%]">
                    {msg.quickReplies.map((qr, qIdx) => (
                      <button
                        key={qIdx}
                        onClick={() => handleSend(qr)}
                        className="bg-white hover:bg-[#581515] text-[#581515] hover:text-white border border-[#C89551] text-[11px] font-extrabold px-3 py-1.5 rounded-full shadow-xs transition-all cursor-pointer text-left transform active:scale-95"
                      >
                        {qr}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-2 bg-white border border-[#e6dac8] p-3 rounded-2xl w-28">
                <Loader2 className="w-4 h-4 animate-spin text-[#581515]" />
                <span className="text-xs font-bold text-slate-500">{lang === 'en' ? 'Thinking...' : 'பதிலளிக்கிறது...'}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Bar */}
          <div className="p-3 bg-white border-t-2 border-[#e6dac8]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={lang === 'en' ? "Ask about Aurex portal..." : "Aurex தளம் பற்றிக் கேட்கவும்..."}
                className="flex-1 bg-[#fbf7f0] border border-slate-300 focus:border-[#581515] text-slate-900 font-medium text-xs sm:text-sm p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#581515]/10 transition-all"
              />

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="bg-[#581515] hover:bg-[#3f0e0e] text-amber-300 p-3 rounded-2xl transition-transform active:scale-95 cursor-pointer disabled:opacity-40 shrink-0"
              >
                <Send className="w-4 h-4 text-amber-300" />
              </button>
            </form>
          </div>

        </div>
      )}

      {/* API Key Modal launcher from Chatbot */}
      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        onSaveKey={(key) => console.log('Key saved in chatbot:', key)}
      />
    </>
  );
}
