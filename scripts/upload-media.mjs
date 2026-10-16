#!/usr/bin/env node
/* Nahraje videa, náhledy, titulky a zvuk z public/ do Vercel Blob, aby nemusely být v gitu.
   Potřebuje BLOB_READ_WRITE_TOKEN (Vercel → Storage → Blob → token). Cesty se zachovají
   (video/bydleni-wide.mp4 → <blob>/video/bydleni-wide.mp4), takže na webu stačí nastavit
   NEXT_PUBLIC_MEDIA_URL na základ adresy úložiště.

   node scripts/upload-media.mjs            # nahraje jen změněné (jiná velikost, nebo novější než poslední nahrání)
   node scripts/upload-media.mjs --force    # nahraje vše znovu */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { list, put } from "@vercel/blob";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIRS = ["video", "audio"];
const force = process.argv.includes("--force");

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error("Chybí BLOB_READ_WRITE_TOKEN.");
  process.exit(1);
}

/* Co už v úložišti je: velikost a čas nahrání. Soubor se přeskočí, jen když má stejnou velikost
   a nebyl od posledního nahrání změněn (mtime); nový render se stejnou délkou by jinak zůstal starý. */
const existing = new Map();
let cursor;
do {
  const page = await list({ cursor, limit: 1000 });
  for (const b of page.blobs) existing.set(b.pathname, { size: b.size, uploadedAt: new Date(b.uploadedAt).getTime() });
  cursor = page.hasMore ? page.cursor : undefined;
} while (cursor);

let uploaded = 0;
let skipped = 0;
let base = "";
for (const dir of DIRS) {
  const abs = path.join(ROOT, "public", dir);
  if (!fs.existsSync(abs)) continue;
  for (const file of fs.readdirSync(abs, { recursive: true })) {
    const full = path.join(abs, file);
    if (!fs.statSync(full).isFile()) continue;
    const key = `${dir}/${file}`.replace(/\\/g, "/");
    const { size, mtimeMs } = fs.statSync(full);
    const old = existing.get(key);
    if (!force && old && old.size === size && mtimeMs <= old.uploadedAt) {
      skipped++;
      continue;
    }
    const type = key.endsWith(".mp4") ? "video/mp4" : key.endsWith(".mp3") ? "audio/mpeg" : key.endsWith(".vtt") ? "text/vtt; charset=utf-8" : key.endsWith(".jpg") ? "image/jpeg" : undefined;
    const res = await put(key, fs.createReadStream(full), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: type,
      cacheControlMaxAge: 60 * 60 * 24 * 30,
    });
    base = res.url.slice(0, res.url.length - key.length - 1);
    uploaded++;
    console.log(`↑ ${key}  ${(size / 1e6).toFixed(1)} MB`);
  }
}
console.log(`\nnahráno ${uploaded}, beze změny ${skipped}`);
if (base) console.log(`NEXT_PUBLIC_MEDIA_URL=${base}`);
