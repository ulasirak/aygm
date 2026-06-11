import type { Metadata, Viewport } from "next";
import { IBM_Plex_Serif, IBM_Plex_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import { LangProvider } from "@/context/LangContext";
import { MobileViewProvider } from "@/context/MobileViewContext";
import { ColorBlindProvider } from "@/context/ColorBlindContext";
import ColorBlindFilters from "@/components/ColorBlindFilters";
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
  metadataBase: new URL("https://aygm.vercel.app"),
  title: {
    default: "Konya Tramvay 2. Etap | Altyapı Yatırımları Genel Müdürlüğü — T.C. Ulaştırma ve Altyapı Bakanlığı",
    template: "%s | Konya Tramvay — Altyapı Yatırımları Genel Müdürlüğü",
  },
  description:
    "Konya Stadyum–Şehir Hastanesi Tramvay Hattı 2. Etap projesi: 10 km yeni hat, 10 istasyon, günlük 60.000 yolcu kapasitesi. T.C. Ulaştırma ve Altyapı Bakanlığı, Altyapı Yatırımları Genel Müdürlüğü.",
  keywords: [
    "Konya tramvay", "AYGM", "Altyapı Yatırımları Genel Müdürlüğü",
    "Konya raylı sistem", "Şehir Hastanesi tramvay", "Yeni Sanayi tramvay",
    "Konya stadyum tramvay", "kentsel ulaşım", "KONYARAY", "toplu taşıma Konya",
  ],
  authors: [{ name: "T.C. Ulaştırma ve Altyapı Bakanlığı — Altyapı Yatırımları Genel Müdürlüğü" }],
  creator: "Altyapı Yatırımları Genel Müdürlüğü",
  publisher: "T.C. Ulaştırma ve Altyapı Bakanlığı",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Konya Tramvay 2. Etap — Altyapı Yatırımları Genel Müdürlüğü",
    title: "Konya Tramvay 2. Etap | Altyapı Yatırımları Genel Müdürlüğü",
    description: "10 km yeni hat, 10 istasyon, günlük 60.000 yolcu. Konya'nın geleceği raylarda.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Konya Tramvay 2. Etap | Altyapı Yatırımları Genel Müdürlüğü" }],
  },
  robots: { index: true, follow: true },
  twitter: {
    card: "summary_large_image",
    title: "Konya Tramvay 2. Etap | Altyapı Yatırımları Genel Müdürlüğü",
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
    <html lang="tr" className={`${plexSerif.variable} ${plexSans.variable}`} suppressHydrationWarning>
      <body style={{ fontFamily: "var(--font-body)" }}>
        <LangProvider>
          <ColorBlindProvider>
            <MobileViewProvider>
              <ColorBlindFilters />
              <Navbar />
              {/* Spacer for fixed navbar: desktop only (mobile navbar is static) */}
              <div className="h-0 md:h-[100px]" />
              {children}
              <ScrollToTop />
            </MobileViewProvider>
          </ColorBlindProvider>
        </LangProvider>
      </body>
    </html>
  );
}
