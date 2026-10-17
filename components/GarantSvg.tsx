import type { CSSProperties, ReactNode } from "react";
import { GARANTI, type GarantId, type GarantMood, type Mluvci, type Vzhled } from "@/lib/garanti";

/* Čisté SVG kreslení garantů kapitol (osm členů PEER v pirátském klobouku), náhrada bobra.
   Bez CSS modulu a bez "use client", aby šlo použít i v Remotionu. Stejný
   viewBox 0 0 240 260 a stejná stopa (klobouk nahoře, spodek postavy dole), takže se rozložení
   videa nehne. Animační stavy (mrknutí, nádech, mávnutí ukazovátkem) přicházejí zvenčí jako čísla
   a aplikují se inline transformacemi; části mají data-part (lid, breath, wave, zzz), web
   (components/Garant.tsx) přes ně pouští CSS animace, které inline styl v kaskádě přebijí.
   Každý člověk se kreslí z parametrů v lib/garanti.ts (účes, barvy, brýle, vousy, svršek).
   kdo="rada" je skupina všech osmi ve dvou řadách. */

export type { GarantMood, Mluvci };

export type GarantSvgProps = {
  kdo: Mluvci;
  mood?: GarantMood;
  /** pravá ruka zdvižená s ukazovátkem (u rady ukazuje jen člověk vpředu uprostřed) */
  pointing?: boolean;
  size?: number;
  label?: string;
  /** 0 = oči otevřené, 1 = zavřené */
  blink?: number;
  /** 0–1, nádech (tělo se zvětší o 1,5 % od spodku) */
  breathe?: number;
  /** 0–1, zdvih ruky s ukazovátkem (0 = klid, 1 = max. mávnutí) */
  wave?: number;
  className?: string;
  style?: CSSProperties;
};

const BREATH_SCALE = 0.015;
const WAVE_DEG = 12;

function clamp01(v: number) {
  return Math.min(1, Math.max(0, Number.isFinite(v) ? v : 0));
}

/* Paleta (stejná jako u bobra) */
const INK = "#000";
const HAT_RIM = "#f3f3f3";
const SUN = "#fec934";
const MOUTH = "#4a1414";
const TONGUE = "#e0786a";
const BLUSH = "#e59a84";
const STICK = "#2b2b2b";
const STICK_TIP = "#9c9c9c";
const SW = 3.5; // tloušťka kontury

const MOOD_LABEL: Record<GarantMood, [string, string]> = {
  neutral: ["s mírným úsměvem", "s mírným úsměvem"],
  surprised: ["překvapený", "překvapená"],
  thinking: ["přemýšlí", "přemýšlí"],
  happy: ["má radost", "má radost"],
  sleepy: ["je ospalý", "je ospalá"],
};

const stroke = { stroke: INK, strokeWidth: SW, strokeLinejoin: "round" as const };

/* ---------- oči ---------- */

/** Oko se zorničkou + víčko v barvě pleti (obdélník se scaleY, 0 = otevřené, 1 = zavřené). */
function Eye({
  cx,
  cy,
  rx,
  ry,
  pupil,
  skin,
  look = [0.5, 1.5],
  sleepy = false,
  blink = 0,
}: {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  pupil: number;
  skin: string;
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
            d={`M ${cx - rx - 2.5} ${cy - ry - 3} H ${cx + rx + 2.5} V ${cy + 1} Q ${cx} ${cy + 3.5} ${cx - rx - 2.5} ${cy + 1} Z`}
            fill={skin}
          />
          <path
            d={`M ${cx - rx - 1} ${cy + 1} Q ${cx} ${cy + 3.5} ${cx + rx + 1} ${cy + 1}`}
            fill="none"
            stroke={INK}
            strokeWidth={SW}
            strokeLinecap="round"
          />
        </g>
      ) : null}
      {/* víčko pro mrkání: obdélník v barvě pleti, scaleY 0 → 1 od horní hrany */}
      <g
        data-part="lid"
        style={{ transformBox: "fill-box", transformOrigin: "50% 0%", transform: `scaleY(${clamp01(blink)})` }}
      >
        <rect x={cx - rx - 3} y={cy - ry - 3} width={(rx + 3) * 2} height={(ry + 3) * 2} fill={skin} />
        <path
          d={`M ${cx - rx} ${cy + 1} Q ${cx} ${cy + 6} ${cx + rx} ${cy + 1}`}
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
      d={`M ${cx - 9.5} ${cy + 3} Q ${cx} ${cy - 9} ${cx + 9.5} ${cy + 3}`}
      fill="none"
      stroke={INK}
      strokeWidth={4.5}
      strokeLinecap="round"
    />
  );
}

