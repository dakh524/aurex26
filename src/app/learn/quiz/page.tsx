"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import LearnSubHeader from '@/components/LearnSubHeader';
import LetterSoundQuiz from '@/components/LetterSoundQuiz';

export default function LearnQuizPage() {
  const router = useRouter();

  return (
    <div className="w-full max-w-[1800px] mx-auto space-y-6 pb-24 px-4 sm:px-6 lg:px-10 xl:px-12">
      <LearnSubHeader />
      <LetterSoundQuiz onFinish={() => router.push('/learn/progress')} />
    </div>
  );
}
