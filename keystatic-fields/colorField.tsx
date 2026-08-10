// A custom Keystatic form field that renders a real colour picker inside the
// entry form: a native colour well (the OS/browser picker — gradient area,
// hue slider, eyedropper) plus a row of one-click palette swatches. The
// editor never types or reads a hex code, and isn't limited to a preset list.
//
// Keystatic has no `fields.color`, but `BasicFormField` is part of its public
// API surface (exported from @keystatic/core), so a field is just an object
// with an `Input` component and parse/serialize/validate functions. This is
// that object — not a DOM hack against Keystatic's own markup.
//
// The stored value is a plain lowercase `#rrggbb` string, identical in shape
// to what the old `fields.select` wrote, so the 17 existing product YAML
// files and `cmsProducts.ts` need no changes.
import type { BasicFormField, FormFieldInputProps } from "@keystatic/core";

/** Quick-pick swatches. Not a limit — the colour well next to them accepts
 *  any colour. The first 12 are the accent colours already used by the 17
 *  existing products, so those entries open with their swatch pre-selected. */
export const COLOR_PALETTE: readonly { value: string; label: string }[] = [
  { value: "#e0245e", label: "Έντονο ροζ" },
  { value: "#a30000", label: "Σκούρο κόκκινο" },
  { value: "#ea580c", label: "Πορτοκαλί" },
  { value: "#4f46e5", label: "Ίντιγκο" },
  { value: "#b45309", label: "Καφέ-κεχριμπάρι" },
  { value: "#0ea5e9", label: "Γαλάζιο" },
  { value: "#f59e0b", label: "Κεχριμπαρί" },
  { value: "#0d9488", label: "Τιρκουάζ" },
  { value: "#9333ea", label: "Μωβ" },
  { value: "#2e9e5b", label: "Πράσινο" },
  { value: "#1e3a8a", label: "Μπλε βαθύ" },
  { value: "#0f766e", label: "Πετρόλ" },
  { value: "#1e439a", label: "Εταιρικό μπλε" },
  { value: "#2563eb", label: "Μπλε" },
  { value: "#0891b2", label: "Κυανό" },
  { value: "#15803d", label: "Πράσινο σκούρο" },
  { value: "#4d7c0f", label: "Λαχανί" },
  { value: "#dc2626", label: "Κόκκινο" },
  { value: "#be185d", label: "Φούξια" },
  { value: "#7c3aed", label: "Βιολετί" },
  { value: "#78350f", label: "Καφέ" },
  { value: "#334155", label: "Ανθρακί" },
];

/** `<input type="color">` only accepts a lowercase `#rrggbb` string — given
 *  anything else it silently falls back to black. Shorthand and uppercase hex
 *  are valid in YAML and in CSS, so widen them here rather than at rest. */
function normalizeHex(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const hex = value.trim().toLowerCase();
  if (/^#[0-9a-f]{6}$/.test(hex)) return hex;
  if (/^#[0-9a-f]{3}$/.test(hex)) {
    return `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
  }
  return undefined;
}

// Keystatic's admin UI (via @keystar/ui) publishes its palette as --kui-color-*
// custom properties on a wrapper that also carries `color-scheme`, so these
// tokens are the correct way to theme a third-party field: they follow the
// panel in light mode, dark mode, AND when the editor forces a scheme with
// Keystatic's own theme toggle — which a plain `prefers-color-scheme` media
// query would get wrong. Inheriting instead would pick up the site's own
// globals.css body colour, which is dark text regardless of scheme.
// slate11: #2c2c2c on light, #e3e3e3 on dark. Deliberately the emphasis token
// rather than the -secondary one Keystatic uses for its own field
// descriptions, so the description reads as white on a dark panel instead of
// the muted #909090 grey.
const TEXT_COLOR = "var(--kui-color-foreground-neutral-emphasis, inherit)";
// slate10: #4b4b4b on light, #b9b9b9 on dark — a step down for the inline hint.
const MUTED_TEXT_COLOR = "var(--kui-color-foreground-neutral, inherit)";
const BORDER_COLOR = "var(--kui-color-border-neutral, rgba(128,128,128,0.4))";

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

export function colorField({
  label,
  description,
  defaultValue,
}: {
  label: string;
  description?: string;
  defaultValue: string;
}): BasicFormField<string> {
  const fallback = normalizeHex(defaultValue) ?? "#1e439a";

  function ColorInput({ value, onChange, autoFocus }: FormFieldInputProps<string>) {
    const current = normalizeHex(value) ?? fallback;
    return (
      <div>
        <span style={LABEL_STYLE}>{label}</span>
        {description ? <p style={DESCRIPTION_STYLE}>{description}</p> : null}

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <input
            type="color"
            aria-label={label}
            autoFocus={autoFocus}
            value={current}
            onChange={(e) => onChange(e.target.value.toLowerCase())}
            style={{
              width: "3.5rem",
              height: "2.5rem",
              padding: 0,
              cursor: "pointer",
              borderRadius: "0.375rem",
              border: "1px solid rgba(243, 239, 239, 0.97)",
              background: "transparent",
            }}
          />
          <span style={{ fontSize: "0.8125rem", color: MUTED_TEXT_COLOR }}>
            Πατήστε το τετράγωνο για οποιοδήποτε χρώμα, ή διαλέξτε από την παλέτα:
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.375rem",
            marginTop: "0.625rem",
          }}
        >
          {COLOR_PALETTE.map(({ value: swatch, label: name }) => {
            const isSelected = swatch === current;
            return (
              <button
                key={swatch}
                type="button"
                title={name}
                aria-label={name}
                aria-pressed={isSelected}
                onClick={() => onChange(swatch)}
                style={{
                  width: "1.75rem",
                  height: "1.75rem",
                  borderRadius: "0.375rem",
                  background: swatch,
                  cursor: "pointer",
                  padding: 0,
                  border: isSelected
                    ? "2px solid var(--kui-color-border-emphasis, currentColor)"
                    : `1px solid ${BORDER_COLOR}`,
                  outline: isSelected ? `2px solid ${BORDER_COLOR}` : "none",
                  outlineOffset: "1px",
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }

  return {
    kind: "form",
    label,
    Input: ColorInput,
    defaultValue: () => fallback,
    // A hand-edited or missing value falls back to the default rather than
    // throwing, so one bad YAML string can't make the entry unopenable —
    // same tolerance as iconForName() in app/components/iconMap.ts.
    parse: (value) => normalizeHex(value) ?? fallback,
    serialize: (value) => ({ value: normalizeHex(value) ?? fallback }),
    validate: (value) => normalizeHex(value) ?? fallback,
    reader: { parse: (value) => normalizeHex(value) ?? fallback },
  };
}
