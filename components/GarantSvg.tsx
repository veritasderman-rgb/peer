import type { CSSProperties } from "react";
import { GARANTI, type GarantMood, type Mluvci } from "@/lib/garanti";

/* Značka garanta: střídmý monogram (iniciály v černém kruhu se žlutým lemem) místo kreslené
   postavy. kdo="rada" je značka celé rady: zaoblený čtverec s nápisem PEER. Čisté SVG bez CSS
   modulu a bez "use client", aby šlo použít na webu, v Remotionu i ve skriptech. Čtvercový
   viewBox 0 0 100 100; `size` je šířka i výška. Volitelně se pod značku vykreslí jméno a role
   (`jmeno`), což používá export statických SVG a video.
   Nálada (`mood`), ukazovátko a animace se tu nekreslí: props zůstávají kvůli zpětné
   kompatibilitě volajících a jsou bez účinku. */

export type { GarantMood, Mluvci };

export type GarantSvgProps = {
  kdo: Mluvci;
  mood?: GarantMood;
  pointing?: boolean;
  size?: number;
  /** přístupný popis; bez něj je značka dekorativní */
  label?: string;
  /** vykreslit pod značkou jméno a roli (ve stejném SVG) */
  jmeno?: boolean;
  /** písma; na webu se berou z CSS proměnných, v Remotionu se předají názvy rodin */
  fontDisplay?: string;
  fontBody?: string;
  blink?: number;
  breathe?: number;
  wave?: number;
  className?: string;
  style?: CSSProperties;
};

const INK = "var(--ink, #000)";
const PAPER = "var(--paper, #fff)";
const SUN = "var(--sun, #fec934)";
const MUTED = "var(--muted, #4c4c4c)";

export function popisMluvciho(kdo: Mluvci): { jmeno: string; role: string; inicialy: string } {
  if (kdo === "rada") return { jmeno: "PEER", role: "Pirátská expertní ekonomická rada", inicialy: "PEER" };
  const g = GARANTI[kdo];
  return { jmeno: g.jmeno, role: g.zena ? "garantka kapitoly" : "garant kapitoly", inicialy: g.inicialy };
}

export function GarantSvg({
  kdo,
  size = 64,
  label,
  jmeno = false,
  fontDisplay = "var(--f-display, 'Bebas Neue', 'Roboto Condensed', sans-serif)",
  fontBody = "var(--f-data, 'Roboto Condensed', Roboto, sans-serif)",
  className,
  style,
}: GarantSvgProps) {
  const p = popisMluvciho(kdo);
  const rada = kdo === "rada";
  /* výška viewBoxu: samotná značka 100, s jmenovkou 140 */
  const vbH = jmeno ? 140 : 100;
  const height = (size * vbH) / 100;
  return (
    <svg
      viewBox={`0 0 100 ${vbH}`}
      width={size}
      height={height}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={className}
      style={style}
    >
      {label ? <title>{label}</title> : null}
      {rada ? (
        <>
          <rect x="4" y="4" width="92" height="92" rx="22" fill={INK} />
          <rect x="4" y="4" width="92" height="92" rx="22" fill="none" stroke={SUN} strokeWidth="4" />
          <text
            x="50"
            y="50"
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily={fontDisplay}
            fontSize="40"
            letterSpacing="2"
            fill={SUN}
          >
            PEER
          </text>
        </>
      ) : (
        <>
          <circle cx="50" cy="50" r="46" fill={INK} />
          <circle cx="50" cy="50" r="46" fill="none" stroke={SUN} strokeWidth="4" />
          <text
            x="50"
            y="51"
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily={fontDisplay}
            fontSize={p.inicialy.length > 2 ? 34 : 46}
            letterSpacing="1.5"
            fill={PAPER}
          >
            {p.inicialy}
          </text>
        </>
      )}
      {jmeno ? (
        <>
          <text x="50" y="117" textAnchor="middle" fontFamily={fontBody} fontWeight="700" fontSize="11.5" fill={INK}>
            {p.jmeno}
          </text>
          <text x="50" y="131" textAnchor="middle" fontFamily={fontBody} fontSize="9" fill={MUTED}>
            {p.role}
          </text>
        </>
      ) : null}
    </svg>
  );
}

export default GarantSvg;
