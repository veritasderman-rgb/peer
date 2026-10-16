# Česko má na víc! · web k Hospodářské strategii PEER

Web, který převypráví Hospodářskou strategii 2026–2035 Pirátské expertní ekonomické rady (PEER) pro běžné lidi:
s maskotem (bobr v pirátském klobouku), modelovými postavami, grafy, kalkulačkami a plným zněním každé kapitoly se zdroji.

- Návrh a zdůvodnění: [`docs/navrh-webu.md`](docs/navrh-webu.md)
- Původní studie: [`Piratska_Hospodarska_strategie.pdf`](Piratska_Hospodarska_strategie.pdf)
- Pilotní téma: `/bydleni` (kapitola 1.1)

## Spuštění

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # produkční build
```

## Nasazení na Vercel

Projekt je běžná Next.js aplikace v kořeni repa. Ve Vercelu stačí **Add New Project → Import** tohoto repozitáře,
framework se rozpozná automaticky (Next.js), žádné proměnné prostředí nejsou potřeba. Každý pull request dostane vlastní náhled.

Volitelné proměnné prostředí (`lib/site.ts`): `NEXT_PUBLIC_SITE_URL` (adresa webu), `NEXT_PUBLIC_KONTAKT_EMAIL` a
`NEXT_PUBLIC_REPO_URL` (kam vede tlačítko „Našel jsi chybu?“), `NEXT_PUBLIC_MEDIA_URL` (videa mimo repo, viz níže).

## Testy a kontrola odkazů

```bash
npx tsc --noEmit                 # typy
npm run build && npm test        # Playwright: každá stránka 200, h1, canonical, bez chyb v konzoli a bez posunu do šířky;
                                 # sitemapa, robots, llms.txt, OG obrázky, video s titulky, 404, výběr situace
