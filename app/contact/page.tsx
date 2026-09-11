import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { ContactMap } from "@/components/ui/WorldMap";
import { LeadForm } from "@/components/forms/LeadForm";
import { SITE } from "@/lib/constants";
import { Icon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Nera from Izmir and Tallinn.",
};

export default function ContactPage() {
  return (
    <SiteShell>
      <section className="bg-white py-16 lg:py-20">
        <div className="container-wide grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="eyebrow">Contact</p>
            <h1 className="heading-display mt-4 max-w-xl text-5xl text-ink sm:text-6xl">
              We grow your brand from Tallinn and <span className="text-gold">Izmir</span>.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-muted">
              Meet the team behind the ads, growth systems and digital
              marketing strategies we build for ambitious brands.
            </p>
          </div>
          <ContactMap />
        </div>
      </section>

      <section className="bg-cream py-16">
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
              A single growth team between Europe and Turkey, working in one
              language, toward one result.
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
