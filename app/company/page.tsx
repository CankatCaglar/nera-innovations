import type { Metadata } from "next";
import Image from "next/image";
import { SiteShell } from "@/components/layout/SiteShell";
import { References } from "@/components/company/References";
import { CompanyStats } from "@/components/company/CompanyStats";
import { Partners } from "@/components/home/Partners";
import { HashLink } from "@/components/ui/HashLink";

export const metadata: Metadata = {
  title: "Company",
  description:
    "From a small flow to a lasting mark. Nera’s ten-year journey from a small team to a growth partner.",
};

export default function CompanyPage() {
  return (
    <SiteShell>
      <section className="relative flex min-h-[calc(100svh-84px)] items-center overflow-hidden bg-white">
        <Image
          src="/images/about-hero.webp"
          alt=""
          fill
          sizes="(max-width: 1023px) 0px, 100vw"
          className="hidden object-cover lg:block"
          priority
        />
        <div className="container-wide relative py-16 lg:py-0">
          <p className="eyebrow">About Nera</p>
          <h1 className="heading-display mt-4 max-w-3xl text-5xl text-ink sm:text-6xl lg:text-7xl">
            Your AI Sales Team
            <br />
            for <span className="text-gold">More Sales</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
            Nera builds AI-powered sales systems that help companies find,
            qualify, and convert potential customers across multiple channels.
            With our in-house digital sales tools, we create a custom growth
            setup for each company’s sales goals.
          </p>
          <HashLink
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
          </HashLink>
        </div>
      </section>

      <section id="story" className="bg-cream py-20 lg:py-28">
        <div className="container-wide grid items-center gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(340px,420px)_minmax(240px,280px)] lg:items-stretch lg:gap-8">
          <div className="flex flex-col justify-center">
            <p className="eyebrow">Our story</p>
            <h2 className="heading-display mt-4 text-[40px] text-ink sm:text-[48px] lg:text-[52px]">
              10 years of experience,
              <br />
              partnering with <span className="text-gold">100+</span>
              <br />
              globally focused brands.
            </h2>
            <div className="mt-7 max-w-xl text-[15px] leading-8 text-muted">
              <p>
                Celebrating our 10th year, we have supported the growth of more
                than 100 brands through strategic social media and marketing
                management. We continue our operations under Nera Reklam
                Pazarlama Yazılım Teknoloji Limited Şirketi, with offices in
                Kuzey İzmir Teknopark and Tallinn Technopol, Estonia.
              </p>
            </div>
          </div>

          <div className="relative min-h-[340px] overflow-hidden rounded-[28px] lg:min-h-0">
            <Image
              src="/images/hero-systems.webp"
              alt="A winding canyon path, the mark of patient, lasting growth"
              fill
              sizes="(min-width: 1024px) 420px, 100vw"
              className="object-cover"
            />
          </div>

          <aside className="flex w-full flex-col rounded-[28px] bg-sand px-7 py-8 sm:px-8 sm:py-9 lg:px-9 lg:py-10">
            <p className="text-[13px] font-semibold tracking-[0.14em] text-gold uppercase sm:text-[14px] sm:tracking-[0.2em]">
              <span className="block leading-7 lg:hidden">
                Different expertises
                <br />
                a common direction
              </span>
              <span className="hidden leading-[1.85] lg:block">
                Different
                <br />
                expertises
                <br />
                a common
                <br />
                direction
              </span>
            </p>
            <span className="mt-6 block h-px w-12 bg-gold lg:mt-8" />
            <p className="mt-6 text-[15px] leading-8 text-muted lg:mt-8">
              Like a river shaping the landscape layer by layer, we believe in
              the power of consistent effort, collaboration and long-term
              perspective.
            </p>
          </aside>
        </div>
      </section>

      <CompanyStats />

      <References />
      <Partners />
    </SiteShell>
  );
}