/** Kapsle (rukáv) s černou konturou: tlustá černá čára + užší barevná. */
function Limb({ d, color, width = 21 }: { d: string; color: string; width?: number }) {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} stroke={INK} strokeWidth={width + SW * 2} />
      <path d={d} stroke={color} strokeWidth={width} />
    </g>
  );
}

/** Ruka: dlaň s naznačeným palcem. */
function Hand({ cx, cy, skin, r = 11, thumb = 1 }: { cx: number; cy: number; skin: string; r?: number; thumb?: 1 | -1 }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={skin} {...stroke} />
      <path d={`M ${cx + thumb * r * 0.15} ${cy - r * 0.55} q ${thumb * r * 0.45} ${r * 0.2} ${thumb * r * 0.5} ${r * 0.75}`} fill="none" stroke={INK} strokeWidth={1.8} strokeLinecap="round" opacity={0.55} />
    </g>
  );
}

/* ---------- klobouk (stejná data cesty jako u bobra) ---------- */

function Hat() {
  return (
    <g strokeLinejoin="round">
      {/* světlý lem: podkladová kontura, aby klobouk nezmizel na tmavém pozadí */}
      <g fill="none" stroke={HAT_RIM} strokeWidth={SW + 4}>
        <path d="M 80 52 C 82 4 158 4 160 52 Z" />
        <path d="M 36 53 Q 60 28 92 39 Q 120 23 148 39 Q 180 28 204 53 Q 170 58 142 64 Q 128 68 120 82 Q 112 68 98 64 Q 70 58 36 53 Z" />
      </g>
      <path d="M 80 52 C 82 4 158 4 160 52 Z" fill={INK} stroke={INK} strokeWidth={SW} />
      <path
        d="M 36 53 Q 60 28 92 39 Q 120 23 148 39 Q 180 28 204 53 Q 170 58 142 64 Q 128 68 120 82 Q 112 68 98 64 Q 70 58 36 53 Z"
        fill={INK}
        stroke={INK}
        strokeWidth={SW}
      />
      <path d="M 44 51 Q 62 34 92 44 Q 120 29 148 44 Q 178 34 196 51" fill="none" stroke={SUN} strokeWidth={2.6} strokeLinecap="round" />
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
  );
}

function Zzz() {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round" data-part="zzz">
      <path d="M 196 22 h 10 l -10 11 h 10 M 212 8 h 7 l -7 8 h 7" stroke={HAT_RIM} strokeWidth={6} />
      <path d="M 196 22 h 10 l -10 11 h 10 M 212 8 h 7 l -7 8 h 7" stroke={INK} strokeWidth={2.6} />
    </g>
  );
}

/* ---------- hlava ---------- */

/* Obličej: temeno ~62 (pod kloboukem), brada ~178, boky 64–176. */
const HEAD = "M 64 108 Q 64 70 120 62 Q 176 70 176 108 Q 179 152 152 170 Q 120 186 88 170 Q 61 152 64 108 Z";
const HEAD_ROUND = "M 61 110 Q 62 68 120 62 Q 178 68 179 110 Q 182 156 152 174 Q 120 188 88 174 Q 58 156 61 110 Z";

