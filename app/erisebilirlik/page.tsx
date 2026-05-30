import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FaChevronRight, FaUniversalAccess, FaKeyboard, FaMobile, FaEye } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Erişilebilirlik",
  description: "Konya Tramvay 2. Etap resmi proje sitesi erişilebilirlik bildirimi.",
};

const features = [
  {
    icon: FaKeyboard,
    title: "Klavye Navigasyonu",
    desc: "Sitenin tüm işlevleri klavye ile gezinilebilir şekilde tasarlanmıştır. Sekme (Tab) tuşuyla öğeler arasında geçiş yapabilirsiniz.",
  },
  {
    icon: FaEye,
    title: "Renk Kontrastı",
    desc: "Metin ve arka plan renkleri arasındaki kontrast oranı WCAG 2.1 AA standardına uygun olacak şekilde belirlenmiştir.",
  },
  {
    icon: FaMobile,
    title: "Duyarlı Tasarım",
    desc: "Site; masaüstü, tablet ve mobil cihazlarda sorunsuz görüntülenecek şekilde duyarlı (responsive) olarak geliştirilmiştir.",
  },
  {
    icon: FaUniversalAccess,
    title: "Ekran Okuyucu Desteği",
    desc: "Görseller için alternatif metin (alt text), form alanları için etiketler ve anlamlı HTML yapısı ekran okuyucu kullanıcılarını destekler.",
  },
];

export default function ErisebilirlikPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="relative py-16" style={{ background: "linear-gradient(135deg, var(--forest-deep) 0%, var(--forest) 100%)" }}>
          <div className="container-aygm relative z-10">
            <div className="flex items-center gap-2 text-xs mb-5" style={{ color: "rgba(255,255,255,0.45)" }}>
              <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
              <FaChevronRight style={{ fontSize: 8 }} />
              <span style={{ color: "var(--gold)" }}>Erişilebilirlik</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Erişilebilirlik Bildirimi
            </h1>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem" }}>
              T.C. Ulaştırma ve Altyapı Bakanlığı — AYGM &bull; Son güncelleme: Temmuz 2025
            </p>
          </div>
        </div>

        <div className="section-padding" style={{ background: "white" }}>
          <div className="container-aygm" style={{ maxWidth: "860px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>

              <div>
                <h2 className="text-lg font-bold mb-3" style={{ fontFamily: "var(--font-heading)", color: "var(--forest)" }}>
                  Taahhüdümüz
                </h2>
                <p style={{ color: "var(--gray-600)", fontSize: "0.9rem", lineHeight: 1.85 }}>
                  T.C. Ulaştırma ve Altyapı Bakanlığı AYGM olarak, bu web sitesini engelli bireyler dahil tüm kullanıcıların erişebileceği şekilde tasarlamaya kararlıyız. Web İçeriği Erişilebilirlik Kılavuzu (WCAG) 2.1 AA standartlarını karşılamayı hedefliyoruz.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold mb-6" style={{ fontFamily: "var(--font-heading)", color: "var(--forest)" }}>
                  Erişilebilirlik Özellikleri
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {features.map((f) => {
                    const Icon = f.icon;
                    return (
                      <div key={f.title} style={{ border: "1px solid var(--gray-100)", borderRadius: "1rem", padding: "1.5rem" }}>
                        <div style={{ width: 44, height: 44, borderRadius: "0.75rem", background: "rgba(29,92,58,0.07)", border: "1px solid rgba(29,92,58,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                          <Icon style={{ color: "var(--forest)", fontSize: 18 }} />
                        </div>
                        <h3 className="font-bold text-sm mb-2" style={{ color: "var(--forest)", fontFamily: "var(--font-heading)" }}>{f.title}</h3>
                        <p style={{ color: "var(--gray-600)", fontSize: "0.85rem", lineHeight: 1.7 }}>{f.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold mb-3" style={{ fontFamily: "var(--font-heading)", color: "var(--forest)" }}>
                  Bilinen Sınırlılıklar
                </h2>
                <p style={{ color: "var(--gray-600)", fontSize: "0.9rem", lineHeight: 1.85 }}>
                  Bazı PDF formatındaki belgeler tam erişilebilirlik standardını karşılamıyor olabilir. Bu belgeler güncellendikçe erişilebilir versiyonları yayımlanacaktır. Haritalarda sağlanan etkileşimli içerikler üçüncü taraf sağlayıcılara ait olduğundan tam erişilebilirlik garanti edilememektedir.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold mb-3" style={{ fontFamily: "var(--font-heading)", color: "var(--forest)" }}>
                  Geri Bildirim
                </h2>
                <p style={{ color: "var(--gray-600)", fontSize: "0.9rem", lineHeight: 1.85, marginBottom: "1.25rem" }}>
                  Sitede erişilebilirlik sorunuyla karşılaşırsanız bize bildirin. Geri bildirimleriniz erişilebilirliği iyileştirmemize yardımcı olur.
                </p>
                <Link href="/iletisim" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  Geri Bildirim Gönder
                </Link>
              </div>

              <div style={{ background: "var(--pale)", border: "1px solid var(--gray-100)", borderRadius: "1rem", padding: "1.5rem" }}>
                <h3 className="font-bold text-sm mb-2" style={{ color: "var(--forest)", fontFamily: "var(--font-heading)" }}>
                  Yasal Dayanak
                </h3>
                <p style={{ color: "var(--gray-600)", fontSize: "0.825rem", lineHeight: 1.75 }}>
                  Bu bildirim, 26 Ekim 2016 tarihli AB Direktifi (2016/2102) ile 5378 sayılı Engelliler Hakkında Kanun çerçevesinde hazırlanmıştır. Erişilebilirlik şikayetlerinizi ayrıca <a href="https://www.bimer.gov.tr" target="_blank" rel="noopener noreferrer" style={{ color: "var(--forest)", textDecoration: "underline" }}>BİMER</a> üzerinden de iletebilirsiniz.
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
