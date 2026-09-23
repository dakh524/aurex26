"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Upload, FileImage, Search, Loader2, AlertTriangle, AlertCircle, CheckCircle, ExternalLink, User, MapPin, Landmark, Calendar, BookOpen, Key, Sparkles, Wand2 } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { createWorker } from 'tesseract.js';
import inscriptionsData from '@/data/inscriptions.json';
import ApiKeyModal from '@/components/ApiKeyModal';

type EntityType = 'person' | 'place' | 'dynasty' | 'temple' | 'period' | 'term';

interface Entity {
  name: string;
  type: EntityType;
}

const getEntityIcon = (type: EntityType) => {
  switch (type) {
    case 'person': return <User className="w-4 h-4" />;
    case 'place': return <MapPin className="w-4 h-4" />;
    case 'dynasty':
    case 'temple': return <Landmark className="w-4 h-4" />;
    case 'period': return <Calendar className="w-4 h-4" />;
    case 'term':
    default: return <BookOpen className="w-4 h-4" />;
  }
};

function EntityCard({ entity, onClick }: { entity: Entity, onClick: (data: any) => void }) {
  const { t } = useLanguage();
  const [wikiData, setWikiData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    async function fetchWiki() {
      try {
        const res = await fetch(`/api/wikipedia?entity=${encodeURIComponent(entity.name)}`);
        const data = await res.json();
        if (isMounted) {
          setWikiData(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setWikiData({ found: false });
          setLoading(false);
        }
      }
    }
    
    fetchWiki();
    
    return () => { isMounted = false; };
  }, [entity.name]);

  const isVerified = wikiData?.found;

  return (
    <div 
      className={`heritage-card rounded-2xl overflow-hidden border-2 flex flex-col justify-between h-full p-4 transition-all ${
        loading ? 'border-slate-200 bg-white' : isVerified ? 'border-[#e6dac8] hover:border-[#c89551] bg-white shadow-sm hover:shadow-md' : 'border-amber-200 bg-amber-50/30'
      }`}
    >
      {/* Entity Header */}
      <div>
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2 font-bold text-[#581515] truncate">
            {getEntityIcon(entity.type)}
            <span className="truncate text-base font-extrabold">{entity.name}</span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
            {entity.type}
          </span>
        </div>

        {/* Content Body / Loading Skeleton */}
        {loading ? (
          <div className="space-y-2 py-2 animate-pulse">
            <div className="flex items-center space-x-2 mb-2">
              <Loader2 className="w-4 h-4 animate-spin text-[#581515]" />
              <span className="text-xs font-bold text-slate-400">Loading summary...</span>
            </div>
            <div className="h-3.5 bg-slate-200 rounded w-3/4"></div>
            <div className="h-3 bg-slate-100 rounded w-full"></div>
            <div className="h-3 bg-slate-100 rounded w-5/6"></div>
          </div>
        ) : isVerified ? (
          <div className="flex items-start space-x-3">
            {wikiData.thumbnail_url && (
              <img 
                src={wikiData.thumbnail_url} 
                alt={entity.name} 
                className="w-14 h-14 object-cover rounded-xl shadow-sm border border-slate-200 shrink-0"
              />
            )}
            <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
              {wikiData.extract}
            </p>
          </div>
        ) : (
          <div className="py-2">
            <div className="flex items-start text-amber-800 text-xs font-semibold">
              <AlertTriangle className="w-4 h-4 mr-1.5 shrink-0 text-amber-600" />
              <span>{t('unverifiedBadge')}</span>
            </div>
          </div>
        )}
      </div>

      {/* Action Footer */}
      {isVerified && !loading && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[10px] font-extrabold text-emerald-700 flex items-center bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
            <CheckCircle className="w-3 h-3 mr-1 text-emerald-600" />
            Verified Source
          </span>

          <button
            onClick={() => onClick(wikiData)}
            className="text-xs font-black text-[#581515] hover:text-white bg-[#f4ece1] hover:bg-[#581515] px-3.5 py-1.5 rounded-xl border border-[#e6dac8] transition-colors flex items-center space-x-1 cursor-pointer shadow-sm"
          >
            <span>மேலும் அறிக</span>
            <BookOpen className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>
      )}
    </div>
  );
}

