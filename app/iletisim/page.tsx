import type { Metadata } from "next";
import IletisimClient from "./IletisimClient";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Konya Tramvay 2. Etap projesi hakkında soru, görüş ve bilgi talepleriniz için bize ulaşın.",
};

export default function IletisimPage() {
  return <IletisimClient />;
}
