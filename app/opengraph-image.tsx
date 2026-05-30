import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Konya Tramvay 2. Etap | AYGM — T.C. Ulaştırma ve Altyapı Bakanlığı";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  // SVG'yi fetch edip base64 data URL'e çevir
  const baseUrl = "https://aygm.vercel.app";
  let logoDataUrl = "";
  try {
    const res = await fetch(`${baseUrl}/aygm-logo.svg`);
    const svgText = await res.text();
    const base64 = btoa(unescape(encodeURIComponent(svgText)));
    logoDataUrl = `data:image/svg+xml;base64,${base64}`;
  } catch {
    logoDataUrl = "";
  }

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
          position: "absolute", top: -120, right: -120,
          width: 550, height: 550, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,76,0.13) 0%, transparent 65%)",
          display: "flex",
        }} />

        {/* Sol kenar çizgi */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 5,
          background: "linear-gradient(to bottom, #D4A94E 0%, #A8D5BA 50%, transparent 100%)",
          display: "flex",
        }} />

        {/* İçerik */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "50px 72px 50px 78px",
          width: "100%",
          zIndex: 1,
        }}>

          {/* Üst: Bakanlık logosu */}
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {logoDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoDataUrl}
                width={280}
                height={90}
                style={{ objectFit: "contain", filter: "brightness(0) invert(1)", opacity: 0.92 }}
                alt="T.C. Ulaştırma ve Altyapı Bakanlığı"
              />
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <span style={{ color: "white", fontSize: 16, fontWeight: 700, fontFamily: "sans-serif" }}>
                  T.C. ULAŞTIRMA VE ALTYAPI BAKANLIĞI
                </span>
                <span style={{ color: "#A8D5BA", fontSize: 13, letterSpacing: "0.1em", fontFamily: "sans-serif" }}>
                  ALTYAPI YATIRIMLARI GENEL MÜDÜRLÜĞÜ (AYGM)
                </span>
              </div>
            )}
            <div style={{ width: 1, height: 52, background: "rgba(255,255,255,0.12)", display: "flex", marginLeft: 8 }} />
            <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, letterSpacing: "0.06em", fontFamily: "sans-serif" }}>
              Resmi Proje Bilgi Sitesi
            </span>
          </div>

          {/* Orta: Proje adı */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{
              display: "flex", alignItems: "center",
              background: "rgba(212,169,78,0.12)", border: "1px solid rgba(212,169,78,0.35)",
              borderRadius: 100, padding: "5px 18px", width: "fit-content",
            }}>
              <span style={{ color: "#D4A94E", fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", fontFamily: "sans-serif" }}>
                KONYA TRAMVAY 2. ETAP
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.08 }}>
              <span style={{ color: "white", fontSize: 64, fontWeight: 900, fontFamily: "serif", letterSpacing: "-0.02em" }}>
                Stadyum – Şehir
              </span>
              <span style={{ color: "#A8D5BA", fontSize: 64, fontWeight: 900, fontFamily: "serif", letterSpacing: "-0.02em" }}>
                Hastanesi Tramvayı
              </span>
            </div>
          </div>

          {/* Alt: İstatistikler + domain */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: 44 }}>
              {[
                { v: "10 km", l: "Yeni Hat" },
                { v: "10", l: "İstasyon" },
                { v: "60.000", l: "Günlük Yolcu" },
                { v: "2027", l: "Hedef Yıl" },
              ].map((s) => (
                <div key={s.l} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{ color: "#A8D5BA", fontSize: 28, fontWeight: 900, fontFamily: "serif" }}>{s.v}</span>
                  <span style={{ color: "rgba(255,255,255,0.38)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "sans-serif" }}>{s.l}</span>
                </div>
              ))}
            </div>
            <div style={{
              background: "rgba(168,213,186,0.08)", border: "1px solid rgba(168,213,186,0.18)",
              borderRadius: 8, padding: "8px 16px",
              color: "rgba(255,255,255,0.35)", fontSize: 13, fontFamily: "sans-serif",
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
