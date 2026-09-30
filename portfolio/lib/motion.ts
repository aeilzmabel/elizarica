import type { Transition, Variants } from "framer-motion";

/**
 * The house spring. Every interactive element on the site settles with it,
 * so the whole page moves with one physical "feel".
 */
export const spring = {
  type: "spring",
  stiffness: 400,
  damping: 30,
} as const satisfies Transition;

/** Strong ease-out, for the few duration-based animations (exits, chart draws). */
export const easeOut = [0.23, 1, 0.32, 1] as const;

/** Exits should be quicker than entrances: the system is responding, not presenting. */
export const exitFast = { duration: 0.16, ease: easeOut } as const satisfies Transition;

/** Press feedback for anything clickable. */
export const tap = { scale: 0.97 } as const;

/** Parent that staggers its children in when scrolled into view. */
export const staggerParent = (stagger = 0.05, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

/** Soft rise with blur. Keep blur for small elements; it's expensive on large surfaces. */
export const riseBlur: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: spring },
};

export const rise: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: spring },
};

export const viewportOnce = { once: true, margin: "-80px" } as const;
