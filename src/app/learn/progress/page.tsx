"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import LearnSubHeader from '@/components/LearnSubHeader';
import LearnProgressStats from '@/components/LearnProgressStats';

export default function LearnProgressPage() {
  const router = useRouter();

  return (
    <div className="w-full max-w-[1800px] mx-auto space-y-6 pb-24 px-4 sm:px-6 lg:px-10 xl:px-12">
      <LearnSubHeader />
      <LearnProgressStats onStartQuiz={() => router.push('/learn/quiz')} />
    </div>
  );
}
