"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Mic, RotateCcw, ArrowRight, Sparkles, Flame, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { TAMIL_PRONUNCIATION_DATA, TamilPronunciationItem } from '@/data/tamilPronunciation';
import { speakTamilText } from '@/lib/audioTTS';
import { useLanguage } from '@/lib/LanguageContext';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export interface WordAnalysis {
  word: string;
  status: 'correct' | 'near' | 'incorrect';
  recognizedAs?: string;
}

export default function TamilPronunciationPractice() {
  const { lang, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'words' | 'sentences' | 'poetry'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [isSupported, setIsSupported] = useState<boolean | null>(null);
  const [hasTested, setHasTested] = useState(false);
  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [wordResults, setWordResults] = useState<WordAnalysis[]>([]);
  const [practiceStreak, setPracticeStreak] = useState(3);
  const [speechError, setSpeechError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);

  const items = selectedCategory === 'all' 
    ? TAMIL_PRONUNCIATION_DATA 
    : TAMIL_PRONUNCIATION_DATA.filter(item => item.category === selectedCategory);

  const currentItem: TamilPronunciationItem = items[currentIndex] || items[0];

  const currentItemRef = useRef<TamilPronunciationItem>(currentItem);
  useEffect(() => {
    currentItemRef.current = currentItem;
  }, [currentItem]);

  const normalizeText = (text: string): string => {
    if (!text) return '';
    return text
      .trim()
      .normalize('NFC')
      .replace(/[.,!?"'“”—:-]/g, '')
      .replace(/\s+/g, ' ');
  };

  const evaluatePronunciation = (expected: string, recognized: string) => {
    const normExpected = normalizeText(expected);
    const normRecognized = normalizeText(recognized);

    const expectedWords = normExpected.split(' ').filter(Boolean);
    const recognizedWords = normRecognized.split(' ').filter(Boolean);

    if (expectedWords.length === 0) return;

    let matchPoints = 0;
    const results: WordAnalysis[] = expectedWords.map((expWord, idx) => {
      const exactIndex = recognizedWords.indexOf(expWord);
      if (exactIndex !== -1) {
        matchPoints += 1.0;
        return { word: expWord, status: 'correct' as const, recognizedAs: expWord };
      }

      const matchingRecWord = recognizedWords.find((recWord) => {
        if (!recWord) return false;
        const minLen = Math.min(expWord.length, recWord.length);
        if (minLen < 2) return expWord === recWord;
        
        const sharedPrefix = expWord.slice(0, Math.max(2, minLen - 1));
        return recWord.startsWith(sharedPrefix) || expWord.startsWith(recWord.slice(0, Math.max(2, minLen - 1)));
      });

      if (matchingRecWord) {
        matchPoints += 0.75;
        return { word: expWord, status: 'near' as const, recognizedAs: matchingRecWord };
      }

      return { 
        word: expWord, 
        status: 'incorrect' as const, 
        recognizedAs: recognizedWords[idx] || undefined 
      };
    });

    const calculatedScore = Math.min(100, Math.round((matchPoints / expectedWords.length) * 100));

    setWordResults(results);
    setMatchScore(calculatedScore);
    setHasTested(true);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognitionApi = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognitionApi) {
        setIsSupported(true);
        const recognition = new SpeechRecognitionApi();
        recognition.lang = 'ta-IN';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
          setIsRecording(true);
          setIsProcessing(false);
          setSpeechError(null);
        };

        recognition.onresult = (event: any) => {
          setIsRecording(false);
          setIsProcessing(true);
          const transcript = event.results[0][0].transcript;
          setRecognizedText(transcript);
          evaluatePronunciation(currentItemRef.current.text, transcript);
          setIsProcessing(false);
        };

        recognition.onerror = (event: any) => {
          setIsRecording(false);
          setIsProcessing(false);
          if (event.error === 'no-speech') {
            setSpeechError(lang === 'en' ? 'No speech detected. Please speak clearly near the microphone.' : 'குரல் கேட்கவில்லை. ஒலிவாங்கியின் அருகில் தெளிவுபட பேசி மீண்டும் முயற்சிக்கவும்.');
          } else if (event.error === 'not-allowed') {
            setSpeechError(lang === 'en' ? 'Microphone permission denied. Please allow microphone access in browser.' : 'மைக்ரோஃபோன் அனுமதி வழங்கப்படவில்லை. உலாவி அமைப்புகளில் அனுமதிக்கவும்.');
          } else {
            setSpeechError(lang === 'en' ? 'Speech recognition error occurred. Please try again.' : 'குரல் அங்கீகாரத்தில் சிறு பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.');
          }
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognitionRef.current = recognition;
      } else {
        setIsSupported(false);
      }
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {}
      }
    };
  }, [lang]);

  const handlePlayAudio = (textToSpeak?: string) => {
    const text = textToSpeak || currentItem.text;
    if (!text) return;

    setIsPlayingAudio(true);
    speakTamilText(text, () => {
      setIsPlayingAudio(false);
    });
  };

  const startListening = () => {
    setSpeechError(null);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (err) {
        recognitionRef.current.stop();
        setTimeout(() => recognitionRef.current.start(), 200);
      }
    } else {
      setSpeechError(lang === 'en' ? 'Speech recognition is not supported in this browser.' : 'இந்த உலாவியில் குரல் அங்கீகாரம் ஆதரிக்கப்படவில்லை.');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const handleNext = () => {
    setHasTested(false);
    setMatchScore(null);
    setRecognizedText('');
    setWordResults([]);
    setSpeechError(null);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handleRetry = () => {
    setHasTested(false);
    setMatchScore(null);
    setRecognizedText('');
    setWordResults([]);
    setSpeechError(null);
  };

  const selectItemById = (id: string) => {
    const idx = items.findIndex(item => item.id === id);
    if (idx !== -1) {
      setCurrentIndex(idx);
      handleRetry();
    }
  };

  return (
    <div className="bg-[#fbf7f0] border-2 border-[#e7dcd0] hover:border-[#581515] rounded-[32px] p-6 sm:p-8 shadow-md hover:shadow-2xl transition-all relative overflow-hidden space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e7dcd0] pb-5">
        <div className="flex items-center space-x-3.5">
          <div className="w-13 h-13 rounded-full bg-[#f8f2e7] border-2 border-[#c89551]/60 shadow-md flex items-center justify-center text-[#581515] flex-shrink-0 text-xl font-bold">
            🎙️
          </div>
          <div>
            <div className="inline-flex items-center space-x-1.5 bg-[#f3e8d7] text-[#581515] border border-[#c89551]/40 px-3 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>{t('pronunciationTag')}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#581515] tracking-tight">
              {t('pronunciationTitle')}
            </h3>
          </div>
        </div>

        {/* Streak Badge */}
        <div className="flex items-center space-x-4 bg-[#f8f2e7] px-4 py-2.5 rounded-full border border-[#c89551]/40 self-start sm:self-auto shadow-sm">
          <div className="flex items-center space-x-1.5">
            <Flame className="w-5 h-5 text-amber-600 fill-amber-500 animate-pulse" />
            <span className="text-xs font-black text-[#581515]">{practiceStreak} {t('streakLabel')}</span>
          </div>
          <div className="h-4 w-[1px] bg-[#c89551]/40" />
          <div className="text-xs font-extrabold text-[#581515]">
            {t('practiceCountLabel')} {currentIndex + 1} / {items.length}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-[#e7dcd0] h-2.5 rounded-full overflow-hidden">
        <div 
          className="bg-gradient-to-r from-[#581515] to-[#c89551] h-full transition-all duration-300 rounded-full"
          style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
        />
      </div>

      {/* Category Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border-2 border-[#e7dcd0] shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {(['all', 'words', 'sentences', 'poetry'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentIndex(0);
                handleRetry();
              }}
              className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#581515] text-amber-200 shadow-md'
                  : 'bg-[#f4ece1] text-[#581515] hover:bg-[#e7dcd0]'
              }`}
            >
              {cat === 'all' && t('tabAll')}
              {cat === 'words' && t('tabWords')}
              {cat === 'sentences' && t('tabSentences')}
              {cat === 'poetry' && t('tabPoetry')}
            </button>
          ))}
        </div>

        {/* Quick Sample Buttons */}
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-600">
          <span>{t('sampleLabel')}</span>
          <button 
            onClick={() => selectItemById('s1')} 
            className="hover:bg-[#581515] hover:text-amber-200 text-[#581515] font-extrabold bg-[#f8f2e7] px-3 py-1.5 rounded-xl border border-[#c89551]/40 transition-colors cursor-pointer shadow-sm"
          >
            EASY
          </button>
          <button 
            onClick={() => selectItemById('s2')} 
            className="hover:bg-[#581515] hover:text-amber-200 text-[#581515] font-extrabold bg-[#f8f2e7] px-3 py-1.5 rounded-xl border border-[#c89551]/40 transition-colors cursor-pointer shadow-sm"
          >
            MEDIUM
          </button>
          <button 
            onClick={() => selectItemById('p1')} 
            className="hover:bg-[#581515] hover:text-amber-200 text-[#581515] font-extrabold bg-[#f8f2e7] px-3 py-1.5 rounded-xl border border-[#c89551]/40 transition-colors cursor-pointer shadow-sm"
          >
            CLASSICAL
          </button>
        </div>
      </div>

      {/* Main Interactive Practice Box */}
      <div className="bg-white border-2 border-[#e7dcd0] rounded-[28px] p-6 sm:p-8 shadow-sm text-center space-y-6 relative">
        
        {/* Item Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-black">
          <span className="bg-[#f8f2e7] text-[#581515] px-3.5 py-1 rounded-full border border-[#c89551]/40">
            {currentItem.difficultyLabel} ({currentItem.categoryLabel})
          </span>
          {currentItem.source && (
            <span className="text-amber-900 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
              📜 {currentItem.source}
            </span>
          )}
        </div>

        {/* Target Text */}
        <div className="py-3 px-2 space-y-2">
          <h4 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#581515] leading-relaxed tracking-wide font-serif">
            "{currentItem.text}"
          </h4>
          {currentItem.meaning && (
            <p className="text-slate-500 text-xs sm:text-sm font-semibold">
              💡 {currentItem.meaning}
            </p>
          )}
        </div>

        {/* Listen Button */}
        <div className="flex justify-center">
          <button
            onClick={() => handlePlayAudio()}
            disabled={isPlayingAudio}
            className={`inline-flex items-center space-x-2.5 px-7 py-3 rounded-full font-extrabold text-sm sm:text-base transition-all shadow-md cursor-pointer ${
              isPlayingAudio
                ? 'bg-amber-500 text-white border-2 border-amber-600 scale-105 shadow-lg'
                : 'bg-[#581515] hover:bg-[#7a2222] text-amber-200 border-2 border-amber-400/40 hover:scale-105'
            }`}
          >
            <Volume2 className={`w-5 h-5 ${isPlayingAudio ? 'animate-bounce text-white' : 'text-amber-200'}`} />
            <span>{isPlayingAudio ? t('playingAudioBtn') : t('listenAudioBtn')}</span>
          </button>
        </div>

        {/* Browser Warning */}
        {isSupported === false && (
          <div className="bg-amber-50 border-2 border-amber-300 text-amber-900 rounded-2xl p-4 text-xs sm:text-sm font-bold flex items-center justify-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <span>{lang === 'en' ? 'Speech recognition is not supported in this browser. Please try in Google Chrome.' : 'இந்த உலாவியில் குரல் அங்கீகாரம் ஆதரிக்கப்படவில்லை. Chrome-ல் முயற்சிக்கவும்.'}</span>
          </div>
        )}

        {speechError && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-2xl p-3 text-xs sm:text-sm font-bold">
            ⚠️ {speechError}
          </div>
        )}

        {/* Mic Button */}
        <div className="pt-2 flex flex-col items-center justify-center space-y-3">
          <button
            onClick={isRecording ? stopListening : startListening}
            disabled={isProcessing || isSupported === false}
            className={`relative w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-xl transition-all duration-300 cursor-pointer ${
              isRecording
                ? 'bg-red-600 text-white ring-8 ring-red-200 scale-110 animate-pulse'
                : isProcessing
                ? 'bg-amber-500 text-white animate-spin'
                : 'bg-gradient-to-br from-[#581515] to-[#800000] text-amber-200 hover:scale-105 hover:shadow-2xl border-4 border-[#c89551]'
            } ${isSupported === false ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Mic className="w-10 h-10" />
          </button>

          <div className="text-xs sm:text-sm font-black text-[#581515]">
            {isRecording && <span className="text-red-600 font-extrabold flex items-center space-x-1 animate-pulse">🔴 <span>{t('listeningState')}</span></span>}
            {isProcessing && <span className="text-amber-700">{t('processingState')}</span>}
            {!isRecording && !isProcessing && !hasTested && <span>{t('tapToSpeak')}</span>}
            {hasTested && <span className="text-emerald-700 font-bold">{t('resultReady')}</span>}
          </div>
        </div>

      </div>

      {/* Results Breakdown Section */}
      {hasTested && matchScore !== null && (
        <div className="bg-white border-2 border-[#c89551]/60 rounded-[28px] p-6 sm:p-8 shadow-xl space-y-6 animate-fadeIn">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#e7dcd0] pb-4 gap-4">
            <div>
              <h4 className="text-xl font-black text-[#581515] flex items-center space-x-2">
                <span>🎯 {lang === 'en' ? 'Your Practice Result' : 'உங்கள் பயிற்சி முடிவு'}</span>
              </h4>
              <p className="text-xs font-bold text-slate-600 mt-1">
                {lang === 'en' ? 'You said:' : 'நீங்கள் பேசியது:'} <span className="text-[#581515] font-black underline">"{recognizedText || (lang === 'en' ? 'Speech unclear' : 'தெளிவாக கேட்கவில்லை')}"</span>
              </p>
            </div>

            <div className={`px-6 py-2.5 rounded-2xl font-black text-xl sm:text-2xl border-2 flex items-center space-x-2 shadow-sm ${
              matchScore >= 80 
                ? 'bg-emerald-50 border-emerald-500 text-emerald-800' 
                : matchScore >= 50 
                ? 'bg-amber-50 border-amber-500 text-amber-800' 
                : 'bg-red-50 border-red-500 text-red-800'
            }`}>
              <Sparkles className="w-6 h-6" />
              <span>{matchScore}% {t('matchScore')}</span>
            </div>
          </div>

          {/* Granular Word Analysis */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h5 className="text-xs sm:text-sm font-black text-[#581515] uppercase tracking-wider">
                {t('wordComparison')} ({wordResults.length} {lang === 'en' ? 'words' : 'சொற்கள்'}):
              </h5>
              <button
                onClick={() => handlePlayAudio()}
                className="text-xs font-black text-[#581515] underline flex items-center space-x-1 hover:text-[#7a2222]"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{t('listenAudioBtn')}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {wordResults.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border-2 font-black flex items-center justify-between shadow-sm transition-all ${
                    item.status === 'correct'
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                      : item.status === 'near'
                      ? 'bg-amber-50 border-amber-400 text-amber-900'
                      : 'bg-red-50 border-red-300 text-red-900'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-base sm:text-lg font-black">{item.word}</span>
                    {item.status !== 'correct' && item.recognizedAs && (
                      <span className="text-[11px] font-semibold opacity-75">
                        ({lang === 'en' ? 'heard:' : 'கேட்டது:'} {item.recognizedAs})
                      </span>
                    )}
                  </div>
                  <span className="text-xl flex-shrink-0 ml-2">
                    {item.status === 'correct' && <CheckCircle2 className="w-6 h-6 text-emerald-600" />}
                    {item.status === 'near' && <AlertTriangle className="w-6 h-6 text-amber-600" />}
                    {item.status === 'incorrect' && <XCircle className="w-6 h-6 text-red-500" />}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
            <button
              onClick={handleRetry}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#f8f2e7] hover:bg-[#e7dcd0] text-[#581515] border border-[#c89551] px-6 py-3 rounded-full font-extrabold text-sm transition-all shadow-md cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t('retryBtn')}</span>
            </button>

            <button
              onClick={handleNext}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-[#581515] to-[#7a2222] hover:from-[#7a2222] hover:to-[#581515] text-amber-200 px-7 py-3 rounded-full font-extrabold text-sm transition-all shadow-lg border border-amber-400/40 cursor-pointer"
            >
              <span>{t('nextBtn')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
