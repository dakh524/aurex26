"use client";

import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Trophy, Sparkles, Flame, Zap, Award, Check, ArrowRight } from 'lucide-react';

/**
 * @typedef {Object} Question
 * @property {number} [id]
 * @property {string} question
 * @property {string[]} options
 * @property {number} correct_index
 */

/**
 * @param {{ questions?: Question[] }} props
 */
export default function LessonFlow({ questions = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    let timer;
    if (isAnswered) {
      timer = setTimeout(() => {
        if (currentIndex + 1 < questions.length) {
          setCurrentIndex((prev) => prev + 1);
          setSelectedOption(null);
          setIsAnswered(false);
        } else {
          setShowSummary(true);
        }
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [isAnswered, currentIndex, questions.length]);

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowSummary(false);
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="text-center py-16 text-slate-400 font-semibold bg-white rounded-3xl border border-slate-100 shadow-sm">
        No practice questions loaded yet.
      </div>
    );
  }

  // Summary View
  if (showSummary) {
    const percentage = Math.round((score / questions.length) * 100);
    let title = "அற்புதமான முயற்சி! 🎉";
    let subtitle = "Great effort! You are mastering ancient Tamil epigraphy!";
    let gradeBadge = "Epigraphy Explorer";
    let gradeBg = "from-emerald-500 to-teal-600";

    if (percentage === 100) {
      title = "பூரண வெற்றி! 🏆";
      subtitle = "Flawless score! You are a Grand Tamil Epigraphy Master!";
      gradeBadge = "👑 Epigraphy Master";
      gradeBg = "from-amber-400 to-yellow-500";
    } else if (percentage >= 75) {
      title = "சிறப்பான வெற்றி! 🌟";
      subtitle = "Impressive accuracy! You know your inscription meanings well!";
      gradeBadge = "⭐ Expert Scholar";
      gradeBg = "from-blue-500 to-indigo-600";
    }

    return (
      <div className="w-full max-w-2xl mx-auto my-6 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-700/60 text-center space-y-8 relative overflow-hidden">
        {/* Glowing Background Glows */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative inline-block">
          <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-300 rounded-3xl flex items-center justify-center shadow-xl shadow-amber-500/30 transform hover:scale-105 hover:rotate-3 transition-all duration-300 border-4 border-yellow-200">
            <Trophy className="w-14 h-14 sm:w-16 sm:h-16 text-slate-900 drop-shadow-md" />
          </div>
          <div className="absolute -top-3 -right-3 bg-gradient-to-r from-emerald-400 to-teal-400 p-2 rounded-full shadow-lg animate-bounce">
            <Sparkles className="w-6 h-6 text-slate-950" />
          </div>
        </div>

        <div className="space-y-2">
          <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-slate-950 bg-gradient-to-r ${gradeBg} shadow-md`}>
            {gradeBadge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight pt-1">
            {title}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Score Card Box */}
        <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-sm mx-auto shadow-inner backdrop-blur-md space-y-4">
          <div className="text-xs uppercase tracking-widest font-extrabold text-slate-400">
            Final Accuracy
          </div>
          
          <div className="flex items-center justify-center space-x-2">
            <span className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              {score}
            </span>
            <span className="text-3xl font-bold text-slate-500">/</span>
            <span className="text-3xl font-bold text-slate-400">{questions.length}</span>
          </div>

          <div className="w-full bg-slate-700 h-3 rounded-full overflow-hidden p-0.5 border border-slate-600">
            <div
              className="bg-gradient-to-r from-emerald-400 to-teal-400 h-full rounded-full transition-all duration-1000 ease-out shadow-sm"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <p className="text-sm font-black text-emerald-400">
            {percentage}% Questions Correct!
          </p>
        </div>

        {/* Restart Button */}
        <div>
          <button
            onClick={handleRestart}
            className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 active:scale-95 text-slate-950 font-black text-lg px-8 py-4 rounded-2xl shadow-xl shadow-emerald-500/25 transition-all border-b-4 border-emerald-700 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5 group-hover:-rotate-90 transition-transform duration-300" />
            <span>Try Again / மீண்டும் பயிற்சி</span>
          </button>
        </div>
      </div>
    );
  }

  // Active Question View
  const currentQ = questions[currentIndex];
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  const handleSelectOption = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === currentQ.correct_index) {
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-4 bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl min-h-[520px] flex flex-col justify-between relative overflow-hidden transition-all">
      
      {/* Dynamic Top Bar */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="bg-slate-900 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-sm flex items-center space-x-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Question {currentIndex + 1} of {questions.length}</span>
            </span>

            {streak > 1 && (
              <span className="bg-[#581515] text-amber-300 border border-[#C89551] text-xs font-black px-3 py-1.5 rounded-xl shadow-sm flex items-center space-x-1 animate-pulse">
                <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                <span>{streak} Streak!</span>
              </span>
            )}
          </div>

          <div className="flex items-center space-x-1.5 text-emerald-600 font-black text-sm">
            <span>{Math.round(progressPercent)}%</span>
          </div>
        </div>

        {/* Duolingo-style Progress Bar */}
        <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden p-0.5 border border-slate-200 shadow-inner">
          <div
            className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500 ease-out shadow-md"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Question Header Card */}
        <div className="mt-8 mb-6 bg-gradient-to-br from-slate-50 to-emerald-50/30 border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-sm">
          <div className="flex items-center space-x-2 mb-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
              <Award className="w-3 h-3 mr-1" /> Meaning Match
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug tracking-tight">
            {currentQ.question}
          </h2>
        </div>
      </div>

      {/* 4 Option Buttons in a 2x2 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
        {currentQ.options.map((optionText, index) => {
          const isSelected = selectedOption === index;
          const isCorrect = index === currentQ.correct_index;

          let btnStyle = "bg-white border-2 border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-emerald-400 hover:shadow-md active:translate-y-1 active:border-b-2 cursor-pointer border-b-4 border-slate-300";
          let badgeStyle = "bg-slate-100 text-slate-700 border border-slate-200";

          if (isAnswered) {
            if (isCorrect) {
              btnStyle = "bg-emerald-500 border-2 border-emerald-600 border-b-4 text-white shadow-lg ring-4 ring-emerald-200 scale-[1.02] transform transition-all";
              badgeStyle = "bg-emerald-700 text-white border-none";
            } else if (isSelected) {
              btnStyle = "bg-rose-500 border-2 border-rose-600 border-b-4 text-white shadow-lg ring-4 ring-rose-200 scale-[0.98] transform transition-all";
              badgeStyle = "bg-rose-700 text-white border-none";
            } else {
              btnStyle = "bg-slate-50 border-2 border-slate-200 border-b-2 text-slate-400 opacity-40 cursor-not-allowed";
              badgeStyle = "bg-slate-200 text-slate-400 border-none";
            }
          }

          const optionLabels = ["A", "B", "C", "D"];

          return (
            <button
              key={index}
              onClick={() => handleSelectOption(index)}
              disabled={isAnswered}
              className={`group relative flex items-center justify-between p-5 rounded-2xl font-bold text-left transition-all duration-200 ${btnStyle}`}
            >
              <div className="flex items-center space-x-3.5 pr-2">
                <span className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-sm transition-colors ${badgeStyle}`}>
                  {optionLabels[index]}
                </span>
                <span className="text-base sm:text-lg leading-snug">
                  {optionText}
                </span>
              </div>

              {/* Status Icons */}
              {isAnswered && isCorrect && (
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-white animate-bounce" />
                </div>
              )}
              {isAnswered && isSelected && !isCorrect && (
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <XCircle className="w-6 h-6 text-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Answer Feedback Banner at Bottom */}
      <div className="min-h-[64px] flex items-center justify-center mt-3">
        {isAnswered ? (
          selectedOption === currentQ.correct_index ? (
            <div className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-center py-3.5 px-4 rounded-2xl shadow-lg flex items-center justify-center space-x-2 animate-bounce border-b-4 border-emerald-700">
              <Check className="w-6 h-6 stroke-[3]" />
              <span className="text-base">அருமை! (Correct! Moving to next...)</span>
            </div>
          ) : (
            <div className="w-full bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold text-center py-3.5 px-4 rounded-2xl shadow-lg flex items-center justify-center space-x-2 border-b-4 border-rose-700">
              <XCircle className="w-6 h-6" />
              <span className="text-base">தவறு! (Correct answer is highlighted in green)</span>
            </div>
          )
        ) : (
          <div className="flex items-center space-x-2 text-xs text-slate-400 font-extrabold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Select the matching meaning to test your knowledge</span>
          </div>
        )}
      </div>

    </div>
  );
}
