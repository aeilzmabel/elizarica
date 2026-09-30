"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * A card that leans toward the cursor with a soft glare where the light would hit.
 * Tilt is decorative, so it only runs for a precise pointer and never for reduced motion.
 * Children can react to hover through the "rest" / "hover" variants.
 */
export function TiltCard({
  children,
  href,
  maxTilt = 6,
  className,
  label,
}: {
  children: React.ReactNode;
  href?: string;
  maxTilt?: number;
  className?: string;
  label?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Pointer position within the card, 0 → 1 on each axis.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), spring);
  const glareOpacity = useSpring(0, spring);
  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(520px circle at ${glareX} ${glareY}, var(--glare), transparent 45%)`;

  function onPointerMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
    glareOpacity.set(1);
  }

  function onPointerLeave() {
    px.set(0.5);
    py.set(0.5);
    glareOpacity.set(0);
  }

  const shared = {
    onPointerMove,
    onPointerLeave,
    initial: "rest",
    animate: "rest",
    whileHover: "hover",
    whileTap: { scale: 0.985 },
    style: { rotateX, rotateY, transformPerspective: 1100 },
    className: cn(
      "group relative flex h-full flex-col rounded-[20px] border border-line bg-surface p-2 will-change-transform",
      "shadow-[0_1px_2px_rgb(0_0_0/0.04)] transition-[border-color,box-shadow] duration-300 ease-out-strong",
      "hover:border-line-strong hover:shadow-[0_24px_48px_-24px_rgb(0_0_0/0.25)]",
      className,
    ),
  };

  const content = (
    <>
      {children}
      <motion.span
        aria-hidden
        style={{ background: glare, opacity: glareOpacity }}
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
      />
    </>
  );

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={label}
        {...shared}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.article ref={ref} {...shared}>
      {content}
    </motion.article>
  );
}
