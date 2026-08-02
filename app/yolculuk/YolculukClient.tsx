"use client";

import Footer from "@/components/Footer";
import Link from "next/link";
import { useState, useMemo, useEffect, useCallback } from "react";
import {
  FaChevronRight, FaRoute, FaClipboardCheck, FaExchangeAlt, FaTrain,
  FaMapMarkerAlt, FaClock, FaArrowRight, FaTimes, FaLocationArrow,
  FaFlagCheckered, FaHardHat, FaRegClock, FaRoad,
} from "react-icons/fa";
import { useLang } from "@/context/LangContext";

/* ── Hat verisi ── */
type StopStatus = "service" | "construction" | "planned" | "route";
interface Stop {
  id: number;
  name: string;
  phase: 1 | 2;
  district: string;
  transfer?: string;        // i18n key
  status: StopStatus;
  km: number;               // hattın başından tahmini kümülatif mesafe
}

const TOTAL_KM = 21.2;
const SEGMENTS = 20;                       // 21 durak → 20 aralık
const KM_STEP = TOTAL_KM / SEGMENTS;       // ≈ 1,06 km/aralık (tahmini, eşit dağıtım)
const COMMERCIAL_KMH = 24;                 // duraklamalar dahil ortalama ticari hız

/* status: 2. Etap (AYGM, 1-10) = Yapımda · 1. Etap adlı duraklar = Planlanan · rota belirsiz = Güzergâhta */
const STOPS: Stop[] = [
  { id: 1,  name: "Konya Stadyumu",           phase: 2, district: "Selçuklu", transfer: "route.transfer_baris",     status: "construction", km: 0  * KM_STEP },
  { id: 2,  name: "M1 Real",                  phase: 2, district: "Selçuklu",                                       status: "construction", km: 1  * KM_STEP },
  { id: 3,  name: "Ecdad Bahçesi",            phase: 2, district: "Selçuklu",                                       status: "construction", km: 2  * KM_STEP },
  { id: 4,  name: "Otogar",                   phase: 2, district: "Selçuklu", transfer: "route.transfer_intercity", status: "construction", km: 3  * KM_STEP },
  { id: 5,  name: "Novaland",                 phase: 2, district: "Karatay",                                        status: "construction", km: 4  * KM_STEP },
  { id: 6,  name: "Çimento",                  phase: 2, district: "Karatay",                                        status: "construction", km: 5  * KM_STEP },
  { id: 7,  name: "Banliyö",                  phase: 2, district: "Karatay",  transfer: "route.transfer_konyaray",  status: "construction", km: 6  * KM_STEP },
  { id: 8,  name: "TÜYAP",                    phase: 2, district: "Karatay",                                        status: "construction", km: 7  * KM_STEP },
  { id: 9,  name: "ASLİDAŞ",                  phase: 2, district: "Karatay",                                        status: "construction", km: 8  * KM_STEP },
  { id: 10, name: "Yeni Sanayi",              phase: 2, district: "Karatay",                                        status: "construction", km: 9  * KM_STEP },
  { id: 11, name: "Aslım",                    phase: 1, district: "Karatay",                                        status: "planned",      km: 10 * KM_STEP },
  { id: 12, name: "KOBİSAN",                  phase: 1, district: "Karatay",                                        status: "planned",      km: 11 * KM_STEP },
  { id: 13, name: "Atiker",                   phase: 1, district: "Karatay",                                        status: "planned",      km: 12 * KM_STEP },
  { id: 14, name: "KOSGEB",                   phase: 1, district: "Karatay",                                        status: "planned",      km: 13 * KM_STEP },
  { id: 15, name: "—",                        phase: 1, district: "Karatay",                                        status: "route",        km: 14 * KM_STEP },
  { id: 16, name: "—",                        phase: 1, district: "Karatay",                                        status: "route",        km: 15 * KM_STEP },
  { id: 17, name: "—",                        phase: 1, district: "Karatay",                                        status: "route",        km: 16 * KM_STEP },
  { id: 18, name: "—",                        phase: 1, district: "Karatay",                                        status: "route",        km: 17 * KM_STEP },
  { id: 19, name: "—",                        phase: 1, district: "Karatay",                                        status: "route",        km: 18 * KM_STEP },
  { id: 20, name: "Karatay Hayvanat Bahçesi", phase: 1, district: "Karatay",                                        status: "planned",      km: 19 * KM_STEP },
  { id: 21, name: "Şehir Hastanesi",          phase: 1, district: "Karatay",                                        status: "planned",      km: 20 * KM_STEP },
];

