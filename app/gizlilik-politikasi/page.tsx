import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "Konya Tramvay 2. Etap resmi proje sitesi gizlilik politikası.",
};

const sections = [
  {
    title: "1. Veri Sorumlusu",
    content: `Bu web sitesi, T.C. Ulaştırma ve Altyapı Bakanlığı Altyapı Yatırımları Genel Müdürlüğü (AYGM) tarafından işletilmektedir. Kişisel verileriniz bakımından veri sorumlusu sıfatını taşıyan kurum AYGM'dir.\n\nAdres: Hakkı Turayliç Cad. No:5, 06338 Emek / Çankaya / Ankara\nTelefon: +90 (312) 203 10 00\nE-posta: aygm.ozelkalem@uab.gov.tr`,
  },
  {
    title: "2. Toplanan Veriler ve Amaçları",
    content: `Sitemizi ziyaret ettiğinizde aşağıdaki veriler işlenebilir:\n\n• İletişim formu aracılığıyla ilettiğiniz ad, soyad, e-posta adresi ve mesaj içeriği — yalnızca talebinizin karşılanması amacıyla.\n• Teknik erişim verileri (IP adresi, tarayıcı türü, ziyaret süresi) — sitenin güvenliğini sağlamak ve hizmet kalitesini iyileştirmek amacıyla.\n• Çerezler aracılığıyla toplanan oturum bilgileri — kullanıcı deneyimini kişiselleştirmek amacıyla.`,
  },
  {
    title: "3. Hukuki Dayanak",
    content: `Kişisel verileriniz, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) çerçevesinde;\n\n• Açık rızanıza dayanılarak (iletişim formu),\n• Kanunda öngörülen hallerde ilgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla meşru menfaatimiz gereği (teknik veriler)\n\nişlenmektedir.`,
  },
  {
    title: "4. Veri Güvenliği",
    content: `AYGM, kişisel verilerin yetkisiz erişim, kayıp veya ifşa edilmesini önlemek amacıyla SSL şifreleme, güvenlik duvarı ve erişim kontrol sistemleri gibi teknik ve idari tedbirleri almaktadır. Kişisel verileriniz üçüncü taraflarla paylaşılmaz; yalnızca yasal zorunluluk halinde yetkili kamu kurumlarıyla paylaşım söz konusu olabilir.`,
  },
  {
    title: "5. Saklama Süresi",
    content: `Kişisel verileriniz, işlenme amacının gerektirdiği süre boyunca ve ilgili mevzuatta öngörülen saklama sürelerine uygun olarak muhafaza edilir. İletişim formundan iletilen veriler, talebin sonuçlandırılmasından itibaren en fazla 2 yıl saklanır.`,
  },
  {
    title: "6. KVKK Kapsamındaki Haklarınız",
    content: `6698 sayılı KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:\n\n• Kişisel verilerinizin işlenip işlenmediğini öğrenme,\n• İşlenmişse buna ilişkin bilgi talep etme,\n• İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,\n• Verilerin eksik veya yanlış işlenmesi halinde düzeltilmesini isteme,\n• Verilerin silinmesini veya yok edilmesini talep etme,\n• İşlemeye itiraz etme.\n\nBaşvurularınızı BİMER (www.bimer.gov.tr) veya doğrudan AYGM'ye iletebilirsiniz.`,
  },
  {
    title: "7. Politika Güncellemeleri",
    content: `Bu gizlilik politikası, yasal düzenlemeler veya hizmet değişikliklerine bağlı olarak güncellenebilir. Güncel versiyona her zaman bu sayfadan ulaşabilirsiniz. Son güncelleme tarihi: Temmuz 2025.`,
  },
];

export default function GizlilikPolitikasiPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="relative py-16" style={{ background: "linear-gradient(135deg, var(--forest-deep) 0%, var(--forest) 100%)" }}>
          <div className="container-aygm relative z-10">
            <div className="flex items-center gap-2 text-xs mb-5" style={{ color: "rgba(255,255,255,0.45)" }}>
              <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
              <FaChevronRight style={{ fontSize: 8 }} />
              <span style={{ color: "var(--gold)" }}>Gizlilik Politikası</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Gizlilik Politikası
            </h1>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem" }}>
              T.C. Ulaştırma ve Altyapı Bakanlığı — AYGM &bull; Son güncelleme: Temmuz 2025
            </p>
          </div>
        </div>

        <div className="section-padding" style={{ background: "white" }}>
          <div className="container-aygm" style={{ maxWidth: "860px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
              {sections.map((s) => (
                <div key={s.title}>
                  <h2 className="text-lg font-bold mb-3" style={{ fontFamily: "var(--font-heading)", color: "var(--forest)" }}>
                    {s.title}
                  </h2>
                  <div style={{ color: "var(--gray-600)", fontSize: "0.9rem", lineHeight: 1.85, whiteSpace: "pre-line" }}>
                    {s.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
