import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { Icon } from "@/lib/icons";
import { seedSystems } from "@/lib/seed";

const socials = [
  { label: "LinkedIn", href: SITE.socials.linkedin },
  { label: "Instagram", href: SITE.socials.instagram },
  { label: "TikTok", href: SITE.socials.tiktok },
  { label: "Facebook", href: SITE.socials.facebook },
  { label: "YouTube", href: SITE.socials.youtube },
  { label: "X", href: SITE.socials.x },
];

export function Footer() {
  const systems = seedSystems
    .filter((system) => system.featured)
    .sort((a, b) => a.order - b.order);

  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="container-wide flex flex-col gap-12 py-16 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xs">
          <Image
            src="/brand/logo-10.png"
            alt="Nera 10 Years"
            width={240}
            height={64}
            className="h-12 w-auto bg-transparent"
            unoptimized
          />
          <p className="mt-5 max-w-[220px] text-lg leading-7 font-medium text-ink/80">
            {SITE.footerSlogan}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            {socials.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/8 text-ink/70 transition-colors hover:border-nera hover:text-nera"
              >
                <BrandIcon name={item.label} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid gap-12 sm:grid-cols-3 sm:gap-24 lg:ml-auto lg:shrink-0 xl:gap-32">
        <div>
          <p className="text-sm font-semibold text-ink">Systems</p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            {systems.map((system) => (
              <li key={system.id}>
                <Link
                  href={system.kind === "external" ? system.appUrl : `/systems/${system.slug}`}
                  className="hover:text-nera"
                  target={system.kind === "external" ? "_blank" : undefined}
                >
                  {system.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink">Company</p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            <li>
              <Link href="/company" className="hover:text-nera">
                About us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-nera">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink">Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li className="flex items-start gap-2.5">
              <Icon name="mail" className="mt-0.5 h-4 w-4 text-nera" />
              <a href={`mailto:${SITE.email}`} className="hover:text-nera">
                {SITE.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Icon name="phone" className="mt-0.5 h-4 w-4 text-nera" />
              <a href={`tel:${SITE.phoneHref}`} className="hover:text-nera">
                {SITE.phone}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Icon name="pin" className="mt-0.5 h-4 w-4 text-nera" />
              <span>
                Izmir, Turkey
                <br />
                Tallinn, Estonia
              </span>
            </li>
          </ul>
          <div className="mt-6">
            <Button href="/growth-review" arrow>
              Get Growth Review
            </Button>
          </div>
        </div>
        </div>
      </div>

      <div className="container-wide flex flex-col gap-4 border-t border-black/5 py-6 text-xs text-soft sm:flex-row sm:items-center sm:justify-between">
        <p>© {SITE.legalName}. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <a href={SITE.policies.privacy} target="_blank" rel="noreferrer" className="hover:text-nera">
            Privacy Policy
          </a>
          <a href={SITE.policies.terms} target="_blank" rel="noreferrer" className="hover:text-nera">
            Terms of Use
          </a>
          <a href={SITE.policies.cookies} target="_blank" rel="noreferrer" className="hover:text-nera">
            Cookie Policy
          </a>
          <span className="hidden sm:inline">Built for a brighter tomorrow.</span>
        </div>
      </div>
    </footer>
  );
}
