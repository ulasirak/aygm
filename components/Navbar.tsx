"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaBars, FaTimes, FaTrain, FaChevronDown, FaLeaf,
  FaInfoCircle, FaRoute, FaHome, FaNewspaper, FaQuestionCircle,
  FaEnvelope, FaChevronRight, FaSearch, FaGlobe, FaTextHeight, FaLocationArrow,
} from "react-icons/fa";
import { useLang } from "@/context/LangContext";
import { useMobileView } from "@/context/MobileViewContext";
import { LANG_NAMES } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";

/* ── Türkçe karakter + diakritik normalize ── */
const NORM_MAP: Record<string, string> = {
  ı:"i", ğ:"g", ş:"s", ö:"o", ü:"u", ç:"c",
  İ:"i", Ğ:"g", Ş:"s", Ö:"o", Ü:"u", Ç:"c",
};
function norm(s: string): string {
  return s.toLowerCase().split("").map(c => NORM_MAP[c] ?? c).join("")
    .normalize("NFD").replace(/[̀-ͯ]/g, "");
}
function scoreText(hay: string, needle: string): number {
  if (!hay) return 0;
  const h = norm(hay), n = norm(needle);
  if (h === n) return 100;
  if (h.startsWith(n)) return 85;
  const words = h.split(/[\s,·\-_()/[\]]+/);
  for (const w of words) {
    if (w === n) return 78;
    if (w.startsWith(n)) return 55;
  }
  if (h.includes(n)) return 40;
  return 0;
}
function runSearch<T extends { label: string; desc?: string; keywords: string[] }>(
  items: T[], q: string
): T[] {
  const query = q.trim();
  if (query.length < 2) return [];
  return items
    .map(item => ({
      item,
      s: Math.max(
        scoreText(item.label, query),
        scoreText(item.desc ?? "", query),
        ...item.keywords.map(k => scoreText(k, query)),
      ),
    }))
    .filter(x => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 6)
    .map(x => x.item);
}

function NavEagle() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/eagle.svg" alt="" aria-hidden width={34} height={34} style={{ width: 34, height: 34, flexShrink: 0, objectFit: "contain" }} />
  );
}

