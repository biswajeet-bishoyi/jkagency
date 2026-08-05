"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

const projects = [
  { 
    id: "paradip", 
    title: "Command and control centre", 
    type: "AV / COMMAND CENTRE",
    client: "Paradip Port Authority",
    description: "A live 24/7 operations room needed real-time visibility across the port — zero tolerance for downtime.",
    metrics: [{ value: "<10ms", label: "Latency" }, { value: "24/7", label: "Uptime" }],
    tags: ["AV Matrix", "Crestron", "LED Wall"],
    img: "/project_imgs/proj_paradip_port.jpeg",
    year: "2023",
    glyph: "◧◨"
  },
  { 
    id: "highcourt", 
    title: "Justice delivery AV system", 
    type: "AUDIO / JUDICIARY",
    client: "Orissa High Court",
    description: "Encrypted, courtroom-grade audio clarity engineered for zero-fail public proceedings across 14 courts.",
    metrics: [{ value: "14", label: "Courts" }, { value: "AES-256", label: "Encryption" }],
    tags: ["DSP", "Audio network", "Secure"],
    img: "/project_imgs/proj_high_court.jpeg",
    year: "2022",
    glyph: "◫◫"
  },
  { 
    id: "immt", 
    title: "Scientific auditorium", 
    type: "AUDITORIUM / RESEARCH",
    client: "CSIR-IMMT",
    description: "Built for international delegations — precision projection and acoustics for research-grade presentation.",
    metrics: [{ value: "4K", label: "Projection" }, { value: "Line array", label: "Acoustics" }],
    tags: ["4K", "Stage lighting", "Auditorium"],
    img: "/project_imgs/proj_immt.jpeg",
    year: "2021",
    glyph: "▧▧"
  },
  { 
    id: "nalco", 
    title: "Industrial climate control", 
    type: "HVAC / INDUSTRIAL",
    client: "NALCO",
    description: "Large-scale, energy-efficient HVAC retrofitting for mining sites, engineered for continuous heavy load.",
    metrics: [{ value: "22%", label: "Energy cut" }, { value: "Robust", label: "Thermal" }],
    tags: ["Energy retrofit", "Industrial HVAC"],
    img: "/project_imgs/proj_nalco.jpeg",
    year: "2020",
    glyph: "▦▤"
  }
];

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const deckRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = slideRefs.current.findIndex((el) => el === entry.target);
            if (index !== -1) {
              setActiveIndex(index);
            }
          }
        });
      },
      { root: deckRef.current, threshold: 0.2 }
    );

    slideRefs.current.forEach((slide) => {
      if (slide) observer.observe(slide);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSlide = (index: number) => {
    if (slideRefs.current[index]) {
      slideRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollNext = () => {
    const next = Math.min(projects.length - 1, activeIndex + 1);
    scrollToSlide(next);
  };

  return (
    <section id="projects-deck" className="relative w-full h-[100vh] bg-slate-50 dark:bg-[#0a0d10] text-slate-900 dark:text-[#eef2f2] transition-colors duration-500 overflow-hidden font-sans">
      
      {/* Grid Background */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-50 dark:opacity-40 transition-opacity duration-500"
        style={{
          backgroundImage: "linear-gradient(rgba(120,160,180,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(120,160,180,0.14) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 90%)",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 90%)"
        }} 
      />

      {/* Navigation Rail (Desktop) */}
      <div className="hidden md:flex absolute left-[36px] top-1/2 -translate-y-1/2 z-20 flex-col gap-[1.4rem]">
        {projects.map((project, idx) => (
          <button 
            key={idx}
            onClick={() => scrollToSlide(idx)}
            className={cn(
              "group relative w-[10px] h-[10px] rounded-full border cursor-pointer transition-all duration-300",
              activeIndex === idx 
                ? "bg-blue-500 border-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.18)] dark:bg-[#3ddab4] dark:border-[#3ddab4] dark:shadow-[0_0_0_4px_rgba(61,218,180,0.18)]" 
                : "bg-transparent border-slate-400 dark:border-[#78b4c8]/35 shadow-none"
            )}
          >
            <span 
              className={cn(
                "absolute left-[20px] top-1/2 -translate-y-1/2 font-mono text-[0.7rem] whitespace-nowrap transition-opacity duration-300",
                activeIndex === idx ? "opacity-100 text-blue-500 dark:text-[#3ddab4]" : "opacity-0 text-slate-500 dark:text-[#8f9ea3] group-hover:opacity-50"
              )}
            >
              {project.year}
            </span>
          </button>
        ))}
      </div>

      {/* Scroll Down CTA */}
      <button 
        onClick={scrollNext}
        className={cn(
          "absolute bottom-[2.2rem] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-[0.4rem]",
          "text-slate-500 dark:text-[#8f9ea3] font-mono text-[0.7rem] tracking-[0.1em] cursor-pointer bg-transparent border-none",
          activeIndex === projects.length - 1 ? "opacity-0 pointer-events-none" : "opacity-100 transition-opacity duration-300"
        )}
      >
        SCROLL
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </button>

      {/* Deck Container */}
      <div 
        id="projects-scroll-container"
        ref={deckRef} 
        className="relative z-10 w-full h-[100vh] overflow-y-scroll snap-y snap-mandatory scroll-smooth hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {projects.map((project, idx) => {
          const isActive = activeIndex === idx;

          return (
            <div 
              key={project.id}
              ref={(el) => { slideRefs.current[idx] = el; }}
              className="w-full min-h-[100vh] snap-start grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-[3rem] px-6 py-20 md:py-0 md:px-[6vw] md:pl-[96px]"
            >
              
              {/* Thumb */}
              <div 
                className="relative aspect-[4/3] rounded-[4px] overflow-hidden border border-black/10 dark:border-[#78a0b4]/14 shadow-xl"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'scale(1)' : 'scale(0.96)',
                  transition: 'opacity 0.7s ease, transform 0.7s ease',
                }}
              >
                {/* Background Image Layer */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
                  style={{ 
                    backgroundImage: `url(${project.img})`,
                    transform: isActive ? 'scale(1.05)' : 'scale(1)'
                  }}
                />
                {/* Subtle Gradient for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

                <div className="absolute top-[1rem] left-[1rem] font-mono text-[0.72rem] text-white bg-black/70 px-[0.6rem] py-[0.25rem] rounded-[2px] tracking-[0.06em] uppercase backdrop-blur-md">
                  {project.type}
                </div>
                
                <div className="absolute bottom-[1rem] left-[1rem] font-mono text-[0.85rem] text-white bg-black/70 px-[0.8rem] py-[0.3rem] rounded-[2px] backdrop-blur-md">
                  {project.year}
                </div>
              </div>

              {/* Content */}
              <div 
                className="flex flex-col"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s'
                }}
              >
                <div className="font-mono text-[0.78rem] text-slate-500 dark:text-[#8f9ea3] mb-[0.8rem]">
                  0{idx + 1} / 0{projects.length}
                </div>
                <div className="font-mono text-[0.8rem] text-blue-500 dark:text-[#4f8cff] tracking-[0.08em] mb-[0.6rem] uppercase">
                  {project.client}
                </div>
                <h2 className="text-[1.8rem] md:text-[2.6rem] font-bold font-sans text-slate-900 dark:text-white leading-tight">
                  {project.title}
                </h2>
                <p className="text-[1rem] text-slate-600 dark:text-[#8f9ea3] mt-[0.9rem] max-w-[42ch]">
                  {project.description}
                </p>
                
                <div className="flex gap-[2.5rem] mt-[1.7rem]">
                  {project.metrics.map((metric, i) => (
                    <div key={i}>
                      <b className="block text-[1.5rem] font-bold text-slate-900 dark:text-white">{metric.value}</b>
                      <span className="text-[0.72rem] text-slate-500 dark:text-[#8f9ea3] uppercase tracking-[0.06em] font-mono">{metric.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-[0.5rem] mt-[1.6rem]">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-[0.75rem] border border-black/10 dark:border-[rgba(120,180,200,0.35)] px-[0.7rem] py-[0.3rem] rounded-full text-slate-600 dark:text-[#8f9ea3]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
