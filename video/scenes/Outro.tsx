import type { VideoScript } from "../../lib/topics";
import { C, F } from "../theme";
import { Body, TextArea, rise, useEnter, useLayout } from "../ui";

/* 6) Outro: „Česko má na víc!“, adresa webu. Garant mává na rozloučenou. */
const DEFAULT_OUTRO = "Celá strategie a plné znění: manavic.pirati.cz";

export function Outro({ script, beats }: { script: VideoScript; beats: number[] }) {
  const L = useLayout();
  const logo = useEnter(beats[0], 12);
  const line = useEnter(beats[1]);
  const tag = useEnter(beats[2]);
  const text = script.outro ?? DEFAULT_OUTRO;
  const m = text.match(/^(.*?):?\s*((?:https?:\/\/)?[\w-]+(?:\.[\w-]+)+\S*)$/);
  const label = m ? m[1].trim() : text;
  const url = m ? m[2] : null;
  const logoSize = L.reel ? 150 : 168;
  return (
    <TextArea>
      <div
        style={{
          ...rise(logo, 50),
          fontFamily: F.display,
          fontSize: logoSize,
          lineHeight: 0.92,
          textTransform: "uppercase",
          color: C.ink,
          whiteSpace: L.reel ? "normal" : "nowrap",
        }}
      >
        Česko má <span style={{ background: C.sun, padding: "0.06em 0.12em 0" }}>na víc!</span>
      </div>
      <div style={{ ...rise(line), display: "flex", flexDirection: "column", gap: 18, alignItems: L.reel ? "center" : "flex-start" }}>
        <Body>{label}{url ? ":" : ""}</Body>
        {url ? (
          <div
            style={{
              fontFamily: F.body,
              fontWeight: 700,
              fontSize: Math.round(L.fs.base * 1.2),
              lineHeight: 1,
              color: "#fff",
              background: C.cyan,
              padding: "0.32em 0.6em 0.34em",
              borderRadius: 999,
            }}
          >
            {url}
          </div>
        ) : null}
      </div>
      <Body size={L.fs.small} style={{ ...rise(tag), color: C.muted }}>
        Hospodářská strategie Pirátů
      </Body>
    </TextArea>
  );
}
