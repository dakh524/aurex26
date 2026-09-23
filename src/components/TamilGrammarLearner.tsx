"use client";

import React, { useState } from 'react';
import { BookOpen, Sparkles, CheckCircle2, Volume2, ArrowRight, Layers } from 'lucide-react';
import { speakTamilText } from '@/lib/audioTTS';
import { useLanguage } from '@/lib/LanguageContext';

interface GrammarLesson {
  id: string;
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  description: string;
  descriptionEn: string;
  badge: string;
  badgeEn: string;
  sections: {
    heading: string;
    headingEn: string;
    explanation: string;
    explanationEn: string;
    examples: { tamil: string; transliteration: string; english: string }[];
  }[];
}

const GRAMMAR_LESSONS: GrammarLesson[] = [
  {
    id: "g1",
    title: "1. எழுத்து இலக்கணம்",
    titleEn: "1. Phonetics & Letter Classification",
    subtitle: "குறில் - நெடில் & வல்லினம் - மெல்லினம் - இடையினம்",
    subtitleEn: "Short/Long Vowels & Hard/Soft/Medium Consonants",
    description: "தமிழ் எழுத்துகளின் ஒலி அளவு (மாத்திரை) மற்றும் ஒலிக்கும் தன்மையின் அடிப்படையில் பிரிக்கப்படும் வகைகள்.",
    descriptionEn: "Classification of Tamil letters based on phonetic duration (Matrai) and vocal sound groups.",
    badge: "அடிப்படை எழுத்து வகை",
    badgeEn: "Letter Phonetics",
    sections: [
      {
        heading: "குறில் & நெடில் எழுத்துகள் (Short & Long Vowels)",
        headingEn: "Short & Long Vowels (Kuril & Nedil)",
        explanation: "குறுகிய ஒலியுடைய எழுத்துகள் குறில் எனப்படும் (1 மாத்திரை). நீண்ட ஒலியுடைய எழுத்துகள் நெடில் எனப்படும் (2 மாத்திரை).",
        explanationEn: "Letters pronounced with a short duration are called Kuril (1 unit/matrai). Letters with a prolonged sound are Nedil (2 units/matrai).",
        examples: [
          { tamil: "குறில் (Short): அ, இ, உ, எ, ஒ", transliteration: "a, i, u, e, o", english: "Short vowels spoken in 1 second" },
          { tamil: "நெடில் (Long): ஆ, ஈ, ஊ, ஏ, ஐ, ஓ, ஔ", transliteration: "aa, ee, oo, ae, ai, oo, au", english: "Long vowels spoken in 2 seconds" }
        ]
      },
      {
        heading: "மெய்யெழுத்து மூவகை (Three Consonant Groups)",
        headingEn: "Three Consonant Groups (Vallinam, Mellinam, Idaiyinam)",
        explanation: "18 மெய்யெழுத்துகளும் ஒலிக்கும் வன்மையின் அடிப்படையில் வல்லினம், மெல்லினம், இடையினம் என மூவகையாகப் பிரிக்கப்படும்.",
        explanationEn: "All 18 consonants are classified into Hard, Nasal Soft, and Middle vocal sounds.",
        examples: [
          { tamil: "வல்லினம் (Hard): க், ச், ட், த், ப், ற்", transliteration: "k, ch, t, th, p, r", english: "Strong chest-based sounds (K, Ch, T, Th, P, R)" },
          { tamil: "மெல்லினம் (Soft): ங், ஞ், ண், ந், ம், ன்", transliteration: "ng, nj, n, nth, m, nn", english: "Nasal soft sounds (Ng, Nj, N, M)" },
          { tamil: "இடையினம் (Medium): ய், ர், ல், வ், ழ், ள்", transliteration: "y, r, l, v, zha, lh", english: "Middle-range vocal sounds (Y, R, L, V, Zha)" }
        ]
      }
    ]
  },
  {
    id: "g2",
    title: "2. சொல் இலக்கணம்",
    titleEn: "2. Parts of Speech & Word Types",
    subtitle: "பெயர்ச்சொல், வினைச்சொல், இடைச்சொல், உரிச்சொல்",
    subtitleEn: "Noun, Verb, Particle, Adjective / Adverb",
    description: "தமிழில் சொற்கள் நான்கு முதன்மை வகைகளாகப் பிரிக்கப்படுகின்றன.",
    descriptionEn: "Tamil vocabulary is divided into 4 primary functional categories.",
    badge: "சொல் வகைகள்",
    badgeEn: "Parts of Speech",
    sections: [
      {
        heading: "1. பெயர்ச்சொல் (Noun) & 2. வினைச்சொல் (Verb)",
        headingEn: "1. Nouns (Peyarchol) & 2. Verbs (Vinaichol)",
        explanation: "ஒன்றன் பெயரைக் குறிக்கும் சொல் பெயர்ச்சொல். ஒரு பொருளினுடைய தொழிலைக் குறிக்கும் சொல் வினைச்சொல்.",
        explanationEn: "A word denoting the name of a person, place, or thing is a Noun. A word representing an action is a Verb.",
        examples: [
          { tamil: "பெயர்ச்சொல்: அருண், சென்னை, புத்தகம், தமிழ்", transliteration: "Noun Examples", english: "Arun (Person), Chennai (Place), Book (Thing)" },
          { tamil: "வினைச்சொல்: படித்தான், ஓடினாள், பாடுகிறான்", transliteration: "Verb Examples", english: "Read (Past), Ran (Past), Sings (Present)" }
        ]
      },
      {
        heading: "3. இடைச்சொல் (Particle) & 4. உரிச்சொல் (Adjective / Adverb)",
        headingEn: "3. Particles (Idaichol) & 4. Adjectives/Adverbs (Urichol)",
        explanation: "பெயரையும் வினையையும் சார்ந்து வரும் சொல் இடைச்சொல். சொல்லின் தன்மையை உயர்த்தி அல்லது மிகுத்துக் கூறும் சொல் உரிச்சொல்.",
        explanationEn: "Particles modify or link nouns and verbs. Adjectives highlight or intensify word meaning.",
        examples: [
          { tamil: "இடைச்சொல்: ராமனும் லக்ஷ்மணனும் ('உம்' இடைச்சொல்)", transliteration: "Particle Examples", english: "Raman and Lakshmanan ('um' = and)" },
          { tamil: "உரிச்சொல்: மாநகர் (பெரிய நகரம்), சாலச்சிறந்தது", transliteration: "Adjective Examples", english: "Maanagar (Great City), Saalachirandhadhu (Extremely excellent)" }
        ]
      }
    ]
  },
  {
    id: "g3",
    title: "3. திணை & பால்",
    titleEn: "3. Class & Gender Rules",
    subtitle: "உயர்திணை - அஃறிணை & ஐம்பால்கள்",
    subtitleEn: "Human/Non-Human Classes & 5 Gender Rules",
    description: "தமிழ் மொழியில் உயிருள்ள மனிதர்கள் மற்றும் பிற பொருட்களைப் பிரிக்கும் மரபு நெறிமுறை.",
    descriptionEn: "Grammatical classification distinguishing human/rational beings from non-human objects.",
    badge: "திணை & பால்",
    badgeEn: "Class & Gender",
    sections: [
      {
        heading: "இரு திணைகள் (Two Main Classes)",
        headingEn: "Two Main Classes (Uyarthinai & Ahrinai)",
        explanation: "பகுத்தறிவுள்ள மனிதர்கள் மற்றும் தெய்வங்கள் 'உயர்திணை' எனப்படும். விலங்குகள், தாவரங்கள், பொருட்கள் 'அஃறிணை' எனப்படும்.",
        explanationEn: "Humans and celestial beings belong to Uyarthinai. Animals, plants, and inanimate objects belong to Ahrinai.",
        examples: [
          { tamil: "உயர்திணை: அரசன், மாணவி, ஆசிரியர்", transliteration: "Uyarthinai", english: "Humans, King, Student, Teacher" },
          { tamil: "அஃறிணை: மரம், யானை, கல்வெட்டு, ஆறு", transliteration: "Ahrinai", english: "Non-humans, Trees, Elephant, Inscriptions, River" }
        ]
      },
      {
        heading: "ஐந்து பால்கள் (Five Genders)",
        headingEn: "Five Gender Sub-categories (Aanpaal, Penpaal, etc.)",
        explanation: "உயர்திணை 3 பால்களையும், அஃறிணை 2 பால்களையும் கொண்டுள்ளது.",
        explanationEn: "Uyarthinai splits into Masculine, Feminine, and Plural Human. Ahrinai splits into Neuter Singular and Neuter Plural.",
        examples: [
          { tamil: "ஆண்பால் (Masculine): அவன், தம்பி", transliteration: "Aanpaal", english: "He, Brother" },
          { tamil: "பெண்பால் (Feminine): அவள், தங்கை", transliteration: "Penpaal", english: "She, Sister" },
          { tamil: "பலர்பால் (Plural Human): அவர்கள், மக்கள்", transliteration: "Palarpaal", english: "They, People" },
          { tamil: "ஒன்றன்பால் (Singular Neuter): அது, மாடு", transliteration: "Ondranpaal", english: "It, Cow (Singular)" },
          { tamil: "பலவின்பால் (Plural Neuter): அவை, பறவைகள்", transliteration: "Palavinpaal", english: "They, Birds (Plural Neuter)" }
        ]
      }
    ]
  },
  {
    id: "g4",
    title: "4. முக்காலம்",
    titleEn: "4. Three Tenses (Past, Present, Future)",
    subtitle: "இறந்த காலம், நிகழ் காலம், எதிர் காலம்",
    subtitleEn: "Past Tense, Present Tense, Future Tense",
    description: "செயல் நடைபெற்ற காலத்தைக் குறிக்கும் மூவகை இலக்கண அமைப்புகள்.",
    descriptionEn: "Grammatical structures indicating when an action takes place.",
    badge: "காலங்கள்",
    badgeEn: "Tenses",
    sections: [
      {
        heading: "மூன்று காலங்கள் ஒப்பீடு (Three Tenses Comparison)",
        headingEn: "Comparison of 3 Tenses",
        explanation: "வினைச்சொல்லின் விகுதியை (Suffix) வைத்து காலம் தீர்மானிக்கப்படுகிறது.",
        explanationEn: "Tense is determined by verb suffixes.",
        examples: [
          { tamil: "இறந்த காலம் (Past): நான் படித்தேன்", transliteration: "Naan padithaen", english: "I read (Completed action)" },
          { tamil: "நிகழ் காலம் (Present): நான் படிக்கிறேன்", transliteration: "Naan padikkiraen", english: "I am reading (Ongoing action)" },
          { tamil: "எதிர் காலம் (Future): நான் படிப்பேன்", transliteration: "Naan padippaen", english: "I will read (Upcoming action)" }
        ]
      }
    ]
  },
  {
    id: "g5",
    title: "5. தமிழ் வாக்கிய அமைப்பு",
    titleEn: "5. Tamil Sentence Structure (SOV Pattern)",
    subtitle: "எழுவாய் + செயப்படுபொருள் + பயனிலை",
    subtitleEn: "Subject + Object + Verb Pattern",
    description: "ஆங்கிலத்திற்கும் தமிழுக்கும் உள்ள வாக்கிய வரிசை வேறுபாடு.",
    descriptionEn: "Understanding sentence word order differences between English and Tamil.",
    badge: "வாக்கிய அமைப்பு",
    badgeEn: "Sentence Structure",
    sections: [
      {
        heading: "SOV Pattern (Subject - Object - Verb)",
        headingEn: "Subject - Object - Verb (SOV) Pattern",
        explanation: "ஆங்கிலத்தில் Verb நடுவில் வரும் (SVO). தமிழில் Verb (பயனிலை) எப்போதும் வாக்கியத்தின் இறுதியில் மட்டுமே வரும் (SOV).",
        explanationEn: "In English verbs come in the middle (SVO). In Tamil, verbs always come at the very end of the sentence (SOV).",
        examples: [
          { tamil: "ஆங்கில நடை (SVO): I (Subject) eat (Verb) an apple (Object).", transliteration: "English: SVO Pattern", english: "Subject -> Verb -> Object" },
          { tamil: "தமிழ் நடை (SOV): நான் (எழுவாய்) ஆப்பிள் (செயப்படுபொருள்) சாப்பிடுகிறேன் (பயனிலை).", transliteration: "Naan apple saappidugiraen", english: "Subject -> Object -> Verb" }
        ]
      }
    ]
  },
  {
    id: "g6",
    title: "6. வேற்றுமை உருபுகள்",
    titleEn: "6. Noun Cases & Suffixes (Vibhakti)",
    subtitle: "8 வேற்றுமைகள் (ஐ, ஆல், கு, இன், அது, கண்)",
    subtitleEn: "8 Tamil Noun Cases (Object, Instrumental, Dative, Possessive, etc.)",
    description: "பெயர்ச்சொல்லின் பொருளை வேறுபடுத்தி காட்டும் 8 வகை வேற்றுமை உருபுகள்.",
    descriptionEn: "The 8 grammatical case markers modifying noun meanings and relationships in sentences.",
    badge: "வேற்றுமை உருபுகள்",
    badgeEn: "Noun Cases",
    sections: [
      {
        heading: "பிரதான வேற்றுமை உருபுகள் (Core Case Markers)",
        headingEn: "Primary Tamil Case Suffixes",
        explanation: "தமிழில் 8 வேற்றுமைகள் உண்டு. முதல் வேற்றுமைக்கும் எட்டாம் வேற்றுமைக்கும் உருபுகள் இல்லை.",
        explanationEn: "Tamil features 8 noun cases. The 1st (Nominative) and 8th (Vocative) have no special case markers.",
        examples: [
          { tamil: "2-ஆம் வேற்றுமை (ஐ - Object): ராமன் புத்தகத்தை (புத்தகம் + ஐ) படித்தான்", transliteration: "Puthagathai (Book + ai)", english: "Raman read the book (Direct Object)" },
          { tamil: "3-ஆம் வேற்றுமை (ஆல் - Instrumental): கத்தியால் (கத்தி + ஆல்) வெட்டினான்", transliteration: "Kathiyaal (Knife + aal)", english: "Cut with a knife (Instrumental)" },
          { tamil: "4-ஆம் வேற்றுமை (கு - Dative): தம்பிக்கு (தம்பி + கு) கொடுத்தான்", transliteration: "Thambikku (Brother + ku)", english: "Gave to brother (Dative / To)" },
          { tamil: "6-ஆம் வேற்றுமை (அது - Possessive): எனது (என் + அது) வீடு", transliteration: "Enadhu (My / Mine)", english: "My house (Possessive / Of)" },
          { tamil: "7-ஆம் வேற்றுமை (இல்/மேல் - Locative): மேஜை மேல் (மேஜை + மேல்) புத்தகம் உள்ளது", transliteration: "Mejai mael", english: "Book is on the table (Locative / Location)" }
        ]
      }
    ]
  },
  {
    id: "g7",
    title: "7. புணர்ச்சி & சந்தி விதிகள்",
    titleEn: "7. Word Fusion & Sandhi Rules",
    subtitle: "தோன்றல், திரிதல், கெடுதல் & வல்லினம் மிகுதல்",
    subtitleEn: "Insertion, Mutation, Elision & Consonant Doubling",
    description: "இரண்டு சொற்கள் இணையும் போது ஏற்படும் ஒலி மாற்றங்கள் மற்றும் எழுத்துப் புணர்ச்சி விதிகள்.",
    descriptionEn: "Phonetic transformation rules when two words combine together in spoken & written Tamil.",
    badge: "புணர்ச்சி விதிகள்",
    badgeEn: "Sandhi Rules",
    sections: [
      {
        heading: "விகாரப் புணர்ச்சி மூவகை (Three Sound Alterations)",
        headingEn: "Three Types of Morphological Alterations",
        explanation: "நிலைமொழியும் வருமொழியும் புணரும் போது ஏற்படும் மாற்றங்கள்: தோன்றல் (புதிய எழுத்து வருவது), திரிதல் (வேறு எழுத்து ஆவது), கெடுதல் (எழுத்து மறைவது).",
        explanationEn: "Sound transformations upon joining: Insertion (new sound), Mutation (sound alteration), Elision (deletion of sound).",
        examples: [
          { tamil: "தோன்றல் (Insertion): தமிழ் + தாய் = தமிழ்த்தாய் ('த்' தோன்றியது)", transliteration: "Thamizhtthaai", english: "Tamil + Thaai = Thamizhtthaai (New 'th' inserted)" },
          { tamil: "திரிதல் (Mutation): பல் + பொடி = பற்பொடி ('ல்' மெய் 'ற்' ஆகத் திரிந்தது)", transliteration: "Parpodi", english: "Pal + Podi = Parpodi ('l' changed to 'r')" },
          { tamil: "கெடுதல் (Elision): மரம் + வேர் = மரவேர் ('ம்' எழுத்து கெட்டது)", transliteration: "Maravaer", english: "Maram + Vaer = Maravaer ('m' dropped completely)" }
        ]
      },
      {
        heading: "வல்லினம் மிகும் இடங்கள் (Doubling of Hard Consonants க், ச், த், ப்)",
        headingEn: "Doubling of Hard Consonants (K, Ch, Th, P)",
        explanation: "அங்கு, இங்கு, எந்த, அந்த போன்ற சொற்களுக்குப் பின் வரும் வல்லின எழுத்துகள் மெய் எழுத்துகளாக இரட்டிக்கும்.",
        explanationEn: "Words following demonstratives like 'andha' (that) or 'indha' (this) double their initial hard consonant sound.",
        examples: [
          { tamil: "அந்த + பையன் = அந்தப் பையன் ('ப்' இரட்டித்தது)", transliteration: "Andhap paiyan", english: "That boy (Consonant 'p' doubled)" },
          { tamil: "எந்த + புத்தகம் = எந்தப் புத்தகம் ('ப்' இரட்டித்தது)", transliteration: "Indhap puthagam", english: "Which book? (Consonant 'p' doubled)" }
        ]
      }
    ]
  },
  {
    id: "g8",
    title: "8. எண்ணுப்பெயர்கள் & தமிழ் எண்கள்",
    titleEn: "8. Tamil Numerals & Counting Rules",
    subtitle: "எண்ணிக்கை சொற்கள் & தொன்மைத் தமிழ் எண்கள் (௧, ௨, ௩)",
    subtitleEn: "Numbers, Ordinals, and Ancient Tamil Numeral Symbols",
    description: "தமிழில் எண்களை எழுதும் முறைகளும் பழந்தமிழ்ப் பயன்பாட்டு குறியீடுகளும்.",
    descriptionEn: "Tamil number terms, ordinal modifiers, and ancient Tamil epigraphical numerals.",
    badge: "தமிழ் எண்கள்",
    badgeEn: "Numerals",
    sections: [
      {
        heading: "எண்களும் தொன்மைத் தமிழ் குறியீடுகளும் (Numerals & Ancient Glyphic Numerals)",
        headingEn: "Tamil Numbers & Script Glyphs",
        explanation: "தமிழில் ஒவ்வொரு எண்ணுக்கும் தனித்துவமான பழந்தமிழ்ப் பிராமி/வட்டெழுத்துக் குறியீடுகள் உண்டு.",
        explanationEn: "Each digit has a unique ancient numeral character used in classical epigraphy.",
        examples: [
          { tamil: "1 = ஒன்று (௧), 2 = இரண்டு (௨), 3 = மூன்று (௩)", transliteration: "Ondru (1), Irandu (2), Moondru (3)", english: "Numbers 1, 2, 3 with ancient Tamil glyphs" },
          { tamil: "4 = நான்கு (௪), 5 = ஐந்து (௫), 10 = பத்து (௰)", transliteration: "Naangu (4), Aindhu (5), Pathu (10)", english: "Numbers 4, 5, 10 with ancient Tamil glyphs" },
          { tamil: "வரிசை எண்கள் (Ordinals): முதல் (First), இரண்டாவது (Second), மூன்றாவது (Third)", transliteration: "Mudhal, Irandavadhu, Moondravadhu", english: "1st, 2nd, 3rd position modifiers" }
        ]
      }
    ]
  },
  {
    id: "g9",
    title: "9. வினா & எதிர்மறை வாக்கியங்கள்",
    titleEn: "9. Questions & Negative Sentences",
    subtitle: "வினாச் சொற்கள் & இல்லை vs அல்ல விதிகள்",
    subtitleEn: "Interrogative Words & Negation Rules (Illai vs Alla)",
    description: "கேள்விகள் கேட்கும் முறைகளும் எதிர்மறைக் கருத்துகளை வெளிப்படுத்தும் இலக்கண விதிகளும்.",
    descriptionEn: "Forming questions and expressing negative concepts correctly using 'Illai' and 'Alla'.",
    badge: "வினா & எதிர்மறை",
    badgeEn: "Questions & Negation",
    sections: [
      {
        heading: "வினாச் சொற்கள் (Interrogative Question Words)",
        headingEn: "Question Words (Vinaachorkal)",
        explanation: "தமிழில் வினா எழுத்துகள்: எ, ஏ, யா, ஆ, ஓ.",
        explanationEn: "Tamil question starters and question suffix markers.",
        examples: [
          { tamil: "என்ன (What?): உங்கள் பெயர் என்ன?", transliteration: "Ungal peyar enna?", english: "What is your name?" },
          { tamil: "எங்கே (Where?): நூலகம் எங்கே உள்ளது?", transliteration: "Noolagam engae ulladhu?", english: "Where is the library?" },
          { tamil: "எப்போது (When?): ரயில் எப்போது வரும்?", transliteration: "Train eppodhu varum?", english: "When will the train arrive?" },
          { tamil: "ஏன் (Why?): ஏன் தாமதம்?", transliteration: "Aen thaamatham?", english: "Why the delay?" }
        ]
      },
      {
        heading: "எதிர்மறை விதிகள்: இல்லை vs அல்ல (Illai vs Alla)",
        headingEn: "Negation Rules: Illai (Non-existence) vs Alla (Non-identity)",
        explanation: "'இல்லை' என்பது பொருளோ செயலா இல்லை என்பதைக் குறிக்கும். 'அல்ல' என்பது ஒரு பொருளின் தன்மையை மறுப்பதைக் குறிக்கும்.",
        explanationEn: "'Illai' denotes absence or non-existence of a thing/action. 'Alla' denies identity ('is not this').",
        examples: [
          { tamil: "இல்லை (Absence): என்னிடம் பணம் இல்லை.", transliteration: "Ennidham panam illai", english: "I do not have money (Non-existence)" },
          { tamil: "அல்ல (Non-identity): இது என் புத்தகம் அல்ல.", transliteration: "Idhu en puthagam alla", english: "This is not my book (Identity denial)" }
        ]
      }
    ]
  }
];

