"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Landmark, 
  ShieldCheck, 
  ExternalLink, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  Building2, 
  FileText, 
  Globe, 
  CheckCircle2, 
  Lock, 
  Users, 
  HelpCircle, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function Footer() {
  const { lang, t } = useLanguage();
  const [visitorCount, setVisitorCount] = useState<number>(1482903);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    // Simulated increment for official visitor counter feel
    const timer = setInterval(() => {
      setVisitorCount((prev) => prev + Math.floor(Math.random() * 2) + 1);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="bg-[#581515] text-[#fbf7f0] border-t-4 border-[#C89551] mt-20 relative overflow-hidden shadow-2xl">
      
      {/* 1. Official Government Top Line Accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#581515] via-[#C89551] to-[#0D5C3A] flex">
        <div className="w-1/3 bg-[#581515]"></div>
        <div className="w-1/3 bg-[#C89551]"></div>
        <div className="w-1/3 bg-[#0D5C3A]"></div>
      </div>

      {/* 2. Top Official Department Banner */}
      <div className="bg-[#420f0f] border-b border-[#C89551]/40 py-6 px-4">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          
          <div className="flex items-center space-x-4">
            {/* Official Tamil Nadu Gopuram Emblem Badge */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#581515] to-[#800000] border-2 border-[#C89551] flex flex-col items-center justify-center text-amber-300 shadow-xl shrink-0">
              <Landmark className="w-7 h-7 text-amber-300" />
              <span className="text-[8px] font-black uppercase text-amber-200 tracking-tighter">
                தமிழ்நாடு
              </span>
            </div>

            <div>
              <div className="inline-flex items-center space-x-1.5 bg-amber-400/20 text-amber-300 px-2.5 py-0.5 rounded text-[10px] font-black uppercase border border-amber-400/30">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>அரசு அதிகாரப்பூர்வ இணையவாசல்</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-amber-300 font-serif tracking-tight mt-1">
                {lang === 'en' ? 'Central Institute of Classical Tamil (CICT)' : 'செம்மொழித் தமிழாய்வு மத்திய நிறுவனம் (CICT)'}
              </h3>
              <p className="text-xs font-bold text-amber-100/80">
                {lang === 'en' ? 'Ministry of Education • Government of India' : 'கல்வி அமைச்சகம் • இந்திய அரசு'}
              </p>
            </div>
          </div>

          {/* Certifications & Helpline Badges */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 text-xs font-black">
            <div className="bg-[#581515] text-amber-300 border border-[#C89551]/60 px-3 py-1.5 rounded-xl flex items-center space-x-1.5 shadow-sm">
              <Award className="w-4 h-4 text-amber-400" />
              <span>ISO 27001 மின்னாளுமை சான்று</span>
            </div>

            <div className="bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-3 py-1.5 rounded-xl flex items-center space-x-1.5 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>TNeGA பாதுகாக்கப்பட்ட தளம்</span>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Main Footer Content Columns Grid */}
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-amber-400/30">
          
          {/* Col 1: About Portal & Mission */}
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase text-amber-300 tracking-wider flex items-center space-x-2 border-b border-amber-400/30 pb-2">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>{lang === 'en' ? 'About Portal' : 'இணையவாசல் பற்றி'}</span>
            </h4>
            
            <p className="text-xs text-amber-100/85 leading-relaxed font-semibold">
              {lang === 'en'
                ? 'Official Tamil World Portal dedicated to classical Tamil research, ancient stone inscriptions, Sangam literature, script evolution, and language preservation under the Central Institute of Classical Tamil (CICT), Ministry of Education, Govt of India.'
                : 'தமிழ் மொழி, செம்மொழித் தமிழாய்வு, கல்வெட்டு சாசனங்கள், வட்டெழுத்து, சங்க இலக்கியங்கள் மற்றும் பண்பாட்டு ஆய்வுகளை டிஜிட்டல் முறையில் ஆவணப்படுத்தும் செம்மொழித் தமிழாய்வு மத்திய நிறுவனம் (CICT), கல்வி அமைச்சகம், இந்திய அரசு தளம்.'}
            </p>

            <div className="pt-1 space-y-2 text-xs font-bold text-amber-200">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% சான்றளிக்கப்பட்ட கல்வெட்டுப் பதிவுகள்</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>தொல்லியல் துறை ஆய்வாளர்களின் தரவுகள்</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links & Services */}
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase text-amber-300 tracking-wider flex items-center space-x-2 border-b border-amber-400/30 pb-2">
              <Globe className="w-4 h-4 text-amber-400" />
              <span>{lang === 'en' ? 'Services & Tools' : 'மின்னாளுமை சேவைகள்'}</span>
            </h4>

            <ul className="space-y-2 text-xs font-bold text-amber-100/90">
              <li>
                <Link href="/kalvettu" className="hover:text-amber-300 hover:underline flex items-center space-x-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>சாசனத் தேடல் & OCR பகுப்பாய்வு</span>
                </Link>
              </li>
              <li>
                <Link href="/games" className="hover:text-amber-300 hover:underline flex items-center space-x-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>தமிழ் பாரம்பரிய விளையாட்டு உலகம்</span>
                </Link>
              </li>
              <li>
                <Link href="/learn" className="hover:text-amber-300 hover:underline flex items-center space-x-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>கல்வெட்டுப் பயிற்சி & தமிழ் பாடங்கள்</span>
                </Link>
              </li>
              <li>
                <Link href="/spellcheck" className="hover:text-amber-300 hover:underline flex items-center space-x-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>தமிழ் பிழை திருத்தி (Spelling Checker)</span>
                </Link>
              </li>
              <li>
                <Link href="/plagiarism" className="hover:text-amber-300 hover:underline flex items-center space-x-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>கட்டுரை நகல் பரிசோதனை (Plagiarism)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Government Policies & Accessibility */}
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase text-amber-300 tracking-wider flex items-center space-x-2 border-b border-amber-400/30 pb-2">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>{lang === 'en' ? 'Policies & Links' : 'அரசு கொள்கைகள் & தகவல்'}</span>
            </h4>

            <ul className="space-y-2 text-xs font-bold text-amber-100/90">
              <li>
                <a href="https://www.tn.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 hover:underline flex items-center space-x-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>தமிழ்நாடு அரசு இணையதளம் (tn.gov.in)</span>
                  <ExternalLink className="w-3 h-3 text-amber-400/60 ml-0.5" />
                </a>
              </li>
              <li>
                <a href="https://asi.nic.in" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 hover:underline flex items-center space-x-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>இந்தியத் தொல்லியல் துறை (ASI)</span>
                  <ExternalLink className="w-3 h-3 text-amber-400/60 ml-0.5" />
                </a>
              </li>
              <li>
                <a href="https://www.tamildigitallibrary.in" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 hover:underline flex items-center space-x-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>தமிழ் இணையக் கல்விக்கழகம்</span>
                  <ExternalLink className="w-3 h-3 text-amber-400/60 ml-0.5" />
                </a>
              </li>
              <li>
                <Link href="/admin" className="hover:text-amber-300 hover:underline flex items-center space-x-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>நிர்வாகி உள்நுழைவு (Admin Login)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Address & Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase text-amber-300 tracking-wider flex items-center space-x-2 border-b border-amber-400/30 pb-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{lang === 'en' ? 'Contact Office' : 'தொடர்பு முகவரி'}</span>
            </h4>

            <div className="space-y-3 text-xs font-semibold text-amber-100/85">
              <div className="inline-flex items-center space-x-1.5 bg-amber-400/20 text-amber-300 px-2.5 py-0.5 rounded text-[10px] font-black uppercase border border-amber-400/30">
                <span>{lang === 'en' ? 'Ministry of Education • Govt of India' : 'கல்வி அமைச்சகம் • இந்திய அரசு'}</span>
              </div>

              <p className="text-xs font-black text-amber-300">
                {lang === 'en' ? 'Central Institute of Classical Tamil (CICT)' : 'செம்மொழித் தமிழாய்வு மத்திய நிறுவனம் (CICT)'}
              </p>

              <p className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  {lang === 'en' 
                    ? 'Chemmozhi Salai, Perumbakkam, Chennai - 600100, Tamil Nadu, India.'
                    : 'செம்மொழி சாலை, பெரும்பாக்கம், சென்னை - 600100, தமிழ்நாடு, இந்தியா.'}
                </span>
              </p>
              
              <p className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{lang === 'en' ? 'Phone: 044-22540126 / 044-22540127' : 'தொடர்பு: 044-22540126 / 044-22540127'}</span>
              </p>

              <p className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{lang === 'en' ? 'Email: director@cict.in / cictcennai@gmail.com' : 'மின்னஞ்சல்: director@cict.in / cictcennai@gmail.com'}</span>
              </p>
            </div>
          </div>

        </div>

        {/* 4. Official Government Footer Bar: Visitor Counter + NIC / TNeGA Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-extrabold text-amber-200/80">
          
          {/* Left: CICT / Govt Copyright Notice */}
          <div className="space-y-1 text-center md:text-left">
            <p>
              © 2026 {lang === 'en' ? 'Central Institute of Classical Tamil (CICT), Ministry of Education, Govt of India. All Rights Reserved.' : 'செம்மொழித் தமிழாய்வு மத்திய நிறுவனம் (CICT), கல்வி அமைச்சகம், இந்திய அரசு. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.'}
            </p>
            <p className="text-[11px] text-amber-300/70 font-mono">
              {lang === 'en' ? 'Designed & Maintained by Central Institute of Classical Tamil (CICT).' : 'இத்தளம் செம்மொழித் தமிழாய்வு மத்திய நிறுவனத்தால் (CICT) வடிவமைக்கப்பட்டு பராமரிக்கப்படுகிறது.'}
            </p>
          </div>

          {/* Right: Visitor Counter & Security Badge */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="bg-[#420f0f] border border-[#C89551]/50 px-3 py-1.5 rounded-xl flex items-center space-x-2 text-[11px] font-mono shadow-inner">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'en' ? 'Visitors: ' : 'பார்வையாளர்கள்: '}<strong className="text-amber-300 font-black" suppressHydrationWarning>{mounted ? visitorCount.toLocaleString('en-US') : '1,482,903'}</strong></span>
            </div>

            <div className="bg-[#420f0f] border border-[#C89551]/50 px-3 py-1.5 rounded-xl flex items-center space-x-2 text-[11px] font-mono shadow-inner">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'en' ? 'Security Cert: ' : 'பாதுகாப்பு சான்றிதழ்: '}<strong className="text-emerald-300 font-black">SSL 256-bit</strong></span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Tricolor Sub-bar */}
      <div className="bg-[#001D32] py-2 px-4 border-t border-[#002B49] text-center text-[11px] font-extrabold text-slate-300">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 flex flex-wrap justify-between items-center gap-2">
          <span>{lang === 'en' ? 'Central Institute of Classical Tamil (CICT) • Ministry of Education, Govt of India' : 'செம்மொழித் தமிழாய்வு மத்திய நிறுவனம் (CICT) • கல்வி அமைச்சகம், இந்திய அரசு'}</span>
          <span className="text-amber-400 font-mono">{lang === 'en' ? 'Last Updated: 24 September 2026' : 'கடைசியாக புதுப்பிக்கப்பட்டது: 24 செப்டம்பர் 2026'}</span>
        </div>
      </div>

    </footer>
  );
}
