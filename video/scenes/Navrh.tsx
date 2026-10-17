import { interpolate, useCurrentFrame } from "remotion";
import type { VideoScript } from "../../lib/topics";
import { estimateLines } from "../measure";
import { C, F, type Layout } from "../theme";
import { Body, Eyebrow, TextArea, rise, tidy, useEnter, useLayout } from "../ui";

/* 4) Návrh: tři nejsilnější opatření jako karty s názvem a větou. Garant má radost, ukazuje a mává.
   Karty se skládají pod sebe; když by se dlouhé texty nevešly ani při minimálním písmu,
   ukazují se po jedné. */

type Sizes = { title: number; body: number; sq: number; padX: number; padY: number; gap: number };

function sizesFor(L: Layout, small: boolean): Sizes {
  if (L.reel) return { title: small ? 60 : L.fs.cardTitle, body: small ? L.minBase : L.fs.base, sq: 80, padX: 30, padY: 26, gap: 22 };
  return { title: small ? 52 : L.fs.cardTitle, body: small ? L.minBase : L.fs.base, sq: 72, padX: 26, padY: 20, gap: 20 };
}

function cardHeight(L: Layout, z: Sizes, nazev: string, veta: string): number {
  const inner = L.text.w - 10 - z.padX * 2;
  const titleW = inner - z.sq - 24;
  const vetaW = L.reel ? inner : titleW;
  const tl = estimateLines(nazev, F.display, 400, z.title, titleW);
  const vl = estimateLines(tidy(veta), F.body, 400, z.body, vetaW);
  const titleH = Math.max(L.reel ? z.sq : 0, tl * z.title * 0.98);
  return z.padY * 2 + titleH + (L.reel ? 14 : 8) + vl * z.body * 1.22;
}

function Card({ index, nazev, veta, z, style }: { index: number; nazev: string; veta: string; z: Sizes; style?: React.CSSProperties }) {
  const L = useLayout();
  const num = (
    <div
      style={{
        flex: "0 0 auto",
        width: z.sq,
        height: z.sq,
        background: C.sun,
        fontFamily: F.display,
        fontSize: z.sq * 0.78,
        lineHeight: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: z.sq * 0.08,
      }}
    >
      {index + 1}
    </div>
  );
  const title = (
    <div style={{ fontFamily: F.display, fontSize: z.title, lineHeight: 0.98, textTransform: "uppercase", color: C.ink, paddingTop: 4 }}>{nazev}</div>
  );
  return (
    <div
      style={{
        background: C.card,
        borderLeft: `10px solid ${C.cyan}`,
        boxShadow: "0 2px 0 rgba(0,0,0,0.06)",
        padding: `${z.padY}px ${z.padX}px`,
        width: "100%",
        textAlign: "left",
        display: "flex",
        flexDirection: L.reel ? "column" : "row",
        gap: L.reel ? 14 : 24,
        alignItems: L.reel ? "stretch" : "flex-start",
        ...style,
      }}
    >
      {L.reel ? (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            {num}
            {title}
          </div>
          <Body size={z.body}>{veta}</Body>
        </>
      ) : (
        <>
          {num}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
            {title}
            <Body size={z.body}>{veta}</Body>
          </div>
        </>
      )}
    </div>
  );
}

function StackCard(props: { index: number; nazev: string; veta: string; z: Sizes; start: number }) {
  const p = useEnter(props.start, 15);
  return <Card {...props} style={{ opacity: Math.min(1, p * 1.4), transform: `translateX(${(1 - p) * 140}px)` }} />;
}

export function Navrh({ script, beats }: { script: VideoScript; beats: number[] }) {
  const L = useLayout();
  const frame = useCurrentFrame();
  const eb = useEnter(0);
  const n = script.navrh.length;
  const eyebrowH = L.fs.eyebrow + L.gap;

  const fits = (z: Sizes) =>
    eyebrowH + script.navrh.reduce((a, c) => a + cardHeight(L, z, c.nazev, c.veta), 0) + z.gap * (n - 1) <= L.text.h;
  const big = sizesFor(L, false);
  const small = sizesFor(L, true);
  const z = fits(big) ? big : fits(small) ? small : null;

  if (z) {
    return (
      <TextArea align="start">
        <Eyebrow style={rise(eb)}>Co navrhujeme</Eyebrow>
        <div style={{ display: "flex", flexDirection: "column", gap: z.gap, width: "100%" }}>
          {script.navrh.map((c, i) => (
            <StackCard key={i} index={i} nazev={c.nazev} veta={c.veta} z={z} start={beats[i]} />
          ))}
        </div>
      </TextArea>
    );
  }

  /* po jedné kartě (nadpis sekce putuje s kartou, aby mezi nimi nebyla díra) */
  const zz = { ...big, title: Math.round(big.title * 1.15) };
  return (
    <TextArea align="start">
      <div style={{ position: "relative", width: "100%", height: L.text.h }}>
        {script.navrh.map((c, i) => {
          const start = beats[i];
          const next = beats[i + 1];
          const enter = interpolate(frame, [start - 2, start + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const exit = next === undefined ? 0 : interpolate(frame, [next - 10, next + 2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          if (enter <= 0 || exit >= 1) return null;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: L.gap,
                opacity: enter * (1 - exit),
                transform: `translateX(${(1 - enter) * 140 - exit * 140}px)`,
              }}
            >
              <Eyebrow>
                Co navrhujeme {i + 1}/{n}
              </Eyebrow>
              <Card index={i} nazev={c.nazev} veta={c.veta} z={zz} />
            </div>
          );
        })}
      </div>
    </TextArea>
  );
}
