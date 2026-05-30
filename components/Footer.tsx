import Link from "next/link";
import {
  FaTrain, FaPhone, FaEnvelope, FaMapMarkerAlt,
  FaExternalLinkAlt, FaChevronRight
} from "react-icons/fa";

const footerLinks = [
  {
    title: "Proje",
    links: [
      { href: "/proje", label: "Proje Hakkında" },
      { href: "/guzergah", label: "Güzergah & İstasyonlar" },
      { href: "/insaat", label: "İnşaat Süreci" },
      { href: "/haberler", label: "Haberler & Duyurular" },
      { href: "/sss", label: "Sıkça Sorulan Sorular" },
    ],
  },
  {
    title: "Kurumsal",
    links: [
      { href: "https://www.aygm.gov.tr", label: "AYGM Resmi Sitesi", external: true },
      { href: "https://www.uab.gov.tr", label: "Ulaştırma ve Altyapı Bakanlığı", external: true },
      { href: "https://www.konya.bel.tr", label: "Konya Büyükşehir Belediyesi", external: true },
      { href: "https://www.konyaray.com.tr", label: "KONYARAY", external: true },
      { href: "https://www.bimer.gov.tr", label: "BİMER Başvuru", external: true },
    ],
  },
];

const stats = [
  { value: "10 km", label: "Hat Uzunluğu" },
  { value: "10", label: "İstasyon" },
  { value: "%42", label: "Tamamlandı" },
  { value: "2027", label: "Hedef" },
];

export default function Footer() {

  return (
    <footer style={{ background: "var(--forest-deep)", color: "rgba(255,255,255,0.65)" }}>

      {/* Üst aksan */}
      <div style={{ height: 3, background: "linear-gradient(90deg, var(--green) 0%, var(--mint) 50%, transparent 100%)" }} />


      {/* Ana gövde */}
      <div className="container-aygm" style={{ padding: "2rem 0 2rem" }}>
        <div className="footer-grid" style={{ display: "grid", gap: "2rem", alignItems: "start" }}>

          {/* Marka + iletişim */}
          <div>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1.25rem", textDecoration: "none", width: "fit-content" }}>
              <div style={{ width: 44, height: 44, borderRadius: "0.875rem", background: "rgba(168,213,186,0.1)", border: "1px solid rgba(168,213,186,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FaTrain style={{ color: "var(--mint)", fontSize: 17 }} />
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "white", letterSpacing: "0.01em" }}>
                  Konya Tramvay 2. Etap
                </div>
                <div style={{ fontSize: "0.58rem", color: "var(--mint)", opacity: 0.6, letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "0.15rem" }}>
                  AYGM — Ulaştırma ve Altyapı Bakanlığı
                </div>
              </div>
            </Link>

            <p className="hidden md:block" style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.8, marginBottom: "2rem", maxWidth: "22rem" }}>
              T.C. Ulaştırma ve Altyapı Bakanlığı Altyapı Yatırımları Genel Müdürlüğü tarafından yürütülen resmi proje bilgi sitesi.
            </p>

            <div className="hidden md:flex" style={{ flexDirection: "column", gap: "0.875rem" }}>
              {[
                { icon: FaMapMarkerAlt, text: "Hakkı Turayliç Cad. No:5, Emek / Çankaya / Ankara", href: "https://maps.google.com/?q=AYGM+Altyapı+Yatırımları+Genel+Müdürlüğü+Ankara", external: true },
                { icon: FaPhone, text: "+90 (312) 203 10 00", href: "tel:+903122031000", external: false },
                { icon: FaEnvelope, text: "konya@aygm.gov.tr", href: "mailto:konya@aygm.gov.tr", external: false },
              ].map(({ icon: Icon, text, href, external }) => (
                <Link key={text} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}
                  style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", textDecoration: "none", cursor: "pointer" }}
                  className="group"
                >
                  <div style={{ width: 30, height: 30, borderRadius: "0.5rem", background: "rgba(168,213,186,0.07)", border: "1px solid rgba(168,213,186,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.2s" }}>
                    <Icon style={{ color: "var(--mint)", fontSize: 10, opacity: 0.7 }} />
                  </div>
                  <span className="group-hover:text-white transition-colors" style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{text}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Link sütunları */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--mint)", opacity: 0.6, marginBottom: "1.5rem" }}>
                {section.title}
              </h4>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.6rem", listStyle: "none", padding: 0, margin: 0 }}>
                {section.links.map((link, i) => (
                  <li key={`${link.href}-${i}`}>
                    <Link
                      href={link.href}
                      target={(link as { external?: boolean }).external ? "_blank" : undefined}
                      rel={(link as { external?: boolean }).external ? "noopener noreferrer" : undefined}
                      style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.825rem", color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s" }}
                      className="footer-link"
                    >
                      {link.label}
                      {(link as { external?: boolean }).external && (
                        <FaExternalLinkAlt style={{ fontSize: 7, opacity: 0.3, flexShrink: 0 }} />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Hızlı erişim - mobilde gizli */}
          <div className="hidden md:block">
            <h4 style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--mint)", opacity: 0.6, marginBottom: "1.5rem" }}>
              Hızlı Erişim
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <Link href="/iletisim" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1rem", borderRadius: "0.75rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", textDecoration: "none", fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", transition: "background 0.2s" }}
                className="hover:bg-white/10">
                <span>İletişime Geç</span>
                <FaChevronRight style={{ fontSize: 10, opacity: 0.4 }} />
              </Link>
              <Link href="/haberler" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1rem", borderRadius: "0.75rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", textDecoration: "none", fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", transition: "background 0.2s" }}
                className="hover:bg-white/10">
                <span>Son Haberler</span>
                <FaChevronRight style={{ fontSize: 10, opacity: 0.4 }} />
              </Link>
              <Link href="/sss" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1rem", borderRadius: "0.75rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", textDecoration: "none", fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", transition: "background 0.2s" }}
                className="hover:bg-white/10">
                <span>Sıkça Sorulan Sorular</span>
                <FaChevronRight style={{ fontSize: 10, opacity: 0.4 }} />
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Alt bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.2)" }}>
        <div className="container-aygm" style={{ padding: "1.25rem 0" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
            <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.28)" }}>
              © {new Date().getFullYear()} T.C. Ulaştırma ve Altyapı Bakanlığı — AYGM. Tüm hakları saklıdır.
            </span>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {[
                { label: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
                { label: "Erişilebilirlik", href: "/erisebilirlik" },
                { label: "Çerez Politikası", href: "/cerez-politikasi" },
              ].map(({ label, href }) => (
                <Link key={label} href={href}
                  style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.28)", textDecoration: "none", transition: "color 0.2s" }}
                  className="hover:text-white">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
