"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Landmark, MapPin, Calendar, ArrowRight, BookOpen, ExternalLink, Loader2, ShieldCheck, Globe, Maximize2, RefreshCw, X } from 'lucide-react';
import inscriptionsData from '@/data/inscriptions.json';

interface Inscription {
  id: string;
  temple: string;
  temple_en: string;
  location: string;
  period?: string;
  approx_date?: string;
  period_dynasty: string;
  summary?: string;
  wikipedia_url?: string;
}

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDynasty, setSelectedDynasty] = useState('All');
  const [selectedWikiData, setSelectedWikiData] = useState<any>(null);
  const [isWikiLoading, setIsWikiLoading] = useState(false);
  const [activeTempleName, setActiveTempleName] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const mapUrl = "https://tamil-historical-map.vercel.app/";
  const dynasties = ['All', 'Chola', 'Pandya', 'Pallava', 'Chera', 'Nayak'];

  // Filter inscriptions based on search and dynasty
  const filteredInscriptions = inscriptionsData.filter((item: Inscription) => {
    const matchesSearch = 
      item.temple.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.temple_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.period_dynasty.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDynasty = 
      selectedDynasty === 'All' || 
      item.period_dynasty.toLowerCase().includes(selectedDynasty.toLowerCase());

    return matchesSearch && matchesDynasty;
  });

  const handleOpenWiki = async (item: Inscription) => {
    setActiveTempleName(item.temple);
    setIsWikiLoading(true);
    setSelectedWikiData(null);

    try {
      const entityName = item.temple;
      const res = await fetch(`/api/wikipedia?entity=${encodeURIComponent(entityName)}`);
      const data = await res.json();
      setSelectedWikiData({
        ...data,
        item
      });
    } catch (err) {
      setSelectedWikiData({
        found: false,
        title: item.temple,
        extract: item.summary || 'வரலாற்றுத் தகவல் சேகரிக்கப்படுகிறது.',
        item
      });
    } finally {
      setIsWikiLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[1800px] mx-auto space-y-10 pb-28 px-4 sm:px-6 lg:px-10 xl:px-12">
      
      {/* 1. Page Title & Hero */}
      <div className="bg-gradient-to-r from-[#581515] via-[#420f0f] to-[#581515] text-white rounded-[32px] p-8 sm:p-12 shadow-xl border-2 border-[#C89551] relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-200 border border-amber-400/30 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">
            <Globe className="w-4 h-4 text-amber-300" />
            <span>நேரலை தமிழ் வரலாற்று வரைபடம் • Live Interactive Map</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#fbf7f0] tracking-tight font-serif leading-tight">
            வரலாறு & வரைபடம் (Historical Map)
          </h1>
          <p className="text-amber-100/90 text-sm sm:text-base font-semibold leading-relaxed">
            தமிழகத்தின் பண்டைய கல்வெட்டுகள், சோழர், பாண்டியர், பல்லவர் காலத் தலங்கள் மற்றும் வரலாற்று இடங்களை வரைபடத்தில் நேரடியாக ஆராயுங்கள்.
          </p>
        </div>
      </div>

      {/* 2. Spacious & Unconstrained Interactive Historical Map */}
      <div className="space-y-4">
        
        {/* Map Header Bar */}
        <div className="bg-[#fbf7f0] border-2 border-[#e6dac8] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-[#581515] text-amber-300 border border-[#C89551] flex items-center justify-center shadow-md shrink-0">
              <MapPin className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#581515] font-serif">
                🗺️ தமிழ் வரலாற்று வரைபடம் (Tamil Historical Map)
              </h2>
              <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-3 py-0.5 rounded-full border border-emerald-200 inline-block mt-0.5">
                🟢 Live Interactive Map (tamil-historical-map.vercel.app)
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0 self-start sm:self-auto">
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#581515] to-[#7a2222] hover:from-[#7a2222] hover:to-[#581515] text-amber-300 font-black text-xs sm:text-sm px-5 py-3 rounded-2xl transition-all shadow-md border border-amber-400/40 cursor-pointer"
            >
              <span>புதிய விண்டோவில் திறக்க (Open Full Map)</span>
              <ExternalLink className="w-4 h-4 text-amber-300" />
            </a>
          </div>
        </div>

        {/* Full Spacious Map Canvas Box */}
        <div className="relative w-full h-[750px] sm:h-[820px] md:h-[880px] rounded-3xl overflow-hidden border-2 border-[#C89551] bg-[#fbf7f0] shadow-2xl">
          {!mapLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#fbf7f0] text-[#581515] z-10 space-y-3">
              <Loader2 className="w-10 h-10 animate-spin text-[#581515]" />
              <p className="text-sm font-black">வரலாற்று வரைபடம் ஏற்றப்படுகிறது...</p>
            </div>
          )}

          <iframe
            src={mapUrl}
            title="Tamil Historical Map"
            onLoad={() => setMapLoaded(true)}
            className="w-full h-full border-0 rounded-3xl"
            allow="geolocation"
          />
        </div>
      </div>

      {/* 3. Controls: Search & Dynasty Filters for Inscriptions Catalog */}
      <div className="bg-white border-2 border-[#e7dcd0] p-6 rounded-3xl shadow-sm space-y-5">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="கோயில் பெயர், ஊர் அல்லது அரசர் பெயரைத் தேடுக... (Search temple, location...)"
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#581515] font-medium text-sm text-slate-800 bg-[#fbf7f0]/50 placeholder-slate-400"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              Clear
            </button>
          )}
        </div>

        {/* Dynasty Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mr-2">
            மரபுவழி (Dynasty):
          </span>
          {dynasties.map((dynasty) => {
            const isSelected = selectedDynasty === dynasty;
            const dynastyLabels: Record<string, string> = {
              'All': 'அனைத்தும் (All)',
              'Chola': 'சோழர் (Chola)',
              'Pandya': 'பாண்டியர் (Pandya)',
              'Pallava': 'பல்லவர் (Pallava)',
              'Chera': 'சேரர் (Chera)',
              'Nayak': 'நாயக்கர் (Nayak)'
            };

            return (
              <button
                key={dynasty}
                onClick={() => setSelectedDynasty(dynasty)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-[#581515] text-white shadow-md scale-105' 
                    : 'bg-[#f4ece1] text-[#581515] hover:bg-[#e7dcd0] border border-[#e6dac8]'
                }`}
              >
                {dynastyLabels[dynasty] || dynasty}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Dataset Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4 px-2">
          <p className="text-xs font-bold text-slate-500">
            மொத்தம் <span className="text-[#581515] font-black">{filteredInscriptions.length}</span> கல்வெட்டுப் பதிவுகள் கண்டறியப்பட்டன
          </p>
        </div>

        {filteredInscriptions.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-[#e7dcd0] rounded-3xl p-12 text-center space-y-3">
            <Landmark className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-black text-slate-700">தேடலுக்கு முடிவுகள் இல்லை</h3>
            <p className="text-xs text-slate-500">வேறு தேடல் சொற்கள் அல்லது வம்சப் பிரிவைத் தேர்ந்தெடுக்கவும்.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInscriptions.map((item: Inscription) => (
              <div 
                key={item.id}
                className="bg-white border-2 border-[#e7dcd0] hover:border-[#c89551] rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  {/* Card Header: Location & ID Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#581515] bg-[#f4ece1] px-2.5 py-1 rounded-md border border-[#e6dac8]">
                      {item.id}
                    </span>
                    <div className="flex items-center space-x-1 text-slate-500 text-xs font-bold">
                      <MapPin className="w-3.5 h-3.5 text-[#581515]" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  {/* Temple Name */}
                  <div>
                    <h3 className="text-xl font-black text-[#581515] leading-tight group-hover:text-[#800000] transition-colors">
                      {item.temple}
                    </h3>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5">
                      {item.temple_en}
                    </p>
                  </div>

                  {/* Dynasty & Date Badge */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="inline-flex items-center space-x-1 text-[11px] font-extrabold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                      <Landmark className="w-3 h-3 text-amber-700" />
                      <span>{item.period_dynasty}</span>
                    </span>
                    {item.approx_date && (
                      <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        <span>{item.approx_date}</span>
                      </span>
                    )}
                  </div>

                  {/* Summary */}
                  {item.summary && (
                    <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-3 pt-1 border-t border-slate-100">
                      {item.summary}
                    </p>
                  )}
                </div>

                {/* Actions Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleOpenWiki(item)}
                    className="text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl transition-colors flex items-center space-x-1 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-slate-600" />
                    <span>விவரங்கள்</span>
                  </button>

                  <Link
                    href={`/inscription/${item.id}`}
                    className="text-xs font-black text-white bg-[#581515] hover:bg-[#3f0e0e] px-4 py-2 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center space-x-1.5 cursor-pointer group-hover:scale-[1.02]"
                  >
                    <span>விவரங்களைக் காண்க</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Wikipedia Summary Modal */}
      {(selectedWikiData || isWikiLoading) && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-[#e7dcd0] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5 relative animate-in fade-in zoom-in duration-200">
            
            <button 
              onClick={() => { setSelectedWikiData(null); setIsWikiLoading(false); }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {isWikiLoading ? (
              <div className="py-12 text-center space-y-3">
                <Loader2 className="w-8 h-8 animate-spin text-[#581515] mx-auto" />
                <p className="text-sm font-black text-[#581515]">
                  விக்கிபீடியாத் தரவு சேகரிக்கப்படுகிறது...
                </p>
                <p className="text-xs text-slate-500 font-semibold">{activeTempleName}</p>
              </div>
            ) : selectedWikiData && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-xs font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full w-fit">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>விக்கிபீடியா சரிபார்க்கப்பட்ட தளம்</span>
                </div>

                <div className="flex items-start space-x-4 pt-1">
                  {selectedWikiData.thumbnail_url && (
                    <img 
                      src={selectedWikiData.thumbnail_url} 
                      alt={selectedWikiData.title}
                      className="w-20 h-20 object-cover rounded-2xl shadow-md border border-slate-200 shrink-0"
                    />
                  )}
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-[#581515]">
                      {selectedWikiData.item?.temple || selectedWikiData.title}
                    </h3>
                    <p className="text-xs font-bold text-slate-500">
                      📍 {selectedWikiData.item?.location} | 👑 {selectedWikiData.item?.period_dynasty}
                    </p>
                  </div>
                </div>

                <div className="bg-[#fbf7f0] border border-[#e6dac8] rounded-2xl p-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium max-h-60 overflow-y-auto">
                  {selectedWikiData.extract || selectedWikiData.item?.summary}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  {selectedWikiData.item?.wikipedia_url ? (
                    <a 
                      href={selectedWikiData.item.wikipedia_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-slate-600 hover:text-[#581515] flex items-center space-x-1"
                    >
                      <span>Wikipedia Page</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : <div />}

                  <Link
                    href={`/kalvettu?id=${selectedWikiData.item?.id}`}
                    onClick={() => setSelectedWikiData(null)}
                    className="text-xs font-black text-white bg-[#581515] hover:bg-[#3f0e0e] px-4 py-2 rounded-xl transition-all shadow-md flex items-center space-x-1.5"
                  >
                    <span>ஆராய்ச்சித் தளத்திற்குச் செல்</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
