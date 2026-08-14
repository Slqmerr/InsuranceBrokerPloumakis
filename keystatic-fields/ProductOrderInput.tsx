// The form UI for productOrderField — split into its own "use client" module
// for the same structural reason as ProductTitleInput.tsx: keystatic.config.ts
// is imported by Server Components too (cmsProducts.ts reads the collections
// at build time), so the config's module graph must stay server-safe, and a
// module that statically imports useState/useEffect is not. colorField.tsx and
// iconField.tsx sidestep this by being stateless; this one needs mount state
// and a fetch, so it lives behind a client boundary and the factory references
// it as a client component instead.
"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormFieldInputProps } from "@keystatic/core";
import { navIconFor } from "../app/components/navIcons";

/** One row of the ordering list. The contract between this field and the
 *  route that feeds it — app/api/product-index/route.ts builds exactly this
 *  shape and is type-checked against it. */
export type OrderableProduct = {
  slug: string;
  title: string;
  iconName: string;
  color: string;
  hidden: boolean;
};

export type ProductCategory = "idiotes" | "epixeirisi";

export type ProductIndex = Record<ProductCategory, OrderableProduct[]>;

/** Where the catalogue comes from. The admin UI runs in the browser and can't
 *  read content/ the way the site's server components do, so the product list
 *  arrives over HTTP from the same app. Note this is the *deployed* branch's
 *  catalogue: a product created on a cms/* branch won't appear here until that
 *  branch is merged, and until then it simply sorts to the end of the menu,
 *  which is where an unordered product goes anyway. */
const PRODUCT_INDEX_ENDPOINT = "/api/product-index";

// See colorField.tsx for why --kui-color-* tokens are the correct way to theme
// a third-party field: they track the panel's light/dark state, including when
// the editor forces a scheme with Keystatic's own toggle.
const TEXT_COLOR = "var(--kui-color-foreground-neutral-emphasis, inherit)";
const MUTED_TEXT_COLOR = "var(--kui-color-foreground-neutral, inherit)";
const BORDER_COLOR = "var(--kui-color-border-neutral, rgba(128,128,128,0.4))";
const SURFACE_COLOR = "var(--kui-color-background-canvas, transparent)";
const ACCENT_COLOR = "#1e439a";

const LABEL_STYLE: React.CSSProperties = {
  display: "block",
  fontSize: "0.875rem",
  fontWeight: 600,
  marginBottom: "0.25rem",
  color: TEXT_COLOR,
};

const DESCRIPTION_STYLE: React.CSSProperties = {
  fontSize: "0.75rem",
  lineHeight: 1.5,
  margin: "0 0 0.75rem",
  color: TEXT_COLOR,
};

const LIST_STYLE: React.CSSProperties = {
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
};

const MOVE_BUTTON_STYLE: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "1.75rem",
  height: "1.5rem",
  padding: 0,
  borderRadius: "0.25rem",
  border: `1px solid ${BORDER_COLOR}`,
  background: "transparent",
  color: TEXT_COLOR,
  fontSize: "0.6875rem",
  lineHeight: 1,
};

