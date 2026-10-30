/* Kvíz „Kolik ti strategie přinese?“ (/kolik-ti-to-prinese): otázky a vyhodnocení.

   Pravidla poctivosti: každé číslo ve výsledku pochází z data/<slug>.json, data/dopad.json nebo
   data/zaplaceni.json, nebo je z nich spočítané vzorcem, který už používá kalkulačka v daném tématu
   (components/Kalkulacka*.tsx). Kde studie dává rozpětí, ukazujeme rozpětí. Nic se neslibuje,
   všechno je „odhad podle studie“.

   Proč dvě funkce: `sestavData()` vytáhne z JSONů jen potřebná čísla a věty (volá ji server,
   app/kolik-ti-to-prinese/page.tsx) a `vyhodnot()` z nich skládá výsledek (běží v prohlížeči).
   Tenhle soubor proto JSONy za běhu neimportuje, jen popisuje jejich tvar; do klientského balíku
   tak nejdou stovky kB dat, ale jen malý objekt KvizData. Když se v JSONu změní nebo zmizí číslo,
   `sestavData()` vyhodí chybu už při sestavení stránky. */

/* ---------- otázky ---------- */

export type Otazka = { id: string; otazka: string; moznosti: string[] };

export const OTAZKY: Otazka[] = [
  { id: "domacnost", otazka: "S kým žiješ?", moznosti: ["Sám/sama", "V páru", "Rodina s dětmi do 6 let", "Rodina se staršími dětmi"] },
  { id: "bydleni", otazka: "Jak bydlíš?", moznosti: ["Vlastní, bez hypotéky", "Splácím hypotéku", "V nájmu", "Teprve hledám byt"] },
  { id: "prace", otazka: "Co děláš?", moznosti: ["Jsem zaměstnanec", "Podnikám", "Minimální mzda nebo DPP", "Jsem v exekuci", "Jsem v důchodu"] },
  { id: "obec", otazka: "Kde bydlíš?", moznosti: ["Velké město", "Menší město", "Vesnice"] },
  { id: "energie", otazka: "Čím topíš?", moznosti: ["Plynem nebo uhlím", "Elektřinou, tepelným čerpadlem", "Dálkovým teplem"] },
];

/** Odpovědi = indexy zvolených možností v pořadí OTAZKY (domácnost, bydlení, práce, obec, energie). */
export type Odpovedi = number[];

export const KOD_MZDA_MIN = 10_000;
export const KOD_MZDA_MAX = 150_000;

/** Odpovědi a mzda → kód do adresy, např. „2-1-0-1-0-49215“. */
export function zakoduj(odp: Odpovedi, mzda: number): string {
  return [...odp, Math.round(mzda)].join("-");
}

/** Kód z adresy → odpovědi a mzda; null, když kód nedává smysl. Mzda je nepovinná. */
export function dekoduj(kod: string): { odpovedi: Odpovedi; mzda: number | null } | null {
  const casti = kod.trim().split("-");
  if (casti.length < OTAZKY.length || casti.length > OTAZKY.length + 1) return null;
  const cisla = casti.map((c) => (/^\d+$/.test(c) ? Number(c) : NaN));
  const odpovedi = cisla.slice(0, OTAZKY.length);
  if (odpovedi.some((v, i) => !Number.isInteger(v) || v < 0 || v >= OTAZKY[i].moznosti.length)) return null;
  const m = cisla[OTAZKY.length];
  const mzda = m !== undefined && Number.isFinite(m) && m >= KOD_MZDA_MIN && m <= KOD_MZDA_MAX ? m : null;
  return { odpovedi, mzda };
}

/* ---------- data ze studie ---------- */

/** Hodnota z dat + přesná cesta k poli, ze kterého je. */
export type Cislo = { v: number; pole: string };
export type Text = { v: string; pole: string };
export type StojiPolozka = { slug: string; kdo: string; co: string; kolik: string | null; pole: string };

/* Minimální tvar JSONů, který potřebujeme. Kontrolu, že mu soubory odpovídají, dělá TypeScript
   v místě volání sestavData() (page.tsx předává importované JSONy). */
type SFakty = { kapitola: string; fakta: { id: string; hodnota: unknown }[] };
type SOpatreni = { opatreni: { cislo: number; klicoveCislo: string }[] };
type SDopad = { souhrn: { naPracujicihoKc: number; mzdyNavicMld: number; podilMezdNaHdp: number; rustNavicPb: number } };
type SZaplaceni = { temata: { slug: string; zaplati: { kdo: string; co: string; kolik: string | null }[] }[] };

export type Zdroje = {
  bydleni: SFakty;
  energie: SFakty;
  euro: SFakty;
  exekuce: SFakty;
  prace: SFakty & SOpatreni;
  zeny: SFakty;
  regiony: SFakty;
  vzdelanost: SFakty & SOpatreni;
  dopad: SDopad;
  zaplaceni: SZaplaceni;
};

type FaktSlug = "bydleni" | "energie" | "euro" | "exekuce" | "prace" | "zeny";

