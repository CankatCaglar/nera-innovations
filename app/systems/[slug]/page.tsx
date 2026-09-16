"use client";

import { use, useState } from "react";
import Image from "next/image";
import { SiteShell } from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/Button";
import { LeadForm } from "@/components/forms/LeadForm";
import { getSystemBySlug, hasSystemDetailPage, useSiteContent } from "@/lib/content";
import { Icon } from "@/lib/icons";
import { Minus, Plus } from "lucide-react";
import type { System } from "@/lib/types";

export default function SystemDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { systems, ready } = useSiteContent();
  const system = getSystemBySlug(systems, slug);

  if (ready && (!system || !hasSystemDetailPage(system))) {
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
      <Hero system={system} />
      <Features system={system} />
      <Faqs system={system} />
      <ResourceBanner system={system} />
    </SiteShell>
  );
}

function goldTitle(title: string) {
  const parts = title.trim().split(" ");
  const last = parts.pop() ?? "";
  return (
    <>
      {parts.join(" ")}{" "}
      <span className="text-gold">{last}</span>
    </>
  );
}

function HeroTitle({ title }: { title: string }) {
  const marker = "Score AI";
  const index = title.indexOf(marker);
  if (index === -1) return goldTitle(title);
  return (
    <>
      {title.slice(0, index)}
      <span className="text-gold">{marker}</span>
      {title.slice(index + marker.length)}
    </>
  );
}

function systemCta(system: System) {
  const href = system.ctaHref ?? system.appUrl;
  const external = href.startsWith("http");
  const label =
    system.ctaLabel ??
    (system.slug === "score" ? "Try for Free" : "Try the application");
  return { href, external, label };
}

