import tym from "@/data/tym.json";

/* Garanti kapitol: osm členů PEER, kteří ve videích a na webu nahrazují bobra. Tady jsou jen data
   (jména, rod, parametry kresby) a převody jméno/téma → id; kreslení je v components/GarantSvg.tsx.
   Bez Reactu, aby soubor šlo použít v Remotionu i ve skriptech. Všichni s kresbou souhlasili. */

export type GarantId = "dusek" | "hlavenka" | "nislerova" | "freitas" | "kriz" | "vislous" | "damborsky" | "pavlovic";
/** „rada“ = celá Pirátská expertní ekonomická rada nakreslená jako skupina. */
export type Mluvci = GarantId | "rada";
export type GarantMood = "neutral" | "surprised" | "thinking" | "happy" | "sleepy";

/** Účes: bald = holá hlava s vlasy po stranách, short = krátký sestřih, swept = sčesané dozadu,
    fringe = ofina do čela, long = dlouhé rovné, shoulder = vlnité po ramena. */
export type HairStyle = "bald" | "short" | "swept" | "fringe" | "long" | "shoulder";
export type BeardStyle = "full" | "short" | "goatee" | "stubble";
export type TopStyle = "turtleneck" | "jacket" | "cardigan" | "shirt";

export type Vzhled = {
  /** barva pleti */
  skin: string;
  hair: HairStyle;
  hairColor: string;
  /** barva obočí, když se liší od vlasů */
  browColor?: string;
  /** thin = tenké světlé obroučky, dark = výrazné tmavé obroučky */
  glasses: "thin" | "dark" | null;
  /** knír se kreslí u stylů short a goatee */
  beard: { style: BeardStyle; color: string } | null;
  /** kulatější, širší obličej */
  round?: boolean;
  /** vrásky od úsměvu */
  age?: boolean;
  /** svršek: color = sako / kardigan / svetr / košile, shirt = košile nebo top pod ním */
  top: { style: TopStyle; color: string; shirt?: string };
};

export type Garant = {
  id: GarantId;
  /** celé jméno přesně jako v data/tym.json */
  jmeno: string;
  /** křestní jméno (oslovení v bublině) */
  krestni: string;
  /** rod kvůli popiskům (garant / garantka, překvapený / překvapená) */
  zena: boolean;
  vzhled: Vzhled;
};

/* Parametry podoby podle skupinové fotky z představení PEER (2. 9. 2026), schválené ve skice
   maskoti/avatary.html. Úpravy proti skice podle fotek: Hlavenka má tmavě modrou košili (černý
   rolák na fotce nosí někdo jiný), Nislerová dlouhé rovné vlasy, Freitas Lopesová vlnité po ramena. */
export const GARANTI: Record<GarantId, Garant> = {
  dusek: {
    id: "dusek",
    jmeno: "Libor Dušek",
    krestni: "Libor",
    zena: false,
    vzhled: {
      skin: "#f0c9a6",
      hair: "short",
      hairColor: "#8f8a84",
      browColor: "#6f6a64",
      glasses: "dark",
      beard: { style: "short", color: "#a39d95" },
      age: true,
      top: { style: "jacket", color: "#a3a7ad", shirt: "#f7f7f7" },
    },
  },
  hlavenka: {
    id: "hlavenka",
    jmeno: "Jiří Hlavenka",
    krestni: "Jiří",
    zena: false,
    vzhled: {
      skin: "#f1cdb0",
      hair: "bald",
      hairColor: "#c4c1bb",
      browColor: "#8a847c",
      glasses: "thin",
      beard: null,
      round: true,
      age: true,
      top: { style: "shirt", color: "#1f3566" },
    },
  },
  nislerova: {
    id: "nislerova",
    jmeno: "Tereza Nislerová",
    krestni: "Tereza",
    zena: true,
    vzhled: {
      skin: "#f4d2b6",
      hair: "long",
      hairColor: "#b38a55",
      browColor: "#8a6a40",
      glasses: null,
      beard: null,
      top: { style: "jacket", color: "#1f2f6b", shirt: "#ffffff" },
    },
  },
  freitas: {
    id: "freitas",
    jmeno: "Zuzana Freitas Lopesová",
    krestni: "Zuzana",
    zena: true,
    vzhled: {
      skin: "#f2cdb0",
      hair: "shoulder",
      hairColor: "#a9532f",
      browColor: "#7a3d22",
      glasses: null,
      beard: null,
      round: true,
      age: true,
      top: { style: "cardigan", color: "#f1e08a", shirt: "#6f6f6f" },
    },
  },
  kriz: {
    id: "kriz",
    jmeno: "Jan Kříž",
    krestni: "Jan",
    zena: false,
    vzhled: {
      skin: "#f2cdb0",
      hair: "short",
      hairColor: "#3d2a1c",
      glasses: "thin",
      beard: null,
      top: { style: "jacket", color: "#6f7a88", shirt: "#a9c6e6" },
    },
  },
  vislous: {
    id: "vislous",
    jmeno: "Václav Vislous",
    krestni: "Václav",
    zena: false,
    vzhled: {
      skin: "#f4d3b8",
      hair: "swept",
      hairColor: "#d39a55",
      browColor: "#b07a3e",
      glasses: null,
      beard: { style: "short", color: "#c98f4e" },
      top: { style: "jacket", color: "#4f6b5e", shirt: "#efe5d2" },
    },
  },
  damborsky: {
    id: "damborsky",
    jmeno: "Milan Damborský",
    krestni: "Milan",
    zena: false,
    vzhled: {
      skin: "#eec4a4",
      hair: "short",
      hairColor: "#2d1f16",
      glasses: "dark",
      beard: { style: "goatee", color: "#3a2a20" },
      round: true,
      top: { style: "jacket", color: "#24242a", shirt: "#ffffff" },
    },
  },
  pavlovic: {
    id: "pavlovic",
    jmeno: "Josef Pavlovic",
    krestni: "Josef",
    zena: false,
    vzhled: {
      skin: "#f4d2b6",
      hair: "fringe",
      hairColor: "#c98a4a",
      glasses: null,
      beard: { style: "short", color: "#c08245" },
      top: { style: "jacket", color: "#4a6fa5", shirt: "#ffffff" },
    },
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
