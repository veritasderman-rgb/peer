"use client";

import { BobrSvg, type BobrMood } from "./BobrSvg";
import styles from "./Bobr.module.css";

export type { BobrMood };

type BobrProps = {
  mood?: BobrMood;
  size?: number;
  pointing?: boolean;
  className?: string;
  label?: string;
  animate?: boolean;
};

/* Webový bobr: kreslení je v BobrSvg (sdílené s videem v Remotionu), tady se jen přidávají
   CSS animace (mrkání, dýchání, ocas, mávání, Zzz) přes třídy na kořenovém <svg>
   a selektory [data-part] v Bobr.module.css. */
export function Bobr({
  mood = "neutral",
  size = 220,
  pointing = false,
  className,
  label,
  animate = true,
}: BobrProps) {
  const rootClass = [styles.bobr, animate ? styles.animated : styles.still, className]
    .filter(Boolean)
    .join(" ");

  return <BobrSvg mood={mood} size={size} pointing={pointing} label={label} className={rootClass} />;
}

export default Bobr;
