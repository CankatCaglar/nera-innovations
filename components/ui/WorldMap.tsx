"use client";

import { type MouseEvent, useEffect, useRef } from "react";
import type { MapLocation } from "@/lib/types";
import { placeMapLabels, projectLonLat } from "@/lib/map";

export function WorldMap({
  locations,
  className = "",
  editable = false,
  draft = null,
  onPlace,
}: {
  locations: MapLocation[];
  className?: string;
  editable?: boolean;
  draft?: { x: number; y: number } | null;
  onPlace?: (point: { x: number; y: number }) => void;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const placements = placeMapLabels(locations);

  useEffect(() => {
    const el = scroller.current;
    if (!el || window.matchMedia("(min-width: 1024px)").matches) return;

    const frame = requestAnimationFrame(() => {
      const maxX = Math.max(el.scrollWidth - el.clientWidth, 0);
      const maxY = Math.max(el.scrollHeight - el.clientHeight, 0);
      el.scrollLeft = maxX * 0.28;
      el.scrollTop = maxY * 0.2;
    });

    return () => cancelAnimationFrame(frame);
  }, [locations.length]);

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    if (!editable) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    onPlace?.({
      x: Math.min(98, Math.max(2, x)),
      y: Math.min(96, Math.max(4, y)),
    });
  }

  return (
    <div className={`min-w-0 ${className}`}>
      <div
        ref={scroller}
        className="h-[250px] touch-pan-x touch-pan-y overflow-auto overscroll-contain [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:h-[280px] lg:h-auto lg:overflow-visible"
      >
        <div className="w-[255%] min-w-[255%] px-10 pt-12 pb-10 lg:w-full lg:min-w-0 lg:px-0 lg:pt-0 lg:pb-0">
          <div
            className={`relative aspect-[360/140] w-full ${editable ? "cursor-crosshair" : ""}`}
            onClick={handleClick}
          >
          <div className="dot-map absolute inset-0" aria-hidden />

          {locations.map((location) => {
            const placement = placements.get(location.id) ?? {
              align: "center" as const,
              side: "above" as const,
            };
            const alignClass =
              placement.align === "right"
                ? "translate-x-1 items-start"
                : placement.align === "left"
                  ? "-translate-x-full items-end pr-1"
                  : "-translate-x-1/2 items-center";

            return (
              <div
                key={location.id}
                className={`absolute z-10 flex max-w-[7.5rem] sm:max-w-[8.5rem] ${
                  placement.side === "below"
                    ? `translate-y-0 flex-col-reverse ${alignClass}`
                    : `-translate-y-full flex-col ${alignClass}`
                }`}
                style={{ left: `${location.x}%`, top: `${location.y}%` }}
              >
                <div
                  className={`min-w-0 rounded-2xl bg-white px-2 py-1 text-left shadow-[0_10px_30px_rgba(70,42,18,0.1)] sm:px-2.5 sm:py-1.5 ${
                    placement.side === "below" ? "mt-1.5" : "mb-1.5"
                  }`}
                >
                  <p className="truncate text-[10px] leading-none text-soft">
                    {location.country}
                  </p>
                  <p className="mt-0.5 truncate text-xs font-semibold text-ink sm:text-sm">
                    {location.company}
                  </p>
                </div>
                <span className="block h-2.5 w-2.5 shrink-0 rounded-full bg-nera shadow-[0_0_0_4px_rgba(221,160,109,0.22)]" />
              </div>
            );
          })}

          {draft ? (
            <span
              className="absolute z-20 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_0_4px_rgba(221,160,109,0.28)]"
              style={{ left: `${draft.x}%`, top: `${draft.y}%` }}
            />
          ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContactMap() {
  const tallinn = projectLonLat(24.75, 59.44);
  const izmir = projectLonLat(27.14, 38.42);

  return (
    <WorldMap
      locations={[
        { id: "tallinn", country: "Tallinn", company: "Closer to Europe", ...tallinn, order: 1 },
        { id: "izmir", country: "Izmir", company: "Closer to brands", ...izmir, order: 2 },
      ]}
    />
  );
}
