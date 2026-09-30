"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { DownloadCVButton } from "@/components/download-cv-button";
import { SectionHeading } from "@/components/section-heading";
import { entries, type Entry } from "@/lib/data";
import { exitFast, riseBlur, spring, staggerParent, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/cn";

const groups = ["Work", "Education"] as const;

export function Experience() {
  const [activeId, setActiveId] = useState(entries[0].id);
  // Keyboard navigation happens in rapid succession, so it skips animation entirely.
  const [viaKeyboard, setViaKeyboard] = useState(false);
  const tabs = useRef<Record<string, HTMLButtonElement | null>>({});
  const active = entries.find((e) => e.id === activeId) ?? entries[0];

  function select(id: string, keyboard: boolean) {
    setViaKeyboard(keyboard);
    setActiveId(id);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const i = entries.findIndex((x) => x.id === activeId);
    const last = entries.length - 1;
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? (i + 1) % entries.length
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? (i - 1 + entries.length) % entries.length
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : -1;
    if (next < 0) return;
    e.preventDefault();
    const id = entries[next].id;
    select(id, true);
    tabs.current[id]?.focus();
    tabs.current[id]?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }

  return (
    <section id="experience" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-24 sm:px-6 sm:py-32">
      <SectionHeading
        index="01"
        label="Experience"
        title="Where I've worked and studied."
        description="From redesigning a campus radio station's website to shipping on-device AI. Pick an entry to read the details."
        action={<DownloadCVButton variant="primary" />}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        className="overflow-hidden rounded-2xl border border-line bg-surface shadow-(--shadow-window)"
      >
        {/* Title bar */}
        <div className="group/bar relative flex h-11 items-center border-b border-line bg-surface-2/60 px-4">
          <div aria-hidden className="flex gap-2">
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <span
                key={c}
                style={{ "--light": c } as React.CSSProperties}
                className="size-3 rounded-full bg-line-strong transition-colors duration-200 ease-out-strong group-hover/bar:bg-(--light)"
              />
            ))}
          </div>
          <p className="absolute inset-x-0 text-center font-mono text-[11px] tracking-[0.04em] text-muted">
            eliza — experience
          </p>
          <p className="ml-auto hidden font-mono text-[11px] text-muted sm:block">{entries.length} items</p>
        </div>

        <div className="md:grid md:grid-cols-[15rem_1fr]">
          {/* Sidebar */}
          <div
            role="tablist"
            aria-label="Experience and education"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="flex gap-1 overflow-x-auto border-b border-line bg-surface-2/40 p-2 [scrollbar-width:none] md:flex-col md:overflow-visible md:border-b-0 md:border-r"
          >
            {groups.map((group) => (
              <div key={group} className="contents md:block">
                <p className="hidden px-2.5 pb-1.5 pt-3 text-[11px] font-medium text-muted first:pt-1.5 md:block">
                  {group}
                </p>
                {entries
                  .filter((e) => e.group === group)
                  .map((entry) => (
                    <SidebarItem
                      key={entry.id}
                      entry={entry}
                      active={entry.id === activeId}
                      instant={viaKeyboard}
                      onSelect={() => select(entry.id, false)}
                      ref={(el) => {
                        tabs.current[entry.id] = el;
                      }}
                    />
                  ))}
              </div>
            ))}
          </div>

          {/* Detail pane */}
          <div
            id="experience-panel"
            role="tabpanel"
            aria-labelledby={`tab-${active.id}`}
            className="relative min-h-[26rem] p-6 sm:p-8"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <Detail key={active.id} entry={active} instant={viaKeyboard} />
            </AnimatePresence>
          </div>
        </div>

        {/* Path bar */}
        <div className="flex h-8 items-center gap-1.5 overflow-hidden border-t border-line bg-surface-2/40 px-4 font-mono text-[11px] text-muted">
          <span>~</span>
          <span className="text-faint">/</span>
          <span>{active.group.toLowerCase()}</span>
          <span className="text-faint">/</span>
          <span className="truncate text-fg-2">{active.id}</span>
        </div>
      </motion.div>
    </section>
  );
}

function SidebarItem({
  entry,
  active,
  instant,
  onSelect,
  ref,
}: {
  entry: Entry;
  active: boolean;
  instant: boolean;
  onSelect: () => void;
  ref: React.Ref<HTMLButtonElement>;
}) {
  return (
    <motion.button
      ref={ref}
      id={`tab-${entry.id}`}
      type="button"
      role="tab"
      aria-selected={active}
      aria-controls="experience-panel"
      tabIndex={active ? 0 : -1}
      onClick={onSelect}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative isolate flex shrink-0 items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors duration-200 ease-out-strong md:w-full",
        active ? "text-fg" : "text-fg-2 hover:bg-fg/[0.03]",
      )}
    >
      {active ? (
        <motion.span
          layoutId="experience-active"
          transition={instant ? { duration: 0 } : spring}
          className="absolute inset-0 -z-10 rounded-lg bg-surface shadow-[0_1px_2px_rgb(0_0_0/0.06)] ring-1 ring-line"
        />
      ) : null}
      <span
        aria-hidden
        className={cn(
          "grid size-8 shrink-0 place-items-center rounded-md border font-mono text-[10px] font-semibold tracking-tight transition-colors duration-200 ease-out-strong",
          active ? "border-fg bg-fg text-bg" : "border-line bg-surface text-fg-2",
        )}
      >
        {entry.glyph}
      </span>
      <span className="min-w-0">
        <span className="block truncate whitespace-nowrap text-[13px] font-medium">{entry.org}</span>
        <span className="block truncate whitespace-nowrap text-xs text-muted">{entry.period}</span>
      </span>
    </motion.button>
  );
}

// AnimatePresence's popLayout mode measures the exiting child, so it needs the ref.
function Detail({ entry, instant, ref }: { entry: Entry; instant: boolean; ref?: React.Ref<HTMLElement> }) {
  return (
    <motion.article
      ref={ref}
      initial={instant ? false : "hidden"}
      animate="show"
      exit={{ opacity: 0, filter: "blur(4px)", transition: instant ? { duration: 0 } : exitFast }}
      variants={staggerParent(0.04)}
      className="w-full"
    >
      <motion.header variants={riseBlur} className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold tracking-[-0.03em] sm:text-2xl">{entry.role}</h3>
          <p className="mt-1 text-[15px] text-fg-2">
            {entry.org} <span className="text-faint">·</span> {entry.location}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {entry.current ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Current
            </span>
          ) : null}
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{entry.period}</span>
        </div>
      </motion.header>

      <ul className="mt-7 space-y-3.5">
        {entry.points.map((point) => (
          <motion.li key={point} variants={riseBlur} className="flex gap-3 text-[15px] leading-[1.65] text-fg-2">
            <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-faint" />
            <span className="text-pretty">{point}</span>
          </motion.li>
        ))}
      </ul>

      {entry.note ? (
        <motion.div variants={riseBlur} className="mt-7 rounded-xl border border-line bg-surface-2/60 p-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{entry.note.label}</p>
          <p className="mt-2 text-pretty text-[14px] leading-[1.6] text-fg">{entry.note.body}</p>
        </motion.div>
      ) : null}

      <motion.ul variants={riseBlur} className="mt-8 flex flex-wrap gap-1.5" aria-label="Skills">
        {entry.tags.map((tag) => (
          <li key={tag} className="rounded-md border border-line bg-surface-2/60 px-2 py-1 text-xs text-fg-2">
            {tag}
          </li>
        ))}
      </motion.ul>
    </motion.article>
  );
}
