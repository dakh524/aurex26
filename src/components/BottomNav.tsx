"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Lightbulb, User, Leaf } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      label: 'முகப்பு',
      href: '/',
      icon: Home,
    },
    {
      label: 'ஆராய்ச்சி',
      href: '/kalvettu',
      icon: BookOpen,
    },
    // Center floating item (index 2)
    {
      label: 'வரலாறு',
      href: '/history',
      icon: Leaf,
      isCenter: true,
    },
    {
      label: 'கற்றல்',
      href: '/learn',
      icon: Lightbulb,
    },
    {
      label: 'என் பக்கம்',
      href: '/admin',
      icon: User,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-2 pointer-events-none flex justify-center">
      <div className="pointer-events-auto relative bg-[#fcf8f3]/95 backdrop-blur-md border border-[#e6dac8] rounded-3xl shadow-[0_-4px_25px_rgba(88,21,21,0.12)] px-3 py-2 max-w-md w-full flex items-center justify-between">
        
        {/* SVG notch curve overlay for smooth cutout feel */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#fcf8f3]/95 rounded-t-full border-t border-l border-r border-[#e6dac8] -z-10 shadow-sm" />

        {navItems.map((item, idx) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;

          if (item.isCenter) {
            return (
              <div key={idx} className="relative -top-5 flex flex-col items-center justify-center">
                <Link
                  href={item.href}
                  className="w-14 h-14 rounded-full bg-gradient-to-b from-[#6e1a1a] to-[#471010] text-[#fbf7f0] flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all border-2 border-[#fcf8f3] cursor-pointer"
                  title="தமிழ் உலகம்"
                >
                  <Leaf className="w-7 h-7 text-amber-200 fill-amber-200/20" />
                </Link>
              </div>
            );
          }

          return (
            <Link
              key={idx}
              href={item.href}
              className={`flex flex-col items-center justify-center space-y-1 px-3 py-1 rounded-2xl transition-all cursor-pointer ${
                isActive 
                  ? 'text-[#581515] font-black' 
                  : 'text-slate-500 hover:text-[#581515] font-bold'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-[#581515]' : ''}`} />
              <span className="text-[11px] tracking-tight font-extrabold">{item.label}</span>
            </Link>
          );
        })}

      </div>
    </div>
  );
}