/** Vlasy za hlavou a za rameny (jen dlouhé účesy). */
function HairBack({ v }: { v: Vzhled }) {
  const s = { fill: v.hairColor, ...stroke };
  if (v.hair === "long")
    return (
      <path
        d="M 56 112 Q 50 56 120 52 Q 190 56 184 112 Q 188 168 190 226 Q 176 232 162 226 Q 170 176 168 126 Q 172 90 120 82 Q 68 90 72 126 Q 70 176 78 226 Q 64 232 50 226 Q 52 168 56 112 Z"
        {...s}
      />
    );
  if (v.hair === "shoulder")
    return (
      <path
        d="M 54 112 Q 48 56 120 52 Q 192 56 186 112 Q 196 140 186 162 Q 198 182 184 204 Q 172 212 160 204 Q 170 186 164 168 Q 174 140 168 124 Q 172 90 120 82 Q 68 90 72 124 Q 66 140 76 168 Q 70 186 80 204 Q 68 212 56 204 Q 42 182 54 162 Q 44 140 54 112 Z"
        {...s}
      />
    );
  return null;
}

/** Pramen vlasů přes rameno (vpředu, ale pod hlavou). */
function HairFrontLocks({ v }: { v: Vzhled }) {
  if (v.hair !== "long") return null;
  const s = { fill: v.hairColor, ...stroke };
  return (
    <g>
      <path d="M 66 132 Q 62 182 70 232 Q 82 236 92 230 Q 82 186 84 150 Z" {...s} />
      <path d="M 174 132 Q 178 182 170 232 Q 158 236 148 230 Q 158 186 156 150 Z" {...s} />
      <path d="M 72 170 q 2 26 8 50 M 168 170 q -2 26 -8 50" fill="none" stroke={INK} strokeWidth={1.8} opacity={0.35} strokeLinecap="round" />
    </g>
  );
}

/** Vlasy na hlavě (přes obličej po stranách a do čela, pod kloboukem). */
function HairTop({ v }: { v: Vzhled }) {
  const s = { fill: v.hairColor, ...stroke };
  const strand = { fill: "none", stroke: INK, strokeWidth: 1.8, opacity: 0.4, strokeLinecap: "round" as const };
  switch (v.hair) {
    case "bald":
      /* holá hlava pod kloboukem: krátké vlasy jen nad ušima */
      return (
        <g>
          <path d="M 63 98 Q 62 84 74 76 Q 68 96 70 118 Q 64 116 63 98 Z" {...s} />
          <path d="M 177 98 Q 178 84 166 76 Q 172 96 170 118 Q 176 116 177 98 Z" {...s} />
        </g>
      );
    case "short":
      return (
        <g>
          <path d="M 59 116 Q 56 62 120 56 Q 184 62 181 116 L 174 116 Q 175 86 156 80 Q 120 70 84 80 Q 65 86 66 116 Z" {...s} />
          <path d="M 64 100 q 1 -10 6 -16 M 176 100 q -1 -10 -6 -16" {...strand} />
        </g>
      );
    case "swept":
      /* sčesané dozadu s objemem nad spánky */
      return (
        <g>
          <path d="M 57 120 Q 50 60 120 54 Q 190 60 183 120 L 174 118 Q 177 92 160 82 Q 120 68 80 82 Q 63 92 66 118 Z" {...s} />
          <path d="M 70 90 Q 76 76 96 70 M 144 70 Q 164 76 170 90 M 66 104 q 2 -12 10 -20 M 174 104 q -2 -12 -10 -20" {...strand} />
        </g>
      );
    case "fringe":
      /* krátké vlasy + ofina přes čelo, zpod klobouku */
      return (
        <g>
          <path d="M 59 116 Q 56 62 120 56 Q 184 62 181 116 L 174 116 Q 175 86 156 80 Q 120 70 84 80 Q 65 86 66 116 Z" {...s} />
          <path
            d="M 66 106 Q 63 70 120 64 Q 177 70 174 106 Q 170 94 162 88 Q 154 97 145 88 Q 135 99 125 89 Q 115 99 105 89 Q 95 97 86 88 Q 72 94 66 106 Z"
            {...s}
          />
        </g>
      );
    case "long":
      /* pěšinka uprostřed (schovaná pod špicí klobouku), vlasy rámují čelo */
      return (
        <path
          d="M 63 128 Q 58 72 120 66 Q 182 72 177 128 Q 172 100 158 90 Q 138 80 120 84 Q 102 80 82 90 Q 68 100 63 128 Z"
          {...s}
        />
      );
    case "shoulder":
      return (
        <g>
          <path
            d="M 62 126 Q 56 72 120 66 Q 184 72 178 126 Q 174 102 162 92 Q 142 80 124 86 Q 108 80 88 88 Q 68 98 62 126 Z"
            {...s}
          />
          <path d="M 76 98 q 10 -8 24 -10 M 140 88 q 14 2 24 12" {...strand} />
        </g>
      );
    default:
      return null;
  }
}

