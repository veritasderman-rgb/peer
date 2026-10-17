import { useRef } from "react";
import { track } from "@vercel/analytics";

/* Události pro Vercel Web Analytics. Na serveru a při chybě (blokátor, chybějící skript) nedělají nic. */
export function udalost(nazev: string, data?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  try {
    track(nazev, data);
  } catch {
    /* analytika nesmí rozbít stránku */
  }
}

export const videoPrehrano = (slug: string, format: string) => udalost("video_prehrano", { slug, format });

export const kalkulackaPouzita = (nazev: string) => udalost("kalkulacka_pouzita", { nazev });

/* Hák pro kalkulačky: vrací funkci, která událost pošle nejvýš jednou za připojení komponenty (první změna vstupu). */
export function useKalkulackaPouzita(nazev: string) {
  const odeslano = useRef(false);
  return () => {
    if (odeslano.current) return;
    odeslano.current = true;
    kalkulackaPouzita(nazev);
  };
}

export const kvizDokoncen = (slug: string, skore: number, max: number) => udalost("kviz_dokoncen", { slug, skore, max });

export const chybaNahlasena = (stranka: string) => udalost("chyba_nahlasena", { stranka });

export const sdileno = (kanal: string, stranka: string) => udalost("sdileno", { kanal, stranka });

export const zpetnaVazbaOdeslana = (typ: string, stranka: string) => udalost("zpetna_vazba_odeslana", { typ, stranka });
