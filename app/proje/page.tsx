import type { Metadata } from "next";
import ProjeClient from "./ProjeClient";

export const metadata: Metadata = {
  title: "Proje Hakkında",
  description:
    "Konya Stadyum–Şehir Hastanesi Tramvay Hattı 2. Etap hakkında kapsamlı proje bilgisi. Kapsam, hedefler, entegrasyon ve teknik detaylar.",
};

export default function ProjePage() {
  return <ProjeClient />;
}
