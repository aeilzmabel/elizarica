"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useSyncExternalStore } from "react";
import { Moon, Sun } from "@/components/icons";
import { exitFast, tap } from "@/lib/motion";

type Theme = "light" | "dark";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

const getSnapshot = (): Theme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";
const getServerSnapshot = () => null;

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // Private mode or blocked storage: the toggle still works for this visit.
  }
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const reduce = useReducedMotion();

  function toggle(e: React.MouseEvent<HTMLButtonElement>) {
    const next: Theme = theme === "dark" ? "light" : "dark";

    // Keyboard presses (detail === 0) switch instantly; animation there only adds delay.
    const keyboard = e.detail === 0;
    if (keyboard || reduce || !document.startViewTransition) {
      applyTheme(next);
      return;
    }

    // Reveal the new theme as a circle growing from the pointer.
    const x = e.clientX;
    const y = e.clientY;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const transition = document.startViewTransition(() => applyTheme(next));
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        {
          duration: 520,
          easing: "cubic-bezier(0.23, 1, 0.32, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  }

  return (
    <motion.button
      type="button"
      onClick={toggle}
      whileTap={tap}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className="relative grid size-8 place-items-center rounded-full text-muted transition-colors duration-200 ease-out-strong hover:bg-surface-2 hover:text-fg"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {theme === null ? null : (
          <motion.span
            key={theme}
            initial={{ opacity: 0, rotate: -60, scale: 0.6, filter: "blur(4px)" }}
            animate={{ opacity: 1, rotate: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, rotate: 60, scale: 0.6, filter: "blur(4px)", transition: exitFast }}
            className="grid place-items-center"
          >
            {theme === "dark" ? <Moon /> : <Sun />}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