/* Číselná fakta: [soubor, id ve fakta[]]. */
const CISLA = {
  prumernaMzda: ["zeny", "prumerna_mzda_cr_2025"], // 49 215 Kč
  minMzda: ["prace", "minimalni_mzda_2026"], // 22 400 Kč
  minMzdaPodil: ["prace", "minimalni_mzda_podil"], // 43 %
  minMzdaCil: ["prace", "navrh_minimalni_mzda"], // 50 %
  podpora: ["prace", "navrh_podpora_v_nezamestnanosti"], // 80 %
  srazkaDnes: ["exekuce", "srazka_66"], // 66 %
  srazkaNavrh: ["exekuce", "navrh_max_srazka"], // 50 %
  srazka100: ["exekuce", "srazka_100_od_prijmu"], // 31 500 Kč
  srazka100Ctyri: ["exekuce", "srazka_100_od_4_exekuci"], // 24 609 Kč
  hraniceChudoby: ["exekuce", "nezabavitelne_minimum_hranice"], // 12 818 Kč
  skupinaDnes: ["zeny", "max_platba_detska_skupina_dnes"], // 7 466 Kč
  skupinaStrop: ["zeny", "navrh_cenovy_strop"], // 3 750 Kč
  euroUroky: ["euro", "hypoteka_rozdil_uroky"], // 1 242 657 Kč za 30 let
  euroRocne: ["euro", "uspora_domacnost"], // přes 40 000 Kč ročně
  euroSazbaCz: ["euro", "hypoteka_sazba_cr"], // 4,94 %
  euroSazbaSk: ["euro", "hypoteka_sazba_sk"], // 3,69 %
  euroDovolena: ["euro", "dovolena_skryte_naklady"], // 1 100 Kč na cestu za 1 500 EUR
  ermRoky: ["euro", "erm2_min_delka"], // 2 roky
  maastrichtDeficit: ["euro", "maastricht_deficit"], // 3 % HDP
  maastrichtDluh: ["euro", "maastricht_dluh"], // 60 % HDP
  kupon: ["energie", "kupon_castka_rocne"], // 5 000 Kč ročně na průměrnou domácnost
  kuponOd: ["energie", "povolenky_vytapeni_od"], // 2028
  kuponCena: ["energie", "kupon_cena_povolenky"], // 60 eur
  tcBod: ["energie", "tc_bod_zvratu"], // 2,7 : 1
  dynTarif: ["energie", "dynamicky_tarif_usetreno"], // 10 % účtu
  bytPlatyDnes: ["bydleni", "graf_rocni_platy_cesko"], // 15,1 ročních platů
  bytPlatyCil: ["bydleni", "cil_pomer_cena_mzda"], // pod 10
  najemCil: ["bydleni", "cil_najem_podil_mzdy"], // 30 % průměrné mzdy
  najemSmlouvy: ["bydleni", "najemni_smlouvy_1_rok"], // 70 % smluv na 1 rok
  vystavbaCil: ["bydleni", "cil_vystavba_rocni"], // 50 000 bytů ročně
} as const satisfies Record<string, readonly [FaktSlug, string]>;

/* Textová fakta (rozpětí, která studie uvádí slovy). */
const TEXTY = {
  obecZaByt: ["bydleni", "navrh_rud_byt_70_m2"], // 210 000–560 000 Kč za byt 70 m²
  obecZaM2: ["bydleni", "navrh_rud_dph_rozmezi"], // 3 000–8 000 Kč za m²
  parkovani: ["bydleni", "navrh_uspora_parkovani"], // 700 000–1 000 000 Kč na byt
  euroKonverze: ["euro", "transakcni_poplatek"], // 2–3 %
  litvaTeplo: ["energie", "litva_pokles_ceny_tepla"], // třetina
} as const satisfies Record<string, readonly [FaktSlug, string]>;

/* Položky „kdo zaplatí“ z data/zaplaceni.json: [téma, úryvek věty `co`, podle kterého položku najdeme].
   Hledá se podle textu, ne podle pořadí, aby přidání položky jinam nic nerozbilo. */
const STOJI = {
  ets2: ["energie", "povolenky na vytápění"],
  kapacita: ["energie", "kapacitní mechanismus"],
  plyn: ["energie", "topící plynem"],
  napoje: ["zdravi", "slazené nápoje"],
  danPozemky: ["bydleni", "z budov na pozemky"],
  prazdne: ["bydleni", "prázdné"],
  vypoved: ["prace", "výpovědní dobu"],
  ucetZam: ["vzdelanost", "Zaměstnanec bude přispívat"],
  minMzdaFirmy: ["prace", "minimální mzda má vzrůst"],
  dppFirmy: ["prace", "Firmy, které dnes používají dohody"],
  dppLide: ["prace", "kumulací DPP"],
  dluh: ["exekuce", "Dluh se neruší"],
  seniori: ["zdravi", "U seniorů"],
  rud: ["regiony", "(RUD)"],
  vratneGranty: ["vzdelanost", "vratné granty"],
  /* přínosové věty, které karty citují (částky jsou v `kolik`) */
  peceDoma: ["zdravi", "terénních a odlehčovacích"],
  inkaso: ["stat", "Jednotné inkasní místo"],
  odpisy: ["prumysl", "odepsat celou investici"],
  vitrObce: ["energie", "větrných projektů"],
  tezbaObce: ["regiony", "výnosech z těžby"],
} as const satisfies Record<string, readonly [string, string]>;

