"use client";
import { useState, useEffect, useRef } from "react";
import { FaTrain } from "react-icons/fa";
import { useLang } from "@/context/LangContext";

type StopType = "terminal" | "junction" | "transfer" | "normal" | "pending";
interface SimStop {
  id: number; name: string; phase: 1 | 2;
  type: StopType; transfer?: string; district: string;
}

const STOPS: SimStop[] = [
  { id: 1,  name: "Konya Stadyumu",           phase: 2, type: "terminal", transfer: "route.transfer_baris",     district: "Selçuklu" },
  { id: 2,  name: "M1 Real",                  phase: 2, type: "normal",                                        district: "Selçuklu" },
  { id: 3,  name: "Ecdad Bahçesi",            phase: 2, type: "normal",                                        district: "Selçuklu" },
  { id: 4,  name: "Otogar",                   phase: 2, type: "transfer", transfer: "route.transfer_intercity", district: "Selçuklu" },
  { id: 5,  name: "Novaland",                 phase: 2, type: "normal",                                        district: "Karatay"  },
  { id: 6,  name: "Çimento",                  phase: 2, type: "normal",                                        district: "Karatay"  },
  { id: 7,  name: "Banliyö",                  phase: 2, type: "transfer", transfer: "route.transfer_konyaray", district: "Karatay"  },
  { id: 8,  name: "TÜYAP",                    phase: 2, type: "normal",                                       district: "Karatay"  },
  { id: 9,  name: "ASLİDAŞ",                  phase: 2, type: "normal",                                       district: "Karatay"  },
  { id: 10, name: "Yeni Sanayi",              phase: 2, type: "junction",                                     district: "Karatay"  },
  { id: 11, name: "Aslım",                    phase: 1, type: "normal",                                       district: "Karatay"  },
  { id: 12, name: "KOBİSAN",                  phase: 1, type: "normal",                                       district: "Karatay"  },
  { id: 13, name: "Atiker",                   phase: 1, type: "normal",                                       district: "Karatay"  },
  { id: 14, name: "KOSGEB",                   phase: 1, type: "normal",                                       district: "Karatay"  },
  { id: 15, name: "—",                        phase: 1, type: "pending",                                      district: "Karatay"  },
  { id: 16, name: "—",                        phase: 1, type: "pending",                                      district: "Karatay"  },
  { id: 17, name: "—",                        phase: 1, type: "pending",                                      district: "Karatay"  },
  { id: 18, name: "—",                        phase: 1, type: "pending",                                      district: "Karatay"  },
  { id: 19, name: "—",                        phase: 1, type: "pending",                                      district: "Karatay"  },
  { id: 20, name: "Karatay Hayvanat Bahçesi", phase: 1, type: "normal",                                       district: "Karatay"  },
  { id: 21, name: "Şehir Hastanesi",          phase: 1, type: "terminal",                                     district: "Karatay"  },
];

const P2   = "#6FDDD6";
const P1   = "#0A6B66";
const GOLD = "#B8892A";
const JUNC = "#0B7C77";
const PEND = "#94A3B8";
const DWELL  = 1700;
const TRAVEL = 800;

function baseColor(s: SimStop): string {
  if (s.type === "pending")   return PEND;
  if (s.type === "junction")  return JUNC;
  if (s.type === "transfer")  return GOLD;
  return s.phase === 2 ? P2 : P1;
}

function stopSize(s: SimStop, scale: number): number {
  const base = s.type === "terminal" ? 26 : s.type === "junction" ? 22 : s.type === "transfer" ? 18 : s.type === "pending" ? 12 : 15;
  return Math.round(base * scale);
}

function segmentColor(i: number): string {
  return i < 9 ? P2 : P1;
}

