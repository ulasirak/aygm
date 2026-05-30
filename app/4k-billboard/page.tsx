"use client";

// ─── GÜNCELLEME İÇİN BURAYA BAK ───────────────────────────────────────────────
const PROGRESS = 42; // İnşaat ilerleme yüzdesi (0–100)
// ──────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";

const STATIONS = [
  { id: 0, name: "Yeni Sanayi",    x: 120,  y: 1820 },
  { id: 1, name: "ASLİDAŞ",        x: 320,  y: 1600 },
  { id: 2, name: "TÜYAP",          x: 560,  y: 1430 },
  { id: 3, name: "Banliyö",        x: 820,  y: 1290, transfer: true },
  { id: 4, name: "Çimento",        x: 1100, y: 1160 },
  { id: 5, name: "Novaland",       x: 1400, y: 1070 },
  { id: 6, name: "Otogar",         x: 1700, y: 1010 },
  { id: 7, name: "Ecdad Bahçesi",  x: 2000, y: 980  },
  { id: 8, name: "Real",           x: 2340, y: 990  },
  { id: 9, name: "Konya Stadyumu", x: 2680, y: 1020 },
];

// Toplam hat uzunluğu boyunca PROGRESS % kadarını hesapla
function getCompletedLength(pts: { x: number; y: number }[], pct: number) {
  let total = 0;
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i].x - pts[i - 1].x;
    const dy = pts[i].y - pts[i - 1].y;
    total += Math.sqrt(dx * dx + dy * dy);
  }
  return total * (pct / 100);
}

function buildPath(pts: { x: number; y: number }[]) {
  return pts
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");
}

// Tamamlanan ve kalan segmentleri ayır
function splitSegments(
  pts: { x: number; y: number }[],
  pct: number
): { done: string; remaining: string } {
  const target = getCompletedLength(pts, pct);
  let covered = 0;
  const donePts: { x: number; y: number }[] = [pts[0]];
  const remPts: { x: number; y: number }[] = [];

  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i].x - pts[i - 1].x;
    const dy = pts[i].y - pts[i - 1].y;
    const seg = Math.sqrt(dx * dx + dy * dy);

    if (covered + seg <= target) {
      covered += seg;
      donePts.push(pts[i]);
    } else {
      const t = (target - covered) / seg;
      const mid = {
        x: pts[i - 1].x + dx * t,
        y: pts[i - 1].y + dy * t,
      };
      donePts.push(mid);
      remPts.push(mid, ...pts.slice(i));
      break;
    }
  }

  return {
    done: buildPath(donePts),
    remaining: remPts.length > 1 ? buildPath(remPts) : "",
  };
}

