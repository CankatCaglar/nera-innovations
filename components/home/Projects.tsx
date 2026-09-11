"use client";

import { useState } from "react";
import { useSiteContent } from "@/lib/content";
import { Icon } from "@/lib/icons";
import { Button } from "@/components/ui/Button";
import type { Project } from "@/lib/types";

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (project: Project) => void;
}) {
  return (
    <article className="card flex flex-col overflow-hidden rounded-[28px]">
      <div
        className="relative h-36"
        style={{ background: `linear-gradient(160deg, ${project.accent}, #fff 80%)` }}
      >
        <span className="absolute top-4 left-4 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-nera shadow-sm">
          <Icon name="star" className="h-3.5 w-3.5" />
        </span>
        <span className="absolute right-6 bottom-4 text-ink/20">
          <Icon name={project.icon} className="h-14 w-14" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-soft uppercase">
          {project.category}
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink">
          {project.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-muted">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-sand px-2.5 py-1 text-[11px] font-medium text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onOpen(project)}
          className="mt-5 inline-flex items-center justify-between text-sm font-semibold text-ink"
        >
          Get details
          <Icon name="arrow" className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}

export function Projects() {
  const { projects } = useSiteContent();
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative overflow-hidden bg-[#f7f3ee] py-20">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-[38%] bg-cover bg-center opacity-80 lg:block"
        style={{ backgroundImage: "url(/images/lab-ribbon.jpg)" }}
      />
      <div className="container-wide relative grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="max-w-sm">
          <p className="eyebrow">Nera Lab</p>
          <h2 className="heading-display mt-3 text-4xl text-ink sm:text-5xl">
            Micro projects from the <span className="text-gold">Nera lab</span>.
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            Smaller systems, campaign tools and automation experiments built
            around real growth needs.
          </p>
          <a
            href="/contact"
            className="mt-8 inline-flex items-center gap-3 text-sm font-medium leading-5 text-ink"
          >
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10">
              <Icon name="arrow" className="h-4 w-4" />
            </span>
            <span>
              Get in touch
              <br />
              for detailed information
            </span>
          </a>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={setActive} />
          ))}
        </div>
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-4 sm:items-center"
          onClick={() => setActive(null)}
        >
          <div
            className="card w-full max-w-lg rounded-[28px] p-7"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-[11px] font-semibold tracking-[0.16em] text-soft uppercase">
              {active.category}
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight">{active.name}</h3>
            <p className="mt-4 text-sm leading-7 text-muted">{active.details}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {active.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-sand px-2.5 py-1 text-[11px] font-medium">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/contact" arrow>
                Get in touch
              </Button>
              <Button variant="secondary" onClick={() => setActive(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
