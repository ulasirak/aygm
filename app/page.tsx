import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import RouteSection from "@/components/RouteSection";
import TimelineSection from "@/components/TimelineSection";
import EnvironmentSection from "@/components/EnvironmentSection";
import NewsSection from "@/components/NewsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Konya Tramvay 2. Etap | AYGM — T.C. Ulaştırma ve Altyapı Bakanlığı",
  description:
    "Konya Stadyum–Şehir Hastanesi Tramvay Hattı 2. Etap resmi proje sitesi. 10 km yeni hat, 10 istasyon, günlük 60.000 yolcu. AYGM.",
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsSection />
        <RouteSection />
        <TimelineSection />
        <EnvironmentSection />
        <NewsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