function Beard({ v }: { v: Vzhled }) {
  if (!v.beard) return null;
  const B = v.beard.color;
  const s = { fill: B, ...stroke };
  const moustache = (
    <path d="M 120 140 Q 112 135.5 104 140 Q 100 143 100.5 147.5 Q 108 142.5 120 143.5 Q 132 142.5 139.5 147.5 Q 140 143 136 140 Q 128 135.5 120 140 Z" fill={B} stroke={INK} strokeWidth={1.8} strokeOpacity={0.6} strokeLinejoin="round" />
  );
  switch (v.beard.style) {
    case "full":
      return (
        <g>
          <path d="M 66 124 Q 70 172 120 184 Q 170 172 174 124 Q 160 150 120 152 Q 80 150 66 124 Z" {...s} />
          {moustache}
        </g>
      );
    case "short":
      /* krátký plnovous podél čelisti + knír */
      return (
        <g>
          <path d="M 68 128 Q 72 172 120 182 Q 168 172 172 128 Q 166 150 150 158 Q 136 164 120 162 Q 104 164 90 158 Q 74 150 68 128 Z" {...s} />
          {moustache}
        </g>
      );
    case "goatee":
      /* bradka s knírem */
      return (
        <g>
          <path d="M 102 158 Q 104 182 120 184 Q 136 182 138 158 Q 128 164 120 164 Q 112 164 102 158 Z" {...s} />
          {moustache}
        </g>
      );
    case "stubble":
      return <path d="M 72 136 Q 80 172 120 180 Q 160 172 168 136 Q 154 158 120 160 Q 86 158 72 136 Z" fill={B} opacity={0.35} />;
  }
}

function Glasses({ v }: { v: Vzhled }) {
  if (!v.glasses) return null;
  const dark = v.glasses === "dark";
  return (
    <g fill="none" stroke={dark ? INK : "#555"} strokeWidth={dark ? 4.2 : 2.6} strokeLinejoin="round">
      <rect x={80} y={91} width={34} height={26} rx={8} fill="#fff" fillOpacity={0.12} />
      <rect x={126} y={91} width={34} height={26} rx={8} fill="#fff" fillOpacity={0.12} />
      <path d="M 114 102 Q 120 98 126 102 M 80 100 L 66 96 M 160 100 L 174 96" strokeLinecap="round" />
    </g>
  );
}

/* ---------- trup ---------- */

/* Výstřih: V (košile, sako), kulatý (kardigan s topem), rovný (rolák). bottom = spodní hrana. */
function bodyPath(neck: "v" | "scoop" | "flat", bottom: number) {
  const top =
    neck === "v"
      ? "C 55 204 84 190 104 188 L 120 207 L 136 188"
      : neck === "scoop"
        ? "C 55 204 84 190 102 189 Q 120 204 138 189"
        : "C 55 204 84 190 104 188 Q 120 190 136 188";
  return `M 52 ${bottom} L 52 256 ${top} C 156 190 185 204 188 256 L 188 ${bottom} Z`;
}

