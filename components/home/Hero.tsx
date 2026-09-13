import Image from "next/image";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="overflow-hidden bg-white lg:flex lg:h-[calc(100svh-84px)] lg:max-h-[860px] lg:min-h-[620px] lg:items-center">
      <div className="container-wide grid items-center gap-8 py-8 lg:h-full lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10 lg:py-8">
        <div className="max-w-[720px] rise">
          <h1 className="heading-display text-[44px] text-ink sm:text-6xl xl:text-[72px]">
            Systems That Turn
            <br />
            Marketing Into <span className="text-gold">Sales</span>
          </h1>
          <p className="mt-6 max-w-[580px] text-base leading-8 text-muted sm:text-lg sm:leading-9">
            Nera connects marketing, automation, AI tools, and sales tracking to
            turn visibility into sales opportunities.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button href="#systems" arrow>
              Explore Systems
            </Button>
            <Button href="https://nerasocial.com" variant="secondary" arrow external>
              Visit Nera Social
            </Button>
          </div>
        </div>

        <div className="relative h-[280px] min-w-0 overflow-hidden sm:h-[340px] lg:h-full lg:py-2">
          <div className="relative h-full overflow-hidden rounded-[28px] lg:rounded-[32px]">
            <Image
              src="/images/hero-systems.jpg"
              alt="A winding path from visibility to sales across social media, advertising, web, CRM, automation and AI tools"
              fill
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover"
              priority
            />
          </div>

          <aside className="absolute bottom-4 left-4 max-w-[calc(100%-2rem)] rounded-[24px] bg-white px-4 py-3.5 shadow-[0_18px_50px_rgba(148,93,60,0.14)] sm:bottom-6 sm:left-6 sm:px-5 sm:py-4">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 shrink-0 text-nera" strokeWidth={1.75} />
              <div>
                <p className="text-lg font-semibold tracking-tight text-ink">100+ Brands</p>
                <p className="text-sm text-muted">Choose Nera for growth systems</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
