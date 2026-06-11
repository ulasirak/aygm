"use client";
import { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import { defaultDict, loadLang, RTL_LANGS, LANG_NAMES } from "@/lib/i18n";
import type { Lang, Dict } from "@/lib/i18n";

const STORAGE_KEY = "aygm_lang";

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  langNames: typeof LANG_NAMES;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("tr");
  const [dicts, setDicts] = useState<Partial<Record<Lang, Dict>>>({ tr: defaultDict });

  // Read stored preference and lazy-load its dict
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (!stored || !(stored in LANG_NAMES)) return;
    if (stored === "tr") { setLangState("tr"); return; }
    loadLang(stored).then(dict => {
      setDicts(prev => ({ ...prev, [stored]: dict }));
      setLangState(stored);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = RTL_LANGS.includes(lang) ? "rtl" : "ltr";
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (!dicts[l]) {
      loadLang(l).then(dict => setDicts(prev => ({ ...prev, [l]: dict })));
    }
  }, [dicts]);

  const value = useMemo<LangContextValue>(() => ({
    lang,
    setLang,
    t: (key: string) => dicts[lang]?.[key] ?? dicts["tr"]?.[key] ?? key,
    langNames: LANG_NAMES,
  }), [lang, setLang, dicts]);

  return (
    <LangContext.Provider value={value}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}
