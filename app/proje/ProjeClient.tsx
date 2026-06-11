"use client";

import Footer from "@/components/Footer";
import Link from "next/link";
import {
  FaArrowRight, FaCheckCircle, FaExternalLinkAlt
} from "react-icons/fa";
import { useMemo } from "react";
import { useLang } from "@/context/LangContext";

const OBJ_KEYS = [
  "proje.obj1", "proje.obj2", "proje.obj3", "proje.obj4",
  "proje.obj5", "proje.obj6", "proje.obj7",
];

const TECH_FIXED = [
  { labelKey: "proje.lbl_length",   value: "10 km" },
  { labelKey: "proje.lbl_stations", value: "10" },
  { labelKey: "proje.lbl_total",    value: "21,2 km" },
];

export default function ProjeClient() {
  const { t } = useLang();

  const technicalData = useMemo(() => [
    ...TECH_FIXED,
    { labelKey: "proje.lbl_bridge",     value: t("proje.val_bridge") },
    { labelKey: "proje.lbl_overpass",   value: t("proje.val_overpass") },
    { labelKey: "proje.lbl_capacity",   value: t("proje.val_capacity") },
    { labelKey: "proje.lbl_speed",      value: t("proje.val_speed") },
    { labelKey: "proje.lbl_contract",   value: "9,06 milyar TL" },
    { labelKey: "proje.lbl_contractor", value: "Uğursal Elektrik – ONH İnşaat Ortak Girişimi" },
    { labelKey: "proje.lbl_tender",     value: t("proje.val_tender") },
    { labelKey: "proje.lbl_foundation", value: t("proje.val_foundation") },
    { labelKey: "proje.lbl_opening",    value: t("proje.val_opening") },
  ], [t]);

  const integrationLines = useMemo(() => [
    { nameKey: "proje.line_existing", km: "26,7 km", statusKey: "proje.status_active" },
    { nameKey: "proje.line_phase1",   km: "11,2 km", statusKey: "proje.status_construction" },
    { nameKey: "proje.line_phase2",   km: "10 km",   statusKey: "proje.status_construction" },
    { nameKey: "proje.line_konyaray", km: "23 km",   statusKey: "proje.status_construction" },
    { nameKey: "proje.line_baris",    km: "13,85 km",statusKey: "proje.status_tender" },
  ], [t]);

  return (
    <>
      <main>
        <div
          className="relative py-28"
          style={{ background: "linear-gradient(135deg, var(--teal-deep) 0%, var(--teal) 55%, var(--forest) 100%)", paddingTop: "6rem", paddingBottom: "6rem" }}
        >
          <div className="container-aygm relative z-10">
            <div className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.5)", marginBottom: "2.25rem" }}>
              <Link href="/" className="hover:text-white transition-colors">{t("common.home")}</Link>
              <span>/</span>
              <span style={{ color: "var(--gold)" }}>{t("proje.heading")}</span>
            </div>
            <h1
              className="text-4xl md:text-5xl font-black text-white"
              style={{ fontFamily: "var(--font-heading)", marginBottom: "1.5rem" }}
            >
              {t("proje.heading")}
            </h1>
            <p className="text-lg max-w-2xl" style={{ color: "rgba(255,255,255,0.7)" }}>
              {t("proje.hero_subtitle")}
            </p>
          </div>
        </div>

        <div className="section-padding" style={{ background: "white" }}>
          <div className="container-aygm">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              <div className="lg:col-span-3" style={{ display: "flex", flexDirection: "column", gap: "6rem" }}>
                {/* About */}
                <section id="genel-tanim">
                  <h2
                    className="text-2xl font-black"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--forest)", marginBottom: "1.5rem" }}
                  >
                    {t("proje.scope_title")}
                  </h2>
                  <div className="space-y-4 text-base leading-relaxed" style={{ color: "var(--gray-600)" }}>
                    <p>{t("proje.scope_p1")}</p>
                    <p>{t("proje.scope_p2")}</p>
                    <p>{t("proje.scope_p3")}</p>
                  </div>
                </section>

                {/* Objectives */}
                <section id="hedefler">
                  <h2
                    className="text-2xl font-black"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--forest)", marginBottom: "1.5rem" }}
                  >
                    {t("proje.obj_title")}
                  </h2>
                  <ul className="space-y-3">
                    {OBJ_KEYS.map((key) => (
                      <li key={key} className="flex items-start gap-3">
                        <FaCheckCircle className="flex-shrink-0 mt-0.5" style={{ color: "var(--green)", fontSize: 16 }} />
                        <span className="text-base" style={{ color: "var(--gray-600)" }}>{t(key)}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Integration */}
                <section id="entegrasyon">
                  <h2
                    className="text-2xl font-black"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--forest)", marginBottom: "1.5rem" }}
                  >
                    {t("proje.int_title")}
                  </h2>
                  <p className="text-base leading-relaxed mb-6" style={{ color: "var(--gray-600)" }}>
                    {t("proje.int_desc")}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {integrationLines.map((line) => (
                      <div
                        key={line.nameKey}
                        className="rounded-xl p-4"
                        style={{ background: "var(--gray-50)", border: "1px solid var(--gray-100)" }}
                      >
                        <div className="flex items-start gap-2 mb-1">
                          <span className="text-sm font-semibold flex-1 min-w-0 leading-snug" style={{ color: "var(--forest)" }}>
                            {t(line.nameKey)}
                          </span>
                          <span
                            className="text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 mt-0.5"
                            style={{
                              background: line.statusKey === "proje.status_active" ? "rgba(0,184,174,0.12)" : line.statusKey === "proje.status_construction" ? "rgba(29,92,58,0.12)" : "rgba(58,138,80,0.12)",
                              color: line.statusKey === "proje.status_active" ? "#00B8AE" : line.statusKey === "proje.status_construction" ? "#1D5C3A" : "#3A8A50",
                            }}
                          >
                            {t(line.statusKey)}
                          </span>
                        </div>
                        <div className="text-lg font-black" style={{ fontFamily: "var(--font-heading)", color: "var(--forest)" }}>
                          {line.km}
                        </div>
                      </div>
                    ))}
                    <div
                      className="rounded-xl p-4 flex items-center justify-between"
                      style={{ background: "linear-gradient(135deg, var(--forest), var(--forest))", border: "1px solid rgba(201,168,76,0.2)" }}
                    >
                      <div>
                        <span className="text-sm font-semibold text-white">{t("proje.total_target")}</span>
                        <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>{t("proje.rail_note")}</div>
                      </div>
                      <span className="text-xl font-black" style={{ fontFamily: "var(--font-heading)", color: "var(--gold)" }}>
                        134 km
                      </span>
                    </div>
                  </div>
                </section>

                {/* Quote */}
                <section>
                  <blockquote className="rounded-2xl p-6" style={{ background: "var(--gray-50)", borderLeft: "4px solid var(--gold)" }}>
                    <p className="text-base italic leading-relaxed mb-4" style={{ color: "var(--forest)" }}>
                      &ldquo;{t("proje.quote_text")}&rdquo;
                    </p>
                    <footer className="text-sm font-semibold" style={{ color: "var(--gray-600)" }}>
                      — {t("proje.quote_attr")}
                    </footer>
                  </blockquote>
                </section>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-2" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                <div id="teknik-veriler" style={{ border: "1px solid var(--gray-100)", borderRadius: "1rem" }}>
                  <div style={{ background: "var(--forest)", borderRadius: "1rem 1rem 0 0", padding: "1rem 1.5rem" }}>
                    <h3 className="text-white font-bold text-sm uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                      {t("proje.tech_title")}
                    </h3>
                  </div>
                  {technicalData.map((item, i) => (
                    <div
                      key={item.labelKey}
                      style={{ padding: "0.875rem 1.5rem", borderTop: i === 0 ? "none" : "1px solid var(--gray-100)" }}
                    >
                      <div className="text-xs" style={{ color: "var(--gray-400)", marginBottom: "0.2rem" }}>{t(item.labelKey)}</div>
                      <div className="text-sm font-semibold" style={{ color: "var(--forest)", wordBreak: "break-word" }}>{item.value}</div>
                    </div>
                  ))}
                </div>

                <div style={{ background: "var(--gray-50)", border: "1px solid var(--gray-100)", borderRadius: "1rem", padding: "1.5rem" }}>
                  <h3 className="font-bold text-sm uppercase tracking-wider" style={{ color: "var(--forest)", fontFamily: "var(--font-heading)", marginBottom: "1rem" }}>
                    {t("proje.links_title")}
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {[
                      { href: "https://www.uab.gov.tr", label: t("proje.link_uab") },
                      { href: "https://www.aygm.gov.tr", label: t("proje.link_aygm") },
                    ].map((link) => (
                      <Link key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"
                        className="text-sm hover:underline"
                        style={{ color: "var(--forest)", display: "flex", alignItems: "center", gap: "0.5rem", wordBreak: "break-word" }}
                      >
                        <FaExternalLinkAlt style={{ fontSize: 9, opacity: 0.4, flexShrink: 0 }} />
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <div style={{ background: "var(--forest)", borderRadius: "1rem", padding: "1.5rem" }}>
                  <h3 className="font-bold text-sm uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)", color: "var(--gold)", marginBottom: "1rem" }}>
                    {t("proje.more_title")}
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {[
                      { href: "/guzergah", label: t("footer.link_route") },
                      { href: "/haberler", label: t("footer.link_news") },
                    ].map((link) => (
                      <Link key={link.href} href={link.href}
                        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1rem", borderRadius: "0.5rem", color: "rgba(255,255,255,0.8)", fontSize: "0.875rem", transition: "background 0.2s" }}
                        className="hover:bg-white/10"
                      >
                        <span>{link.label}</span>
                        <FaArrowRight style={{ fontSize: 10, flexShrink: 0 }} />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
