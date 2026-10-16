import { useId, type CSSProperties, type ReactNode } from "react";

/* Čisté SVG kreslení bobra: bez CSS modulu a bez "use client", aby šlo použít i v Remotionu.
   Animační stavy (mrknutí, nádech, mávnutí, ocas) přicházejí zvenčí jako čísla a aplikují se
   inline transformacemi. Web (components/Bobr.tsx) přes ně pouští CSS animace: animace
   v kaskádě přebíjí inline styl, takže na webu vše běží jako dřív. Části mají data-part
   (lid, breath, tail, wave, zzz), aby na ně šlo cílit selektorem. */

export type BobrMood = "neutral" | "surprised" | "thinking" | "happy" | "sleepy";

export type BobrSvgProps = {
  mood?: BobrMood;
  pointing?: boolean;
  size?: number;
  label?: string;
  /** 0 = oči otevřené, 1 = zavřené */
  blink?: number;
  /** 0–1, nádech (tělo se zvětší o 1,5 %) */
  breathe?: number;
  /** 0–1, zdvih ukazující packy s klacíkem (0 = klid, 1 = max. mávnutí) */
  wave?: number;
  /** -1..1, výkyv ocasu */
  tailSwing?: number;
  className?: string;
  style?: CSSProperties;
};

const BREATH_SCALE = 0.015;
const TAIL_DEG = 4;
const WAVE_DEG = 12;

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, Number.isFinite(v) ? v : 0));
}
function clamp01(v: number) {
  return clamp(v, 0, 1);
}

/* Paleta maskota */
const FUR = "#8a5a2b";
const BELLY = "#d9b48a";
const DARK = "#5b3a1e";
const INK = "#000";
const HAT_RIM = "#f3f3f3";
const SUN = "#fec934";
const WOOD = "#a06b34";
const WOOD_CUT = "#ecd3a0";
const LEAF = "#4ca971";
const MOUTH = "#4a1414";
const TONGUE = "#e0786a";
const SW = 3.5; // tloušťka kontury

const MOOD_LABEL: Record<BobrMood, string> = {
  neutral: "s mírným úsměvem",
  surprised: "překvapený",
  thinking: "přemýšlí",
  happy: "má radost",
  sleepy: "je ospalý",
};

/** Oko se zorničkou + víčko pro mrkání (obdélník se scaleY, 0 = otevřené, 1 = zavřené). */
function Eye({
  cx,
  cy,
  rx,
  ry,
  pupil,
  look = [1, 2],
  sleepy = false,
  blink = 0,
}: {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  pupil: number;
  look?: [number, number];
  sleepy?: boolean;
  blink?: number;
}) {
  const px = cx + look[0];
  const py = cy + look[1];
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#fff" stroke={INK} strokeWidth={SW} />
      <circle cx={px} cy={py} r={pupil} fill={INK} />
      <circle cx={px - pupil * 0.35} cy={py - pupil * 0.4} r={pupil * 0.36} fill="#fff" />
      {sleepy ? (
        /* trvale přivřené víčko */
        <g>
          <path
            d={`M ${cx - rx - 2.5} ${cy - ry - 3} H ${cx + rx + 2.5} V ${cy + 1} Q ${cx} ${cy + 4} ${cx - rx - 2.5} ${cy + 1} Z`}
            fill={FUR}
          />
          <path
            d={`M ${cx - rx - 1} ${cy + 1} Q ${cx} ${cy + 4} ${cx + rx + 1} ${cy + 1}`}
            fill="none"
            stroke={INK}
            strokeWidth={SW}
            strokeLinecap="round"
          />
        </g>
      ) : null}
      {/* víčko pro mrkání: obdélník v barvě srsti, scaleY 0 → 1 od horní hrany */}
      <g
        data-part="lid"
        style={{ transformBox: "fill-box", transformOrigin: "50% 0%", transform: `scaleY(${clamp01(blink)})` }}
      >
        <rect x={cx - rx - 3} y={cy - ry - 3} width={(rx + 3) * 2} height={(ry + 3) * 2} fill={FUR} />
        <path
          d={`M ${cx - rx} ${cy + 2} Q ${cx} ${cy + 8} ${cx + rx} ${cy + 2}`}
          fill="none"
          stroke={INK}
          strokeWidth={SW}
          strokeLinecap="round"
        />
      </g>
    </g>
  );
}

