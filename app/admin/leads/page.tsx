"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { useAdmin } from "@/components/admin/AdminProvider";
import type { Lead } from "@/lib/types";

function labelFor(type: Lead["type"]) {
  if (type === "growth-review") return "Growth Review";
  if (type === "resource") return "Resource";
  return "Contact";
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default function AdminLeadsPage() {
  const { isAdmin, ready } = useAdmin();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ready || !isAdmin) return;
    fetch("/api/leads", { cache: "no-store" })
      .then(async (response) => {
        const data = (await response.json()) as { leads?: Lead[]; error?: string };
        if (!response.ok) throw new Error(data.error || "Could not load inbox");
        setLeads(data.leads ?? []);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Could not load inbox");
      })
      .finally(() => setLoading(false));
  }, [ready, isAdmin]);

  if (!ready) {
    return (
      <SiteShell showCtaButton={false}>
        <div className="container-wide py-16 text-muted">Loading...</div>
      </SiteShell>
    );
  }

  if (!isAdmin) {
    return (
      <SiteShell showCtaButton={false}>
        <div className="container-wide py-16">
          <h1 className="text-2xl font-semibold">Admin inbox</h1>
          <p className="mt-3 text-muted">Sign in to see Contact and Growth Review requests.</p>
          <Link href="/admin" className="mt-6 inline-block text-sm font-semibold text-nera">
            Go to sign in
          </Link>
        </div>
      </SiteShell>
    );
  }

  return (
    <SiteShell showCtaButton={false}>
      <div className="container-wide py-12">
        <p className="eyebrow">Admin</p>
        <h1 className="heading-display mt-3 text-4xl">Inbox</h1>
        <p className="mt-3 max-w-xl text-sm leading-7 text-muted">
          Contact, Growth Review and resource requests are stored in Firebase. They
          appear here as they come in.
        </p>

        {loading ? <p className="mt-10 text-muted">Loading messages...</p> : null}
        {error ? <p className="mt-10 text-sm text-red-600">{error}</p> : null}

        {!loading && !error && leads.length === 0 ? (
          <p className="mt-10 text-muted">No messages yet.</p>
        ) : null}

        <div className="mt-10 space-y-4">
          {leads.map((lead) => (
            <article
              key={lead.id}
              className="rounded-[24px] border border-black/6 bg-white p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs font-semibold tracking-[0.16em] text-nera uppercase">
                  {labelFor(lead.type)}
                </p>
                <p className="text-xs text-soft">{formatDate(lead.createdAt)}</p>
              </div>
              <h2 className="mt-3 text-lg font-semibold tracking-tight">{lead.fullName}</h2>
              <p className="mt-1 text-sm text-muted">
                <a href={`mailto:${lead.email}`} className="hover:text-nera">
                  {lead.email}
                </a>
                {lead.phone ? ` · ${lead.phone}` : ""}
              </p>
              {lead.website ? (
                <p className="mt-1 text-sm text-muted">{lead.website}</p>
              ) : null}
              {lead.subject ? (
                <p className="mt-3 text-sm font-medium">{lead.subject}</p>
              ) : null}
              {lead.systemSlug ? (
                <p className="mt-2 text-xs text-soft">System: {lead.systemSlug}</p>
              ) : null}
              {lead.message ? (
                <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-ink">
                  {lead.message}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
