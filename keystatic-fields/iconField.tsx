// A custom Keystatic form field that renders the actual lucide icons as a
// clickable grid inside the entry form, grouped by theme. It replaces a
// `fields.select` whose options could only ever be text — Keystatic's select
// can't render a React component in its dropdown, so the old field showed an
// emoji "proxy" per icon and pointed editors at a separate page to see the
// real thing. The editor now sees exactly what will ship on the product card.
//
// Same construction as colorField in this folder: `BasicFormField` is part of
// Keystatic's public API, so a field is just an object with an `Input`
// component and parse/serialize/validate functions. Not a DOM hack against
// Keystatic's markup.
//
// The stored value is unchanged — the plain icon name (`iconName: Heart`) that
// `fields.select` wrote — so the 17 existing product YAML files, cmsProducts.ts
// and iconMap.ts need no migration.
import type { BasicFormField, FormFieldInputProps } from "@keystatic/core";
import { ICON_MAP, type IconName } from "../app/components/iconMap";

/** Display order and grouping for the picker. Purely presentational: the
 *  stored value is the name alone, so regrouping an icon later is safe and
 *  changes nothing on disk. Typed as `IconName`, so a typo or an icon that
 *  isn't in ICON_MAP is a compile error rather than a blank cell. */
const ICON_GROUPS: readonly { label: string; names: readonly IconName[] }[] = [
  {
    label: "Άνθρωποι / υγεία / ζωή",
    names: ["Users", "Heart", "HeartPulse", "Stethoscope", "Hospital", "Ambulance", "Baby", "PawPrint"],
  },
  {
    label: "Οχήματα / ταξίδι / μεταφορές",
    names: ["Car", "Bike", "Bus", "Caravan", "Truck", "Plane", "Sailboat", "Ship", "Container", "Package"],
  },
  {
    label: "Κατοικία / περιουσία",
    names: ["Home", "Building2", "Hotel", "Palette", "Umbrella"],
  },
  {
    label: "Επιχείρηση / εργασία",
    names: ["Briefcase", "Store", "Factory", "Warehouse", "HardHat", "Handshake", "Scale", "Gavel"],
  },
  {
    label: "Οικονομικά",
    names: ["PiggyBank", "TrendingUp"],
  },
  {
    label: "Cyber / τεχνολογία",
    names: ["Laptop", "Smartphone", "Lock", "Fingerprint", "ShieldCheck", "ShieldAlert"],
  },
  {
    label: "Κίνδυνοι / φύση",
    names: ["Flame", "Droplets", "Zap", "TreePine", "Leaf"],
  },
];

/** Anything added to ICON_MAP but not yet placed in a group above still shows
 *  up, under a catch-all heading, rather than silently becoming unpickable.
 *  Computed once at module load — ICON_MAP is a static object. */
const UNGROUPED = (Object.keys(ICON_MAP) as IconName[]).filter(
  (name) => !ICON_GROUPS.some((group) => group.names.includes(name))
);

const GROUPS = UNGROUPED.length
  ? [...ICON_GROUPS, { label: "Λοιπά", names: UNGROUPED }]
  : ICON_GROUPS;

function isIconName(value: unknown): value is IconName {
  return typeof value === "string" && value in ICON_MAP;
}

// Keystatic's admin UI (via @keystar/ui) publishes its palette as --kui-color-*
// custom properties on a wrapper that also carries `color-scheme`, so these
// tokens are the correct way to theme a third-party field: they follow the
// panel in light mode, dark mode, AND when the editor forces a scheme with
// Keystatic's own theme toggle. See colorField.tsx for the longer note.
const TEXT_COLOR = "var(--kui-color-foreground-neutral-emphasis, inherit)";
const MUTED_TEXT_COLOR = "var(--kui-color-foreground-neutral, inherit)";
const BORDER_COLOR = "var(--kui-color-border-neutral, rgba(128,128,128,0.4))";
const SELECTED_COLOR = "#1e439a";

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

const GROUP_LABEL_STYLE: React.CSSProperties = {
  fontSize: "0.6875rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  color: MUTED_TEXT_COLOR,
  margin: "0 0 0.375rem",
};

export function iconField({
  label,
  description,
  defaultValue,
}: {
  label: string;
  description?: string;
  defaultValue: IconName;
}): BasicFormField<string> {
  function IconInput({ value, onChange, autoFocus }: FormFieldInputProps<string>) {
    const current = isIconName(value) ? value : defaultValue;

    return (
      <div>
        <span style={LABEL_STYLE}>{label}</span>
        {description ? <p style={DESCRIPTION_STYLE}>{description}</p> : null}

        {/* A radiogroup rather than a list of buttons: this is a single choice
            among many, and the role gives screen readers the selected state
            plus arrow-key navigation that plain buttons wouldn't have. */}
        <div role="radiogroup" aria-label={label}>
          {GROUPS.map((group, groupIndex) => (
            <div key={group.label} style={{ marginBottom: "0.875rem" }}>
              <p style={GROUP_LABEL_STYLE}>{group.label}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                {group.names.map((name) => {
                  const Icon = ICON_MAP[name];
                  const isSelected = name === current;
                  return (
                    <button
                      key={name}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      title={name}
                      aria-label={name}
                      // Only the very first cell takes autoFocus, and only when
                      // Keystatic asks for it — otherwise every group would
                      // fight over the focus on mount.
                      autoFocus={autoFocus && groupIndex === 0 && name === group.names[0]}
                      onClick={() => onChange(name)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "2.75rem",
                        height: "2.75rem",
                        padding: 0,
                        borderRadius: "0.375rem",
                        cursor: "pointer",
                        color: isSelected ? SELECTED_COLOR : TEXT_COLOR,
                        background: isSelected
                          ? "var(--kui-color-background-accent, rgba(30,67,154,0.12))"
                          : "transparent",
                        border: isSelected
                          ? `2px solid ${SELECTED_COLOR}`
                          : `1px solid ${BORDER_COLOR}`,
                      }}
                    >
                      <Icon size={22} strokeWidth={1.75} aria-hidden />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <p style={{ fontSize: "0.75rem", color: MUTED_TEXT_COLOR, margin: 0 }}>
          Επιλεγμένο: <strong style={{ color: TEXT_COLOR }}>{current}</strong>
        </p>
      </div>
    );
  }

  return {
    kind: "form",
    label,
    Input: IconInput,
    defaultValue: () => defaultValue,
    // A hand-edited or missing value falls back to the default rather than
    // throwing, so one bad YAML string can't make the entry unopenable — the
    // same tolerance as iconForName() in app/components/iconMap.ts.
    parse: (value) => (isIconName(value) ? value : defaultValue),
    serialize: (value) => ({ value: isIconName(value) ? value : defaultValue }),
    validate: (value) => (isIconName(value) ? value : defaultValue),
    reader: { parse: (value) => (isIconName(value) ? value : defaultValue) },
  };
}
