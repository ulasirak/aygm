"use client";

// ─── GÜNCELLEME İÇİN SADECE BU DEĞERİ DEĞİŞTİR ──────────────────────────────
const PROGRESS = 42; // İnşaat ilerleme yüzdesi (0–100)
// ──────────────────────────────────────────────────────────────────────────────

import { useEffect, useState, useRef } from "react";

const STATIONS = [
  { id: 0, name: "Yeni Sanayi",   x: 180,  y: 760 },
  { id: 1, name: "ASLİDAŞ",       x: 380,  y: 620 },
  { id: 2, name: "TÜYAP",         x: 600,  y: 490 },
  { id: 3, name: "Banliyö",       x: 840,  y: 370, transfer: true },
  { id: 4, name: "Çimento",       x: 1100, y: 280 },
  { id: 5, name: "Novaland",      x: 1380, y: 230 },
  { id: 6, name: "Otogar",        x: 1650, y: 215 },
  { id: 7, name: "Ecdad Bahçesi", x: 1920, y: 225 },
  { id: 8, name: "Real",          x: 2200, y: 255 },
  { id: 9, name: "Konya Stadyumu",x: 2480, y: 310 },
];

const STATS = [
  { value: "10",     unit: "km",         label: "Hat Uzunluğu",    color: "#00ff88" },
  { value: "10",     unit: "istasyon",   label: "Aktarma Noktası", color: "#38bdf8" },
  { value: "60.000", unit: "yolcu/gün",  label: "Kapasite",        color: "#f59e0b" },
  { value: "2027",   unit: "",           label: "Hedef Yıl",       color: "#ff6b6b" },
];

const TIMELINE = [
  { date: "Mayıs 2025",    title: "İhale Tamamlandı",     desc: "9,059 Milyar TL — Uğursal + ONH OG",   done: true  },
  { date: "Temmuz 2025",   title: "Temel Atma Töreni",    desc: "Bakan Abdülkadir Uraloğlu",             done: true  },
  { date: "2025–2026",     title: "İnşaat Devam Ediyor",  desc: `İlerleme: %${PROGRESS}`,               done: false, active: true },
  { date: "2027",          title: "Teslim & Açılış",      desc: "Konya Stadyum – Şehir Hastanesi",      done: false },
];

const SCENE_DURATION = 8000; // ms per scene
const TOTAL_SCENES = 4;

function buildPath(pts: { x: number; y: number }[]) {
  return pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
}

function getSegments(pts: { x: number; y: number }[], pct: number) {
  let total = 0;
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i].x - pts[i - 1].x;
    const dy = pts[i].y - pts[i - 1].y;
    total += Math.sqrt(dx * dx + dy * dy);
  }
  const target = total * (pct / 100);
  let covered = 0;
  const done: { x: number; y: number }[] = [pts[0]];
  const rem: { x: number; y: number }[] = [];
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i].x - pts[i - 1].x;
    const dy = pts[i].y - pts[i - 1].y;
    const seg = Math.sqrt(dx * dx + dy * dy);
    if (covered + seg <= target) {
      covered += seg;
      done.push(pts[i]);
    } else {
      const t = (target - covered) / seg;
      const mid = { x: pts[i - 1].x + dx * t, y: pts[i - 1].y + dy * t };
      done.push(mid);
      rem.push(mid, ...pts.slice(i));
      break;
    }
  }
  return { done: buildPath(done), remaining: rem.length > 1 ? buildPath(rem) : "" };
}

