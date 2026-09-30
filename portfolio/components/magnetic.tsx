"use client";

import { motion, useReducedMotion, useSpring } from "framer-motion";
import { useRef } from "react";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * Pulls its child toward the cursor. The wrapper is padded so the pull
 * starts just before the pointer reaches the button itself.
 */
export function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  function onPointerMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      className={cn("-m-3 inline-flex p-3", className)}
    >
      <motion.div style={{ x, y }} className="inline-flex">
        {children}
      </motion.div>
    </div>
  );
}
