import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  FaTrain, FaRoad, FaUsers, FaLeaf, FaBuilding, FaHandshake,
  FaArrowRight, FaCheckCircle, FaExternalLinkAlt
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Proje Hakkında",
  description:
    "Konya Stadyum–Şehir Hastanesi Tramvay Hattı 2. Etap hakkında kapsamlı proje bilgisi. Kapsam, hedefler, entegrasyon ve teknik detaylar.",
};

const objectives = [
  "Yeni Sanayi bölgesini şehir merkeziyle hızlı raylı sistemle bağlamak",
  "Günlük 60.000 yolcuya hizmet veren modern tramvay altyapısı kurmak",
  "Konya Şehir Hastanesi'ne toplu taşıma erişimini iyileştirmek",
  "Stadyum bölgesini kentle entegre etmek",
  "Özel araç kullanımını azaltarak karbon salınımını düşürmek",
  "KONYARAY ve mevcut hat ağıyla tam entegrasyon sağlamak",
  "Konya'nın raylı sistem ağını 134 km'ye taşımak",
];

const technicalData = [
  { label: "Hat Uzunluğu (2. Etap)", value: "10 km" },
  { label: "İstasyon Sayısı", value: "10" },
  { label: "Toplam Hat Uzunluğu", value: "21,2 km" },
  { label: "Köprülü Kavşak", value: "2 adet (yeni)" },
  { label: "Yaya Üst Geçidi", value: "3 adet" },
  { label: "Günlük Kapasite", value: "60.000 yolcu" },
  { label: "Maksimum Hız", value: "80 km/sa" },
  { label: "Sözleşme Bedeli", value: "9,06 milyar TL" },
  { label: "Yüklenici", value: "Uğursal Elektrik – ONH İnşaat OG" },
  { label: "İhale Tarihi", value: "30 Mayıs 2025" },
  { label: "Temel Atma", value: "7 Temmuz 2025" },
  { label: "Hedef Açılış", value: "2027" },
];

