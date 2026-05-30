"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes, FaTrain, FaChevronDown, FaLeaf, FaInfoCircle, FaRoute, FaHardHat } from "react-icons/fa";

const navLinks = [
  { href: "/", label: "Ana Sayfa" },
  {
    label: "Proje",
    children: [
      { href: "/proje", label: "Proje Hakkında", desc: "Kapsam, hedefler ve teknik veriler", icon: FaInfoCircle },
      { href: "/guzergah", label: "Güzergah & İstasyonlar", desc: "10 km hat, 10 istasyon detayları", icon: FaRoute },
      { href: "/insaat", label: "İnşaat Süreci", desc: "Faz planı ve ilerleme durumu", icon: FaHardHat },
    ],
  },
  { href: "/haberler", label: "Haberler" },
  { href: "/sss", label: "SSS" },
];

function NavEagle() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/eagle.svg"
      alt=""
      aria-hidden
      style={{ width: 34, height: 34, flexShrink: 0, objectFit: "contain" }}
    />
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isProjectActive =
    pathname === "/proje" || pathname === "/guzergah" || pathname === "/insaat";

  return (
    <>
      {/* Top bar */}
      <div
        className="hidden md:flex items-center justify-between py-2 px-6 text-xs"
        style={{
          background: "var(--forest-deep)",
          color: "rgba(255,255,255,0.55)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center gap-5">
          <span style={{ letterSpacing: "0.02em" }}>
            T.C. Ulaştırma ve Altyapı Bakanlığı
          </span>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
          <span style={{ color: "var(--mint)", fontWeight: 600, letterSpacing: "0.02em" }}>
            Altyapı Yatırımları Genel Müdürlüğü (AYGM)
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="https://www.aygm.gov.tr"
            target="_blank"
            className="hover:text-white transition-colors"
            style={{ letterSpacing: "0.02em" }}
          >
            aygm.gov.tr
          </Link>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
          <Link
            href="https://www.uab.gov.tr"
            target="_blank"
            className="hover:text-white transition-colors"
          >
            uab.gov.tr
          </Link>
        </div>
      </div>

      {/* Main navbar */}
      <nav
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(21,69,48,0.98)"
            : "rgba(29,92,58,0.96)",
          backdropFilter: "blur(16px)",
          borderBottom: scrolled
            ? "1px solid rgba(168,213,186,0.15)"
            : "1px solid rgba(255,255,255,0.06)",
          boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.2)" : "none",
        }}
      >
        <div className="container-aygm">
          <div className="flex items-center justify-between h-[68px]">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div
                className="flex items-center justify-center w-9 h-9 rounded-xl group-hover:scale-105 transition-transform"
                style={{
                  background: "rgba(168,213,186,0.15)",
                  border: "1px solid rgba(168,213,186,0.25)",
                }}
              >
                <FaTrain style={{ color: "var(--mint)", fontSize: 15 }} />
              </div>
              <div className="leading-snug">
                <div
                  className="text-white font-bold text-sm tracking-wide"
                  style={{ fontFamily: "var(--font-heading)", letterSpacing: "0.01em" }}
                >
                  Konya Tramvay
                </div>
                <div
                  className="text-xs tracking-widest font-medium"
                  style={{ color: "var(--mint)", fontSize: "0.6rem", letterSpacing: "0.2em" }}
                >
                  2. ETAP — AYGM
                </div>
              </div>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-16">

              {/* Sol grup: Ana Sayfa + Proje */}
              <div className="flex items-center gap-16">
                {navLinks.slice(0, 2).map((link) =>
                  link.children ? (
                    <div
                      key={link.label}
                      className="relative"
                      onMouseEnter={() => setDropdownOpen(true)}
                      onMouseLeave={() => setDropdownOpen(false)}
                    >
                      <button
                        className="flex items-center gap-1.5 nav-link px-4 py-2 rounded-lg hover:bg-white/5 transition-colors text-sm"
                        style={{
                          color: isProjectActive ? "var(--mint)" : "rgba(255,255,255,0.8)",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        {link.label}
                        <FaChevronDown
                          style={{
                            fontSize: 10,
                            transition: "transform 0.2s",
                            transform: dropdownOpen ? "rotate(180deg)" : "rotate(0)",
                            opacity: 0.7,
                          }}
                        />
                      </button>
                      {dropdownOpen && (
                        <div
                          className="absolute top-full left-1/2 mt-3"
                          style={{
                            transform: "translateX(-50%)",
                            width: "320px",
                            background: "rgba(15,45,28,0.97)",
                            backdropFilter: "blur(20px)",
                            border: "1px solid rgba(168,213,186,0.15)",
                            boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
                            borderRadius: "1.25rem",
                            overflow: "hidden",
                          }}
                        >
                          {/* Dropdown header */}
                          <div style={{ padding: "1rem 1.25rem 0.75rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                            <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--mint)", opacity: 0.6 }}>
                              Konya Tramvay 2. Etap
                            </div>
                          </div>
                          {/* Items */}
                          <div style={{ padding: "0.5rem" }}>
                            {link.children.map((child) => {
                              const Icon = child.icon;
                              const isActive = pathname === child.href;
                              return (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.875rem",
                                    padding: "0.875rem 1rem",
                                    borderRadius: "0.75rem",
                                    background: isActive ? "rgba(168,213,186,0.1)" : "transparent",
                                    transition: "background 0.15s",
                                    textDecoration: "none",
                                  }}
                                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
                                >
                                  <div style={{
                                    width: 36, height: 36, borderRadius: "0.625rem", flexShrink: 0,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    background: isActive ? "rgba(168,213,186,0.15)" : "rgba(255,255,255,0.06)",
                                    border: isActive ? "1px solid rgba(168,213,186,0.3)" : "1px solid rgba(255,255,255,0.08)",
                                  }}>
                                    <Icon style={{ color: isActive ? "var(--mint)" : "rgba(255,255,255,0.5)", fontSize: 13 }} />
                                  </div>
                                  <div>
                                    <div style={{ fontSize: "0.875rem", fontWeight: 600, color: isActive ? "var(--mint)" : "rgba(255,255,255,0.85)", fontFamily: "var(--font-body)" }}>
                                      {child.label}
                                    </div>
                                    <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", marginTop: "0.1rem" }}>
                                      {child.desc}
                                    </div>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href!}
                      className="nav-link px-4 py-2 rounded-lg text-sm hover:bg-white/5 transition-colors"
                      style={{
                        color: pathname === link.href ? "var(--mint)" : "rgba(255,255,255,0.8)",
                        fontWeight: pathname === link.href ? 600 : 400,
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </div>

              {/* Çift başlı kartal ayırıcı */}
              <NavEagle />

              {/* Sağ grup: Haberler + SSS */}
              <div className="flex items-center gap-16">
                {navLinks.slice(2).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href!}
                    className="nav-link px-4 py-2 rounded-lg text-sm hover:bg-white/5 transition-colors"
                    style={{
                      color: pathname === link.href ? "var(--mint)" : "rgba(255,255,255,0.8)",
                      fontWeight: pathname === link.href ? 600 : 400,
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

            </div>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
              <Link href="/iletisim" className="btn-contact hidden md:inline-flex">
                <FaLeaf style={{ fontSize: 10, opacity: 0.7 }} />
                İletişim
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2.5 rounded-xl text-white hover:bg-white/10 transition-colors"
                aria-label="Menü"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
              >
                {mobileOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden mobile-menu">
            <div style={{ padding: "1rem 1.25rem 1.5rem" }}>
              {/* Ana linkler */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", marginBottom: "1rem" }}>
                <Link href="/" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.875rem 1rem", borderRadius: "0.75rem", color: pathname === "/" ? "var(--mint)" : "rgba(255,255,255,0.85)", fontWeight: pathname === "/" ? 600 : 400, fontSize: "0.9rem", textDecoration: "none", background: pathname === "/" ? "rgba(168,213,186,0.08)" : "transparent" }}>
                  Ana Sayfa
                </Link>
                <Link href="/haberler" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.875rem 1rem", borderRadius: "0.75rem", color: pathname === "/haberler" ? "var(--mint)" : "rgba(255,255,255,0.85)", fontWeight: pathname === "/haberler" ? 600 : 400, fontSize: "0.9rem", textDecoration: "none", background: pathname === "/haberler" ? "rgba(168,213,186,0.08)" : "transparent" }}>
                  Haberler
                </Link>
                <Link href="/sss" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.875rem 1rem", borderRadius: "0.75rem", color: pathname === "/sss" ? "var(--mint)" : "rgba(255,255,255,0.85)", fontWeight: pathname === "/sss" ? 600 : 400, fontSize: "0.9rem", textDecoration: "none", background: pathname === "/sss" ? "rgba(168,213,186,0.08)" : "transparent" }}>
                  SSS
                </Link>
              </div>

              {/* Proje alt menü */}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "1rem", marginBottom: "1rem" }}>
                <div style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--mint)", opacity: 0.55, padding: "0 0.5rem", marginBottom: "0.5rem" }}>Proje</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.375rem" }}>
                  {[
                    { href: "/proje", label: "Proje Hakkında" },
                    { href: "/guzergah", label: "Güzergah" },
                    { href: "/insaat", label: "İnşaat Süreci" },
                  ].map((child) => (
                    <Link key={child.href} href={child.href} style={{ display: "block", padding: "0.75rem 0.875rem", borderRadius: "0.625rem", background: pathname === child.href ? "rgba(168,213,186,0.1)" : "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", color: pathname === child.href ? "var(--mint)" : "rgba(255,255,255,0.7)", fontSize: "0.8rem", fontWeight: pathname === child.href ? 600 : 400, textDecoration: "none" }}>
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* İletişim butonu */}
              <Link href="/iletisim" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", background: "var(--green)", color: "white", padding: "0.875rem", borderRadius: "0.75rem", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none" }}>
                <FaLeaf style={{ fontSize: 10 }} />
                İletişime Geç
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
