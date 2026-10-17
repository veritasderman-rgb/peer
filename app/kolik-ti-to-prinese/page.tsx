import type { Metadata } from "next";
import Link from "next/link";
import bydleni from "@/data/bydleni.json";
import energie from "@/data/energie.json";
import euro from "@/data/euro.json";
import exekuce from "@/data/exekuce.json";
import prace from "@/data/prace.json";
import zeny from "@/data/zeny.json";
import regiony from "@/data/regiony.json";
import vzdelanost from "@/data/vzdelanost.json";
import dopad from "@/data/dopad.json";
import zaplaceni from "@/data/zaplaceni.json";
import { getTopic } from "@/topics";
import { abs } from "@/lib/site";
import { sestavData } from "@/lib/kviz";
import { GarantBubble } from "@/components/GarantBubble";
import { Kviz } from "@/components/Kviz";
import styles from "./page.module.css";

const CESTA = "/kolik-ti-to-prinese";

export const metadata: Metadata = {
  title: "Kolik ti strategie přinese?",
  description:
    "Pět rychlých otázek o tvé situaci a poctivý odhad podle Hospodářské strategie PEER: co by ti mohla přinést, co tě bude stát a odkud každé číslo je. Se sdílecím obrázkem.",
  alternates: { canonical: CESTA },
};

/* Kvíz běží v prohlížeči, ale čísla vybírá server: sestavData() vezme z JSONů jen to, co kvíz potřebuje,
   a do klienta jde malý objekt místo celých datových souborů. */
const data = sestavData({ bydleni, energie, euro, exekuce, prace, zeny, regiony, vzdelanost, dopad, zaplaceni });

const SLUGY = ["bydleni", "energie", "euro", "exekuce", "prace", "zeny", "regiony", "vzdelanost", "zdravi", "stat", "prumysl"];
const nazvy = Object.fromEntries(SLUGY.map((s) => [s, getTopic(s)?.kratkyNazev ?? s]));

export default function KolikTiToPrinesePage() {
  return (
    <article className={styles.page}>
      <section className={`wrap ${styles.hero}`}>
        <div className={styles.heroText}>
          <p className="eyebrow">Kvíz · odhad podle studie</p>
          <h1>Kolik ti strategie přinese?</h1>
          <p className={`prose ${styles.lede}`}>
            Pět rychlých otázek o tom, jak žiješ. Pak ti ukážeme, co by ti Hospodářská strategie PEER mohla přinést a co
            tě bude stát. Jen z čísel, která studie uvádí, a u každého řádku je zdroj.
          </p>
        </div>
        <GarantBubble kdo="rada" mood="thinking" side="left" size={150}>
          Žádné sliby. Spočítám jen to, co studie opravdu říká, i s tím, co tě to bude stát.
        </GarantBubble>
      </section>

      <section className={`wrap ${styles.section}`} aria-label="Otázky a výsledek">
        <Kviz data={data} url={abs(CESTA)} nazvy={nazvy} />
      </section>

      <section className={`wrap ${styles.section} ${styles.last}`} aria-labelledby="jak-pocitame">
        <h2 id="jak-pocitame" className={styles.h2}>
          Jak počítáme
        </h2>
        <ul className={`prose ${styles.pravidla}`}>
          <li>
            Každé číslo je ze studie (soubory v <code>data/</code>) nebo z něj spočítané stejně jako v kalkulačkách
            jednotlivých témat. U každé karty vidíš kapitolu i přesné pole v datech.
          </li>
          <li>Kde studie dává rozpětí, ukazujeme rozpětí. Kde částku neuvádí, píšeme to.</li>
          <li>
            68&nbsp;000&nbsp;Kč ročně je průměr na pracujícího na konci dekády, ne osobní slib. Studie sama píše, že vývoj
            HDP modelovat nelze. Víc na stránce <Link href="/dopad">Velký obraz</Link>.
          </li>
          <li>
            Celkový účet strategie studie nesčítá. Co kdo zaplatí, najdeš po tématech na stránce{" "}
            <Link href="/zaplaceni">Jak se to zaplatí</Link>.
          </li>
        </ul>
      </section>
    </article>
  );
}
