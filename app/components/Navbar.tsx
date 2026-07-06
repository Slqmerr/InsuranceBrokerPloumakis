"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { IDIWTES_PRODUCTS, EPIXEIRISI_PRODUCTS } from "./products";

const UBUNTU = "var(--font-ubuntu-sans), sans-serif";
const MotionLink = motion.create(Link);

export default function Navbar() {
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);

  const closeMenu = () => setActiveMenu(null);
  const toggleMenu = (name: string) => setActiveMenu(prev => prev === name ? null : name);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeMenu(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <nav style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        alignItems: "center",
        background: "#1E439A",
        height: "88px",
        padding: "0 36px",
        position: "sticky",
        top: 0,
        zIndex: 100,
        fontFamily: UBUNTU,
      }}>
        {/* Logo — left */}
        <Link href="/" onClick={closeMenu} style={{ justifySelf: "start", display: "inline-flex" }}>
          <img
            src="/logo.png"
            alt="Δημήτριος Πλουμάκης"
            style={{ height: "60px", objectFit: "contain" }}
          />
        </Link>

        {/* Nav links — centered */}
        <ul style={{
          justifySelf: "center",
          display: "flex",
          alignItems: "center",
          gap: "2px",
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}>

          {/* Ιδιώτες — clickable, toggles dropdown */}
          <li>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
              onClick={() => toggleMenu("idiwtes")}
              style={{
                background: "none",
                border: "none",
                color: activeMenu === "idiwtes" ? "#fff" : "rgba(255,255,255,0.80)",
                fontSize: "17px",
                padding: "6px 12px",
                borderRadius: "4px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontFamily: "inherit",
              }}
            >
              Ιδιώτες
              <motion.span
                animate={{ rotate: activeMenu === "idiwtes" ? 180 : 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{ display: "inline-flex", opacity: 0.7 }}
              >
                <ChevronDown size={12} strokeWidth={2.5} />
              </motion.span>
            </motion.button>
          </li>

          {/* Επιχείρηση — clickable, toggles dropdown */}
          <li>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
              onClick={() => toggleMenu("epixeirisi")}
              style={{
                background: "none",
                border: "none",
                color: activeMenu === "epixeirisi" ? "#fff" : "rgba(255,255,255,0.80)",
                fontSize: "17px",
                padding: "6px 12px",
                borderRadius: "4px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontFamily: "inherit",
              }}
            >
              Επιχειρήσεις
              <motion.span
                animate={{ rotate: activeMenu === "epixeirisi" ? 180 : 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{ display: "inline-flex", opacity: 0.7 }}
              >
                <ChevronDown size={12} strokeWidth={2.5} />
              </motion.span>
            </motion.button>
          </li>

          {/* Εμείς — plain link, no dropdown */}
          <li>
            <MotionLink
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
              href="/emeis"
              onClick={closeMenu}
              style={{
                color: "rgba(255,255,255,0.80)",
                textDecoration: "none",
                fontSize: "17px",
                padding: "6px 12px",
                borderRadius: "4px",
                display: "inline-block",
              }}
            >
              Εμείς
            </MotionLink>
          </li>

        </ul>

        {/* CTA — right, standing alone */}
        <Link href="/epikoinonia" onClick={closeMenu} style={{
          justifySelf: "end",
          background: "#fff",
          color: "#1E439A",
          fontWeight: 700,
          fontFamily: UBUNTU,
          padding: "10px 20px",
          borderRadius: "999px",
          textDecoration: "none",
          cursor: "pointer",
          fontSize: "13px",
          whiteSpace: "nowrap",
        }}>
          Κλείσε Ραντεβού
        </Link>
      </nav>

      {/* Backdrop + Mega Dropdown */}
      <AnimatePresence>
        {activeMenu && (
          <React.Fragment key="menu-group">
            <motion.div
              key="backdrop"
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "fixed",
                inset: 0,
                top: "88px",
                background: "rgba(0,0,0,0.45)",
                backdropFilter: "blur(4px)",
                zIndex: 90,
              }}
            />
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{
                position: "fixed",
                top: "88px",
                left: 0,
                right: 0,
                zIndex: 95,
                background: "#fff",
                boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                padding: "40px 64px",
                borderBottom: "1px solid #e8eaef",
              }}
            >
              {/* Re-run the entrance animation when hopping between menus while open */}
              <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeMenu}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{
                display: "flex",
                gap: "0px",
                alignItems: "stretch",
              }}>

                {/* LEFT — product grid (existing content, keep all of it) */}
                <div style={{ flex: "0 0 70%", paddingRight: "48px" }}>
                  {/* Header */}
                  <div style={{ marginBottom: "36px" }}>
                    <p style={{ fontSize: "12px", color: "#888", marginBottom: "4px", letterSpacing: "0.5px", textTransform: "uppercase" }}>
                      Τα προγράμματά μας για
                    </p>
                    <h2 style={{
                      fontFamily: UBUNTU,
                      fontSize: "26px",
                      fontWeight: 700,
                      color: "#1a1a1a",
                      margin: 0,
                    }}>
                      {activeMenu === "idiwtes" ? "ΙΔΙΩΤΕΣ" : "ΕΠΙΧΕΙΡΗΣΕΙΣ"}
                    </h2>
                  </div>

                  {/* Product Grid */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "4px",
                  }}>
                    {(activeMenu === "idiwtes" ? IDIWTES_PRODUCTS : EPIXEIRISI_PRODUCTS).map((product) => (
                      <motion.a
                        key={product.title}
                        href={`/${activeMenu === "idiwtes" ? "idiotes" : "epixeirisi"}/${product.slug}`}
                        initial={{ color: "#5c5c5c" }}
                        whileHover={{ color: product.color }}
                        transition={{ duration: 0.25 }}
                        style={{
                          color: "#5c5c5c",
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                          padding: "16px 20px",
                          borderRadius: "10px",
                          textDecoration: "none",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "#f5f7fb"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                      >
                        <div style={{
                          width: "44px",
                          height: "44px",
                          borderRadius: "10px",
                          background: "#e8eef8",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}>
                          <product.icon size={20} color="currentColor" strokeWidth={1.75} />
                        </div>
                        <div style={{
                          fontSize: "17px",
                          fontWeight: 600,
                          color: "inherit",
                          fontFamily: UBUNTU,
                        }}>
                          {product.title}
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* RIGHT — CTA panel */}
                <div style={{
                  flex: "0 0 30%",
                  background: "#F0F4FF",
                  borderRadius: "16px",
                  padding: "36px 32px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "16px",
                }}>
                  {activeMenu === "idiwtes" && (
                    <>
                      <p style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#1E439A",
                        margin: 0,
                      }}>
                        Δεν ξέρεις από πού να ξεκινήσεις;
                      </p>
                      <h3 style={{
                        fontSize: "22px",
                        fontWeight: 700,
                        color: "#111827",
                        margin: 0,
                        lineHeight: 1.3,
                        fontFamily: "var(--font-ubuntu-sans), sans-serif",
                      }}>
                      Βρες την κατάλληλη ασφάλεια για σένα
                      </h3>
                      <p style={{
                        fontSize: "14px",
                        color: "#4B5563",
                        margin: 0,
                        lineHeight: 1.65,
                      }}>
                        Μας λες τι χρειάζεσαι, εμείς συγκρίνουμε τις καλύτερες προσφορές από 15+ εταιρείες.
                      </p>
                      <Link href="/epikoinonia" onClick={closeMenu} style={{
                        marginTop: "8px",
                        background: "#1E439A",
                        color: "#fff",
                        fontWeight: 700,
                        fontFamily: "var(--font-ubuntu-sans), sans-serif",
                        padding: "13px 24px",
                        borderRadius: "999px",
                        textDecoration: "none",
                        cursor: "pointer",
                        fontSize: "13px",
                        width: "fit-content",
                      }}>
                        Κλείσε ραντεβού
                      </Link>
                    </>
                  )}

                  {activeMenu === "epixeirisi" && (
                    <>
                      <p style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#1E439A",
                        margin: 0,
                      }}>
                        Ασφάλεια για επιχειρήσεις
                      </p>
                      <h3 style={{
                        fontSize: "22px",
                        fontWeight: 700,
                        color: "#111827",
                        margin: 0,
                        lineHeight: 1.3,
                        fontFamily: "var(--font-ubuntu-sans), sans-serif",
                      }}>
                        Είναι κάτι άλλο που σε ενδιαφέρει; 
                      </h3>
                      <p style={{
                        fontSize: "14px",
                        color: "#4B5563",
                        margin: 0,
                        lineHeight: 1.65,
                      }}>
                        Εξατομικευμένες λύσεις για μικρές,μεσαίες και μεγάλες επιχειρήσεις χωρίς περιττές καλύψεις.
                      </p>
                      <Link href="/epikoinonia" onClick={closeMenu} style={{
                        marginTop: "8px",
                        background: "#1E439A",
                        color: "#fff",
                        fontWeight: 700,
                        fontFamily: "var(--font-ubuntu-sans), sans-serif",
                        padding: "13px 24px",
                        borderRadius: "999px",
                        textDecoration: "none",
                        cursor: "pointer",
                        fontSize: "13px",
                        width: "fit-content",
                      }}>
                        Κλείσε ραντεβού
                      </Link>
                    </>
                  )}
                </div>

              </motion.div>
              </AnimatePresence>
            </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>
    </>
  );
}
