import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { SITE } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/lib/icons";
import { seedSystems } from "@/lib/seed";

const socials: { label: string; href: string; icon: ReactNode }[] = [
  {
    label: "LinkedIn",
    href: SITE.socials.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
        <path d="M6.5 9H4v11h2.5zM5.2 4A1.7 1.7 0 1 0 5.2 7.4 1.7 1.7 0 0 0 5.2 4zM20 20h-2.5v-5.6c0-1.6-.6-2.6-2-2.6s-1.8.9-2.1 1.8c-.1.3-.1.7-.1 1.1V20H11V9h2.4v1.5c.5-.8 1.6-1.8 3.4-1.8 2.5 0 4.2 1.6 4.2 5.1z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: SITE.socials.instagram,
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <circle cx="12" cy="12" r="3.4" />
        <circle cx="17.2" cy="6.8" r="0.7" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: SITE.socials.youtube,
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
        <path d="M21.5 8.2a3 3 0 0 0-2.1-2.2C17.6 5.5 12 5.5 12 5.5s-5.6 0-7.4.5a3 3 0 0 0-2.1 2.2A31 31 0 0 0 2 12a31 31 0 0 0 .5 3.8 3 3 0 0 0 2.1 2.2c1.8.5 7.4.5 7.4.5s5.6 0 7.4-.5a3 3 0 0 0 2.1-2.2A31 31 0 0 0 22 12a31 31 0 0 0-.5-3.8zM10.3 15.1V8.9L15.2 12z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: SITE.socials.x,
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
        <path d="M14.7 4h2.8l-6.1 7 7.2 9h-5.6l-4.4-5.8L4.2 20H1.4l6.6-7.5L1.2 4h5.7l4 5.3z" />
      </svg>
    ),
  },
];

export function Footer() {
  const systems = [...seedSystems].sort((a, b) => a.order - b.order);

  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="container-wide grid gap-12 py-16 md:grid-cols-[1.2fr_1fr_1fr_1.1fr]">
        <div>
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
          <div className="mt-6 flex items-center gap-3">
            {socials.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/8 text-ink/70 transition-colors hover:border-nera hover:text-nera"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

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
