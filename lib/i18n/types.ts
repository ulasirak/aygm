export type Lang = "tr" | "en" | "de" | "ru" | "es" | "fr" | "zh" | "ar";
export const RTL_LANGS: Lang[] = ["ar"];
export const LANG_NAMES: Record<Lang, string> = {
  tr: "Türkçe",
  ar: "العربية",
  en: "English",
  de: "Deutsch",
  ru: "Русский",
  es: "Español",
  fr: "Français",
  zh: "中文",
};
export type Dict = Record<string, string>;
