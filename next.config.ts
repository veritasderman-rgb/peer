import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /* Skrytá stránka /overeni čte docs/k-overeni.md za běhu; na Vercelu musí být soubor ve funkci. */
  outputFileTracingIncludes: { "/overeni": ["./docs/k-overeni.md"] },
  /* Stránka „Proč bobr“ zanikla s výměnou maskota za avatary garantů. Cesta do 2035 a Jak se to zaplatí
     jsou teď sekce stránky Velký obraz (/dopad). */
  async redirects() {
    return [
      { source: "/proc-bobr", destination: "/kdo-je-kdo", permanent: true },
      { source: "/cesta", destination: "/dopad#osa", permanent: true },
      { source: "/zaplaceni", destination: "/dopad#zaplaceni", permanent: true },
    ];
  },
};

export default nextConfig;
