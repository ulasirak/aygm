import type { Metadata } from "next";
import GuzergahClient from "./GuzergahClient";

export const metadata: Metadata = {
  title: "Güzergah & İstasyonlar",
  description:
    "Konya Tramvay 2. Etap güzergahı: Yeni Sanayi'den Stadyum'a 10 istasyon, 1. Etap ile birlikte 21 durak ve 21,2 km raylı koridor.",
};

export default function GuzergahPage() {
  return <GuzergahClient />;
}
