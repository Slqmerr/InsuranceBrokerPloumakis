import Link from "next/link";
import Navbar from "./Navbar";
import type { Product } from "./products";

const UBUNTU = "var(--font-ubuntu-sans), sans-serif";

/**
 * Shared skeleton for the per-product detail pages.
 * Detailed plan descriptions will be added later — for now each page
 * shows the product identity and a placeholder.
 */
export default function ProductPageContent({
  product,
  categoryLabel,
}: {
  product: Product;
  categoryLabel: string;
}) {
  return (
    <main style={{ fontFamily: UBUNTU, background: "#fff", color: "#1a1a1a", width: "100%", minHeight: "100vh" }}>
      <Navbar />

      {/* Page header */}
      <section style={{ background: "#1E439A", padding: "72px 64px" }}>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px", letterSpacing: "0.5px", textTransform: "uppercase", margin: "0 0 12px" }}>
          {categoryLabel} · {product.subtitle}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{
            width: "64px",
            height: "64px",
            borderRadius: "16px",
            background: "rgba(255,255,255,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}>
            <product.icon size={30} color="#fff" strokeWidth={1.75} />
          </div>
          <h1 style={{ color: "#fff", fontFamily: UBUNTU, fontSize: "40px", fontWeight: 700, margin: 0, lineHeight: 1.15 }}>
            {product.title}
          </h1>
        </div>
      </section>

      {/* Placeholder body — detailed plan descriptions will be added here */}
      <section style={{ padding: "64px", maxWidth: "720px" }}>
        <h2 style={{ fontFamily: UBUNTU, fontSize: "24px", fontWeight: 600, margin: "0 0 12px" }}>
          Τα προγράμματά μας
        </h2>
        <p style={{ fontSize: "15px", color: "#555", lineHeight: 1.7, margin: "0 0 32px" }}>
          Αναλυτικές περιγραφές των προγραμμάτων για {product.title} θα προστεθούν σύντομα.
          Επικοινωνήστε μαζί μας για μια εξατομικευμένη προσφορά.
        </p>
        <Link href="/" style={{ color: "#1E439A", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
          ← Επιστροφή στην αρχική
        </Link>
      </section>
    </main>
  );
}
