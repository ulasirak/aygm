import { FaLeaf, FaWind, FaBolt, FaCar, FaSeedling, FaCity } from "react-icons/fa";

const impacts = [
  {
    icon: FaCar,
    value: "%35",
    label: "Trafik Azalması",
    desc: "Güzergah boyunca günlük araç trafiğinde tahmini düşüş",
    color: "var(--mint)",
  },
  {
    icon: FaWind,
    value: "15.000 ton",
    label: "CO₂ Azaltımı",
    desc: "Yıllık sera gazı emisyonu azalması tahmini",
    color: "var(--mint)",
  },
  {
    icon: FaBolt,
    value: "100%",
    label: "Elektrikli Araç",
    desc: "Sıfır emisyonlu elektrikli tramvay sistemleri",
    color: "var(--gold-light)",
  },
  {
    icon: FaSeedling,
    value: "1.200+",
    label: "Yeni Ağaç",
    desc: "Güzergah boyunca yapılacak yeşillendirme",
    color: "var(--mint)",
  },
  {
    icon: FaCity,
    value: "134 km",
    label: "Kentsel Ağ",
    desc: "Tamamlandığında Konya'nın toplam raylı sistem ağı",
    color: "var(--mint)",
  },
  {
    icon: FaLeaf,
    value: "2027",
    label: "Yeşil Ulaşım",
    desc: "Tam entegre çevreci ulaşım ağı hedef yılı",
    color: "var(--mint)",
  },
];

export default function EnvironmentSection() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, var(--forest) 0%, var(--green-mid) 100%)" }}
    >
      {/* Decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, var(--green-light) 0%, transparent 70%)",
            transform: "translate(20%, -20%)",
          }}
        />
      </div>

      <div className="container-aygm relative z-10">
        {/* Header */}
        <div className="text-center" style={{ marginTop: "1rem", marginBottom: "2rem" }}>
          <div className="flex flex-col items-center gap-3 md:flex-row md:justify-center md:gap-4">
            <svg className="hidden md:block" width="38" height="38" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, opacity: 0.85 }}>
              <ellipse cx="32" cy="20" rx="7" ry="11" fill="rgba(168,213,186,0.55)" transform="rotate(0 32 32)"/>
              <ellipse cx="32" cy="20" rx="7" ry="11" fill="rgba(168,213,186,0.45)" transform="rotate(60 32 32)"/>
              <ellipse cx="32" cy="20" rx="7" ry="11" fill="rgba(168,213,186,0.45)" transform="rotate(120 32 32)"/>
              <ellipse cx="32" cy="20" rx="7" ry="11" fill="rgba(168,213,186,0.55)" transform="rotate(180 32 32)"/>
              <ellipse cx="32" cy="20" rx="7" ry="11" fill="rgba(168,213,186,0.45)" transform="rotate(240 32 32)"/>
              <ellipse cx="32" cy="20" rx="7" ry="11" fill="rgba(168,213,186,0.45)" transform="rotate(300 32 32)"/>
              <circle cx="32" cy="32" r="6" fill="var(--mint)"/>
              <line x1="32" y1="44" x2="32" y2="60" stroke="rgba(168,213,186,0.7)" strokeWidth="2.5" strokeLinecap="round"/>
              <ellipse cx="25" cy="54" rx="6" ry="3.5" fill="rgba(168,213,186,0.4)" transform="rotate(-30 25 54)"/>
            </svg>
            <h2
              className="text-2xl md:text-4xl font-black text-white text-center"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Sürdürülebilir Bir{" "}
              <span style={{ color: "var(--mint)" }}>Geleceğe</span> Yatırım
            </h2>
          </div>
        </div>

        {/* Impact grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
          {impacts.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="rounded-xl p-4 md:p-8 lg:p-10 group hover:scale-105 transition-transform cursor-default"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Icon
                  className="mb-6"
                  style={{ color: item.color, fontSize: 22 }}
                />
                <div
                  className="text-3xl md:text-4xl font-black mb-3"
                  style={{ fontFamily: "var(--font-heading)", color: "white" }}
                >
                  {item.value}
                </div>
                <div
                  className="font-semibold text-base mb-3"
                  style={{ color: item.color }}
                >
                  {item.label}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className="rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8"
          style={{
            background: "rgba(46,139,87,0.12)",
            border: "1px solid rgba(46,139,87,0.25)",
          }}
        >
          <div className="flex-1 text-center md:text-left">
            <h3
              className="text-xl font-bold text-white mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Türkiye&apos;nin Yeşil Ulaşım Vizyonu
            </h3>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              Ulaştırma ve Altyapı Bakanlığı olarak 2053 Net Sıfır Emisyon hedefi
              doğrultusunda raylı sistemlere yatırımımızı sürdürüyoruz.
              Konya, bu vizyonun öncü şehirlerinden biri.
            </p>
          </div>
          <div className="flex gap-4 flex-shrink-0">
            <div className="text-center">
              <div className="text-3xl font-black text-white" style={{ fontFamily: "var(--font-heading)" }}>
                2053
              </div>
              <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                Net Sıfır
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
