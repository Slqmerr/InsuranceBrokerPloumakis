// Build-time bridge between Keystatic content and the Product shape the UI
// renders. Server-only: createReader reads the filesystem, so this must never
// be imported from a client component.
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";
import { iconForName } from "./iconMap";
import { navIconName } from "./navIcons";
import {
  IDIWTES_PRODUCTS,
  EXTRA_IDIWTES_PAGES,
  EPIXEIRISI_PRODUCTS,
  EXTRA_EPIXEIRISI_PAGES,
  type Product,
} from "./products";

const reader = createReader(process.cwd(), keystaticConfig);

type CmsCategory = "idiotes" | "epixeirisi";

// products.ts now only supplies the hub-family pages the CMS doesn't model —
// for page content, a CMS entry wins over its products.ts twin.
//
// EXTRA_*_PAGES are marked hidden here because that is exactly what the
// "EXTRA_" arrays have always meant: pages the navbar deliberately omits while
// /asfaleies still lists them. Encoding it as the same `hidden` flag the CMS
// checkbox sets means navProducts() has one rule to apply, not two.
const asHidden = (products: Product[]): Product[] =>
  products.map((product) => ({ ...product, hidden: true }));

const STATIC_BY_CATEGORY: Record<CmsCategory, Product[]> = {
  idiotes: [...IDIWTES_PRODUCTS, ...asHidden(EXTRA_IDIWTES_PAGES)],
  epixeirisi: [...EPIXEIRISI_PRODUCTS, ...asHidden(EXTRA_EPIXEIRISI_PAGES)],
};

/** The CMS-managed products for a category, in the order the editor dragged
 *  them on the «Σειρά στο μενού» page.
 *
 *  Products the saved order doesn't mention sort last, keeping the reader's
 *  own (alphabetical-by-filename) order among themselves — so a brand new
 *  product appears at the end of the menu instead of disappearing, and a site
 *  with no order saved at all looks exactly as it did before this existed.
 *  Slugs in the order whose product was deleted simply never match. This is
 *  the same merge productOrderField.tsx performs in the admin UI, so what the
 *  editor drags is what the site renders. */
async function cmsProductsFor(category: CmsCategory): Promise<Product[]> {
  const [entries, order] = await Promise.all([
    reader.collections[category].all(),
    reader.singletons.menuOrder.read(),
  ]);
  const rank = new Map((order?.[category] ?? []).map((slug, i) => [slug, i]));
  // MAX_SAFE_INTEGER rather than Infinity: two unranked products would
  // subtract to NaN, and a NaN comparator silently scrambles the array.
  const rankOf = (product: Product) =>
    rank.get(product.slug) ?? Number.MAX_SAFE_INTEGER;

  return entries
    .map(({ slug, entry }) => ({
      icon: iconForName(entry.iconName),
      title: entry.title,
      slug,
      color: entry.color,
      image: entry.image,
      imagePosition: entry.imagePosition,
      intro: entry.intro,
      description: entry.description,
      covers: [...entry.covers],
      needs: [...entry.needs],
      hidden: entry.hidden,
    }))
    .sort((a, b) => rankOf(a) - rankOf(b));
}

/** All products for a category route: CMS entries in the editor's order, then
 *  any products.ts entries whose slug the CMS doesn't have. The hardcoded
 *  hub-family pages stay last — they aren't in the collection, so there's no
 *  row for them on the ordering page. */
export async function allProducts(category: CmsCategory): Promise<Product[]> {
  const fromCms = await cmsProductsFor(category);
  const cmsSlugs = new Set(fromCms.map((p) => p.slug));
  const staticOnly = STATIC_BY_CATEGORY[category].filter(
    (p) => !cmsSlugs.has(p.slug)
  );
  return [...fromCms, ...staticOnly];
}

/** One product by slug, or null — same precedence as allProducts. */
export async function productBySlug(
  category: CmsCategory,
  slug: string
): Promise<Product | null> {
  const products = await allProducts(category);
  return products.find((p) => p.slug === slug) ?? null;
}

/** A product looked up by slug alone, plus the route it belongs to. The quote
 *  form is addressed by slug only (/prosfora/<slug>), so it needs both.
 *  "cyber" exists in both categories with different content; ιδιώτες wins,
 *  matching the order of the flat array this replaced. */
export async function productForSlug(
  slug: string
): Promise<{ product: Product; category: CmsCategory } | null> {
  for (const category of ["idiotes", "epixeirisi"] as const) {
    const product = await productBySlug(category, slug);
    if (product) return { product, category };
  }
  return null;
}

/** What the navbar and the /asfaleies index actually render per product, in a
 *  shape that survives the server→client boundary — hence `iconName` rather
 *  than the `icon` component on Product. See navIcons.ts for why. */
export type NavProduct = {
  title: string;
  slug: string;
  color: string;
  iconName: string;
};

const toNavProduct = (product: Product): NavProduct => ({
  title: product.title,
  slug: product.slug,
  color: product.color,
  iconName: navIconName(product.icon),
});

/** Products for the navbar dropdown: everything an editor hasn't hidden, plus
 *  none of the EXTRA_*_PAGES (hidden by construction above). */
export async function navProducts(category: CmsCategory): Promise<NavProduct[]> {
  const products = await allProducts(category);
  return products.filter((p) => !p.hidden).map(toNavProduct);
}

/** Products for the /asfaleies index: the complete list, hidden ones included.
 *  That page is the full catalogue — it has always shown the EXTRA_*_PAGES. */
export async function indexProducts(category: CmsCategory): Promise<NavProduct[]> {
  return (await allProducts(category)).map(toNavProduct);
}

/** The rows the Keystatic «Σειρά στο μενού» page drags, served to it by
 *  app/api/product-index/route.ts. Only the CMS-managed products — the
 *  hardcoded hub pages have no collection entry to reorder. */
export async function orderableProducts(
  category: CmsCategory
): Promise<(NavProduct & { hidden: boolean })[]> {
  return (await cmsProductsFor(category)).map((product) => ({
    ...toNavProduct(product),
    hidden: product.hidden ?? false,
  }));
}

/** Every slug that has a product page, across both routes. */
export async function allSlugs(): Promise<string[]> {
  const [idiotes, epixeirisi] = await Promise.all([
    allProducts("idiotes"),
    allProducts("epixeirisi"),
  ]);
  return Array.from(new Set([...idiotes, ...epixeirisi].map((p) => p.slug)));
}
