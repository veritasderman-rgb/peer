"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import s from "./BigNumber.module.css";

export type BigNumberProps = {
  value: number;
  decimals?: number;
  unit?: string;
  prefix?: string;
  label?: string;
  durationMs?: number;
};

/**
 * Obří číslo, které při prvním scrollnutí do záběru naběhne od 0.
 * SSR i první render na klientu = finální hodnota (náhledy, bez JS, reduced motion);
 * animace startuje až po useInView.
 */
export function BigNumber({ value, decimals = 0, unit, prefix, label, durationMs = 1600 }: BigNumberProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [anim, setAnim] = useState<number | null>(null); // null = ukaž finální hodnotu

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const controls = animate(0, value, {
      duration: durationMs / 1000,
      ease: "easeOut",
      onUpdate: (v) => setAnim(v),
      onComplete: () => setAnim(null),
    });
    return () => controls.stop();
  }, [inView, value, durationMs]);

  const fmt = new Intl.NumberFormat("cs-CZ", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  const final = fmt.format(value);
  const shown = fmt.format(anim ?? value);

  return (
    <div className={s.root} ref={ref}>
      <p className={s.figure}>
        <span className={s.sr}>
          {prefix}
          {final}
          {unit ? ` ${unit}` : ""}
        </span>
        <span aria-hidden="true" className={`${s.value} num`}>
          {prefix ? <span className={s.prefix}>{prefix}</span> : null}
          {shown}
          {unit ? <span className={s.unit}>{unit}</span> : null}
        </span>
      </p>
      {label ? <p className={s.label}>{label}</p> : null}
    </div>
  );
}
