"use client";

// ─── GÜNCELLEME İÇİN SADECE BU DEĞERİ DEĞİŞTİR ──────────────────────────────
const PROGRESS = 42;
// ──────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";

const STATIONS = [
  { id: 0, name: "Yeni Sanayi",    x: 190,  y: 420 },
  { id: 1, name: "ASLİDAŞ",        x: 460,  y: 355 },
  { id: 2, name: "TÜYAP",          x: 750,  y: 570 },
  { id: 3, name: "Banliyö",        x: 1050, y: 385, transfer: true },
  { id: 4, name: "Çimento",        x: 1320, y: 275 },
  { id: 5, name: "Novaland",       x: 1590, y: 345 },
  { id: 6, name: "Otogar",         x: 1860, y: 255 },
  { id: 7, name: "Ecdad Bahçesi",  x: 2110, y: 375 },
  { id: 8, name: "Real",           x: 2360, y: 410 },
  { id: 9, name: "Konya Stadyumu", x: 2610, y: 430 },
];

function buildPath(pts: { x: number; y: number }[]) {
  return pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
}

function splitRoute(pts: { x: number; y: number }[], pct: number) {
  let total = 0;
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i].x - pts[i - 1].x, dy = pts[i].y - pts[i - 1].y;
    total += Math.sqrt(dx * dx + dy * dy);
  }
  const target = total * (pct / 100);
  let covered = 0;
  const done: { x: number; y: number }[] = [pts[0]];
  const rem: { x: number; y: number }[] = [];
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i].x - pts[i - 1].x, dy = pts[i].y - pts[i - 1].y;
    const seg = Math.sqrt(dx * dx + dy * dy);
    if (covered + seg <= target) { covered += seg; done.push(pts[i]); }
    else {
      const t = (target - covered) / seg;
      done.push({ x: pts[i - 1].x + dx * t, y: pts[i - 1].y + dy * t });
      rem.push({ x: pts[i - 1].x + dx * t, y: pts[i - 1].y + dy * t }, ...pts.slice(i));
      break;
    }
  }
  return { done: buildPath(done), remaining: rem.length > 1 ? buildPath(rem) : "" };
}

// Tek bir buğday başağı SVG'si — cx/cy merkez, h yükseklik
function WheatStalk({ cx, cy, h, angle = 0, opacity = 0.07 }: {
  cx: number; cy: number; h: number; angle?: number; opacity?: number;
}) {
  const grainH = h * 0.45;
  const grainCount = 7;
  const spacing = grainH / grainCount;
  const grainW = h * 0.09;
  const grainL = h * 0.16;

  return (
    <g transform={`translate(${cx},${cy}) rotate(${angle})`} opacity={opacity} fill="none" stroke="#166534" strokeLinecap="round">
      {/* Gövde */}
      <line x1={0} y1={0} x2={0} y2={-h} strokeWidth={h * 0.025} />
      {/* Yaprak — sol */}
      <path d={`M 0 ${-h * 0.3} Q ${-h * 0.22} ${-h * 0.22} ${-h * 0.12} ${-h * 0.18}`} strokeWidth={h * 0.018} />
      {/* Yaprak — sağ */}
      <path d={`M 0 ${-h * 0.52} Q ${h * 0.22} ${-h * 0.44} ${h * 0.14} ${-h * 0.38}`} strokeWidth={h * 0.018} />
      {/* Daneler */}
      {Array.from({ length: grainCount }).map((_, i) => {
        const y = -h + i * spacing + spacing * 0.5;
        const side = i % 2 === 0 ? 1 : -1;
        const tilt = side * 18;
        return (
          <ellipse
            key={i}
            cx={side * grainW * 0.6}
            cy={y}
            rx={grainW}
            ry={grainL}
            transform={`rotate(${tilt}, ${side * grainW * 0.6}, ${y})`}
            strokeWidth={h * 0.016}
          />
        );
      })}
      {/* Tepe danesi */}
      <ellipse cx={0} cy={-h} rx={grainW * 0.7} ry={grainL * 0.7} strokeWidth={h * 0.018} />
    </g>
  );
}

