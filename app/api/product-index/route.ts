// The product catalogue, for the Keystatic «Σειρά στο μενού» ordering page.
//
// That page's field (keystatic-fields/productOrderField.tsx) runs in the
// browser inside the admin UI, so it can't read content/ the way the site's
// server components do — it fetches the list from here instead. Nothing
// secret is served: this is the same slug/title/icon/colour already rendered
// in the public navbar, minus the page bodies.
import { orderableProducts } from "../../components/cmsProducts";
import type { ProductIndex } from "../../../keystatic-fields/productOrderField";

// Read at request time rather than baked into the build: the admin UI is a
// long-lived tab, and an editor who adds a product expects to find it on the
// ordering page after a redeploy without a hard refresh of cached JSON.
export const dynamic = "force-dynamic";

export async function GET() {
  const [idiotes, epixeirisi] = await Promise.all([
    orderableProducts("idiotes"),
    orderableProducts("epixeirisi"),
  ]);

  return Response.json({ idiotes, epixeirisi } satisfies ProductIndex);
}