function Torso({ v, bottom }: { v: Vzhled; bottom: number }) {
  const t = v.top;
  const shirt = t.shirt ?? "#fff";
  switch (t.style) {
    case "turtleneck":
      return (
        <g>
          <path d={bodyPath("flat", bottom)} fill={t.color} {...stroke} />
          <path d="M 100 176 Q 120 184 140 176 L 142 196 Q 120 204 98 196 Z" fill={t.color} {...stroke} />
          <path d="M 106 182 v 14 M 113 184 v 14 M 120 185 v 14 M 127 184 v 14 M 134 182 v 14" stroke={HAT_RIM} strokeWidth={1.2} opacity={0.35} />
        </g>
      );
    case "shirt":
      /* košile s límečkem a légou */
      return (
        <g>
          <path d={bodyPath("v", bottom)} fill={t.color} {...stroke} />
          <path d={`M 120 207 V ${bottom}`} stroke={INK} strokeWidth={2} opacity={0.6} />
          <g fill={HAT_RIM} opacity={0.75}>
            <circle cx={124.5} cy={222} r={1.8} />
            <circle cx={124.5} cy={240} r={1.8} />
          </g>
          <path d="M 103 186 L 119 206 L 98 203 L 94 192 Z" fill={t.color} {...stroke} strokeWidth={2.6} />
          <path d="M 137 186 L 121 206 L 142 203 L 146 192 Z" fill={t.color} {...stroke} strokeWidth={2.6} />
        </g>
      );
    case "cardigan":
      /* top s kulatým výstřihem + rozepnutý kardigan */
      return (
        <g>
          <path d={bodyPath("scoop", bottom)} fill={shirt} {...stroke} />
          <path d="M 96 214 q 12 6 24 0 q 12 6 24 0 M 98 232 q 11 6 22 0 q 11 6 22 0" fill="none" stroke={HAT_RIM} strokeWidth={1.6} opacity={0.5} />
          <path d={`M 52 ${bottom} L 52 256 C 55 204 82 190 96 190 Q 98 230 104 ${bottom} Z`} fill={t.color} {...stroke} />
          <path d={`M 188 ${bottom} L 188 256 C 185 204 158 190 144 190 Q 142 230 136 ${bottom} Z`} fill={t.color} {...stroke} />
        </g>
      );
    default:
      /* sako přes košili */
      return (
        <g>
          <path d={bodyPath("v", bottom)} fill={shirt} {...stroke} />
          <path d={`M 52 ${bottom} L 52 256 C 55 204 84 190 104 188 L 120 238 L 106 ${Math.max(256, bottom)} Z`} fill={t.color} {...stroke} />
          <path d={`M 188 ${bottom} L 188 256 C 185 204 156 190 136 188 L 120 238 L 134 ${Math.max(256, bottom)} Z`} fill={t.color} {...stroke} />
          <path d="M 104 188 L 95 210 L 120 238 M 136 188 L 145 210 L 120 238" fill="none" stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
          {/* límeček košile */}
          <path d="M 104 187 L 119 206 L 101 202 Z" fill={shirt} {...stroke} strokeWidth={2.4} />
          <path d="M 136 187 L 121 206 L 139 202 Z" fill={shirt} {...stroke} strokeWidth={2.4} />
        </g>
      );
  }
}

/** Barva rukávu = barva svršku (u kardiganu kardigan, u saka sako). */
function sleeveColor(v: Vzhled) {
  return v.top.color;
}

/* ---------- jedna postava ---------- */

type PostavaProps = {
  v: Vzhled;
  mood: GarantMood;
  pointing: boolean;
  blink: number;
  wave: number;
  /** spodní hrana trupu (u zadní řady rady delší, schová se za přední řadu) */
  bottom?: number;
  /** o kolik stupňů výš zvednout ukazovátko (rada, aby nemířilo souseda do obličeje) */
  tilt?: number;
  /** délka ukazovátka od dlaně */
  stick?: number;
  /** bez rukou v klidu (zadní řada rady, ruce jsou schované za přední řadou) */
  noArms?: boolean;
};

