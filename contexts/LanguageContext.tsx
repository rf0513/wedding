import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { Lang } from '../types';
import { UI, UIKey } from '../data/copy';

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: UIKey) => string;
}

const LanguageContext = createContext<Ctx | undefined>(undefined);

const read = (): Lang => {
  try {
    const saved = localStorage.getItem('pr27-lang');
    if (saved === 'en' || saved === 'es') return saved;
    if (navigator.language?.toLowerCase().startsWith('es')) return 'es';
  } catch { /* ignore */ }
  return 'en';
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(read);
  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem('pr27-lang', l); } catch { /* ignore */ }
  };
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const t = (key: UIKey) => UI[lang][key] ?? UI.en[key] ?? key;
  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): Ctx => {
  const c = useContext(LanguageContext);
  if (!c) throw new Error('useLanguage must be used within a LanguageProvider');
  return c;
};
