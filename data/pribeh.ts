import dopad from "@/data/dopad.json";
import prumysl from "@/data/prumysl.json";
import bydleni from "@/data/bydleni.json";
import exekuce from "@/data/exekuce.json";
import stat from "@/data/stat.json";
import kapital from "@/data/kapital.json";
import { script as uvod } from "@/video/scripts/uvod";
import { topics } from "@/topics";
import { garantTematu, GARANT_IDS, GARANTI, type GarantId } from "@/lib/garanti";

/* Scény stránky /pribeh („Příběh strategie za pět minut“). Dějová linka je úvodní video
   (video/scripts/uvod.ts): háček → paradox → past → proč → tři směry → spící kapitál → výsledek → pro tebe → závěr.
   Všechna čísla se berou z data/*.json podle id faktu (funkce `cislo` vyhodí chybu, když fakt chybí),
   takže se stránka nemůže rozejít se studií. Soubor importuje jen serverová page.tsx; klient dostane hotová data. */

type Fakt = { id: string; hodnota: unknown; text: string; zdrojIndex?: number | null };
type Kapitola = { fakta: Fakt[]; zdroje: { index: number; citace: string }[] };

const K = {
  prumysl: prumysl as unknown as Kapitola,
  bydleni: bydleni as unknown as Kapitola,
  exekuce: exekuce as unknown as Kapitola,
  stat: stat as unknown as Kapitola,
  kapital: kapital as unknown as Kapitola,
};
type KapitolaId = keyof typeof K;

const pouzite: { k: KapitolaId; id: string }[] = [];
function fakt(k: KapitolaId, id: string): Fakt {
  const f = K[k].fakta.find((x) => x.id === id);
  if (!f) throw new Error(`data/${k}.json: chybí fakt "${id}"`);
  pouzite.push({ k, id });
  return f;
}
function cislo(k: KapitolaId, id: string): number {
  const h = fakt(k, id).hodnota;
  if (typeof h !== "number") throw new Error(`data/${k}.json: fakt "${id}" není číslo`);
  return h;
}
function text(k: KapitolaId, id: string): string {
  return String(fakt(k, id).hodnota);
}

const nf = (v: number, d = 0) => new Intl.NumberFormat("cs-CZ", { minimumFractionDigits: d, maximumFractionDigits: d }).format(v);

export type PribehSceneId = "hook" | "paradox" | "past" | "proc" | "smery" | "kapital" | "dopad" | "ty" | "outro";
/** Jeden textový krok; `**tučně**` se vykreslí jako zvýraznění. */
export type PribehKrok = { odstavce: string[]; odkazy?: { href: string; text: string; hlavni?: boolean }[] };
export type PribehScena = { id: PribehSceneId; stitek: string; nadpis: string; kroky: PribehKrok[] };

export type PribehTema = { slug: string; nazev: string; garant: GarantId };
export type PribehData = {
  sceny: PribehScena[];
  hook: { kc: number };
  paradox: { eci: number; hdpPozice: string };
  past: { slug: string; tema: string; garant: GarantId; hodnota: number; jednotka: string; popis: string }[];
  proc: { nazev: string; popis: string }[];
  smery: { nazev: string; veta: string; temata: PribehTema[]; garanti: GarantId[] }[];
  kapital: { mld: number; let: number; garant: GarantId };
  dopad: { pb: number; hdpMld: number; rozpocetMld: number; startRok: number; nabeh: { rok: number; mld: number; odhad: boolean }[] };
  garanti: { id: GarantId; jmeno: string }[];
  zdroje: string[];
};

