import Link from "next/link";
import osa from "@/data/osa.json";
import { CasovaOsa, type Milnik } from "@/components/CasovaOsa";
import styles from "./page.module.css";

/* Časová osa milníků (data/osa.json) jako sekce stránky Velký obraz (/dopad). Dřív samostatná stránka /cesta,
   ta teď přesměrovává sem (next.config.ts). Náběh přínosu je na /dopad jen jednou. */
export function CestaSekce() {
  const milniky = osa.milniky as Milnik[];
  const celkovy = osa.celkovyDopad as Milnik[];
  const pocetTemat = new Set(milniky.map((m) => m.slug)).size;
  return (
    <>
      <section className={`wrap ${styles.section}`} aria-labelledby="osa">
        <h2 id="osa">Co se stane kdy</h2>
        <p className="prose muted">
          Strategie je na deset let. Na ose je {milniky.length} datovaných milníků z {pocetTemat} témat. U všeho je zdroj,
          u odvozených roků je to napsané.
        </p>
        <p className={styles.legenda}>
          <span className={`${styles.leg} ${styles.legOpatreni}`}>Opatření</span>
          <span className={`${styles.leg} ${styles.legCil}`}>Cíl</span>
          <span className={`${styles.leg} ${styles.legDopad}`}>Dopad</span>
        </p>
        <CasovaOsa milniky={milniky} celkovyDopad={celkovy} />
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="bez-terminu">
        <h2 id="bez-terminu">Co na ose není</h2>
        <div className={styles.twoCol}>
          <div className="prose">
            <p>
              Část strategie termín nemá, takže ji na osu nedáváme. <Link href="/euro">Euro</Link> má jen pořadí kroků (nejdřív
              shoda, pak dva roky v „předsíni“ ERM II), ne rok vstupu. <Link href="/stat">Stát jako lídr</Link> chce 1 400 služeb
              digitalizovat „včas“, bez data. <Link href="/bydleni">Bydlení</Link> a <Link href="/kapital">spící kapitál</Link>
              mluví o „dlouhodobě“ a „průběžně“. A dopady vzdělávacích reforem (+50 až 100 mld. Kč ročně) přijdou za 15 až 20 let,
              tedy až po roce 2040.
            </p>
            <p>
              Pokud se vám zdá, že nějaký termín chybí, je to spíš tím, že ho studie neuvádí, než že bychom ho vynechali. Ke každému
              milníku je zdroj, aby šel dohledat.
            </p>
          </div>
          <div className={`card ${styles.note}`}>
            <h3>Jak jsme roky určili</h3>
            <p>{osa.poznamka}</p>
          </div>
        </div>
      </section>
    </>
  );
}
