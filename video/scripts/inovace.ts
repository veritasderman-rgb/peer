import type { VideoScript } from "@/lib/topics";

export const script: VideoScript = {
  slug: "inovace",
  titulek: "Proč u nás vzniká tak málo firem?",
  hook: {
    cislo: "131",
    jednotka: "startupů na milion obyvatel",
    veta: "Izrael jich má 410. Rakousko dvakrát tolik než my.",
  },
  problem: [
    { veta: "V indexu inovací jsme 32. ze 139. Jen průměrní inovátoři.", cislo: "32." },
    { veta: "Víme a umíme, ale neumíme to prodat. V tržní sofistikovanosti jsme 73.", cislo: "73." },
    { veta: "V Evropské unii jsme na 19. místě z 27. Hluboko pod průměrem.", cislo: "19." },
  ],
  proc: [
    "Firmy hlavně dodávají zahraničním výrobcům",
    "Nízká přidaná hodnota a stálý tlak na cenu",
    "Mladí se bojí neúspěchu, tak nezačnou",
    "Výzkum z univerzit se do praxe nedostane",
  ],
  navrh: [
    { nazev: "Fond na startupy", veta: "Státní fond s privátními investory. Vzorem je izraelská Yozma z roku 1993." },
    { nazev: "ESOP a druhá šance", veta: "Podíl ve firmě pro první lidi v týmu a rychlé smazání neúspěchu." },
    { nazev: "Inkubátory ve městech", veta: "Podle Jihomoravského JIC v Praze, Ostravě, Plzni, Liberci a Olomouci." },
  ],
  dopad: {
    cislo: "Silný inovátor",
    veta: "Cíl: z průměrného inovátora na silného a s domácími firmami obrátit odliv dividend.",
  },
};
