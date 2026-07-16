"use client";

import { useMemo } from "react";
import { FaMapMarkerAlt, FaArrowRight, FaFutbol, FaIndustry, FaExchangeAlt, FaHospital, FaTrain, FaBus, FaQuestion } from "react-icons/fa";
import Link from "next/link";
import { useLang } from "@/context/LangContext";

type StationType = "normal" | "transfer" | "junction" | "endpoint" | "pending";

interface Station {
  id: number; name: string; icon: React.ElementType;
  type: StationType; desc: string; transferLabel?: string;
}

const typeColor: Record<StationType, string> = {
  endpoint: "var(--teal-dark)",
  junction: "#6FDDD6",
  transfer: "var(--gold)",
  normal:   "#0B7C77",
  pending:  "var(--gray-300)",
};
const typeBg: Record<StationType, string> = {
  endpoint: "rgba(10,107,102,0.12)",
  junction: "rgba(111,221,214,0.12)",
  transfer: "rgba(201,168,76,0.12)",
  normal:   "transparent",
  pending:  "rgba(0,0,0,0.02)",
};
const typeBorder: Record<StationType, string> = {
  endpoint: "1px solid rgba(10,107,102,0.2)",
  junction: "1px solid rgba(111,221,214,0.25)",
  transfer: "1px solid rgba(201,168,76,0.2)",
  normal:   "1px solid transparent",
  pending:  "1px dashed var(--gray-200)",
};

