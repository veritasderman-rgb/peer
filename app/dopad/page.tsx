import type { Metadata } from "next";
import Link from "next/link";
import dopad from "@/data/dopad.json";
import { getTopic } from "@/topics";
import { BigNumber } from "@/components/BigNumber";
import { BobrBubble } from "@/components/BobrBubble";
import { NabehChart } from "@/components/NabehChart";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Velký obraz",
  description: "Co strategie slibuje dohromady: o 1 procentní bod rychlejší růst, bilion korun ročně na konci dekády, 68 000 Kč ročně na pracujícího. A jak se k tomu došlo.",
};

const nf = new Intl.NumberFormat("cs-CZ");

function TopicLink({ slug, children }: { slug: string; children: React.ReactNode }) {
  const t = getTopic(slug);
  return t ? <Link href={`/${slug}`}>{children}</Link> : <span className="muted">{children} (připravujeme)</span>;
}

export default function DopadPage() {
  const s = dopad.souhrn;
  return (
    <article className={styles.page}>
      <section className={`wrap ${styles.hero}`}>
        <div className={styles.heroText}>
          <p className="eyebrow">Velký obraz · závěr strategie</p>
          <h1>Co to přinese dohromady</h1>
          <p className={styles.lede}>
            Strategie má jeden cíl: zrychlit růst české ekonomiky o {s.rustNavicPb} procentní bod ročně. Tady je, co z toho
            plyne, a poctivě i to, jak se k tomu číslu došlo.
          </p>
        </div>
        <BobrBubble mood="thinking" side="left">
          Jeden procentní bod zní jako nic. Za deset let je z toho bilion korun ročně.
        </BobrBubble>
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="cisla">
        <h2 id="cisla">Tři čísla na konci dekády</h2>
        <div className={styles.three}>
          <div className={`card ${styles.big}`}>
            <BigNumber value={s.hdpNavicMldRocneKonecDekady} unit="mld. Kč" label="vyšší výkon ekonomiky každý rok" />
          </div>
          <div className={`card ${styles.big}`}>
            <BigNumber value={s.rozpocetNavicMld} prefix="+" unit="mld. Kč" label="do státního rozpočtu každý rok" />
          </div>
          <div className={`card ${styles.big}`}>
            <BigNumber value={s.naPracujicihoKc} unit="Kč" label="ročně navíc na každého pracujícího (v průměru)" />
          </div>
        </div>
        <p className="src">
          <b>Zdroj:</b> Hospodářská strategie PEER, Souhrnný dopad do HDP a státního rozpočtu (s. 88). Mzdy tvoří {s.podilMezdNaHdp} % HDP; z bilionu navíc je to {nf.format(s.mzdyNavicMld)} mld. Kč v superhrubé hodnotě.
        </p>
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="nabeh">
        <h2 id="nabeh">Jak přínos narůstá rok po roce</h2>
        <p className="prose muted">
          Rychlejší růst se sčítá. První rok přinese navíc 80 miliard, druhý 161, třetí 242, čtvrtý 324 a tak dál, až na bilion ročně na konci dekády.
        </p>
        <NabehChart body={dopad.nabeh} cil={s.hdpNavicMldRocneKonecDekady} />
        <p className="src"><b>Zdroj:</b> {dopad.nabehZdroj}, sekce „Co to přinese?“; konec dekády podle studie s. 88. Mezilehlé roky 5–9 nejsou ve zdrojích vyčíslené, graf je mezi rokem 4 a 10 ilustrativní.</p>
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="jak">
        <h2 id="jak">Jak se k tomu došlo</h2>
        <div className={styles.twoCol}>
          <div className="prose">
            {s.text.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div className={`card ${styles.note}`}>
            <h3>Poctivá poznámka</h3>
            <p>
              Studie říká, že z dílčích odhadů je zvýšení růstu o 1 procentní bod „snadno odvoditelné“, ale samotný součet
              neukazuje. Dílčí přínosy níže jsou v různých jednotkách (ročně, kumulativně, za dekádu) a část opatření vyčíslená není.
              Berte proto bilion jako cíl a řádovou představu, ne jako účetní součet.
            </p>
          </div>
        </div>
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="vycislena">
        <h2 id="vycislena">Opatření s vyčísleným dopadem</h2>
        <ol className={styles.list}>
          {dopad.vycislena.map((v) => (
            <li key={v.cislo} className={`card ${styles.item}`}>
              <span className={`display ${styles.num}`}>{v.cislo}</span>
              <div>
                <h3><TopicLink slug={v.slug}>{v.nazev}</TopicLink> <span className="muted">· kapitola {v.kapitola}</span></h3>
                <p className={styles.key}>{v.klicoveCislo}</p>
                <details><summary>Celý odhad ze studie</summary><p className="muted">{v.dopad}</p></details>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="nevycislena">
        <h2 id="nevycislena">Opatření s velkým, ale nevyčísleným dopadem</h2>
        <ol className={styles.list} start={11}>
          {dopad.nevycislena.map((v) => (
            <li key={v.cislo} className={`card ${styles.item}`}>
              <span className={`display ${styles.num}`}>{v.cislo}</span>
              <div>
                <h3><TopicLink slug={v.slug}>{v.nazev}</TopicLink> <span className="muted">· kapitola {v.kapitola}</span></h3>
                {v.klicoveCislo && <p className={styles.key}>{v.klicoveCislo}</p>}
                <details><summary>Co studie říká</summary><p className="muted">{v.dopad}</p></details>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}
