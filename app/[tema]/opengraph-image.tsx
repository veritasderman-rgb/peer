import { ImageResponse } from "next/og";
import { getTopic, topics } from "@/topics";

/* Sdílecí obrázek tématu pro sítě: číslo háčku, jednotka, název tématu. Generuje se při buildu. */
export const alt = "Česko má na víc!";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return topics.map((t) => ({ tema: t.slug }));
}

const nf = new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 1 });

export default async function Image({ params }: { params: Promise<{ tema: string }> }) {
  const { tema } = await params;
  const t = getTopic(tema);
  const value = t ? nf.format(t.hook.value) : "";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000",
          color: "#fff",
          padding: "56px 64px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, fontWeight: 700, letterSpacing: 1 }}>
          <div style={{ width: 22, height: 34, background: "#fec934", clipPath: "polygon(0 0,100% 0,100% 70%,50% 100%,0 70%)" }} />
          ČESKO MÁ NA VÍC!
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 24 }}>
            <div style={{ fontSize: 200, fontWeight: 800, lineHeight: 1, color: "#fec934" }}>{value}</div>
            <div style={{ fontSize: 48, fontWeight: 700, maxWidth: 560, lineHeight: 1.1 }}>{t?.hook.unit}</div>
          </div>
          <div style={{ fontSize: 34, color: "#d9d9d9" }}>{t?.hook.label}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#adadad" }}>
          <span>{t?.nazev}</span>
          <span>Hospodářská strategie PEER</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
