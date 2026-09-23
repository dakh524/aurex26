"use client";

import React, { useState, useEffect } from 'react';
import { Volume2, Lightbulb, Clock, ArrowRight, CheckCircle2, XCircle, RotateCcw, Award, Sparkles, VolumeX } from 'lucide-react';
import alphabetData from '@/data/tamilAlphabet.json';
import { speakTamilText } from '@/lib/audioTTS';
import { useLanguage } from '@/lib/LanguageContext';

interface QuizQuestion {
  id: number;
  correctLetter: typeof alphabetData[0];
  options: typeof alphabetData[0][];
}

export default function LetterSoundQuiz({ onFinish }: { onFinish?: (score: number) => void }) {
  const { lang, t } = useLanguage();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(30);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Generate 10 random questions on mount
  useEffect(() => {
    generateQuiz();
  }, []);

  const generateQuiz = () => {
    const shuffledAlphabet = [...alphabetData].sort(() => Math.random() - 0.5);
    const selected = shuffledAlphabet.slice(0, 10);

    const generatedQuestions: QuizQuestion[] = selected.map((target, idx) => {
      // Pick 3 random wrong options
      const wrongPool = alphabetData.filter(item => item.id !== target.id);
      const shuffledWrong = wrongPool.sort(() => Math.random() - 0.5).slice(0, 3);
      const allOptions = [target, ...shuffledWrong].sort(() => Math.random() - 0.5);

      return {
        id: idx + 1,
        correctLetter: target,
        options: allOptions,
      };
    });

    setQuestions(generatedQuestions);
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);
    setTimerSeconds(30);
    setIsQuizComplete(false);
  };

  const currentQ = questions[currentIndex];

  // Speech Sound player with Google TTS Audio fallback
  const playCurrentSound = () => {
    if (!currentQ || typeof window === 'undefined') return;

    setIsSpeaking(true);
    speakTamilText(currentQ.correctLetter.letter, () => {
      setIsSpeaking(false);
    });
  };

  // Play sound automatically when question changes
  useEffect(() => {
    if (currentQ && !isQuizComplete) {
      playCurrentSound();
      setTimerSeconds(30);
      setShowHint(false);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  }, [currentIndex, isQuizComplete, questions]);

  // Timer Countdown
  useEffect(() => {
    if (isQuizComplete || isAnswered || timerSeconds <= 0) return;

    const interval = setInterval(() => {
      setTimerSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timerSeconds, isAnswered, isQuizComplete]);

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;

    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = currentQ.options[idx].id === currentQ.correctLetter.id;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Quiz Finished!
      setIsQuizComplete(true);
      const finalScore = score + (selectedOption !== null && currentQ.options[selectedOption].id === currentQ.correctLetter.id ? 0 : 0);
      
      // Save history to sessionStorage
      if (typeof window !== 'undefined') {
        const existingStr = sessionStorage.getItem('tamil_quiz_history');
        const history = existingStr ? JSON.parse(existingStr) : [];
        history.unshift({
          date: new Date().toLocaleDateString('ta-IN'),
          score: finalScore,
          total: questions.length,
          percentage: Math.round((finalScore / questions.length) * 100),
        });
        sessionStorage.setItem('tamil_quiz_history', JSON.stringify(history.slice(0, 10)));
      }

      if (onFinish) onFinish(finalScore);
    }
  };

  if (questions.length === 0) {
    return <div className="p-8 text-center text-slate-500">{lang === 'en' ? 'Preparing Quiz...' : 'வினாடி வினா தயார் செய்யப்படுகிறது...'}</div>;
  }

  if (isQuizComplete) {
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="bg-white border-2 border-[#e7dcd0] rounded-3xl p-8 sm:p-12 shadow-xl text-center space-y-6 max-w-xl mx-auto">
        <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-inner">
          <Award className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-black text-[#581515]">
            {lang === 'en' ? 'Quiz Completed!' : 'வினாடி வினா நிறைவடைந்தது!'}
          </h2>
          <p className="text-slate-600 font-bold text-sm">
            {percentage >= 80 
              ? (lang === 'en' ? '🎉 Excellent! You correctly identified Tamil letter sounds.' : '🎉 மிகச் சிறப்பு! தமிழ் எழுத்து ஒலிகளைச் சரியாகக் கண்டறிந்தீர்கள்.') 
              : (lang === 'en' ? 'Good effort! Practice more to master all sounds.' : 'நன்று! மேலும் பயிற்சி செய்து திறனை வளர்த்துக்கொள்ளுங்கள்.')}
          </p>
        </div>

        <div className="bg-[#fbf7f0] border border-[#e6dac8] rounded-2xl p-6 space-y-2">
          <div className="text-4xl font-black text-[#581515]">
            {score} / {questions.length}
          </div>
          <p className="text-xs font-black uppercase text-amber-800 tracking-wider">
            {lang === 'en' ? `Score Percentage: ${percentage}%` : `மதிப்பெண் சதவீதம்: ${percentage}%`}
          </p>
        </div>

        <button
          onClick={generateQuiz}
          className="inline-flex items-center space-x-2 bg-[#581515] hover:bg-[#3f0e0e] text-white px-8 py-3.5 rounded-2xl font-extrabold text-sm transition-all shadow-lg cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-amber-300" />
          <span>{lang === 'en' ? 'Retake Quiz' : 'மீண்டும் பயிற்சி செய் (Retake Quiz)'}</span>
        </button>
      </div>
    );
  }

  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="bg-white border-2 border-[#e7dcd0] rounded-3xl p-6 sm:p-8 shadow-lg space-y-6 max-w-2xl mx-auto">
      
      {/* Top Header: Question Progress & Timer */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-black text-[#581515] uppercase tracking-wider">
            {lang === 'en' ? `Question ${currentIndex + 1} / ${questions.length}` : `வினா ${currentIndex + 1} / ${questions.length}`}
          </span>
          <div className="w-32 sm:w-48 h-2 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#581515] to-[#c89551] transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-600 bg-slate-100 px-3.5 py-1.5 rounded-full">
          <Clock className="w-4 h-4 text-amber-600" />
          <span>00:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}</span>
        </div>
      </div>

      {/* Main Sound Play Banner */}
      <div className="bg-gradient-to-r from-[#fbf7f0] to-[#f6eee3] border-2 border-[#e6dac8] rounded-3xl p-6 text-center space-y-4 shadow-sm relative">
        
        <span className="inline-flex items-center space-x-1 text-[11px] font-black uppercase tracking-wider text-[#581515] bg-[#f4ece1] px-3 py-1 rounded-full border border-[#e6dac8]">
          <Sparkles className="w-3 h-3 text-amber-600" />
          <span>{lang === 'en' ? 'Letter Sound Identification' : 'எழுத்து ஒலி அடையாளம்'}</span>
        </span>

        <h3 className="text-xl sm:text-2xl font-black text-[#581515]">
          {lang === 'en' ? 'Which letter matches this sound?' : 'இந்த ஒலியில் உள்ள எழுத்து எது?'}
        </h3>

        {/* Audio Sound Trigger Button */}
        <div className="pt-2 flex justify-center">
          <button
            onClick={playCurrentSound}
            className={`inline-flex items-center space-x-2 px-6 py-3 rounded-2xl font-extrabold text-sm transition-all cursor-pointer shadow-md ${
              isSpeaking 
                ? 'bg-amber-500 text-white scale-105 ring-4 ring-amber-300/50' 
                : 'bg-[#581515] hover:bg-[#3f0e0e] text-white'
            }`}
          >
            <Volume2 className="w-5 h-5 text-amber-300 animate-pulse" />
            <span>
              {isSpeaking 
                ? (lang === 'en' ? 'Playing Sound...' : 'ஒலி கேட்கிறது...') 
                : (lang === 'en' ? '🔊 Replay Sound' : '🔊 மீண்டும் கேளுங்கள் (Replay Sound)')}
            </span>
          </button>
        </div>

        {/* Hint Display */}
        {showHint && (
          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs font-bold text-amber-900 animate-in fade-in duration-200">
            💡 {lang === 'en' ? 'Hint:' : 'குறிப்பு:'} Phonetic Sound: "{currentQ.correctLetter.transliteration}" | Example: {currentQ.correctLetter.example}
          </div>
        )}
      </div>

      {/* 4 Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {currentQ.options.map((opt, idx) => {
          const isSelected = selectedOption === idx;
          const isCorrect = opt.id === currentQ.correctLetter.id;

          let btnStyle = "bg-white border-2 border-[#e7dcd0] hover:border-[#c89551] text-slate-800";
          if (isAnswered) {
            if (isCorrect) {
              btnStyle = "bg-emerald-50 border-2 border-emerald-500 text-emerald-900 font-black shadow-md";
            } else if (isSelected) {
              btnStyle = "bg-rose-50 border-2 border-rose-500 text-rose-900 font-black";
            } else {
              btnStyle = "bg-slate-50 border border-slate-200 text-slate-400 opacity-60";
            }
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleSelectOption(idx)}
              disabled={isAnswered}
              className={`p-4 rounded-2xl flex items-center justify-between transition-all cursor-pointer ${btnStyle}`}
            >
              <div className="flex items-center space-x-3">
                <span className="w-8 h-8 rounded-full bg-[#f4ece1] text-[#581515] text-xs font-black flex items-center justify-center border border-[#e6dac8]">
                  {optionLabels[idx]}
                </span>
                <span className="text-2xl font-black text-[#581515]">
                  {opt.letter}
                </span>
              </div>

              {isAnswered && (
                <div>
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : isSelected ? (
                    <XCircle className="w-5 h-5 text-rose-600" />
                  ) : null}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Controls: Hint & Next Button */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <button
          onClick={() => setShowHint(!showHint)}
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
        >
          <Lightbulb className="w-4 h-4 text-amber-600" />
          <span>{showHint ? (lang === 'en' ? 'Hide Hint' : 'குறிப்பை மறை') : (lang === 'en' ? 'Show Hint' : 'குறிப்பு காண்க')}</span>
        </button>

        {isAnswered && (
          <button
            onClick={handleNextQuestion}
            className="inline-flex items-center space-x-2 bg-[#581515] hover:bg-[#3f0e0e] text-white px-6 py-2.5 rounded-xl font-black text-sm transition-all shadow-md cursor-pointer animate-in fade-in"
          >
            <span>{lang === 'en' ? 'Next Question →' : 'அடுத்த வினா →'}</span>
            <ArrowRight className="w-4 h-4 text-amber-300" />
          </button>
        )}
      </div>

    </div>
  );
}
