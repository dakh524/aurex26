"use client";

import React from 'react';
import LearnSubHeader from '@/components/LearnSubHeader';
import TamilConversationLearner from '@/components/TamilConversationLearner';

export default function LearnConversationPage() {
  return (
    <div className="w-full max-w-[1800px] mx-auto space-y-8 pb-28 px-4 sm:px-6 lg:px-10 xl:px-12">
      <LearnSubHeader />
      <TamilConversationLearner />
    </div>
  );
}
