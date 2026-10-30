import Image from "next/image";
import styles from "./TymFoto.module.css";

/* Skutečná fotka rady ze stránek PEER (peer.pirati.cz). Na webu nahrazuje monogramy tam, kde jde o tým jako celek. */
export function TymFoto({ priority = false, children }: { priority?: boolean; children?: React.ReactNode }) {
  return (
    <figure className={styles.figure}>
      <Image
        src="/foto/peer-tym.jpg"
        alt="Členové Pirátské expertní ekonomické rady stojí vedle sebe, několik z nich drží výtisk Hospodářské strategie."
        width={1430}
        height={875}
        sizes="(max-width: 1240px) 100vw, 1200px"
        priority={priority}
        className={styles.img}
      />
      <figcaption className={styles.popis}>
        {children ?? "Pirátská expertní ekonomická rada se strategií."} Foto: peer.pirati.cz
      </figcaption>
    </figure>
  );
}
