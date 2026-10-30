"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import styles from "./Spirala.module.css";

/* Řetězec příčin ze s. 9 studie. Kroky se odhalují postupně, až když je blok v záběru. */
export function Spirala({ kroky, loop }: { kroky: { nazev: string; popis: string }[]; loop?: { nazev: string; popis: string } }) {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <ol ref={ref} className={styles.chain} data-shown={inView || undefined}>
      {kroky.map((k, i) => (
        <li key={i} className={styles.node} style={{ transitionDelay: `${i * 220}ms` }}>
          <span className={styles.index}>{i + 1}</span>
          <span className={styles.name}>{k.nazev}</span>
          <span className={styles.desc}>{k.popis}</span>
          {i < kroky.length - 1 && <span className={styles.arrow} aria-hidden="true">→</span>}
        </li>
      ))}
      {loop && (
        <li className={`${styles.node} ${styles.loop}`} style={{ transitionDelay: `${kroky.length * 220}ms` }} aria-label="a kruh se uzavírá">
          <span className={styles.name}>{loop.nazev}</span>
          <span className={styles.desc}>{loop.popis}</span>
        </li>
      )}
    </ol>
  );
}
