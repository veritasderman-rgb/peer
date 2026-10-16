import type { ReactNode } from "react";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import type { VideoScript } from "../lib/topics";
import { loadFonts, useFontsReady } from "./fonts";
import { C, getLayout } from "./theme";
import { buildTimeline, type SceneId } from "./timeline";
import { BobrLayer, Header, LayoutContext, ProgressBar, SceneFade } from "./ui";
import { Hook } from "./scenes/Hook";
import { Problem } from "./scenes/Problem";
import { Proc } from "./scenes/Proc";
import { Navrh } from "./scenes/Navrh";
import { Dopad } from "./scenes/Dopad";
import { Outro } from "./scenes/Outro";

loadFonts();

export type TopicVideoProps = { script: VideoScript };

const SCENES: Record<SceneId, (p: { script: VideoScript; beats: number[] }) => ReactNode> = {
  hook: Hook,
  problem: Problem,
  proc: Proc,
  navrh: Navrh,
  dopad: Dopad,
  outro: Outro,
};

/* Jedna komponenta pro obě kompozice: rozložení se řídí poměrem stran
   (široké: bobr vlevo ~35 %, text vpravo; reel: text nahoře, bobr dole). */
export function TopicVideo({ script }: TopicVideoProps) {
  const { width, height } = useVideoConfig();
  const layout = getLayout(width, height);
  const { segments, total } = buildTimeline(script);
  const fontsReady = useFontsReady();
  if (!fontsReady) return <AbsoluteFill style={{ background: C.bg }} />;
  return (
    <LayoutContext.Provider value={layout}>
      <AbsoluteFill style={{ background: C.bg, color: C.ink }}>
        <Header titulek={script.titulek} />
        {segments.map((seg, i) => {
          const Scene = SCENES[seg.id];
          return (
            <Sequence key={seg.id} from={seg.from} durationInFrames={seg.duration} name={seg.id} layout="none">
              <SceneFade duration={seg.duration} first={i === 0} last={i === segments.length - 1}>
                <Scene script={script} beats={seg.beats} />
              </SceneFade>
            </Sequence>
          );
        })}
        <BobrLayer segments={segments} />
        <ProgressBar total={total} />
      </AbsoluteFill>
    </LayoutContext.Provider>
  );
}
