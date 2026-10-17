"use client";

import { useEffect, useState } from "react";
import { zpetnaVazbaOdeslana } from "@/lib/analytics";
import styles from "./Hlasovani.module.css";

/* „Pomohla ti tahle odpověď?“: palec nahoru/dolů u odpovědi na /otazky.
   Hlas se pošle na /api/zpetna-vazba a zapamatuje v localStorage (hlas:<id>), aby se tlačítka znovu nenabízela. */
const klic = (id: string) => `hlas:${id}`;

export function Hlasovani({ id, stranka = "/otazky" }: { id: string; stranka?: string }) {
  /* "" = ještě nevíme (před načtením localStorage se nic nezobrazuje, ať to neposkakuje) */
  const [stav, setStav] = useState<"" | "nabidka" | "odesilam" | "hotovo">("");

  useEffect(() => {
    let uz = false;
    try {
      uz = window.localStorage.getItem(klic(id)) !== null;
    } catch {
      /* bez localStorage nabídneme hlasování vždy */
    }
    setStav(uz ? "hotovo" : "nabidka");
  }, [id]);

  const hlasuj = async (hodnota: "ano" | "ne") => {
    if (stav !== "nabidka") return;
    setStav("odesilam");
    try {
      await fetch("/api/zpetna-vazba", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ typ: "hlas", stranka, id, hodnota }),
      });
    } catch {
      /* hlas je jen orientační, chyba sítě nemá návštěvníka zdržovat */
    }
    try {
      window.localStorage.setItem(klic(id), hodnota);
    } catch {
      /* bez localStorage se jen neuloží, že už hlasoval */
    }
    zpetnaVazbaOdeslana("hlas", stranka);
    setStav("hotovo");
  };

  if (stav === "") return <div className={styles.root} aria-hidden="true" />;
  return (
    <div className={styles.root}>
      {stav === "hotovo" ? (
        <p className={styles.dik} role="status">Díky!</p>
      ) : (
        <>
          <span className={styles.otazka} id={`hlas-${id}`}>Pomohla ti tahle odpověď?</span>
          <span className={styles.tlacitka} role="group" aria-labelledby={`hlas-${id}`}>
            <button type="button" className={styles.btn} onClick={() => hlasuj("ano")} disabled={stav === "odesilam"} aria-label="Ano, odpověď mi pomohla">
              <span aria-hidden="true">👍</span> Ano
            </button>
            <button type="button" className={styles.btn} onClick={() => hlasuj("ne")} disabled={stav === "odesilam"} aria-label="Ne, odpověď mi nepomohla">
              <span aria-hidden="true">👎</span> Ne
            </button>
          </span>
        </>
      )}
    </div>
  );
}