export default function BillboardPage() {
  const { done, remaining } = splitSegments(STATIONS, PROGRESS);

  // Glow animasyonu için stroke-dashoffset trick — tüm done path boyunu hesapla
  const doneRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    // Kiosk: scroll engelle
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div style={{
      width: "3840px",
      height: "2160px",
      background: "#000",
      overflow: "hidden",
      position: "relative",
      fontFamily: "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif",
      userSelect: "none",
    }}>

      {/* ── Keyframe animasyonları ── */}
      <style>{`
        @keyframes glowPulse {
          0%, 100% { filter: drop-shadow(0 0 18px #00ff88) drop-shadow(0 0 40px #00cc66); opacity: 1; }
          50%       { filter: drop-shadow(0 0 36px #00ff88) drop-shadow(0 0 80px #00cc66); opacity: 0.85; }
        }
        @keyframes lightTravel {
          0%   { stroke-dashoffset: 2000; opacity: 0.9; }
          100% { stroke-dashoffset: -200; opacity: 0; }
        }
        @keyframes countUp {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes scanline {
          0%   { transform: translateY(-2160px); }
          100% { transform: translateY(2160px); }
        }
        @keyframes borderGlow {
          0%, 100% { box-shadow: 0 0 60px rgba(0,255,136,0.15), inset 0 0 60px rgba(0,255,136,0.03); }
          50%       { box-shadow: 0 0 120px rgba(0,255,136,0.3), inset 0 0 120px rgba(0,255,136,0.06); }
        }
        @keyframes dotPulse {
          0%, 100% { r: 22; opacity: 1; }
          50%       { r: 30; opacity: 0.7; }
        }
      `}</style>

      {/* Arka plan ızgara */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04 }}>
        <defs>
          <pattern id="grid" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M 120 0 L 0 0 0 120" fill="none" stroke="#00ff88" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Tarama çizgisi efekti */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)",
        zIndex: 10,
      }} />

      {/* Sol panel — başlık + istatistik */}
      <div style={{
        position: "absolute",
        left: 160, top: 160,
        width: 1100,
        display: "flex", flexDirection: "column", gap: 0,
      }}>

        {/* Üst etiket */}
        <div style={{
          fontSize: 38, fontWeight: 700, letterSpacing: "0.3em",
          color: "#00ff88", textTransform: "uppercase", opacity: 0.7,
          marginBottom: 32,
        }}>
          T.C. Ulaştırma ve Altyapı Bakanlığı — AYGM
        </div>

        {/* Ana başlık */}
        <div style={{
          fontSize: 148, fontWeight: 900, lineHeight: 1,
          color: "#ffffff",
          letterSpacing: "-0.02em",
          textShadow: "0 0 80px rgba(255,255,255,0.15)",
        }}>
          KONYA
        </div>
        <div style={{
          fontSize: 148, fontWeight: 900, lineHeight: 1,
          color: "#ffffff",
          letterSpacing: "-0.02em",
          textShadow: "0 0 80px rgba(255,255,255,0.15)",
        }}>
          TRAMVAY
        </div>
        <div style={{
          fontSize: 80, fontWeight: 800, lineHeight: 1.2,
          color: "#00ff88",
          letterSpacing: "0.04em",
          marginTop: 16,
          textShadow: "0 0 40px rgba(0,255,136,0.5)",
        }}>
          2. ETAP
        </div>

        {/* Ayırıcı çizgi */}
        <div style={{
          width: 900, height: 3,
          background: "linear-gradient(90deg, #00ff88, transparent)",
          marginTop: 60, marginBottom: 60,
        }} />

        {/* İlerleme kartı */}
        <div style={{
          background: "rgba(0,255,136,0.05)",
          border: "2px solid rgba(0,255,136,0.2)",
          borderRadius: 32,
          padding: "60px 80px",
          animation: "borderGlow 3s ease-in-out infinite",
        }}>
          <div style={{ fontSize: 36, fontWeight: 600, color: "rgba(255,255,255,0.5)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 24 }}>
            İnşaat İlerlemesi
          </div>
          <div style={{
            fontSize: 240, fontWeight: 900, lineHeight: 0.9,
            color: "#00ff88",
            textShadow: "0 0 100px rgba(0,255,136,0.6), 0 0 200px rgba(0,255,136,0.3)",
            animation: "countUp 1s ease-out both",
          }}>
            %{PROGRESS}
          </div>

          {/* Progress bar */}
          <div style={{ marginTop: 48, width: "100%", height: 24, background: "rgba(255,255,255,0.08)", borderRadius: 12, overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${PROGRESS}%`,
              background: "linear-gradient(90deg, #006633, #00ff88)",
              borderRadius: 12,
              boxShadow: "0 0 30px rgba(0,255,136,0.6)",
              transition: "width 2s ease",
            }} />
          </div>

          {/* Alt metrikler */}
          <div style={{ display: "flex", gap: 60, marginTop: 56 }}>
            {[
              { val: "10 km", lbl: "Hat Uzunluğu" },
              { val: "10",    lbl: "İstasyon" },
              { val: "2027",  lbl: "Hedef Yıl" },
            ].map(({ val, lbl }) => (
              <div key={lbl}>
                <div style={{ fontSize: 68, fontWeight: 900, color: "#fff", lineHeight: 1 }}>{val}</div>
                <div style={{ fontSize: 30, fontWeight: 400, color: "rgba(255,255,255,0.4)", marginTop: 8 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Alt bilgi */}
        <div style={{ marginTop: 60, fontSize: 32, color: "rgba(255,255,255,0.25)", lineHeight: 1.8 }}>
          Sözleşme Bedeli: 9.059.553.000 TL<br />
          Yüklenici: Uğursal Elektrik + ONH İnşaat OG<br />
          Temel Atma: 7 Temmuz 2025
        </div>
      </div>

      {/* Sağ panel — Güzergah haritası */}
      <div style={{
        position: "absolute",
        right: 100, top: 100,
        width: 2300, height: 1960,
      }}>

        <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: "0.25em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: 24, paddingLeft: 80 }}>
          Güzergah Haritası
        </div>

        <svg
          viewBox="0 0 2800 2060"
          width="2300"
          height="1900"
          style={{ overflow: "visible" }}
        >
          {/* Arka plan parçaları */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="glowStrong">
              <feGaussianBlur stdDeviation="16" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <linearGradient id="completedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#006633" />
              <stop offset="100%" stopColor="#00ff88" />
            </linearGradient>
          </defs>

          {/* Gölge izi */}
          <path d={buildPath(STATIONS)} fill="none" stroke="rgba(0,255,136,0.08)" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />

          {/* Tamamlanmamış kısım — kesik soluk çizgi */}
          {remaining && (
            <path
              d={remaining}
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="40 30"
            />
          )}

          {/* Tamamlanan kısım — parlak */}
          <path
            ref={doneRef}
            d={done}
            fill="none"
            stroke="url(#completedGrad)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glowStrong)"
            style={{ animation: "glowPulse 2.5s ease-in-out infinite" }}
          />

          {/* Işık akan animasyon katmanı */}
          <path
            d={done}
            fill="none"
            stroke="#ffffff"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="200 2000"
            style={{ animation: "lightTravel 3s linear infinite" }}
          />

          {/* İstasyon noktaları */}
          {STATIONS.map((s, i) => {
            const completedCount = (PROGRESS / 100) * (STATIONS.length - 1);
            const isDone = i <= Math.floor(completedCount);
            const isActive = i === Math.floor(completedCount);

            return (
              <g key={s.id}>
                {/* Dış halka */}
                <circle
                  cx={s.x} cy={s.y} r={isDone ? 32 : 22}
                  fill="none"
                  stroke={isDone ? "#00ff88" : "rgba(255,255,255,0.2)"}
                  strokeWidth={isDone ? 4 : 2}
                  filter={isDone ? "url(#glow)" : undefined}
                  style={isActive ? { animation: "dotPulse 1.5s ease-in-out infinite" } : undefined}
                />
                {/* İç dolu */}
                <circle
                  cx={s.x} cy={s.y} r={isDone ? 18 : 10}
                  fill={isDone ? "#00ff88" : "rgba(255,255,255,0.15)"}
                  filter={isDone ? "url(#glow)" : undefined}
                />
                {/* Transfer ikonu */}
                {s.transfer && (
                  <circle cx={s.x} cy={s.y} r={42} fill="none" stroke="#f59e0b" strokeWidth={3} strokeDasharray="10 6" filter="url(#glow)" />
                )}
                {/* İstasyon adı */}
                <text
                  x={s.x}
                  y={s.y - 52}
                  textAnchor="middle"
                  fill={isDone ? "#ffffff" : "rgba(255,255,255,0.35)"}
                  fontSize={isDone ? 34 : 28}
                  fontWeight={isDone ? 700 : 400}
                  fontFamily="'IBM Plex Sans', sans-serif"
                  filter={isDone ? "url(#glow)" : undefined}
                >
                  {s.name}
                </text>
              </g>
            );
          })}

          {/* Yön okları */}
          {STATIONS.slice(0, -1).map((s, i) => {
            const nx = STATIONS[i + 1];
            const mx = (s.x + nx.x) / 2;
            const my = (s.y + nx.y) / 2;
            const ang = Math.atan2(nx.y - s.y, nx.x - s.x) * (180 / Math.PI);
            const completedCount = (PROGRESS / 100) * (STATIONS.length - 1);
            const isDone = i < Math.floor(completedCount);
            return (
              <text
                key={i}
                x={mx} y={my}
                textAnchor="middle" dominantBaseline="middle"
                fill={isDone ? "rgba(0,255,136,0.6)" : "rgba(255,255,255,0.15)"}
                fontSize={24}
                transform={`rotate(${ang}, ${mx}, ${my})`}
                fontFamily="monospace"
              >▶</text>
            );
          })}

          {/* Başlangıç / Bitiş etiketleri */}
          <text x={120} y={1900} textAnchor="middle" fill="#00ff88" fontSize={36} fontWeight={800} fontFamily="'IBM Plex Sans', sans-serif">BAŞLANGIÇ</text>
          <text x={2680} y={1100} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize={36} fontWeight={800} fontFamily="'IBM Plex Sans', sans-serif">HEDEf</text>
        </svg>
      </div>

      {/* Alt bilgi şeridi */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        height: 100,
        background: "rgba(0,255,136,0.04)",
        borderTop: "1px solid rgba(0,255,136,0.12)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 160px",
      }}>
        <span style={{ fontSize: 30, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em" }}>
          aygm.uab.gov.tr
        </span>
        <span style={{ fontSize: 30, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em" }}>
          Konya Stadyum–Şehir Hastanesi Tramvay Hattı 2. Etap
        </span>
        <span style={{ fontSize: 30, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em" }}>
          {new Date().toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" })}
        </span>
      </div>

    </div>
  );
}
