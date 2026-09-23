"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft, Volume2, BookOpen, Sparkles, Award, GraduationCap, MessageSquare, Keyboard } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function LearnSubHeader() {
  const { lang, t } = useLanguage();
  const pathname = usePathname();

  const tabs = [
    { 
      label: lang === 'en' ? '247 Letters' : '247 எழுத்துக்கள்', 
      href: '/learn/letters', 
      icon: Volume2 
    },
    { 
      label: lang === 'en' ? 'Tamil Grammar' : 'தமிழ் இலக்கணம்', 
      href: '/learn/grammar', 
      icon: GraduationCap 
    },
    { 
      label: lang === 'en' ? 'Conversations' : 'உரையாடல்கள்', 
      href: '/learn/conversation', 
      icon: MessageSquare 
    },
    { 
      label: lang === 'en' ? 'Typing Tutor' : 'தட்டச்சுப் பயிற்சி', 
      href: '/learn/typing', 
      icon: Keyboard 
    },
    { 
      label: lang === 'en' ? 'Videos & Books' : 'வீடியோ & புத்தகங்கள்', 
      href: '/learn/resources', 
      icon: BookOpen 
    },
    { 
      label: lang === 'en' ? 'Quiz & Practice' : 'வினாடி வினா', 
      href: '/learn/quiz', 
      icon: Sparkles 
    },
    { 
      label: lang === 'en' ? 'Learning Progress' : 'முன்னேற்றம்', 
      href: '/learn/progress', 
      icon: Award 
    },
  ];

  return (
    <div className="space-y-4 pb-2">
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/learn"
          className="inline-flex items-center space-x-2 bg-white border border-[#e7dcd0] hover:bg-[#f6eee3] text-[#581515] font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>
            {lang === 'en' ? 'Back to Tamil Learning Center' : 'தமிழ் கற்றல் மையத்திற்குச் செல்'}
          </span>
        </Link>
      </div>

      {/* Top Navigation Tabs */}
      <div className="bg-white border-2 border-[#e7dcd0] p-2 rounded-3xl shadow-sm overflow-x-auto">
        <div className="flex items-center space-x-2 min-w-max">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            const Icon = tab.icon;

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex items-center space-x-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#581515] text-white shadow-md scale-105'
                    : 'text-slate-600 hover:bg-[#f4ece1] hover:text-[#581515]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-[#581515]'}`} />
                <span>{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
