import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /* Skrytá stránka /overeni čte docs/k-overeni.md za běhu; na Vercelu musí být soubor ve funkci. */
  outputFileTracingIncludes: { "/overeni": ["./docs/k-overeni.md"] },
  /* Stránka „Proč bobr“ zanikla s výměnou maskota za avatary garantů. */
  async redirects() {
    return [{ source: "/proc-bobr", destination: "/kdo-je-kdo", permanent: true }];
  },
};

export default nextConfig;
