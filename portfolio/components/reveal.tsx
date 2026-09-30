"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { rise, riseBlur, staggerParent, viewportOnce } from "@/lib/motion";

type StaggerProps = HTMLMotionProps<"div"> & { stagger?: number; delay?: number };

/** Staggers direct <Item> children in once the group scrolls into view. */
export function Stagger({ stagger = 0.05, delay = 0, ...props }: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={staggerParent(stagger, delay)}
      {...props}
    />
  );
}

type ItemProps = HTMLMotionProps<"div"> & { blur?: boolean };

/** A staggered child. Pass blur={false} for large surfaces, where filter is costly. */
export function Item({ blur = true, ...props }: ItemProps) {
  return <motion.div variants={blur ? riseBlur : rise} {...props} />;
}
