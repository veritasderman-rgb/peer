import type { ReactNode } from "react";
import { AbsoluteFill, Html5Audio as Audio, Sequence, interpolate, staticFile, useVideoConfig } from "remotion";
import type { VideoScript } from "../lib/topics";
import { loadFonts, useFontsReady } from "./fonts";
import { C, getLayout } from "./theme";
import { FPS, MUSIC, buildTimeline, type SceneId } from "./timeline";
import { GarantLayer, Header, LayoutContext, ProgressBar, SceneFade } from "./ui";
import { garantTematu, type Mluvci } from "../lib/garanti";
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

/** Hlasitost hudebního podkresu pod řečí, náběh 1 s na začátku a doznění 2 s na konci videa. */
const MUSIC_VOLUME = 0.12;
const musicVolume = (total: number) => (f: number) =>
  MUSIC_VOLUME *
  interpolate(f, [0, FPS, total - 2 * FPS, total - 1], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

/* Jedna komponenta pro obě kompozice: rozložení se řídí poměrem stran
   (široké: garant vlevo ~35 %, text vpravo; reel: text nahoře, garant dole).
   Mluví garant kapitoly; úvodní video (uvod) uvádí celá rada. */
function mluvci(slug: string): Mluvci {
  return slug === "uvod" ? "rada" : garantTematu(slug);
}
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
        {/* namluvený komentář: každá scéna svůj soubor (háček až po naběhnutí čísla) */}
        {segments.map((seg) =>
          seg.audio ? (
            <Sequence key={`a-${seg.id}`} from={seg.from + seg.audio.from} durationInFrames={seg.duration - seg.audio.from} name={`hlas ${seg.id}`} layout="none">
              <Audio src={staticFile(seg.audio.file)} />
            </Sequence>
          ) : null,
        )}
        {MUSIC ? (
          <Audio
            src={staticFile(MUSIC.file)}
            volume={musicVolume(total)}
            loop={MUSIC.duration * FPS < total}
            loopVolumeCurveBehavior="extend"
            name="hudba"
          />
        ) : null}
        <GarantLayer segments={segments} kdo={mluvci(script.slug)} />
        <ProgressBar total={total} />
      </AbsoluteFill>
    </LayoutContext.Provider>
  );
}
