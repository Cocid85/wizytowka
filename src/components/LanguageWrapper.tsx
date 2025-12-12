'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageWrapper({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();

  useEffect(() => {
    // Aktualizuj atrybut lang w tagu html
    document.documentElement.lang = language;
  }, [language]);

  return <>{children}</>;
}

