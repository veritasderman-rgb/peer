# Aby web vypadal jako od člověka

Podklad: vizuální identita z Pirátské znalostní báze (`get_brand`, zdroj styleguide.pirati.cz 2.22.0)
a přímé měření komponent ve styleguide (tlačítka, karty, praporky, citace), říjen 2026.

## Co říká styleguide a jak se od něj web lišil

| Prvek | styleguide.pirati.cz 2.22 | Web před úpravou |
|---|---|---|
| Rohy | všude 0 px (tlačítka, karty, chipy) | pilulky (999px) a karty se zaoblením 10–12 px |
| Tlačítko | plný obdélník, Roboto 400, padding 12 × 32 px | pilulka s rámečkem, Roboto Condensed bold |
| Karta | bez rámečku, jemný stín (elevation), odsazení 32 px | 1px šedý rámeček + zaoblení |
| Praporek (flag) | Bebas Neue na plné barvě, pravý okraj do šipky („Volte č. 2“) | nepoužit; místo něj drobný tyrkysový nadtitulek |
| Citace | levá linka 2 px černá, kurzíva | žlutý 4px proužek; stejný proužek i u boxů, které citace nejsou |

Zaoblené karty s tenkým rámečkem, pilulková tlačítka, barevný proužek na levé hraně každého boxu a malý
nadtitulek nad každým nadpisem jsou dnes nejčastější znaky webů „vygenerovaných na jedno zadání“. Pirátský
styleguide je ostřejší a plakátovější, takže stačí se ho držet a web přestane působit šablonovitě.

## Hotovo v tomto kroku (jen vzhled, obsah beze změny)

1. **Ostré rohy všude.** `--radius: 0`, všechny `border-radius: 999px` a drobná zaoblení (2–12 px) na 0;
   kruhy (piktogramy, avatary, `50%`) zůstaly.
2. **Tlačítka podle styleguide.** Obdélník, Roboto 500, širší vodorovné odsazení, při najetí se invertují.
3. **Karty se stínem místo rámečku** (`--shadow` ze styleguide; v tmavém režimu tenký obrys, protože stín na
   tmavé nevidět).
4. **Konec proužků na levé hraně.** Citace mají styleguide linku 2 px černou; informační boxy („A co to stojí“,
   poznámky na /cesta, /dopad, /jak-vznikl, /pro-sdileni) mají barvu nahoře jako lištu, „Pro tebe“
   u opatření je oddělené jen čarou. Proužky, které nesou význam (časová osa: opatření / cíl / dopad,
   postup scrollytellingu), zůstaly.
5. **Úvodní stránka:** nadtitulek nad H1 je teď pirátský praporek; pryč nadtitulky „Za minutu“ a „Nevíš, kde
   začít?“, které jen opakovaly nadpis; čísla témat jsou velká Bebas čísla místo žlutých koleček (každá karta
   měla dvě kolečka vedle sebe).
6. **Velká čísla bez odpočítávání od nuly.** Animace na snímku obrazovky zachytila „13,5 ročních platů“
   místo 15,1. Kdo si stránku vyfotí ve špatnou chvíli, sdílí špatné číslo; navíc je to typický efekt
   šablonových landing pages.

## Hotovo ve druhém kroku

7. **Kratší hlavní menu.** V řadě jen Témata · Příběh · Kolik ti to přinese · Můj kraj · Videa; Velký obraz,
   Cesta do 2035, Jak se to zaplatí, Otázky a námitky, O webu, English a PEER jsou pod rozbalovacím „Více“
   (zavře se klávesou Escape i kliknutím mimo). Na telefonu jsou v menu všechny odkazy pod sebou, v patičce
   zůstávají taky všechny.
8. **Pryč sekce „Tři hloubky“ a věta „Tenhle web ho vysvětluje bez ekonomické hantýrky.“** z úvodní stránky.
9. **Žlutě jen první zvýraznění v odstavci**, další jsou tučně (příběhy v tématech a /pribeh). Text se neměnil,
   rozhoduje to CSS (`b:first-of-type`).
10. **Hlavička vždy černá**, i v tmavém režimu (pevné `#000` / `#fff` místo `--ink` / `--paper`).

## Třetí krok: vzhled podle peer.pirati.cz

Web PEER (peer.pirati.cz, stejný styleguide, změřeno v prohlížeči) je přímý „sourozenec“ tohohle webu,
takže se mu vzhled přiblížil:

- **Černé pásy přes celou šířku** (úvod webu, úvod každého tématu, „Co to přinese“, patička) a mezi nimi bílý
  papír. Uvnitř pásu se tokeny přepnou na tmavou sadu (`.band-dark`), komponenty nepotřebují vlastní pravidla.
- **Obří titulek s přechodem fialová → žlutá** (`#cf7bcc` → `#fdc801`, `.gradient`) jako „Pirátská expertní
  ekonomická rada“ na peer.pirati.cz; stejný přechod mají čísla v „Co to přinese“ a název webu v hlavičce.
