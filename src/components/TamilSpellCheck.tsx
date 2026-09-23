"use client";

import React, { useState, useEffect } from 'react';
import { checkText, CheckedToken } from '@/lib/tamilSpellChecker';
import { SpellCheck, CheckCircle2, AlertCircle, RefreshCw, Lightbulb, X, Bot, Copy, Check, Loader2, Key } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import ApiKeyModal from '@/components/ApiKeyModal';

export default function TamilSpellCheck() {
  const { lang } = useLanguage();
  const [inputText, setInputText] = useState(
    'நான் நன்ராக தமிழ் கல்வேட்டு வரலாரு படிச்சேன், ஆனால் அந்த பையன் பாள்ளிக்கு போய்ட்டான்.'
  );
  const [checkedTokens, setCheckedTokens] = useState<CheckedToken[]>([]);
  const [activeTokenIndex, setActiveTokenIndex] = useState<number | null>(null);
  const [hasChecked, setHasChecked] = useState(false);

  // Gemini AI State
  const [aiCorrectedText, setAiCorrectedText] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);

  const handleCheck = async (overrideText?: string) => {
    const textToCheck = typeof overrideText === 'string' ? overrideText : inputText;
    if (!textToCheck.trim()) return;

    // 1. Local Offline Dictionary Check
    let results = checkText(textToCheck);
    setCheckedTokens(results);
    setHasChecked(true);
    setActiveTokenIndex(null);

    // 2. Cloud AI / Enhanced Rule Engine Check
    setIsAiLoading(true);
    setAiError(null);
    setAiCorrectedText(null);

    const clientApiKey = typeof window !== 'undefined' 
      ? (localStorage.getItem('gemini_api_key') || localStorage.getItem('geminiApiKey') || '')
      : '';

    try {
      const res = await fetch('/api/spellcheck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: textToCheck.trim(),
          sentence: textToCheck.trim(),
          clientApiKey 
        }),
      });

      const data = await res.json();
      const corrected = data.corrected || data.correctedText;

      if ((data.success || corrected) && corrected) {
        setAiCorrectedText(corrected);

        if (data.source === 'local') {
          setAiError(
            lang === 'en'
              ? 'AI credits are currently low. Showing offline rule-based corrections. Please try again later or add your personal Gemini API key!'
              : 'AI Credits குறைவு (AI Credits is low). ஆஃப்லைன் இலக்கணப் பிழைதிருத்தம் காட்டப்படுகிறது. தயவுசெய்து சிறிது நேரம் கழித்து மீண்டும் முயற்சிக்கவும் அல்லது மேல்பட்டியில் உள்ள "API Key" மூலம் உங்களின் சொந்த சாவி சேர்க்கவும்.'
          );
        } else {
          setAiError(null);
        }

        // Map server detected changes directly to tokens
        if (data.changes && Array.isArray(data.changes) && data.changes.length > 0) {
          const changeMap = new Map<string, string>();
          for (const ch of data.changes) {
            if (ch.original && ch.corrected) {
              changeMap.set(ch.original, ch.corrected);
            }
          }

          results = results.map((token: CheckedToken) => {
            if (!token.cleanWord) return token;
            if (changeMap.has(token.cleanWord)) {
              return {
                ...token,
                isCorrect: false,
                suggestions: [changeMap.get(token.cleanWord)!]
              };
            }
            return token;
          });
          setCheckedTokens(results);
        }
      } else {
        setAiError(
          lang === 'en'
            ? 'AI credits are low. Please try again later or configure your personal Gemini API Key.'
            : 'AI Credits குறைவு (AI Credits is low). தயவுசெய்து சிறிது நேரம் கழித்து மீண்டும் முயற்சிக்கவும் அல்லது உங்களின் சொந்த Gemini API Key சேர்க்கவும்.'
        );
      }
    } catch (err) {
      setAiError(
        lang === 'en'
          ? 'AI credits are low. Please try again later or configure your personal Gemini API Key.'
          : 'AI Credits குறைவு (AI Credits is low). தயவுசெய்து சிறிது நேரம் கழித்து மீண்டும் முயற்சிக்கவும் அல்லது உங்களின் சொந்த Gemini API Key சேர்க்கவும்.'
      );
    } finally {
      setIsAiLoading(false);
    }
  };

  useEffect(() => {
    handleCheck();
  }, []);

  const handleReplaceWord = (targetIndex: number, originalWord: string, replacement: string) => {
    const clean = originalWord.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '').trim();
    let replacedWord = originalWord;
    if (clean) {
      replacedWord = originalWord.replace(clean, replacement);
    } else {
      replacedWord = replacement;
    }

    let currentWordCount = 0;
    const tokens = inputText.split(/(\s+)/);
    const newTokens = tokens.map((token) => {
      const isWord = token.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '').trim().length > 0;
      if (isWord) {
        if (currentWordCount === targetIndex) {
          currentWordCount++;
          return replacedWord;
        }
        currentWordCount++;
      }
      return token;
    });

    const newText = newTokens.join('');
    setInputText(newText);
    
    // Automatically recheck
    const results = checkText(newText);
    setCheckedTokens(results);
    setActiveTokenIndex(null);
  };

  const handleCopyAiText = () => {
    if (!aiCorrectedText) return;
    navigator.clipboard.writeText(aiCorrectedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const incorrectCount = checkedTokens.filter(t => !t.isCorrect && t.cleanWord).length;

  return (
    <div className="w-full space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#581515] via-[#420f0f] to-[#581515] text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Bot className="w-4 h-4 text-amber-300" />
              <span>Gemini AI Powered Spell Checker</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#fbf7f0]">
              {lang === 'en' ? 'Tamil Spell Checker & Grammar Corrector' : 'தமிழ் எழுத்துப்பிழை திருத்தி (Gemini AI)'}
            </h2>
            <p className="text-amber-100/80 text-xs sm:text-sm mt-1 font-medium">
              {lang === 'en'
                ? 'Check Tamil spelling errors, grammar mistakes, and word sandhi rules with Gemini AI.'
                : 'உரையிலமைந்த தமிழ் சொற்கள் மற்றும் வாக்கியப் பிழைகளை Gemini AI மூலம் சரிபார்க்கவும்.'}
            </p>
          </div>

          <button
            onClick={() => handleCheck()}
            disabled={isAiLoading}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black px-6 py-3 rounded-2xl shadow-lg transition-transform active:scale-95 cursor-pointer self-start sm:self-auto shrink-0 disabled:opacity-50"
          >
            {isAiLoading ? (
              <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
            ) : (
              <SpellCheck className="w-5 h-5 text-slate-950" />
            )}
            <span>{isAiLoading ? (lang === 'en' ? 'Checking...' : 'சரிபார்க்கிறது...') : (lang === 'en' ? 'Check Text' : 'சோதிக்க (Check Text)')}</span>
          </button>
        </div>
      </div>

      {/* Sample Sentences to Test */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-black uppercase text-[#581515] tracking-wider">
          {lang === 'en' ? 'Quick Test Samples:' : 'மாதிரி வாக்கியங்களைச் சோதிக்க (Samples):'}
        </span>
        <button
          onClick={() => {
            const sample = 'நான் நன்ராக தமிழ் கல்வேட்டு வரலாரு படிச்சேன்.';
            setInputText(sample);
            handleCheck(sample);
          }}
          className="text-xs font-bold bg-white hover:bg-[#581515] text-[#581515] hover:text-white border border-[#C89551] px-3 py-1.5 rounded-full transition-colors cursor-pointer shadow-xs"
        >
          🔴 மாதிரி 1 (பிழைகளுடன்): "நன்ராக கல்வேட்டு..."
        </button>
        <button
          onClick={() => {
            const sample = 'அந்த பையன் பாள்ளிக்கு போய்ட்டான்.';
            setInputText(sample);
            handleCheck(sample);
          }}
          className="text-xs font-bold bg-white hover:bg-[#581515] text-[#581515] hover:text-white border border-[#C89551] px-3 py-1.5 rounded-full transition-colors cursor-pointer shadow-xs"
        >
          🔴 மாதிரி 2 (சந்தி & கொச்சை): "அந்த பையன் பாள்ளிக்கு..."
        </button>
        <button
          onClick={() => {
            const sample = 'தமிழ்நாடு அரசு தொல்லியல் துறை கல்வெட்டுகளைப் பாதுகாக்கிறது.';
            setInputText(sample);
            handleCheck(sample);
          }}
          className="text-xs font-bold bg-white hover:bg-emerald-700 text-emerald-800 hover:text-white border border-emerald-300 px-3 py-1.5 rounded-full transition-colors cursor-pointer shadow-xs"
        >
          🟢 மாதிரி 3 (சரியான வாக்கியம்)
        </button>
      </div>

      {/* Main Grid: Input Area + Inline Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Input Box */}
        <div className="bg-white border-2 border-[#e7dcd0] rounded-3xl p-5 shadow-md flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-black uppercase tracking-wider text-[#581515] flex items-center space-x-1.5">
              <span>{lang === 'en' ? 'Tamil Text Input' : 'தமிழ் உரை உள்ளீடு (Tamil Input)'}</span>
            </label>
            <span className="text-[11px] text-slate-400 font-semibold">
              {inputText.length} chars
            </span>
          </div>

          <textarea
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              setHasChecked(false);
            }}
            placeholder={lang === 'en' ? "Type or paste Tamil text here..." : "இங்கே தமிழ் உரையைத் தட்டச்சு செய்யவும்..."}
            rows={7}
            className="w-full p-4 rounded-2xl border border-slate-200 bg-[#fbf7f0]/50 text-slate-800 font-medium text-base sm:text-lg focus:outline-none focus:border-[#581515] focus:ring-2 focus:ring-[#581515]/10 transition-all resize-none leading-relaxed"
          />

          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => {
                setInputText('');
                setCheckedTokens([]);
                setHasChecked(false);
                setAiCorrectedText(null);
                setAiError(null);
              }}
              className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              {lang === 'en' ? 'Clear Text' : 'உரையை அழிக்க (Clear)'}
            </button>

            <button
              onClick={() => handleCheck()}
              disabled={isAiLoading}
              className="inline-flex items-center space-x-2 bg-[#581515] hover:bg-[#3f0e0e] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isAiLoading ? 'animate-spin' : ''}`} />
              <span>மறுபடியும் சோதிக்க</span>
            </button>
          </div>
        </div>

        {/* Results / Spell Check View */}
        <div className="bg-white border-2 border-[#e7dcd0] rounded-3xl p-5 shadow-md flex flex-col justify-between space-y-4 relative">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <h3 className="text-sm font-black uppercase tracking-wider text-[#581515] flex items-center space-x-2">
                <span>சோதனை முடிவு (Results)</span>
              </h3>
              
              {hasChecked && (
                incorrectCount === 0 ? (
                  <span className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>பிழைகள் இல்லை! (All correct)</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center space-x-1 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                    <span>{incorrectCount} பிழை(கள்) கண்டறியப்பட்டன</span>
                  </span>
                )
              )}
            </div>

            {/* Inline Rendered Output */}
            <div className="min-h-[160px] p-4 rounded-2xl bg-[#fcf8f2] border border-[#e6dac8] text-base sm:text-lg leading-relaxed font-medium text-slate-800 break-words relative">
              {checkedTokens.length === 0 ? (
                <span className="text-slate-400 text-sm italic">
                  மேலே உள்ள "சோதிக்க" பொத்தானை அழுத்தவும்.
                </span>
              ) : (
                <>
                  <div>
                    {checkedTokens.map((tokenObj, idx) => {
                      const isSpaceOrSymbol = !tokenObj.cleanWord;
                      if (isSpaceOrSymbol) {
                        return <span key={idx}>{tokenObj.word}</span>;
                      }

                      if (tokenObj.isCorrect) {
                        return (
                          <span key={idx} className="text-slate-800">
                            {tokenObj.word}
                          </span>
                        );
                      }

                      // Incorrect word highlight with wavy underline
                      const isSelected = activeTokenIndex === tokenObj.index;

                      return (
                        <span key={idx} className="relative inline-block mx-0.5">
                          <button
                            onClick={() => setActiveTokenIndex(isSelected ? null : tokenObj.index)}
                            className={`underline decoration-wavy decoration-rose-500 underline-offset-4 font-bold text-rose-800 bg-rose-50 hover:bg-rose-100 px-1 py-0.5 rounded cursor-pointer transition-all ${
                              isSelected ? 'ring-2 ring-rose-400 bg-rose-100' : ''
                            }`}
                            title="Click to view spelling suggestions"
                          >
                            {tokenObj.word}
                          </button>

                          {/* Interactive Suggestions Popover */}
                          {isSelected && (
                            <div className="absolute left-0 bottom-full mb-2 z-30 w-64 bg-[#581515] text-[#fbf7f0] rounded-2xl p-4 shadow-2xl border-2 border-[#C89551] text-xs animate-in fade-in zoom-in-95">
                              <div className="flex items-center justify-between mb-2 pb-1 border-b border-amber-400/30">
                                <span className="font-extrabold text-amber-300 flex items-center space-x-1">
                                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                                  <span>பரிந்துரைகள் (Suggestions):</span>
                                </span>
                                <button
                                  onClick={() => setActiveTokenIndex(null)}
                                  className="text-slate-400 hover:text-white"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              {tokenObj.suggestions.length > 0 ? (
                                <div className="flex flex-wrap gap-1.5 mt-2">
                                  {tokenObj.suggestions.map((sug: string, sIdx: number) => (
                                    <button
                                      key={sIdx}
                                      onClick={() => handleReplaceWord(tokenObj.index, tokenObj.word, sug)}
                                      className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-3 py-1.5 rounded-xl transition-transform active:scale-95 text-xs shadow-md"
                                    >
                                      {sug}
                                    </button>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-slate-400 italic text-[11px] py-1">
                                  பரிந்துரைகள் ஏதும் இல்லை (No close suggestions found in dictionary).
                                </p>
                              )}
                            </div>
                          )}
                        </span>
                      );
                    })}
                  </div>

                  {incorrectCount === 0 && (
                    <div className="mt-4 pt-3 border-t border-[#e6dac8] text-xs font-bold text-emerald-800 flex items-center space-x-2 bg-emerald-50/60 p-3 rounded-xl border border-emerald-200/60">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>
                        {lang === 'en'
                          ? 'This text has 0 spelling errors! Click Sample 1 or Sample 2 above to test sentences with real spelling typos.'
                          : 'கொடுக்கப்பட்ட உரையில் பிழைகள் ஏதும் இல்லை! பிழைகளைச் சோதிக்க மேலே உள்ள "மாதிரி 1" அல்லது "மாதிரி 2" பொத்தானை அழுத்தவும்.'}
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* GEMINI AI CORRECTION SECTION */}
      <div className="bg-gradient-to-r from-[#fbf7f0] via-[#f6eee3] to-[#fbf7f0] border-2 border-[#e6dac8] rounded-3xl p-6 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-[#e6dac8] pb-3">
          <div className="flex items-center space-x-2">
            <Bot className="w-5 h-5 text-[#581515]" />
            <h3 className="text-base font-black text-[#581515]">
              Gemini AI வாக்கியத் திருத்தம் (AI Corrected Sentence)
            </h3>
          </div>

          {aiCorrectedText && (
            <button
              onClick={handleCopyAiText}
              className="inline-flex items-center space-x-1.5 bg-[#f4ece1] hover:bg-[#581515] text-[#581515] hover:text-white px-3.5 py-1.5 rounded-xl font-bold text-xs transition-colors border border-[#e6dac8]"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'நகலெடுக்கப்பட்டது!' : 'நகலெடு (Copy)'}</span>
            </button>
          )}
        </div>

        {isAiLoading ? (
          <div className="py-6 text-center space-y-2">
            <Loader2 className="w-6 h-6 animate-spin text-[#581515] mx-auto" />
            <p className="text-xs font-bold text-slate-600">
              Gemini AI வாக்கியத்தைச் சரிபார்க்கிறது...
            </p>
          </div>
        ) : aiCorrectedText ? (
          <div className="bg-white border border-emerald-200 rounded-2xl p-4 text-emerald-950 font-bold text-base leading-relaxed shadow-sm">
            {aiCorrectedText}
          </div>
        ) : aiError ? (
          <div className="bg-amber-50 border-2 border-amber-300 text-amber-950 p-4 rounded-2xl text-xs sm:text-sm font-extrabold flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center space-x-2.5">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <span>{aiError}</span>
            </div>
            <button
              onClick={() => setIsKeyModalOpen(true)}
              className="bg-[#581515] hover:bg-[#3f0e0e] text-amber-300 px-4 py-2 rounded-xl font-black text-xs shrink-0 cursor-pointer shadow-sm flex items-center space-x-1.5 transition-transform active:scale-95"
            >
              <Key className="w-4 h-4 text-amber-300" />
              <span>{lang === 'en' ? 'Setup API Key' : 'API Key அமைக்க'}</span>
            </button>
          </div>
        ) : (
          <p className="text-xs text-slate-500 font-medium italic">
            "சோதிக்க" பொத்தானை அழுத்தினால் Gemini AI முழு வாக்கியத்தையும் திருத்தி இங்கே காட்டும்.
          </p>
        )}
      </div>

      {/* API Key Modal launcher for Spellcheck */}
      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        onSaveKey={() => handleCheck()}
        isQuotaExhausted={true}
        title="Gemini API சாவி புதுப்பிப்பு (Gemini API Key)"
        description="AI credits பயன்பாட்டு வரம்பு முடிந்துவிட்டதால் உங்களின் சொந்த இலவச Gemini API Key உள்ளிட்டு தொடரவும்."
      />

    </div>
  );
}