function Postava({ v, mood, pointing, blink, wave, bottom = 256, tilt = 0, stick = 60, noArms = false }: PostavaProps) {
  const skin = v.skin;
  const brow = v.browColor ?? v.hairColor;
  const thinking = mood === "thinking";
  const sleeve = sleeveColor(v);
  const L: [number, number] = [97, 104];
  const R: [number, number] = [143, 104];

  let eyes: ReactNode;
  let brows: [string, string];
  let mouth: ReactNode;

  switch (mood) {
    case "surprised":
      eyes = (
        <>
          <Eye blink={blink} skin={skin} cx={L[0]} cy={L[1]} rx={10.5} ry={12} pupil={4.5} look={[0, 0]} />
          <Eye blink={blink} skin={skin} cx={R[0]} cy={R[1]} rx={10.5} ry={12} pupil={4.5} look={[0, 0]} />
        </>
      );
      brows = ["M 86 80 Q 97 72 108 77", "M 132 77 Q 143 72 154 80"];
      mouth = <ellipse cx={120} cy={154} rx={7.5} ry={9} fill={MOUTH} {...stroke} />;
      break;
    case "thinking":
      eyes = (
        <>
          <Eye blink={blink} skin={skin} cx={L[0]} cy={L[1]} rx={9} ry={10} pupil={5} look={[3, -3.5]} />
          <Eye blink={blink} skin={skin} cx={R[0]} cy={R[1]} rx={9} ry={10} pupil={5} look={[3, -3.5]} />
        </>
      );
      brows = ["M 86 87 L 108 87", "M 132 80 Q 143 71 155 77"];
      mouth = <path d="M 109 153 Q 119 155 132 147" fill="none" stroke={INK} strokeWidth={SW} strokeLinecap="round" />;
      break;
    case "happy":
      eyes = (
        <>
          <HappyEye cx={L[0]} cy={L[1]} />
          <HappyEye cx={R[0]} cy={R[1]} />
          <ellipse cx={80} cy={128} rx={7} ry={4} fill={BLUSH} opacity={0.85} />
          <ellipse cx={160} cy={128} rx={7} ry={4} fill={BLUSH} opacity={0.85} />
        </>
      );
      brows = ["M 86 83 Q 97 78 108 82", "M 132 82 Q 143 78 154 83"];
      mouth = (
        <g>
          <path d="M 100 145 Q 120 174 140 145 Q 120 151 100 145 Z" fill={MOUTH} {...stroke} />
          <path d="M 110 160 Q 120 155 130 160 Q 125 164.5 120 164.5 Q 115 164.5 110 160 Z" fill={TONGUE} />
          <path d="M 103.5 146.5 Q 120 151.5 136.5 146.5 L 134.5 152 Q 120 156 105.5 152 Z" fill="#fff" />
          <path d="M 100 145 Q 120 174 140 145 Q 120 151 100 145 Z" fill="none" {...stroke} />
        </g>
      );
      break;
    case "sleepy":
      eyes = (
        <>
          <Eye blink={blink} skin={skin} cx={L[0]} cy={L[1]} rx={9} ry={10} pupil={5} look={[0, 3]} sleepy />
          <Eye blink={blink} skin={skin} cx={R[0]} cy={R[1]} rx={9} ry={10} pupil={5} look={[0, 3]} sleepy />
        </>
      );
      brows = ["M 86 88 Q 97 85 108 86", "M 132 86 Q 143 85 154 88"];
      mouth = <path d="M 112 151 Q 120 154 128 151" fill="none" stroke={INK} strokeWidth={SW} strokeLinecap="round" />;
      break;
    default:
      eyes = (
        <>
          <Eye blink={blink} skin={skin} cx={L[0]} cy={L[1]} rx={9} ry={10} pupil={5} />
          <Eye blink={blink} skin={skin} cx={R[0]} cy={R[1]} rx={9} ry={10} pupil={5} />
        </>
      );
      brows = ["M 86 85 Q 97 81 108 84", "M 132 84 Q 143 81 154 85"];
      mouth = <path d="M 107 148 Q 120 157 133 148" fill="none" stroke={INK} strokeWidth={SW} strokeLinecap="round" />;
  }

  return (
    <g>
      <HairBack v={v} />

      {/* krk (za trupem, ukazuje se ve výstřihu) */}
      <path d="M 105 156 V 204 H 135 V 156 Z" fill={skin} {...stroke} />
      <Torso v={v} bottom={bottom} />

      {/* ruce v klidu */}
      {thinking || noArms ? null : (
        <g>
          <Limb d="M 78 206 L 94 236" color={sleeve} />
          <Hand cx={95} cy={238} skin={skin} />
        </g>
      )}
      {pointing || noArms ? null : (
        <g>
          <Limb d="M 162 206 L 146 236" color={sleeve} />
          <Hand cx={145} cy={238} skin={skin} thumb={-1} />
        </g>
      )}

      <HairFrontLocks v={v} />

      {/* uši */}
      <g>
        <ellipse cx={62} cy={114} rx={10} ry={13} fill={skin} {...stroke} />
        <path d="M 60 107 q 5 6 0 13" fill="none" stroke={INK} strokeWidth={1.8} strokeLinecap="round" opacity={0.45} />
        <ellipse cx={178} cy={114} rx={10} ry={13} fill={skin} {...stroke} />
        <path d="M 180 107 q -5 6 0 13" fill="none" stroke={INK} strokeWidth={1.8} strokeLinecap="round" opacity={0.45} />
      </g>

      {/* hlava */}
      <path d={v.round ? HEAD_ROUND : HEAD} fill={skin} {...stroke} />
      <HairTop v={v} />
      {v.age ? (
        <g fill="none" stroke={INK} strokeWidth={1.6} opacity={0.35} strokeLinecap="round">
          <path d="M 80 130 q 4 9 11 11 M 160 130 q -4 9 -11 11" />
        </g>
      ) : null}
      <Beard v={v} />

      {/* nos */}
      <path d="M 118 112 Q 110 133 122 135" fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" />
      {/* pusa */}
      {mouth}
      {/* oči + obočí */}
      {eyes}
      <g fill="none" stroke={brow} strokeWidth={4.5} strokeLinecap="round">
        <path d={brows[0]} />
        <path d={brows[1]} />
      </g>
      <Glasses v={v} />

      {/* ruka u brady (přemýšlí) */}
      {thinking ? (
        <g>
          <Limb d="M 78 206 L 86 232 L 102 194" color={sleeve} />
          <Hand cx={103} cy={188} skin={skin} r={11.5} />
        </g>
      ) : null}

      <Hat />

      {/* ===== UKAZUJÍCÍ RUKA S UKAZOVÁTKEM ===== */}
      {pointing ? (
        <g
          data-part="wave"
          style={{ transformBox: "view-box", transformOrigin: "160px 194px", transform: `rotate(${-WAVE_DEG * clamp01(wave)}deg)` }}
        >
          <g transform={tilt ? `rotate(${-tilt} 160 194)` : undefined}>
            <Limb d="M 160 194 L 196 146" color={sleeve} />
            <g transform="translate(198 144) rotate(-62)">
              <g fill="none" strokeLinecap="round">
                <path d={`M -10 0 L ${stick - 4} 0`} stroke={INK} strokeWidth={7 + SW * 2} />
                <path d={`M -10 0 L ${stick - 4} 0`} stroke={STICK} strokeWidth={7} />
                <path d={`M ${stick - 20} 0 L ${stick - 4} 0`} stroke={STICK_TIP} strokeWidth={5} />
              </g>
              <circle cx={stick} cy={0} r={5} fill={SUN} stroke={INK} strokeWidth={2.2} />
            </g>
            <Hand cx={198} cy={144} skin={skin} />
          </g>
        </g>
      ) : null}
    </g>
  );
}

