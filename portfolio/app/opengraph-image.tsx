import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";

export const alt = `${profile.name}, ${profile.current.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#09090b",
          color: "#fafafa",
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#a1a1aa" }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: "#10b981" }} />
          {profile.current.role} at {profile.current.company}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 108, fontWeight: 600, letterSpacing: -5, lineHeight: 0.95 }}>
          <span>{profile.firstName}</span>
          <span style={{ color: "#71717a" }}>{profile.lastName}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#71717a" }}>
          <span>BS Computer Engineering · De La Salle University</span>
          <span>{profile.location}</span>
        </div>
      </div>
    ),
    size,
  );
}