export type KvizData = {
  c: Record<keyof typeof CISLA, Cislo>;
  t: Record<keyof typeof TEXTY, Text>;
  s: Partial<Record<keyof typeof STOJI, StojiPolozka>>;
  /** vzdelanost.json, opatření 1: „mateřská škola už ve 2 letech; péče od 1 roku věku“ */
  skolkaVek: Text;
  /** dopad.json, souhrn */
  dopad: { naPracujiciho: Cislo; mzdyNavic: Cislo; podilMezd: Cislo; rustNavic: Cislo };
  kapitoly: Record<FaktSlug | "regiony" | "vzdelanost", string>;
};

function fakt(z: Zdroje, slug: FaktSlug, id: string) {
  const f = z[slug].fakta.find((x) => x.id === id);
  if (!f) throw new Error(`kviz: v data/${slug}.json chybí fakta.${id}`);
  return f.hodnota;
}

/** Vytáhne z JSONů všechno, co kvíz potřebuje. Volá se na serveru; při chybějícím čísle vyhodí chybu. */
export function sestavData(z: Zdroje): KvizData {
  const c = {} as Record<keyof typeof CISLA, Cislo>;
  for (const [k, [slug, id]] of Object.entries(CISLA) as [keyof typeof CISLA, readonly [FaktSlug, string]][]) {
    const v = fakt(z, slug, id);
    if (typeof v !== "number" || !Number.isFinite(v)) throw new Error(`kviz: data/${slug}.json fakta.${id} není číslo`);
    c[k] = { v, pole: `${slug}.json › fakta › ${id}` };
  }
  const t = {} as Record<keyof typeof TEXTY, Text>;
  for (const [k, [slug, id]] of Object.entries(TEXTY) as [keyof typeof TEXTY, readonly [FaktSlug, string]][]) {
    const v = fakt(z, slug, id);
    if (typeof v !== "string" || !v) throw new Error(`kviz: data/${slug}.json fakta.${id} není text`);
    t[k] = { v, pole: `${slug}.json › fakta › ${id}` };
  }

  const najdi = (slug: string, uryvek: string): StojiPolozka | undefined => {
    const tema = z.zaplaceni.temata.find((x) => x.slug === slug);
    const i = tema ? tema.zaplati.findIndex((p) => p.co.replace(/\u00a0/g, " ").includes(uryvek)) /* data mají nezlomitelné mezery (scripts/nbsp.mjs) */ : -1;
    if (!tema || i < 0) {
      console.warn(`kviz: v data/zaplaceni.json (${slug}) chybí položka „${uryvek}“`);
      return undefined;
    }
    const p = tema.zaplati[i];
    return { slug, kdo: p.kdo, co: p.co, kolik: p.kolik, pole: `zaplaceni.json › temata[${slug}] › zaplati[${i}]` };
  };
  const s: KvizData["s"] = {};
  for (const [k, [slug, uryvek]] of Object.entries(STOJI) as [keyof typeof STOJI, readonly [string, string]][]) {
    s[k] = najdi(slug, uryvek);
  }

  const op = z.vzdelanost.opatreni.find((o) => o.cislo === 1);
  if (!op) throw new Error("kviz: v data/vzdelanost.json chybí opatření 1");

  const d = z.dopad.souhrn;
  return {
    c,
    t,
    s,
    skolkaVek: { v: op.klicoveCislo, pole: "vzdelanost.json › opatreni[1] › klicoveCislo" },
    dopad: {
      naPracujiciho: { v: d.naPracujicihoKc, pole: "dopad.json › souhrn › naPracujicihoKc" },
      mzdyNavic: { v: d.mzdyNavicMld, pole: "dopad.json › souhrn › mzdyNavicMld" },
      podilMezd: { v: d.podilMezdNaHdp, pole: "dopad.json › souhrn › podilMezdNaHdp" },
      rustNavic: { v: d.rustNavicPb, pole: "dopad.json › souhrn › rustNavicPb" },
    },
    kapitoly: {
      bydleni: z.bydleni.kapitola,
      energie: z.energie.kapitola,
      euro: z.euro.kapitola,
      exekuce: z.exekuce.kapitola,
      prace: z.prace.kapitola,
      zeny: z.zeny.kapitola,
      regiony: z.regiony.kapitola,
      vzdelanost: z.vzdelanost.kapitola,
    },
  };
}

/* ---------- vyhodnocení ---------- */

export type Karta = {
  id: string;
  /** téma, kam karta odkazuje („dopad“ = stránka Velký obraz) */
  slug: string;
  href: string;
  nadpis: string;
  /** hlavní číslo nebo krátká věta; rozpětí tam, kde ho studie dává */
  hodnota: string;
  poznamka: string;
  /** zdroj pro čtenáře: kapitola studie, případně vnější zdroj */
  zdroj: string;
  /** přesná pole v datech, ze kterých jsou čísla na kartě */
  pole: string[];
  /** řazení a výběr do sdílecího obrázku: u peněz roční částka v Kč (dolní mez), jinak malé pořadové číslo */
  vaha: number;
  /** průměr za celou ekonomiku, ne osobní odhad */
  prumer?: boolean;
  /** řádek do sdílecího obrázku */
  sdilet: { cislo: string; popis: string };
};

export type Stoji = StojiPolozka & { href: string; proc: string };

/* bobr = věta, kterou ve výsledku říká rada (název pole zůstal z doby maskota) */
export type Vysledek = { karty: Karta[]; stoji: Stoji[]; bobr: string; sdilet: Karta["sdilet"][]; souhrn: string };

