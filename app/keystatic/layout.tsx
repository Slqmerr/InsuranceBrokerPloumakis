import KeystaticApp from "./keystatic";
import { EDITOR_BRANCH } from "./editorBranch";

// Keystatic puts a branch picker and a git menu at the top of the panel
// sidebar whenever storage isn't local, with no config option to turn them
// off (SidebarGitActions, @keystatic/core). Once the panel is pinned to one
// branch there is nothing behind them an editor should touch: the branch name
// is fixed, switching or deleting branches would strand their work, and the
// pull request is opened by CI rather than by the menu's "Create pull
// request" link. So the whole row goes, and the sidebar starts at the list of
// products — which is all Dimitrios is there for.
//
// Only when pinned: unpinned, the editor still has to create a branch to save
// at all, and hiding the controls for it would make the panel unusable.
//
// The rule reaches into Keystatic's own DOM, so it is version-sensitive by
// nature. It leans on the two most structural things available rather than on
// generated class names: the sidebar is the element holding the scrollable
// <nav>, and inside it the git row is the only child containing a combobox.
// The desktop sidebar and the mobile slide-over render that same shape, so
// one rule covers both.
const HIDE_GIT_ACTIONS = `
  div:has(> div[data-scroll-direction] > nav) > div:has(input[role="combobox"]) {
    display: none;
  }
`;

export default function KeystaticLayout() {
  return (
    <>
      {EDITOR_BRANCH && (
        <style href="keystatic-hide-git-actions" precedence="default">
          {HIDE_GIT_ACTIONS}
        </style>
      )}
      <KeystaticApp />
    </>
  );
}
