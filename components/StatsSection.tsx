"use client";

import { FaRoad, FaTrain, FaUsers, FaLeaf, FaCar, FaCalendarAlt, FaRoute, FaBuilding } from "react-icons/fa";

const stats = [
  {
    icon: FaRoad,
    value: "10 km",
    label: "Yeni Hat",
    desc: "Yeni Sanayi – Stadyum arası",
    color: "var(--forest)",
    iconBg: "rgba(29,92,58,0.08)",
  },
  {
    icon: FaTrain,
    value: "10",
    label: "Yeni İstasyon",
    desc: "Modern, erişilebilir tasarım",
    color: "var(--green-mid)",
    iconBg: "rgba(58,138,80,0.08)",
  },
  {
    icon: FaUsers,
    value: "60.000",
    label: "Günlük Yolcu",
    desc: "Tahmini günlük kapasite",
    color: "var(--green)",
    iconBg: "rgba(46,125,50,0.08)",
  },
  {
    icon: FaRoute,
    value: "21,2 km",
    label: "Toplam Hat",
    desc: "1. ve 2. Etap birleşimi",
    color: "var(--forest)",
    iconBg: "rgba(29,92,58,0.06)",
  },
  {
    icon: FaBuilding,
    value: "2",
    label: "Köprülü Kavşak",
    desc: "Yeni inşa edilecek",
    color: "var(--gold)",
    iconBg: "rgba(184,137,42,0.08)",
  },
  {
    icon: FaCar,
    value: "3",
    label: "Yaya Üst Geçidi",
    desc: "Güvenli kavşak çözümleri",
    color: "var(--green-light)",
    iconBg: "rgba(82,183,136,0.08)",
  },
  {
    icon: FaLeaf,
    value: "134 km",
    label: "Toplam Raylı Ağ",
    desc: "Proje tamamlandığında",
    color: "var(--green)",
    iconBg: "rgba(46,125,50,0.08)",
  },
  {
    icon: FaCalendarAlt,
    value: "2027",
    label: "Hizmet Yılı",
    desc: "Planlanan açılış",
    color: "var(--gold)",
    iconBg: "rgba(184,137,42,0.08)",
  },
];

export default function StatsSection() {
  return (
    <section className="section-padding" style={{ background: "var(--pale)" }}>
      <div className="container-aygm">
        {/* Header */}
        <div className="text-center" style={{ marginTop: "-1rem", marginBottom: "5rem" }}>
          <h2
            className="text-3xl md:text-4xl font-black"
            style={{ fontFamily: "var(--font-heading)", color: "var(--forest)" }}
          >
            Büyük Rakamlar,{" "}
            <span className="gradient-text-green">Büyük Vizyon</span>
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="stat-card group">
                <Icon
                  className="mb-4"
                  style={{ color: stat.color, fontSize: 22 }}
                />
                <div
                  className="text-2xl md:text-4xl font-black mb-2 md:mb-3"
                  style={{ fontFamily: "var(--font-heading)", color: stat.color }}
                >
                  {stat.value}
                </div>
                <div className="font-semibold text-sm md:text-base mb-2" style={{ color: "var(--forest)", fontFamily: "var(--font-body)" }}>
                  {stat.label}
                </div>
                <div className="text-sm leading-relaxed" style={{ color: "var(--gray-400)" }}>
                  {stat.desc}
                </div>
              </div>
            );
          })}
        </div>

        {/* Info banner */}
        <div
          className="mt-14 md:mt-24 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8"
          style={{
            background: "linear-gradient(135deg, var(--forest-deep) 0%, var(--forest) 100%)",
            color: "white",
          }}
        >
          <div className="flex-1">
            <h3
              className="text-xl font-bold mb-4"
              style={{ fontFamily: "var(--font-heading)", letterSpacing: "0.01em" }}
            >
              Konya&apos;nın En Büyük Ulaşım Yatırımı
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
              Bu proje tamamlandığında Konya, Türkiye&apos;nin en gelişmiş kentsel raylı sistem
              ağlarından birine sahip olacak. KONYARAY Banliyö Hattı ve Barış Caddesi hatlarıyla
              tam entegre çalışacak hat, özel araç trafiğini önemli ölçüde azaltacak.
            </p>
          </div>
          <div
            className="flex items-center justify-center px-8 py-6 md:px-14 md:py-10 rounded-2xl flex-shrink-0 self-start md:self-end md:mt-6"
            style={{ background: "rgba(168,213,186,0.28)", border: "1px solid rgba(168,213,186,0.45)", minWidth: "180px" }}
          >
            <div className="text-center">
              <div
                className="text-4xl font-black mb-1"
                style={{ fontFamily: "var(--font-heading)", color: "var(--mint)" }}
              >
                %35
              </div>
              <div className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                Trafik Azalması
                <br />
                Hedefi
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
