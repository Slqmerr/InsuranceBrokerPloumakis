import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import Navbar from "../../components/Navbar";
import QuoteForm from "../../components/QuoteForm";
import { IDIWTES_PRODUCTS, EXTRA_IDIWTES_PAGES, EPIXEIRISI_PRODUCTS } from "../../components/products";

const UBUNTU = "var(--font-ubuntu-sans), sans-serif";
const ALL = [...IDIWTES_PRODUCTS, ...EXTRA_IDIWTES_PAGES, ...EPIXEIRISI_PRODUCTS];

export function generateStaticParams() {
  // de-duplicate slugs (astiki-efthyni & cyber appear in both categories)
  const slugs = Array.from(new Set(ALL.map((p) => p.slug)));
  return slugs.map((slug) => ({ slug }));
}

export default async function ProsforaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = ALL.find((p) => p.slug === slug);
  if (!product) notFound();

  const isIdiotis = [...IDIWTES_PRODUCTS, ...EXTRA_IDIWTES_PAGES].some((p) => p.slug === slug);
  const productHref = `/${isIdiotis ? "idiotes" : "epixeirisi"}/${slug}`;

  return (
    <main style={{ fontFamily: UBUNTU, background: "#fff", color: "#1a1a1a", width: "100%", minHeight: "100vh" }}>
      <Navbar />

      {/* Red header band — breadcrumb + heading, matching the product hero style */}
      <section style={{ background: "#a30000", padding: "24px 64px 88px" }}>
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
    </main>
  );
}
