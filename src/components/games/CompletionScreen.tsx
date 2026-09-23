"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Trophy, RotateCcw, LayoutGrid, Home, Award, Sparkles, CheckCircle2, Flame } from 'lucide-react';
import { saveHighScore, getHighScore } from '@/lib/games/scoring';

interface CompletionScreenProps {
  gameId: string;
  gameTitle: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  maxStreak: number;
  timeTakenSeconds?: number;
  historicalNote?: string;
  onRestart: () => void;
}

export default function CompletionScreen({
  gameId,
  gameTitle,
  score,
  correctAnswers,
  totalQuestions,
  maxStreak,
  timeTakenSeconds,
  historicalNote,
  onRestart,
}: CompletionScreenProps) {
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [bestScore, setBestScore] = useState(0);

  const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  useEffect(() => {
    const isNew = saveHighScore(gameId, score);
    setIsNewHighScore(isNew);
    setBestScore(getHighScore(gameId));
  }, [gameId, score]);

  return (
    <div className="bg-white border-2 border-[#C89551] rounded-3xl p-6 sm:p-10 shadow-2xl text-center space-y-8 max-w-2xl mx-auto relative overflow-hidden animate-in zoom-in-95 duration-300">
      
      {/* Top Banner Accent */}
      <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-[#581515] via-[#C89551] to-[#581515]"></div>

      {/* Celebration Icon */}
      <div className="space-y-3 pt-2">
        <div className="w-20 h-20 bg-gradient-to-br from-[#581515] to-[#800000] text-amber-300 rounded-3xl border-2 border-[#C89551] flex items-center justify-center mx-auto shadow-xl">
          <Trophy className="w-10 h-10 text-amber-300 animate-bounce" />
        </div>

        {isNewHighScore && (
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>புதிய சாதனை புள்ளிகள் (New High Score!)</span>
          </div>
        )}

        <h2 className="text-3xl sm:text-4xl font-black text-[#581515] tracking-tight font-serif">
          சிறப்பாக விளையாடினீர்கள்! 🎉
        </h2>
        <p className="text-slate-600 text-sm font-semibold max-w-md mx-auto">
          "{gameTitle}" விளையாட்டை வெற்றிகரமாக நிறைவு செய்து தமிழ் வரலாற்று அறிவைப் பெற்றுள்ளீர்கள்.
        </p>
      </div>

      {/* Score Grid Dashboard */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#fbf7f0] border-2 border-[#e6dac8] p-4 rounded-2xl text-center space-y-1 shadow-sm">
          <span className="text-[10px] font-black uppercase text-slate-400 block">மொத்தப் புள்ளிகள்</span>
          <span className="text-2xl sm:text-3xl font-black text-[#581515]">⭐ {score}</span>
        </div>

        <div className="bg-[#fbf7f0] border-2 border-[#e6dac8] p-4 rounded-2xl text-center space-y-1 shadow-sm">
          <span className="text-[10px] font-black uppercase text-slate-400 block">துல்லியம் (Accuracy)</span>
          <span className="text-2xl sm:text-3xl font-black text-emerald-600">{accuracy}%</span>
        </div>

        <div className="bg-[#fbf7f0] border-2 border-[#e6dac8] p-4 rounded-2xl text-center space-y-1 shadow-sm">
          <span className="text-[10px] font-black uppercase text-slate-400 block">சரியான பதில்கள்</span>
          <span className="text-2xl sm:text-3xl font-black text-slate-900">{correctAnswers} / {totalQuestions}</span>
        </div>

        <div className="bg-[#fbf7f0] border-2 border-[#e6dac8] p-4 rounded-2xl text-center space-y-1 shadow-sm">
          <span className="text-[10px] font-black uppercase text-slate-400 block">அதிகபட்ச Streak</span>
          <span className="text-2xl sm:text-3xl font-black text-[#581515] flex items-center justify-center">
            <Flame className="w-5 h-5 mr-1 text-amber-700 fill-amber-600" />
            {maxStreak}
          </span>
        </div>
      </div>

      {/* Historical Note Summary if available */}
      {historicalNote && (
        <div className="bg-[#fcf8f2] border-2 border-[#e6dac8] p-5 rounded-2xl text-left space-y-2 shadow-inner">
          <div className="flex items-center space-x-2 text-xs font-black text-[#581515]">
            <Award className="w-4 h-4 text-amber-700" />
            <span>வரலாற்றுத் தகவல் (Historical Note):</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
            {historicalNote}
          </p>
        </div>
      )}

      {/* Navigation & Replay Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        {/* Play Again */}
        <button
          onClick={onRestart}
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-[#581515] to-[#7a2222] hover:from-[#7a2222] hover:to-[#581515] text-white font-black text-sm px-6 py-3.5 rounded-2xl shadow-xl transition-all cursor-pointer active:scale-95"
        >
          <RotateCcw className="w-4 h-4 text-amber-300" />
          <span>மீண்டும் விளையாடு (Play Again)</span>
        </button>

        {/* Other Games */}
        <Link
          href="/games"
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white hover:bg-[#fbf7f0] text-[#581515] font-black text-sm px-6 py-3.5 rounded-2xl border-2 border-[#581515] transition-colors cursor-pointer"
        >
          <LayoutGrid className="w-4 h-4 text-[#581515]" />
          <span>மற்றொரு விளையாட்டு (Games Home)</span>
        </Link>

        {/* Home */}
        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-sm px-5 py-3.5 rounded-2xl border border-slate-200 transition-colors cursor-pointer"
        >
          <Home className="w-4 h-4 text-slate-600" />
          <span>முகப்பு (Home)</span>
        </Link>
      </div>

    </div>
  );
}
