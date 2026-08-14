// A custom Keystatic form field that renders every product of one category as
// a draggable list, so the order of the navbar dropdown (and the /asfaleies
// catalogue) is set by dragging rows rather than by editing code.
//
// Why a custom field rather than `fields.array(fields.relationship(...))`,
// which Keystatic already renders with drag-and-drop: that combination makes
// the editor *build* the list — every new product has to be added to it by
// hand, and a deleted product leaves a dangling row behind. But ordering isn't
// a list the editor owns; it's a permutation of a list the collection owns. So
// this field never adds or removes anything. It fetches the catalogue from
// /api/product-index, shows all of it, and stores only the sequence of slugs.
// A product missing from the stored sequence sorts to the end; a slug whose
// product was deleted is dropped on the next save. Neither can rot.
//
// Same construction as colorField and iconField in this folder: `BasicFormField`
// is part of Keystatic's public API, so a field is just an object with an
// `Input` component and parse/serialize/validate functions — not a DOM hack
// against Keystatic's own markup. The Input itself lives in
// ProductOrderInput.tsx; see that file's header for why it's a separate
// "use client" module.
import type { BasicFormField, FormFieldStoredValue } from "@keystatic/core";
import { ProductOrderInput, type ProductCategory } from "./ProductOrderInput";

export type { OrderableProduct, ProductIndex } from "./ProductOrderInput";

/** A hand-edited or missing value degrades to "no order saved" rather than
 *  throwing, so one bad YAML value can't make the page unopenable — the same
 *  tolerance as iconForName() in app/components/iconMap.ts. An empty sequence
 *  is a valid state anyway: it means "leave them alphabetical". */
function parseSlugs(value: FormFieldStoredValue): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

export function productOrderField({
  category,
  label,
  description,
}: {
  category: ProductCategory;
  label: string;
  description?: string;
}): BasicFormField<string[]> {
  return {
    kind: "form",
    label,
    // `category`, `label` and `description` are closed over rather than passed
    // through Keystatic, which only ever hands the Input its
    // FormFieldInputProps — same arrangement as productTitleField.tsx.
    Input: (props) => (
      <ProductOrderInput
        {...props}
        category={category}
        label={label}
        description={description}
      />
    ),
    defaultValue: () => [],
    parse: parseSlugs,
    serialize: (value) => ({ value: [...value] }),
    validate: (value) => value,
    reader: { parse: parseSlugs },
  };
}
