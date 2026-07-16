"use client";

import Footer from "@/components/Footer";
import Link from "next/link";
import { FaChevronRight, FaUniversalAccess, FaKeyboard, FaMobile, FaEye, FaTextHeight } from "react-icons/fa";
import { useLang } from "@/context/LangContext";
import { useMobileView } from "@/context/MobileViewContext";
import { useColorBlind, type ColorBlindMode } from "@/context/ColorBlindContext";

const FEATURES = [
  { icon: FaKeyboard, titleKey: "erisebilirlik.f1_title", descKey: "erisebilirlik.f1_desc" },
  { icon: FaEye,      titleKey: "erisebilirlik.f2_title", descKey: "erisebilirlik.f2_desc" },
  { icon: FaMobile,   titleKey: "erisebilirlik.f3_title", descKey: "erisebilirlik.f3_desc" },
  { icon: FaUniversalAccess, titleKey: "erisebilirlik.f4_title", descKey: "erisebilirlik.f4_desc" },
];

export default function ErisebilirlikClient() {
  const { t } = useLang();
  const { mobileView, setMobileView } = useMobileView();
  const { cbMode, setCbMode } = useColorBlind();

  const CB_OPTIONS: { mode: ColorBlindMode; swatches: string[] }[] = [
    { mode: "none",         swatches: ["#0B7C77","#C9A84C","#0A6B66","#E74C3C"] },
    { mode: "deuteranopia", swatches: ["#686600","#C9A84C","#4A5200","#BB7200"] },
    { mode: "protanopia",   swatches: ["#606600","#C9A84C","#3D5200","#BB7200"] },
    { mode: "tritanopia",   swatches: ["#0B7C77","#008899","#0A6B66","#005566"] },
    { mode: "achromato",    swatches: ["#757575","#B0B0B0","#3D3D3D","#8A8A8A"] },
  ];
  return (
    <>
      <main>
        <div className="relative" style={{ background: "linear-gradient(135deg, var(--teal-deep) 0%, var(--teal) 55%, var(--teal-dark) 100%)", paddingTop: "6rem", paddingBottom: "6rem" }}>
          <div className="container-aygm relative z-10">
            <div className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.5)", marginBottom: "2.5rem" }}>
              <Link href="/" className="hover:text-white transition-colors">{t("common.home")}</Link>
              <FaChevronRight style={{ fontSize: 8 }} />
              <span style={{ color: "var(--gold)" }}>{t("erisebilirlik.heading")}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white" style={{ fontFamily: "var(--font-heading)", marginBottom: "1.5rem" }}>
              {t("erisebilirlik.heading")}
            </h1>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>
              T.C. Ulaştırma ve Altyapı Bakanlığı — Altyapı Yatırımları Genel Müdürlüğü &bull; {t("erisebilirlik.subtitle")}
            </p>
          </div>
        </div>

        <div className="section-padding" style={{ background: "white" }}>
          <div className="container-aygm" style={{ maxWidth: "860px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>

              <div>
                <h2 className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--teal-dark)", marginBottom: "1.25rem" }}>
                  {t("erisebilirlik.commitment_title")}
                </h2>
                <p style={{ color: "var(--gray-600)", fontSize: "0.9rem", lineHeight: 1.85 }}>
                  {t("erisebilirlik.commitment_desc")}
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--teal-dark)", marginBottom: "1.5rem" }}>
                  {t("erisebilirlik.features_title")}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {FEATURES.map((f) => {
                    const Icon = f.icon;
                    return (
                      <div key={f.titleKey} style={{ border: "1px solid var(--gray-100)", borderRadius: "1rem", padding: "1.5rem" }}>
                        <div style={{ width: 44, height: 44, borderRadius: "0.75rem", background: "rgba(10,107,102,0.07)", border: "1px solid rgba(10,107,102,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                          <Icon style={{ color: "var(--teal-dark)", fontSize: 18 }} />
                        </div>
                        <h3 className="font-bold text-sm mb-2" style={{ color: "var(--teal-dark)", fontFamily: "var(--font-heading)" }}>{t(f.titleKey)}</h3>
                        <p style={{ color: "var(--gray-600)", fontSize: "0.85rem", lineHeight: 1.7 }}>{t(f.descKey)}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--teal-dark)", marginBottom: "1.25rem" }}>
                  {t("erisebilirlik.limitations_title")}
                </h2>
                <p style={{ color: "var(--gray-600)", fontSize: "0.9rem", lineHeight: 1.85 }}>
                  {t("erisebilirlik.limitations_desc")}
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--teal-dark)", marginBottom: "1.25rem" }}>
                  {t("erisebilirlik.feedback_title")}
                </h2>
                <p style={{ color: "var(--gray-600)", fontSize: "0.9rem", lineHeight: 1.85, marginBottom: "1.25rem" }}>
                  {t("erisebilirlik.feedback_desc")}
                </p>
                <Link href="/iletisim" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  {t("erisebilirlik.feedback_btn")}
                </Link>
              </div>

              {/* ── Renk Körlüğü ── */}
              <div id="renk-korlugu" style={{ border: "1px solid var(--gray-100)", borderRadius: "1rem", overflow: "hidden" }}>
                <div style={{ background: "var(--teal-dark)", padding: "1rem 1.5rem", display: "flex", alignItems: "center", gap: "0.625rem" }}>
                  <FaEye style={{ color: "var(--gold)", fontSize: 14 }} />
                  <h2 className="font-bold text-sm" style={{ color: "white", fontFamily: "var(--font-heading)", letterSpacing: "0.02em" }}>
                    {t("colorblind.title")}
                  </h2>
                </div>
                <div style={{ padding: "1.25rem 1.5rem" }}>
                  <p style={{ color: "var(--gray-600)", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                    {t("colorblind.desc")}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {CB_OPTIONS.map(({ mode, swatches }) => (
                      <button
                        key={mode}
                        onClick={() => setCbMode(mode)}
                        style={{
                          display: "flex", alignItems: "center", gap: "0.875rem",
                          padding: "0.75rem 1rem", borderRadius: "0.75rem", cursor: "pointer", textAlign: "left",
                          border: cbMode === mode ? "2px solid var(--teal)" : "1px solid var(--gray-100)",
                          background: cbMode === mode ? "rgba(111,221,214,0.06)" : "var(--gray-50)",
                          transition: "all 0.18s",
                        }}
                      >
                        <div style={{ display: "flex", gap: 3, flexShrink: 0 }}>
                          {swatches.map((c, i) => (
                            <div key={i} style={{ width: 14, height: 14, borderRadius: "50%", background: c }} />
                          ))}
                        </div>
                        <div style={{ flex: 1 }}>
                          <span style={{ fontWeight: cbMode === mode ? 700 : 500, fontSize: "0.875rem", color: cbMode === mode ? "var(--teal)" : "var(--teal-dark)", fontFamily: "var(--font-heading)" }}>
                            {t(`colorblind.${mode}`)}
                          </span>
                          <span style={{ marginLeft: "0.5rem", fontSize: "0.75rem", color: "var(--gray-400)" }}>
                            {t(`colorblind.${mode}_desc`)}
                          </span>
                        </div>
                        {cbMode === mode && <span style={{ fontSize: "0.7rem", color: "var(--teal)", flexShrink: 0 }}>✓</span>}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Görsel Boyut (yalnızca mobil) ── */}
              <div id="gorsel-boyut" className="md:hidden" style={{ border: "1px solid var(--gray-100)", borderRadius: "1rem", overflow: "hidden" }}>
                <div style={{ background: "var(--teal-dark)", padding: "1rem 1.5rem", display: "flex", alignItems: "center", gap: "0.625rem" }}>
                  <FaTextHeight style={{ color: "var(--gold)", fontSize: 14 }} />
                  <h2 className="font-bold text-sm" style={{ color: "white", fontFamily: "var(--font-heading)", letterSpacing: "0.02em" }}>
                    {t("mobile_view.title")}
                  </h2>
                </div>
                <div style={{ padding: "1.25rem 1.5rem" }}>
                  <p style={{ color: "var(--gray-600)", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                    {t("mobile_view.only_mobile")}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {(["zoomed", "normal"] as const).map((v) => (
                      <button
                        key={v}
                        onClick={() => setMobileView(v)}
                        style={{
                          padding: "1rem", borderRadius: "0.875rem", cursor: "pointer", textAlign: "left",
                          border: mobileView === v ? "2px solid var(--teal)" : "1px solid var(--gray-100)",
                          background: mobileView === v ? "rgba(111,221,214,0.06)" : "var(--gray-50)",
                          transition: "all 0.18s",
                        }}
                      >
                        <div style={{ fontWeight: 700, fontSize: "0.875rem", color: mobileView === v ? "var(--teal)" : "var(--teal-dark)", fontFamily: "var(--font-heading)", marginBottom: "0.25rem" }}>
                          {t(`mobile_view.${v}`)}
                          {mobileView === v && <span style={{ marginLeft: "0.375rem", fontSize: "0.65rem", color: "var(--teal)" }}>✓</span>}
                        </div>
                        <div style={{ fontSize: "0.78rem", color: "var(--gray-500)", lineHeight: 1.5 }}>
                          {t(`mobile_view.${v}_hint`)}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ background: "var(--pale)", border: "1px solid var(--gray-100)", borderRadius: "1rem", padding: "1.5rem" }}>
                <h3 className="font-bold text-sm mb-2" style={{ color: "var(--teal-dark)", fontFamily: "var(--font-heading)" }}>
                  {t("erisebilirlik.legal_title")}
                </h3>
                <p style={{ color: "var(--gray-600)", fontSize: "0.825rem", lineHeight: 1.75 }}>
                  {t("erisebilirlik.legal_desc")}
                </p>
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
