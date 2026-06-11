"use client";
import Link from "next/link";
import { FaArrowRight, FaCalendarAlt } from "react-icons/fa";
import { useLang } from "@/context/LangContext";
import { useTranslate } from "@/hooks/useTranslate";
import { allNews } from "@/lib/news";

const catColors: Record<string, string> = {
  toren:    "#007A75",
  ihale:    "#1D5C3A",
  devir:    "#3A8A50",
  guzergah: "#00B8AE",
  vizyon:   "#2E7D32",
  konyaray: "#00B8AE",
};

// Ana sayfada gösterilecek 3 kart (featured hariç ilk 3)
const homeItems = allNews.filter(n => !n.featured).slice(0, 3);
// Paylaşımlı haberler-list önbelleği için tüm haberlerin düz metni
const allTexts  = allNews.flatMap(n => [n.title, n.summary]);

export default function NewsSection() {
  const { t } = useLang();
  const { out } = useTranslate(allTexts, "haberler-list");

  return (
    <section className="section-padding" style={{ background: "linear-gradient(to bottom, rgba(0,158,152,0.09) 0%, var(--gray-50) 110px, var(--gray-50) 100%)" }}>
      <div className="container-aygm">
        <div className="flex flex-col md:flex-row items-start md:items-start justify-between gap-4 mb-16">
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(0,122,117,0.08)", color: "#007A75", padding: "0.35rem 1rem", borderRadius: "100px", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.25rem", border: "1px solid rgba(0,122,117,0.15)" }}>
              {t("news.badge")}
            </div>
          </div>
          <Link href="/haberler" className="flex items-center gap-2 text-sm font-semibold flex-shrink-0" style={{ color: "#007A75" }}>
            {t("news.all")}
            <FaArrowRight style={{ fontSize: 12 }} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
          {/* ── Öne çıkan kart (i18n'den) ── */}
          <div className="md:row-span-2">
            <div className="news-card h-full flex flex-col">
              <div className="h-48 md:h-72 flex items-center justify-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, #041B19 0%, #007A75 100%)" }}>
                <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(0,184,174,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,174,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                <div style={{ position: "absolute", top: "-20%", right: "-10%", width: "60%", height: "60%", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,184,174,0.2) 0%, transparent 70%)" }} />
                <div className="text-center relative z-10 px-8">
                  <div className="text-6xl font-black mb-2" style={{ fontFamily: "var(--font-heading)", color: "var(--gold)" }}>2025</div>
                  <div className="text-white font-semibold">{t("news.year_label")}</div>
                </div>
              </div>
              <div className="p-7 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <span className="badge-red">{t("news.featured")}</span>
                </div>
                <h3 className="text-xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--forest)", marginBottom: "1.25rem" }}>
                  {t("news.featured_title")}
                </h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--gray-600)" }}>
                  {t("news.featured_desc")}
                </p>
                <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: "1px solid var(--gray-100)" }}>
                  <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--gray-400)" }}>
                    <FaCalendarAlt />
                    {t("proje.val_foundation")}
                  </div>
                  <Link href="/haberler/temel-atma-toreni" className="flex items-center gap-1.5 text-xs font-semibold hover:gap-2 transition-all" style={{ color: "var(--red)" }}>
                    {t("news.read_more")}
                    <FaArrowRight style={{ fontSize: 10 }} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ── 3 küçük kart (otomatik çeviri) ── */}
          {homeItems.map((item) => {
            const catColor = catColors[item.category] ?? "var(--forest)";
            const idx = allNews.findIndex(a => a.slug === item.slug);
            const title   = (idx >= 0 ? out[idx * 2]     : undefined) ?? item.title;
            const summary = (idx >= 0 ? out[idx * 2 + 1] : undefined) ?? item.summary;
            return (
              <Link key={item.slug} href={`/haberler/${item.slug}`} className="news-card block p-8 group">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: `${catColor}15`, color: catColor }}>
                    {t(`news.cat_${item.category}`)}
                  </span>
                  <span className="flex items-center gap-1 text-xs" style={{ color: "var(--gray-400)" }}>
                    <FaCalendarAlt style={{ fontSize: 10 }} />
                    {item.date}
                  </span>
                </div>
                <h3 className="font-bold mb-2 text-base group-hover:text-opacity-80 transition-colors" style={{ fontFamily: "var(--font-heading)", color: "var(--forest)" }}>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--gray-600)" }}>
                  {summary.slice(0, 120)}…
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
