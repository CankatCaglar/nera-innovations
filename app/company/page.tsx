import type { Metadata } from "next";
import Image from "next/image";
import { SiteShell } from "@/components/layout/SiteShell";
import { References } from "@/components/company/References";
import { CompanyStats } from "@/components/company/CompanyStats";
import { Partners } from "@/components/home/Partners";

export const metadata: Metadata = {
  title: "Company",
  description:
    "From a small flow to a lasting mark. Nera’s ten-year journey from a small team to a growth partner.",
};

export default function CompanyPage() {
  return (
    <SiteShell>
      <section className="relative flex min-h-[calc(100svh-84px)] items-center overflow-hidden">
        <Image
          src="/images/hero-systems.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/92 to-white/20" />
        <div className="container-wide relative py-16 lg:py-0">
          <p className="eyebrow">About Nera</p>
          <h1 className="heading-display mt-4 max-w-3xl text-5xl text-ink sm:text-6xl lg:text-7xl">
            Ideas for a bigger <span className="text-gold">tomorrow</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
            We are a growth partner that blends marketing, technology and data
            to build measurable impact for modern brands.
          </p>
          <a
            href="#story"
            className="mt-10 inline-flex items-center gap-3"
            aria-label="Scroll to our story"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white text-ink">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 10l6 6 6-6" />
              </svg>
            </span>
            <span>
              <span className="block text-sm font-semibold text-ink">Our Story</span>
              <span className="block text-xs text-muted">Scroll to explore</span>
            </span>
          </a>
        </div>
      </section>

      <section id="story" className="bg-white py-20">
        <div className="container-wide grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow">Our story</p>
            <h2 className="heading-display mt-3 max-w-xl text-4xl text-ink sm:text-5xl">
              A small team with a bigger vision.
            </h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-muted">
              <p>
                The Grand Canyon did not become what it is today overnight. About
                5 to 6 million years ago, the Colorado River began to find its path
                across the Colorado Plateau. At first it was only a flow. Over
                time it carved through rock, revealed layers, and shaped one of
                the world’s most striking natural formations, about 446
                kilometers long, up to 29 kilometers wide, and 1.6 kilometers deep.
              </p>
              <p>
                Its power is not only scale. It comes from patience, continuity,
                and the mark left by a force that flowed in the same direction,
                every day.
              </p>
              <p>
                Nera’s 10-year journey carries a similar meaning for us. We
                started small. Over time we gained experience, grew with brands,
                created across different fields, and every piece of work became
                a new layer in this journey.
              </p>
              <p>
                Today Nera is the result of ten years of accumulated experience,
                effort and transformation. We moved beyond being an agency that
                only produces communication. We became a growth partner that
                guides brands, connects marketing with sales, and builds systems
                whose results can be measured.
              </p>
              <p>
                Our tenth year is not a destination. It is the beginning of a
                new direction. Drawing strength from the mark we have already
                left, we continue to create more meaningful, more measurable and
                more lasting results for brands.
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-[32px]">
            <Image
              src="/images/hero-systems.jpg"
              alt="A winding path from visibility to sales across social media, advertising, web, CRM, automation and AI tools"
              width={1400}
              height={1400}
              className="h-full min-h-[420px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <CompanyStats />

      <References />
      <Partners />
    </SiteShell>
  );
}
