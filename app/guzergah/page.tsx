import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  FaMapMarkerAlt, FaTrain, FaHospital, FaFutbol, FaIndustry,
  FaExchangeAlt, FaBus, FaWalking, FaInfoCircle
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Güzergah & İstasyonlar",
  description:
    "Konya Tramvay 2. Etap güzergahı: Yeni Sanayi'den Stadyum'a 10 istasyon. Karatay ve Selçuklu ilçelerinden geçen hat detayları.",
};

const stations = [
  {
    no: 1,
    name: "Yeni Sanayi",
    subtitle: "Transfer İstasyonu",
    streets: "Aslım Caddesi",
    district: "Karatay",
    type: "transfer",
    icon: FaIndustry,
    features: ["1. Etap Bağlantısı", "Otopark", "Bisiklet Kiralama"],
    desc: "Hat başlangıç noktası ve 1. Etap ile bağlantı istasyonu. Yeni Sanayi Çarşısı ve OSB yakınında.",
  },
  {
    no: 2,
    name: "ASLİDAŞ",
    subtitle: "Sanayi Bölgesi",
    streets: "Aslım Caddesi",
    district: "Karatay",
    type: "normal",
    icon: FaMapMarkerAlt,
    features: ["OSB Erişimi"],
    desc: "Organize Sanayi Bölgesi çalışanlarına hizmet veren istasyon.",
  },
  {
    no: 3,
    name: "TÜYAP",
    subtitle: "Fuar & Kongre",
    streets: "Aksaray Caddesi",
    district: "Karatay",
    type: "normal",
    icon: FaMapMarkerAlt,
    features: ["TÜYAP Fuar Alanı"],
    desc: "Konya TÜYAP Fuar ve Kongre Merkezi girişinde.",
  },
  {
    no: 4,
    name: "Banliyö",
    subtitle: "KONYARAY Aktarma",
    streets: "Aksaray Köprülü Kavşağı",
    district: "Karatay",
    type: "transfer",
    icon: FaTrain,
    features: ["KONYARAY Bağlantısı", "Park & Ride"],
    desc: "KONYARAY Banliyö Hattı ile entegrasyon noktası. Şehir dışından gelenlere doğrudan aktarma.",
  },
  {
    no: 5,
    name: "Çimento",
    subtitle: "Merkez Mahalle",
    streets: "Sadık Ahmet Caddesi",
    district: "Karatay",
    type: "normal",
    icon: FaMapMarkerAlt,
    features: ["Alışveriş Merkezi", "Otopark"],
    desc: "Karatay ilçesinin yoğun nüfuslu bölgesine hizmet.",
  },
  {
    no: 6,
    name: "Novaland",
    subtitle: "Konut & Ticaret",
    streets: "Sadık Ahmet Caddesi",
    district: "Karatay",
    type: "normal",
    icon: FaMapMarkerAlt,
    features: [],
    desc: "Novaland projesi ve çevresi.",
  },
  {
    no: 7,
    name: "Otogar",
    subtitle: "Şehirlerarası Terminal",
    streets: "Dr. Halil Ürün Caddesi",
    district: "Selçuklu",
    type: "highlight",
    highlightColor: "var(--forest)",
    icon: FaBus,
    features: ["Şehirlerarası Otobüs", "Taksi Durağı", "Bagaj Depolama"],
    desc: "Konya Şehirlerarası Otobüs Terminali ile entegrasyon. Şehre gelen ziyaretçiler için ideal aktarma noktası.",
  },
  {
    no: 8,
    name: "Ecdad Bahçesi",
    subtitle: "Kültür & Park",
    streets: "Dr. Halil Ürün Caddesi",
    district: "Selçuklu",
    type: "normal",
    icon: FaMapMarkerAlt,
    features: ["Millet Bahçesi Yakını"],
    desc: "Ecdad Bahçesi ve çevre rekreasyon alanlarına erişim.",
  },
  {
    no: 9,
    name: "Real",
    subtitle: "Alışveriş Bölgesi",
    streets: "Yeni Stadyum Alanı",
    district: "Selçuklu",
    type: "normal",
    icon: FaMapMarkerAlt,
    features: ["AVM Erişimi"],
    desc: "Ticaret ve alışveriş bölgesine hizmet veren istasyon.",
  },
  {
    no: 10,
    name: "Konya Stadyumu",
    subtitle: "Son İstasyon",
    streets: "Stadyum Caddesi",
    district: "Selçuklu",
    type: "highlight",
    highlightColor: "var(--red)",
    icon: FaFutbol,
    features: ["Konya Büyükşehir Stadı", "Spor Kompleksi", "Barış Cad. Hattı"],
    desc: "Konya Büyükşehir Belediye Stadyumu girişi. Barış Caddesi Tramvay Hattı ile bağlantı noktası. Hat son durağı.",
  },
];

