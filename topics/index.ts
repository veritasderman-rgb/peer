import type { TopicConfig } from "@/lib/topics";
import { scripts } from "@/video/scripts";
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
  /* přepis = odstavce namluveného komentáře ze scénáře (stejný text, z něhož vznikl hlas i titulky) */
  const n = scripts.find((s) => s.slug === t.slug)?.narration;
  /* fonetické zápisy zkratek pro hlas („dépéhá“) se v přepisu vrací na běžný tvar */
  const citelne = (s: string) => s.replace(/dépéhá/gi, "DPH");
  const prepis = n ? [n.hook, n.problem, n.proc, n.navrh, n.dopad, n.outro].map(citelne) : undefined;
  return {
    ...t,
    video: {
      wide: `/video/${t.slug}-wide.mp4`,
      reel: `/video/${t.slug}-reel.mp4`,
      poster: `/video/${t.slug}-poster.jpg`,
      titulek: `${t.kratkyNazev} za minutu`,
      popis: "Namluvené, s hudbou a titulky. Široká verze pro YouTube a web, reel pro Instagram, TikTok a Shorts.",
      titulky: n ? `/video/${t.slug}.vtt` : undefined,
      prepis,
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
