"use client";
import { FaCheckCircle, FaCircle, FaClock } from "react-icons/fa";
import type { ReactElement } from "react";
import { useLang } from "@/context/LangContext";

type TimelineStatus = "done" | "active" | "upcoming";

export default function TimelineSection() {
  const { t } = useLang();

  const timeline = [
    { year: "2024", monthKey: "timeline.t1_month", titleKey: "timeline.t1", descKey: "timeline.t1_desc", status: "done" as TimelineStatus },
    { year: "2025", monthKey: "timeline.t2_month", titleKey: "timeline.t2", descKey: "timeline.t2_desc", status: "done" as TimelineStatus },
    { year: "2025", monthKey: "timeline.t3_month", titleKey: "timeline.t3", descKey: "timeline.t3_desc", status: "done" as TimelineStatus },
    { year: "2025", monthKey: "timeline.t4_month", titleKey: "timeline.t4", descKey: "timeline.t4_desc", status: "done" as TimelineStatus },
    { year: "2025–2026",                            titleKey: "timeline.t5", descKey: "timeline.t5_desc", status: "active" as TimelineStatus },
    { year: "2026",                                 titleKey: "timeline.t6", descKey: "timeline.t6_desc", status: "upcoming" as TimelineStatus },
    { year: "2026–2027",                            titleKey: "timeline.t7", descKey: "timeline.t7_desc", status: "upcoming" as TimelineStatus },
    { year: "2027",                                 titleKey: "timeline.t8", descKey: "timeline.t8_desc", status: "upcoming" as TimelineStatus },
  ];

  const statusIcon: Record<TimelineStatus, ReactElement> = {
    done: <FaCheckCircle style={{ color: "#007A75", fontSize: 16 }} />,
    active: <div className="w-4 h-4 rounded-full animate-pulse" style={{ background: "var(--gold)", boxShadow: "0 0 8px var(--gold)" }} />,
    upcoming: <FaCircle style={{ color: "var(--gray-200)", fontSize: 14 }} />,
  };

  const statusLabel: Record<TimelineStatus, { text: string; color: string; bg: string }> = {
    done:     { text: t("timeline.done"),   color: "#007A75",       bg: "rgba(0,122,117,0.1)" },
    active:   { text: t("timeline.active"), color: "var(--gold)",   bg: "rgba(201,168,76,0.1)" },
    upcoming: { text: t("timeline.upcoming"), color: "var(--gray-400)", bg: "var(--gray-100)" },
  };

  return (
    <section className="section-padding" style={{ background: "linear-gradient(to bottom, white 0%, white 65%, #DAF0EE 100%)" }}>
      <div className="container-aygm">
        <div className="text-center" style={{ marginTop: "-5rem", marginBottom: "4rem" }}>
          <h2 className="text-3xl md:text-4xl font-black" style={{ fontFamily: "var(--font-heading)", color: "var(--forest)" }}>
            {t("timeline.heading")}{" "}
            <span className="gradient-text-teal" style={{ fontWeight: 300 }}>{t("timeline.heading_hl")}</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute left-5 top-6 bottom-6 w-0.5" style={{ background: "linear-gradient(to bottom, #00B8AE, #007A75, var(--green), var(--gray-200))" }} />
            <div className="space-y-10">
              {timeline.map((item, i) => {
                const sl = statusLabel[item.status];
                return (
                  <div key={i} className="relative flex gap-6">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center z-10" style={{ background: item.status === "active" ? "rgba(201,168,76,0.1)" : item.status === "done" ? "rgba(0,122,117,0.1)" : "var(--gray-100)", border: item.status === "active" ? "2px solid var(--gold)" : item.status === "done" ? "2px solid #007A75" : "2px solid var(--gray-200)" }}>
                      {statusIcon[item.status]}
                    </div>
                    <div className="flex-1 rounded-xl p-7" style={{ background: item.status === "active" ? "linear-gradient(135deg, rgba(201,168,76,0.06) 0%, rgba(0,122,117,0.04) 100%)" : item.status === "done" ? "rgba(0,122,117,0.04)" : "transparent", border: item.status === "active" ? "1px solid rgba(201,168,76,0.2)" : item.status === "done" ? "1px solid rgba(0,122,117,0.12)" : "1px solid transparent" }}>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="text-xs font-bold tabular-nums" style={{ color: "#007A75", fontFamily: "var(--font-body)" }}>
                          {item.monthKey ? `${t(item.monthKey)} ${item.year}` : item.year}
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: sl.bg, color: sl.color }}>
                          {sl.text}
                        </span>
                        {item.status === "active" && <FaClock style={{ color: "var(--gold)", fontSize: 11 }} />}
                      </div>
                      <h3 className="font-bold text-lg" style={{ color: "var(--forest)", fontFamily: "var(--font-heading)", marginBottom: "1.25rem" }}>
                        {t(item.titleKey)}
                      </h3>
                      <p className="text-base leading-relaxed" style={{ color: "var(--gray-600)" }}>
                        {t(item.descKey)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
