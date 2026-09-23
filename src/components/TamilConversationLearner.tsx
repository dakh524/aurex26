"use client";

import React, { useState } from 'react';
import { MessageSquare, Volume2, Sparkles, UserCheck, ArrowRight, HelpCircle } from 'lucide-react';
import { speakTamilText } from '@/lib/audioTTS';
import { useLanguage } from '@/lib/LanguageContext';

interface ConversationCategory {
  id: string;
  categoryName: string;
  categoryNameEn: string;
  badge: string;
  badgeEn: string;
  description: string;
  descriptionEn: string;
  dialogues: {
    speaker: string;
    speakerEn: string;
    tamil: string;
    transliteration: string;
    english: string;
  }[];
}

const CONVERSATIONS: ConversationCategory[] = [
  {
    id: "c1",
    categoryName: "1. வணக்கம் & அறிமுகம்",
    categoryNameEn: "1. Greetings & Introductions",
    badge: "அடிப்படை உரையாடல்",
    badgeEn: "Basic Greetings",
    description: "புதிய நபர்களைச் சந்திக்கும் போது மற்றும் அறிமுகப்படுத்திக் கொள்ளும் போது பயன்படும் எளிய வாக்கியங்கள்.",
    descriptionEn: "Essential phrases used when meeting new people and introducing yourself in Tamil.",
    dialogues: [
      {
        speaker: "நபர் 1 (Person A)",
        speakerEn: "Person A",
        tamil: "வணக்கம்! உங்கள் பெயர் என்ன?",
        transliteration: "Vanakkam! Ungal peyar enna?",
        english: "Hello! What is your name?"
      },
      {
        speaker: "நபர் 2 (Person B)",
        speakerEn: "Person B",
        tamil: "வணக்கம்! என் பெயர் அருண். உங்கள் பெயர் என்ன?",
        transliteration: "Vanakkam! En peyar Arun. Ungal peyar enna?",
        english: "Hello! My name is Arun. What is your name?"
      },
      {
        speaker: "நபர் 1 (Person A)",
        speakerEn: "Person A",
        tamil: "என் பெயர் கவிதா. நீங்கள் எப்படி இருக்கிறீர்கள்?",
        transliteration: "En peyar Kavitha. Neengal eppadi irukkireergall?",
        english: "My name is Kavitha. How are you?"
      },
      {
        speaker: "நபர் 2 (Person B)",
        speakerEn: "Person B",
        tamil: "நான் நன்றாக இருக்கிறேன். நன்றி! நீங்கள்?",
        transliteration: "Naan nandraaga irukkiraen. Nandri! Neengal?",
        english: "I am fine. Thank you! And you?"
      },
      {
        speaker: "நபர் 1 (Person A)",
        speakerEn: "Person A",
        tamil: "நானும் நன்றாக இருக்கிறேன். உங்களைச் சந்தித்ததில் மகிழ்ச்சி!",
        transliteration: "Naanum nandraaga irukkiraen. Ungalai sandhithadhil magizhchi!",
        english: "I am fine too. Pleased to meet you!"
      }
    ]
  },
  {
    id: "c2",
    categoryName: "2. வழிகேட்டல் & பயணம்",
    categoryNameEn: "2. Directions & Travel",
    badge: "பயணம் & வழி",
    badgeEn: "Directions",
    description: "தெருவில் வழிகேட்கும் போதும், பேருந்து மற்றும் ரயில் பயணங்களின் போதும் பேச வேண்டிய வாக்கியங்கள்.",
    descriptionEn: "Phrases for asking directions on streets, bus stands, and railway stations.",
    dialogues: [
      {
        speaker: "பயணி (Traveler)",
        speakerEn: "Traveler",
        tamil: "மன்னிக்கவும், தொடர்வண்டி நிலையம் (Railway Station) எங்கே உள்ளது?",
        transliteration: "Mannikkavum, thodarvandi nilaiyam engae ulladhu?",
        english: "Excuse me, where is the railway station?"
      },
      {
        speaker: "உள்ளூர்வாசி (Local)",
        speakerEn: "Local Resident",
        tamil: "நேராகச் சென்று, முதலாவது சிக்னலில் வலதுபக்கம் திரும்புங்கள்.",
        transliteration: "Naeraaga chendru, mudhalaavadhu signal-il valadhubakkam thirumbungal.",
        english: "Go straight and turn right at the first signal."
      },
      {
        speaker: "பயணி (Traveler)",
        speakerEn: "Traveler",
        tamil: "அங்கு செல்ல எவ்வளவு நேரம் ஆகும்?",
        transliteration: "Angu sella evvalavu naeram aagum?",
        english: "How long will it take to go there?"
      },
      {
        speaker: "உள்ளூர்வாசி (Local)",
        speakerEn: "Local Resident",
        tamil: "நடந்து சென்றால் பத்து நிமிடங்கள் ஆகும்.",
        transliteration: "Nadandhu chendraal pathu nimidangal aagum.",
        english: "If you walk, it will take ten minutes."
      },
      {
        speaker: "பயணி (Traveler)",
        speakerEn: "Traveler",
        tamil: "மிக்க நன்றி அய்யா!",
        transliteration: "Mikka nandri ayya!",
        english: "Thank you very much sir!"
      }
    ]
  },
  {
    id: "c3",
    categoryName: "3. கடை & உணவகம்",
    categoryNameEn: "3. Shopping & Dining",
    badge: "கடை & உணவகம்",
    badgeEn: "Shopping & Food",
    description: "பொருட்கள் வாங்கும் போதும் உணவகத்தில் உணவு ஆர்டர் செய்யும் போதும் பேசும் தமிழ் வாக்கியங்கள்.",
    descriptionEn: "Tamil expressions used when shopping at markets or ordering food in restaurants.",
    dialogues: [
      {
        speaker: "வாடிக்கையாளர் (Customer)",
        speakerEn: "Customer",
        tamil: "ஐயா, இந்த ஆப்பிள் ஒரு கிலோ எவ்வளவு?",
        transliteration: "Ayya, indha apple oru kilo evvalavu?",
        english: "Sir, how much is one kilo of this apple?"
      },
      {
        speaker: "கடைக்காரர் (Shopkeeper)",
        speakerEn: "Shopkeeper",
        tamil: "ஒரு கிலோ நூறு ரூபாய் அம்மா.",
        transliteration: "Oru kilo nooru roobai amma.",
        english: "One kilo is one hundred rupees ma'am."
      },
      {
        speaker: "வாடிக்கையாளர் (Customer)",
        speakerEn: "Customer",
        tamil: "எனக்கு ஒரு சுடச்சுட தேநீரும் இரண்டு தோசையும் கொடுங்கள்.",
        transliteration: "Enakku oru sudachuda thaeneerum irandhu dhosaiyum kodungal.",
        english: "Please give me one piping hot tea and two dosas."
      },
      {
        speaker: "உணவக ஊழியர் (Waiter)",
        speakerEn: "Waiter",
        tamil: "நிச்சயமாக, ஐந்து நிமிடங்களில் கொண்டு வருகிறேன்.",
        transliteration: "Nichayamaaga, aindhu nimidangalil kondu varugiraen.",
        english: "Certainly, I will bring it in five minutes."
      }
    ]
  },
  {
    id: "c4",
    categoryName: "4. உதவி கேட்டல் & அன்றாட உரையாடல்",
    categoryNameEn: "4. Asking for Help & Daily Phrases",
    badge: "அன்றாட உதவி",
    badgeEn: "Daily Assistance",
    description: "அவசர நேரத்தில் உதவி கேட்கவும், தினசரி சூழலில் பயன்படுத்தவும் தேவையான சொற்றொடர்கள்.",
    descriptionEn: "Useful everyday expressions for seeking help and general conversations.",
    dialogues: [
      {
        speaker: "நபர் A",
        speakerEn: "Person A",
        tamil: "எனக்கு ஒரு சிறிய உதவி செய்ய முடியுமா?",
        transliteration: "Enakku oru siriya udhavi seyya mudiyumaa?",
        english: "Can you do me a small favor?"
      },
      {
        speaker: "நபர் B",
        speakerEn: "Person B",
        tamil: "கண்டிப்பாக, சொல்லுங்கள்! என்ன உதவி வேண்டும்?",
        transliteration: "Kandippaaga, sollungal! Enna udhavi vaendum?",
        english: "Sure, tell me! What help do you need?"
      },
      {
        speaker: "நபர் A",
        speakerEn: "Person A",
        tamil: "இந்தக் கடிதத்தின் தமிழ் அர்த்தத்தை விளக்க முடியுமா?",
        transliteration: "Indha kadidhathin Tamil arthathai vilakka mudiyumaa?",
        english: "Can you explain the Tamil meaning of this letter?"
      },
      {
        speaker: "நபர் B",
        speakerEn: "Person B",
        tamil: "மகிழ்ச்சியோடு செய்கிறேன்! வாருங்கள் படிக்கலாம்.",
        transliteration: "Magizhchiyodu seygiraen! Vaarungal padikkalaam.",
        english: "I'll gladly do it! Come, let's read."
      }
    ]
  }
];

