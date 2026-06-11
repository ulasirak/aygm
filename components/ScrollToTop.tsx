"use client";

import { useState, useEffect } from "react";
import { FaChevronUp } from "react-icons/fa";
import { useLang } from "@/context/LangContext";

export default function ScrollToTop() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={t("common.scroll_top")}
      style={{
        position: "fixed",
        bottom: "1.75rem",
        right: "1.75rem",
        zIndex: 40,
        width: 40,
        height: 40,
        borderRadius: "50%",
        background: "rgba(0,184,174,0.15)",
        border: "1px solid rgba(0,184,174,0.4)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
        pointerEvents: visible ? "auto" : "none",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,184,174,0.28)";
        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,184,174,0.7)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,184,174,0.15)";
        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,184,174,0.4)";
      }}
    >
      <FaChevronUp style={{ color: "#00B8AE", fontSize: 13 }} />
    </button>
  );
}
