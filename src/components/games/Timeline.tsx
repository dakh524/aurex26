"use client";

import React from 'react';
import { Check, Sparkles } from 'lucide-react';

interface TimelineProps {
  selectedEra?: string;
  correctEra?: string;
  isAnswered?: boolean;
}

const ERAS = [
  { name: 'தமிழ்-பிராமி', period: 'கி.மு. 3 - கி.பி. 1' },
  { name: 'வட்டெழுத்து', period: 'கி.பி. 5 - 11' },
  { name: 'சோழர் காலம்', period: 'கி.பி. 10 - 13' },
  { name: 'நவீன தமிழ்', period: '19 - 21ஆம் நூர்' },
];

export default function Timeline({ selectedEra, correctEra, isAnswered }: TimelineProps) {
  return (
    <div className="bg-[#fbf7f0] border-2 border-[#e6dac8] rounded-2xl p-4 sm:p-5 space-y-3 shadow-inner">
      <div className="flex items-center justify-between text-xs font-black text-[#581515]">
        <span className="flex items-center space-x-1.5 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>தமிழ் எழுத்து வரலாற்று காலவரிசை (Script Timeline)</span>
        </span>
        {isAnswered && (
          <span className="text-[11px] font-bold text-slate-500">
            தேர்ந்தெடுக்கப்பட்ட காலம் சுட்டிக்காட்டப்பட்டுள்ளது
          </span>
        )}
      </div>

      <div className="relative pt-2 pb-1">
        {/* Connecting Bar */}
        <div className="absolute top-1/2 left-4 right-4 h-1 bg-slate-200 -translate-y-1/2 z-0 rounded-full"></div>

        <div className="grid grid-cols-4 gap-2 relative z-10">
          {ERAS.map((era, idx) => {
            const isSelected = selectedEra === era.name;
            const isCorrect = correctEra === era.name;

            let nodeClass = 'bg-white border-slate-300 text-slate-600';
            if (isAnswered) {
              if (isCorrect) {
                nodeClass = 'bg-emerald-600 border-emerald-400 text-white shadow-lg ring-4 ring-emerald-100 scale-105';
              } else if (isSelected && !isCorrect) {
                nodeClass = 'bg-rose-600 border-rose-400 text-white shadow-md ring-4 ring-rose-100';
              }
            } else if (isSelected) {
              nodeClass = 'bg-[#581515] border-[#C89551] text-amber-300 shadow-md ring-4 ring-amber-100 scale-105';
            }

            return (
              <div key={idx} className="flex flex-col items-center text-center space-y-1">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center text-xs font-black transition-all duration-300 ${nodeClass}`}
                >
                  {isAnswered && isCorrect ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>
                <span className={`text-[11px] sm:text-xs font-black transition-colors ${
                  isAnswered && isCorrect
                    ? 'text-emerald-800'
                    : isSelected
                    ? 'text-[#581515]'
                    : 'text-slate-600'
                }`}>
                  {era.name}
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-600 hidden sm:block">
                  {era.period}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
