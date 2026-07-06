import { notFound } from "next/navigation";
import ProductPageContent from "../../components/ProductPageContent";
import { IDIWTES_PRODUCTS, EXTRA_IDIWTES_PAGES } from "../../components/products";

const ALL_IDIWTES = [...IDIWTES_PRODUCTS, ...EXTRA_IDIWTES_PAGES];

export function generateStaticParams() {
  return ALL_IDIWTES.map((product) => ({ slug: product.slug }));
}

export default async function IdiotesProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = ALL_IDIWTES.find((p) => p.slug === slug);
  if (!product) notFound();

  return <ProductPageContent product={product} categoryLabel="" />;
}
