// The paired title+slug field for a product, with the slug hidden.
//
// Keystatic's `fields.slug` renders two inputs side by side: the Greek title,
// and the slug that becomes the filename and the last URL segment. The slug
// half is the dangerous one — editing it on a live product silently breaks
// that product's URL — and it has no `readOnly` option
// (github.com/Thinkmill/keystatic/issues/1212). The previous defence was a
// paragraph of Greek warning text asking the editor not to touch it.
//
// This field replaces that with structure instead of a warning:
//
//   * on a NEW entry the slug is derived from the title as it's typed, using
//     the Greek transliteration in greekSlug.ts (Keystatic's own auto-slug
//     button strips Greek entirely, turning "Υγεία" into "");
//   * on an EXISTING entry the slug is frozen — retyping the title cannot
//     change a URL that's already published;
//   * either way it's collapsed out of sight, so an editor doing ordinary
//     work never sees it, but a developer can still fix a bad transliteration
//     or a duplicate without hand-editing YAML.
//
// Only the `Input` is custom. Everything underneath — parse, serialize,
// validate, uniqueness against sibling slugs, the reader — is the stock
// `fields.slug` object, spread through unchanged, so this can't drift from
// Keystatic's own semantics. (Reimplementing validate isn't an option anyway:
// it signals failure by throwing Keystatic's internal FieldDataError, which
// isn't part of the package's public exports.)
import { fields, type SlugFormField } from "@keystatic/core";
import { greekSlug } from "./greekSlug";
import { ProductTitleInput, type SlugValue } from "./ProductTitleInput";

export function productTitleField({
  routeBase,
}: {
  routeBase: "idiotes" | "epixeirisi";
}): SlugFormField<SlugValue, SlugValue, SlugValue, string> {
  const base = fields.slug({
    name: {
      label: "Τίτλος",
      validation: { isRequired: true },
    },
    slug: {
      label: "Slug (URL)",
      // Keystatic's default slugify drops non-Latin characters entirely; this
      // seeds the field's default value and any regeneration it does
      // internally with proper Greek transliteration instead.
      generate: greekSlug,
      validation: {
        length: { min: 1 },
        pattern: {
          regex: /^[a-z0-9-]+$/,
          message: "Μόνο πεζά λατινικά, αριθμοί και παύλες.",
        },
      },
    },
  });

  return {
    ...base,
    // `routeBase` is closed over rather than passed through Keystatic, which
    // only ever hands the Input its FormFieldInputProps.
    Input: (props) => <ProductTitleInput {...props} routeBase={routeBase} />,
  };
}
