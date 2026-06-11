"use client";

import { useState } from "react";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  FaPhone, FaMapMarkerAlt,
  FaExternalLinkAlt, FaPaperPlane, FaCheckCircle,
  FaChevronRight
} from "react-icons/fa";
import { useLang } from "@/context/LangContext";

type FormData = { name: string; email: string; subject: string; category: string; message: string };
const initialForm: FormData = { name: "", email: "", subject: "", category: "", message: "" };

export default function IletisimClient() {
  const { t } = useLang();
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const contactInfo = [
    { icon: FaMapMarkerAlt, title: t("contact.address"), lines: [t("footer.address")], sub: `${t("footer.uab_label")} — ${t("footer.aygm_label")}`, color: "var(--forest)" },
    { icon: FaPhone, title: t("contact.phone"), lines: ["+90 (312) 203 10 00"], sub: t("contact.hours"), color: "var(--green)" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  };

  return (
    <>
      <main>

        {/* Hero */}
        <div className="relative" style={{ background: "linear-gradient(135deg, var(--teal-deep) 0%, var(--teal) 55%, var(--forest) 100%)", paddingTop: "6rem", paddingBottom: "6rem" }}>
          <div className="absolute inset-0 pointer-events-none" aria-hidden style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
          <div className="container-aygm relative z-10">
            <div className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.5)", marginBottom: "2.25rem" }}>
              <Link href="/" className="hover:text-white transition-colors">{t("common.home")}</Link>
              <FaChevronRight style={{ fontSize: 9 }} />
              <span style={{ color: "var(--gold)" }}>{t("contact.heading")}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white" style={{ fontFamily: "var(--font-heading)", marginBottom: "1.5rem" }}>
              {t("contact.heading")}
            </h1>
            <p className="text-lg max-w-xl" style={{ color: "rgba(255,255,255,0.7)" }}>
              {t("contact.subheading")}
            </p>
          </div>
        </div>

        {/* İletişim kartları */}
        <div className="section-padding" style={{ background: "var(--pale)" }}>
          <div className="container-aygm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} style={{
                    background: "white", border: "1px solid var(--gray-100)",
                    borderRadius: "1.25rem", padding: "2rem 1.75rem",
                    boxShadow: "0 2px 20px rgba(29,92,58,0.05)",
                  }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: "0.875rem", marginBottom: "1.25rem",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: `${item.color}12`, border: `1px solid ${item.color}20`,
                    }}>
                      <Icon style={{ color: item.color, fontSize: 18 }} />
                    </div>
                    <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gray-400)", marginBottom: "0.5rem" }}>
                      {item.title}
                    </div>
                    {item.lines.map((line, i) => (
                      <div key={i} style={{ fontSize: "0.925rem", fontWeight: 600, color: "var(--forest)", marginBottom: "0.15rem" }}>{line}</div>
                    ))}
                    <div style={{ fontSize: "0.78rem", color: "var(--gray-400)", marginTop: "0.35rem" }}>{item.sub}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Form & Sidebar */}
        <div className="section-padding" style={{ background: "white" }}>
          <div className="container-aygm">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

              {/* Form */}
              <div className="lg:col-span-3">
                <h2 className="text-2xl font-black" style={{ fontFamily: "var(--font-heading)", color: "var(--forest)", marginBottom: "0.75rem" }}>
                  {t("contact.form_heading")}
                </h2>
                <p className="text-sm mb-8" style={{ color: "var(--gray-400)" }}>
                  {t("contact.form_note")}
                </p>

                {submitted ? (
                  <div style={{ background: "rgba(26,107,58,0.05)", border: "1px solid rgba(26,107,58,0.15)", borderRadius: "1.25rem", padding: "3rem 2rem", textAlign: "center" }}>
                    <FaCheckCircle style={{ color: "var(--green)", fontSize: 44, margin: "0 auto 1.25rem" }} />
                    <h3 className="text-xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--forest)", marginBottom: "1rem" }}>
                      {t("contact.success_title")}
                    </h3>
                    <p className="text-sm mb-6" style={{ color: "var(--gray-600)" }}>
                      {t("contact.success_desc")}
                    </p>
                    <button className="btn-outline-navy" onClick={() => { setSubmitted(false); setForm(initialForm); }}>
                      {t("contact.reset_button")}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--forest)" }}>{t("contact.form_name")} *</label>
                        <input type="text" required className="form-input" placeholder={t("contact.placeholder_name")}
                          value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--forest)" }}>{t("contact.form_email")} *</label>
                        <input type="email" required className="form-input" placeholder={t("contact.placeholder_email")}
                          value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--forest)" }}>{t("contact.form_category")} *</label>
                      <select required className="form-input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                        <option value="">{t("common.select")}</option>
                        <option value="genel">{t("contact.cat_general")}</option>
                        <option value="insaat">{t("contact.cat_construction")}</option>
                        <option value="guzergah">{t("contact.cat_route")}</option>
                        <option value="erisebilirlik">{t("contact.cat_accessibility")}</option>
                        <option value="basin">{t("contact.cat_media")}</option>
                        <option value="diger">{t("contact.cat_other")}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--forest)" }}>{t("contact.form_subject")} *</label>
                      <input type="text" required className="form-input" placeholder={t("contact.placeholder_subject")}
                        value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--forest)" }}>{t("contact.form_message")} *</label>
                      <textarea required rows={6} className="form-input resize-none" placeholder={t("contact.placeholder_message")}
                        value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                    </div>

                    <div style={{ background: "var(--gray-50)", border: "1px solid var(--gray-100)", borderRadius: "0.75rem", padding: "0.875rem 1rem", fontSize: "0.75rem", color: "var(--gray-400)", lineHeight: 1.6 }}>
                      {t("contact.privacy_notice")}
                    </div>

                    <button type="submit" disabled={loading} className="btn-primary" style={{ justifyContent: "center" }}>
                      {loading ? t("contact.submit_loading") : <><FaPaperPlane style={{ fontSize: 12 }} /> {t("contact.submit")}</>}
                    </button>
                  </form>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-2" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

                {/* Harita placeholder */}
                <div style={{ borderRadius: "1.25rem", overflow: "hidden", border: "1px solid var(--gray-100)", background: "var(--gray-50)" }}>
                  <div style={{ padding: "2rem", textAlign: "center" }}>
                    <div style={{ width: 56, height: 56, borderRadius: "1rem", background: "rgba(29,92,58,0.08)", border: "1px solid rgba(29,92,58,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                      <FaMapMarkerAlt style={{ color: "var(--forest)", fontSize: 22 }} />
                    </div>
                    <div className="font-bold text-base mb-1" style={{ color: "var(--forest)", fontFamily: "var(--font-heading)" }}>{t("footer.aygm_label")}</div>
                    <div className="text-sm mb-4" style={{ color: "var(--gray-600)" }}>{t("footer.address")}</div>
                    <Link href="https://maps.google.com/?q=AYGM+Altyapı+Yatırımları+Genel+Müdürlüğü+Ankara" target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg"
                      style={{ background: "var(--forest)", color: "white" }}>
                      {t("contact.maps_open")}
                      <FaExternalLinkAlt style={{ fontSize: 9 }} />
                    </Link>
                  </div>
                </div>

                {/* Hızlı bağlantılar */}
                <div style={{ background: "var(--gray-50)", border: "1px solid var(--gray-100)", borderRadius: "1.25rem", padding: "1.5rem" }}>
                  <div className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "var(--forest)", fontFamily: "var(--font-heading)" }}>
                    {t("contact.official_channels")}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {[
                      { href: "https://www.uab.gov.tr", label: t("footer.uab_label"), note: t("contact.uab_note") },
                      { href: "https://www.aygm.gov.tr", label: t("proje.link_aygm"), note: t("contact.aygm_note") },
                    ].map((link) => (
                      <Link key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"
                        className="hover:bg-white transition-colors"
                        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1rem", borderRadius: "0.75rem", border: "1px solid var(--gray-200)", textDecoration: "none" }}>
                        <div>
                          <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--forest)" }}>{link.label}</div>
                          <div style={{ fontSize: "0.72rem", color: "var(--gray-400)" }}>{link.note}</div>
                        </div>
                        <FaExternalLinkAlt style={{ color: "var(--gray-300)", fontSize: 10, flexShrink: 0 }} />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* KVKK notu */}
                <div style={{ background: "rgba(29,92,58,0.04)", border: "1px solid rgba(29,92,58,0.08)", borderRadius: "1rem", padding: "1.25rem 1.5rem", fontSize: "0.8rem", color: "var(--gray-600)", lineHeight: 1.7 }}>
                  <strong style={{ color: "var(--forest)" }}>{t("contact.kvkk_label")}</strong>{" "}{t("contact.kvkk_note")}
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
