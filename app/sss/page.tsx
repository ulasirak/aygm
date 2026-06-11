import type { Metadata } from "next";
import SSSClient from "./SSSClient";

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular",
  description: "Konya Tramvay 1. ve 2. Etap projesi hakkında sıkça sorulan soruların yanıtları. Güzergah, istasyonlar, inşaat takvimi ve entegrasyon bilgileri.",
};

export default function SSSPage() {
  return <SSSClient />;
}
