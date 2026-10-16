import Link from "next/link";
import styles from "./SiteNav.module.css";

export function SiteNav() {
  return (
    <header className={styles.header}>
      <div className={`wrap ${styles.inner}`}>
        <Link href="/" className={styles.brand}>
          <span className={styles.flag} aria-hidden="true" />
          <span className="display">Česko má na víc!</span>
        </Link>
        <nav aria-label="Hlavní navigace" className={styles.nav}>
          <Link href="/bydleni">Bydlení</Link>
          <Link href="/proc-bobr">Proč bobr</Link>
          <Link href="/jak-vznikl">Jak vznikl web</Link>
          <a href="https://peer.pirati.cz/" target="_blank" rel="noreferrer">PEER</a>
        </nav>
      </div>
    </header>
  );
}