// ── Scene 1: Hero ─────────────────────────────────────────────────────────────
function SceneHero({ visible }: { visible: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) { setCount(0); return; }
    const step = PROGRESS / 60;
    let cur = 0;
    const id = setInterval(() => {
      cur = Math.min(cur + step, PROGRESS);
      setCount(Math.floor(cur));
      if (cur >= PROGRESS) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, [visible]);

  const r = 380, circ = 2 * Math.PI * r;
  const offset = circ - (circ * count) / 100;

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 200 }}>
      {/* Circular gauge */}
      <div style={{ position: "relative", width: 900, height: 900, flexShrink: 0 }}>
        <svg width="900" height="900" viewBox="0 0 900 900">
          <defs>
            <filter id="h-glow"><feGaussianBlur stdDeviation="12" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
          {/* Track */}
          <circle cx="450" cy="450" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="28" />
          {/* Progress arc */}
          <circle cx="450" cy="450" r={r} fill="none"
            stroke="url(#arcGrad)" strokeWidth="28"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            transform="rotate(-90 450 450)"
            filter="url(#h-glow)"
            style={{ transition: "stroke-dashoffset 0.05s linear" }}
          />
          <defs>
            <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#006633" />
              <stop offset="100%" stopColor="#00ff88" />
            </linearGradient>
          </defs>
          {/* Center text */}
          <text x="450" y="400" textAnchor="middle" fill="#00ff88" fontSize="180" fontWeight="900" fontFamily="IBM Plex Sans,Arial">
            {count}
          </text>
          <text x="450" y="510" textAnchor="middle" fill="#00ff88" fontSize="80" fontWeight="700" fontFamily="IBM Plex Sans,Arial">
            %
          </text>
          <text x="450" y="590" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="40" fontWeight="400" fontFamily="IBM Plex Sans,Arial">
            TAMAMLANDI
          </text>
        </svg>
      </div>

      {/* Text panel */}
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: "0.3em", color: "#00ff88", opacity: 0.7, textTransform: "uppercase" }}>
          T.C. Ulaştırma ve Altyapı Bakanlığı
        </div>
        <div style={{ fontSize: 160, fontWeight: 900, lineHeight: 0.9, color: "#fff", letterSpacing: "-0.02em" }}>KONYA</div>
        <div style={{ fontSize: 160, fontWeight: 900, lineHeight: 0.9, color: "#fff", letterSpacing: "-0.02em" }}>TRAMVAY</div>
        <div style={{ fontSize: 96, fontWeight: 800, color: "#00ff88", textShadow: "0 0 60px rgba(0,255,136,0.5)" }}>2. ETAP</div>
        <div style={{ width: 800, height: 3, background: "linear-gradient(90deg,#00ff88,transparent)", marginTop: 16 }} />
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.4)", lineHeight: 1.8 }}>
          Sözleşme: 9.059.553.000 TL<br />
          Güzergah: Yeni Sanayi → Konya Stadyumu<br />
          Temel Atma: 7 Temmuz 2025
        </div>
      </div>
    </div>
  );
}

