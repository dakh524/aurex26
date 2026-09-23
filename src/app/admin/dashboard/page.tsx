"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Settings, Key, CheckCircle, LogOut } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function AdminDashboardPage() {
  const { t } = useLanguage();
  const router = useRouter();

  const [geminiKey, setGeminiKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    // Basic protection
    const isAdmin = sessionStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      router.push('/admin');
      return;
    }

    // Load existing key
    const savedKey = localStorage.getItem('geminiApiKey');
    if (savedKey) {
      setGeminiKey(savedKey);
    }
  }, [router]);

  const handleSave = () => {
    localStorage.setItem('geminiApiKey', geminiKey);
    setIsSaved(true);
    setIsRemoved(false);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleRemove = () => {
    localStorage.removeItem('geminiApiKey');
    setGeminiKey('');
    setIsRemoved(true);
    setIsSaved(false);
    setTimeout(() => setIsRemoved(false), 3000);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isAdmin');
    router.push('/admin');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      <div className="flex justify-between items-center border-b-[4px] border-[#800000] pb-4">
        <div className="flex items-center space-x-3">
          <Settings className="w-8 h-8 text-[#003366]" />
          <h1 className="text-2xl font-black text-[#003366]">{t('adminDashboardTitle')}</h1>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center text-sm font-bold text-gray-500 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-4 h-4 mr-1" />
          {t('logoutBtn')}
        </button>
      </div>

      <div className="stone-card rounded-lg overflow-hidden border border-gray-200 shadow-sm">
        <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
          <h2 className="font-bold text-[#800000] flex items-center">
            <Key className="w-5 h-5 mr-2" />
            {t('apiSettingsTitle')}
          </h2>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {t('geminiKeyLabel')}
            </label>
            <input 
              type="password" 
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full max-w-xl p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#003366] font-mono text-sm"
            />
            <p className="text-xs text-gray-500 mt-2">
              {t('geminiKeyHelp')}
            </p>
          </div>

          <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
            <button 
              onClick={handleSave}
              className="bg-[#003366] hover:bg-[#002244] text-white font-bold py-2 px-6 rounded transition-colors"
            >
              {t('saveBtn')}
            </button>
            <button 
              onClick={handleRemove}
              className="bg-red-50 hover:bg-red-100 text-red-700 font-bold py-2 px-6 rounded transition-colors border border-red-200"
            >
              {t('removeKeyBtn')}
            </button>
            
            {isSaved && (
              <span className="text-green-600 text-sm font-bold flex items-center animate-pulse">
                <CheckCircle className="w-4 h-4 mr-1" />
                {t('settingsSaved')}
              </span>
            )}

            {isRemoved && (
              <span className="text-gray-500 text-sm font-bold flex items-center animate-pulse">
                <CheckCircle className="w-4 h-4 mr-1" />
                {t('keyRemoved')}
              </span>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
