"use client";

import type { ReactNode } from "react";
import { Garant, type GarantMood, type Mluvci } from "./Garant";
import { GARANTI, jmenoMluvciho } from "@/lib/garanti";
import styles from "./GarantBubble.module.css";

type GarantBubbleProps = {
  kdo: Mluvci;
  mood?: GarantMood;
  pointing?: boolean;
  children: ReactNode;
  /** Na které straně od garanta je bublina. */
  side?: "left" | "right";
  /** Velikost garanta v px (šířka). */
  size?: number;
  animate?: boolean;
  /** Jmenovka pod kresbou („Libor Dušek / garant kapitoly“, u rady „PEER / expertní rada“). */
  jmenovka?: boolean;
  className?: string;
};

function popisek(kdo: Mluvci): { jmeno: string; role: string } {
  if (kdo === "rada") return { jmeno: "PEER", role: "expertní rada" };
  const g = GARANTI[kdo];
  return { jmeno: g.jmeno, role: g.zena ? "garantka kapitoly" : "garant kapitoly" };
}

export function GarantBubble({
  kdo,
  mood = "neutral",
  pointing = false,
  children,
  side = "right",
  size = 180,
  animate = true,
  jmenovka = true,
  className,
}: GarantBubbleProps) {
  const p = popisek(kdo);
  const label = kdo === "rada" ? `${jmenoMluvciho(kdo)} říká:` : `${p.jmeno}, ${p.role}, říká:`;
  return (
    <figure
      className={[styles.wrap, side === "left" ? styles.left : styles.right, className].filter(Boolean).join(" ")}
    >
      <div className={styles.garant} style={{ width: size }}>
        <Garant kdo={kdo} mood={mood} pointing={pointing} size={size} animate={animate} label={label} />
        {jmenovka ? (
          <div className={styles.jmenovka} aria-hidden="true">
            <span className={styles.jmeno}>{p.jmeno}</span>
            <span className={styles.role}>{p.role}</span>
          </div>
        ) : null}
      </div>
      <blockquote className={styles.bubble}>{children}</blockquote>
    </figure>
  );
}

export default GarantBubble;
