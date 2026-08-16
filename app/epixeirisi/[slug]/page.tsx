import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPageContent from "../../components/ProductPageContent";
import { allProducts, productBySlug } from "../../components/cmsProducts";
import { productMetadata } from "../../siteMeta";

export async function generateStaticParams() {
  const products = await allProducts("epixeirisi");
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await productBySlug("epixeirisi", slug);
  if (!product) return {};

  return productMetadata(product, `/epixeirisi/${slug}`);
}

export default async function EpixeirisiProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await productBySlug("epixeirisi", slug);
  if (!product) notFound();

  return <ProductPageContent product={product} categoryLabel="Επιχείρηση" />;
}
