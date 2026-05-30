import { FaCheckCircle, FaCircle, FaClock } from "react-icons/fa";
import type { ReactElement } from "react";

type TimelineStatus = "done" | "active" | "upcoming";

interface TimelineItem {
  year: string;
  month?: string;
  title: string;
  desc: string;
  status: TimelineStatus;
}

const timeline: TimelineItem[] = [
  {
    year: "2024",
    month: "Aralık",
    title: "Proje Hazırlık & ÇED",
    desc: "Çevresel etki değerlendirmesi onaylandı. Kesin proje ve ihale dosyaları hazırlandı.",
    status: "done",
  },
  {
    year: "2025",
    month: "Nisan",
    title: "AYGM Devir Protokolü",
    desc: "Konya Büyükşehir Belediyesi, 2. Etap yapımını T.C. Ulaştırma ve Altyapı Bakanlığı'na (AYGM) resmi olarak devretti.",
    status: "done",
  },
  {
    year: "2025",
    month: "30 Mayıs",
    title: "İhale Sonuçlandı",
    desc: "Uğursal Elektrik – ONH İnşaat OG, 9.059.553.000 TL bedelle ihaleyi kazandı.",
    status: "done",
  },
  {
    year: "2025",
    month: "7 Temmuz",
    title: "Temel Atma Töreni",
    desc: "Bakan Abdülkadir Uraloğlu başkanlığında temel atma töreni gerçekleştirildi. İnşaat resmen başladı.",
    status: "done",
  },
  {
    year: "2025–2026",
    title: "Altyapı İnşaatı",
    desc: "Köprülü kavşaklar, yaya üst geçitleri ve hat güzergahı zemin çalışmaları yürütülüyor.",
    status: "active",
  },
  {
    year: "2026",
    title: "Ray Montajı & Üstyapı",
    desc: "Ray döşeme, elektrik hattı ve istasyon üstyapı inşaatları.",
    status: "upcoming",
  },
  {
    year: "2026–2027",
    title: "İstasyon Tamamlama",
    desc: "10 istasyonun donanım, peyzaj ve erişilebilirlik düzenlemeleri.",
    status: "upcoming",
  },
  {
    year: "2027",
    title: "Test Sürüşleri & Açılış",
    desc: "Sistem testleri, personel eğitimleri ve kamuoyuna açılış. Günlük 60.000 yolcu hedefi.",
    status: "upcoming",
  },
];

const statusIcon: Record<TimelineStatus, ReactElement> = {
  done: <FaCheckCircle style={{ color: "var(--green)", fontSize: 16 }} />,
  active: (
    <div
      className="w-4 h-4 rounded-full animate-pulse"
      style={{ background: "var(--gold)", boxShadow: "0 0 8px var(--gold)" }}
    />
  ),
  upcoming: <FaCircle style={{ color: "var(--gray-200)", fontSize: 14 }} />,
};

const statusLabel: Record<TimelineStatus, { text: string; color: string; bg: string }> = {
  done: { text: "Tamamlandı", color: "var(--green)", bg: "rgba(26,107,58,0.1)" },
  active: { text: "Devam Ediyor", color: "var(--gold)", bg: "rgba(201,168,76,0.1)" },
  upcoming: { text: "Planlandı", color: "var(--gray-400)", bg: "var(--gray-100)" },
};

export default function TimelineSection() {
  return (
    <section className="section-padding" style={{ background: "white" }}>
      <div className="container-aygm">
        {/* Header */}
        <div className="text-center" style={{ marginTop: "-5rem", marginBottom: "4rem" }}>
          <h2
            className="text-3xl md:text-4xl font-black"
            style={{ fontFamily: "var(--font-heading)", color: "var(--forest)" }}
          >
            2025&apos;ten 2027&apos;ye{" "}
            <span style={{ color: "var(--green-light)", fontWeight: 300 }}>Yol Haritası</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-5 top-6 bottom-6 w-0.5"
              style={{ background: "linear-gradient(to bottom, var(--green), var(--forest), var(--gray-200))" }}
            />

            <div className="space-y-10">
              {timeline.map((item, i) => {
                const sl = statusLabel[item.status];
                return (
                  <div key={i} className="relative flex gap-6">
                    {/* Icon */}
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center z-10"
                      style={{
                        background: item.status === "active"
                          ? "rgba(201,168,76,0.1)"
                          : item.status === "done"
                          ? "rgba(26,107,58,0.1)"
                          : "var(--gray-100)",
                        border: item.status === "active"
                          ? "2px solid var(--gold)"
                          : item.status === "done"
                          ? "2px solid var(--green)"
                          : "2px solid var(--gray-200)",
                      }}
                    >
                      {statusIcon[item.status]}
                    </div>

                    {/* Content */}
                    <div
                      className="flex-1 rounded-xl p-7"
                      style={{
                        background: item.status === "active"
                          ? "linear-gradient(135deg, rgba(201,168,76,0.06) 0%, rgba(29,92,58,0.03) 100%)"
                          : item.status === "done"
                          ? "var(--gray-50)"
                          : "transparent",
                        border: item.status === "active"
                          ? "1px solid rgba(201,168,76,0.2)"
                          : item.status === "done"
                          ? "1px solid var(--gray-100)"
                          : "1px solid transparent",
                      }}
                    >
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span
                          className="text-xs font-bold tabular-nums"
                          style={{ color: "var(--forest)", fontFamily: "var(--font-body)" }}
                        >
                          {item.month ? `${item.month} ${item.year}` : item.year}
                        </span>
                        <span
                          className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: sl.bg, color: sl.color }}
                        >
                          {sl.text}
                        </span>
                        {item.status === "active" && (
                          <FaClock style={{ color: "var(--gold)", fontSize: 11 }} />
                        )}
                      </div>
                      <h4
                        className="font-bold text-lg mb-3"
                        style={{ color: "var(--forest)", fontFamily: "var(--font-heading)" }}
                      >
                        {item.title}
                      </h4>
                      <p className="text-base leading-relaxed" style={{ color: "var(--gray-600)" }}>
                        {item.desc}
                      </p>
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
