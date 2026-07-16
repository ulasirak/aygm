"use client";

import Footer from "@/components/Footer";
import RouteSimulator from "@/components/RouteSimulator";
import Link from "next/link";
import {
  FaMapMarkerAlt, FaTrain, FaHospital, FaFutbol, FaIndustry,
  FaExchangeAlt, FaBus, FaChevronRight
} from "react-icons/fa";
import { useMemo } from "react";
import { useLang } from "@/context/LangContext";

export default function GuzergahClient() {
  const { t } = useLang();

  const stations2 = useMemo(() => [
    { no: 1,  name: "Konya Stadyumu", subtitle: t("guzergah.sub_terminal"),      district: "Selçuklu", type: "highlight", highlightColor: "#6FDDD6", icon: FaFutbol,        features: [t("guzergah.feat_baris"), t("guzergah.feat_stadium")], desc: t("guzergah.desc_stadyum") },
    { no: 2,  name: "M1 Real",        subtitle: t("guzergah.sub_shopping"),      district: "Selçuklu", type: "normal",    icon: FaMapMarkerAlt,  features: [t("guzergah.feat_mall")],                                  desc: t("guzergah.desc_real") },
    { no: 3,  name: "Ecdad Bahçesi",  subtitle: t("guzergah.sub_culture"),       district: "Selçuklu", type: "normal",    icon: FaMapMarkerAlt,  features: [t("guzergah.feat_recreation")],                            desc: t("guzergah.desc_ecdad") },
    { no: 4,  name: "Otogar",         subtitle: t("guzergah.sub_intercity_term"),district: "Selçuklu", type: "transfer",  icon: FaBus,           features: [t("guzergah.feat_intercity_bus"), t("guzergah.feat_taxi")],desc: t("guzergah.desc_otogar") },
    { no: 5,  name: "Novaland",       subtitle: t("guzergah.sub_residential"),   district: "Karatay",  type: "normal",    icon: FaMapMarkerAlt,  features: [],                                                          desc: t("guzergah.desc_novaland") },
    { no: 6,  name: "Çimento",        subtitle: t("guzergah.sub_neighborhood"),  district: "Karatay",  type: "normal",    icon: FaMapMarkerAlt,  features: [],                                                          desc: t("guzergah.desc_cimento") },
    { no: 7,  name: "Banliyö",        subtitle: t("guzergah.sub_konyaray"),      district: "Karatay",  type: "transfer",  icon: FaTrain,         features: [t("route.transfer_konyaray"), t("guzergah.feat_park_ride")],   desc: t("guzergah.desc_banliyo") },
    { no: 8,  name: "TÜYAP",          subtitle: t("guzergah.sub_fair"),          district: "Karatay",  type: "normal",    icon: FaMapMarkerAlt,  features: [t("guzergah.feat_tuyap")],                                  desc: t("guzergah.desc_tuyap_st") },
    { no: 9,  name: "ASLİDAŞ",        subtitle: t("guzergah.sub_osb"),           district: "Karatay",  type: "normal",    icon: FaMapMarkerAlt,  features: [t("guzergah.feat_osb")],                                    desc: t("guzergah.desc_aslidash") },
    { no: 10, name: "Yeni Sanayi",    subtitle: t("guzergah.sub_junction"),      district: "Karatay",  type: "highlight", highlightColor: "#0B7C77", icon: FaIndustry, features: [t("guzergah.feat_phase1"), t("guzergah.feat_parking")], desc: t("guzergah.desc_yenisanayi") },
  ], [t]);

  const stations1 = useMemo(() => [
    { no: 11, name: "Aslım",                    subtitle: t("guzergah.sub_osb_near"),   district: "Karatay", type: "normal",  icon: FaMapMarkerAlt, features: [],                                                        desc: t("guzergah.desc_aslim") },
    { no: 12, name: "KOBİSAN",                  subtitle: t("guzergah.sub_industrial"), district: "Karatay", type: "normal",  icon: FaMapMarkerAlt, features: [],                                                        desc: t("guzergah.desc_kobisan") },
    { no: 13, name: "Atiker",                   subtitle: t("guzergah.sub_local"),      district: "Karatay", type: "normal",  icon: FaMapMarkerAlt, features: [],                                                        desc: t("guzergah.desc_atiker") },
    { no: 14, name: "KOSGEB",                   subtitle: t("guzergah.sub_support"),    district: "Karatay", type: "normal",  icon: FaMapMarkerAlt, features: [],                                                        desc: t("guzergah.desc_kosgeb") },
    { no: 15, name: "—",                        subtitle: t("guzergah.sub_on_route"),   district: "Karatay", type: "pending", icon: FaMapMarkerAlt, features: [],                                                        desc: "" },
    { no: 16, name: "—",                        subtitle: t("guzergah.sub_on_route"),   district: "Karatay", type: "pending", icon: FaMapMarkerAlt, features: [],                                                        desc: "" },
    { no: 17, name: "—",                        subtitle: t("guzergah.sub_on_route"),   district: "Karatay", type: "pending", icon: FaMapMarkerAlt, features: [],                                                        desc: "" },
    { no: 18, name: "—",                        subtitle: t("guzergah.sub_on_route"),   district: "Karatay", type: "pending", icon: FaMapMarkerAlt, features: [],                                                        desc: "" },
    { no: 19, name: "—",                        subtitle: t("guzergah.sub_on_route"),   district: "Karatay", type: "pending", icon: FaMapMarkerAlt, features: [],                                                        desc: "" },
    { no: 20, name: "Karatay Hayvanat Bahçesi", subtitle: t("guzergah.sub_recreation"), district: "Karatay", type: "normal",  icon: FaMapMarkerAlt, features: [],                                                        desc: t("guzergah.desc_hayvanat") },
    { no: 21, name: "Şehir Hastanesi",          subtitle: t("guzergah.sub_terminal"),   district: "Karatay", type: "highlight", highlightColor: "#0A6B66", icon: FaHospital, features: [t("guzergah.feat_phase1_terminal"), t("guzergah.feat_emergency")], desc: t("guzergah.desc_hastane") },
  ], [t]);

  const integrationItems = [
    { lineKey: "guzergah.int_1_line", detailKey: "guzergah.int_1_detail", tagKey: "guzergah.int_1_tag", icon: FaTrain, color: "var(--teal-dark)" },
    { lineKey: "guzergah.int_2_line", detailKey: "guzergah.int_2_detail", tagKey: "guzergah.int_2_tag", icon: FaTrain, color: "var(--teal-dark)" },
    { lineKey: "guzergah.int_3_line", detailKey: "guzergah.int_3_detail", tagKey: "guzergah.int_3_tag", icon: FaTrain, color: "#6FDDD6" },
    { lineKey: "guzergah.int_4_line", detailKey: "guzergah.int_4_detail", tagKey: "guzergah.int_4_tag", icon: FaBus,   color: "var(--gold)" },
    { lineKey: "guzergah.int_5_line", detailKey: "guzergah.int_5_detail", tagKey: "guzergah.int_5_tag", icon: FaTrain, color: "#29BDB5" },
    { lineKey: "guzergah.int_6_line", detailKey: "guzergah.int_6_detail", tagKey: "guzergah.int_6_tag", icon: FaExchangeAlt, color: "#0B7C77" },
  ];

  type StationT = typeof stations2[0] & { highlightColor?: string };

  const pendingDesc    = t("guzergah.pending_desc");
  const transferLabel  = t("guzergah.transfer_label");
  const routeByLabel   = t("guzergah.route_by");
  const highlightLabel = t("guzergah.highlight");

  return (
    <>
      <main>
        <div style={{ background: "linear-gradient(135deg, var(--teal-deep) 0%, var(--teal) 55%, var(--teal-dark) 100%)", paddingTop: "6rem", paddingBottom: "6rem", position: "relative", overflow: "hidden" }}>
          <div className="absolute inset-0 pointer-events-none" aria-hidden style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
          <div className="container-aygm relative z-10">
            <div className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.5)", marginBottom: "2.25rem" }}>
              <Link href="/" className="hover:text-white transition-colors">{t("common.home")}</Link>
              <FaChevronRight style={{ fontSize: 9 }} />
              <span style={{ color: "var(--gold)" }}>{t("guzergah.heading")}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white" style={{ fontFamily: "var(--font-heading)", marginBottom: "1.5rem" }}>
              {t("guzergah.heading")}
            </h1>
            <p className="text-lg max-w-2xl" style={{ color: "rgba(255,255,255,0.7)" }}>
              {t("guzergah.subheading")}
            </p>
          </div>
        </div>

        <div id="simulasyon" style={{ background: "var(--gray-50)", paddingTop: "5rem", paddingBottom: "5rem" }}>
          <div className="container-aygm">
            <RouteSimulator />
          </div>
        </div>

        <div id="istasyonlar" className="section-padding" style={{ background: "white" }}>
          <div className="container-aygm">
            <h2 className="text-2xl md:text-3xl font-black" style={{ fontFamily: "var(--font-heading)", color: "var(--teal-dark)", marginBottom: "2rem" }}>
              {t("guzergah.station_details")}
            </h2>

            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: "50%", top: "2.75rem", bottom: "0.25rem", width: "1px", transform: "translateX(-50%)", background: "linear-gradient(to bottom, transparent, #cbd5e1 5%, #cbd5e1 95%, transparent)", pointerEvents: "none", zIndex: 1 }} />

              <div className="grid grid-cols-2 gap-x-3 lg:gap-x-16" style={{ marginBottom: "1rem" }}>
                <div className="ml-1 lg:ml-3.5">
                  <span style={{ fontSize: "0.78rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#0B7C77" }}>{t("guzergah.phase2_col")}</span>
                </div>
                <div className="mr-1 lg:mr-3.5">
                  <span style={{ fontSize: "0.78rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#0A6B66" }}>{t("guzergah.phase1_col")}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-3 lg:gap-x-16" style={{ rowGap: "0.875rem" }}>
                {Array.from({ length: Math.max(stations2.length, stations1.length) }, (_, i) => {
                  const s2 = stations2[i] as StationT | undefined;
                  const s1 = stations1[i] as StationT | undefined;

                  const s2IsHighlight = s2 && s2.type === "highlight";
                  const s2IsTransfer  = s2 && s2.type === "transfer";
                  const s2Accent = s2IsHighlight ? (s2.highlightColor ?? "#6FDDD6") : s2IsTransfer ? "var(--gold)" : "var(--teal-dark)";
                  const S2Icon = s2?.icon;

                  const s1IsPending   = s1 && s1.type === "pending";
                  const s1IsHighlight = s1 && s1.type === "highlight";
                  const s1IsTransfer  = s1 && s1.type === "transfer";
                  const s1Accent = s1IsHighlight ? (s1.highlightColor ?? "#0A6B66") : s1IsTransfer ? "var(--gold)" : "var(--teal-dark)";
                  const S1Icon = s1?.icon;

                  return [
                    <div key={`c2-${i}`} className="ml-1 lg:ml-3.5">
                      {s2 && S2Icon ? (
                        <div style={{ height: "100%", borderRadius: "1rem", border: `1px solid ${s2IsHighlight ? s2Accent + "35" : s2IsTransfer ? "rgba(184,137,42,0.2)" : "var(--gray-100)"}`, background: s2IsHighlight ? `${s2Accent}06` : s2IsTransfer ? "rgba(184,137,42,0.03)" : "white", display: "flex", flexDirection: "column" }}>
                          <div className="p-2.5 sm:p-4 lg:p-5" style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start", flex: 1 }}>
                            <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem", width: "2rem" }}>
                              <div style={{ width: 30, height: 30, borderRadius: "0.625rem", background: `${s2Accent}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <S2Icon style={{ color: s2Accent, fontSize: 12 }} />
                              </div>
                              <span style={{ fontSize: "0.55rem", fontWeight: 700, color: s2Accent }}>{t("guzergah.station_short")}{s2.no}</span>
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.375rem", marginBottom: "0.25rem" }}>
                                <h3 style={{ fontFamily: "var(--font-heading)", color: "var(--teal-dark)", fontSize: "0.82rem", fontWeight: 700, margin: 0 }}>{s2.name}</h3>
                                {s2IsTransfer  && <span style={{ fontSize: "0.6rem", padding: "0.1rem 0.4rem", borderRadius: "999px", background: "rgba(184,137,42,0.12)", color: "var(--gold)", fontWeight: 600 }}>{transferLabel}</span>}
                                {s2IsHighlight && <span style={{ fontSize: "0.6rem", padding: "0.1rem 0.4rem", borderRadius: "999px", background: `${s2Accent}15`, color: s2Accent, fontWeight: 600 }}>{highlightLabel}</span>}
                              </div>
                              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem", fontSize: "0.65rem", color: "var(--gray-400)", marginBottom: "0.4rem", alignItems: "center" }}>
                                <span>{s2.district}</span><span>·</span><span>{s2.subtitle}</span>
                              </div>
                              <p className="hidden sm:block" style={{ fontSize: "0.8rem", color: "var(--gray-600)", lineHeight: 1.5, marginBottom: s2.features.length ? "0.5rem" : 0 }}>{s2.desc}</p>
                              {s2.features.length > 0 && (
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                                  {s2.features.map(f => <span key={f} style={{ fontSize: "0.7rem", padding: "0.2rem 0.625rem", borderRadius: "999px", background: "var(--gray-100)", color: "var(--gray-600)" }}>{f}</span>)}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : <div style={{ height: "100%" }} />}
                    </div>,

                    <div key={`c1-${i}`} className="mr-1 lg:mr-3.5">
                      {s1 && S1Icon ? (
                        s1IsPending ? (
                          <div style={{ height: "100%", borderRadius: "1rem", border: "1px dashed var(--gray-200)", background: "var(--gray-50)", display: "flex", alignItems: "center" }}>
                            <div className="p-2.5 sm:p-4 lg:p-5" style={{ display: "flex", gap: "0.625rem", alignItems: "center" }}>
                              <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem", width: "2rem" }}>
                                <div style={{ width: 30, height: 30, borderRadius: "0.625rem", background: "var(--gray-100)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                  <FaMapMarkerAlt style={{ color: "var(--gray-300)", fontSize: 11 }} />
                                </div>
                                <span style={{ fontSize: "0.55rem", fontWeight: 700, color: "var(--text-muted)" }}>{t("guzergah.station_short")}{s1.no}</span>
                              </div>
                              <div>
                                <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--gray-400)" }}>{pendingDesc}</div>
                                <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>{s1.district} · {routeByLabel}</div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div style={{ height: "100%", borderRadius: "1rem", border: `1px solid ${s1IsHighlight ? s1Accent + "35" : s1IsTransfer ? "rgba(184,137,42,0.2)" : "var(--gray-100)"}`, background: s1IsHighlight ? `${s1Accent}06` : s1IsTransfer ? "rgba(184,137,42,0.03)" : "white", display: "flex", flexDirection: "column" }}>
                            <div className="p-2.5 sm:p-4 lg:p-5" style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start", flex: 1 }}>
                              <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem", width: "2rem" }}>
                                <div style={{ width: 30, height: 30, borderRadius: "0.625rem", background: `${s1Accent}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                  <S1Icon style={{ color: s1Accent, fontSize: 12 }} />
                                </div>
                                <span style={{ fontSize: "0.55rem", fontWeight: 700, color: s1Accent }}>{t("guzergah.station_short")}{s1.no}</span>
                              </div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.375rem", marginBottom: "0.25rem" }}>
                                  <h3 style={{ fontFamily: "var(--font-heading)", color: "var(--teal-dark)", fontSize: "0.82rem", fontWeight: 700, margin: 0 }}>{s1.name}</h3>
                                  {s1IsTransfer  && <span style={{ fontSize: "0.6rem", padding: "0.1rem 0.4rem", borderRadius: "999px", background: "rgba(184,137,42,0.12)", color: "var(--gold)", fontWeight: 600 }}>{transferLabel}</span>}
                                  {s1IsHighlight && <span style={{ fontSize: "0.6rem", padding: "0.1rem 0.4rem", borderRadius: "999px", background: `${s1Accent}15`, color: s1Accent, fontWeight: 600 }}>{highlightLabel}</span>}
                                </div>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem", fontSize: "0.65rem", color: "var(--gray-400)", marginBottom: "0.4rem", alignItems: "center" }}>
                                  <span>{s1.district}</span><span>·</span><span>{s1.subtitle}</span>
                                </div>
                                <p className="hidden sm:block" style={{ fontSize: "0.8rem", color: "var(--gray-600)", lineHeight: 1.5, marginBottom: s1.features.length ? "0.5rem" : 0 }}>{s1.desc}</p>
                                {s1.features.length > 0 && (
                                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                                    {s1.features.map(f => <span key={f} style={{ fontSize: "0.7rem", padding: "0.2rem 0.625rem", borderRadius: "999px", background: "var(--gray-100)", color: "var(--gray-600)" }}>{f}</span>)}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      ) : <div style={{ height: "100%" }} />}
                    </div>,
                  ];
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="section-padding" style={{ background: "var(--gray-50)" }}>
          <div className="container-aygm">
            <h2 className="text-2xl font-black" style={{ fontFamily: "var(--font-heading)", color: "var(--teal-dark)", marginBottom: "2rem" }}>
              {t("guzergah.integration_title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {integrationItems.map((item) => {
                const Icon = item.icon;
                const line   = t(item.lineKey);
                const detail = t(item.detailKey);
                const tag    = t(item.tagKey);
                return (
                  <div key={item.lineKey} style={{ background: "white", border: "1px solid var(--gray-100)", borderRadius: "0.875rem", padding: "1rem 1.25rem", display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
                    <div style={{ width: 36, height: 36, borderRadius: "0.625rem", background: `${item.color}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon style={{ color: item.color, fontSize: 14 }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem", flexWrap: "wrap" }}>
                        <span style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--teal-dark)" }}>{line}</span>
                        <span style={{ fontSize: "0.62rem", padding: "0.1rem 0.45rem", borderRadius: "4px", background: `${item.color}15`, color: item.color, fontWeight: 700, flexShrink: 0 }}>{tag}</span>
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "var(--gray-400)" }}>
                        <FaExchangeAlt style={{ display: "inline", fontSize: 9, marginRight: "0.3rem" }} />
                        {detail}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
