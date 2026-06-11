export type NewsItem = {
  slug: string;
  category: string;
  date: string;
  title: string;
  summary: string;
  body: string[];
  readTime: string;
  featured: boolean;
  source: string;
  sourceUrl?: string;
  participants?: string[];
  keyFacts?: { label: string; value: string }[];
};

export const allNews: NewsItem[] = [
  {
    slug: "temel-atma-toreni",
    category: "toren",
    date: "7 Temmuz 2025",
    title: "2. Etap'ın Temeli Atıldı: Sayın Vali İbrahim Akın Konya'da",
    summary:
      "Sayın Vali İbrahim Akın'ın katılımıyla Konya'da gerçekleştirilen törende Stadyum–Şehir Hastanesi Tramvay Hattı 2. Etap inşaatı resmen başladı.",
    body: [
      "Sayın Vali İbrahim Akın, 7 Temmuz 2025 tarihinde Konya'ya gelerek Stadyum–Şehir Hastanesi Tramvay Hattı 2. Etap Projesi'nin temel atma törenine katıldı. Törende aynı zamanda Konya Büyükşehir Belediye Başkanı Sayın Uğur İbrahim Altay, AK Parti ve MHP milletvekilleri ile proje paydaşları yer aldı.",
      "Törende konuşan Sayın Vali İbrahim Akın, projenin Konya'nın ulaşım vizyonundaki stratejik önemini vurguladı: 'Devam eden ve planlanan projelerle Konya'nın kentsel raylı sistem ağını 27,7 km'den 134 km'ye yükseltmiş olacağız. İstanbul'dan sonra Türkiye'nin en uzun raylı sistem ağına sahip şehri Konya olacak.'",
      "2. Etap kapsamında 10 km'lik yeni tramvay hattı, 10 yeni istasyon, 2 yeni köprülü kavşak, 2 revize köprülü kavşak ve 3 yaya üst geçidi inşa edilecek. Proje 9.059.553.000 TL sözleşme bedeli ile Uğursal Elektrik Elektronik İnşaat – ONH İnşaat ve Taahhüt A.Ş. Ortak Girişimi tarafından üstlenilmiştir.",
      "Hat tamamlandığında Şehir Hastanesi–Yeni Sanayi 1. Etap ile birleşerek toplam 21,2 km'lik bir güzergah oluşturacak ve Konya'nın raylı ulaşım ağında köklü bir dönüşümü simgeleyecek. Sistemin 2027 yılında hizmete girmesi planlanmaktadır.",
    ],
    readTime: "4 dk",
    featured: true,
    source: "Konya Büyükşehir Belediyesi / UAB",
    sourceUrl: "https://www.konya.bel.tr/haber/stadyum-sehir-hastanesi-tramvay-hatti-2-etabinin-temeli-atildi",
    participants: [
      "Sayın Vali İbrahim Akın",
      "Büyükşehir Belediye Başkanı Sayın Uğur İbrahim Altay",
      "AK Parti ve MHP milletvekilleri",
    ],
    keyFacts: [
      { label: "news.lbl_ceremony_date", value: "7 Temmuz 2025" },
      { label: "news.lbl_line_length", value: "10 km (2. Etap)" },
      { label: "news.lbl_station_count", value: "10 yeni istasyon" },
      { label: "news.lbl_target_opening", value: "2027" },
    ],
  },
  {
    slug: "ihale-tamamlandi",
    category: "ihale",
    date: "30 Mayıs 2025",
    title: "İhale Tamamlandı: Uğursal Elektrik – ONH Ortak Girişimi, 9,06 Milyar TL'ye Kazandı",
    summary:
      "Altyapı Yatırımları Genel Müdürlüğü tarafından düzenlenen 2. Etap ihalesini Uğursal Elektrik – ONH İnşaat Ortak Girişimi kazandı. Yaklaşık 10,87 milyar TL tahmin edilen ihalede sözleşme bedeli 9.059.553.000 TL olarak belirlendi.",
    body: [
      "Altyapı Yatırımları Genel Müdürlüğü tarafından açılan Konya Stadyum–Şehir Hastanesi Tramvay Hattı 2. Etap inşaatı ve elektromekanik sistemler ihalesi, 30 Mayıs 2025 tarihinde sonuçlandı.",
      "Uğursal Elektrik Elektronik İnşaat – ONH İnşaat ve Taahhüt A.Ş. Ortak Girişimi, 9.059.553.000 TL (yaklaşık 9,06 milyar TL) teklif bedeli ile ihaleyi kazandı. Altyapı Yatırımları Genel Müdürlüğü'nün tahmin ettiği yaklaşık maliyet ise 10.987.414.342 TL idi.",
      "İhale kapsamındaki işler; 10 km'lik tramvay hattı yapımı, 10 istasyon, 2 yeni köprülü kavşak, 2 revize köprülü kavşak, 3 yaya üst geçidi ile hattın tüm elektromekanik sistemlerinin temin, montaj ve devreye alımını içermektedir.",
      "Sözleşmenin imzalanmasının ardından yüklenici firma hazırlık çalışmalarına başladı. Resmi inşaat, 7 Temmuz 2025 tarihinde Sayın Vali İbrahim Akın başkanlığında düzenlenen temel atma töreniyle başlatıldı.",
    ],
    readTime: "3 dk",
    featured: false,
    source: "Altyapı Yatırımları Genel Müdürlüğü / RayHaber",
    sourceUrl: "https://rayhaber.com/2025/05/konya-tramvay-hatti-2-etap-ihalesinde-teklifler-toplandi/",
    keyFacts: [
      { label: "news.lbl_tender_date", value: "30 Mayıs 2025" },
      { label: "news.lbl_estimated_cost", value: "10,987 milyar TL" },
      { label: "news.lbl_contract_value", value: "9.059.553.000 TL" },
      { label: "news.lbl_contractor", value: "Uğursal Elektrik – ONH Ortak Girişimi" },
    ],
  },
  {
    slug: "aygm-devir",
    category: "devir",
    date: "Nisan 2025",
    title: "2. Etap Altyapı Yatırımları Genel Müdürlüğü'ne Devredildi: Proje Bakanlık Güvencesiyle Hızlanıyor",
    summary:
      "Konya Büyükşehir Belediye Başkanı Sayın Uğur İbrahim Altay ile Altyapı Yatırımları Genel Müdürlüğü yetkilileri arasında imzalanan devir protokolüyle 2. Etap yapımı T.C. Ulaştırma ve Altyapı Bakanlığı bünyesine alındı.",
    body: [
      "Nisan 2025'te Konya Büyükşehir Belediyesi ile T.C. Ulaştırma ve Altyapı Bakanlığı Altyapı Yatırımları Genel Müdürlüğü arasında kritik bir devir protokolü imzalandı.",
      "Bu protokol kapsamında Stadyum–Şehir Hastanesi Tramvay Hattı 2. Etap'ın finansmanı, proje yönetimi ve inşaat süreci tamamen Altyapı Yatırımları Genel Müdürlüğü koordinasyonuna geçti. Söz konusu adım, projenin ulusal bütçe kaynaklarıyla daha hızlı hayata geçirilmesinin önünü açtı.",
      "Belediye Başkanı Sayın Uğur İbrahim Altay, devir sonrasında şunları söyledi: 'Devlet güvencesiyle hayata geçirilecek bu proje, Konya'mızın ulaşım altyapısını çok daha güçlü kılacak. Bakanlığımızla iş birliği içinde Konya halkına en iyi hizmeti sunmaya devam edeceğiz.'",
      "Altyapı Yatırımları Genel Müdürlüğü'nün devreye girmesiyle birlikte ihale süreci hız kazandı. Devir protokolünün imzalanmasından yaklaşık iki ay sonra, 30 Mayıs 2025'te ihale başarıyla tamamlandı ve Temmuz 2025'te temel atma töreniyle inşaat resmen başladı.",
    ],
    readTime: "2 dk",
    featured: false,
    source: "Konya Büyükşehir Belediyesi",
    sourceUrl: "https://www.konya.bel.tr/haber/konyanin-gelisen-rayli-sistem-yolculugunda-onemli-bir-yatirimin-daha-temeli-atildi",
    keyFacts: [
      { label: "news.lbl_transfer_date", value: "Nisan 2025" },
      { label: "news.lbl_transferring_org", value: "Konya Büyükşehir Belediyesi" },
      { label: "news.lbl_receiving_org", value: "Altyapı Yatırımları Genel Müdürlüğü / T.C. UAB" },
      { label: "news.lbl_next_step", value: "İhale: 30 Mayıs 2025" },
    ],
  },
  {
    slug: "guzergah-detaylari",
    category: "guzergah",
    date: "2025",
    title: "10 İstasyon ve Hat Güzergahı Kamuoyuyla Paylaşıldı",
    summary:
      "Yeni Sanayi / Aslım Caddesi'nden Konya Stadyumu'na uzanan güzergah üzerindeki 10 istasyon ve entegrasyon noktaları açıklandı.",
    body: [
      "Altyapı Yatırımları Genel Müdürlüğü tarafından paylaşılan plana göre hat; Yeni Sanayi/Aslım Caddesi'nden başlayarak TÜMOSAN Kavşağı, Aksaray Kavşağı, Sadık Ahmet Caddesi ve Dr. Halil Ürün Caddesi üzerinden Konya Stadyumu'na ulaşacak.",
      "Güzergah üzerindeki 10 istasyon şunlardır: Yeni Sanayi, ASLİDAŞ, TÜYAP, Banliyö, Çimento, Novaland, Otogar, Ecdad Bahçesi, Real ve Konya Stadyumu. Hat, Karatay ve Selçuklu ilçe sınırları içinden geçmektedir.",
      "Entegrasyon noktaları açısından değerlendirildiğinde; hat Yeni Sanayi'de 1. Etap tramvayıyla, Banliyö'de KONYARAY Banliyö Hattı ile, Otogar'da şehirlerarası otobüs terminaliyle, son istasyon Konya Stadyumu'nda ise Barış Caddesi Tramvay Hattı ile kesişecek.",
      "Güzergah boyunca gerçekleştirilecek altyapı çalışmaları kapsamında 2 yeni köprülü kavşak (TÜMOSAN ve Aksaray) ile 3 yaya üst geçidi inşa edilecek. Bu yapılar hem tramvay trafiğini hem de bölgedeki genel kentsel ulaşımı kolaylaştıracak.",
    ],
    readTime: "5 dk",
    featured: false,
    source: "Altyapı Yatırımları Genel Müdürlüğü",
    sourceUrl: "https://insaattedarik.com.tr/ulasim/konya-adliye-sehir-hastanesi-yeni-sanayi-tramvay-hatti-projesi/",
    keyFacts: [
      { label: "news.lbl_line_length", value: "10 km" },
      { label: "news.lbl_station_count", value: "10" },
      { label: "news.lbl_districts", value: "Karatay & Selçuklu" },
      { label: "news.lbl_integration", value: "4 hat bağlantı noktası" },
    ],
  },
  {
    slug: "bakan-vizyon-aciklamasi",
    category: "vizyon",
    date: "2025",
    title: "Sayın Vali İbrahim Akın: 'Konya'nın Raylı Ağı 134 km'ye Çıkacak'",
    summary:
      "Sayın Vali İbrahim Akın, Bakanlık ve Belediye projelerinin tamamlanmasıyla Konya'nın raylı sistem uzunluğunun 27,7 km'den 134 km'ye ulaşacağını açıkladı.",
    body: [
      "Sayın Vali İbrahim Akın, 7 Temmuz 2025'teki temel atma töreni başta olmak üzere çeşitli platformlarda Konya'nın büyük raylı sistem vizyonunu kamuoyuyla paylaştı.",
      "Sayın Vali İbrahim Akın'ın açıkladığı verilere göre T.C. Ulaştırma ve Altyapı Bakanlığı, Konya'ya 58,1 km'lik yeni raylı sistem hattı ekleyecek. Bu kapsamda Selçuk Üniversitesi–Alaaddin hafif raylı sistem hattı (21 km), Necmettin Erbakan Üniversitesi–Alaaddin hattı (8 km), Fatih Caddesi–Ahmet Özcan tramvay hattı (19,4 km) ve Stadyum–Şehir Hastanesi 2. Etap (9,7 km) projeleri hayata geçirilecek.",
      "Konya Büyükşehir Belediyesi'nin devam eden projeleriyle (1. Etap, KONYARAY Banliyö Hattı, Barış Caddesi hattı) birleşince toplam raylı sistem ağı 27,7 km'den 134 km'ye ulaşacak. Bu uzunlukla Konya, İstanbul'un ardından Türkiye'nin en uzun kent içi raylı sistem ağına sahip ikinci şehri olacak.",
      "Bakanlık verilerine göre 2002'den bu yana Konya'ya ulaşım ve altyapı alanında toplam 151 milyar TL'nin üzerinde yatırım yapılmıştır. Bölünmüş yol ağı 167 km'den 1.289 km'ye, asfalt yollar ise 97 km'den 1.300 km'ye çıkarılmıştır.",
    ],
    readTime: "3 dk",
    featured: false,
    source: "T.C. Ulaştırma ve Altyapı Bakanlığı",
    sourceUrl: "https://www.uab.gov.tr/haberler/konya-ya-dev-yatirim",
    keyFacts: [
      { label: "news.lbl_current_rail", value: "27,7 km" },
      { label: "news.lbl_target_rail", value: "134 km" },
      { label: "news.lbl_ministry_contribution", value: "58,1 km yeni hat" },
      { label: "news.lbl_investment_since_2002", value: "151 milyar TL" },
    ],
  },
  {
    slug: "konyaray-entegrasyon",
    category: "konyaray",
    date: "2025",
    title: "KONYARAY Banliyö Entegrasyonu: Aksaray Kavşağı'nda Doğrudan Aktarma",
    summary:
      "Aksaray Köprülü Kavşağı'ndaki Banliyö İstasyonu'nda 2. Etap tramvay hattı ile KONYARAY Banliyö Hattı entegrasyonu teyit edildi.",
    body: [
      "Altyapı Yatırımları Genel Müdürlüğü ve KONYARAY'ın ortaklaşa yürüttüğü planlama çalışmaları neticesinde, Aksaray Köprülü Kavşağı'nda konumlanacak 'Banliyö İstasyonu'nda iki hattın sorunsuz entegrasyonu resmiyet kazandı.",
      "Bu kavşakta yolcular; Konya Stadyumu–Yeni Sanayi tramvay hattından KONYARAY Banliyö Hattı'na ek bilet almaksızın aktarma yapabilecek. Şehir dışından gelen yolcular için de bu istasyon merkezi bir kavşak niteliği taşıyacak.",
      "KONYARAY Banliyö Hattı yaklaşık 23 km uzunluğuyla tüm hattı kapsamakta ve inşaat sürecini sürdürmektedir. İki hattın buluşma noktası olan Banliyö İstasyonu'nda Park & Ride (Park Et – Devam Et) olanağı da sunulacak; bu sayede araçla gelen yolcular araçlarını güvenli alanda bırakıp tramvaya geçiş yapabilecek.",
      "Entegrasyon kapsamındaki ortak bilet sistemi ve çalışma düzeni üzerine teknik görüşmeler sürmektedir. Hatların birlikte test sürüşleri ile açılışın 2027 yılında gerçekleştirilmesi planlanmaktadır.",
    ],
    readTime: "2 dk",
    featured: false,
    source: "Altyapı Yatırımları Genel Müdürlüğü / KONYARAY",
    sourceUrl: "https://www.konyaray.com.tr",
    keyFacts: [
      { label: "news.lbl_integration_point", value: "Banliyö İstasyonu" },
      { label: "news.lbl_konyaray_length", value: "~23 km" },
      { label: "news.lbl_extra_service", value: "Park & Ride" },
      { label: "news.lbl_target_year", value: "2027" },
    ],
  },
];

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return allNews.find((n) => n.slug === slug);
}
