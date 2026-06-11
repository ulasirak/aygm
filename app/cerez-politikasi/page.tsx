import type { Metadata } from "next";
import CerezClient from "./CerezClient";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description: "Konya Tramvay 2. Etap resmi proje sitesi çerez politikası.",
};

export default function CerezPolitikasiPage() {
  return <CerezClient />;
}
