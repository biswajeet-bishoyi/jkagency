import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import Marquee from "@/components/Marquee";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white">
      <Hero />
      <Intro />
      <Services />
      <Stats />
      <Projects />
      <Process />
      <Marquee />
      <Contact />
    </main>
  );
}
