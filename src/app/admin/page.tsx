"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function AdminLoginPage() {
  const { t } = useLanguage();
  const router = useRouter();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAdmin = sessionStorage.getItem('isAdmin');
      if (isAdmin === 'true') {
        router.push('/admin/dashboard');
      }
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Hardcoded credentials for hackathon as requested
    if (username === 'aurex' && password === 'aurexwinner') {
      sessionStorage.setItem('isAdmin', 'true');
      router.push('/admin/dashboard');
    } else {
      setError(t('invalidCreds'));
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="stone-card w-full max-w-md p-8 border-t-[4px] border-[#800000] shadow-lg rounded-lg">
        
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center border border-red-100 mb-3">
            <Shield className="w-8 h-8 text-[#800000]" />
          </div>
          <h1 className="text-2xl font-black text-[#003366]">{t('adminLogin')}</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded text-sm flex items-start">
              <AlertTriangle className="w-4 h-4 mr-2 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">{t('usernameLabel')}</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#003366]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">{t('passwordLabel')}</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#003366]"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#003366] hover:bg-[#002244] text-white font-bold py-3 px-4 rounded flex items-center justify-center transition-colors mt-6"
          >
            <Lock className="w-4 h-4 mr-2" />
            {t('loginBtn')}
          </button>
        </form>
        
      </div>
    </div>
  );
}
