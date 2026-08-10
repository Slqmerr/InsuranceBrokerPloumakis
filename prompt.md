# Task for Claude Code — Prompt 19: Keystatic CMS — Slug Warning, Free-Form Color, Icon/Color Picker Tool

This prompt makes 3 changes, all on the `feature/keystatic-cms` branch. **Do the sections in
order.**

**Context — read this before touching anything.** All three of Ploum's original asks (lock the
slug, ditch the preset color list, show icons instead of names) run into the same Keystatic
platform limit: its field API doesn't support custom-rendered or read-only scalar fields outside
of rich-text component-blocks. Concretely:

- `fields.slug()` is always a two-input widget (title + editable slug) — there is no `readOnly`
  option. This is a confirmed, currently-open upstream limitation:
  [Thinkmill/keystatic#1212](https://github.com/Thinkmill/keystatic/issues/1212). Do not attempt
  to hide/disable the slug input via CSS or DOM hacks — Keystatic's internal markup isn't a
  stable public API and this would break on any version bump.
- There is no `fields.color`. The only way to get a fully custom widget in Keystatic is a
  component-block inside a `document`/`mdx` field, which would mean turning `color` into
  rich text — out of proportion for one field.
- `fields.select` options are plain `{label, value}` strings — no icon rendering inside the
  dropdown itself.

So this prompt does the best *real* version of each: harden the slug warning (can't lock it,
so make it unmissable), switch color to free-form validated hex (any color, no preset list),
and add emoji previews to the icon dropdown — then build one small new page,
`/keystatic-tools`, that gives Dimitrios an actual native color wheel and a horizontal row of
real rendered icons to pick from and copy from, since Keystatic's own form can't host either.

---

## 1. `keystatic.config.ts` — harden the slug warning

Find the `title: fields.slug({...})` block inside `productSchema()` and replace it with:

```tsx
    // Paired title+slug field: the Greek title is stored in the YAML file,
    // the slug becomes the filename (filename = slug discipline) and the
    // last URL segment. Keystatic has no readOnly option for the slug half
    // of this field (open upstream request, still unresolved as of writing:
    // github.com/Thinkmill/keystatic/issues/1212), and its auto-slug button
    // doesn't transliterate Greek into Latin characters — so this field
    // cannot be locked or reliably auto-filled. The warning below plus PR
    // review before merging a cms/* branch are the real protection.
    title: fields.slug({
      name: {
        label: "Τίτλος",
        validation: { isRequired: true },
      },
      slug: {
        label: "Slug (URL) — μόνο developer",
        description:
          `ΜΗΝ αλλάζετε αυτό το πεδίο μόνοι σας. Καθορίζει τη διεύθυνση του προϊόντος ` +
          `(/${routeBase}/<slug>) — αν αλλάξει σε υπάρχον προϊόν, ο σύνδεσμός του σταματά να ` +
          `λειτουργεί αμέσως. Η αυτόματη συμπλήρωση από τον τίτλο ΔΕΝ μεταφράζει σωστά τα ` +
          `ελληνικά σε λατινικά, οπότε ούτε αυτή είναι αξιόπιστη. Αν φτιάχνετε νέο προϊόν, ` +
          `αποθηκεύστε κανονικά και επικοινωνήστε μαζί μας πριν το pull request μπει live — ` +
          `θα ελέγξουμε/διορθώσουμε το slug τότε.`,
        validation: {
          length: { min: 1 },
          pattern: {
            regex: /^[a-z0-9-]+$/,
            message: "Μόνο πεζά λατινικά, αριθμοί και παύλες.",
          },
        },
      },
    }),
```

This is a copy/label change only — behavior is unchanged, and nothing downstream
(`cmsProducts.ts`, the routes) reads the slug's label or description, so there's nothing else
to touch here.

---

## 2. `keystatic.config.ts` — replace the preset color dropdown with free-form hex

**Delete** the entire `COLOR_OPTIONS` array (and its leading comment) near the top of the file:

```tsx
// The distinct accent colors already in use across product cards, each with
// a short Greek label so the dropdown reads better than raw hex codes.
const COLOR_OPTIONS = [
  { value: "#e0245e", label: "Έντονο ροζ (#e0245e)" },
  ...
] as const;
```

**Find** the `color` field inside `productSchema()`:

```tsx
    color: fields.select({
      label: "Χρώμα",
      options: COLOR_OPTIONS.map(({ label, value }) => ({ label, value })),
      defaultValue: COLOR_OPTIONS[0].value,
    }),
```

**Replace** it with:

```tsx
    color: fields.text({
      label: "Χρώμα (κωδικός hex)",
      description:
        "Οποιοδήποτε χρώμα θέλετε — δεν περιορίζεστε σε έτοιμη λίστα. Χρειάζεται κωδικός hex " +
        "(π.χ. #1E439A). Αν δεν ξέρετε τον κωδικό, ανοίξτε σε νέα καρτέλα τη διεύθυνση " +
        "του site σας ακολουθούμενη από /keystatic-tools — εκεί υπάρχει επιλογέας χρωμάτων " +
        "που σας δίνει τον κωδικό έτοιμο για αντιγραφή.",
      validation: {
        isRequired: true,
        pattern: {
          regex: /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/,
          message: "Πρέπει να είναι κωδικός χρώματος hex, π.χ. #1E439A ή #f59e0b.",
        },
      },
      defaultValue: "#1E439A",
    }),
```

No data migration needed — the 17 existing YAML files already store `color` as a plain hex
string (e.g. `"#e0245e"`), which is valid under the new field too. `cmsProducts.ts` reads
`color: entry.color` as a passthrough string either way — leave it untouched.

---

## 3. `keystatic.config.ts` — emoji previews on the icon dropdown

**Find** the `iconName` field:

```tsx
    iconName: fields.select({
      label: "Εικονίδιο",
      options: ICON_NAMES.map((name) => ({ label: name, value: name })),
      defaultValue: "ShieldCheck",
    }),
```

**Add** this lookup table near the `ICON_NAMES` array at the top of the file:

```tsx
// A rough visual proxy for each icon, since Keystatic's select can't render
// the actual lucide-react component inside the dropdown. The real horizontal
// icon picker lives at /keystatic-tools — this is just a quick in-dropdown cue.
const ICON_EMOJI: Record<(typeof ICON_NAMES)[number], string> = {
  Users: "👨‍👩‍👧", Home: "🏠", Car: "🚗", Heart: "❤️", Briefcase: "💼",
  PiggyBank: "🐷", Leaf: "🍃", Scale: "⚖️", TrendingUp: "📈", ShieldCheck: "🛡️",
  PawPrint: "🐾", Building2: "🏢", Truck: "🚚", ShieldAlert: "🚨", Package: "📦",
  Sailboat: "⛵", Plane: "✈️", Palette: "🎨", Gavel: "🔨", Umbrella: "☂️",
};
```

**Replace** the `iconName` field with:

```tsx
    iconName: fields.select({
      label: "Εικονίδιο",
      description:
        "Δείτε όλα τα εικονίδια σε πραγματικό μέγεθος στη σελίδα /keystatic-tools (ανοίξτε σε " +
        "νέα καρτέλα) — πατήστε πάνω σε ένα για να αντιγραφεί το όνομά του, μετά διαλέξτε το " +
        "ίδιο όνομα εδώ.",
      options: ICON_NAMES.map((name) => ({
        label: `${ICON_EMOJI[name]} ${name}`,
        value: name,
      })),
      defaultValue: "ShieldCheck",
    }),
```

`ICON_NAMES` itself, `iconMap.ts`, and `ICON_MAP` stay exactly as they are — this only changes
the dropdown's display labels, not the stored values.

---

## 4. New file: `app/keystatic-tools/page.tsx`

A standalone helper page (`/keystatic-tools`) with a real color wheel and a horizontal row of
the actual 20 icons, matching `iconMap.ts` exactly. No layout wrapper needed — follow the same
minimal pattern as `app/keystatic/layout.tsx` (no Navbar/Footer; this is a utility page, not a
marketing page). Client component (uses `useState` and the clipboard API).

```tsx
"use client";

import { useState } from "react";
import {
  Users, Home, Car, Heart, Briefcase, PiggyBank,
  Leaf, Scale, TrendingUp, ShieldCheck, PawPrint,
  Building2, Truck, ShieldAlert, Package,
  Sailboat, Plane, Palette, Gavel, Umbrella,
  Check, Copy, type LucideIcon,
} from "lucide-react";

// Must stay in sync with ICON_MAP in app/components/iconMap.ts.
const ICONS: { name: string; Icon: LucideIcon }[] = [
  { name: "Users", Icon: Users },
  { name: "Home", Icon: Home },
  { name: "Car", Icon: Car },
  { name: "Heart", Icon: Heart },
  { name: "Briefcase", Icon: Briefcase },
  { name: "PiggyBank", Icon: PiggyBank },
  { name: "Leaf", Icon: Leaf },
  { name: "Scale", Icon: Scale },
  { name: "TrendingUp", Icon: TrendingUp },
  { name: "ShieldCheck", Icon: ShieldCheck },
  { name: "PawPrint", Icon: PawPrint },
  { name: "Building2", Icon: Building2 },
  { name: "Truck", Icon: Truck },
  { name: "ShieldAlert", Icon: ShieldAlert },
  { name: "Package", Icon: Package },
  { name: "Sailboat", Icon: Sailboat },
  { name: "Plane", Icon: Plane },
  { name: "Palette", Icon: Palette },
  { name: "Gavel", Icon: Gavel },
  { name: "Umbrella", Icon: Umbrella },
];

export default function KeystaticToolsPage() {
  const [color, setColor] = useState("#1E439A");
  const [colorCopied, setColorCopied] = useState(false);
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  function copyColor() {
    navigator.clipboard.writeText(color);
    setColorCopied(true);
    setTimeout(() => setColorCopied(false), 1500);
  }

  function copyIcon(name: string) {
    navigator.clipboard.writeText(name);
    setCopiedIcon(name);
    setTimeout(() => setCopiedIcon(null), 1500);
  }

  return (
    <main
      style={{
        fontFamily: "var(--font-ubuntu-sans), sans-serif",
        maxWidth: "900px",
        margin: "0 auto",
        padding: "48px 24px 96px",
        color: "#1a1a1a",
      }}
    >
      <h1 style={{ color: "#1E439A", fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}>
        Εργαλεία CMS
      </h1>
      <p style={{ color: "#555", fontSize: "15px", marginBottom: "40px", lineHeight: 1.6 }}>
        Βοηθητικά εργαλεία για τη φόρμα προϊόντων στο Keystatic. Διαλέξτε εδώ, πατήστε
        «Αντιγραφή», και επιστρέψτε στην άλλη καρτέλα για να το επικολλήσετε στο σωστό πεδίο.
      </p>

      {/* ===== COLOR PICKER ===== */}
      <section
        style={{
          marginBottom: "40px",
          padding: "24px",
          border: "1px solid #e8eaef",
          borderRadius: "12px",
        }}
      >
        <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>🎨 Χρώμα</h2>
        <p style={{ color: "#555", fontSize: "14px", marginBottom: "20px" }}>
          Πατήστε στο τετράγωνο για να ανοίξει ο επιλογέας χρωμάτων. Διαλέξτε όποιο χρώμα
          θέλετε — δεν υπάρχει έτοιμη λίστα, το χρώμα είναι δικό σας.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            style={{
              width: "64px",
              height: "64px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              padding: 0,
            }}
          />
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "18px",
              fontWeight: 600,
              background: "#f4f5f8",
              padding: "10px 16px",
              borderRadius: "8px",
              minWidth: "110px",
            }}
          >
            {color.toUpperCase()}
          </div>
          <button
            onClick={copyColor}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: colorCopied ? "#2e9e5b" : "#1E439A",
              color: "#fff",
              fontWeight: 600,
              border: "none",
              borderRadius: "999px",
              padding: "10px 20px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            {colorCopied ? <Check size={16} /> : <Copy size={16} />}
            {colorCopied ? "Αντιγράφηκε" : "Αντιγραφή κωδικού"}
          </button>
        </div>
      </section>

      {/* ===== ICON PICKER — horizontal, wraps on small screens ===== */}
      <section
        style={{ padding: "24px", border: "1px solid #e8eaef", borderRadius: "12px" }}
      >
        <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>🧩 Εικονίδιο</h2>
        <p style={{ color: "#555", fontSize: "14px", marginBottom: "20px" }}>
          Πατήστε πάνω σε ένα εικονίδιο για να αντιγραφεί το όνομά του, μετά επικολλήστε το
          στο πεδίο «Εικονίδιο» στο Keystatic.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
          {ICONS.map(({ name, Icon }) => {
            const isCopied = copiedIcon === name;
            return (
              <button
                key={name}
                onClick={() => copyIcon(name)}
                title={name}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  width: "84px",
                  height: "84px",
                  border: isCopied ? "2px solid #2e9e5b" : "1px solid #e8eaef",
                  borderRadius: "10px",
                  background: isCopied ? "#eafaf1" : "#fff",
                  cursor: "pointer",
                  transition: "border-color 0.15s, background 0.15s",
                }}
              >
                <Icon size={26} color="#1E439A" strokeWidth={1.75} />
                <span style={{ fontSize: "10px", color: "#555", textAlign: "center" }}>
                  {isCopied ? "✓ OK" : name}
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </main>
  );
}
```

The icon row uses `flex-wrap`, not a single non-wrapping scroll strip — on narrow screens it
wraps into multiple rows rather than requiring horizontal scrolling, since the project is
mobile-first.

---

## Constraints

- Keep inline styles throughout — no Tailwind, no CSS modules
- Preserve all existing Greek copy elsewhere exactly
- Do not touch `cmsProducts.ts`, `iconMap.ts`, or any of the 17 existing product YAML files —
  none of them need to change for this
- Do not attempt to hide or disable the slug input via CSS/DOM targeting — see the Context note
  at the top
- `app/keystatic-tools/page.tsx` is new; nothing links to it automatically — that's expected,
  it's reached by typing the URL, as described in the field descriptions

## QA checklist

- `npm run dev`, open `/keystatic`, confirm both collections (`idiotes`, `epixeirisi`) still
  load and existing entries still show their correct title/slug/color/icon on open
- Confirm the slug field shows the new warning label and description
- Confirm the color field is now a plain text box; typing an invalid value (e.g. `blue`) shows
  the validation error; typing `#1E439A` saves fine
- Confirm the icon dropdown options now show an emoji + name (e.g. "🏠 Home")
- Open `/keystatic-tools`, confirm the color wheel opens and the hex code updates live, confirm
  "Αντιγραφή κωδικού" copies to clipboard, confirm clicking any icon copies its name and shows
  the green "✓ OK" state briefly
- Confirm the homepage, product cards, and product detail pages still render unchanged (this
  prompt doesn't touch any frontend-facing component)