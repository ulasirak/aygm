import type { Lang, Dict } from "./types";
import { tr } from "./tr";

// Only Turkish is bundled eagerly — other languages are loaded on demand
export const defaultDict: Dict = tr;

export async function loadLang(lang: Lang): Promise<Dict> {
  switch (lang) {
    case "en": return (await import("./en")).en;
    case "de": return (await import("./de")).de;
    case "ru": return (await import("./ru")).ru;
    case "es": return (await import("./es")).es;
    case "fr": return (await import("./fr")).fr;
    case "zh": return (await import("./zh")).zh;
    case "ar": return (await import("./ar")).ar;
    default:   return tr;
  }
}

export type { Lang, Dict };
export { RTL_LANGS, LANG_NAMES } from "./types";