export default function ProjePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Page hero */}
        <div
          className="relative py-20"
          style={{ background: "linear-gradient(135deg, var(--forest) 0%, var(--forest) 100%)" }}
        >
          <div className="container-aygm relative z-10">
            <div className="flex items-center gap-2 text-sm mb-4" style={{ color: "rgba(255,255,255,0.55)" }}>
              <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
              <span>/</span>
              <span style={{ color: "var(--gold)" }}>Proje Hakkında</span>
            </div>
            <h1
              className="text-4xl md:text-5xl font-black text-white mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Proje Hakkında
            </h1>
            <p className="text-lg max-w-2xl" style={{ color: "rgba(255,255,255,0.7)" }}>
              Konya Stadyum–Şehir Hastanesi Tramvay Hattı 2. Etap, T.C. Ulaştırma ve
              Altyapı Bakanlığı'nın en kapsamlı kentsel ulaşım yatırımlarından biridir.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="section-padding" style={{ background: "white" }}>
          <div className="container-aygm">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Main content */}
              <div className="lg:col-span-3" style={{ display: "flex", flexDirection: "column", gap: "6rem" }}>
                {/* About */}
                <section>
                  <h2
                    className="text-2xl font-black mb-4"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--forest)" }}
                  >
                    Projenin Genel Tanımı
                  </h2>
                  <div className="space-y-4 text-base leading-relaxed" style={{ color: "var(--gray-600)" }}>
                    <p>
                      Konya Stadyum–Şehir Hastanesi Tramvay Hattı 2. Etap projesi, T.C. Ulaştırma
                      ve Altyapı Bakanlığı Altyapı Yatırımları Genel Müdürlüğü (AYGM) tarafından
                      yürütülmektedir. Proje; Yeni Sanayi bölgesinden Konya Stadyumu&apos;na uzanan
                      10 kilometre uzunluğunda yeni bir tramvay hattını kapsamaktadır.
                    </p>
                    <p>
                      Yaklaşık 10,987 milyar TL yatırım değeriyle hayata geçirilecek proje;
                      Uğursal Elektrik Elektronik İnşaat – ONH İnşaat ve Taahhüt A.Ş. Ortak
                      Girişimi tarafından 9,06 milyar TL sözleşme bedeli ile üstlenilmiştir.
                      30 Mayıs 2025&apos;te sonuçlanan ihale sürecinin ardından 7 Temmuz 2025&apos;te
                      Bakan Abdülkadir Uraloğlu başkanlığında temel atma töreni gerçekleştirilmiştir.
                    </p>
                    <p>
                      Hat tamamlandığında, mevcut 1. Etap (Şehir Hastanesi–Yeni Sanayi, 11,2 km)
                      ile birleşerek toplam 21,2 km&apos;lik bir raylı sistem oluşturacak. Bu hat;
                      KONYARAY Banliyö Hattı, Barış Caddesi Tramvay Hattı ve mevcut Konya tramvay
                      ağıyla tam entegre çalışacak.
                    </p>
                  </div>
                </section>

                {/* Objectives */}
                <section>
                  <h2
                    className="text-2xl font-black mb-5"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--forest)" }}
                  >
                    Proje Hedefleri
                  </h2>
                  <ul className="space-y-3">
                    {objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <FaCheckCircle
                          className="flex-shrink-0 mt-0.5"
                          style={{ color: "var(--green)", fontSize: 16 }}
                        />
                        <span className="text-base" style={{ color: "var(--gray-600)" }}>
                          {obj}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Integration */}
                <section>
                  <h2
                    className="text-2xl font-black mb-5"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--forest)" }}
                  >
                    Entegrasyon & Konya Raylı Sistem Ağı
                  </h2>
                  <p className="text-base leading-relaxed mb-6" style={{ color: "var(--gray-600)" }}>
                    Ulaştırma ve Altyapı Bakanı Abdülkadir Uraloğlu&apos;nun açıkladığı vizyona göre
                    bu proje ve devam eden diğer çalışmalarla Konya&apos;nın raylı sistem ağı
                    27,7 km&apos;den <strong>134 km&apos;ye</strong> yükselerek İstanbul&apos;dan
                    sonra Türkiye&apos;nin en uzun raylı sistem ağına sahip şehri olacak.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: "Mevcut Tramvay Ağı", km: "26,7 km", status: "Aktif" },
                      { name: "Şehir Hastanesi Tramvayı (1. Etap)", km: "11,2 km", status: "İnşaat" },
                      { name: "Stadyum Tramvayı (2. Etap — Bu Proje)", km: "10 km", status: "İnşaat" },
                      { name: "KONYARAY Banliyö Hattı", km: "23 km", status: "İnşaat" },
                      { name: "Barış Caddesi Tramvay Hattı", km: "13,85 km", status: "İhale" },
                    ].map((line) => (
                      <div
                        key={line.name}
                        className="rounded-xl p-4"
                        style={{ background: "var(--gray-50)", border: "1px solid var(--gray-100)" }}
                      >
                        <div className="flex items-start gap-2 mb-1">
                          <span className="text-sm font-semibold flex-1 min-w-0 leading-snug" style={{ color: "var(--forest)" }}>
                            {line.name}
                          </span>
                          <span
                            className="text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 mt-0.5"
                            style={{
                              background: line.status === "Aktif"
                                ? "rgba(26,107,58,0.1)"
                                : line.status === "İnşaat"
                                ? "rgba(201,168,76,0.1)"
                                : "rgba(206,17,38,0.08)",
                              color: line.status === "Aktif"
                                ? "var(--green)"
                                : line.status === "İnşaat"
                                ? "var(--gold)"
                                : "var(--red)",
                            }}
                          >
                            {line.status}
                          </span>
                        </div>
                        <div className="text-lg font-black" style={{ fontFamily: "var(--font-heading)", color: "var(--forest)" }}>
                          {line.km}
                        </div>
                      </div>
                    ))}
                    <div
                      className="rounded-xl p-4 flex items-center justify-between"
                      style={{
                        background: "linear-gradient(135deg, var(--forest), var(--forest))",
                        border: "1px solid rgba(201,168,76,0.2)",
                      }}
                    >
                      <span className="text-sm font-semibold text-white">Toplam Hedef</span>
                      <span
                        className="text-xl font-black"
                        style={{ fontFamily: "var(--font-heading)", color: "var(--gold)" }}
                      >
                        134 km
                      </span>
                    </div>
                  </div>
                </section>

                {/* Official statement */}
                <section>
                  <blockquote
                    className="rounded-2xl p-6"
                    style={{
                      background: "var(--gray-50)",
                      borderLeft: "4px solid var(--gold)",
                    }}
                  >
                    <p
                      className="text-base italic leading-relaxed mb-4"
                      style={{ color: "var(--forest)" }}
                    >
                      &ldquo;Konya&apos;nın kent içi raylı sistem ağını 27,7 kilometreden 134 km&apos;ye
                      yükseltmiş olacağız. İstanbul&apos;dan sonra Türkiye&apos;nin en uzun raylı
                      sistem ağına sahip şehri Konya olacak.&rdquo;
                    </p>
                    <footer className="text-sm font-semibold" style={{ color: "var(--gray-600)" }}>
                      — Ulaştırma ve Altyapı Bakanı <strong style={{ color: "var(--forest)" }}>Abdülkadir Uraloğlu</strong>,
                      Temel Atma Töreni, 7 Temmuz 2025
                    </footer>
                  </blockquote>
                </section>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-2" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                {/* Technical data */}
                <div style={{ border: "1px solid var(--gray-100)", borderRadius: "1rem" }}>
                  <div style={{ background: "var(--forest)", borderRadius: "1rem 1rem 0 0", padding: "1rem 1.5rem" }}>
                    <h3 className="text-white font-bold text-sm uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                      Teknik Veriler
                    </h3>
                  </div>
                  {technicalData.map((item, i) => (
                    <div
                      key={item.label}
                      style={{
                        padding: "0.875rem 1.5rem",
                        borderTop: i === 0 ? "none" : "1px solid var(--gray-100)",
                      }}
                    >
                      <div className="text-xs" style={{ color: "var(--gray-400)", marginBottom: "0.2rem" }}>{item.label}</div>
                      <div className="text-sm font-semibold" style={{ color: "var(--forest)", wordBreak: "break-word" }}>{item.value}</div>
                    </div>
                  ))}
                </div>

                {/* Links */}
                <div style={{ background: "var(--gray-50)", border: "1px solid var(--gray-100)", borderRadius: "1rem", padding: "1.5rem" }}>
                  <h3 className="font-bold text-sm uppercase tracking-wider" style={{ color: "var(--forest)", fontFamily: "var(--font-heading)", marginBottom: "1rem" }}>
                    Kurumsal Bağlantılar
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {[
                      { href: "https://www.aygm.gov.tr", label: "AYGM Resmi Sitesi" },
                      { href: "https://www.uab.gov.tr", label: "Ulaştırma ve Altyapı Bakanlığı" },
                      { href: "https://www.konya.bel.tr", label: "Konya Büyükşehir Belediyesi" },
                      { href: "https://www.konyaray.com.tr", label: "KONYARAY" },
                    ].map((link) => (
                      <Link key={link.href} href={link.href} target="_blank"
                        className="text-sm hover:underline"
                        style={{ color: "var(--forest)", display: "flex", alignItems: "center", gap: "0.5rem", wordBreak: "break-word" }}
                      >
                        <FaExternalLinkAlt style={{ fontSize: 9, opacity: 0.4, flexShrink: 0 }} />
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Quick nav */}
                <div style={{ background: "var(--forest)", borderRadius: "1rem", padding: "1.5rem" }}>
                  <h3 className="font-bold text-sm uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)", color: "var(--gold)", marginBottom: "1rem" }}>
                    Daha Fazlası
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {[
                      { href: "/guzergah", label: "Güzergah & İstasyonlar" },
                      { href: "/insaat", label: "İnşaat Süreci" },
                      { href: "/haberler", label: "Haberler" },
                    ].map((link) => (
                      <Link key={link.href} href={link.href}
                        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1rem", borderRadius: "0.5rem", color: "rgba(255,255,255,0.8)", fontSize: "0.875rem", transition: "background 0.2s" }}
                        className="hover:bg-white/10"
                      >
                        <span>{link.label}</span>
                        <FaArrowRight style={{ fontSize: 10, flexShrink: 0 }} />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
