"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaPlay } from "react-icons/fa";
import { useLang } from "@/context/LangContext";

export default function Hero() {
  const { t } = useLang();
  return (
    <section
      className="relative min-h-[calc(100svh-58px)] md:min-h-[92vh] flex items-center overflow-hidden"
      style={{
        background: "linear-gradient(155deg, #0A5C58 0%, #0A5C58 30%, #0A6B66 60%, #0B7C77 85%, #6FDDD6 100%)",
      }}
    >
      {/* Aurora katmanları */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {/* Büyük turkuaz aydınlık — sağ üst */}
        <div style={{
          position: "absolute", top: "-15%", right: "-8%",
          width: "65vw", height: "65vw",
          background: "radial-gradient(circle, rgba(111,221,214,0.14) 0%, rgba(11,124,119,0.09) 40%, transparent 70%)",
          borderRadius: "50%",
        }} />
        {/* Turkuaz ışık — sol alt */}
        <div style={{
          position: "absolute", bottom: "-15%", left: "-5%",
          width: "50vw", height: "50vw",
          background: "radial-gradient(circle, rgba(111,221,214,0.12) 0%, transparent 65%)",
          borderRadius: "50%",
        }} />
        {/* Orta derin teal leke */}
        <div style={{
          position: "absolute", top: "30%", left: "25%",
          width: "35vw", height: "35vw",
          background: "radial-gradient(circle, rgba(111,221,214,0.06) 0%, transparent 70%)",
          borderRadius: "50%",
        }} />

        {/* Tramvay ray çizgileri — gold */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "2px",
          background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.35), transparent)",
        }} />
        <div style={{
          position: "absolute", bottom: 8, left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent)",
        }} />

        {/* Noktalı doku */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(111,221,214,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }} />

        {/* AYGM logo filigran */}
        <div className="absolute pointer-events-none" style={{ top: "3%", left: "1%", zIndex: 1 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/aygm-logo.svg"
            alt=""
            aria-hidden
            style={{
              width: 860,
              maxWidth: "90vw",
              opacity: 0.055,
              filter: "drop-shadow(0 0 80px rgba(111,221,214,0.6))",
            }}
          />
        </div>

        {/* Tramvay görseli */}
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "0%",
            right: "-2%",
            zIndex: 1,
            width: 820,
            maxWidth: "84vw",
          }}
        >
          <Image
            src="/tram-illustration.webp"
            alt=""
            aria-hidden
            width={1400}
            height={764}
            unoptimized
            priority
            style={{
              width: "100%",
              height: "auto",
              opacity: 0.42,
              filter: "drop-shadow(0 0 30px rgba(111,221,214,0.4))",
              maskImage: "linear-gradient(to bottom, transparent 0%, black 40%), linear-gradient(to left, black 35%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 40%), linear-gradient(to left, black 35%, transparent 100%)",
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
          />
        </div>
      </div>

      <div className="container-aygm relative z-10 py-20">
        <div className="max-w-4xl">

          {/* Ana başlık */}
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-8"
            style={{ fontFamily: "var(--font-heading)", color: "white", letterSpacing: "-0.01em" }}
          >
            {t("hero.t1")}{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6FDDD6 0%, #8CF4EF 40%, #C2FAF8 65%, #6FDDD6 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer 4s linear infinite",
                display: "inline-block",
                filter: "drop-shadow(0 0 20px rgba(111,221,214,0.4))",
              }}
            >
              {t("hero.t2")}
            </span>
            <span className="block" style={{ marginTop: "-0.15em" }}>
              {t("hero.t3")}
            </span>
          </h1>

          {/* CTA Butonlar */}
          <div className="flex flex-col sm:flex-row items-start gap-4" style={{ marginTop: "5rem" }}>
            <Link
              href="/guzergah"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.6rem",
                background: "linear-gradient(135deg, #0B7C77, #6FDDD6)",
                color: "white", padding: "1rem 2rem", borderRadius: "0.625rem",
                fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.02em",
                textDecoration: "none", boxShadow: "0 8px 32px rgba(11,124,119,0.45)",
                border: "1px solid rgba(111,221,214,0.3)",
              }}
            >
              {t("hero.cta_route")}
              <FaArrowRight style={{ fontSize: 13 }} />
            </Link>
            <Link
              href="/proje"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.6rem",
                background: "transparent", color: "rgba(255,255,255,0.85)",
                padding: "1rem 2rem", borderRadius: "0.625rem",
                fontWeight: 600, fontSize: "0.9rem",
                textDecoration: "none",
                border: "1.5px solid rgba(111,221,214,0.3)",
              }}
            >
              <FaPlay style={{ fontSize: 11, color: "#6FDDD6" }} />
              {t("hero.cta_project")}
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
