"use client";

import React from 'react';
import TamilSpellCheck from '@/components/TamilSpellCheck';

export default function SpellCheckPage() {
  return (
    <div className="w-full max-w-[1800px] mx-auto space-y-8 pb-20 px-4 sm:px-6 lg:px-10 xl:px-12">
      <TamilSpellCheck />
    </div>
  );
}