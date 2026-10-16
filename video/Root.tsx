import { Composition, type CalculateMetadataFunction } from "remotion";
import { scripts } from "./scripts";
import { FPS, buildTimeline } from "./timeline";
import { TopicVideo, type TopicVideoProps } from "./TopicVideo";

/* Délka videa vychází ze scénáře (časování v timeline.ts). */
const calculateMetadata: CalculateMetadataFunction<TopicVideoProps> = ({ props }) => ({
  durationInFrames: buildTimeline(props.script).total,
  fps: FPS,
});

export function RemotionRoot() {
  const defaultProps: TopicVideoProps = { script: scripts[0] };
  return (
    <>
      <Composition
        id="TopicWide"
        component={TopicVideo}
        width={1920}
        height={1080}
        fps={FPS}
        durationInFrames={buildTimeline(scripts[0]).total}
        defaultProps={defaultProps}
        calculateMetadata={calculateMetadata}
      />
      <Composition
        id="TopicReel"
        component={TopicVideo}
        width={1080}
        height={1920}
        fps={FPS}
        durationInFrames={buildTimeline(scripts[0]).total}
        defaultProps={defaultProps}
        calculateMetadata={calculateMetadata}
      />
    </>
  );
}
