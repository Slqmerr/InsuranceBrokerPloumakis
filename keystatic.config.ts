// Keystatic content schema for the product detail pages. Storage is 'local'
// for now (Phase 1-4 of the CMS rollout); GitHub-mode PR-gated editing is a
// later phase — see the CMS prompt for the full plan.
//
// Scope note: the "Επαγγελματική Αστική Ευθύνη" hub product has an entry in
// this collection, but only half of it lives here. Its `variants` list of
// sub-covers is NOT modelled by this flat schema — folding it in would let an
// editor accidentally corrupt the hub taxonomy — so those tiles stay hardcoded
// in app/components/products.ts and cmsProducts.ts stitches them back onto the
// CMS entry. The entry exists so the hub can be dragged like any other product
// on the «Σειρά στο μενού» page; editing it here changes the prose, never the
// taxonomy.
import { config, fields, collection, singleton } from "@keystatic/core";
// Custom fields: a real colour picker, a real icon picker, a title field that
// derives and then hides the URL slug, and a drag-to-sort menu order. See each
// file's header for why these are hand-written rather than
// fields.select/fields.text/fields.slug/fields.array.
import { colorField } from "./keystatic-fields/colorField";
import { iconField } from "./keystatic-fields/iconField";
import { productTitleField } from "./keystatic-fields/productTitleField";
import { productOrderField } from "./keystatic-fields/productOrderField";

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
    // the slug becomes the filename (filename = slug discipline) and the last
    // URL segment. The slug is derived from the title by transliteration on
    // new entries, frozen on existing ones, and collapsed out of sight in both
    // cases — see keystatic-fields/productTitleField.tsx for why that replaced
    // the paragraph of warning text that used to sit here.
    title: productTitleField({ routeBase }),
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
    iconName: iconField({
      label: "Εικονίδιο",
      description:
        "Το εικονίδιο του προϊόντος, όπως εμφανίζεται στην κάρτα και στη σελίδα του. " +
        "Πατήστε πάνω σε όποιο θέλετε — αυτό ακριβώς θα δει και ο επισκέπτης.",
      defaultValue: "ShieldCheck",
    }),
    color: colorField({
      label: "Χρώμα",
      description:
        "Το χρώμα τονισμού του προϊόντος (εικονίδιο, γραμμές, κάρτα). Διαλέξτε ό,τι " +
        "χρώμα θέλετε — δεν χρειάζεται να γράψετε κωδικό πουθενά.",
      defaultValue: "#1e439a",
    }),
    hidden: fields.checkbox({
      label: "Κρυφό από το μενού",
      description:
        "Αν είναι ενεργό, το προϊόν δεν εμφανίζεται στο μενού πλοήγησης — παραμένει " +
        "όμως προσβάσιμο στη διεύθυνσή του και στη σελίδα «Ασφάλειες», ώστε να " +
        "μπορείτε να στείλετε τον σύνδεσμο σε πελάτη πριν το ανακοινώσετε.",
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
  // is branch protection on master (require PR), which makes direct saves to
  // master fail.
  //
  // Editors never meet that failure, though: the panel is pinned to a single
  // unprotected cms/* branch (NEXT_PUBLIC_KEYSTATIC_BRANCH, see
  // app/keystatic/editorBranch.ts), so their save just lands, and CI opens the
  // pull request onto master. Branch protection stays as the backstop for
  // anything that tries to write to master directly.
  storage: CLOUD_PROJECT
    ? { kind: "cloud", branchPrefix: "cms/" }
    : { kind: "local" },
  cloud: CLOUD_PROJECT ? { project: CLOUD_PROJECT } : undefined,
  ui: {
    brand: { name: "Ploumakis Insurance" },
    // Spelled out only to put the ordering page directly under the two
    // collections it reorders, behind a divider. Left unset, Keystatic lists
    // every collection first and every singleton after, which is the same
    // order here but without the visual grouping.
    navigation: ["idiotes", "epixeirisi", "---", "menuOrder"],
  },
  singletons: {
    // One file holding nothing but two sequences of slugs. Not a per-product
    // "order" number, because ordering is a property of the list rather than
    // of any one product: moving a product to the top would otherwise mean
    // renumbering everything below it, across as many separate saves.
    menuOrder: singleton({
      label: "Σειρά στο μενού",
      path: "content/settings/menu-order",
      format: "yaml",
      schema: {
        idiotes: productOrderField({
          category: "idiotes",
          label: "Προϊόντα Ιδιωτών",
          description:
            "Η σειρά με την οποία εμφανίζονται τα προϊόντα ιδιωτών στο μενού " +
            "«Ιδιώτες» και στη σελίδα «Ασφάλειες». Σύρετε μια γραμμή στη θέση " +
            "που θέλετε και πατήστε αποθήκευση.",
        }),
        epixeirisi: productOrderField({
          category: "epixeirisi",
          label: "Προϊόντα Επιχειρήσεων",
          description:
            "Η σειρά με την οποία εμφανίζονται τα προϊόντα επιχειρήσεων στο " +
            "μενού «Επιχειρήσεις» και στη σελίδα «Ασφάλειες».",
        }),
      },
    }),
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
