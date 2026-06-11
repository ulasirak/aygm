"use client";

import Footer from "@/components/Footer";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { useMemo } from "react";
import { useLang } from "@/context/LangContext";

export default function CerezClient() {
  const { t } = useLang();

  const cookieTypes = useMemo(() => [
    { name: t("cerez.type1_name"), desc: t("cerez.type1_desc"), examples: t("cerez.type1_examples"), duration: t("cerez.type1_duration"), canDisable: false },
    { name: t("cerez.type2_name"), desc: t("cerez.type2_desc"), examples: t("cerez.type2_examples"), duration: t("cerez.type2_duration"), canDisable: true },
    { name: t("cerez.type3_name"), desc: t("cerez.type3_desc"), examples: t("cerez.type3_examples"), duration: t("cerez.type3_duration"), canDisable: true },
  ], [t]);
  return (
    <>
      <main>
        <div className="relative" style={{ background: "linear-gradient(135deg, var(--teal-deep) 0%, var(--teal) 55%, var(--forest) 100%)", paddingTop: "6rem", paddingBottom: "6rem" }}>
          <div className="container-aygm relative z-10">
            <div className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.5)", marginBottom: "2.5rem" }}>
              <Link href="/" className="hover:text-white transition-colors">{t("common.home")}</Link>
              <FaChevronRight style={{ fontSize: 8 }} />
              <span style={{ color: "var(--gold)" }}>{t("cerez.heading")}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white" style={{ fontFamily: "var(--font-heading)", marginBottom: "1.5rem" }}>
              {t("cerez.heading")}
            </h1>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>
              T.C. Ulaştırma ve Altyapı Bakanlığı — Altyapı Yatırımları Genel Müdürlüğü &bull; {t("cerez.subtitle")}
            </p>
          </div>
        </div>

        <div className="section-padding" style={{ background: "white" }}>
          <div className="container-aygm" style={{ maxWidth: "860px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>

              <div>
                <h2 className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--forest)", marginBottom: "1.25rem" }}>
                  {t("cerez.what_title")}
                </h2>
                <p style={{ color: "var(--gray-600)", fontSize: "0.9rem", lineHeight: 1.85 }}>
                  {t("cerez.what_desc")}
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--forest)", marginBottom: "1.5rem" }}>
                  {t("cerez.types_title")}
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {cookieTypes.map((c, i) => (
                    <div key={i} style={{ border: "1px solid var(--gray-100)", borderRadius: "1rem", padding: "1.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
                        <h3 className="font-bold text-base" style={{ color: "var(--forest)", fontFamily: "var(--font-heading)" }}>{c.name}</h3>
                        <span style={{
                          fontSize: "0.7rem", fontWeight: 700, padding: "0.2rem 0.75rem",
                          borderRadius: "100px", letterSpacing: "0.06em",
                          background: c.canDisable ? "rgba(201,168,76,0.1)" : "rgba(29,92,58,0.08)",
                          color: c.canDisable ? "var(--gold)" : "var(--green)",
                        }}>
                          {c.canDisable ? t("cerez.optional") : t("cerez.mandatory")}
                        </span>
                      </div>
                      <p style={{ color: "var(--gray-600)", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "0.75rem" }}>{c.desc}</p>
                      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
                        <div>
                          <div style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--gray-400)", marginBottom: "0.2rem" }}>{t("cerez.examples")}</div>
                          <div style={{ fontSize: "0.8rem", color: "var(--gray-600)" }}>{c.examples}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--gray-400)", marginBottom: "0.2rem" }}>{t("cerez.duration")}</div>
                          <div style={{ fontSize: "0.8rem", color: "var(--gray-600)" }}>{c.duration}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--forest)", marginBottom: "1.25rem" }}>
                  {t("cerez.control_title")}
                </h2>
                <p style={{ color: "var(--gray-600)", fontSize: "0.9rem", lineHeight: 1.85 }}>
                  {t("cerez.control_desc")}
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
