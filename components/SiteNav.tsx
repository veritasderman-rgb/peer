"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SiteNav.module.css";
import { HledaniBox } from "@/components/HledaniBox";

/* Hlavní menu jen s tím, kam míří většina lidí; zbytek je pod „Více“ a celý v patičce. */
const polozky = [
  { href: "/#temata", label: "Témata" },
  { href: "/pribeh", label: "Příběh" },
  { href: "/kolik-ti-to-prinese", label: "Kolik ti to přinese" },
  { href: "/moje-obec", label: "Můj kraj" },
  { href: "/videa", label: "Videa" },
];
const dalsi = [
  { href: "/dopad", label: "Velký obraz" },
  { href: "/cesta", label: "Cesta do 2035" },
  { href: "/zaplaceni", label: "Jak se to zaplatí" },
  { href: "/otazky", label: "Otázky a námitky" },
  { href: "/jak-vznikl", label: "O webu" },
  { href: "/en", label: "English" },
];

const jeAktivni = (pathname: string, href: string) => href !== "/#temata" && pathname.startsWith(href);

/* Hlavička: na počítači pět odkazů v řadě a rozbalovací „Více“, na telefonu tlačítko Menu
   a pod ním všechny odkazy včetně těch z „Více“. Obě nabídky se zavřou po přechodu na jinou stránku,
   „Více“ i klávesou Escape nebo kliknutím mimo. */
export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [vice, setVice] = useState(false);
  const viceRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    setOpen(false);
    setVice(false);
  }, [pathname]);
  useEffect(() => {
    if (!vice) return;
    const mimo = (e: PointerEvent) => {
      if (!viceRef.current?.contains(e.target as Node)) setVice(false);
    };
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setVice(false);
    };
    document.addEventListener("pointerdown", mimo);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", mimo);
      document.removeEventListener("keydown", esc);
    };
  }, [vice]);
  const viceAktivni = dalsi.some((p) => jeAktivni(pathname, p.href));
  return (
    <header className={styles.header}>
      <div className={`wrap ${styles.inner}`}>
        <Link href="/" className={styles.brand}>
          <span className={styles.flag} aria-hidden="true" />
          <span className="display gradient">Česko má na víc!</span>
        </Link>
        <HledaniBox kompaktni className={styles.hledaniDesktop} />
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
          {polozky.map((p) => (
            <Link key={p.href} href={p.href} aria-current={jeAktivni(pathname, p.href) ? "page" : undefined}>
              {p.label}
            </Link>
          ))}
          <div ref={viceRef} className={styles.vice}>
            <button
              type="button"
              className={styles.viceTlacitko}
              aria-expanded={vice}
              aria-controls="menu-vice"
              data-aktivni={viceAktivni || undefined}
              onClick={() => setVice((v) => !v)}
            >
              Více
              <span className={styles.sipka} aria-hidden="true" />
            </button>
            <div id="menu-vice" className={styles.viceMenu} data-open={vice || undefined}>
              {dalsi.map((p) => (
                <Link key={p.href} href={p.href} aria-current={jeAktivni(pathname, p.href) ? "page" : undefined}>
                  {p.label}
                </Link>
              ))}
              <a href="https://peer.pirati.cz/" target="_blank" rel="noreferrer">
                PEER
              </a>
            </div>
          </div>
          <HledaniBox className={styles.hledaniMobil} />
        </nav>
      </div>
    </header>
  );
}
