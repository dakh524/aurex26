"use client";

import React from 'react';
import LearnSubHeader from '@/components/LearnSubHeader';
import LanguageLearningHub from '@/components/LanguageLearningHub';

export default function LearnResourcesPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-24 px-2 sm:px-4">
      <LearnSubHeader />
      <LanguageLearningHub />
    </div>
  );
}
