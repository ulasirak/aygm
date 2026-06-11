import type { Metadata } from "next";
import ErisebilirlikClient from "./ErisebilirlikClient";

export const metadata: Metadata = {
  title: "Erişilebilirlik",
  description: "Konya Tramvay 2. Etap resmi proje sitesi erişilebilirlik bildirimi.",
};

export default function ErisebilirlikPage() {
  return <ErisebilirlikClient />;
}
