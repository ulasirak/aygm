import type { Metadata } from "next";
import YolculukClient from "./YolculukClient";

export const metadata: Metadata = {
  title: "Yolculuğunuzu Planlayın",
  description:
    "Konya Tramvay hattında çıkış ve varış istasyonunuzu seçin; tahmini süre, mesafe ve aktarma noktalarını görün. Ayrıca her durağın güncel yapım ve hizmet durumunu inceleyin.",
};

export default function YolculukPage() {
  return <YolculukClient />;
}
