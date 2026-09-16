const HEADING_GAP = 0;
const STORY_GAP = 120;

export function stickyHeaderHeight() {
  return (
    document.querySelector<HTMLElement>("[data-sticky-header]")?.getBoundingClientRect()
      .height ?? 84
  );
}

export function sectionScrollOffset(id?: string) {
  const gap = id === "story" ? STORY_GAP : HEADING_GAP;
  return stickyHeaderHeight() + gap;
}

export function syncHeaderOffset() {
  document.documentElement.style.setProperty(
    "--header-offset",
    `${sectionScrollOffset()}px`,
  );
}

/** Scrolls a "#id" or "/#id" target so the heading sits clear of the sticky header. */
export function scrollToHash(hash: string) {
  const id = hash.replace(/^\/?#/, "");
  const section = id ? document.getElementById(id) : null;
  if (!section) return false;

  syncHeaderOffset();

  const offset = sectionScrollOffset(id);
  const target =
    id === "story"
      ? (section.querySelector<HTMLElement>(".eyebrow, h1, h2, h3") ?? section)
      : section;
  const top = window.scrollY + target.getBoundingClientRect().top - offset;

  window.scrollTo({ top: Math.max(0, Math.round(top)), behavior: "smooth" });
  return true;
}
