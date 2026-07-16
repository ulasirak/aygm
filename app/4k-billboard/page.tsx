"use client";

// ─── GÜNCELLEME İÇİN SADECE BU DEĞERİ DEĞİŞTİR ──────────────────────────────
const PROGRESS = 42;
// ──────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const STATIONS = [
  { id: 0, name: "Yeni Sanayi",    x: 190,  y: 420 },
  { id: 1, name: "ASLİDAŞ",        x: 460,  y: 355 },
  { id: 2, name: "TÜYAP",          x: 750,  y: 570 },
  { id: 3, name: "Banliyö",        x: 1050, y: 385, transfer: true },
  { id: 4, name: "Çimento",        x: 1320, y: 275 },
  { id: 5, name: "Novaland",       x: 1590, y: 345 },
  { id: 6, name: "Otogar",         x: 1860, y: 255 },
  { id: 7, name: "Ecdad Bahçesi",  x: 2110, y: 375 },
  { id: 8, name: "Real",           x: 2360, y: 410 },
  { id: 9, name: "Konya Stadyumu", x: 2610, y: 430 },
];

function buildPath(pts: { x: number; y: number }[]) {
  return pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
}

function splitRoute(pts: { x: number; y: number }[], pct: number) {
  let total = 0;
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i].x - pts[i - 1].x, dy = pts[i].y - pts[i - 1].y;
    total += Math.sqrt(dx * dx + dy * dy);
  }
  const target = total * (pct / 100);
  let covered = 0;
  const done: { x: number; y: number }[] = [pts[0]];
  const rem: { x: number; y: number }[] = [];
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i].x - pts[i - 1].x, dy = pts[i].y - pts[i - 1].y;
    const seg = Math.sqrt(dx * dx + dy * dy);
    if (covered + seg <= target) { covered += seg; done.push(pts[i]); }
    else {
      const t = (target - covered) / seg;
      done.push({ x: pts[i - 1].x + dx * t, y: pts[i - 1].y + dy * t });
      rem.push({ x: pts[i - 1].x + dx * t, y: pts[i - 1].y + dy * t }, ...pts.slice(i));
      break;
    }
  }
  return { done: buildPath(done), remaining: rem.length > 1 ? buildPath(rem) : "" };
}

// Gerçekçi buğday başağı — bıyıklı (awn), doğal sap eğrisi
function WheatStalk({ cx, cy, h, angle = 0, opacity = 0.08 }: {
  cx: number; cy: number; h: number; angle?: number; opacity?: number;
}) {
  const sw = h * 0.022;          // stroke genişliği
  const gW = h * 0.072;          // dane genişliği
  const gL = h * 0.14;           // dane uzunluğu
  const awnL = h * 0.28;         // bıyık uzunluğu
  const earStart = h * 0.48;     // başağın başladığı yükseklik
  const grainCount = 8;
  const spacing = earStart / grainCount;

  return (
    <g transform={`translate(${cx},${cy}) rotate(${angle})`} opacity={opacity}
       fill="none" stroke="#0A5C58" strokeLinecap="round" strokeLinejoin="round">

      {/* Ana sap — hafif S eğrisi */}
      <path
        d={`M 0 0 C ${h*0.04} ${-h*0.25} ${-h*0.03} ${-h*0.55} 0 ${-h}`}
        strokeWidth={sw * 1.1}
      />

      {/* Yaprak 1 — sağa */}
      <path
        d={`M 0 ${-h*0.28} C ${h*0.18} ${-h*0.22} ${h*0.26} ${-h*0.16} ${h*0.18} ${-h*0.10}`}
        strokeWidth={sw * 0.85}
      />
      {/* Yaprak 2 — sola */}
      <path
        d={`M 0 ${-h*0.48} C ${-h*0.20} ${-h*0.42} ${-h*0.28} ${-h*0.36} ${-h*0.20} ${-h*0.30}`}
        strokeWidth={sw * 0.85}
      />

      {/* Daneler + bıyıklar */}
      {Array.from({ length: grainCount }).map((_, i) => {
        const yBase = -h + i * spacing + spacing * 0.4;
        const side = i % 2 === 0 ? 1 : -1;
        const tilt = side * 22;
        const dCx = side * gW * 0.55;
        const awnTilt = side * 28;

        return (
          <g key={i} transform={`rotate(${tilt}, ${dCx}, ${yBase})`}>
            {/* Dane gövdesi */}
            <ellipse cx={dCx} cy={yBase} rx={gW} ry={gL} strokeWidth={sw * 0.9} />
            {/* Bıyık (awn) */}
            <line
              x1={dCx + Math.sin((awnTilt * Math.PI) / 180) * gL * 0.4}
              y1={yBase - gL}
              x2={dCx + Math.sin((awnTilt * Math.PI) / 180) * awnL}
              y2={yBase - gL - awnL * Math.cos((awnTilt * Math.PI) / 180)}
              strokeWidth={sw * 0.45}
            />
          </g>
        );
      })}

      {/* Tepe danesi */}
      <ellipse cx={0} cy={-h} rx={gW * 0.65} ry={gL * 0.75} strokeWidth={sw} />
      {/* Tepe bıyığı */}
      <line x1={0} y1={-h - gL * 0.75} x2={0} y2={-h - gL * 0.75 - awnL * 0.9} strokeWidth={sw * 0.4} />
    </g>
  );
}

