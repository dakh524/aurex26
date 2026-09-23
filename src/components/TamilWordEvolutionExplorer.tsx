"use client";

import React, { useState, useMemo } from 'react';
import { Search, Sparkles, History, ArrowRight, ExternalLink, BookOpen, GitCommit, HelpCircle, Compass } from 'lucide-react';
import { TAMIL_WORD_EVOLUTION_DATA, WordEvolutionEntry } from '@/data/tamilWordEvolution';
import { useLanguage } from '@/lib/LanguageContext';

const SUGGESTED_WORDS = ['அகம்', 'அறம்', 'நீர்', 'மண்', 'மரம்', 'கடல்', 'உள்ளம்', 'அன்பு', 'ஊர்', 'மலை', 'நாடு', 'சொல்', 'காதல்', 'அறிவு', 'வான்'];

export default function TamilWordEvolutionExplorer() {
  const { lang, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('அகம்');
  const [activeWord, setActiveWord] = useState('அகம்');

  const normalize = (str: string) => {
    return str ? str.trim().normalize('NFC') : '';
  };

  const activeEntry: WordEvolutionEntry | null = useMemo(() => {
    const cleanSearch = normalize(activeWord);
    if (!cleanSearch) return null;
    
    if (TAMIL_WORD_EVOLUTION_DATA[cleanSearch]) {
      return TAMIL_WORD_EVOLUTION_DATA[cleanSearch];
    }

    const matchKey = Object.keys(TAMIL_WORD_EVOLUTION_DATA).find(
      key => normalize(key) === cleanSearch
    );

    return matchKey ? TAMIL_WORD_EVOLUTION_DATA[matchKey] : null;
  }, [activeWord]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchTerm.trim()) {
      setActiveWord(searchTerm.trim());
    }
  };

  const handleWordSelect = (word: string) => {
    setSearchTerm(word);
    setActiveWord(word);
  };

  return (
    <div className="w-full bg-gradient-to-br from-[#7a1818] via-[#8c1c1c] to-[#6b1515] text-[#fbf7f0] rounded-[36px] p-6 sm:p-10 shadow-2xl border-2 border-amber-400/80 relative overflow-hidden space-y-8">
      
      {/* Decorative Golden Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Flagship Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-amber-400/30 pb-6">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-[#581515] text-amber-300 flex items-center justify-center text-2xl font-black shadow-lg flex-shrink-0 border-2 border-[#C89551]">
            🧬
          </div>
          <div>
            <div className="inline-flex items-center space-x-1.5 bg-[#f4ece1] text-[#581515] border border-[#C89551]/40 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider mb-1 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#581515]" />
              <span>{t('wordExplorerTag')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {t('wordExplorerTitle')}
            </h2>
          </div>
        </div>

        <p className="text-amber-200 text-xs sm:text-sm font-extrabold max-w-xs text-left sm:text-right">
          "{t('wordExplorerSub')}"
        </p>
      </div>

      {/* 2. Bright Search Box */}
      <div className="relative z-10 bg-white/95 text-slate-900 border-2 border-[#e7dcd0] rounded-[28px] p-5 sm:p-7 shadow-xl space-y-4 backdrop-blur-md">
        <div className="space-y-1">
          <h3 className="text-lg font-black text-[#581515]">
            {t('searchBoxTitle')}
          </h3>
          <p className="text-slate-600 text-xs font-bold">
            {t('searchBoxSub')}
          </p>
        </div>

        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full">
            <Search className="w-5 h-5 text-amber-700 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#fbf7f0] border-2 border-[#e7dcd0] focus:border-[#581515] text-slate-900 font-extrabold text-sm sm:text-base outline-none transition-all placeholder:text-slate-400"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#581515] hover:bg-[#7a2222] text-amber-200 font-black text-sm transition-all shadow-lg hover:scale-105 cursor-pointer flex items-center justify-center space-x-2 flex-shrink-0 border-2 border-[#C89551]"
          >
            <span>{t('searchBtn')}</span>
            <ArrowRight className="w-4 h-4 text-amber-300" />
          </button>
        </form>

        {/* Suggested Word Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs font-black text-slate-500 uppercase tracking-wider mr-1">{t('suggestedLabel')}</span>
          {SUGGESTED_WORDS.map((w) => (
            <button
              key={w}
              onClick={() => handleWordSelect(w)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeWord === w
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 shadow-md scale-105 font-black ring-2 ring-amber-300'
                  : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Word Evolution Timeline & Cards */}
      {activeEntry ? (
        <div className="relative z-10 space-y-8 animate-fadeIn">
          
          {/* Active Word Banner */}
          <div className="bg-gradient-to-r from-[#6b1515] to-[#8c1c1c] text-white rounded-[28px] p-6 sm:p-8 shadow-xl border-2 border-amber-300/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <h3 className="text-3xl sm:text-4xl font-black text-amber-300 font-serif">
                  # {activeEntry.word}
                </h3>
                {activeEntry.category && (
                  <span className="bg-amber-400/20 text-amber-200 border border-amber-400/40 px-3 py-1 rounded-full text-xs font-black">
                    {activeEntry.category}
                  </span>
                )}
              </div>
              <p className="text-amber-100 text-sm sm:text-base font-extrabold">
                {lang === 'en' ? 'Meanings:' : 'பொருள்:'} {activeEntry.meanings.join(' • ')}
              </p>
            </div>

            <div className="text-xs font-black text-slate-950 bg-gradient-to-r from-amber-300 to-yellow-300 px-4 py-2 rounded-xl shadow-sm self-start sm:self-auto">
              {lang === 'en' ? 'Word → Era → Meaning → Usage' : 'சொல் → காலம் → பொருள் → பயன்பாடு'}
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b-2 border-amber-400/30 pb-3">
              <History className="w-5 h-5 text-amber-300" />
              <h4 className="text-xl font-black text-amber-200">
                🧬 {t('timelineTitle')}
              </h4>
            </div>

            <div className="relative pl-6 sm:pl-10 space-y-6 before:absolute before:left-3 sm:before:left-5 before:top-3 before:bottom-3 before:w-1 before:bg-amber-400/40">
              {activeEntry.stages.map((stage, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-6 sm:-left-10 top-6 w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 border-2 border-white flex items-center justify-center text-sm font-black shadow-lg z-10">
                    {idx === 0 ? '🏺' : idx === 1 ? '📜' : '🌱'}
                  </div>

                  <div className="bg-white text-slate-900 border-2 border-amber-200 hover:border-amber-400 rounded-[24px] p-6 shadow-xl transition-all space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <span className="text-xs font-black uppercase tracking-wider text-[#6b1515] bg-amber-100 border border-amber-300 px-3.5 py-1 rounded-full">
                        {stage.period}
                      </span>
                      <span className="text-xs font-black text-slate-800 bg-amber-50 px-3 py-1 rounded-md border border-amber-200">
                        {lang === 'en' ? 'Form:' : 'வடிவம்:'} <span className="text-[#6b1515] font-black">{stage.form}</span>
                      </span>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <h5 className="text-base sm:text-lg font-black text-[#6b1515]">
                        {lang === 'en' ? 'Meaning:' : 'பொருள்:'} {stage.meaning}
                      </h5>
                      {stage.usage && (
                        <p className="text-slate-700 text-xs sm:text-sm font-semibold leading-relaxed bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/80">
                          💬 {lang === 'en' ? 'Usage:' : 'பயன்பாடு:'} {stage.usage}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs font-bold text-slate-500">
                      <span>{lang === 'en' ? 'Source:' : 'ஆதாரம்:'} {stage.source || 'Verified Historical Record'}</span>
                      {stage.sourceUrl && (
                        <a
                          href={stage.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1 text-amber-700 hover:text-[#6b1515] hover:underline font-extrabold"
                        >
                          <span>{lang === 'en' ? 'Source →' : 'ஆதாரம் →'}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Meaning Evolution */}
          {activeEntry.meaningEvolution && (
            <div className="bg-white text-slate-900 border-2 border-amber-200 rounded-[28px] p-6 shadow-xl space-y-4">
              <h4 className="text-lg font-black text-[#6b1515] flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-amber-600" />
                <span>📖 {t('meaningEvolutionTitle')}</span>
              </h4>

              {activeEntry.meaningEvolution.length === 1 && activeEntry.meaningEvolution[0].includes('மாறவில்லை') ? (
                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-xs sm:text-sm font-bold text-emerald-900">
                  ✅ {lang === 'en' ? 'Meaning remained substantially the same; usage continues.' : activeEntry.meaningEvolution[0]}
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-3">
                  {activeEntry.meaningEvolution.map((m, idx) => (
                    <React.Fragment key={idx}>
                      <div className="bg-amber-100 border border-amber-300 px-4 py-2 rounded-2xl text-xs sm:text-sm font-black text-amber-950 shadow-sm">
                        {m}
                      </div>
                      {idx < activeEntry.meaningEvolution!.length - 1 && (
                        <span className="text-amber-600 font-black text-lg">➔</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Related Words */}
          {activeEntry.relatedWords && activeEntry.relatedWords.length > 0 && (
            <div className="bg-white text-slate-900 border-2 border-amber-200 rounded-[24px] p-6 shadow-xl space-y-3">
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider">
                🔗 {t('relatedWordsTitle')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeEntry.relatedWords.map((rw) => (
                  <button
                    key={rw}
                    onClick={() => handleWordSelect(rw)}
                    className="bg-amber-50 hover:bg-gradient-to-r hover:from-amber-400 hover:to-yellow-400 text-amber-900 hover:text-slate-950 border border-amber-300 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer shadow-sm"
                  >
                    {rw} ➔
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      ) : (
        /* Fallback State */
        <div className="relative z-10 bg-white text-slate-900 border-2 border-amber-300 rounded-[28px] p-8 text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto text-2xl font-bold border border-amber-300">
            🔎
          </div>
          <div className="space-y-1">
            <h4 className="text-lg font-black text-[#6b1515]">
              "{activeWord}" - {t('wordNotFound')}
            </h4>
            <p className="text-slate-600 text-xs sm:text-sm font-semibold">
              {t('wordNotFoundSub')}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {SUGGESTED_WORDS.map((w) => (
              <button
                key={w}
                onClick={() => handleWordSelect(w)}
                className="bg-amber-50 hover:bg-amber-400 hover:text-slate-950 text-amber-900 border border-amber-300 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer"
              >
                {w}
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );

}
