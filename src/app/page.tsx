import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import Marquee from "@/components/Marquee";
import Contact from "@/components/Contact";
import KeyboardNavigation from "@/components/KeyboardNavigation";
import SlideTransition from "@/components/SlideTransition";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="bg-slate-50 dark:bg-black min-h-screen text-slate-900 dark:text-white transition-colors duration-500">
      <KeyboardNavigation />
      <ThemeToggle />
      
      <SlideTransition>
        <Hero />
      </SlideTransition>
      
      <SlideTransition>
        <Intro />
      </SlideTransition>
      
      <SlideTransition>
        <Services />
      </SlideTransition>
      
      <SlideTransition>
        <Stats />
      </SlideTransition>
      
      {/* Projects and Process are multi-screen components, so they render natively over the sticky previous slides */}
      <div className="relative z-10 bg-slate-50 dark:bg-black transition-colors duration-500">
        <Projects />
      </div>
      
      <div className="relative z-10 bg-slate-50 dark:bg-black transition-colors duration-500">
        <Process />
      </div>
      
      <SlideTransition>
        <Marquee />
      </SlideTransition>
      
      <SlideTransition>
        <Contact />
      </SlideTransition>
    </main>
  );
}
