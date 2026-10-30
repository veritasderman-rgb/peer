import { ImageResponse } from "next/og";

/* Sdílecí obrázek anglické stránky /en: stejná tři čísla jako úvodka, anglicky. */
export const alt = "Czechia can do better – PEER Economic Strategy 2026–2035 explained";
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
          CZECHIA CAN DO BETTER
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontSize: 150, fontWeight: 800, lineHeight: 1, color: "#fec934" }}>+1 pp growth</div>
          <div style={{ fontSize: 40, fontWeight: 700, lineHeight: 1.15, maxWidth: 1000 }}>
            CZK 1,000 billion more output a year by 2035. CZK 68,000 more per worker.
          </div>
          <div style={{ fontSize: 32, color: "#d9d9d9" }}>PEER Economic Strategy 2026–2035, summarised in English.</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#adadad" }}>
          <span>14 topics · one number each</span>
          <span>Pirate Expert Economic Council (PEER)</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
