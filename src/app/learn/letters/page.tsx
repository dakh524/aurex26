"use client";

import React from 'react';
import LearnSubHeader from '@/components/LearnSubHeader';
import TamilScriptEvolution from '@/components/TamilScriptEvolution';
import TamilAlphabetLearner from '@/components/TamilAlphabetLearner';

export default function LearnLettersPage() {
  return (
    <div className="w-full max-w-[1800px] mx-auto space-y-10 pb-28 px-4 sm:px-6 lg:px-10 xl:px-12">
      {/* Sub navigation header */}
      <LearnSubHeader />

      {/* Flagship Module 1: Official Tamil-Brahmi & Inscription Script Evolution Academy Module */}
      <TamilScriptEvolution />

      {/* Flagship Module 2: Modern Tamil Alphabets Pronunciation & Practice */}
      <div className="bg-[#fbf7f0] border-2 border-[#e6dac8] p-6 sm:p-8 rounded-[32px] shadow-sm space-y-6">
        <div className="border-b border-[#e6dac8] pb-4">
          <h2 className="text-2xl font-black text-[#581515] font-serif">
            நவீன தமிழ் எழுத்துக்கள் & ஒலிப்பயிற்சி (Modern Tamil Pronunciation)
          </h2>
          <p className="text-xs text-slate-700 font-semibold pt-1">
            ஒவ்வொரு தமிழெழுத்தையும் கிளிக் செய்து அதன் தட்டையான மற்றும் நெடில ஒலிப்பைக் கேட்டுத் தெரிந்துகொள்ளுங்கள்.
          </p>
        </div>
        <TamilAlphabetLearner />
      </div>
    </div>
  );
}
