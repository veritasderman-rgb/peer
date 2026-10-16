import { expect, test, type Page } from "@playwright/test";

/* Smoke testy nad produkčním buildem (`next build && next start -p 3310`).
   Seznam stránek je napsaný natvrdo: Playwright nezná alias `@/` z Nextu, takže registr témat neimportujeme.
   Přibyde-li téma nebo stránka, doplň je sem (a hlídá to i test sitemapy). */

const STATIC = [
  "/", "/videa", "/dopad", "/cesta", "/zaplaceni", "/kolik-ti-to-prinese", "/moje-obec", "/otazky",
  "/pro-sdileni", "/pro-media", "/en", "/proc-bobr", "/jak-vznikl",
];
const SLUGS = [
  "bydleni", "vzdelanost", "prace", "zeny", "exekuce", "zdravi", "oligarchie",
  "euro", "kapital", "prumysl", "energie", "inovace", "regiony", "stat",
];
const TOPICS = SLUGS.map((s) => `/${s}`);
const PAGES = [...STATIC, ...TOPICS];

/* Známé nezávadné hlášky (varování Nextu o preloadu, které se objevuje i v dev režimu). */
const IGNORED = [/preload/i];
const ignored = (text: string) => IGNORED.some((re) => re.test(text));

/** Otevře stránku a po celou dobu sbírá console.error a pageerror. */
async function open(page: Page, path: string) {
  const problems: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error" && !ignored(m.text())) problems.push(`console.error: ${m.text()}`);
  });
  page.on("pageerror", (e) => {
    if (!ignored(e.message)) problems.push(`pageerror: ${e.message}`);
  });
  const res = await page.goto(path, { waitUntil: "load" });
  return { res, problems };
}

test.describe("HTML stránky (viewport 400 px)", () => {
  test.use({ viewport: { width: 400, height: 800 } });

  for (const path of PAGES) {
    test(`${path}: 200, h1, canonical, bez chyb a bez horizontálního posunu`, async ({ page }) => {
      const { res, problems } = await open(page, path);
      expect(res?.status(), "HTTP status").toBe(200);

      await expect(page.locator("h1").first()).toBeVisible();
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);

      /* Chvíli počkáme, ať doběhne hydratace a případné chyby z ní. */
      await page.waitForTimeout(400);
      const overflow = await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        client: document.documentElement.clientWidth,
      }));
      expect(overflow.scroll, `scrollWidth ${overflow.scroll} > clientWidth ${overflow.client}`).toBeLessThanOrEqual(overflow.client);

      expect(problems, problems.join("\n")).toEqual([]);
    });
  }
});

test.describe("technické soubory", () => {
  test("/robots.txt odkazuje na sitemapu", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.status()).toBe(200);
    expect(await res.text()).toMatch(/sitemap\.xml/);
  });

  test("/sitemap.xml obsahuje všech 27 stránek", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    const xml = await res.text();
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
    for (const path of PAGES) expect(locs, `chybí ${path}`).toContain(path);
  });

  test("/llms.txt se vrací jako text", async ({ request }) => {
    const res = await request.get("/llms.txt");
    expect(res.status()).toBe(200);
    expect((await res.text()).trim().length).toBeGreaterThan(100);
  });

  for (const path of ["/opengraph-image", "/bydleni/opengraph-image"]) {
    test(`${path} je obrázek`, async ({ request }) => {
      const res = await request.get(path);
      expect(res.status()).toBe(200);
      expect(res.headers()["content-type"]).toMatch(/^image\//);
      expect((await res.body()).length).toBeGreaterThan(1000);
    });
  }
});

test.describe("stránka tématu", () => {
  test("/bydleni: video má titulky a jsou tam tlačítka sdílení", async ({ page }) => {
    await page.goto("/bydleni");
    await expect(page.locator("video").first()).toBeAttached();
    await expect(page.locator("video track").first()).toBeAttached();
    await expect(page.getByText("Sdílet:").first()).toBeVisible();
    await expect(page.getByRole("link", { name: "LinkedIn" }).first()).toBeVisible();
    await expect(page.getByRole("button", { name: "Kopírovat odkaz" }).first()).toBeVisible();
  });

  test("každé téma má video s titulky a sdílení", async ({ page }) => {
    const chyby: string[] = [];
    for (const path of TOPICS) {
      await page.goto(path);
      if ((await page.locator("video track").count()) === 0) chyby.push(`${path}: video bez <track>`);
      if ((await page.getByText("Sdílet:").count()) === 0) chyby.push(`${path}: chybí „Sdílet:“`);
    }
    expect(chyby, chyby.join("\n")).toEqual([]);
  });
});

test.describe("404 a interakce", () => {
  test("/neexistuje vrací 404 s hláškou od bobra", async ({ page }) => {
    const res = await page.goto("/neexistuje");
    expect(res?.status()).toBe(404);
    await expect(page.getByText("Tahle stránka tu není")).toBeVisible();
  });

  test("úvodka: „Mám malé děti“ ukáže aspoň jednu kartu", async ({ page }) => {
    await page.goto("/");
    const chip = page.getByRole("button", { name: "Mám malé děti" });
    await chip.scrollIntoViewIfNeeded();
    /* Před hydratací by klik nic neudělal, proto opakujeme, dokud se chip nepřepne. */
    await expect(async () => {
      await chip.click();
      await expect(chip).toHaveAttribute("aria-pressed", "true", { timeout: 1000 });
    }).toPass({ timeout: 10_000 });
    await expect(page.locator("li.card").first()).toBeVisible();
    expect(await page.locator("li.card").count()).toBeGreaterThanOrEqual(1);
  });
});
