import { NextRequest, NextResponse } from "next/server";

/* MyMemory ücretsiz API — anahtar gerekmez, 500 istek/gün (e-posta ile 10.000) */
const LANG: Record<string, string> = {
  en: "en", de: "de", ru: "ru", es: "es", fr: "fr", zh: "zh-CN", ar: "ar",
};

/* Sunucu belleğinde çeviri önbelleği — instance süresi boyunca kalır */
const cache = new Map<string, string>();

function splitText(text: string, limit = 480): string[] {
  if (text.length <= limit) return [text];
  const chunks: string[] = [];
  let s = text;
  while (s.length > limit) {
    const cut = [". ", "! ", "? ", "; ", ", ", " "]
      .map(d => s.lastIndexOf(d, limit))
      .filter(i => i > limit / 4)
      .sort((a, b) => b - a)[0];
    const end = cut !== undefined ? cut + 1 : limit;
    chunks.push(s.slice(0, end).trim());
    s = s.slice(end).trim();
  }
  if (s) chunks.push(s);
  return chunks;
}

async function translateOne(text: string, target: string): Promise<string> {
  if (!text?.trim()) return text;
  const key = `${target}\x00${text}`;
  if (cache.has(key)) return cache.get(key)!;

  const mmTarget = LANG[target] ?? target;
  const email = process.env.MYMEMORY_EMAIL ?? "";
  const chunks = splitText(text);

  const translated = (
    await Promise.all(
      chunks.map(async (chunk) => {
        const ck = `${target}\x00${chunk}`;
        if (cache.has(ck)) return cache.get(ck)!;
        const qs = new URLSearchParams({ q: chunk, langpair: `tr|${mmTarget}` });
        if (email) qs.set("de", email);
        try {
          const res = await fetch(
            `https://api.mymemory.translated.net/get?${qs}`,
            { signal: AbortSignal.timeout(6000) }
          );
          const json = await res.json();
          const t = (json.responseData?.translatedText as string) || chunk;
          cache.set(ck, t);
          return t;
        } catch {
          return chunk;
        }
      })
    )
  ).join(" ");

  cache.set(key, translated);
  return translated;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { texts, targetLang } = body as { texts: string[]; targetLang: string };
    if (!Array.isArray(texts) || !targetLang || targetLang === "tr") {
      return NextResponse.json({ translations: texts ?? [] });
    }
    const translations = await Promise.all(texts.map(t => translateOne(t, targetLang)));
    return NextResponse.json({ translations });
  } catch {
    return NextResponse.json({ translations: [] }, { status: 500 });
  }
}