export function ProductOrderInput({
  value,
  onChange,
  autoFocus,
  category,
  label,
  description,
}: FormFieldInputProps<string[]> & {
  category: ProductCategory;
  label: string;
  description?: string;
}) {
  const [catalogue, setCatalogue] = useState<OrderableProduct[] | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  // The index being dragged, and the index it would land on. Both are purely
  // visual — nothing is written until the drop.
  const [dragFrom, setDragFrom] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);
  // Screen readers get told what a move did, since the visual cue (the row
  // jumping to a new position) is invisible to them.
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch(PRODUCT_INDEX_ENDPOINT)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json() as Promise<ProductIndex>;
      })
      .then((index) => {
        if (!cancelled) setCatalogue(index[category] ?? []);
      })
      .catch(() => {
        if (!cancelled) setLoadFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [category]);

  // The rendered order: the saved sequence first, then anything the sequence
  // doesn't mention. Deliberately derived rather than written back on mount —
  // persisting the merge here would mark the form dirty just for opening it —
  // and reproduced identically on the server by cmsProductsFor() in
  // app/components/cmsProducts.ts, so what the editor drags is what ships.
  const rows = useMemo<OrderableProduct[]>(() => {
    if (!catalogue) {
      // Catalogue unavailable: still show, and allow reordering of, the saved
      // sequence — labelled by slug — rather than an empty box.
      return value.map((slug) => ({
        slug,
        title: slug,
        iconName: "ShieldCheck",
        color: ACCENT_COLOR,
        hidden: false,
      }));
    }
    const bySlug = new Map(catalogue.map((product) => [product.slug, product]));
    // Slugs whose product no longer exists drop out here; the next save then
    // writes the cleaned sequence.
    const ordered = value
      .map((slug) => bySlug.get(slug))
      .filter((product): product is OrderableProduct => product !== undefined);
    const placed = new Set(ordered.map((product) => product.slug));
    const rest = catalogue.filter((product) => !placed.has(product.slug));
    return [...ordered, ...rest];
  }, [catalogue, value]);

  const moveTo = (from: number, to: number) => {
    if (from === to || to < 0 || to >= rows.length) return;
    const slugs = rows.map((row) => row.slug);
    const [moved] = slugs.splice(from, 1);
    slugs.splice(to, 0, moved);
    onChange(slugs);
    setAnnouncement(`${rows[from].title}: θέση ${to + 1} από ${rows.length}`);
  };

  if (!catalogue && !loadFailed && value.length === 0) {
    return (
      <div>
        <span style={LABEL_STYLE}>{label}</span>
        <p style={{ ...DESCRIPTION_STYLE, color: MUTED_TEXT_COLOR }}>
          Φόρτωση προϊόντων…
        </p>
      </div>
    );
  }

  return (
    <div>
      <span style={LABEL_STYLE}>{label}</span>
      {description ? <p style={DESCRIPTION_STYLE}>{description}</p> : null}

      {loadFailed ? (
        <p style={{ ...DESCRIPTION_STYLE, color: MUTED_TEXT_COLOR }}>
          Η λίστα προϊόντων δεν φορτώθηκε. Η σειρά που είχε αποθηκευτεί
          εμφανίζεται παρακάτω και μπορεί να αλλάξει, αλλά τυχόν νέα προϊόντα
          δεν φαίνονται — δοκιμάστε ανανέωση της σελίδας.
        </p>
      ) : null}

      <ol style={LIST_STYLE}>
        {rows.map((row, index) => {
          const Icon = navIconFor(row.iconName);
          const isDragging = dragFrom === index;
          // The drop indicator sits on the hovered row, on the side the
          // dragged row would come to rest.
          const isDropTarget = dragOver === index && dragFrom !== index;
          const dropsBelow = isDropTarget && dragFrom !== null && dragFrom < index;
          const isFirst = index === 0;
          const isLast = index === rows.length - 1;

          return (
            <li
              key={row.slug}
              draggable
              onDragStart={(event) => {
                setDragFrom(index);
                event.dataTransfer.effectAllowed = "move";
                // Firefox refuses to start a drag unless data is set.
                event.dataTransfer.setData("text/plain", row.slug);
              }}
              onDragOver={(event) => {
                event.preventDefault();
                event.dataTransfer.dropEffect = "move";
                setDragOver(index);
              }}
              onDragLeave={() => {
                setDragOver((current) => (current === index ? null : current));
              }}
              onDrop={(event) => {
                event.preventDefault();
                if (dragFrom !== null) moveTo(dragFrom, index);
                setDragFrom(null);
                setDragOver(null);
              }}
              onDragEnd={() => {
                setDragFrom(null);
                setDragOver(null);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
                padding: "0.5rem 0.625rem",
                borderRadius: "0.375rem",
                border: `1px solid ${BORDER_COLOR}`,
                background: SURFACE_COLOR,
                opacity: isDragging ? 0.4 : 1,
                cursor: "grab",
                // A 2px edge marks where the row will land.
                boxShadow: isDropTarget
                  ? `inset 0 ${dropsBelow ? "-2px" : "2px"} 0 0 ${ACCENT_COLOR}`
                  : "none",
              }}
            >
              <span
                aria-hidden
                style={{
                  color: MUTED_TEXT_COLOR,
                  fontSize: "0.875rem",
                  lineHeight: 1,
                }}
              >
                ⠿
              </span>

              <span
                aria-hidden
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "1.75rem",
                  height: "1.75rem",
                  flexShrink: 0,
                  borderRadius: "0.375rem",
                  // The product's own accent colour at ~12% opacity, so the
                  // row reads like the card it controls.
                  background: `${row.color}1f`,
                  color: row.color,
                }}
              >
                <Icon size={16} strokeWidth={1.75} />
              </span>

              <span
                style={{
                  flex: 1,
                  minWidth: 0,
                  fontSize: "0.875rem",
                  color: TEXT_COLOR,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {row.title}
              </span>

              {/* A product hidden from the menu still has a place in this
                  list — it's ordered on /asfaleies — so label it rather than
                  leave the editor wondering why the row they moved to the top
                  never showed up in the navbar. */}
              {row.hidden ? (
                <span
                  style={{
                    flexShrink: 0,
                    fontSize: "0.6875rem",
                    padding: "0.125rem 0.375rem",
                    borderRadius: "999px",
                    border: `1px solid ${BORDER_COLOR}`,
                    color: MUTED_TEXT_COLOR,
                  }}
                >
                  εκτός μενού
                </span>
              ) : null}

              <span
                aria-hidden
                style={{
                  flexShrink: 0,
                  minWidth: "1.25rem",
                  textAlign: "right",
                  fontSize: "0.75rem",
                  color: MUTED_TEXT_COLOR,
                }}
              >
                {index + 1}
              </span>

              {/* Dragging is mouse-only: HTML5 drag events don't fire on
                  touch, and a keyboard has nothing to drag with. These buttons
                  are the same operation for everyone else. Rows are keyed by
                  slug, so React moves the button's DOM node rather than
                  rebuilding it and focus follows the row you're moving. */}
              <span style={{ display: "flex", gap: "0.25rem", flexShrink: 0 }}>
                <button
                  type="button"
                  autoFocus={autoFocus && isFirst}
                  disabled={isFirst}
                  aria-label={`Μετακίνηση «${row.title}» προς τα πάνω`}
                  onClick={() => moveTo(index, index - 1)}
                  style={{
                    ...MOVE_BUTTON_STYLE,
                    opacity: isFirst ? 0.4 : 1,
                    cursor: isFirst ? "default" : "pointer",
                  }}
                >
                  ▲
                </button>
                <button
                  type="button"
                  disabled={isLast}
                  aria-label={`Μετακίνηση «${row.title}» προς τα κάτω`}
                  onClick={() => moveTo(index, index + 1)}
                  style={{
                    ...MOVE_BUTTON_STYLE,
                    opacity: isLast ? 0.4 : 1,
                    cursor: isLast ? "default" : "pointer",
                  }}
                >
                  ▼
                </button>
              </span>
            </li>
          );
        })}
      </ol>

      <p
        aria-live="polite"
        style={{ ...DESCRIPTION_STYLE, margin: "0.5rem 0 0", color: MUTED_TEXT_COLOR }}
      >
        {announcement || "Σύρετε μια γραμμή ή χρησιμοποιήστε τα βελάκια."}
      </p>
    </div>
  );
}