export default function BillboardPage() {
  const [clock, setClock] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const tick = () => setClock(new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    tick();
    const clockId = setInterval(tick, 1000);

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw-billboard.js").catch(() => {});
    }

    let cur = 0;
    const step = PROGRESS / 90;
    const countId = setInterval(() => {
      cur = Math.min(cur + step, PROGRESS);
      setCount(Math.floor(cur));
      if (cur >= PROGRESS) clearInterval(countId);
    }, 20);

    return () => { clearInterval(clockId); clearInterval(countId); document.body.style.overflow = ""; };
  }, []);

  const { done, remaining } = splitRoute(STATIONS, PROGRESS);
  const completedIdx = Math.floor((PROGRESS / 100) * (STATIONS.length - 1));
  const FOOTER = 190;
  const r = 340;
  const circ = 2 * Math.PI * r;
  const arcOffset = circ - (circ * count) / 100;

  return (
    <div style={{
      width: "3840px", height: "2160px",
      background: "#F5FEFE",
      overflow: "hidden", position: "relative",
      fontFamily: "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif",
      userSelect: "none",
    }}>

      <style>{`
        @keyframes trainMove {
          0%   { stroke-dashoffset: 2200; }
          100% { stroke-dashoffset: -400; }
        }
        @keyframes routeIn {
          from { stroke-dasharray: 5000 5000; stroke-dashoffset: 5000; }
          to   { stroke-dasharray: 5000 5000; stroke-dashoffset: 0; }
        }
        @keyframes barGrow {
          from { width: 0%; }
          to   { width: ${PROGRESS}%; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes stationPop {
          0%,100% { r: 30; }
          50%     { r: 38; }
        }
      `}</style>

      {/* ══ SOL PANEL ══════════════════════════════════════════════════════════ */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, width: 1620, bottom: FOOTER,
        display: "flex", flexDirection: "column",
        padding: "100px 120px 80px 120px",
        borderRight: "1.5px solid #CDF2EF",
        overflow: "hidden",
      }}>

        {/* ── Buğday başakları arka plan ── */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          viewBox="0 0 1620 1970" preserveAspectRatio="xMidYMid slice">
          {/* Ön sıra — büyük başaklar */}
          <WheatStalk cx={110}  cy={1970} h={680} angle={-6}  opacity={0.09} />
          <WheatStalk cx={310}  cy={1970} h={750} angle={4}   opacity={0.08} />
          <WheatStalk cx={510}  cy={1970} h={620} angle={-2}  opacity={0.10} />
          <WheatStalk cx={710}  cy={1970} h={700} angle={7}   opacity={0.08} />
          <WheatStalk cx={910}  cy={1970} h={660} angle={-5}  opacity={0.09} />
          <WheatStalk cx={1110} cy={1970} h={720} angle={3}   opacity={0.08} />
          <WheatStalk cx={1310} cy={1970} h={640} angle={-8}  opacity={0.09} />
          <WheatStalk cx={1510} cy={1970} h={690} angle={5}   opacity={0.08} />
          {/* Arka sıra — küçük, hafif */}
          <WheatStalk cx={210}  cy={1970} h={500} angle={10}  opacity={0.05} />
          <WheatStalk cx={420}  cy={1970} h={460} angle={-12} opacity={0.045} />
          <WheatStalk cx={620}  cy={1970} h={520} angle={6}   opacity={0.05} />
          <WheatStalk cx={820}  cy={1970} h={480} angle={-4}  opacity={0.045} />
          <WheatStalk cx={1020} cy={1970} h={510} angle={9}   opacity={0.05} />
          <WheatStalk cx={1220} cy={1970} h={490} angle={-7}  opacity={0.045} />
          <WheatStalk cx={1420} cy={1970} h={530} angle={2}   opacity={0.05} />
        </svg>

        {/* Etiket */}
        <div style={{
          fontSize: 36, fontWeight: 700, letterSpacing: "0.22em",
          color: "#0B7C77", textTransform: "uppercase", marginBottom: 40,
          animation: "fadeIn 0.6s ease 0.1s both", position: "relative",
        }}>
          T.C. Ulaştırma ve Altyapı Bakanlığı
        </div>

        {/* Başlık */}
        <div style={{ animation: "fadeIn 0.6s ease 0.2s both", position: "relative" }}>
          <div style={{ fontSize: 200, fontWeight: 900, lineHeight: 0.86, color: "#111827", letterSpacing: "-0.03em" }}>
            KONYA
          </div>
          <div style={{ fontSize: 200, fontWeight: 900, lineHeight: 0.86, color: "#111827", letterSpacing: "-0.03em" }}>
            TRAMVAY
          </div>
          <div style={{ fontSize: 112, fontWeight: 900, color: "#0B7C77", letterSpacing: "0.03em", marginTop: 14 }}>
            2. ETAP
          </div>
        </div>

        {/* Slogan */}
        <div style={{
          animation: "fadeIn 0.7s ease 0.3s both", position: "relative",
          marginTop: 32, marginBottom: 8,
          paddingLeft: 24,
          borderLeft: "5px solid #0B7C77",
        }}>
          <div style={{ fontSize: 52, fontWeight: 300, color: "#374151", lineHeight: 1.55, letterSpacing: "0.01em" }}>
            Hayatınızı hızlandırıyor,
          </div>
          <div style={{ fontSize: 52, fontWeight: 300, color: "#374151", lineHeight: 1.55 }}>
            sevdiklerinize <span style={{ fontWeight: 700, color: "#0B7C77" }}>yaklaştırıyoruz.</span>
          </div>
          <div style={{ fontSize: 46, fontWeight: 400, color: "#6b7280", lineHeight: 1.6, marginTop: 10, fontStyle: "italic" }}>
            Sizinle Konyamızın her anını önemsiyoruz.
          </div>
        </div>

        {/* Ayırıcı */}
        <div style={{
          width: 140, height: 5, background: "#0B7C77", borderRadius: 3,
          margin: "40px 0", animation: "fadeIn 0.6s ease 0.35s both", position: "relative",
        }} />

        {/* Gauge + istatistikler */}
        <div style={{ display: "flex", alignItems: "center", gap: 70, animation: "fadeIn 0.6s ease 0.45s both", position: "relative" }}>

          {/* Dairesel gösterge */}
          <svg width="760" height="760" viewBox="0 0 760 760" style={{ flexShrink: 0 }}>
            <circle cx="380" cy="380" r={r} fill="none" stroke="#DDF7F5" strokeWidth="26" />
            <circle cx="380" cy="380" r={r} fill="none"
              stroke="#0B7C77" strokeWidth="26" strokeLinecap="round"
              strokeDasharray={circ} strokeDashoffset={arcOffset}
              transform="rotate(-90 380 380)"
              style={{ transition: "stroke-dashoffset 0.025s linear" }}
            />
            <text x="380" y="345" textAnchor="middle" fill="#111827" fontSize="184" fontWeight="900" fontFamily="IBM Plex Sans,Arial">
              {count}
            </text>
            <text x="380" y="460" textAnchor="middle" fill="#111827" fontSize="80" fontWeight="700" fontFamily="IBM Plex Sans,Arial">
              %
            </text>
            <text x="380" y="540" textAnchor="middle" fill="#0B7C77" fontSize="42" fontWeight="700" fontFamily="IBM Plex Sans,Arial" letterSpacing="5">
              TAMAMLANDI
            </text>
          </svg>

          {/* Sayılar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {[
              { val: "10 km",  lbl: "Hat Uzunluğu" },
              { val: "10",     lbl: "İstasyon"      },
              { val: "60.000", lbl: "Yolcu / Gün"   },
              { val: "2027",   lbl: "Hedef Yıl"     },
            ].map(({ val, lbl }, i) => (
              <div key={lbl} style={{
                display: "flex", alignItems: "baseline", gap: 20,
                paddingBottom: 28,
                borderBottom: i < 3 ? "1.5px solid #DDF7F5" : "none",
              }}>
                <span style={{ fontSize: 88, fontWeight: 900, color: "#111827", lineHeight: 1 }}>{val}</span>
                <span style={{ fontSize: 40, color: "#6b7280", fontWeight: 500 }}>{lbl}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ══ SAĞ PANEL — Harita ══════════════════════════════════════════════════ */}
      <div style={{
        position: "absolute",
        top: 0, left: 1622, right: 0, bottom: FOOTER,
        display: "flex", flexDirection: "column",
        padding: "70px 90px 50px 90px",
        background: "#EFFDFC",
      }}>

        <div style={{
          fontSize: 58, fontWeight: 800, letterSpacing: "0.08em",
          color: "#0B7C77", textTransform: "uppercase", marginBottom: 36,
        }}>
          Konya Stadyum – Şehir Hastanesi Tramvay Hattı
        </div>

        {/* SVG Harita */}
        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <svg viewBox="0 0 2800 700" style={{ width: "100%", overflow: "visible" }}>

            {remaining && (
              <path d={remaining} fill="none"
                stroke="#d1d5db" strokeWidth="12"
                strokeDasharray="42 26" strokeLinecap="round" />
            )}

            <path d={done} fill="none"
              stroke="#0B7C77" strokeWidth="16" strokeLinecap="round"
              style={{ animation: "routeIn 2s ease 0.3s both" }}
            />

            <path d={done} fill="none"
              stroke="rgba(255,255,255,0.9)" strokeWidth="7"
              strokeLinecap="round" strokeDasharray="160 3000"
              style={{ animation: "trainMove 3s linear infinite" }}
            />

            {STATIONS.map((s, i) => {
              const isDone = i <= completedIdx;
              const isActive = i === completedIdx;
              return (
                <g key={s.id}>
                  {s.transfer && (
                    <circle cx={s.x} cy={s.y} r={52} fill="none"
                      stroke="#f59e0b" strokeWidth="3.5" strokeDasharray="12 7" />
                  )}
                  <circle cx={s.x} cy={s.y}
                    r={isDone ? 32 : 18}
                    fill={isDone ? "#0B7C77" : "#F5FEFE"}
                    stroke={isDone ? "#0B7C77" : "#6FDDD6"}
                    strokeWidth={isDone ? 0 : 3.5}
                    style={isActive ? { animation: "stationPop 1.6s ease-in-out infinite" } : undefined}
                  />
                  {isActive && <circle cx={s.x} cy={s.y} r={13} fill="#F5FEFE" />}

                  <text x={s.x} y={s.y - 66}
                    textAnchor="middle"
                    fill={isDone ? "#111827" : "#9ca3af"}
                    fontSize={isDone ? 54 : 42}
                    fontWeight={isDone ? 700 : 400}
                    fontFamily="IBM Plex Sans, Arial">
                    {s.name}
                  </text>

                  {s.transfer && (
                    <text x={s.x} y={s.y + 80}
                      textAnchor="middle" fill="#d97706" fontSize="26"
                      fontWeight="600" fontFamily="IBM Plex Sans, Arial">
                      KONYARAY aktarma
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Alt bilgi — 2 sütun + QR */}
        <div style={{
          display: "flex", alignItems: "center",
          gap: 60, paddingTop: 40, borderTop: "1.5px solid #CDF2EF",
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 30, color: "#9ca3af", marginBottom: 10 }}>Temel Atma</div>
            <div style={{ fontSize: 44, fontWeight: 700, color: "#1f2937" }}>7 Temmuz 2025</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 30, color: "#9ca3af", marginBottom: 10 }}>Hat Güzergahı</div>
            <div style={{ fontSize: 44, fontWeight: 700, color: "#1f2937" }}>Karatay — Selçuklu</div>
          </div>
          {/* QR 2 — Bu site */}
          <div style={{
            background: "#ffffff", padding: 10, borderRadius: 8,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
            flexShrink: 0,
          }}>
            <QRCodeSVG value="https://aygm.vercel.app" size={130} fgColor="#0A5C58" bgColor="#ffffff" level="M" />
            <span style={{ fontSize: 17, color: "#0A5C58", fontWeight: 600, letterSpacing: "0.05em" }}>Proje Sitesi</span>
          </div>
        </div>
      </div>

      {/* ══ ALT ŞERIT (büyütülmüş) ══════════════════════════════════════════ */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: FOOTER,
        background: "#0B7C77",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 110px",
      }}>

        {/* Sol: Logo + bakanlık + QR */}
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/aygm-amblem.svg" alt="Altyapı Yatırımları Genel Müdürlüğü"
            width={100} height={100}
            style={{ height: 100, filter: "brightness(0) invert(1)", opacity: 0.9 }} />
          <div style={{ width: 2, height: 80, background: "rgba(255,255,255,0.2)" }} />
          <div>
            <div style={{ fontSize: 24, color: "rgba(255,255,255,0.5)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
              T.C. Ulaştırma ve Altyapı Bakanlığı
            </div>
            <div style={{ fontSize: 38, fontWeight: 800, color: "#ffffff", marginTop: 4 }}>
              Altyapı Yatırımları Genel Müdürlüğü
            </div>
          </div>
          {/* QR 1 — AYGM sitesi */}
          <div style={{
            background: "#ffffff", padding: 10, borderRadius: 8,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
            marginLeft: 12,
          }}>
            <QRCodeSVG value="https://www.aygm.gov.tr" size={130} fgColor="#0A5C58" bgColor="#ffffff" level="M" />
            <span style={{ fontSize: 17, color: "#0A5C58", fontWeight: 600, letterSpacing: "0.05em" }}>aygm.gov.tr</span>
          </div>
        </div>

        {/* Orta: website */}
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em" }}>
          aygm.uab.gov.tr
        </div>

        {/* Sağ: saat */}
        <div style={{
          fontSize: 72, fontWeight: 900, color: "#ffffff",
          fontVariantNumeric: "tabular-nums", lineHeight: 1,
          letterSpacing: "0.04em",
        }}>
          {clock}
        </div>

      </div>

    </div>
  );
}
