import Link from "next/link";
import { Check, ChevronRight, FileText, Home, Phone } from "lucide-react";
import Navbar from "./Navbar";
import HeroCtaButtons from "./HeroCtaButtons";
import type { Product } from "./products";

const UBUNTU = "var(--font-ubuntu-sans), sans-serif";

/**
 * Shared layout for every product detail page.
 * Hero = red text panel (left half) + product photo (right half).
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

      {/* Hero — red copy half + photo half */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "460px" }}>
        {/* Left: red panel */}
        <div style={{
          background: "#a30000",
          padding: "64px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
        }}>
          {/* Breadcrumb — home icon › current product (plain text, not a link),
              pinned to the top of the panel so the centered copy is untouched */}
          <nav
            aria-label="breadcrumb"
            style={{
              position: "absolute",
              top: "24px",
              left: "64px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: UBUNTU,
              fontSize: "13px",
            }}
          >
            <Link href="/" aria-label="Αρχική" style={{ display: "inline-flex", alignItems: "center", color: "rgba(255,255,255,0.75)" }}>
              <Home size={16} strokeWidth={1.9} />
            </Link>
            <ChevronRight size={14} strokeWidth={1.9} color="rgba(255,255,255,0.5)" />
            <span style={{ color: "#fff", fontWeight: 600 }}>{product.title}</span>
          </nav>

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

          {/* Quote page arrives with prompt 11 — links 404 in dev until then */}
          <HeroCtaButtons href={`/prosfora/${product.slug}`} />
        </div>

        {/* Right: product photo — absolutely positioned so its intrinsic size
            can't inflate the grid row; the red panel alone sets the hero height */}
        <div style={{ position: "relative", minHeight: "460px" }}>
          <img
            src={product.image}
            alt={product.title}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: product.imagePosition ?? "center" }}
          />
        </div>
      </section>

      {/* Body — description + what it covers, with a sticky CTA sidebar */}
      <section style={{
        padding: "64px",
        display: "grid",
        gridTemplateColumns: "minmax(0, 720px) 320px",
        gap: "64px",
        alignItems: "start",
      }}>
        <div>
        <p style={{ fontSize: "16px", color: "#444", lineHeight: 1.75, margin: "0 0 40px" }}>
          {product.description}
        </p>

        <h2 style={{ fontFamily: UBUNTU, fontSize: "22px", fontWeight: 600, margin: "0 0 20px" }}>
          Τι καλύπτει
        </h2>
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px", display: "grid", gap: "12px" }}>
          {product.covers.map((item) => (
            <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "15px", color: "#333", lineHeight: 1.5 }}>
              <Check size={18} color="#a30000" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: "2px" }} />
              {item}
            </li>
          ))}
        </ul>

        <p style={{ fontSize: "14px", color: "#777", lineHeight: 1.7, margin: "0 0 32px" }}>
          Συνεργαζόμαστε με κορυφαίες ασφαλιστικές εταιρείες, ώστε να βρούμε μαζί το πρόγραμμα που ταιριάζει στις ανάγκες σας. Επικοινωνήστε μαζί μας για μια εξατομικευμένη προσφορά.
        </p>
 {/* LINK */ }
        <Link href={`/prosfora/${product.slug}`} style={{
          background: "#a30000",
          color: "#fff",
          fontWeight: 700,
          fontFamily: UBUNTU,
          padding: "13px 30px",
          borderRadius: "999px",
          textDecoration: "none",
          fontSize: "14px",
          display: "inline-block",
        }}>
          Ζητήστε Προσφορά
        </Link>
        </div>

        {/* Sticky sidebar — trust points + CTAs follow the reader */}
        <aside style={{
          position: "sticky",
          top: "112px",
          background: "#fff",
          borderRadius: "24px",
          boxShadow: "0 12px 40px rgba(122,21,25,0.12)",
          padding: "32px 28px",
        }}>
          <h3 style={{ fontFamily: UBUNTU, fontSize: "17px", fontWeight: 700, color: "#5e0000", margin: "0 0 20px" }}>
            Τι θα χρειαστείτε
          </h3>

          <div style={{ display: "grid", gap: "14px", marginBottom: "20px" }}>
            {product.needs.map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "#f7e8e8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <FileText size={17} color="#a30000" strokeWidth={1.75} />
                </div>
                <span style={{ fontSize: "14px", color: "#333", fontWeight: 600, lineHeight: 1.45, alignSelf: "center" }}>{item}</span>
              </div>
            ))}
          </div>

          <p style={{ fontSize: "13px", color: "#777", lineHeight: 1.5, margin: "0 0 24px" }}>
            Τα υπόλοιπα τα αναλαμβάνουμε εμείς.
          </p>

          <div style={{ height: "1px", background: "#eef0f4", margin: "0 0 24px" }} />

          <div style={{ display: "grid", gap: "10px" }}>
            <Link href={`/prosfora/${product.slug}`} style={{
              background: "#a30000",
              color: "#fff",
              fontWeight: 700,
              fontFamily: UBUNTU,
              padding: "13px 24px",
              borderRadius: "999px",
              textDecoration: "none",
              fontSize: "14px",
              textAlign: "center",
            }}>
              Ζητήστε Προσφορά
            </Link>
            <Link href="/epikoinonia" style={{
              background: "transparent",
              color: "#a30000",
              border: "1.5px solid #a30000",
              fontWeight: 700,
              fontFamily: UBUNTU,
              padding: "12px 24px",
              borderRadius: "999px",
              textDecoration: "none",
              fontSize: "14px",
              textAlign: "center",
            }}>
              Κλείσε Ραντεβού
            </Link>
          </div>

          <a href="tel:+302810326400" style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginTop: "20px",
            color: "#4b5563",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: 600,
          }}>
            <Phone size={15} color="#a30000" strokeWidth={1.75} />
            2810 326 400
          </a>
        </aside>
      </section>
    </main>
  );
}
