import type { Metadata } from "next";
import HaberlerClient from "./HaberlerClient";

export const metadata: Metadata = {
  title: "Haberler & Duyurular",
  description:
    "Konya Tramvay 2. Etap projesiyle ilgili resmi haberler, basın açıklamaları ve duyurular.",
};

export default function HaberlerPage() {
  return <HaberlerClient />;
}
