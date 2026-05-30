"use client";

// ─── GÜNCELLEME İÇİN SADECE BU DEĞERİ DEĞİŞTİR ──────────────────────────────
const PROGRESS = 42;
// ──────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";

// Koordinatlar OSM verilerine göre Konya gerçek haritasından türetilmiştir.
// Güzergah doğudan (Yeni Sanayi) batıya (Stadyum) gitmektedir.
const STATIONS = [
  { id: 0, name: "Yeni Sanayi",    x: 190,  y: 400 },
  { id: 1, name: "ASLİDAŞ",        x: 440,  y: 340 },
  { id: 2, name: "TÜYAP",          x: 720,  y: 540, transfer: false },
  { id: 3, name: "Banliyö",        x: 1010, y: 370, transfer: true  },
  { id: 4, name: "Çimento",        x: 1270, y: 265 },
  { id: 5, name: "Novaland",       x: 1540, y: 330 },
  { id: 6, name: "Otogar",         x: 1800, y: 245 },
  { id: 7, name: "Ecdad Bahçesi",  x: 2060, y: 360 },
  { id: 8, name: "Real",           x: 2300, y: 395 },
  { id: 9, name: "Konya Stadyumu", x: 2550, y: 415 },
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

export default function BillboardPage() {
  const [clock, setClock] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const tick = () => setClock(new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }));
    tick();
    const clockId = setInterval(tick, 1000);

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

  const r = 310;
  const circ = 2 * Math.PI * r;
  const arcOffset = circ - (circ * count) / 100;

  return (
    <div style={{
      width: "3840px",
      height: "2160px",
      background: "#f0fdf4",
      overflow: "hidden",
      position: "relative",
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
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes stationPop {
          0%   { r: 26; }
          50%  { r: 32; }
          100% { r: 26; }
        }
      `}</style>

      {/* ══ ÜST ŞERIT ══════════════════════════════════════════════════════ */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 120,
        background: "#1a5c2e",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 100px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/aygm-logo.svg" alt="AYGM" style={{ height: 56, opacity: 1 }} />
        </div>

        <div style={{ fontSize: 28, fontWeight: 500, color: "rgba(255,255,255,0.7)", letterSpacing: "0.12em" }}>
          Konya Stadyum – Şehir Hastanesi Tramvay Hattı · 2. Etap
        </div>

        <div style={{ fontSize: 52, fontWeight: 700, color: "#ffffff", fontVariantNumeric: "tabular-nums" }}>
          {clock}
        </div>
      </div>

      {/* ══ SOL PANEL ══════════════════════════════════════════════════════ */}
      <div style={{
        position: "absolute",
        top: 120, left: 0, width: 1560, bottom: 130,
        display: "flex", flexDirection: "column",
        padding: "90px 110px 70px 110px",
        borderRight: "1px solid #bbf7d0",
      }}>

        {/* Etiket */}
        <div style={{
          fontSize: 34, fontWeight: 700, letterSpacing: "0.25em",
          color: "#1a5c2e", textTransform: "uppercase", marginBottom: 32,
          animation: "fadeIn 0.6s ease 0.1s both",
        }}>
          T.C. Ulaştırma ve Altyapı Bakanlığı
        </div>

        {/* Başlık */}
        <div style={{ animation: "fadeIn 0.6s ease 0.2s both" }}>
          <div style={{ fontSize: 168, fontWeight: 900, lineHeight: 0.88, color: "#111827", letterSpacing: "-0.03em" }}>
            KONYA
          </div>
          <div style={{ fontSize: 168, fontWeight: 900, lineHeight: 0.88, color: "#111827", letterSpacing: "-0.03em" }}>
            TRAMVAY
          </div>
          <div style={{ fontSize: 96, fontWeight: 900, color: "#1a5c2e", letterSpacing: "0.02em", marginTop: 10 }}>
            2. ETAP
          </div>
        </div>

        {/* İnce çizgi */}
        <div style={{
          width: 120, height: 4, background: "#1a5c2e", borderRadius: 2,
          margin: "44px 0", animation: "fadeIn 0.6s ease 0.35s both",
        }} />

        {/* İlerleme göstergesi */}
        <div style={{ display: "flex", alignItems: "center", gap: 60, animation: "fadeIn 0.6s ease 0.45s both" }}>

          {/* Daire */}
          <svg width="680" height="680" viewBox="0 0 680 680" style={{ flexShrink: 0 }}>
            <circle cx="340" cy="340" r={r} fill="none" stroke="#dcfce7" strokeWidth="22" />
            <circle cx="340" cy="340" r={r} fill="none"
              stroke="#1a5c2e" strokeWidth="22" strokeLinecap="round"
              strokeDasharray={circ} strokeDashoffset={arcOffset}
              transform="rotate(-90 340 340)"
              style={{ transition: "stroke-dashoffset 0.025s linear" }}
            />
            <text x="340" y="310" textAnchor="middle"
              fill="#111827" fontSize="160" fontWeight="900"
              fontFamily="IBM Plex Sans, Arial">
              {count}
            </text>
            <text x="340" y="415" textAnchor="middle"
              fill="#111827" fontSize="72" fontWeight="700"
              fontFamily="IBM Plex Sans, Arial">
              %
            </text>
            <text x="340" y="488" textAnchor="middle"
              fill="#1a5c2e" fontSize="36" fontWeight="600"
              fontFamily="IBM Plex Sans, Arial" letterSpacing="4">
              TAMAMLANDI
            </text>
          </svg>

          {/* Sayılar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {[
              { val: "10 km",   lbl: "Hat Uzunluğu"   },
              { val: "10",      lbl: "İstasyon"        },
              { val: "60.000",  lbl: "Yolcu / Gün"     },
              { val: "2027",    lbl: "Hedef Yıl"       },
            ].map(({ val, lbl }, i) => (
              <div key={lbl} style={{
                display: "flex", alignItems: "baseline", gap: 18,
                paddingBottom: 24,
                borderBottom: i < 3 ? "1px solid #dcfce7" : "none",
              }}>
                <span style={{ fontSize: 76, fontWeight: 900, color: "#111827", lineHeight: 1 }}>{val}</span>
                <span style={{ fontSize: 34, color: "#6b7280", fontWeight: 500 }}>{lbl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: "auto", animation: "fadeIn 0.6s ease 0.7s both" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
            <span style={{ fontSize: 30, color: "#6b7280" }}>İnşaat İlerlemesi</span>
            <span style={{ fontSize: 30, color: "#1a5c2e", fontWeight: 700 }}>Devam Ediyor</span>
          </div>
          <div style={{ height: 16, background: "#dcfce7", borderRadius: 8, overflow: "hidden" }}>
            <div style={{
              height: "100%", background: "#1a5c2e", borderRadius: 8,
              animation: "barGrow 1.8s ease 0.8s both",
              width: `${PROGRESS}%`,
            }} />
          </div>
        </div>
      </div>

      {/* ══ SAĞ PANEL — Harita ══════════════════════════════════════════════ */}
      <div style={{
        position: "absolute",
        top: 120, left: 1560, right: 0, bottom: 130,
        display: "flex", flexDirection: "column",
        padding: "60px 80px 40px 80px",
        background: "#ecfdf5",
      }}>

        <div style={{
          fontSize: 36, fontWeight: 700, letterSpacing: "0.18em",
          color: "#6b7280", textTransform: "uppercase", marginBottom: 24,
        }}>
          Güzergah Haritası · 10 İstasyon
        </div>

        {/* SVG */}
        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <svg viewBox="0 0 2750 1000" style={{ width: "100%", overflow: "visible" }}>

            {/* Kalan bölüm */}
            {remaining && (
              <path d={remaining} fill="none"
                stroke="#d1d5db" strokeWidth="10"
                strokeDasharray="36 22" strokeLinecap="round" />
            )}

            {/* Tamamlanan bölüm */}
            <path d={done} fill="none"
              stroke="#1a5c2e" strokeWidth="14" strokeLinecap="round"
              style={{ animation: "routeIn 2s ease 0.3s both" }}
            />

            {/* Tren hareketi */}
            <path d={done} fill="none"
              stroke="rgba(255,255,255,0.85)" strokeWidth="6"
              strokeLinecap="round" strokeDasharray="140 3000"
              style={{ animation: "trainMove 3s linear infinite" }}
            />

            {/* İstasyonlar */}
            {STATIONS.map((s, i) => {
              const isDone = i <= completedIdx;
              const isActive = i === completedIdx;
              return (
                <g key={s.id}>
                  {/* Transfer çemberi */}
                  {s.transfer && (
                    <circle cx={s.x} cy={s.y} r={44} fill="none"
                      stroke="#f59e0b" strokeWidth="3" strokeDasharray="10 6" />
                  )}
                  {/* Nokta */}
                  <circle cx={s.x} cy={s.y}
                    r={isDone ? 28 : 16}
                    fill={isDone ? "#1a5c2e" : "#f0fdf4"}
                    stroke={isDone ? "#1a5c2e" : "#86efac"}
                    strokeWidth={isDone ? 0 : 3}
                    style={isActive ? { animation: "stationPop 1.6s ease-in-out infinite" } : undefined}
                  />
                  {/* Aktif iç nokta */}
                  {isActive && (
                    <circle cx={s.x} cy={s.y} r={12} fill="#f0fdf4" />
                  )}
                  {/* İsim */}
                  <text x={s.x} y={s.y - 56}
                    textAnchor="middle"
                    fill={isDone ? "#111827" : "#9ca3af"}
                    fontSize={isDone ? 38 : 30}
                    fontWeight={isDone ? 700 : 400}
                    fontFamily="IBM Plex Sans, Arial">
                    {s.name}
                  </text>
                  {/* Transfer etiketi */}
                  {s.transfer && (
                    <text x={s.x} y={s.y + 68}
                      textAnchor="middle"
                      fill="#f59e0b" fontSize="20"
                      fontFamily="IBM Plex Sans, Arial">
                      KONYARAY aktarma
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Sözleşme bilgisi */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          gap: 40, paddingTop: 32, borderTop: "1px solid #bbf7d0",
        }}>
          {[
            { label: "Yüklenici",         val: "Uğursal Elektrik + ONH İnşaat" },
            { label: "Temel Atma",        val: "7 Temmuz 2025"               },
            { label: "Hat Güzergahı",     val: "Karatay — Selçuklu"          },
          ].map(({ label, val }) => (
            <div key={label}>
              <div style={{ fontSize: 26, color: "#9ca3af", marginBottom: 8 }}>{label}</div>
              <div style={{ fontSize: 36, fontWeight: 700, color: "#1f2937" }}>{val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ ALT ŞERIT ══════════════════════════════════════════════════════ */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 130,
        background: "#1a5c2e",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 100px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/aygm-amblem.svg" alt="AYGM" style={{ height: 72, filter: "brightness(0) invert(1)", opacity: 0.9 }} />
          <div style={{ width: 2, height: 60, background: "rgba(255,255,255,0.2)" }} />
          <div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.55)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
              T.C. Ulaştırma ve Altyapı Bakanlığı
            </div>
            <div style={{ fontSize: 30, fontWeight: 800, color: "#ffffff" }}>
              Altyapı Yatırımları Genel Müdürlüğü
            </div>
          </div>
        </div>

        <div style={{ fontSize: 30, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em" }}>
          aygm.uab.gov.tr
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ width: 320, height: 10, background: "rgba(255,255,255,0.15)", borderRadius: 5, overflow: "hidden" }}>
            <div style={{ width: `${PROGRESS}%`, height: "100%", background: "#ffffff", borderRadius: 5 }} />
          </div>
          <span style={{ fontSize: 30, color: "rgba(255,255,255,0.7)" }}>İnşaat Devam Ediyor</span>
        </div>
      </div>

    </div>
  );
}
