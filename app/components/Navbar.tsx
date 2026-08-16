"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/public/logo_white-2.png";
import { ChevronDown, Phone, MapPin, Menu, X, ArrowRight } from "lucide-react";
import type { NavProduct } from "./cmsProducts";
import { navIconFor } from "./navIcons";

const UBUNTU = "var(--font-ubuntu-sans), sans-serif";
const MotionLink = motion.create(Link);

/** GSAP, fetched at the point of use instead of imported at the top of the
 *  file. This component renders in the root layout, so a static import puts
 *  the whole engine (~28KB gzipped) on the critical path of every page on the
 *  site — to animate one drawer that only exists below 1199px and only moves
 *  once someone taps the burger. Behind a dynamic import it lands in its own
 *  chunk that most visits never request.
 *
 *  The promise is cached at module scope so repeated opens reuse one fetch. */
type Gsap = typeof import("gsap").default;
let gsapChunk: Promise<Gsap> | null = null;
const loadGsap = () => (gsapChunk ??= import("gsap").then((m) => m.default));

/** Product lists come from the CMS, fetched in app/layout.tsx (a server
 *  component) and passed down — this component is client-side and can't read
 *  the filesystem itself. They arrive as plain data with an `iconName`, which
 *  navIconFor() turns back into a lucide component here. */
