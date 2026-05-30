"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { FaArrowRight, FaPlay } from "react-icons/fa";

const counters = [
  { value: 10, suffix: " km", label: "Yeni Hat Uzunluğu" },
  { value: 10, suffix: "", label: "Yeni İstasyon" },
  { value: 60000, suffix: "", label: "Günlük Yolcu", format: true },
  { value: 2027, suffix: "", label: "Hizmet Yılı" },
];

function AnimatedCounter({ value, suffix, format }: { value: number; suffix: string; format?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const duration = 1800;
        let startTime = 0;
        const step = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * value);
          el.textContent = (format ? current.toLocaleString("tr-TR") : current) + suffix;
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = (format ? value.toLocaleString("tr-TR") : value) + suffix;
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, suffix, format]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function Hero() {
  return (
    <section
      className="relative min-h-[92vh] flex items-center overflow-hidden hero-pattern"
      style={{ background: "linear-gradient(155deg, var(--forest-deep) 0%, var(--forest) 55%, var(--green-mid) 100%)" }}
    >
      {/* Dekoratif öğeler */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {/* Tramvay ray çizgileri */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)", opacity: 0.3 }}
        />
        <div
          className="absolute bottom-6 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)", opacity: 0.15 }}
        />

        {/* Köşe dekorasyon */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)",
            transform: "translate(30%, -30%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(26,107,58,0.08) 0%, transparent 70%)",
            transform: "translate(-30%, 30%)",
          }}
        />

        {/* Ulaştırma Bakanlığı logosu — üst sol filigran */}
        <div
          className="absolute pointer-events-none"
          style={{ top: "3%", left: "1%", zIndex: 1 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/aygm-logo.svg"
            alt=""
            aria-hidden
            style={{
              width: 860,
              maxWidth: "90vw",
              opacity: 0.08,
              filter: "drop-shadow(0 0 60px rgba(255,255,255,0.5))",
            }}
          />
        </div>

        {/* Tramvay görseli — sağ alt köşe, sola doğru geliyor */}
        <div
          className="absolute pointer-events-none"
          style={{ bottom: "0%", right: "-3%", zIndex: 1 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/tram.svg"
            alt=""
            aria-hidden
            style={{
              width: 640,
              opacity: 0.22,
              filter: "drop-shadow(0 0 30px rgba(168,213,186,0.3))",
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
            Konya&apos;nın{" "}
            <span className="gradient-text-green">Geleceği</span>
            <span className="block" style={{ marginTop: "-0.15em" }}>Raylarda Şekilleniyor</span>
          </h1>

          {/* CTA Butonlar */}
          <div className="flex flex-col sm:flex-row items-start gap-4" style={{ marginTop: "5rem" }}>
            <Link href="/guzergah" className="btn-primary">
              Güzergahı İncele
              <FaArrowRight style={{ fontSize: 13 }} />
            </Link>
            <Link href="/proje" className="btn-secondary">
              <FaPlay style={{ fontSize: 11 }} />
              Proje Hakkında
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
