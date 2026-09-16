const HEADING_GAP = 48;

export function stickyHeaderHeight() {
  return (
    document.querySelector<HTMLElement>("[data-sticky-header]")?.getBoundingClientRect()
      .height ?? 84
  );
}

export function sectionScrollOffset() {
  return stickyHeaderHeight() + HEADING_GAP;
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

  const heading =
    section.querySelector<HTMLElement>(".eyebrow, h1, h2, h3") ?? section;
  const top =
    window.scrollY + heading.getBoundingClientRect().top - sectionScrollOffset();

  window.scrollTo({ top: Math.max(0, Math.round(top)), behavior: "smooth" });
  return true;
}
