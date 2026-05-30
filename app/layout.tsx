import type { Metadata, Viewport } from "next";
import { IBM_Plex_Serif, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const plexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://konyatramvay.aygm.gov.tr"),
  title: {
    default: "Konya Tramvay 2. Etap | AYGM — T.C. Ulaştırma ve Altyapı Bakanlığı",
    template: "%s | Konya Tramvay — AYGM",
  },
  description:
    "Konya Stadyum–Şehir Hastanesi Tramvay Hattı 2. Etap projesi: 10 km yeni hat, 10 istasyon, günlük 60.000 yolcu kapasitesi. T.C. Ulaştırma ve Altyapı Bakanlığı, Altyapı Yatırımları Genel Müdürlüğü.",
  keywords: [
    "Konya tramvay", "AYGM", "Altyapı Yatırımları Genel Müdürlüğü",
    "Konya raylı sistem", "Şehir Hastanesi tramvay", "Yeni Sanayi tramvay",
    "Konya stadyum tramvay", "kentsel ulaşım", "KONYARAY", "toplu taşıma Konya",
  ],
  authors: [{ name: "T.C. Ulaştırma ve Altyapı Bakanlığı — AYGM" }],
  creator: "AYGM",
  publisher: "T.C. Ulaştırma ve Altyapı Bakanlığı",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Konya Tramvay 2. Etap — AYGM",
    title: "Konya Tramvay 2. Etap | AYGM",
    description: "10 km yeni hat, 10 istasyon, günlük 60.000 yolcu. Konya'nın geleceği raylarda.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Konya Tramvay 2. Etap | AYGM" }],
  },
  robots: { index: true, follow: true },
  twitter: {
    card: "summary_large_image",
    title: "Konya Tramvay 2. Etap | AYGM",
    description: "10 km yeni hat, 10 istasyon, günlük 60.000 yolcu. Konya'nın geleceği raylarda.",
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  themeColor: "#1D5C3A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${plexSerif.variable} ${plexSans.variable}`}>
      <body style={{ fontFamily: "var(--font-body)" }}>{children}</body>
    </html>
  );
}
