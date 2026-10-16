import { ImageResponse } from "next/og";

/* Výchozí sdílecí obrázek (úvodka a stránky bez vlastního): tři čísla strategie. Témata mají svůj. */
export const alt = "Česko má na víc! Hospodářská strategie PEER vysvětlená pro lidi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontSize: 150, fontWeight: 800, lineHeight: 1, color: "#fec934" }}>+1 bod růstu</div>
          <div style={{ fontSize: 40, fontWeight: 700, lineHeight: 1.15, maxWidth: 1000 }}>
            Bilion korun ročně navíc na konci dekády. 68 000 Kč na pracujícího.
          </div>
          <div style={{ fontSize: 32, color: "#d9d9d9" }}>Hospodářská strategie 2026–2035 vysvětlená pro lidi. S bobrem.</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#adadad" }}>
          <span>14 témat · videa · kalkulačky · plné znění</span>
          <span>Hospodářská strategie PEER</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
