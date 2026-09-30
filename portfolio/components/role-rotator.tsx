"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { exitFast, spring } from "@/lib/motion";

const INTERVAL = 2600;

/**
 * Cycles through roles, revealing each one character by character. The outgoing
 * word blurs away quickly while the next resolves in, so the eye reads one
 * continuous change rather than two words swapping.
 */
export function RoleRotator({ roles }: { roles: readonly string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      // Don't advance while the tab is hidden; resume where the visitor left off.
      if (document.visibilityState === "visible") setIndex((i) => (i + 1) % roles.length);
    }, INTERVAL);
    return () => window.clearInterval(id);
  }, [roles.length]);

  const role = roles[index];

  return (
    <span className="relative inline-flex">
      <span className="sr-only">{roles.join(", ")}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span key={role} aria-hidden className="inline-flex whitespace-pre">
          {Array.from(role).map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: "0.35em", filter: "blur(6px)" }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { ...spring, delay: i * 0.018 },
              }}
              exit={{ opacity: 0, y: "-0.25em", filter: "blur(4px)", transition: exitFast }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
