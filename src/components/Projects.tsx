"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: 1, title: "Paradip Port Authority", subtitle: "Command Control AV Centre", img: "/project_imgs/proj_paradip_port.jpeg" },
  { id: 2, title: "Orissa High Court", subtitle: "Integrated Audio Solutions", img: "/project_imgs/proj_high_court.jpeg" },
  { id: 3, title: "CSIR-IMMT", subtitle: "Auditorium Setup", img: "/project_imgs/proj_immt.jpeg" },
  { id: 4, title: "NALCO", subtitle: "HVAC & Climate Control", img: "/project_imgs/proj_nalco.jpeg" },
  { id: 5, title: "Fortune Park (ITC)", subtitle: "Premium Interior & AV", img: "/project_imgs/proj_fortune_park.jpeg" },
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollWidth = scrollRef.current?.scrollWidth || 0;
      const windowWidth = window.innerWidth;

      gsap.to(scrollRef.current, {
        x: -(scrollWidth - windowWidth),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${scrollWidth - windowWidth}`,
        },
      });

      // Parallax effect on images
      const images = gsap.utils.toArray<HTMLElement>(".parallax-img");
      images.forEach((img) => {
        gsap.to(img, {
          x: 100, // Move image opposite to scroll direction
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            scrub: 1,
            start: "top top",
            end: () => `+=${scrollWidth - windowWidth}`,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen bg-black overflow-hidden flex flex-col justify-center">
      <div className="container mx-auto px-6 mb-12">
        <h2 className="text-sm font-bold tracking-widest uppercase text-blue-500 mb-2">Our Portfolio</h2>
        <h3 className="text-4xl md:text-5xl font-outfit font-bold">Featured <span className="text-gray-500">Case Studies</span></h3>
      </div>
      
      <div ref={scrollRef} className="flex gap-8 px-6 md:px-32 w-max">
        {projects.map((proj) => (
          <div key={proj.id} className="relative w-[85vw] md:w-[60vw] h-[60vh] rounded-3xl overflow-hidden group">
            {/* Parallax Image Container */}
            <div className="absolute inset-0 w-[120%] -left-[10%]">
              <div 
                className="parallax-img absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${proj.img})` }}
              />
            </div>
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 p-8 md:p-12">
              <span className="text-blue-400 font-bold tracking-wider text-sm uppercase block mb-2">{proj.subtitle}</span>
              <h4 className="text-3xl md:text-5xl font-outfit font-bold text-white">{proj.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
