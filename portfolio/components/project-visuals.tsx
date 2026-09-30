"use client";

import { motion } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import type { ProjectVisual } from "@/lib/data";
import { easeOut, spring, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/cn";
import apolloDashboard from "@/public/projects/apollo-manager.jpg";
import apolloEmployees from "@/public/projects/apollo-manager-employees.jpg";
import circuitsHome from "@/public/projects/digital-circuits.jpg";
import circuitsResistor from "@/public/projects/digital-circuits-resistor.jpg";

// Hover variants are driven by the parent TiltCard ("rest" → "hover").

export function ProjectVisualFrame({ visual, className }: { visual: ProjectVisual; className?: string }) {
  return (
    <div
      className={cn(
        "relative h-52 overflow-hidden rounded-[14px] border border-line bg-surface-2 sm:h-60",
        className,
      )}
    >
      {visual === "fleet" && <FleetVisual />}
      {visual === "route" && <RouteVisual />}
      {visual === "apollo" && (
        <ScreenshotVisual url="localhost/apollo_manager" primary={apolloDashboard} secondary={apolloEmployees} alt="Apollo Manager" />
      )}
      {visual === "circuits" && (
        <ScreenshotVisual url="lbycpg3/homepage.html" primary={circuitsHome} secondary={circuitsResistor} alt="Digital Circuits Explorer" />
      )}
      {visual === "inventory" && <InventoryVisual />}
      {visual === "composition" && <CompositionVisual />}
      {visual === "spring" && <SpringVisual />}
    </div>
  );
}

function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-surface/80 px-2 py-0.5 font-mono text-[10px] tracking-[0.02em] text-fg-2 backdrop-blur",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Fleet Monitor: fuel telemetry with an Isolation Forest flag         */
/* ------------------------------------------------------------------ */

const FLEET = (() => {
  const W = 600;
  const H = 240;
  const top = 48;
  const bottom = 28;
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) - 0.5;

  const n = 90;
  const anomalyAt = 62;
  let fuel = 86;
  const pts: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    if (i === 30) fuel = 94; // refuel
    else if (i === anomalyAt) fuel -= 19; // siphoning event
    else fuel -= 0.62 + rand() * 0.5;
    const x = (i / (n - 1)) * W;
    const y = top + (1 - fuel / 100) * (H - top - bottom) + rand() * 1.4;
    pts.push([x, y]);
  }
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `${line} L${W} ${H} L0 ${H} Z`;
  const [ax, ay] = pts[anomalyAt];
  return { W, H, line, area, anomaly: { left: (ax / W) * 100, top: (ay / H) * 100 } };
})();

function FleetVisual() {
  const { W, H, line, area, anomaly } = FLEET;
  return (
    <div className="absolute inset-0 text-fg">
      <div className="bg-dots absolute inset-0 [mask-image:none]" />
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden>
        <defs>
          <linearGradient id="fleet-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.35, 0.6, 0.85].map((f) => (
          <line
            key={f}
            x1="0"
            x2={W}
            y1={H * f}
            y2={H * f}
            stroke="var(--line-strong)"
            strokeDasharray="3 5"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <motion.path
          d={area}
          fill="url(#fleet-area)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.9 }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1.6, ease: easeOut }}
        />
      </svg>

      {/* Anomaly marker, positioned in HTML so it stays round while the chart stretches */}
      <motion.div
        className="absolute"
        style={{ left: `${anomaly.left}%`, top: `${anomaly.top}%` }}
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={viewportOnce}
        transition={{ ...spring, delay: 1.2 }}
      >
        <span className="absolute -left-1.5 -top-1.5 size-3 rounded-full border-2 border-surface-2 bg-red-500" />
        <motion.span
          variants={{ rest: { scale: 1, opacity: 0.35 }, hover: { scale: 2.4, opacity: 0.12 } }}
          className="absolute -left-3 -top-3 size-6 rounded-full bg-red-500"
        />
        <Chip className="absolute left-3 top-2.5 border-red-500/25 text-red-600 dark:text-red-400">
          Isolation Forest · flagged
        </Chip>
      </motion.div>

      <div className="absolute inset-x-3 top-3 flex items-center justify-between">
        <Chip>fuel level · telemetry</Chip>
        <Chip className="hidden sm:inline-flex">
          <span className="size-1.5 rounded-full bg-emerald-500" /> live
        </Chip>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Fuel prototype: a GPS route streamed to the cloud                   */
/* ------------------------------------------------------------------ */

const ROUTE = "M 34 190 C 70 186, 84 140, 124 136 S 170 150, 196 112 S 228 52, 268 44";

function RouteVisual() {
  return (
    <div className="absolute inset-0 text-fg">
      <div className="bg-dots absolute inset-0 [mask-image:none]" />
      <svg viewBox="0 0 300 230" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden>
        <path d={ROUTE} fill="none" stroke="var(--line-strong)" strokeWidth="6" strokeLinecap="round" />
        <motion.path
          d={ROUTE}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeDasharray="1 0"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1.4, ease: easeOut }}
        />
        <circle cx="34" cy="190" r="4" fill="var(--surface)" stroke="currentColor" strokeWidth="1.5" />
        <motion.g
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ ...spring, delay: 1.1 }}
        >
          <motion.g variants={{ rest: { y: 0 }, hover: { y: -4 } }}>
            <path d="M268 44c-7 0-12 5-12 11.5 0 8.5 12 20.5 12 20.5s12-12 12-20.5C280 49 275 44 268 44Z" transform="translate(0 -30)" fill="currentColor" />
            <circle cx="268" cy="25.5" r="4" fill="var(--surface-2)" />
          </motion.g>
        </motion.g>
      </svg>
      <div className="absolute inset-x-3 bottom-3 flex flex-wrap gap-1.5">
        <Chip>14.5646° N, 120.9932° E</Chip>
        <Chip>
          <span className="size-1.5 rounded-full bg-emerald-500" /> fuel · streaming
        </Chip>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Screenshots in a quiet browser frame; hover reveals a second view    */
