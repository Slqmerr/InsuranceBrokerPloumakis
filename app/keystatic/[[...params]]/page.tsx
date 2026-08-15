// The admin UI is client-rendered by the layout; this catch-all only makes
// every /keystatic/* path resolve to it. Which branch those paths open is
// decided a layer earlier, in proxy.ts.
export default function KeystaticPage() {
  return null;
}
