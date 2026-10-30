import Link from "next/link";
import { topics } from "@/topics";
import { NahlasitChybu } from "@/components/NahlasitChybu";
import styles from "./SiteFooter.module.css";

/* Patička = mapa webu: témata, přehledy, o webu, zdroje. Modelové postavy a autorství v jedné větě. */
export function SiteFooter() {
  return (
    <footer className={`band-dark ${styles.footer}`}>
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.col}>
          <h2 className={styles.h}>Témata</h2>
          <ol className={styles.temata}>
            {topics.map((t) => (
              <li key={t.slug}>
                <Link href={`/${t.slug}`}>{t.kratkyNazev}</Link>
              </li>
            ))}
          </ol>
        </div>
        <div className={styles.col}>
          <h2 className={styles.h}>Přehledy</h2>
          <ul className={styles.list}>
            <li><Link href="/pribeh">Příběh strategie</Link></li>
            <li><Link href="/dopad">Velký obraz</Link></li>
            <li><Link href="/cesta">Cesta do 2035</Link></li>
            <li><Link href="/zaplaceni">Jak se to zaplatí</Link></li>
            <li><Link href="/videa">Videa Strategie za minutu</Link></li>
            <li><Link href="/kolik-ti-to-prinese">Kolik ti to přinese</Link></li>
            <li><Link href="/moje-obec">Můj kraj v číslech</Link></li>
            <li><Link href="/otazky">Otázky a námitky</Link></li>
          </ul>
          <h2 className={styles.h}>O webu</h2>
          <ul className={styles.list}>
            <li><Link href="/hledat">Hledat na webu</Link></li>
            <li><Link href="/argumentar">Argumentář pro kandidáty</Link></li>
            <li><Link href="/kdo-je-kdo">Kdo je kdo</Link></li>
            <li><Link href="/jak-vznikl">Jak vznikl web a kdo napsal strategii</Link></li>
            <li><Link href="/pro-sdileni">Pro sdílení: texty a obrázky</Link></li>
            <li><Link href="/pro-media">Pro média</Link></li>
            <li><Link href="/en" lang="en">In English</Link></li>
          </ul>
        </div>
        <div className={styles.col}>
          <h2 className={styles.h}>Zdroj</h2>
          <ul className={styles.list}>
            <li><a href="https://peer.pirati.cz/hospodarska-strategie/" target="_blank" rel="noreferrer">Strategie na peer.pirati.cz</a></li>
            <li><a href="https://majak.pirati.cz/documents/647/Piratska_Hospodarska_strategie.pdf" target="_blank" rel="noreferrer">Celé PDF (99 stran)</a></li>
            <li><a href="https://www.pirati.cz/" target="_blank" rel="noreferrer">Česká pirátská strana</a></li>
          </ul>
          <p className={styles.note}>
            Hospodářskou strategii 2026–2035 zpracovala Pirátská expertní ekonomická rada (PEER) ve spolupráci s Institutem π
            a dalšími odborníky. Web ji převypráví pro běžné lidi; každé číslo má pod sebou zdroj. Web postavila AI pod lidským vedením.
          </p>
          <p className={styles.note}>Našel jsi chybu? Napiš nám, opravíme ji.</p>
          <NahlasitChybu kde="Patička webu" kompaktni />
        </div>
      </div>
    </footer>
  );
}
