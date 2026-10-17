import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import stavy from "@/data/overeni.json";
import { Overeni } from "@/components/Overeni";
import { GARANTI } from "@/lib/garanti";
import { nactiOvereni, type StavOvereni } from "@/lib/overeni";
import styles from "./page.module.css";

/* Skrytá stránka pro garanty kapitol: body z docs/k-overeni.md, stav z data/overeni.json, formuláře posílají
   na /api/zpetna-vazba (typ "overeni"). Není v navigaci, sitemapě ani llms.txt a má noindex.
   Přístup: když je nastavená proměnná OVERENI_KLIC, pustí se jen ?klic=<hodnota>, jinak 404;
   bez proměnné je stránka otevřená (vývoj) a ukáže varování. */
export const metadata: Metadata = {
  title: "Ověření pro garanty",
  robots: { index: false, follow: false },
};

const zaznamy = stavy as unknown as Record<string, StavOvereni | string>;
const stavZaznamu = (id: string): StavOvereni | undefined => {
  const z = zaznamy[id];
  return z && typeof z === "object" ? z : undefined;
};

const STAV_TEXT = { potvrzeno: "potvrzeno", opraveno: "opraveno", sporne: "sporné" } as const;

function Stitek({ id }: { id: string }) {
  const z = stavZaznamu(id);
  if (!z) return <span className={`${styles.stitek} ${styles.ceka}`}>čeká</span>;
  return (
    <span className={`${styles.stitek} ${styles[z.stav] ?? ""}`}>
      {STAV_TEXT[z.stav] ?? z.stav} {z.kdy} · {z.kdo}
    </span>
  );
}

/* Jednoduchý inline zápis z markdownu: **tučně** a `kód`; kód začínající lomítkem je odkaz na stránku webu. */
function Inline({ text }: { text: string }): ReactNode {
  const casti = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return casti.map((c, i) => {
    if (c.startsWith("**") && c.endsWith("**") && c.length > 4) return <strong key={i}><Inline text={c.slice(2, -2)} /></strong>;
    if (c.startsWith("`") && c.endsWith("`") && c.length > 2) {
      const kod = c.slice(1, -1);
      if (/^\/[a-z0-9\-/]*$/.test(kod)) {
        return (
          <Link key={i} href={kod} className={styles.kod}>
            <code>{kod}</code>
          </Link>
        );
      }
      return <code key={i} className={styles.kod}>{kod}</code>;
    }
    return c;
  });
}

export default async function OvereniPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const klic = process.env.OVERENI_KLIC;
  const zadany = (await searchParams).klic;
  if (klic && zadany !== klic) notFound();

  const sekce = nactiOvereni();
  const pocet = sekce.reduce((n, s) => n + s.polozky.length, 0);
  const jmena = Object.values(GARANTI).map((g) => g.jmeno);

  return (
    <article className={styles.page}>
      <section className={`wrap ${styles.hero}`}>
        <p className="eyebrow">Pro garanty kapitol</p>
        <h1>Ověření před zveřejněním</h1>
        {!klic && (
          <p className={styles.varovani} role="note">
            Stránka není chráněná, nastav OVERENI_KLIC.
          </p>
        )}
        <div className={`prose ${styles.lede}`}>
          <p>
            Web převypráví studii pro laiky. U {pocet} bodů v {sekce.length} sekcích si nejsme jistí, jestli jsme čísla a
            formulace převzali správně. U každého bodu prosím buď potvrď, že je v pořádku, nebo napiš opravu.
          </p>
          <p className="muted">
            Vyber své jméno, klikni na „Potvrzuji“, nebo na „Opravit“ a napiš, jak to má být. Odpověď se uloží a
            editor ji zapracuje. Celou kapitolu najednou potvrdíš tlačítkem pod jejím nadpisem.
          </p>
        </div>
        <nav aria-label="Sekce" className={styles.chips}>
          <ul className={styles.chipList}>
            {sekce.map((s) => (
              <li key={s.id}>
                <a className={styles.chip} href={`#${s.id}`}>
                  {s.nadpis} <span className={styles.chipN}>{s.polozky.length}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {sekce.map((s) => (
        <section key={s.id} id={s.id} className={`wrap ${styles.sekce}`}>
          <header className={styles.hlavicka}>
            <h2>
              {s.nadpis}
              {s.garant && <span className={styles.garant}> · {s.garant}</span>}
            </h2>
            <Stitek id={s.id} />
          </header>
          {s.uvod.map((u, i) => (
            <p key={i} className={`muted ${styles.uvod}`}>
              <Inline text={u} />
            </p>
          ))}
          <ul className={styles.polozky}>
            {s.polozky.map((p) => (
              <li key={p.id} className={`card ${styles.polozka}`}>
                <div className={styles.text}>
                  <p>
                    <Inline text={p.text} />
                  </p>
                  <div className={styles.meta}>
                    <Stitek id={p.id} />
                    <code className={styles.id}>{p.id}</code>
                  </div>
                  {stavZaznamu(p.id)?.poznamka && <p className={styles.poznamka}>{stavZaznamu(p.id)?.poznamka}</p>}
                </div>
                <Overeni id={p.id} jmena={jmena} garant={s.garant} />
              </li>
            ))}
          </ul>
          <div className={styles.kapitola}>
            <Overeni id={s.id} jmena={jmena} garant={s.garant} kapitola />
          </div>
        </section>
      ))}
    </article>
  );
}
