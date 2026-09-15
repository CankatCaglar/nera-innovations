import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { GrowthReviewForm } from "@/components/forms/GrowthReviewForm";
import { Icon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Get Growth Review",
  description:
    "Request a Nera Growth Review. A clear read on how marketing turns into sales.",
};

const highlights = [
  {
    icon: "bars",
    title: "Personalized Report",
    body: "Tailored to your business",
  },
  {
    icon: "spark",
    title: "AI-Powered Insights",
    body: "Data-driven recommendations",
  },
  {
    icon: "clock",
    title: "Clear Next Steps",
    body: "Know exactly what to improve first",
  },
];

const reasons = [
  {
    icon: "user",
    title: "No Generic Sales Call",
    body: "We use your answers to understand where you are today, so our follow-up is relevant from the first message.",
  },
  {
    icon: "form",
    title: "Tailored Recommendations",
    body: "Your details help us identify which sales, marketing, or conversion systems could actually fit your business.",
  },
  {
    icon: "chat",
    title: "A Clear Next Step",
    body: "If there’s a strong fit, we’ll share practical ideas and next steps. If not, we’ll still point you in the right direction.",
  },
];

export default function GrowthReviewPage() {
  return (
    <SiteShell>
      <section className="bg-[#fbf8f3] py-16 lg:py-20">
        <div className="container-wide grid items-start gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
          <div>
            <p className="eyebrow">Nera Growth Review</p>
            <h1 className="heading-display mt-4 max-w-xl text-5xl text-ink sm:text-6xl">
              Find the Sales Opportunities Your Business Is{" "}
              <span className="text-gold">Missing</span>.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-muted">
              Get a clear view of your marketing, sales, and conversion systems
              and discover where Nera can help you generate more qualified
              leads, meetings, and sales.
            </p>
            <ul className="mt-10 space-y-5">
              {highlights.map((item) => (
                <li key={item.title} className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-nera">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{item.title}</p>
                    <p className="mt-0.5 text-sm text-muted">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-16 border-t border-line pt-10">
              <p className="eyebrow">Why share these details?</p>
              <h2 className="heading-display mt-3 max-w-md text-3xl text-ink sm:text-4xl">
                So we can understand your business before we contact you.
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-3">
                {reasons.map((item) => (
                  <div key={item.title}>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-nera">
                      <Icon name={item.icon} className="h-5 w-5" />
                    </span>
                    <p className="mt-4 text-sm font-semibold text-ink">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-black/5 bg-white p-6 shadow-[0_18px_50px_rgba(148,93,60,0.08)] sm:p-8">
            <p className="eyebrow">Tell us about your business</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink">
              Get Your Growth Review
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              Fill in a few details, briefly share your current challenges, and
              our team will get back to you with a personalized analysis.
            </p>
            <div className="mt-6">
              <GrowthReviewForm />
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
