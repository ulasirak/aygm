"use client";

// ─── GÜNCELLEME İÇİN SADECE BU DEĞERİ DEĞİŞTİR ──────────────────────────────
const PROGRESS = 42; // İnşaat ilerleme yüzdesi (0–100)
// ──────────────────────────────────────────────────────────────────────────────

import { useEffect, useState, useRef } from "react";

const STATIONS = [
  { id: 0, name: "Yeni Sanayi",    x: 200,  y: 880  },
  { id: 1, name: "ASLİDAŞ",        x: 420,  y: 730  },
  { id: 2, name: "TÜYAP",          x: 660,  y: 590  },
  { id: 3, name: "Banliyö",        x: 920,  y: 470, transfer: true },
  { id: 4, name: "Çimento",        x: 1200, y: 380  },
  { id: 5, name: "Novaland",       x: 1490, y: 320  },
  { id: 6, name: "Otogar",         x: 1760, y: 300  },
  { id: 7, name: "Ecdad Bahçesi",  x: 2030, y: 310  },
  { id: 8, name: "Real",           x: 2290, y: 340  },
  { id: 9, name: "Konya Stadyumu", x: 2540, y: 400  },
];

function buildPath(pts: { x: number; y: number }[]) {
  return pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
}

function splitSegments(pts: { x: number; y: number }[], pct: number) {
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
      const mid = { x: pts[i - 1].x + dx * t, y: pts[i - 1].y + dy * t };
      done.push(mid); rem.push(mid, ...pts.slice(i)); break;
    }
  }
  return { done: buildPath(done), remaining: rem.length > 1 ? buildPath(rem) : "" };
}

