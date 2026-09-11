"use client";

import { use, useState } from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/Button";
import { LeadForm } from "@/components/forms/LeadForm";
import { getSystemBySlug, useSiteContent } from "@/lib/content";
import { Icon } from "@/lib/icons";
import { Minus, Plus } from "lucide-react";

export default function SystemDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { systems, ready } = useSiteContent();
  const system = getSystemBySlug(systems, slug);
  const [openFaq, setOpenFaq] = useState(0);

  if (ready && !system) {
    return (
      <SiteShell>
        <div className="container-wide py-24">
          <h1 className="text-3xl font-semibold">System not found</h1>
          <p className="mt-3 text-muted">This system is not available.</p>
        </div>
      </SiteShell>
    );
  }

  if (!system) {
    return (
      <SiteShell>
        <div className="container-wide py-24 text-muted">Loading...</div>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <section className="bg-white py-16 lg:py-20">
        <div className="container-wide">
          <p className="eyebrow">{system.name}</p>
          <div className="mt-5 grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h1 className="heading-display max-w-3xl text-5xl text-ink sm:text-6xl">
                {system.heroTitle}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-muted">
                {system.heroSubtitle}
              </p>
              <div className="mt-8">
                <Button href={system.appUrl} arrow external>
                  Try the application
                </Button>
              </div>
            </div>
            <div className="card flex min-h-[260px] items-center justify-center rounded-[32px] bg-sand">
              <span className="inline-flex h-20 w-20 items-center justify-center rounded-[24px] bg-white text-nera shadow-sm">
                <Icon name={system.icon} className="h-10 w-10" />
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="container-wide space-y-16">
          {system.features.map((feature, index) => {
            const reverse = index % 2 === 1;
            return (
              <div
                key={feature.title}
                className={`grid items-center gap-10 lg:grid-cols-2 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <div>
                  <h2 className="heading-display text-3xl text-ink sm:text-4xl">
                    {feature.title}
                  </h2>
                  <p className="mt-4 text-base leading-8 text-muted">{feature.body}</p>
                </div>
                <div className="card min-h-[240px] rounded-[32px] p-8">
                  <div className="flex h-full min-h-[200px] items-center justify-center rounded-2xl bg-sand">
                    <Icon name={system.icon} className="h-16 w-16 text-nera/70" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-wide grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 className="heading-display mt-3 text-4xl">
              Questions before you try it.
            </h2>
          </div>
          <div>
            {system.faqs.map((faq, index) => (
              <div key={faq.question} className="faq-item py-5">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 text-left text-lg font-semibold"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                >
                  {faq.question}
                  {openFaq === index ? (
                    <Minus className="h-5 w-5 shrink-0 text-nera" strokeWidth={1.75} />
                  ) : (
                    <Plus className="h-5 w-5 shrink-0 text-nera" strokeWidth={1.75} />
                  )}
                </button>
                {openFaq === index ? (
                  <p className="mt-3 text-sm leading-7 text-muted">{faq.answer}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream pb-20">
        <div className="container-wide">
          <div className="relative overflow-hidden rounded-[36px] bg-[#1c140f] px-8 py-12 text-white lg:px-14">
            <ImageBackdrop />
            <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-white/55 uppercase">
                  Resource
                </p>
                <h2 className="heading-display mt-3 max-w-xl text-4xl">
                  {system.resourceTitle}
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-7 text-white/75">
                  {system.resourceDescription}
                </p>
              </div>
              <div className="rounded-[28px] bg-white p-6 text-ink">
                <LeadForm
                  type="resource"
                  systemSlug={system.slug}
                  fields={["fullName", "email"]}
                  submitLabel="Send the resource"
                  successTitle="On its way."
                  successBody="We will send the resource to your work email."
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function ImageBackdrop() {
  return (
    <div
      className="absolute inset-0 opacity-35"
      style={{
        backgroundImage: "url(/images/hero-road.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
}
