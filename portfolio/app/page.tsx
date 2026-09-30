import { Contact, Footer } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { Projects } from "@/components/projects";
import { Toolkit } from "@/components/toolkit";

export default function Home() {
  return (
    <>
      <a
        href="#experience"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
      >
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Toolkit />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
