"use client";

import Footer from "@/components/Footer";
import Link from "next/link";
import {
  FaArrowLeft, FaCalendarAlt, FaExternalLinkAlt,
  FaUsers, FaChevronRight, FaArrowRight,
} from "react-icons/fa";
import { useRef } from "react";
import type { NewsItem } from "@/lib/news";
import { allNews } from "@/lib/news";
import { useLang } from "@/context/LangContext";
import { useTranslate } from "@/hooks/useTranslate";

const catColors: Record<string, string> = {
  toren:    "#0B7C77",
  ihale:    "#0A6B66",
  devir:    "#29BDB5",
  guzergah: "#6FDDD6",
  vizyon:   "#0B7C77",
  konyaray: "#6FDDD6",
};

// Paylaşımlı önbellek için tüm haberlerin düz metin listesi
const allNewsTexts = allNews.flatMap(n => [n.title, n.summary]);

interface Props {
  item: NewsItem;
  otherNews: NewsItem[];
}

export default function NewsDetailClient({ item, otherNews }: Props) {
  const { t } = useLang();
  const catColor = catColors[item.category] ?? "var(--teal-dark)";

  // Makale metinleri — prop statik olduğu için useRef ile tek seferlik hesap
  const articleTexts = useRef([
    item.title,
    item.summary,
    ...item.body,
    ...(item.keyFacts ?? []).map(f => f.value),
  ]).current;

  const { out, loading } = useTranslate(articleTexts, `news-detail:${item.slug}`);
  // Diğer haberlerin başlık/özeti için paylaşımlı önbellek
  const { out: allOut } = useTranslate(allNewsTexts, "haberler-list");

  const tTitle   = out[0] ?? item.title;
  const tSummary = out[1] ?? item.summary;
  const tBody    = item.body.map((p, i) => out[2 + i] ?? p);
  const factOffset = 2 + item.body.length;
  const tFacts   = (item.keyFacts ?? []).map((f, i) => ({
    ...f,
    value: out[factOffset + i] ?? f.value,
  }));

  return (
    <>
      <main>
        {/* ── Hero ── */}
        <div
          className="relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, var(--teal-deep) 0%, var(--teal) 55%, var(--teal-dark) 100%)", paddingTop: "6rem", paddingBottom: "6rem" }}
        >
          <div className="absolute inset-0 pointer-events-none" aria-hidden style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
          <div className="container-aygm relative z-10">
            <div className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.5)", marginBottom: "2.25rem" }}>
              <Link href="/" className="hover:text-white transition-colors">{t("common.home")}</Link>
              <FaChevronRight style={{ fontSize: 9 }} />
              <Link href="/haberler" className="hover:text-white transition-colors">{t("haberler.heading")}</Link>
              <FaChevronRight style={{ fontSize: 9 }} />
              <span style={{ color: "var(--gold)" }}>{t(`news.cat_${item.category}`)}</span>
            </div>

            <div className="flex flex-wrap items-center gap-3" style={{ marginBottom: "1.5rem" }}>
              {item.featured && <span className="badge-red">{t("news.featured")}</span>}
              <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: `${catColor}20`, color: catColor, border: `1px solid ${catColor}30` }}>
                {t(`news.cat_${item.category}`)}
              </span>
              <span className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                <FaCalendarAlt style={{ fontSize: 10 }} />
                {item.date}
              </span>
            </div>

            <div style={{ transition: "opacity 0.4s", opacity: loading ? 0.65 : 1 }}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white max-w-3xl leading-tight" style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em", marginBottom: "1.5rem" }}>
                {tTitle}
              </h1>
              <p className="text-base md:text-lg max-w-2xl leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                {tSummary}
              </p>
            </div>
          </div>
        </div>

        {/* ── İçerik ── */}
        <div className="section-padding" style={{ background: "white" }}>
          <div className="container-aygm">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

              <article className="lg:col-span-3">
                <Link href="/haberler" className="inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all" style={{ marginBottom: "3.5rem", color: "var(--teal-dark)" }}>
                  <FaArrowLeft style={{ fontSize: 12 }} />
                  {t("haberler.back")}
                </Link>

                <div className="prose-aygm space-y-6 mb-10" style={{ transition: "opacity 0.4s", opacity: loading ? 0.65 : 1 }}>
                  {tBody.map((para, i) => (
                    <p key={i} className="text-base leading-[1.85]" style={{ color: i === 0 ? "var(--teal-dark)" : "var(--gray-600)" }}>
                      {i === 0 ? <strong style={{ fontWeight: 600 }}>{para}</strong> : para}
                    </p>
                  ))}
                </div>

                <div className="h-px" style={{ background: "var(--gray-100)", marginTop: "2.5rem", marginBottom: "6rem" }} />

                <div className="rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ background: "var(--gray-50)", border: "1px solid var(--gray-100)" }}>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "var(--gray-400)" }}>{t("haberler.source")}</div>
                    <div className="font-semibold text-sm" style={{ color: "var(--teal-dark)" }}>{item.source}</div>
                  </div>
                  {item.sourceUrl && (
                    <Link href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg transition-colors" style={{ background: "var(--teal-dark)", color: "white" }}>
                      {t("haberler.source_link")}
                      <FaExternalLinkAlt style={{ fontSize: 10 }} />
                    </Link>
                  )}
                </div>
              </article>

              {/* ── Kenar çubuğu ── */}
              <aside style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                {tFacts.length > 0 && (
                  <div style={{ border: "1px solid var(--gray-100)", borderRadius: "1rem", overflow: "hidden", width: "100%", transition: "opacity 0.4s", opacity: loading ? 0.65 : 1 }}>
                    <div style={{ background: "var(--teal-dark)", padding: "1rem 1.5rem" }}>
                      <h3 className="text-white font-bold text-sm uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                        {t("haberler.key_facts")}
                      </h3>
                    </div>
                    {tFacts.map((fact, i) => (
                      <div key={fact.label} style={{ padding: "0.875rem 1.5rem", borderTop: i === 0 ? "none" : "1px solid var(--gray-100)" }}>
                        <div style={{ color: "var(--gray-400)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.2rem" }}>{t(fact.label)}</div>
                        <div style={{ color: "var(--teal-dark)", fontSize: "0.875rem", fontWeight: 600, wordBreak: "break-word", overflowWrap: "break-word" }}>{fact.value}</div>
                      </div>
                    ))}
                  </div>
                )}

                {item.participants && item.participants.length > 0 && (
                  <div style={{ background: "var(--pale)", border: "1px solid var(--gray-100)", borderRadius: "1rem", padding: "1.5rem", overflow: "hidden", width: "100%" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                      <FaUsers style={{ color: "var(--teal-dark)", fontSize: 13, flexShrink: 0 }} />
                      <h3 className="font-bold text-sm uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)", color: "var(--teal-dark)" }}>{t("haberler.participants")}</h3>
                    </div>
                    <ul style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                      {item.participants.map((p) => (
                        <li key={p} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", color: "var(--gray-600)", fontSize: "0.8rem", lineHeight: 1.5, wordBreak: "break-word", overflowWrap: "break-word" }}>
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--teal)", flexShrink: 0, marginTop: 5 }} />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div style={{ background: "var(--teal-dark)", borderRadius: "1rem", padding: "1.5rem", overflow: "hidden", width: "100%" }}>
                  <h3 className="font-bold text-sm uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)", color: "var(--gold)", marginBottom: "1rem" }}>
                    {t("haberler.explore")}
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                    {[
                      { href: "/proje",    label: t("footer.link_about") },
                      { href: "/guzergah", label: t("footer.link_route") },
                    ].map((link) => (
                      <Link key={link.href} href={link.href} className="hover:bg-white/10"
                        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1rem", borderRadius: "0.5rem", color: "rgba(255,255,255,0.8)", fontSize: "0.875rem", transition: "background 0.2s" }}
                      >
                        <span>{link.label}</span>
                        <FaArrowRight style={{ fontSize: 10, flexShrink: 0 }} />
                      </Link>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>

        {/* ── Diğer haberler ── */}
        {otherNews.length > 0 && (
          <div style={{ background: "var(--gray-50)", paddingTop: "2rem", paddingBottom: "5rem" }}>
            <div className="container-aygm">
              <div className="flex items-center justify-between" style={{ marginBottom: "2rem" }}>
                <h2 className="text-2xl font-black" style={{ fontFamily: "var(--font-heading)", color: "var(--teal-dark)" }}>
                  {t("haberler.other_news")}
                </h2>
                <Link href="/haberler" className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: "var(--teal-dark)" }}>
                  {t("news.all")} <FaArrowRight style={{ fontSize: 11 }} />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {otherNews.map((n) => {
                  const cc = catColors[n.category] ?? "var(--teal-dark)";
                  const nIdx = allNews.findIndex(a => a.slug === n.slug);
                  const nTitle   = nIdx >= 0 ? (allOut[nIdx * 2]     ?? n.title)   : n.title;
                  const nSummary = nIdx >= 0 ? (allOut[nIdx * 2 + 1] ?? n.summary) : n.summary;
                  return (
                    <Link key={n.slug} href={`/haberler/${n.slug}`} className="news-card block group" style={{ padding: "1.75rem" }}>
                      <div className="flex items-center gap-2" style={{ marginBottom: "1rem" }}>
                        <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: `${cc}15`, color: cc }}>{t(`news.cat_${n.category}`)}</span>
                        <span className="text-xs" style={{ color: "var(--gray-400)" }}>{n.date}</span>
                      </div>
                      <h3 className="font-bold text-base leading-snug" style={{ fontFamily: "var(--font-heading)", color: "var(--teal-dark)", marginBottom: "0.75rem" }}>
                        {nTitle}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--gray-500)" }}>
                        {nSummary.slice(0, 130)}…
                      </p>
                      <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "var(--teal-dark)", marginTop: "1.25rem" }}>
                        {t("haberler.read_more")} <FaArrowRight style={{ fontSize: 9 }} />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
