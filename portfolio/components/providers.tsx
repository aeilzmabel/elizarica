"use client";

import { MotionConfig } from "framer-motion";
import { spring } from "@/lib/motion";

/**
 * Every motion component inherits the house spring, and respects the
 * visitor's reduced-motion setting (transforms off, opacity kept).
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig transition={spring} reducedMotion="user">
      {children}
    </MotionConfig>
  );
}
