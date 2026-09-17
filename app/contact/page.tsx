import type { Metadata } from "next";
import Image from "next/image";
import { SiteShell } from "@/components/layout/SiteShell";
import { LeadForm } from "@/components/forms/LeadForm";
import { HashLink } from "@/components/ui/HashLink";
import { SITE } from "@/lib/constants";
import { Icon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Nera from Izmir and Tallinn.",
};

export default function ContactPage() {
  return (
    <SiteShell>
      <section className="relative flex min-h-[calc(100svh-84px)] w-full items-center overflow-hidden bg-white">
        <Image
          src="/images/contact-hero.webp"
          alt=""
          fill
          unoptimized
          sizes="(max-width: 1023px) 0px, 100vw"
          className="hidden object-cover object-center lg:block"
          priority
        />
        <div className="container-wide relative w-full min-w-0 py-16 lg:py-0">
          <div className="max-w-xl">
            <p className="eyebrow">Contact</p>
            <h1 className="heading-display mt-4 text-[40px] text-ink sm:text-6xl lg:text-7xl">
              We grow your brand from Tallinn and <span className="text-gold">Izmir</span>.
            </h1>
            <p className="mt-6 text-base leading-8 text-muted lg:text-lg">
              Meet our team developing technology in technoparks in Tallinn and
              Izmir, growth systems, and digital strategies for ambitious brands
              worldwide.
            </p>
            <HashLink
              href="#get-in-touch"
              className="mt-10 inline-flex items-center gap-3"
              aria-label="Scroll to get in touch"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white text-ink">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M6 10l6 6 6-6" />
                </svg>
              </span>
              <span>
                <span className="block text-sm font-semibold text-ink">Get in touch</span>
                <span className="block text-xs text-muted">Scroll to explore</span>
              </span>
            </HashLink>
          </div>
        </div>
      </section>

      <section id="get-in-touch" className="bg-cream py-16">
        <div className="container-wide grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[32px] bg-white p-8">
            <h2 className="text-2xl font-semibold tracking-tight">Get in touch</h2>
            <p className="mt-2 text-sm text-muted">
              Tell us about the brand, the bottleneck, or the next system you want to build.
            </p>
            <div className="mt-6">
              <LeadForm
                type="contact"
                fields={["fullName", "email", "subject", "message"]}
                submitLabel="Send message"
              />
            </div>
          </div>

          <div className="rounded-[32px] bg-white p-8">
            <h2 className="text-2xl font-semibold tracking-tight">Contact details</h2>
            <p className="mt-2 text-sm text-muted">
              For questions, partnerships and project conversations.
            </p>
            <ul className="mt-8 space-y-5 text-sm">
              <li className="flex gap-3">
                <Icon name="mail" className="mt-0.5 h-5 w-5 text-nera" />
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li className="flex gap-3">
                <Icon name="phone" className="mt-0.5 h-5 w-5 text-nera" />
                <a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a>
              </li>
              <li className="flex gap-3">
                <Icon name="pin" className="mt-0.5 h-5 w-5 text-nera" />
                <span>
                  Tallinn, Estonia
                  <br />
                  Izmir, Turkey
                </span>
              </li>
            </ul>
            <p className="mt-10 text-sm leading-7 text-muted">
              A technology-driven growth team based in two technoparks, building
              technology and growth systems for brands worldwide.
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