export function pribehData(): PribehData {
  pouzite.length = 0;
  const s = dopad.souhrn; // dopad.json souhrn: naPracujicihoKc, rustNavicPb, hdpNavicMldRocneKonecDekady, rozpocetNavicMld

  /* 2 paradox: prumysl komplexita_pozice_cr (7.), hdp_na_obyvatele_pozice_cr („kolem 40“), prvni_desitka_svet */
  const eci = cislo("prumysl", "komplexita_pozice_cr");
  const hdpPozice = text("prumysl", "hdp_na_obyvatele_pozice_cr");
  cislo("prumysl", "prvni_desitka_svet");

  /* 3 past: bydleni rocni_platy_cr + rocni_platy_eu_prumer, exekuce osob_v_exekuci_2026 + srazka_100_od_prijmu,
     stat sluzby_digitalni + sluzby_statu + sluzby_papirove */
  const platy = cislo("bydleni", "rocni_platy_cr");
  const platyEu = text("bydleni", "rocni_platy_eu_prumer");
  const exek = cislo("exekuce", "osob_v_exekuci_2026");
  const srazka = cislo("exekuce", "srazka_100_od_prijmu");
  const digi = cislo("stat", "sluzby_digitalni");
  const sluzby = cislo("stat", "sluzby_statu");
  text("stat", "sluzby_papirove");

  /* 4 proč: prumysl pridana_hodnota_zahranicni_kontrola, dividendy_odesle_2025, vav_cr, vav_eu */
  const pridana = cislo("prumysl", "pridana_hodnota_zahranicni_kontrola");
  const dividendy = cislo("prumysl", "dividendy_odesle_2025");
  const vav = cislo("prumysl", "vav_cr");
  const vavEu = cislo("prumysl", "vav_eu");

  /* 6 kapitál: kapital spici_uspory (4 000 mld.), zdvojnasobeni_25_let */
  const spici = cislo("kapital", "spici_uspory");
  const dvakrat = cislo("kapital", "zdvojnasobeni_25_let");

  /* 7 výsledek: dopad.json nabeh (roky 1–4) a souhrn.hdpNavicMldRocneKonecDekady (rok 10); roky 5–9 dopočítané jako NabehChart */
  const posledni = dopad.nabeh[dopad.nabeh.length - 1];
  const nabeh = Array.from({ length: 10 }, (_, i) => {
    const rok = i + 1;
    const znamy = dopad.nabeh.find((b) => b.rok === rok);
    if (znamy) return { rok, mld: znamy.mld, odhad: false };
    if (rok === 10) return { rok, mld: s.hdpNavicMldRocneKonecDekady, odhad: false };
    const t = (rok - posledni.rok) / (10 - posledni.rok);
    return { rok, mld: Math.round(posledni.mld + (s.hdpNavicMldRocneKonecDekady - posledni.mld) * t), odhad: true };
  });

  /* 5 tři směry: piliře témat (topics/*.tsx `pilir`) seskupené jako ve videu; věty z video/scripts/uvod.ts */
  const SMERY: { nazev: string; pilire: string[] }[] = [
    { nazev: "Lidé", pilire: ["Lidský potenciál"] },
    { nazev: "Trh a kapitál", pilire: ["Trh a kapitál"] },
    { nazev: "Průmysl, energie, stát", pilire: ["Moderní energetika a průmysl", "Stát jako motor"] },
  ];
  const smery = SMERY.map((sm, i) => {
    const temata = topics.filter((t) => sm.pilire.includes(t.pilir)).map((t) => ({ slug: t.slug, nazev: t.kratkyNazev, garant: garantTematu(t.slug) }));
    return {
      nazev: sm.nazev,
      veta: uvod.navrh[i]?.veta ?? "",
      temata,
      garanti: [...new Set(temata.map((t) => t.garant))],
    };
  });

  const sceny: PribehScena[] = [
    {
      id: "hook",
      stitek: "Začátek",
      nadpis: `${nf(s.naPracujicihoKc)} Kč ročně navíc`,
      kroky: [
        {
          odstavce: [
            `Tolik má na konci dekády každý rok v průměru navíc ve mzdě nebo platu **každý, kdo pracuje**.`,
            `Slibuje to Hospodářská strategie 2026–2035, kterou sepsala Pirátská expertní ekonomická rada (PEER). Za pět minut ti ukážeme, proč to jde a odkud se to číslo bere. Stačí scrollovat.`,
          ],
        },
      ],
    },
    {
      id: "paradox",
      stitek: "Paradox",
      nadpis: "Umíme skoro všechno. Žijeme hůř, než bychom mohli.",
      kroky: [
        {
          odstavce: [
            `Česko je podle Atlasu ekonomické komplexity **${eci}. nejsložitější ekonomika světa**. Umíme vyrobit a vyvézt téměř cokoli.`,
            `V HDP na obyvatele v paritě kupní síly jsme ale až **${hdpPozice}. místa**. Mezi těmi dvěma čísly je celý příběh.`,
          ],
        },
      ],
    },
    {
      id: "past",
      stitek: "Past",
      nadpis: "Kde to bolí",
      kroky: [
        { odstavce: [`Na nový byt potřebuješ **${nf(platy)} ročních platů**. Nejvíc v celé EU, kde je průměr ${platyEu} let.`] },
        { odstavce: [`**${nf(exek)} lidí** je v exekuci. Kdo vydělá nad zhruba ${nf(srazka)} Kč hrubého, přijde o každou další korunu.`] },
        { odstavce: [`Stát nabízí téměř ${nf(sluzby)} služeb, digitálně ale jen **${digi} %** z nich. Víc než polovina je pořád jen na papíře.`] },
      ],
    },
    {
      id: "proc",
      stitek: "Proč",
      nadpis: "Montovna: řetěz, který drží Česko dole",
      kroky: [
        {
          odstavce: [
            `Nejde o smůlu ani o líné lidi. Jde o model, ve kterém česká ekonomika jede: vyrábíme levně pro cizí, zisky odtékají, stát nestíhá a lidé zůstávají v pasti.`,
            `Jen na dividendách odešlo v roce 2025 do zahraničí téměř **${nf(dividendy)} mld. Kč**. To jsou peníze, které tu nezůstanou na mzdy ani na investice.`,
          ],
        },
      ],
    },
    {
      id: "smery",
      stitek: "Návrh",
      nadpis: "Tři směry, čtrnáct témat",
      kroky: smery.map((sm) => ({ odstavce: [`**${sm.nazev}.** ${sm.veta}`] })),
    },
    {
      id: "kapital",
      stitek: "Spící peníze",
      nadpis: `${nf(spici)} miliard, které spí`,
      kroky: [
        { odstavce: [`U českých střadatelů leží **${nf(spici)} mld. Kč**. Většinou nepracují, velká část leží na neúročených běžných účtech.`] },
        {
          odstavce: [
            `Už při tříprocentním zhodnocení by se za **${dvakrat} let zdvojnásobily**. Strategie je chce probudit: penzijní fondy, které vydělávají, a kapitál pro domácí firmy.`,
          ],
        },
      ],
    },
    {
      id: "dopad",
      stitek: "Výsledek",
      nadpis: `+${s.rustNavicPb} procentní bod ročně`,
      kroky: [
        { odstavce: [`Všechna opatření dohromady mají zrychlit růst o **${s.rustNavicPb} procentní bod ročně**. Zní to jako málo. Jenže se to sčítá.`] },
        { odstavce: [`První rok je to ${nf(nabeh[0].mld)} mld. Kč navíc, čtvrtý už ${nf(posledni.mld)} mld. A na konci dekády **${nf(s.hdpNavicMldRocneKonecDekady)} mld. Kč ročně**: bilion.`] },
        { odstavce: [`Do státního rozpočtu z toho jde přes **${nf(s.rozpocetNavicMld)} mld. Kč ročně**. To je skoro celý dnešní schodek.`] },
      ],
    },
    {
      id: "ty",
      stitek: "Pro tebe",
      nadpis: "Co to znamená pro tebe",
      kroky: [
        {
          odstavce: [
            `V průměru **${nf(s.naPracujicihoKc)} Kč ročně** navíc ve mzdě nebo platu. Kolik u tebe, záleží na tom, co děláš a kde žiješ. Spočítej si to, nebo projdi témata, která se tě týkají.`,
          ],
          odkazy: [
            { href: "/kolik-ti-to-prinese", text: "Kolik to přinese mně", hlavni: true },
            { href: "/#temata", text: "Projít témata" },
          ],
        },
      ],
    },
    {
      id: "outro",
      stitek: "Kdo za tím stojí",
      nadpis: "Osm lidí, čtrnáct témat",
      kroky: [
        {
          odstavce: [
            `Strategii napsala Pirátská expertní ekonomická rada. Každé téma má svého garanta, který za čísly stojí a vysvětlí je za minutu ve videu.`,
          ],
          odkazy: [
            { href: "/kdo-je-kdo", text: "Kdo je kdo", hlavni: true },
            { href: "/videa", text: "Videa" },
          ],
        },
      ],
    },
  ];

  const kapitolaNazev: Record<KapitolaId, string> = { prumysl: "Průmysl", bydleni: "Bydlení", exekuce: "Exekuce", stat: "Stát", kapital: "Kapitál" };
  const zdroje = new Map<string, string>();
  zdroje.set("souhrn", `Hospodářská strategie PEER 2026–2035, Souhrnný dopad do HDP a státního rozpočtu (s. 88); náběh přínosu: ${dopad.nabehZdroj}`);
  for (const { k, id } of pouzite) {
    const zi = K[k].fakta.find((f) => f.id === id)?.zdrojIndex;
    const z = zi != null ? K[k].zdroje.find((x) => x.index === zi) : undefined;
    if (z) zdroje.set(z.citace, `${kapitolaNazev[k]}: ${z.citace}`);
  }

  return {
    sceny,
    hook: { kc: s.naPracujicihoKc },
    paradox: { eci, hdpPozice },
    past: [
      { slug: "bydleni", tema: "Bydlení", garant: garantTematu("bydleni"), hodnota: platy, jednotka: "ročních platů", popis: "stojí nový byt, nejvíc v EU" },
      { slug: "exekuce", tema: "Exekuce", garant: garantTematu("exekuce"), hodnota: exek, jednotka: "lidí", popis: "žije v exekuci" },
      { slug: "stat", tema: "Stát jako lídr", garant: garantTematu("stat"), hodnota: digi, jednotka: "%", popis: "služeb státu jde vyřídit digitálně" },
    ],
    proc: [
      { nazev: "Vyrábíme levně pro cizí", popis: `${pridana} % přidané hodnoty průmyslu dělají firmy pod zahraniční kontrolou` },
      { nazev: "Zisky odtékají", popis: `${nf(dividendy)} mld. Kč v dividendách do zahraničí (2025)` },
      { nazev: "Stát zaostává", popis: `na výzkum ${nf(vav, 2)} % HDP, průměr EU ${nf(vavEu, 2)} %` },
      { nazev: "Lidé v pasti", popis: "bytů, dluhů a chybějících školek" },
    ],
    smery,
    kapital: { mld: spici, let: dvakrat, garant: garantTematu("kapital") },
    dopad: { pb: s.rustNavicPb, hdpMld: s.hdpNavicMldRocneKonecDekady, rozpocetMld: s.rozpocetNavicMld, startRok: 2026, nabeh },
    garanti: GARANT_IDS.map((id) => ({ id, jmeno: GARANTI[id].jmeno })),
    zdroje: [...zdroje.values()],
  };
}
