import type { VideoScript } from "@/lib/topics";

export const script: VideoScript = {
  slug: "inovace",
  titulek: "Proč u nás vzniká tak málo firem?",
  narration: {
    hook: "Na milion obyvatel máme sto třicet jedna startupů. Izrael čtyři sta deset, Rakousko dvakrát tolik než my.",
    problem: "V indexu inovací jsme třicátí druzí ze sto třiceti devíti, jen průměrní inovátoři. Nápady máme, ale prodat je neumíme, v tržní sofistikovanosti jsme sedmdesátí třetí. V Evropské unii jsme devatenáctí z dvaceti sedmi.",
    proc: "Firmy hlavně dodávají cizím výrobcům za nízkou přidanou hodnotu, mladí se bojí neúspěchu a výzkum z univerzit se do praxe nedostane.",
    navrh: "Založíme státní fond s privátními investory podle izraelského fondu Jozma. Lidi v týmu dostanou zaměstnanecké podíly a neúspěch se rychle smaže. A inkubátory vyrostou v Praze, Ostravě, Plzni, Liberci a Olomouci.",
    dopad: "Chceme z průměrného inovátora udělat silného a obrátit odliv dividend.",
    outro: "Celou strategii najdeš na webu Česko má na víc.",
  },
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
