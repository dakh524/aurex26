"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Landmark, Search, Bell, User, Home, BookOpen, SpellCheck, MapPin, ShieldCheck, Compass, Eye, ShieldAlert, Award, Key, Gamepad2 } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import ApiKeyModal from '@/components/ApiKeyModal';

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const pathname = usePathname();
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);

  const navItems = [
    { label: t('navHome'), href: '/', icon: Home },
    { label: t('navResearch'), href: '/kalvettu', icon: Landmark },
    { label: lang === 'en' ? 'Games' : 'விளையாட்டு', href: '/games', icon: Gamepad2 },
    { label: t('navLearn'), href: '/learn', icon: BookOpen },
    { label: t('navSpellCheck'), href: '/spellcheck', icon: SpellCheck },
    { label: t('navPlagiarism'), href: '/plagiarism', icon: ShieldCheck },
    { label: t('navHistory'), href: '/history', icon: MapPin },
  ];

  const bottomNavItems = [
    { label: t('navHome'), href: '/', icon: Home },
    { label: t('navResearch'), href: '/kalvettu', icon: Search },
    { label: t('navLearn'), href: '/learn', icon: BookOpen },
    { label: t('navHistory'), href: '/history', icon: Compass },
    { label: lang === 'en' ? 'Admin Login' : 'நிர்வாகம்', href: '/admin', icon: User },
  ];

  return (
    <>
      {/* Official Government Top Line Accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#581515] via-[#C89551] to-[#0D5C3A] flex">
        <div className="w-1/3 bg-[#581515]"></div>
        <div className="w-1/3 bg-[#C89551]"></div>
        <div className="w-1/3 bg-[#0D5C3A]"></div>
      </div>

      {/* Top Official Utility Bar */}
      <div className="bg-[#002B49] text-white text-xs py-2 border-b border-[#001D32]">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 flex flex-wrap justify-between items-center gap-2">
          
          {/* Govt Badge & Dept Title */}
          <div className="flex items-center space-x-2 font-bold tracking-wide">
            <span className="bg-[#C89551] text-amber-950 px-2 py-0.5 rounded text-[10px] font-black uppercase shadow-xs">
              அரசு இணையவாசல்
            </span>
            <span>{t('govtTitle')}</span>
            <span className="opacity-40">|</span>
            <span className="text-amber-300 font-extrabold">{t('deptTitle')}</span>
          </div>

          {/* Accessibility & Language Bar */}
          <div className="flex items-center space-x-4">
            
            {/* Font Size Adjusters */}
            <div className="hidden sm:flex items-center space-x-1 bg-[#001D32] px-2 py-0.5 rounded border border-white/20 text-[11px] font-mono">
              <button 
                onClick={() => setFontSize('sm')} 
                className={`px-1 hover:text-amber-300 ${fontSize === 'sm' ? 'text-amber-400 font-black' : 'text-slate-300'}`}
                title="Decrease Font Size"
              >
                A-
              </button>
              <button 
                onClick={() => setFontSize('base')} 
                className={`px-1 hover:text-amber-300 ${fontSize === 'base' ? 'text-amber-400 font-black' : 'text-slate-300'}`}
                title="Default Font Size"
              >
                A
              </button>
              <button 
                onClick={() => setFontSize('lg')} 
                className={`px-1 hover:text-amber-300 ${fontSize === 'lg' ? 'text-amber-400 font-black' : 'text-slate-300'}`}
                title="Increase Font Size"
              >
                A+
              </button>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center space-x-1.5 font-black text-xs">
              <button 
                onClick={() => setLang('en')} 
                className={`hover:underline cursor-pointer transition-all ${lang === 'en' ? 'bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded font-black shadow-sm' : 'opacity-80 hover:opacity-100 text-white'}`}
              >
                English
              </button>
              <span className="opacity-40">|</span>
              <button 
                onClick={() => setLang('ta')} 
                className={`hover:underline cursor-pointer transition-all ${lang === 'ta' ? 'bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded font-black shadow-sm' : 'opacity-80 hover:opacity-100 text-white'}`}
              >
                தமிழ்
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Official Government Header Banner */}
      <header className="bg-gradient-to-b from-[#FFFDF7] to-[#F7F2E7] border-b-2 border-[#C89551]/60 py-4 shadow-md">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Official Seal Emblem + Portal Branding */}
          <Link href="/" className="flex items-center space-x-4 group text-left">
            {/* Official Tamil Nadu Gopuram Emblem Badge */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#581515] via-[#800000] to-[#420f0f] border-2 border-[#C89551] flex flex-col items-center justify-center text-amber-300 shadow-xl group-hover:scale-105 transition-transform shrink-0 relative overflow-hidden">
              <Landmark className="w-8 h-8 sm:w-10 sm:h-10 text-amber-300 drop-shadow-md" />
              <span className="text-[9px] font-black uppercase text-amber-200 tracking-tighter mt-0.5">
                தமிழ்நாடு
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="bg-[#581515] text-amber-300 text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-widest border border-amber-400/40">
                  அரசு சான்றளிக்கப்பட்டது
                </span>
                <span className="text-[11px] font-bold text-slate-500">
                  Official Portal
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#581515] leading-none tracking-tight mt-1 group-hover:text-[#800000] transition-colors font-serif">
                {lang === 'en' ? 'Tamil World Portal' : 'தமிழ் உலகம் மின்னாளுமை இணையவாசல்'}
              </h1>
              
              <p className="text-xs sm:text-sm font-extrabold text-[#7a2222] tracking-wide mt-1">
                {lang === 'en' 
                  ? 'Central Institute of Classical Tamil (CICT) • Ministry of Education, Govt of India' 
                  : 'செம்மொழித் தமிழாய்வு மத்திய நிறுவனம் (CICT) • கல்வி அமைச்சகம், இந்திய அரசு'}
              </p>
            </div>
          </Link>

          {/* Right Section: Official Badges & Direct Links */}
          <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
            <div className="hidden lg:flex flex-col text-right text-xs font-black text-[#581515] leading-snug border-r-2 border-[#C89551]/40 pr-4">
              <span className="flex items-center justify-end space-x-1 text-emerald-800">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>டிஜிட்டல் தமிழ்நாடு திட்டம்</span>
              </span>
              <span className="text-amber-800 text-[11px]">ISO 27001 மின்னாளுமை தரச்சான்று</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsKeyModalOpen(true)}
                className="inline-flex items-center space-x-1.5 bg-[#f4ece1] hover:bg-[#581515] text-[#581515] hover:text-white border-2 border-[#C89551] px-3.5 py-2 rounded-xl text-xs font-black transition-all shadow-sm cursor-pointer"
                title="Configure Gemini API Key"
              >
                <Key className="w-4 h-4 text-amber-700 hover:text-amber-300" />
                <span className="hidden sm:inline">API Key</span>
              </button>

              <Link 
                href="/kalvettu" 
                className="inline-flex items-center space-x-1.5 bg-white border-2 border-[#581515] text-[#581515] hover:bg-[#581515] hover:text-white px-3.5 py-2 rounded-xl text-xs font-black transition-colors shadow-sm cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">சாசனத் தேடல்</span>
              </Link>
              
              <Link 
                href="/admin" 
                className="inline-flex items-center space-x-1.5 bg-[#581515] hover:bg-[#3f0e0e] text-amber-300 border-2 border-[#C89551] px-4 py-2 rounded-xl text-xs font-black transition-all shadow-md cursor-pointer"
              >
                <User className="w-4 h-4 text-amber-300" />
                <span>உள்நுழைவு (Login)</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Official Navigation Menu Bar - Deep Maroon & Gold Trim */}
        <div className="bg-[#581515] text-white py-2 px-4 shadow-lg border-t-2 border-[#C89551] mt-3">
          <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm font-extrabold overflow-x-auto no-scrollbar">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg transition-all whitespace-nowrap cursor-pointer border ${
                    isActive 
                      ? 'bg-[#C89551] text-slate-950 font-black shadow-md border-amber-300' 
                      : 'border-transparent hover:bg-[#7a2222] text-amber-100 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-300'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      {/* Sticky Bottom Navigation Bar for Mobile Devices */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#F7F2E7] border-t-2 border-[#C89551] shadow-2xl py-2 px-4">
        <div className="flex items-center justify-around">
          {bottomNavItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={idx}
                href={item.href}
                className={`flex flex-col items-center justify-center space-y-1 text-[11px] font-black transition-colors ${
                  isActive ? 'text-[#581515]' : 'text-slate-600 hover:text-[#581515]'
                }`}
              >
                <div className={`p-1.5 rounded-full ${isActive ? 'bg-[#581515] text-amber-300 shadow-md' : ''}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        onSaveKey={(k) => console.log('API Key configured:', k)}
      />
    </>
  );
}


