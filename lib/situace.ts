/* Vstup „podle mě“: životní situace → témata a opatření, jejichž řádek „pro tebe“ se jí týká.
   Čísla opatření odkazují na `opatreni[].cislo` daného tématu (topics/<slug>.tsx), text se nekopíruje. */
export type Situace = {
  id: string; // url-safe, e.g. "rodic"
  label: string; // text čipu, nejvýš 3 slova
  uvod: string; // jedna věta, kterou řekne rada po výběru čipu (tykání, max 140 znaků)
  temata: { slug: string; opatreni: number[] }[]; // 1–3 čísla opatření v tématu, nejrelevantnější první
};

export const situace: Situace[] = [
  {
    id: "rodic",
    label: "Mám malé děti",
    uvod: "Školka už od dvou let, strop na cenu dětské skupiny a postupný návrat do práce. Tohle se tě týká nejvíc.",
    temata: [
      { slug: "zeny", opatreni: [2, 1, 4] },
      { slug: "vzdelanost", opatreni: [1, 2, 4] },
      { slug: "bydleni", opatreni: [4] },
    ],
  },
  {
    id: "hypoteka",
    label: "Hypotéka nebo nájem",
    uvod: "Cena bytu, nájem a úroky z hypotéky. Tady je, co s nimi chce strategie udělat.",
    temata: [
      { slug: "bydleni", opatreni: [5, 6, 4] },
      { slug: "euro", opatreni: [3] },
      { slug: "kapital", opatreni: [3] },
    ],
  },
  {
    id: "podnikam",
    label: "Podnikám",
    uvod: "Jeden vstup do státní správy, okamžité odpisy a půjčka místo dotace. Tohle se hodí, když podnikáš nebo začínáš.",
    temata: [
      { slug: "stat", opatreni: [1] },
      { slug: "prumysl", opatreni: [4, 5] },
      { slug: "inovace", opatreni: [3, 2] },
    ],
  },
  {
    id: "nizkyPrijem",
    label: "Mám nízký příjem",
    uvod: "Vyšší minimální mzda, polovina výplaty chráněná před exekucí a vrácená část z povolenek. Tohle se tě týká nejvíc.",
    temata: [
      { slug: "prace", opatreni: [2, 3] },
      { slug: "exekuce", opatreni: [1, 3] },
      { slug: "energie", opatreni: [7] },
      { slug: "bydleni", opatreni: [4] },
    ],
  },
  {
    id: "senior",
    label: "Blíží se důchod",
    uvod: "Péče, která přijde domů, klidnější ceny energií a levnější penzijko. Tohle se tě týká, když je důchod blízko.",
    temata: [
      { slug: "zdravi", opatreni: [6, 3, 10] },
      { slug: "energie", opatreni: [6, 14, 7] },
      { slug: "kapital", opatreni: [1] },
    ],
  },
  {
    id: "pecuji",
    label: "Pečuji o blízkého",
    uvod: "Služba, která přijde domů, odlehčovací pobyt a méně běhání po úřadech. Tohle se tě týká, když o někoho pečuješ.",
    temata: [
      { slug: "zdravi", opatreni: [5, 6, 8] },
      { slug: "stat", opatreni: [1] },
    ],
  },
  {
    id: "venkov",
    label: "Bydlím na vsi",
    uvod: "Obec dostane z rozvoje víc, větrník jí přinese peníze a malí farmáři nebudou ve stínu velkých. Tohle se tě týká.",
    temata: [
      { slug: "regiony", opatreni: [1, 2, 5] },
      { slug: "bydleni", opatreni: [1] },
      { slug: "energie", opatreni: [2, 12] },
      { slug: "oligarchie", opatreni: [5] },
    ],
  },
  {
    id: "student",
    label: "Jsem student",
    uvod: "Půjčka na studium splácená až po nástupu do výdělku, obory s praxí a podpora, když chceš založit firmu.",
    temata: [
      { slug: "vzdelanost", opatreni: [13, 16, 10] },
      { slug: "prace", opatreni: [3] },
      { slug: "inovace", opatreni: [1, 3] },
      { slug: "bydleni", opatreni: [4] },
    ],
  },
  {
    id: "zamestnanec",
    label: "Jsem zaměstnanec",
    uvod: "Kratší výpověď, vlastní vzdělávací účet a levnější penzijko. Tohle se tě týká jako zaměstnance.",
    temata: [
      { slug: "prace", opatreni: [1, 4] },
      { slug: "vzdelanost", opatreni: [20, 21, 19] },
      { slug: "kapital", opatreni: [1, 3] },
    ],
  },
  {
    id: "energie",
    label: "Účty za energie",
    uvod: "Kupón z povolenek, předvídatelné ceny a výhodná půjčka na renovaci. Tohle může zmírnit účty za energie.",
    temata: [{ slug: "energie", opatreni: [7, 6, 14] }],
  },
];
