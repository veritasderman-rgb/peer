import tym from "@/data/tym.json";

/* Garanti kapitol: osm členů PEER, kteří ve videích a na webu podepisují kapitoly. Tady jsou jen data
   (jména, rod, iniciály) a převody jméno/téma → id; značka garanta (monogram) se kreslí
   v components/GarantSvg.tsx. Bez Reactu, aby soubor šlo použít v Remotionu i ve skriptech. */

export type GarantId = "dusek" | "hlavenka" | "nislerova" | "freitas" | "kriz" | "vislous" | "damborsky" | "pavlovic";
/** „rada“ = celá Pirátská expertní ekonomická rada nakreslená jako skupina. */
export type Mluvci = GarantId | "rada";
export type GarantMood = "neutral" | "surprised" | "thinking" | "happy" | "sleepy";

export type Garant = {
  id: GarantId;
  /** celé jméno přesně jako v data/tym.json */
  jmeno: string;
  /** křestní jméno (oslovení v bublině) */
  krestni: string;
  /** rod kvůli popiskům (garant / garantka, překvapený / překvapená) */
  zena: boolean;
  /** iniciály do značky (monogramu) */
  inicialy: string;
};

export const GARANTI: Record<GarantId, Garant> = {
  dusek: {
    id: "dusek",
    jmeno: "Libor Dušek",
    krestni: "Libor",
    zena: false,
    inicialy: "LD",
  },
  hlavenka: {
    id: "hlavenka",
    jmeno: "Jiří Hlavenka",
    krestni: "Jiří",
    zena: false,
    inicialy: "JH",
  },
  nislerova: {
    id: "nislerova",
    jmeno: "Tereza Nislerová",
    krestni: "Tereza",
    zena: true,
    inicialy: "TN",
  },
  freitas: {
    id: "freitas",
    jmeno: "Zuzana Freitas Lopesová",
    krestni: "Zuzana",
    zena: true,
    inicialy: "ZF",
  },
  kriz: {
    id: "kriz",
    jmeno: "Jan Kříž",
    krestni: "Jan",
    zena: false,
    inicialy: "JK",
  },
  vislous: {
    id: "vislous",
    jmeno: "Václav Vislous",
    krestni: "Václav",
    zena: false,
    inicialy: "VV",
  },
  damborsky: {
    id: "damborsky",
    jmeno: "Milan Damborský",
    krestni: "Milan",
    zena: false,
    inicialy: "MD",
  },
  pavlovic: {
    id: "pavlovic",
    jmeno: "Josef Pavlovic",
    krestni: "Josef",
    zena: false,
    inicialy: "JP",
  },
};

export const RADA_JMENO = "Pirátská expertní ekonomická rada (PEER)";

const VSICHNI = Object.keys(GARANTI) as GarantId[];

/** Celé jméno z data/tym.json → id; neznámé jméno vyhodí chybu. */
export function garantPodleJmena(jmeno: string): GarantId {
  const hledane = jmeno.trim();
  const id = VSICHNI.find((k) => GARANTI[k].jmeno === hledane);
  if (!id) throw new Error(`Neznámý garant: "${jmeno}"`);
  return id;
}

/** Ids v pořadí data/tym.json (kdo v tym.json chybí, je na konci, aby import nikdy nespadl). */
export const GARANT_IDS: GarantId[] = (() => {
  const poradi = tym.lide.map((l) => VSICHNI.find((k) => GARANTI[k].jmeno === l.jmeno)).filter((x): x is GarantId => !!x);
  return [...poradi, ...VSICHNI.filter((k) => !poradi.includes(k))];
})();

/** Slug tématu → garant podle `temata` v data/tym.json; neznámý slug vyhodí chybu. */
export function garantTematu(slug: string): GarantId {
  const clen = tym.lide.find((l) => l.temata.includes(slug));
  if (!clen) throw new Error(`Téma "${slug}" nemá v data/tym.json garanta`);
  return garantPodleJmena(clen.jmeno);
}

/** „Libor Dušek“ nebo „Pirátská expertní ekonomická rada (PEER)“. */
export function jmenoMluvciho(kdo: Mluvci): string {
  return kdo === "rada" ? RADA_JMENO : GARANTI[kdo].jmeno;
}
