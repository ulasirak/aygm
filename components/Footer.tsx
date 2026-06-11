"use client";
import Link from "next/link";
import {
  FaTrain, FaPhone, FaMapMarkerAlt,
  FaExternalLinkAlt, FaChevronRight
} from "react-icons/fa";
import { useLang } from "@/context/LangContext";

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  const footerLinks = [
    {
      title: t("footer.col_project"),
      links: [
        { href: "/proje",     label: t("footer.link_about") },
        { href: "/guzergah",  label: t("footer.link_route") },
        { href: "/haberler",  label: t("footer.link_news") },
        { href: "/sss",       label: t("footer.link_faq") },
      ],
    },
    {
      title: t("footer.col_corporate"),
      links: [
        { href: "https://www.uab.gov.tr", label: t("footer.uab_label"), external: true },
        { href: "https://www.aygm.gov.tr", label: t("footer.aygm_label"), external: true },
      ],
    },
  ];

  return (
    <footer style={{ background: "#041B19", color: "rgba(255,255,255,0.65)" }}>
      <div style={{ height: 3, background: "linear-gradient(90deg, #007A75 0%, #00B8AE 40%, var(--green-light) 70%, transparent 100%)" }} />

      <div className="container-aygm" style={{ padding: "2rem 0 2rem" }}>
        <div className="footer-grid" style={{ display: "grid", gap: "2rem", alignItems: "start" }}>

          <div>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1.25rem", textDecoration: "none", width: "fit-content" }}>
              <div style={{ width: 44, height: 44, borderRadius: "0.875rem", background: "rgba(0,184,174,0.1)", border: "1px solid rgba(0,184,174,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FaTrain style={{ color: "#00B8AE", fontSize: 17 }} />
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "white", letterSpacing: "0.01em" }}>Konya Tramvay 2. Etap</div>
                <div style={{ fontSize: "0.58rem", color: "#00B8AE", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "0.15rem" }}>{t("footer.aygm_label")}</div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/aygm-amblem.svg" alt="Altyapı Yatırımları Genel Müdürlüğü" width={28} height={28} style={{ height: 28, marginTop: "0.5rem", opacity: 0.5, filter: "brightness(0) invert(1)" }} />
              </div>
            </Link>

            <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.58)", lineHeight: 1.8, marginBottom: "1.5rem", maxWidth: "22rem" }}>
              {t("footer.desc")}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {[
                { icon: FaMapMarkerAlt, text: t("footer.address"), href: "https://maps.google.com/?q=AYGM+Altyapı+Yatırımları+Genel+Müdürlüğü+Ankara", external: true },
                { icon: FaPhone, text: "+90 (312) 203 10 00", href: "tel:+903122031000", external: false },
              ].map(({ icon: Icon, text, href, external }) => (
                <Link key={text} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", textDecoration: "none" }} className="group">
                  <div style={{ width: 30, height: 30, borderRadius: "0.5rem", background: "rgba(0,184,174,0.07)", border: "1px solid rgba(0,184,174,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon style={{ color: "#00B8AE", fontSize: 10, opacity: 0.7 }} />
                  </div>
                  <span className="group-hover:text-white transition-colors" style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>{text}</span>
                </Link>
              ))}
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#00B8AE", marginBottom: "1.5rem" }}>
                {section.title}
              </h4>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.6rem", listStyle: "none", padding: 0, margin: 0 }}>
                {section.links.map((link, i) => (
                  <li key={`${link.href}-${i}`}>
                    <Link href={link.href} target={(link as { external?: boolean }).external ? "_blank" : undefined} rel={(link as { external?: boolean }).external ? "noopener noreferrer" : undefined} style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.825rem", color: "rgba(255,255,255,0.5)", textDecoration: "none" }} className="footer-link">
                      {link.label}
                      {(link as { external?: boolean }).external && <FaExternalLinkAlt style={{ fontSize: 7, opacity: 0.3, flexShrink: 0 }} />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#00B8AE", opacity: 0.6, marginBottom: "1.5rem" }}>
              {t("footer.quick_access")}
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { href: "/iletisim", label: t("footer.contact_cta") },
                { href: "/haberler", label: t("footer.latest_news") },
                { href: "/sss",      label: t("footer.faq_link") },
              ].map(({ href, label }) => (
                <Link key={href} href={href} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1rem", borderRadius: "0.75rem", background: "rgba(0,184,174,0.04)", border: "1px solid rgba(0,184,174,0.1)", textDecoration: "none", fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }} className="hover:bg-white/10">
                  <span>{label}</span>
                  <FaChevronRight style={{ fontSize: 10, opacity: 0.4 }} />
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(0,184,174,0.08)", background: "rgba(0,0,0,0.25)" }}>
        <div className="container-aygm" style={{ padding: "1.25rem 0" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
            <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.52)" }}>
              {t("footer.copyright").replace("{year}", String(year))}
            </span>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {[
                { label: t("footer.privacy"),       href: "/gizlilik-politikasi" },
                { label: t("footer.accessibility"),  href: "/erisebilirlik" },
                { label: t("footer.cookies"),        href: "/cerez-politikasi" },
              ].map(({ label, href }) => (
                <Link key={href} href={href} style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.52)", textDecoration: "none" }} className="hover:text-white">
                  {label}
                </Link>
              ))}
              <Link href="/4k-billboard" style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.12)", textDecoration: "none", letterSpacing: "0.05em" }} className="hover:text-white/30">
                4K
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
