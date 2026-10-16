import type { VideoScript } from "@/lib/topics";

export const script: VideoScript = {
  slug: "stat",
  titulek: "Stát jako lídr",
  hook: {
    cislo: "18 %",
    jednotka: "státních služeb je digitálních",
    veta: "Z téměř 9 000 služeb státu je plně digitálních jen 18 %. Víc než polovina je na papíře.",
  },
  problem: [
    { veta: "Víc než polovina státních služeb je stále jen papírová, asi 30 % je hybridních.", cislo: "přes 50 %" },
    { veta: "Informační systémy státu vznikaly bez veřejné soutěže a provoz stojí 8,5 mld. Kč ročně.", cislo: "53 %" },
    { veta: "Nástroje pro SZIF stály 2,1 mld. Kč za 4 roky. V komerční sféře 100–120 mil. Kč.", cislo: "až 20×" },
  ],
  proc: [
    "Stát digitalizuje jen zlomek služeb",
    "Staré systémy, některé z 90. let",
    "Vendor lock-in: platí se pořád stejnému dodavateli",
    "Provoz a každá změna stojí miliardy",
  ],
  navrh: [
    { nazev: "Jednotné inkasní místo", veta: "Finanční úřad, sociální zabezpečení a zdravotní pojišťovna v jednom bodu." },
    { nazev: "Konec závislosti na dodavateli", veta: "Digitalizovat znovu a lépe staré systémy a omezit vendor lock-in." },
    { nazev: "Hodnota za peníze", veta: "Přísná revize velkých investic ukotvená v zákoně, podle vzoru Slovenska a Dánska." },
  ],
  dopad: {
    cislo: "1 400",
    veta: "služeb v plánu stát dokončí včas. Finanční agendy půjdou přes jedno místo.",
  },
};
