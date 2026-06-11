"use client";
import { useState, useEffect, useRef } from "react";
import { useLang } from "@/context/LangContext";

/* Modül düzeyinde bellek önbelleği — sayfa yenilenene kadar kalır */
const mem = new Map<string, string[]>();

/**
 * texts  — çevrilecek string dizisi (statik içerik için module-level sabit kullanın)
 * cacheKey — bu içerik grubuna özgü sabit anahtar (örn. "haberler-list")
 * out    — çevrilmiş dizi; dil Türkçe ise ya da hata varsa orijinal döner
 */
export function useTranslate(
  texts: string[],
  cacheKey: string
): { out: string[]; loading: boolean } {
  const { lang } = useLang();
  const [out, setOut] = useState<string[]>(texts);
  const [loading, setLoading] = useState(false);
  const latestTexts = useRef(texts);
  latestTexts.current = texts;

  useEffect(() => {
    if (lang === "tr") {
      setOut(latestTexts.current);
      return;
    }

    const k = `${cacheKey}::${lang}`;

    // 1. Bellek önbelleği
    if (mem.has(k)) {
      setOut(mem.get(k)!);
      return;
    }

    // 2. sessionStorage önbelleği
    try {
      const ss = sessionStorage.getItem(k);
      if (ss) {
        const parsed: string[] = JSON.parse(ss);
        mem.set(k, parsed);
        setOut(parsed);
        return;
      }
    } catch {}

    // 3. API'den çevir
    setLoading(true);
    fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texts: latestTexts.current, targetLang: lang }),
    })
      .then(r => r.json())
      .then(d => {
        if (Array.isArray(d.translations)) {
          mem.set(k, d.translations);
          try {
            sessionStorage.setItem(k, JSON.stringify(d.translations));
          } catch {}
          setOut(d.translations);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [lang, cacheKey]);

  return { out, loading };
}
