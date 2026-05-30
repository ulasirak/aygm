import Link from "next/link";
import { FaArrowRight, FaCalendarAlt, FaClock } from "react-icons/fa";

const news = [
  {
    id: 1,
    category: "İhale",
    categoryColor: "var(--forest)",
    date: "30 Mayıs 2025",
    title: "2. Etap İhalesi Tamamlandı",
    summary:
      "Uğursal Elektrik – ONH İnşaat OG, 9,06 milyar TL bedelle Konya Stadyum–Şehir Hastanesi Tramvay Hattı 2. Etap ihalesini kazandı.",
    readTime: "3 dk",
    href: "/haberler/ihale-tamamlandi",
  },
  {
    id: 2,
    category: "Tören",
    categoryColor: "var(--red)",
    date: "7 Temmuz 2025",
    title: "Temel Atma Töreni Gerçekleştirildi",
    summary:
      "Bakan Uraloğlu başkanlığında temel atma töreniyle inşaat resmen başladı. 'Konya raylı ağını 134 km'ye yükseltmiş olacağız.'",
    readTime: "4 dk",
    href: "/haberler/temel-atma-toreni",
  },
  {
    id: 3,
    category: "Devir",
    categoryColor: "var(--green)",
    date: "Nisan 2025",
    title: "2. Etap AYGM'ye Devredildi",
    summary:
      "Konya Büyükşehir Belediyesi, 2. Etap tramvay hattı yapımını T.C. Ulaştırma ve Altyapı Bakanlığı'na resmi olarak devretti.",
    readTime: "2 dk",
    href: "/haberler/aygm-devir",
  },
  {
    id: 4,
    category: "Güzergah",
    categoryColor: "var(--gold)",
    date: "2025",
    title: "Güzergah Detayları Açıklandı",
    summary:
      "Aslım Caddesi – TÜMOSAN Kavşağı – Aksaray Kavşağı – Dr. Halil Ürün Caddesi üzerinden geçen hat, Karatay ve Selçuklu ilçelerini birbirine bağlıyor.",
    readTime: "5 dk",
    href: "/haberler/guzergah-detaylari",
  },
];

export default function NewsSection() {
  return (
    <section className="section-padding" style={{ background: "var(--gray-50)" }}>
      <div className="container-aygm">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-start justify-between gap-4 mb-16">
          <div>
            <div className="section-label" style={{ fontSize: "0.95rem", padding: "0.5rem 1.4rem" }}>Haberler</div>
          </div>
          <Link
            href="/haberler"
            className="flex items-center gap-2 text-sm font-semibold flex-shrink-0"
            style={{ color: "var(--forest)" }}
          >
            Tüm Haberler
            <FaArrowRight style={{ fontSize: 12 }} />
          </Link>
        </div>

        {/* News grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
          {/* Featured news */}
          <div className="md:row-span-2">
            <div className="news-card h-full flex flex-col">
              <div
                className="h-32 md:h-72 flex items-center justify-center relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, var(--forest) 0%, var(--forest) 100%)",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />
                <div className="text-center relative z-10 px-8">
                  <div
                    className="text-6xl font-black mb-2"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--gold)" }}
                  >
                    2025
                  </div>
                  <div className="text-white font-semibold">Temel Atma Yılı</div>
                </div>
              </div>
              <div className="p-7 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <span className="badge-red">Öne Çıkan</span>
                </div>
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--forest)" }}
                >
                  Temel Atma Töreni Gerçekleştirildi
                </h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--gray-600)" }}>
                  Bakan Abdülkadir Uraloğlu başkanlığında 7 Temmuz 2025&apos;te gerçekleştirilen
                  törenle Konya Tramvay 2. Etap inşaatı resmen başladı. Konya&apos;nın raylı
                  sistem ağı 134 km&apos;ye çıkacak.
                </p>
                <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: "1px solid var(--gray-100)" }}>
                  <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--gray-400)" }}>
                    <FaCalendarAlt />
                    7 Temmuz 2025
                  </div>
                  <Link
                    href="/haberler/temel-atma-toreni"
                    className="flex items-center gap-1.5 text-xs font-semibold hover:gap-2 transition-all"
                    style={{ color: "var(--red)" }}
                  >
                    Devamını Oku
                    <FaArrowRight style={{ fontSize: 10 }} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Other news */}
          {news.slice(0, 3).map((item) => (
            <Link key={item.id} href={item.href} className="news-card block p-8 group">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded"
                  style={{
                    background: `${item.categoryColor}15`,
                    color: item.categoryColor,
                  }}
                >
                  {item.category}
                </span>
                <span className="flex items-center gap-1 text-xs" style={{ color: "var(--gray-400)" }}>
                  <FaCalendarAlt style={{ fontSize: 10 }} />
                  {item.date}
                </span>
              </div>
              <h3
                className="font-bold mb-2 text-base group-hover:text-opacity-80 transition-colors"
                style={{ fontFamily: "var(--font-heading)", color: "var(--forest)" }}
              >
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--gray-600)" }}>
                {item.summary}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
