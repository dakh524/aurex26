"use client";

import React from 'react';
import GameCard from '@/components/games/GameCard';
import { Landmark, SpellCheck, Dna, Sparkles, Award, Trophy, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function GamesHubPage() {
  const gamesList = [
    {
      id: 'era-challenge',
      title: '🏺 எந்த காலம்?',
      subtitle: 'Timeline Era Challenge',
      description: 'பண்டைய கல்வெட்டு, தமிழ்-பிராமி மற்றும் வட்டெழுத்துச் சாசனங்களைக் கண்டு அவை எந்த வரலாற்றுக் காலத்தைச் சேர்ந்தவை என்பதைக் கண்டறியும் விளையாட்டு.',
      icon: Landmark,
      difficulty: 'இடைநிலை',
      roundsText: '6 கல்வெட்டுச் சாசனங்கள்',
      href: '/games/era-challenge',
      badgeText: 'எழுத்து & வரலாற்றுச் சவால்',
    },
    {
      id: 'letter-match',
      title: '🔤 தமிழ் எழுத்து Match',
      subtitle: 'Ancient-to-Modern Script Matching',
      description: 'தமிழி (தமிழ்-பிராமி) வடிவங்களை அவற்றின் இணையான நவீன தமிழ் எழுத்துக்களுடன் பொருத்தி தமிழ் வரிவடிவ பரிணாமத்தை அறிந்துகொள்ளுங்கள்.',
      icon: SpellCheck,
      difficulty: 'எளிது',
      roundsText: '8 தமிழ் எழுத்துகள்',
      href: '/games/letter-match',
      badgeText: 'வரிவடிவப் பொருத்தம்',
    },
    {
      id: 'word-journey',
      title: '🧬 சொல்லின் பயணம்',
      subtitle: 'Word Evolution Timeline Challenge',
      description: 'சங்கத் தமிழ், இடைக்காலத் தமிழ் மற்றும் நவீன தமிழில் தமிழ் சொற்கள் அடைந்த வடிவம் மற்றும் பொருள் மாற்றங்களைக் காலவரிசைப்படி அமைக்கும் சவால்.',
      icon: Dna,
      difficulty: 'சவால்',
      roundsText: '12 சங்கத் தமிழ் சொற்கள்',
      href: '/games/word-journey',
      badgeText: 'சொல் பரிணாமப் பயணம்',
    },
  ];

  return (
    <div className="w-full max-w-[1800px] mx-auto space-y-8 pb-20 px-4 sm:px-6 lg:px-10 xl:px-12">
      
      {/* Page Header Banner */}
      <div className="bg-gradient-to-r from-[#581515] via-[#420f0f] to-[#581515] text-white p-8 sm:p-12 rounded-3xl shadow-xl border-2 border-[#C89551] relative overflow-hidden text-center">
        <div className="relative z-10 space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-400/30">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Interactive Tamil Heritage Gamification</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#fbf7f0] font-serif">
            தமிழ் விளையாட்டு உலகம்
          </h1>

          <p className="text-amber-100/90 text-sm sm:text-base font-extrabold max-w-2xl mx-auto">
            விளையாடி கற்றுக்கொள் • தமிழின் வரலாற்றை அறிந்துகொள்
          </p>

          <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-xl mx-auto leading-relaxed pt-1">
            பண்டைய தமிழ்ச் சாசனங்கள், கல்வெட்டு எழுத்துக்கள் மற்றும் சொற்களின் வரலாற்றுப் பரிணாமத்தை ஊடாடும் விளையாட்டுகள் மூலம் சுவாரசியமாகக் கற்றுக்கொள்ளுங்கள்.
          </p>
        </div>
      </div>

      {/* 3 Game Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {gamesList.map((game) => (
          <GameCard key={game.id} {...game} />
        ))}
      </div>

      {/* Heritage Educational Feature Banner */}
      <div className="bg-[#fbf7f0] border-2 border-[#e6dac8] p-6 sm:p-8 rounded-3xl shadow-sm space-y-4">
        <div className="flex items-center space-x-3 text-[#581515]">
          <Award className="w-6 h-6 text-amber-700 shrink-0" />
          <h2 className="text-lg sm:text-xl font-black">
            தமிழ் பாரம்பரிய விளையாட்டு கற்றல் தளம்
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
          இவ்விளையாட்டுகள் அனைத்தும் தொல்லியல் துறை சான்றளித்த கல்வெட்டுத் தரவுகள் மற்றும் சங்க இலக்கிய ஆவணங்களை அடிப்படையாகக் கொண்டு வடிவமைக்கப்பட்டுள்ளன. தமிழ் மொழி மற்றும் வரலாற்று ஆய்வாளர்களுக்கு பயனுள்ள வகையில் உருவாக்கப்பட்ட இலவசக் கற்றல் தளமாகும்.
        </p>
      </div>

    </div>
  );
}
