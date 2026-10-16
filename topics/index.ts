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

/* Video „Bobr za minutu“ k tématu: soubory z public/video renderuje `npm run video:render`
   ze scénáře video/scripts/<slug>.ts. Pokud téma nemá vlastní `video`, doplní se standardní cesty. */
function withVideo(t: TopicConfig): TopicConfig {
  if (t.video) return t;
  return {
    ...t,
    video: {
      wide: `/video/${t.slug}-wide.mp4`,
      reel: `/video/${t.slug}-reel.mp4`,
      poster: `/video/${t.slug}-poster.jpg`,
      titulek: `${t.kratkyNazev} za minutu`,
      popis: "Bez zvuku, s titulky. Široká verze pro YouTube a web, reel pro Instagram, TikTok a Shorts.",
    },
  };
}

/* Registr témat. Téma přidáš importem sem; úvodní stránka, sitemapa a videa se řídí tímto seznamem. */
export const topics: TopicConfig[] = [
  bydleni, vzdelanost, prace, zeny, exekuce, zdravi, oligarchie, euro, kapital, prumysl, energie, inovace, regiony, stat,
]
  .sort((a, b) => a.cislo - b.cislo)
  .map(withVideo);

export function getTopic(slug: string): TopicConfig | undefined {
  return topics.find((t) => t.slug === slug);
}
