"use client";
import { createContext, useContext, useEffect, useState } from "react";

export type ColorBlindMode = "none" | "deuteranopia" | "protanopia" | "tritanopia" | "achromato";

const CB_MODES: ColorBlindMode[] = ["none", "deuteranopia", "protanopia", "tritanopia", "achromato"];

interface Ctx {
  cbMode: ColorBlindMode;
  setCbMode: (m: ColorBlindMode) => void;
}

const ColorBlindContext = createContext<Ctx>({ cbMode: "none", setCbMode: () => {} });

export function ColorBlindProvider({ children }: { children: React.ReactNode }) {
  const [cbMode, setCbModeState] = useState<ColorBlindMode>("none");

  useEffect(() => {
    const saved = localStorage.getItem("cb-mode") as ColorBlindMode | null;
    if (saved && CB_MODES.includes(saved)) setCbModeState(saved);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    CB_MODES.filter(m => m !== "none").forEach(m => html.classList.remove(`cb-${m}`));
    if (cbMode !== "none") html.classList.add(`cb-${cbMode}`);
    localStorage.setItem("cb-mode", cbMode);
  }, [cbMode]);

  return (
    <ColorBlindContext.Provider value={{ cbMode, setCbMode: setCbModeState }}>
      {children}
    </ColorBlindContext.Provider>
  );
}

export const useColorBlind = () => useContext(ColorBlindContext);
