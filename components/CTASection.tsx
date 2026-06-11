import Link from "next/link";
import { FaArrowRight, FaMapMarkedAlt, FaEnvelope } from "react-icons/fa";

export default function CTASection() {
  return (
    <section
      style={{
        background: "linear-gradient(135deg, #041B19 0%, #063330 35%, #0A4E4A 65%, #007A75 85%, #00B8AE 100%)",
        padding: "4rem 0 5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dekoratif arka plan */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(0,184,174,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,174,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />
      {/* Sağ üst turquoise orb */}
      <div aria-hidden style={{
        position: "absolute", right: "-5rem", top: "-5rem",
        width: "28rem", height: "28rem", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,184,174,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      {/* Sol alt yeşil orb */}
      <div aria-hidden style={{
        position: "absolute", left: "-3rem", bottom: "-3rem",
        width: "20rem", height: "20rem", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(29,92,58,0.2) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      {/* Yatay ışık çizgisi */}
      <div aria-hidden style={{
        position: "absolute", top: "40%", left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(0,184,174,0.15), transparent)",
        pointerEvents: "none",
      }} />

      <div className="container-aygm" style={{ position: "relative", zIndex: 1 }}>
        <div className="cta-grid" style={{ display: "grid", gap: "3rem", alignItems: "center" }}>

          {/* Sol: Metin */}
          <div>


<p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", lineHeight: 1.75, maxWidth: "38rem", marginBottom: "2.5rem" }}>
              Güzergah haritaları, istasyon detayları, inşaat ilerleme raporları
              ve resmi duyurular için projemizi takipte kalın.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              <Link
                href="/guzergah"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  background: "linear-gradient(135deg, #007A75, #00B8AE)",
                  color: "white", padding: "1rem 2rem", borderRadius: "0.625rem",
                  fontWeight: 700, fontSize: "0.9rem", textDecoration: "none",
                  boxShadow: "0 8px 28px rgba(0,122,117,0.4)",
                  border: "1px solid rgba(0,184,174,0.3)",
                }}
              >
                <FaMapMarkedAlt style={{ fontSize: 13 }} />
                Güzergah Haritası
                <FaArrowRight style={{ fontSize: 11 }} />
              </Link>
              <Link
                href="/iletisim"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  background: "transparent", color: "rgba(255,255,255,0.85)",
                  padding: "1rem 2rem", borderRadius: "0.625rem",
                  fontWeight: 600, fontSize: "0.9rem", textDecoration: "none",
                  border: "1.5px solid rgba(0,184,174,0.3)",
                }}
              >
                <FaEnvelope style={{ fontSize: 12 }} />
                İletişime Geç
              </Link>
            </div>
          </div>

          {/* Sağ: İstatistik kutusu */}
          <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "0.75rem", flexShrink: 0 }}>
            {[
              { value: "10 km", label: "Raylı Bağlantı" },
              { value: "10", label: "Durak Noktası" },
              { value: "2027", label: "Kente Açılıyor" },
            ].map((stat) => (
              <div key={stat.label} style={{
                background: "rgba(0,184,174,0.07)",
                border: "1px solid rgba(0,184,174,0.2)",
                borderRadius: "1rem",
                padding: "1rem 1.25rem",
                textAlign: "center",
                flex: "1 1 100px",
              }}>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.5rem", color: "#00B8AE", lineHeight: 1 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.45)", marginTop: "0.35rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