export default function GuzergahPage() {
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
              <span style={{ color: "var(--gold)" }}>Güzergah & İstasyonlar</span>
            </div>
            <h1
              className="text-4xl md:text-5xl font-black text-white mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Güzergah & İstasyonlar
            </h1>
            <p className="text-lg max-w-2xl" style={{ color: "rgba(255,255,255,0.7)" }}>
              Yeni Sanayi&apos;den Konya Stadyumu&apos;na 10 km boyunca 10 modern istasyon.
              Karatay ve Selçuklu ilçelerini birbirine bağlayan hat detayları.
            </p>
          </div>
        </div>


        {/* Route path */}
        <div className="py-12" style={{ background: "white" }}>
          <div className="container-aygm">
            <div
              className="flex items-center gap-2 p-4 rounded-xl text-sm"
              style={{ background: "rgba(29,92,58,0.04)", border: "1px solid var(--gray-200)" }}
            >
              <FaInfoCircle style={{ color: "var(--forest)", flexShrink: 0 }} />
              <span style={{ color: "var(--gray-600)" }}>
                <strong style={{ color: "var(--forest)" }}>Güzergah:</strong>{" "}
                Yeni Sanayi / Aslım Caddesi → TÜMOSAN Kavşağı → Aksaray Kavşağı →
                Sadık Ahmet Caddesi → Dr. Halil Ürün Caddesi → Konya Stadyumu
              </span>
            </div>
          </div>
        </div>

        {/* Stations */}
        <div className="section-padding" style={{ background: "white" }}>
          <div className="container-aygm">
            <div className="section-label mb-6">10 İstasyon</div>
            <h2
              className="text-2xl md:text-3xl font-black mb-10"
              style={{ fontFamily: "var(--font-heading)", color: "var(--forest)" }}
            >
              İstasyon Detayları
            </h2>

            <div className="space-y-4">
              {stations.map((station, i) => {
                const Icon = station.icon;
                const isHighlight = station.type === "highlight";
                const isTransfer = station.type === "transfer";
                const accentColor = isHighlight
                  ? (station as { highlightColor?: string }).highlightColor ?? "var(--red)"
                  : isTransfer
                  ? "var(--gold)"
                  : "var(--forest)";

                return (
                  <div
                    key={station.no}
                    className="rounded-2xl"
                    style={{
                      border: `1px solid ${isHighlight ? accentColor + "30" : isTransfer ? "rgba(201,168,76,0.2)" : "var(--gray-100)"}`,
                      background: isHighlight
                        ? `${accentColor}05`
                        : isTransfer
                        ? "rgba(201,168,76,0.03)"
                        : "white",
                    }}
                  >
                    <div className="p-5 md:p-6 flex flex-col md:flex-row gap-5">
                      {/* Number & Icon */}
                      <div className="flex items-center gap-4 md:flex-col md:items-center md:w-16 flex-shrink-0">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: `${accentColor}15` }}
                        >
                          <Icon style={{ color: accentColor, fontSize: 16 }} />
                        </div>
                        <div
                          className="text-xs font-bold text-center"
                          style={{ color: accentColor }}
                        >
                          İst.{station.no}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <h3
                            className="text-base font-bold"
                            style={{ fontFamily: "var(--font-heading)", color: "var(--forest)" }}
                          >
                            {station.name}
                          </h3>
                          {isTransfer && (
                            <span
                              className="text-xs px-2 py-0.5 rounded-full font-semibold"
                              style={{ background: "rgba(201,168,76,0.12)", color: "var(--gold)" }}
                            >
                              Aktarma
                            </span>
                          )}
                          {isHighlight && (
                            <span
                              className="text-xs px-2 py-0.5 rounded-full font-semibold"
                              style={{ background: `${accentColor}15`, color: accentColor }}
                            >
                              Önemli İstasyon
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs mb-3" style={{ color: "var(--gray-400)" }}>
                          <span className="flex items-center gap-1">
                            <FaMapMarkerAlt style={{ fontSize: 10 }} />
                            {station.district} İlçesi
                          </span>
                          <span>•</span>
                          <span>{station.streets}</span>
                        </div>
                        <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--gray-600)" }}>
                          {station.desc}
                        </p>
                        {station.features.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {station.features.map((f) => (
                              <span
                                key={f}
                                className="text-xs px-2 py-1 rounded-full"
                                style={{ background: "var(--gray-100)", color: "var(--gray-600)" }}
                              >
                                {f}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Integration info */}
        <div className="section-padding" style={{ background: "var(--gray-50)" }}>
          <div className="container-aygm">
            <h2
              className="text-2xl font-black mb-6"
              style={{ fontFamily: "var(--font-heading)", color: "var(--forest)" }}
            >
              Aktarma & Entegrasyon Noktaları
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  line: "Mevcut Konya Tramvayı (1. Etap)",
                  point: "Yeni Sanayi İstasyonu",
                  icon: FaTrain,
                  color: "var(--forest)",
                },
                {
                  line: "KONYARAY Banliyö Hattı",
                  point: "Banliyö İstasyonu (Aksaray Kavşağı)",
                  icon: FaTrain,
                  color: "var(--green)",
                },
                {
                  line: "Şehirlerarası Otobüs",
                  point: "Otogar İstasyonu",
                  icon: FaBus,
                  color: "var(--forest)",
                },
                {
                  line: "Barış Caddesi Tramvay Hattı",
                  point: "Konya Stadyumu İstasyonu",
                  icon: FaTrain,
                  color: "var(--red)",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.line}
                    className="rounded-xl p-4 flex items-start gap-3"
                    style={{ background: "white", border: "1px solid var(--gray-100)" }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${item.color}10` }}
                    >
                      <Icon style={{ color: item.color, fontSize: 14 }} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm mb-0.5" style={{ color: "var(--forest)" }}>
                        {item.line}
                      </div>
                      <div className="text-xs" style={{ color: "var(--gray-400)" }}>
                        <FaExchangeAlt className="inline mr-1" style={{ fontSize: 9 }} />
                        {item.point}
                      </div>
                    </div>
                  </div>
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
