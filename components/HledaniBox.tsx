import Form from "next/form";
import styles from "./HledaniBox.module.css";

/* Malé hledací pole (např. do hlavičky): formulář GET na /hledat?q=…, přes next/form s navigací bez
   znovunačtení stránky a funkční i bez JavaScriptu. Barvy bere z okolního textu (currentColor),
   takže sedí na černé hlavičce i na světlé stránce. `kompaktni` = užší pole a tlačítko jen s lupou. */
export function HledaniBox({ kompaktni = false, className }: { kompaktni?: boolean; className?: string }) {
  return (
    <Form action="/hledat" role="search" className={`${styles.form} ${kompaktni ? styles.kompaktni : ""} ${className ?? ""}`}>
      <label className={styles.label}>
        <span className="sr-only">Hledat na webu</span>
        <input
          className={styles.input}
          type="search"
          name="q"
          placeholder={kompaktni ? "Hledat" : "Hledej, třeba hypotéka"}
          autoComplete="off"
          enterKeyHint="search"
          required
        />
      </label>
      <button type="submit" className={styles.submit} aria-label={kompaktni ? "Hledat" : undefined}>
        <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="M15.5 15.5 21 21" />
        </svg>
        {!kompaktni && <span>Hledat</span>}
      </button>
    </Form>
  );
}
