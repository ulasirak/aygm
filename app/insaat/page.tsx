import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  FaCheckCircle, FaCircle, FaClock, FaHardHat,
  FaBuilding, FaTools, FaTrain, FaFlag
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "İnşaat Süreci",
  description:
    "Konya Tramvay 2. Etap inşaat aşamaları, ilerleme durumu ve teknik bilgiler. Uğursal Elektrik – ONH İnşaat OG yürütücülüğünde devam eden çalışmalar.",
};

const phases = [
  {
    phase: "Faz 1",
    title: "Hazırlık & ÇED",
    period: "2024 Q4 – 2025 Q1",
    status: "done",
    completion: 100,
    items: [
      "Çevresel Etki Değerlendirmesi onayı",
      "Kesin proje hazırlanması",
      "İhale dosyası hazırlığı",
      "Kamulaştırma çalışmaları başlangıcı",
    ],
  },
  {
    phase: "Faz 2",
    title: "İhale & Sözleşme",
    period: "Nisan – Temmuz 2025",
    status: "done",
    completion: 100,
    items: [
      "AYGM devir protokolü (Nisan 2025)",
      "İhale ilanı ve süreç",
      "İhale sonuçlandı (30 Mayıs 2025)",
      "Sözleşme imzalandı",
      "Temel atma töreni (7 Temmuz 2025)",
    ],
  },
  {
    phase: "Faz 3",
    title: "Altyapı & Zemin",
    period: "2025 Q3 – 2026 Q1",
    status: "active",
    completion: 35,
    items: [
      "Güzergah boyunca zemin hazırlığı",
      "2 köprülü kavşak temeli",
      "3 yaya üst geçidi temeli",
      "Drenaj ve altyapı hatları",
      "Trafo ve elektrik altyapısı",
    ],
  },
  {
    phase: "Faz 4",
    title: "Hat & Üstyapı",
    period: "2026 Q1 – 2026 Q3",
    status: "upcoming",
    completion: 0,
    items: [
      "Ray döşeme (10 km)",
      "Elektrik hattı montajı",
      "Sinyalizasyon sistemi",
      "Otomatik ücret sistemi altyapısı",
    ],
  },
  {
    phase: "Faz 5",
    title: "İstasyon İnşaatı",
    period: "2026 Q2 – 2026 Q4",
    status: "upcoming",
    completion: 0,
    items: [
      "10 istasyon üstyapısı",
      "Engelsiz erişim rampaları ve asansörler",
      "İstasyon donanım ve elektronik sistemler",
      "Peyzaj düzenlemeleri",
      "Aydınlatma sistemleri",
    ],
  },
  {
    phase: "Faz 6",
    title: "Test & Açılış",
    period: "2027 Q1",
    status: "upcoming",
    completion: 0,
    items: [
      "Sistem entegrasyon testleri",
      "Araç test sürüşleri",
      "Personel eğitimleri",
      "KONYARAY ve mevcut hat entegrasyon testi",
      "Resmi açılış töreni",
    ],
  },
];

const statusConfig = {
  done: { icon: FaCheckCircle, color: "var(--green)", label: "Tamamlandı" },
  active: { icon: FaClock, color: "var(--gold)", label: "Devam Ediyor" },
  upcoming: { icon: FaCircle, color: "var(--gray-200)", label: "Planlandı" },
};

const contractor = {
  name: "Uğursal Elektrik Elektronik İnşaat – ONH İnşaat ve Taahhüt A.Ş. Ortak Girişimi",
  contract: "9.059.553.000 TL",
  date: "30 Mayıs 2025",
  scope: "Konya Stadyum–Şehir Hastanesi Tramvay Hattı 2. Etap Yapımı",
};

export default function InsaatPage() {
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
              <span style={{ color: "var(--gold)" }}>İnşaat Süreci</span>
            </div>
            <h1
              className="text-4xl md:text-5xl font-black text-white mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              İnşaat Süreci
            </h1>
            <p className="text-lg max-w-2xl" style={{ color: "rgba(255,255,255,0.7)" }}>
              7 Temmuz 2025 temel atma töreniyle başlayan inşaat süreci 2027 yılı
              tamamlanma hedefiyle yürütülmektedir.
            </p>

          </div>
        </div>


        {/* Phases */}
        <div className="section-padding" style={{ background: "white" }}>
          <div className="container-aygm">
            <h2
              className="text-2xl md:text-3xl font-black mb-10"
              style={{ fontFamily: "var(--font-heading)", color: "var(--forest)" }}
            >
              İnşaat Fazları
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              {phases.map((phase) => {
                const cfg = statusConfig[phase.status as keyof typeof statusConfig];
                const StatusIcon = cfg.icon;
                return (
                  <div
                    key={phase.phase}
                    className="rounded-2xl"
                    style={{
                      border: phase.status === "active"
                        ? "1px solid rgba(201,168,76,0.3)"
                        : phase.status === "done"
                        ? "1px solid rgba(26,107,58,0.2)"
                        : "1px solid var(--gray-100)",
                    }}
                  >
                    {/* Phase header */}
                    <div
                      className="px-6 py-4 rounded-t-2xl flex flex-col md:flex-row md:items-center gap-3"
                      style={{
                        background: phase.status === "active"
                          ? "rgba(201,168,76,0.06)"
                          : phase.status === "done"
                          ? "rgba(26,107,58,0.04)"
                          : "var(--gray-50)",
                      }}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <StatusIcon style={{ color: cfg.color, fontSize: 18 }} />
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className="text-xs font-bold uppercase tracking-wider"
                              style={{ color: cfg.color }}
                            >
                              {phase.phase}
                            </span>
                            <span
                              className="text-xs px-2 py-0.5 rounded-full font-semibold"
                              style={{
                                background: `${cfg.color}15`,
                                color: cfg.color,
                              }}
                            >
                              {cfg.label}
                            </span>
                          </div>
                          <h3
                            className="font-bold text-base"
                            style={{ fontFamily: "var(--font-heading)", color: "var(--forest)" }}
                          >
                            {phase.title}
                          </h3>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-sm whitespace-nowrap" style={{ color: "var(--gray-400)" }}>
                          {phase.period}
                        </span>
                        {phase.status !== "upcoming" && (
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <div className="w-24 h-1.5 rounded-full" style={{ background: "var(--gray-200)" }}>
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${phase.completion}%`,
                                  background: phase.status === "done" ? "var(--green)" : "var(--gold)",
                                }}
                              />
                            </div>
                            <span
                              className="text-xs font-bold tabular-nums"
                              style={{ color: phase.status === "done" ? "var(--green)" : "var(--gold)" }}
                            >
                              %{phase.completion}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Items */}
                    <div className="px-6 py-4">
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {phase.items.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm" style={{ color: "var(--gray-600)" }}>
                            <div
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{
                                background: phase.status === "done"
                                  ? "var(--green)"
                                  : phase.status === "active"
                                  ? "var(--gold)"
                                  : "var(--gray-300)",
                              }}
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
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
