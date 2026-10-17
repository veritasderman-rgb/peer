import Link from "next/link";
import { GarantBubble } from "@/components/GarantBubble";
import { topics } from "@/topics";

/* 404: rada PEER nabídne témata místo prázdné stránky. */
export default function NotFound() {
  return (
    <section className="wrap" style={{ paddingBlock: "3rem 4rem", display: "grid", gap: "1.5rem" }}>
      <p className="eyebrow">Chyba 404</p>
      <h1>Tahle stránka tu není</h1>
      <GarantBubble kdo="rada" mood="surprised" pointing>
        Tudy cesta nevede. Ale témata jsou všechna tady dole, vyber si.
      </GarantBubble>
      <p style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {topics.map((t) => (
          <Link key={t.slug} className="btn secondary" href={`/${t.slug}`}>
            {t.kratkyNazev}
          </Link>
        ))}
      </p>
      <p>
        <Link className="btn" href="/">Na úvodní stránku</Link>
      </p>
    </section>
  );
}