/* ---------- rada: osm lidí ve dvou řadách ---------- */

/* Dvě řady po čtyřech, přesazené o půl rozestupu (cik-cak): zadní řada výš a s delším trupem,
   který se schová za přední řadu. Měřítko 0,42 je maximum, při kterém se čtyři klobouky
   vejdou do šířky 240. Ukazuje jen druhý zleva v přední řadě („vpředu uprostřed“). */
const RADA_S = 0.42;
const RADA_STEP = 23.5; // půl rozestupu hlav v řadě
const RADA_ZADNI: GarantId[] = ["kriz", "damborsky", "vislous", "pavlovic"];
const RADA_PREDNI: GarantId[] = ["freitas", "dusek", "nislerova", "hlavenka"];
const RADA_UKAZUJE = 1; // index v přední řadě
const RADA_ZADNI_Y = 48; // horní hrana zadní řady (souřadnice viewBoxu)
/* trup zadní řady sahá až ke spodku viewBoxu: na krajích je vidět, jako by stáli za ostatními */
const RADA_ZADNI_SPODEK = (260 - RADA_ZADNI_Y) / RADA_S;
const RADA_PREDNI_Y = 256 - 256 * RADA_S;

function radaX(i: number) {
  return 120 + (i - 3.5) * RADA_STEP;
}

