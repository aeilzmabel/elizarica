"use client";

import { useSyncExternalStore } from "react";
import { profile } from "@/lib/data";

const format = new Intl.DateTimeFormat("en-US", {
  timeZone: profile.timeZone,
  hour: "numeric",
  minute: "2-digit",
});

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(id);
}

const getSnapshot = () => format.format(new Date());
const getServerSnapshot = () => null;

/** Local time in Manila. Renders nothing on the server to avoid a hydration mismatch. */
export function LocalTime() {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return (
    <time suppressHydrationWarning className="tabular-nums">
      {time ?? "--:-- --"}
    </time>
  );
}
