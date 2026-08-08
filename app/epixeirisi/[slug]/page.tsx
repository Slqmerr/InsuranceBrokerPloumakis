import { notFound } from "next/navigation";
import ProductPageContent from "../../components/ProductPageContent";
import { EPIXEIRISI_PRODUCTS, EXTRA_EPIXEIRISI_PAGES } from "../../components/products";

// Dropdown products + the liability sub-pages that only the hub links to
const ALL_EPIXEIRISI = [...EPIXEIRISI_PRODUCTS, ...EXTRA_EPIXEIRISI_PAGES];

export function generateStaticParams() {
  return ALL_EPIXEIRISI.map((product) => ({ slug: product.slug }));
}

export default async function EpixeirisiProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = ALL_EPIXEIRISI.find((p) => p.slug === slug);
  if (!product) notFound();

  return <ProductPageContent product={product} categoryLabel="Επιχείρηση" />;
}
