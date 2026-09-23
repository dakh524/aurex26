import React from 'react';
import { Metadata } from 'next';
import LearnSubHeader from '@/components/LearnSubHeader';
import TamilTypingTutor from '@/components/TamilTypingTutor';

export const metadata: Metadata = {
  title: 'தமிழ் தட்டச்சுப் பயிற்சி (Tamil Typewriting Tutor) | CICT - மத்திய கல்வி அமைச்சகம்',
  description: 'தமிழ்99 மற்றும் அஞ்சல் தட்டச்சை எளிதாகக் கற்றுக்கொள்ளுங்கள். 5 நிலைகள் கொண்ட விரல் பயிற்சி மற்றும் வேக சோதனை.',
};

export default function TypingPage() {
  return (
    <div className="min-h-screen bg-[#fcf8f2] text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <LearnSubHeader />
        <TamilTypingTutor />
      </div>
    </div>
  );
}
