"use client";

import React, { useState, useEffect } from 'react';
import GameHeader from './GameHeader';
import CompletionScreen from './CompletionScreen';
import { LETTER_MATCH_DATA, LetterMatchPair } from '@/lib/games/letterMatchData';
import { calculateAnswerScore, INITIAL_SCORE_STATE, GameScoreState } from '@/lib/games/scoring';
import { CheckCircle2, XCircle, Sparkles, RefreshCw, ArrowRight } from 'lucide-react';

export default function LetterMatchBoard() {
  const [pairs, setPairs] = useState<LetterMatchPair[]>(LETTER_MATCH_DATA);
  const [shuffledModern, setShuffledModern] = useState<LetterMatchPair[]>([]);
  
  const [selectedAncientId, setSelectedAncientId] = useState<string | null>(null);
  const [selectedModernId, setSelectedModernId] = useState<string | null>(null);
  
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair] = useState<{ ancient: string; modern: string } | null>(null);
  
  const [scoreState, setScoreState] = useState<GameScoreState>(INITIAL_SCORE_STATE);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [isCompleted, setIsCompleted] = useState(false);

  // Shuffle modern letters on mount / restart
  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    const shuffled = [...LETTER_MATCH_DATA].sort(() => Math.random() - 0.5);
    setShuffledModern(shuffled);
    setMatchedIds(new Set());
    setSelectedAncientId(null);
    setSelectedModernId(null);
    setWrongPair(null);
    setScoreState(INITIAL_SCORE_STATE);
    setIsCompleted(false);
    setStartTime(Date.now());
  };

  const handleAncientClick = (id: string) => {
    if (matchedIds.has(id)) return;
    setWrongPair(null);
    setSelectedAncientId(id);

    if (selectedModernId) {
      checkMatch(id, selectedModernId);
    }
  };

  const handleModernClick = (id: string) => {
    if (matchedIds.has(id)) return;
    setWrongPair(null);
    setSelectedModernId(id);

    if (selectedAncientId) {
      checkMatch(selectedAncientId, id);
    }
  };

  const checkMatch = (ancientId: string, modernId: string) => {
    const isCorrect = ancientId === modernId;
    const timeTaken = Date.now() - startTime;

    if (isCorrect) {
      const { pointsAdded, newStreak } = calculateAnswerScore(true, timeTaken, scoreState.streak);

      const newMatched = new Set(matchedIds);
      newMatched.add(ancientId);
      setMatchedIds(newMatched);

      setScoreState((prev) => {
        const correctCount = prev.correctAnswers + 1;
        const totalQ = LETTER_MATCH_DATA.length;
        return {
          score: prev.score + pointsAdded,
          correctAnswers: correctCount,
          totalQuestions: totalQ,
          streak: newStreak,
          maxStreak: Math.max(prev.maxStreak, newStreak),
          accuracy: Math.round((correctCount / totalQ) * 100),
        };
      });

      setSelectedAncientId(null);
      setSelectedModernId(null);

      if (newMatched.size === LETTER_MATCH_DATA.length) {
        setTimeout(() => setIsCompleted(true), 600);
      }
    } else {
      setWrongPair({ ancient: ancientId, modern: modernId });
      setScoreState((prev) => ({ ...prev, streak: 0 }));

      setTimeout(() => {
        setSelectedAncientId(null);
        setSelectedModernId(null);
        setWrongPair(null);
      }, 700);
    }
  };

  if (isCompleted) {
    return (
      <CompletionScreen
        gameId="letter_match"
        gameTitle="தமிழ் எழுத்து Match (Ancient-to-Modern Letter Matching)"
        score={scoreState.score}
        correctAnswers={scoreState.correctAnswers}
        totalQuestions={LETTER_MATCH_DATA.length}
        maxStreak={scoreState.maxStreak}
        historicalNote="தமிழ்-பிராமி (தமிழி) வடிவத்திலிருந்து உருமாறி இன்றைய நவீன தமிழ் அச்சு வடிவங்கள் எவ்வாறு பரிணாமம் பெற்றன என்பதை வெற்றிகரமாகக் கற்றறிந்தீர்கள்! 🎉"
        onRestart={initGame}
      />
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Shared Header */}
      <GameHeader
        title="🔤 தமிழ் எழுத்து Match (Letter Matching)"
        currentRound={matchedIds.size}
        totalRounds={LETTER_MATCH_DATA.length}
        score={scoreState.score}
        streak={scoreState.streak}
      />

      {/* Main Board Container */}
      <div className="bg-white border-2 border-[#e7dcd0] rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
        
        {/* Instruction Banner */}
        <div className="bg-[#fcf8f2] border-2 border-[#e6dac8] rounded-2xl p-4 text-center space-y-1 shadow-inner">
          <div className="inline-flex items-center space-x-1.5 text-xs font-black uppercase text-[#581515]">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>எழுத்து பொருத்துதல் (Match Pairs)</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-bold">
            இடப்பக்கம் உள்ள பண்டைய எழுத்தைக் கிளிக் செய்து, வலப்பக்கம் உள்ள அதன் பொருத்தமான நவீன தமிழ் எழுத்தைத் தேர்ந்தெடுக்கவும்.
          </p>
        </div>

        {/* Matching Board Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          
          {/* Left Column: Ancient Script Cards */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b-2 border-[#581515]/20">
              <span className="text-xs font-black uppercase tracking-wider text-[#581515] flex items-center space-x-1.5">
                <span>🏛️ பழைய எழுத்து (Ancient Script)</span>
              </span>
              <span className="text-[10px] font-extrabold bg-[#f4ece1] px-2 py-0.5 rounded text-amber-900 border border-[#e6dac8]">
                தமிழ்-பிராமி (தமிழி)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {pairs.map((item) => {
                const isMatched = matchedIds.has(item.id);
                const isSelected = selectedAncientId === item.id;
                const isWrong = wrongPair?.ancient === item.id;

                let cardStyle = 'bg-[#fbf7f0] border-2 border-[#e6dac8] hover:border-[#581515] text-slate-900';
                if (isMatched) {
                  cardStyle = 'bg-emerald-50 border-2 border-emerald-500 text-emerald-950 opacity-90 shadow-sm';
                } else if (isWrong) {
                  cardStyle = 'bg-rose-50 border-2 border-rose-500 text-rose-950 animate-shake';
                } else if (isSelected) {
                  cardStyle = 'bg-[#581515] border-2 border-[#C89551] text-amber-300 shadow-xl scale-105 ring-4 ring-amber-100';
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => handleAncientClick(item.id)}
                    disabled={isMatched}
                    className={`p-4 rounded-2xl flex flex-col items-center justify-center space-y-2 transition-all duration-200 cursor-pointer min-h-[110px] ${cardStyle}`}
                  >
                    <span className="text-3xl sm:text-4xl font-mono font-bold tracking-widest">
                      {item.historicalGlyph}
                    </span>
                    <span className={`text-[10px] font-black truncate max-w-full ${isSelected ? 'text-amber-200' : 'text-slate-500'}`}>
                      {item.historicalName}
                    </span>

                    {isMatched && (
                      <span className="inline-flex items-center space-x-1 text-[10px] font-extrabold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-300">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>பொருந்தியது</span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Modern Tamil Letter Cards */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b-2 border-emerald-600/20">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-900 flex items-center space-x-1.5">
                <span>🌱 நவீன தமிழ் (Modern Tamil)</span>
              </span>
              <span className="text-[10px] font-extrabold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                இன்றைய வடிவம்
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {shuffledModern.map((item) => {
                const isMatched = matchedIds.has(item.id);
                const isSelected = selectedModernId === item.id;
                const isWrong = wrongPair?.modern === item.id;

                let cardStyle = 'bg-white border-2 border-slate-200 hover:border-emerald-600 text-slate-900';
                if (isMatched) {
                  cardStyle = 'bg-emerald-50 border-2 border-emerald-500 text-emerald-950 opacity-90 shadow-sm';
                } else if (isWrong) {
                  cardStyle = 'bg-rose-50 border-2 border-rose-500 text-rose-950 animate-shake';
                } else if (isSelected) {
                  cardStyle = 'bg-emerald-700 border-2 border-emerald-400 text-white shadow-xl scale-105 ring-4 ring-emerald-100';
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => handleModernClick(item.id)}
                    disabled={isMatched}
                    className={`p-4 rounded-2xl flex flex-col items-center justify-center space-y-2 transition-all duration-200 cursor-pointer min-h-[110px] ${cardStyle}`}
                  >
                    <span className="text-3xl sm:text-4xl font-extrabold">
                      {item.modernLetter}
                    </span>
                    <span className={`text-[10px] font-black truncate max-w-full ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                      {item.pronunciation}
                    </span>

                    {isMatched && (
                      <span className="inline-flex items-center space-x-1 text-[10px] font-extrabold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-300">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>பொருந்தியது</span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
