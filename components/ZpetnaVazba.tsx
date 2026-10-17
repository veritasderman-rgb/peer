"use client";

import { useId, useState } from "react";
import { zpetnaVazbaOdeslana } from "@/lib/analytics";
import styles from "./ZpetnaVazba.module.css";

/* „Co ti tu chybí?“: krátký textový vzkaz od čtenáře, posílá se na /api/zpetna-vazba.
   Skryté pole `web` je past na boty: člověk ho nevidí, robot ho vyplní. */
export function ZpetnaVazba({ stranka }: { stranka: string }) {
  const id = useId();
  const [text, setText] = useState("");
  const [past, setPast] = useState("");
  const [stav, setStav] = useState<"" | "odesilam" | "ok" | "chyba">("");

  const odeslat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || stav === "odesilam") return;
    setStav("odesilam");
    try {
      const r = await fetch("/api/zpetna-vazba", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ typ: "chybi", stranka, text: text.trim(), web: past }),
      });
      if (!r.ok) throw new Error(String(r.status));
      setStav("ok");
      setText("");
      zpetnaVazbaOdeslana("chybi", stranka);
    } catch {
      setStav("chyba");
    }
  };

  return (
    <form className={styles.root} onSubmit={odeslat} aria-labelledby={`${id}-h`}>
      <h3 id={`${id}-h`} className={styles.nadpis}>Co ti tu chybí?</h3>
      {stav === "ok" ? (
        <p className={styles.dik} role="status">Díky, přečteme si to.</p>
      ) : (
        <>
          <label className={styles.skryte} htmlFor={`${id}-text`}>Co ti tu chybí?</label>
          <textarea
            id={`${id}-text`}
            className={styles.pole}
            rows={3}
            maxLength={2000}
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Chybí ti tu něco? Nerozumíš něčemu? Napiš nám to."
          />
          {/* past na boty: skryté před lidmi i čtečkami, mimo pořadí tabulátoru */}
          <input
            className={styles.past}
            type="text"
            name="web"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={past}
            onChange={(e) => setPast(e.target.value)}
          />
          <div className={styles.radek}>
            <button type="submit" className={`btn secondary ${styles.btn}`} disabled={stav === "odesilam" || !text.trim()}>
              {stav === "odesilam" ? "Posílám…" : "Poslat"}
            </button>
            {stav === "chyba" && (
              <span className={styles.chyba} role="alert">Nepovedlo se odeslat, zkus to znovu.</span>
            )}
          </div>
        </>
      )}
    </form>
  );
}
