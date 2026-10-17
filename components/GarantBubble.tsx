import type { ReactNode } from "react";
import { GarantSvg, popisMluvciho, type GarantMood, type Mluvci } from "./GarantSvg";
import styles from "./GarantBubble.module.css";

type GarantBubbleProps = {
  kdo: Mluvci;
  /** bez účinku; zůstává kvůli volajícím */
  mood?: GarantMood;
  /** bez účinku; zůstává kvůli volajícím */
  pointing?: boolean;
  children: ReactNode;
  /** bez účinku; zůstává kvůli volajícím */
  side?: "left" | "right";
  /** velikost značky v px */
  size?: number;
  /** bez účinku; zůstává kvůli volajícím */
  animate?: boolean;
  /** vypsat jméno a roli v záhlaví (výchozí ano) */
  jmenovka?: boolean;
  className?: string;
};

/* Poznámka garanta: klidná karta se žlutou linkou vlevo, v záhlaví monogram, jméno a role,
   pod tím citát. Nahrazuje kreslenou postavu s bublinou; API volajících zůstalo. */
export function GarantBubble({ kdo, children, size = 44, jmenovka = true, className }: GarantBubbleProps) {
  const p = popisMluvciho(kdo);
  return (
    <figure className={[styles.wrap, className].filter(Boolean).join(" ")}>
      <figcaption className={styles.hlava}>
        <GarantSvg kdo={kdo} size={Math.min(size, 56)} className={styles.znacka} />
        {jmenovka ? (
          <span className={styles.jmenovka}>
            <span className={styles.jmeno}>{p.jmeno}</span>
            <span className={styles.role}>{p.role}</span>
          </span>
        ) : null}
      </figcaption>
      <blockquote className={styles.bubble}>{children}</blockquote>
    </figure>
  );
}

export default GarantBubble;
