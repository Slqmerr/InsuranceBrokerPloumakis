// Every `@keystar/ui/table` import resolves here instead of to the real module
// (see `turbopack.resolveAlias` in next.config.ts). The only importer is
// Keystatic's admin UI bundle, and the only thing this changes is the one table
// that bundle renders — the collection list at /keystatic/collection/*, which
// loses its "Slug" column. Everything else is re-exported untouched.
//
// Why an override is needed at all: Keystatic builds that table's columns as
// `[status?, Slug, ...collection.columns]`, and the Slug entry is hardcoded —
// it appears the moment a collection sets `columns` at all, with no config
// option to drop it (CollectionTable in @keystatic/core/dist/keystatic-core-ui,
// unchanged in 0.6.4 and 0.6.5, the current release). It is dead weight for
// Dimitrios: the slug is only the latin transliteration of the Greek title that
// the very next column already shows.
//
// Why not a CSS rule, the way the git actions are hidden in
// app/keystatic/layout.tsx: that table is virtualised, so every cell is
// absolutely positioned at a left/width computed in JS. `display: none` on the
// slug cells would take away the text and leave a third of the table blank.
//
// So the column is dropped while it is still a React element, before
// react-stately turns the children into a collection. Everything keys off
// Keystatic's own '@@slug' column key, which means any other table passes
// through untouched, and if a future version renames that key the filter simply
// stops matching: the column comes back, nothing breaks.
import { cloneElement, isValidElement } from "react";
import type { ReactElement, ReactNode } from "react";

// @keystar/ui exports no path but "./table", and that one now leads back to
// this file, so the real module has to be reached by its file path.
import {
  TableBody,
  TableHeader,
  TableView as KeystarTableView,
} from "../node_modules/@keystar/ui/dist/keystar-ui-table.js";

export * from "../node_modules/@keystar/ui/dist/keystar-ui-table.js";

/** Keystatic's key for the hardcoded column, and the prefix of the key on each
 *  of its cells (`'@@slug' + slug`). */
const SLUG_KEY = "@@slug";

type AnyElement = ReactElement<Record<string, unknown>>;
type TableViewProps = Parameters<typeof KeystarTableView>[0];

function asElement(node: unknown): AnyElement | undefined {
  return isValidElement(node) ? (node as AnyElement) : undefined;
}

function toArray(children: unknown): ReactNode[] {
  return (Array.isArray(children) ? children : [children]) as ReactNode[];
}

/** The header's `columns` without the slug entry, or undefined when there is no
 *  slug column — which is how every table but Keystatic's opts out of all of
 *  this, and how this file stops applying if Keystatic ever drops the column
 *  itself. */
function columnsWithoutSlug(header: AnyElement): unknown[] | undefined {
  const columns = header.props.columns;
  if (!Array.isArray(columns)) return undefined;
  const kept = columns.filter(
    (column) => (column as { key?: unknown } | null)?.key !== SLUG_KEY,
  );
  return kept.length === columns.length ? undefined : kept;
}

/** Drops the slug cell from one row, so its cell count still matches the
 *  column count — react-stately throws if the two disagree. */
function rowWithoutSlugCell(row: ReactNode): ReactNode {
  const element = asElement(row);
  if (!element) return row;
  const cells = toArray(element.props.children);
  const kept = cells.filter((cell) => {
    const key = asElement(cell)?.key;
    return typeof key !== "string" || !key.startsWith(SLUG_KEY);
  });
  if (kept.length === cells.length) return row;
  return cloneElement(element, undefined, kept);
}

/** The body renders its rows through a function (Keystatic's case) or holds
 *  them as static children; both hand back rows one cell lighter. */
function bodyWithoutSlugCells(body: AnyElement): AnyElement {
  const children = body.props.children;
  if (typeof children === "function") {
    const render = children as (...args: unknown[]) => ReactNode;
    return cloneElement(body, {
      children: (...args: unknown[]) => rowWithoutSlugCell(render(...args)),
    });
  }
  return cloneElement(body, undefined, toArray(children).map(rowWithoutSlugCell));
}

function withoutSlugColumn(children: TableViewProps["children"]) {
  const nodes = toArray(children);
  const header = nodes.map(asElement).find((node) => node?.type === TableHeader);
  if (!header) return children;
  const columns = columnsWithoutSlug(header);
  if (!columns) return children;

  return nodes.map((node) => {
    if (node === header) return cloneElement(header, { columns });
    const body = asElement(node);
    return body?.type === TableBody ? bodyWithoutSlugCells(body) : node;
  }) as TableViewProps["children"];
}

export function TableView(props: TableViewProps) {
  return (
    <KeystarTableView {...props}>{withoutSlugColumn(props.children)}</KeystarTableView>
  );
}