export default function TamilGrammarLearner() {
  const { lang } = useLanguage();
  const [activeLessonId, setActiveLessonId] = useState<string>("g1");
  const [speakingText, setSpeakingText] = useState<string | null>(null);

  const activeLesson = GRAMMAR_LESSONS.find(g => g.id === activeLessonId) || GRAMMAR_LESSONS[0];

  const handleSpeak = (text: string) => {
    setSpeakingText(text);
    speakTamilText(text, () => {
      setSpeakingText(null);
    });
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Title Banner */}
      <div className="bg-gradient-to-r from-[#581515] via-[#420f0f] to-[#581515] text-white p-6 sm:p-10 rounded-3xl shadow-xl border border-amber-900/40 space-y-3">
        <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-200 border border-amber-400/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-amber-300" />
          <span>{lang === 'en' ? 'Tamil Grammar Academy' : 'தமிழ் இலக்கணப் பயிலகம் • Tamil Grammar Academy'}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-[#fbf7f0] font-serif">
          {lang === 'en' ? 'Learn Tamil Grammar' : 'தமிழ் இலக்கணம் (Learn Tamil Grammar)'}
        </h2>
        <p className="text-amber-100/90 text-xs sm:text-base font-semibold max-w-3xl">
          {lang === 'en'
            ? 'Learn Tamil grammar rules including Phonetics, Parts of Speech, Class & Gender, Tenses, and Sentence Structure with easy examples.'
            : 'எழுத்து, சொல், திணை-பால், காலங்கள் மற்றும் வாக்கிய அமைப்பு ஆகிய தமிழ் இலக்கண விதிகளை எளிய எடுத்துக்காட்டுகளுடன் கற்றுக்கொள்ளுங்கள்.'}
        </p>
      </div>

      {/* Main Grid: Lesson Sidebar + Lesson Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sidebar: Lesson Navigation Tabs */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#581515] px-2 flex items-center space-x-1.5">
            <Layers className="w-4 h-4 text-[#581515]" />
            <span>{lang === 'en' ? 'Grammar Modules' : 'இலக்கணப் பாடங்கள் (Grammar Modules)'}</span>
          </h3>

          <div className="space-y-2">
            {GRAMMAR_LESSONS.map((lesson) => {
              const isActive = lesson.id === activeLessonId;
              return (
                <button
                  key={lesson.id}
                  onClick={() => setActiveLessonId(lesson.id)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-[#581515] text-white border-[#C89551] shadow-lg'
                      : 'bg-white text-slate-800 border-[#e7dcd0] hover:border-[#581515] hover:bg-[#fcf8f2]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                      isActive ? 'bg-amber-400 text-slate-950' : 'bg-[#f4ece1] text-[#581515]'
                    }`}>
                      {lang === 'en' ? lesson.badgeEn : lesson.badge}
                    </span>
                    {isActive && <CheckCircle2 className="w-4 h-4 text-amber-300" />}
                  </div>

                  <h4 className="text-base font-extrabold mt-2 font-serif leading-snug">
                    {lang === 'en' ? lesson.titleEn : lesson.title}
                  </h4>
                  <p className={`text-xs mt-1 font-medium ${isActive ? 'text-amber-100/80' : 'text-slate-500'}`}>
                    {lang === 'en' ? lesson.subtitleEn : lesson.subtitle}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Lesson Detail Area */}
        <div className="lg:col-span-8 bg-white border-2 border-[#e7dcd0] rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
          
          <div className="border-b border-[#e7dcd0] pb-4 space-y-2">
            <div className="inline-flex items-center space-x-1.5 bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full text-xs font-black">
              <span>{lang === 'en' ? activeLesson.badgeEn : activeLesson.badge}</span>
            </div>
            <h3 className="text-2xl font-black text-[#581515] font-serif">
              {lang === 'en' ? activeLesson.titleEn : activeLesson.title}
            </h3>
            <p className="text-sm font-semibold text-slate-600 leading-relaxed">
              {lang === 'en' ? activeLesson.descriptionEn : activeLesson.description}
            </p>
          </div>

          {/* Sections & Examples */}
          <div className="space-y-6">
            {activeLesson.sections.map((sec, idx) => (
              <div key={idx} className="bg-[#fbf7f0] border-2 border-[#e6dac8] rounded-2xl p-5 space-y-4 shadow-sm">
                
                <div className="space-y-1">
                  <h4 className="text-lg font-black text-[#581515] flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>{lang === 'en' ? sec.headingEn : sec.heading}</span>
                  </h4>
                  <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                    {lang === 'en' ? sec.explanationEn : sec.explanation}
                  </p>
                </div>

                {/* Examples Box */}
                <div className="space-y-2 pt-2 border-t border-[#e6dac8]">
                  <span className="text-[11px] font-black uppercase text-amber-900 tracking-wider">
                    {lang === 'en' ? 'Examples:' : 'எடுத்துக்காட்டுகள் (Examples):'}
                  </span>
                  
                  {sec.examples.map((ex, eIdx) => {
                    const isSpk = speakingText === ex.tamil;
                    return (
                      <div key={eIdx} className="bg-white border border-[#e6dac8] p-3.5 rounded-xl flex items-center justify-between gap-3 shadow-xs hover:border-[#581515] transition-colors">
                        <div className="space-y-0.5">
                          <p className="text-sm font-black text-[#581515]">
                            {ex.tamil}
                          </p>
                          <p className="text-xs font-bold text-amber-900">
                            {ex.transliteration}
                          </p>
                          <p className="text-[11px] font-medium text-slate-500 italic">
                            {ex.english}
                          </p>
                        </div>

                        <button
                          onClick={() => handleSpeak(ex.tamil)}
                          className={`p-2 rounded-xl transition-all shrink-0 cursor-pointer ${
                            isSpk ? 'bg-amber-500 text-white scale-110' : 'bg-[#f4ece1] text-[#581515] hover:bg-[#581515] hover:text-white'
                          }`}
                          title="Listen to Tamil audio"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
