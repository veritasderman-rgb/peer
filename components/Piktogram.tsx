import type { CSSProperties } from "react";

/* Piktogramy témat: jednotná čárová sada na mřížce 24 × 24, tah 1,75 px, kulaté konce.
   Kreslí se barvou textu (currentColor), takže sedí na světlém i tmavém pozadí a v kroužku
   se žlutým akcentem. Bez CSS modulu a bez "use client", aby šly použít i v Remotionu a ve
   skriptech. Tvary vycházejí z otevřené sady Lucide (licence ISC), upravené na jeden tah.
   Klíč = slug tématu (lib/topics.ts); "peer" je značka rady. */

export type PiktogramId =
  | "bydleni" | "vzdelanost" | "prace" | "zeny" | "exekuce" | "zdravi" | "euro"
  | "kapital" | "oligarchie" | "prumysl" | "energie" | "inovace" | "regiony" | "stat";

export const PIKTOGRAMY: Record<PiktogramId, { nazev: string; cesty: string[] }> = {
  bydleni: {
    nazev: "dům",
    cesty: [
      "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",
      "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
    ],
  },
  vzdelanost: {
    nazev: "absolventská čepice",
    cesty: [
      "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",
      "M22 10v6",
      "M6 12.5V16a6 3 0 0 0 12 0v-3.5",
    ],
  },
  prace: {
    nazev: "aktovka",
    cesty: ["M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", "M2 8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"],
  },
  zeny: {
    nazev: "lidé",
    cesty: [
      "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
      "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
      "M22 21v-2a4 4 0 0 0-3-3.87",
      "M16 3.13a4 4 0 0 1 0 7.75",
    ],
  },
  exekuce: {
    nazev: "rozpojený řetěz",
    cesty: [
      "m18.84 12.25 1.72-1.71a5 5 0 0 0-7.07-7.07l-1.72 1.71",
      "m5.17 11.75-1.71 1.71a5 5 0 0 0 7.07 7.07l1.71-1.71",
      "M8 2v3", "M2 8h3", "M16 22v-3", "M22 16h-3",
    ],
  },
  zdravi: {
    nazev: "srdce s pulsem",
    cesty: [
      "M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.56.56 0 0 1-.818 0A5.49 5.49 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.001z",
      "M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27",
    ],
  },
  euro: {
    nazev: "euro",
    cesty: ["M4 10h12", "M4 14h9", "M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2"],
  },
  kapital: {
    nazev: "mince",
    cesty: ["M8 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12z", "M18.09 10.37A6 6 0 1 1 10.34 18", "M7 6h1v4", "m16.71 13.88.7.71-2.82 2.82"],
  },
  oligarchie: {
    nazev: "váhy",
    cesty: [
      "m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",
      "m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",
      "M7 21h10", "M12 3v18", "M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2",
    ],
  },
  prumysl: {
    nazev: "továrna",
    cesty: ["M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z", "M17 18h1", "M12 18h1", "M7 18h1"],
  },
  energie: {
    nazev: "blesk",
    cesty: ["M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"],
  },
  inovace: {
    nazev: "žárovka",
    cesty: ["M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5", "M9 18h6", "M10 22h4"],
  },
  regiony: {
    nazev: "špendlík na mapě",
    cesty: ["M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0", "M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"],
  },
  stat: {
    nazev: "úřad se sloupy",
    cesty: [
      "M10 18v-7", "M14 18v-7", "M18 18v-7", "M6 18v-7", "M3 22h18",
      "M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z",
    ],
  },
};

export const PIKTOGRAM_IDS = Object.keys(PIKTOGRAMY) as PiktogramId[];

export function jePiktogram(id: string): id is PiktogramId {
  return id in PIKTOGRAMY;
}

type PiktogramProps = {
  id: PiktogramId;
  /** velikost v px (šířka i výška) */
  size?: number;
  /** tloušťka tahu v jednotkách mřížky 24 */
  tah?: number;
  /** přístupný název; bez něj je ikona dekorativní (aria-hidden) */
  title?: string;
  className?: string;
  style?: CSSProperties;
};

/** Samotný piktogram (čárová ikona) v barvě currentColor. */
export function Piktogram({ id, size = 24, tah = 1.75, title, className, style }: PiktogramProps) {
  const p = PIKTOGRAMY[id];
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={tah}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      className={className}
      style={style}
    >
      {title ? <title>{title}</title> : null}
      {p.cesty.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

type OdznakProps = Omit<PiktogramProps, "tah"> & {
  /** "svetly" = bílý kroužek s černou ikonou a žlutým lemem (na stránce),
      "tmavy" = černý kroužek s bílou ikonou (na tmavém pozadí), "zluty" = žlutý kroužek s černou ikonou (akcent). */
  varianta?: "svetly" | "tmavy" | "zluty";
};

/** Piktogram v kroužku: značka tématu v kartách, hlavičkách a ve videu. */
export function PiktogramOdznak({ id, size = 56, varianta = "svetly", title, className, style }: OdznakProps) {
  const barvy = {
    svetly: { bg: "var(--surface, #fff)", fg: "var(--ink, #000)", lem: "var(--sun, #fec934)" },
    tmavy: { bg: "var(--ink, #000)", fg: "var(--paper, #fff)", lem: "var(--sun, #fec934)" },
    zluty: { bg: "var(--sun, #fec934)", fg: "var(--sun-ink, #000)", lem: "var(--sun, #fec934)" },
  }[varianta];
  const lem = Math.max(2, Math.round(size * 0.045));
  return (
    <span
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: "50%",
        background: barvy.bg,
        color: barvy.fg,
        boxShadow: `inset 0 0 0 ${lem}px ${barvy.lem}`,
        flex: "none",
        ...style,
      }}
    >
      <Piktogram id={id} size={Math.round(size * 0.5)} tah={1.75} />
    </span>
  );
}

export default Piktogram;
