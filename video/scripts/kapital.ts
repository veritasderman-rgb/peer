import type { VideoScript } from "@/lib/topics";

export const script: VideoScript = {
  slug: "kapital",
  titulek: "Kapitál za minutu",
  narration: {
    hook: "Čtyři tisíce miliard korun českých úspor si dává šlofíka, část dokonce na účtech bez úroků.",
    problem: "Penzijní fondy mají malé výnosy a poplatky z nich spolknou většinu. Český střadatel vloží desetkrát víc peněz než slovenský, aby dostal stejný výnos. A peníze, které nepracují, chybí novým i stávajícím firmám.",
    proc: "Kapitál se u nás přestal hromadit, spí na neúročených účtech a fondy berou vysoké poplatky za malé výnosy.",
    navrh: "Zákonem dramaticky snížíme poplatky penzijních fondů, případně je převezme stát. Spících čtyři tisíce miliard probudíme osvětou, syndikáty drobných investorů a dohledem nad rizikovými dluhopisy. Mírnější pravidla pro krátkodobé hypotéky usnadní stěhování za prací.",
    dopad: "Za dvacet pět let se úspory při třech procentech ročně zdvojnásobí.",
    outro: "Celou strategii najdeš na webu Česko má na víc.",
  },
  hook: {
    cislo: "4 000",
    jednotka: "miliard Kč spí",
    veta: "Čeští střadatelé mají spících 4 000 miliard. Část na neúročených účtech.",
  },
  problem: [
    { veta: "Penzijní fondy mají malé výnosy a poplatky spolknou jejich větší část." },
    { veta: "Český střadatel vkládá 10× víc peněz než slovenský pro stejný výnos.", cislo: "10×" },
    { veta: "Peníze nepracují, a tak chybí novým firmám i těm stávajícím.", cislo: "4 000 mld. Kč" },
  ],
  proc: [
    "Akumulace kapitálu u nás byla přetržena.",
    "Kapitál je alokován nevhodně: spí.",
    "Úspory leží na neúročených účtech.",
    "Výnosy fondů jsou malé, poplatky vysoké.",
  ],
  navrh: [
    { nazev: "Levnější penzijní fondy", veta: "Zákonem dramaticky snížit poplatky, případně fondy provozované státem." },
    { nazev: "Probudit spících 4 000 miliard", veta: "Osvěta, syndikáty drobných investorů a dohled nad rizikovými dluhopisy." },
    { nazev: "Snazší stěhování za prací", veta: "Mírnější regulace krátkodobých hypoték pro rychlý prodej a koupi." },
  ],
  dopad: { cislo: "25 let", veta: "a úspory se při pouhých 3 % ročně zdvojnásobí." },
};
