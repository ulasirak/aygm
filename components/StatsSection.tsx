"use client";

import { FaRoad, FaTrain, FaUsers, FaLeaf, FaCar, FaCalendarAlt, FaRoute, FaBuilding, FaSignal, FaWarehouse, FaWrench, FaDesktop } from "react-icons/fa";
import { useLang } from "@/context/LangContext";

export default function StatsSection() {
  const { t } = useLang();

  const stats = [
    { icon: FaRoad,        value: "1",       labelKey: "stats.s1_label",  descKey: "stats.s1_desc",  color: "#0B7C77",           iconBg: "rgba(11,124,119,0.08)" },
    { icon: FaTrain,       value: "10",      labelKey: "stats.s2_label",  descKey: "stats.s2_desc",  color: "#0A5C58",           iconBg: "rgba(111,221,214,0.08)" },
    { icon: FaUsers,       value: "60.000",  labelKey: "stats.s3_label",  descKey: "stats.s3_desc",  color: "var(--teal)",      iconBg: "rgba(11,124,119,0.08)" },
    { icon: FaRoute,       value: "21,2 km", labelKey: "stats.s4_label",  descKey: "stats.s4_desc",  color: "#0A5C58",           iconBg: "rgba(111,221,214,0.08)" },
    { icon: FaBuilding,    value: "4",       labelKey: "stats.s5_label",  descKey: "stats.s5_desc",  color: "#0A5C58",           iconBg: "rgba(111,221,214,0.08)" },
    { icon: FaCar,         value: "3",       labelKey: "stats.s6_label",  descKey: "stats.s6_desc",  color: "var(--teal-deep)", iconBg: "rgba(111,221,214,0.08)" },
    { icon: FaLeaf,        value: "134 km",  labelKey: "stats.s7_label",  descKey: "stats.s7_desc",  color: "var(--teal)",      iconBg: "rgba(11,124,119,0.08)" },
    { icon: FaCalendarAlt, value: "2027",    labelKey: "stats.s8_label",  descKey: "stats.s8_desc",  color: "#0A5C58",           iconBg: "rgba(111,221,214,0.08)" },
    { icon: FaSignal,      value: "40 km",   labelKey: "stats.s9_label",  descKey: "stats.s9_desc",  color: "#0B7C77",           iconBg: "rgba(11,124,119,0.08)" },
    { icon: FaWarehouse,   value: "1",       labelKey: "stats.s10_label", descKey: "stats.s10_desc", color: "#0A5C58",           iconBg: "rgba(111,221,214,0.08)" },
    { icon: FaWrench,      value: "3",       labelKey: "stats.s11_label", descKey: "stats.s11_desc", color: "#0B7C77",           iconBg: "rgba(11,124,119,0.08)" },
    { icon: FaDesktop,     value: "1",       labelKey: "stats.s12_label", descKey: "stats.s12_desc", color: "#0A5C58",           iconBg: "rgba(111,221,214,0.08)" },
  ];

  return (
    <section className="section-padding" style={{ background: "linear-gradient(to bottom, #CDF2EF 0%, var(--pale) 120px, var(--pale) 100%)" }}>
      <div className="container-aygm">
        <div className="text-center" style={{ marginTop: "-1rem", marginBottom: "5rem" }}>
          <h2 className="text-3xl md:text-4xl font-black" style={{ fontFamily: "var(--font-heading)", color: "var(--teal-dark)" }}>
            {t("stats.heading")}{" "}
            <span className="gradient-text-teal">{t("stats.heading_hl")}</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const label = t(stat.labelKey);
            return (
              <div key={stat.labelKey} className="stat-card group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: stat.iconBg, border: `1px solid ${stat.color}20` }}>
                  <Icon style={{ color: stat.color, fontSize: 18 }} />
                </div>
                <div className="text-2xl md:text-4xl font-black mb-2 md:mb-3" style={{ fontFamily: "var(--font-heading)", color: stat.color }}>
                  {stat.value}
                </div>
                <div className="font-semibold text-sm md:text-base mb-2" style={{ color: "var(--teal-dark)", fontFamily: "var(--font-body)" }}>
                  {label}
                </div>
                <div className="text-sm leading-relaxed" style={{ color: "var(--gray-400)" }}>
                  {t(stat.descKey)}
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8" style={{ marginTop: "5rem", background: "linear-gradient(135deg, #0A5C58 0%, #0B7C77 60%, #6FDDD6 100%)", color: "white" }}>
          <div className="flex-1">
            <h3 className="text-xl font-bold" style={{ fontFamily: "var(--font-heading)", letterSpacing: "0.01em", marginBottom: "1.25rem" }}>
              {t("stats.banner_title")}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
              {t("stats.banner_desc")}
            </p>
          </div>
          <div className="flex items-center justify-center px-8 py-6 md:px-14 md:py-10 rounded-2xl flex-shrink-0 self-start md:self-end md:mt-6" style={{ background: "rgba(111,221,214,0.18)", border: "1px solid rgba(111,221,214,0.4)", minWidth: "120px" }}>
            <div className="text-center">
              <div className="text-4xl font-black mb-1" style={{ fontFamily: "var(--font-heading)", color: "#6FDDD6" }}>%35</div>
              <div className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)", whiteSpace: "pre-line" }}>
                {t("stats.carbon_label")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
