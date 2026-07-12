"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Phone, MapPin, Menu, X } from "lucide-react";
import { IDIWTES_PRODUCTS, EPIXEIRISI_PRODUCTS } from "./products";

const UBUNTU = "var(--font-ubuntu-sans), sans-serif";
const MotionLink = motion.create(Link);

export default function Navbar() {
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  // which accordion section is expanded inside the mobile drawer
  const [mobileSection, setMobileSection] = React.useState<string | null>(null);
  const navRef = React.useRef<HTMLElement>(null);
  const [panelTop, setPanelTop] = React.useState(88);

  // The top address strip scrolls away while the nav is sticky, so the
  // dropdown's anchor point moves — track the nav's real bottom edge.
  React.useEffect(() => {
    if (!activeMenu && !mobileOpen) return;
    const update = () => {
      const rect = navRef.current?.getBoundingClientRect();
      if (rect) setPanelTop(rect.bottom);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [activeMenu, mobileOpen]);

  const closeMenu = () => {
    setActiveMenu(null);
    setMobileOpen(false);
  };
  const toggleMenu = (name: string) => setActiveMenu(prev => prev === name ? null : name);
  const toggleMobileSection = (name: string) =>
    setMobileSection(prev => (prev === name ? null : name));

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeMenu(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Lock page scroll while the mobile drawer is open
  React.useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [mobileOpen]);

  return (
    <>
      {/* Top strip — address, very top right */}
      <div className="nav-strip" style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        background: "#a30000",
        padding: "8px 36px",
        borderBottom: "1px solid rgba(255,255,255,0.14)",
        fontFamily: UBUNTU,
      }}>
        <a
          href="https://maps.google.com/?q=Κυδωνίας 8 %26 Ανδρεαδάκη, 71202 Ηράκλειο"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            color: "rgba(255,255,255,0.65)",
            textDecoration: "none",
            fontSize: "12.5px",
            whiteSpace: "nowrap",
          }}
        >
          <MapPin size={13} strokeWidth={1.75} />
          Κυδωνίας 8 &amp; Ανδρεαδάκη, 71202 Ηράκλειο
        </a>
      </div>

      <nav ref={navRef} className="nav-bar" style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        alignItems: "center",
        background: "#a30000",
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
            src="/logo_white-2.png"
            alt="Δημήτριος Πλουμάκης"
            className="nav-logo-img"
            style={{ height: "70px", objectFit: "contain" }}
          />
        </Link>

        {/* Nav links — centered */}
        <ul className="nav-links" style={{
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
              Επαγγελματικό Προφίλ
            </MotionLink>
          </li>

          {/* Συνεργάσου μαζί μας — plain link, no dropdown */}
          <li>
            <MotionLink
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
              href="/synergasia"
              onClick={closeMenu}
              style={{
                color: "rgba(255,255,255,0.80)",
                textDecoration: "none",
                fontSize: "17px",
                padding: "6px 12px",
                borderRadius: "4px",
                display: "inline-block",
                whiteSpace: "nowrap",
              }}
            >
              Συνεργάσου μαζί μας
            </MotionLink>
          </li>

        </ul>

        {/* Phone + CTA — right */}
        <div className="nav-right" style={{
          justifySelf: "end",
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}>
          <a href="tel:+302810326400" className="nav-phone" style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "rgba(255,255,255,0.85)",
            textDecoration: "none",
            fontSize: "15px",
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}>
            <Phone size={15} strokeWidth={1.75} />
            2810 326 400
          </a>
          <Link href="/epikoinonia" onClick={closeMenu} className="nav-cta" style={{
            background: "#fff",
            color: "#a30000",
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

          {/* Hamburger — mobile only (shown via globals.css) */}
          <button
            className="nav-burger"
            aria-label={mobileOpen ? "Κλείσιμο μενού" : "Άνοιγμα μενού"}
            aria-expanded={mobileOpen}
            onClick={() => { setActiveMenu(null); setMobileOpen(prev => !prev); }}
            style={{
              display: "none",
              background: "none",
              border: "none",
              color: "#fff",
              padding: "8px",
              cursor: "pointer",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {mobileOpen ? <X size={26} strokeWidth={2} /> : <Menu size={26} strokeWidth={2} />}
          </button>
        </div>
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
                top: panelTop,
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
                top: panelTop,
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
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
                    <span style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      textTransform: "none",
                      color: "#a30000",
                      whiteSpace: "nowrap",
                    }}>
                      Προγράμματα για {activeMenu === "idiwtes" ? "ιδιώτες" : "επιχειρήσεις"}
                    </span>
                    <div style={{ flex: 1, height: "1px", background: "#e8eaef" }} />
                  </div>

                  {/* Product Grid */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: activeMenu === "idiwtes" ? "repeat(3, 1fr)" : "repeat(2, 1fr)",
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
                        onMouseEnter={(e) => { e.currentTarget.style.background = "#fbf5f5"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                      >
                        <div style={{
                          width: "44px",
                          height: "44px",
                          borderRadius: "10px",
                          background: "#f7e8e8",
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
                  background: "#faf0f0",
                  borderRadius: "16px",
                  padding: "36px 32px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "16px",
                }}>
                  {activeMenu === "idiwtes" && (
                    <>

                      <h3 style={{
                        fontSize: "22px",
                        fontWeight: 700,
                        color: "#111827",
                        margin: 0,
                        lineHeight: 1.3,
                        fontFamily: "var(--font-ubuntu-sans), sans-serif",
                      }}>
                       Δεν βρίσκεις αυτό που ψάχνεις;
                      </h3>
                      <p style={{
                        fontSize: "14px",
                        color: "#4B5563",
                        margin: 0,
                        lineHeight: 1.65,
                      }}>
                        Μας λες τι χρειάζεσαι, εμείς συγκρίνουμε τις καλύτερες προσφορές από 15+ εταιρείες.
                      </p>
                      <Link href="/asfaleies" onClick={closeMenu} style={{
                        marginTop: "8px",
                        background: "#a30000",
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
                        Δείτε όλα τα προγράμματα
                      </Link>
                    </>
                  )}

                  {activeMenu === "epixeirisi" && (
                    <>

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
                      <Link href="/asfaleies" onClick={closeMenu} style={{
                        marginTop: "8px",
                        background: "#a30000",
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
                        Δείτε όλα τα προγράμματα
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

      {/* Mobile drawer — full-screen panel under the nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{
              position: "fixed",
              top: panelTop,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 95,
              background: "#fff",
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",
              fontFamily: UBUNTU,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ padding: "12px 20px 32px", display: "flex", flexDirection: "column" }}>

              {/* Accordion sections — Ιδιώτες / Επιχειρήσεις */}
              {([
                { key: "idiwtes", label: "Ιδιώτες", products: IDIWTES_PRODUCTS, base: "idiotes" },
                { key: "epixeirisi", label: "Επιχειρήσεις", products: EPIXEIRISI_PRODUCTS, base: "epixeirisi" },
              ] as const).map((section) => (
                <div key={section.key} style={{ borderBottom: "1px solid #f0e3e3" }}>
                  <button
                    onClick={() => toggleMobileSection(section.key)}
                    aria-expanded={mobileSection === section.key}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      background: "none",
                      border: "none",
                      padding: "18px 4px",
                      fontSize: "18px",
                      fontWeight: 700,
                      color: mobileSection === section.key ? "#a30000" : "#1a1a1a",
                      fontFamily: "inherit",
                      cursor: "pointer",
                    }}
                  >
                    {section.label}
                    <motion.span
                      animate={{ rotate: mobileSection === section.key ? 180 : 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      style={{ display: "inline-flex", color: "#a30000" }}
                    >
                      <ChevronDown size={18} strokeWidth={2.25} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {mobileSection === section.key && (
                      <motion.div
                        key="section-body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px", paddingBottom: "14px" }}>
                          {section.products.map((product) => (
                            <a
                              key={product.title}
                              href={`/${section.base}/${product.slug}`}
                              onClick={closeMenu}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "14px",
                                padding: "10px 4px",
                                borderRadius: "10px",
                                textDecoration: "none",
                                color: "#5c5c5c",
                              }}
                            >
                              <div style={{
                                width: "38px",
                                height: "38px",
                                borderRadius: "10px",
                                background: "#f7e8e8",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                                color: "#a30000",
                              }}>
                                <product.icon size={18} color="currentColor" strokeWidth={1.75} />
                              </div>
                              <span style={{ fontSize: "15.5px", fontWeight: 600 }}>{product.title}</span>
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Plain links */}
              <Link href="/emeis" onClick={closeMenu} style={{
                display: "block",
                padding: "18px 4px",
                borderBottom: "1px solid #f0e3e3",
                fontSize: "18px",
                fontWeight: 700,
                color: "#1a1a1a",
                textDecoration: "none",
              }}>
                Επαγγελματικό Προφίλ
              </Link>
              <Link href="/synergasia" onClick={closeMenu} style={{
                display: "block",
                padding: "18px 4px",
                borderBottom: "1px solid #f0e3e3",
                fontSize: "18px",
                fontWeight: 700,
                color: "#1a1a1a",
                textDecoration: "none",
              }}>
                Συνεργάσου μαζί μας
              </Link>

              {/* Contact + CTA */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "24px" }}>
                <a href="tel:+302810326400" style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "#a30000",
                  textDecoration: "none",
                  fontSize: "16px",
                  fontWeight: 700,
                }}>
                  <Phone size={17} strokeWidth={2} />
                  2810 326 400
                </a>
                <Link href="/epikoinonia" onClick={closeMenu} style={{
                  background: "#a30000",
                  color: "#fff",
                  fontWeight: 700,
                  textAlign: "center",
                  padding: "15px 24px",
                  borderRadius: "999px",
                  textDecoration: "none",
                  fontSize: "15px",
                }}>
                  Κλείσε Ραντεβού
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
