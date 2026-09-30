"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "@/components/icons";
import { ProjectVisualFrame } from "@/components/project-visuals";
import { Item, Stagger } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { TiltCard } from "@/components/tilt-card";
import { projects, type Project } from "@/lib/data";
import { cn } from "@/lib/cn";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-24 sm:px-6 sm:py-32">
      <SectionHeading
        index="02"
        label="Selected work"
        title="Things I've built & designed."
        description="From a thesis deployed on real trucks to coursework built from scratch. Hover a card to see it respond."
      />

      <Stagger stagger={0.07} className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Item
            key={project.id}
            blur={false}
            // The lead project spans the two-column grid too; later wide cards only on three columns.
            className={cn(project.span === 2 && (i === 0 ? "md:col-span-2" : "lg:col-span-2"))}
          >
            <ProjectCard project={project} />
          </Item>
        ))}
      </Stagger>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const wide = project.span === 2;
  return (
    <TiltCard
      href={project.href}
      maxTilt={wide ? 3 : 6}
      label={project.href ? `${project.title}, ${project.linkLabel?.toLowerCase()} (opens in a new tab)` : undefined}
    >
      <ProjectVisualFrame visual={project.visual} />

      <div className="flex flex-1 flex-col px-3 pb-3 pt-5 sm:px-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{project.kicker}</p>
            <h3 className="mt-1.5 text-lg font-semibold tracking-[-0.025em]">{project.title}</h3>
          </div>
          {project.href ? (
            <span className="mt-0.5 inline-flex h-7 shrink-0 items-center gap-1 rounded-full border border-line pl-2.5 pr-2 text-xs font-medium text-fg-2 transition-colors duration-200 ease-out-strong group-hover:border-line-strong group-hover:text-fg">
              {project.linkLabel}
              <motion.span variants={{ rest: { x: 0, y: 0 }, hover: { x: 1.5, y: -1.5 } }} className="inline-flex">
                <ArrowUpRight width={14} height={14} />
              </motion.span>
            </span>
          ) : null}
        </div>

        <p className="mt-3 text-pretty text-[14px] leading-[1.65] text-fg-2">{project.description}</p>

        {project.stats ? (
          <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
            {project.stats.map((s) => (
              <div key={s.label} className="flex flex-col bg-surface px-3 py-2.5">
                <dt className="order-2 text-[11px] text-muted">{s.label}</dt>
                <dd className="order-1 text-base font-semibold tabular-nums tracking-[-0.03em]">{s.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        {project.stats ? (
          <p className="mt-2 text-[11px] text-muted">
            *Matrix Profile in controlled tests. Evaluated on 20,412 records from 79 trips.
          </p>
        ) : null}

        <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-5">
          {project.badge ? (
            <span className="inline-flex items-center gap-1.5 rounded-md bg-fg px-2 py-1 text-[11px] font-medium text-bg">
              <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                <path d="M8 1.5 9.9 5.4l4.3.6-3.1 3 .7 4.3L8 11.3l-3.8 2 .7-4.3-3.1-3 4.3-.6L8 1.5Z" />
              </svg>
              {project.badge}
            </span>
          ) : null}
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-md border border-line px-2 py-1 text-[11px] text-fg-2">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </TiltCard>
  );
}
