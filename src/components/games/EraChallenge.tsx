"use client";

import React, { useState, useEffect } from 'react';
import GameHeader from './GameHeader';
import Timeline from './Timeline';
import CompletionScreen from './CompletionScreen';
import { ERA_CHALLENGE_DATA, EraQuestion } from '@/lib/games/eraData';
import { calculateAnswerScore, INITIAL_SCORE_STATE, GameScoreState } from '@/lib/games/scoring';
import { CheckCircle2, XCircle, ArrowRight, HelpCircle, Sparkles, BookOpen, Clock } from 'lucide-react';

export default function EraChallenge() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [scoreState, setScoreState] = useState<GameScoreState>(INITIAL_SCORE_STATE);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ: EraQuestion = ERA_CHALLENGE_DATA[currentIndex];

  useEffect(() => {
    setStartTime(Date.now());
    setSelectedOption(null);
    setIsAnswered(false);
  }, [currentIndex]);

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);

    const timeTaken = Date.now() - startTime;
    const isCorrect = option === currentQ.correctAnswer;

    const { pointsAdded, newStreak } = calculateAnswerScore(isCorrect, timeTaken, scoreState.streak);

    setScoreState((prev) => {
      const correctCount = isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers;
      const totalQ = prev.totalQuestions + 1;
      const newMaxStreak = Math.max(prev.maxStreak, newStreak);

      return {
        score: prev.score + pointsAdded,
        correctAnswers: correctCount,
        totalQuestions: totalQ,
        streak: newStreak,
        maxStreak: newMaxStreak,
        accuracy: Math.round((correctCount / totalQ) * 100),
      };
    });
  };

  const handleNext = () => {
    if (currentIndex + 1 < ERA_CHALLENGE_DATA.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScoreState(INITIAL_SCORE_STATE);
    setIsCompleted(false);
    setStartTime(Date.now());
  };

  if (isCompleted) {
    return (
      <CompletionScreen
        gameId="era_challenge"
        gameTitle="எந்த காலம்? (Timeline Era Challenge)"
        score={scoreState.score}
        correctAnswers={scoreState.correctAnswers}
        totalQuestions={ERA_CHALLENGE_DATA.length}
        maxStreak={scoreState.maxStreak}
        historicalNote="தமிழ் எழுத்து வடிவங்கள் பிராமியிலிருந்து வட்டெழுத்தாகவும், பல்லவர் சோழர் காலக் கிரந்த எழுத்துக்களிலிருந்து இன்றைய நவீன தமிழ் எழுத்தாகவும் வளர்ச்சி பெற்ற வரலாற்றை வெற்றிகரமாகப் பயின்றீர்கள்."
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Shared Header */}
      <GameHeader
        title="🏺 எந்த காலம்? (Timeline Era Challenge)"
        currentRound={currentIndex + 1}
        totalRounds={ERA_CHALLENGE_DATA.length}
        score={scoreState.score}
        streak={scoreState.streak}
      />

      {/* Main Question Card */}
      <div className="bg-white border-2 border-[#e7dcd0] rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
        
        {/* Visual Artifact Display Box */}
        <div className="bg-[#fcf8f2] border-2 border-[#e6dac8] rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-inner relative overflow-hidden">
          
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#581515] text-amber-300 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{currentQ.title}</span>
          </div>

          {/* Inscription Glyph & Image Visual Box */}
          <div className="py-6 px-4 bg-[#581515] text-amber-300 rounded-2xl border-2 border-[#C89551] shadow-xl flex flex-col items-center justify-center space-y-3 min-h-[140px]">
            {currentQ.scriptGlyph && (
              <div className="text-3xl sm:text-5xl font-mono tracking-widest text-amber-300 select-none drop-shadow-md">
                {currentQ.scriptGlyph}
              </div>
            )}
            <p className="text-xs sm:text-sm font-serif font-extrabold text-amber-100/90 italic">
              "{currentQ.imageCaption}"
            </p>
          </div>

          <p className="text-lg sm:text-2xl font-black text-[#581515] tracking-tight">
            {currentQ.question}
          </p>
        </div>

        {/* Answer Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedOption === option;
            const isCorrect = option === currentQ.correctAnswer;

            let btnStyle = 'bg-[#fbf7f0] border-[#e6dac8] text-slate-800 hover:border-[#581515] hover:bg-white';
            
            if (isAnswered) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-black shadow-md ring-2 ring-emerald-200';
              } else if (isSelected && !isCorrect) {
                btnStyle = 'bg-rose-50 border-rose-500 text-rose-950 font-black shadow-md ring-2 ring-rose-200';
              } else {
                btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(option)}
                disabled={isAnswered}
                className={`p-4 sm:p-5 rounded-2xl border-2 text-left font-black text-sm sm:text-base transition-all duration-200 flex items-center justify-between cursor-pointer ${btnStyle}`}
              >
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-xl bg-white/80 border border-slate-200 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                </div>

                {isAnswered && (
                  <div>
                    {isCorrect && <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />}
                    {isSelected && !isCorrect && <XCircle className="w-6 h-6 text-rose-600 shrink-0" />}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation & Educational Context Banner */}
        {isAnswered && (
          <div className="bg-amber-50/70 border-2 border-amber-200 rounded-2xl p-5 space-y-4 animate-in fade-in duration-300">
            <div className="flex items-start space-x-3">
              <BookOpen className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-black uppercase text-amber-900">
                    வரலாற்று விவாதம் & விளக்கம் ({currentQ.century}):
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-amber-950 font-semibold leading-relaxed">
                  {currentQ.explanation}
                </p>
              </div>
            </div>

            {/* Visual Era Timeline Component */}
            <Timeline
              selectedEra={selectedOption || undefined}
              correctEra={currentQ.correctAnswer}
              isAnswered={isAnswered}
            />

            {/* Next Round Button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#581515] to-[#7a2222] hover:from-[#7a2222] hover:to-[#581515] text-amber-300 font-black text-sm px-7 py-3.5 rounded-2xl shadow-lg border border-amber-400/40 transition-transform active:scale-95 cursor-pointer"
              >
                <span>{currentIndex + 1 < ERA_CHALLENGE_DATA.length ? 'அடுத்தது' : 'முடிவுகளைப் பார்'}</span>
                <ArrowRight className="w-4 h-4 text-amber-300 ml-1" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
