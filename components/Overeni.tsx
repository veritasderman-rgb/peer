"use client";

import { useEffect, useState } from "react";
import styles from "./Overeni.module.css";

/* Formulář u bodu na skryté stránce /overeni: garant potvrdí, nebo opraví. Posílá POST /api/zpetna-vazba
   { typ: "overeni", stranka: "/overeni", id, hodnota: "potvrzeno" | "opraveno", text: "<jméno>: <poznámka>" }.
   Po úspěchu si prohlížeč v localStorage (overeni:<id>) pamatuje, že bod už odeslal; jméno se pamatuje v overeni:kdo. */

const KLIC_KDO = "overeni:kdo";
const klic = (id: string) => `overeni:${id}`;
const JINY = "jiný";

type Odeslano = { hodnota: "potvrzeno" | "opraveno"; kdo: string };
type Stav = "" | "nabidka" | "oprava" | "odesilam" | "hotovo";

function cti(k: string): string | null {
  try {
    return window.localStorage.getItem(k);
  } catch {
    return null;
  }
}
function pis(k: string, v: string) {
  try {
    window.localStorage.setItem(k, v);
  } catch {
    /* bez localStorage se jen nezapamatuje */
  }
}
function smaz(k: string) {
  try {
    window.localStorage.removeItem(k);
  } catch {
    /* nic */
  }
}

export function Overeni({
  id,
  jmena,
  garant,
  kapitola = false,
}: {
  /** id bodu, u tlačítka celé kapitoly id sekce */
  id: string;
  /** jména ze seznamu garantů; „jiný“ se přidává tady */
  jmena: string[];
  /** předvybrané jméno (garant kapitoly) */
  garant?: string;
  /** true = jen tlačítko „Potvrdit celou kapitolu“ */
  kapitola?: boolean;
}) {
  const [stav, setStav] = useState<Stav>("");
  const [kdo, setKdo] = useState(garant ?? "");
  const [poznamka, setPoznamka] = useState("");
  const [chyba, setChyba] = useState("");
  const [odeslano, setOdeslano] = useState<Odeslano | null>(null);

  useEffect(() => {
    const ulozene = cti(klic(id));
    if (ulozene) {
      try {
        const o = JSON.parse(ulozene) as Odeslano;
        if (o && (o.hodnota === "potvrzeno" || o.hodnota === "opraveno")) {
          setOdeslano(o);
          setStav("hotovo");
          return;
        }
      } catch {
        /* poškozený záznam ignorujeme a formulář nabídneme znovu */
      }
    }
    const k = cti(KLIC_KDO);
    if (k && [...jmena, JINY].includes(k)) setKdo(k);
    setStav("nabidka");
    // jmena je při každém renderu nové pole se stejným obsahem, stačí id
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const posli = async (hodnota: "potvrzeno" | "opraveno") => {
    if (!kdo) {
      setChyba("Nejdřív vyber, kdo odpovídá.");
      return;
    }
    const txt = poznamka.trim();
    if (hodnota === "opraveno" && !txt) {
      setChyba("Napiš, co a jak opravit.");
      return;
    }
    setChyba("");
    const predtim = stav;
    setStav("odesilam");
    try {
      const r = await fetch("/api/zpetna-vazba", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          typ: "overeni",
          stranka: "/overeni",
          id,
          hodnota,
          text: txt ? `${kdo}: ${txt}` : kdo,
        }),
      });
      if (!r.ok) throw new Error(String(r.status));
      const o: Odeslano = { hodnota, kdo };
      pis(klic(id), JSON.stringify(o));
      pis(KLIC_KDO, kdo);
      setOdeslano(o);
      setStav("hotovo");
    } catch {
      setChyba("Odeslání se nepovedlo, zkus to prosím znovu.");
      setStav(predtim === "oprava" ? "oprava" : "nabidka");
    }
  };

  if (stav === "") return <div className={styles.root} aria-hidden="true" />;

  if (stav === "hotovo") {
    return (
      <div className={styles.root}>
        <p className={styles.dik} role="status">
          Zaznamenáno, díky.
          {odeslano && (
            <span className={styles.drobne}>
              {" "}
              ({odeslano.hodnota === "potvrzeno" ? "potvrzeno" : "oprava odeslána"} · {odeslano.kdo})
            </span>
          )}
        </p>
        <button
          type="button"
          className={styles.odkaz}
          onClick={() => {
            smaz(klic(id));
            setOdeslano(null);
            setPoznamka("");
            setStav("nabidka");
          }}
        >
          Poslat znovu
        </button>
      </div>
    );
  }

  const zaneprazdneno = stav === "odesilam";
  return (
    <form
      className={styles.root}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className={styles.radek}>
        <label className={styles.kdo}>
          <span className="sr-only">Kdo odpovídá</span>
          <select
            className={styles.select}
            value={kdo}
            onChange={(e) => setKdo(e.target.value)}
            disabled={zaneprazdneno}
            aria-label="Kdo odpovídá"
          >
            <option value="">Kdo odpovídá?</option>
            {jmena.map((j) => (
              <option key={j} value={j}>
                {j}
              </option>
            ))}
            <option value={JINY}>{JINY}</option>
          </select>
        </label>
        <button type="button" className={`${styles.btn} ${styles.ano}`} disabled={zaneprazdneno} onClick={() => posli("potvrzeno")}>
          {kapitola ? "Potvrdit celou kapitolu" : "Potvrzuji"}
        </button>
        {!kapitola && (
          <button
            type="button"
            className={styles.btn}
            disabled={zaneprazdneno}
            aria-expanded={stav === "oprava"}
            onClick={() => setStav(stav === "oprava" ? "nabidka" : "oprava")}
          >
            Opravit
          </button>
        )}
      </div>
      {stav === "oprava" && !kapitola && (
        <div className={styles.oprava}>
          <textarea
            className={styles.text}
            rows={3}
            maxLength={1800}
            value={poznamka}
            onChange={(e) => setPoznamka(e.target.value)}
            placeholder="Co je špatně a jak to má být (s číslem a zdrojem, pokud to jde)"
            aria-label="Oprava"
            disabled={zaneprazdneno}
          />
          <button type="button" className={styles.btn} disabled={zaneprazdneno} onClick={() => posli("opraveno")}>
            Odeslat opravu
          </button>
        </div>
      )}
      {chyba && (
        <p className={styles.chyba} role="alert">
          {chyba}
        </p>
      )}
    </form>
  );
}
