"use client";

import React, { useState, useEffect } from 'react';
import { Trophy, History, Award, CheckCircle2, RotateCcw, TrendingUp } from 'lucide-react';

interface ScoreEntry {
  date: string;
  score: number;
  total: number;
  percentage: number;
}

export default function LearnProgressStats({ onStartQuiz }: { onStartQuiz?: () => void }) {
  const [history, setHistory] = useState<ScoreEntry[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('tamil_quiz_history');
      if (stored) {
        try {
          setHistory(JSON.parse(stored));
        } catch (e) {}
      }
    }
  }, []);

  const totalQuizzes = history.length;
  const avgPercentage = totalQuizzes > 0 
    ? Math.round(history.reduce((acc, curr) => acc + curr.percentage, 0) / totalQuizzes)
    : 0;

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#581515] via-[#420f0f] to-[#581515] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-amber-900/40 space-y-2">
        <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-200 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold">
          <Trophy className="w-3.5 h-3.5 text-amber-300" />
          <span>உங்கள் கற்றல் முன்னேற்றப் பதிவு</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#fbf7f0]">
          முன்னேற்றம் (Learning Progress & Stats)
        </h2>
        <p className="text-slate-200 text-xs sm:text-sm font-medium">
          நீங்கள் மேற்கொண்ட வினாடி வினாப் பயிற்சிகளின் மதிப்பெண்கள் மற்றும் திறனை இங்கே காணலாம்.
        </p>
      </div>

      {/* Summary Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white border-2 border-[#e7dcd0] rounded-3xl p-6 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">பயிற்சிகள் எடுத்தவை</span>
            <h4 className="text-2xl font-black text-[#581515]">{totalQuizzes} வினாடி வினா</h4>
          </div>
        </div>

        <div className="bg-white border-2 border-[#e7dcd0] rounded-3xl p-6 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">சராசரித் திறன்</span>
            <h4 className="text-2xl font-black text-emerald-700">{avgPercentage}%</h4>
          </div>
        </div>

        <div className="bg-white border-2 border-[#e7dcd0] rounded-3xl p-6 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6 text-amber-700" />
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">தற்போதைய நிலை</span>
            <h4 className="text-lg font-black text-slate-800">
              {avgPercentage >= 80 ? '🌟 நிபுணர் (Master)' : avgPercentage >= 50 ? '🌱 வளரும் நிலை' : '📚 தொடக்க நிலை'}
            </h4>
          </div>
        </div>
      </div>

      {/* Recent History Table */}
      <div className="bg-white border-2 border-[#e7dcd0] rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-lg font-black text-[#581515] border-b border-slate-100 pb-3 flex items-center space-x-2">
          <History className="w-5 h-5 text-[#581515]" />
          <span>சமீபத்திய வினாடி வினா முடிவுகள்</span>
        </h3>

        {history.length === 0 ? (
          <div className="py-8 text-center space-y-3">
            <p className="text-xs text-slate-500 font-bold">இன்னும் வினாடி வினா பயிற்சிகள் மேற்கொள்ளப்படவில்லை.</p>
            {onStartQuiz && (
              <button
                onClick={onStartQuiz}
                className="bg-[#581515] text-white px-5 py-2.5 rounded-2xl text-xs font-black hover:bg-[#3f0e0e] transition-colors"
              >
                பயிற்சியைத் தொடங்கு →
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((entry, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-between p-4 bg-[#fbf7f0] border border-[#e6dac8] rounded-2xl"
              >
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-[#581515] text-sm">
                    எழுத்து ஒலி வினாடி வினா
                  </h4>
                  <p className="text-[11px] text-slate-500 font-semibold">📅 {entry.date}</p>
                </div>

                <div className="text-right">
                  <span className="text-base font-black text-[#581515]">
                    {entry.score} / {entry.total}
                  </span>
                  <span className="block text-[11px] font-extrabold text-emerald-700">
                    {entry.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
