import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Konya Tramvay 2. Etap — Billboard",
  manifest: "/manifest.json",
};

export default function BillboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#1a5c2e" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      {children}
    </>
  );
}
