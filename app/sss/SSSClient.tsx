"use client";

import Link from "next/link";
import FAQItem from "./FAQItem";
import Footer from "@/components/Footer";
import { useLang } from "@/context/LangContext";
import { FaChevronRight } from "react-icons/fa";

const FAQ_SECTIONS = [
  { catKey: "faq.cat1", qNums: [1, 2, 3, 4], id: "proje-genel" },
  { catKey: "faq.cat2", qNums: [5, 6, 7, 8], id: "guzergah-istasyonlar" },
  { catKey: "faq.cat3", qNums: [9, 10, 11, 12], id: "insaat-takvim" },
  { catKey: "faq.cat4", qNums: [13, 14], id: "cevresel-etki" },
  { catKey: "faq.cat5", qNums: [15, 16, 17, 18, 19, 20], id: "kullanim-entegrasyon" },
];

export default function SSSClient() {
  const { t } = useLang();
  return (
    <>
      <main>
        <div
          className="relative py-28"
          style={{ background: "linear-gradient(135deg, var(--teal-deep) 0%, var(--teal) 55%, var(--forest) 100%)", paddingTop: "6rem", paddingBottom: "6rem" }}
        >
          <div className="container-aygm">
            <div className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.5)", marginBottom: "2.25rem" }}>
              <Link href="/" className="hover:text-white transition-colors">{t("common.home")}</Link>
              <FaChevronRight style={{ fontSize: 9 }} />
              <span style={{ color: "var(--gold)" }}>{t("faq.badge")}</span>
            </div>
            <h1
              className="text-4xl md:text-5xl font-black text-white"
              style={{ fontFamily: "var(--font-heading)", marginBottom: "1.5rem" }}
            >
              {t("faq.heading")}
            </h1>
            <p className="text-lg max-w-2xl" style={{ color: "rgba(255,255,255,0.7)" }}>
              {t("faq.subheading")}
            </p>
          </div>
        </div>

        <div className="section-padding" style={{ background: "white" }}>
          <div className="container-aygm max-w-4xl mx-auto">
            {FAQ_SECTIONS.map((section) => (
              <div key={section.catKey} id={section.id} style={{ marginBottom: "4rem" }}>
                <h2
                  className="text-xl font-black flex items-center gap-3"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--forest)", marginBottom: "1.5rem" }}
                >
                  <span style={{ fontSize: "1.2rem", lineHeight: 1, flexShrink: 0 }}>✿</span>
                  {t(section.catKey)}
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {section.qNums.map((n) => (
                    <FAQItem key={n} q={t(`faq.q${n}`)} a={t(`faq.a${n}`)} />
                  ))}
                </div>
              </div>
            ))}

            <div
              className="rounded-2xl text-center overflow-hidden"
              style={{
                marginTop: "6rem",
                background: "linear-gradient(135deg, var(--teal-deep) 0%, var(--teal) 45%, var(--forest) 100%)",
                color: "white",
                padding: "4rem 2rem",
                position: "relative",
              }}
            >
              <div aria-hidden style={{ position: "absolute", top: "-60px", right: "-60px", width: "220px", height: "220px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,122,117,0.35) 0%, transparent 70%)", pointerEvents: "none" }} />
              <div aria-hidden style={{ position: "absolute", bottom: "-40px", left: "-40px", width: "160px", height: "160px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,184,174,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
              <h3 className="text-xl font-black" style={{ fontFamily: "var(--font-heading)", marginBottom: "1.25rem", position: "relative" }}>
                {t("faq.cta_title")}
              </h3>
              <Link href="/iletisim" className="btn-primary" style={{ position: "relative" }}>
                {t("nav.contact_cta")}
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
