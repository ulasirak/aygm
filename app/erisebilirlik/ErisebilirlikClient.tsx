"use client";

import Footer from "@/components/Footer";
import Link from "next/link";
import { FaChevronRight, FaUniversalAccess, FaKeyboard, FaMobile, FaEye } from "react-icons/fa";
import { useLang } from "@/context/LangContext";

const FEATURES = [
  { icon: FaKeyboard, titleKey: "erisebilirlik.f1_title", descKey: "erisebilirlik.f1_desc" },
  { icon: FaEye,      titleKey: "erisebilirlik.f2_title", descKey: "erisebilirlik.f2_desc" },
  { icon: FaMobile,   titleKey: "erisebilirlik.f3_title", descKey: "erisebilirlik.f3_desc" },
  { icon: FaUniversalAccess, titleKey: "erisebilirlik.f4_title", descKey: "erisebilirlik.f4_desc" },
];

export default function ErisebilirlikClient() {
  const { t } = useLang();
  return (
    <>
      <main>
        <div className="relative" style={{ background: "linear-gradient(135deg, var(--teal-deep) 0%, var(--teal) 55%, var(--forest) 100%)", paddingTop: "6rem", paddingBottom: "6rem" }}>
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
                <h2 className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--forest)", marginBottom: "1.25rem" }}>
                  {t("erisebilirlik.commitment_title")}
                </h2>
                <p style={{ color: "var(--gray-600)", fontSize: "0.9rem", lineHeight: 1.85 }}>
                  {t("erisebilirlik.commitment_desc")}
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--forest)", marginBottom: "1.5rem" }}>
                  {t("erisebilirlik.features_title")}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {FEATURES.map((f) => {
                    const Icon = f.icon;
                    return (
                      <div key={f.titleKey} style={{ border: "1px solid var(--gray-100)", borderRadius: "1rem", padding: "1.5rem" }}>
                        <div style={{ width: 44, height: 44, borderRadius: "0.75rem", background: "rgba(29,92,58,0.07)", border: "1px solid rgba(29,92,58,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                          <Icon style={{ color: "var(--forest)", fontSize: 18 }} />
                        </div>
                        <h3 className="font-bold text-sm mb-2" style={{ color: "var(--forest)", fontFamily: "var(--font-heading)" }}>{t(f.titleKey)}</h3>
                        <p style={{ color: "var(--gray-600)", fontSize: "0.85rem", lineHeight: 1.7 }}>{t(f.descKey)}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--forest)", marginBottom: "1.25rem" }}>
                  {t("erisebilirlik.limitations_title")}
                </h2>
                <p style={{ color: "var(--gray-600)", fontSize: "0.9rem", lineHeight: 1.85 }}>
                  {t("erisebilirlik.limitations_desc")}
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--forest)", marginBottom: "1.25rem" }}>
                  {t("erisebilirlik.feedback_title")}
                </h2>
                <p style={{ color: "var(--gray-600)", fontSize: "0.9rem", lineHeight: 1.85, marginBottom: "1.25rem" }}>
                  {t("erisebilirlik.feedback_desc")}
                </p>
                <Link href="/iletisim" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  {t("erisebilirlik.feedback_btn")}
                </Link>
              </div>

              <div style={{ background: "var(--pale)", border: "1px solid var(--gray-100)", borderRadius: "1rem", padding: "1.5rem" }}>
                <h3 className="font-bold text-sm mb-2" style={{ color: "var(--forest)", fontFamily: "var(--font-heading)" }}>
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
