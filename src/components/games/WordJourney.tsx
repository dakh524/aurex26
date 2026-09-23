"use client";

import React, { useState, useEffect } from 'react';
import GameHeader from './GameHeader';
import CompletionScreen from './CompletionScreen';
import { TAMIL_WORD_EVOLUTION_DATA, WordEvolutionEntry, WordStage } from '@/data/tamilWordEvolution';
import { calculateAnswerScore, INITIAL_SCORE_STATE, GameScoreState } from '@/lib/games/scoring';
import { CheckCircle2, XCircle, ArrowRight, ArrowUp, ArrowDown, Sparkles, BookOpen, Layers, Check } from 'lucide-react';

export default function WordJourney() {
  const wordKeys = Object.keys(TAMIL_WORD_EVOLUTION_DATA);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [wordData, setWordData] = useState<WordEvolutionEntry>(TAMIL_WORD_EVOLUTION_DATA[wordKeys[0]]);
  
  const [userOrderedStages, setUserOrderedStages] = useState<WordStage[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrectOrder, setIsCorrectOrder] = useState(false);
  
  const [scoreState, setScoreState] = useState<GameScoreState>(INITIAL_SCORE_STATE);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    loadWord(currentWordIndex);
  }, [currentWordIndex]);

  const loadWord = (index: number) => {
    const key = wordKeys[index % wordKeys.length];
    const data = TAMIL_WORD_EVOLUTION_DATA[key];
    setWordData(data);

    // Shuffle stages for the challenge
    const shuffled = [...data.stages].sort(() => Math.random() - 0.5);
    setUserOrderedStages(shuffled);
    setIsAnswered(false);
    setIsCorrectOrder(false);
    setStartTime(Date.now());
  };

  const moveStage = (fromIdx: number, toIdx: number) => {
    if (isAnswered || toIdx < 0 || toIdx >= userOrderedStages.length) return;
    const updated = [...userOrderedStages];
    const item = updated.splice(fromIdx, 1)[0];
    updated.splice(toIdx, 0, item);
    setUserOrderedStages(updated);
  };

  const handleVerify = () => {
    if (isAnswered) return;

    // Correct order matches the original stages array in TAMIL_WORD_EVOLUTION_DATA
    const correctPeriods = wordData.stages.map((s) => s.period);
    const userPeriods = userOrderedStages.map((s) => s.period);

    const isMatch = correctPeriods.every((val, idx) => val === userPeriods[idx]);

    setIsAnswered(true);
    setIsCorrectOrder(isMatch);

    const timeTaken = Date.now() - startTime;
    const { pointsAdded, newStreak } = calculateAnswerScore(isMatch, timeTaken, scoreState.streak);

    setScoreState((prev) => {
      const correctCount = isMatch ? prev.correctAnswers + 1 : prev.correctAnswers;
      const totalQ = prev.totalQuestions + 1;

      return {
        score: prev.score + pointsAdded,
        correctAnswers: correctCount,
        totalQuestions: totalQ,
        streak: newStreak,
        maxStreak: Math.max(prev.maxStreak, newStreak),
        accuracy: Math.round((correctCount / totalQ) * 100),
      };
    });
  };

  const handleNext = () => {
    if (currentWordIndex + 1 < wordKeys.length) {
      setCurrentWordIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentWordIndex(0);
    setScoreState(INITIAL_SCORE_STATE);
    setIsCompleted(false);
    loadWord(0);
  };

  if (isCompleted) {
    return (
      <CompletionScreen
        gameId="word_journey"
        gameTitle="சொல்லின் பயணம் (Word Evolution Challenge)"
        score={scoreState.score}
        correctAnswers={scoreState.correctAnswers}
        totalQuestions={wordKeys.length}
        maxStreak={scoreState.maxStreak}
        historicalNote="சங்கக் காலம், இடைக்காலம் மற்றும் நவீன காலத்தில் தமிழ் சொற்கள் வடிவம் மற்றும் பொருளில் பெற்றுள்ள பரிணாம மாற்றங்களை வெற்றியுடன் வரிசைப்படுத்தினீர்கள்."
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Shared Header */}
      <GameHeader
        title="🧬 சொல்லின் பயணம் (Word Evolution Journey)"
        currentRound={currentWordIndex + 1}
        totalRounds={wordKeys.length}
        score={scoreState.score}
        streak={scoreState.streak}
      />

      {/* Main Challenge Card */}
      <div className="bg-white border-2 border-[#e7dcd0] rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
        
        {/* Word Hero Card */}
        <div className="bg-[#fcf8f2] border-2 border-[#e6dac8] rounded-2xl p-6 text-center space-y-3 shadow-inner">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#581515] text-amber-300 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>சொல் பரிணாம வரிசைப்படுத்தல்</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black text-[#581515] tracking-tight font-serif">
            "{wordData.word}"
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <span className="text-xs font-black bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-300">
              பொருள்கள்: {wordData.meanings.join(' • ')}
            </span>
            {wordData.category && (
              <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                {wordData.category}
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm font-semibold text-slate-600 pt-2">
            கீழே உள்ள காலக் கட்டங்களைச் சரியான வரலாற்று வரிசையில் (சங்கக் காலம் → இடைக்காலம் → நவீன காலம்) அம்புக்குறிகளைப் பயன்படுத்தி அமைக்கவும்.
          </p>
        </div>

        {/* Shuffled Stage Cards to Order */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-black text-[#581515] uppercase tracking-wider px-1">
            <span>கால வரிசை (Chronological Order):</span>
            <span>வரிசையை மாற்ற (▲ / ▼) அழுத்தவும்</span>
          </div>

          <div className="space-y-3">
            {userOrderedStages.map((stage, idx) => {
              const isCorrectPosition = isAnswered && wordData.stages[idx]?.period === stage.period;

              let cardStyle = 'bg-[#fbf7f0] border-2 border-[#e6dac8] text-slate-900';
              if (isAnswered) {
                if (isCorrectPosition) {
                  cardStyle = 'bg-emerald-50 border-2 border-emerald-500 text-emerald-950 shadow-md';
                } else {
                  cardStyle = 'bg-rose-50 border-2 border-rose-400 text-rose-950 shadow-sm';
                }
              }

              return (
                <div
                  key={idx}
                  className={`p-4 sm:p-5 rounded-2xl flex items-center justify-between gap-4 transition-all ${cardStyle}`}
                >
                  <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
                    {/* Index Badge */}
                    <span className="w-8 h-8 rounded-xl bg-[#581515] text-amber-300 flex items-center justify-center font-black text-xs shrink-0 shadow-sm">
                      {idx + 1}
                    </span>

                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-extrabold text-sm sm:text-base text-[#581515] truncate">
                          {stage.period}
                        </span>
                        <span className="text-xs font-black bg-white/80 px-2 py-0.5 rounded border border-slate-200">
                          வடிவம்: "{stage.form}"
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 font-semibold truncate">
                        பொருள்: {stage.meaning}
                      </p>
                    </div>
                  </div>

                  {/* Re-order Up/Down Buttons */}
                  {!isAnswered ? (
                    <div className="flex items-center space-x-1 shrink-0">
                      <button
                        onClick={() => moveStage(idx, idx - 1)}
                        disabled={idx === 0}
                        className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-[#f4ece1] text-slate-700 disabled:opacity-30 cursor-pointer shadow-xs"
                        title="மேலே நகர்த்து"
                      >
                        <ArrowUp className="w-4 h-4 text-[#581515]" />
                      </button>
                      <button
                        onClick={() => moveStage(idx, idx + 1)}
                        disabled={idx === userOrderedStages.length - 1}
                        className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-[#f4ece1] text-slate-700 disabled:opacity-30 cursor-pointer shadow-xs"
                        title="கீழே நகர்த்து"
                      >
                        <ArrowDown className="w-4 h-4 text-[#581515]" />
                      </button>
                    </div>
                  ) : (
                    <div className="shrink-0">
                      {isCorrectPosition ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                      ) : (
                        <XCircle className="w-6 h-6 text-rose-600" />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button: Verify Order */}
        {!isAnswered && (
          <div className="flex justify-end pt-2">
            <button
              onClick={handleVerify}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-sm px-8 py-3.5 rounded-2xl shadow-lg transition-transform active:scale-95 cursor-pointer"
            >
              <Check className="w-4 h-4 text-slate-950 stroke-[3]" />
              <span>சரிபார் (Verify Order)</span>
            </button>
          </div>
        )}

        {/* Explanation Banner */}
        {isAnswered && (
          <div className={`p-6 rounded-2xl border-2 space-y-4 animate-in fade-in duration-300 ${
            isCorrectOrder ? 'bg-emerald-50/80 border-emerald-300' : 'bg-rose-50/80 border-rose-300'
          }`}>
            <div className="flex items-center space-x-2 font-black text-sm">
              {isCorrectOrder ? (
                <div className="text-emerald-900 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>சரியான வரலாற்று கால வரிசை! 🎉</span>
                </div>
              ) : (
                <div className="text-rose-900 flex items-center space-x-1.5">
                  <XCircle className="w-5 h-5 text-rose-600" />
                  <span>வரிசையில் தவறு உள்ளது. சரியான வரிசை கீழே தரப்பட்டுள்ளது.</span>
                </div>
              )}
            </div>

            {/* Meaning Evolution Details */}
            {wordData.meaningEvolution && (
              <div className="bg-white/80 p-4 rounded-xl border border-slate-200 text-xs space-y-1.5">
                <span className="font-extrabold text-[#581515] block">📜 பொருள் பரிணாம வளர்ச்சி:</span>
                <p className="text-slate-700 font-semibold leading-relaxed">
                  {wordData.meaningEvolution.join(' → ')}
                </p>
              </div>
            )}

            {/* Next Round Button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#581515] to-[#7a2222] hover:from-[#7a2222] hover:to-[#581515] text-amber-300 font-black text-sm px-7 py-3.5 rounded-2xl shadow-lg border border-amber-400/40 transition-transform active:scale-95 cursor-pointer"
              >
                <span>{currentWordIndex + 1 < wordKeys.length ? 'அடுத்த சொல் →' : 'முடிவுகளைப் பார்'}</span>
                <ArrowRight className="w-4 h-4 text-amber-300 ml-1" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
