"use client";
import { createContext, useContext, useEffect, useState } from "react";

export type MobileView = "zoomed" | "normal";

interface Ctx {
  mobileView: MobileView;
  setMobileView: (v: MobileView) => void;
}

const MobileViewContext = createContext<Ctx>({
  mobileView: "zoomed",
  setMobileView: () => {},
});

export function MobileViewProvider({ children }: { children: React.ReactNode }) {
  const [mobileView, setMobileViewState] = useState<MobileView>("zoomed");

  useEffect(() => {
    const saved = localStorage.getItem("mob-view") as MobileView | null;
    if (saved === "normal" || saved === "zoomed") setMobileViewState(saved);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (mobileView === "normal") {
      html.classList.add("view-compact");
    } else {
      html.classList.remove("view-compact");
    }
    localStorage.setItem("mob-view", mobileView);
  }, [mobileView]);

  return (
    <MobileViewContext.Provider value={{ mobileView, setMobileView: setMobileViewState }}>
      {children}
    </MobileViewContext.Provider>
  );
}

export const useMobileView = () => useContext(MobileViewContext);
