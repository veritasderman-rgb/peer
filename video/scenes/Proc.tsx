import { interpolate, useCurrentFrame } from "remotion";
import type { VideoScript } from "../../lib/topics";
import { C, F } from "../theme";
import { Body, Eyebrow, TextArea, rise, useEnter, useLayout } from "../ui";

/* 3) Proč: řetězec příčin, kroky a šipky mezi nimi naskakují postupně. Bobr vysvětluje. */
function Arrow({ start, height }: { start: number; height: number }) {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [start - 12, start], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const w = height * 0.7;
  return (
    <svg width={w} height={height} viewBox="0 0 28 40" style={{ display: "block", opacity: p > 0 ? 1 : 0 }}>
      <g style={{ transform: `scaleY(${p})`, transformOrigin: "50% 0%" }}>
        <path d="M 14 2 V 30" stroke={C.cyan} strokeWidth={4.5} strokeLinecap="round" fill="none" />
        <path d="M 4 24 L 14 36 L 24 24" stroke={C.cyan} strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </svg>
  );
}

function Step({ index, text, start }: { index: number; text: string; start: number }) {
  const L = useLayout();
  const p = useEnter(start);
  const badge = Math.round(L.fs.base * 1.45);
  return (
    <div style={{ ...rise(p, 28), display: "flex", alignItems: "center", gap: L.reel ? 26 : 24, width: "100%", textAlign: "left" }}>
      <div
        style={{
          flex: "0 0 auto",
          width: badge,
          height: badge,
          borderRadius: "50%",
          background: C.cyan,
          color: "#fff",
          fontFamily: F.display,
          fontSize: badge * 0.66,
          lineHeight: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: badge * 0.06,
        }}
      >
        {index + 1}
      </div>
      <Body weight={700} style={{ flex: 1 }}>
        {text}
      </Body>
    </div>
  );
}

export function Proc({ script, beats }: { script: VideoScript; beats: number[] }) {
  const L = useLayout();
  const eb = useEnter(0);
  const badge = Math.round(L.fs.base * 1.45);
  const arrowH = L.reel ? 64 : 52;
  return (
    <TextArea align="start">
      <Eyebrow style={rise(eb)}>Proč to tak je</Eyebrow>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
        {script.proc.map((k, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {i > 0 ? (
              <div style={{ width: badge, display: "flex", justifyContent: "center" }}>
                <Arrow start={beats[i]} height={arrowH} />
              </div>
            ) : null}
            <Step index={i} text={k} start={beats[i]} />
          </div>
        ))}
      </div>
    </TextArea>
  );
}
