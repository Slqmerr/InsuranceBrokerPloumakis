import type { MetadataRoute } from "next";

import { SITE_URL } from "./siteMeta";

export default function robots(): MetadataRoute.Robots {
  // Preview deployments serve the same pages on a *.vercel.app host. Without
  // this they are crawlable duplicates of production competing for the same
  // queries — and every canonical they emit points at dploumakis.gr anyway,
  // so there is nothing to gain by letting a crawler in.
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The CMS panel and the form/API endpoints behind it. None of them
      // render anything a search engine should hold, and /api/quote is a POST
      // handler that has no business being probed.
      disallow: ["/keystatic", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