export default function RouteSimulator() {
  const { t } = useLang();
  const [idx,     setIdx]     = useState(0);
  const scrollRef             = useRef<HTMLDivElement>(null);
  const timerRef              = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Responsive dims */
  const [dims, setDims] = useState({ spacing: 170, pad: 80, trackY: 140, h: 340, nameW: 120, scale: 1 });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if      (w < 400) setDims({ spacing: 72,  pad: 32,  trackY: 80,  h: 210, nameW: 80,  scale: 0.72 });
      else if (w < 520) setDims({ spacing: 88,  pad: 36,  trackY: 88,  h: 230, nameW: 88,  scale: 0.80 });
      else if (w < 640) setDims({ spacing: 105, pad: 44,  trackY: 100, h: 255, nameW: 100, scale: 0.88 });
      else if (w < 768) setDims({ spacing: 130, pad: 56,  trackY: 115, h: 285, nameW: 110, scale: 0.94 });
      else              setDims({ spacing: 170, pad: 80,  trackY: 140, h: 340, nameW: 120, scale: 1    });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { spacing, pad, trackY, h: containerH, nameW, scale } = dims;
  const TOTAL_W = pad * 2 + spacing * (STOPS.length - 1);

  useEffect(() => {
    timerRef.current = setTimeout(() => setIdx(prev => (prev + 1) % STOPS.length), DWELL);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [idx]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const stopX = pad + idx * spacing;
    el.scrollTo({ left: Math.max(0, stopX - el.clientWidth / 2), behavior: "smooth" });
  }, [idx, pad, spacing]);

  const active = STOPS[idx];
  const trainX = pad + idx * spacing;
  const aColor = baseColor(active);
  const phaseLabel = active.phase === 2 ? t("sim.phase2_short") : t("sim.phase1_short");

  return (
    <div style={{ background: "white", borderRadius: "1.5rem", border: "1px solid var(--gray-100)", overflow: "hidden" }}>

      {/* ── Header ── */}
      <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--gray-100)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.75rem" }}>
          <FaTrain style={{ color: P2, fontSize: 15 }} />
          <span style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: P2 }}>
            {t("sim.title")}
          </span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
          <p style={{ fontSize: "0.82rem", color: "var(--gray-400)", margin: 0 }}>
            {t("sim.total")}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", flexShrink: 0 }}>
            {[
              { color: P2,   label: t("sim.phase2_short") },
              { color: P1,   label: t("sim.phase1_short") },
              { color: GOLD, label: t("sim.transfer_short") },
            ].map(l => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: l.color, flexShrink: 0 }} />
                <span style={{ fontSize: "0.72rem", color: "var(--gray-400)", whiteSpace: "nowrap" }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Track ── */}
      <div
        ref={scrollRef}
        style={{ overflowX: "auto", overflowY: "hidden", paddingBottom: "0.5rem", WebkitOverflowScrolling: "touch", scrollbarWidth: "thin", scrollbarColor: "var(--gray-200) transparent" }}
      >
        <div style={{ position: "relative", width: TOTAL_W, height: containerH, flexShrink: 0 }}>

          {/* Phase labels */}
          <div style={{ position: "absolute", left: pad, top: Math.round(10 * scale), width: 9 * spacing, textAlign: "center" }}>
            <span style={{ fontSize: `${Math.round(0.72 * scale * 10) / 10}rem`, fontWeight: 800, letterSpacing: "0.1em", color: P2, textTransform: "uppercase" }}>{t("sim.phase2_stops")}</span>
          </div>
          <div style={{ position: "absolute", left: pad + 9 * spacing, top: Math.round(10 * scale), width: 11 * spacing, textAlign: "center" }}>
            <span style={{ fontSize: `${Math.round(0.72 * scale * 10) / 10}rem`, fontWeight: 800, letterSpacing: "0.1em", color: P1, textTransform: "uppercase" }}>{t("sim.phase1_stops")}</span>
          </div>

          {/* Phase band tints */}
          <div style={{ position: "absolute", left: pad - 20, top: Math.round(28 * scale), width: 9 * spacing + 30, height: trackY + 14, background: `${P2}06`, borderRadius: "0.75rem" }} />
          <div style={{ position: "absolute", left: pad + 9 * spacing - 10, top: Math.round(28 * scale), width: 11 * spacing + 30, height: trackY + 14, background: `${P1}06`, borderRadius: "0.75rem" }} />

          {/* Track segments */}
          {STOPS.slice(0, -1).map((_, i) => {
            const lit   = i < idx;
            const color = segmentColor(i);
            const x     = pad + i * spacing;
            const s0 = stopSize(STOPS[i], scale);
            const s1 = stopSize(STOPS[i + 1], scale);
            return (
              <div key={i} style={{
                position: "absolute",
                left: x + s0 / 2,
                top: trackY - Math.round(3 * scale),
                width: spacing - s0 / 2 - s1 / 2,
                height: Math.max(4, Math.round(6 * scale)),
                borderRadius: 3,
                background: lit ? color : `${color}28`,
                transition: `background ${TRAVEL}ms ease`,
              }} />
            );
          })}

          {/* Train */}
          <div style={{
            position: "absolute",
            left: trainX - Math.round(14 * scale),
            top: trackY - Math.round(14 * scale),
            width: Math.round(28 * scale), height: Math.round(28 * scale),
            borderRadius: "50%",
            background: GOLD,
            border: `${Math.max(2, Math.round(3 * scale))}px solid white`,
            boxShadow: `0 0 0 4px ${GOLD}40, 0 0 20px ${GOLD}80`,
            transition: `left ${TRAVEL}ms cubic-bezier(0.4,0,0.2,1)`,
            willChange: "left",
            zIndex: 30,
          }} />

          {/* Stops */}
          {STOPS.map((stop, i) => {
            const isActive  = i === idx;
            const isPast    = i < idx;
            const isPending = stop.type === "pending";
            const color     = baseColor(stop);
            const size      = stopSize(stop, scale);
            const cx        = pad + i * spacing;
            const nameFontActive = `${Math.round(0.85 * scale * 10) / 10}rem`;
            const nameFontNormal = `${Math.round(0.72 * scale * 10) / 10}rem`;

            return (
              <div key={stop.id} style={{ position: "absolute", left: cx, top: trackY }}>
                {/* Number chip */}
                <div style={{
                  position: "absolute",
                  bottom: size / 2 + Math.round(18 * scale),
                  left: "50%", transform: "translateX(-50%)",
                  fontSize: `${Math.round(0.68 * scale * 10) / 10}rem`,
                  fontWeight: 700,
                  color: isActive ? color : isPast ? `${color}70` : `${color}45`,
                  transition: "color 0.35s",
                  whiteSpace: "nowrap",
                }}>
                  {stop.id}
                </div>

                {/* Stop circle */}
                <div
                  onClick={() => setIdx(i)}
                  style={{
                    position: "absolute",
                    left: -size / 2, top: -size / 2,
                    width: size, height: size, borderRadius: "50%",
                    background: isActive ? color : isPast ? color : "white",
                    border: isPending ? `2px dashed ${color}` : `2px solid ${color}`,
                    opacity: isPending && !isActive && !isPast ? 0.45 : 1,
                    boxShadow: isActive ? `0 0 0 ${Math.round(6 * scale)}px ${color}28, 0 0 20px ${color}70` : "none",
                    transition: "background 0.35s ease, box-shadow 0.35s ease, opacity 0.35s ease",
                    cursor: "pointer", zIndex: 20,
                  }}
                />

                {/* Stop name */}
                <div style={{
                  position: "absolute",
                  top: size / 2 + Math.round(10 * scale),
                  left: "50%", transform: "translateX(-50%)",
                  width: nameW, textAlign: "center",
                  fontSize: isActive ? nameFontActive : nameFontNormal,
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? color : isPast ? `${color}80` : `${color}50`,
                  lineHeight: 1.25, transition: "color 0.35s ease",
                }}>
                  {isPending ? "· · ·" : stop.name}
                </div>

                {/* Transfer badge */}
                {stop.transfer && (
                  <div style={{
                    position: "absolute",
                    top: size / 2 + (stop.name.length > 8 ? Math.round(66 * scale) : Math.round(52 * scale)),
                    left: "50%", transform: "translateX(-50%)",
                    whiteSpace: "nowrap",
                    fontSize: `${Math.round(0.6 * scale * 10) / 10}rem`,
                    fontWeight: 700, color: GOLD, letterSpacing: "0.04em",
                    opacity: isActive ? 1 : 0.4, transition: "opacity 0.35s",
                    background: `${GOLD}18`, padding: "2px 6px", borderRadius: "4px",
                  }}>
                    ⇄ {t(stop.transfer)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Active stop panel ── */}
      <div style={{
        borderTop: "1px solid var(--gray-100)",
        padding: "1rem 1.25rem",
        display: "flex", alignItems: "center", gap: "1rem",
        background: `${aColor}05`, transition: "background 0.4s ease",
        minHeight: 76,
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
          background: aColor, display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 0 0 5px ${aColor}22`, transition: "background 0.4s, box-shadow 0.4s",
        }}>
          <span style={{ color: "white", fontWeight: 800, fontSize: "0.875rem" }}>{active.id}</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: "1rem", color: aColor, transition: "color 0.4s", marginBottom: "0.2rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {active.type === "pending" ? t("sim.pending_name") : active.name}
          </div>
          <div style={{ fontSize: "0.78rem", color: "var(--gray-400)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {t("sim.stop_no")} {active.id} · {active.district} · {phaseLabel}
            {active.transfer && <span style={{ color: GOLD, fontWeight: 600 }}> · ⇄ {t(active.transfer)}</span>}
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.375rem", flexShrink: 0 }}>
          <button
            onClick={() => setIdx(i => Math.max(0, i - 1))}
            style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid var(--gray-200)", background: "white", cursor: "pointer", fontSize: "1rem", color: "var(--gray-500)", display: "flex", alignItems: "center", justifyContent: "center", touchAction: "manipulation" }}
          >‹</button>
          <button
            onClick={() => setIdx(i => Math.min(STOPS.length - 1, i + 1))}
            style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid var(--gray-200)", background: "white", cursor: "pointer", fontSize: "1rem", color: "var(--gray-500)", display: "flex", alignItems: "center", justifyContent: "center", touchAction: "manipulation" }}
          >›</button>
        </div>
      </div>
    </div>
  );
}
