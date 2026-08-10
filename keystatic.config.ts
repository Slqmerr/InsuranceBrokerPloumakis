// Keystatic content schema for the product detail pages. Storage is 'local'
// for now (Phase 1-4 of the CMS rollout); GitHub-mode PR-gated editing is a
// later phase — see the CMS prompt for the full plan.
//
// Scope note: the "Αστική Ευθύνη" hub product and its four sub-cover pages
// (astiki-efthyni-ergodoti, astiki-efthyni-proiontos,
// astiki-efthyni-touristikon, epaggelmatiki-astiki-efthyni) are NOT part of
// this collection. They use `variantGroups` / `related` cross-link data that
// this flat schema doesn't model, and folding them in would let an editor
// accidentally corrupt the hub taxonomy. They stay hardcoded in
// app/components/products.ts, developer-managed, same as before.
import { config, fields, collection } from "@keystatic/core";
// Custom field: a real colour picker in the entry form. See the file header
// for why this is a hand-written field rather than fields.select/fields.text.
import { colorField } from "./keystatic-fields/colorField";

// Must match the icon components imported in app/components/products.ts and
// mapped in app/components/iconMap.ts.
const ICON_NAMES = [
  "Users", "Home", "Car", "Heart", "Briefcase", "PiggyBank",
  "Leaf", "Scale", "TrendingUp", "ShieldCheck", "PawPrint",
  "Building2", "Truck", "ShieldAlert", "Package",
  "Sailboat", "Plane", "Palette", "Gavel", "Umbrella",
] as const;

// A rough visual proxy for each icon, since Keystatic's select can't render
// the actual lucide-react component inside the dropdown. The real horizontal
// icon picker lives at /keystatic-tools — this is just a quick in-dropdown cue.
const ICON_EMOJI: Record<(typeof ICON_NAMES)[number], string> = {
  Users: "👨‍👩‍👧", Home: "🏠", Car: "🚗", Heart: "❤️", Briefcase: "💼",
  PiggyBank: "🐷", Leaf: "🍃", Scale: "⚖️", TrendingUp: "📈", ShieldCheck: "🛡️",
  PawPrint: "🐾", Building2: "🏢", Truck: "🚚", ShieldAlert: "🚨", Package: "📦",
  Sailboat: "⛵", Plane: "✈️", Palette: "🎨", Gavel: "🔨", Umbrella: "☂️",
};

// The prompt called for one collection with a `category` select, but the slug
// "cyber" exists in BOTH categories (Ασφάλιση Cyber for ιδιώτες, Cyber Edge
// for επιχειρήσεις) and in Keystatic the slug is the filename, so one flat
// collection cannot hold both. Two collections — one per route — keep the
// filename=slug discipline and make the category implicit and un-editable,
// which is safer anyway (moving a product between routes is a URL change and
// belongs in a developer-reviewed PR, not a dropdown).
function productSchema(routeBase: "idiotes" | "epixeirisi") {
  return {
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
    intro: fields.text({
      label: "Εισαγωγή (hero)",
      multiline: true,
      validation: { isRequired: true },
    }),
    description: fields.text({
      label: "Περιγραφή",
      multiline: true,
      validation: { isRequired: true },
    }),
    covers: fields.array(
      fields.text({ label: "Κάλυψη" }),
      {
        label: "Τι καλύπτει",
        description: "Η λίστα καλύψεων στη σελίδα του προϊόντος.",
        itemLabel: (props) => props.value || "Κάλυψη",
      }
    ),
    needs: fields.array(
      fields.text({ label: "Στοιχείο" }),
      {
        label: "Τι θα χρειαστείτε",
        description: "Η λίστα στοιχείων για την προσφορά.",
        itemLabel: (props) => props.value || "Στοιχείο",
      }
    ),
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
    color: colorField({
      label: "Χρώμα",
      description:
        "Το χρώμα τονισμού του προϊόντος (εικονίδιο, γραμμές, κάρτα). Διαλέξτε ό,τι " +
        "χρώμα θέλετε — δεν χρειάζεται να γράψετε κωδικό πουθενά.",
      defaultValue: "#e6e8ef",
    }),
    hidden: fields.checkbox({
      label: "Κρυφό από το μενού",
      description:
        "Αν είναι ενεργό, το προϊόν δεν εμφανίζεται στο dropdown του μενού ή στην αρχική (αντίστοιχο του παλιού EXTRA_IDIWTES_PAGES) — παραμένει όμως προσβάσιμο στη διεύθυνσή του.",
      defaultValue: false,
    }),
    image: fields.text({
      label: "Φωτογραφία (μόνο developer)",
      description:
        "Διαδρομή εικόνας στο /public/products/. Ρυθμίζεται από τον developer· νέα προϊόντα παίρνουν μια εικόνα-placeholder μέχρι να οριστεί η τελική.",
      defaultValue: "/products/placeholder.jpg",
    }),
    imagePosition: fields.text({
      label: "Θέση φωτογραφίας (μόνο developer)",
      description: "CSS object-position για τη φωτογραφία. Ρυθμίζεται από τον developer.",
      defaultValue: "center",
    }),
  };
}

// Keystatic Cloud project, as "<team>/<project>" from keystatic.cloud. Cloud
// handles editor login itself, so an editor needs a Keystatic account but NOT
// a GitHub account, and the app needs no secrets — this identifier is public.
// Unset (e.g. local development), the panel falls back to local mode and
// writes straight to the working tree.
const CLOUD_PROJECT = process.env.NEXT_PUBLIC_KEYSTATIC_CLOUD_PROJECT;

export default config({
  // Cloud mode: the admin UI authenticates through Keystatic Cloud, which
  // holds the GitHub connection, and commits to the repo on the editor's
  // behalf. Public pages are unaffected by the mode — they read content/
  // from the filesystem at build time.
  //
  // branchPrefix limits the branches editors see and can create to cms/*.
  // Keystatic has no setting that forces saves through a PR — the enforcement
  // is branch protection on master (require PR + 1 approval), which makes
  // direct saves to master fail and pushes editors to a cms/* branch, from
  // which the admin UI offers "Create pull request".
  storage: CLOUD_PROJECT
    ? { kind: "cloud", branchPrefix: "cms/" }
    : { kind: "local" },
  cloud: CLOUD_PROJECT ? { project: CLOUD_PROJECT } : undefined,
  ui: {
    brand: { name: "Ploumakis Insurance" },
  },
  collections: {
    idiotes: collection({
      label: "Προϊόντα Ιδιωτών",
      path: "content/products/idiotes/*",
      format: "yaml",
      slugField: "title",
      columns: ["title", "hidden"],
      schema: productSchema("idiotes"),
    }),
    epixeirisi: collection({
      label: "Προϊόντα Επιχειρήσεων",
      path: "content/products/epixeirisi/*",
      format: "yaml",
      slugField: "title",
      columns: ["title", "hidden"],
      schema: productSchema("epixeirisi"),
    }),
  },
});
