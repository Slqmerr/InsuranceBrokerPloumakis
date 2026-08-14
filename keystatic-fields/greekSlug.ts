// Greek → Latin transliteration for auto-deriving a URL slug from a product
// title, so an editor never has to type (or even see) the slug themselves.
//
// Keystatic's own auto-slug button only strips characters it doesn't
// recognise, which turns "Υγεία" into "" rather than "ygeia" — that's why the
// slug had to be a visible, manually-typed field before this existed.
//
// The mapping is tuned to reproduce the slugs already in content/products/,
// not to follow ISO 843: this project writes χ as "x" (Όχημα → oxima), not
// "ch", and doesn't collapse μπ/ντ to b/d (Εμπορευμάτων → emporeumaton,
// Παντός → pantos). greekSlug.test.mjs pins all of that.

/** Single-letter map. Accented and diaeresis forms fold onto their base
 *  letter. `υ` is absent on purpose — it's context-sensitive, see below. */
const GREEK_LETTERS: Record<string, string> = {
  α: "a", ά: "a",
  β: "v",
  γ: "g",
  δ: "d",
  ε: "e", έ: "e",
  ζ: "z",
  η: "i", ή: "i",
  θ: "th",
  ι: "i", ί: "i", ϊ: "i", ΐ: "i",
  κ: "k",
  λ: "l",
  μ: "m",
  ν: "n",
  ξ: "x",
  ο: "o", ό: "o",
  π: "p",
  ρ: "r",
  σ: "s", ς: "s",
  τ: "t",
  φ: "f",
  χ: "x",
  ψ: "ps",
  ω: "o", ώ: "o",
};

/** Vowels after which a `υ` is part of a digraph and transliterates to "u"
 *  (ου → ou, ευ → eu, αυ → au) rather than the standalone "y" of Υγεία →
 *  ygeia or Κινδύνου → kindynou. */
const DIPHTHONG_HEADS = new Set(["α", "ά", "ε", "έ", "ο", "ό"]);

/** Transliterate one lowercased Greek string to Latin letters. Characters
 *  with no mapping (Latin letters, digits, spaces, punctuation) pass through
 *  untouched — titles like "Cyber Edge" or "Bewell 2" survive intact. */
function transliterate(input: string): string {
  let out = "";
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (char === "υ" || char === "ύ" || char === "ϋ" || char === "ΰ") {
      const previous = input[i - 1];
      out += previous && DIPHTHONG_HEADS.has(previous) ? "u" : "y";
      continue;
    }
    out += GREEK_LETTERS[char] ?? char;
  }
  return out;
}

/**
 * Turn a product title into a URL slug: lowercase Latin letters, digits and
 * hyphens only, which is exactly the pattern the collection validates against.
 *
 * Returns "" when the title yields no usable characters — the caller decides
 * what to do about that rather than getting a surprise placeholder.
 */
export function greekSlug(title: string): string {
  return transliterate(title.toLowerCase())
    // Strip any accent that survived as a combining mark (e.g. a title pasted
    // from Word in decomposed form, where "ά" is "α" + U+0301).
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * `greekSlug`, but guaranteed not to collide with `taken`. A clash gets a
 * numeric suffix (`cyber`, `cyber-2`, `cyber-3`) — both existing Cyber
 * products slugged to "cyber", so this case is real, not hypothetical.
 */
export function uniqueGreekSlug(title: string, taken: Iterable<string>): string {
  const base = greekSlug(title);
  if (!base) return "";
  const used = new Set(taken);
  if (!used.has(base)) return base;
  for (let n = 2; ; n++) {
    const candidate = `${base}-${n}`;
    if (!used.has(candidate)) return candidate;
  }
}