npm run check:links              # externí odkazy ze stránek a dat (výjimky: scripts/link-allow.txt)
```

Totéž běží v GitHub Actions (`.github/workflows/ci.yml`): testy při každém PR a pushi do `main`, kontrola odkazů každé pondělí.

## Struktura

| Cesta | Co je v ní |
|---|---|
| `app/` | stránky (App Router): `/`, `/bydleni`, `/proc-bobr` |
| `components/` | bobr (`Bobr`, `BobrBubble`), grafy (`BarChart`, `Donut`, `IndexChart`, `BigNumber`), kalkulačky, scrollytelling (`Story`), řetězec příčin (`Spirala`), opatření, plné znění, slovník |
| `data/bydleni.json` | všechna čísla kapitoly 1.1 se zdroji; z něj čtou text, grafy i kalkulačky |
| `content/bydleni-plne-zneni.ts` | plné znění kapitoly 1.1 po odstavcích, rejstřík zdrojů, slovník pojmů |
| `koncept/` | původní klikací koncept (statické HTML) |

## Videa „Bobr za minutu“

Každé téma má široké video 16:9 (YouTube, web) a reel 9:16 (Instagram, TikTok, Shorts). Obě verze se renderují
v [Remotionu](https://www.remotion.dev/) ze scénáře `video/scripts/<slug>.ts` (typ `VideoScript` v `lib/topics.ts`),
takže oprava čísla znamená nový render, ne nový střih. Stránka tématu načte reel na telefonu na výšku, jinak širokou verzi;
`/videa` nabízí obě ke stažení.

```bash
npm run video:studio                       # náhled kompozic v prohlížeči
npm run video:render                       # vyrenderuje všechna témata do public/video/
npm run video:render -- --only euro,regiony
```

Render potřebuje Chromium (`REMOTION_BROWSER`, výchozí `/opt/pw-browsers/chromium`); jedno téma trvá asi 6 minut.
Pozor: Remotion je zdarma pro jednotlivce a malé firmy; pro stranu jako organizaci je potřeba ověřit licenci.

Kromě témat je tu úvodní video `uvod` (celá strategie za minutu, `video/scripts/uvod.ts`), vložené na úvodní stránce
a v `/videa`. Scénář může změnit pořadí scén (`poradi`), např. zdraví má po zpětné vazbě „proč“ před „problémem“.

### Videa mimo git (Vercel Blob)

Videa a zvuk mají přes 100 MB a v repu nemusí být. `scripts/upload-media.mjs` nahraje `public/video` a `public/audio`
do Vercel Blob se zachováním cest; web pak stačí přepnout proměnnou:

```bash
BLOB_READ_WRITE_TOKEN=... npm run media:upload     # vypíše NEXT_PUBLIC_MEDIA_URL=https://....public.blob.vercel-storage.com
```

Postup: ve Vercelu **Storage → Create → Blob** (veřejný), připojit k projektu (vznikne `BLOB_READ_WRITE_TOKEN`), token
použít lokálně pro nahrání, do projektu přidat `NEXT_PUBLIC_MEDIA_URL` z výpisu a znovu nasadit. Pak lze soubory
`public/video/*.mp4` a `*.jpg` smazat z gitu (titulky `.vtt` zůstávají na webu, `<track>` z cizí domény potřebuje CORS).
Bez proměnné se všechno bere z `public/` jako dosud (`media()` v `lib/site.ts`).

### Zvuk

Každé video má namluvený komentář a hudební podkres, titulky zůstávají v obraze (přehrávání potichu).

- Text komentáře je v poli `narration` scénáře (`video/scripts/<slug>.ts`): šest odstavců (hook, problem, proc, navrh,
  dopad, outro), čísla slovy, tykání. Outro je ve všech tématech stejné.
- Namluvení: ElevenLabs, hlas Katty (`7JbZPqJGWUfXXBim0T8U`), model `eleven_v3`, jedna generace na odstavec.
  Soubory `public/audio/<slug>/<scena>.mp3`. Hudba: ElevenLabs Music, `public/audio/music/bed.mp3` (80 s, instrumentální).
- `node scripts/audio-manifest.mjs` změří délky (ffprobe) do `video/audio-manifest.json`; Remotion podle něj nastaví
  délku scén (řeč + dozvuk) a rozloží karty ve scéně podle vět komentáře. Téma bez zvuku v manifestu se vyrenderuje
  jako dřív (délka z délky textu).
- Oprava textu = upravit `narration`, znovu namluvit daný odstavec, přepsat MP3, spustit manifest a render.
- `node scripts/captions.mjs` vygeneruje titulky `public/video/<slug>.vtt` ze stejného časování jako render (věty
  komentáře rozložené v délce řeči). Přehrávač je nabízí jako volitelnou stopu a pod videem je přepis komentáře.

## SEO, GEO a sdílení

- Adresa webu: nastavte `NEXT_PUBLIC_SITE_URL` (např. `https://ceskomanavic.cz`); bez ní se na Vercelu použije produkční
  doména projektu. Z ní se tvoří `metadataBase`, canonical, sitemapa a absolutní odkazy ve strukturovaných datech (`lib/site.ts`).
- `/sitemap.xml` a `/robots.txt` se generují z registru témat (`app/sitemap.ts`, `app/robots.ts`), včetně obrázků a videí.
- Každá stránka má canonical, Open Graph a Twitter karty; témata mají vlastní sdílecí obrázek (`app/[tema]/opengraph-image.tsx`),
  ostatní stránky výchozí (`app/opengraph-image.tsx`).
- Strukturovaná data (schema.org, `lib/seo.ts`): WebSite + Organization na všech stránkách, na tématech Article (autor = garant),
  BreadcrumbList a VideoObject s přepisem komentáře.
- Pro AI asistenty a generativní vyhledávače (GEO) je `/llms.txt` (`app/llms.txt/route.ts`): shrnutí webu a všech témat s čísly.
- Sdílení: na stránce tématu tlačítka Sdílet (Web Share API na telefonu, jinak Facebook, X, LinkedIn, Bluesky, kopírování odkazu).
- Sítě členů PEER: `data/tym.json` (jen ověřené odkazy z lide.pirati.cz, pirati.cz nebo osobních webů; jinak `null`),
  zobrazuje se na `/jak-vznikl` a na kartě garanta tématu.
- Pro sdílení (`/pro-sdileni`, `data/sdileni.json`): hotové příspěvky pro Facebook, X, Instagram a LinkedIn ke každému
  tématu, s odkazy na reel, široké video a náhled; strojově `/pro-sdileni/balicek.json`.
- Pro média (`/pro-media`, `data/media.json`): shrnutí na jednu stranu, 14 čísel se zdroji, citace garantů, tým, loga
  a ověřené kontakty (tisková mluvčí z pirati.cz/kontakt); textová verze `/pro-media/souhrn.txt`.
- English (`/en`, `data/en.json`): jednostránkové shrnutí přeložené DeepL a ručně upravené; odkazy vedou na české stránky.

## Další stránky

- `/kolik-ti-to-prinese` (`lib/kviz.ts`, `components/Kviz.tsx`): pět otázek o životní situaci, výsledek jen z čísel studie,
  odpovědi v hashi adresy (neodcházejí na server), obrázek výsledku ke stažení.
- `/otazky` (`data/otazky.json`): otázky a námitky, odpovědi jen ze studie, s přiznanými mezerami a odkazem na téma;
  strukturovaná data FAQPage.
- `/moje-obec` (`data/kraje.json`, `components/MapaKraju.tsx`): mapa krajů; studie čísla po krajích skoro nemá, proto jsou
  to aktuální data veřejných zdrojů (exekuce, nezaměstnanost, mzdy, HDP) a stránka to říká.
- „Našel jsi chybu?“ (`components/NahlasitChybu.tsx`): předvyplněný e-mail a nové issue na GitHubu, u garanta tématu,
  na `/jak-vznikl` a v patičce.

## Jak přidat další téma

1. Vytěžit čísla kapitoly do `data/<tema>.json` (stejná struktura jako `bydleni.json`).
2. Převést plné znění do `content/<tema>-plne-zneni.ts`.
3. Založit `app/<tema>/page.tsx` podle `app/bydleni/page.tsx`: háček → příběh → proč → co navrhujeme → co to přinese a co to stojí → spočítej si → kdo za tím stojí → plné znění → slovník.
4. Zaregistrovat téma v `topics/index.ts` (karta na úvodní stránce se zapne sama) a scénář videa v `video/scripts/index.ts`.

Barvy a písma jsou podle [styleguide.pirati.cz](https://styleguide.pirati.cz/) (tokeny v `app/globals.css`).
