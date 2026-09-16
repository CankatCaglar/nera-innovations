"use client";

import Image from "next/image";
import Link from "next/link";
import { useSiteContent } from "@/lib/content";
import { Icon } from "@/lib/icons";
import type { Project } from "@/lib/types";

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_16px_40px_rgba(148,93,60,0.08)]">
      <div
        className="relative h-40"
        style={
          project.image
            ? undefined
            : { background: `linear-gradient(160deg, ${project.accent}, #fff 78%)` }
        }
      >
        {project.image ? (
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(min-width: 1280px) 20vw, (min-width: 640px) 40vw, 100vw"
            className="object-cover"
          />
        ) : null}
        <span className="absolute top-4 left-4 z-10 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-nera shadow-sm">
          <Icon name="check" className="h-3.5 w-3.5" />
        </span>
        {project.image ? null : (
          <span className="absolute right-6 bottom-4 text-ink/18">
            <Icon name={project.icon} className="h-14 w-14" />
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-soft uppercase">
          {project.category}
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink">
          {project.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-muted">{project.description}</p>
        <div className="mt-4 flex flex-nowrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="shrink-0 whitespace-nowrap rounded-full bg-sand px-2 py-0.5 text-[10px] font-medium text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          href="/growth-review"
          className="mt-5 inline-flex w-full items-center justify-between rounded-full border border-black/8 px-4 py-2.5 text-sm font-semibold text-ink"
        >
          Get details
          <Icon name="arrow" className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

export function Projects() {
  const { projects } = useSiteContent();

  return (
    <section id="projects" className="relative overflow-x-clip bg-[#f7f3ee] py-20">
      <div className="container-wide relative grid items-start gap-10 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="relative max-w-sm pt-4 lg:min-h-[560px]">
          <p className="eyebrow">Nera Lab</p>
          <h2 className="heading-display mt-3 text-4xl text-ink sm:text-5xl">
            Micro projects from the <span className="text-gold">Nera lab</span>.
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            Smaller systems, campaign tools and automation experiments built
            around real growth needs.
          </p>
          <span className="mt-8 block h-px w-16 bg-black/15" />
          <a
            href="/contact"
            className="mt-8 inline-flex items-center gap-3 text-sm font-medium leading-5 text-ink"
          >
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white">
              <Icon name="arrow" className="h-4 w-4" />
            </span>
            <span>
              Get in touch
              <br />
              for detailed information
            </span>
          </a>
          <p className="absolute bottom-0 left-0 hidden max-w-[8rem] text-[11px] leading-4 tracking-[0.18em] text-soft uppercase lg:block">
            Ideas tested
            <br />
            systems
            <br />
            that work
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
