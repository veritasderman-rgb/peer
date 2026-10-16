/* Měření textu přes canvas (až po načtení písem, viz useFontsReady). Slouží k tomu,
   aby se dlouhá čísla a nadpisy z libovolného scénáře vešly do obrazu. */
const cache = new Map<string, number>();
let ctx: CanvasRenderingContext2D | null = null;

/** Šířka textu v px při velikosti 100 px. */
function width100(text: string, family: string, weight: number): number {
  const key = `${family}|${weight}|${text}`;
  const hit = cache.get(key);
  if (hit !== undefined) return hit;
  if (!ctx) ctx = document.createElement("canvas").getContext("2d");
  if (!ctx) return text.length * 50;
  ctx.font = `${weight} 100px ${family}`;
  const w = ctx.measureText(text).width;
  cache.set(key, w);
  return w;
}

export function textWidth(text: string, family: string, weight: number, size: number): number {
  return (width100(text, family, weight) * size) / 100;
}

/** Největší velikost písma ≤ max, při které se text (+ vodorovný padding v em) vejde do šířky. */
export function fitSize(text: string, family: string, weight: number, max: number, maxWidth: number, paddingEm = 0, min = 0): number {
  const k = width100(text, family, weight) / 100 + paddingEm;
  return Math.max(min, Math.min(max, Math.floor(maxWidth / k)));
}

/** Odhad počtu řádků při zalomení po slovech. */
export function estimateLines(text: string, family: string, weight: number, size: number, boxWidth: number): number {
  const words = text.split(/[ \t\n]+/).filter(Boolean); // nezlomitelné mezery drží slova u sebe
  const space = textWidth(" ", family, weight, size);
  let lines = 1;
  let cur = 0;
  for (const w of words) {
    const ww = textWidth(w, family, weight, size);
    if (cur === 0) cur = ww;
    else if (cur + space + ww <= boxWidth) cur += space + ww;
    else {
      lines += 1;
      cur = ww;
    }
  }
  return lines;
}
