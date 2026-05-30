"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock,
  FaExternalLinkAlt, FaPaperPlane, FaCheckCircle,
  FaChevronRight
} from "react-icons/fa";

const contactInfo = [
  {
    icon: FaMapMarkerAlt,
    title: "Adres",
    lines: ["Hakkı Turayliç Cad. No:5", "06338 Emek / Çankaya / Ankara"],
    sub: "T.C. Ulaştırma ve Altyapı Bakanlığı — AYGM",
    color: "var(--forest)",
  },
  {
    icon: FaPhone,
    title: "Telefon",
    lines: ["+90 (312) 203 10 00"],
    sub: "Hafta içi 08:30 – 17:30",
    color: "var(--green)",
  },
  {
    icon: FaEnvelope,
    title: "E-posta",
    lines: ["konya@aygm.gov.tr"],
    sub: "aygm.ozelkalem@uab.gov.tr",
    color: "var(--gold)",
  },
  {
    icon: FaClock,
    title: "Çalışma Saatleri",
    lines: ["Pzt – Cum: 08:30 – 17:30"],
    sub: "Cumartesi – Pazar kapalı",
    color: "var(--green-light)",
  },
];

type FormData = { name: string; email: string; subject: string; category: string; message: string };
const initialForm: FormData = { name: "", email: "", subject: "", category: "", message: "" };

export default function IletisimPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  };

  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <div className="relative py-20" style={{ background: "linear-gradient(135deg, var(--forest-deep) 0%, var(--forest) 100%)" }}>
          <div className="absolute inset-0 pointer-events-none" aria-hidden style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
          <div className="container-aygm relative z-10">
            <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>
              <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
              <FaChevronRight style={{ fontSize: 9 }} />
              <span style={{ color: "var(--gold)" }}>İletişim</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              İletişim
            </h1>
            <p className="text-lg max-w-xl" style={{ color: "rgba(255,255,255,0.65)" }}>
              Proje hakkında soru, görüş ve bilgi talepleriniz için bize ulaşın.
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
                <h2 className="text-2xl font-black mb-1" style={{ fontFamily: "var(--font-heading)", color: "var(--forest)" }}>
                  Bize Yazın
                </h2>
                <p className="text-sm mb-8" style={{ color: "var(--gray-400)" }}>
                  Tüm mesajlar çalışma günleri içinde değerlendirilerek yanıtlanmaktadır.
                </p>

                {submitted ? (
                  <div style={{ background: "rgba(26,107,58,0.05)", border: "1px solid rgba(26,107,58,0.15)", borderRadius: "1.25rem", padding: "3rem 2rem", textAlign: "center" }}>
                    <FaCheckCircle style={{ color: "var(--green)", fontSize: 44, margin: "0 auto 1.25rem" }} />
                    <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-heading)", color: "var(--forest)" }}>
                      Mesajınız İletildi
                    </h3>
                    <p className="text-sm mb-6" style={{ color: "var(--gray-600)" }}>
                      En kısa sürede tarafınıza dönüş yapılacaktır. Teşekkür ederiz.
                    </p>
                    <button className="btn-outline-navy" onClick={() => { setSubmitted(false); setForm(initialForm); }}>
                      Yeni Mesaj Gönder
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--forest)" }}>Ad Soyad *</label>
                        <input type="text" required className="form-input" placeholder="Adınız ve Soyadınız"
                          value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--forest)" }}>E-posta *</label>
                        <input type="email" required className="form-input" placeholder="ornek@email.com"
                          value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--forest)" }}>Konu Kategorisi *</label>
                      <select required className="form-input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                        <option value="">Seçiniz</option>
                        <option value="guzergah">Güzergah Bilgisi</option>
                        <option value="insaat">İnşaat Süreci</option>
                        <option value="istasyon">İstasyon Bilgisi</option>
                        <option value="sikayetonerim">Şikayet / Öneri</option>
                        <option value="basin">Basın & Medya</option>
                        <option value="diger">Diğer</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--forest)" }}>Konu *</label>
                      <input type="text" required className="form-input" placeholder="Mesajınızın konusu"
                        value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--forest)" }}>Mesajınız *</label>
                      <textarea required rows={6} className="form-input resize-none" placeholder="Mesajınızı buraya yazınız..."
                        value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                    </div>

                    <div style={{ background: "var(--gray-50)", border: "1px solid var(--gray-100)", borderRadius: "0.75rem", padding: "0.875rem 1rem", fontSize: "0.75rem", color: "var(--gray-400)", lineHeight: 1.6 }}>
                      İlettiğiniz veriler yalnızca talebinizin karşılanması amacıyla kullanılır. 6698 sayılı KVKK kapsamında haklarınız saklıdır.
                    </div>

                    <button type="submit" disabled={loading} className="btn-primary" style={{ justifyContent: "center" }}>
                      {loading ? "Gönderiliyor..." : <><FaPaperPlane style={{ fontSize: 12 }} /> Mesaj Gönder</>}
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
                    <div className="font-bold text-base mb-1" style={{ color: "var(--forest)", fontFamily: "var(--font-heading)" }}>AYGM Genel Müdürlüğü</div>
                    <div className="text-sm mb-0.5" style={{ color: "var(--gray-600)" }}>Hakkı Turayliç Cad. No:5</div>
                    <div className="text-sm mb-4" style={{ color: "var(--gray-400)" }}>Emek / Çankaya / Ankara</div>
                    <Link href="https://maps.google.com/?q=AYGM+Altyapı+Yatırımları+Genel+Müdürlüğü+Ankara" target="_blank"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg"
                      style={{ background: "var(--forest)", color: "white" }}>
                      Google Maps&apos;te Aç
                      <FaExternalLinkAlt style={{ fontSize: 9 }} />
                    </Link>
                  </div>
                </div>

                {/* Hızlı bağlantılar */}
                <div style={{ background: "var(--gray-50)", border: "1px solid var(--gray-100)", borderRadius: "1.25rem", padding: "1.5rem" }}>
                  <div className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "var(--forest)", fontFamily: "var(--font-heading)" }}>
                    Resmi Kanallar
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {[
                      { href: "https://www.aygm.gov.tr", label: "AYGM Resmi Sitesi", note: "Tüm projeler" },
                      { href: "https://www.uab.gov.tr", label: "Ulaştırma Bakanlığı", note: "Resmi açıklamalar" },
                      { href: "https://www.bimer.gov.tr", label: "BİMER", note: "Vatandaş başvurusu" },
                      { href: "https://www.cimer.gov.tr", label: "CİMER", note: "Cumhurbaşkanlığı İletişim" },
                      { href: "https://www.konyaray.com.tr", label: "KONYARAY", note: "Banliyö hattı" },
                    ].map((link) => (
                      <Link key={link.href} href={link.href} target="_blank"
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
                  <strong style={{ color: "var(--forest)" }}>Not:</strong> Bu site AYGM tarafından proje şeffaflığı kapsamında yürütülmektedir.
                  Resmi başvurular için{" "}
                  <Link href="https://www.bimer.gov.tr" target="_blank" style={{ color: "var(--forest)", textDecoration: "underline" }}>BİMER</Link>{" "}
                  ve{" "}
                  <Link href="https://www.cimer.gov.tr" target="_blank" style={{ color: "var(--forest)", textDecoration: "underline" }}>CİMER</Link>{" "}
                  platformlarını da kullanabilirsiniz.
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