- **Fialová z loga PEER jako akcent** místo tyrkysové: odkazy, nadtitulky, sloupce grafů (fialová + žlutá jako
  obálka strategie). Na bílé tmavší `#783777`, v tmavém režimu `#d68fd3`; obě drží kontrast 4,5:1 i na
  ztlumených kartách (axe).
- **Tlačítka jako na PEER:** pilulky, Roboto Condensed tučně, verzálky; stejně tak výběrové „chipy“.
  Karty a grafy zůstávají hranaté.
- **Typografie:** text 18/28 px (PEER), nadpisy sekcí Bebas 48 px, úvodní text v Roboto Condensed.
- **Plochy bez stínů:** karty jsou bílé na bílém papíru, odliší je tenký světle šedý obrys (`--line`).

## Bez tmavé varianty

Web je vždy světlý. Tmavá varianta (podle nastavení systému) je zrušená a `color-scheme: only light`
vypíná i automatické ztmavování v Chrome. Zmínky o tmavém režimu výš popisují stav před touto změnou.
Doplňky prohlížeče typu Dark Reader si stránku ztmaví dál po svém; to web neovlivní.

## Proti dojmu „AI slop“

Po zpětné vazbě, že web působí jako „AI slop“:

- **Nezlomitelné mezery** (`scripts/nbsp.mjs`, běží v `prebuild`, ručně `npm run typo`): za jednopísmennými
  předložkami a spojkami, mezi číslem a jednotkou, v tisícových řádech a za zkratkami před číslem. Mění jen texty
  (řetězce, JSX text, hodnoty v `data/*.json`), ne kód ani SVG. Hledání a kvíz berou nezlomitelnou mezeru jako
  obyčejnou.
- **Příběhy bez vymyšlených postav:** Petra, Martin, Jana a další jsou pryč. Příběhy témat vyprávějí věcně
  a ve 2. osobě, čísla a zdroje zůstaly. Ve scénářích videí postavy nebyly.
- **Skutečná fotka rady** z peer.pirati.cz na úvodní stránce a na /kdo-je-kdo.
- **Užší web:** Cesta do 2035 a Jak se to zaplatí jsou sekce stránky Velký obraz (`/dopad#osa`,
  `/dopad#zaplaceni`), staré adresy přesměrovávají. Argumentář, Pro média a Pro sdílení jsou pod stránkou
  /podklady (odkaz jen v patičce), mimo sitemapu, hledání i vyhledávače (`noindex`).

## Návrh dalších kroků (potřebuje rozhodnutí lidí)

### Vzhled

- **Skutečné fotky garantů místo monogramů.** Kroužek s „LD“ je nejviditelnější znak, že za webem nejsou lidé.
  Fotka (i z telefonu, jednotný ořez a černobílý filtr) udělá víc než jakákoli jiná úprava. Potřeba souhlas
  garantů a fotky; komponenta `GarantSvg` se dá doplnit o `<img>` s monogramem jako zálohou.
- **Nadtitulky (`.eyebrow`) jen tam, kde nesou informaci.** Na webu jich je přes 30; nad většinou H2 jen opakují
  nadpis. Ponechat u stránek témat („Téma 1 · Pilíř…“), jinde zrušit.
- **Méně identických mřížek tří karet.** Témata, příčiny i opatření jsou všechno stejná mřížka.
  U opatření by fungoval číslovaný seznam v jednom sloupci (jako „Program point list“ ve styleguide).
- **Fotky místo prázdných ploch.** Styleguide počítá s fotkou v hero (organisms/hero). Jedna reálná fotka
  na téma (sídliště, školka, fabrika) z vlastního nebo volně licencovaného zdroje, ne generovaná.

### Text

- **Hlas garantů nechat napsat garanty.** Věty jako „Pojď, ukážu ti, proč to tak je“ jsou u všech stejně
  stavěné. Stačí každému garantovi poslat jeho 3–4 bubliny k přepsání vlastními slovy.
- **Upozornění v patičce „Web postavila AI pod lidským vedením“ ponechat.** Je to poctivé a do budoucna
  chrání před výtkou, že se něco tajilo. Lidský dojem má vzniknout z obsahu a fotek, ne ze zamlčení.

## Zdroje

- Pirátská znalostní báze, `get_brand` → https://styleguide.pirati.cz/2.22.0/ (barvy, písma, loga, pravidla)
- styleguide.pirati.cz 2.22.0, patterns: atoms/buttons, atoms/cards, atoms/flags, atoms/quotations,
  molecules/chips, organisms/hero (změřeno v prohlížeči: `border-radius: 0`, `.btn__body` padding 12px 32px,
  `.card` box-shadow, `.card__body` padding 32px, citace `border-left: 2px solid #000; font-style: italic`)
- loga ke stažení: https://www.pirati.cz/download/
