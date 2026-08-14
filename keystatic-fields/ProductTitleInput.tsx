// The form UI for productTitleField — split into its own "use client" module
// for a structural reason, not a stylistic one.
//
// keystatic.config.ts is imported by Server Components too (cmsProducts.ts
// reads the collections at build time to generate the product pages), so the
// config's module graph must stay server-safe. A module that statically
// imports useState/useRef is not, and Turbopack fails the build with
// "You're importing a module that depends on `useRef` into a React Server
// Component module". colorField.tsx sidesteps this by being stateless; this
// field genuinely needs mount state, so it lives behind a client boundary and
// the factory references it as a client component instead.
"use client";

import { useId, useRef, useState } from "react";
import type { FormFieldInputProps } from "@keystatic/core";
import { greekSlug } from "./greekSlug";

export type SlugValue = { name: string; slug: string };

// See colorField.tsx for why --kui-color-* tokens are the correct way to
// theme a third-party field: they track the panel's light/dark state,
// including when the editor forces a scheme with Keystatic's own toggle.
const TEXT_COLOR = "var(--kui-color-foreground-neutral-emphasis, inherit)";
const MUTED_TEXT_COLOR = "var(--kui-color-foreground-neutral, inherit)";
const BORDER_COLOR = "var(--kui-color-border-neutral, rgba(128,128,128,0.4))";
const DANGER_COLOR = "var(--kui-color-foreground-critical, #b3261e)";

const LABEL_STYLE: React.CSSProperties = {
  display: "block",
  fontSize: "0.875rem",
  fontWeight: 600,
  marginBottom: "0.25rem",
  color: TEXT_COLOR,
};

const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  maxWidth: "32rem",
  padding: "0.5rem 0.625rem",
  fontSize: "0.875rem",
  color: TEXT_COLOR,
  background: "var(--kui-color-background-canvas, transparent)",
  border: `1px solid ${BORDER_COLOR}`,
  borderRadius: "0.375rem",
};

const HINT_STYLE: React.CSSProperties = {
  fontSize: "0.75rem",
  lineHeight: 1.5,
  color: MUTED_TEXT_COLOR,
  margin: "0.375rem 0 0",
};

const SLUG_PATTERN = /^[a-z0-9-]+$/;

export function ProductTitleInput({
  value,
  onChange,
  autoFocus,
  forceValidation,
  routeBase,
}: FormFieldInputProps<SlugValue> & { routeBase: "idiotes" | "epixeirisi" }) {
  // Captured once, at mount. Deliberately NOT derived from the current value
  // on each render: 12 of the 17 existing slugs happen to be exact
  // transliterations of their title, so "does the slug still match the title"
  // would wrongly classify those live entries as freshly-generated and let a
  // title edit rewrite a published URL. Mount state is what separates the two.
  const isNewEntry = useRef(value.slug === "").current;
  // A developer who opens the disclosure and edits the slug by hand owns it
  // from then on — the title must stop overwriting their choice.
  const [slugIsManual, setSlugIsManual] = useState(false);
  const [showSlug, setShowSlug] = useState(false);
  const titleId = useId();
  const slugId = useId();

  const autoDerives = isNewEntry && !slugIsManual;

  function onNameChange(name: string) {
    onChange({ name, slug: autoDerives ? greekSlug(name) : value.slug });
  }

  const nameIsEmpty = value.name.trim() === "";
  // Keystatic only sets forceValidation once the editor tries to save, so this
  // reveals the slug exactly when something about it needs attention: empty,
  // malformed, or a duplicate of a sibling — the last of which this component
  // can't detect itself, since it isn't handed the sibling slugs.
  const slugLooksInvalid = forceValidation && !SLUG_PATTERN.test(value.slug);
  const slugVisible = showSlug || slugLooksInvalid;

  return (
    <div>
      <label style={LABEL_STYLE} htmlFor={titleId}>
        Τίτλος
      </label>
      <input
        id={titleId}
        type="text"
        autoFocus={autoFocus}
        value={value.name}
        onChange={(e) => onNameChange(e.target.value)}
        style={{
          ...INPUT_STYLE,
          borderColor: forceValidation && nameIsEmpty ? DANGER_COLOR : BORDER_COLOR,
        }}
      />
      {forceValidation && nameIsEmpty ? (
        <p style={{ ...HINT_STYLE, color: DANGER_COLOR }}>Ο τίτλος είναι υποχρεωτικός.</p>
      ) : null}

      <p style={HINT_STYLE}>
        Διεύθυνση:{" "}
        <code style={{ color: TEXT_COLOR }}>
          /{routeBase}/{value.slug || "…"}
        </code>{" "}
        {isNewEntry
          ? "— συμπληρώνεται αυτόματα από τον τίτλο."
          : "— κλειδωμένη, ώστε να μη χαλάσει ο υπάρχων σύνδεσμος."}
      </p>

      {slugLooksInvalid ? (
        <p style={{ ...HINT_STYLE, color: DANGER_COLOR }}>
          Η διεύθυνση δεν είναι έγκυρη ή χρησιμοποιείται ήδη από άλλο προϊόν. Διορθώστε την
          παρακάτω ή επικοινωνήστε με τον developer.
        </p>
      ) : null}

      {slugVisible ? (
        <div style={{ marginTop: "0.625rem" }}>
          <label style={LABEL_STYLE} htmlFor={slugId}>
            Slug (URL) — μόνο developer
          </label>
          <input
            id={slugId}
            type="text"
            value={value.slug}
            onChange={(e) => {
              setSlugIsManual(true);
              onChange({ name: value.name, slug: e.target.value });
            }}
            style={{
              ...INPUT_STYLE,
              fontFamily: "monospace",
              borderColor: slugLooksInvalid ? DANGER_COLOR : BORDER_COLOR,
            }}
          />
          <p style={HINT_STYLE}>
            Μόνο πεζά λατινικά, αριθμοί και παύλες.{" "}
            {isNewEntry
              ? "Αν δεν το πειράξετε, ακολουθεί τον τίτλο."
              : "ΠΡΟΣΟΧΗ: αλλαγή εδώ σπάει τον υπάρχοντα σύνδεσμο του προϊόντος."}
          </p>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowSlug(true)}
          style={{
            marginTop: "0.375rem",
            padding: 0,
            fontSize: "0.75rem",
            color: MUTED_TEXT_COLOR,
            background: "none",
            border: "none",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Αλλαγή διεύθυνσης (developer)
        </button>
      )}
    </div>
  );
}
