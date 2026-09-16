import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function CtaBanner({ showButton = true }: { showButton?: boolean }) {
  return (
    <section className="bg-sand py-10 lg:py-14">
      <div className="container-wide">
        <div className="grid items-center gap-8 overflow-hidden rounded-[28px] bg-white px-8 py-10 sm:px-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12 lg:px-12 lg:py-12">
          <div className="max-w-xl">
            <h2 className="heading-display text-[36px] text-ink sm:text-5xl lg:text-[52px]">
              From Prospects to Meetings,
              <br />
              Automatically
            </h2>
            <p className="mt-5 text-[15px] leading-8 text-muted sm:text-base">
              Nera helps companies find the right prospects, qualify leads,
              automate outreach, and turn interest into sales conversations.
            </p>
            {showButton ? (
              <div className="mt-8">
                <Button href="/growth-review" arrow>
                  Get Growth Review
                </Button>
              </div>
            ) : null}
          </div>

          <div className="min-w-0">
            <Image
              src="/images/cta-prospects.jpg"
              alt="Prospects moving through AI outreach to a booked sales meeting"
              width={1024}
              height={606}
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
