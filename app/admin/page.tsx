"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase";
import { loadSiteContent } from "@/lib/content";
import {
  loadLeads,
  removeDoc,
  saveLocation,
  savePartner,
  saveSystem,
  seedDatabase,
  toggleFeatured,
} from "@/lib/admin";
import { COUNTRY_PRESETS } from "@/lib/seed";
import type { Lead, MapLocation, Partner, SiteContent, System } from "@/lib/types";
import { Button } from "@/components/ui/Button";

type Tab = "systems" | "locations" | "partners" | "leads";

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("systems");
  const [content, setContent] = useState<SiteContent | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [message, setMessage] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      router.replace("/admin/login");
      return;
    }
    const auth = getFirebaseAuth();
    if (!auth) return;
    return onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/admin/login");
        return;
      }
      const next = await loadSiteContent();
      setContent(next);
      try {
        setLeads(await loadLeads());
      } catch {
        setLeads([]);
      }
      setReady(true);
    });
  }, [router]);

  async function refresh() {
    setContent(await loadSiteContent());
    try {
      setLeads(await loadLeads());
    } catch {
      setLeads([]);
    }
  }

  if (!ready || !content) {
    return <div className="px-6 py-20 text-muted">Loading admin...</div>;
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="container-wide py-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow">CMS</p>
            <h1 className="text-3xl font-semibold tracking-tight">Nera panel</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="secondary"
              onClick={async () => {
                await seedDatabase();
                await refresh();
                setMessage("Seed content written to Firebase.");
              }}
            >
              Seed database
            </Button>
            <Button
              variant="ghost"
              onClick={async () => {
                const auth = getFirebaseAuth();
                if (auth) await signOut(auth);
              }}
            >
              Sign out
            </Button>
          </div>
        </div>

        {message ? <p className="mt-4 text-sm text-nera">{message}</p> : null}

        <div className="mt-8 flex flex-wrap gap-2">
          {(["systems", "locations", "partners", "leads"] as Tab[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              className={`rounded-full px-4 py-2 text-sm font-semibold capitalize ${
                tab === item ? "bg-ink text-white" : "bg-white text-ink"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === "systems" ? (
            <SystemsAdmin
              systems={content.systems}
              onChange={async () => {
                await refresh();
              }}
              onMessage={setMessage}
            />
          ) : null}
          {tab === "locations" ? (
            <LocationsAdmin
              locations={content.locations}
              onChange={refresh}
              onMessage={setMessage}
            />
          ) : null}
          {tab === "partners" ? (
            <PartnersAdmin
              partners={content.partners}
              onChange={refresh}
              onMessage={setMessage}
            />
          ) : null}
          {tab === "leads" ? <LeadsAdmin leads={leads} /> : null}
        </div>
      </div>
    </div>
  );
}

function SystemsAdmin({
  systems,
  onChange,
  onMessage,
}: {
  systems: System[];
  onChange: () => Promise<void>;
  onMessage: (value: string) => void;
}) {
  const featuredCount = systems.filter((item) => item.featured).length;
  const [editing, setEditing] = useState<System | null>(null);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted">
        Featured systems appear on the homepage and Company page. Choose up to 4.
        Currently featured: {featuredCount}/4.
      </p>
      {systems.map((system) => (
        <div key={system.id} className="card rounded-3xl p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-semibold">{system.name}</p>
              <p className="text-sm text-muted">{system.kind} · {system.slug}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={system.featured ? "primary" : "secondary"}
                onClick={async () => {
                  try {
                    await toggleFeatured(system, !system.featured, systems);
                    await onChange();
                    onMessage("");
                  } catch (error) {
                    onMessage(error instanceof Error ? error.message : "Could not update");
                  }
                }}
              >
                {system.featured ? "Featured" : "Feature"}
              </Button>
              <Button variant="secondary" onClick={() => setEditing(system)}>
                Edit
              </Button>
            </div>
          </div>
        </div>
      ))}
      {editing ? (
        <SystemEditor
          system={editing}
          onClose={() => setEditing(null)}
          onSave={async (next) => {
            await saveSystem(next);
            setEditing(null);
            await onChange();
          }}
        />
      ) : null}
    </div>
  );
}

function SystemEditor({
  system,
  onClose,
  onSave,
}: {
  system: System;
  onClose: () => void;
  onSave: (system: System) => Promise<void>;
}) {
  const [value, setValue] = useState(system);

  return (
    <div className="card space-y-3 rounded-3xl p-6">
      <h2 className="text-xl font-semibold">Edit {system.name}</h2>
      <input
        className="w-full rounded-2xl border border-black/8 px-4 py-3 text-sm"
        value={value.name}
        onChange={(event) => setValue({ ...value, name: event.target.value })}
      />
      <input
        className="w-full rounded-2xl border border-black/8 px-4 py-3 text-sm"
        value={value.tagline}
        onChange={(event) => setValue({ ...value, tagline: event.target.value })}
      />
      <input
        className="w-full rounded-2xl border border-black/8 px-4 py-3 text-sm"
        value={value.appUrl}
        onChange={(event) => setValue({ ...value, appUrl: event.target.value })}
        placeholder="Application URL"
      />
      <textarea
        className="w-full rounded-2xl border border-black/8 px-4 py-3 text-sm"
        rows={4}
        value={value.heroTitle}
        onChange={(event) => setValue({ ...value, heroTitle: event.target.value })}
      />
      <textarea
        className="w-full rounded-2xl border border-black/8 px-4 py-3 text-sm"
        rows={4}
        value={value.heroSubtitle}
        onChange={(event) => setValue({ ...value, heroSubtitle: event.target.value })}
      />
      <input
        className="w-full rounded-2xl border border-black/8 px-4 py-3 text-sm"
        value={value.resourceTitle}
        onChange={(event) => setValue({ ...value, resourceTitle: event.target.value })}
      />
      <textarea
        className="w-full rounded-2xl border border-black/8 px-4 py-3 text-sm"
        rows={3}
        value={value.resourceDescription}
        onChange={(event) => setValue({ ...value, resourceDescription: event.target.value })}
      />
      <div className="flex gap-3">
        <Button onClick={() => onSave(value)}>Save</Button>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

function LocationsAdmin({
  locations,
  onChange,
  onMessage,
}: {
  locations: MapLocation[];
  onChange: () => Promise<void>;
  onMessage: (value: string) => void;
}) {
  const [country, setCountry] = useState(COUNTRY_PRESETS[0].country);
  const [company, setCompany] = useState("");
  const preset = useMemo(
    () => COUNTRY_PRESETS.find((item) => item.country === country) ?? COUNTRY_PRESETS[0],
    [country],
  );

  return (
    <div className="space-y-5">
      <form
        className="card grid gap-3 rounded-3xl p-6 md:grid-cols-3"
        onSubmit={async (event) => {
          event.preventDefault();
          await saveLocation({
            country,
            company,
            x: preset.x,
            y: preset.y,
            order: locations.length + 1,
          });
          setCompany("");
          await onChange();
          onMessage("Location added.");
        }}
      >
        <select
          className="rounded-2xl border border-black/8 px-4 py-3 text-sm"
          value={country}
          onChange={(event) => setCountry(event.target.value)}
        >
          {COUNTRY_PRESETS.map((item) => (
            <option key={item.country}>{item.country}</option>
          ))}
        </select>
        <input
          required
          className="rounded-2xl border border-black/8 px-4 py-3 text-sm"
          placeholder="Company name"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
        />
        <Button type="submit">Add map icon</Button>
      </form>
      {locations.map((location) => (
        <div key={location.id} className="card flex items-center justify-between rounded-3xl p-5">
          <div>
            <p className="font-semibold">{location.company}</p>
            <p className="text-sm text-muted">{location.country}</p>
          </div>
          <Button
            variant="secondary"
            onClick={async () => {
              await removeDoc("locations", location.id);
              await onChange();
            }}
          >
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
}

function PartnersAdmin({
  partners,
  onChange,
  onMessage,
}: {
  partners: Partner[];
  onChange: () => Promise<void>;
  onMessage: (value: string) => void;
}) {
  const [name, setName] = useState("");
  const [label, setLabel] = useState("");

  return (
    <div className="space-y-5">
      <form
        className="card grid gap-3 rounded-3xl p-6 md:grid-cols-3"
        onSubmit={async (event) => {
          event.preventDefault();
          await savePartner({ name, label, order: partners.length + 1 });
          setName("");
          setLabel("");
          await onChange();
          onMessage("Partner added.");
        }}
      >
        <input
          required
          className="rounded-2xl border border-black/8 px-4 py-3 text-sm"
          placeholder="Partner name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          required
          className="rounded-2xl border border-black/8 px-4 py-3 text-sm"
          placeholder="Label, e.g. Marketing Partner"
          value={label}
          onChange={(event) => setLabel(event.target.value)}
        />
        <Button type="submit">Add partner</Button>
      </form>
      {partners.map((partner) => (
        <div key={partner.id} className="card flex items-center justify-between rounded-3xl p-5">
          <div>
            <p className="font-semibold">{partner.name}</p>
            <p className="text-sm text-muted">{partner.label}</p>
          </div>
          <Button
            variant="secondary"
            onClick={async () => {
              await removeDoc("partners", partner.id);
              await onChange();
            }}
          >
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
}

function LeadsAdmin({ leads }: { leads: Lead[] }) {
  if (!leads.length) {
    return <p className="text-sm text-muted">No form submissions yet.</p>;
  }

  return (
    <div className="space-y-4">
      {leads.map((lead) => (
        <article key={lead.id} className="card rounded-3xl p-5">
          <p className="text-xs tracking-widest text-soft uppercase">{lead.type}</p>
          <p className="mt-1 font-semibold">{lead.fullName}</p>
          <p className="text-sm text-muted">{lead.email}</p>
          {lead.phone ? <p className="text-sm text-muted">{lead.phone}</p> : null}
          {lead.message ? <p className="mt-3 text-sm leading-6">{lead.message}</p> : null}
        </article>
      ))}
    </div>
  );
}