const STATUS_META: Record<StopStatus, { color: string; icon: React.ElementType; order: number }> = {
  service:      { color: "#29BDB5", icon: FaTrain,    order: 0 },
  construction: { color: "#B8892A", icon: FaHardHat,  order: 1 },
  planned:      { color: "#0B7C77", icon: FaRegClock, order: 2 },
  route:        { color: "#94A3B8", icon: FaRoad,     order: 3 },
};

const fmtKm = (km: number) => km.toFixed(1).replace(".", ",");

interface JourneyResult {
  from: Stop;
  to: Stop;
  minutes: number;
  distanceKm: number;
  stopsCount: number;      // uçlar dahil toplam durak
  intermediate: number;    // aradaki durak sayısı
  path: Stop[];
  transfers: Stop[];
}

export default function YolculukClient() {
  const { t } = useLang();
  const [tab, setTab] = useState<"route" | "status">("route");
  const [fromId, setFromId] = useState<number | "">("");
  const [toId, setToId] = useState<number | "">("");
  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<JourneyResult | null>(null);
  const [statusFilter, setStatusFilter] = useState<StopStatus | "all">("all");

  const selectable = useMemo(() => STOPS.filter(s => s.status !== "route"), []);

  const plan = useCallback(() => {
    if (fromId === "" || toId === "") { setError(t("yolculuk.err_both")); return; }
    if (fromId === toId)             { setError(t("yolculuk.err_same")); return; }
    setError("");

    const from = STOPS.find(s => s.id === fromId)!;
    const to   = STOPS.find(s => s.id === toId)!;
    const lo = Math.min(from.id, to.id);
    const hi = Math.max(from.id, to.id);
    const path = STOPS.filter(s => s.id >= lo && s.id <= hi);
    const distanceKm = Math.abs(from.km - to.km);
    const minutes = Math.max(1, Math.round((distanceKm / COMMERCIAL_KMH) * 60));
    const transfers = path.filter(s => s.transfer);

    setResult({
      from, to, minutes, distanceKm,
      stopsCount: path.length,
      intermediate: Math.max(0, path.length - 2),
      path,
      transfers,
    });
  }, [fromId, toId, t]);

  const swap = () => { setFromId(toId); setToId(fromId); };

  // Escape ile kapat + body scroll kilidi
  useEffect(() => {
    if (!result) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setResult(null); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [result]);

  const counts = useMemo(() => {
    const c: Record<StopStatus, number> = { service: 0, construction: 0, planned: 0, route: 0 };
    STOPS.forEach(s => c[s.status]++);
    return c;
  }, []);

  const filtered = statusFilter === "all" ? STOPS : STOPS.filter(s => s.status === statusFilter);

  return (
    <>
      <main>
        {/* ── Hero ── */}
        <div style={{ background: "linear-gradient(135deg, var(--teal-deep) 0%, var(--teal) 55%, var(--teal-dark) 100%)", paddingTop: "6rem", paddingBottom: "6rem", position: "relative", overflow: "hidden" }}>
          <div className="absolute inset-0 pointer-events-none" aria-hidden style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
          <div className="container-aygm relative z-10">
            <div className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.5)", marginBottom: "2.25rem" }}>
              <Link href="/" className="hover:text-white transition-colors">{t("common.home")}</Link>
              <FaChevronRight style={{ fontSize: 9 }} />
              <span style={{ color: "var(--gold)" }}>{t("yolculuk.heading")}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white" style={{ fontFamily: "var(--font-heading)", marginBottom: "1.5rem" }}>
              {t("yolculuk.heading")}
            </h1>
            <p className="text-lg max-w-2xl" style={{ color: "rgba(255,255,255,0.7)" }}>
              {t("yolculuk.subheading")}
            </p>
          </div>
        </div>

        {/* ── Sekme çubuğu ── */}
        <div style={{ background: "var(--gray-50)", paddingTop: "3rem", paddingBottom: "5rem" }}>
          <div className="container-aygm">
            <div style={{ display: "flex", gap: "0.5rem", background: "white", padding: "0.4rem", borderRadius: "1rem", border: "1px solid var(--gray-100)", maxWidth: 560, margin: "0 auto 2.5rem" }}>
              {([
                { key: "route",  label: t("yolculuk.tab_route"),  sub: t("yolculuk.tab_route_sub"),  icon: FaRoute },
                { key: "status", label: t("yolculuk.tab_status"), sub: t("yolculuk.tab_status_sub"), icon: FaClipboardCheck },
              ] as const).map(tb => {
                const active = tab === tb.key;
                const Icon = tb.icon;
                return (
                  <button key={tb.key} onClick={() => setTab(tb.key)}
                    style={{
                      flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem",
                      padding: "0.85rem 1rem", borderRadius: "0.75rem", cursor: "pointer",
                      border: "none", textAlign: "left",
                      background: active ? "linear-gradient(135deg, var(--teal) 0%, var(--teal-dark) 100%)" : "transparent",
                      transition: "background 0.25s",
                    }}>
                    <Icon style={{ fontSize: 16, color: active ? "white" : "var(--teal)", flexShrink: 0 }} />
                    <span>
                      <span style={{ display: "block", fontSize: "0.92rem", fontWeight: 700, color: active ? "white" : "var(--teal-dark)", fontFamily: "var(--font-heading)" }}>{tb.label}</span>
                      <span className="hidden sm:block" style={{ fontSize: "0.68rem", color: active ? "rgba(255,255,255,0.75)" : "var(--gray-400)" }}>{tb.sub}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* ══════════ TAB 1: NASIL GİDERİM ══════════ */}
            {tab === "route" && (
              <div style={{ maxWidth: 720, margin: "0 auto" }}>
                <div style={{ background: "white", borderRadius: "1.5rem", border: "1px solid var(--gray-100)", overflow: "hidden", boxShadow: "0 2px 24px rgba(10,107,102,0.06)" }}>
                  {/* Başlık */}
                  <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--gray-100)", display: "flex", alignItems: "center", gap: "0.625rem" }}>
                    <FaTrain style={{ color: "var(--teal-light)", fontSize: 15 }} />
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--teal)" }}>
                      {t("yolculuk.tab_route")}
                    </span>
                  </div>

                  <div style={{ padding: "1.75rem 1.5rem" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", position: "relative" }}>
                      {/* Çıkış */}
                      <StopSelect
                        label={t("yolculuk.from")} icon={FaLocationArrow} iconColor="var(--teal)"
                        value={fromId} onChange={v => { setFromId(v); setError(""); }}
                        placeholder={t("yolculuk.select_ph")} options={selectable} exclude={toId}
                      />
                      {/* Swap */}
                      <div style={{ display: "flex", justifyContent: "center", margin: "-0.35rem 0", position: "relative", zIndex: 2 }}>
                        <button onClick={swap} aria-label={t("yolculuk.swap")} title={t("yolculuk.swap")}
                          style={{ width: 38, height: 38, borderRadius: "50%", background: "white", border: "1.5px solid var(--gray-200)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--teal)", transition: "all 0.2s", boxShadow: "0 2px 8px rgba(10,107,102,0.08)" }}
                          onMouseEnter={e => { e.currentTarget.style.background = "var(--teal)"; e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = "var(--teal)"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.color = "var(--teal)"; e.currentTarget.style.borderColor = "var(--gray-200)"; }}>
                          <FaExchangeAlt style={{ fontSize: 13, transform: "rotate(90deg)" }} />
                        </button>
                      </div>
                      {/* Varış */}
                      <StopSelect
                        label={t("yolculuk.to")} icon={FaFlagCheckered} iconColor="var(--gold)"
                        value={toId} onChange={v => { setToId(v); setError(""); }}
                        placeholder={t("yolculuk.select_ph")} options={selectable} exclude={fromId}
                      />
                    </div>

                    {error && (
                      <div style={{ marginTop: "1rem", padding: "0.7rem 1rem", borderRadius: "0.625rem", background: "rgba(192,57,43,0.08)", border: "1px solid rgba(192,57,43,0.2)", color: "var(--red)", fontSize: "0.82rem", fontWeight: 500 }}>
                        {error}
                      </div>
                    )}

                    <button onClick={plan} className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: "1.5rem", padding: "1rem" }}>
                      <FaRoute style={{ fontSize: 14 }} />
                      {t("yolculuk.plan")}
                      <FaArrowRight style={{ fontSize: 12 }} />
                    </button>
                  </div>
                </div>

                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "1rem", lineHeight: 1.6, textAlign: "center", maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
                  <FaRegClock style={{ display: "inline", fontSize: 10, marginRight: "0.35rem", verticalAlign: "middle" }} />
                  {t("yolculuk.est_note")}
                </p>
              </div>
            )}

            {/* ══════════ TAB 2: HİZMET DURUMU ══════════ */}
            {tab === "status" && (
              <div style={{ maxWidth: 900, margin: "0 auto" }}>
                <p style={{ fontSize: "0.9rem", color: "var(--gray-600)", lineHeight: 1.7, marginBottom: "1.5rem", textAlign: "center", maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
                  {t("yolculuk.status_intro")}
                </p>

                {/* Filtre / açıklama butonları */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center", marginBottom: "1.75rem" }}>
                  <FilterBtn active={statusFilter === "all"} onClick={() => setStatusFilter("all")}
                    color="var(--teal-dark)" label={t("yolculuk.filter_all")} count={STOPS.length} />
                  {(["construction", "planned", "route"] as StopStatus[]).map(st => (
                    <FilterBtn key={st} active={statusFilter === st} onClick={() => setStatusFilter(st)}
                      color={STATUS_META[st].color} icon={STATUS_META[st].icon}
                      label={t(`yolculuk.status_${st}`)} count={counts[st]} />
                  ))}
                </div>

                {counts.service === 0 && (statusFilter === "all" || statusFilter === "service") && (
                  <div style={{ marginBottom: "1.5rem", padding: "0.85rem 1.1rem", borderRadius: "0.75rem", background: "rgba(41,189,181,0.06)", border: "1px dashed rgba(41,189,181,0.3)", color: "var(--teal-dark)", fontSize: "0.8rem", lineHeight: 1.6, display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                    <FaTrain style={{ fontSize: 13, marginTop: "0.15rem", flexShrink: 0, color: "var(--teal-mid)" }} />
                    <span>{t("yolculuk.no_service_yet")}</span>
                  </div>
                )}

                {/* Durak kartları */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "0.75rem" }}>
                  {filtered.map(s => {
                    const meta = STATUS_META[s.status];
                    const Icon = meta.icon;
                    const isRoute = s.status === "route";
                    return (
                      <div key={s.id} style={{
                        borderRadius: "1rem", padding: "1rem 1.1rem",
                        border: `1px solid ${meta.color}30`,
                        background: `${meta.color}07`,
                        display: "flex", gap: "0.75rem", alignItems: "flex-start",
                      }}>
                        <div style={{ width: 38, height: 38, borderRadius: "0.7rem", background: `${meta.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Icon style={{ color: meta.color, fontSize: 15 }} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap", marginBottom: "0.15rem" }}>
                            <span style={{ fontSize: "0.6rem", fontWeight: 700, color: meta.color, letterSpacing: "0.04em" }}>{t("yolculuk.stop_no")} {s.id}</span>
                            {s.transfer && !isRoute && (
                              <span style={{ fontSize: "0.58rem", padding: "0.08rem 0.4rem", borderRadius: "999px", background: "rgba(184,137,42,0.12)", color: "var(--gold)", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 3 }}>
                                <FaExchangeAlt style={{ fontSize: 7 }} />{t(s.transfer!)}
                              </span>
                            )}
                          </div>
                          <h3 style={{ fontFamily: "var(--font-heading)", color: "var(--teal-dark)", fontSize: "0.95rem", fontWeight: 700, margin: 0, marginBottom: "0.35rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {isRoute ? `${s.district} · ${t("guzergah.sub_on_route")}` : s.name}
                          </h3>
                          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.15rem 0.55rem", borderRadius: "999px", background: `${meta.color}15`, marginBottom: "0.35rem" }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: meta.color, flexShrink: 0 }} />
                            <span style={{ fontSize: "0.68rem", fontWeight: 700, color: meta.color }}>{t(`yolculuk.status_${s.status}`)}</span>
                          </div>
                          <p style={{ fontSize: "0.72rem", color: "var(--gray-500)", lineHeight: 1.5, margin: 0 }}>
                            {t(`yolculuk.status_${s.status}_desc`)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ══════════ POPUP ══════════ */}
      {result && <JourneyModal result={result} onClose={() => setResult(null)} />}

      <Footer />
    </>
  );
}

/* ── İstasyon seçici ── */
function StopSelect({ label, icon: Icon, iconColor, value, onChange, placeholder, options, exclude }: {
  label: string; icon: React.ElementType; iconColor: string;
  value: number | ""; onChange: (v: number | "") => void;
  placeholder: string; options: Stop[]; exclude: number | "";
}) {
  return (
    <label style={{ display: "block" }}>
      <span style={{ display: "flex", alignItems: "center", gap: "0.45rem", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: iconColor, marginBottom: "0.45rem" }}>
        <Icon style={{ fontSize: 12 }} />{label}
      </span>
      <div style={{ position: "relative" }}>
        <select
          className="form-input"
          value={value}
          onChange={e => onChange(e.target.value === "" ? "" : Number(e.target.value))}
          style={{ appearance: "none", WebkitAppearance: "none", MozAppearance: "none", paddingRight: "2.5rem", cursor: "pointer", fontWeight: value === "" ? 400 : 600, color: value === "" ? "var(--gray-400)" : "var(--text)" }}
        >
          <option value="">{placeholder}</option>
          {options.map(o => (
            <option key={o.id} value={o.id} disabled={o.id === exclude}>
              {o.id}. {o.name} · {o.district}
            </option>
          ))}
        </select>
        <FaChevronRight style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%) rotate(90deg)", color: "var(--gray-400)", fontSize: 11, pointerEvents: "none" }} />
      </div>
    </label>
  );
}

/* ── Filtre butonu ── */
function FilterBtn({ active, onClick, color, icon: Icon, label, count }: {
  active: boolean; onClick: () => void; color: string;
  icon?: React.ElementType; label: string; count: number;
}) {
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: "0.45rem",
      padding: "0.5rem 0.9rem", borderRadius: "999px", cursor: "pointer",
      border: `1.5px solid ${active ? color : "var(--gray-200)"}`,
      background: active ? color : "white",
      color: active ? "white" : "var(--gray-600)",
      fontSize: "0.8rem", fontWeight: 600, fontFamily: "var(--font-body)",
      transition: "all 0.2s",
    }}>
      {Icon && <Icon style={{ fontSize: 11, color: active ? "white" : color }} />}
      {label}
      <span style={{ fontSize: "0.7rem", fontWeight: 700, padding: "0.05rem 0.4rem", borderRadius: "999px", background: active ? "rgba(255,255,255,0.22)" : `${color}15`, color: active ? "white" : color }}>{count}</span>
    </button>
  );
}

/* ── Yolculuk popup'ı ── */
function JourneyModal({ result, onClose }: { result: JourneyResult; onClose: () => void }) {
  const { t } = useLang();
  const { from, to, minutes, distanceKm, stopsCount, intermediate, path, transfers } = result;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(10,53,57,0.55)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem", animation: "yolcuFade 0.25s ease",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "white", borderRadius: "1.5rem", width: "100%", maxWidth: 560,
          maxHeight: "90vh", overflowY: "auto", boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
          animation: "yolcuPop 0.32s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Başlık bandı */}
        <div style={{ background: "linear-gradient(135deg, var(--teal-deep) 0%, var(--teal) 60%, var(--teal-dark) 100%)", padding: "1.5rem 1.5rem 1.75rem", position: "relative", overflow: "hidden" }}>
          <div className="absolute inset-0 pointer-events-none" aria-hidden style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)", backgroundSize: "36px 36px" }} />
          <button onClick={onClose} aria-label={t("yolculuk.close")}
            style={{ position: "absolute", top: "1rem", right: "1rem", width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.22)", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
            <FaTimes style={{ fontSize: 13 }} />
          </button>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <FaTrain style={{ color: "var(--teal-light)", fontSize: 14 }} />
              <span style={{ fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--teal-light)" }}>{t("yolculuk.result_sub")}</span>
            </div>
            {/* Çıkış → Varış */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", flexWrap: "wrap" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "white", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.05rem" }}>
                <FaLocationArrow style={{ fontSize: 12, color: "var(--teal-light)" }} />{from.name}
              </span>
              <FaArrowRight style={{ color: "rgba(255,255,255,0.55)", fontSize: 13 }} />
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "white", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.05rem" }}>
                <FaFlagCheckered style={{ fontSize: 12, color: "var(--gold-light)" }} />{to.name}
              </span>
            </div>
          </div>
        </div>

        {/* İstatistik kutuları */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem", padding: "1.25rem 1.5rem 0" }}>
          {[
            { icon: FaClock,       color: "var(--gold)",      value: `${minutes}`,           unit: t("yolculuk.min"), label: t("yolculuk.duration") },
            { icon: FaRoad,        color: "var(--teal)",      value: fmtKm(distanceKm),      unit: t("yolculuk.km"),  label: t("yolculuk.distance") },
            { icon: FaMapMarkerAlt,color: "var(--teal-dark)", value: `${stopsCount}`,        unit: "",                label: t("yolculuk.stops_count") },
          ].map(box => {
            const Icon = box.icon;
            return (
              <div key={box.label} style={{ background: "var(--gray-50)", border: "1px solid var(--gray-100)", borderRadius: "1rem", padding: "1rem 0.5rem", textAlign: "center" }}>
                <Icon style={{ color: box.color, fontSize: 16, marginBottom: "0.4rem" }} />
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.5rem", color: "var(--teal-dark)", lineHeight: 1 }}>
                  {box.value}<span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--gray-400)", marginLeft: 2 }}>{box.unit}</span>
                </div>
                <div style={{ fontSize: "0.64rem", color: "var(--gray-400)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, marginTop: "0.3rem" }}>{box.label}</div>
              </div>
            );
          })}
        </div>

        {/* Güzergâh şeridi */}
        <div style={{ padding: "1.25rem 1.5rem 0" }}>
          <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--teal)", marginBottom: "0.7rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <FaRoute style={{ fontSize: 11 }} />{t("yolculuk.route_label")}
            <span style={{ color: "var(--gray-400)", fontWeight: 500, textTransform: "none", letterSpacing: 0 }}>
              · {intermediate > 0 ? `${intermediate} ${t("yolculuk.intermediate")}` : t("yolculuk.intermediate_none")}
            </span>
          </div>
          <div style={{ display: "flex", gap: "0.4rem", overflowX: "auto", paddingBottom: "0.6rem", scrollbarWidth: "thin" }}>
            {path.map((s, i) => {
              const isEnd = i === 0 || i === path.length - 1;
              const c = s.phase === 2 ? "#6FDDD6" : "#0A6B66";
              const accent = isEnd ? "var(--gold)" : c;
              return (
                <div key={s.id} style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexShrink: 0 }}>
                  {i > 0 && <span style={{ width: 14, height: 2, background: "var(--gray-200)", flexShrink: 0 }} />}
                  <div style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem",
                    padding: "0.4rem 0.6rem", borderRadius: "0.7rem", flexShrink: 0,
                    background: isEnd ? `${accent}12` : "var(--gray-50)",
                    border: `1px solid ${isEnd ? accent + "40" : "var(--gray-100)"}`,
                  }}>
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: accent, flexShrink: 0 }} />
                    <span style={{ fontSize: "0.62rem", fontWeight: isEnd ? 700 : 500, color: isEnd ? "var(--teal-dark)" : "var(--gray-500)", whiteSpace: "nowrap" }}>{s.name}</span>
                    {s.transfer && <span style={{ fontSize: "0.5rem", color: "var(--gold)", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 2 }}><FaExchangeAlt style={{ fontSize: 6 }} /></span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Aktarmalar */}
        <div style={{ padding: "1rem 1.5rem 0" }}>
          <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--teal)", marginBottom: "0.6rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <FaExchangeAlt style={{ fontSize: 11 }} />{t("yolculuk.transfers")}
          </div>
          {transfers.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {transfers.map(s => (
                <div key={s.id} style={{ display: "flex", alignItems: "center", gap: "0.7rem", padding: "0.65rem 0.9rem", borderRadius: "0.75rem", background: "rgba(184,137,42,0.06)", border: "1px solid rgba(184,137,42,0.18)" }}>
                  <div style={{ width: 30, height: 30, borderRadius: "0.6rem", background: "rgba(184,137,42,0.14)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <FaExchangeAlt style={{ color: "var(--gold)", fontSize: 12 }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--teal-dark)" }}>{t(s.transfer!)}</div>
                    <div style={{ fontSize: "0.68rem", color: "var(--gray-400)" }}>{s.name} {t("yolculuk.at_stop")}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: "0.8rem", color: "var(--gray-500)", lineHeight: 1.6, padding: "0.5rem 0", margin: 0 }}>{t("yolculuk.no_transfers")}</p>
          )}
        </div>

        {/* Not + kapat */}
        <div style={{ padding: "1rem 1.5rem 1.5rem" }}>
          <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", lineHeight: 1.55, marginBottom: "1rem", display: "flex", gap: "0.4rem", alignItems: "flex-start" }}>
            <FaRegClock style={{ fontSize: 10, marginTop: "0.15rem", flexShrink: 0 }} />
            <span>{t("yolculuk.est_note")}</span>
          </p>
          <button onClick={onClose} className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "0.9rem" }}>
            {t("yolculuk.close")}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes yolcuFade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes yolcuPop { from { opacity: 0; transform: translateY(24px) scale(0.96) } to { opacity: 1; transform: translateY(0) scale(1) } }
      `}</style>
    </div>
  );
}