const nf = new Intl.NumberFormat("cs-CZ");
const nf1 = new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 1 });
const nf2 = new Intl.NumberFormat("cs-CZ", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const kc = (n: number) => `${nf.format(Math.round(n))} Kč`;
const kap = (d: KvizData, slug: keyof KvizData["kapitoly"]) => `Studie, kap. ${d.kapitoly[slug]}`;

/* Konstanty převzaté z kalkulaček (nejsou v JSONech, proto jsou tady i s původem). */
/** Průměrná domácnost má podle ČSÚ asi 2,3 osoby; stejný přepočet dělá components/KalkulackaKupon.tsx. */
const OSOB_NA_DOMACNOST = 2.3;
/** Modelová hypotéka studie: 4,7 mil. Kč na 30 let (euro.json, fakta hypoteka_splatka_cr, jednotka). */
const HYPOTEKA_LET = 30;
/** Kalkulačka exekucí počítá s „dalšími 1 000 Kč hrubého“ (components/KalkulackaExekuce.tsx). */
const TISICOVKA = 1_000;
/** Počet lidí podle odpovědi „S kým žiješ?“; u rodin nevíme přesně, proto rozpětí 3–4. */
const OSOBY: [number, number][] = [
  [1, 1],
  [2, 2],
  [3, 4],
  [3, 4],
];

function polozka(d: KvizData, k: keyof KvizData["s"], proc: string): Stoji | null {
  const p = d.s[k];
  return p ? { ...p, href: `/${p.slug}#stoji`, proc } : null;
}

/**
 * Odpovědi + hrubá měsíční mzda → karty výsledku a „co to stojí“.
 * Čistá funkce: žádný stav, žádné DOM. `mzda` se používá jen tam, kde ji používá kalkulačka
 * tématu (exekuce: hranice 100% srážky; bydlení: kolik tvých ročních platů stojí průměrný byt;
 * minimální mzda: osobní rozdíl, když bereš méně než navrženou minimální mzdu).
 */
export function vyhodnot(odpovedi: Odpovedi, mzda: number, d: KvizData): Vysledek {
  const [domacnost, bydleni, prace, obec, energie] = odpovedi;
  const W = Number.isFinite(mzda) && mzda > 0 ? mzda : d.c.prumernaMzda.v;
  const C = d.c;
  const karty: Karta[] = [];

  /* --- 1. práce --- */
  if (prace === 0) {
    karty.push({
      id: "flexicurity",
      slug: "prace",
      href: "/prace",
      nadpis: "Záchranná síť a vzdělávací účet",
      hodnota: `${C.podpora.v} % podpory první 2 měsíce`,
      poznamka:
        `Když přijdeš o práci, podpora v nezaměstnanosti zůstane ${C.podpora.v} % v prvních 2 měsících; od pátého měsíce ji dostane jen ten, kdo se rekvalifikuje. ` +
        "Každý dospělý dostane individuální vzdělávací účet, na který přispívá stát, zaměstnavatel i ty. Kolik peněz na účet přijde, studie neuvádí.",
      zdroj: kap(d, "prace") + " (flexicurity, opatření 1 a 4)",
      pole: [C.podpora.pole, "prace.json › opatreni[1], opatreni[4]"],
      vaha: 3,
      sdilet: { cislo: `${C.podpora.v} % podpory`, popis: "v prvních 2 měsících bez práce a vzdělávací účet" },
    });
  } else if (prace === 1) {
    const inkaso = d.s.inkaso;
    const odpisy = d.s.odpisy;
    karty.push({
      id: "podnikani",
      slug: "stat",
      href: "/stat",
      nadpis: "Méně úřadů, rychlejší odpisy",
      hodnota: "jedno inkasní místo",
      poznamka:
        "Stát zřídí Jednotné inkasní místo pro finanční úřady, sociální zabezpečení a zdravotní pojišťovny" +
        (inkaso?.kolik ? ` a dokončí digitální služby (${inkaso.kolik})` : "") +
        ". Investici do výzkumu, automatizace a softwaru si odepíšeš celou hned v prvním roce. Kolik to ušetří tobě, studie nevyčísluje.",
      zdroj: "Studie, kap. 4.2 (stát) a 3.1 (průmysl)",
      pole: [inkaso?.pole, odpisy?.pole].filter((x): x is string => !!x),
      vaha: 3,
      sdilet: { cislo: "1 inkasní místo", popis: "pro daně a odvody a odpis investice hned v prvním roce" },
    });
  } else if (prace === 2) {
    /* vzorec KalkulackaMzda: návrh = průměrná mzda × 50 %, rozdíl = návrh − dnešní minimální mzda */
    const navrh = Math.round(C.prumernaMzda.v * (C.minMzdaCil.v / 100));
    const rozdil = navrh - C.minMzda.v;
    let osobne = "";
    let mesicne = rozdil;
    if (W >= navrh) {
      osobne = ` Při tvé mzdě ${kc(W)} jsi už nad navrženou minimální mzdou, takže se tě zvýšení přímo netýká.`;
      mesicne = 0;
    } else if (W > C.minMzda.v) {
      mesicne = navrh - W;
      osobne = ` Při tvé mzdě ${kc(W)} by to bylo ${kc(mesicne)} měsíčně navíc.`;
    } else if (W < C.minMzda.v) {
      osobne = " Zadaná mzda je pod dnešní minimální mzdou; čísla platí pro plný úvazek.";
    }
    karty.push({
      id: "minimalni-mzda",
      slug: "prace",
      href: "/prace",
      nadpis: "Vyšší minimální mzda",
      hodnota: mesicne > 0 ? `+${kc(mesicne)} měsíčně` : `${kc(navrh)} měsíčně`,
      poznamka:
        `Minimální mzda má vzrůst z ${C.minMzdaPodil.v} % na ${C.minMzdaCil.v} % průměrné mzdy. Při průměrné mzdě ${kc(C.prumernaMzda.v)} (2025) to je ${kc(navrh)} místo dnešních ${kc(C.minMzda.v)}, ` +
        `tedy ${kc(rozdil)} měsíčně a ${kc(rozdil * 12)} ročně navíc hrubého.${osobne} Průměrná mzda se mezitím zvýší, takže skutečná částka bude jiná.`,
      zdroj: kap(d, "prace") + "; výpočet jako v kalkulačce tématu Práce",
      pole: [C.minMzda.pole, C.minMzdaPodil.pole, C.minMzdaCil.pole, C.prumernaMzda.pole],
      vaha: mesicne * 12,
      sdilet:
        mesicne > 0
          ? { cislo: `+${kc(mesicne * 12)} ročně`, popis: `díky minimální mzdě na ${C.minMzdaCil.v} % průměru` }
          : { cislo: `${kc(navrh)} měsíčně`, popis: "navržená minimální mzda" },
    });
  } else if (prace === 3) {
    /* vzorec KalkulackaExekuce: z další tisícovky zůstane dnes 1 000 × (1 − 66 %), nad hranicí 0; podle návrhu vždy 1 000 × (1 − 50 %) */
    const dnes = Math.round(TISICOVKA * (1 - C.srazkaDnes.v / 100));
    const navrh = Math.round(TISICOVKA * (1 - C.srazkaNavrh.v / 100));
    const dnes13 = W > C.srazka100.v ? 0 : dnes;
    const dnes4 = W > C.srazka100Ctyri.v ? 0 : dnes;
    const dnesText =
      dnes13 === dnes4
        ? `${kc(dnes13)}${dnes13 === 0 ? " (jsi nad hranicí, srážka je 100 %)" : ""}`
        : `${kc(dnes13)} při 1–3 exekucích, ale ${kc(dnes4)} při 4 a více (100% srážka už od ${kc(C.srazka100Ctyri.v)})`;
    karty.push({
      id: "exekuce",
      slug: "exekuce",
      href: "/exekuce",
      nadpis: "Polovina výplaty zůstane tobě",
      hodnota: `${kc(navrh)} z každé další tisícovky`,
      poznamka:
        `Srážka ze mzdy bude nejvýš ${C.srazkaNavrh.v} % místo dnešních ${C.srazkaDnes.v} % a 100% srážka zmizí. Při tvé mzdě ${kc(W)} ti dnes z další vydělané tisícovky zůstane ${dnesText}, podle návrhu vždy aspoň ${kc(navrh)}. ` +
        `Samoživitelé po srážkách neklesnou pod hranici chudoby ${kc(C.hraniceChudoby.v)}. Zjednodušeno jako v kalkulačce tématu: srážky se ve skutečnosti počítají z čisté mzdy.`,
      zdroj: kap(d, "exekuce") + "; ExekuceInfo.cz, Exekutorská komora ČR",
      pole: [C.srazkaDnes.pole, C.srazkaNavrh.pole, C.srazka100.pole, C.srazka100Ctyri.pole, C.hraniceChudoby.pole],
      vaha: 1_000_000, // pro člověka v exekuci nejdůležitější řádek, ve sdílení první
      sdilet: { cislo: `${kc(navrh)} z každé tisícovky`, popis: `místo dnešních ${kc(dnes13)} (srážka nejvýš ${C.srazkaNavrh.v} %)` },
    });
  } else if (prace === 4) {
    const pece = d.s.peceDoma;
    karty.push({
      id: "pece",
      slug: "zdravi",
      href: "/zdravi",
      nadpis: "Péče, která přijde domů",
      hodnota: pece?.kolik ?? "víc terénních služeb",
      poznamka:
        "Financování terénních a odlehčovacích služeb se má v příštích deseti letech zvýšit. Je to částka pro celou zemi, ne na osobu, a kdo přesně doplatí, studie neurčuje. Energetický kupón ti přijde i v důchodu.",
      zdroj: "Studie, kap. 1.4 (zdraví)",
      pole: [pece?.pole].filter((x): x is string => !!x),
      vaha: 3,
      sdilet: { cislo: "víc péče doma", popis: "terénní a odlehčovací služby" },
    });
  }

  /* --- 2. domácnost --- */
  const euroPodminky = `Euro jde přijmout nejdřív ${C.ermRoky.v} roky po vstupu do ERM 2 a po splnění podmínek (schodek pod ${C.maastrichtDeficit.v} % HDP, dluh pod ${C.maastrichtDluh.v} % HDP nebo klesající).`;
  const dovolenaVeta = `Rodina, která na dovolené utratí 1 500 EUR, dnes ztratí na směně asi ${kc(C.euroDovolena.v)} (${d.t.euroKonverze.v} % z objemu).`;
  if (domacnost === 2) {
    const usetri = C.skupinaDnes.v - C.skupinaStrop.v; // vzorec KalkulackaSkolka: dnešní platba − strop
    karty.push({
      id: "skolka",
      slug: "zeny",
      href: "/zeny",
      nadpis: "Školka od 2 let a levnější dětská skupina",
      hodnota: `až ${kc(usetri)} měsíčně`,
      poznamka:
        `Veřejně podporovaná dětská skupina bude smět účtovat nejvýš asi ${kc(C.skupinaStrop.v)} měsíčně místo dnešních až ${kc(C.skupinaDnes.v)}. ` +
        `Kolik ušetříš, záleží na tom, kolik platíš teď: 0 až ${kc(usetri)} měsíčně, ročně až ${kc(usetri * 12)}. ` +
        `K tomu: ${d.skolkaVek.v}.`,
      zdroj: kap(d, "zeny") + " a 1.2 (vzdělanost); IDEA CERGE-EI",
      pole: [C.skupinaDnes.pole, C.skupinaStrop.pole, d.skolkaVek.pole],
      vaha: usetri * 12,
      sdilet: { cislo: `až ${kc(usetri * 12)} ročně`, popis: "méně za dětskou skupinu, školka od 2 let" },
    });
  } else if ((domacnost === 1 || domacnost === 3) && bydleni !== 1) {
    karty.push({
      id: "dovolena",
      slug: "euro",
      href: "/euro",
      nadpis: "Dovolená v eurozóně bez směnárny",
      hodnota: `~${kc(C.euroDovolena.v)} na jedné cestě`,
      poznamka: `${dovolenaVeta} S eurem by tahle „malá daň“ zmizela. ${euroPodminky}`,
      zdroj: kap(d, "euro"),
      pole: [C.euroDovolena.pole, d.t.euroKonverze.pole, C.ermRoky.pole],
      vaha: C.euroDovolena.v,
      sdilet: { cislo: `~${kc(C.euroDovolena.v)}`, popis: "na každé dovolené v eurozóně (s eurem)" },
    });
  }

  /* --- 3. bydlení --- */
  if (bydleni === 1) {
    /* euro.json: rozdíl úroků 1 242 657 Kč za 30 let → za rok */
    const rocne = C.euroUroky.v / HYPOTEKA_LET;
    const zaokr = Math.round(rocne / 100) * 100;
    karty.push({
      id: "hypoteka",
      slug: "euro",
      href: "/euro",
      nadpis: "Levnější hypotéka s eurem",
      hodnota: `~${kc(zaokr)} ročně`,
      poznamka:
        `Studie srovnává hypotéku 4,7 mil. Kč na ${HYPOTEKA_LET} let u stejné banky v Česku (${nf2.format(C.euroSazbaCz.v)} %) a na Slovensku (${nf2.format(C.euroSazbaSk.v)} %) v červnu 2026: ` +
        `rozdíl ${kc(C.euroUroky.v)} na úrocích za ${HYPOTEKA_LET} let, tedy asi ${kc(rocne)} ročně (studie: „přes ${kc(C.euroRocne.v)} ročně“). ` +
        `S menší hypotékou nebo jinou sazbou to bude úměrně jinak. ${euroPodminky}` +
        (domacnost === 1 || domacnost === 3 ? ` A ještě: ${dovolenaVeta.charAt(0).toLowerCase()}${dovolenaVeta.slice(1)}` : ""),
      zdroj: kap(d, "euro") + "; ČSOB, červen 2026",
      pole: [C.euroUroky.pole, C.euroRocne.pole, C.euroSazbaCz.pole, C.euroSazbaSk.pole, C.ermRoky.pole],
      vaha: rocne,
      sdilet: { cislo: `~${kc(zaokr)} ročně`, popis: "méně na úrocích hypotéky (s eurem)" },
    });
  } else if (bydleni === 2) {
    const najem = Math.round(C.prumernaMzda.v * (C.najemCil.v / 100));
    karty.push({
      id: "najem",
      slug: "bydleni",
      href: "/bydleni",
      nadpis: "Férovější nájem",
      hodnota: `cíl: nájem do ${C.najemCil.v} % průměrné mzdy`,
      poznamka:
        `Při průměrné mzdě ${kc(C.prumernaMzda.v)} je to nejvýš ${kc(najem)} měsíčně. Dnes je až ${C.najemSmlouvy.v} % nájemních smluv jen na 1 rok; ` +
        "Garanční fond má majitelům ručit za nájem a škody, když podepíšou smlouvu na dobu neurčitou s férovým nájmem. Je to cíl strategie, ne strop, který by platil pro tvůj byt.",
      zdroj: kap(d, "bydleni"),
      pole: [C.najemCil.pole, C.prumernaMzda.pole, C.najemSmlouvy.pole],
      vaha: 2,
      sdilet: { cislo: `nájem do ${C.najemCil.v} %`, popis: "průměrné mzdy (cíl) a delší smlouvy" },
    });
  } else if (bydleni === 3) {
    /* vzorec KalkulackaByt: poměr = cena bytu / (mzda × 12); cena průměrného bytu = 15,1 průměrných ročních mezd */
    const cena = C.bytPlatyDnes.v * C.prumernaMzda.v * 12;
    const tvychPlatu = cena / (W * 12);
    karty.push({
      id: "byt",
      slug: "bydleni",
      href: "/bydleni",
      nadpis: "Dostupnější byt",
      hodnota: `cíl: byt pod ${C.bytPlatyCil.v} ročních platů`,
      poznamka:
        `Dnes stojí průměrný byt asi ${nf1.format(C.bytPlatyDnes.v)} průměrných ročních hrubých mezd (asi ${nf1.format(cena / 1e6)} mil. Kč), nejvíc v EU. ` +
        `Při tvé mzdě ${kc(W)} je to ${nf1.format(tvychPlatu)} tvých ročních platů. Strategie chce stavět ${nf.format(C.vystavbaCil.v)} bytů ročně a zrušit povinná parkovací místa, ` +
        `což má náklady na byt snížit o ${d.t.parkovani.v} Kč. O kolik klesne cena tvého bytu, studie neříká.`,
      zdroj: kap(d, "bydleni") + "; výpočet jako v kalkulačce tématu Bydlení",
      pole: [C.bytPlatyDnes.pole, C.bytPlatyCil.pole, C.prumernaMzda.pole, C.vystavbaCil.pole, d.t.parkovani.pole],
      vaha: 2,
      sdilet: { cislo: `pod ${C.bytPlatyCil.v} ročních platů`, popis: `za byt (cíl; dnes ${nf1.format(C.bytPlatyDnes.v)})` },
    });
  }

  /* --- 4. obec --- */
  if (obec === 2) {
    const vitr = d.s.vitrObce;
    const tezba = d.s.tezbaObce;
    karty.push({
      id: "obec-vesnice",
      slug: "regiony",
      href: "/regiony",
      nadpis: "Obec dostane podíl z rozvoje",
      hodnota: "podíl z větru, těžby a nových bytů",
      poznamka:
        "Obce a dotčené komunity mají dostat přímý výnos z větrných projektů a podíl z těžby a velkých energetických projektů; kolik, studie neuvádí. " +
        `Za každý nový byt dostane obec ${d.t.obecZaByt.v} Kč (u bytu 70 m²) na školy, dopravu a sítě. Jsou to peníze pro obec, ne přímo tobě.`,
      zdroj: `${kap(d, "regiony")}, ${d.kapitoly.energie} (energie) a ${d.kapitoly.bydleni} (bydlení)`,
      pole: [tezba?.pole, vitr?.pole, d.t.obecZaByt.pole].filter((x): x is string => !!x),
      vaha: 1,
      sdilet: { cislo: "podíl pro obec", popis: "z větrníků, těžby a nových bytů" },
    });
  } else {
    karty.push({
      id: "obec-byty",
      slug: "bydleni",
      href: "/bydleni",
      nadpis: obec === 0 ? "Město dostane za nové byty peníze" : "Obec dostane za nové byty peníze",
      hodnota: `${d.t.obecZaByt.v} Kč za byt`,
      poznamka:
        `Obec, která povolí nové byty, dostane podíl z DPH ${d.t.obecZaM2.v} Kč za m² užitné plochy (u bytu 70 m² ${d.t.obecZaByt.v} Kč), účelově na školy, dopravu a sítě. ` +
        "Výstavba tak pro obec přestane být jen zátěž. Jsou to peníze pro obec, ne přímo tobě.",
      zdroj: kap(d, "bydleni") + "; výpočet jako v kalkulačce obce",
      pole: [d.t.obecZaM2.pole, d.t.obecZaByt.pole],
      vaha: 1,
      sdilet: { cislo: `${d.t.obecZaByt.v} Kč`, popis: "pro obec za každý nový byt" },
    });
  }

  /* --- 5. energie: kupón (vzorec KalkulackaKupon: 5 000 Kč ÷ 2,3 osoby, zaokrouhleno na desítky, × počet lidí) --- */
  const naOsobu = Math.round(C.kupon.v / OSOB_NA_DOMACNOST / 10) * 10;
  const [od, do_] = OSOBY[domacnost] ?? [1, 1];
  const kuponOd = naOsobu * od;
  const kuponDo = naOsobu * do_;
  const kuponText = od === do_ ? kc(kuponOd) : `${nf.format(kuponOd)}–${kc(kuponDo)}`;
  const topeni = [
    `Topíš plynem nebo uhlím, takže od ${C.kuponOd.v} zaplatíš povolenky v ceně paliva (viz „A co to stojí“). Kdo topí a jezdí úsporně, dostane víc, než zaplatil. Na výměnu kotle a renovaci mají být výhodné půjčky z revolvingového fondu.`,
    `Ceny elektřiny a plynu se mají narovnat tak, aby se tepelné čerpadlo vyplácelo (bod zvratu je poměr cen asi ${nf1.format(C.tcBod.v)} : 1). Dynamický tarif ušetřil domácnostem v českém pilotu kolem ${C.dynTarif.v} % účtu.`,
    `Teplárny mají mít regulovaný zisk a veřejné srovnání cen; v Litvě soutěž o nejlevnější teplo snížila ceny za 5 let o ${d.t.litvaTeplo.v.replace(/a$/, "u")}. Když teplárna opakovaně účtuje víc než srovnatelné tepelné čerpadlo, můžeš odejít bez sankcí.`,
  ][energie];
  karty.push({
    id: "kupon",
    slug: "energie",
    href: "/energie",
    nadpis: `Energetický kupón od ${C.kuponOd.v}`,
    hodnota: `~${kuponText} ročně`,
    poznamka:
      `Studie: zhruba ${kc(C.kupon.v)} ročně na průměrnou domácnost při ceně povolenky kolem ${C.kuponCena.v} eur, každému stejně, bez žádostí. ` +
      `Přepočet na ${od === do_ ? (od === 1 ? "jednoho člověka" : `${od} lidi`) : `${od}–${do_} lidi`} je náš (průměrná domácnost má podle ČSÚ 2,3 osoby), stejně jako v kalkulačce tématu Energie. ` +
      (topeni ?? ""),
    zdroj: kap(d, "energie") + ", s. 67",
    pole: [C.kupon.pole, C.kuponCena.pole, C.kuponOd.pole],
    vaha: kuponOd,
    sdilet: { cislo: `~${kuponText} ročně`, popis: `z energetického kupónu od ${C.kuponOd.v}` },
  });

  /* --- 6. všichni: průměr za ekonomiku --- */
  const D = d.dopad;
  const duchod = prace === 4;
  karty.push({
    id: "prumer",
    slug: "dopad",
    href: "/dopad",
    nadpis: "Vyšší mzdy v celé ekonomice",
    hodnota: `${kc(D.naPracujiciho.v)} ročně`,
    poznamka:
      (duchod ? "Týká se pracujících, ne přímo důchodců. " : "") +
      `Průměr na každého ekonomicky aktivního člověka na konci dekády, ne osobní slib. Studie počítá s růstem aspoň o ${D.rustNavic.v} procentní bod ročně navíc a z něj odvozuje ${nf.format(D.mzdyNavic.v)} mld. Kč víc ve mzdách ` +
      `včetně odvodů zaměstnavatele (podíl mezd ${D.podilMezd.v} % HDP), tedy ne čistého na výplatě. Sama píše, že vývoj HDP modelovat nelze.`,
    zdroj: "Studie, Souhrnný dopad do HDP a státního rozpočtu (s. 88)",
    pole: [D.naPracujiciho.pole, D.mzdyNavic.pole, D.podilMezd.pole, D.rustNavic.pole],
    vaha: duchod ? 0 : D.naPracujiciho.v,
    prumer: true,
    sdilet: { cislo: `${kc(D.naPracujiciho.v)} ročně`, popis: "navíc na pracujícího v průměru (konec dekády)" },
  });

  /* osobní karty podle váhy, průměr vždy poslední */
  const osobni = karty.filter((k) => !k.prumer).sort((a, b) => b.vaha - a.vaha);
  const vsechny = [...osobni, ...karty.filter((k) => k.prumer)];

  /* sdílecí obrázek: dvě největší osobní položky + průměr (u důchodce tři osobní) */
  const sdilet = [
    ...osobni.slice(0, duchod ? 3 : 2).map((k) => k.sdilet),
    ...(duchod ? [] : karty.filter((k) => k.prumer).map((k) => k.sdilet)),
  ];

  /* --- co to stojí / co se změní pro tebe --- */
  const stoji: (Stoji | null)[] = [
    polozka(d, "ets2", "Týká se každého, kdo topí nebo tankuje."),
    polozka(d, "kapacita", "Platí všichni odběratelé elektřiny."),
    polozka(d, "napoje", "Platí každý, kdo je kupuje."),
  ];
  if (energie === 0) stoji.push(polozka(d, "plyn", "Protože topíš plynem nebo uhlím."));
  if (bydleni === 0 || bydleni === 1) stoji.push(polozka(d, "danPozemky", "Protože vlastníš nemovitost."));
  if (bydleni === 0) stoji.push(polozka(d, "prazdne", "Jen pokud máš byt, dům nebo pozemek prázdný."));
  if (prace === 0) {
    stoji.push(polozka(d, "vypoved", "Protože jsi zaměstnanec."));
    stoji.push(polozka(d, "ucetZam", "Vzdělávací účet: přispíváš i ty."));
  }
  if (prace === 1) {
    stoji.push(polozka(d, "minMzdaFirmy", "Pokud zaměstnáváš lidi za nejnižší mzdy."));
    stoji.push(polozka(d, "dppFirmy", "Pokud používáš dohody o provedení práce."));
  }
  if (prace === 2) stoji.push(polozka(d, "dppLide", "Pokud si přivyděláváš na víc dohod (DPP)."));
  if (prace === 3) stoji.push(polozka(d, "dluh", "Protože jsi v exekuci."));
  if (prace === 4) stoji.push(polozka(d, "seniori", "Protože jsi v důchodu."));
  if (obec === 2) stoji.push(polozka(d, "rud", "Protože bydlíš na vesnici."));
  if (domacnost === 3) stoji.push(polozka(d, "vratneGranty", "Pokud tvoje děti půjdou na vysokou."));

  const top = osobni[0];
  /* věta pro bublinu rady */
  const bobr = top
    ? `Podle čísel ze studie se tě nejvíc týká tohle: ${top.nadpis.charAt(0).toLowerCase()}${top.nadpis.slice(1)}. Je to odhad, ne slib.`
    : "Podle čísel ze studie se tě týká hlavně růst mezd v celé ekonomice. Je to odhad, ne slib.";

  const souhrn = odpovedi.map((v, i) => OTAZKY[i]?.moznosti[v]).filter(Boolean).join(" · ");

  return { karty: vsechny, stoji: stoji.filter((x): x is Stoji => !!x), bobr, sdilet, souhrn };
}
