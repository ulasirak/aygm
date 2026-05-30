import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Konya Tramvay 2. Etap | AYGM";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "linear-gradient(135deg, #154530 0%, #1D5C3A 55%, #3A8A50 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 72px",
          fontFamily: "serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Arka plan ızgara deseni */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Sağ üst dekor */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Sol alt dekor */}
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(168,213,186,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Üst: Logo + Bakanlık adı */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, zIndex: 1 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "rgba(168,213,186,0.15)",
              border: "1.5px solid rgba(168,213,186,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
            }}
          >
            🚊
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 18, fontWeight: 600, letterSpacing: "0.02em" }}>
              T.C. Ulaştırma ve Altyapı Bakanlığı
            </span>
            <span style={{ color: "#A8D5BA", fontSize: 14, letterSpacing: "0.15em", opacity: 0.8, marginTop: 2 }}>
              ALTYAPI YATIRIMLARI GENEL MÜDÜRLÜĞÜ (AYGM)
            </span>
          </div>
        </div>

        {/* Orta: Ana başlık */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "rgba(201,168,76,0.12)",
              border: "1px solid rgba(201,168,76,0.3)",
              borderRadius: 100,
              padding: "6px 20px",
              width: "fit-content",
            }}
          >
            <span style={{ color: "#D4A94E", fontSize: 13, fontWeight: 700, letterSpacing: "0.12em" }}>
              RESMİ PROJE SİTESİ
            </span>
          </div>

          <h1
            style={{
              color: "white",
              fontSize: 64,
              fontWeight: 900,
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
            }}
          >
            Konya Tramvay 2. Etap
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: 24,
              margin: 0,
              fontWeight: 400,
            }}
          >
            Stadyum–Şehir Hastanesi Tramvay Hattı
          </p>
        </div>

        {/* Alt: İstatistikler */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", zIndex: 1 }}>
          <div style={{ display: "flex", gap: 48 }}>
            {[
              { value: "10 km", label: "Yeni Hat" },
              { value: "10", label: "İstasyon" },
              { value: "60.000", label: "Günlük Yolcu" },
              { value: "2027", label: "Hedef Yıl" },
            ].map((s) => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ color: "#A8D5BA", fontSize: 28, fontWeight: 900 }}>{s.value}</span>
                <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              background: "rgba(168,213,186,0.12)",
              border: "1px solid rgba(168,213,186,0.2)",
              borderRadius: 12,
              padding: "10px 20px",
              color: "rgba(255,255,255,0.5)",
              fontSize: 13,
              letterSpacing: "0.04em",
            }}
          >
            konyatramvay.aygm.gov.tr
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
