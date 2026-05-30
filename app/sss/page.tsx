"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FaChevronDown, FaSearch } from "react-icons/fa";

const faqData = [
  {
    category: "Proje Genel",
    faqs: [
      {
        q: "Konya Tramvay 2. Etap projesi nedir?",
        a: "Konya Stadyum–Şehir Hastanesi Tramvay Hattı 2. Etap; Yeni Sanayi bölgesinden Konya Büyükşehir Stadyumu'na uzanan 10 km uzunluğunda yeni bir tramvay hattı projesidir. T.C. Ulaştırma ve Altyapı Bakanlığı, Altyapı Yatırımları Genel Müdürlüğü (AYGM) tarafından yürütülmektedir.",
      },
      {
        q: "Projeyi kim yürütüyor?",
        a: "Proje, T.C. Ulaştırma ve Altyapı Bakanlığı bünyesindeki Altyapı Yatırımları Genel Müdürlüğü (AYGM) tarafından yürütülmektedir. İnşaat, 30 Mayıs 2025 tarihinde tamamlanan ihale sürecinin ardından Uğursal Elektrik Elektronik İnşaat – ONH İnşaat ve Taahhüt A.Ş. Ortak Girişimi'ne verilmiştir.",
      },
      {
        q: "Projenin toplam maliyeti nedir?",
        a: "Projenin yaklaşık maliyeti 10,987 milyar TL olarak hesaplanmıştır. İhale süreci sonunda Uğursal Elektrik – ONH İnşaat OG ile 9.059.553.000 TL (yaklaşık 9,06 milyar TL) sözleşme bedeli üzerinden anlaşma sağlanmıştır.",
      },
      {
        q: "1. Etap ile 2. Etap arasındaki fark nedir?",
        a: "1. Etap, Şehir Hastanesi'nden Yeni Sanayi'ye uzanan 11,2 km'lik bölümü kapsamakta olup Konya Büyükşehir Belediyesi tarafından yürütülmektedir. 2. Etap ise Yeni Sanayi'den Stadyum'a giden 10 km'lik bölümdür ve T.C. Ulaştırma ve Altyapı Bakanlığı (AYGM) tarafından gerçekleştirilmektedir. İki etap birleşince toplam 21,2 km'lik hat oluşacaktır.",
      },
    ],
  },
  {
    category: "Güzergah & İstasyonlar",
    faqs: [
      {
        q: "Hatta kaç istasyon bulunacak?",
        a: "2. Etap kapsamında 10 yeni istasyon inşa edilecektir. İstasyonlar; Yeni Sanayi, ASLİDAŞ, TÜYAP, Banliyö, Çimento, Novaland, Otogar, Ecdad Bahçesi, Real ve Konya Stadyumu'ndan oluşmaktadır.",
      },
      {
        q: "Hat hangi güzergahtan geçecek?",
        a: "Hat; Yeni Sanayi/Aslım Caddesi'nden başlayarak TÜMOSAN Kavşağı, Aksaray Kavşağı, Sadık Ahmet Caddesi ve Dr. Halil Ürün Caddesi üzerinden Konya Stadyumu'na ulaşacaktır. Güzergah, Karatay ve Selçuklu ilçe sınırları içinde yer almaktadır.",
      },
      {
        q: "KONYARAY ile entegrasyon nasıl olacak?",
        a: "KONYARAY Banliyö Hattı ile entegrasyon, Aksaray Köprülü Kavşağı'ndaki 'Banliyö' istasyonunda sağlanacaktır. Bu noktada yolcular, tramvay ve banliyö hattı arasında doğrudan aktarma yapabilecektir.",
      },
      {
        q: "İstasyonlar engelli erişimine uygun mu olacak?",
        a: "Evet. Tüm 10 istasyon, engelsiz erişim standartlarına uygun olarak tasarlanmaktadır. Her istasyonda engelli rampası, asansör, sesli anons sistemi ve görme engellilere yönelik yönlendirme sistemleri bulunacaktır.",
      },
    ],
  },
  {
    category: "İnşaat & Takvim",
    faqs: [
      {
        q: "İnşaat ne zaman başladı?",
        a: "İnşaat, T.C. Ulaştırma ve Altyapı Bakanı Abdülkadir Uraloğlu başkanlığında 7 Temmuz 2025 tarihinde gerçekleştirilen temel atma töreniyle resmen başlamıştır.",
      },
      {
        q: "Proje ne zaman tamamlanacak?",
        a: "Projenin 2027 yılına kadar tamamlanarak hizmete alınması planlanmaktadır. İnşaat süreci; altyapı ve zemin çalışmaları, ray döşeme, istasyon yapımı ve sistem testleri aşamalarından oluşmaktadır.",
      },
      {
        q: "İnşaat sürecinde trafik akışı nasıl düzenlenecek?",
        a: "AYGM ve yüklenici firma, güzergah boyunca aşamalı çalışma planı uygulayacaktır. Köprülü kavşak ve üst geçit inşaatları döneminde alternatif trafik güzerleri belirlenecek; sakinler ve sürücüler duyurular aracılığıyla bilgilendirilecektir.",
      },
      {
        q: "Şehir Hastanesi'ne erişim inşaat sürecinde nasıl olacak?",
        a: "İnşaat aşamalarında Şehir Hastanesi'ne erişim sürekli açık tutulacaktır. Geçici düzenlemeler önceden kamuoyuyla paylaşılacaktır. Olası aksama bilgileri için bu resmi siteden güncel duyuruları takip edebilirsiniz.",
      },
    ],
  },
  {
    category: "Çevresel Etki",
    faqs: [
      {
        q: "Projenin çevresel etkileri değerlendirildi mi?",
        a: "Evet. Proje, yürürlükteki mevzuat çerçevesinde Çevresel Etki Değerlendirmesi (ÇED) sürecinden geçirilmiş ve onay almıştır. ÇED raporuna AYGM'nin resmi web sitesinden ulaşabilirsiniz.",
      },
      {
        q: "Hat tamamlandığında ne kadar trafik azalması bekleniyor?",
        a: "Güzergah boyunca günlük özel araç trafiğinde yaklaşık %35 oranında azalma öngörülmektedir. Ayrıca 60.000 yolcunun günlük taşınması sayesinde yıllık yaklaşık 15.000 ton CO₂ emisyonu azalması hedeflenmektedir.",
      },
      {
        q: "Tramvay elektrikli mi çalışacak?",
        a: "Evet. Sistem, yerüstü elektrik hattından beslenen tam elektrikli tramvaylarla çalışacaktır. Sıfır egzoz emisyonu sağlayan bu sistem, şehrin hava kalitesini korumaya katkıda bulunacaktır.",
      },
    ],
  },
  {
    category: "Kullanım & Entegrasyon",
    faqs: [
      {
        q: "Bilet sistemi nasıl olacak?",
        a: "2. Etap, mevcut Konya toplu taşıma bilet sistemiyle entegre çalışacaktır. KONYAKart ve diğer geçerli ödeme yöntemleri kullanılabilecektir. Ayrıca tüm istasyonlarda otomatik bilet makineleri bulunacaktır.",
      },
      {
        q: "Stadyuma ulaşım nasıl değişecek?",
        a: "Konya Stadyumu, tramvay hattının son durağı olacaktır. Maç günlerinde yoğun talebe karşılık verebilmek için istasyon kapasitesi yüksek tutulmuştur. Aynı zamanda Barış Caddesi Tramvay Hattı ile de bağlantı sağlanacaktır.",
      },
      {
        q: "Şehir Hastanesi'ne tramvayla ulaşım mümkün olacak mı?",
        a: "Evet. 1. Etap kapsamında Şehir Hastanesi istasyonu doğrudan hat üzerindedir. 2. Etap'ın açılmasıyla birlikte kentin farklı bölgelerinden tek aktarmayla veya doğrudan Şehir Hastanesi'ne ulaşmak mümkün olacaktır.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-xl"
      style={{ border: "1px solid var(--gray-100)" }}
    >
      <button
        className="w-full flex items-center justify-between text-left gap-4"
        style={{ background: open ? "var(--gray-50)" : "white", padding: "1.5rem 1.75rem", borderRadius: open ? "0.75rem 0.75rem 0 0" : "0.75rem" }}
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-base" style={{ color: "var(--forest)" }}>
          {q}
        </span>
        <FaChevronDown
          className="flex-shrink-0 transition-transform"
          style={{
            color: "var(--gray-400)",
            fontSize: 14,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>
      {open && (
        <div
          style={{ color: "var(--gray-600)", background: "var(--gray-50)", borderTop: "1px solid var(--gray-100)", padding: "1.25rem 1.75rem 1.5rem", fontSize: "0.9rem", lineHeight: 1.75 }}
        >
          {a}
        </div>
      )}
    </div>
  );
}

export default function SSSPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <div
          className="relative py-20"
          style={{ background: "linear-gradient(135deg, var(--forest) 0%, var(--forest) 100%)" }}
        >
          <div className="container-aygm">
            <div className="flex items-center gap-2 text-sm mb-4" style={{ color: "rgba(255,255,255,0.55)" }}>
              <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
              <span>/</span>
              <span style={{ color: "var(--gold)" }}>SSS</span>
            </div>
            <h1
              className="text-4xl md:text-5xl font-black text-white mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Sıkça Sorulan Sorular
            </h1>
            <p className="text-lg max-w-2xl" style={{ color: "rgba(255,255,255,0.7)" }}>
              Konya Tramvay 2. Etap projesi hakkında merak edilen soruların yanıtları.
            </p>
          </div>
        </div>

        {/* FAQ content */}
        <div className="section-padding" style={{ background: "white" }}>
          <div className="container-aygm max-w-4xl mx-auto">
            {faqData.map((section) => (
              <div key={section.category} style={{ marginBottom: "4rem" }}>
                <h2
                  className="text-xl font-black mb-7 flex items-center gap-3"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--forest)" }}
                >
                  <span style={{ fontSize: "1.2rem", lineHeight: 1, flexShrink: 0 }}>✿</span>
                  {section.category}
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {section.faqs.map((faq, i) => (
                    <FAQItem key={i} q={faq.q} a={faq.a} />
                  ))}
                </div>
              </div>
            ))}

            {/* Contact CTA */}
            <div
              className="rounded-2xl p-8 text-center"
              style={{
                marginTop: "6rem",
                background: "linear-gradient(135deg, var(--forest), var(--forest))",
                color: "white",
              }}
            >
              <h3
                className="text-xl font-black mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Sorunuz Burada Yok mu?
              </h3>
              <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.65)" }}>
                Projeyle ilgili diğer sorularınız için bize ulaşabilirsiniz.
              </p>
              <Link href="/iletisim" className="btn-primary">
                İletişime Geç
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
