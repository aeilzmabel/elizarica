"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/cn";

const links = [
  { id: "experience", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

type SectionId = (typeof links)[number]["id"];

// Which nav item each observed element activates. The hero clears the selection;
// the footer maps to contact, since the last section can't reach the middle of the viewport.
// Sections without a nav item (toolkit) aren't observed, so the pill holds its last position.
const targets: Record<string, SectionId | null> = {
  top: null,
  experience: "experience",
  projects: "projects",
  contact: "contact",
  footer: "contact",
};

export function Nav() {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(targets[entry.target.id] ?? null);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of Object.keys(targets)) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-4 sm:top-4"
    >
      <nav
        aria-label="Primary"
        className="pointer-events-auto flex items-center gap-0.5 rounded-full border border-line bg-bg/70 p-1 shadow-[0_8px_24px_-12px_rgb(0_0_0/0.18)] backdrop-blur-xl backdrop-saturate-150"
      >
        <a
          href="#top"
          aria-label="Back to top"
          className="grid size-8 place-items-center rounded-full text-[13px] font-semibold tracking-[-0.04em] transition-colors duration-200 ease-out-strong hover:bg-surface-2"
        >
          er.
        </a>
        <span aria-hidden className="mx-1 h-4 w-px bg-line" />
        {links.map((link) => {
          const isActive = active === link.id;
          return (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "relative isolate rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors duration-200 ease-out-strong",
                isActive ? "text-fg" : "text-muted hover:text-fg",
              )}
            >
              {isActive ? (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 -z-10 rounded-full bg-surface shadow-[0_1px_2px_rgb(0_0_0/0.06)] ring-1 ring-line"
                />
              ) : null}
              {link.label}
            </a>
          );
        })}
        <span aria-hidden className="mx-1 h-4 w-px bg-line" />
        <ThemeToggle />
      </nav>
    </motion.header>
  );
}
