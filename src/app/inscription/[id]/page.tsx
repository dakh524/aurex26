"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Landmark, MapPin, Calendar, BookOpen, ExternalLink, ShieldCheck, Camera, Sparkles, CheckCircle2, History, Building2 } from 'lucide-react';
import inscriptionsData from '@/data/inscriptions.json';

export default function InscriptionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [wikiData, setWikiData] = useState<any>(null);
  const [loadingWiki, setLoadingWiki] = useState(true);

  const inscription = inscriptionsData.find((item: any) => item.id === id);

  useEffect(() => {
    if (!inscription) return;

    let isMounted = true;
    async function loadWiki() {
      setLoadingWiki(true);
      try {
        const queryName = inscription?.temple_en || inscription?.temple || '';
        if (!queryName) return;
        const res = await fetch(`/api/wikipedia?entity=${encodeURIComponent(queryName)}`);
        const data = await res.json();
        if (isMounted) {
          setWikiData(data);
          setLoadingWiki(false);
        }
      } catch (err) {
        if (isMounted) {
          setWikiData({ found: false });
          setLoadingWiki(false);
        }
      }
    }

    loadWiki();
    return () => { isMounted = false; };
  }, [inscription]);

  if (!inscription) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center space-y-6">
        <div className="w-16 h-16 bg-rose-100 text-rose-700 rounded-full flex items-center justify-center mx-auto">
          <Landmark className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-black text-[#581515]">கல்வெட்டு விபரம் கண்டறியப்படவில்லை</h1>
        <p className="text-slate-500 font-medium">கோரப்பட்ட கல்வெட்டு அடையாள எண் ({id}) அமைப்பில் இல்லை.</p>
        <Link 
          href="/history"
          className="inline-flex items-center space-x-2 bg-[#581515] text-white px-6 py-3 rounded-2xl font-bold hover:bg-[#3f0e0e] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← பின்செல்</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1800px] mx-auto space-y-8 pb-20 px-4 sm:px-6 lg:px-10 xl:px-12">
      
      {/* Navigation Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center space-x-2 bg-white border border-[#e7dcd0] hover:bg-[#f6eee3] text-[#581515] font-extrabold text-sm px-5 py-2.5 rounded-full transition-all shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← பின்செல்</span>
        </button>

        <span className="text-xs font-black uppercase text-[#581515] bg-[#f4ece1] px-3.5 py-1.5 rounded-full border border-[#e6dac8]">
          {inscription.id}
        </span>
      </div>

      {/* Main Header Banner Card */}
      <div className="bg-gradient-to-r from-[#581515] via-[#420f0f] to-[#581515] text-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-amber-900/40 relative overflow-hidden space-y-4">
        
        {/* Decorative Badge */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center space-x-1.5 bg-amber-400/20 text-amber-200 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-extrabold">
            <Building2 className="w-3.5 h-3.5 text-amber-300" />
            <span>{inscription.period_dynasty}</span>
          </span>

          {inscription.approx_date && (
            <span className="inline-flex items-center space-x-1.5 bg-white/10 text-slate-200 px-3 py-1 rounded-full text-xs font-bold">
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
              <span>{inscription.approx_date}</span>
            </span>
          )}
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#fbf7f0] tracking-tight leading-tight">
            {inscription.temple}
          </h1>
          {inscription.temple_en && (
            <p className="text-amber-200/90 text-lg font-serif font-bold italic">
              {inscription.temple_en}
            </p>
          )}
        </div>

        {/* Location Info */}
        <div className="flex items-center space-x-2 text-slate-200 font-bold text-sm pt-2">
          <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{inscription.location}, தமிழ்நாடு</span>
        </div>
      </div>

      {/* Content Section: Detailed Summary & Historical Records */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Historical Summary */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white border-2 border-[#e7dcd0] rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="text-xl font-black text-[#581515] flex items-center space-x-2 border-b border-slate-100 pb-3">
              <History className="w-5 h-5 text-[#581515]" />
              <span>வரலாற்று அறிமுகம் & சிறப்புகள்</span>
            </h3>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium bg-[#fbf7f0] p-5 rounded-2xl border border-[#e6dac8]">
              {inscription.summary || 'இந்தக் கோயில் மற்றும் கல்வெட்டு பற்றிய தகவல்கள் தொல்லியல் பதிவேடுகளில் பாதுகாத்து வைக்கப்பட்டுள்ளன.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">அமைவிடம்</span>
                <p className="text-sm font-bold text-slate-800">{inscription.location}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">காலம் / வம்சம்</span>
                <p className="text-sm font-bold text-amber-900">{inscription.period_dynasty}</p>
              </div>
            </div>
          </div>

          {/* OCR / Scan Inscription Link Section */}
          <div className="bg-gradient-to-r from-[#f9f3ea] to-[#f6eee3] border border-[#e7dcd0] rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-extrabold text-[#581515] text-base">
                இந்தக் கோயிலின் கல்வெட்டை ஸ்கேன் செய்ய வேண்டுமா?
              </h4>
              <p className="text-xs text-slate-600 font-medium">
                உங்கள் படத்தைப் பதிவேற்றி OCR & AI பகுப்பாய்வு மூலம் படிக்கலாம்.
              </p>
            </div>

            <Link
              href={`/kalvettu?id=${inscription.id}`}
              className="inline-flex items-center space-x-2 bg-[#581515] hover:bg-[#3f0e0e] text-white px-6 py-3 rounded-2xl font-black text-xs transition-all shadow-md shrink-0"
            >
              <Camera className="w-4 h-4 text-amber-300" />
              <span>கல்வெட்டு பகுப்பாய்வு ➔</span>
            </Link>
          </div>

        </div>

        {/* Right Column: Wikipedia Summary Card */}
        <div className="space-y-6">
          <div className="bg-white border-2 border-[#e7dcd0] rounded-3xl p-6 shadow-sm space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-[#581515] text-base flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-[#581515]" />
                <span>விக்கிபீடியாத் தரவு</span>
              </h3>
              <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Verified
              </span>
            </div>

            {loadingWiki ? (
              <div className="py-8 text-center space-y-3 animate-pulse">
                <div className="w-12 h-12 bg-slate-200 rounded-2xl mx-auto"></div>
                <div className="h-3 bg-slate-200 rounded w-3/4 mx-auto"></div>
                <div className="h-3 bg-slate-100 rounded w-full"></div>
              </div>
            ) : wikiData?.found ? (
              <div className="space-y-4">
                {wikiData.thumbnail_url && (
                  <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm max-h-48">
                    <img 
                      src={wikiData.thumbnail_url} 
                      alt={wikiData.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <h4 className="font-extrabold text-slate-900 text-sm">
                  {wikiData.title}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-6 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  {wikiData.extract}
                </p>

                <div className="pt-2">
                  <a
                    href={inscription.wikipedia_url || wikiData.page_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs font-extrabold text-[#581515] hover:text-[#800000] bg-[#f4ece1] hover:bg-[#e7dcd0] px-4 py-2 rounded-xl transition-colors border border-[#e6dac8] w-full justify-center"
                  >
                    <span>Wikipedia-வில் மேலும் வாசிக்க</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center space-y-2">
                <p className="text-xs text-slate-500 font-medium">
                  {inscription.temple} விக்கிபீடியாத் தகவல் நேரடியாகக் கிடைத்தது.
                </p>
                {inscription.wikipedia_url && (
                  <a
                    href={inscription.wikipedia_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-xs font-bold text-[#581515] underline"
                  >
                    <span>Wikipedia கட்டுரையைப் பார்</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
