"use client";

import React, { useState, useMemo } from 'react';
import { Volume2, Sparkles, Search, Layers, BookOpen, CheckCircle2 } from 'lucide-react';
import alphabetData from '@/data/tamilAlphabet.json';
import { speakTamilText } from '@/lib/audioTTS';
import { useLanguage } from '@/lib/LanguageContext';

interface AlphabetItem {
  id: string;
  letter: string;
  type: string;
  series?: string;
  transliteration: string;
  example: string;
}

const SERIES_LIST = [
  "க வர்க்கம்", "ங வர்க்கம்", "ச வர்க்கம்", "ஞ வர்க்கம்",
  "ட வர்க்கம்", "ண வர்க்கம்", "த வர்க்கம்", "ந வர்க்கம்",
  "ப வர்க்கம்", "ம வர்க்கம்", "ய வர்க்கம்", "ர வர்க்கம்",
  "ல வர்க்கம்", "வ வர்க்கம்", "ழ வர்க்கம்", "ள வர்க்கம்",
  "ற வர்க்கம்", "ன வர்க்கம்"
];

const SERIES_MAP_EN: Record<string, string> = {
  "க வர்க்கம்": "Ka Series",
  "ங வர்க்கம்": "Nga Series",
  "ச வர்க்கம்": "Cha Series",
  "ஞ வர்க்கம்": "Nja Series",
  "ட வர்க்கம்": "Ta Series",
  "ண வர்க்கம்": "Na Series",
  "த வர்க்கம்": "Tha Series",
  "ந வர்க்கம்": "Ntha Series",
  "ப வர்க்கம்": "Pa Series",
  "ம வர்க்கம்": "Ma Series",
  "ய வர்க்கம்": "Ya Series",
  "ர வர்க்கம்": "Ra Series",
  "ல வர்க்கம்": "La Series",
  "வ வர்க்கம்": "Va Series",
  "ழ வர்க்கம்": "Zha Series",
  "ள வர்க்கம்": "Lha Series",
  "ற வர்க்கம்": "Rra Series",
  "ன வர்க்கம்": "Nna Series"
};

