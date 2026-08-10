// Build-time bridge between Keystatic content and the Product shape the UI
// renders. Server-only: createReader reads the filesystem, so this must never
// be imported from a client component.
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";
import { iconForName } from "./iconMap";
import {
  IDIWTES_PRODUCTS,
  EXTRA_IDIWTES_PAGES,
  EPIXEIRISI_PRODUCTS,
  EXTRA_EPIXEIRISI_PAGES,
  type Product,
} from "./products";

const reader = createReader(process.cwd(), keystaticConfig);

type CmsCategory = "idiotes" | "epixeirisi";

// The static arrays still hold every product (they are the navbar/homepage
// nav config), plus the hub-family pages that are not in the CMS at all.
// For page content, a CMS entry wins over its products.ts twin; products.ts
// only fills the slugs the CMS doesn't know (the astiki-efthyni hub family).
const STATIC_BY_CATEGORY: Record<CmsCategory, Product[]> = {
  idiotes: [...IDIWTES_PRODUCTS, ...EXTRA_IDIWTES_PAGES],
  epixeirisi: [...EPIXEIRISI_PRODUCTS, ...EXTRA_EPIXEIRISI_PAGES],
};

/** All products for a category route: CMS entries mapped into the Product
 *  shape, then any products.ts entries whose slug the CMS doesn't have. */
export async function allProducts(category: CmsCategory): Promise<Product[]> {
  const entries = await reader.collections[category].all();
  const fromCms: Product[] = entries.map(({ slug, entry }) => ({
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
  }));
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
