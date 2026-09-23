"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Keyboard, 
  Play, 
  RotateCcw, 
  Trophy, 
  Zap, 
  Target, 
  CheckCircle2, 
  Clock, 
  Timer, 
  Flame, 
  Sparkles, 
  Award, 
  Volume2, 
  ArrowRight,
  TrendingUp,
  Sliders,
  ChevronRight,
  Info
} from 'lucide-react';
import { 
  TYPING_LEVELS, 
  DAILY_CHALLENGE_WORDS, 
  ACHIEVEMENTS_LIST, 
  TAMIL99_KEYBOARD, 
  ANJAL_KEYBOARD,
  TypingLevel,
  TypingItem,
  TypingStats,
  KeyInfo
} from '@/data/typingContent';
import { useLanguage } from '@/lib/LanguageContext';
import { speakTamilText } from '@/lib/audioTTS';

type KeyboardLayout = 'tamil99' | 'anjal';
type PracticeMode = 'levels' | 'daily';

const STORAGE_KEY = 'aurex_tamil_typing_stats_v1';

const defaultStats: TypingStats = {
  totalCompleted: 0,
  bestWpm: 0,
  bestAccuracy: 0,
  totalCharactersTyped: 0,
  levelProgress: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  unlockedAchievements: []
};

export default function TamilTypingTutor() {
  const { lang } = useLanguage();
  const [layout, setLayout] = useState<KeyboardLayout>('tamil99');
  const [mode, setMode] = useState<PracticeMode>('levels');
  const [activeLevelNumber, setActiveLevelNumber] = useState<number>(1);

  // Stats & Progress loaded from localStorage
  const [stats, setStats] = useState<TypingStats>(defaultStats);
  const [mounted, setMounted] = useState<boolean>(false);

  // Active Session State
  const [currentItemIndex, setCurrentItemIndex] = useState<number>(0);
  const [typedInput, setTypedInput] = useState<string>('');
  const [isTestActive, setIsTestActive] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [totalErrorsInSession, setTotalErrorsInSession] = useState<number>(0);
  const [activeKeyPressed, setActiveKeyPressed] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Daily Challenge State
  const [dailyWordIndex, setDailyWordIndex] = useState<number>(0);
  const [dailyTimeRemaining, setDailyTimeRemaining] = useState<number>(120); // 2 minutes
  const [dailyActive, setDailyActive] = useState<boolean>(false);
  const [dailyCompleted, setDailyCompleted] = useState<boolean>(false);

  // Modal / Feedback state
  const [showResultModal, setShowResultModal] = useState<boolean>(false);
  const [lastCompletedStats, setLastCompletedStats] = useState<{
    wpm: number;
    accuracy: number;
    timeSec: number;
    charCount: number;
    errorCount: number;
  } | null>(null);
  const [newlyUnlockedAchievement, setNewlyUnlockedAchievement] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Current Level
  const currentLevel = useMemo(() => {
    return TYPING_LEVELS.find(l => l.levelNumber === activeLevelNumber) || TYPING_LEVELS[0];
  }, [activeLevelNumber]);

  // Current Target Item
  const currentTargetItem: TypingItem = useMemo(() => {
    if (mode === 'daily') {
      const word = DAILY_CHALLENGE_WORDS[dailyWordIndex % DAILY_CHALLENGE_WORDS.length];
      return { id: `daily-${dailyWordIndex}`, tamil: word };
    }
    return currentLevel.items[currentItemIndex % currentLevel.items.length];
  }, [mode, currentLevel, currentItemIndex, dailyWordIndex]);

  // Load from localStorage on client mount
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setStats(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Could not load typing stats from localStorage');
    }
  }, []);

  // Save stats to localStorage helper
  const saveStats = (updated: TypingStats) => {
    setStats(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not save typing stats to localStorage');
    }
  };

  // Timer logic for live WPM and Daily Challenge countdown
  useEffect(() => {
    if (isTestActive || dailyActive) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);

        if (dailyActive) {
          setDailyTimeRemaining(prev => {
            if (prev <= 1) {
              handleDailyChallengeEnd();
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTestActive, dailyActive]);

  // Calculate live WPM & Accuracy
  const liveStats = useMemo(() => {
    const minutes = Math.max(elapsedSeconds / 60, 0.05);
    const charsTyped = typedInput.length;
    const wpm = Math.round((charsTyped / 5) / minutes);
    
    let correctChars = 0;
    const target = currentTargetItem.tamil;
    for (let i = 0; i < typedInput.length; i++) {
      if (i < target.length && typedInput[i] === target[i]) {
        correctChars++;
      }
    }

    const accuracy = charsTyped === 0 
      ? 100 
      : Math.min(100, Math.max(0, Math.round((correctChars / charsTyped) * 100)));

    return {
      wpm: Math.max(0, wpm),
      accuracy,
      correctChars,
      wrongChars: Math.max(0, charsTyped - correctChars)
    };
  }, [typedInput, elapsedSeconds, currentTargetItem]);

  // Check achievements against current stats
  const checkAchievements = (currentWpm: number, currentAccuracy: number, currentStats: TypingStats) => {
    const updatedUnlocked = [...currentStats.unlockedAchievements];
    let newUnlockedName: string | null = null;

    for (const ach of ACHIEVEMENTS_LIST) {
      if (!updatedUnlocked.includes(ach.id)) {
        const dummyStats: TypingStats = {
          ...currentStats,
          bestWpm: Math.max(currentStats.bestWpm, currentWpm),
          bestAccuracy: Math.max(currentStats.bestAccuracy, currentAccuracy)
        };
        if (ach.condition(dummyStats)) {
          updatedUnlocked.push(ach.id);
          newUnlockedName = lang === 'en' ? ach.titleEn : ach.title;
        }
      }
    }

    if (newUnlockedName) {
      setNewlyUnlockedAchievement(newUnlockedName);
      setTimeout(() => setNewlyUnlockedAchievement(null), 4000);
    }

    return updatedUnlocked;
  };

  // Start Level Session
  const handleStartLevel = (levelNum: number) => {
    setActiveLevelNumber(levelNum);
    setMode('levels');
    setCurrentItemIndex(0);
    setTypedInput('');
    setIsTestActive(false);
    setStartTime(null);
    setElapsedSeconds(0);
    setTotalErrorsInSession(0);
    setShowResultModal(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // Start Daily Challenge
  const handleStartDailyChallenge = () => {
    setMode('daily');
    setDailyActive(true);
    setDailyCompleted(false);
    setDailyWordIndex(0);
    setDailyTimeRemaining(120);
    setTypedInput('');
    setStartTime(Date.now());
    setElapsedSeconds(0);
    setTotalErrorsInSession(0);
    setShowResultModal(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleDailyChallengeEnd = () => {
    setDailyActive(false);
    setDailyCompleted(true);
    const finalWpm = liveStats.wpm;
    const finalAccuracy = liveStats.accuracy;

    const newStats: TypingStats = {
      ...stats,
      totalCompleted: stats.totalCompleted + 1,
      bestWpm: Math.max(stats.bestWpm, finalWpm),
      bestAccuracy: Math.max(stats.bestAccuracy, finalAccuracy),
      dailyChallengeBest: {
        wpm: finalWpm,
        accuracy: finalAccuracy,
        completedAt: new Date().toLocaleDateString()
      }
    };
    newStats.unlockedAchievements = checkAchievements(finalWpm, finalAccuracy, newStats);
    saveStats(newStats);
  };

  // Typing Input Change Handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    
    // Auto-start timer on first character
    if (!isTestActive && !dailyActive) {
      setIsTestActive(true);
      setStartTime(Date.now());
    }

    setTypedInput(val);

    const target = currentTargetItem.tamil;

    // Check if target is fully and accurately matched
    if (val === target) {
      // Completed current item!
      const currentItemWpm = liveStats.wpm;
      const currentItemAcc = liveStats.accuracy;

      if (mode === 'daily') {
        if (dailyWordIndex + 1 >= 20) {
          // Completed full daily challenge of 20 words!
          handleDailyChallengeEnd();
          return;
        }
        setDailyWordIndex(prev => prev + 1);
        setTypedInput('');
        return;
      }

      // In Normal Level Practice Mode
      const nextIndex = currentItemIndex + 1;
      const isLevelFinished = nextIndex >= currentLevel.targetCount;

      if (isLevelFinished) {
        // Finished full level!
        setIsTestActive(false);
        const finalTime = Math.max(elapsedSeconds, 1);
        const finalChars = currentLevel.targetCount * 5;
        const finalWpm = Math.max(liveStats.wpm, 15);
        const finalAcc = Math.max(liveStats.accuracy, 85);

        setLastCompletedStats({
          wpm: finalWpm,
          accuracy: finalAcc,
          timeSec: finalTime,
          charCount: finalChars,
          errorCount: totalErrorsInSession
        });

        // Update Level Progress in LocalStorage
        const currentProgress = stats.levelProgress[activeLevelNumber] || 0;
        const updatedProgress = Math.min(100, Math.max(currentProgress + 25, 100));
        
        const nextLevelNumber = Math.min(5, activeLevelNumber + 1);
        const nextProgress = stats.levelProgress[nextLevelNumber] || 0;

        const updatedStats: TypingStats = {
          ...stats,
          totalCompleted: stats.totalCompleted + 1,
          bestWpm: Math.max(stats.bestWpm, finalWpm),
          bestAccuracy: Math.max(stats.bestAccuracy, finalAcc),
          totalCharactersTyped: stats.totalCharactersTyped + finalChars,
          levelProgress: {
            ...stats.levelProgress,
            [activeLevelNumber]: updatedProgress,
            [nextLevelNumber]: Math.max(nextProgress, 10)
          }
        };

        updatedStats.unlockedAchievements = checkAchievements(finalWpm, finalAcc, updatedStats);
        saveStats(updatedStats);
        setShowResultModal(true);
      } else {
        // Move to next word in level
        setCurrentItemIndex(nextIndex);
        setTypedInput('');

        // Partial progress update
        const progressPct = Math.round((nextIndex / currentLevel.targetCount) * 100);
        saveStats({
          ...stats,
          levelProgress: {
            ...stats.levelProgress,
            [activeLevelNumber]: Math.max(stats.levelProgress[activeLevelNumber] || 0, progressPct)
          }
        });
      }
    }
  };

  // Keyboard active key press visualization listener
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setActiveKeyPressed(e.key.toLowerCase());
    setTimeout(() => setActiveKeyPressed(null), 300);
  };

  // Virtual Key click handler (for typing on screen)
  const handleVirtualKeyClick = (keyInfo: KeyInfo) => {
    const charToAppend = keyInfo.tamilChar || keyInfo.key;
    const nextVal = typedInput + charToAppend;
    setTypedInput(nextVal);
    setActiveKeyPressed(keyInfo.key.toLowerCase());
    setTimeout(() => setActiveKeyPressed(null), 300);

    if (!isTestActive && !dailyActive) {
      setIsTestActive(true);
      setStartTime(Date.now());
    }

    inputRef.current?.focus();
  };

  // Native Audio Playback of target word
  const handleSpeakTarget = () => {
    setIsSpeaking(true);
    speakTamilText(currentTargetItem.tamil, () => {
      setIsSpeaking(false);
    });
  };

  return (
    <div className="w-full space-y-8 pb-16">
      
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-[#581515] via-[#420f0f] to-[#581515] text-white p-6 sm:p-10 rounded-3xl shadow-xl border-2 border-[#C89551] space-y-4 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-200 border border-amber-400/30 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              <Keyboard className="w-4 h-4 text-amber-300" />
              <span>{lang === 'en' ? 'Tamil Typewriting Tutor' : 'தமிழ் தட்டச்சுப் பயிற்சி • Typewriting Tutor'}</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-black text-[#fbf7f0] font-serif">
              {lang === 'en' ? 'Tamil Typewriting Tutor' : 'தமிழ் தட்டச்சுப் பயிற்சி'}
            </h1>
            
            <p className="text-amber-100/90 text-xs sm:text-base font-semibold max-w-2xl">
              {lang === 'en' 
                ? 'Master Tamil99 and Anjal typing easily with interactive real-time visual feedback, 5 structured levels, and live WPM tracking.'
                : 'தமிழ்99 மற்றும் அஞ்சல் தட்டச்சை எளிதாகக் கற்றுக்கொள்ளுங்கள். விரல் பயிற்சி, எளிய சொற்கள் மற்றும் வேகப் பரிசோதனைகள்!'}
            </p>
          </div>

          {/* Keyboard Layout Toggle Buttons */}
          <div className="bg-white/10 p-2 rounded-2xl border border-amber-400/30 flex items-center space-x-2 shrink-0 self-start md:self-auto backdrop-blur-md">
            <button
              onClick={() => setLayout('tamil99')}
              className={`px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                layout === 'tamil99'
                  ? 'bg-amber-400 text-slate-950 shadow-lg scale-105'
                  : 'text-amber-200 hover:text-white hover:bg-white/10'
              }`}
            >
              ⌨️ தமிழ்99 (Tamil99)
            </button>

            <button
              onClick={() => setLayout('anjal')}
              className={`px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                layout === 'anjal'
                  ? 'bg-amber-400 text-slate-950 shadow-lg scale-105'
                  : 'text-amber-200 hover:text-white hover:bg-white/10'
              }`}
            >
              🔤 அஞ்சல் (Anjal Phonetic)
            </button>
          </div>
        </div>
      </div>

      {/* Achievement Unlock Toast Notification */}
      {newlyUnlockedAchievement && (
        <div className="fixed top-6 right-6 z-50 bg-[#581515] text-amber-300 border-2 border-amber-400 p-4 rounded-2xl shadow-2xl flex items-center space-x-3 animate-in fade-in slide-in-from-top-4">
          <Trophy className="w-7 h-7 text-amber-300 animate-bounce" />
          <div>
            <span className="text-[10px] font-black uppercase text-amber-200 block">புதிய சாதனை வென்றீர்கள்! (Achievement Unlocked)</span>
            <span className="text-sm font-black text-white">{newlyUnlockedAchievement}</span>
          </div>
        </div>
      )}

      {/* 2. Top Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border-2 border-[#e7dcd0] p-4 rounded-2xl shadow-sm flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black">
            <Zap className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider block">
              {lang === 'en' ? 'Best Speed' : 'அதிகபட்ச வேகம்'}
            </span>
            <span className="text-xl sm:text-2xl font-black text-[#581515]">
              {stats.bestWpm} <span className="text-xs font-bold text-slate-500">WPM</span>
            </span>
          </div>
        </div>

        <div className="bg-white border-2 border-[#e7dcd0] p-4 rounded-2xl shadow-sm flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">
            <Target className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider block">
              {lang === 'en' ? 'Best Accuracy' : 'உயர் துல்லியம்'}
            </span>
            <span className="text-xl sm:text-2xl font-black text-emerald-700">
              {stats.bestAccuracy > 0 ? `${stats.bestAccuracy}%` : '---'}
            </span>
          </div>
        </div>

        <div className="bg-white border-2 border-[#e7dcd0] p-4 rounded-2xl shadow-sm flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-black">
            <Clock className="w-6 h-6 text-rose-600" />
          </div>
          <div>
            <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider block">
              {lang === 'en' ? 'Live Timer' : 'நடப்பு நேரம்'}
            </span>
            <span className="text-xl sm:text-2xl font-black text-slate-800 font-mono">
              {mode === 'daily' ? `${dailyTimeRemaining}s` : `${elapsedSeconds}s`}
            </span>
          </div>
        </div>

        <div className="bg-white border-2 border-[#e7dcd0] p-4 rounded-2xl shadow-sm flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-black">
            <Trophy className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider block">
              {lang === 'en' ? 'Trophies' : 'சாதனைகள்'}
            </span>
            <span className="text-xl sm:text-2xl font-black text-purple-800">
              {stats.unlockedAchievements.length} / {ACHIEVEMENTS_LIST.length}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Level Selection Bar (5 Levels) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-black text-[#581515] flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-[#581515]" />
            <span>{lang === 'en' ? 'Practice Levels (5 Levels)' : 'பயிற்சி நிலைகள் (5 நிலைகள்)'}</span>
          </h2>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleStartDailyChallenge}
              className={`px-4 py-2 rounded-xl text-xs font-black flex items-center space-x-1.5 transition-all cursor-pointer ${
                mode === 'daily'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-[#581515] text-amber-300 hover:bg-[#7a2222]'
              }`}
            >
              <Flame className="w-4 h-4 text-amber-300" />
              <span>{lang === 'en' ? 'Daily Challenge (2 Min)' : 'இன்றைய சவால் (Daily Challenge)'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {TYPING_LEVELS.map((level) => {
            const isSelected = mode === 'levels' && activeLevelNumber === level.levelNumber;
            const progress = stats.levelProgress[level.levelNumber] || 0;
            
            return (
              <div
                key={level.id}
                className={`bg-white border-2 rounded-2xl p-4 shadow-sm transition-all flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'border-[#581515] ring-2 ring-[#581515]/20 bg-[#fdfaf6]'
                    : 'border-[#e7dcd0] hover:border-[#C89551]'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-[#f4ece1] text-[#581515]">
                      {lang === 'en' ? level.badgeEn : level.badge}
                    </span>
                    {progress >= 100 && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    )}
                  </div>
                  <h3 className="font-black text-sm text-[#581515] font-serif leading-tight">
                    {lang === 'en' ? level.titleEn : level.title}
                  </h3>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-black text-slate-500">
                    <span>{lang === 'en' ? 'Progress' : 'முன்னேற்றம்'}</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-[#581515] rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => handleStartLevel(level.levelNumber)}
                  className={`w-full py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                    isSelected
                      ? 'bg-[#581515] text-amber-300 shadow-md'
                      : 'bg-[#f4ece1] hover:bg-[#581515] text-[#581515] hover:text-white'
                  }`}
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{isSelected ? (lang === 'en' ? 'Practicing' : 'பயிற்சியில்') : (lang === 'en' ? 'Start Level' : 'தொடங்கு')}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. MAIN TYPING ARENA */}
      <div className="bg-white border-2 border-[#e7dcd0] rounded-3xl p-6 sm:p-10 shadow-lg space-y-6">
        
        {/* Mode & Target Status Subheader */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e7dcd0] pb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-black uppercase text-[#581515] bg-amber-100 border border-amber-300 px-3 py-1 rounded-full">
              {mode === 'daily' 
                ? (lang === 'en' ? `Daily Challenge: Word ${dailyWordIndex + 1} of 20` : `இன்றைய சவால்: சொல் ${dailyWordIndex + 1} / 20`) 
                : (lang === 'en' ? `Level ${activeLevelNumber}: Item ${currentItemIndex + 1} of ${currentLevel.targetCount}` : `நிலை ${activeLevelNumber}: சொல் ${currentItemIndex + 1} / ${currentLevel.targetCount}`)}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              {layout === 'tamil99' ? 'Layout: Tamil99' : 'Layout: Anjal'}
            </span>
          </div>

          {/* Audio Listen & Reset */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSpeakTarget}
              className="p-2 rounded-xl bg-[#f4ece1] hover:bg-[#581515] text-[#581515] hover:text-white transition-colors cursor-pointer"
              title="Listen to Target Audio"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setTypedInput('');
                setIsTestActive(false);
                setElapsedSeconds(0);
                inputRef.current?.focus();
              }}
              className="p-2 rounded-xl bg-[#f4ece1] hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              title="Restart Word"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Target Word Display */}
        <div className="text-center py-6 sm:py-8 bg-[#fbf7f0] border-2 border-[#e6dac8] rounded-3xl space-y-3 relative overflow-hidden">
          <span className="text-xs font-black uppercase tracking-widest text-slate-400 block">
            {lang === 'en' ? 'Type the following word / sentence:' : 'இந்த வார்த்தையை தட்டச்சு செய்யவும்:'}
          </span>

          {/* Interactive Colored Character Stream */}
          <div className="text-3xl sm:text-5xl md:text-6xl font-black font-serif tracking-wide select-none leading-relaxed flex flex-wrap items-center justify-center gap-0.5 px-4">
            {currentTargetItem.tamil.split('').map((char, index) => {
              const isTyped = index < typedInput.length;
              const isCorrect = isTyped && typedInput[index] === char;
              const isCurrent = index === typedInput.length;

              return (
                <span
                  key={index}
                  className={`transition-all duration-150 relative ${
                    isCorrect
                      ? 'text-emerald-700 font-extrabold'
                      : isTyped
                      ? 'text-rose-600 bg-rose-100 rounded px-0.5'
                      : isCurrent
                      ? 'text-[#581515] underline decoration-amber-400 decoration-4 underline-offset-8 animate-pulse font-extrabold'
                      : 'text-slate-400'
                  }`}
                >
                  {char}
                </span>
              );
            })}
          </div>

          {currentTargetItem.transliteration && (
            <p className="text-xs sm:text-sm font-mono font-bold text-amber-900/80">
              {currentTargetItem.transliteration}
            </p>
          )}

          {currentTargetItem.meaningEn && (
            <p className="text-xs font-semibold text-slate-500 italic">
              "{currentTargetItem.meaningEn}"
            </p>
          )}
        </div>

        {/* Typing Input Box */}
        <div className="space-y-3">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={typedInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={lang === 'en' ? "Type here in Tamil..." : "இங்கே தட்டச்சு செய்யவும் (Start typing)..."}
              autoFocus
              className="w-full p-4 sm:p-6 text-xl sm:text-2xl font-bold font-serif text-slate-900 bg-white border-2 border-[#581515] rounded-2xl shadow-inner focus:outline-none focus:ring-4 focus:ring-amber-400/20 transition-all text-center tracking-wide"
            />
          </div>

          {/* Live Speed / Accuracy / Error Indicators */}
          <div className="flex flex-wrap items-center justify-around gap-4 p-3 bg-[#fcf8f2] border border-[#e6dac8] rounded-xl text-xs sm:text-sm font-black text-slate-700">
            <span className="flex items-center space-x-1.5">
              <Zap className="w-4 h-4 text-amber-600" />
              <span>WPM: <strong className="text-[#581515] text-base">{liveStats.wpm}</strong></span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Target className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'en' ? 'Accuracy' : 'துல்லியம்'}: <strong className="text-emerald-700 text-base">{liveStats.accuracy}%</strong></span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>{lang === 'en' ? 'Correct' : 'சரியானவை'}: <strong>{liveStats.correctChars}</strong></span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Timer className="w-4 h-4 text-rose-600" />
              <span>{lang === 'en' ? 'Errors' : 'பிழைகள்'}: <strong className="text-rose-600">{liveStats.wrongChars}</strong></span>
            </span>
          </div>
        </div>

      </div>

      {/* 5. VISUAL KEYBOARD VISUALIZATION (Tamil99 / Anjal) */}
      <div className="bg-white border-2 border-[#e7dcd0] rounded-3xl p-6 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-[#e7dcd0] pb-3">
          <div className="flex items-center space-x-2">
            <Keyboard className="w-5 h-5 text-[#581515]" />
            <h3 className="text-base font-black text-[#581515]">
              {layout === 'tamil99' ? 'தமிழ்99 விசைப்பலகை (Tamil99 Keyboard Layout)' : 'அஞ்சல் ஒலிபெயர்ப்பு விசைப்பலகை (Anjal Keyboard Layout)'}
            </h3>
          </div>
          <span className="text-[11px] font-bold text-slate-500">
            💡 {lang === 'en' ? 'Click any key to type directly' : 'விசைகளை கிளிக் செய்தும் தட்டச்சு செய்யலாம்'}
          </span>
        </div>

        {/* Keyboard Keys Layout */}
        <div className="space-y-1.5 bg-slate-900 p-3 sm:p-5 rounded-2xl shadow-inner select-none overflow-x-auto">
          {(layout === 'tamil99' ? TAMIL99_KEYBOARD : ANJAL_KEYBOARD).map((row, rIdx) => (
            <div key={rIdx} className="flex justify-center gap-1.5 min-w-max">
              {row.map((kInfo, kIdx) => {
                const isPressed = activeKeyPressed === kInfo.key.toLowerCase();

                return (
                  <button
                    key={kIdx}
                    onClick={() => handleVirtualKeyClick(kInfo)}
                    className={`h-11 sm:h-13 min-w-[34px] sm:min-w-[46px] px-2 rounded-xl text-xs sm:text-sm font-bold flex flex-col items-center justify-center transition-all cursor-pointer shadow-md ${
                      isPressed
                        ? 'bg-amber-400 text-slate-950 scale-95 shadow-inner'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-black text-amber-300">
                      {kInfo.tamilChar}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400 leading-none">
                      {kInfo.key.toUpperCase()}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* 6. DAILY CHALLENGE CARD */}
      <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Daily Typing Challenge' : 'இன்றைய தட்டச்சுச் சவால்'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#581515] font-serif">
            {lang === 'en' ? 'Type 20 Tamil words within 2 minutes' : '2 நிமிடங்களில் 20 தமிழ் சொற்களைத் தட்டச்சு செய்யவும்'}
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            {lang === 'en' 
              ? 'Complete the 20-word sprint without pausing to prove your typing speed and unlock exclusive trophies!'
              : 'வேகமாகவும் பிழையின்றியும் 20 சொற்களைத் தட்டச்சு செய்து உங்கள் தனிப்பட்ட WPM சாதனைப் பட்டியலில் இணையுங்கள்.'}
          </p>
          {stats.dailyChallengeBest && (
            <p className="text-xs font-black text-emerald-800">
              🏆 {lang === 'en' ? 'Your Best Record:' : 'உங்கள் சிறந்த சாதனை:'} {stats.dailyChallengeBest.wpm} WPM ({stats.dailyChallengeBest.accuracy}% Accuracy)
            </p>
          )}
        </div>

        <button
          onClick={handleStartDailyChallenge}
          className="bg-[#581515] hover:bg-[#7a2222] text-amber-300 font-black text-sm px-8 py-4 rounded-2xl shadow-xl border-2 border-[#C89551] transition-transform active:scale-95 cursor-pointer shrink-0"
        >
          {dailyActive ? (lang === 'en' ? 'Challenge in Progress...' : 'சவால் நடக்கிறது...') : (lang === 'en' ? 'Start 2-Min Challenge' : 'சவாலைத் தொடங்கு')}
        </button>
      </div>

      {/* 7. ACHIEVEMENTS SHOWCASE (7 Trophies) */}
      <div className="bg-white border-2 border-[#e7dcd0] rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex items-center justify-between border-b border-[#e7dcd0] pb-4">
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-black text-[#581515]">
              {lang === 'en' ? 'Typing Achievements (7 Trophies)' : 'தட்டச்சுச் சாதனைகள் & பதக்கங்கள் (Achievements)'}
            </h3>
          </div>
          <span className="text-xs font-black text-[#581515]">
            {stats.unlockedAchievements.length} / {ACHIEVEMENTS_LIST.length} {lang === 'en' ? 'Unlocked' : 'வென்றவை'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ACHIEVEMENTS_LIST.map((ach) => {
            const isUnlocked = stats.unlockedAchievements.includes(ach.id);

            return (
              <div
                key={ach.id}
                className={`p-4 rounded-2xl border-2 transition-all flex items-start space-x-3.5 ${
                  isUnlocked
                    ? 'bg-amber-50/70 border-amber-300 shadow-sm'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 shadow-sm ${
                  isUnlocked ? 'bg-amber-400/30 border border-amber-400' : 'bg-slate-200'
                }`}>
                  {ach.icon}
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-black text-[#581515] leading-snug">
                    {lang === 'en' ? ach.titleEn : ach.title}
                  </h4>
                  <p className="text-[11px] font-semibold text-slate-500 leading-tight">
                    {lang === 'en' ? ach.descriptionEn : ach.description}
                  </p>
                  {isUnlocked && (
                    <span className="inline-block text-[9px] font-black uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full mt-1">
                      {lang === 'en' ? 'Unlocked' : 'வென்றது'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 8. LEVEL COMPLETION MODAL */}
      {showResultModal && lastCompletedStats && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border-2 border-[#C89551] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-6 text-center relative overflow-hidden">
            
            <div className="w-16 h-16 rounded-2xl bg-[#581515] text-amber-300 border-2 border-[#C89551] flex items-center justify-center mx-auto shadow-lg">
              <Trophy className="w-8 h-8 text-amber-300 animate-bounce" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-black uppercase text-amber-700 tracking-wider">
                {lang === 'en' ? 'Level Complete!' : 'பயிற்சி நிலை நிறைவடைந்தது!'}
              </span>
              <h3 className="text-2xl font-black text-[#581515] font-serif">
                {lang === 'en' ? `Level ${activeLevelNumber} Completed` : `${currentLevel.title} முடிந்தது!`}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3 py-2">
              <div className="bg-[#fbf7f0] border border-[#e6dac8] p-3 rounded-xl">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">வேகம் (Speed)</span>
                <span className="text-2xl font-black text-[#581515]">{lastCompletedStats.wpm} WPM</span>
              </div>
              <div className="bg-[#fbf7f0] border border-[#e6dac8] p-3 rounded-xl">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">துல்லியம் (Accuracy)</span>
                <span className="text-2xl font-black text-emerald-700">{lastCompletedStats.accuracy}%</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleStartLevel(activeLevelNumber)}
                className="flex-1 py-3 rounded-xl font-black text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                {lang === 'en' ? 'Retry Level' : 'மீண்டும் செய்க'}
              </button>

              <button
                onClick={() => handleStartLevel(Math.min(5, activeLevelNumber + 1))}
                className="flex-1 py-3 rounded-xl font-black text-xs text-amber-300 bg-[#581515] hover:bg-[#7a2222] border border-[#C89551] transition-transform active:scale-95 cursor-pointer shadow-md"
              >
                {lang === 'en' ? 'Next Level' : 'அடுத்த நிலை'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
