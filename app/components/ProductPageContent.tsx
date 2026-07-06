import Link from "next/link";
import { Check } from "lucide-react";
import Navbar from "./Navbar";
import type { Product } from "./products";

const UBUNTU = "var(--font-ubuntu-sans), sans-serif";

/**
 * Shared layout for every product detail page.
 * Hero = blue text panel (left half) + product photo (right half).
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

      {/* Hero — blue copy half + photo half */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "460px" }}>
        {/* Left: blue panel */}
        <div style={{
          background: "#1E439A",
          padding: "64px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px", letterSpacing: "0.5px", textTransform: "uppercase", margin: "0 0 16px" }}>
            {categoryLabel}
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
            <div style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}>
              <product.icon size={28} color="#fff" strokeWidth={1.75} />
            </div>
            <h1 style={{ color: "#fff", fontFamily: UBUNTU, fontSize: "34px", fontWeight: 700, margin: 0, lineHeight: 1.15 }}>
              {product.title}
            </h1>
          </div>

          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "16px", lineHeight: 1.6, margin: "0 0 28px", maxWidth: "440px" }}>
            {product.intro}
          </p>

          {/* TODO: repoint to the contact section / Calendly embed once it exists */}
          <Link href="/" style={{
            background: "#fff",
            color: "#1E439A",
            fontWeight: 700,
            fontFamily: UBUNTU,
            padding: "13px 30px",
            borderRadius: "999px",
            textDecoration: "none",
            fontSize: "14px",
            width: "fit-content",
          }}>
            Ζητήστε Προσφορά
          </Link>
        </div>

        {/* Right: product photo — absolutely positioned so its intrinsic size
            can't stretch the grid row; the blue panel drives the hero height */}
        <div style={{ position: "relative", overflow: "hidden", minHeight: "460px" }}>
          <img
            src={product.image}
            alt={product.title}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </section>

      {/* Body — description + what it covers */}
      <section style={{ padding: "64px", maxWidth: "760px" }}>
        <p style={{ fontSize: "16px", color: "#444", lineHeight: 1.75, margin: "0 0 40px" }}>
          {product.description}
        </p>

        <h2 style={{ fontFamily: UBUNTU, fontSize: "22px", fontWeight: 600, margin: "0 0 20px" }}>
          Τι καλύπτει
        </h2>
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px", display: "grid", gap: "12px" }}>
          {product.covers.map((item) => (
            <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "15px", color: "#333", lineHeight: 1.5 }}>
              <Check size={18} color="#1E439A" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: "2px" }} />
              {item}
            </li>
          ))}
        </ul>

        <p style={{ fontSize: "14px", color: "#777", lineHeight: 1.7, margin: "0 0 32px" }}>
          Συνεργαζόμαστε με κορυφαίες ασφαλιστικές εταιρείες, ώστε να βρούμε μαζί το πρόγραμμα που ταιριάζει στις ανάγκες σας. Επικοινωνήστε μαζί μας για μια εξατομικευμένη προσφορά.
        </p>

        <Link href="/" style={{ color: "#1E439A", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
          ← Επιστροφή στην αρχική
        </Link>
      </section>
    </main>
  );
}
