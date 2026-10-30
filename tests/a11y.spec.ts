import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/* Přístupnost: axe-core (WCAG 2.0/2.1 A + AA) nad vybranými stránkami při světlém i tmavém nastavení systému.
   Web má jen světlou variantu; běh s tmavým nastavením hlídá, že se stránka nepřepne a zůstane bílá.
   Selhává na porušeních s dopadem serious nebo critical; při selhání vypíše celý seznam.
   Běží nad produkčním buildem jako ostatní testy (viz playwright.config.ts). */

const PAGES = [
  "/", "/bydleni", "/zdravi", "/otazky", "/dopad",
  "/kolik-ti-to-prinese", "/moje-obec", "/kdo-je-kdo", "/videa",
  "/pribeh", "/hledat?q=hypoteka", "/argumentar",
];
const SCHEMES = ["light", "dark"] as const;
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

for (const scheme of SCHEMES) {
  test.describe(`axe, ${scheme === "light" ? "světlý" : "tmavý"} režim`, () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    for (const path of PAGES) {
      test(`${path}: bez závažných porušení`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: scheme, reducedMotion: "reduce" });
        const res = await page.goto(path, { waitUntil: "load" });
        expect(res?.status(), "HTTP status").toBe(200);
        /* počkáme na hydrataci a na dokončení případných přechodů barev */
        await page.waitForTimeout(600);

        /* web je vždy světlý: bílé pozadí i při tmavém nastavení systému */
        const pozadi = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
        expect(pozadi, "pozadí stránky").toBe("rgb(255, 255, 255)");

        const { violations } = await new AxeBuilder({ page }).withTags(TAGS).analyze();
        const serious = violations.filter((v) => v.impact === "serious" || v.impact === "critical");
        const report = serious
          .map(
            (v) =>
              `[${v.impact}] ${v.id}: ${v.help} (${v.helpUrl})\n` +
              v.nodes.map((n) => `    ${n.target.join(" ")}\n      ${n.failureSummary?.replace(/\n/g, "\n      ")}`).join("\n"),
          )
          .join("\n\n");
        expect(serious, `${path} (${scheme}): ${serious.length} porušení\n${report}`).toEqual([]);
      });
    }
  });
}
