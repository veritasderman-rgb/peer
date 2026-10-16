import type { Blok } from "@/content/bydleni-plne-zneni";
import styles from "./PlneZneni.module.css";

/* Plné znění kapitoly: odkazy [n] v textu se mění na odkazy na rejstřík zdrojů. */
function withRefs(text: string, prefix: string) {
  const parts = text.split(/(\[\d+(?:,\s*\d+)*\])/g);
  return parts.map((part, i) => {
    const m = part.match(/^\[([\d,\s]+)\]$/);
    if (!m) return part;
    const nums = m[1].split(",").map((n) => n.trim());
    return (
      <sup key={i} className={styles.ref}>
        {nums.map((n, j) => (
          <span key={n}>
            {j > 0 && ", "}
            <a href={`#${prefix}-zdroj-${n}`}>{n}</a>
          </span>
        ))}
      </sup>
    );
  });
}

export function PlneZneni({ bloky, zdroje, prefix = "k11" }: { bloky: Blok[]; zdroje: { index: number; citace: string }[]; prefix?: string }) {
  return (
    <div className={styles.root}>
      {bloky.map((b, i) => {
        if (b.typ === "h3") return <h3 key={i} className={styles.h3}>{b.text}</h3>;
        if (b.typ === "p") return <p key={i}>{withRefs(b.text, prefix)}</p>;
        if (b.typ === "ul")
          return (
            <ul key={i}>
              {b.polozky.map((p, j) => <li key={j}>{withRefs(p, prefix)}</li>)}
            </ul>
          );
        return (
          <ol key={i} className={styles.ol}>
            {b.polozky.map((p, j) => (
              <li key={j}>
                <b>{p.nazev}</b> {withRefs(p.text, prefix)}
              </li>
            ))}
          </ol>
        );
      })}
      <h3 className={styles.h3}>Rejstřík zdrojů</h3>
      <ol className={styles.sources}>
        {zdroje.map((z) => (
          <li key={z.index} id={`${prefix}-zdroj-${z.index}`} value={z.index}>{z.citace}</li>
        ))}
      </ol>
    </div>
  );
}
