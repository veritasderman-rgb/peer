"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SiteNav.module.css";

const polozky = [
  { href: "/#temata", label: "Témata" },
  { href: "/videa", label: "Videa" },
  { href: "/dopad", label: "Velký obraz" },
  { href: "/cesta", label: "Cesta do 2035" },
  { href: "/zaplaceni", label: "Jak se to zaplatí" },
  { href: "/kolik-ti-to-prinese", label: "Kolik ti to přinese" },
  { href: "/moje-obec", label: "Můj kraj" },
  { href: "/otazky", label: "Otázky a námitky" },
  { href: "/jak-vznikl", label: "O webu" },
  { href: "/en", label: "English" },
];

/* Hlavička: na počítači všechny odkazy v řadě, na telefonu tlačítko Menu a seznam pod ním.
   Menu se zavře po přechodu na jinou stránku. */
export function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);
  return (
    <header className={styles.header}>
      <div className={`wrap ${styles.inner}`}>
        <Link href="/" className={styles.brand}>
          <span className={styles.flag} aria-hidden="true" />
          <span className="display">Česko má na víc!</span>
        </Link>
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="hlavni-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className={styles.burger} aria-hidden="true" />
          {open ? "Zavřít" : "Menu"}
        </button>
        <nav id="hlavni-menu" aria-label="Hlavní navigace" className={`${styles.nav} ${open ? styles.navOpen : ""}`}>
          {polozky.map((p) => {
            const aktivni = p.href !== "/#temata" && pathname.startsWith(p.href);
            return (
              <Link key={p.href} href={p.href} aria-current={aktivni ? "page" : undefined}>
                {p.label}
              </Link>
            );
          })}
          <a href="https://peer.pirati.cz/" target="_blank" rel="noreferrer">
            PEER
          </a>
        </nav>
      </div>
    </header>
  );
}
