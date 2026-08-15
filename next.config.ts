import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Every distinct width in this list is a separate on-demand transform, and
    // each one is cold again after a deploy. The defaults end at 3840, but no
    // source image in public/ is wider than 2560, so that candidate only ever
    // asked Vercel to re-encode the full-size original — and it was the one the
    // fallback `src` pointed at. Dropping it and the near-duplicate 750 takes
    // the srcSet from eight candidates to six without changing what any real
    // viewport receives.
    deviceSizes: [640, 828, 1080, 1200, 1920, 2048],
  },
};

export default nextConfig;
