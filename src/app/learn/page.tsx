"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Landmark, BookOpen, Lightbulb, BarChart3, Sparkles, Building2, FileText, Users, GraduationCap, Star, Scroll, ShieldCheck, Compass, Volume2, VolumeX, Play, Pause, Film, Gamepad2, MessageSquare, Keyboard } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import TamilAlphabetLearner from '@/components/TamilAlphabetLearner';
import TamilPronunciationPractice from '@/components/TamilPronunciationPractice';
import TamilScriptEvolution from '@/components/TamilScriptEvolution';
import DailyTamilWisdom from '@/components/DailyTamilWisdom';
import TamilWordEvolutionExplorer from '@/components/TamilWordEvolutionExplorer';
import TamilBrahmiIcon from '@/components/TamilBrahmiIcon';

export default function LearnPage() {
  const { lang, t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="w-full max-w-[1800px] mx-auto space-y-12 pb-28 px-4 sm:px-6 lg:px-10 xl:px-12">
      
      {/* 1. Official Cultural Video Showcase Banner */}
      <section className="relative rounded-[36px] overflow-hidden shadow-2xl border-2 border-[#C89551] min-h-[440px] sm:min-h-[500px] flex flex-col justify-between p-6 sm:p-12 text-white group bg-slate-950 w-full">
        
        {/* HTML5 Video Element with AutoPlay & Loop */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            ref={videoRef}
            src="/hero_tamil_culture.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-1000 opacity-80"
          />
          {/* Gradient Dark Overlay for contrast & readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#581515]/90 via-[#420f0f]/80 to-slate-950/85 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40 z-10" />
        </div>

        {/* Video Banner Top Header Badge & Video Controls */}
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black px-4 py-1.5 rounded-full text-xs uppercase tracking-wider shadow-lg border border-amber-300">
            <Film className="w-4 h-4 text-slate-950 animate-pulse" />
            <span>🎬 தமிழ் பண்பாட்டு ஆவணப் படம் • Celebrating Tamil Culture</span>
          </div>

          {/* Interactive Video Play & Audio Controls */}
          <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-md p-1.5 rounded-2xl border border-white/20">
            <button
              onClick={togglePlay}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-amber-300 text-xs font-black transition-colors cursor-pointer"
              title={isPlaying ? "Pause Video" : "Play Video"}
            >
              {isPlaying ? <Pause className="w-4 h-4 text-amber-300" /> : <Play className="w-4 h-4 text-amber-300 fill-amber-300" />}
              <span>{isPlaying ? 'நிறுத்து' : 'இயக்கு'}</span>
            </button>

            <button
              onClick={toggleMute}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition-colors cursor-pointer shadow-md"
              title={isMuted ? "Unmute Sound" : "Mute Sound"}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-slate-950" /> : <Volume2 className="w-4 h-4 text-slate-950" />}
              <span>{isMuted ? 'ஒலி இயக்கு (Unmute)' : 'ஒலி அடக்கு (Muted)'}</span>
            </button>
          </div>
        </div>

        {/* Banner Content Body */}
        <div className="relative z-20 space-y-6 max-w-5xl my-auto py-6">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.15] font-serif">
            {t('learnHeroTitle1')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 text-3xl sm:text-5xl md:text-6xl font-black block mt-1 drop-shadow-2xl">
              {t('learnHeroTitle2')}
            </span>
          </h1>
          
          <p className="text-amber-100/90 text-sm sm:text-lg leading-relaxed max-w-2xl font-bold drop-shadow-md">
            2,000 ஆண்டுகால தமிழ் நாகரிகம், பழந்தமிழ்ப் பண்பாடு, கலை, மற்றும் வரலாற்றுச் சாசனங்களை விளக்கும் அதிகாரப்பூர்வ ஆவணக் காட்சி.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link 
              href="/learn/letters"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#581515] to-[#7a2222] hover:from-[#7a2222] hover:to-[#581515] text-amber-300 font-black px-8 py-4 rounded-full text-sm sm:text-base transition-all shadow-xl border-2 border-[#C89551] hover:scale-105 cursor-pointer"
            >
              <span>{t('startLearningBtn')}</span>
              <ArrowRight className="w-5 h-5 text-amber-300" />
            </Link>

            <Link 
              href="/games"
              className="inline-flex items-center space-x-2 bg-white/15 hover:bg-white/25 backdrop-blur-md text-amber-300 font-black px-7 py-4 rounded-full text-sm sm:text-base transition-all border-2 border-amber-300/60 shadow-lg hover:scale-105 cursor-pointer"
            >
              <Gamepad2 className="w-5 h-5 text-amber-300" />
              <span>பாரம்பரிய விளையாட்டு</span>
            </Link>
          </div>
        </div>

        {/* Bottom Stats & Certification Bar */}
        <div className="relative z-20 pt-6 border-t-2 border-amber-400/30 flex flex-wrap items-center justify-between gap-4 text-xs font-black text-amber-200">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5 bg-amber-400/20 px-3.5 py-1.5 rounded-full border border-amber-400/30">
              <Landmark className="w-4 h-4 text-amber-300" />
              <span>{t('statsInscriptions')}</span>
            </span>
            <span className="flex items-center space-x-1.5 bg-amber-400/20 px-3.5 py-1.5 rounded-full border border-amber-400/30">
              <Scroll className="w-4 h-4 text-amber-300" />
              <span>{t('statsLiterature')}</span>
            </span>
            <span className="flex items-center space-x-1.5 bg-amber-400/20 px-3.5 py-1.5 rounded-full border border-amber-400/30">
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>{t('statsVerified')}</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-1 text-[11px] font-black text-amber-300 uppercase tracking-widest">
            <span>CENTRAL INSTITUTE OF CLASSICAL TAMIL (CICT) • MINISTRY OF EDUCATION</span>
          </div>
        </div>

      </section>

      {/* 2. Official Government Portal Feature Cards Grid */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          
          {/* Card 1: 247 தமிழ் எழுத்துக்கள் */}
          <Link
            href="/learn/letters"
            className="group bg-[#fbf7f0] border-2 border-[#e6dac8] hover:border-[#581515] rounded-[32px] p-6 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer relative flex flex-col justify-between min-h-[330px] overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#581515] via-[#C89551] to-[#581515]" />

            <div className="space-y-6 pt-2">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#581515] text-amber-300 border-2 border-[#C89551] flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <TamilBrahmiIcon letter="A" size={32} className="text-amber-300" strokeWidth={12} />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#581515] bg-[#f4ece1] border border-[#e6dac8] px-3 py-1 rounded-full">
                    {lang === 'en' ? '247 Letters' : '247 எழுத்துக்கள்'}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-black text-[#581515] font-serif leading-tight group-hover:text-[#800000] transition-colors">
                  {t('card1Title')}
                </h3>
                <span className="text-[11px] font-black text-[#7a2222] tracking-wider uppercase block">
                  {t('card1Sub')}
                </span>
                <p className="text-slate-700 text-xs font-semibold leading-relaxed pt-2">
                  {lang === 'en' 
                    ? '12 Vowels, 18 Consonants, 1 Ayutham, and 216 Combined Letters with audio TTS.' 
                    : '12 உயிரெழுத்துகள், 18 மெய்யெழுத்துகள், 1 ஆய்த எழுத்து, 216 உயிர்மெய் எழுத்துகள் ஒலிப்பயிற்சியுடன்.'}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <span className="w-10 h-10 rounded-full bg-[#581515] text-amber-300 border border-amber-400/40 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform font-black">
                <ArrowRight className="w-5 h-5 text-amber-300" />
              </span>
            </div>
          </Link>

          {/* Card 2: எடுத்துக்காட்டு கல்வெட்டுகள் */}
          <Link
            href="/history"
            className="group bg-[#fbf7f0] border-2 border-[#e6dac8] hover:border-[#581515] rounded-[32px] p-6 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer relative flex flex-col justify-between min-h-[330px] overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#581515] via-[#C89551] to-[#581515]" />

            <div className="space-y-6 pt-2">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#581515] text-amber-300 border-2 border-[#C89551] flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <BookOpen className="w-7 h-7 text-amber-300" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#581515] bg-[#f4ece1] border border-[#e6dac8] px-3 py-1 rounded-full">
                  {lang === 'en' ? '15 Records' : '15 கல்வெட்டுகள்'}
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-black text-[#581515] font-serif leading-tight group-hover:text-[#800000] transition-colors">
                  {t('card2Title')}
                </h3>
                <span className="text-[11px] font-black text-[#7a2222] tracking-wider uppercase block">
                  {t('card2Sub')}
                </span>
                <p className="text-slate-700 text-xs font-semibold leading-relaxed pt-2">
                  {t('card2Desc')}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <span className="w-10 h-10 rounded-full bg-[#581515] text-amber-300 border border-amber-400/40 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform font-black">
                <ArrowRight className="w-5 h-5 text-amber-300" />
              </span>
            </div>
          </Link>

          {/* Card 3: பயிற்சி & வினாடி வினா */}
          <Link
            href="/learn/quiz"
            className="group bg-[#fbf7f0] border-2 border-[#e6dac8] hover:border-[#581515] rounded-[32px] p-6 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer relative flex flex-col justify-between min-h-[330px] overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#581515] via-[#C89551] to-[#581515]" />

            <div className="space-y-6 pt-2">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#581515] text-amber-300 border-2 border-[#C89551] flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <Lightbulb className="w-7 h-7 text-amber-300" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#581515] bg-[#f4ece1] border border-[#e6dac8] px-3 py-1 rounded-full">
                  {lang === 'en' ? '20 Quizzes' : '20 வினாடிகள்'}
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-black text-[#581515] font-serif leading-tight group-hover:text-[#800000] transition-colors">
                  {t('card3Title')}
                </h3>
                <span className="text-[11px] font-black text-[#7a2222] tracking-wider uppercase block">
                  {t('card3Sub')}
                </span>
                <p className="text-slate-700 text-xs font-semibold leading-relaxed pt-2">
                  {t('card3Desc')}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <span className="w-10 h-10 rounded-full bg-[#581515] text-amber-300 border border-amber-400/40 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform font-black">
                <ArrowRight className="w-5 h-5 text-amber-300" />
              </span>
            </div>
          </Link>

          {/* Card 4: முன்னேற்றம் */}
          <Link
            href="/learn/progress"
            className="group bg-[#fbf7f0] border-2 border-[#e6dac8] hover:border-[#581515] rounded-[32px] p-6 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer relative flex flex-col justify-between min-h-[330px] overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#581515] via-[#C89551] to-[#581515]" />

            <div className="space-y-6 pt-2">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#581515] text-amber-300 border-2 border-[#C89551] flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <BarChart3 className="w-7 h-7 text-amber-300" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#581515] bg-[#f4ece1] border border-[#e6dac8] px-3 py-1 rounded-full">
                  {lang === 'en' ? 'Levels' : 'நிலைகள்'}
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-black text-[#581515] font-serif leading-tight group-hover:text-[#800000] transition-colors">
                  {t('card4Title')}
                </h3>
                <span className="text-[11px] font-black text-[#7a2222] tracking-wider uppercase block">
                  {t('card4Sub')}
                </span>
                <p className="text-slate-700 text-xs font-semibold leading-relaxed pt-2">
                  {t('card4Desc')}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <span className="w-10 h-10 rounded-full bg-[#581515] text-amber-300 border border-amber-400/40 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform font-black">
                <ArrowRight className="w-5 h-5 text-amber-300" />
              </span>
            </div>
          </Link>

          {/* Card 5: தமிழ் இலக்கணம் */}
          <Link
            href="/learn/grammar"
            className="group bg-[#fbf7f0] border-2 border-[#e6dac8] hover:border-[#581515] rounded-[32px] p-6 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer relative flex flex-col justify-between min-h-[330px] overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#581515] via-[#C89551] to-[#581515]" />

            <div className="space-y-6 pt-2">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#581515] text-amber-300 border-2 border-[#C89551] flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <GraduationCap className="w-7 h-7 text-amber-300" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#581515] bg-[#f4ece1] border border-[#e6dac8] px-3 py-1 rounded-full">
                  {lang === 'en' ? '5 Lessons' : '5 பாடங்கள்'}
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-black text-[#581515] font-serif leading-tight group-hover:text-[#800000] transition-colors">
                  {lang === 'en' ? 'Tamil Grammar' : 'தமிழ் இலக்கணம்'}
                </h3>
                <span className="text-[11px] font-black text-[#7a2222] tracking-wider uppercase block">
                  Grammar Academy
                </span>
                <p className="text-slate-700 text-xs font-semibold leading-relaxed pt-2">
                  {lang === 'en'
                    ? 'Phonetics, Parts of Speech, Class & Gender, Tenses, and Sentence Structure.'
                    : 'எழுத்து, சொல், திணை-பால், முக்காலம் மற்றும் வாக்கிய அமைப்பு இலக்கண விதிகள்.'}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <span className="w-10 h-10 rounded-full bg-[#581515] text-amber-300 border border-amber-400/40 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform font-black">
                <ArrowRight className="w-5 h-5 text-amber-300" />
              </span>
            </div>
          </Link>

          {/* Card 6: தமிழ்-ஆங்கில உரையாடல்கள் */}
          <Link
            href="/learn/conversation"
            className="group bg-[#fbf7f0] border-2 border-[#e6dac8] hover:border-[#581515] rounded-[32px] p-6 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer relative flex flex-col justify-between min-h-[330px] overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#581515] via-[#C89551] to-[#581515]" />

            <div className="space-y-6 pt-2">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#581515] text-amber-300 border-2 border-[#C89551] flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <MessageSquare className="w-7 h-7 text-amber-300" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#581515] bg-[#f4ece1] border border-[#e6dac8] px-3 py-1 rounded-full">
                  {lang === 'en' ? 'Conversations' : 'உரையாடல்கள்'}
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-black text-[#581515] font-serif leading-tight group-hover:text-[#800000] transition-colors">
                  {lang === 'en' ? 'Simple Conversations' : 'எளிய உரையாடல்கள்'}
                </h3>
                <span className="text-[11px] font-black text-[#7a2222] tracking-wider uppercase block">
                  Tamil Conversations
                </span>
                <p className="text-slate-700 text-xs font-semibold leading-relaxed pt-2">
                  {lang === 'en'
                    ? 'Greetings, Travel, Shopping, Dining, and Daily Phrases with English translations.'
                    : 'அறிமுகம், பயணம், கடை, உணவகம் மற்றும் உதவி கேட்கும் தமிழ்-ஆங்கில உரையாடல்கள்.'}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <span className="w-10 h-10 rounded-full bg-[#581515] text-amber-300 border border-amber-400/40 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform font-black">
                <ArrowRight className="w-5 h-5 text-amber-300" />
              </span>
            </div>
          </Link>

          {/* Card 7: தமிழ் தட்டச்சுப் பயிற்சி */}
          <Link
            href="/learn/typing"
            className="group bg-[#fbf7f0] border-2 border-[#e6dac8] hover:border-[#581515] rounded-[32px] p-6 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer relative flex flex-col justify-between min-h-[330px] overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#581515] via-[#C89551] to-[#581515]" />

            <div className="space-y-6 pt-2">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#581515] text-amber-300 border-2 border-[#C89551] flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <Keyboard className="w-7 h-7 text-amber-300" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#581515] bg-[#f4ece1] border border-[#e6dac8] px-3 py-1 rounded-full">
                  {lang === 'en' ? '5 Levels' : '5 நிலைகள்'}
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-black text-[#581515] font-serif leading-tight group-hover:text-[#800000] transition-colors">
                  {lang === 'en' ? 'Tamil Typing Tutor' : 'தமிழ் தட்டச்சுப் பயிற்சி'}
                </h3>
                <span className="text-[11px] font-black text-[#7a2222] tracking-wider uppercase block">
                  Tamil99 & Anjal
                </span>
                <p className="text-slate-700 text-xs font-semibold leading-relaxed pt-2">
                  {lang === 'en'
                    ? 'Master Tamil99 and Anjal typing easily with live WPM, accuracy, and interactive keyboard.'
                    : 'தமிழ்99 மற்றும் அஞ்சல் தட்டச்சை எளிதாகக் கற்றுக்கொள்ளுங்கள். விரல் பயிற்சி மற்றும் வேக சோதனை.'}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <span className="w-10 h-10 rounded-full bg-[#581515] text-amber-300 border border-amber-400/40 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform font-black">
                <ArrowRight className="w-5 h-5 text-amber-300" />
              </span>
            </div>
          </Link>

        </div>
      </section>

      {/* 3. 🧬 ஒரு சொல்லின் பயணம் (Word Evolution Explorer) */}
      <section className="pt-2">
        <TamilWordEvolutionExplorer />
      </section>

      {/* 4. 📜 தினசரி திருக்குறள் & நற்சிந்தனை (Daily Wisdom) */}
      <section className="pt-2">
        <DailyTamilWisdom />
      </section>

      {/* 5. 🎙️ தமிழ் உச்சரிப்பு பயிற்சி (Pronunciation Practice Feature) */}
      <section className="pt-2">
        <TamilPronunciationPractice />
      </section>

      {/* 6. 🏛️ எழுத்து வளர்ச்சி நிலைகள் (Script Evolution Feature) */}
      <section className="pt-2">
        <TamilScriptEvolution />
      </section>

      {/* 7. 🔤 Embedded Alphabet Sound Learner Preview Section */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 className="text-xl font-black text-[#581515] flex items-center space-x-2">
            <Compass className="w-5 h-5 text-[#581515]" />
            <span>{lang === 'en' ? 'Tamil Alphabet Sound Preview' : 'எழுத்துக்கள் ஒலிப்பயிற்சி (Alphabet Sound Preview)'}</span>
          </h3>
          <Link 
            href="/learn/letters"
            className="text-xs font-extrabold text-[#581515] underline hover:text-[#800000]"
          >
            {lang === 'en' ? 'Go to full page ➔' : 'முழுப் பக்கம் செல் ➔'}
          </Link>
        </div>
        
        <TamilAlphabetLearner />
      </section>

    </div>
  );
}
