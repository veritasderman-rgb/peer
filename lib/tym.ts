import tym from "@/data/tym.json";

/* Členové PEER a jejich ověřené veřejné profily (data/tym.json; odkazy jen z lide.pirati.cz, pirati.cz
   nebo z osobních webů, jinak null). */
export type Clen = (typeof tym.lide)[number];

export const clenove: Clen[] = tym.lide;
export const tymPoznamka = tym.poznamka;

export function najdiClena(jmeno: string): Clen | undefined {
  return clenove.find((c) => c.jmeno === jmeno);
}

export const SITE: { klic: keyof Clen; label: string }[] = [
  { klic: "web", label: "Web" },
  { klic: "linkedin", label: "LinkedIn" },
  { klic: "facebook", label: "Facebook" },
  { klic: "x", label: "X" },
  { klic: "bluesky", label: "Bluesky" },
  { klic: "instagram", label: "Instagram" },
];

/** Jen vyplněné odkazy člena, v pevném pořadí. */
export function odkazyClena(c: Clen): { klic: string; label: string; url: string }[] {
  return SITE.flatMap(({ klic, label }) => {
    const v = c[klic];
    return typeof v === "string" && v ? [{ klic, label, url: v }] : [];
  });
}
