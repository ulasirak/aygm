import Link from "next/link";
import { FaArrowRight, FaMapMarkedAlt, FaEnvelope, FaTrain } from "react-icons/fa";

export default function CTASection() {
  return (
    <section
      style={{
        background: "linear-gradient(135deg, var(--forest-deep) 0%, var(--forest) 60%, var(--green-mid) 100%)",
        padding: "7rem 0 8rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dekoratif arka plan */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute", right: "-5rem", top: "-5rem",
          width: "28rem", height: "28rem", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container-aygm" style={{ position: "relative", zIndex: 1 }}>
        <div className="cta-grid" style={{ display: "grid", gap: "3rem", alignItems: "center" }}>

          {/* Sol: Metin */}
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.25)",
              borderRadius: "100px", padding: "0.35rem 1rem",
              fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em",
              textTransform: "uppercase", color: "var(--gold)", marginBottom: "1.5rem",
            }}>
              <FaTrain style={{ fontSize: 9 }} />
              Resmi Proje Sitesi
            </div>

            <h2
              style={{
                fontFamily: "var(--font-heading)", fontWeight: 900,
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "white",
                lineHeight: 1.2, marginBottom: "1.25rem",
              }}
            >
              Projeyi Yakından<br />
              <span style={{ color: "var(--mint)" }}>Takip Edin</span>
            </h2>

            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", lineHeight: 1.75, maxWidth: "38rem", marginBottom: "2.5rem" }}>
              Güzergah haritaları, istasyon detayları, inşaat ilerleme raporları
              ve resmi duyurular için projemizi takipte kalın.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              <Link href="/guzergah" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                <FaMapMarkedAlt style={{ fontSize: 13 }} />
                Güzergah Haritası
                <FaArrowRight style={{ fontSize: 11 }} />
              </Link>
              <Link href="/iletisim" className="btn-secondary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                <FaEnvelope style={{ fontSize: 12 }} />
                İletişime Geç
              </Link>
            </div>
          </div>

          {/* Sağ: İstatistik kutusu — mobilde gizli */}
          <div className="hidden md:flex" style={{
            flexDirection: "column", gap: "1rem",
            flexShrink: 0,
          }}>
            {[
              { value: "10 km", label: "Raylı Bağlantı" },
              { value: "10", label: "Durak Noktası" },
              { value: "2027", label: "Kente Açılıyor" },
            ].map((stat) => (
              <div key={stat.label} style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(168,213,186,0.15)",
                borderRadius: "1rem",
                padding: "1.25rem 2rem",
                textAlign: "center",
                minWidth: "140px",
              }}>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.75rem", color: "var(--mint)", lineHeight: 1 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.45)", marginTop: "0.35rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
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
