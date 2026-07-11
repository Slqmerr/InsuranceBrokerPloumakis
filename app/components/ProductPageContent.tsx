import Link from "next/link";
import { Check, ChevronRight, Home, Phone } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HeroCtaButtons from "./HeroCtaButtons";
import type { Product } from "./products";

const UBUNTU = "var(--font-ubuntu-sans), sans-serif";

/** Sidebar "Πώς λειτουργεί" steps, phrased around the current product. */
function processSteps(product: Product): { title: string; text: string }[] {
  return [
    {
      title: "Επικοινωνία",
      text: `Μας καλείτε ή ζητάτε προσφορά για «${product.title}» online, χωρίς καμία δέσμευση.`,
    },
    {
      title: "Σύγκριση",
      text: `Εξετάζουμε τα προγράμματα «${product.title}» των συνεργαζόμενων εταιρειών για εσάς.`,
    },
    {
      title: "Απόφαση",
      text: "Επιλέγετε το πρόγραμμα που ταιριάζει σε εσάς — τα υπόλοιπα τα αναλαμβάνουμε εμείς.",
    },
  ];
}

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
            can't inflate the grid row; the blue panel alone sets the hero height */}
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
              <Check size={18} color="#1E439A" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: "2px" }} />
              {item}
            </li>
          ))}
        </ul>

        <p style={{ fontSize: "14px", color: "#777", lineHeight: 1.7, margin: 0 }}>
          Συνεργαζόμαστε με κορυφαίες ασφαλιστικές εταιρείες, ώστε να βρούμε μαζί το πρόγραμμα που ταιριάζει στις ανάγκες σας. Επικοινωνήστε μαζί μας για μια εξατομικευμένη προσφορά.
        </p>
        </div>

        {/* Sticky sidebar — trust points + CTAs follow the reader */}
        <aside style={{
          position: "sticky",
          top: "112px",
          background: "#fff",
          borderRadius: "24px",
          boxShadow: "0 12px 40px rgba(18,35,85,0.12)",
          padding: "32px 28px",
        }}>
          <h3 style={{ fontFamily: UBUNTU, fontSize: "17px", fontWeight: 700, color: "#0F2660", margin: "0 0 20px" }}>
            Πώς λειτουργεί
          </h3>

          <div style={{ display: "grid", gap: "18px", marginBottom: "24px" }}>
            {processSteps(product).map((step, i) => (
              <div key={step.title} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "999px",
                  background: "#1E439A",
                  color: "#fff",
                  fontFamily: UBUNTU,
                  fontSize: "13px",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  {i + 1}
                </div>
                <div>
                  <span style={{ display: "block", fontSize: "14px", color: "#0F2660", fontWeight: 700, lineHeight: 1.45 }}>{step.title}</span>
                  <span style={{ display: "block", fontSize: "13px", color: "#777", lineHeight: 1.5, marginTop: "2px" }}>{step.text}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ height: "1px", background: "#eef0f4", margin: "0 0 24px" }} />

          <div style={{ display: "grid", gap: "10px" }}>
            <Link href={`/prosfora/${product.slug}`} style={{
              background: "#1E439A",
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
              color: "#1E439A",
              border: "1.5px solid #1E439A",
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
            <Phone size={15} color="#1E439A" strokeWidth={1.75} />
            2810 326 400
          </a>
        </aside>
      </section>

      <Footer />
    </main>
  );
}
