import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { profile } from "@/lib/data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

const description = `${profile.current.role} at ${profile.current.company}. Computer Engineering, De La Salle University. On-device AI, IoT anomaly detection, and interfaces that feel right.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${profile.name} · ${profile.current.role}`,
  description,
  authors: [{ name: profile.name }],
  openGraph: {
    title: profile.name,
    description,
    type: "website",
    locale: "en_PH",
  },
  twitter: { card: "summary_large_image", title: profile.name, description },
};

export const viewport: Viewport = {
  themeColor: "#fafafa",
};

// Light is the default. Runs before first paint so a visitor who chose dark never sees a light flash.
const themeScript = `(function(){try{document.documentElement.classList.toggle("dark",localStorage.getItem("theme")==="dark")}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-svh bg-bg font-sans text-fg">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
