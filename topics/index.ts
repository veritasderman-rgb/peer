import type { TopicConfig } from "@/lib/topics";
import { scripts } from "@/video/scripts";
import { citelne } from "@/lib/citelne";
import { media } from "@/lib/site";
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

/* Video „Strategie za minutu“ k tématu: soubory z public/video renderuje `npm run video:render`
   ze scénáře video/scripts/<slug>.ts. Pokud téma nemá vlastní `video`, doplní se standardní cesty. */
export type TopicVideoInfo = NonNullable<TopicConfig["video"]>;

/* Standardní cesty k videu scénáře <slug> (public/video, nebo NEXT_PUBLIC_MEDIA_URL přes media()). */
function videoFor(slug: string, titulek: string): TopicVideoInfo {
  /* přepis = odstavce namluveného komentáře ze scénáře (stejný text, z něhož vznikl hlas i titulky),
     v pořadí scén (scénář může mít „proč“ před „problémem“) */
  const sc = scripts.find((s) => s.slug === slug);
  const n = sc?.narration;
  const prepis = n ? (sc!.poradi ?? ["hook", "problem", "proc", "navrh", "dopad", "outro"]).map((id) => citelne(n[id])) : undefined;
  return {
    wide: media(`/video/${slug}-wide.mp4`),
    reel: media(`/video/${slug}-reel.mp4`),
    poster: media(`/video/${slug}-poster.jpg`),
    titulek,
    popis: "Namluvené, s hudbou a titulky. Široká verze pro YouTube a web, reel pro Instagram, TikTok a Shorts.",
    titulky: n ? `/video/${slug}.vtt` : undefined,
    prepis,
  };
}

function withVideo(t: TopicConfig): TopicConfig {
  if (t.video) return t;
  return { ...t, video: videoFor(t.slug, `${t.kratkyNazev} za minutu`) };
}

/* Úvodní video o celé strategii (scénář video/scripts/uvod.ts). Není to téma, jen video na úvodní stránce a v přehledu. */
export const uvodVideo: TopicVideoInfo = videoFor("uvod", "Česko má na víc za minutu");

/* Registr témat. Téma přidáš importem sem; úvodní stránka, sitemapa a videa se řídí tímto seznamem. */
export const topics: TopicConfig[] = [
  bydleni, vzdelanost, prace, zeny, exekuce, zdravi, oligarchie, euro, kapital, prumysl, energie, inovace, regiony, stat,
]
  .sort((a, b) => a.cislo - b.cislo)
  .map(withVideo);

export function getTopic(slug: string): TopicConfig | undefined {
  return topics.find((t) => t.slug === slug);
}
