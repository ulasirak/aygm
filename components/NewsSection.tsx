"use client";
import Link from "next/link";
import { FaArrowRight, FaCalendarAlt } from "react-icons/fa";
import { useLang } from "@/context/LangContext";

const catColors: Record<string, string> = {
  toren: "#007A75",
  ihale: "#1D5C3A",
  devir: "#3A8A50",
  guzergah: "#00B8AE",
  vizyon: "#2E7D32",
  konyaray: "#00B8AE",
};

const news = [
  { id: 1, category: "ihale",    date: "30 Mayıs 2025", title: "2. Etap İhalesi Tamamlandı",                               summary: "Uğursal Elektrik – ONH İnşaat Ortak Girişimi, 9,06 milyar TL bedelle ihaleyi kazandı.",                                                              href: "/haberler/ihale-tamamlandi" },
  { id: 2, category: "toren",    date: "7 Temmuz 2025",  title: "Temel Atma Töreni Gerçekleştirildi",                       summary: "Sayın Vali İbrahim Akın başkanlığında temel atma töreniyle inşaat resmen başladı.",                                                                href: "/haberler/temel-atma-toreni" },
  { id: 3, category: "devir",    date: "Nisan 2025",      title: "2. Etap Altyapı Yatırımları Genel Müdürlüğü'ne Devredildi", summary: "Konya Büyükşehir Belediyesi, 2. Etap tramvay hattı yapımını T.C. Ulaştırma ve Altyapı Bakanlığı'na resmi olarak devretti.",                       href: "/haberler/aygm-devir" },
  { id: 4, category: "guzergah", date: "2025",             title: "Güzergah Detayları Açıklandı",                             summary: "Aslım Caddesi – TÜMOSAN Kavşağı – Aksaray Kavşağı güzergahı, Karatay ve Selçuklu ilçelerini birbirine bağlıyor.",                                href: "/haberler/guzergah-detaylari" },
];

export default function NewsSection() {
  const { t } = useLang();

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

          {news.slice(0, 3).map((item) => {
            const catColor = catColors[item.category] ?? "var(--forest)";
            return (
              <Link key={item.id} href={item.href} className="news-card block p-8 group">
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
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--gray-600)" }}>
                  {item.summary}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