// ── Scene 2: Route Map ────────────────────────────────────────────────────────
function SceneRoute({ visible }: { visible: boolean }) {
  const { done, remaining } = getSegments(STATIONS, PROGRESS);
  const completedIdx = Math.floor((PROGRESS / 100) * (STATIONS.length - 1));

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 160px" }}>
      <div style={{ fontSize: 42, fontWeight: 700, letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: 40 }}>
        Güzergah Haritası · 10 İstasyon · 10 km
      </div>

      <svg viewBox="0 0 2680 900" width="3400" height="1000" style={{ overflow: "visible", maxWidth: "100%" }}>
        <defs>
          <filter id="r-glow"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <filter id="r-glow-soft"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <linearGradient id="doneGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#006633"/>
            <stop offset="100%" stopColor="#00ff88"/>
          </linearGradient>
        </defs>

        {/* Shadow glow trail */}
        <path d={buildPath(STATIONS)} fill="none" stroke="rgba(0,255,136,0.06)" strokeWidth="28" strokeLinecap="round"/>
        {/* Remaining — dashed dim */}
        {remaining && <path d={remaining} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="8" strokeDasharray="36 24" strokeLinecap="round"/>}
        {/* Done — bright */}
        <path d={done} fill="none" stroke="url(#doneGrad)" strokeWidth="12" strokeLinecap="round" filter="url(#r-glow)"
          style={{ animation: visible ? "routeDraw 2s ease-out forwards" : "none" }}/>
        {/* Traveling light */}
        <path d={done} fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="4" strokeLinecap="round"
          strokeDasharray="160 3000" style={{ animation: "lightRun 2.5s linear infinite" }}/>

        {/* Stations */}
        {STATIONS.map((s, i) => {
          const isDone = i <= completedIdx;
          const isActive = i === completedIdx;
          return (
            <g key={s.id}>
              {isActive && <circle cx={s.x} cy={s.y} r={52} fill="none" stroke="rgba(0,255,136,0.25)" strokeWidth="2"
                style={{ animation: "pulseRing 1.8s ease-out infinite" }}/>}
              <circle cx={s.x} cy={s.y} r={isDone ? 28 : 16}
                fill={isDone ? "#00ff88" : "rgba(255,255,255,0.1)"}
                stroke={isDone ? "rgba(0,255,136,0.6)" : "rgba(255,255,255,0.2)"}
                strokeWidth={isDone ? 4 : 2}
                filter={isDone ? "url(#r-glow-soft)" : undefined}/>
              {s.transfer && <circle cx={s.x} cy={s.y} r={44} fill="none" stroke="#f59e0b" strokeWidth={3} strokeDasharray="10 6" filter="url(#r-glow-soft)"/>}
              <text x={s.x} y={s.y - 50} textAnchor="middle"
                fill={isDone ? "#fff" : "rgba(255,255,255,0.3)"}
                fontSize={isDone ? 28 : 22} fontWeight={isDone ? 700 : 400} fontFamily="IBM Plex Sans,Arial"
                filter={isDone ? "url(#r-glow-soft)" : undefined}>
                {s.name}
              </text>
              {s.transfer && (
                <text x={s.x} y={s.y + 70} textAnchor="middle" fill="#f59e0b" fontSize="18" fontFamily="IBM Plex Sans,Arial">
                  KONYARAY aktarma
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div style={{ display: "flex", gap: 80, marginTop: 40 }}>
        {[
          { color: "#00ff88", label: "Tamamlanan Bölüm" },
          { color: "rgba(255,255,255,0.3)", label: "Devam Eden Bölüm", dashed: true },
          { color: "#f59e0b", label: "Aktarma İstasyonu" },
        ].map(({ color, label, dashed }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 60, height: 4, background: color, borderRadius: 2, borderTop: dashed ? `4px dashed ${color}` : undefined, background: dashed ? "transparent" : color }} />
            <span style={{ fontSize: 28, color: "rgba(255,255,255,0.5)" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Scene 3: Statistics ───────────────────────────────────────────────────────
function SceneStats({ visible }: { visible: boolean }) {
  const [revealed, setRevealed] = useState([false, false, false, false]);
  useEffect(() => {
    if (!visible) { setRevealed([false, false, false, false]); return; }
    STATS.forEach((_, i) => {
      setTimeout(() => setRevealed(prev => { const n = [...prev]; n[i] = true; return n; }), i * 400);
    });
  }, [visible]);

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 80, padding: "80px 200px" }}>
      <div style={{ fontSize: 50, fontWeight: 700, letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" }}>
        Proje İstatistikleri
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 60, width: "100%" }}>
        {STATS.map((s, i) => (
          <div key={s.label} style={{
            background: revealed[i] ? `rgba(${s.color === "#00ff88" ? "0,255,136" : s.color === "#38bdf8" ? "56,189,248" : s.color === "#f59e0b" ? "245,158,11" : "255,107,107"},0.06)` : "transparent",
            border: `2px solid ${revealed[i] ? s.color : "rgba(255,255,255,0.06)"}`,
            borderRadius: 32,
            padding: "70px 40px",
            textAlign: "center",
            transition: "all 0.6s cubic-bezier(0.34,1.56,0.64,1)",
            transform: revealed[i] ? "translateY(0) scale(1)" : "translateY(40px) scale(0.92)",
            opacity: revealed[i] ? 1 : 0,
            boxShadow: revealed[i] ? `0 0 80px ${s.color}22` : "none",
          }}>
            <div style={{ fontSize: 130, fontWeight: 900, lineHeight: 1, color: s.color, textShadow: `0 0 60px ${s.color}66` }}>
              {s.value}
            </div>
            {s.unit && <div style={{ fontSize: 40, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginTop: 8 }}>{s.unit}</div>}
            <div style={{ fontSize: 34, fontWeight: 400, color: "rgba(255,255,255,0.3)", marginTop: 24, letterSpacing: "0.05em" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar row */}
      <div style={{ width: "100%", background: "rgba(255,255,255,0.05)", borderRadius: 20, height: 32, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: visible ? `${PROGRESS}%` : "0%",
          background: "linear-gradient(90deg,#006633,#00ff88)",
          borderRadius: 20,
          boxShadow: "0 0 40px rgba(0,255,136,0.5)",
          transition: "width 2s ease 0.5s",
          position: "relative",
        }}>
          <div style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", fontSize: 20, fontWeight: 700, color: "#000" }}>
            %{PROGRESS}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Scene 4: Timeline ─────────────────────────────────────────────────────────
function SceneTimeline({ visible }: { visible: boolean }) {
  const [revealed, setRevealed] = useState([false, false, false, false]);
  useEffect(() => {
    if (!visible) { setRevealed([false, false, false, false]); return; }
    TIMELINE.forEach((_, i) => {
      setTimeout(() => setRevealed(prev => { const n = [...prev]; n[i] = true; return n; }), i * 500 + 200);
    });
  }, [visible]);

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 250px", gap: 60 }}>
      <div style={{ fontSize: 50, fontWeight: 700, letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" }}>
        Proje Zaman Çizelgesi
      </div>

      {/* Horizontal timeline */}
      <div style={{ width: "100%", position: "relative" }}>
        {/* Connecting line */}
        <div style={{ position: "absolute", top: 44, left: "12.5%", right: "12.5%", height: 4, background: "rgba(255,255,255,0.08)", zIndex: 0 }}>
          <div style={{ height: "100%", width: `${(2 / 3) * 100}%`, background: "linear-gradient(90deg,#006633,#00ff88)", boxShadow: "0 0 20px rgba(0,255,136,0.4)", transition: "width 1s ease 1s" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 40, position: "relative", zIndex: 1 }}>
          {TIMELINE.map((t, i) => (
            <div key={t.title} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 28,
              opacity: revealed[i] ? 1 : 0,
              transform: revealed[i] ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.7s ease",
            }}>
              {/* Node */}
              <div style={{
                width: 88, height: 88, borderRadius: "50%",
                background: t.done ? "#00ff88" : t.active ? "transparent" : "rgba(255,255,255,0.06)",
                border: t.active ? "4px solid #00ff88" : t.done ? "none" : "4px solid rgba(255,255,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: t.done ? "0 0 40px rgba(0,255,136,0.5)" : t.active ? "0 0 40px rgba(0,255,136,0.3)" : "none",
                animation: t.active ? "pulseRing 2s ease-in-out infinite" : "none",
              }}>
                {t.done
                  ? <svg width="40" height="40" viewBox="0 0 40 40"><polyline points="8,20 16,28 32,12" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  : t.active
                    ? <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#00ff88" }} />
                    : <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
                }
              </div>

              {/* Content */}
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: t.done ? "#00ff88" : t.active ? "#fff" : "rgba(255,255,255,0.3)", marginBottom: 10 }}>
                  {t.date}
                </div>
                <div style={{ fontSize: 36, fontWeight: 800, color: t.done || t.active ? "#fff" : "rgba(255,255,255,0.25)", marginBottom: 12 }}>
                  {t.title}
                </div>
                <div style={{ fontSize: 26, color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>
                  {t.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom info */}
      <div style={{ display: "flex", gap: 80, marginTop: 40 }}>
        {[
          { label: "Başlangıç", val: "Yeni Sanayi / Aslım Cad." },
          { label: "Bitiş",     val: "Konya Stadyumu" },
          { label: "Güzergah",  val: "Karatay + Selçuklu İlçeleri" },
        ].map(({ label, val }) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, color: "rgba(255,255,255,0.3)", marginBottom: 8 }}>{label}</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: "#fff" }}>{val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function BillboardPage() {
  const [scene, setScene] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [sceneProgress, setSceneProgress] = useState(0);
  const [clock, setClock] = useState("");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Clock
  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Scene cycling
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const startScene = () => {
      setSceneProgress(0);
      let prog = 0;
      progressRef.current = setInterval(() => {
        prog += 100 / (SCENE_DURATION / 50);
        setSceneProgress(Math.min(prog, 100));
      }, 50);

      timerRef.current = setTimeout(() => {
        clearInterval(progressRef.current!);
        setTransitioning(true);
        setTimeout(() => {
          setScene(s => (s + 1) % TOTAL_SCENES);
          setTransitioning(false);
        }, 600);
      }, SCENE_DURATION);
    };

    startScene();
    return () => {
      clearTimeout(timerRef.current!);
      clearInterval(progressRef.current!);
      document.body.style.overflow = "";
    };
  }, [scene]);

  const sceneLabels = ["Genel Bakış", "Güzergah Haritası", "İstatistikler", "Zaman Çizelgesi"];

  return (
    <div style={{
      width: "3840px", height: "2160px",
      background: "#000",
      overflow: "hidden",
      position: "relative",
      fontFamily: "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif",
      userSelect: "none",
    }}>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes lightRun {
          0%   { stroke-dashoffset: 2000; opacity: 1; }
          80%  { opacity: 0.8; }
          100% { stroke-dashoffset: -400; opacity: 0; }
        }
        @keyframes pulseRing {
          0%   { r: 44; opacity: 0.8; }
          70%  { r: 62; opacity: 0; }
          100% { r: 44; opacity: 0; }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(2160px); }
        }
        @keyframes glowPulse {
          0%,100% { opacity: 0.7; }
          50%     { opacity: 1; }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes particleDrift {
          0%   { transform: translateY(0) translateX(0); opacity: 0; }
          10%  { opacity: 0.6; }
          90%  { opacity: 0.2; }
          100% { transform: translateY(-300px) translateX(60px); opacity: 0; }
        }
        @keyframes gridPulse {
          0%,100% { opacity: 0.03; }
          50%     { opacity: 0.055; }
        }
        @keyframes timerFill {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes routeDraw {
          from { stroke-dashoffset: 4000; stroke-dasharray: 4000; }
          to   { stroke-dashoffset: 0; stroke-dasharray: 4000; }
        }
      `}</style>

      {/* ── Background: Grid ── */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", animation: "gridPulse 4s ease-in-out infinite", pointerEvents: "none" }}>
        <defs>
          <pattern id="grid" width="160" height="160" patternUnits="userSpaceOnUse">
            <path d="M 160 0 L 0 0 0 160" fill="none" stroke="#00ff88" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* ── Scan line ── */}
      <div style={{
        position: "absolute", left: 0, right: 0, height: "6px",
        background: "linear-gradient(180deg, transparent, rgba(0,255,136,0.12), transparent)",
        animation: "scanline 6s linear infinite",
        pointerEvents: "none", zIndex: 20,
      }} />

      {/* ── CRT overlay ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 15,
        background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)",
      }} />

      {/* ── TOP BAR ── */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 130,
        background: "rgba(0,0,0,0.7)",
        borderBottom: "2px solid rgba(0,255,136,0.15)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 100px", zIndex: 30,
      }}>
        {/* Left: AYGM brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/aygm-amblem.svg" alt="AYGM" style={{ height: 72, filter: "brightness(0) invert(1)", opacity: 0.85 }} />
          <div style={{ width: 2, height: 60, background: "rgba(255,255,255,0.1)" }} />
          <div>
            <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: "0.2em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>
              T.C. Ulaştırma ve Altyapı Bakanlığı
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: "0.05em" }}>
              Altyapı Yatırımları Genel Müdürlüğü
            </div>
          </div>
        </div>

        {/* Center: Scene indicator */}
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {sceneLabels.map((label, i) => (
            <div key={label} style={{
              padding: "10px 28px", borderRadius: 40,
              background: scene === i ? "rgba(0,255,136,0.12)" : "transparent",
              border: `1.5px solid ${scene === i ? "#00ff88" : "rgba(255,255,255,0.1)"}`,
              fontSize: 22, fontWeight: scene === i ? 700 : 400,
              color: scene === i ? "#00ff88" : "rgba(255,255,255,0.3)",
              transition: "all 0.4s ease",
            }}>{label}</div>
          ))}
        </div>

        {/* Right: Clock + date */}
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 56, fontWeight: 900, color: "#00ff88", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
            {clock}
          </div>
          <div style={{ fontSize: 22, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>
            {new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
          </div>
        </div>
      </div>

      {/* ── MAIN SCENE AREA ── */}
      <div style={{
        position: "absolute", top: 130, left: 0, right: 0, bottom: 120,
        opacity: transitioning ? 0 : 1,
        transform: transitioning ? "translateY(20px)" : "translateY(0)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}>
        {scene === 0 && <SceneHero    visible={!transitioning && scene === 0} />}
        {scene === 1 && <SceneRoute   visible={!transitioning && scene === 1} />}
        {scene === 2 && <SceneStats   visible={!transitioning && scene === 2} />}
        {scene === 3 && <SceneTimeline visible={!transitioning && scene === 3} />}
      </div>

      {/* ── BOTTOM BAR ── */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 120,
        background: "rgba(0,0,0,0.75)",
        borderTop: "2px solid rgba(0,255,136,0.12)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 100px", zIndex: 30,
      }}>
        <span style={{ fontSize: 28, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>
          aygm.uab.gov.tr
        </span>

        {/* Progress pill */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: "#00ff88" }}>İnşaat İlerlemesi</div>
          <div style={{ width: 500, height: 20, background: "rgba(255,255,255,0.08)", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ width: `${PROGRESS}%`, height: "100%", background: "linear-gradient(90deg,#006633,#00ff88)", borderRadius: 10, boxShadow: "0 0 20px rgba(0,255,136,0.4)" }} />
          </div>
          <div style={{ fontSize: 36, fontWeight: 900, color: "#00ff88" }}>%{PROGRESS}</div>
        </div>

        {/* Scene timer */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span style={{ fontSize: 24, color: "rgba(255,255,255,0.2)" }}>Konya Stadyum — Şehir Hastanesi Tramvay Hattı 2. Etap</span>
        </div>
      </div>

      {/* Scene timer strip */}
      <div style={{ position: "absolute", bottom: 120, left: 0, right: 0, height: 4, background: "rgba(255,255,255,0.05)", zIndex: 30 }}>
        <div style={{ height: "100%", width: `${sceneProgress}%`, background: "#00ff88", boxShadow: "0 0 12px rgba(0,255,136,0.6)", transition: "width 0.05s linear" }} />
      </div>
    </div>
  );
}
