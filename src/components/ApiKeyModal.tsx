"use client";

import React, { useState, useEffect } from 'react';
import { Key, Eye, EyeOff, Check, X, AlertTriangle, Sparkles, RefreshCw, ExternalLink, Info } from 'lucide-react';

export interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveKey: (newKey: string) => void;
  onAddLater?: () => void;
  title?: string;
  description?: string;
  isQuotaExhausted?: boolean;
}

/**
 * Smartly extracts clean API key token from user input,
 * removing conversational prefixes like "key 2: AQ.Ab8RN... intha gemini key use panu"
 */
export function extractCleanApiKey(rawInput: string): string {
  if (!rawInput) return '';
  const str = rawInput.trim();

  // 1. Match standard Google AIzaSy... key format (39 chars)
  const aizaMatch = str.match(/AIzaSy[A-Za-z0-9_-]{33}/);
  if (aizaMatch) return aizaMatch[0];

  // 2. Match AQ.Ab8RN... or similar Google API key token
  const aqMatch = str.match(/(AQ\.[A-Za-z0-9_-]+)/);
  if (aqMatch) return aqMatch[0];

  // 3. Otherwise, tokenized extraction for alphanumeric strings >= 20 chars
  const tokens = str.split(/[\s,:\n\t]+/);
  for (const token of tokens) {
    const clean = token.replace(/^['"]|['"]$/g, '');
    if (clean.length >= 20 && !clean.toLowerCase().includes('key') && !clean.includes('http')) {
      return clean;
    }
  }

  return str.replace(/^['"]|['"]$/g, '').trim();
}

export default function ApiKeyModal({
  isOpen,
  onClose,
  onSaveKey,
  onAddLater,
  title = 'Gemini API சாவி புதுப்பிப்பு (Gemini API Key)',
  description = 'தமிழ் கட்டுரை நகல் பரிசோதனை மற்றும் கல்வெட்டு OCR பகுப்பாய்விற்கு Gemini API key தேவைப்படுகிறது.',
  isQuotaExhausted = false,
}: ApiKeyModalProps) {
  const [keyInput, setKeyInput] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const stored = localStorage.getItem('gemini_api_key') || '';
      setKeyInput(stored);
      setSavedSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const cleanKey = extractCleanApiKey(keyInput);
  const isAizaFormat = cleanKey.startsWith('AIzaSy');

  const handleSave = () => {
    if (cleanKey) {
      localStorage.setItem('gemini_api_key', cleanKey);
    } else {
      localStorage.removeItem('gemini_api_key');
    }
    setSavedSuccess(true);
    onSaveKey(cleanKey);
    setTimeout(() => {
      onClose();
    }, 400);
  };

  const handleAddLater = () => {
    if (onAddLater) {
      onAddLater();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border-2 border-[#C89551] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
        
        {/* Top Trim Accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#581515] via-[#C89551] to-[#581515]"></div>

        {/* Close Button X */}
        <button
          onClick={handleAddLater}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon + Title */}
        <div className="space-y-3 pt-1">
          <div className="w-14 h-14 rounded-2xl bg-[#581515] text-amber-300 border border-[#C89551] flex items-center justify-center shadow-md">
            {isQuotaExhausted ? (
              <AlertTriangle className="w-7 h-7 text-amber-300 animate-pulse" />
            ) : (
              <Key className="w-7 h-7 text-amber-300" />
            )}
          </div>

          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-[#581515] text-amber-300 text-[11px] font-black uppercase tracking-wider mb-1 border border-amber-400/40">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>{isQuotaExhausted ? 'API Key Quota Exhausted' : 'API Key Config'}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-[#581515] tracking-tight">
              {isQuotaExhausted ? 'Gemini API கிரெடிட்ஸ் / Quota முடிந்துவிட்டது!' : title}
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-1 leading-relaxed">
              {isQuotaExhausted
                ? 'தற்போது உள்ள Gemini API Key-ன் பயன்பாட்டு வரம்பு (Quota/Credits) முடிந்துவிட்டது. புதிய API சாவி-யை (New Gemini API Key) கீழே உள்ளிட்டு தொடரவும்.'
                : description}
            </p>
          </div>
        </div>

        {/* Form Input */}
        <div className="space-y-3">
          <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center justify-between">
            <span>Gemini API Key:</span>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#581515] hover:underline text-[11px] font-black flex items-center gap-1"
            >
              <span>இலவச சாவி பெற (Get Free Key)</span>
              <ExternalLink className="w-3 h-3 text-[#581515]" />
            </a>
          </label>

          <div className="relative flex items-center">
            <input
              type={showKey ? 'text' : 'password'}
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full p-4 pr-12 bg-[#fbf7f0] border-2 border-[#e6dac8] rounded-2xl text-sm font-mono font-bold text-slate-900 focus:outline-none focus:border-[#581515] focus:ring-2 focus:ring-[#581515]/20 shadow-inner"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3.5 text-slate-400 hover:text-slate-700 p-1 rounded-lg"
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Validation Feedback */}
          {cleanKey && (
            <div className={`p-3 rounded-xl text-xs font-bold flex items-start gap-2 border ${
              isAizaFormat
                ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                : 'bg-amber-50 text-amber-950 border-amber-300'
            }`}>
              {isAizaFormat ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>செல்லுபடியாகும் Gemini API Key வடிவம் (AIzaSy...)</span>
                </>
              ) : (
                <>
                  <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-black text-amber-900 block">கவனிக்க (Note):</span>
                    <span className="text-[11px] leading-tight">
                      Google Gemini API Keys வழக்கமாக 'AIzaSy...' எனத் தொடங்க வேண்டும். நீங்கள் உள்ளிட்ட சாவி தவறாக இருந்தால் இலவச சாவியை கூகுள் தளத்தில் பெறலாம்.
                    </span>
                  </div>
                </>
              )}
            </div>
          )}

          <p className="text-[11px] text-slate-500 font-medium">
            💡 <strong>குறிப்பு:</strong> இந்தச் சாவி உங்கள் உலாவியில் மட்டுமே (Local Browser Storage) பாதுகாப்பாகச் சேமிக்கப்படும்.
          </p>
        </div>

        {/* Buttons: Replace / Save Key & Add Later */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
          {/* Add Later Button */}
          <button
            type="button"
            onClick={handleAddLater}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer text-center"
          >
            பிறகு சேர்க்கிறேன் (Add Later)
          </button>

          {/* Save / Replace Key Button */}
          <button
            type="button"
            onClick={handleSave}
            disabled={!keyInput.trim()}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#581515] hover:bg-[#7a2222] text-amber-300 font-black text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-lg border-2 border-[#C89551] transition-all active:scale-95 cursor-pointer disabled:opacity-50"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>சாவி மாற்றப்பட்டது!</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 text-amber-300" />
                <span>{isQuotaExhausted ? 'புதிய சாவி சேர் (Replace & Retry)' : 'சாவியைச் சேமி (Save Key)'}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
