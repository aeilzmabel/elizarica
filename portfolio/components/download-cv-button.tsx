"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/data";
import { exitFast, tap } from "@/lib/motion";
import { cn } from "@/lib/cn";

const blurIn = {
  initial: { opacity: 0, y: 6, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -6, filter: "blur(4px)", transition: exitFast },
};

/**
 * A download link that answers back: the arrow dips on hover, drops into the
 * tray on press, and the label settles on a checkmark for a moment.
 */
export function DownloadCVButton({
  variant = "secondary",
  className,
}: {
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const [done, setDone] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function onClick() {
    setDone(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setDone(false), 2200);
  }

  return (
    <motion.a
      href={profile.cv.href}
      download={profile.cv.filename}
      onClick={onClick}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap={tap}
      className={cn(
        "group relative inline-flex h-11 items-center gap-2.5 rounded-full pl-4 pr-5 text-sm font-medium",
        "transition-[background-color,box-shadow,color] duration-200 ease-out-strong",
        variant === "primary"
          ? "bg-fg text-bg shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_1px_2px_rgb(0_0_0/0.2)] hover:bg-fg/90"
          : "bg-surface text-fg shadow-[0_1px_2px_rgb(0_0_0/0.05)] ring-1 ring-line hover:ring-line-strong",
        className,
      )}
    >
      <span className="relative grid size-4 place-items-center overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          {done ? (
            <motion.svg
              key="check"
              viewBox="0 0 16 16"
              width={16}
              height={16}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              initial={{ opacity: 0, scale: 0.6, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.6, filter: "blur(4px)", transition: exitFast }}
            >
              <motion.path
                d="m3.5 8.5 3 3 6-7"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1], delay: 0.05 }}
              />
            </motion.svg>
          ) : (
            <motion.svg
              key="download"
              viewBox="0 0 16 16"
              width={16}
              height={16}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, transition: exitFast }}
            >
              <motion.g
                variants={{ rest: { y: 0 }, hover: { y: 1.5 } }}
                exit={{ y: 10, transition: { duration: 0.18, ease: [0.77, 0, 0.175, 1] } }}
              >
                <path d="M8 2.5v7M5 6.75l3 3 3-3" />
              </motion.g>
              <path d="M2.75 10.5v1.25a1.5 1.5 0 0 0 1.5 1.5h7.5a1.5 1.5 0 0 0 1.5-1.5V10.5" />
            </motion.svg>
          )}
        </AnimatePresence>
      </span>

      {/* Both labels share one grid cell, so the button never changes width. */}
      <span className="grid">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={done ? "done" : "idle"} className="col-start-1 row-start-1" {...blurIn}>
            {done ? "Downloaded" : "Download CV"}
          </motion.span>
        </AnimatePresence>
        <span aria-hidden className="invisible col-start-1 row-start-1">
          Download CV
        </span>
      </span>
      <span className="sr-only">({profile.cv.meta})</span>
    </motion.a>
  );
}
