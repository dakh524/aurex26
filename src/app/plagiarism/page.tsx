"use client";

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Sparkles, 
  ExternalLink, 
  Copy, 
  Check, 
  Loader2, 
  BarChart3, 
  BookOpen, 
  Lightbulb, 
  TrendingUp, 
  Repeat, 
  Key,
  Link as LinkIcon
} from 'lucide-react';
import { PlagiarismResult } from '@/lib/plagiarism';
import ApiKeyModal from '@/components/ApiKeyModal';
import { useLanguage } from '@/lib/LanguageContext';

export default function TamilPlagiarismPage() {
  const { lang } = useLanguage();
  const [inputText, setInputText] = useState(
    'தமிழ்நாட்டின் தொல்லியல் வரலாற்றில் தஞ்சாவூர் பெருவுடையார் கோயில் மிகவும் முக்கியமான கல்வெட்டு ஆவணம் ஆகும். முதலாம் இராஜராஜ சோழன் ஆட்சிக் காலத்தில் இக்கோயிலுக்கு வழங்கப்பட்ட இறையிலி கொடைகள் மற்றும் சமூக பொருளாதார செய்திகள் விரிவாக விவரிக்கப்பட்டுள்ளது.'
  );

  const [result, setResult] = useState<PlagiarismResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedReport, setCopiedReport] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'improvements' | 'ideas' | 'methodology'>('all');
  
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [isQuotaExhausted, setIsQuotaExhausted] = useState(false);

  const handleAnalyze = async (overrideKey?: string) => {
    if (!inputText.trim()) {
      setError('உரையைத் தட்டச்சு చేయவும.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const clientApiKey = typeof overrideKey === 'string' ? overrideKey : (localStorage.getItem('gemini_api_key') || '');

    try {
      const res = await fetch('/api/plagiarism', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText.trim(), clientApiKey }),
      });

      const data = await res.json();
      if (data.success || data.originalityScore !== undefined) {
        setResult(data);
        if (data.isQuotaExhausted) {
          setIsQuotaExhausted(true);
        }
      } else {
        if (res.status === 429 || data.isQuotaExhausted || data.error?.includes('quota') || data.error?.includes('key')) {
          setIsQuotaExhausted(true);
        }
        setError(data.error || 'நகல் பரிசோதனை செய்ய முடியவில்லை.');
      }
    } catch (err: any) {
      console.error(err);
      setError('சோதனை செய்வதில் பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleAnalyze();
  }, []);

  const handleCopyReport = () => {
    if (!result) return;
    const reportText = `=== தமிழ் கட்டுரை நகல் பரிசோதனை அறிக்கை ===
தனித்துவம் (Originality): ${result.originalityScore}%
படைப்புத் திருட்டு (Plagiarism): ${result.plagiarismScore}%
மொத்தச் சொற்கள்: ${result.totalWords}
தனித்துவச் சொற்கள்: ${result.uniqueWords}
முடிவு: ${result.statusText}
சான்றுகள்: ${result.matchedSources.map(s => s.title).join(', ')}`;

    navigator.clipboard.writeText(reportText);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  const wordsCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const charsCount = inputText.length;

  return (
    <div className="w-full max-w-[1800px] mx-auto space-y-8 pb-16 px-4 sm:px-6 lg:px-10 xl:px-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#581515] via-[#420f0f] to-[#581515] text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>Hybrid Free Algorithm + AI Backup Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#fbf7f0]">
              {lang === 'en' ? 'Tamil Plagiarism Checker & Originality Detector' : 'தமிழ் கட்டுரை நகல் பரிசோதனை (Plagiarism Checker)'}
            </h1>
            <p className="text-amber-100/80 text-xs sm:text-sm mt-1 font-medium max-w-xl">
              {lang === 'en'
                ? 'Check Tamil articles, research papers, and documents for originality score and detect copied content.'
                : 'தமிழ் கட்டுரைகள், ஆய்வுக் கட்டுரைகள் மற்றும் ஆவணங்களின் தனித்துவத்தை (Originality) கணித்து படைப்புத் திருட்டைத் தவிர்க்கவும்.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 self-start sm:self-auto">
            <button
              onClick={() => {
                setIsQuotaExhausted(false);
                setIsKeyModalOpen(true);
              }}
              className="inline-flex items-center space-x-1.5 bg-white/10 hover:bg-white/20 text-amber-300 font-extrabold px-4 py-3 rounded-2xl border border-amber-400/30 text-xs transition-colors cursor-pointer"
              title="Configure Gemini API Key"
            >
              <Key className="w-4 h-4 text-amber-300" />
              <span>API Key</span>
            </button>

            <button
              onClick={() => handleAnalyze()}
              disabled={isLoading}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black px-6 py-3.5 rounded-2xl shadow-lg transition-transform active:scale-95 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
              ) : (
                <BarChart3 className="w-5 h-5 text-slate-950" />
              )}
              <span>{isLoading ? (lang === 'en' ? 'Analyzing...' : 'பரிசோதிக்கிறது...') : (lang === 'en' ? 'Check Plagiarism' : 'நகல் பரிசோதனை செய் (Check Plagiarism)')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Input Box + Score Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Text Input Box */}
        <div className="lg:col-span-7 bg-white border-2 border-[#e7dcd0] rounded-3xl p-6 shadow-md flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-[#581515] flex items-center space-x-1.5">
                <FileText className="w-4 h-4 text-[#581515]" />
                <span>{lang === 'en' ? 'Tamil Article / Document Input' : 'தமிழ் உரை உள்ளீடு (Tamil Article Input)'}</span>
              </label>
              <div className="flex items-center space-x-2 text-[11px] font-bold text-slate-400">
                <span>{wordsCount} {lang === 'en' ? 'words' : 'சொற்கள்'}</span>
                <span>•</span>
                <span>{charsCount} {lang === 'en' ? 'chars' : 'எழுத்துக்கள்'}</span>
              </div>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={lang === 'en' ? "Type or paste Tamil article here..." : "இங்கே தமிழ் கட்டுரை அல்லது உரையைத் தட்டச்சு செய்யவும..."}
              rows={9}
              className="w-full p-4 rounded-2xl border border-slate-200 bg-[#fbf7f0]/50 text-slate-800 font-medium text-base leading-relaxed focus:outline-none focus:border-[#581515] focus:ring-2 focus:ring-[#581515]/10 transition-all resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                setInputText('');
                setResult(null);
                setError(null);
              }}
              className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              {lang === 'en' ? 'Clear Input' : 'உரையை அழிக்க (Clear)'}
            </button>

            <button
              onClick={() => handleAnalyze()}
              disabled={isLoading}
              className="inline-flex items-center space-x-2 bg-[#581515] hover:bg-[#3f0e0e] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{lang === 'en' ? 'Re-analyze' : 'மறுபடியும் சோதிக்க'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Score Summary Card */}
        <div className="lg:col-span-5 bg-white border-2 border-[#e7dcd0] rounded-3xl p-6 shadow-md flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black uppercase tracking-wider text-[#581515] flex items-center space-x-1.5">
                <BarChart3 className="w-4 h-4 text-[#581515]" />
                <span>பரிசோதனை முடிவு (Score Meter)</span>
              </h3>
              {result && (
                <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${
                  result.summaryStatus === 'high_original'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : result.summaryStatus === 'moderate'
                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                    : 'bg-rose-50 text-rose-800 border-rose-200'
                }`}>
                  {result.statusText}
                </span>
              )}
            </div>

            {isLoading ? (
              <div className="py-12 text-center space-y-3">
                <Loader2 className="w-8 h-8 animate-spin text-[#581515] mx-auto" />
                <p className="text-xs font-bold text-slate-600">
                  தமிழ் கட்டுரையின் தனித்துவத்தை கணித்துக் கொண்டிருக்கிறது...
                </p>
              </div>
            ) : result ? (
              <div className="space-y-5">
                
                {/* Radial Gauge Meter */}
                <div className="bg-[#fbf7f0] border-2 border-[#e6dac8] rounded-2xl p-5 text-center space-y-4 shadow-inner">
                  <div className="grid grid-cols-2 gap-4 items-center divider-x">
                    
                    {/* Plagiarism Score */}
                    <div className="text-center p-3 rounded-xl bg-white border border-[#e6dac8] shadow-xs">
                      <span className="text-[10px] font-black text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200 uppercase block w-fit mx-auto mb-1">
                        ⚠️ படைப்புத் திருட்டு
                      </span>
                      <span className={`text-3xl sm:text-4xl font-black ${
                        result.plagiarismScore > 30 ? 'text-rose-600' : 'text-amber-600'
                      }`}>
                        {result.plagiarismScore}%
                      </span>
                      <span className="text-[11px] font-extrabold text-slate-600 uppercase block mt-1">
                        நகல் (Plagiarism)
                      </span>
                    </div>

                    {/* Originality Score */}
                    <div className="text-center p-3 rounded-xl bg-white border border-[#e6dac8] shadow-xs">
                      <span className="text-[10px] font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 uppercase block w-fit mx-auto mb-1">
                        ✨ சொந்த உரை
                      </span>
                      <span className="text-3xl sm:text-4xl font-black text-emerald-600">
                        {result.originalityScore}%
                      </span>
                      <span className="text-[11px] font-extrabold text-slate-600 uppercase block mt-1">
                        தனித்துவம் (Originality)
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 h-3.5 rounded-full overflow-hidden flex shadow-inner border border-slate-300">
                    <div
                      style={{ width: `${result.plagiarismScore}%` }}
                      className="bg-rose-500 h-full transition-all duration-700"
                      title={`Plagiarism: ${result.plagiarismScore}%`}
                    ></div>
                    <div
                      style={{ width: `${result.originalityScore}%` }}
                      className="bg-emerald-500 h-full transition-all duration-700"
                      title={`Originality: ${result.originalityScore}%`}
                    ></div>
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-[#fcf8f2] p-3 rounded-xl border border-[#e6dac8]">
                    <span className="text-slate-400 font-bold block">மொத்த சொற்கள்</span>
                    <span className="text-base font-black text-slate-900">{result.totalWords}</span>
                  </div>

                  <div className="bg-[#fcf8f2] p-3 rounded-xl border border-[#e6dac8]">
                    <span className="text-slate-400 font-bold block">தனித்துவ சொற்கள்</span>
                    <span className="text-base font-black text-emerald-700">{result.uniqueWords}</span>
                  </div>

                  <div className="bg-[#fcf8f2] p-3 rounded-xl border border-[#e6dac8]">
                    <span className="text-slate-400 font-bold block">மொத்த வாக்கியங்கள்</span>
                    <span className="text-base font-black text-slate-900">{result.totalSentences}</span>
                  </div>

                  <div className="bg-[#fcf8f2] p-3 rounded-xl border border-[#e6dac8]">
                    <span className="text-slate-400 font-bold block">நகல் வரிகள்</span>
                    <span className="text-base font-black text-rose-700">{result.flaggedSentencesCount}</span>
                  </div>
                </div>

              </div>
            ) : (
              <p className="text-xs text-slate-400 italic text-center py-8">
                மேலே உள்ள "பரிசோதனை செய்" பட்டனை அழுத்தவும்.
              </p>
            )}
          </div>

          {result && (
            <button
              onClick={handleCopyReport}
              className="w-full inline-flex items-center justify-center space-x-2 bg-[#f4ece1] hover:bg-[#581515] text-[#581515] hover:text-white font-black text-xs py-3 rounded-xl border border-[#e6dac8] transition-colors cursor-pointer"
            >
              {copiedReport ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copiedReport ? 'அறிக்கை நகலெடுக்கப்பட்டது!' : 'அறிக்கையை நகலெடு (Copy Report)'}</span>
            </button>
          )}
        </div>

      </div>

      {/* Detailed Analysis Tabs & Report Section */}
      {result && (
        <div className="space-y-6">
          
          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-[#e7dcd0] pb-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#581515] text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-[#f4ece1] border border-[#e7dcd0]'
              }`}
            >
              பிழை சுட்டிக்காட்டுதல் ({result.flaggedSentencesCount})
            </button>

            <button
              onClick={() => setActiveTab('improvements')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                activeTab === 'improvements'
                  ? 'bg-[#581515] text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-[#f4ece1] border border-[#e7dcd0]'
              }`}
            >
              நடை மேம்பாடு ({result.improvementDetails.length})
            </button>

            <button
              onClick={() => setActiveTab('ideas')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                activeTab === 'ideas'
                  ? 'bg-[#581515] text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-[#f4ece1] border border-[#e7dcd0]'
              }`}
            >
              💡 AI சேர்க்க வேண்டிய யோசனைகள் ({result.aiContentIdeas?.length || 3})
            </button>

            <button
              onClick={() => setActiveTab('methodology')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                activeTab === 'methodology'
                  ? 'bg-[#581515] text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-[#f4ece1] border border-[#e7dcd0]'
              }`}
            >
              🔬 கணித & AI முறைகள் ({result.methodologyDetails?.length || 3})
            </button>
          </div>

          {/* Tab 1: Flagged Sentences & Similarity Details */}
          {activeTab === 'all' && (
            <div className="space-y-6">
              
              {/* Flagged Sentences List */}
              <div className="bg-white border-2 border-[#e7dcd0] p-6 sm:p-8 rounded-3xl shadow-md space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-black text-[#581515] flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <span>நகல் என சுட்டிக்காட்டப்பட்ட வாக்கியங்கள் (Flagged Lines)</span>
                  </h3>
                  <span className="text-xs font-bold text-slate-400">
                    {result.flaggedSentences.length} வாக்கியங்கள் கண்டறியப்பட்டுள்ளன
                  </span>
                </div>

                {result.flaggedSentences.length === 0 ? (
                  <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 font-bold text-sm flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>சிறப்பு! உங்கள் உரையில் எந்த ஒரு பெரிய படைப்புத் திருட்டும் கண்டறியப்படவில்லை. உரை 100% தனித்துவமானது!</span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {result.flaggedSentences.map((flag, idx) => (
                      <div key={idx} className="bg-[#fcf8f2] border-2 border-amber-200/80 rounded-2xl p-5 space-y-3 shadow-sm hover:border-amber-400 transition-colors">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-sm sm:text-base font-extrabold text-slate-900 bg-amber-100/60 p-3 rounded-xl border border-amber-200 leading-relaxed">
                            "{flag.sentence}"
                          </p>
                          <span className="text-xs font-black bg-rose-100 text-rose-800 px-3 py-1 rounded-full shrink-0 border border-rose-200">
                            {flag.similarityScore}% நகல்
                          </span>
                        </div>

                        <div className="text-xs space-y-1.5 pt-1">
                          <div className="text-amber-900 font-bold flex items-center space-x-1.5">
                            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                            <span><strong>காரணம்:</strong> {flag.reason}</span>
                          </div>

                          {flag.suggestion && (
                            <div className="text-emerald-950 font-bold bg-emerald-50 p-3 rounded-xl border border-emerald-200 flex items-start space-x-1.5 mt-2">
                              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span><strong>மாற்று யோசனை:</strong> {flag.suggestion}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Matched Sources Showcase */}
              {result.matchedSources.length > 0 && (
                <div className="bg-white border-2 border-[#e7dcd0] p-6 sm:p-8 rounded-3xl shadow-md space-y-4">
                  <h3 className="text-base font-black text-[#581515] flex items-center space-x-2 border-b border-slate-100 pb-3">
                    <BookOpen className="w-5 h-5 text-amber-700" />
                    <span>🌐 இணையச் சான்றுகள் & ஒப்பிடப்பட்ட ஆவணங்கள் (Matched Sources)</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {result.matchedSources.map((src, sIdx) => (
                      <a
                        key={sIdx}
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#fbf7f0] hover:bg-white border-2 border-[#e6dac8] hover:border-[#581515] p-4 rounded-2xl shadow-sm transition-all group flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-[#581515] text-sm group-hover:underline flex items-center space-x-1.5">
                              <span>{src.title}</span>
                            </span>
                            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#581515] shrink-0" />
                          </div>
                          <span className="text-[11px] font-extrabold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-md inline-block">
                            {src.matchPercentage}% பொருத்தப்பாடு
                          </span>
                        </div>
                        <div className="mt-3 pt-2 border-t border-slate-200 text-[11px] text-slate-400 font-mono truncate">
                          {src.url}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* Tab 2: Detailed Improvement Suggestions */}
          {activeTab === 'improvements' && (
            <div className="bg-white border-2 border-[#e7dcd0] p-6 sm:p-8 rounded-3xl shadow-md space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-xl font-black text-[#581515] flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>கட்டுரைத் தரத்தை உயர்த்த வழிகாட்டும் பரிந்துரைகள் (Improvement Details)</span>
                </h3>
                <p className="text-xs text-slate-500 font-bold mt-1">
                  உங்களின் தமிழ் கட்டுரையை 100% தனித்துவமானதாக மாற்றக் கீழ்க்கண்ட குறிப்புகளைப் பயன்படுத்தவும்.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {result.improvementDetails.map((imp, iIdx) => (
                  <div key={iIdx} className="bg-[#fcf8f2] border-2 border-[#e6dac8] p-5 rounded-2xl space-y-3 shadow-sm flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-2xl bg-[#581515] text-white flex items-center justify-center shadow-md">
                        {imp.category === 'சொற்களஞ்சியம்' ? <Sparkles className="w-5 h-5 text-amber-300" /> :
                         imp.category === 'வாக்கிய நடை' ? <Repeat className="w-5 h-5 text-amber-300" /> :
                         <LinkIcon className="w-5 h-5 text-amber-300" />}
                      </div>

                      <h4 className="text-base font-black text-slate-900">
                        {imp.title}
                      </h4>

                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        {imp.description}
                      </p>
                    </div>

                    {imp.exampleBefore && (
                      <div className="pt-3 border-t border-slate-200 text-xs space-y-1.5">
                        <div className="text-rose-800 bg-rose-50 p-2 rounded-lg border border-rose-200">
                          <span className="font-bold block text-[10px] uppercase text-rose-600">தவிர்க்க:</span>
                          "{imp.exampleBefore}"
                        </div>

                        {imp.exampleAfter && (
                          <div className="text-emerald-900 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                            <span className="font-bold block text-[10px] uppercase text-emerald-600">சிறந்த நடை:</span>
                            "{imp.exampleAfter}"
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: AI Content Expansion Ideas */}
          {activeTab === 'ideas' && (
            <div className="bg-white border-2 border-[#e7dcd0] p-6 sm:p-8 rounded-3xl shadow-md space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-xl font-black text-[#581515] flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  <span>💡 AI பரிந்துரைக்கும் உள்ளடக்க விரிவாக்க யோசனைகள் (AI Content Expansion Ideas)</span>
                </h3>
                <p className="text-xs text-slate-500 font-bold mt-1">
                  Gemini AI பகுப்பாய்வு செய்து உங்களின் கட்டுரையில் சேர்க்க வேண்டிய கூடுதல் தகவல்களைப் பரிந்துரைக்கிறது.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(result.aiContentIdeas || []).map((idea, idx) => (
                  <div key={idx} className="bg-[#fcf8f2] border-2 border-amber-200/80 p-5 rounded-2xl space-y-3 shadow-sm hover:border-amber-400 transition-colors flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black border border-amber-300">
                        <TrendingUp className="w-3.5 h-3.5 text-amber-700" />
                        <span>{idea.topic}</span>
                      </div>

                      <p className="text-sm font-extrabold text-slate-900 leading-relaxed pt-1">
                        "{idea.recommendation}"
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200/80 text-xs text-emerald-800 font-black flex items-center space-x-1.5 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                      <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>தாக்கம்:</strong> {idea.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Detection Methodology Explanation */}
          {activeTab === 'methodology' && (
            <div className="bg-white border-2 border-[#e7dcd0] p-6 sm:p-8 rounded-3xl shadow-md space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-xl font-black text-[#581515] flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-[#581515]" />
                  <span>🔬 பயன்படுத்தப்பட்ட நகல் கண்டறிதல் கணித முறைகள் (Plagiarism Detection Algorithms)</span>
                </h3>
                <p className="text-xs text-slate-500 font-bold mt-1">
                  நமது அமைப்பில் செயல்படுத்தப்பட்டுள்ள தொழில்துறைத் தரத்திலான 3 கட்ட நகல் கண்டறிதல் இயங்குதளங்கள்.
                </p>
              </div>

              <div className="space-y-4">
                {(result.methodologyDetails || []).map((meth, mIdx) => (
                  <div key={mIdx} className="bg-[#fbf7f0] border-2 border-[#e6dac8] p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                    <div className="space-y-1 max-w-2xl">
                      <span className="text-xs font-black text-[#581515] bg-[#f4ece1] px-2.5 py-1 rounded-md border border-[#e6dac8] inline-block mb-1">
                        முறை {mIdx + 1}
                      </span>
                      <h4 className="text-base font-black text-slate-900">
                        {meth.name}
                      </h4>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        {meth.description}
                      </p>
                    </div>

                    <span className="inline-flex items-center space-x-1.5 text-xs font-extrabold text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{meth.status}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* Gemini API Key Management Modal */}
      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        onSaveKey={(newKey) => {
          setIsQuotaExhausted(false);
          handleAnalyze(newKey);
        }}
        onAddLater={() => {
          setIsQuotaExhausted(false);
          handleAnalyze('');
        }}
        isQuotaExhausted={isQuotaExhausted}
      />

    </div>
  );
}
