import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { VideoScript } from "../../lib/topics";
import { Body, Eyebrow, NumberBlock, TextArea, rise, useEnter, useLayout } from "../ui";

/* 5) Dopad: velké číslo + věta. Garant má radost. */
export function Dopad({ script, beats }: { script: VideoScript; beats: number[] }) {
  const L = useLayout();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const eb = useEnter(0);
  const pop = spring({ frame: frame - 4, fps, config: { damping: 11, stiffness: 120 } });
  const veta = useEnter(beats[2]);
  return (
    <TextArea>
      <Eyebrow style={rise(eb)}>Co to přinese</Eyebrow>
      <div style={{ transform: `scale(${0.6 + 0.4 * pop})`, transformOrigin: L.reel ? "50% 60%" : "0% 60%", opacity: Math.min(1, pop * 2) }}>
        <NumberBlock text={script.dopad.cislo} size={L.fs.hookNum * 0.88} countFrom={4} countFrames={30} />
      </div>
      <Body weight={700} size={Math.round(L.fs.base * 1.12)} style={{ ...rise(veta), maxWidth: L.reel ? L.text.w : 1040 }}>
        {script.dopad.veta}
      </Body>
    </TextArea>
  );
}
