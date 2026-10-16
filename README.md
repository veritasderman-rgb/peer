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

## Jak přidat další téma

1. Vytěžit čísla kapitoly do `data/<tema>.json` (stejná struktura jako `bydleni.json`).
2. Převést plné znění do `content/<tema>-plne-zneni.ts`.
3. Založit `app/<tema>/page.tsx` podle `app/bydleni/page.tsx`: háček → příběh → proč → co navrhujeme → co to přinese a co to stojí → spočítej si → kdo za tím stojí → plné znění → slovník.
4. Zaregistrovat téma v `topics/index.ts` (karta na úvodní stránce se zapne sama) a scénář videa v `video/scripts/index.ts`.

Barvy a písma jsou podle [styleguide.pirati.cz](https://styleguide.pirati.cz/) (tokeny v `app/globals.css`).