export default function TamilConversationLearner() {
  const { lang } = useLanguage();
  const [activeCategoryId, setActiveCategoryId] = useState<string>("c1");
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);

  const activeCategory = CONVERSATIONS.find(c => c.id === activeCategoryId) || CONVERSATIONS[0];

  const handleSpeak = (text: string, idx: number) => {
    setSpeakingIndex(idx);
    speakTamilText(text, () => {
      setSpeakingIndex(null);
    });
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#581515] via-[#420f0f] to-[#581515] text-white p-6 sm:p-10 rounded-3xl shadow-xl border border-amber-900/40 space-y-3">
        <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-200 border border-amber-400/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          <MessageSquare className="w-4 h-4 text-amber-300" />
          <span>{lang === 'en' ? 'Everyday Tamil-English Conversations' : 'தமிழ்-ஆங்கில எளிய உரையாடல்கள் • Everyday Tamil-English Conversations'}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-[#fbf7f0] font-serif">
          {lang === 'en' ? 'Simple Tamil Conversations' : 'உரையாடல்கள் பயிற்சி (Simple Tamil Conversations)'}
        </h2>
        <p className="text-amber-100/90 text-xs sm:text-base font-semibold max-w-3xl">
          {lang === 'en'
            ? 'Practice spoken Tamil phrases with English translations and TTS audio across Greetings, Directions, Shopping, Dining, and Daily Phrases.'
            : 'அறிமுகம், வழிகேட்டல், கடை, உணவகம் மற்றும் அன்றாட சூழல்களில் பேசப்படும் தமிழ் வாக்கியங்களை ஆங்கில விளக்கத்துடன் ஒலி வடிவில் கேட்டுப் பயிற்சி செய்யுங்கள்.'}
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-white border-2 border-[#e7dcd0] p-3 rounded-3xl shadow-sm">
        {CONVERSATIONS.map((cat) => {
          const isActive = cat.id === activeCategoryId;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#581515] text-white shadow-md scale-105'
                  : 'bg-[#f4ece1] text-[#581515] hover:bg-[#e7dcd0]'
              }`}
            >
              {lang === 'en' ? cat.categoryNameEn : cat.categoryName}
            </button>
          );
        })}
      </div>

      {/* Dialogues Card Container */}
      <div className="bg-white border-2 border-[#e7dcd0] rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
        
        <div className="border-b border-[#e7dcd0] pb-4 space-y-1">
          <span className="text-xs font-black uppercase text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            {lang === 'en' ? activeCategory.badgeEn : activeCategory.badge}
          </span>
          <h3 className="text-2xl font-black text-[#581515] font-serif pt-2">
            {lang === 'en' ? activeCategory.categoryNameEn : activeCategory.categoryName}
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            {lang === 'en' ? activeCategory.descriptionEn : activeCategory.description}
          </p>
        </div>

        {/* List of Dialogue Cards */}
        <div className="space-y-4">
          {activeCategory.dialogues.map((d, idx) => {
            const isSpk = speakingIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#fbf7f0] border-2 border-[#e6dac8] hover:border-[#581515] p-5 rounded-2xl space-y-3 transition-colors shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-900 bg-amber-200/80 px-3 py-1 rounded-lg border border-amber-300 flex items-center space-x-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-amber-800" />
                    <span>{lang === 'en' ? d.speakerEn : d.speaker}</span>
                  </span>

                  <button
                    onClick={() => handleSpeak(d.tamil, idx)}
                    className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                      isSpk ? 'bg-amber-500 text-white shadow-md scale-105' : 'bg-[#581515] text-amber-300 hover:bg-[#3f0e0e]'
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>{isSpk ? (lang === 'en' ? 'Playing Sound...' : 'ஒலி கேட்கிறது...') : (lang === 'en' ? 'Listen Audio' : 'ஒலி கேட்க (Listen)')}</span>
                  </button>
                </div>

                {/* Speech Scripts */}
                <div className="space-y-1 bg-white p-4 rounded-xl border border-[#e6dac8]">
                  <p className="text-base sm:text-lg font-black text-[#581515] leading-relaxed font-serif">
                    "{d.tamil}"
                  </p>
                  <p className="text-xs font-bold text-amber-900">
                    {d.transliteration}
                  </p>
                  <p className="text-xs font-semibold text-slate-600 pt-1 border-t border-slate-100">
                    🇬🇧 English: <span className="text-slate-900 font-extrabold">"{d.english}"</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
