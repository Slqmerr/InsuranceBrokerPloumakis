import { notFound } from "next/navigation";
import ProductPageContent from "../../components/ProductPageContent";
import { allProducts, productBySlug } from "../../components/cmsProducts";

export async function generateStaticParams() {
  const products = await allProducts("epixeirisi");
  return products.map((product) => ({ slug: product.slug }));
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
