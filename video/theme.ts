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
      /* text nahoře a uprostřed, značka garanta dole v levém rohu; plochy se nepřekrývají */
      text: { x: 60, y: 240, w: W - 120, h: H - 240 - 420 },
      bobr: { cx: 60 + 60, bottom: H - 110, size: 120 },
      fs: { base: 60, small: 56, eyebrow: 56, title: 96, cardTitle: 68, hookNum: 360, num: 260, unit: 120 },
      gap: 36,
      minBase: 56,
    };
  }
  /* široké: text přes celou šířku (s rozumnou maximální šířkou řádku), značka garanta jako
     spodní lišta vlevo dole; plocha textu končí nad ní */
  return {
    reel,
    W,
    H,
    text: { x: 100, y: 170, w: Math.min(W - 200, 1400), h: H - 170 - 240 },
    bobr: { cx: 100 + 55, bottom: H - 64, size: 110 },
    fs: { base: 48, small: 40, eyebrow: 48, title: 84, cardTitle: 60, hookNum: 340, num: 230, unit: 112 },
    gap: 28,
    minBase: 44,
  };
}
