import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-hosted on our VPS behind Cloudflare (no Vercel-only features).
  output: "standalone",
  // The only code link to the CMS is the SDK (installed via file: in dev);
  // transpile it so its TypeScript source compiles with the site.
  transpilePackages: ["@ativa/cms-sdk"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
