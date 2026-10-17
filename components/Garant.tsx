"use client";

import { GarantSvg, type GarantMood, type Mluvci } from "./GarantSvg";
import styles from "./Garant.module.css";

export type { GarantMood, Mluvci };

type GarantProps = {
  kdo: Mluvci;
  mood?: GarantMood;
  size?: number;
  pointing?: boolean;
  className?: string;
  label?: string;
  animate?: boolean;
};

/* Webový garant: kreslení je v GarantSvg (sdílené s videem v Remotionu), tady se jen přidávají
   CSS animace (mrkání, dýchání, mávání ukazovátkem, Zzz) přes třídy na kořenovém <svg>
   a selektory [data-part] v Garant.module.css. */
export function Garant({
  kdo,
  mood = "neutral",
  size = 220,
  pointing = false,
  className,
  label,
  animate = true,
}: GarantProps) {
  const rootClass = [styles.garant, animate ? styles.animated : styles.still, className].filter(Boolean).join(" ");

  return <GarantSvg kdo={kdo} mood={mood} size={size} pointing={pointing} label={label} className={rootClass} />;
}

export default Garant;
