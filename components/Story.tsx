"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { Garant } from "@/components/Garant";
import { Scena } from "@/components/Scena";
import type { Mluvci } from "@/lib/garanti";
import type { Mood, StoryStep } from "@/lib/topics";
import styles from "./Story.module.css";

export type { Mood, StoryStep };

/* Výška přilepené hlavičky webu (zalamuje se podle počtu položek menu) do --nav-h na <html>,
   aby přilepené panely začínaly přesně pod ní. Bez JS platí záloha 56px v CSS. */
export function useVyskaHlavicky() {
  useEffect(() => {
    const h = [...document.querySelectorAll("header")].find((el) => ["sticky", "fixed"].includes(getComputedStyle(el).position));
    if (!h) return;
    const nastav = () => document.documentElement.style.setProperty("--nav-h", `${Math.round(h.getBoundingClientRect().height)}px`);
    nastav();
    const ro = new ResizeObserver(nastav);
    ro.observe(h);
    return () => ro.disconnect();
  }, []);
}

/* Scrollytelling: text kroky projíždějí kolem, garant kapitoly zůstává přilepený a mění náladu
   podle kroku, který je zrovna uprostřed obrazovky. Bublina u garanta nese jeho poznámku
   (pole kroku se z historických důvodů jmenuje bobr). Má-li krok `scena`, ukáže se pod garantem
   a rozběhne se (components/Scena.tsx); krok bez scény nechá v panelu ztlumenou poslední předchozí scénu.
   Na telefonu je přilepená jen kompaktní hlavička (garant + bublina + tečky), scéna je přímo v kroku nad textem. */
function Step({
  step,
  index,
  onActive,
  register,
  children,
}: {
  step: StoryStep;
  index: number;
  onActive: (i: number) => void;
  register: (i: number, el: HTMLDivElement | null) => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  const inlineRef = useRef<HTMLDivElement>(null);
  /* scéna v kroku (jen telefon; na desktopu je display: none, takže se nikdy „neuvidí“) */
  const inlineSeen = useInView(inlineRef, { once: true, margin: "0px 0px -20% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);
  const setRef = useCallback(
    (el: HTMLDivElement | null) => {
      ref.current = el;
      register(index, el);
    },
    [index, register],
  );
  return (
    <div ref={setRef} className={styles.step} data-active={inView || undefined}>
      {step.scena && (
        <div ref={inlineRef} className={styles.inlineScena}>
          <Scena scena={step.scena} active={inlineSeen} />
        </div>
      )}
      {step.title && <h3 className={styles.stepTitle}>{step.title}</h3>}
      <div className={styles.stepText}>{children}</div>
    </div>
  );
}

export function Story({ steps, persona, kdo }: { steps: StoryStep[]; persona: { who: string; ctx: string }; kdo: Mluvci }) {
  const [active, setActive] = useState(0);
  useVyskaHlavicky();
  const els = useRef<(HTMLDivElement | null)[]>([]);
  const register = useCallback((i: number, el: HTMLDivElement | null) => {
    els.current[i] = el;
  }, []);
  const step = steps[active] ?? steps[0];
  const maScenu = steps.some((s) => s.scena);
  /* poslední krok se scénou, který už čtenář minul (nebo právě čte) */
  let scenaIdx = -1;
  for (let i = Math.min(active, steps.length - 1); i >= 0; i--) {
    if (steps[i].scena) {
      scenaIdx = i;
      break;
    }
  }
  const scena = scenaIdx >= 0 ? steps[scenaIdx].scena : undefined;

  const jdi = (i: number) => {
    els.current[i]?.scrollIntoView({ block: "center" }); // plynulost řídí CSS scroll-behavior (vypnutá u reduced motion)
  };

  return (
    <div className={styles.story} data-scena={maScenu || undefined}>
      <div className={styles.sticky}>
        <div className={styles.bobrBox}>
          <Garant kdo={kdo} mood={step.mood} pointing={step.pointing} size={maScenu ? 150 : 200} />
          {step.bobr && (
            <p className={styles.bubble} aria-live="polite">{step.bobr}</p>
          )}
        </div>
        {scena && (
          <div key={scenaIdx} className={styles.panelScena} data-dim={scenaIdx !== active || undefined}>
            <Scena scena={scena} active />
          </div>
        )}
        {steps.length > 1 && (
          <nav className={styles.rail} aria-label="Kroky příběhu">
            <ol>
              {steps.map((s, i) => (
                <li key={i} data-done={i < active || undefined}>
                  <button
                    type="button"
                    className={styles.dot}
                    aria-current={i === active ? "step" : undefined}
                    aria-label={`Krok ${i + 1} z ${steps.length}${s.title ? `: ${s.title}` : ""}`}
                    onClick={() => jdi(i)}
                  />
                </li>
              ))}
            </ol>
          </nav>
        )}
      </div>
      <div className={styles.steps}>
        <div className={styles.persona}>
          <span className="eyebrow">Modelová postava</span>
          <span className={`display ${styles.who}`}>{persona.who}</span>
          <span className="muted">{persona.ctx}</span>
        </div>
        {steps.map((s, i) => (
          <Step key={i} step={s} index={i} onActive={setActive} register={register}>
            {s.text}
          </Step>
        ))}
      </div>
    </div>
  );
}
