import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Podklady pro členy a novináře",
  description: "Argumentář pro kandidáty a mluvčí, podklady pro média a hotové texty a obrázky pro sociální sítě.",
  alternates: { canonical: "/podklady" },
  robots: { index: false, follow: true },
};

const PODKLADY = [
  {
    href: "/argumentar",
    nazev: "Argumentář pro kandidáty a mluvčí",
    popis: "Delší odpovědi na otázky a námitky, s čísly a zdroji. Ke stažení i jako PDF.",
  },
  {
    href: "/pro-media",
    nazev: "Pro média",
    popis: "Shrnutí strategie, čtrnáct hlavních čísel, kontakty a loga.",
  },
  {
    href: "/pro-sdileni",
    nazev: "Pro sdílení",
    popis: "Hotové texty, obrázky a videa pro sociální sítě.",
  },
];

/* Rozcestník pro lidi, kteří o strategii mluví nebo píšou. Veřejný web na tyto stránky nevede,
   do vyhledávačů nejdou (noindex); odkaz je jen v patičce. */
export default function PodkladyPage() {
  return (
    <article className={`wrap ${styles.page}`}>
      <h1>Podklady</h1>
      <p className={styles.lede}>Pro členy, kandidáty a novináře, kteří o strategii mluví nebo píšou.</p>
      <ul className={styles.seznam}>
        {PODKLADY.map((p) => (
          <li key={p.href}>
            <Link href={p.href} className={`card ${styles.karta}`}>
              <h2 className={styles.nazev}>{p.nazev}</h2>
              <p>{p.popis}</p>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