function Hero({ system }: { system: System }) {
  const framed = system.slug !== "score" && system.slug !== "flowin";
  const cta = systemCta(system);

  return (
    <section className="flex min-h-[calc(100svh-84px)] items-center overflow-hidden bg-[#fbf8f3]">
      <div className="container-wide grid w-full items-center gap-12 py-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:py-0">
        <div>
          <p className="eyebrow">{system.name}</p>
          <h1 className="heading-display mt-4 max-w-xl text-5xl text-ink sm:text-6xl">
            <HeroTitle title={system.heroTitle} />
          </h1>
          <p className="mt-6 max-w-lg text-base leading-8 text-muted">
            {system.heroSubtitle}
          </p>
          <div className="mt-8">
            <Button href={cta.href} arrow external={cta.external}>
              {cta.label}
            </Button>
          </div>
        </div>

        <div className="relative">
          {system.image ? (
            <Image
              src={system.image}
              alt=""
              width={980}
              height={720}
              sizes="(min-width: 1024px) 46vw, 90vw"
              unoptimized={system.slug === "score" || system.slug === "flowin"}
              className={
                framed
                  ? "relative z-10 max-h-[min(520px,56svh)] w-full rounded-[28px] bg-white object-contain shadow-[0_24px_60px_rgba(148,93,60,0.14)] lg:translate-x-4 lg:rotate-[-2deg]"
                  : "relative z-10 max-h-[min(560px,62svh)] w-full bg-transparent object-contain"
              }
              priority
            />
          ) : (
            <div className="flex min-h-[280px] items-center justify-center rounded-[28px] bg-white shadow-[0_24px_60px_rgba(148,93,60,0.14)]">
              <Icon name={system.icon} className="h-16 w-16 text-nera" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Features({ system }: { system: System }) {
  return (
    <section className="bg-white py-20">
      <div className="container-wide space-y-20">
        {system.features.map((feature, index) => {
          const reverse = index % 2 === 1;
          return (
            <div
              key={feature.title}
              className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                reverse ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div>
                <h2 className="heading-display max-w-lg text-4xl text-ink sm:text-5xl">
                  {goldTitle(feature.title)}
                </h2>
                <p className="mt-5 max-w-md text-base leading-8 text-muted">
                  {feature.body}
                </p>
                {feature.points?.length ? (
                  <ul className="mt-6 space-y-3">
                    {feature.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm text-ink">
                        <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sand text-nera">
                          <Icon name="check" className="h-3 w-3" />
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
              <div
                className={
                  feature.image || system.slug === "score" || system.slug === "flowin"
                    ? "min-w-0 overflow-visible"
                    : "overflow-hidden rounded-[32px] border border-black/5 bg-[#fbf8f3] p-4 sm:p-6"
                }
              >
                {feature.image || system.image ? (
                  <Image
                    src={feature.image ?? system.image ?? ""}
                    alt=""
                    width={1600}
                    height={900}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    unoptimized={
                      system.slug === "score" ||
                      system.slug === "flowin" ||
                      system.slug === "repora"
                    }
                    className={
                      feature.image || system.slug === "score" || system.slug === "flowin"
                        ? "h-auto w-full rounded-none bg-transparent object-contain"
                        : "h-auto w-full rounded-[22px] bg-white"
                    }
                  />
                ) : (
                  <div className="flex min-h-[240px] items-center justify-center rounded-[22px] bg-white">
                    <Icon name={system.icon} className="h-14 w-14 text-nera/70" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Faqs({ system }: { system: System }) {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section className="bg-[#fbf8f3] py-20">
      <div className="container-wide grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="eyebrow">Frequently asked questions</p>
          <h2 className="heading-display mt-3 max-w-sm text-4xl text-ink sm:text-5xl">
            Everything you need to <span className="text-gold">know</span>.
          </h2>
        </div>
        <div className="space-y-3">
          {system.faqs.map((faq, index) => {
            const open = openFaq === index;
            return (
              <div
                key={faq.question}
                className="rounded-[22px] border border-black/6 bg-white px-5"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-4 text-left text-base font-semibold text-ink"
                  onClick={() => setOpenFaq(open ? -1 : index)}
                >
                  {faq.question}
                  {open ? (
                    <Minus className="h-4 w-4 shrink-0 text-nera" strokeWidth={1.75} />
                  ) : (
                    <Plus className="h-4 w-4 shrink-0 text-nera" strokeWidth={1.75} />
                  )}
                </button>
                {open ? (
                  <p className="pb-5 text-sm leading-7 text-muted">{faq.answer}</p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ResourceBanner({ system }: { system: System }) {
  return (
    <section className="bg-white py-20">
      <div className="container-wide">
        <div className="grid items-center gap-10 rounded-[36px] bg-[#fbf8f3] px-6 py-10 sm:px-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-12 lg:px-12 lg:py-14">
          <div>
            <p className="eyebrow">Free resource</p>
            <h2 className="heading-display mt-3 max-w-md text-4xl text-ink sm:text-5xl">
              {goldTitle(system.resourceTitle)}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-muted">
              {system.resourceDescription}
            </p>
          </div>

          <div className="mx-auto flex h-72 w-48 items-start rounded-md bg-gradient-to-br from-[#f3e7d8] via-white to-[#ead7c4] px-5 pt-8 pb-6 shadow-[0_22px_50px_rgba(148,93,60,0.16)] sm:h-80 sm:w-52">
            <div>
              <p className="text-xs font-medium tracking-[0.2em] text-soft uppercase">
                {system.name}
              </p>
              <p className="heading-display mt-5 text-[1.7rem] leading-8 font-bold text-ink">
                {system.resourceTitle}
              </p>
              <p className="mt-4 text-xl font-light tracking-tight text-nera">
                2026
              </p>
            </div>
          </div>

          <div className="rounded-[28px] border border-black/5 bg-white p-6 sm:p-7">
            <p className="text-lg font-semibold tracking-tight text-ink">
              Download the free guide
            </p>
            <div className="mt-5">
              <LeadForm
                type="resource"
                systemSlug={system.slug}
                fields={["fullName", "email"]}
                submitLabel="Download guide"
                successTitle="On its way."
                successBody="We will send the resource to your work email."
              />
            </div>
            <p className="mt-3 text-center text-[11px] text-soft">
              We respect your privacy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