export default function Navbar({
  idiotes,
  epixeirisi,
}: {
  idiotes: NavProduct[];
  epixeirisi: NavProduct[];
}) {
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  // which accordion section is expanded inside the mobile drawer
  const [mobileSection, setMobileSection] = React.useState<string | null>(null);
  const navRef = React.useRef<HTMLElement>(null);
  const drawerRef = React.useRef<HTMLDivElement>(null);
  const drawerBackdropRef = React.useRef<HTMLDivElement>(null);
  const [panelTop, setPanelTop] = React.useState(88);

  // Mobile drawer stays mounted; GSAP slides it in from the right edge and
  // fades the backdrop. visibility is toggled so the closed drawer can't be
  // tabbed into or clicked.
  //
  // The closed state is already the drawer's own inline style, so the run this
  // effect used to do on mount had nothing to show — skipping it until the
  // first open is what keeps the GSAP chunk unfetched on a visit that never
  // touches the menu.
  const hasOpened = React.useRef(false);
  React.useEffect(() => {
    if (!mobileOpen && !hasOpened.current) return;
    hasOpened.current = true;

    let cancelled = false;
    void loadGsap().then((gsap) => {
      const drawer = drawerRef.current;
      const backdrop = drawerBackdropRef.current;
      if (cancelled || !drawer || !backdrop) return;

      if (mobileOpen) {
        gsap.set([drawer, backdrop], { visibility: "visible" });
        gsap.to(backdrop, { opacity: 1, duration: 0.3, ease: "power1.out", overwrite: "auto" });
        gsap.fromTo(drawer,
          { xPercent: 100 },
          { xPercent: 0, duration: 0.5, ease: "power3.out", overwrite: "auto" },
        );
        // useGSAP used to scope a bare ".drawer-item" selector string to
        // drawerRef; without that hook the lookup has to say so itself.
        gsap.fromTo(drawer.querySelectorAll(".drawer-item"),
          { x: 40, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.4, stagger: 0.06, delay: 0.12, ease: "power2.out", overwrite: "auto" },
        );
      } else {
        gsap.to(backdrop, { opacity: 0, duration: 0.25, ease: "power1.in", overwrite: "auto" });
        gsap.to(drawer, {
          xPercent: 100,
          duration: 0.38,
          ease: "power3.in",
          overwrite: "auto",
          onComplete: () => gsap.set([drawer, backdrop], { visibility: "hidden" }),
        });
      }
    });

    return () => { cancelled = true; };
  }, [mobileOpen]);

  // Pull the GSAP chunk down during idle time so the first tap on the burger
  // animates instead of waiting on a network round trip. Gated on the same
  // breakpoint that reveals the burger (globals.css, ≤1199px) — a desktop
  // visitor can't open the drawer, so it should never spend the bytes.
  React.useEffect(() => {
    if (!window.matchMedia("(max-width: 1199px)").matches) return;

    if (typeof window.requestIdleCallback !== "function") {
      const timer = window.setTimeout(() => void loadGsap(), 2000);
      return () => window.clearTimeout(timer);
    }
    const handle = window.requestIdleCallback(() => void loadGsap());
    return () => window.cancelIdleCallback(handle);
  }, []);

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
          {/* Above the fold on every route, so eager rather than the default
              lazy. Not `preload` — the page's own hero is the LCP candidate. */}
          <Image
            src={logo}
            alt="Δημήτριος Πλουμάκης"
            className="nav-logo-img"
            loading="eager"
            // 70px tall at a 2.45 ratio ≈ 172px wide; without `sizes` the srcset
            // is derived from the 839px intrinsic width instead.
            sizes="172px"
            style={{ height: "70px", width: "auto", objectFit: "contain" }}
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
                    {(activeMenu === "idiwtes" ? idiotes : epixeirisi).map((product) => {
                      const Icon = navIconFor(product.iconName);
                      return (
                      <motion.a
                        key={product.slug}
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
                          <Icon size={20} color="currentColor" strokeWidth={1.75} />
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
                      );
                    })}
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

      {/* Mobile drawer — stays mounted; GSAP slides the panel in from the
          right edge (see the drawer effect above). The closed state below is
          what that effect leans on to stay dormant until the first open. */}
      <div
        ref={drawerBackdropRef}
        onClick={closeMenu}
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          top: panelTop,
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(4px)",
          zIndex: 94,
          opacity: 0,
          visibility: "hidden",
        }}
      />
      <div
        ref={drawerRef}
        aria-hidden={!mobileOpen}
        style={{
          position: "fixed",
          top: panelTop,
          right: 0,
          bottom: 0,
          width: "min(84vw, 360px)",
          zIndex: 95,
          background: "#fff",
          boxShadow: "-16px 0 48px rgba(0,0,0,0.18)",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          fontFamily: UBUNTU,
          display: "flex",
          flexDirection: "column",
          visibility: "hidden",
        }}
      >
            <div style={{ padding: "12px 20px 32px", display: "flex", flexDirection: "column" }}>

              {/* Accordion sections — Ιδιώτες / Επιχειρήσεις */}
              {([
                { key: "idiwtes", label: "Ιδιώτες", products: idiotes, base: "idiotes" },
                { key: "epixeirisi", label: "Επιχειρήσεις", products: epixeirisi, base: "epixeirisi" },
              ] as const).map((section) => (
                <div key={section.key} className="drawer-item" style={{ borderBottom: "1px solid #f0e3e3" }}>
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
                          {section.products.map((product) => {
                            const Icon = navIconFor(product.iconName);
                            return (
                            <a
                              key={product.slug}
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
                                <Icon size={18} color="currentColor" strokeWidth={1.75} />
                              </div>
                              <span style={{ fontSize: "15.5px", fontWeight: 600 }}>{product.title}</span>
                            </a>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* See-all — jumps straight to the full programs listing */}
              <Link href="/asfaleies" onClick={closeMenu} className="drawer-item" style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
                padding: "18px 4px",
                borderBottom: "1px solid #f0e3e3",
                fontSize: "18px",
                fontWeight: 700,
                color: "#a30000",
                textDecoration: "none",
              }}>
                Δείτε όλα τα προγράμματά μας
                <ArrowRight size={18} strokeWidth={2.25} style={{ flexShrink: 0 }} />
              </Link>

              {/* Plain links */}
              <Link href="/emeis" onClick={closeMenu} className="drawer-item" style={{
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
              <Link href="/synergasia" onClick={closeMenu} className="drawer-item" style={{
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
              <div className="drawer-item" style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "24px" }}>
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
      </div>
    </>
  );
}
