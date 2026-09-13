"use client";

import { useEffect } from "react";

function isReload() {
  const nav = performance.getEntriesByType("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined;
  return nav?.type === "reload";
}

function toTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

export function ScrollToTopOnReload() {
  useEffect(() => {
    if (!isReload()) return;

    history.scrollRestoration = "manual";
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    }

    toTop();
    const frame = requestAnimationFrame(toTop);
    const timer = window.setTimeout(toTop, 0);
    window.addEventListener("load", toTop);
    window.addEventListener("pageshow", toTop);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.removeEventListener("load", toTop);
      window.removeEventListener("pageshow", toTop);
    };
  }, []);

  return null;
}
