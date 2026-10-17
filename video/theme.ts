/* Brand Pirátů pro video: světlé pozadí, černý text, žluté plochy pod čísly, cyan jako vedlejší akcent. */
export const C = {
  bg: "#f7f7f7",
  ink: "#000000",
  sun: "#fec934",
  cyan: "#004958",
  card: "#ffffff",
  line: "rgba(0, 0, 0, 0.12)",
  muted: "#3a3a3a",
};

export const F = {
  display: "'Bebas Neue', 'Roboto Condensed', Arial, sans-serif",
  body: "Roboto, Arial, sans-serif",
};

export type Layout = {
  reel: boolean;
  W: number;
  H: number;
  /** textová plocha */
  text: { x: number; y: number; w: number; h: number };
  /** značka garanta: střed, spodní hrana a průměr monogramu (klíč bobr zůstal kvůli historii) */
  bobr: { cx: number; bottom: number; size: number };
  fs: {
    base: number;
    small: number;
    eyebrow: number;
    title: number;
    cardTitle: number;
    hookNum: number;
    num: number;
    unit: number;
  };
  gap: number;
  /** minimální velikost základního textu */
  minBase: number;
};

export function getLayout(W: number, H: number): Layout {
  const reel = H > W;
  if (reel) {
    return {
      reel,
      W,
      H,
      text: { x: 60, y: 240, w: W - 120, h: 990 },
      bobr: { cx: W / 2, bottom: H - 150, size: 170 },
      fs: { base: 60, small: 56, eyebrow: 56, title: 96, cardTitle: 68, hookNum: 360, num: 260, unit: 120 },
      gap: 36,
      minBase: 56,
    };
  }
  const zone = Math.round(W * 0.35);
  return {
    reel,
    W,
    H,
    text: { x: zone + 20, y: 150, w: W - zone - 20 - 100, h: 850 },
    bobr: { cx: zone / 2 + 30, bottom: H - 130, size: 190 },
    fs: { base: 48, small: 40, eyebrow: 48, title: 84, cardTitle: 60, hookNum: 340, num: 230, unit: 112 },
    gap: 28,
    minBase: 44,
  };
}
