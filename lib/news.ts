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
    category: "Tören",
    date: "7 Temmuz 2025",
    title: "2. Etap'ın Temeli Atıldı: Bakan Uraloğlu Konya'da",
    summary:
      "T.C. Ulaştırma ve Altyapı Bakanı Sayın Bakanımız Abdulkadir Uraloğlu'nun katılımıyla Konya'da gerçekleştirilen törende Stadyum–Şehir Hastanesi Tramvay Hattı 2. Etap inşaatı resmen başladı.",
    body: [
      "T.C. Ulaştırma ve Altyapı Bakanı Sayın Bakanımız Abdulkadir Uraloğlu, 7 Temmuz 2025 tarihinde Konya'ya gelerek Stadyum–Şehir Hastanesi Tramvay Hattı 2. Etap Projesi'nin temel atma törenine katıldı. Törende aynı zamanda Konya Büyükşehir Belediye Başkanı Uğur İbrahim Altay, Konya Valisi İbrahim Akın, AK Parti ve MHP milletvekilleri ile proje paydaşları yer aldı.",
      "Törende konuşan Bakan Uraloğlu, projenin Konya'nın ulaşım vizyonundaki stratejik önemini vurguladı: 'Devam eden ve planlanan projelerle Konya'nın kentsel raylı sistem ağını 27,7 km'den 134 km'ye yükseltmiş olacağız. İstanbul'dan sonra Türkiye'nin en uzun raylı sistem ağına sahip şehri Konya olacak.'",
      "2. Etap kapsamında 10 km'lik yeni tramvay hattı, 10 yeni istasyon, 2 yeni köprülü kavşak, 2 revize köprülü kavşak ve 3 yaya üst geçidi inşa edilecek. Proje 9.059.553.000 TL sözleşme bedeli ile Uğursal Elektrik Elektronik İnşaat – ONH İnşaat ve Taahhüt A.Ş. Ortak Girişimi tarafından üstlenilmiştir.",
      "Hat tamamlandığında Şehir Hastanesi–Yeni Sanayi 1. Etap ile birleşerek toplam 21,2 km'lik bir güzergah oluşturacak ve Konya'nın raylı ulaşım ağında köklü bir dönüşümü simgeleyecek. Sistemin 2027 yılında hizmete girmesi planlanmaktadır.",
    ],
    readTime: "4 dk",
    featured: true,
    source: "Konya Büyükşehir Belediyesi / UAB",
    sourceUrl: "https://www.konya.bel.tr/haber/stadyum-sehir-hastanesi-tramvay-hatti-2-etabinin-temeli-atildi",
    participants: [
      "Sayın Bakanımız Abdulkadir Uraloğlu",
      "Büyükşehir Başkanı Uğur İbrahim Altay",
      "Vali İbrahim Akın",
      "AK Parti ve MHP milletvekilleri",
    ],
    keyFacts: [
      { label: "Tören Tarihi", value: "7 Temmuz 2025" },
      { label: "Hat Uzunluğu", value: "10 km (2. Etap)" },
      { label: "İstasyon Sayısı", value: "10 yeni istasyon" },
      { label: "Hedef Açılış", value: "2027" },
    ],
  },
  {
    slug: "ihale-tamamlandi",
    category: "İhale",
    date: "30 Mayıs 2025",
    title: "İhale Tamamlandı: Uğursal Elektrik – ONH OG, 9,06 Milyar TL'ye Kazandı",
    summary:
      "AYGM tarafından düzenlenen 2. Etap ihalesini Uğursal Elektrik – ONH İnşaat Ortak Girişimi kazandı. Yaklaşık 10,87 milyar TL tahmin edilen ihalede sözleşme bedeli 9.059.553.000 TL olarak belirlendi.",
    body: [
      "Altyapı Yatırımları Genel Müdürlüğü (AYGM) tarafından açılan Konya Stadyum–Şehir Hastanesi Tramvay Hattı 2. Etap inşaatı ve elektromekanik sistemler ihalesi, 30 Mayıs 2025 tarihinde sonuçlandı.",
      "Uğursal Elektrik Elektronik İnşaat – ONH İnşaat ve Taahhüt A.Ş. Ortak Girişimi, 9.059.553.000 TL (yaklaşık 9,06 milyar TL) teklif bedeli ile ihaleyi kazandı. AYGM'nin tahmin ettiği yaklaşık maliyet ise 10.987.414.342 TL idi.",
      "İhale kapsamındaki işler; 10 km'lik tramvay hattı yapımı, 10 istasyon, 2 yeni köprülü kavşak, 2 revize köprülü kavşak, 3 yaya üst geçidi ile hattın tüm elektromekanik sistemlerinin temin, montaj ve devreye alımını içermektedir.",
      "Sözleşmenin imzalanmasının ardından yüklenici firma hazırlık çalışmalarına başladı. Resmi inşaat, 7 Temmuz 2025 tarihinde Sayın Bakanımız Abdulkadir Uraloğlu başkanlığında düzenlenen temel atma töreniyle başlatıldı.",
    ],
    readTime: "3 dk",
    featured: false,
    source: "AYGM / RayHaber",
    sourceUrl: "https://rayhaber.com/2025/05/konya-tramvay-hatti-2-etap-ihalesinde-teklifler-toplandi/",
    keyFacts: [
      { label: "İhale Tarihi", value: "30 Mayıs 2025" },
      { label: "Yaklaşık Maliyet", value: "10,987 milyar TL" },
      { label: "Sözleşme Bedeli", value: "9.059.553.000 TL" },
      { label: "Yüklenici", value: "Uğursal Elektrik – ONH OG" },
    ],
  },
  {
    slug: "aygm-devir",
    category: "Devir",
    date: "Nisan 2025",
    title: "2. Etap AYGM'ye Devredildi: Proje Bakanlık Güvencesiyle Hızlanıyor",
    summary:
      "Konya Büyükşehir Belediye Başkanı Uğur İbrahim Altay ile AYGM yetkilileri arasında imzalanan devir protokolüyle 2. Etap yapımı T.C. Ulaştırma ve Altyapı Bakanlığı bünyesine alındı.",
    body: [
      "Nisan 2025'te Konya Büyükşehir Belediyesi ile T.C. Ulaştırma ve Altyapı Bakanlığı Altyapı Yatırımları Genel Müdürlüğü (AYGM) arasında kritik bir devir protokolü imzalandı.",
      "Bu protokol kapsamında Stadyum–Şehir Hastanesi Tramvay Hattı 2. Etap'ın finansmanı, proje yönetimi ve inşaat süreci tamamen AYGM koordinasyonuna geçti. Söz konusu adım, projenin ulusal bütçe kaynaklarıyla daha hızlı hayata geçirilmesinin önünü açtı.",
      "Belediye Başkanı Uğur İbrahim Altay, devir sonrasında şunları söyledi: 'Devlet güvencesiyle hayata geçirilecek bu proje, Konya'mızın ulaşım altyapısını çok daha güçlü kılacak. Bakanlığımızla iş birliği içinde Konya halkına en iyi hizmeti sunmaya devam edeceğiz.'",
      "AYGM'nin devreye girmesiyle birlikte ihale süreci hız kazandı. Devir protokolünün imzalanmasından yaklaşık iki ay sonra, 30 Mayıs 2025'te ihale başarıyla tamamlandı ve Temmuz 2025'te temel atma töreniyle inşaat resmen başladı.",
    ],
    readTime: "2 dk",
    featured: false,
    source: "Konya Büyükşehir Belediyesi",
    sourceUrl: "https://www.konya.bel.tr/haber/konyanin-gelisen-rayli-sistem-yolculugunda-onemli-bir-yatirimin-daha-temeli-atildi",
    keyFacts: [
      { label: "Devir Tarihi", value: "Nisan 2025" },
      { label: "Devreden Kurum", value: "Konya Büyükşehir Belediyesi" },
      { label: "Devralan Kurum", value: "AYGM / T.C. UAB" },
      { label: "Sonraki Adım", value: "İhale: 30 Mayıs 2025" },
    ],
  },
  {
    slug: "guzergah-detaylari",
    category: "Güzergah",
    date: "2025",
    title: "10 İstasyon ve Hat Güzergahı Kamuoyuyla Paylaşıldı",
    summary:
      "Yeni Sanayi / Aslım Caddesi'nden Konya Stadyumu'na uzanan güzergah üzerindeki 10 istasyon ve entegrasyon noktaları açıklandı.",
    body: [
      "AYGM tarafından paylaşılan plana göre hat; Yeni Sanayi/Aslım Caddesi'nden başlayarak TÜMOSAN Kavşağı, Aksaray Kavşağı, Sadık Ahmet Caddesi ve Dr. Halil Ürün Caddesi üzerinden Konya Stadyumu'na ulaşacak.",
      "Güzergah üzerindeki 10 istasyon şunlardır: Yeni Sanayi, ASLİDAŞ, TÜYAP, Banliyö, Çimento, Novaland, Otogar, Ecdad Bahçesi, Real ve Konya Stadyumu. Hat, Karatay ve Selçuklu ilçe sınırları içinden geçmektedir.",
      "Entegrasyon noktaları açısından değerlendirildiğinde; hat Yeni Sanayi'de 1. Etap tramvayıyla, Banliyö'de KONYARAY Banliyö Hattı ile, Otogar'da şehirlerarası otobüs terminaliyle, son istasyon Konya Stadyumu'nda ise Barış Caddesi Tramvay Hattı ile kesişecek.",
      "Güzergah boyunca gerçekleştirilecek altyapı çalışmaları kapsamında 2 yeni köprülü kavşak (TÜMOSAN ve Aksaray) ile 3 yaya üst geçidi inşa edilecek. Bu yapılar hem tramvay trafiğini hem de bölgedeki genel kentsel ulaşımı kolaylaştıracak.",
    ],
    readTime: "5 dk",
    featured: false,
    source: "AYGM",
    sourceUrl: "https://insaattedarik.com.tr/ulasim/konya-adliye-sehir-hastanesi-yeni-sanayi-tramvay-hatti-projesi/",
    keyFacts: [
      { label: "Hat Uzunluğu", value: "10 km" },
      { label: "İstasyon Sayısı", value: "10" },
      { label: "Geçilen İlçe", value: "Karatay & Selçuklu" },
      { label: "Entegrasyon", value: "4 hat bağlantı noktası" },
    ],
  },
  {
    slug: "bakan-vizyon-aciklamasi",
    category: "Vizyon",
    date: "2025",
    title: "Bakan Uraloğlu: 'Konya'nın Raylı Ağı 134 km'ye Çıkacak'",
    summary:
      "T.C. Ulaştırma ve Altyapı Bakanı Sayın Bakanımız Abdulkadir Uraloğlu, Bakanlık ve Belediye projelerinin tamamlanmasıyla Konya'nın raylı sistem uzunluğunun 27,7 km'den 134 km'ye ulaşacağını açıkladı.",
    body: [
      "Ulaştırma ve Altyapı Bakanı Sayın Bakanımız Abdulkadir Uraloğlu, 7 Temmuz 2025'teki temel atma töreni başta olmak üzere çeşitli platformlarda Konya'nın büyük raylı sistem vizyonunu kamuoyuyla paylaştı.",
      "Bakan Uraloğlu'nun açıkladığı verilere göre T.C. Ulaştırma ve Altyapı Bakanlığı, Konya'ya 58,1 km'lik yeni raylı sistem hattı ekleyecek. Bu kapsamda Selçuk Üniversitesi–Alaaddin hafif raylı sistem hattı (21 km), Necmettin Erbakan Üniversitesi–Alaaddin hattı (8 km), Fatih Caddesi–Ahmet Özcan tramvay hattı (19,4 km) ve Stadyum–Şehir Hastanesi 2. Etap (9,7 km) projeleri hayata geçirilecek.",
      "Konya Büyükşehir Belediyesi'nin devam eden projeleriyle (1. Etap, KONYARAY Banliyö Hattı, Barış Caddesi hattı) birleşince toplam raylı sistem ağı 27,7 km'den 134 km'ye ulaşacak. Bu uzunlukla Konya, İstanbul'un ardından Türkiye'nin en uzun kent içi raylı sistem ağına sahip ikinci şehri olacak.",
      "Bakanlık verilerine göre 2002'den bu yana Konya'ya ulaşım ve altyapı alanında toplam 151 milyar TL'nin üzerinde yatırım yapılmıştır. Bölünmüş yol ağı 167 km'den 1.289 km'ye, asfalt yollar ise 97 km'den 1.300 km'ye çıkarılmıştır.",
    ],
    readTime: "3 dk",
    featured: false,
    source: "T.C. Ulaştırma ve Altyapı Bakanlığı",
    sourceUrl: "https://www.uab.gov.tr/haberler/konya-ya-dev-yatirim",
    keyFacts: [
      { label: "Mevcut Raylı Ağ", value: "27,7 km" },
      { label: "Hedef Raylı Ağ", value: "134 km" },
      { label: "Bakanlık Katkısı", value: "58,1 km yeni hat" },
      { label: "2002'den Bu Yana Yatırım", value: "151 milyar TL" },
    ],
  },
  {
    slug: "konyaray-entegrasyon",
    category: "KONYARAY",
    date: "2025",
    title: "KONYARAY Banliyö Entegrasyonu: Aksaray Kavşağı'nda Doğrudan Aktarma",
    summary:
      "Aksaray Köprülü Kavşağı'ndaki Banliyö İstasyonu'nda 2. Etap tramvay hattı ile KONYARAY Banliyö Hattı entegrasyonu teyit edildi.",
    body: [
      "AYGM ve KONYARAY'ın ortaklaşa yürüttüğü planlama çalışmaları neticesinde, Aksaray Köprülü Kavşağı'nda konumlanacak 'Banliyö İstasyonu'nda iki hattın sorunsuz entegrasyonu resmiyet kazandı.",
      "Bu kavşakta yolcular; Konya Stadyumu–Yeni Sanayi tramvay hattından KONYARAY Banliyö Hattı'na ek bilet almaksızın aktarma yapabilecek. Şehir dışından gelen yolcular için de bu istasyon merkezi bir kavşak niteliği taşıyacak.",
      "KONYARAY Banliyö Hattı yaklaşık 23 km uzunluğuyla tüm hattı kapsamakta ve inşaat sürecini sürdürmektedir. İki hattın buluşma noktası olan Banliyö İstasyonu'nda Park & Ride (Park Et – Devam Et) olanağı da sunulacak; bu sayede araçla gelen yolcular araçlarını güvenli alanda bırakıp tramvaya geçiş yapabilecek.",
      "Entegrasyon kapsamındaki ortak bilet sistemi ve çalışma düzeni üzerine teknik görüşmeler sürmektedir. Hatların birlikte test sürüşleri ile açılışın 2027 yılında gerçekleştirilmesi planlanmaktadır.",
    ],
    readTime: "2 dk",
    featured: false,
    source: "AYGM / KONYARAY",
    sourceUrl: "https://www.konyaray.com.tr",
    keyFacts: [
      { label: "Entegrasyon Noktası", value: "Banliyö İstasyonu" },
      { label: "KONYARAY Uzunluğu", value: "~23 km" },
      { label: "Ek Hizmet", value: "Park & Ride" },
      { label: "Hedef Yıl", value: "2027" },
    ],
  },
];

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return allNews.find((n) => n.slug === slug);
}
