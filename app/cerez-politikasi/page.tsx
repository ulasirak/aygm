import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description: "Konya Tramvay 2. Etap resmi proje sitesi çerez politikası.",
};

const cookieTypes = [
  {
    name: "Zorunlu Çerezler",
    desc: "Sitenin temel işlevleri için gereklidir. Bu çerezler olmaksızın site düzgün çalışmaz. Oturum yönetimi ve güvenlik doğrulaması için kullanılır.",
    examples: "Oturum kimliği, CSRF koruma tokeni",
    duration: "Oturum süresi",
    canDisable: false,
  },
  {
    name: "Performans Çerezleri",
    desc: "Ziyaretçilerin siteyi nasıl kullandığını anlamak amacıyla anonim istatistikler toplar. Sayfaların yüklenme süreleri ve hata raporları bu çerezler aracılığıyla izlenir.",
    examples: "Sayfa görüntüleme sayısı, ziyaret süresi",
    duration: "En fazla 12 ay",
    canDisable: true,
  },
  {
    name: "İşlevsel Çerezler",
    desc: "Tercihlerinizi hatırlamak için kullanılır. Dil seçimi gibi kullanıcı deneyimini iyileştiren ayarlar bu çerezler aracılığıyla saklanır.",
    examples: "Dil tercihi, erişilebilirlik ayarları",
    duration: "En fazak 6 ay",
    canDisable: true,
  },
];

export default function CerezPolitikasiPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="relative py-16" style={{ background: "linear-gradient(135deg, var(--forest-deep) 0%, var(--forest) 100%)" }}>
          <div className="container-aygm relative z-10">
            <div className="flex items-center gap-2 text-xs mb-5" style={{ color: "rgba(255,255,255,0.45)" }}>
              <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
              <FaChevronRight style={{ fontSize: 8 }} />
              <span style={{ color: "var(--gold)" }}>Çerez Politikası</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Çerez Politikası
            </h1>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem" }}>
              T.C. Ulaştırma ve Altyapı Bakanlığı — AYGM &bull; Son güncelleme: Temmuz 2025
            </p>
          </div>
        </div>

        <div className="section-padding" style={{ background: "white" }}>
          <div className="container-aygm" style={{ maxWidth: "860px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>

              <div>
                <h2 className="text-lg font-bold mb-3" style={{ fontFamily: "var(--font-heading)", color: "var(--forest)" }}>
                  Çerez Nedir?
                </h2>
                <p style={{ color: "var(--gray-600)", fontSize: "0.9rem", lineHeight: 1.85 }}>
                  Çerezler, web sitelerinin tarayıcınıza yerleştirdiği küçük metin dosyalarıdır. Bu dosyalar, siteyi tekrar ziyaret ettiğinizde sizi tanımak ve tercihlerinizi hatırlamak için kullanılır. Çerezler kimlik bilgisi içermez ve zararlı yazılım değildir.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold mb-5" style={{ fontFamily: "var(--font-heading)", color: "var(--forest)" }}>
                  Kullandığımız Çerez Türleri
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {cookieTypes.map((c) => (
                    <div key={c.name} style={{ border: "1px solid var(--gray-100)", borderRadius: "1rem", padding: "1.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
                        <h3 className="font-bold text-base" style={{ color: "var(--forest)", fontFamily: "var(--font-heading)" }}>{c.name}</h3>
                        <span style={{
                          fontSize: "0.7rem", fontWeight: 700, padding: "0.2rem 0.75rem",
                          borderRadius: "100px", letterSpacing: "0.06em",
                          background: c.canDisable ? "rgba(201,168,76,0.1)" : "rgba(29,92,58,0.08)",
                          color: c.canDisable ? "var(--gold)" : "var(--green)",
                        }}>
                          {c.canDisable ? "OPSİYONEL" : "ZORUNLU"}
                        </span>
                      </div>
                      <p style={{ color: "var(--gray-600)", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "0.75rem" }}>{c.desc}</p>
                      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
                        <div>
                          <div style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--gray-400)", marginBottom: "0.2rem" }}>Örnekler</div>
                          <div style={{ fontSize: "0.8rem", color: "var(--gray-600)" }}>{c.examples}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--gray-400)", marginBottom: "0.2rem" }}>Saklama Süresi</div>
                          <div style={{ fontSize: "0.8rem", color: "var(--gray-600)" }}>{c.duration}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold mb-3" style={{ fontFamily: "var(--font-heading)", color: "var(--forest)" }}>
                  Çerezleri Nasıl Kontrol Edebilirsiniz?
                </h2>
                <p style={{ color: "var(--gray-600)", fontSize: "0.9rem", lineHeight: 1.85 }}>
                  Tarayıcınızın ayarlar menüsünden çerezleri devre dışı bırakabilir veya silebilirsiniz. Ancak zorunlu çerezlerin devre dışı bırakılması sitenin düzgün çalışmasını engelleyebilir. Popüler tarayıcılarda çerez ayarlarına erişim için tarayıcınızın yardım bölümüne başvurunuz.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold mb-3" style={{ fontFamily: "var(--font-heading)", color: "var(--forest)" }}>
                  İletişim
                </h2>
                <p style={{ color: "var(--gray-600)", fontSize: "0.9rem", lineHeight: 1.85 }}>
                  Çerez politikamıza ilişkin sorularınız için <Link href="/iletisim" style={{ color: "var(--forest)", textDecoration: "underline" }}>iletişim sayfamızı</Link> ziyaret edebilir ya da <a href="mailto:aygm.ozelkalem@uab.gov.tr" style={{ color: "var(--forest)", textDecoration: "underline" }}>aygm.ozelkalem@uab.gov.tr</a> adresine e-posta gönderebilirsiniz.
                </p>
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
