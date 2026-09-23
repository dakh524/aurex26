"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Award, Flame, Trophy } from 'lucide-react';

interface GameHeaderProps {
  title: string;
  currentRound: number;
  totalRounds: number;
  score: number;
  streak?: number;
  backHref?: string;
}

export default function GameHeader({
  title,
  currentRound,
  totalRounds,
  score,
  streak = 0,
  backHref = '/games',
}: GameHeaderProps) {
  return (
    <div className="bg-white border-2 border-[#e7dcd0] rounded-3xl p-4 sm:p-6 shadow-md mb-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Back Link */}
        <Link
          href={backHref}
          className="inline-flex items-center space-x-2 text-xs sm:text-sm font-black text-[#581515] hover:text-[#7a2222] bg-[#fbf7f0] hover:bg-[#f4ece1] px-4 py-2.5 rounded-2xl border border-[#e6dac8] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#581515]" />
          <span>விளையாட்டு முகப்பு</span>
        </Link>

        {/* Title */}
        <h1 className="text-lg sm:text-xl font-black text-[#581515] tracking-tight">
          {title}
        </h1>

        {/* Score & Streak Badges */}
        <div className="flex items-center space-x-3">
          {streak >= 2 && (
            <div className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-2xl bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black animate-pulse">
              <Flame className="w-4 h-4 text-amber-700 fill-amber-600" />
              <span>{streak} Streak!</span>
            </div>
          )}

          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#581515] to-[#7a2222] text-amber-300 px-4 py-2 rounded-2xl border border-amber-400/30 text-xs sm:text-sm font-black shadow-sm">
            <Trophy className="w-4 h-4 text-amber-300" />
            <span>⭐ {score} புள்ளிகள்</span>
          </div>
        </div>
      </div>

      {/* Round / Progress indicator */}
      <div className="flex items-center justify-between text-xs font-extrabold text-slate-600 border-t border-slate-100 pt-3">
        <span>கேள்வி / சுற்று: <strong className="text-[#581515] font-black">{currentRound} / {totalRounds}</strong></span>
        <div className="w-48 bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
          <div
            className="bg-gradient-to-r from-[#581515] to-[#C89551] h-full transition-all duration-500"
            style={{ width: `${(currentRound / totalRounds) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