function StopRow({ station, globalNo, pendingLabel }: { station: Station; globalNo: number; pendingLabel: string }) {
  const Icon = station.icon;
  const color    = typeColor[station.type];
  const isPending = station.type === "pending";
  const dotSize  = station.type === "endpoint" || station.type === "junction" ? 14 : station.type === "transfer" ? 12 : 9;
  return (
    <div style={{ position: "relative", display: "flex", alignItems: "flex-start", marginBottom: "0.625rem" }}>
      <div style={{ flexShrink: 0, width: "2.5rem", display: "flex", justifyContent: "center", paddingTop: "0.75rem", position: "relative", zIndex: 10 }}>
        <div
          className={isPending ? "" : "transition-transform group-hover:scale-125"}
          style={{
            width: dotSize, height: dotSize, borderRadius: "50%",
            background: isPending ? "var(--gray-100)" : station.type === "normal" ? "white" : color,
            border: isPending ? "2px dashed var(--gray-300)" : `2px solid ${color}`,
            boxShadow: station.type === "endpoint" || station.type === "junction" ? `0 0 0 3px ${color}33` : "none",
          }}
        />
      </div>
      <div style={{ flexShrink: 0, width: "1.25rem" }} />
      <div className="flex-1 rounded-xl" style={{ background: typeBg[station.type], border: typeBorder[station.type], padding: "0.625rem 0.75rem", minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Icon style={{ flexShrink: 0, color, fontSize: 12, opacity: isPending ? 0.4 : 1 }} />
          <span style={{ flex: 1, minWidth: 0, fontSize: "0.875rem", fontWeight: 600, color: isPending ? "var(--text-muted)" : color, lineHeight: 1.3, fontStyle: isPending ? "italic" : "normal" }}>
            {isPending ? pendingLabel : station.name}
          </span>
          <span style={{ flexShrink: 0, fontSize: "0.75rem", color: "var(--gray-400)", fontVariantNumeric: "tabular-nums" }}>
            {globalNo}
          </span>
        </div>
        <p style={{ fontSize: "0.75rem", marginTop: "0.125rem", marginLeft: "1.25rem", color: isPending ? "var(--text-muted)" : "var(--gray-400)" }}>
          {station.desc}
        </p>
        {station.transferLabel && (
          <div style={{ fontSize: "0.75rem", marginTop: "0.125rem", marginLeft: "1.25rem", fontWeight: 500, color: typeColor[station.type] }}>
            ⇄ {station.transferLabel}
          </div>
        )}
      </div>
    </div>
  );
}

export default function RouteSection() {
  const { t } = useLang();
  const pendingLabel = t("route.pending_name");
  const pendingDesc  = t("route.pending_desc");

  const phase2 = useMemo<Station[]>(() => [
    {
      id: 1, name: "Konya Stadyumu", icon: FaFutbol, type: "endpoint",
      desc: t("guzergah.sub_terminal") + " · Selçuklu",
      transferLabel: t("route.transfer_baris"),
    },
    { id: 2, name: "M1 Real",       icon: FaMapMarkerAlt, type: "normal",   desc: t("guzergah.sub_shopping")    + " · Selçuklu" },
    { id: 3, name: "Ecdad Bahçesi", icon: FaMapMarkerAlt, type: "normal",   desc: t("guzergah.sub_culture")     + " · Selçuklu" },
    {
      id: 4, name: "Otogar",        icon: FaBus,          type: "transfer",
      desc: t("route.otogar_desc"),
      transferLabel: t("route.transfer_intercity"),
    },
    { id: 5, name: "Novaland",      icon: FaMapMarkerAlt, type: "normal",   desc: t("guzergah.sub_residential") + " · Karatay" },
    { id: 6, name: "Çimento",       icon: FaMapMarkerAlt, type: "normal",   desc: t("route.cimento_desc") },
    {
      id: 7, name: "Banliyö",       icon: FaExchangeAlt,  type: "transfer",
      desc: t("route.banliyo_desc"),
      transferLabel: t("route.transfer_konyaray"),
    },
    { id: 8,  name: "TÜYAP",        icon: FaMapMarkerAlt, type: "normal",   desc: t("guzergah.sub_fair")        + " · Karatay" },
    { id: 9,  name: "ASLİDAŞ",      icon: FaMapMarkerAlt, type: "normal",   desc: t("guzergah.sub_osb")         + " · Karatay" },
    {
      id: 10, name: "Yeni Sanayi",  icon: FaIndustry,     type: "junction",
      desc: t("guzergah.sub_junction") + " · Karatay",
      transferLabel: t("route.transfer_phase1"),
    },
  ], [t]);

  const phase1 = useMemo<Station[]>(() => [
    { id: 11, name: "Aslım",    icon: FaMapMarkerAlt, type: "normal",  desc: t("route.aslim_desc") },
    { id: 12, name: "KOBİSAN", icon: FaMapMarkerAlt, type: "normal",  desc: t("guzergah.sub_industrial") + " · Karatay" },
    { id: 13, name: "Atiker",  icon: FaMapMarkerAlt, type: "normal",  desc: t("guzergah.sub_local")      + " · Karatay" },
    { id: 14, name: "KOSGEB",  icon: FaMapMarkerAlt, type: "normal",  desc: t("guzergah.sub_support")    + " · Karatay" },
    { id: 15, name: "—",       icon: FaQuestion,     type: "pending", desc: pendingDesc },
    { id: 16, name: "—",       icon: FaQuestion,     type: "pending", desc: pendingDesc },
    { id: 17, name: "—",       icon: FaQuestion,     type: "pending", desc: pendingDesc },
    { id: 18, name: "—",       icon: FaQuestion,     type: "pending", desc: pendingDesc },
    { id: 19, name: "—",       icon: FaQuestion,     type: "pending", desc: pendingDesc },
    { id: 20, name: "Karatay Hayvanat Bahçesi", icon: FaMapMarkerAlt, type: "normal", desc: t("guzergah.sub_recreation") + " · Karatay" },
    {
      id: 21, name: "Şehir Hastanesi", icon: FaHospital, type: "endpoint",
      desc: t("route.hastane_desc"),
    },
  ], [t, pendingDesc]);

  const integrationItems = useMemo(() => [
    { color: "var(--teal-dark)", label: t("guzergah.int_1_line") },
    { color: "var(--teal-dark)", label: t("guzergah.int_2_line") },
    { color: "#6FDDD6",       label: t("guzergah.int_3_line") },
    { color: "var(--gold)",   label: t("guzergah.int_4_line") },
    { color: "#29BDB5",       label: t("guzergah.int_5_line") },
  ], [t]);

  return (
    <section className="section-padding" style={{ background: "white" }}>
      <div className="container-aygm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start" style={{ marginTop: "-1rem" }}>

          {/* ── Sol: Açıklama ── */}
          <div>
            <h2
              className="text-3xl md:text-4xl font-black"
              style={{ fontFamily: "var(--font-heading)", color: "var(--teal-dark)", marginBottom: "1.5rem" }}
            >
              {t("route.heading1")}{" "}
              <span className="gradient-text-teal">{t("route.heading2")}</span>
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--gray-600)", marginBottom: "1.5rem" }}>
              {t("route.phase_desc")}
            </p>

            {/* Faz göstergesi */}
            <div className="rounded-xl p-4" style={{ background: "var(--gray-50)", border: "1px solid var(--gray-100)", marginBottom: "1.5rem" }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: "var(--teal-dark)" }} />
                <span className="text-sm font-semibold" style={{ color: "var(--teal-dark)" }}>{t("route.phase1_label")}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: "#6FDDD6" }} />
                <span className="text-sm font-semibold" style={{ color: "#0B7C77" }}>{t("route.phase2_label")}</span>
              </div>
            </div>

            {/* Entegrasyon noktaları */}
            <div className="rounded-xl p-5" style={{ background: "rgba(11,124,119,0.04)", border: "1px solid rgba(11,124,119,0.15)", marginBottom: "2.5rem" }}>
              <div className="flex items-center gap-2" style={{ marginBottom: "0.875rem" }}>
                <FaExchangeAlt style={{ color: "#0B7C77", fontSize: 14 }} />
                <span className="text-sm font-bold" style={{ color: "#0B7C77" }}>{t("route.integration_title")}</span>
              </div>
              <div className="space-y-2 text-sm" style={{ color: "var(--gray-600)" }}>
                {integrationItems.map((item) => (
                  <div key={item.label} className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: item.color }} />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/guzergah"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: "transparent", color: "#0B7C77",
                padding: "0.75rem 1.75rem", borderRadius: "0.5rem",
                fontWeight: 600, fontSize: "0.875rem", textDecoration: "none",
                border: "1.5px solid #0B7C77", transition: "all 0.2s",
              }}
            >
              {t("route.see_all")}
              <FaArrowRight style={{ fontSize: 12 }} />
            </Link>
          </div>

          {/* ── Sağ: 21 Durak ── */}
          <div style={{ maxHeight: "clamp(450px, 70vh, 640px)", overflowY: "auto", paddingRight: "0.5rem" }}>
            <div className="relative">
              <div
                className="absolute w-0.5"
                style={{ left: "19px", top: "18px", bottom: "18px", background: "linear-gradient(to bottom, #6FDDD6 40%, var(--gold) 55%, var(--teal-dark))" }}
              />

              <div style={{ marginLeft: "3rem", marginBottom: "0.75rem" }}>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(111,221,214,0.1)", color: "#6FDDD6", letterSpacing: "0.06em" }}>
                  {t("route.phase2_header")} — 10
                </span>
              </div>

              {phase2.map((s, i) => (
                <StopRow key={s.id} station={s} globalNo={i + 1} pendingLabel={pendingLabel} />
              ))}

              <div style={{ marginLeft: "3rem", marginTop: "0.75rem", marginBottom: "0.75rem" }}>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(10,107,102,0.1)", color: "var(--teal-dark)", letterSpacing: "0.06em" }}>
                  {t("route.phase1_header")} — 11
                </span>
              </div>

              {phase1.map((s, i) => (
                <StopRow key={s.id} station={s} globalNo={phase2.length + i + 1} pendingLabel={pendingLabel} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
