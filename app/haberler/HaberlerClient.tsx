"use client";

import Footer from "@/components/Footer";
import Link from "next/link";
import { FaCalendarAlt, FaArrowRight, FaChevronRight } from "react-icons/fa";
import { allNews } from "@/lib/news";
import { useLang } from "@/context/LangContext";
import { useTranslate } from "@/hooks/useTranslate";

const catColors: Record<string, string> = {
  toren:    "#007A75",
  ihale:    "#1D5C3A",
  devir:    "#3A8A50",
  guzergah: "#00B8AE",
  vizyon:   "#2E7D32",
  konyaray: "#00B8AE",
};

// Tüm haberlerin başlık+özet dizisi — sabit referans
const allTexts = allNews.flatMap(n => [n.title, n.summary]);

export default function HaberlerClient() {
  const { t } = useLang();
  const { out, loading } = useTranslate(allTexts, "haberler-list");

  return (
    <>
      <main>
        {/* ── Hero ── */}
        <div
          className="relative py-28"
          style={{ background: "linear-gradient(135deg, var(--teal-deep) 0%, var(--teal) 55%, var(--forest) 100%)", paddingTop: "6rem", paddingBottom: "6rem" }}
        >
          <div className="container-aygm">
            <div className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.5)", marginBottom: "2.25rem" }}>
              <Link href="/" className="hover:text-white transition-colors">{t("common.home")}</Link>
              <FaChevronRight style={{ fontSize: 9 }} />
              <span style={{ color: "var(--gold)" }}>{t("haberler.heading")}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white" style={{ fontFamily: "var(--font-heading)", marginBottom: "1.5rem" }}>
              {t("haberler.heading")}
            </h1>
            <p className="text-lg" style={{ color: "rgba(255,255,255,0.7)" }}>
              {t("haberler.subheading")}
            </p>
          </div>
        </div>

        {/* ── Liste ── */}
        <div className="section-padding" style={{ background: "white" }}>
          <div className="container-aygm">
            <div className="max-w-3xl mx-auto" style={{ display: "flex", flexDirection: "column", gap: "2.25rem" }}>
              {allNews.map((item, idx) => {
                const catColor = catColors[item.category] || "var(--forest)";
                const title   = out[idx * 2]     ?? item.title;
                const summary = out[idx * 2 + 1] ?? item.summary;
                return (
                  <article
                    key={item.slug}
                    className={`rounded-2xl transition-all hover:-translate-y-1 ${item.featured ? "border-2" : "border"}`}
                    style={{
                      borderColor:  item.featured ? "var(--gold)"               : "var(--gray-100)",
                      boxShadow:    item.featured ? "0 8px 32px rgba(201,168,76,0.12)" : "none",
                      background:   item.featured ? "rgba(201,168,76,0.02)"     : "white",
                      transition:   "opacity 0.4s, transform 0.2s",
                      opacity:      loading ? 0.7 : 1,
                    }}
                  >
                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        {item.featured && (
                          <span className="badge-red">{t("news.featured")}</span>
                        )}
                        <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: `${catColor}12`, color: catColor }}>
                          {t(`news.cat_${item.category}`)}
                        </span>
                        <span className="flex items-center gap-1 text-xs ml-auto" style={{ color: "var(--gray-400)" }}>
                          <FaCalendarAlt style={{ fontSize: 10 }} />
                          {item.date}
                        </span>
                      </div>
                      <h2 className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--forest)", marginBottom: "1rem" }}>
                        {title}
                      </h2>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--gray-600)" }}>
                        {summary}
                      </p>
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs min-w-0 flex-1" style={{ color: "var(--gray-400)" }}>
                          <span className="truncate">{t("haberler.source")}: {item.source}</span>
                        </div>
                        <Link
                          href={`/haberler/${item.slug}`}
                          className="flex items-center gap-1 text-xs font-semibold flex-shrink-0"
                          style={{ color: "var(--forest)" }}
                        >
                          {t("haberler.read_more")}
                          <FaArrowRight style={{ fontSize: 10 }} />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