const SEP   = <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>;
const VLINE = <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.15)", flexShrink: 0 }} />;

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const { mobileView, setMobileView } = useMobileView();

  const [scrolled,      setScrolled]      = useState(false);
  const [visible,       setVisible]       = useState(true);
  const [contextual,    setContextual]    = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [dropdownOpen,  setDropdownOpen]  = useState(false);
  const [projExpanded,  setProjExpanded]  = useState(false);
  const [searchOpen,    setSearchOpen]    = useState(false);
  const [searchQuery,   setSearchQuery]   = useState("");
  const [mobileSearch,  setMobileSearch]  = useState("");
  const [langOpen,      setLangOpen]      = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);

  const pathname    = usePathname();
  const router      = useRouter();
  const hideTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchRef   = useRef<HTMLDivElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const langRef     = useRef<HTMLDivElement>(null);

  const searchIndex = useMemo(() => [
    {
      href: "/", label: t("nav.si_home_label"), icon: FaHome, desc: t("nav.si_home_desc"),
      keywords: [
        "ana sayfa","anasayfa","giriş","konya tramvay","tramvay","etap","2. etap",
        "aygm","uab","ulaştırma","bakanlık","altyapı yatırımları","raylı sistem","metro",
        "konya büyükşehir","belediye","transit","light rail","tram",
        "home","main","start","başlangıç","project overview",
        "tramway","strassenbahn","трамвай","tranvía","tramvia",
      ],
    },
    {
      href: "/proje", label: t("nav.si_project_label"), icon: FaInfoCircle, desc: t("nav.si_project_desc"),
      keywords: [
        "proje","hakkında","kapsam","amaç","hedef","özet","genel","bilgi",
        "10 km","10 istasyon","maliyet","bütçe","yatırım","bütçe",
        "uğursal","onh","ortak girişim","yüklenici","inşaat","sözleşme",
        "30 mayıs","ihale sonucu","aygm","uab","altyapı",
        "134 km","elektrikli","emisyon","çevre","sürdürülebilir",
        "project","about","scope","budget","cost","contractor","investment","overview",
        "projekt","über","sobre el proyecto","о проекте","关于项目",
      ],
    },
    {
      href: "/proje#teknik-veriler", label: t("nav.si_tech_label"), icon: FaInfoCircle, desc: t("nav.si_tech_desc"),
      keywords: [
        "teknik","veri","teknik veri","özellik","parametre",
        "80 km","80 km/sa","hız","maksimum hız","kapasite","60000","yolcu",
        "köprü","üst geçit","ray","tünel","depo","bakım","sinyal","enerji",
        "technical","spec","data","speed","capacity","bridge","overpass","rail",
        "technisch","technique","技术","технический","técnico",
      ],
    },
    {
      href: "/guzergah", label: t("nav.si_route_label"), icon: FaRoute, desc: t("nav.si_route_desc"),
      keywords: [
        "güzergah","guzergah","hat","rota","yol","harita","durak",
        "konya stadyumu","yeni sanayi","şehir hastanesi","hastane","karatay","selçuklu",
        "banliyö","otogar","terminal","konyaray","metro bağlantı","aktarma","transfer",
        "21 durak","21,2 km","entegrasyon","tüyap","fuar","sanayi",
        "route","map","line","path","stop","station list","corridor",
        "strecke","parcours","маршрут","ruta","线路","خط",
      ],
    },
    {
      href: "/yolculuk", label: t("nav.si_journey_label"), icon: FaLocationArrow, desc: t("nav.si_journey_desc"),
      keywords: [
        "yolculuk","yolculuk planla","nasıl giderim","hizmet durumu","sefer","süre","kaç dakika",
        "çıkış","varış","istasyon seç","aktarma","planla","güzergâh planla","seyahat","durak durumu",
        "yapımda","planlanan","açılış durumu","service status","how to get there","plan journey",
        "trip planner","travel time","route planner","from","to","transfer","estimated time",
        "reiseplanung","planificateur","маршрут","planificador","行程",
      ],
    },
    {
      href: "/guzergah#istasyonlar", label: t("nav.si_stations_label"), icon: FaRoute, desc: t("nav.si_stations_desc"),
      keywords: [
        "istasyon","durak","tüm istasyonlar","istasyon listesi",
        "konya stadyumu","stadyum","m1 real","real","ecdad","ecdad bahçesi",
        "otogar","terminal","novaland","çimento","banliyö","banliyo",
        "tüyap","tuyap","fuar","aslidaş","aslidash","yeni sanayi",
        "aslım","aslim","kobisan","atiker","kosgeb","hayvanat bahçesi",
        "şehir hastanesi","hastane","sehir","beydili","horozluhan",
        "selçuklu","karatay","1. etap","phase 1","phase 2",
        "station","stop","halt","stations list",
        "station","bahnhof","gare","станция","estación","车站","محطة",
      ],
    },
    {
      href: "/haberler/temel-atma-toreni", label: t("nav.si_news1_label"), icon: FaNewspaper, desc: t("nav.si_news1_desc"),
      keywords: [
        "temel atma","tören","töreni","7 temmuz","temmuz 2025","july 2025",
        "inşaat başladı","başlangıç","açılış","kutlama","resmi tören",
        "vali","kaymakam","ibrahim akın","altay","ugur ibrahim",
        "groundbreaking","ceremony","construction start","inauguration",
        "grundsteinlegung","cérémonie","церемония",
      ],
    },
    {
      href: "/haberler/ihale-tamamlandi", label: t("nav.si_news2_label"), icon: FaNewspaper, desc: t("nav.si_news2_desc"),
      keywords: [
        "ihale","ihale sonucu","ihale tamamlandı","teklif","sözleşme","imzalandı",
        "uğursal","ugursal","onh","onh inşaat","ortak girişim","yüklenici",
        "9 milyar","9,06 milyar","10,987","bedel","toplam maliyet",
        "30 mayıs","mayıs 2025","may 2025",
        "tender","contract","bid","award","procurement","contractor",
        "ausschreibung","appel d'offres","тендер","licitación",
      ],
    },
    {
      href: "/haberler", label: t("nav.si_allnews_label"), icon: FaNewspaper, desc: t("nav.si_allnews_desc"),
      keywords: [
        "haber","haberler","duyuru","basın","gelişme","güncel","son dakika",
        "devir","vizyon","konyaray","ihale","tören","proje haberleri",
        "news","announcement","press","update","latest","media",
        "nachrichten","nouvelles","новости","noticias","新闻","أخبار",
      ],
    },
    {
      href: "/sss", label: t("nav.si_faq_label"), icon: FaQuestionCircle, desc: t("nav.si_faq_desc"),
      keywords: [
        "sss","soru","cevap","sıkça sorulan","yardım","bilgi","merak edilen",
        "ne zaman","kaç istasyon","bilet","fiyat","açılış tarihi","tamamlanma",
        "faq","question","answer","help","info","frequently asked","q&a",
        "fragen","questions","вопросы","preguntas","问答",
      ],
    },
    {
      href: "/iletisim", label: t("nav.si_contact_label"), icon: FaEnvelope, desc: t("nav.si_contact_desc"),
      keywords: [
        "iletişim","iletisim","telefon","e-posta","email","adres","form","ulaş","yaz",
        "ankara","emek mahallesi","hakkı turalyiç","uab","aygm","bize ulaşın",
        "312","mesaj","görüş","şikayet","öneri",
        "contact","phone","email","address","form","reach","write",
        "kontakt","contacter","связаться","contacto","联系","اتصال",
      ],
    },
    {
      href: "/erisebilirlik#gorsel-boyut", label: t("nav.si_view_label"), icon: FaTextHeight, desc: t("nav.si_view_desc"),
      keywords: [
        "görsel boyut","yazı boyutu","metin boyutu","yakınlaştırılmış","kompakt","normal mod",
        "mobil boyut","erişilebilirlik ayarı","font boyutu","büyük yazı","küçük yazı",
        "view mode","text size","zoom","compact","font size","visual size","accessibility",
        "schriftgröße","taille texte","размер текста","tamaño texto",
      ],
    },
  ], [t]);

  const navLinks = useMemo(() => [
    { href: "/", label: t("nav.home") },
    {
      label: t("nav.project"),
      children: [
        { href: "/proje",    label: t("nav.about"),   desc: t("nav.about_desc"),   icon: FaInfoCircle },
        { href: "/guzergah", label: t("nav.route"),   desc: t("nav.route_desc"),   icon: FaRoute },
        { href: "/yolculuk", label: t("nav.journey"), desc: t("nav.journey_desc"), icon: FaLocationArrow },
      ],
    },
    { href: "/haberler", label: t("nav.news") },
    { href: "/sss",      label: t("nav.faq") },
  ], [t]);

  const searchResults = runSearch(searchIndex, searchQuery);
  const mobileResults = runSearch(searchIndex, mobileSearch);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setContextual(y > 280);
      setVisible(true);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      if (y > 80) {
        hideTimer.current = setTimeout(() => {
          if (window.scrollY > 80) setVisible(false);
        }, 1200);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
    setProjExpanded(false);
    setSearchOpen(false);
    setSearchQuery("");
    setMobileSearch("");
    setLangOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [searchOpen]);

  useEffect(() => {
    if (!langOpen) return;
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [langOpen]);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchInput.current?.focus(), 50);
  }, [searchOpen]);

  const handleSearchKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { setSearchOpen(false); setSearchQuery(""); }
    if (e.key === "Enter" && searchResults.length > 0) {
      router.push(searchResults[0].href);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const isProjectActive = pathname === "/proje" || pathname === "/guzergah";
  const showStats       = (pathname === "/guzergah" || pathname === "/proje") && contextual;
  const statsItems: [string, string][] = pathname === "/proje"
    ? [["10 km", t("navstat.route_label")], ["60.000", t("navstat.daily_passenger")], [t("proje.val_opening"), t("navstat.target_opening")]]
    : [["10 km", t("navstat.route_label")], ["10", t("navstat.phase2_stations")], ["21", t("navstat.total_stations")]];

  const navBg     = scrolled ? "rgba(10,92,88,0.78)"             : "rgba(10,92,88,0.96)";
  const navBorder = scrolled ? "1px solid rgba(111,221,214,0.2)"  : "1px solid rgba(111,221,214,0.1)";
  const navShadow = scrolled ? "0 4px 32px rgba(0,0,0,0.25)"   : "none";
  const navStyle  = { background: navBg, backdropFilter: "blur(20px) saturate(160%)" as const, WebkitBackdropFilter: "blur(20px) saturate(160%)" as const, borderBottom: navBorder, boxShadow: navShadow };

  const topBarCell: React.CSSProperties = {
    background: "#0A5C58", color: "rgba(255,255,255,0.55)",
    borderBottom: "1px solid rgba(111,221,214,0.12)",
    fontSize: "0.75rem", display: "flex", alignItems: "center",
    justifyContent: "center", gap: 8, padding: "8px 0",
  };

  const langNames = LANG_NAMES;

  const handleNavMouseEnter = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setVisible(true);
  };

  const handleNavMouseLeave = () => {
    if (window.scrollY > 80) {
      hideTimer.current = setTimeout(() => {
        if (window.scrollY > 80) setVisible(false);
      }, 1200);
    }
  };

  return (
    <nav
      className="navbar-aygm"
      onMouseEnter={handleNavMouseEnter}
      onMouseLeave={handleNavMouseLeave}
      style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      transform: visible ? "translateY(0)" : "translateY(-100%)",
      transition: "transform 0.32s cubic-bezier(0.4, 0, 0.2, 1)",
    }}>

      {/* ══════════ MOBİL HEADER BAR ══════════ */}
      <div className="md:hidden flex items-center justify-between"
        style={{ ...navStyle, height: 58, padding: "0 1rem" }}>
        <Link href="/" className="flex items-center gap-2.5" style={{ textDecoration: "none" }}>
          <div style={{ width: 34, height: 34, borderRadius: "0.625rem", flexShrink: 0, background: "rgba(111,221,214,0.15)", border: "1px solid rgba(111,221,214,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <FaTrain style={{ color: "#6FDDD6", fontSize: 14 }} />
          </div>
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ color: "white", fontWeight: 700, fontSize: "0.88rem", fontFamily: "var(--font-heading)", letterSpacing: "0.01em" }}>Konya Tramvay</div>
            <div style={{ color: "#6FDDD6", fontSize: "0.52rem", letterSpacing: "0.22em", fontWeight: 600, textTransform: "uppercase" }}>{t("nav.phase_label")}</div>
          </div>
        </Link>
        <button onClick={() => setMobileOpen(!mobileOpen)} aria-label={t("common.menu")} style={{ width: 38, height: 38, borderRadius: "0.625rem", background: mobileOpen ? "rgba(111,221,214,0.15)" : "rgba(255,255,255,0.06)", border: mobileOpen ? "1px solid rgba(111,221,214,0.35)" : "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: mobileOpen ? "#6FDDD6" : "rgba(255,255,255,0.85)", transition: "all 0.2s" }}>
          {mobileOpen ? <FaTimes size={14} /> : <FaBars size={14} />}
        </button>
      </div>

      {/* ══════════ DESKTOP NAV ══════════ */}
      <div className="hidden md:grid" style={{ gridTemplateColumns: "1fr auto 1fr" }}>
        <div className="hidden md:flex pl-8 lg:pl-16" style={topBarCell}>
          <span style={{ color: "#6FDDD6", fontWeight: 600, letterSpacing: "0.02em" }}>{t("footer.uab_label")}</span>
          {SEP}
          <Link href="https://www.uab.gov.tr" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" style={{ letterSpacing: "0.02em" }}>uab.gov.tr</Link>
        </div>
        <div className="hidden md:flex" style={{ ...topBarCell, padding: "8px 48px", borderBottom: "1px solid rgba(111,221,214,0.12)" }}>
          <span style={{ fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6FDDD6", fontSize: "0.65rem", whiteSpace: "nowrap" }}>{t("nav.topbar_center")}</span>
        </div>
        <div className="hidden md:flex pr-8 lg:pr-16" style={topBarCell}>
          <span style={{ color: "#6FDDD6", fontWeight: 600, letterSpacing: "0.02em" }}>{t("footer.aygm_label")}</span>
          {SEP}
          <Link href="https://www.aygm.gov.tr" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" style={{ letterSpacing: "0.02em" }}>aygm.gov.tr</Link>
        </div>

        <div className="hidden md:flex items-center justify-center pl-8 lg:pl-16" style={{ ...navStyle, height: 68 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/aygm-amblem.svg" alt="T.C. Ulaştırma ve Altyapı Bakanlığı" width={52} height={52} style={{ height: 52, opacity: 0.9 }} />
        </div>

        <div className="hidden md:flex items-center gap-4" style={{ ...navStyle, height: 68 }}>
          <Link href="/" className="flex items-center gap-3 group mr-4">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl group-hover:scale-105 transition-transform" style={{ background: "rgba(111,221,214,0.15)", border: "1px solid rgba(111,221,214,0.25)" }}>
              <FaTrain style={{ color: "#6FDDD6", fontSize: 15 }} />
            </div>
            <div className="leading-snug">
              <div className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-heading)", letterSpacing: "0.01em" }}>Konya Tramvay</div>
              <div style={{ color: "#6FDDD6", fontSize: "0.6rem", letterSpacing: "0.2em", fontWeight: 500, textTransform: "uppercase" }}>{t("nav.phase_label")}</div>
            </div>
          </Link>

          {VLINE}

          <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "4rem", opacity: showStats ? 0 : 1, transition: "opacity 0.35s ease", pointerEvents: showStats ? "none" : "auto" }}>
              <div className="flex items-center gap-16">
                {navLinks.slice(0, 2).map((link) =>
                  link.children ? (
                    <div key={link.label} className="relative" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
                      <button className="flex items-center gap-1.5 nav-link px-4 py-2 rounded-lg hover:bg-white/5 transition-colors text-sm" style={{ color: isProjectActive ? "#6FDDD6" : "rgba(255,255,255,0.8)", fontFamily: "var(--font-body)" }}>
                        {link.label}
                        <FaChevronDown style={{ fontSize: 10, transition: "transform 0.2s", transform: dropdownOpen ? "rotate(180deg)" : "rotate(0)", opacity: 0.7 }} />
                      </button>
                      {dropdownOpen && (
                        <div className="absolute top-full left-1/2 mt-3" style={{ transform: "translateX(-50%)", width: "320px", background: "rgba(10,92,88,0.97)", backdropFilter: "blur(20px)", border: "1px solid rgba(111,221,214,0.15)", boxShadow: "0 24px 60px rgba(0,0,0,0.45)", borderRadius: "1.25rem", overflow: "hidden" }}>
                          <div style={{ padding: "1rem 1.25rem 0.75rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                            <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6FDDD6", opacity: 0.6 }}>{t("nav.dropdown_label")}</div>
                          </div>
                          <div style={{ padding: "0.5rem" }}>
                            {link.children.map((child) => {
                              const Icon = child.icon;
                              const isActive = pathname === child.href;
                              return (
                                <Link key={child.href} href={child.href} style={{ display: "flex", alignItems: "center", gap: "0.875rem", padding: "0.875rem 1rem", borderRadius: "0.75rem", background: isActive ? "rgba(111,221,214,0.1)" : "transparent", transition: "background 0.15s", textDecoration: "none" }} onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }} onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}>
                                  <div style={{ width: 36, height: 36, borderRadius: "0.625rem", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: isActive ? "rgba(111,221,214,0.15)" : "rgba(255,255,255,0.06)", border: isActive ? "1px solid rgba(111,221,214,0.3)" : "1px solid rgba(255,255,255,0.08)" }}>
                                    <Icon style={{ color: isActive ? "#6FDDD6" : "rgba(255,255,255,0.5)", fontSize: 13 }} />
                                  </div>
                                  <div>
                                    <div style={{ fontSize: "0.875rem", fontWeight: 600, color: isActive ? "#6FDDD6" : "rgba(255,255,255,0.85)", fontFamily: "var(--font-body)" }}>{child.label}</div>
                                    <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", marginTop: "0.1rem" }}>{child.desc}</div>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link key={link.href} href={link.href!} className="nav-link px-4 py-2 rounded-lg text-sm hover:bg-white/5 transition-colors" style={{ color: pathname === link.href ? "#6FDDD6" : "rgba(255,255,255,0.8)", fontWeight: pathname === link.href ? 600 : 400, fontFamily: "var(--font-body)" }}>
                      {link.label}
                    </Link>
                  )
                )}
              </div>
              <div style={{ flexShrink: 0 }}><NavEagle /></div>
              <div className="flex items-center gap-16">
                {navLinks.slice(2).map((link) => (
                  <Link key={link.href} href={link.href!} className="nav-link px-4 py-2 rounded-lg text-sm hover:bg-white/5 transition-colors" style={{ color: pathname === link.href ? "#6FDDD6" : "rgba(255,255,255,0.8)", fontWeight: pathname === link.href ? 600 : 400, fontFamily: "var(--font-body)" }}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div style={{ position: "absolute", display: "flex", alignItems: "center", gap: "2.5rem", opacity: showStats ? 1 : 0, transition: "opacity 0.35s ease", pointerEvents: showStats ? "auto" : "none" }}>
              {statsItems.map(([num, label], i, arr) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "white", fontFamily: "var(--font-heading)", lineHeight: 1 }}>{num}</div>
                    <div style={{ fontSize: "0.58rem", color: "rgba(111,221,214,0.75)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "0.2rem" }}>{label}</div>
                  </div>
                  {i < arr.length - 1 && <span style={{ color: "rgba(111,221,214,0.2)", fontSize: 5 }}>◆</span>}
                </div>
              ))}
            </div>
          </div>

          {VLINE}

          {/* ══ ARAMA ══ */}
          <div ref={searchRef} style={{ position: "relative", display: "flex", alignItems: "center" }}>
            {searchOpen ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <FaSearch style={{ position: "absolute", left: 10, color: "rgba(111,221,214,0.55)", fontSize: 11, pointerEvents: "none", zIndex: 1 }} />
                  <input
                    ref={searchInput}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearchKey}
                    placeholder={t("nav.search_placeholder")}
                    style={{ paddingLeft: 30, paddingRight: 12, paddingTop: 8, paddingBottom: 8, borderRadius: "0.625rem", border: "1px solid rgba(111,221,214,0.35)", background: "rgba(111,221,214,0.07)", color: "white", fontSize: "0.825rem", fontFamily: "var(--font-body)", outline: "none", width: 180 }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(111,221,214,0.6)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(111,221,214,0.35)"; }}
                  />
                </div>
                <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }} style={{ width: 30, height: 30, borderRadius: "0.5rem", flexShrink: 0, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.45)", cursor: "pointer" }}>
                  <FaTimes size={9} />
                </button>
              </div>
            ) : (
              <button onClick={() => setSearchOpen(true)} aria-label={t("nav.search_aria_label")} style={{ width: 36, height: 36, borderRadius: "0.625rem", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.6)", cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(111,221,214,0.1)"; e.currentTarget.style.borderColor = "rgba(111,221,214,0.3)"; e.currentTarget.style.color = "#6FDDD6"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}>
                <FaSearch size={12} />
              </button>
            )}

            {searchOpen && searchQuery.trim().length > 0 && (
              <div style={{ position: "absolute", top: "calc(100% + 12px)", right: 0, width: 280, background: "rgba(10,92,88,0.97)", backdropFilter: "blur(20px)", border: "1px solid rgba(111,221,214,0.15)", boxShadow: "0 20px 50px rgba(0,0,0,0.45)", borderRadius: "1rem", overflow: "hidden", zIndex: 100 }}>
                {searchResults.length > 0 ? (
                  <>
                    <div style={{ padding: "0.625rem 1rem 0.375rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      <div style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(111,221,214,0.6)" }}>{t("nav.search_n_results").replace("{n}", String(searchResults.length))}</div>
                    </div>
                    <div style={{ padding: "0.375rem" }}>
                      {searchResults.map((item) => {
                        const Icon = item.icon;
                        return (
                          <button key={item.href} onClick={() => { router.push(item.href); setSearchOpen(false); setSearchQuery(""); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 0.875rem", borderRadius: "0.75rem", background: "transparent", border: "none", cursor: "pointer", textAlign: "left", transition: "background 0.15s" }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(111,221,214,0.08)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
                            <div style={{ width: 32, height: 32, borderRadius: "0.5rem", flexShrink: 0, background: "rgba(111,221,214,0.1)", border: "1px solid rgba(111,221,214,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <Icon style={{ color: "#6FDDD6", fontSize: 12 }} />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-body)", fontWeight: 500 }}>{item.label}</div>
                              {item.desc && <div style={{ fontSize: "0.68rem", color: "rgba(111,221,214,0.55)", marginTop: "0.1rem", lineHeight: 1.3 }}>{item.desc}</div>}
                            </div>
                            <FaChevronRight style={{ color: "rgba(111,221,214,0.4)", fontSize: 9, marginLeft: "auto", flexShrink: 0 }} />
                          </button>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div style={{ padding: "1.25rem", textAlign: "center" }}>
                    <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)" }}>{t("nav.search_no_results")}</div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ══ DİL SEÇİCİ ══ */}
          <div ref={langRef} style={{ position: "relative" }}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              aria-label={t("common.lang_select")}
              style={{ display: "flex", alignItems: "center", gap: 6, height: 36, padding: "0 12px", borderRadius: "0.625rem", background: langOpen ? "rgba(111,221,214,0.12)" : "rgba(255,255,255,0.06)", border: langOpen ? "1px solid rgba(111,221,214,0.35)" : "1px solid rgba(255,255,255,0.1)", color: langOpen ? "#6FDDD6" : "rgba(255,255,255,0.75)", cursor: "pointer", fontSize: "0.78rem", fontFamily: "var(--font-body)", fontWeight: 500, transition: "all 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(111,221,214,0.1)"; e.currentTarget.style.borderColor = "rgba(111,221,214,0.3)"; e.currentTarget.style.color = "#6FDDD6"; }}
              onMouseLeave={(e) => { if (!langOpen) { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; } }}
            >
              <FaGlobe size={11} />
              <span style={{ letterSpacing: "0.03em" }}>{langNames[lang]}</span>
              <FaChevronDown size={9} style={{ opacity: 0.6, transform: langOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} />
            </button>
            {langOpen && (
              <div style={{ position: "absolute", top: "calc(100% + 10px)", right: 0, width: 160, background: "rgba(10,92,88,0.97)", backdropFilter: "blur(20px)", border: "1px solid rgba(111,221,214,0.15)", boxShadow: "0 16px 40px rgba(0,0,0,0.4)", borderRadius: "0.875rem", overflow: "hidden", zIndex: 200 }}>
                <div style={{ padding: "0.375rem" }}>
                  {(Object.entries(langNames) as [Lang, string][]).map(([code, name]) => (
                    <button
                      key={code}
                      onClick={() => { setLang(code); setLangOpen(false); }}
                      style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.55rem 0.875rem", borderRadius: "0.5rem", background: lang === code ? "rgba(111,221,214,0.12)" : "transparent", border: "none", cursor: "pointer", color: lang === code ? "#6FDDD6" : "rgba(255,255,255,0.75)", fontSize: "0.82rem", fontFamily: "var(--font-body)", fontWeight: lang === code ? 600 : 400, textAlign: "left", transition: "background 0.15s" }}
                      onMouseEnter={(e) => { if (lang !== code) e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                      onMouseLeave={(e) => { if (lang !== code) e.currentTarget.style.background = "transparent"; }}
                    >
                      {name}
                      {lang === code && <span style={{ fontSize: 8, color: "#6FDDD6" }}>✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/iletisim" className="btn-contact ml-2">
            <FaLeaf style={{ fontSize: 10, opacity: 0.7 }} />
            {t("nav.contact_cta")}
          </Link>
        </div>

        <div className="hidden md:flex items-center justify-center pr-8 lg:pr-16" style={{ ...navStyle, height: 68 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/aygm-logo-transparent.png" alt="Altyapı Yatırımları Genel Müdürlüğü" style={{ height: 80, opacity: 0.95 }} />
        </div>
      </div>

      {/* ══════════ MOBİL MENÜ PANELİ ══════════ */}
      {mobileOpen && (
        <div className="md:hidden" style={{ background: "rgba(10,92,88,0.98)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(111,221,214,0.12)", boxShadow: "0 16px 40px rgba(0,0,0,0.4)", maxHeight: "calc(100svh - 58px)", overflowY: "auto", overscrollBehavior: "contain" }}>
          <div style={{ padding: "0.75rem 1rem 1.25rem" }}>

            <div style={{ marginBottom: "0.75rem" }}>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <FaSearch style={{ position: "absolute", left: 12, color: "rgba(111,221,214,0.5)", fontSize: 12, pointerEvents: "none", zIndex: 1 }} />
                <input
                  value={mobileSearch}
                  onChange={(e) => setMobileSearch(e.target.value)}
                  placeholder={t("nav.mobile_search_placeholder")}
                  style={{ width: "100%", paddingLeft: 36, paddingRight: 12, paddingTop: 10, paddingBottom: 10, borderRadius: "0.75rem", border: "1px solid rgba(111,221,214,0.2)", background: "rgba(111,221,214,0.06)", color: "white", fontSize: "0.85rem", fontFamily: "var(--font-body)", outline: "none" }}
                />
              </div>
              {mobileSearch.trim().length > 0 && (
                <div style={{ marginTop: "0.5rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  {mobileResults.length > 0 ? mobileResults.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link key={item.href} href={item.href} onClick={() => setMobileSearch("")} style={{ display: "flex", alignItems: "center", gap: "0.625rem", padding: "0.625rem 0.875rem", borderRadius: "0.625rem", background: "rgba(111,221,214,0.08)", border: "1px solid rgba(111,221,214,0.15)", textDecoration: "none" }}>
                        <Icon style={{ color: "#6FDDD6", fontSize: 11, flexShrink: 0 }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: "0.825rem", color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-body)" }}>{item.label}</div>
                          {item.desc && <div style={{ fontSize: "0.67rem", color: "rgba(111,221,214,0.55)", marginTop: "0.05rem" }}>{item.desc}</div>}
                        </div>
                        <FaChevronRight style={{ color: "rgba(111,221,214,0.4)", fontSize: 8, marginLeft: "auto", flexShrink: 0 }} />
                      </Link>
                    );
                  }) : (
                    <div style={{ padding: "0.625rem 0.875rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.35)", textAlign: "center", fontFamily: "var(--font-body)" }}>{t("nav.search_no_results")}</div>
                  )}
                </div>
              )}
            </div>

            <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: "0.75rem" }} />

            <MobileLink href="/" label={t("nav.home")} Icon={FaHome} active={pathname === "/"} />

            <div>
              <button onClick={() => setProjExpanded(!projExpanded)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 0.875rem", borderRadius: "0.75rem", background: isProjectActive ? "rgba(111,221,214,0.08)" : "transparent", border: "none", cursor: "pointer", marginBottom: "0.125rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ width: 30, height: 30, borderRadius: "0.5rem", background: isProjectActive ? "rgba(111,221,214,0.15)" : "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <FaTrain style={{ color: isProjectActive ? "#6FDDD6" : "rgba(255,255,255,0.45)", fontSize: 11 }} />
                  </div>
                  <span style={{ fontSize: "0.875rem", fontWeight: isProjectActive ? 600 : 400, color: isProjectActive ? "#6FDDD6" : "rgba(255,255,255,0.85)" }}>{t("nav.project")}</span>
                </div>
                <FaChevronDown style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, transform: projExpanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} />
              </button>
              {projExpanded && (
                <div style={{ paddingLeft: "0.75rem", paddingBottom: "0.25rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  {[
                    { href: "/proje",    label: t("nav.about"),   icon: FaInfoCircle },
                    { href: "/guzergah", label: t("nav.route"),   icon: FaRoute },
                    { href: "/yolculuk", label: t("nav.journey"), icon: FaLocationArrow },
                  ].map(({ href, label, icon: Icon }) => {
                    const active = pathname === href;
                    return (
                      <Link key={href} href={href} style={{ display: "flex", alignItems: "center", gap: "0.625rem", padding: "0.625rem 0.875rem", borderRadius: "0.625rem", background: active ? "rgba(111,221,214,0.1)" : "rgba(255,255,255,0.03)", border: active ? "1px solid rgba(111,221,214,0.2)" : "1px solid rgba(255,255,255,0.05)", textDecoration: "none" }}>
                        <Icon style={{ color: active ? "#6FDDD6" : "rgba(255,255,255,0.35)", fontSize: 11, flexShrink: 0 }} />
                        <span style={{ fontSize: "0.825rem", fontWeight: active ? 600 : 400, color: active ? "#6FDDD6" : "rgba(255,255,255,0.7)" }}>{label}</span>
                        {active && <FaChevronRight style={{ color: "#6FDDD6", fontSize: 8, marginLeft: "auto" }} />}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <MobileLink href="/haberler" label={t("nav.news")}    Icon={FaNewspaper}      active={pathname === "/haberler"} />
            <MobileLink href="/sss"      label={t("nav.faq")}     Icon={FaQuestionCircle} active={pathname === "/sss"} />

            <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "0.75rem 0" }} />

            {/* Görsel Boyut toggle — mobil */}
            <div style={{ marginBottom: "0.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", padding: "0.5rem 0.875rem 0.4rem", color: "rgba(255,255,255,0.35)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                <FaTextHeight style={{ fontSize: 9 }} />
                {t("mobile_view.title")}
              </div>
              <div style={{ display: "flex", gap: "0.375rem", padding: "0 0.875rem 0.75rem" }}>
                {(["zoomed", "normal"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setMobileView(v)}
                    style={{
                      flex: 1, padding: "0.5rem 0.25rem", borderRadius: "0.625rem",
                      border: mobileView === v ? "1px solid rgba(111,221,214,0.5)" : "1px solid rgba(255,255,255,0.08)",
                      background: mobileView === v ? "rgba(111,221,214,0.12)" : "rgba(255,255,255,0.03)",
                      color: mobileView === v ? "#6FDDD6" : "rgba(255,255,255,0.55)",
                      fontSize: "0.78rem", fontWeight: mobileView === v ? 600 : 400,
                      fontFamily: "var(--font-body)", cursor: "pointer",
                      display: "flex", flexDirection: "column", alignItems: "center", gap: "0.15rem",
                    }}
                  >
                    <span>{t(`mobile_view.${v}`)}</span>
                    <span style={{ fontSize: "0.6rem", opacity: 0.7 }}>{t(`mobile_view.${v}_hint`)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dil seçici — mobil */}
            <div style={{ marginBottom: "0.75rem" }}>
              <button
                onClick={() => setMobileLangOpen(!mobileLangOpen)}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 0.875rem", borderRadius: "0.75rem", background: mobileLangOpen ? "rgba(111,221,214,0.08)" : "rgba(255,255,255,0.03)", border: mobileLangOpen ? "1px solid rgba(111,221,214,0.2)" : "1px solid rgba(255,255,255,0.05)", cursor: "pointer" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ width: 30, height: 30, borderRadius: "0.5rem", background: "rgba(111,221,214,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <FaGlobe style={{ color: "#6FDDD6", fontSize: 11 }} />
                  </div>
                  <span style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.85)" }}>{langNames[lang]}</span>
                </div>
                <FaChevronDown style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, transform: mobileLangOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} />
              </button>
              {mobileLangOpen && (
                <div style={{ marginTop: "0.25rem", paddingLeft: "0.75rem", display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                  {(Object.entries(langNames) as [Lang, string][]).map(([code, name]) => (
                    <button
                      key={code}
                      onClick={() => { setLang(code); setMobileLangOpen(false); }}
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.55rem 0.875rem", borderRadius: "0.5rem", background: lang === code ? "rgba(111,221,214,0.1)" : "rgba(255,255,255,0.03)", border: "none", cursor: "pointer", color: lang === code ? "#6FDDD6" : "rgba(255,255,255,0.7)", fontSize: "0.82rem", fontFamily: "var(--font-body)", fontWeight: lang === code ? 600 : 400 }}
                    >
                      {name}
                      {lang === code && <span style={{ fontSize: 8, color: "#6FDDD6" }}>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link href="/iletisim" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", background: "linear-gradient(135deg, #0B7C77, #6FDDD6)", color: "white", padding: "0.875rem", borderRadius: "0.875rem", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none", boxShadow: "0 4px 16px rgba(111,221,214,0.2)" }}>
              <FaEnvelope style={{ fontSize: 12 }} />
              {t("nav.contact_cta")}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

function MobileLink({ href, label, Icon, active }: { href: string; label: string; Icon: React.ElementType; active: boolean }) {
  return (
    <Link href={href} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 0.875rem", borderRadius: "0.75rem", marginBottom: "0.125rem", background: active ? "rgba(111,221,214,0.08)" : "transparent", textDecoration: "none" }}>
      <div style={{ width: 30, height: 30, borderRadius: "0.5rem", flexShrink: 0, background: active ? "rgba(111,221,214,0.15)" : "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon style={{ color: active ? "#6FDDD6" : "rgba(255,255,255,0.45)", fontSize: 11 }} />
      </div>
      <span style={{ fontSize: "0.875rem", fontWeight: active ? 600 : 400, color: active ? "#6FDDD6" : "rgba(255,255,255,0.85)" }}>{label}</span>
      {active && <FaChevronRight style={{ color: "#6FDDD6", fontSize: 8, marginLeft: "auto" }} />}
    </Link>
  );
}
