"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { Bobr } from "@/components/Bobr";
import styles from "./Story.module.css";

export type Mood = "neutral" | "surprised" | "thinking" | "happy" | "sleepy";
export type StoryStep = { mood: Mood; pointing?: boolean; title?: string; text: React.ReactNode; bobr?: string };

/* Scrollytelling: text kroky projíždějí kolem, bobr zůstává přilepený a mění náladu
   podle kroku, který je zrovna uprostřed obrazovky. Bublina u bobra nese jeho poznámku. */
function Step({ step, index, onActive, children }: { step: StoryStep; index: number; onActive: (i: number) => void; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);
  return (
    <div ref={ref} className={styles.step} data-active={inView || undefined}>
      {step.title && <h3 className={styles.stepTitle}>{step.title}</h3>}
      <div className={styles.stepText}>{children}</div>
    </div>
  );
}

export function Story({ steps, persona }: { steps: StoryStep[]; persona: { who: string; ctx: string } }) {
  const [active, setActive] = useState(0);
  const step = steps[active] ?? steps[0];
  return (
    <div className={styles.story}>
      <div className={styles.sticky}>
        <div className={styles.bobrBox}>
          <Bobr mood={step.mood} pointing={step.pointing} size={200} label={`Bobr: ${step.mood}`} />
          {step.bobr && (
            <p className={styles.bubble} aria-live="polite">{step.bobr}</p>
          )}
        </div>
      </div>
      <div className={styles.steps}>
        <div className={styles.persona}>
          <span className="eyebrow">Modelová postava</span>
          <span className={`display ${styles.who}`}>{persona.who}</span>
          <span className="muted">{persona.ctx}</span>
        </div>
        {steps.map((s, i) => (
          <Step key={i} step={s} index={i} onActive={setActive}>
            {s.text}
          </Step>
        ))}
      </div>
    </div>
  );
}
