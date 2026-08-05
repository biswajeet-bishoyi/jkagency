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
              start: "top 95%",
              end: "top 60%",
              scrub: 1,
            },
          }
        );
      });

      // Small static jump for boxes
      const boxes = gsap.utils.toArray<HTMLElement>(".pop-box");
      boxes.forEach((box, i) => {
        gsap.fromTo(
          box,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.15,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: box,
              start: "top 95%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen py-8 lg:py-20 bg-slate-50 dark:bg-black transition-colors duration-500 overflow-hidden flex flex-col items-center justify-center">
      
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

      <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center flex flex-col gap-12 lg:gap-24">
        
        {/* Intro text */}
        <div ref={textRef} className="perspective-1000">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-outfit font-bold text-slate-900 dark:text-white mb-6 reveal-text">
            Not just vendors. <br />
            <span className="text-slate-500 dark:text-gray-500">We are your integration partners.</span>
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-gray-400 font-light reveal-text">
            Founded in 2014, JK Agency has transformed how spaces operate. From complex government command centers to premium enterprise boardrooms, we deliver smart, sustainable, and future-ready infrastructure.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 lg:gap-12 text-left w-full mt-4">
          <div className="pop-box bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-lg dark:shadow-none p-6 lg:p-8 rounded-3xl flex-1 transform hover:-translate-y-2 transition-all duration-300">
            <span className="text-blue-500 text-sm font-bold tracking-widest uppercase mb-2 block">Our Foundation</span>
            <h3 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white mb-4">10+ Years of Mastery</h3>
            <p className="text-slate-600 dark:text-gray-400 font-light">Perfecting the art of integrated systems through rigorous compliance and ISO standards.</p>
          </div>

          <div className="pop-box bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-lg dark:shadow-none p-6 lg:p-8 rounded-3xl flex-1 transform hover:-translate-y-2 transition-all duration-300">
            <span className="text-purple-500 text-sm font-bold tracking-widest uppercase mb-2 block">Our Scale</span>
            <h3 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white mb-4">50+ Enterprise Clients</h3>
            <p className="text-slate-600 dark:text-gray-400 font-light">Trusted by Paradip Port, Orissa High Court, CSIR-IMMT, and Fortune 500 brands.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
