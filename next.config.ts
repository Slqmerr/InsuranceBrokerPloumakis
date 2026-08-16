import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // There is a stray package-lock.json in the home directory above this
  // project, and Turbopack's root detection picks the outermost lockfile it
  // finds — so every build was rooting itself at /Users/<user> and warning
  // about it. Saying so explicitly keeps module resolution and file watching
  // inside the project.
  turbopack: {
    root: __dirname,

    resolveAlias: {
      // Keystatic's admin UI is the only thing in the app that imports this
      // module, and keystatic-ui/table.tsx re-exports all of it unchanged
      // except for the collection list's hardcoded "Slug" column, which it
      // drops. That file's header explains why the interception has to happen
      // out here rather than in keystatic.config.ts.
      "@keystar/ui/table": "./keystatic-ui/table.tsx",
    },
  },

  // /api/product-index is the only route that reads content/ at request time
  // rather than at build time (it feeds the Keystatic «Σειρά στο μενού» page),
  // and Keystatic's reader builds those paths at runtime — so Next's tracer
  // never sees them and the deployed function shipped without the content
  // directory. The reader answers a missing directory with an empty list
  // instead of an error, so the route returned 200 with no products and the
  // ordering page rendered an empty box. Naming the files here puts them in
  // that function's bundle.
  outputFileTracingIncludes: {
    "/api/product-index": ["./content/**/*"],
  },

  images: {
    // Every distinct width in this list is a separate on-demand transform, and
    // each one is cold again after a deploy. The defaults end at 3840, but no
    // source image in public/ is wider than 2560, so that candidate only ever
    // asked Vercel to re-encode the full-size original — and it was the one the
    // fallback `src` pointed at. Dropping it and the near-duplicate 750 takes
    // the srcSet from eight candidates to six without changing what any real
    // viewport receives.
    //
    // scripts/optimize-photos.mjs now caps every source at 2048 to match the
    // largest entry here, so no transform decodes pixels it will discard.
    deviceSizes: [640, 828, 1080, 1200, 1920, 2048],

    // The default is 4 hours, which on a site with this little traffic means
    // most visitors are the one paying for a cold transform. This only affects
    // the product photos: everything else is a static import, so it is served
    // from a content-hashed /_next/static URL whose `immutable` header already
    // wins over this value. The product photos come out of the CMS as plain
    // /products/*.jpg strings, so they get whatever this says.
    //
    // There is no way to invalidate the optimizer cache, so replacing a product
    // photo in place will keep serving the old one for up to a month — rename
    // the file (and update the `image` field in the CMS) to bust it.
    minimumCacheTTL: 2678400, // 31 days
  },
};

export default nextConfig;
