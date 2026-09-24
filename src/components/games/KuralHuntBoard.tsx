"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Volume2, 
  RotateCcw, 
  Trophy, 
  Flame, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Lock, 
  Unlock, 
  ChevronRight, 
  Home, 
  Gamepad2, 
  HelpCircle,
  VolumeX,
  Award
} from 'lucide-react';
import { speakTamilText } from '@/lib/audioTTS';
import { 
  THIRUKKURAL_DATASET, 
  ThirukkuralItem, 
  getKuralWords, 
  getDistractorWords 
} from '@/data/thirukkuralData';

// Level configurations
interface LevelConfig {
  level: number;
  name: string;
  subtitle: string;
  missingCount: number;
  distractorCount: number;
  isTypingMode: boolean;
}

const LEVEL_CONFIGS: LevelConfig[] = [
  { level: 1, name: 'நிலை 1 — எளிது', subtitle: '1 விடுபட்ட சொல்', missingCount: 1, distractorCount: 3, isTypingMode: false },
  { level: 2, name: 'நிலை 2 — இடைநிலை', subtitle: '2 விடுபட்ட சொற்கள்', missingCount: 2, distractorCount: 4, isTypingMode: false },
  { level: 3, name: 'நிலை 3 — சவால்', subtitle: '3 விடுபட்ட சொற்கள்', missingCount: 3, distractorCount: 4, isTypingMode: false },
  { level: 4, name: 'நிலை 4 — நிபுணர்', subtitle: '4+ விடுபட்ட சொற்கள்', missingCount: 4, distractorCount: 5, isTypingMode: false },
  { level: 5, name: 'நிலை 5 — மாஸ்டர்', subtitle: 'எழுதி நிரப்புக (Type answer)', missingCount: 2, distractorCount: 0, isTypingMode: true },
];

const QUESTIONS_PER_LEVEL = 5;

