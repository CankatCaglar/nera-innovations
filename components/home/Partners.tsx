"use client";

import { useSiteContent } from "@/lib/content";

function PartnerMark({ name }: { name: string }) {
  const common = "h-7 w-auto text-ink";
  if (name === "LinkedIn") {
    return (
      <svg viewBox="0 0 84 24" className={common} aria-hidden>
        <text x="0" y="18" fontSize="18" fontWeight="700" fill="currentColor">
          LinkedIn
        </text>
      </svg>
    );
  }
  if (name === "TikTok") {
    return (
      <svg viewBox="0 0 72 24" className={common} aria-hidden>
        <text x="0" y="18" fontSize="18" fontWeight="700" fill="currentColor">
          TikTok
        </text>
      </svg>
    );
  }
  if (name === "Google") {
    return (
      <svg viewBox="0 0 78 24" className={common} aria-hidden>
        <text x="0" y="18" fontSize="18" fontWeight="500" fill="currentColor">
          Google
        </text>
      </svg>
    );
  }
  if (name === "Meta") {
    return (
      <svg viewBox="0 0 64 24" className={common} aria-hidden>
        <text x="0" y="18" fontSize="18" fontWeight="600" fill="currentColor">
          Meta
        </text>
      </svg>
    );
  }
  if (name === "OpenAI") {
    return (
      <svg viewBox="0 0 78 24" className={common} aria-hidden>
        <text x="0" y="18" fontSize="18" fontWeight="600" fill="currentColor">
          OpenAI
        </text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 110 24" className={common} aria-hidden>
      <text x="0" y="18" fontSize="16" fontWeight="600" fill="currentColor">
        Microsoft
      </text>
    </svg>
  );
}

export function Partners() {
  const { partners } = useSiteContent();

  return (
    <section className="bg-white py-16">
      <div className="container-wide grid items-end gap-10 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="eyebrow">Our partners</p>
          <h2 className="heading-display mt-3 text-4xl text-ink">
            Stronger
            <br />
            together.
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-7 text-muted">
            We collaborate with leading platforms to deliver smarter, more
            effective growth solutions.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3">
          {partners.map((partner) => (
            <div key={partner.id} className="min-w-0">
              <PartnerMark name={partner.name} />
              <p className="mt-1 text-xs text-soft">{partner.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
