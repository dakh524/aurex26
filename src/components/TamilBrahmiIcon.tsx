"use client";

import React from 'react';

interface TamilBrahmiIconProps {
  letter?: 'A' | 'KA' | 'TA' | 'MA';
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export default function TamilBrahmiIcon({
  letter = 'A',
  className = '',
  size = 28,
  strokeWidth = 10,
}: TamilBrahmiIconProps) {
  if (letter === 'A') {
    // Tamil-Brahmi "அ" (𑀅) SVG Path
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        {/* Main Vertical Stem */}
        <line x1="50" y1="15" x2="50" y2="85" />
        {/* Upper Left Branch */}
        <line x1="50" y1="35" x2="20" y2="20" />
        {/* Lower Left Branch */}
        <line x1="50" y1="65" x2="20" y2="80" />
      </svg>
    );
  }

  if (letter === 'KA') {
    // Tamil-Brahmi "க" (𑀓) SVG Path (Cross)
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <line x1="50" y1="15" x2="50" y2="85" />
        <line x1="15" y1="50" x2="85" y2="50" />
      </svg>
    );
  }

  if (letter === 'TA') {
    // Tamil-Brahmi "த" (𑀢) SVG Path (Inverted V)
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M 20 85 L 50 15 L 80 85" />
      </svg>
    );
  }

  if (letter === 'MA') {
    // Tamil-Brahmi "ம" (𑀫) SVG Path
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <circle cx="50" cy="65" r="20" />
        <line x1="50" y1="15" x2="50" y2="45" />
        <line x1="30" y1="28" x2="70" y2="28" />
      </svg>
    );
  }

  // Fallback Brahmi Unicode Text
  return (
    <span className={`font-mono text-2xl font-black ${className}`}>
      𑀅
    </span>
  );
}

