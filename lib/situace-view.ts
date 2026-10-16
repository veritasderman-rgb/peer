import { situace } from "./situace";
import { getTopic } from "@/topics";
import type { SituaceView } from "@/components/Situace";

/* Složí data pro výběr situace: k číslům opatření z lib/situace.ts dohledá text „pro tebe“
   a háček tématu z registru. Volá se na serveru (app/page.tsx), klient dostane jen texty. */
export function buildSituaceView(): SituaceView[] {
  return situace.map((s) => ({
    id: s.id,
    label: s.label,
    uvod: s.uvod,
    temata: s.temata.flatMap((ref) => {
      const t = getTopic(ref.slug);
      if (!t) return [];
      const polozky = ref.opatreni
        .map((c) => t.opatreni.find((o) => o.cislo === c))
        .filter((o): o is NonNullable<typeof o> => !!o && !!o.proTebe)
        .map((o) => ({ nazev: o.nazev, proTebe: o.proTebe }));
      return polozky.length ? [{ slug: t.slug, kratkyNazev: t.kratkyNazev, hook: t.hook.h1, polozky }] : [];
    }),
  }));
}
