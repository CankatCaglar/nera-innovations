const HEADING_GAP = 48;

/** Scrolls a "#id" or "/#id" target just below the sticky header. */
export function scrollToHash(hash: string) {
  const id = hash.replace(/^\/?#/, "");
  const target = id ? document.getElementById(id) : null;
  if (!target) return false;

  const header = document.querySelector<HTMLElement>("[data-sticky-header]");
  const anchor =
    target.querySelector<HTMLElement>(".eyebrow") ??
    target.querySelector<HTMLElement>("h1, h2") ??
    target;
  const offset = (header?.offsetHeight ?? 0) + HEADING_GAP;
  const top = window.scrollY + anchor.getBoundingClientRect().top - offset;

  window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
  return true;
}
