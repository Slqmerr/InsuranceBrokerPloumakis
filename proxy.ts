// Pins the Keystatic panel to one content branch.
//
// This runs before the route renders, which is the point: Keystatic's own
// RedirectToBranch sends a bare /keystatic to the repo's default branch as
// soon as the app shell has its data, and master is exactly where an editor
// must not end up — every save there is refused by branch protection, and the
// refusal surfaces as a dialog asking them to name a branch. Redirecting from
// inside the route instead would race that, and would flash the panel on the
// wrong branch first.
import { NextResponse, type NextRequest } from "next/server";

import { EDITOR_BRANCH } from "./app/keystatic/editorBranch";

const BRANCH_PREFIX = "/keystatic/branch/";

export function proxy(request: NextRequest) {
  if (!EDITOR_BRANCH) return NextResponse.next();

  const { pathname } = request.nextUrl;
  // "cms/edits" is one branch, not two path segments — Keystatic encodes the
  // slash, and so must we.
  const pinned = encodeURIComponent(EDITOR_BRANCH);

  if (pathname === "/keystatic" || pathname === "/keystatic/") {
    return NextResponse.redirect(
      new URL(`${BRANCH_PREFIX}${pinned}`, request.url)
    );
  }

  if (pathname.startsWith(BRANCH_PREFIX)) {
    const [branch, ...rest] = pathname.slice(BRANCH_PREFIX.length).split("/");
    if (decodeURIComponent(branch) !== EDITOR_BRANCH) {
      // An old bookmark, or a link shared before the panel was pinned. Keep
      // the page they asked for and swap only the branch.
      return NextResponse.redirect(
        new URL([`${BRANCH_PREFIX}${pinned}`, ...rest].join("/"), request.url)
      );
    }
  }

  // Everything else under /keystatic passes through — notably
  // /keystatic/cloud/oauth/callback, which carries no branch and must survive
  // untouched or sign-in can never complete.
  return NextResponse.next();
}

export const config = {
  matcher: ["/keystatic", "/keystatic/:path*"],
};
