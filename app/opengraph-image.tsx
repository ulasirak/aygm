import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";
export const alt = "T.C. Ulaştırma ve Altyapı Bakanlığı — Altyapı Yatırımları Genel Müdürlüğü";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  const svgBuffer = readFileSync(join(process.cwd(), "public", "aygm-logo.svg"));
  const base64 = svgBuffer.toString("base64");
  const logoSrc = `data:image/svg+xml;base64,${base64}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#154530",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          width={700}
          height={226}
          style={{
            objectFit: "contain",
            filter: "brightness(0) invert(1)",
          }}
          alt="Altyapı Yatırımları Genel Müdürlüğü"
        />
      </div>
    ),
    { ...size }
  );
}
