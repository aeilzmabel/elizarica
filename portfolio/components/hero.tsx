"use client";

import { motion, type Variants } from "framer-motion";
import { DownloadCVButton } from "@/components/download-cv-button";
import { ArrowDown } from "@/components/icons";
import { LocalTime } from "@/components/local-time";
import { Magnetic } from "@/components/magnetic";
import { RoleRotator } from "@/components/role-rotator";
import { highlights, profile } from "@/lib/data";
import { riseBlur, spring, staggerParent, tap } from "@/lib/motion";

const word: Variants = {
  hidden: { opacity: 0, y: "0.3em", filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: spring },
};

function Words({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split(" ").map((w, i) => (
        <motion.span key={i} variants={word} className="mr-[0.22em] inline-block last:mr-0">
          {w}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative isolate">
      <div aria-hidden className="bg-dots pointer-events-none absolute inset-x-0 top-0 -z-10 h-[80svh]" />

      <motion.div
        initial="hidden"
        animate="show"
        variants={staggerParent(0.07, 0.1)}
        className="mx-auto flex min-h-[88svh] max-w-5xl flex-col justify-end px-4 pb-14 pt-32 sm:px-6 sm:pb-20"
      >
        <motion.div variants={riseBlur}>
          <a
            href="#experience"
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 py-1 pl-2.5 pr-3.5 text-[13px] text-fg-2 backdrop-blur transition-colors duration-200 ease-out-strong hover:border-line-strong hover:text-fg"
          >
            <span className="status-dot relative size-1.5 rounded-full bg-emerald-500" />
            <span>
              {profile.current.role} at <span className="font-medium text-fg">{profile.current.company}</span>
            </span>
          </a>
        </motion.div>

        <motion.h1
          variants={staggerParent(0.07)}
          className="mt-7 text-[clamp(3.1rem,10vw,6.75rem)] font-semibold leading-[0.92] tracking-[-0.05em]"
        >
          <Words text={profile.firstName} className="block" />
          <Words text={profile.lastName} className="block text-muted" />
        </motion.h1>

        <motion.p
          variants={riseBlur}
          className="mt-6 flex items-baseline gap-3 text-[clamp(1.2rem,2.6vw,1.65rem)] font-medium tracking-[-0.025em]"
        >
          <span aria-hidden className="h-px w-6 translate-y-[-0.3em] bg-faint sm:w-10" />
          <RoleRotator roles={profile.roles} />
        </motion.p>

        <motion.p
          variants={riseBlur}
          className="mt-6 max-w-[34rem] text-pretty text-[16px] leading-[1.7] text-fg-2 sm:text-[17px]"
        >
          {profile.intro}
        </motion.p>

        <motion.div variants={riseBlur} className="mt-10 flex flex-wrap items-center gap-3">
          <Magnetic>
            <motion.a
              href="#projects"
              whileTap={tap}
              initial="rest"
              animate="rest"
              whileHover="hover"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-fg pl-5 pr-4 text-sm font-medium text-bg shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_1px_2px_rgb(0_0_0/0.2)] transition-colors duration-200 ease-out-strong hover:bg-fg/90"
            >
              View projects
              <motion.span variants={{ rest: { y: 0 }, hover: { y: 2 } }}>
                <ArrowDown />
              </motion.span>
            </motion.a>
          </Magnetic>
          <Magnetic>
            <DownloadCVButton />
          </Magnetic>
        </motion.div>

        <motion.dl
          variants={staggerParent(0.05)}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-20 lg:grid-cols-4"
        >
          {highlights.map((h) => (
            <motion.div key={h.value} variants={riseBlur} className="flex flex-col gap-1.5 bg-bg p-4 sm:p-5">
              <dt className="order-2 text-pretty text-[13px] leading-snug text-muted">{h.label}</dt>
              <dd className="order-1 text-2xl font-semibold tabular-nums tracking-[-0.04em] sm:text-[1.75rem]">
                {h.value}
              </dd>
            </motion.div>
          ))}
        </motion.dl>

        <motion.div
          variants={riseBlur}
          className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted"
        >
          <span>
            {profile.location} · <LocalTime />
          </span>
          <span className="hidden sm:inline">BS Computer Engineering · DLSU ’26</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
