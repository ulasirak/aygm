import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  FaArrowLeft, FaCalendarAlt, FaClock, FaExternalLinkAlt,
  FaUsers, FaChevronRight, FaArrowRight,
} from "react-icons/fa";
import { allNews, getNewsBySlug } from "@/lib/news";

export async function generateStaticParams() {
  return allNews.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.summary,
  };
}

const catColors: Record<string, string> = {
  Tören:    "var(--red)",
  İhale:    "var(--forest)",
  Devir:    "var(--green)",
  Güzergah: "var(--gold)",
  Vizyon:   "var(--forest)",
  KONYARAY: "var(--green-light)",
};

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) notFound();

  const catColor = catColors[item.category] ?? "var(--forest)";
  const otherNews = allNews.filter((n) => n.slug !== slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ── */}
        <div
          className="relative py-16 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, var(--forest-deep) 0%, var(--forest) 100%)",
          }}
        >
          {/* Grid decoration */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="container-aygm relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>
              <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
              <FaChevronRight style={{ fontSize: 9 }} />
              <Link href="/haberler" className="hover:text-white transition-colors">Haberler</Link>
              <FaChevronRight style={{ fontSize: 9 }} />
              <span style={{ color: "var(--gold)" }}>{item.category}</span>
            </div>

            {/* Category + meta */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              {item.featured && (
                <span className="badge-red">Öne Çıkan</span>
              )}
              <span
                className="text-xs font-bold px-3 py-1 rounded-full"
                style={{ background: `${catColor}20`, color: catColor, border: `1px solid ${catColor}30` }}
              >
                {item.category}
              </span>
              <span
                className="flex items-center gap-1.5 text-xs"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                <FaCalendarAlt style={{ fontSize: 10 }} />
                {item.date}
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5 max-w-3xl leading-tight"
              style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
            >
              {item.title}
            </h1>

            {/* Summary */}
            <p
              className="text-base md:text-lg max-w-2xl leading-relaxed"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              {item.summary}
            </p>
          </div>
        </div>

        {/* ── Content + Sidebar ── */}
        <div className="section-padding" style={{ background: "white" }}>
          <div className="container-aygm">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

              {/* Main content */}
              <article className="lg:col-span-3">
                {/* Back link */}
                <Link
                  href="/haberler"
                  className="inline-flex items-center gap-2 text-sm font-medium mb-10 hover:gap-3 transition-all"
                  style={{ color: "var(--forest)" }}
                >
                  <FaArrowLeft style={{ fontSize: 12 }} />
                  Tüm Haberlere Dön
                </Link>

                {/* Body paragraphs */}
                <div className="prose-aygm space-y-6 mb-10">
                  {item.body.map((para, i) => (
                    <p
                      key={i}
                      className="text-base leading-[1.85]"
                      style={{ color: i === 0 ? "var(--forest)" : "var(--gray-600)" }}
                    >
                      {i === 0 ? (
                        <strong style={{ fontWeight: 600 }}>{para}</strong>
                      ) : (
                        para
                      )}
                    </p>
                  ))}
                </div>

                {/* Divider */}
                <div className="h-px mt-10 mb-24" style={{ background: "var(--gray-100)" }} />

                {/* Source */}
                <div
                  className="rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  style={{ background: "var(--gray-50)", border: "1px solid var(--gray-100)" }}
                >
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "var(--gray-400)" }}>
                      Kaynak
                    </div>
                    <div className="font-semibold text-sm" style={{ color: "var(--forest)" }}>
                      {item.source}
                    </div>
                  </div>
                  {item.sourceUrl && (
                    <Link
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                      style={{
                        background: "var(--forest)",
                        color: "white",
                      }}
                    >
                      Kaynağa Git
                      <FaExternalLinkAlt style={{ fontSize: 10 }} />
                    </Link>
                  )}
                </div>
              </article>

              {/* Sidebar */}
              <aside style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

                {/* Temel Bilgiler */}
                {item.keyFacts && item.keyFacts.length > 0 && (
                  <div style={{ border: "1px solid var(--gray-100)", borderRadius: "1rem", overflow: "hidden", width: "100%" }}>
                    <div style={{ background: "var(--forest)", padding: "1rem 1.5rem" }}>
                      <h3 className="text-white font-bold text-sm uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                        Temel Bilgiler
                      </h3>
                    </div>
                    {item.keyFacts.map((fact, i) => (
                      <div key={fact.label} style={{ padding: "0.875rem 1.5rem", borderTop: i === 0 ? "none" : "1px solid var(--gray-100)" }}>
                        <div style={{ color: "var(--gray-400)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.2rem" }}>{fact.label}</div>
                        <div style={{ color: "var(--forest)", fontSize: "0.875rem", fontWeight: 600, wordBreak: "break-word", overflowWrap: "break-word" }}>{fact.value}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Katılımcılar */}
                {item.participants && item.participants.length > 0 && (
                  <div style={{ background: "var(--pale)", border: "1px solid var(--gray-100)", borderRadius: "1rem", padding: "1.5rem", overflow: "hidden", width: "100%" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                      <FaUsers style={{ color: "var(--forest)", fontSize: 13, flexShrink: 0 }} />
                      <h3 className="font-bold text-sm uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)", color: "var(--forest)" }}>
                        Katılımcılar
                      </h3>
                    </div>
                    <ul style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                      {item.participants.map((p) => (
                        <li key={p} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", color: "var(--gray-600)", fontSize: "0.8rem", lineHeight: 1.5, wordBreak: "break-word", overflowWrap: "break-word" }}>
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", flexShrink: 0, marginTop: 5 }} />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Projeyi Keşfet */}
                <div style={{ background: "var(--forest)", borderRadius: "1rem", padding: "1.5rem", overflow: "hidden", width: "100%" }}>
                  <h3 className="font-bold text-sm uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)", color: "var(--gold)", marginBottom: "1rem" }}>
                    Projeyi Keşfet
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                    {[
                      { href: "/proje", label: "Proje Hakkında" },
                      { href: "/guzergah", label: "Güzergah & İstasyonlar" },
                      { href: "/insaat", label: "İnşaat Süreci" },
                    ].map((link) => (
                      <Link key={link.href} href={link.href}
                        className="hover:bg-white/10"
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

        {/* ── Other news ── */}
        {otherNews.length > 0 && (
          <div className="py-14 pt-0" style={{ background: "var(--gray-50)" }}>
            <div className="container-aygm">
              <div className="flex items-center justify-between mb-8">
                <h2
                  className="text-2xl font-black"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--forest)" }}
                >
                  Diğer Haberler
                </h2>
                <Link
                  href="/haberler"
                  className="flex items-center gap-1.5 text-sm font-semibold"
                  style={{ color: "var(--forest)" }}
                >
                  Tümünü Gör <FaArrowRight style={{ fontSize: 11 }} />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {otherNews.map((n) => {
                  const cc = catColors[n.category] ?? "var(--forest)";
                  return (
                    <Link
                      key={n.slug}
                      href={`/haberler/${n.slug}`}
                      className="news-card block p-5 group"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded"
                          style={{ background: `${cc}15`, color: cc }}
                        >
                          {n.category}
                        </span>
                        <span className="text-xs" style={{ color: "var(--gray-400)" }}>
                          {n.date}
                        </span>
                      </div>
                      <h3
                        className="font-bold text-sm mb-2 leading-snug"
                        style={{ fontFamily: "var(--font-heading)", color: "var(--forest)" }}
                      >
                        {n.title}
                      </h3>
                      <p className="text-xs leading-relaxed" style={{ color: "var(--gray-400)" }}>
                        {n.summary.slice(0, 100)}…
                      </p>
                      <div
                        className="flex items-center gap-1.5 mt-3 text-xs font-semibold"
                        style={{ color: "var(--forest)" }}
                      >
                        Devamını Oku <FaArrowRight style={{ fontSize: 9 }} />
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
