"use client";
import { FaLeaf, FaWind, FaBolt, FaCar, FaSeedling, FaCity } from "react-icons/fa";
import { useLang } from "@/context/LangContext";

export default function EnvironmentSection() {
  const { t } = useLang();

  const impacts = [
    { icon: FaCar,      value: "%35",      labelKey: "env.i1_label", descKey: "env.i1_desc", color: "#00B8AE" },
    { icon: FaWind,     value: "15.000 ton", labelKey: "env.i2_label", descKey: "env.i2_desc", color: "#00B8AE" },
    { icon: FaBolt,     value: "100%",     labelKey: "env.i3_label", descKey: "env.i3_desc", color: "var(--gold-light)" },
    { icon: FaSeedling, value: "1.200+",   labelKey: "env.i4_label", descKey: "env.i4_desc", color: "#52B788" },
    { icon: FaCity,     value: "134 km",   labelKey: "env.i5_label", descKey: "env.i5_desc", color: "#00B8AE" },
    { icon: FaLeaf,     value: "2027",     labelKey: "env.i6_label", descKey: "env.i6_desc", color: "#52B788" },
  ];

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1D5C3A 0%, #065C58 45%, #007A75 70%, #00B8AE 100%)" }}>
      <div aria-hidden className="absolute inset-x-0 top-0 pointer-events-none" style={{ height: 80, background: "linear-gradient(to bottom, rgba(255,255,255,0.14), transparent)", zIndex: 12 }} />
      <div aria-hidden className="absolute inset-x-0 bottom-0 pointer-events-none" style={{ height: 80, background: "linear-gradient(to top, rgba(0,158,152,0.24), transparent)", zIndex: 12 }} />

      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-15" style={{ background: "radial-gradient(circle, #00B8AE 0%, transparent 70%)", transform: "translate(20%, -20%)" }} />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-10" style={{ background: "radial-gradient(circle, var(--green-light) 0%, transparent 70%)", transform: "translate(-20%, 20%)" }} />
        <div style={{ position: "absolute", top: "45%", left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,184,174,0.2), transparent)" }} />
      </div>

      <div className="container-aygm relative z-10">
        <div className="text-center" style={{ marginTop: "1rem", marginBottom: "2rem" }}>
          <div className="flex flex-col items-center gap-3 md:flex-row md:justify-center md:gap-4">
            <svg className="hidden md:block" width="38" height="38" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, opacity: 0.9 }}>
              <ellipse cx="32" cy="20" rx="7" ry="11" fill="rgba(0,184,174,0.55)" transform="rotate(0 32 32)"/>
              <ellipse cx="32" cy="20" rx="7" ry="11" fill="rgba(82,183,136,0.45)" transform="rotate(60 32 32)"/>
              <ellipse cx="32" cy="20" rx="7" ry="11" fill="rgba(0,184,174,0.45)" transform="rotate(120 32 32)"/>
              <ellipse cx="32" cy="20" rx="7" ry="11" fill="rgba(82,183,136,0.55)" transform="rotate(180 32 32)"/>
              <ellipse cx="32" cy="20" rx="7" ry="11" fill="rgba(0,184,174,0.45)" transform="rotate(240 32 32)"/>
              <ellipse cx="32" cy="20" rx="7" ry="11" fill="rgba(82,183,136,0.45)" transform="rotate(300 32 32)"/>
              <circle cx="32" cy="32" r="6" fill="#00B8AE"/>
              <line x1="32" y1="44" x2="32" y2="60" stroke="rgba(0,184,174,0.7)" strokeWidth="2.5" strokeLinecap="round"/>
              <ellipse cx="25" cy="54" rx="6" ry="3.5" fill="rgba(82,183,136,0.4)" transform="rotate(-30 25 54)"/>
            </svg>
            <h2 className="text-2xl md:text-4xl font-black text-white text-center" style={{ fontFamily: "var(--font-heading)" }}>
              {t("env.heading")}{" "}
              <span style={{ color: "#00B8AE" }}>{t("env.heading_hl")}</span>
              {t("env.heading_suffix") ? ` ${t("env.heading_suffix")}` : ""}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
          {impacts.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.labelKey} className="rounded-xl p-4 md:p-8 lg:p-10 group hover:scale-105 transition-transform cursor-default" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}>
                <Icon className="mb-6" style={{ color: item.color, fontSize: 22 }} />
                <div className="text-3xl md:text-4xl font-black mb-3" style={{ fontFamily: "var(--font-heading)", color: "white" }}>{item.value}</div>
                <div className="font-semibold text-base mb-3" style={{ color: item.color }}>{t(item.labelKey)}</div>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{t(item.descKey)}</p>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 mb-4" style={{ marginTop: "2rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,184,174,0.2)", backdropFilter: "blur(8px)" }}>
          <div className="env-divider flex-shrink-0">
            <div className="font-black" style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(3rem, 6vw, 5rem)", lineHeight: 1, background: "linear-gradient(135deg, #00B8AE, #5EEBE5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              2053
            </div>
            <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "0.4rem" }}>
              {t("env.year_label")}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#00B8AE", marginBottom: "0.5rem" }}>{t("env.net_zero")}</div>
            <div className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-heading)", marginBottom: "1.25rem" }}>{t("env.commitment_title")}</div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", maxWidth: "42rem" }}>{t("env.commitment_desc")}</p>
          </div>
        </div>

        <div className="rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8" style={{ marginTop: "1rem", background: "rgba(0,184,174,0.1)", border: "1px solid rgba(0,184,174,0.25)" }}>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-heading)", marginBottom: "1.25rem" }}>{t("env.green_title")}</h3>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{t("env.green_desc")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
