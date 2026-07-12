"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { IDIWTES_PRODUCTS, EPIXEIRISI_PRODUCTS, EXTRA_IDIWTES_PAGES, type Product } from "../components/products";

const UBUNTU = "var(--font-ubuntu-sans), sans-serif";

const ALL_IDIWTES = [...IDIWTES_PRODUCTS, ...EXTRA_IDIWTES_PAGES];

// Accent-insensitive, case-insensitive matching so "υγεια" finds «Υγεία»
function normalize(text: string) {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

function SearchBar({
  products,
  value,
  onChange,
}: {
  products: Product[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [suggestionIndex, setSuggestionIndex] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setSuggestionIndex((i) => (i + 1) % products.length);
    }, 2200);
    return () => clearInterval(id);
  }, [products.length]);

  return (
    <div style={{
      position: "relative",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      background: "#fff",
      border: "1px solid #e0e4ec",
      borderRadius: "999px",
      padding: "14px 24px",
      maxWidth: "440px",
      boxShadow: "0 2px 12px rgba(163, 0, 0,0.06)",
    }}>
      <Search size={18} strokeWidth={2} color="#a30000" style={{ flexShrink: 0 }} />
      <div style={{ position: "relative", flex: 1 }}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: "100%",
            border: "none",
            outline: "none",
            background: "transparent",
            fontSize: "15px",
            color: "#1a1a1a",
            fontFamily: UBUNTU,
          }}
        />
        {/* Scrolling placeholder — product names slide upward until the user types */}
        {value === "" && (
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            gap: "5px",
            pointerEvents: "none",
            fontSize: "15px",
            color: "#9aa3b5",
            overflow: "hidden",
          }}>
            <span>Αναζήτηση:</span>
            <div style={{ position: "relative", height: "22px", overflow: "hidden", flex: 1 }}>
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={suggestionIndex}
                  initial={{ y: 22, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -22, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    lineHeight: "22px",
                    whiteSpace: "nowrap",
                    color: "#a30000",
                    fontWeight: 500,
                  }}
                >
                  {products[suggestionIndex].title}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductGrid({ products, basePath }: { products: Product[]; basePath: string }) {
  if (products.length === 0) {
    return (
      <p style={{ color: "#9aa3b5", fontSize: "15px", padding: "24px 0" }}>
        Δεν βρέθηκε ασφάλεια με αυτό το όνομα.
      </p>
    );
  }
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
      gap: "12px",
    }}>
      {products.map((product) => (
        <motion.a
          key={product.slug}
          href={`${basePath}/${product.slug}`}
          layout
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          whileHover={{ y: -3 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            background: "#fff",
            border: "1px solid #e8eaef",
            borderRadius: "14px",
            padding: "18px 20px",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = product.color; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e8eaef"; }}
        >
          <div style={{
            width: "46px",
            height: "46px",
            borderRadius: "10px",
            background: "#eef2fa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            color: product.color,
          }}>
            <product.icon size={21} color="currentColor" strokeWidth={1.75} />
          </div>
          <div style={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#1a1a1a",
            fontFamily: UBUNTU,
          }}>
            {product.title}
          </div>
        </motion.a>
      ))}
    </div>
  );
}

function CategorySection({
  label,
  products,
  basePath,
}: {
  label: string;
  products: Product[];
  basePath: string;
}) {
  const [query, setQuery] = React.useState("");
  const filtered = products.filter((p) => normalize(p.title).includes(normalize(query)));

  return (
    <section style={{ marginBottom: "72px" }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "20px",
        marginBottom: "28px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: "1 1 auto" }}>
          <h2 style={{
            fontFamily: UBUNTU,
            fontSize: "24px",
            fontWeight: 700,
            color: "#1a1a1a",
            margin: 0,
            whiteSpace: "nowrap",
          }}>
            {label}
          </h2>
          <div style={{ flex: 1, height: "1px", background: "#e8eaef", minWidth: "40px" }} />
        </div>
        <div style={{ flex: "1 1 320px", maxWidth: "440px" }}>
          <SearchBar products={products} value={query} onChange={setQuery} />
        </div>
      </div>
      <ProductGrid products={filtered} basePath={basePath} />
    </section>
  );
}

export default function AsfaleiesPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#f7f9fc", flex: 1 }}>
        <div className="page-shell" style={{ maxWidth: "1140px", margin: "0 auto", padding: "64px 36px 40px" }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ marginBottom: "56px" }}
          >
            <h1 className="page-title" style={{
              fontFamily: UBUNTU,
              fontSize: "36px",
              fontWeight: 700,
              color: "#1a1a1a",
              margin: "0 0 12px",
            }}>
              Όλες οι ασφάλειες
            </h1>
            <p style={{ fontSize: "16px", color: "#5c6470", lineHeight: 1.6, margin: 0, maxWidth: "560px" }}>
              Βρείτε το πρόγραμμα που σας ενδιαφέρει — για εσάς και την οικογένειά σας, ή για την επιχείρησή σας.
            </p>
          </motion.div>

          <CategorySection label="Ιδιώτες" products={ALL_IDIWTES} basePath="/idiotes" />
          <CategorySection label="Επιχειρήσεις" products={EPIXEIRISI_PRODUCTS} basePath="/epixeirisi" />
        </div>
      </main>
      <Footer />
    </>
  );
}