function Clen({
  id,
  x,
  y,
  ...rest
}: { id: GarantId; x: number; y: number } & Omit<PostavaProps, "v">) {
  /* vnořené <svg> = vlastní viewport, takže transform-origin "view-box" ukazovátka sedí na postavu */
  return (
    <svg
      x={x - 120 * RADA_S}
      y={y}
      width={240 * RADA_S}
      height={260 * RADA_S}
      viewBox="0 0 240 260"
      overflow="visible"
    >
      <Postava v={GARANTI[id].vzhled} {...rest} />
    </svg>
  );
}

function Rada({ mood, pointing, blink, wave }: { mood: GarantMood; pointing: boolean; blink: number; wave: number }) {
  const zadni = RADA_ZADNI.map((id, i) => (
    <Clen key={id} id={id} x={radaX(2 * i)} y={RADA_ZADNI_Y} mood={mood} pointing={false} blink={blink} wave={0} bottom={RADA_ZADNI_SPODEK} noArms />
  ));
  const predni = RADA_PREDNI.map((id, i) => ({ id, i }));
  /* ukazující člověk se kreslí poslední, aby ukazovátko bylo navrchu */
  predni.sort((a, b) => Number(a.i === RADA_UKAZUJE && pointing) - Number(b.i === RADA_UKAZUJE && pointing));
  return (
    <g>
      {zadni}
      {predni.map(({ id, i }) => {
        const ukazuje = pointing && i === RADA_UKAZUJE;
        return (
          <Clen
            key={id}
            id={id}
            x={radaX(2 * i + 1)}
            y={RADA_PREDNI_Y}
            mood={mood}
            pointing={ukazuje}
            blink={blink}
            wave={ukazuje ? wave : 0}
            tilt={ukazuje ? 22 : 0}
            stick={ukazuje ? 120 : 60}
          />
        );
      })}
    </g>
  );
}

/* ---------- export ---------- */

export function garantLabel(kdo: Mluvci, mood: GarantMood = "neutral", pointing = false): string {
  if (kdo === "rada")
    return `Pirátská expertní ekonomická rada v pirátských kloboucích${pointing ? ", jeden z členů ukazuje ukazovátkem" : ""}`;
  const g = GARANTI[kdo];
  const nalada = MOOD_LABEL[mood][g.zena ? 1 : 0];
  return `${g.jmeno}, ${g.zena ? "garantka" : "garant"} kapitoly, v pirátském klobouku ${nalada}${pointing ? " a ukazuje ukazovátkem" : ""}`;
}

export function GarantSvg({
  kdo,
  mood = "neutral",
  pointing = false,
  size = 220,
  label,
  blink = 0,
  breathe = 0,
  wave = 0,
  className,
  style,
}: GarantSvgProps) {
  const ariaLabel = label ?? garantLabel(kdo, mood, pointing);
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
      data-kdo={kdo}
    >
      <title>{ariaLabel}</title>
      <g
        data-part="breath"
        style={{ transformBox: "fill-box", transformOrigin: "50% 100%", transform: `scale(${1 + BREATH_SCALE * clamp01(breathe)})` }}
      >
        {kdo === "rada" ? (
          <Rada mood={mood} pointing={pointing} blink={blink} wave={wave} />
        ) : (
          <Postava v={GARANTI[kdo].vzhled} mood={mood} pointing={pointing} blink={blink} wave={wave} />
        )}
        {mood === "sleepy" ? <Zzz /> : null}
      </g>
    </svg>
  );
}

export default GarantSvg;
