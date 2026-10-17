import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { VideoScript } from "../../lib/topics";
import { Body, Eyebrow, NumberBlock, TextArea, useLayout } from "../ui";

/* 2) Problém: karty po ~5 s, na každé jedno číslo a jedna věta. Garant přemýšlí. */
export function Problem({ script, beats }: { script: VideoScript; beats: number[] }) {
  const L = useLayout();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const n = script.problem.length;

  return (
    <TextArea>
      <div style={{ position: "relative", width: "100%", height: L.text.h }}>
        {script.problem.map((p, i) => {
          const start = beats[i];
          const next = beats[i + 1];
          const enter = spring({ frame: frame - start, fps, config: { damping: 16, stiffness: 150 } });
          const exit = next === undefined ? 0 : interpolate(frame, [next - 10, next + 2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          if (frame < start - 2 || exit >= 1) return null;
          const x = (1 - enter) * 160 - exit * 160;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: L.reel ? "center" : "flex-start",
                gap: L.gap + 8,
                opacity: Math.min(enter * 1.5, 1) * (1 - exit),
                transform: `translateX(${x}px)`,
              }}
            >
              <Eyebrow>
                Problém {i + 1}/{n}
              </Eyebrow>
              {p.cislo ? <NumberBlock text={p.cislo} size={L.fs.num} countFrom={start + 2} countFrames={22} /> : null}
              <Body weight={700} style={{ maxWidth: L.reel ? L.text.w : 1000 }}>
                {p.veta}
              </Body>
            </div>
          );
        })}
      </div>
    </TextArea>
  );
}