export default function KuralHuntBoard() {
  // State variables
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [unlockedLevel, setUnlockedLevel] = useState<number>(1);
  const [questionIndex, setQuestionIndex] = useState<number>(0);

  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [totalAttempts, setTotalAttempts] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);

  // Audio state
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Current Question State
  const [currentKural, setCurrentKural] = useState<ThirukkuralItem>(THIRUKKURAL_DATASET[0]);
  const [missingIndices, setMissingIndices] = useState<number[]>([]);
  const [correctSequence, setCorrectSequence] = useState<string[]>([]);
  const [optionBank, setOptionBank] = useState<string[]>([]);

  // User selections / inputs
  const [userSelectedWords, setUserSelectedWords] = useState<string[]>([]);
  const [typedInputs, setTypedInputs] = useState<string[]>([]);

  // Feedback states
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [speedBonus, setSpeedBonus] = useState<boolean>(false);

  // Timing
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());

  // Game Winner Screen
  const [isLevelComplete, setIsLevelComplete] = useState<boolean>(false);

  // Load unlocked level from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLevel = localStorage.getItem('kural_hunt_unlocked_level');
      if (savedLevel) {
        const lvl = parseInt(savedLevel, 10);
        if (!isNaN(lvl) && lvl >= 1 && lvl <= 5) {
          setUnlockedLevel(lvl);
        }
      }
    }
  }, []);

  // Save unlocked level to localStorage
  const unlockNextLevel = (completedLevel: number) => {
    const nextLvl = Math.min(5, completedLevel + 1);
    if (nextLvl > unlockedLevel) {
      setUnlockedLevel(nextLvl);
      if (typeof window !== 'undefined') {
        localStorage.setItem('kural_hunt_unlocked_level', nextLvl.toString());
      }
    }
  };

  // Setup question whenever level or questionIndex changes
  useEffect(() => {
    loadQuestion(currentLevel, questionIndex);
  }, [currentLevel, questionIndex]);

  const loadQuestion = (lvl: number, qIdx: number) => {
    const config = LEVEL_CONFIGS[lvl - 1];
    // Select Kural deterministically / cycle dataset
    const kuralIndex = ( (lvl - 1) * QUESTIONS_PER_LEVEL + qIdx ) % THIRUKKURAL_DATASET.length;
    const kural = THIRUKKURAL_DATASET[kuralIndex];
    const allWords = getKuralWords(kural); // 7 words total (0 to 3 in line 1, 4 to 6 in line 2)

    // Determine missing word indices
    let targetIndices: number[] = [];
    if (config.missingCount === 1) {
      // Pick end word or middle word based on question index
      targetIndices = [(qIdx * 3 + 3) % 7];
    } else if (config.missingCount === 2) {
      targetIndices = [0, 3];
    } else if (config.missingCount === 3) {
      targetIndices = [0, 2, 3];
    } else {
      // 4 words missing
      targetIndices = [0, 1, 2, 3];
    }

    // Ensure sorted order of missing indices
    targetIndices.sort((a, b) => a - b);

    const targets = targetIndices.map((idx) => allWords[idx]);

    setCurrentKural(kural);
    setMissingIndices(targetIndices);
    setCorrectSequence(targets);
    setUserSelectedWords([]);
    setTypedInputs(new Array(targets.length).fill(''));
    setIsAnswered(false);
    setIsError(false);
    setErrorMessage('');
    setSpeedBonus(false);
    setQuestionStartTime(Date.now());

    if (!config.isTypingMode) {
      // Prepare options bank: correct targets + distractors
      const distractors = getDistractorWords(targets, config.distractorCount);
      const combined = [...targets, ...distractors].sort(() => 0.5 - Math.random());
      setOptionBank(combined);
    }
  };

  // Audio Handler
  const handlePlayAudio = () => {
    if (isPlayingAudio) return;
    setIsPlayingAudio(true);
    speakTamilText(currentKural.fullText, () => {
      setIsPlayingAudio(false);
    });
  };

  // Selection Handler for Multiple Choice Options
  const handleOptionClick = (word: string) => {
    if (isAnswered) return;
    setIsError(false);

    // If word is already selected, remove it
    if (userSelectedWords.includes(word)) {
      setUserSelectedWords(userSelectedWords.filter((w) => w !== word));
      return;
    }

    // Check if max selections reached
    if (userSelectedWords.length >= correctSequence.length) {
      return;
    }

    const updated = [...userSelectedWords, word];
    setUserSelectedWords(updated);

    // If all slots filled, validate answer automatically
    if (updated.length === correctSequence.length) {
      validateSelections(updated);
    }
  };

  // Validate Multiple Choice selections
  const validateSelections = (selections: string[]) => {
    setTotalAttempts((prev) => prev + 1);

    // Check exact sequence match
    let isCorrect = true;
    for (let i = 0; i < correctSequence.length; i++) {
      if (selections[i] !== correctSequence[i]) {
        isCorrect = false;
        break;
      }
    }

    if (isCorrect) {
      handleCorrectAnswer();
    } else {
      handleWrongAnswer('சில சொற்கள் வரிசை மாறி அல்லது தவறாக உள்ளன! மீண்டும் முயற்சிக்கவும்.');
    }
  };

  // Validate Level 5 Typed Inputs
  const handleTypedSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isAnswered) return;

    setTotalAttempts((prev) => prev + 1);

    const normalize = (s: string) =>
      s.trim().toLowerCase().replace(/[\u200B-\u200D\uFEFF]/g, '').replace(/\s+/g, ' ');

    let isCorrect = true;
    for (let i = 0; i < correctSequence.length; i++) {
      if (normalize(typedInputs[i] || '') !== normalize(correctSequence[i])) {
        isCorrect = false;
        break;
      }
    }

    if (isCorrect) {
      handleCorrectAnswer();
    } else {
      handleWrongAnswer('தட்டச்சு செய்த எழுத்து தவறாக உள்ளது. சரிபார்த்து மீண்டும் எழுதவும்!');
    }
  };

  const handleCorrectAnswer = () => {
    const elapsedSeconds = (Date.now() - questionStartTime) / 1000;
    const isFast = elapsedSeconds <= 10;
    setSpeedBonus(isFast);

    const points = 100 + (isFast ? 50 : 0);
    setScore((prev) => prev + points);

    const newStreak = streak + 1;
    setStreak(newStreak);
    if (newStreak > bestStreak) setBestStreak(newStreak);

    setCorrectCount((prev) => prev + 1);
    setIsAnswered(true);
    setIsError(false);

    // Auto advance after 1.8 seconds
    setTimeout(() => {
      if (questionIndex + 1 < QUESTIONS_PER_LEVEL) {
        setQuestionIndex((prev) => prev + 1);
      } else {
        // Level Completed!
        unlockNextLevel(currentLevel);
        setIsLevelComplete(true);
      }
    }, 1800);
  };

  const handleWrongAnswer = (msg: string) => {
    setIsError(true);
    setErrorMessage(msg);
    setStreak(0); // Reset streak on wrong attempt
  };

  const resetSelection = () => {
    setUserSelectedWords([]);
    setIsError(false);
  };

  const restartCurrentLevel = () => {
    setQuestionIndex(0);
    setIsLevelComplete(false);
    setScore(0);
    setStreak(0);
    loadQuestion(currentLevel, 0);
  };

  const handleSelectLevel = (lvl: number) => {
    if (lvl > unlockedLevel) return;
    setCurrentLevel(lvl);
    setQuestionIndex(0);
    setIsLevelComplete(false);
  };

  // Render text for line1 or line2 with missing words replaced by blanks or filled words
  const renderKuralLine = (lineText: string, lineIndexOffset: number) => {
    const words = lineText.trim().split(/\s+/);
    return (
      <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 my-2">
        {words.map((word, idx) => {
          const globalIdx = lineIndexOffset + idx;
          const isMissing = missingIndices.includes(globalIdx);

          if (!isMissing) {
            return (
              <span key={globalIdx} className="text-xl sm:text-2xl md:text-3xl font-black text-amber-50">
                {word}
              </span>
            );
          }

          // It is a missing word
          const missingPosIndex = missingIndices.indexOf(globalIdx);
          const config = LEVEL_CONFIGS[currentLevel - 1];

          let filledText = '';
          if (isAnswered) {
            filledText = correctSequence[missingPosIndex];
          } else if (config.isTypingMode) {
            filledText = typedInputs[missingPosIndex] || '';
          } else {
            filledText = userSelectedWords[missingPosIndex] || '';
          }

          return (
            <span
              key={globalIdx}
              className={`inline-flex items-center justify-center min-w-[100px] sm:min-w-[120px] px-3 py-1.5 rounded-2xl border-2 transition-all font-black text-lg sm:text-2xl shadow-inner ${
                isAnswered
                  ? 'bg-amber-400 text-slate-950 border-amber-300 scale-105 animate-pulse'
                  : filledText
                  ? 'bg-amber-100 text-[#581515] border-amber-400 shadow-sm'
                  : 'bg-black/40 text-amber-300/60 border-amber-400/50 border-dashed'
              }`}
            >
              {filledText ? (
                <span>{filledText}</span>
              ) : (
                <span className="text-amber-400/40 text-xs sm:text-sm font-extrabold tracking-widest">
                  ______
                </span>
              )}
            </span>
          );
        })}
      </div>
    );
  };

  const currentConfig = LEVEL_CONFIGS[currentLevel - 1];
  const accuracy = totalAttempts > 0 ? Math.round((correctCount / totalAttempts) * 100) : 100;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-20 px-4 sm:px-6">
      
      {/* Top Header & Navigation */}
      <div className="flex items-center justify-between gap-3 bg-white border-2 border-[#e7dcd0] rounded-3xl p-4 shadow-sm">
        <Link
          href="/games"
          className="inline-flex items-center space-x-2 text-xs sm:text-sm font-black text-[#581515] hover:text-[#7a2222] bg-[#fbf7f0] hover:bg-[#f4ece1] px-4 py-2.5 rounded-2xl border border-[#e6dac8] transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-[#581515]" />
          <span className="hidden sm:inline">விளையாட்டு முகப்பு</span>
          <span className="sm:hidden">முகப்பு</span>
        </Link>

        <div className="text-center">
          <h1 className="text-lg sm:text-xl font-black text-[#581515] font-serif tracking-tight">
            குறளை கண்டுபிடி 📖
          </h1>
          <p className="text-[11px] text-amber-800 font-extrabold">Kural Hunt Heritage Challenge</p>
        </div>

        <div className="inline-flex items-center space-x-1.5 bg-gradient-to-r from-[#581515] to-[#7a2222] text-amber-300 px-3.5 py-2 rounded-2xl border border-amber-400/40 text-xs sm:text-sm font-black shadow-sm">
          <Trophy className="w-4 h-4 text-amber-300 shrink-0" />
          <span>{score}</span>
        </div>
      </div>

      {/* Level Selector Bar */}
      <div className="bg-[#fbf7f0] border-2 border-[#e7dcd0] rounded-3xl p-3 shadow-xs">
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-none">
          {LEVEL_CONFIGS.map((lvl) => {
            const isUnlocked = lvl.level <= unlockedLevel;
            const isActive = lvl.level === currentLevel;

            return (
              <button
                key={lvl.level}
                onClick={() => handleSelectLevel(lvl.level)}
                disabled={!isUnlocked}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-2xl font-black text-xs transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#581515] text-amber-300 border-2 border-amber-400 shadow-md scale-105'
                    : isUnlocked
                    ? 'bg-white text-slate-700 hover:bg-amber-100/60 border border-[#e6dac8]'
                    : 'bg-slate-100 text-slate-400 border border-slate-200 opacity-60 cursor-not-allowed'
                }`}
              >
                {!isUnlocked ? (
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <Unlock className="w-3.5 h-3.5 text-amber-500" />
                )}
                <span>நில {lvl.level}</span>
              </button>
            );
          })}
        </div>
      </div>

      {!isLevelComplete ? (
        <>
          {/* Progress & Stats Bar */}
          <div className="bg-white border-2 border-[#e7dcd0] rounded-3xl p-4 shadow-md space-y-3">
            <div className="flex items-center justify-between text-xs font-black text-[#581515]">
              <span className="uppercase tracking-wider">
                {currentConfig.name} ({currentConfig.subtitle})
              </span>
              <div className="flex items-center space-x-3">
                {streak >= 2 && (
                  <span className="inline-flex items-center space-x-1 bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-0.5 rounded-full font-black animate-pulse">
                    <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                    <span>{streak} Streak!</span>
                  </span>
                )}
                <span>கேள்வி {questionIndex + 1} / {QUESTIONS_PER_LEVEL}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200">
              <div
                className="bg-gradient-to-r from-[#581515] via-[#C89551] to-amber-500 h-full transition-all duration-500 rounded-full"
                style={{ width: `${((questionIndex + 1) / QUESTIONS_PER_LEVEL) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* MAIN KURAL CARD (Palm Leaf Aesthetic) */}
          <div className="relative rounded-3xl overflow-hidden p-6 sm:p-10 text-center shadow-xl border-2 border-amber-400 bg-cover bg-center space-y-6"
               style={{ backgroundImage: "url('/palm-leaf.jpg')" }}>
            <div className="absolute inset-0 bg-gradient-to-r from-[#581515]/95 via-[#420f0f]/90 to-[#581515]/95 z-0" />

            <div className="relative z-10 space-y-4">
              {/* Chapter Tag */}
              <div className="inline-block bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-md">
                அதிகாரம்: {currentKural.chapter} • குறள் {currentKural.number}
              </div>

              {/* Thirukkural Lines Display */}
              <div className="space-y-2 py-4">
                {renderKuralLine(currentKural.line1, 0)}
                {renderKuralLine(currentKural.line2, 4)}
              </div>

              {/* AUDIO BUTTON (Requirement 4: Directly below Kural card) */}
              <div className="pt-2 flex justify-center">
                <button
                  onClick={handlePlayAudio}
                  disabled={isPlayingAudio}
                  className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full font-black text-xs sm:text-sm shadow-lg border transition-all cursor-pointer ${
                    isPlayingAudio
                      ? 'bg-amber-400 text-slate-950 border-amber-300 animate-bounce'
                      : 'bg-amber-300 hover:bg-amber-400 text-[#581515] border-amber-200 hover:scale-105 active:scale-95'
                  }`}
                >
                  <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-spin' : ''}`} />
                  <span>{isPlayingAudio ? '🔊 கேட்கிறது...' : '🔊 குறளை கேள்'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* FEEDBACK BANNER (Correct or Wrong) */}
          {isAnswered && (
            <div className="bg-emerald-50 border-2 border-emerald-400 rounded-3xl p-5 text-center shadow-md animate-fade-in space-y-2">
              <div className="flex items-center justify-center space-x-2 text-emerald-800 font-black text-xl">
                <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                <span>🎉 சரியான விடை!</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-900 font-bold">
                +{100} புள்ளிகள் {speedBonus && '⚡ (+50 Speed Bonus!)'}
              </p>
              <div className="text-xs text-slate-700 bg-white p-3 rounded-2xl border border-emerald-200 font-medium italic mt-2">
                <strong>பொருள்:</strong> {currentKural.meaning}
              </div>
            </div>
          )}

          {isError && (
            <div className="bg-rose-50 border-2 border-rose-300 rounded-3xl p-4 text-center shadow-sm space-y-2 animate-shake">
              <div className="flex items-center justify-center space-x-2 text-rose-700 font-black text-base">
                <XCircle className="w-5 h-5 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            </div>
          )}

          {/* ANSWER INPUT SECTION (Option Bank vs Typing Mode) */}
          {!isAnswered && (
            <div className="bg-white border-2 border-[#e7dcd0] rounded-3xl p-6 shadow-md space-y-6">
              
              {!currentConfig.isTypingMode ? (
                <>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-black text-[#581515]">
                      விடுபட்ட {correctSequence.length} சொற்களைத் தேர்ந்தெடுக்கவும்:
                    </h3>

                    {userSelectedWords.length > 0 && (
                      <button
                        onClick={resetSelection}
                        className="inline-flex items-center space-x-1 text-xs font-black text-rose-600 hover:text-rose-800 bg-rose-50 px-3 py-1 rounded-full border border-rose-200 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>அழித்துத் தொடங்கு</span>
                      </button>
                    )}
                  </div>

                  {/* Selected Words Status Chips */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {correctSequence.map((_, idx) => {
                      const sel = userSelectedWords[idx];
                      return (
                        <div
                          key={idx}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-extrabold flex items-center space-x-1 ${
                            sel
                              ? 'bg-amber-100 text-[#581515] border-amber-400'
                              : 'bg-slate-50 text-slate-400 border-slate-200 border-dashed'
                          }`}
                        >
                          <span>✓ இட {idx + 1}:</span>
                          <strong className="text-slate-900">{sel || '______'}</strong>
                        </div>
                      );
                    })}
                  </div>

                  {/* Option Buttons Bank */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
                    {optionBank.map((word, idx) => {
                      const isSelected = userSelectedWords.includes(word);
                      return (
                        <button
                          key={idx}
                          onClick={() => handleOptionClick(word)}
                          className={`p-3.5 rounded-2xl font-black text-base transition-all shadow-sm active:scale-95 cursor-pointer text-center ${
                            isSelected
                              ? 'bg-[#581515] text-amber-300 border-2 border-amber-400 scale-95 opacity-80'
                              : 'bg-[#fbf7f0] hover:bg-amber-100 text-[#581515] border-2 border-[#e6dac8] hover:border-[#C89551]'
                          }`}
                        >
                          {word}
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : (
                /* LEVEL 5 MASTER TYPING MODE */
                <form onSubmit={handleTypedSubmit} className="space-y-4">
                  <h3 className="text-sm font-black text-[#581515]">
                    விடுபட்ட சொற்களைத் தமிழில் தட்டச்சு செய்க:
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {correctSequence.map((_, idx) => (
                      <div key={idx} className="space-y-1">
                        <label className="text-xs font-extrabold text-amber-900">
                          சொல் {idx + 1}:
                        </label>
                        <input
                          type="text"
                          value={typedInputs[idx] || ''}
                          onChange={(e) => {
                            const updated = [...typedInputs];
                            updated[idx] = e.target.value;
                            setTypedInputs(updated);
                            setIsError(false);
                          }}
                          placeholder={`சொல் ${idx + 1} தட்டச்சு செய்ய...`}
                          className="w-full px-4 py-3 rounded-2xl border-2 border-[#e6dac8] focus:border-[#581515] bg-[#fbf7f0] font-black text-base text-slate-900 outline-none transition-all shadow-inner"
                        />
                      </div>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-[#581515] to-[#7a2222] hover:from-[#7a2222] hover:to-[#581515] text-amber-300 font-black text-base rounded-2xl shadow-md border border-amber-400/40 transition-all cursor-pointer"
                  >
                    விடையை சரிபார்
                  </button>
                </form>
              )}

            </div>
          )}
        </>
      ) : (
        /* WINNER CELEBRATION SCREEN (Requirement 8) */
        <div className="bg-white border-2 border-amber-400 rounded-3xl p-8 sm:p-12 text-center shadow-2xl space-y-8 animate-fade-in relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500" />

          <div className="space-y-3">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-[#581515] border-2 border-amber-400 text-amber-300 flex items-center justify-center shadow-xl animate-bounce">
              <Trophy className="w-10 h-10 text-amber-300" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-[#581515] font-serif">
              🏆 WINNER!
            </h2>
            <p className="text-lg sm:text-xl font-black text-amber-800">
              “குறளை கண்டுபிடித்துவிட்டீர்கள்!”
            </p>

            <p className="text-xs sm:text-sm text-slate-600 font-semibold max-w-md mx-auto">
              வாழ்த்துகள்! {currentConfig.name} வெற்றிகரமாக முடித்து தமிழ் இலக்கிய அறிவை வளர்த்துக்கொண்டீர்கள்.
            </p>
          </div>

          {/* Stats Summary Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#fbf7f0] p-6 rounded-3xl border-2 border-[#e6dac8]">
            <div className="space-y-1">
              <div className="text-xs font-black text-slate-500 uppercase">⭐ Final Score</div>
              <div className="text-2xl font-black text-[#581515]">{score}</div>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-black text-slate-500 uppercase">🎯 Accuracy</div>
              <div className="text-2xl font-black text-emerald-700">{accuracy}%</div>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-black text-slate-500 uppercase">🔥 Best Streak</div>
              <div className="text-2xl font-black text-amber-600">{bestStreak}</div>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-black text-slate-500 uppercase">📖 Kurals Completed</div>
              <div className="text-2xl font-black text-indigo-700">{correctCount}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={restartCurrentLevel}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#581515] hover:bg-[#7a2222] text-amber-300 font-black text-sm px-6 py-3.5 rounded-2xl shadow-md border border-amber-400/40 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-amber-300" />
              <span>மீண்டும் விளையாடு</span>
            </button>

            {currentLevel < 5 && (
              <button
                onClick={() => {
                  setCurrentLevel(currentLevel + 1);
                  setQuestionIndex(0);
                  setIsLevelComplete(false);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-slate-950 font-black text-sm px-6 py-3.5 rounded-2xl shadow-md transition-all cursor-pointer"
              >
                <span>அடுத்த நிலை ({currentLevel + 1})</span>
                <ChevronRight className="w-4 h-4 text-slate-950" />
              </button>
            )}

            <Link
              href="/games"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white hover:bg-slate-50 text-[#581515] font-black text-sm px-6 py-3.5 rounded-2xl border-2 border-[#e6dac8] shadow-sm transition-all"
            >
              <Gamepad2 className="w-4 h-4 text-[#581515]" />
              <span>மற்றொரு விளையாட்டு</span>
            </Link>

            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-sm px-5 py-3.5 rounded-2xl border border-slate-300 transition-all"
            >
              <Home className="w-4 h-4 text-slate-600" />
              <span>முகப்புக்குச் செல்</span>
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
