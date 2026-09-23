"use client";

import React, { useState } from 'react';
import { Play, BookOpen, ExternalLink, Video, FileText, Globe, Sparkles, Download, Layers } from 'lucide-react';
import languageData from '@/data/languageResources.json';

interface VideoResource {
  id: string;
  title: string;
  channel: string;
  youtube_id: string | null;
  playlist_url: string | null;
  language: string;
}

interface BookResource {
  id: string;
  title: string;
  author: string;
  language: string;
  link: string;
}

export default function LanguageLearningHub() {
  const [activeCategoryId, setActiveCategoryId] = useState('english');

  const activeCategory = languageData.categories.find(c => c.id === activeCategoryId) || languageData.categories[0];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Title & Introduction Banner */}
      <div className="bg-gradient-to-r from-[#581515] via-[#420f0f] to-[#581515] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-amber-900/40 relative overflow-hidden">
        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-200 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold">
            <Globe className="w-3.5 h-3.5 text-amber-300" />
            <span>பன்மொழி வழி தமிழ் கற்றல் தளம்</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#fbf7f0] tracking-tight">
            காணொளிகள் & பாடநூல்கள் (Language Learning Hub)
          </h2>
          <p className="text-slate-200 text-xs sm:text-sm font-medium leading-relaxed">
            ஆங்கிலம், ஹிந்தி, தெலுங்கு, மலையாளம் மற்றும் கன்னட மொழிகள் வழியே தமிழ் கற்க முன்னணி யூடியூப் வகுப்புகளும் வரலாற்றுப் பாடநூல்களும்.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white border-2 border-[#e7dcd0] p-4 rounded-3xl shadow-sm">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {languageData.categories.map((cat) => {
            const isSelected = activeCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryId(cat.id)}
                className={`flex items-center space-x-2 px-5 py-3 rounded-2xl text-xs font-extrabold transition-all cursor-pointer shrink-0 ${
                  isSelected 
                    ? 'bg-[#581515] text-white shadow-md scale-105' 
                    : 'bg-[#f4ece1] text-[#581515] hover:bg-[#e7dcd0] border border-[#e6dac8]'
                }`}
              >
                <span className="text-base">{cat.flag}</span>
                <span>{cat.label_ta} ({cat.label})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Category Display Header */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{activeCategory.flag}</span>
          <div>
            <h3 className="text-xl font-black text-[#581515]">
              {activeCategory.label_ta} — {activeCategory.label}
            </h3>
            <p className="text-xs text-slate-500 font-bold">
              {activeCategory.videos.length} காணொளிப் பாடங்கள் & {activeCategory.books.length} இலக்கணப் புத்தகங்கள்
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 1: Video Lessons & Playlists */}
      {activeCategory.videos.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
            <Video className="w-5 h-5 text-[#581515]" />
            <h4 className="text-lg font-black text-[#581515]">
              1. காணொளிப் பாடங்கள் (Video Courses & Lessons)
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeCategory.videos.map((vid: VideoResource) => (
              <div 
                key={vid.id}
                className="bg-white border-2 border-[#e7dcd0] hover:border-[#c89551] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
              >
                {/* Embed Video or Playlist Banner */}
                {vid.youtube_id ? (
                  <div className="relative aspect-video w-full bg-black">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${vid.youtube_id}`}
                      title={vid.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>
                ) : (
                  <div className="bg-gradient-to-r from-[#3f0e0e] to-[#581515] text-white p-6 aspect-video flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-amber-300 bg-amber-400/20 px-2.5 py-1 rounded-full border border-amber-400/30">
                        Full Course Playlist
                      </span>
                      <Play className="w-6 h-6 text-amber-300" />
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-extrabold text-base text-[#fbf7f0] leading-snug line-clamp-2">
                        {vid.title}
                      </h4>
                      <p className="text-xs text-slate-300 font-medium">
                        சேனல்: {vid.channel}
                      </p>
                    </div>

                    {vid.playlist_url && (
                      <a
                        href={vid.playlist_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 bg-amber-400 hover:bg-amber-300 text-[#581515] px-4 py-2 rounded-xl text-xs font-black transition-colors w-fit shadow-md"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>▶ பிளேலிஸ்ட் காண்க (Open Playlist)</span>
                      </a>
                    )}
                  </div>
                )}

                {/* Video Info Card Footer */}
                <div className="p-4 space-y-2 bg-[#fcf8f3]">
                  <h4 className="font-extrabold text-slate-900 text-sm leading-snug truncate">
                    {vid.title}
                  </h4>
                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                    <span>📺 {vid.channel}</span>
                    <span className="text-[#581515] font-bold">{vid.language}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: Paired Related Books & PDF Manuals */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-[#581515]" />
            <h4 className="text-lg font-black text-[#581515]">
              2. தொடர்புடைய பாடநூல்கள் & அகராதிகள் (Related Books & PDFs)
            </h4>
          </div>
          <span className="text-xs font-bold text-slate-500">
            {activeCategory.books.length} நூல்கள் கிடைக்கின்றன
          </span>
        </div>

        {activeCategory.books.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-[#e7dcd0] rounded-3xl p-8 text-center text-slate-500 text-xs font-bold">
            இந்தப் பிரிவில் புதிய நூல்கள் பதிவேற்றம் செய்யப்படுகின்றன.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {activeCategory.books.map((book: BookResource) => (
              <div 
                key={book.id}
                className="bg-white border-2 border-[#e7dcd0] hover:border-[#c89551] rounded-3xl p-5 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-[#581515] bg-[#f4ece1] px-2.5 py-0.5 rounded border border-[#e6dac8]">
                      {book.language}
                    </span>
                    <FileText className="w-4 h-4 text-amber-700" />
                  </div>

                  <h5 className="font-extrabold text-[#581515] text-sm leading-snug group-hover:text-[#800000] transition-colors line-clamp-2">
                    {book.title}
                  </h5>

                  <p className="text-xs text-slate-500 font-bold">
                    ஆசிரியர்: <span className="text-slate-700">{book.author}</span>
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <a
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-1.5 bg-[#f4ece1] hover:bg-[#581515] text-[#581515] hover:text-white px-4 py-2.5 rounded-xl font-extrabold text-xs transition-colors w-full border border-[#e6dac8] shadow-xs"
                  >
                    <span>📚 வாசிக்க / Read PDF</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
