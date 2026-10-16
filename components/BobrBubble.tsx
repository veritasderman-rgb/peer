"use client";

import type { ReactNode } from "react";
import { Bobr, type BobrMood } from "./Bobr";
import styles from "./BobrBubble.module.css";

type BobrBubbleProps = {
  mood?: BobrMood;
  pointing?: boolean;
  children: ReactNode;
  /** Na které straně od bobra je bublina. */
  side?: "left" | "right";
  /** Velikost bobra v px (šířka). */
  size?: number;
  animate?: boolean;
  className?: string;
};

export function BobrBubble({
  mood = "neutral",
  pointing = false,
  children,
  side = "right",
  size = 180,
  animate = true,
  className,
}: BobrBubbleProps) {
  return (
    <figure
      className={[styles.wrap, side === "left" ? styles.left : styles.right, className].filter(Boolean).join(" ")}
    >
      <div className={styles.bobr} style={{ width: size }}>
        <Bobr mood={mood} pointing={pointing} size={size} animate={animate} label="Bobr, maskot webu, říká:" />
      </div>
      <blockquote className={styles.bubble}>{children}</blockquote>
    </figure>
  );
}

export default BobrBubble;