export default function BillboardPage() {
  const [clock, setClock] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const tick = () => setClock(new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    tick();
    const clockId = setInterval(tick, 1000);

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw-billboard.js").catch(() => {});
    }

    let cur = 0;
    const step = PROGRESS / 90;
    const countId = setInterval(() => {
      cur = Math.min(cur + step, PROGRESS);
      setCount(Math.floor(cur));
      if (cur >= PROGRESS) clearInterval(countId);
    }, 20);

    return () => { clearInterval(clockId); clearInterval(countId); document.body.style.overflow = ""; };
  }, []);

  const { done, remaining } = splitRoute(STATIONS, PROGRESS);
  const completedIdx = Math.floor((PROGRESS / 100) * (STATIONS.length - 1));
  const FOOTER = 190;
  const r = 340;
  const circ = 2 * Math.PI * r;
  const arcOffset = circ - (circ * count) / 100;

  return (
    <div style={{
      width: "3840px", height: "2160px",
      background: "#f0fdf4",
      overflow: "hidden", position: "relative",
      fontFamily: "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif",
      userSelect: "none",
    }}>

      <style>{`
        @keyframes trainMove {
          0%   { stroke-dashoffset: 2200; }
          100% { stroke-dashoffset: -400; }
        }
        @keyframes routeIn {
          from { stroke-dasharray: 5000 5000; stroke-dashoffset: 5000; }
          to   { stroke-dasharray: 5000 5000; stroke-dashoffset: 0; }
        }
        @keyframes barGrow {
          from { width: 0%; }
          to   { width: ${PROGRESS}%; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes stationPop {
          0%,100% { r: 30; }
          50%     { r: 38; }
        }
      `}</style>

      {/* ══ SOL PANEL ══════════════════════════════════════════════════════════ */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, width: 1620, bottom: FOOTER,
        display: "flex", flexDirection: "column",
        padding: "100px 120px 80px 120px",
        borderRight: "1.5px solid #bbf7d0",
        overflow: "hidden",
      }}>

        {/* ── Buğday başakları arka plan ── */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          viewBox="0 0 1620 1970" preserveAspectRatio="xMidYMid slice">
          <WheatStalk cx={180}  cy={1820} h={560} angle={-8}  opacity={0.055} />
          <WheatStalk cx={380}  cy={1920} h={700} angle={5}   opacity={0.045} />
          <WheatStalk cx={580}  cy={1860} h={480} angle={-3}  opacity={0.06}  />
          <WheatStalk cx={800}  cy={1950} h={620} angle={8}   opacity={0.04}  />
          <WheatStalk cx={1020} cy={1880} h={540} angle={-6}  opacity={0.05}  />
          <WheatStalk cx={1240} cy={1930} h={590} angle={4}   opacity={0.045} />
          <WheatStalk cx={1460} cy={1870} h={460} angle={-10} opacity={0.055} />
          <WheatStalk cx={90}   cy={1700} h={380} angle={12}  opacity={0.03}  />
          <WheatStalk cx={700}  cy={1750} h={420} angle={-5}  opacity={0.035} />
          <WheatStalk cx={1350} cy={1760} h={400} angle={7}   opacity={0.03}  />
        </svg>

        {/* Etiket */}
        <div style={{
          fontSize: 36, fontWeight: 700, letterSpacing: "0.22em",
          color: "#1a5c2e", textTransform: "uppercase", marginBottom: 40,
          animation: "fadeIn 0.6s ease 0.1s both", position: "relative",
        }}>
          T.C. Ulaştırma ve Altyapı Bakanlığı
        </div>

        {/* Başlık */}
        <div style={{ animation: "fadeIn 0.6s ease 0.2s both", position: "relative" }}>
          <div style={{ fontSize: 200, fontWeight: 900, lineHeight: 0.86, color: "#111827", letterSpacing: "-0.03em" }}>
            KONYA
          </div>
          <div style={{ fontSize: 200, fontWeight: 900, lineHeight: 0.86, color: "#111827", letterSpacing: "-0.03em" }}>
            TRAMVAY
          </div>
          <div style={{ fontSize: 112, fontWeight: 900, color: "#1a5c2e", letterSpacing: "0.03em", marginTop: 14 }}>
            2. ETAP
          </div>
        </div>

        {/* Ayırıcı */}
        <div style={{
          width: 140, height: 5, background: "#1a5c2e", borderRadius: 3,
          margin: "50px 0", animation: "fadeIn 0.6s ease 0.35s both", position: "relative",
        }} />

        {/* Gauge + istatistikler */}
        <div style={{ display: "flex", alignItems: "center", gap: 70, animation: "fadeIn 0.6s ease 0.45s both", position: "relative" }}>

          {/* Dairesel gösterge */}
          <svg width="760" height="760" viewBox="0 0 760 760" style={{ flexShrink: 0 }}>
            <circle cx="380" cy="380" r={r} fill="none" stroke="#dcfce7" strokeWidth="26" />
            <circle cx="380" cy="380" r={r} fill="none"
              stroke="#1a5c2e" strokeWidth="26" strokeLinecap="round"
              strokeDasharray={circ} strokeDashoffset={arcOffset}
              transform="rotate(-90 380 380)"
              style={{ transition: "stroke-dashoffset 0.025s linear" }}
            />
            <text x="380" y="345" textAnchor="middle" fill="#111827" fontSize="184" fontWeight="900" fontFamily="IBM Plex Sans,Arial">
              {count}
            </text>
            <text x="380" y="460" textAnchor="middle" fill="#111827" fontSize="80" fontWeight="700" fontFamily="IBM Plex Sans,Arial">
              %
            </text>
            <text x="380" y="540" textAnchor="middle" fill="#1a5c2e" fontSize="42" fontWeight="700" fontFamily="IBM Plex Sans,Arial" letterSpacing="5">
              TAMAMLANDI
            </text>
          </svg>

          {/* Sayılar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {[
              { val: "10 km",  lbl: "Hat Uzunluğu" },
              { val: "10",     lbl: "İstasyon"      },
              { val: "60.000", lbl: "Yolcu / Gün"   },
              { val: "2027",   lbl: "Hedef Yıl"     },
            ].map(({ val, lbl }, i) => (
              <div key={lbl} style={{
                display: "flex", alignItems: "baseline", gap: 20,
                paddingBottom: 28,
                borderBottom: i < 3 ? "1.5px solid #dcfce7" : "none",
              }}>
                <span style={{ fontSize: 88, fontWeight: 900, color: "#111827", lineHeight: 1 }}>{val}</span>
                <span style={{ fontSize: 40, color: "#6b7280", fontWeight: 500 }}>{lbl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: "auto", animation: "fadeIn 0.6s ease 0.7s both", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <span style={{ fontSize: 34, color: "#6b7280" }}>İnşaat İlerlemesi</span>
            <span style={{ fontSize: 34, color: "#1a5c2e", fontWeight: 700 }}>Devam Ediyor</span>
          </div>
          <div style={{ height: 20, background: "#dcfce7", borderRadius: 10, overflow: "hidden" }}>
            <div style={{
              height: "100%", background: "#1a5c2e", borderRadius: 10,
              animation: "barGrow 1.8s ease 0.8s both",
              width: `${PROGRESS}%`,
            }} />
          </div>
        </div>
      </div>

      {/* ══ SAĞ PANEL — Harita ══════════════════════════════════════════════════ */}
      <div style={{
        position: "absolute",
        top: 0, left: 1622, right: 0, bottom: FOOTER,
        display: "flex", flexDirection: "column",
        padding: "70px 90px 50px 90px",
        background: "#ecfdf5",
      }}>

        <div style={{
          fontSize: 40, fontWeight: 700, letterSpacing: "0.16em",
          color: "#6b7280", textTransform: "uppercase", marginBottom: 28,
        }}>
          Güzergah Haritası · 10 İstasyon
        </div>

        {/* SVG Harita */}
        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <svg viewBox="0 0 2800 700" style={{ width: "100%", overflow: "visible" }}>

            {remaining && (
              <path d={remaining} fill="none"
                stroke="#d1d5db" strokeWidth="12"
                strokeDasharray="42 26" strokeLinecap="round" />
            )}

            <path d={done} fill="none"
              stroke="#1a5c2e" strokeWidth="16" strokeLinecap="round"
              style={{ animation: "routeIn 2s ease 0.3s both" }}
            />

            <path d={done} fill="none"
              stroke="rgba(255,255,255,0.9)" strokeWidth="7"
              strokeLinecap="round" strokeDasharray="160 3000"
              style={{ animation: "trainMove 3s linear infinite" }}
            />

            {STATIONS.map((s, i) => {
              const isDone = i <= completedIdx;
              const isActive = i === completedIdx;
              return (
                <g key={s.id}>
                  {s.transfer && (
                    <circle cx={s.x} cy={s.y} r={52} fill="none"
                      stroke="#f59e0b" strokeWidth="3.5" strokeDasharray="12 7" />
                  )}
                  <circle cx={s.x} cy={s.y}
                    r={isDone ? 32 : 18}
                    fill={isDone ? "#1a5c2e" : "#f0fdf4"}
                    stroke={isDone ? "#1a5c2e" : "#86efac"}
                    strokeWidth={isDone ? 0 : 3.5}
                    style={isActive ? { animation: "stationPop 1.6s ease-in-out infinite" } : undefined}
                  />
                  {isActive && <circle cx={s.x} cy={s.y} r={13} fill="#f0fdf4" />}

                  <text x={s.x} y={s.y - 62}
                    textAnchor="middle"
                    fill={isDone ? "#111827" : "#9ca3af"}
                    fontSize={isDone ? 44 : 34}
                    fontWeight={isDone ? 700 : 400}
                    fontFamily="IBM Plex Sans, Arial">
                    {s.name}
                  </text>

                  {s.transfer && (
                    <text x={s.x} y={s.y + 80}
                      textAnchor="middle" fill="#d97706" fontSize="26"
                      fontWeight="600" fontFamily="IBM Plex Sans, Arial">
                      KONYARAY aktarma
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Alt bilgi — Yüklenici kaldırıldı, 2 sütun */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 60, paddingTop: 40, borderTop: "1.5px solid #bbf7d0",
        }}>
          {[
            { label: "Temel Atma",    val: "7 Temmuz 2025"   },
            { label: "Hat Güzergahı", val: "Karatay — Selçuklu" },
          ].map(({ label, val }) => (
            <div key={label}>
              <div style={{ fontSize: 30, color: "#9ca3af", marginBottom: 10 }}>{label}</div>
              <div style={{ fontSize: 44, fontWeight: 700, color: "#1f2937" }}>{val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ ALT ŞERIT (büyütülmüş) ══════════════════════════════════════════ */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: FOOTER,
        background: "#1a5c2e",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 110px",
      }}>

        {/* Sol: Logo + bakanlık */}
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/aygm-amblem.svg" alt="AYGM"
            style={{ height: 100, filter: "brightness(0) invert(1)", opacity: 0.9 }} />
          <div style={{ width: 2, height: 80, background: "rgba(255,255,255,0.2)" }} />
          <div>
            <div style={{ fontSize: 24, color: "rgba(255,255,255,0.5)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
              T.C. Ulaştırma ve Altyapı Bakanlığı
            </div>
            <div style={{ fontSize: 38, fontWeight: 800, color: "#ffffff", marginTop: 4 }}>
              Altyapı Yatırımları Genel Müdürlüğü
            </div>
          </div>
        </div>

        {/* Orta: website */}
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em" }}>
          aygm.uab.gov.tr
        </div>

        {/* Sağ: progress + saat */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <span style={{ fontSize: 30, color: "rgba(255,255,255,0.5)" }}>İnşaat Devam Ediyor</span>
            <div style={{ width: 300, height: 12, background: "rgba(255,255,255,0.15)", borderRadius: 6, overflow: "hidden" }}>
              <div style={{ width: `${PROGRESS}%`, height: "100%", background: "#86efac", borderRadius: 6 }} />
            </div>
          </div>
          <div style={{
            fontSize: 64, fontWeight: 900, color: "#ffffff",
            fontVariantNumeric: "tabular-nums", lineHeight: 1,
            letterSpacing: "0.04em",
          }}>
            {clock}
          </div>
        </div>

      </div>

    </div>
  );
}
