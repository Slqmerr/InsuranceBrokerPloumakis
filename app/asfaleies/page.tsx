// Server half of /asfaleies: reads the full catalogue from the CMS and hands
// it to the client component that renders it. Uses indexProducts rather than
// navProducts because this page is the complete listing — it shows products
// hidden from the navbar too, which is how the astiki-efthyni hub pages have
// always appeared here but not in the menu.
import AsfaleiesContent from "./AsfaleiesContent";
import { indexProducts } from "../components/cmsProducts";

export default async function AsfaleiesPage() {
  const [idiotes, epixeirisi] = await Promise.all([
    indexProducts("idiotes"),
    indexProducts("epixeirisi"),
  ]);

  return <AsfaleiesContent idiotes={idiotes} epixeirisi={epixeirisi} />;
}
