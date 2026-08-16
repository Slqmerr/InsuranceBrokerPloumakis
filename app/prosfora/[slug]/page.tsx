import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import Footer from "../../components/Footer";
import QuoteForm from "../../components/QuoteForm";
import { allSlugs, productForSlug } from "../../components/cmsProducts";

const UBUNTU = "var(--font-ubuntu-sans), sans-serif";

export async function generateStaticParams() {
  // de-duplicate slugs (astiki-efthyni & cyber appear in both categories)
  return (await allSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = await productForSlug(slug);
  if (!found) return {};

  const { product } = found;
  return {
    title: `Ζητήστε προσφορά — ${product.title}`,
    description: `Συμπληρώστε τη φόρμα και λάβετε εξατομικευμένη προσφορά για ${product.title}, χωρίς καμία δέσμευση.`,
    // One of these exists per product and they are all the same form under a
    // different heading — exactly the thin, near-duplicate page that dilutes
    // the product pages they duplicate. Crawl the links, index the product
    // page instead. They are left out of sitemap.ts for the same reason.
    robots: { index: false, follow: true },
  };
}

export default async function ProsforaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const found = await productForSlug(slug);
  if (!found) notFound();

  const { product, category } = found;
  const productHref = `/${category}/${slug}`;

  return (
    <main style={{ fontFamily: UBUNTU, background: "#fff", color: "#1a1a1a", width: "100%", minHeight: "100vh" }}>

      {/* Blue header band — breadcrumb + heading, matching the product hero style */}
      <section className="band-header" style={{ background: "#a30000", padding: "24px 64px 88px" }}>
        <nav
          aria-label="breadcrumb"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: UBUNTU,
            fontSize: "13px",
            marginBottom: "36px",
          }}
        >
          <Link href="/" aria-label="Αρχική" style={{ display: "inline-flex", alignItems: "center", color: "rgba(255,255,255,0.75)" }}>
            <Home size={16} strokeWidth={1.9} />
          </Link>
          <ChevronRight size={14} strokeWidth={1.9} color="rgba(255,255,255,0.5)" />
          <Link href={productHref} style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none" }}>
            {product.title}
          </Link>
          <ChevronRight size={14} strokeWidth={1.9} color="rgba(255,255,255,0.5)" />
          <span style={{ color: "#fff", fontWeight: 600 }}>Προσφορά</span>
        </nav>

        <h1 style={{ color: "#fff", fontFamily: UBUNTU, fontSize: "32px", fontWeight: 700, margin: "0 0 12px", lineHeight: 1.2 }}>
          Ζητήστε προσφορά για {product.title}
        </h1>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "16px", lineHeight: 1.6, margin: 0, maxWidth: "560px" }}>
          Συμπληρώστε τα στοιχεία σας και θα επικοινωνήσουμε μαζί σας με μια εξατομικευμένη προσφορά.
        </p>
      </section>

      <QuoteForm slug={slug} productTitle={product.title} categoryLabel="" />

      <Footer />
    </main>
  );
}
