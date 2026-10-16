import styles from "./Slovnik.module.css";

export function Slovnik({ polozky }: { polozky: { pojem: string; vysvetleni: string }[] }) {
  return (
    <dl className={styles.list}>
      {polozky.map((p) => (
        <div key={p.pojem} className={styles.item}>
          <dt>{p.pojem}</dt>
          <dd>{p.vysvetleni}</dd>
        </div>
      ))}
    </dl>
  );
}
