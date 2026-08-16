import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPageContent from "../../components/ProductPageContent";
import { allProducts, productBySlug } from "../../components/cmsProducts";
import { productMetadata } from "../../siteMeta";

export async function generateStaticParams() {
  const products = await allProducts("idiotes");
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await productBySlug("idiotes", slug);
  // The page itself calls notFound() for this slug; returning bare metadata
  // keeps generateMetadata from throwing first and turning a 404 into a 500.
  if (!product) return {};

  return productMetadata(product, `/idiotes/${slug}`);
}

export default async function IdiotesProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await productBySlug("idiotes", slug);
  if (!product) notFound();

  return <ProductPageContent product={product} categoryLabel="" />;
}
