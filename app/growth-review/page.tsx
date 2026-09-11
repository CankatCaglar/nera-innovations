import type { Metadata } from "next";
import Image from "next/image";
import { SiteShell } from "@/components/layout/SiteShell";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Get Growth Review",
  description:
    "Request a Nera Growth Review. A clear read on how marketing turns into sales.",
};

export default function GrowthReviewPage() {
  return (
    <SiteShell>
      <section className="relative overflow-hidden">
        <Image
          src="/images/hero-road.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a120c]/80 via-[#1a120c]/55 to-transparent" />
        <div className="container-wide relative grid items-center gap-12 py-20 lg:grid-cols-[1fr_0.9fr] lg:py-28">
          <div className="max-w-xl text-white">
            <p className="text-xs font-semibold tracking-[0.18em] text-white/70 uppercase">
              Growth Review
            </p>
            <h1 className="heading-display mt-4 text-5xl sm:text-6xl">
              A clearer read on how you grow.
            </h1>
            <p className="mt-6 text-base leading-8 text-white/80">
              We look at how social, advertising, web, CRM, automation and sales
              tracking work together, then tell you where the system is leaking
              attention, time or revenue.
            </p>
          </div>
          <div className="rounded-[32px] bg-white p-7 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
            <h2 className="text-2xl font-semibold tracking-tight">Request a review</h2>
            <p className="mt-2 text-sm text-muted">
              Leave your name, work email and number. We will follow up with the next step.
            </p>
            <div className="mt-6">
              <LeadForm
                type="growth-review"
                fields={["fullName", "email", "phone", "message"]}
                submitLabel="Get Growth Review"
                successTitle="Your review request is in."
                successBody="The team will write to you at the work email you left."
              />
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
