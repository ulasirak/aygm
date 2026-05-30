import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FaCalendarAlt, FaClock, FaArrowRight, FaSearch } from "react-icons/fa";
import { allNews } from "@/lib/news";

export const metadata: Metadata = {
  title: "Haberler & Duyurular",
  description:
    "Konya Tramvay 2. Etap projesiyle ilgili resmi haberler, basın açıklamaları ve duyurular.",
};

const categories = ["Tümü", "Tören", "İhale", "Devir", "Güzergah", "Vizyon", "KONYARAY"];

const catColors: Record<string, string> = {
  Tören: "var(--red)",
  İhale: "var(--forest)",
  Devir: "var(--green)",
  Güzergah: "var(--gold)",
  Vizyon: "var(--forest)",
  KONYARAY: "var(--green-light)",
};

export default function HaberlerPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <div
          className="relative py-20"
          style={{ background: "linear-gradient(135deg, var(--forest) 0%, var(--forest) 100%)" }}
        >
          <div className="container-aygm">
            <div className="flex items-center gap-2 text-sm mb-4" style={{ color: "rgba(255,255,255,0.55)" }}>
              <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
              <span>/</span>
              <span style={{ color: "var(--gold)" }}>Haberler</span>
            </div>
            <h1
              className="text-4xl md:text-5xl font-black text-white mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Haberler & Duyurular
            </h1>
            <p className="text-base whitespace-nowrap" style={{ color: "rgba(255,255,255,0.7)" }}>
              Konya Tramvay 2. Etap projesiyle ilgili resmi açıklamalar, basın haberleri ve önemli gelişmeler.
            </p>
          </div>
        </div>


        {/* News list */}
        <div className="section-padding" style={{ background: "white" }}>
          <div className="container-aygm">
            <div className="max-w-3xl mx-auto space-y-6">
                {allNews.map((item) => {
                  const catColor = catColors[item.category] || "var(--forest)";
                  return (
                    <article
                      key={item.slug}
                      className={`rounded-2xl transition-all hover:-translate-y-1 ${item.featured ? "border-2" : "border"}`}
                      style={{
                        borderColor: item.featured ? "var(--gold)" : "var(--gray-100)",
                        boxShadow: item.featured ? "0 8px 32px rgba(201,168,76,0.12)" : "none",
                        background: item.featured ? "rgba(201,168,76,0.02)" : "white",
                      }}
                    >
                      <div className="p-6">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          {item.featured && (
                            <span className="badge-red">Öne Çıkan</span>
                          )}
                          <span
                            className="text-xs font-bold px-2 py-0.5 rounded"
                            style={{ background: `${catColor}12`, color: catColor }}
                          >
                            {item.category}
                          </span>
                          <span
                            className="flex items-center gap-1 text-xs ml-auto"
                            style={{ color: "var(--gray-400)" }}
                          >
                            <FaCalendarAlt style={{ fontSize: 10 }} />
                            {item.date}
                          </span>
                        </div>
                        <h2
                          className="text-lg font-bold mb-3"
                          style={{ fontFamily: "var(--font-heading)", color: "var(--forest)" }}
                        >
                          {item.title}
                        </h2>
                        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--gray-600)" }}>
                          {item.summary}
                        </p>
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs min-w-0 flex-1" style={{ color: "var(--gray-400)" }}>
                            <span className="truncate">Kaynak: {item.source}</span>
                          </div>
                          <Link
                            href={`/haberler/${item.slug}`}
                            className="flex items-center gap-1 text-xs font-semibold flex-shrink-0"
                            style={{ color: "var(--forest)" }}
                          >
                            Devamını Oku
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
