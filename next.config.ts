import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-hosted on our VPS behind Cloudflare (no Vercel-only features).
  output: "standalone",
  // The only code link to the CMS is the SDK (installed via file: in dev);
  // transpile it so its TypeScript source compiles with the site.
  transpilePackages: ["@ativa/cms-sdk"],
  // Keep every existing WordPress URL: flat root slugs with a trailing slash.
  trailingSlash: true,
  // The mongodb driver (used by the SDK's read client) stays a server external.
  serverExternalPackages: ["mongodb"],
  // NOTE: the site builds with webpack (`--webpack`), because Turbopack can't
  // resolve the SDK while it's a symlinked `file:` dependency during dev. Once
  // the SDK is published to GitHub Packages (installed normally), Turbopack
  // works and this can switch back. Tailwind v4 runs via PostCSS (see
  // postcss.config.mjs) instead of the Turbopack loader.
};

export default nextConfig;
