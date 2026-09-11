import type { MapLocation } from "@/lib/types";

export function WorldMap({
  locations,
  className = "",
}: {
  locations: MapLocation[];
  className?: string;
}) {
  return (
    <div className={`relative min-h-[340px] ${className}`}>
      <div className="dot-map absolute inset-6" />
      {locations.map((location) => (
        <div
          key={location.id}
          className="absolute z-10 -translate-x-1/2 -translate-y-full"
          style={{ left: `${location.x}%`, top: `${location.y}%` }}
        >
          <div className="mb-2 whitespace-nowrap rounded-2xl bg-white px-3 py-2 text-left shadow-[0_10px_30px_rgba(70,42,18,0.1)]">
            <p className="text-[11px] leading-none text-soft">{location.country}</p>
            <p className="mt-1 text-sm font-semibold text-ink">{location.company}</p>
          </div>
          <span className="mx-auto block h-2.5 w-2.5 rounded-full bg-nera shadow-[0_0_0_4px_rgba(232,120,48,0.18)]" />
        </div>
      ))}
    </div>
  );
}

export function ContactMap() {
  return (
    <WorldMap
      className="min-h-[300px]"
      locations={[
        { id: "tallinn", country: "Tallinn", company: "Closer to Europe", x: 54, y: 28, order: 1 },
        { id: "izmir", country: "Izmir", company: "Closer to brands", x: 58, y: 46, order: 2 },
      ]}
    />
  );
}
