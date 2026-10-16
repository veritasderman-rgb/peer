import path from "node:path";
import { Config } from "@remotion/cli/config";

/* Remotion („Bobr za minutu“): kompozice jsou ve video/, výstupy renderuje scripts/render-videos.mjs
   (ten nastavuje totéž přes programové API). */
Config.setEntryPoint("video/index.ts");
Config.setBrowserExecutable("/opt/pw-browsers/chromium");
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setCodec("h264");
Config.setCrf(26);
Config.setMuted(true);
Config.setColorSpace("bt709");
/* alias @/ jako v Next.js (tsconfig paths), aby scénáře mohly importovat "@/lib/topics" */
Config.overrideWebpackConfig((c) => ({
  ...c,
  resolve: { ...c.resolve, alias: { ...(c.resolve?.alias as Record<string, string> | undefined), "@": path.resolve(process.cwd()) } },
}));
/* Playwright Chromium už nemá starý headless režim → nový headless („chrome-for-testing“). */
Config.setChromeMode("chrome-for-testing");
