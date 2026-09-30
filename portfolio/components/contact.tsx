"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { DownloadCVButton } from "@/components/download-cv-button";
import { ArrowUp, ArrowUpRight, Check, Copy, GitHub, Mail } from "@/components/icons";
import { LocalTime } from "@/components/local-time";
import { Magnetic } from "@/components/magnetic";
import { Item, Stagger } from "@/components/reveal";
import { profile } from "@/lib/data";
import { exitFast, tap } from "@/lib/motion";

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl scroll-mt-20 px-4 pb-28 pt-24 sm:px-6 sm:pb-40 sm:pt-32">
      <Stagger className="flex flex-col items-start">
        <Item className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          <span className="text-fg">04</span>
          <span className="mx-2 text-faint">/</span>
          Contact
        </Item>
        <Item>
          <h2 className="mt-4 max-w-3xl text-balance text-[clamp(2.4rem,7vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.05em]">
            Let&rsquo;s make <span className="text-muted">something great.</span>
          </h2>
        </Item>
        <Item>
          <p className="mt-6 max-w-md text-pretty text-[16px] leading-[1.7] text-fg-2">
            Whether it&rsquo;s a collaboration, a question, or just a hello, I&rsquo;d love to hear from you.
          </p>
        </Item>

        <Item className="mt-10 flex flex-wrap items-center gap-3">
          <Magnetic>
            <CopyEmail />
          </Magnetic>
          <Magnetic>
            <motion.a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              whileTap={tap}
              initial="rest"
              animate="rest"
              whileHover="hover"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-surface pl-4 pr-3.5 text-sm font-medium shadow-[0_1px_2px_rgb(0_0_0/0.05)] ring-1 ring-line transition-shadow duration-200 ease-out-strong hover:ring-line-strong"
            >
              <GitHub />
              GitHub
              <motion.span variants={{ rest: { x: 0, y: 0 }, hover: { x: 1.5, y: -1.5 } }} className="inline-flex text-muted">
                <ArrowUpRight width={14} height={14} />
              </motion.span>
            </motion.a>
          </Magnetic>
          <Magnetic>
            <DownloadCVButton />
          </Magnetic>
        </Item>
      </Stagger>
    </section>
  );
}

/** Copies the address, with a mailto fallback when the clipboard is unavailable. */
function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function onClick() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={tap}
      className="inline-flex h-11 items-center gap-2.5 rounded-full bg-fg pl-4 pr-3 text-sm font-medium text-bg shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_1px_2px_rgb(0_0_0/0.2)] transition-colors duration-200 ease-out-strong hover:bg-fg/90"
    >
      <Mail />
      <span className="max-w-[46vw] truncate sm:max-w-none">{profile.email}</span>
      <span className="grid size-7 place-items-center rounded-full bg-bg/15">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={copied ? "copied" : "copy"}
            initial={{ opacity: 0, scale: 0.6, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.6, filter: "blur(4px)", transition: exitFast }}
            className="grid place-items-center"
          >
            {copied ? <Check width={14} height={14} /> : <Copy width={14} height={14} />}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied" : ""}
      </span>
    </motion.button>
  );
}

export function Footer() {
  return (
    <footer id="footer" className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 font-mono text-[11px] uppercase tracking-[0.1em] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>© 2026 {profile.name}</p>
        <div className="flex items-center gap-5">
          <p>
            {profile.location} · <LocalTime />
          </p>
          <motion.a
            href="#top"
            whileTap={tap}
            className="inline-flex items-center gap-1.5 transition-colors duration-200 ease-out-strong hover:text-fg"
          >
            Top <ArrowUp width={12} height={12} />
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
