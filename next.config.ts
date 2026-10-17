import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /* Stránka „Proč bobr“ zanikla s výměnou maskota za avatary garantů. */
  async redirects() {
    return [{ source: "/proc-bobr", destination: "/kdo-je-kdo", permanent: true }];
  },
};

export default nextConfig;
