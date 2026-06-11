import type { Metadata } from "next";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import RouteSection from "@/components/RouteSection";
import TimelineSection from "@/components/TimelineSection";
import EnvironmentSection from "@/components/EnvironmentSection";
import NewsSection from "@/components/NewsSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Konya Tramvay 2. Etap | Altyapı Yatırımları Genel Müdürlüğü — T.C. Ulaştırma ve Altyapı Bakanlığı",
  description:
    "Konya Stadyum–Şehir Hastanesi Tramvay Hattı 2. Etap resmi proje sitesi. 10 km yeni hat, 10 istasyon, günlük 60.000 yolcu. Altyapı Yatırımları Genel Müdürlüğü.",
};

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <StatsSection />
        <RouteSection />
        <TimelineSection />
        <EnvironmentSection />
        <NewsSection />
      </main>
      <Footer />
    </>
  );
}
