"use client";

import React from 'react';

export default function QuoteBanner() {
  return (
    <div className="relative overflow-hidden rounded-3xl border-2 border-[#e6dac8] bg-gradient-to-r from-[#f7f0e6] via-[#f2e6d6] to-[#f7f0e6] p-6 sm:p-8 shadow-md">
      
      {/* Background Gopuram & Poet Silhouettes / Overlay */}
      <div 
        className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: "url('/inscription-bg.jpg')" }}
      />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        
        {/* Left: Poet Illustration / Vector Badge */}
        <div className="flex items-center space-x-4 shrink-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#c89551]/40 bg-[#e7dcd0] overflow-hidden shadow-inner flex items-center justify-center relative">
            <svg 
              className="w-16 h-16 text-[#581515]/80" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              {/* Simplified Classical Poet Head / Turban silhouette */}
              <path d="M12 2C9.24 2 7 4.24 7 7c0 1.83 1 3.42 2.5 4.26V13c0 1.1.9 2 2 2h1c1.1 0 2-.9 2-2v-1.74C16 10.42 17 8.83 17 7c0-2.76-2.24-5-5-5zm0 14c-3.87 0-7 2.13-7 5v1h14v-1c0-2.87-3.13-5-7-5z"/>
            </svg>
          </div>
        </div>

        {/* Center: Famous Tamil Quote */}
        <div className="space-y-2 flex-1 max-w-xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#581515] font-serif tracking-wide leading-tight">
            “ யாதும் ஊரே, யாவரும் கேளிர் ”
          </h2>
          <p className="text-xs sm:text-sm font-bold text-amber-900/80 tracking-wider">
            — தமிழ் உலகம்
          </p>
        </div>

        {/* Right: Gopuram / Temple Artwork SVG */}
        <div className="shrink-0 opacity-80 hidden sm:block">
          <svg className="w-24 h-24 text-[#581515]/30" viewBox="0 0 100 100" fill="currentColor">
            {/* Gopuram Tower Silhouette */}
            <polygon points="50,5 40,25 60,25" />
            <polygon points="50,20 35,40 65,40" />
            <polygon points="50,35 30,60 70,60" />
            <polygon points="50,55 25,85 75,85" />
            <rect x="20" y="85" width="60" height="15" />
            <rect x="42" y="88" width="16" height="12" fill="#f2e6d6" />
          </svg>
        </div>

      </div>
    </div>
  );
}
