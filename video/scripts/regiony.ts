import type { VideoScript } from "@/lib/topics";

export const script: VideoScript = {
  slug: "regiony",
  titulek: "Úspěšné regiony",
  hook: {
    cislo: "2 %",
    jednotka: "příjmů obcí z místní ekonomiky",
    veta: "Obec, kde roste firma, z toho skoro nic nemá. V EU je hůř jen v Řecku.",
  },
  problem: [
    { veta: "Skoro všechny peníze obcí a krajů jdou ze státního rozpočtu, ať se v obci děje cokoli.", cislo: "97–98 %" },
    { veta: "Obce drží na účtech stovky miliard, ale investice často čekají na dotační výzvy.", cislo: "300–400 mld. Kč" },
    { veta: "Z 6 200 obcí má méně než tisíc obyvatel zhruba 4 700. Chybí jim odborníci.", cislo: "4 700" },
  ],
  proc: [
    "Obec z rozvoje nic nemá, tak ho nepodporuje",
    "Investice čekají na dotace, peníze leží na účtech",
    "Malé obce nemají lidi na přípravu projektů",
    "Regiony zaostávají a mladí odcházejí",
  ],
  navrh: [
    { nazev: "Obec dostane podíl z rozvoje", veta: "Nejméně 20 % rozpočtového určení daní se naváže na ekonomiku v území." },
    { nazev: "Společná správa malých obcí", veta: "Společenství obcí zajistí odborníky a projekty. Slučování zůstane dobrovolné." },
    { nazev: "Obecní peníze do společného fondu", veta: "Dobrovolný pooling přes Národní rozvojovou banku dá levnější dlouhodobé úvěry." },
  ],
  dopad: {
    cislo: "60 mld. Kč",
    veta: "ročně se naváže na to, co se v obci vydělá. Reforma je převážně fiskálně neutrální.",
  },
};
