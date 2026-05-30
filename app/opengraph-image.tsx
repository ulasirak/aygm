import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Konya Tramvay 2. Etap | AYGM — T.C. Ulaştırma ve Altyapı Bakanlığı";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#154530",
          display: "flex",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Izgara arka plan */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          display: "flex",
        }} />

        {/* Sağ üst altın dekor */}
        <div style={{
          position: "absolute", top: -100, right: -100,
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 65%)",
          display: "flex",
        }} />

        {/* Sol alt yeşil dekor */}
        <div style={{
          position: "absolute", bottom: -80, left: -80,
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(82,183,136,0.1) 0%, transparent 65%)",
          display: "flex",
        }} />

        {/* Sol kenar çizgi */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0,
          width: 6,
          background: "linear-gradient(to bottom, #D4A94E, #A8D5BA, transparent)",
          display: "flex",
        }} />

        {/* İçerik */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "52px 72px 52px 78px",
          width: "100%",
          zIndex: 1,
        }}>

          {/* Üst: TC Amblemi benzeri + Bakanlık adı */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 8,
            }}>
              {/* Amblem yerine TC rozeti */}
              <div style={{
                width: 56, height: 56,
                borderRadius: "50%",
                border: "2px solid rgba(212,169,78,0.6)",
                background: "rgba(212,169,78,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                color: "#D4A94E",
                fontWeight: 900,
                fontFamily: "serif",
                letterSpacing: "-1px",
              }}>
                TC
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <span style={{
                  color: "rgba(255,255,255,0.95)",
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  fontFamily: "sans-serif",
                }}>
                  T.C. ULAŞTIRMA VE ALTYAPI BAKANLIĞI
                </span>
                <span style={{
                  color: "#A8D5BA",
                  fontSize: 13,
                  letterSpacing: "0.12em",
                  opacity: 0.75,
                  fontFamily: "sans-serif",
                }}>
                  ALTYAPI YATIRIMLARI GENEL MÜDÜRLÜĞÜ — AYGM
                </span>
              </div>
            </div>

            {/* İnce altın çizgi */}
            <div style={{
              width: "100%", height: 1,
              background: "linear-gradient(90deg, rgba(212,169,78,0.5) 0%, transparent 60%)",
              marginTop: 16,
              display: "flex",
            }} />
          </div>

          {/* Orta: Proje başlığı */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(212,169,78,0.1)",
              border: "1px solid rgba(212,169,78,0.35)",
              borderRadius: 100,
              padding: "5px 18px",
              width: "fit-content",
            }}>
              <span style={{
                color: "#D4A94E",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.15em",
                fontFamily: "sans-serif",
              }}>
                RESMİ PROJE BİLGİ SİTESİ
              </span>
            </div>

            <div style={{
              color: "white",
              fontSize: 62,
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              fontFamily: "serif",
              display: "flex",
              flexDirection: "column",
            }}>
              <span>Konya Tramvay</span>
              <span style={{ color: "#A8D5BA" }}>2. Etap Projesi</span>
            </div>

            <div style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: 20,
              fontFamily: "sans-serif",
              fontWeight: 400,
            }}>
              Stadyum – Şehir Hastanesi Tramvay Hattı
            </div>
          </div>

          {/* Alt: İstatistikler + domain */}
          <div style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", gap: 40 }}>
              {[
                { v: "10 km", l: "Yeni Hat" },
                { v: "10", l: "İstasyon" },
                { v: "60.000", l: "Günlük Yolcu" },
                { v: "2027", l: "Hedef Yıl" },
              ].map((s) => (
                <div key={s.l} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <span style={{ color: "#A8D5BA", fontSize: 30, fontWeight: 900, fontFamily: "serif" }}>
                    {s.v}
                  </span>
                  <span style={{
                    color: "rgba(255,255,255,0.4)",
                    fontSize: 12,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontFamily: "sans-serif",
                  }}>
                    {s.l}
                  </span>
                </div>
              ))}
            </div>

            <div style={{
              background: "rgba(168,213,186,0.08)",
              border: "1px solid rgba(168,213,186,0.2)",
              borderRadius: 8,
              padding: "8px 16px",
              color: "rgba(255,255,255,0.4)",
              fontSize: 13,
              letterSpacing: "0.04em",
              fontFamily: "sans-serif",
            }}>
              aygm.vercel.app
            </div>
          </div>

        </div>
      </div>
    ),
    { ...size }
  );
}
