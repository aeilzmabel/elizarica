"use client";

import { motion } from "framer-motion";
import { Item, Stagger } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { recognition, skills } from "@/lib/data";
import { riseBlur, staggerParent, viewportOnce } from "@/lib/motion";

export function Toolkit() {
  return (
    <section id="toolkit" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-24 sm:px-6 sm:py-32">
      <SectionHeading index="03" label="Toolkit" title="What I bring to the table." />

      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <Stagger stagger={0.06} className="divide-y divide-line border-y border-line">
          {skills.map((group) => (
            <Item key={group.label} className="grid gap-3 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
              <h3 className="pt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{group.label}</h3>
              <ul className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line bg-surface px-3 py-1 text-[13px] text-fg-2 shadow-[0_1px_1px_rgb(0_0_0/0.03)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Item>
          ))}
        </Stagger>

        <div>
          <h3 className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">Recognition</h3>
          <motion.ol
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerParent(0.04)}
            className="mt-4"
          >
            {recognition.map((r) => (
              <motion.li
                key={`${r.year}-${r.title}`}
                variants={riseBlur}
                className="grid grid-cols-[3rem_1fr] gap-3 border-t border-line py-3.5 last:border-b"
              >
                <span className="pt-px font-mono text-xs tabular-nums text-muted">{r.year}</span>
                <span>
                  <span className="block text-[14px] font-medium tracking-[-0.01em]">{r.title}</span>
                  <span className="block text-[13px] text-muted">
                    {r.org}
                    {"detail" in r ? <span className="font-mono text-[11px] text-faint"> · {r.detail}</span> : null}
                  </span>
                </span>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
