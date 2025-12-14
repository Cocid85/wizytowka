'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'pl' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('pl');
  const [translations, setTranslations] = useState<any>(null);

  useEffect(() => {
    // Load language from localStorage or default to 'pl'
    const savedLanguage = (localStorage.getItem('language') as Language) || 'pl';
    setLanguageState(savedLanguage);
    loadTranslations(savedLanguage);
  }, []);

  const loadTranslations = async (lang: Language) => {
    try {
      const translations = await import(`@/lib/translations/${lang}.json`);
      setTranslations(translations.default);
    } catch (error) {
      console.error('Failed to load translations:', error);
      // Fallback to Polish if loading fails
      if (lang !== 'pl') {
        const plTranslations = await import(`@/lib/translations/pl.json`);
        setTranslations(plTranslations.default);
      }
    }
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    loadTranslations(lang);
  };

  const t = (key: string): any => {
    if (!translations) return key;
    
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return value !== undefined ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

