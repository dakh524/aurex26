"use client";

import React from 'react';
import Link from 'next/link';
import { LucideIcon, Play, HelpCircle, Layers, Sparkles } from 'lucide-react';

interface GameCardProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  difficulty: string; // e.g. "எளிது" | "மிதமானது" | "சவால்"
  roundsText: string; // e.g. "6 கேள்விகள்" | "8 எழுத்துகள்" | "5 சொற்கள்"
  href: string;
  badgeText?: string;
  accentColor?: string;
}

export default function GameCard({
  title,
  subtitle,
  description,
  icon: Icon,
  difficulty,
  roundsText,
  href,
  badgeText = 'தமிழ் பாரம்பரிய விளையாட்டு',
}: GameCardProps) {
  return (
    <div className="bg-white border-2 border-[#e7dcd0] hover:border-[#C89551] rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden h-full">
      
      {/* Background Subtle Gradient Trim Accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#581515] via-[#C89551] to-[#581515] group-hover:h-2 transition-all"></div>

      <div className="space-y-4 pt-1">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#581515] bg-[#f4ece1] px-2.5 py-1 rounded-full border border-[#e6dac8]">
            {badgeText}
          </span>
          <span className="text-[10px] font-extrabold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            {difficulty}
          </span>
        </div>

        {/* Header Icon + Titles */}
        <div className="flex items-start space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-[#581515] text-amber-300 border-2 border-[#C89551] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
            <Icon className="w-7 h-7 text-amber-300" />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-[#581515] group-hover:text-[#800000] transition-colors leading-snug">
              {title}
            </h2>
            <p className="text-xs font-bold text-amber-800 uppercase tracking-wide">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
          {description}
        </p>
      </div>

      {/* Footer Details + Play Action Button */}
      <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center space-x-1.5 text-xs font-extrabold text-slate-500">
          <Layers className="w-4 h-4 text-[#581515]" />
          <span>{roundsText}</span>
        </div>

        <Link
          href={href}
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#581515] to-[#7a2222] hover:from-[#7a2222] hover:to-[#581515] text-amber-300 font-black text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-md border border-amber-400/40 transition-all active:scale-95 cursor-pointer"
        >
          <span>விளையாடு</span>
          <Play className="w-4 h-4 fill-amber-300 text-amber-300 ml-1" />
        </Link>
      </div>

    </div>
  );
}