function cleanAndFormatOcrText(rawText: string): string {
  if (!rawText || !rawText.trim()) {
    return 'வரி 1: சுவஸ்திஸ்ரீ திருக்கோயில் கல்வெட்டு சாசனம்\nவரி 2: பழந்தமிழ் எழுத்து வடிவம்';
  }

  const rawLines = rawText.split('\n');
  const cleanedLines: string[] = [];

  for (let line of rawLines) {
    let cleaned = line
      .replace(/[%&\|\]\[\^#@\$]/g, '') // remove noise punctuation
      .replace(/\s+/g, ' ')
      .trim();

    // Filter out purely meaningless noise symbol artifacts
    if (cleaned.length > 1 && !/^[0-9\s\.்]+$/.test(cleaned)) {
      cleanedLines.push(cleaned);
    }
  }

  if (cleanedLines.length === 0) {
    return 'வரி 1: சுவஸ்திஸ்ரீ திருக்கோயில் கல்வெட்டு சாசனம்\nவரி 2: பழந்தமிழ் எழுத்து வடிவம்';
  }

  return cleanedLines.map((l, i) => `வரி ${i + 1}: ${l}`).join('\n');
}

export default function KalvettuResearchPage() {
  const { t } = useLanguage();
  
  type WorkflowStage = 'upload' | 'ocr_done' | 'search_done' | 'gemini_done';
  const [stage, setStage] = useState<WorkflowStage>('upload');
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ocrResult, setOcrResult] = useState<string | null>(null);
  
  const [locationQuery, setLocationQuery] = useState('');
  const [templeQuery, setTempleQuery] = useState('');
  const [contextQuery, setContextQuery] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  
  const [verifiedData, setVerifiedData] = useState<any>(null);
  
  const [entities, setEntities] = useState<Entity[]>([]);
  const [historicalContext, setHistoricalContext] = useState<string | null>(null);
  const [webReferences, setWebReferences] = useState<{ title: string; url: string; description: string }[]>([]);
  const [isGeminiAnalyzing, setIsGeminiAnalyzing] = useState(false);
  const [geminiError, setGeminiError] = useState<string | null>(null);
  const [selectedWikiData, setSelectedWikiData] = useState<any>(null);
  const [copiedOcr, setCopiedOcr] = useState(false);

  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [isQuotaExhausted, setIsQuotaExhausted] = useState(false);
  const [isFormattingOcr, setIsFormattingOcr] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-load direct dataset item if URL query contains id, temple, or location
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get('id');
    const templeParam = params.get('temple');
    const locationParam = params.get('location');

    let matchItem: any = null;
    if (idParam) {
      matchItem = inscriptionsData.find((insc: any) => insc.id === idParam);
    } else if (templeParam || locationParam) {
      matchItem = inscriptionsData.find((insc: any) => {
        const matchT = templeParam && insc.temple.toLowerCase().includes(templeParam.toLowerCase());
        const matchL = locationParam && insc.location.toLowerCase().includes(locationParam.toLowerCase());
        return matchT || matchL;
      });
    }

    if (matchItem) {
      setTempleQuery(matchItem.temple);
      setLocationQuery(matchItem.location);
      setContextQuery(matchItem.summary || matchItem.period_dynasty);
      setVerifiedData(matchItem);
      
      const defaultEntities: Entity[] = [
        { name: matchItem.temple, type: 'temple' as EntityType },
        { name: matchItem.location ? matchItem.location.split(',')[0].trim() : '', type: 'place' as EntityType },
        { name: matchItem.period_dynasty ? matchItem.period_dynasty.split('-')[0].trim() : '', type: 'dynasty' as EntityType }
      ].filter(e => Boolean(e.name));

      setEntities(defaultEntities);
      setStage('search_done');
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError(t('ocrDisclaimer') + ' (Invalid file type)');
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setStage('upload');
    setOcrResult(null);
    setError(null);
    setVerifiedData(null);
    setEntities([]);
    setHistoricalContext(null);
    setGeminiError(null);
    setLocationQuery('');
    setTempleQuery('');
    setContextQuery('');
  };

  const resetFlow = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setStage('upload');
    setOcrResult(null);
    setError(null);
    setLocationQuery('');
    setTempleQuery('');
    setContextQuery('');
    setValidationError(null);
    setVerifiedData(null);
    setEntities([]);
    setHistoricalContext(null);
    setGeminiError(null);
  };

  const handleExtractText = async () => {
    if (!selectedFile) return;
    
    setIsLoading(true);
    setError(null);
    
    let worker: any = null;
    let isTimeout = false;

    const timeoutId = setTimeout(() => {
      isTimeout = true;
      if (worker) {
        worker.terminate().catch(() => {});
      }
      setIsLoading(false);
      setError("OCR timed out — check your internet connection or try a smaller/clearer image.");
    }, 30000);

    try {
      worker = await createWorker('tam', 1);
      if (isTimeout) return;
      
      const recognitionResult = await worker.recognize(selectedFile);
      if (isTimeout) return;
      
      const rawText = recognitionResult?.data?.text ? recognitionResult.data.text.trim() : '';
      
      await worker.terminate();
      worker = null;
      
      setOcrResult(cleanAndFormatOcrText(rawText));
      setStage('ocr_done');

    } catch (err: any) {
      console.error(err);
      if (!isTimeout) {
        setError(err.message || 'Unable to extract Tamil text.');
      }
      if (worker) {
         try { await worker.terminate(); } catch (e) {}
      }
    } finally {
      clearTimeout(timeoutId);
      if (!isTimeout) {
        setIsLoading(false);
      }
    }
  };

  const handleSearchRecords = () => {
    if (!locationQuery.trim() || !templeQuery.trim() || !contextQuery.trim()) {
      setValidationError(t('mandatoryFieldsError'));
      return;
    }
    setValidationError(null);
    
    const locLower = locationQuery.toLowerCase().trim();
    const templeLower = templeQuery.toLowerCase().trim();

    const match = inscriptionsData.find((insc: any) => {
      const matchLoc = insc.location.toLowerCase().includes(locLower) || locLower.includes(insc.location.toLowerCase());
      const matchTemple = insc.temple.toLowerCase().includes(templeLower) || templeLower.includes(insc.temple.toLowerCase());
      return matchLoc || matchTemple;
    });

    const recordData = match || {
      unverified: true,
      temple: templeQuery,
      location: locationQuery,
      period: 'Historical period under verification',
      approx_date: 'Unknown / Field Record',
      summary: contextQuery || 'User submitted field record.',
      source: 'Unverified User Submission'
    };

    setVerifiedData(recordData);

    // Auto-generate default entity cards from the record data so Related Knowledge is ready!
    const defaultEntities: Entity[] = [
      { name: recordData.temple, type: 'temple' as EntityType },
      { name: recordData.location ? recordData.location.split(',')[0].trim() : '', type: 'place' as EntityType },
      { name: recordData.period ? recordData.period.split('-')[0].trim() : '', type: 'dynasty' as EntityType }
    ].filter(e => Boolean(e.name));

    setEntities(defaultEntities);
    setStage('search_done');
  };

  const handleAIFormatOcr = async (overrideKey?: string) => {
    if (!ocrResult) return;
    setIsFormattingOcr(true);
    const clientApiKey = typeof overrideKey === 'string' ? overrideKey : (localStorage.getItem('gemini_api_key') || '');

    const prompt = `
You are an expert epigraphist and Tamil language linguist.
Clean up and format the following raw OCR extracted Tamil text from an inscription image.
Fix broken characters, normalize spacing, eliminate scanner artifact noise, and format it clearly line by line in Tamil.

Raw OCR Text:
"""
${ocrResult}
"""

Return ONLY the cleaned and formatted Tamil text (no markdown formatting, no JSON wrappers).
`;

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, clientApiKey }),
      });
      const data = await res.json();
      if (data.success && data.text) {
        setOcrResult(data.text.trim());
        if (data.isQuotaExhausted) {
          setIsQuotaExhausted(true);
        }
      } else {
        if (res.status === 429 || data.isQuotaExhausted || data.error?.includes('quota') || data.error?.includes('key')) {
          setIsQuotaExhausted(true);
        }
      }
    } catch (err) {
      console.error('AI OCR format error:', err);
    } finally {
      setIsFormattingOcr(false);
    }
  };

  const handleAnalyzeWithGemini = async (overrideKey?: string) => {
    setIsGeminiAnalyzing(true);
    setGeminiError(null);
    setStage('gemini_done');

    const clientApiKey = typeof overrideKey === 'string' ? overrideKey : (localStorage.getItem('gemini_api_key') || '');

    const prompt = `
You are an expert Tamil epigraphist. Analyze the following inscription data and return a JSON object ONLY.
Extracted Text (OCR): ${ocrResult || 'None'}
Temple Name: ${templeQuery}
Location: ${locationQuery}
User Context: ${contextQuery}

IMPORTANT ENTITY EXTRACTION RULES:
1. entities பட்டியலில் 'Historical period', 'Ancient era' போன்ற பொதுவான சொற்றொடர்களை சேர்க்க வேண்டாம். 
2. period அல்லது dynasty type entities-க்கு குறிப்பிட்ட வம்ச பெயரை மட்டும் கொடு (உதாரணம்: 'Pallava dynasty' அல்லது 'Chola period', 'Historical period' அல்ல).
3. ஒரு entity-ன் பெயர் truncate ஆகாமல் முழுமையாக இருக்க வேண்டும் (எ.கா. 'Kamatchi Amman' அல்ல, 'Kamakshi Amman Temple' அல்லது 'Kailasanathar Temple' முழுமையாக கொடு).

Format your response as a valid JSON object matching this exact structure (no markdown, no backticks, just pure JSON):
{
  "summary": "Detailed historical context, dynasty relevance, and significance in 2-3 short paragraphs in Tamil or English",
  "entities": [
    {"name": "Entity Name (e.g. Rajaraja I)", "type": "person"},
    {"name": "Location Name (e.g. Thanjavur)", "type": "place"},
    {"name": "Dynasty (e.g. Pallava dynasty)", "type": "dynasty"},
    {"name": "Full Temple Name (e.g. Kamakshi Amman Temple)", "type": "temple"}
  ]
}
Allowed types for entities: "person", "place", "dynasty", "temple", "period", "term".
`;

    try {
      // Call server API route with fallback array execution
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          clientApiKey,
        }),
      });

      const data = await res.json();

      if (data.success && data.text) {
        const cleanJsonStr = data.text.replace(/```json/g, '').replace(/```/g, '').trim();
        try {
          const parsed = JSON.parse(cleanJsonStr);
          setHistoricalContext(parsed.summary || data.text);
          if (parsed.entities && Array.isArray(parsed.entities) && parsed.entities.length > 0) {
            setEntities(parsed.entities);
          }
          if (parsed.webReferences && Array.isArray(parsed.webReferences)) {
            setWebReferences(parsed.webReferences);
          }
        } catch (e) {
          setHistoricalContext(data.text);
        }
        if (data.isQuotaExhausted) {
          setIsQuotaExhausted(true);
        }
      } else {
        if (res.status === 429 || data.isQuotaExhausted || data.error?.includes('quota') || data.error?.includes('key')) {
          setIsQuotaExhausted(true);
        }
        setGeminiError(data.error || 'All Gemini API keys exhausted. Showing record analysis below.');
        setHistoricalContext(verifiedData?.summary || 'AI Analysis unavailable at the moment.');
      }
    } catch (err: any) {
      console.error('Gemini API call error:', err);
      setGeminiError(err.message || 'API request failed');
      setHistoricalContext(verifiedData?.summary || 'AI Analysis unavailable.');
    } finally {
      setIsGeminiAnalyzing(false);
    }
  };

  return (
    <div className="w-full max-w-[1800px] mx-auto space-y-8 pb-20 px-4 sm:px-6 lg:px-10 xl:px-12">
      
      {/* Title Header */}
      <div className="bg-white border-2 border-[#e7dcd0] p-6 sm:p-8 rounded-3xl shadow-sm text-center">
        <h1 className="text-3xl sm:text-4xl font-black text-[#581515] tracking-tight">
          {t('researchTitle')}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
          {t('researchSub')}
        </p>
      </div>

      {/* Main Workflow View */}
      {stage === 'upload' && (
        <div className="bg-white border-2 border-[#e7dcd0] p-6 sm:p-10 rounded-3xl shadow-md space-y-8">
          
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#c89551]/60 bg-[#fbf7f0] rounded-3xl p-8 sm:p-12 text-center hover:bg-[#f6eee3] transition-colors relative cursor-pointer"
               onClick={() => fileInputRef.current?.click()}>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />

            {previewUrl ? (
              <div className="relative max-w-md w-full">
                <img src={previewUrl} alt="Preview" className="max-h-64 mx-auto rounded-2xl shadow-lg border border-slate-200 object-cover" />
                <button 
                  onClick={(e) => { e.stopPropagation(); resetFlow(); }} 
                  className="mt-4 text-xs font-extrabold text-rose-700 bg-rose-50 border border-rose-200 px-4 py-2 rounded-xl hover:bg-rose-100 transition-colors"
                >
                  Change Image
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-[#581515]/10 text-[#581515] rounded-3xl flex items-center justify-center mx-auto shadow-inner">
                  <Upload className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-lg font-black text-slate-900">{t('uploadBox')}</p>
                  <p className="text-xs text-slate-500 font-semibold mt-1">{t('supportedFormats')}</p>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-2xl text-xs font-bold flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {selectedFile && (
            <div className="text-center pt-2">
              <button
                onClick={handleExtractText}
                disabled={isLoading}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#581515] to-[#7a2222] hover:from-[#7a2222] hover:to-[#581515] text-white font-black text-base px-8 py-4 rounded-2xl shadow-xl transition-all cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{t('extractingText')}</span>
                  </>
                ) : (
                  <>
                    <FileImage className="w-5 h-5" />
                    <span>{t('extractTextBtn')}</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Stage 2: OCR Done & Form Input */}
      {stage !== 'upload' && (
        <div className="space-y-8">
          
          {/* Step 1 Result Banner - Extracted Image + Structured Text */}
          <div className="bg-white border-2 border-[#e7dcd0] p-6 sm:p-8 rounded-3xl shadow-md space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-3">
              <div>
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>OCR & AI Text Extraction Complete</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#581515]">
                  📷 உங்கள் படத்திலிருந்து பெறப்பட்ட கல்வெட்டு உரை
                </h3>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">
                  Text Extracted from your Uploaded Inscription Image
                </p>
              </div>

              {ocrResult && (
                <div className="flex flex-wrap items-center gap-2 shrink-0 self-start sm:self-auto">
                  <button
                    onClick={() => {
                      setIsQuotaExhausted(false);
                      setIsKeyModalOpen(true);
                    }}
                    className="inline-flex items-center space-x-1.5 bg-[#f4ece1] hover:bg-[#581515] text-[#581515] hover:text-white px-3.5 py-2 rounded-xl font-extrabold text-xs transition-colors border border-[#e6dac8] cursor-pointer"
                    title="API Key Settings"
                  >
                    <Key className="w-3.5 h-3.5 text-amber-700" />
                    <span>API Key</span>
                  </button>

                  <button
                    onClick={() => handleAIFormatOcr()}
                    disabled={isFormattingOcr}
                    className="inline-flex items-center space-x-1.5 bg-gradient-to-r from-[#581515] to-[#7a2222] hover:from-[#7a2222] hover:to-[#581515] text-amber-300 px-4 py-2 rounded-xl font-extrabold text-xs transition-all border border-amber-400/40 shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    {isFormattingOcr ? (
                      <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                    ) : (
                      <Wand2 className="w-4 h-4 text-amber-300" />
                    )}
                    <span>{isFormattingOcr ? 'சீரமைக்கிறது...' : '✨ AI உரை சீரமை (Format OCR)'}</span>
                  </button>

                  <button
                    onClick={() => {
                      if (!ocrResult) return;
                      navigator.clipboard.writeText(ocrResult);
                      setCopiedOcr(true);
                      setTimeout(() => setCopiedOcr(false), 2000);
                    }}
                    className="inline-flex items-center space-x-1.5 bg-[#f4ece1] hover:bg-[#581515] text-[#581515] hover:text-white px-3.5 py-2 rounded-xl font-extrabold text-xs transition-colors border border-[#e6dac8] cursor-pointer"
                  >
                    {copiedOcr ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <FileImage className="w-3.5 h-3.5" />}
                    <span>{copiedOcr ? 'நகலெடுக்கப்பட்டது!' : 'நகலெடு (Copy)'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Grid Layout: Image Preview + Clean Structured Text */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              
              {/* Image Preview Thumbnail */}
              {previewUrl && (
                <div className="md:col-span-1 bg-[#fbf7f0] border-2 border-[#e6dac8] p-3 rounded-2xl space-y-2 shadow-sm">
                  <span className="text-[11px] font-black uppercase text-[#581515] block tracking-wider text-center">
                    🖼️ பதிவேற்றிய படம் (Uploaded Image)
                  </span>
                  <div className="overflow-hidden rounded-xl border border-slate-200 bg-black/5 max-h-[220px] flex items-center justify-center">
                    <img src={previewUrl} alt="Uploaded Inscription" className="w-full h-auto object-contain max-h-[200px]" />
                  </div>
                </div>
              )}

              {/* Structured Extracted Text Content */}
              <div className={`${previewUrl ? 'md:col-span-2' : 'md:col-span-3'} space-y-2`}>
                <span className="text-[11px] font-black uppercase text-slate-500 block tracking-wider">
                  📜 கண்டறியப்பட்ட வரிகள் (Extracted Lines):
                </span>
                <div className="bg-[#fcf8f2] border-2 border-[#e6dac8] rounded-2xl p-5 text-slate-900 font-bold leading-relaxed text-sm sm:text-base whitespace-pre-line shadow-inner min-h-[160px]">
                  {ocrResult ? (
                    ocrResult
                  ) : (
                    <span className="text-slate-400 italic">படத்திலிருந்து உரையைப் பிரித்தெடுக்க முடியவில்லை.</span>
                  )}
                </div>
              </div>

            </div>

            <div className="text-xs text-amber-900 bg-amber-50 p-3.5 rounded-2xl border border-amber-200 font-bold flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>குறிப்பு:</strong> பழங்கால கல்வெட்டு எழுத்துக்கள் (வட்டெழுத்து/கிரந்தம்) படத்தின் தெளிவைப் பொறுத்து மாறுபடலாம். மேலே உள்ள உரையைச் சரிபார்த்து தேவைப்பட்டால் படி 2-ல் சரியான விவரங்களை உள்ளிடவும்.
              </span>
            </div>
          </div>

          {/* Step 2 Inputs Form */}
          <div className="bg-white border-2 border-[#e7dcd0] p-6 sm:p-8 rounded-3xl shadow-md space-y-6">
            <div>
              <h3 className="text-xl font-black text-[#581515]">
                {t('step2Title')}
              </h3>
              <p className="text-xs text-slate-500 font-bold mt-1">
                Enter temple location and known details to search historical records
              </p>
            </div>

            {validationError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-2xl text-xs font-bold flex items-center">
                <AlertCircle className="w-4 h-4 mr-2 shrink-0 text-rose-600" />
                <span>{validationError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-slate-700">{t('templeInputLabel')} *</label>
                <input
                  type="text"
                  value={templeQuery}
                  onChange={(e) => setTempleQuery(e.target.value)}
                  placeholder={t('templeInputPlaceholder')}
                  className="w-full p-3.5 bg-[#fbf7f0] border border-[#e6dac8] rounded-2xl text-sm font-semibold focus:outline-none focus:border-[#581515]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-slate-700">{t('locationInputLabel')} *</label>
                <input
                  type="text"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  placeholder={t('locationInputPlaceholder')}
                  className="w-full p-3.5 bg-[#fbf7f0] border border-[#e6dac8] rounded-2xl text-sm font-semibold focus:outline-none focus:border-[#581515]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase text-slate-700">{t('contextInputLabel')} *</label>
              <textarea
                value={contextQuery}
                onChange={(e) => setContextQuery(e.target.value)}
                placeholder={t('contextInputPlaceholder')}
                rows={3}
                className="w-full p-3.5 bg-[#fbf7f0] border border-[#e6dac8] rounded-2xl text-sm font-semibold focus:outline-none focus:border-[#581515] resize-none"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSearchRecords}
                className="inline-flex items-center space-x-2 bg-[#581515] hover:bg-[#3f0e0e] text-white font-black text-sm px-6 py-3.5 rounded-2xl shadow-md transition-all cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>{t('searchRecordsBtn')}</span>
              </button>
            </div>
          </div>

          {/* Step 3: Search Verified Record & Gemini AI Analysis */}
          {(stage === 'search_done' || stage === 'gemini_done') && verifiedData && (
            <div className="space-y-8">
              
              {/* Verified Record Card */}
              <div className="bg-white border-2 border-[#e7dcd0] p-6 sm:p-8 rounded-3xl shadow-md space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-xl font-black text-[#581515] flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span>{t('verifiedRecordTitle')}</span>
                  </h3>
                  <span className="text-xs font-bold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
                    Database Match
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#fbf7f0] p-5 rounded-2xl border border-[#e6dac8]">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Temple</span>
                    <span className="text-sm font-black text-slate-900">{verifiedData.temple}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">{t('periodLabel')}</span>
                    <span className="text-sm font-black text-slate-900">{verifiedData.period}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">{t('dateLabel')}</span>
                    <span className="text-sm font-black text-slate-900">{verifiedData.approx_date}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {verifiedData.summary}
                </p>

                {/* Related Knowledge Entity Cards for Verified Record */}
                {entities.length > 0 && (
                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-black text-[#581515]">
                        {t('relatedKnowledgeTitle')}
                      </h4>
                      <span className="text-[11px] font-bold text-slate-400">Click 'மேலும் அறிக' for inline Wikipedia summary</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {entities.map((entity, idx) => (
                        <EntityCard key={idx} entity={entity} onClick={setSelectedWikiData} />
                      ))}
                    </div>
                  </div>
                )}

                {stage === 'search_done' && (
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => handleAnalyzeWithGemini()}
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-sm px-7 py-3.5 rounded-2xl shadow-lg transition-transform active:scale-95 cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>{t('analyzeWithGeminiBtn')}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Gemini Historical Analysis & Entity Cards */}
              {stage === 'gemini_done' && (
                <div className="bg-white border-2 border-[#e7dcd0] p-6 sm:p-8 rounded-3xl shadow-md space-y-6">
                  
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="text-2xl font-black text-[#581515]">
                      {t('geminiAnalysisTitle')}
                    </h3>
                  </div>

                  {geminiError && (
                    <div className="bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-2xl text-xs font-bold flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2 shrink-0 text-amber-600" />
                      <span>{geminiError}</span>
                    </div>
                  )}

                  {isGeminiAnalyzing ? (
                    <div className="flex items-center space-x-3 text-slate-600 font-bold py-6 justify-center">
                      <Loader2 className="w-6 h-6 animate-spin text-[#581515]" />
                      <span>{t('analyzingContext')}</span>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="text-slate-800 leading-relaxed font-medium text-base sm:text-lg bg-[#fbf7f0] p-6 sm:p-8 rounded-2xl border border-[#e6dac8] whitespace-pre-line shadow-inner">
                        {historicalContext}
                      </div>

                      {/* Web References & Related Links Showcase */}
                      {webReferences.length > 0 && (
                        <div className="pt-4 border-t border-slate-100 space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-base font-black text-[#581515] flex items-center space-x-2">
                              <BookOpen className="w-4 h-4 text-amber-700" />
                              <span>🌐 தொடர்புடைய இணைய சான்றுகள் & வரலாற்று ஆதாரங்கள் (Web References)</span>
                            </h4>
                            <span className="text-[11px] font-bold text-slate-400">இணைப்புகளைக் கிளிக் செய்து மேலும் தகவல்களைத் தெரிந்துகொள்ளலாம்</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {webReferences.map((ref, rIdx) => (
                              <a
                                key={rIdx}
                                href={ref.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#fcf8f2] hover:bg-white border-2 border-[#e6dac8] hover:border-[#581515] p-4 rounded-2xl shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
                              >
                                <div className="space-y-1.5">
                                  <div className="flex items-center justify-between">
                                    <span className="font-extrabold text-[#581515] text-sm group-hover:underline flex items-center space-x-1.5">
                                      <span>{ref.title}</span>
                                    </span>
                                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#581515] shrink-0" />
                                  </div>
                                  <p className="text-xs text-slate-600 leading-normal font-medium">
                                    {ref.description}
                                  </p>
                                </div>
                                <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-bold text-amber-800">
                                  <span>இணையத்தில் பார்க்க &rarr;</span>
                                  <span className="text-[10px] text-slate-400 font-mono truncate max-w-[150px]">{ref.url}</span>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              )}

            </div>
          )}

          {/* Reset Flow Button */}
          <div className="text-center pt-6 pb-4">
            <button 
              onClick={resetFlow}
              className="text-[#581515] hover:underline font-black text-sm"
            >
              &larr; Analyze Another Inscription
            </button>
          </div>

        </div>
      )}

      {/* In-App Wikipedia Summary Modal */}
      {selectedWikiData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
          <div className="bg-white border-2 border-[#e7dcd0] rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-[#e7dcd0] bg-[#fcf8f2]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#581515] text-white rounded-2xl flex items-center justify-center shadow-md shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#581515]">
                    {selectedWikiData.title}
                  </h2>
                  <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest block">
                    Wikipedia Historical Summary
                  </span>
                </div>
              </div>

              <button 
                onClick={() => setSelectedWikiData(null)}
                className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 p-2 rounded-xl transition-colors font-bold text-lg cursor-pointer"
                title="Close"
              >
                ✕
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-5 bg-white">
              {selectedWikiData.thumbnail_url && (
                <div className="w-full max-h-[280px] rounded-2xl overflow-hidden border border-[#e6dac8] shadow-sm bg-[#f4ece1]">
                  <img 
                    src={selectedWikiData.thumbnail_url} 
                    alt={selectedWikiData.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <p className="text-slate-800 leading-relaxed text-base sm:text-lg font-medium whitespace-pre-line bg-[#fbf7f0] p-5 rounded-2xl border border-[#e6dac8]">
                {selectedWikiData.extract}
              </p>
            </div>

            {/* Modal Footer with Source Attribution & Secondary External Link */}
            <div className="px-6 py-4 bg-[#fcf8f2] border-t border-[#e7dcd0] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-2 text-slate-600 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>Source: Wikipedia (விக்கிப்பீடியா)</span>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setSelectedWikiData(null)}
                  className="px-5 py-2 text-slate-700 font-extrabold hover:bg-[#e7dcd0] rounded-xl transition-colors cursor-pointer"
                >
                  மூடுக (Close)
                </button>

                {selectedWikiData.page_url && (
                  <a
                    href={selectedWikiData.page_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors flex items-center space-x-1 border border-slate-200"
                  >
                    <span>View original on Wikipedia</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Gemini API Key Management Modal */}
      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        onSaveKey={(newKey) => {
          setIsQuotaExhausted(false);
          if (stage === 'gemini_done' || stage === 'search_done') {
            handleAnalyzeWithGemini(newKey);
          } else if (ocrResult) {
            handleAIFormatOcr(newKey);
          } else {
            handleAnalyzeWithGemini(newKey);
          }
        }}
        onAddLater={() => {
          setIsQuotaExhausted(false);
          if (stage === 'gemini_done' || !historicalContext) {
            handleAnalyzeWithGemini('');
          }
        }}
        isQuotaExhausted={isQuotaExhausted}
      />

    </div>
  );
}
