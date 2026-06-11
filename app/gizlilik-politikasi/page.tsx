import type { Metadata } from "next";
import GizlilikClient from "./GizlilikClient";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "Konya Tramvay 2. Etap resmi proje sitesi gizlilik politikası.",
};

export default function GizlilikPolitikasiPage() {
  return <GizlilikClient />;
}
