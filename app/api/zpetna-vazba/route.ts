/* Zpětná vazba z webu (POST /api/zpetna-vazba).
   Úložiště se volí podle prostředí: FEEDBACK_WEBHOOK_URL → GITHUB_FEEDBACK_TOKEN (issue v repu z NEXT_PUBLIC_REPO_URL) → log.
   Chyba úložiště se jen zapíše do logu, návštěvník vidí poděkování i při špatné konfiguraci. */
export const runtime = "nodejs";

const TYPY = ["chybi", "hlas", "overeni", "chyba"] as const;
type Typ = (typeof TYPY)[number];

type Zaznam = { typ: Typ; stranka: string; text?: string; hodnota?: string; id?: string };

const LIMIT_POCET = 20;
const LIMIT_OKNO_MS = 10 * 60 * 1000;
const hity = new Map<string, number[]>();

/* Jednoduchý limit v paměti procesu (na serverless je per instance, jako první zábrana stačí). */
function prilis(ip: string, ted: number): boolean {
  const okno = (hity.get(ip) ?? []).filter((t) => ted - t < LIMIT_OKNO_MS);
  okno.push(ted);
  hity.set(ip, okno);
  if (hity.size > 5000) {
    for (const [k, v] of hity) if (v.every((t) => ted - t >= LIMIT_OKNO_MS)) hity.delete(k);
  }
  return okno.length > LIMIT_POCET;
}

const chyba = (status: number, text: string) => Response.json({ ok: false, chyba: text }, { status });

function retezec(v: unknown, max: number, pole: string): { ok: true; v?: string } | { ok: false; chyba: string } {
  if (v === undefined || v === null) return { ok: true };
  if (typeof v !== "string") return { ok: false, chyba: `Pole ${pole} musí být text.` };
  if (v.length > max) return { ok: false, chyba: `Pole ${pole} je moc dlouhé (nejvýš ${max} znaků).` };
  return { ok: true, v };
}

async function uloz(z: Zaznam, ua: string) {
  const zaznam = { ...z, kdy: new Date().toISOString(), ua: ua.slice(0, 160) };

  const webhook = process.env.FEEDBACK_WEBHOOK_URL;
  if (webhook) {
    const r = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(zaznam),
    });
    if (!r.ok) throw new Error(`webhook ${r.status}`);
    return;
  }

  const token = process.env.GITHUB_FEEDBACK_TOKEN;
  if (token) {
    const m = /github\.com\/([^/]+)\/([^/#?]+)/.exec(process.env.NEXT_PUBLIC_REPO_URL ?? "https://github.com/veritasderman-rgb/peer");
    if (!m) throw new Error("NEXT_PUBLIC_REPO_URL není adresa repa na GitHubu");
    const [, owner, repo] = m;
    const kde = z.stranka.replace(/^\//, "") || "uvod";
    const radky = [
      `**Typ:** ${z.typ}`,
      `**Stránka:** ${z.stranka}`,
      z.id ? `**ID:** ${z.id}` : "",
      z.hodnota ? `**Hodnota:** ${z.hodnota}` : "",
      `**Kdy:** ${zaznam.kdy}`,
      `**Prohlížeč:** ${zaznam.ua}`,
      z.text ? `\n${z.text.replace(/^/gm, "> ")}` : "",
    ].filter(Boolean);
    const r = await fetch(`https://api.github.com/repos/${owner}/${repo.replace(/\.git$/, "")}/issues`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        accept: "application/vnd.github+json",
        "content-type": "application/json",
        "user-agent": "cesko-ma-na-vic",
      },
      body: JSON.stringify({
        title: `[${z.typ}] ${kde}`.slice(0, 120),
        body: radky.join("\n"),
        labels: ["zpetna-vazba", z.typ],
      }),
    });
    if (!r.ok) throw new Error(`github ${r.status}`);
    return;
  }

  console.log("[zpetna-vazba]", zaznam);
}

export async function POST(request: Request) {
  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "neznama";
  if (prilis(ip, Date.now())) return chyba(429, "Moc požadavků, zkus to za chvíli.");

  let b: Record<string, unknown>;
  try {
    const j = await request.json();
    if (!j || typeof j !== "object" || Array.isArray(j)) return chyba(400, "Neplatné tělo požadavku.");
    b = j as Record<string, unknown>;
  } catch {
    return chyba(400, "Neplatný JSON.");
  }

  /* past na boty: vyplněné skryté pole `web` se tváří jako úspěch, ale nic se neukládá */
  if (typeof b.web === "string" && b.web.trim() !== "") return Response.json({ ok: true });

  if (typeof b.typ !== "string" || !(TYPY as readonly string[]).includes(b.typ)) return chyba(400, "Neznámý typ zpětné vazby.");
  if (typeof b.stranka !== "string" || b.stranka.length === 0) return chyba(400, "Chybí stránka.");
  const stranka = retezec(b.stranka, 200, "stranka");
  const text = retezec(b.text, 2000, "text");
  const hodnota = retezec(b.hodnota, 200, "hodnota");
  const id = retezec(b.id, 200, "id");
  for (const p of [stranka, text, hodnota, id]) if (!p.ok) return chyba(400, p.chyba);

  const zaznam: Zaznam = {
    typ: b.typ as Typ,
    stranka: b.stranka,
    ...(text.ok && text.v ? { text: text.v } : {}),
    ...(hodnota.ok && hodnota.v ? { hodnota: hodnota.v } : {}),
    ...(id.ok && id.v ? { id: id.v } : {}),
  };

  try {
    await uloz(zaznam, request.headers.get("user-agent") ?? "");
  } catch (e) {
    console.error("[zpetna-vazba] uložení selhalo", e);
  }
  return Response.json({ ok: true });
}