/** Zavřené „usměvavé“ oko (oblouček). */
function HappyEye({ cx, cy }: { cx: number; cy: number }) {
  return (
    <path
      d={`M ${cx - 11} ${cy + 4} Q ${cx} ${cy - 10} ${cx + 11} ${cy + 4}`}
      fill="none"
      stroke={INK}
      strokeWidth={4.5}
      strokeLinecap="round"
    />
  );
}

/** Kapsle (ruka/packa) s černou konturou: tlustá černá čára + užší barevná. */
function Limb({ d, width = 17 }: { d: string; width?: number }) {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} stroke={INK} strokeWidth={width + SW * 2} />
      <path d={d} stroke={FUR} strokeWidth={width} />
    </g>
  );
}

function Paw({ cx, cy, r = 9 }: { cx: number; cy: number; r?: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={DARK} stroke={INK} strokeWidth={SW} />
      <path
        d={`M ${cx - r * 0.45} ${cy - r * 0.15} v ${r * 0.55} M ${cx} ${cy - r * 0.25} v ${r * 0.6} M ${cx + r * 0.45} ${cy - r * 0.15} v ${r * 0.55}`}
        stroke={INK}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </g>
  );
}

export function BobrSvg({
  mood = "neutral",
  pointing = false,
  size = 220,
  label,
  blink = 0,
  breathe = 0,
  wave = 0,
  tailSwing = 0,
  className,
  style,
}: BobrSvgProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const tailClip = `bobr-tail-${uid}`;
  const ariaLabel = label ?? `Bobr v pirátském klobouku ${MOOD_LABEL[mood]}${pointing ? " a ukazuje klacíkem" : ""}`;
  const thinking = mood === "thinking";

  /* --- obličej podle nálady --- */
  const L: [number, number] = [93, 97];
  const R: [number, number] = [147, 97];

  let eyes: ReactNode;
  let brows: ReactNode;
  let mouthBack: ReactNode = null; // otevřená pusa (pod zuby)
  let lip: string; // horní pysk

  const browProps = {
    fill: "none",
    stroke: INK,
    strokeWidth: 4.5,
    strokeLinecap: "round" as const,
  };

  switch (mood) {
    case "surprised":
      eyes = (
        <>
          <Eye blink={blink} cx={L[0]} cy={L[1]} rx={13.5} ry={15.5} pupil={5} look={[0, 0]} />
          <Eye blink={blink} cx={R[0]} cy={R[1]} rx={13.5} ry={15.5} pupil={5} look={[0, 0]} />
        </>
      );
      brows = (
        <>
          <path d="M 81 75 Q 92 67 104 73" {...browProps} />
          <path d="M 136 73 Q 148 67 159 75" {...browProps} />
        </>
      );
      mouthBack = <ellipse cx={120} cy={152} rx={13} ry={11.5} fill={MOUTH} stroke={INK} strokeWidth={SW} />;
      lip = "M 104 134 Q 112 140 120 136 Q 128 140 136 134";
      break;
    case "thinking":
      eyes = (
        <>
          <Eye blink={blink} cx={L[0]} cy={L[1]} rx={12} ry={14} pupil={6.5} look={[4, -4]} />
          <Eye blink={blink} cx={R[0]} cy={R[1]} rx={12} ry={14} pupil={6.5} look={[4, -4]} />
        </>
      );
      brows = (
        <>
          <path d="M 81 81 L 104 82" {...browProps} />
          <path d="M 135 76 Q 147 66 160 72" {...browProps} />
        </>
      );
      lip = "M 103 136 Q 112 140 120 136 Q 129 139 139 130";
      break;
    case "happy":
      eyes = (
        <>
          <HappyEye cx={L[0]} cy={L[1]} />
          <HappyEye cx={R[0]} cy={R[1]} />
          <ellipse cx={76} cy={118} rx={8} ry={5} fill="#c8674a" />
          <ellipse cx={164} cy={118} rx={8} ry={5} fill="#c8674a" />
        </>
      );
      brows = (
        <>
          <path d="M 82 78 Q 93 72 104 77" {...browProps} />
          <path d="M 136 77 Q 147 72 158 78" {...browProps} />
        </>
      );
      mouthBack = (
        <g>
          <path d="M 96 133 Q 120 184 144 133 Q 120 141 96 133 Z" fill={MOUTH} stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
          <path d="M 108 154 Q 120 147 132 154 Q 126 160 120 160 Q 114 160 108 154 Z" fill={TONGUE} />
        </g>
      );
      lip = "M 96 133 Q 100 136 104 135 Q 112 140 120 136 Q 128 140 136 135 Q 140 136 144 133";
      break;
    case "sleepy":
      eyes = (
        <>
          <Eye blink={blink} cx={L[0]} cy={L[1]} rx={12} ry={13} pupil={6} look={[0, 4]} sleepy />
          <Eye blink={blink} cx={R[0]} cy={R[1]} rx={12} ry={13} pupil={6} look={[0, 4]} sleepy />
        </>
      );
      brows = (
        <>
          <path d="M 81 81 Q 92 78 104 82" {...browProps} />
          <path d="M 136 82 Q 148 78 159 81" {...browProps} />
        </>
      );
      lip = "M 101 133 Q 104 137 106 136 Q 113 140 120 136 Q 127 140 134 136 Q 136 137 139 133";
      break;
    default:
      eyes = (
        <>
          <Eye blink={blink} cx={L[0]} cy={L[1]} rx={12} ry={14} pupil={6.5} />
          <Eye blink={blink} cx={R[0]} cy={R[1]} rx={12} ry={14} pupil={6.5} />
        </>
      );
      brows = (
        <>
          <path d="M 82 79 Q 93 74 104 78" {...browProps} />
          <path d="M 136 78 Q 147 74 158 79" {...browProps} />
        </>
      );
      lip = "M 97 129 Q 99 136 104 135 Q 112 140 120 136 Q 128 140 136 135 Q 141 136 143 129";
  }

  return (
    <svg
      role="img"
      aria-label={ariaLabel}
      viewBox="0 0 240 260"
      width={size}
      height={Math.round((size * 260) / 240)}
      className={className}
      style={style}
      data-mood={mood}
    >
      <title>{ariaLabel}</title>
      <defs>
        <clipPath id={tailClip}>
          <ellipse cx={0} cy={0} rx={42} ry={17} />
        </clipPath>
      </defs>

      {/* ===== OCAS (za tělem) ===== */}
      <g
        data-part="tail"
        style={{ transformBox: "view-box", transformOrigin: "80px 226px", transform: `rotate(${TAIL_DEG * clamp(tailSwing, -1, 1)}deg)` }}
      >
        <g transform="translate(46 222) rotate(14)">
          <ellipse cx={0} cy={0} rx={42} ry={17} fill={DARK} />
          <g clipPath={`url(#${tailClip})`} stroke={INK} strokeWidth={1.6} opacity={0.55}>
            {[-36, -24, -12, 0, 12, 24, 36].map((x) => (
              <path key={`a${x}`} d={`M ${x - 14} -20 L ${x + 14} 20`} />
            ))}
            {[-36, -24, -12, 0, 12, 24, 36].map((x) => (
              <path key={`b${x}`} d={`M ${x + 14} -20 L ${x - 14} 20`} />
            ))}
          </g>
          <ellipse cx={0} cy={0} rx={42} ry={17} fill="none" stroke={INK} strokeWidth={SW} />
        </g>
      </g>

      {/* ===== NOHY ===== */}
      <g>
        <ellipse cx={92} cy={247} rx={20} ry={8.5} fill={DARK} stroke={INK} strokeWidth={SW} />
        <ellipse cx={148} cy={247} rx={20} ry={8.5} fill={DARK} stroke={INK} strokeWidth={SW} />
        <path d="M 82 244 v 5 M 92 243 v 6 M 102 244 v 5 M 138 244 v 5 M 148 243 v 6 M 158 244 v 5" stroke={INK} strokeWidth={1.8} strokeLinecap="round" />
      </g>

      {/* ===== TĚLO + HLAVA (dýchá) ===== */}
      <g
        data-part="breath"
        style={{ transformBox: "fill-box", transformOrigin: "50% 100%", transform: `scale(${1 + BREATH_SCALE * clamp01(breathe)})` }}
      >
        {/* trup */}
        <path
          d="M 66 244 C 48 205 64 160 120 156 C 176 160 192 205 174 244 Q 120 258 66 244 Z"
          fill={FUR}
          stroke={INK}
          strokeWidth={SW}
          strokeLinejoin="round"
        />
        <ellipse cx={120} cy={210} rx={36} ry={37} fill={BELLY} />

        {/* ruce v klidu */}
        {thinking ? null : (
          <g>
            <Limb d="M 80 180 L 98 213" />
            <Paw cx={99} cy={214} />
          </g>
        )}
        {pointing ? null : (
          <g>
            <Limb d="M 160 180 L 142 213" />
            <Paw cx={141} cy={214} />
          </g>
        )}

        {/* uši */}
        <g>
          <circle cx={66} cy={76} r={13} fill={FUR} stroke={INK} strokeWidth={SW} />
          <circle cx={66} cy={77} r={6} fill={DARK} />
          <circle cx={174} cy={76} r={13} fill={FUR} stroke={INK} strokeWidth={SW} />
          <circle cx={174} cy={77} r={6} fill={DARK} />
        </g>

        {/* hlava */}
        <ellipse cx={120} cy={113} rx={66} ry={56} fill={FUR} stroke={INK} strokeWidth={SW} />

        {/* čenich */}
        <ellipse cx={120} cy={140} rx={36} ry={25} fill={BELLY} stroke={INK} strokeWidth={2.5} />
        {/* tečky vousků */}
        <g fill={DARK}>
          <circle cx={97} cy={134} r={1.8} />
          <circle cx={92} cy={141} r={1.8} />
          <circle cx={99} cy={144} r={1.8} />
          <circle cx={143} cy={134} r={1.8} />
          <circle cx={148} cy={141} r={1.8} />
          <circle cx={141} cy={144} r={1.8} />
        </g>

        {/* pusa */}
        {mouthBack}
        {/* zuby */}
        <g>
          <path
            d="M 110.5 136 H 129.5 V 148 Q 129.5 152 125.5 152 H 114.5 Q 110.5 152 110.5 148 Z"
            fill="#fff"
            stroke={INK}
            strokeWidth={3}
            strokeLinejoin="round"
          />
          <path d="M 120 137 V 151.5" stroke={INK} strokeWidth={2.2} />
        </g>
        {/* horní pysk */}
        <path d={lip} fill="none" stroke={INK} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
        {/* nos */}
        <path d="M 107 120 Q 120 113 133 120 Q 133 129 120 131 Q 107 129 107 120 Z" fill="#24150a" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
        <ellipse cx={114} cy={120} rx={3.2} ry={2} fill="#fff" opacity={0.85} />
        <path d="M 120 131 V 136" stroke={INK} strokeWidth={3} strokeLinecap="round" />

        {/* oči + obočí */}
        {eyes}
        {brows}

        {/* packa u brady (přemýšlí) */}
        {thinking ? (
          <g>
            <Limb d="M 80 180 L 90 210 L 106 172" />
            <Paw cx={107} cy={168} r={10} />
          </g>
        ) : null}

        {/* ===== TŘÍROHÝ KLOBOUK ===== */}
        <g strokeLinejoin="round">
          {/* světlý lem: podkladová kontura, aby klobouk nezmizel na tmavém pozadí */}
          <g fill="none" stroke={HAT_RIM} strokeWidth={SW + 4}>
            <path d="M 80 52 C 82 4 158 4 160 52 Z" />
            <path d="M 36 53 Q 60 28 92 39 Q 120 23 148 39 Q 180 28 204 53 Q 170 58 142 64 Q 128 68 120 82 Q 112 68 98 64 Q 70 58 36 53 Z" />
          </g>
          {/* koruna */}
          <path d="M 80 52 C 82 4 158 4 160 52 Z" fill={INK} stroke={INK} strokeWidth={SW} />
          {/* krempa */}
          <path
            d="M 36 53 Q 60 28 92 39 Q 120 23 148 39 Q 180 28 204 53 Q 170 58 142 64 Q 128 68 120 82 Q 112 68 98 64 Q 70 58 36 53 Z"
            fill={INK}
            stroke={INK}
            strokeWidth={SW}
          />
          {/* žlutý prýmek podél horní hrany krempy */}
          <path
            d="M 44 51 Q 62 34 92 44 Q 120 29 148 44 Q 178 34 196 51"
            fill="none"
            stroke={SUN}
            strokeWidth={2.6}
            strokeLinecap="round"
          />
          {/* lebka se zkříženými hnáty */}
          <g>
            <g stroke="#fff" strokeWidth={2.6} strokeLinecap="round">
              <path d="M 110 47 L 130 64" />
              <path d="M 130 47 L 110 64" />
            </g>
            <g fill="#fff">
              <circle cx={109.5} cy={46} r={2} />
              <circle cx={108} cy={48.5} r={2} />
              <circle cx={130.5} cy={46} r={2} />
              <circle cx={132} cy={48.5} r={2} />
              <circle cx={109.5} cy={65} r={2} />
              <circle cx={108} cy={62.5} r={2} />
              <circle cx={130.5} cy={65} r={2} />
              <circle cx={132} cy={62.5} r={2} />
              <circle cx={120} cy={52} r={7.5} />
              <rect x={115.5} y={55} width={9} height={6.5} rx={1.5} />
            </g>
            <g fill={INK}>
              <circle cx={117} cy={52} r={2} />
              <circle cx={123} cy={52} r={2} />
              <path d="M 120 55.5 l -1.2 2 h 2.4 Z" />
            </g>
          </g>
        </g>

        {/* ===== UKAZUJÍCÍ PACKA S KLACÍKEM ===== */}
        {pointing ? (
          <g
            data-part="wave"
            style={{ transformBox: "view-box", transformOrigin: "160px 182px", transform: `rotate(${-WAVE_DEG * clamp01(wave)}deg)` }}
          >
            <Limb d="M 160 182 L 196 136" />
            <g transform="translate(198 134) rotate(-62)">
              {/* klacík s větvičkou */}
              <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M -16 0 L 62 0 M 26 0 L 36 -11" stroke={INK} strokeWidth={7 + SW * 2} />
                <path d="M -16 0 L 62 0 M 26 0 L 36 -11" stroke={WOOD} strokeWidth={7} />
              </g>
              {/* ohlodaný konec: světlé dřevo se zuby po hlodání */}
              <path
                d="M 60 -6.5 L 64 -7 L 66 -4 L 69 -5.5 L 71 -2.5 L 74 -3 L 76 0 L 74 3 L 71 2.5 L 69 5.5 L 66 4 L 64 7 L 60 6.5 Z"
                fill={WOOD_CUT}
                stroke={INK}
                strokeWidth={2.4}
                strokeLinejoin="round"
              />
              <path d="M 66 -1.5 L 70 0 L 66 1.5" fill="none" stroke={WOOD} strokeWidth={1.4} strokeLinecap="round" />
              {/* lístek na větvičce */}
              <path d="M 36 -11 Q 36 -24 48 -27 Q 48 -14 36 -11 Z" fill={LEAF} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
              {/* kůra */}
              <path d="M 8 -1.5 h 7 M 44 1.5 h 6" stroke={INK} strokeWidth={1.4} strokeLinecap="round" />
            </g>
            <Paw cx={198} cy={134} r={10} />
          </g>
        ) : null}

        {/* ospalé Zzz */}
        {mood === "sleepy" ? (
          <g fill="none" strokeLinecap="round" strokeLinejoin="round" data-part="zzz">
            <path d="M 196 22 h 10 l -10 11 h 10 M 212 8 h 7 l -7 8 h 7" stroke={HAT_RIM} strokeWidth={6} />
            <path d="M 196 22 h 10 l -10 11 h 10 M 212 8 h 7 l -7 8 h 7" stroke={INK} strokeWidth={2.6} />
          </g>
        ) : null}
      </g>
    </svg>
  );
}

export default BobrSvg;
