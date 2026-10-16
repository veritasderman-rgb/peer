import type { TopicConfig } from "@/lib/topics";
import { bydleni } from "./bydleni";
import { vzdelanost } from "./vzdelanost";
import { prace } from "./prace";
import { zeny } from "./zeny";
import { exekuce } from "./exekuce";
import { zdravi } from "./zdravi";
import { oligarchie } from "./oligarchie";
import { euro } from "./euro";
import { kapital } from "./kapital";
import { prumysl } from "./prumysl";
import { energie } from "./energie";
import { inovace } from "./inovace";
import { regiony } from "./regiony";
import { stat } from "./stat";

/* Registr témat. Téma přidáš importem sem; úvodní stránka, sitemapa a videa se řídí tímto seznamem. */
export const topics: TopicConfig[] = [
  bydleni, vzdelanost, prace, zeny, exekuce, zdravi, oligarchie, euro, kapital, prumysl, energie, inovace, regiony, stat,
].sort((a, b) => a.cislo - b.cislo);

export function getTopic(slug: string): TopicConfig | undefined {
  return topics.find((t) => t.slug === slug);
}
