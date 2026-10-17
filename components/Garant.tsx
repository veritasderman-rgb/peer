import { GarantSvg, popisMluvciho, type GarantMood, type Mluvci } from "./GarantSvg";
import styles from "./Garant.module.css";

export type { GarantMood, Mluvci };

type GarantProps = {
  kdo: Mluvci;
  /** bez účinku; zůstává kvůli volajícím */
  mood?: GarantMood;
  /** průměr značky v px */
  size?: number;
  /** bez účinku; zůstává kvůli volajícím */
  pointing?: boolean;
  className?: string;
  /** přístupný popis značky; bez něj je dekorativní */
  label?: string;
  /** bez účinku; zůstává kvůli volajícím */
  animate?: boolean;
  /** vedle značky vypsat jméno a roli */
  jmenovka?: boolean;
};

/* Webová značka garanta: monogram (GarantSvg), volitelně se jménem a rolí vedle. Nálada ani
   animace se nekreslí; props zůstávají, aby starší volání dál fungovala. */
export function Garant({ kdo, size = 56, className, label, jmenovka = false }: GarantProps) {
  if (!jmenovka) return <GarantSvg kdo={kdo} size={size} label={label} className={[styles.znacka, className].filter(Boolean).join(" ")} />;
  const p = popisMluvciho(kdo);
  return (
    <span className={[styles.sJmenem, className].filter(Boolean).join(" ")}>
      <GarantSvg kdo={kdo} size={size} label={label} className={styles.znacka} />
      <span className={styles.jmenovka}>
        <span className={styles.jmeno}>{p.jmeno}</span>
        <span className={styles.role}>{p.role}</span>
      </span>
    </span>
  );
}

export default Garant;
