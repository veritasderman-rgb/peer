import type { MetadataRoute } from "next";
import { abs } from "@/lib/site";

/* Vše je veřejné; AI vyhledávače dostanou i llms.txt (viz app/llms.txt/route.ts). */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: abs("/sitemap.xml"),
  };
}
