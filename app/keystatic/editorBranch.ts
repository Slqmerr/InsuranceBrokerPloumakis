// The single long-lived branch every CMS edit lands on.
//
// Why it exists: Keystatic has no notion of "the editor's branch". It opens
// the repo's default branch, and saving there hits the branch protection on
// master, at which point it gives up and asks the editor to invent a branch
// name — a dialog whose field starts empty, because Keystatic never suggests
// one (CreateBranchDuringUpdateDialog, @keystatic/core). Pointing the panel at
// one unprotected cms/* branch removes the question entirely: the commit lands
// there, and .github/workflows/cms-auto-pr.yml raises the pull request.
//
// Set, the panel is pinned: every /keystatic URL is rewritten onto this branch
// and the sidebar's branch picker and git menu are hidden, since neither has
// anything left to offer an editor. Unset, nothing changes — Keystatic opens
// the default branch and the branch-naming dialog comes back — so the panel
// never ends up pinned to a branch that does not exist yet.
export const EDITOR_BRANCH = process.env.NEXT_PUBLIC_KEYSTATIC_BRANCH;
