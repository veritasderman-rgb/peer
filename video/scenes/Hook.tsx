import { useCurrentFrame, useVideoConfig, spring } from "remotion";
import type { VideoScript } from "../../lib/topics";
import { C, F } from "../theme";
import { fitSize } from "../measure";
import { Body, NumberBlock, TextArea, rise, useEnter, useLayout } from "../ui";

/* 1) Háček: obří číslo naběhne, pod ním jednotka a věta. Garant žasne. */
export function Hook({ script, beats }: { script: VideoScript; beats: number[] }) {
  const L = useLayout();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - 2, fps, config: { damping: 10, stiffness: 120, mass: 0.9 } });
  const unit = useEnter(beats[1]);
  const veta = useEnter(beats[2]);
  const unitSize = fitSize(script.hook.jednotka, F.display, 400, L.fs.unit, L.text.w, 0, Math.round(L.fs.unit * 0.62));
  return (
    <TextArea>
      <div style={{ transform: `scale(${0.55 + 0.45 * pop})`, transformOrigin: L.reel ? "50% 60%" : "0% 60%", opacity: Math.min(1, pop * 2) }}>
        <NumberBlock text={script.hook.cislo} size={L.fs.hookNum} countFrom={2} countFrames={30} />
      </div>
      <div style={{ ...rise(unit), fontFamily: F.display, fontSize: unitSize, lineHeight: 0.95, color: C.ink, textTransform: "uppercase" }}>
        {script.hook.jednotka}
      </div>
      <Body weight={700} style={{ ...rise(veta), maxWidth: L.reel ? L.text.w : 1000 }}>
        {script.hook.veta}
      </Body>
    </TextArea>
  );
}
