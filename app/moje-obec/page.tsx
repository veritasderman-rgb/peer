import type { Metadata } from "next";
import Link from "next/link";
import data from "@/data/kraje.json";
import { GarantBubble } from "@/components/GarantBubble";
import { MapaKraju, type Kraj, type Metrika } from "@/components/MapaKraju";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Jak je na tom můj kraj",
  description:
    "Podíl lidí v exekuci, nezaměstnanost, mzdy a HDP po krajích na jednoduché mapě. Vyber svůj kraj, porovnej ho s průměrem ČR a uvidíš, co s tím chce udělat strategie.",
  alternates: { canonical: "/moje-obec" },
};

/* Kartogram krajů z data/kraje.json. Studie má čísla po krajích jen v obrázcích, proto jsou čísla z veřejných zdrojů
   a u každé metriky je řečeno, odkud jsou (zeStudie, zdroj). */
export default function MojeObecPage() {
  const kraje = data.kraje as Kraj[];
  const metriky = data.metriky as Metrika[];
  const temata = Array.from(new Map(metriky.map((m) => [m.tema, m.temaNazev])).entries());

  return (
    <article className={styles.page}>
      <section className={`wrap ${styles.hero}`}>
        <div className={styles.heroText}>
          <p className="eyebrow">Po krajích</p>
          <h1>Jak je na tom můj kraj</h1>
          <p className={styles.lede}>
            Strategie mluví o celé zemi, ale bydlí se v konkrétním kraji. Tady jsou čísla pro každý ze čtrnácti krajů:
            exekuce, nezaměstnanost, mzdy a HDP. Vyber svůj a porovnej ho s průměrem ČR.
          </p>
        </div>
        <GarantBubble kdo="rada" mood="thinking" side="left">
          Kolik lidí v tvém kraji čelí exekuci a kolik si vydělají? Klepni na dlaždici, ať to vidíš.
        </GarantBubble>
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="mapa">
        <h2 id="mapa">Mapa krajů</h2>
        <p className="prose muted">
          Každý kraj je jedna dlaždice, zhruba tam, kde na mapě leží. Není to přesná zeměpisná mapa, takže Praha je na ní stejně
          velká jako Jihočeský kraj. Barva ukazuje hodnotu, čím tmavší, tím vyšší číslo.
        </p>
        <MapaKraju kraje={kraje} metriky={metriky} />
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="zdroje">
        <h2 id="zdroje">Odkud jsou čísla</h2>
        <div className={styles.twoCol}>
          <div className="prose">
            <p>
              Studie má po krajích jen málo: u exekucí ukazuje mapu bez čísel (jen průměr ČR 6,4 %, s. 31) a u HDP graf bez
              hodnot (s. 77). Textem jmenuje jen Karlovarský, Ústecký a Liberecký kraj jako kraje s nejvíc lidmi v exekuci a Ústecký a Karlovarský kraj jako ty, které ekonomicky zaostávají. Praha a Jihomoravský kraj podle ní patří
              k hlavním motorům růstu.
            </p>
            <p>
              Proto jsou všechna čísla na této stránce <b>aktuální data zdroje, ne ze studie</b>. Vzali jsme je z veřejných zdrojů
              (u exekucí a HDP stejných, jaké cituje studie) a u každé metriky je uvedené, odkud a k jakému datu. Jsou to
              data za všech čtrnáct krajů, nic není dopočítané ani odhadnuté.
            </p>
          </div>
          <ul className={`card ${styles.zdroje}`}>
            {metriky.map((m) => (
              <li key={m.id}>
                <h3>{m.nazev}</h3>
                <p>
                  <span className={`${styles.stitek} ${m.zeStudie ? styles.stitekStudie : styles.stitekZdroj}`}>
                    {m.zeStudie ? "ze studie" : "aktuální data zdroje, ne ze studie"}
                  </span>
                </p>
                <p>
                  <a href={m.zdrojUrl} rel="noopener noreferrer">
                    {m.zdrojNazev}
                  </a>
                  <span className="muted">, {m.zdroj.slice(m.zdroj.indexOf(", ") + 2)}</span>
                </p>
                <p className="muted">{m.poznamka}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`wrap ${styles.section} ${styles.last}`} aria-labelledby="temata">
        <h2 id="temata">Co s tím strategie dělá</h2>
        <p className="prose">
          Čísla nejsou verdikt, jen výchozí bod. Každé téma, ke kterému se tu čísla vážou, má vlastní stránku s opatřeními a cíli.
        </p>
        <ul className={styles.links}>
          {temata.map(([slug, nazev]) => (
            <li key={slug}>
              <Link href={`/${slug}`} className={`card ${styles.link}`}>
                <span className="display">{nazev}</span>
                <span className="muted">Opatření, cíle a čísla ze studie →</span>
              </Link>
            </li>
          ))}
          <li>
            <Link href="/cesta" className={`card ${styles.link}`}>
              <span className="display">Cesta do 2035</span>
              <span className="muted">Kdy se co má stát →</span>
            </Link>
          </li>
        </ul>
      </section>
    </article>
  );
}
