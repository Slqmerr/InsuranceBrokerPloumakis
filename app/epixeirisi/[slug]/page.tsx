import { notFound } from "next/navigation";
import ProductPageContent from "../../components/ProductPageContent";
import { EPIXEIRISI_PRODUCTS } from "../../components/products";

export function generateStaticParams() {
  return EPIXEIRISI_PRODUCTS.map((product) => ({ slug: product.slug }));
}

export default async function EpixeirisiProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = EPIXEIRISI_PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  return <ProductPageContent product={product} categoryLabel="Επιχείρηση" />;
}
