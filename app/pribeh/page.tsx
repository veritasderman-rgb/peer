import type { Metadata } from "next";
import { pribehData } from "@/data/pribeh";
import { Pribeh } from "./Pribeh";
import styles from "./page.module.css";

const POPIS =
  "Celá Hospodářská strategie 2026–2035 jako příběh na scrollování: 68 000 Kč ročně navíc na pracujícího, proč Česko uvízlo v montovně, tři směry, jak z ní ven, a co to přinese tobě.";

export const metadata: Metadata = {
  title: "Příběh strategie za pět minut",
  description: POPIS,
  alternates: { canonical: "/pribeh" },
  openGraph: { type: "article", title: "Příběh strategie za pět minut", description: POPIS, url: "/pribeh" },
};

/* /pribeh: celá strategie jako scrollytelling v devíti scénách. Data (čísla podle id faktů ze studie)
   skládá data/pribeh.ts na serveru, klientská komponenta Pribeh jen vykresluje a animuje. */
export default function PribehPage() {
  const data = pribehData();
  return (
    <article className={styles.page}>
      <header className={`wrap ${styles.hero}`}>
        <p className="eyebrow">Příběh strategie · 5 minut čtení</p>
        <h1>Příběh strategie za pět minut</h1>
        <p className={styles.lede}>
          Od jednoho čísla k celé Hospodářské strategii 2026–2035. Scrolluj a scény se budou měnit s textem.
        </p>
      </header>
      <Pribeh data={data} />
      <footer className={`wrap ${styles.zdroje}`} id="zdroje">
        <h2 className={styles.zdrojeNadpis}>Zdroje čísel</h2>
        <ul className="src">
          {data.zdroje.map((z) => (
            <li key={z}>{z}</li>
          ))}
        </ul>
        <p className="src">
          Čísla jsou převzatá ze studie a z dat jednotlivých kapitol (data/*.json na webu). Roky 5–9 v grafu náběhu jsou dopočítané mezi rokem 4 a cílem na konci dekády.
        </p>
      </footer>
    </article>
  );
}
