"use client";

import { useState } from "react";
import { useAdmin } from "@/components/admin/AdminProvider";
import { useSiteContent } from "@/lib/content";
import { Icon } from "@/lib/icons";
import { WorldMap } from "@/components/ui/WorldMap";
import { PartnerRow } from "@/components/home/Partners";
import type { MapLocation } from "@/lib/types";

const stats = [
  { icon: "users", value: "100+", label: "Brands" },
  { icon: "globe", value: "10+", label: "Systems" },
  { icon: "star", value: "10+", label: "Years" },
];

export function Trusted() {
  const { locations, systems, projects, partners, saveContent } = useSiteContent();
  const { isAdmin } = useAdmin();
  const [placing, setPlacing] = useState(false);
  const [draft, setDraft] = useState<{ x: number; y: number } | null>(null);
  const [country, setCountry] = useState("");
  const [company, setCompany] = useState("");

  async function addPin() {
    if (!draft || !country.trim() || !company.trim()) return;
    const next: MapLocation = {
      id: `pin-${Date.now()}`,
      country: country.trim(),
      company: company.trim(),
      x: draft.x,
      y: draft.y,
      order: locations.length + 1,
    };
    await saveContent({
      systems,
      projects,
      partners,
      locations: [...locations, next],
    });
    setCountry("");
    setCompany("");
    setDraft(null);
    setPlacing(false);
  }

  async function removePin(id: string) {
    await saveContent({
      systems,
      projects,
      partners,
      locations: locations.filter((item) => item.id !== id),
    });
    if (draft) setDraft(null);
  }

  return (
    <section id="company" className="overflow-x-hidden bg-[#fbf8f3]">
      <div className="container-wide grid items-center gap-10 pt-12 pb-8 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <p className="eyebrow">About Nera</p>
          <h2 className="heading-display mt-3 text-4xl text-ink sm:text-5xl">
            Trusted by brands
            <br />
            across the <span className="text-gold">world</span>.
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted">
            From local businesses to global brands, Nera teams have built growth
            systems for ambitious companies across industries.
          </p>
          <div className="mt-8 flex flex-wrap gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-nera shadow-[0_8px_20px_rgba(148,93,60,0.08)]">
                  <Icon name={stat.icon} className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-lg font-semibold tracking-tight">{stat.value}</p>
                  <p className="text-sm text-muted">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-w-0">
          <WorldMap
            locations={locations}
            editable={isAdmin && placing}
            draft={isAdmin ? draft : null}
            onPlace={setDraft}
          />
          {isAdmin ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setPlacing((value) => !value);
                  setDraft(null);
                }}
                className="absolute right-2 bottom-2 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-nera shadow-sm"
              >
                {placing ? "Cancel" : "+ Add pin"}
              </button>
              {placing && !draft ? (
                <p className="absolute right-2 bottom-11 rounded-full bg-white/90 px-3 py-1 text-[11px] text-muted">
                  Click any point on the map
                </p>
              ) : null}
              {draft ? (
                <form
                  className="mt-3 flex flex-wrap gap-2"
                  onSubmit={(event) => {
                    event.preventDefault();
                    void addPin();
                  }}
                >
                  <input
                    required
                    value={country}
                    onChange={(event) => setCountry(event.target.value)}
                    placeholder="Country"
                    className="rounded-2xl border border-black/8 bg-white px-3 py-2 text-sm"
                  />
                  <input
                    required
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                    placeholder="Company"
                    className="rounded-2xl border border-black/8 bg-white px-3 py-2 text-sm"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-nera px-4 py-2 text-sm font-semibold text-white"
                  >
                    Save pin
                  </button>
                </form>
              ) : null}
              <div className="mt-3 flex flex-wrap gap-2">
                {locations.map((pin) => (
                  <button
                    key={pin.id}
                    type="button"
                    onClick={() => void removePin(pin.id)}
                    className="rounded-full bg-white px-3 py-1 text-xs text-muted"
                  >
                    {pin.company} ×
                  </button>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>

      <div className="container-wide mt-6 pb-16">
        <div className="overflow-hidden rounded-[32px] bg-white px-5 py-8 shadow-[0_18px_50px_rgba(148,93,60,0.08)] sm:px-8 lg:px-10">
          <div className="grid items-center gap-8 lg:grid-cols-[0.46fr_1.54fr]">
            <div>
              <p className="eyebrow">Our partners</p>
              <h3 className="heading-display mt-3 text-[25px] text-ink sm:text-[28px] lg:whitespace-nowrap">
                Stronger together.
              </h3>
              <p className="mt-4 max-w-xs text-sm leading-7 text-muted">
                We collaborate with leading platforms to deliver smarter, more
                effective growth solutions.
              </p>
              <span className="mt-5 block h-0.5 w-10 bg-gold" />
            </div>
            <PartnerRow />
          </div>
        </div>
      </div>
    </section>
  );
}
