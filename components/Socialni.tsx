import { najdiClena, odkazyClena } from "@/lib/tym";
import styles from "./Socialni.module.css";

/* Ikony sítí u člena PEER. Když člověk žádný ověřený profil nemá, nevykreslí se nic. */
const IKONY: Record<string, React.ReactNode> = {
  web: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM10 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4z" /></svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 21v-7h2.4l.4-3h-2.8V9.2c0-.9.3-1.5 1.5-1.5h1.5V5.1c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8V11H8v3h2.6v7z" /></svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.5 3h3l-6.8 7.8L21.7 21h-6.2l-4.9-6.4L5 21H2l7.3-8.3L1.7 3H8l4.4 5.8zm-1.1 16.2h1.7L7.1 4.7H5.3z" /></svg>
  ),
  bluesky: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 10.8C11 8.8 8.3 5.1 5.8 3.4 3.4 1.7 2.5 2 1.9 2.3 1.2 2.6 1 3.7 1 4.3s.4 5.4.6 6.2c.8 2.6 3.6 3.5 6.2 3.2-3.8.6-7.1 1.9-2.7 6.8 4.8 5 6.6-1.1 6.9-2.6.3 1.5 2.1 7.6 6.9 2.6 4.4-4.9 1.1-6.2-2.7-6.8 2.6.3 5.4-.6 6.2-3.2.2-.8.6-5.6.6-6.2s-.2-1.7-.9-2c-.6-.3-1.5-.6-3.9 1.1C15.7 5.1 13 8.8 12 10.8Z" /></svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="17.3" cy="6.7" r="1.3" fill="currentColor" /></svg>
  ),
};

export function Socialni({ jmeno, compact = false }: { jmeno: string; compact?: boolean }) {
  const c = najdiClena(jmeno);
  if (!c) return null;
  const odkazy = odkazyClena(c);
  if (!odkazy.length) return null;
  return (
    <ul className={`${styles.list} ${compact ? styles.compact : ""}`} aria-label={`${jmeno} na sítích`}>
      {odkazy.map((o) => (
        <li key={o.klic}>
          <a className={styles.link} href={o.url} target="_blank" rel="noreferrer me" title={`${jmeno}: ${o.label}`}>
            <span className={styles.ikona}>{IKONY[o.klic]}</span>
            <span className={compact ? "sr-only" : undefined}>{o.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
