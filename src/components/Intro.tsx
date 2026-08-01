"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Draw SVG Line
      if (lineRef.current) {
        const length = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 1,
          },
        });
      }

      // Parallax text reveal
      const texts = gsap.utils.toArray<HTMLElement>(".reveal-text");
      texts.forEach((text) => {
        gsap.fromTo(
          text,
          { opacity: 0, y: 50, rotateX: -45 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            scrollTrigger: {
              trigger: text,
              start: "top 85%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen py-32 bg-black overflow-hidden flex flex-col items-center">
      
      {/* Background Graphic */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none flex justify-center">
        <svg width="800" height="100%" viewBox="0 0 800 2000" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path ref={lineRef} d="M400,0 C400,300 200,400 200,700 C200,1000 600,1100 600,1400 C600,1700 400,1800 400,2000" stroke="url(#paint0_linear)" strokeWidth="2" strokeLinecap="round" />
          <defs>
            <linearGradient id="paint0_linear" x1="400" y1="0" x2="400" y2="2000" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3b82f6" />
              <stop offset="0.5" stopColor="#8b5cf6" />
              <stop offset="1" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center flex flex-col gap-32">
        
        {/* Intro text */}
        <div ref={textRef} className="perspective-1000">
          <h2 className="text-3xl md:text-5xl font-outfit font-bold text-white mb-6 reveal-text">
            Not just vendors. <br />
            <span className="text-gray-500">We are your integration partners.</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 font-light reveal-text">
            Founded in 2014, JK Agency has transformed how spaces operate. From complex government command centers to premium enterprise boardrooms, we deliver smart, sustainable, and future-ready infrastructure.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 text-left w-full mt-20">
          <div className="glass p-8 rounded-3xl flex-1 reveal-text transform hover:-translate-y-2 transition-transform duration-300">
            <span className="text-blue-500 text-sm font-bold tracking-widest uppercase mb-2 block">Our Foundation</span>
            <h3 className="text-2xl font-bold text-white mb-4">10+ Years of Mastery</h3>
            <p className="text-gray-400">Perfecting the art of integrated systems through rigorous compliance and ISO standards.</p>
          </div>

          <div className="glass p-8 rounded-3xl flex-1 reveal-text transform hover:-translate-y-2 transition-transform duration-300">
            <span className="text-purple-500 text-sm font-bold tracking-widest uppercase mb-2 block">Our Scale</span>
            <h3 className="text-2xl font-bold text-white mb-4">50+ Enterprise Clients</h3>
            <p className="text-gray-400">Trusted by Paradip Port, Orissa High Court, CSIR-IMMT, and Fortune 500 brands.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
