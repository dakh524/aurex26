"use client";

import React, { useState } from 'react';
import { BookOpen, Volume2, Sparkles, RefreshCw } from 'lucide-react';
import { speakTamilText } from '@/lib/audioTTS';
import { useLanguage } from '@/lib/LanguageContext';

interface KuralWisdom {
  id: number;
  kuralNumber: number;
  chapter: string;
  line1: string;
  line2: string;
  tamilexplanation: string;
  englishTranslation: string;
}

const WISDOM_DATA: KuralWisdom[] = [
  {
    id: 1,
    kuralNumber: 391,
    chapter: 'கல்வி (Education)',
    line1: 'கற்க கசடற கற்பவை கற்றபின்',
    line2: 'நிற்க அதற்குத் தக.',
    tamilexplanation: 'கற்கத் தகுந்த நூல்களைக் குற்றமில்லாமல் கற்க வேண்டும்; கற்ற பிறகு அக்கல்வியின் தகுதிக்கு ஏற்ப ஒழுக்கத்தில் வாழ வேண்டும்.',
    englishTranslation: 'Learn thoroughly whatever you learn; after learning, abide strictly by what you have learned.',
  },
  {
    id: 2,
    kuralNumber: 1,
    chapter: 'கடவுள் வாழ்த்து (Praise of God)',
    line1: 'அகர முதல எழுத்தெல்லாம் ஆதி',
    line2: 'பகவன் முதற்றே உலகு.',
    tamilexplanation: "எழுத்துக்கள் எல்லாம் 'அ' கரத்தை முதலாகக் கொண்டுள்ளன; அதுபோல உலகம் இறைவனை முதலாகக் கொண்டுள்ளது.",
    englishTranslation: 'As the letter A is the first of all letters, so the Eternal God is first in the world.',
  },
  {
    id: 3,
    kuralNumber: 66,
    chapter: 'மக்கட்பேறு (The Wealth of Children)',
    line1: 'குழல்இனிது யாழ்இனிது என்பதம் மக்கள்',
    line2: 'மழலைச்சொல் கேளாத வர்.',
    tamilexplanation: 'தம் குழந்தைகளின் மழலைச் சொல்லைக் கேட்காதவர்களே புல்லாங்குழலும் யாழும் இனிமையானவை என்று கூறுவார்கள்.',
    englishTranslation: 'They who have not heard the sweet lisping of their children say that flutes and harps make sweet music.',
  },
  {
    id: 4,
    kuralNumber: 392,
    chapter: 'கல்வி (Education)',
    line1: 'எண்ணென்ப ஏனை எழுத்தென்ப இவ்விரண்டும்',
    line2: 'கண்ணென்ப வாழும் உயிர்க்கு.',
    tamilexplanation: 'எண்ணும் எழுத்தும் ஆகிய இவ்விரண்டையும் வாழும் மனிதர்களுக்கு இரு கண்கள் என்று பெரியோர் கூறுவர்.',
    englishTranslation: 'Letters and numbers are the two eyes of living human beings.',
  }
];

export default function DailyTamilWisdom() {
  const { lang, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const current = WISDOM_DATA[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % WISDOM_DATA.length);
  };

  const handlePlaySound = () => {
    const fullText = `${current.line1} ${current.line2}`;
    setIsPlaying(true);
    speakTamilText(fullText, () => {
      setIsPlaying(false);
    });
  };

  return (
    <div className="bg-[#fbf7f0] border-2 border-[#e7dcd0] hover:border-[#581515] rounded-[32px] p-6 sm:p-8 shadow-xl transition-all relative overflow-hidden space-y-6">
      
      {/* Top Banner Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#e7dcd0] pb-5">
        <div className="flex items-center space-x-3.5">
          <div className="w-13 h-13 rounded-2xl bg-[#581515] text-amber-300 shadow-md flex items-center justify-center font-black flex-shrink-0 border-2 border-[#C89551]">
            <BookOpen className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="inline-flex items-center space-x-1.5 bg-[#f4ece1] text-[#581515] border border-[#C89551]/40 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider mb-1 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#581515]" />
              <span>{t('wisdomTag')}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#581515] tracking-tight">
              {t('wisdomTitle')}
            </h3>
          </div>
        </div>

        {/* Action Pills */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePlaySound}
            disabled={isPlaying}
            className="inline-flex items-center space-x-2 bg-[#581515] hover:bg-[#7a2222] text-amber-200 border border-amber-400/40 px-5 py-2.5 rounded-full font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105 cursor-pointer"
          >
            <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-bounce text-amber-300' : 'text-amber-200'}`} />
            <span>{isPlaying ? t('playingAudioBtn') : t('listenAudioBtn')}</span>
          </button>

          <button
            onClick={handleNext}
            className="inline-flex items-center space-x-1.5 bg-white hover:bg-amber-50 text-[#6b1515] border-2 border-amber-300 px-4 py-2.5 rounded-full font-black text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#6b1515]" />
            <span>{t('newKuralBtn')}</span>
          </button>
        </div>
      </div>

      {/* Thirukkural Banner Display Box */}
      <div 
        className="relative rounded-3xl overflow-hidden p-8 sm:p-10 text-center shadow-xl border-2 border-amber-400 bg-cover bg-center"
        style={{ backgroundImage: "url('/palm-leaf.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#581515]/90 via-[#7a1b1b]/85 to-[#581515]/90 z-0" />
        
        <div className="relative z-10 space-y-3">
          <div className="inline-block bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-2 shadow-md">
            {lang === 'en' ? `Chapter: ${current.chapter}` : `அதிகாரம்: ${current.chapter}`} • Kural {current.kuralNumber}
          </div>
          
          <h4 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-relaxed font-serif tracking-wide drop-shadow-lg">
            "{current.line1}" <br />
            <span className="text-amber-300 block mt-1">"{current.line2}"</span>
          </h4>
        </div>
      </div>

      {/* Explanation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl border-2 border-amber-200 shadow-md space-y-1">
          <h5 className="text-xs font-black text-[#6b1515] uppercase tracking-wider flex items-center space-x-1">
            <span>{t('tamilMeaningLabel')}</span>
          </h5>
          <p className="text-slate-800 text-xs sm:text-sm font-bold leading-relaxed pt-1">
            {current.tamilexplanation}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border-2 border-amber-200 shadow-md space-y-1">
          <h5 className="text-xs font-black text-amber-800 uppercase tracking-wider flex items-center space-x-1">
            <span>{t('englishMeaningLabel')}</span>
          </h5>
          <p className="text-slate-700 text-xs sm:text-sm font-bold italic leading-relaxed pt-1">
            "{current.englishTranslation}"
          </p>
        </div>
      </div>

    </div>
  );
}

