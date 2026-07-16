"use client";

import Footer from "@/components/Footer";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { useMemo } from "react";
import { useLang } from "@/context/LangContext";

const SECTION_KEYS = ["s1","s2","s3","s4","s5","s6","s7"] as const;

export default function GizlilikClient() {
  const { t } = useLang();

  const sections = useMemo(() =>
    SECTION_KEYS.map((k) => ({
      title:   t(`gizlilik.${k}_title`),
      content: t(`gizlilik.${k}_content`),
    }))
  , [t]);
  return (
    <>
      <main>
        <div className="relative" style={{ background: "linear-gradient(135deg, var(--teal-deep) 0%, var(--teal) 55%, var(--teal-dark) 100%)", paddingTop: "6rem", paddingBottom: "6rem" }}>
          <div className="container-aygm relative z-10">
            <div className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.5)", marginBottom: "2.5rem" }}>
              <Link href="/" className="hover:text-white transition-colors">{t("common.home")}</Link>
              <FaChevronRight style={{ fontSize: 8 }} />
              <span style={{ color: "var(--gold)" }}>{t("gizlilik.heading")}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white" style={{ fontFamily: "var(--font-heading)", marginBottom: "1.5rem" }}>
              {t("gizlilik.heading")}
            </h1>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>
              T.C. Ulaştırma ve Altyapı Bakanlığı — Altyapı Yatırımları Genel Müdürlüğü &bull; {t("gizlilik.subtitle")}
            </p>
          </div>
        </div>

        <div className="section-padding" style={{ background: "white" }}>
          <div className="container-aygm" style={{ maxWidth: "860px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
              {sections.map((s, i) => (
                <div key={i}>
                  <h2 className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--teal-dark)", marginBottom: "1.25rem" }}>
                    {s.title}
                  </h2>
                  <div style={{ color: "var(--gray-600)", fontSize: "0.9rem", lineHeight: 1.85, whiteSpace: "pre-line" }}>
                    {s.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