/* ------------------------------------------------------------------ */

function ScreenshotVisual({
  url,
  primary,
  secondary,
  alt,
}: {
  url: string;
  primary: StaticImageData;
  secondary: StaticImageData;
  alt: string;
}) {
  return (
    <div className="absolute inset-x-4 -bottom-px top-5 overflow-hidden rounded-t-[10px] border border-b-0 border-line bg-surface shadow-[0_12px_32px_-16px_rgb(0_0_0/0.3)] sm:inset-x-6 sm:top-6">
      <div className="flex h-6 items-center gap-2 border-b border-line px-2.5">
        <span className="flex gap-1" aria-hidden>
          <span className="size-1.5 rounded-full bg-line-strong" />
          <span className="size-1.5 rounded-full bg-line-strong" />
          <span className="size-1.5 rounded-full bg-line-strong" />
        </span>
        <span className="mx-auto truncate rounded bg-surface-2 px-2 font-mono text-[9px] leading-4 text-muted">{url}</span>
      </div>
      <motion.div
        className="relative h-full"
        variants={{ rest: { scale: 1 }, hover: { scale: 1.02 } }}
        style={{ transformOrigin: "50% 0%" }}
      >
        <Image src={primary} alt={alt} placeholder="blur" sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw" className="object-cover object-top" fill />
        <motion.div className="absolute inset-0" variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}>
          <Image src={secondary} alt="" placeholder="blur" sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw" className="object-cover object-top" fill />
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Kaliorexi: a searchable materials table                              */
/* ------------------------------------------------------------------ */

const ROWS = [
  ["P-M", "Amber bottles 100 ml", "Packaging"],
  ["P-M", "Black carboy", "Packaging"],
  ["F-D", "Aloe vera diffuser", "Fragrance"],
  ["F-B", "Baby powder", "Fragrance"],
  ["F-D", "Bamboo diffuser", "Fragrance"],
  ["F-H", "Aventus creed", "Fragrance"],
] as const;

function InventoryVisual() {
  return (
    <div className="absolute inset-x-4 -bottom-px top-5 overflow-hidden rounded-t-[10px] border border-b-0 border-line bg-surface sm:inset-x-6 sm:top-6">
      <div className="flex items-center gap-2 border-b border-line p-2.5">
        <span className="flex h-6 flex-1 items-center gap-1.5 rounded-md border border-line bg-surface-2 px-2 text-[10px] text-muted">
          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
            <circle cx="7" cy="7" r="4.5" />
            <path d="m10.5 10.5 3 3" strokeLinecap="round" />
          </svg>
          Search materials
        </span>
        <span className="rounded-md bg-fg px-2 py-1 text-[10px] font-medium text-bg">Classification</span>
      </div>
      <div className="relative">
        <motion.div
          aria-hidden
          className="absolute inset-x-1.5 top-1.5 h-7 rounded-md bg-fg/[0.05] ring-1 ring-line"
          variants={{ rest: { y: 28 * 2 }, hover: { y: 28 * 4 } }}
        />
        <ul className="relative p-1.5 font-mono text-[10px]">
          {ROWS.map(([code, name, kind], i) => (
            <li key={i} className="grid h-7 grid-cols-[2.5rem_1fr_auto] items-center gap-2 px-2 text-fg-2">
              <span className="text-muted">{code}</span>
              <span className="truncate text-fg">{name}</span>
              <span className="text-muted">{kind}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Wix: an editorial composition study                                  */
/* ------------------------------------------------------------------ */

function CompositionVisual() {
  return (
    <div className="absolute inset-0 grid grid-cols-6 grid-rows-5 gap-2 p-5 text-fg">
      <div className="col-span-4 row-span-3 flex flex-col justify-end rounded-lg bg-fg p-4 text-bg">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-60">Group 6</span>
        <span className="mt-1 text-3xl font-semibold leading-none tracking-[-0.05em]">Compose.</span>
      </div>
      <div className="relative col-span-2 row-span-3 overflow-hidden rounded-lg border border-line bg-surface">
        <motion.span
          className="absolute size-16 rounded-full bg-fg/80"
          style={{ left: "18%", top: "22%" }}
          variants={{ rest: { x: 0, y: 0 }, hover: { x: 14, y: 22 } }}
        />
      </div>
      <div className="col-span-2 row-span-2 rounded-lg border border-line bg-surface p-2.5">
        <div className="h-1 w-3/4 rounded-full bg-fg/70" />
        <div className="mt-1.5 h-1 w-1/2 rounded-full bg-fg/20" />
        <div className="mt-1 h-1 w-2/3 rounded-full bg-fg/20" />
      </div>
      <div className="col-span-4 row-span-2 flex items-end justify-between rounded-lg border border-line bg-surface px-3 py-2.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
        <span>Hierarchy</span>
        <span>Space</span>
        <span>Cohesion</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* This portfolio: the house spring, plotted from its real equation     */
/* ------------------------------------------------------------------ */

const SPRING_PLOT = (() => {
  const { stiffness: k, damping: c } = spring;
  const m = 1;
  const w0 = Math.sqrt(k / m);
  const zeta = c / (2 * Math.sqrt(k * m));
  const wd = w0 * Math.sqrt(1 - zeta * zeta);
  const W = 600;
  const H = 240;
  const top = 64;
  const bottom = 40;
  const tMax = 0.6;
  const steps = 120;
  const d: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * tMax;
    const x = 1 - Math.exp(-zeta * w0 * t) * (Math.cos(wd * t) + ((zeta * w0) / wd) * Math.sin(wd * t));
    const px = 24 + (i / steps) * (W - 48);
    const py = H - bottom - x * (H - top - bottom);
    d.push(`${i ? "L" : "M"}${px.toFixed(1)} ${py.toFixed(1)}`);
  }
  return { W, H, d: d.join(" "), targetY: top };
})();

function SpringVisual() {
  const { W, H, d, targetY } = SPRING_PLOT;
  return (
    <div className="absolute inset-0 text-fg">
      <div className="bg-dots absolute inset-0 [mask-image:none]" />
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden>
        <line x1="24" x2={W - 24} y1={targetY} y2={targetY} stroke="var(--line-strong)" strokeDasharray="3 5" vectorEffect="non-scaling-stroke" />
        <line x1="24" x2={W - 24} y1={H - 40} y2={H - 40} stroke="var(--line-strong)" vectorEffect="non-scaling-stroke" />
        <motion.path
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1.2, ease: easeOut }}
        />
      </svg>

      <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-2">
        <Chip>spring · stiffness 400 · damping 30</Chip>
        <Chip className="hidden sm:inline-flex">hover to feel it</Chip>
      </div>

      {/* The same spring, running for real on hover */}
      <div className="absolute inset-x-6 bottom-3.5 h-5">
        <motion.div
          className="h-full w-[calc(100%-1.25rem)]"
          variants={{ rest: { x: "0%" }, hover: { x: "100%" } }}
        >
          <span className="block size-5 rounded-md bg-fg shadow-[0_2px_6px_rgb(0_0_0/0.25)]" />
        </motion.div>
      </div>
    </div>
  );
}
