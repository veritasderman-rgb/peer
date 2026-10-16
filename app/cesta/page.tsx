import type { Metadata } from "next";
import Link from "next/link";
import osa from "@/data/osa.json";
import dopad from "@/data/dopad.json";
import { BobrBubble } from "@/components/BobrBubble";
import { CasovaOsa, type Milnik } from "@/components/CasovaOsa";
import { NabehChart } from "@/components/NabehChart";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Cesta do 2035",
  description: "Co se podle strategie stane kdy: datované milníky všech čtrnácti témat na jedné ose od roku 2026 do roku 2035 a za něj, s náběhem přínosu rok po roce.",
};

/* Časová osa: milníky s rokem ve studii (data/osa.json), nad nimi náběh přínosu celé strategie. */
export default function CestaPage() {
  const milniky = osa.milniky as Milnik[];
  const celkovy = osa.celkovyDopad as Milnik[];
  const s = dopad.souhrn;
  const prvniRok = 2026;
  const pocetTemat = new Set(milniky.map((m) => m.slug)).size;
  return (
    <article className={styles.page}>
      <section className={`wrap ${styles.hero}`}>
        <div className={styles.heroText}>
          <p className="eyebrow">Časová osa · 2026–2035</p>
          <h1>Cesta do 2035</h1>
          <p className={styles.lede}>
            Strategie je na deset let. Tady je, co se má stát kdy: {milniky.length} datovaných milníků z {pocetTemat} témat
            a k tomu přínos celé strategie, jak narůstá rok po roce. U všeho je zdroj, u odvozených roků je to napsané.
          </p>
          <p className={styles.legenda}>
            <span className={`${styles.leg} ${styles.legOpatreni}`}>Opatření</span>
            <span className={`${styles.leg} ${styles.legCil}`}>Cíl</span>
            <span className={`${styles.leg} ${styles.legDopad}`}>Dopad</span>
          </p>
        </div>
        <BobrBubble mood="thinking" side="left">
          Deset let je dlouho, ale první věci se dají poznat už za dva roky. Koukej na rok 2028.
        </BobrBubble>
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="nabeh">
        <h2 id="nabeh">Přínos rok po roce</h2>
        <p className="prose muted">
          Rychlejší růst se sčítá: {dopad.nabeh.map((b) => `${b.mld}`).join(", ")} miliard navíc v prvních čtyřech letech, až
          po {s.hdpNavicMldRocneKonecDekady} miliard ročně na konci dekády. Rok 1 bereme jako {prvniRok}.
        </p>
        <NabehChart body={dopad.nabeh} cil={s.hdpNavicMldRocneKonecDekady} startYear={prvniRok} />
        <p className="src">
          <b>Zdroj:</b> {dopad.nabehZdroj}; konec dekády podle studie s. 88. Roky 5–9 nejsou vyčíslené, graf je mezi nimi ilustrativní.
        </p>
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="osa">
        <h2 id="osa">Co se stane kdy</h2>
        <CasovaOsa milniky={milniky} celkovyDopad={celkovy} />
      </section>

      <section className={`wrap ${styles.section} ${styles.last}`} aria-labelledby="bez-terminu">
        <h2 id="bez-terminu">Co na ose není</h2>
        <div className={styles.twoCol}>
          <div className="prose">
            <p>
              Část strategie termín nemá, takže ji na osu nedáváme. <Link href="/euro">Euro</Link> má jen pořadí kroků (nejdřív
              shoda, pak dva roky v „předsíni“ ERM II), ne rok vstupu. <Link href="/stat">Stát jako lídr</Link> chce 1 400 služeb
              digitalizovat „včas“, bez data. <Link href="/bydleni">Bydlení</Link> a <Link href="/kapital">spící kapitál</Link>
              mluví o „dlouhodobě“ a „průběžně“. A dopady vzdělávacích reforem (+50 až 100 mld. Kč ročně) přijdou za 15 až 20 let,
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
    </article>
  );
}