export default function BillboardPage() {
  const [count, setCount] = useState(0);
  const [clock, setClock] = useState("");
  const [statsVisible, setStatsVisible] = useState(false);
  const { done, remaining } = splitSegments(STATIONS, PROGRESS);
  const completedIdx = Math.floor((PROGRESS / 100) * (STATIONS.length - 1));

  useEffect(() => {
    document.body.style.overflow = "hidden";
    // Clock
    const tickClock = () => setClock(new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    tickClock();
    const clockId = setInterval(tickClock, 1000);
    // Counter
    const step = PROGRESS / 80;
    let cur = 0;
    const countId = setInterval(() => {
      cur = Math.min(cur + step, PROGRESS);
      setCount(Math.floor(cur));
      if (cur >= PROGRESS) clearInterval(countId);
    }, 25);
    // Stats reveal
    const statsId = setTimeout(() => setStatsVisible(true), 600);
    return () => { clearInterval(clockId); clearInterval(countId); clearTimeout(statsId); document.body.style.overflow = ""; };
  }, []);

  const r = 300, circ = 2 * Math.PI * r;
  const arcOffset = circ - (circ * count) / 100;

  return (
    <div style={{
      width: "3840px", height: "2160px",
      background: "linear-gradient(160deg, #020f05 0%, #000 50%, #020a0f 100%)",
      overflow: "hidden", position: "relative",
      fontFamily: "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif",
      userSelect: "none",
    }}>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes lightFlow {
          0%   { stroke-dashoffset: 2400; opacity: 1; }
          85%  { opacity: 0.7; }
          100% { stroke-dashoffset: -400; opacity: 0; }
        }
        @keyframes scanLine {
          0%   { top: -6px; }
          100% { top: 2166px; }
        }
        @keyframes pulseDot {
          0%,100% { transform: scale(1); opacity: 1; }
          50%     { transform: scale(1.4); opacity: 0.6; }
        }
        @keyframes pulseRing {
          0%   { r: 46; opacity: 0.5; }
          100% { r: 72; opacity: 0; }
        }
        @keyframes glowBreath {
          0%,100% { filter: drop-shadow(0 0 20px rgba(74,222,128,0.4)); }
          50%     { filter: drop-shadow(0 0 50px rgba(74,222,128,0.8)); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes gridFade {
          0%,100% { opacity: 0.025; }
          50%     { opacity: 0.045; }
        }
        @keyframes routeDraw {
          from { stroke-dasharray: 4000 4000; stroke-dashoffset: 4000; }
          to   { stroke-dasharray: 4000 4000; stroke-dashoffset: 0; }
        }
        @keyframes barFill {
          from { width: 0%; }
          to   { width: ${PROGRESS}%; }
        }
        @keyframes numberPop {
          0%   { transform: scale(0.7); opacity: 0; }
          60%  { transform: scale(1.06); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes borderGlow {
          0%,100% { border-color: rgba(74,222,128,0.2); box-shadow: 0 0 40px rgba(74,222,128,0.05); }
          50%     { border-color: rgba(74,222,128,0.45); box-shadow: 0 0 80px rgba(74,222,128,0.12); }
        }
      `}</style>

      {/* ── Background grid ── */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", animation: "gridFade 5s ease-in-out infinite", pointerEvents: "none" }}>
        <defs>
          <pattern id="grid" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M 120 0 L 0 0 0 120" fill="none" stroke="#4ade80" strokeWidth="0.6"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* ── Scan line ── */}
      <div style={{
        position: "absolute", left: 0, right: 0, height: 6,
        background: "linear-gradient(180deg, transparent, rgba(74,222,128,0.08), transparent)",
        animation: "scanLine 7s linear infinite",
        pointerEvents: "none", zIndex: 5,
      }} />

      {/* ── CRT scanlines ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 4,
        background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 4px)",
      }} />

      {/* ── Vertical divider ── */}
      <div style={{
        position: "absolute", left: 1680, top: 140, bottom: 120, width: 2,
        background: "linear-gradient(180deg, transparent, rgba(74,222,128,0.2) 20%, rgba(74,222,128,0.2) 80%, transparent)",
        zIndex: 10,
      }} />

      {/* ════════════════════════════════════════════════
          TOP BAR
      ════════════════════════════════════════════════ */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 140,
        background: "rgba(0,0,0,0.6)",
        borderBottom: "1.5px solid rgba(74,222,128,0.12)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 100px", zIndex: 20,
      }}>
        {/* Logo + title */}
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/aygm-logo.svg" alt="AYGM" style={{ height: 64, opacity: 0.9 }} />
        </div>

        {/* Center title chip */}
        <div style={{
          padding: "14px 60px", borderRadius: 60,
          border: "1.5px solid rgba(74,222,128,0.25)",
          background: "rgba(74,222,128,0.06)",
          fontSize: 30, fontWeight: 700, letterSpacing: "0.15em",
          color: "rgba(255,255,255,0.7)", textTransform: "uppercase",
        }}>
          Konya Stadyum – Şehir Hastanesi Tramvay Hattı 2. Etap
        </div>

        {/* Clock */}
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 52, fontWeight: 900, color: "#4ade80", lineHeight: 1, fontVariantNumeric: "tabular-nums", textShadow: "0 0 40px rgba(74,222,128,0.4)" }}>
            {clock}
          </div>
          <div style={{ fontSize: 22, color: "rgba(255,255,255,0.3)", marginTop: 6 }}>
            {new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════
          LEFT PANEL — Proje Kimliği + İlerleme
      ════════════════════════════════════════════════ */}
      <div style={{
        position: "absolute", top: 140, left: 0, width: 1680, bottom: 120,
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "60px 120px 60px 120px", gap: 0,
      }}>

        {/* Üst etiket */}
        <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: "0.35em", color: "#4ade80", textTransform: "uppercase", opacity: 0.7, marginBottom: 28,
          animation: "fadeUp 0.8s ease 0.1s both" }}>
          T.C. Ulaştırma ve Altyapı Bakanlığı — AYGM
        </div>

        {/* Ana başlık */}
        <div style={{ fontSize: 170, fontWeight: 900, lineHeight: 0.88, color: "#ffffff", letterSpacing: "-0.02em",
          textShadow: "0 0 120px rgba(255,255,255,0.08)", animation: "fadeUp 0.8s ease 0.2s both" }}>
          KONYA
        </div>
        <div style={{ fontSize: 170, fontWeight: 900, lineHeight: 0.88, color: "#ffffff", letterSpacing: "-0.02em",
          animation: "fadeUp 0.8s ease 0.3s both" }}>
          TRAMVAY
        </div>
        <div style={{ fontSize: 96, fontWeight: 900, color: "#4ade80", letterSpacing: "0.04em", marginTop: 12,
          textShadow: "0 0 60px rgba(74,222,128,0.5)", animation: "fadeUp 0.8s ease 0.4s both" }}>
          2. ETAP
        </div>

        {/* Ayırıcı */}
        <div style={{ width: "100%", height: 2, background: "linear-gradient(90deg, #4ade80 0%, rgba(74,222,128,0.2) 60%, transparent 100%)", margin: "44px 0", animation: "fadeUp 0.8s ease 0.5s both" }} />

        {/* Progress gauge + ring */}
        <div style={{ display: "flex", alignItems: "center", gap: 70, animation: "fadeUp 0.8s ease 0.6s both" }}>

          {/* Dairesel gösterge */}
          <div style={{ position: "relative", width: 740, height: 740, flexShrink: 0 }}>
            <svg width="740" height="740" viewBox="0 0 740 740">
              <defs>
                <filter id="arcGlow"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                <linearGradient id="arcGr" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#166534"/>
                  <stop offset="100%" stopColor="#4ade80"/>
                </linearGradient>
              </defs>
              {/* Track */}
              <circle cx="370" cy="370" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="24"/>
              {/* Arc */}
              <circle cx="370" cy="370" r={r} fill="none"
                stroke="url(#arcGr)" strokeWidth="24" strokeLinecap="round"
                strokeDasharray={circ} strokeDashoffset={arcOffset}
                transform="rotate(-90 370 370)"
                filter="url(#arcGlow)"
                style={{ transition: "stroke-dashoffset 0.03s linear", animation: "glowBreath 3s ease-in-out infinite" }}
              />
              {/* Yüzde */}
              <text x="370" y="330" textAnchor="middle" fill="#4ade80" fontSize="160" fontWeight="900" fontFamily="IBM Plex Sans,Arial"
                style={{ textShadow: "0 0 80px #4ade80" }}>{count}</text>
              <text x="370" y="420" textAnchor="middle" fill="#4ade80" fontSize="64" fontWeight="700" fontFamily="IBM Plex Sans,Arial">%</text>
              <text x="370" y="490" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="34" fontFamily="IBM Plex Sans,Arial" letterSpacing="4">TAMAMLANDI</text>
            </svg>
          </div>

          {/* Sağ: stats grid */}
          <div style={{ display: "flex", flexDirection: "column", gap: 36, flex: 1 }}>
            {[
              { val: "10 km",    lbl: "Hat Uzunluğu",       delay: "0.7s" },
              { val: "10",       lbl: "İstasyon",            delay: "0.85s" },
              { val: "60.000",   lbl: "Yolcu / Gün",         delay: "1s" },
              { val: "2027",     lbl: "Hedef Teslim Yılı",   delay: "1.15s" },
            ].map(({ val, lbl, delay }) => (
              <div key={lbl} style={{
                display: "flex", alignItems: "center", gap: 28,
                padding: "28px 40px", borderRadius: 20,
                border: "1.5px solid rgba(74,222,128,0.12)",
                background: "rgba(74,222,128,0.03)",
                animation: `fadeUp 0.6s ease ${delay} both, borderGlow 4s ease-in-out infinite`,
                opacity: statsVisible ? 1 : 0,
              }}>
                <div style={{ width: 6, height: 60, borderRadius: 3, background: "linear-gradient(180deg,#4ade80,#166534)", flexShrink: 0 }} />
                <div style={{ fontSize: 64, fontWeight: 900, color: "#fff", lineHeight: 1, minWidth: 220 }}>{val}</div>
                <div style={{ fontSize: 30, color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Linear progress bar */}
        <div style={{ marginTop: 50, animation: "fadeUp 0.6s ease 1.3s both", opacity: statsVisible ? 1 : 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <span style={{ fontSize: 26, color: "rgba(255,255,255,0.4)" }}>İnşaat İlerlemesi</span>
            <span style={{ fontSize: 26, color: "#4ade80", fontWeight: 700 }}>%{PROGRESS} Tamamlandı</span>
          </div>
          <div style={{ height: 20, background: "rgba(255,255,255,0.05)", borderRadius: 10, overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 10,
              background: "linear-gradient(90deg, #166534, #4ade80)",
              boxShadow: "0 0 30px rgba(74,222,128,0.5)",
              animation: "barFill 2s ease 0.8s both",
              width: `${PROGRESS}%`,
            }} />
          </div>
        </div>

      </div>

      {/* ════════════════════════════════════════════════
          RIGHT PANEL — Güzergah Haritası
      ════════════════════════════════════════════════ */}
      <div style={{
        position: "absolute", top: 140, left: 1682, right: 0, bottom: 120,
        display: "flex", flexDirection: "column", padding: "50px 80px 50px 80px",
      }}>

        {/* Başlık */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: "0.15em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" }}>
            Güzergah Haritası
          </div>
          <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
            {[
              { color: "#4ade80", label: "Tamamlanan" },
              { color: "rgba(255,255,255,0.2)", label: "Devam Eden", dashed: true },
              { color: "#fbbf24", label: "Aktarma" },
            ].map(({ color, label, dashed }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 40, height: 4, borderRadius: 2,
                  background: dashed ? "transparent" : color,
                  border: dashed ? `3px dashed ${color}` : "none",
                }} />
                <span style={{ fontSize: 22, color: "rgba(255,255,255,0.4)" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SVG Harita */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg viewBox="0 0 2760 1000" style={{ width: "100%", height: "100%", overflow: "visible" }}>
            <defs>
              <filter id="m-glow">
                <feGaussianBlur stdDeviation="8" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="m-soft">
                <feGaussianBlur stdDeviation="4" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <linearGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#166534"/>
                <stop offset="100%" stopColor="#4ade80"/>
              </linearGradient>
            </defs>

            {/* Arka plan glow iz */}
            <path d={buildPath(STATIONS)} fill="none" stroke="rgba(74,222,128,0.06)" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round"/>

            {/* Kalan bölüm — kesik beyaz */}
            {remaining && (
              <path d={remaining} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="7"
                strokeDasharray="40 28" strokeLinecap="round" strokeLinejoin="round"/>
            )}

            {/* Tamamlanan — parlak gradient */}
            <path d={done} fill="none" stroke="url(#mapGrad)" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round"
              filter="url(#m-glow)"
              style={{ animation: "routeDraw 2.5s ease-out 0.3s both, glowBreath 3s ease-in-out infinite" }}
            />

            {/* Işık topu animasyonu */}
            <path d={done} fill="none" stroke="rgba(255,255,255,0.95)" strokeWidth="5" strokeLinecap="round"
              strokeDasharray="180 3000"
              style={{ animation: "lightFlow 3s linear infinite" }}
            />

            {/* İstasyon noktaları */}
            {STATIONS.map((s, i) => {
              const isDone = i <= completedIdx;
              const isActive = i === completedIdx;
              return (
                <g key={s.id}>
                  {/* Pulse ring for active */}
                  {isActive && (
                    <circle cx={s.x} cy={s.y} r={46} fill="none" stroke="rgba(74,222,128,0.4)" strokeWidth="2"
                      style={{ animation: "pulseRing 2s ease-out infinite" }}/>
                  )}
                  {/* Transfer halka */}
                  {s.transfer && (
                    <circle cx={s.x} cy={s.y} r={50} fill="none" stroke="#fbbf24" strokeWidth="3"
                      strokeDasharray="12 7" filter="url(#m-soft)"/>
                  )}
                  {/* Dış halka */}
                  <circle cx={s.x} cy={s.y} r={isDone ? 32 : 18}
                    fill={isDone ? "#4ade80" : "rgba(255,255,255,0.1)"}
                    stroke={isDone ? "rgba(74,222,128,0.5)" : "rgba(255,255,255,0.2)"}
                    strokeWidth={isDone ? 4 : 2}
                    filter={isDone ? "url(#m-soft)" : undefined}
                    style={isActive ? { animation: "pulseDot 1.5s ease-in-out infinite" } : undefined}
                  />

                  {/* İstasyon adı */}
                  <text
                    x={s.x} y={s.y - 54}
                    textAnchor="middle"
                    fill={isDone ? "#ffffff" : "rgba(255,255,255,0.3)"}
                    fontSize={isDone ? 32 : 26}
                    fontWeight={isDone ? 700 : 400}
                    fontFamily="IBM Plex Sans, Arial"
                    filter={isDone ? "url(#m-soft)" : undefined}
                  >
                    {s.name}
                  </text>

                  {/* Transfer etiketi */}
                  {s.transfer && (
                    <text x={s.x} y={s.y + 72} textAnchor="middle"
                      fill="#fbbf24" fontSize="22" fontFamily="IBM Plex Sans, Arial">
                      KONYARAY aktarma
                    </text>
                  )}

                  {/* Son / başlangıç etiketleri */}
                  {i === 0 && (
                    <text x={s.x} y={s.y + 72} textAnchor="middle" fill="rgba(74,222,128,0.7)" fontSize="26" fontWeight="700" fontFamily="IBM Plex Sans, Arial">
                      BAŞLANGIÇ
                    </text>
                  )}
                  {i === STATIONS.length - 1 && (
                    <text x={s.x} y={s.y + 72} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="26" fontWeight="700" fontFamily="IBM Plex Sans, Arial">
                      HEDEf
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Sözleşme bilgisi */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          padding: "24px 0 0", borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: 12,
        }}>
          {[
            { label: "Sözleşme Bedeli", val: "9.059.553.000 TL" },
            { label: "Yüklenici",        val: "Uğursal Elektrik + ONH İnşaat OG" },
            { label: "Temel Atma",       val: "7 Temmuz 2025" },
          ].map(({ label, val }) => (
            <div key={label}>
              <div style={{ fontSize: 22, color: "rgba(255,255,255,0.25)", marginBottom: 6 }}>{label}</div>
              <div style={{ fontSize: 32, fontWeight: 700, color: "rgba(255,255,255,0.65)" }}>{val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════
          BOTTOM BAR — Bakanlık şeridi
      ════════════════════════════════════════════════ */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 120,
        background: "linear-gradient(90deg, #052e16 0%, #0a3d1c 40%, #052e16 100%)",
        borderTop: "2px solid rgba(74,222,128,0.2)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 100px", zIndex: 20,
      }}>
        {/* Sol: TC amblemi + bakanlık */}
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/aygm-amblem.svg" alt="AYGM" style={{ height: 68, filter: "brightness(0) invert(1)", opacity: 0.85 }} />
          <div style={{ width: 2, height: 56, background: "rgba(255,255,255,0.15)" }} />
          <div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.45)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
              T.C. Ulaştırma ve Altyapı Bakanlığı
            </div>
            <div style={{ fontSize: 30, fontWeight: 800, color: "#ffffff", letterSpacing: "0.05em" }}>
              Altyapı Yatırımları Genel Müdürlüğü
            </div>
          </div>
        </div>

        {/* Orta: website */}
        <div style={{ fontSize: 32, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>
          aygm.uab.gov.tr
        </div>

        {/* Sağ: İlerleme özeti */}
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <span style={{ fontSize: 28, color: "rgba(255,255,255,0.4)" }}>Proje İlerlemesi</span>
          <div style={{ width: 280, height: 12, background: "rgba(255,255,255,0.1)", borderRadius: 6, overflow: "hidden" }}>
            <div style={{ width: `${PROGRESS}%`, height: "100%", background: "#4ade80", borderRadius: 6, boxShadow: "0 0 20px rgba(74,222,128,0.6)" }} />
          </div>
          <span style={{ fontSize: 40, fontWeight: 900, color: "#4ade80", textShadow: "0 0 30px rgba(74,222,128,0.5)" }}>
            %{PROGRESS}
          </span>
        </div>
      </div>

    </div>
  );
}
