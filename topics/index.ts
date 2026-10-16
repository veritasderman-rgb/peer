import type { TopicConfig } from "@/lib/topics";
import { bydleni } from "./bydleni";
import { vzdelanost } from "./vzdelanost";
import { zdravi } from "./zdravi";
import { oligarchie } from "./oligarchie";
import { euro } from "./euro";
import { kapital } from "./kapital";
import { energie } from "./energie";
import { prumysl } from "./prumysl";
import { inovace } from "./inovace";
import { regiony } from "./regiony";
import { stat } from "./stat";

/* Registr témat. Téma přidáš importem sem; úvodní stránka a sitemapa se řídí tímto seznamem. */
export const topics: TopicConfig[] = [bydleni, vzdelanost, zdravi, oligarchie, euro, kapital, energie, prumysl, inovace, regiony, stat].sort(
  (a, b) => a.cislo - b.cislo
);

export function getTopic(slug: string): TopicConfig | undefined {
  return topics.find((t) => t.slug === slug);
}
