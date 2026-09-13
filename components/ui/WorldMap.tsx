"use client";

import { type MouseEvent } from "react";
import type { MapLocation } from "@/lib/types";
import { projectLonLat } from "@/lib/map";

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
    <div className={className}>
      <div
        className={`relative aspect-[18/7] w-full ${editable ? "cursor-crosshair" : ""}`}
        onClick={handleClick}
      >
        <div className="dot-map absolute inset-0" aria-hidden />

        {locations.map((location) => {
          const rightLabel =
            location.country === "Estonia" ||
            location.country === "Japan" ||
            location.country === "UAE" ||
            location.country === "USA";
          const leftLabel = location.country === "Canada";

          return (
            <div
              key={location.id}
              className={`absolute z-10 flex -translate-y-full flex-col ${
                rightLabel
                  ? "translate-x-1 items-start"
                  : leftLabel
                    ? "-translate-x-full items-end pr-1"
                    : "-translate-x-1/2 items-center"
              }`}
              style={{ left: `${location.x}%`, top: `${location.y}%` }}
            >
              <div className="mb-1.5 whitespace-nowrap rounded-2xl bg-white px-3 py-1.5 text-left shadow-[0_10px_30px_rgba(70,42,18,0.1)]">
                <p className="text-[11px] leading-none text-soft">{location.country}</p>
                <p className="mt-1 text-sm font-semibold text-ink">{location.company}</p>
              </div>
              <span
                className={`block h-2.5 w-2.5 rounded-full bg-nera shadow-[0_0_0_4px_rgba(221,160,109,0.22)] ${
                  rightLabel ? "ml-0.5" : ""
                }`}
              />
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
