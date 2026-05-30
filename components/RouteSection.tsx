"use client";

import { FaMapMarkerAlt, FaArrowRight, FaFutbol, FaIndustry, FaExchangeAlt } from "react-icons/fa";
import Link from "next/link";

const stations = [
  {
    id: 1,
    name: "Yeni Sanayi",
    icon: FaIndustry,
    type: "transfer",
    desc: "1. Etap bağlantı noktası — Aslım Cad.",
    transferLabel: "1. Etap Bağlantısı",
  },
  {
    id: 2,
    name: "ASLİDAŞ",
    icon: FaMapMarkerAlt,
    type: "normal",
    desc: "OSB çalışanlarına hizmet",
  },
  {
    id: 3,
    name: "TÜYAP",
    icon: FaMapMarkerAlt,
    type: "normal",
    desc: "Fuar ve Kongre Merkezi",
  },
  {
    id: 4,
    name: "Banliyö",
    icon: FaExchangeAlt,
    type: "transfer",
    desc: "Aksaray Köprülü Kavşağı",
    transferLabel: "KONYARAY Bağlantısı",
  },
  {
    id: 5,
    name: "Çimento",
    icon: FaMapMarkerAlt,
    type: "normal",
    desc: "Karatay — Sadık Ahmet Cad.",
  },
  {
    id: 6,
    name: "Novaland",
    icon: FaMapMarkerAlt,
    type: "normal",
    desc: "Konut ve ticaret bölgesi",
  },
  {
    id: 7,
    name: "Otogar",
    icon: FaMapMarkerAlt,
    type: "highlight",
    desc: "Şehirlerarası terminal — Dr. H. Ürün Cad.",
    highlightColor: "var(--forest)",
  },
  {
    id: 8,
    name: "Ecdad Bahçesi",
    icon: FaMapMarkerAlt,
    type: "normal",
    desc: "Kültür ve park alanı",
  },
  {
    id: 9,
    name: "Real",
    icon: FaMapMarkerAlt,
    type: "normal",
    desc: "Alışveriş ve ticaret bölgesi",
  },
  {
    id: 10,
    name: "Konya Stadyumu",
    icon: FaFutbol,
    type: "highlight",
    desc: "Son istasyon — Barış Cad. Hattı bağlantısı",
    highlightColor: "var(--red)",
  },
];

export default function RouteSection() {
  return (
    <section className="section-padding" style={{ background: "white" }}>
      <div className="container-aygm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center" style={{ marginTop: "-1rem" }}>
          {/* Left: Content */}
          <div>
            <h2
              className="text-3xl md:text-4xl font-black mb-8"
              style={{ fontFamily: "var(--font-heading)", color: "var(--forest)" }}
            >
              Sanayi&apos;den Stadyum&apos;a{" "}
              <span className="gradient-text-green">10 Kilometre</span>
            </h2>
            <p className="text-base leading-relaxed mb-6 md:mb-14" style={{ color: "var(--gray-600)" }}>
              Yeni Sanayi istasyonundan başlayarak Şehir Hastanesi&apos;ni geçip Konya
              Stadyumu&apos;nda son bulan hat; sanayi bölgeleri, sağlık tesisleri ve spor
              komplekslerini şehir merkeziyle buluşturuyor.
            </p>

            {/* Integration info */}
            <div
              className="rounded-xl p-5 mb-10"
              style={{ background: "var(--gray-50)", border: "1px solid var(--gray-200)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <FaExchangeAlt style={{ color: "var(--forest)", fontSize: 14 }} />
                <span className="text-sm font-bold" style={{ color: "var(--forest)" }}>
                  Entegrasyon Noktaları
                </span>
              </div>
              <div className="space-y-2 text-sm" style={{ color: "var(--gray-600)" }}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "var(--forest)" }} />
                  Mevcut Konya Tramvay Ağı (1. Etap)
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "var(--green)" }} />
                  KONYARAY Banliyö Hattı
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "var(--gold)" }} />
                  Barış Caddesi Hatları
                </div>
              </div>
            </div>

            <Link href="/guzergah" className="btn-outline-navy">
              Tüm Güzergahı Gör
              <FaArrowRight style={{ fontSize: 12 }} />
            </Link>
          </div>

          {/* Right: Station list */}
          <div>
            <div className="relative">
              {/* Vertical line — centered in the 40px dot column */}
              <div
                className="absolute w-0.5"
                style={{
                  left: "19px",
                  top: "22px",
                  bottom: "22px",
                  background: "linear-gradient(to bottom, var(--forest), var(--green))",
                }}
              />

              {stations.map((station, i) => {
                const Icon = station.icon;
                const isHighlight = station.type === "highlight";
                const isTransfer = station.type === "transfer";
                const dotSize = isHighlight ? 16 : isTransfer ? 14 : 10;

                return (
                  <div key={station.id} className="relative flex items-start mb-7 group">
                    {/* Dot column — fixed 40px wide, dot centered at x=20 */}
                    <div className="flex-shrink-0 w-10 flex justify-center pt-3.5 relative z-10">
                      <div
                        className="transition-transform group-hover:scale-125"
                        style={{
                          width: dotSize,
                          height: dotSize,
                          borderRadius: "50%",
                          background: isHighlight
                            ? station.highlightColor
                            : isTransfer
                            ? "var(--gold)"
                            : "white",
                          border: `2px solid ${isHighlight ? (station.highlightColor ?? "var(--red)") : isTransfer ? "var(--gold)" : "var(--forest)"}`,
                          boxShadow: isHighlight ? `0 0 0 3px ${station.highlightColor}33` : "none",
                        }}
                      />
                    </div>

                    {/* Gap between dot column and content */}
                    <div className="flex-shrink-0 w-7" />

                    {/* Content */}
                    <div
                      className="flex-1 rounded-xl p-5 transition-all cursor-default"
                      style={{
                        background: isHighlight
                          ? `${station.highlightColor}08`
                          : isTransfer
                          ? "rgba(201,168,76,0.06)"
                          : "transparent",
                        border: isHighlight
                          ? `1px solid ${station.highlightColor}20`
                          : isTransfer
                          ? "1px solid rgba(201,168,76,0.2)"
                          : "1px solid transparent",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Icon
                          className="flex-shrink-0"
                          style={{
                            color: isHighlight ? station.highlightColor : isTransfer ? "var(--gold)" : "var(--gray-400)",
                            fontSize: 13,
                          }}
                        />
                        <span
                          className="text-sm font-semibold flex-1 min-w-0 truncate"
                          style={{ color: isHighlight ? station.highlightColor : "var(--forest)" }}
                        >
                          {station.name}
                        </span>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {isTransfer && (
                            <span
                              className="text-xs px-2 py-0.5 rounded-full font-medium"
                              style={{ background: "rgba(201,168,76,0.15)", color: "var(--gold)" }}
                            >
                              Aktarma
                            </span>
                          )}
                          <span
                            className="text-xs tabular-nums w-5 text-right"
                            style={{ color: "var(--gray-400)" }}
                          >
                            {i + 1}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs mt-1 ml-5" style={{ color: "var(--gray-400)" }}>
                        {station.desc}
                      </p>
                      {station.transferLabel && (
                        <div
                          className="text-xs mt-1 ml-5 font-medium"
                          style={{ color: "var(--gold)" }}
                        >
                          {station.transferLabel}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