export default function TamilAlphabetLearner() {
  const { lang } = useLanguage();
  const [filterType, setFilterType] = useState<'all' | 'uyir' | 'mei' | 'ayutham' | 'uyirmei'>('all');
  const [selectedSeries, setSelectedSeries] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSpeechLetter, setActiveSpeechLetter] = useState<string | null>(null);

  const speakLetter = (letter: string) => {
    setActiveSpeechLetter(letter);
    speakTamilText(letter, () => {
      setActiveSpeechLetter(null);
    });
  };

  const filteredData = useMemo(() => {
    return (alphabetData as AlphabetItem[]).filter((item) => {
      // 1. Filter by Main Type
      if (filterType !== 'all' && item.type !== filterType) {
        return false;
      }

      // 2. Filter by Consonant Series (if uyirmei or series selected)
      if (selectedSeries !== 'all' && item.series !== selectedSeries) {
        return false;
      }

      // 3. Filter by Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesLetter = item.letter.includes(q);
        const matchesTrans = item.transliteration.toLowerCase().includes(q);
        const matchesExample = item.example.toLowerCase().includes(q);
        return matchesLetter || matchesTrans || matchesExample;
      }

      return true;
    });
  }, [filterType, selectedSeries, searchQuery]);

  const counts = useMemo(() => {
    const data = alphabetData as AlphabetItem[];
    return {
      all: data.length,
      uyir: data.filter(d => d.type === 'uyir').length,
      mei: data.filter(d => d.type === 'mei').length,
      ayutham: data.filter(d => d.type === 'ayutham').length,
      uyirmei: data.filter(d => d.type === 'uyirmei').length,
    };
  }, []);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Title Banner */}
      <div className="bg-gradient-to-r from-[#581515] via-[#420f0f] to-[#581515] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-amber-900/40 space-y-3 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-200 border border-amber-400/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{lang === 'en' ? 'Complete 247 Tamil Alphabet Academy' : '247 தமிழ் எழுத்துகள் முழுத் தொகுப்பு • Complete Tamil Alphabet Academy'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#fbf7f0] font-serif">
              {lang === 'en' ? 'All 247 Tamil Letters' : 'எழுத்துக்கள் கற்றல் (All 247 Tamil Letters)'}
            </h2>
            <p className="text-amber-100/90 text-xs sm:text-sm font-semibold max-w-2xl">
              {lang === 'en'
                ? 'Master all 247 Tamil letters including 12 Uyir (vowels), 18 Mei (consonants), 1 Ayutham, and 216 Uyirmei (combined letters) with audio pronunciation.'
                : '12 உயிரெழுத்துகள், 18 மெய்யெழுத்துகள், 1 ஆய்த எழுத்து, 216 உயிர்மெய் எழுத்துகள் ஆகிய 247 தமிழ் எழுத்துகளையும் ஒலிப்பயிற்சியுடன் கற்றுக்கொள்ளுங்கள்.'}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-amber-400/30 px-5 py-3 rounded-2xl text-center shrink-0 self-start md:self-auto">
            <span className="text-xs font-extrabold text-amber-300 uppercase block">
              {lang === 'en' ? 'Total Letters' : 'மொத்த எழுத்துக்கள்'}
            </span>
            <span className="text-3xl font-black text-white">247</span>
          </div>
        </div>
      </div>

      {/* Main Filter Toolbar & Search Bar */}
      <div className="bg-white border-2 border-[#e7dcd0] p-5 rounded-3xl shadow-sm space-y-4">
        
        {/* Top Controls: Search Input + Active Count */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'en' ? "Search letter or sound (e.g. க, zha, ka)..." : "எழுத்து அல்லது ஒலிப்பு தேட (e.g. க, zha, ka)..."}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-[#fbf7f0]/60 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#581515] focus:ring-2 focus:ring-[#581515]/10"
            />
          </div>

          {/* Counts badge */}
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-600 self-end sm:self-auto">
            <span className="bg-[#f4ece1] px-3.5 py-1.5 rounded-xl border border-[#e6dac8]">
              {lang === 'en' ? 'Showing: ' : 'காண்பிக்கப்படுபவை: '}<strong className="text-[#581515] font-black">{filteredData.length}</strong> / 247
            </span>
          </div>
        </div>

        {/* Main Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
          <span className="text-xs font-black text-[#581515] uppercase tracking-wider mr-2">
            {lang === 'en' ? 'Category:' : 'பிரிவு:'}
          </span>
          
          <button
            onClick={() => { setFilterType('all'); setSelectedSeries('all'); }}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
              filterType === 'all' 
                ? 'bg-[#581515] text-white shadow-md' 
                : 'bg-[#f4ece1] text-[#581515] hover:bg-[#e7dcd0]'
            }`}
          >
            {lang === 'en' ? `All (${counts.all})` : `அனைத்தும் (${counts.all})`}
          </button>

          <button
            onClick={() => { setFilterType('uyir'); setSelectedSeries('all'); }}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
              filterType === 'uyir' 
                ? 'bg-[#581515] text-white shadow-md' 
                : 'bg-[#f4ece1] text-[#581515] hover:bg-[#e7dcd0]'
            }`}
          >
            {lang === 'en' ? `Vowels (${counts.uyir})` : `உயிரெழுத்துகள் (${counts.uyir})`}
          </button>

          <button
            onClick={() => { setFilterType('mei'); setSelectedSeries('all'); }}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
              filterType === 'mei' 
                ? 'bg-[#581515] text-white shadow-md' 
                : 'bg-[#f4ece1] text-[#581515] hover:bg-[#e7dcd0]'
            }`}
          >
            {lang === 'en' ? `Consonants (${counts.mei})` : `மெய்யெழுத்துகள் (${counts.mei})`}
          </button>

          <button
            onClick={() => { setFilterType('ayutham'); setSelectedSeries('all'); }}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
              filterType === 'ayutham' 
                ? 'bg-[#581515] text-white shadow-md' 
                : 'bg-[#f4ece1] text-[#581515] hover:bg-[#e7dcd0]'
            }`}
          >
            {lang === 'en' ? `Ayutham (${counts.ayutham})` : `ஆயுத எழுத்து (${counts.ayutham})`}
          </button>

          <button
            onClick={() => setFilterType('uyirmei')}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
              filterType === 'uyirmei' 
                ? 'bg-[#581515] text-white shadow-md' 
                : 'bg-[#f4ece1] text-[#581515] hover:bg-[#e7dcd0]'
            }`}
          >
            {lang === 'en' ? `Combined (${counts.uyirmei})` : `உயிர்மெய் எழுத்துகள் (${counts.uyirmei})`}
          </button>
        </div>

        {/* Consonant Series Sub-filters (Shown when Uyirmei or All is selected) */}
        {(filterType === 'uyirmei' || filterType === 'all') && (
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <span className="text-[11px] font-bold text-slate-500 block">
              {lang === 'en' ? 'Select Consonant Series:' : 'உயிர்மெய் வர்க்கத் தெரிவு (Select Consonant Series):'}
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setSelectedSeries('all')}
                className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                  selectedSeries === 'all'
                    ? 'bg-amber-600 text-white font-black'
                    : 'bg-[#fbf7f0] text-slate-700 hover:bg-[#f4ece1] border border-[#e6dac8]'
                }`}
              >
                {lang === 'en' ? 'All Series' : 'அனைத்து வர்க்கமும்'}
              </button>
              {SERIES_LIST.map((seriesName) => (
                <button
                  key={seriesName}
                  onClick={() => setSelectedSeries(seriesName)}
                  className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                    selectedSeries === seriesName
                      ? 'bg-[#581515] text-white font-black shadow-xs'
                      : 'bg-[#fbf7f0] text-slate-700 hover:bg-[#f4ece1] border border-[#e6dac8]'
                  }`}
                >
                  {lang === 'en' ? (SERIES_MAP_EN[seriesName] || seriesName) : seriesName}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Grid of Letters */}
      {filteredData.length === 0 ? (
        <div className="bg-white border-2 border-[#e7dcd0] p-12 rounded-3xl text-center space-y-3">
          <p className="text-slate-500 font-bold text-sm">
            {lang === 'en' ? 'No letters found matching your search or filter.' : 'நீங்கள் தேடிய வார்த்தை அல்லது பிரிவில் எழுத்துக்கள் ஏதும் கிடைக்கவில்லை.'}
          </p>
          <button
            onClick={() => { setFilterType('all'); setSelectedSeries('all'); setSearchQuery(''); }}
            className="text-xs font-black text-[#581515] bg-[#f4ece1] px-4 py-2 rounded-xl hover:bg-[#581515] hover:text-white transition-colors cursor-pointer"
          >
            {lang === 'en' ? 'Reset Filters' : 'அனைத்து எழுத்துகளையும் காட்டு (Reset Filters)'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {filteredData.map((item) => {
            const isSpeaking = activeSpeechLetter === item.letter;
            return (
              <div
                key={item.id}
                onClick={() => speakLetter(item.letter)}
                className={`group bg-white border-2 rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col items-center justify-between text-center space-y-2 relative overflow-hidden ${
                  isSpeaking ? 'border-amber-500 bg-amber-50/60 scale-105 ring-4 ring-amber-300/40' : 'border-[#e7dcd0] hover:border-[#c89551]'
                }`}
              >
                {/* Type & Series Badge */}
                <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full truncate max-w-full">
                  {item.series || item.type}
                </span>

                {/* Big Tamil Letter */}
                <div className="text-4xl font-black text-[#581515] my-1 group-hover:scale-110 transition-transform font-serif">
                  {item.letter}
                </div>

                {/* Transliteration */}
                <span className="text-xs font-extrabold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                  {item.transliteration}
                </span>

                {/* Example Word */}
                <p className="text-[11px] font-bold text-slate-500 leading-tight truncate w-full">
                  {item.example}
                </p>

                {/* Sound Icon */}
                <div className={`mt-1 p-2 rounded-full transition-colors ${isSpeaking ? 'bg-amber-500 text-white' : 'bg-[#f4ece1] text-[#581515] group-hover:bg-[#581515] group-hover:text-white'}`}>
                  <Volume2 className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
