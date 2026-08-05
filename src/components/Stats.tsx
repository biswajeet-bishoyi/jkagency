"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion, animate } from "framer-motion";
import { Calendar, Layers, CheckCircle2, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

function CounterCard({ 
  value, 
  suffix = "", 
  title, 
  icon: Icon,
  delay
}: { 
  value: number; 
  suffix?: string; 
  title: string;
  icon: any;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, {
        duration: 1.5,
        delay: delay,
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplay(Math.floor(latest));
        },
      });
      return controls.stop;
    }
  }, [inView, value, delay]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.6, delay: delay }}
      className="relative flex flex-col items-start pr-6 lg:pr-10 border-r border-[#78a0b4]/15 last:border-0 last:pr-0 pb-6 md:pb-0 border-b md:border-b-0"
    >
      <div className="relative z-10 w-10 h-10 flex items-center justify-center border border-[#78a0b4]/35 rounded-full text-[#3ddab4] mb-6 bg-[#0e1216] dark:bg-[#0e1216] bg-white">
        <Icon className="w-[18px] h-[18px]" strokeWidth={1.6} />
      </div>
      
      <div className="text-[2.4rem] md:text-[3.4rem] leading-none font-sans font-bold text-slate-900 dark:text-[#eef2f2] flex items-baseline gap-[2px] tracking-tight">
        {display}<span className="text-[#4f8cff] font-bold">{suffix}</span>
      </div>
      
      {/* Animated Underline */}
      <motion.div 
        initial={{ width: 0 }}
        animate={inView ? { width: 36 } : { width: 0 }}
        transition={{ duration: 1, delay: delay + 0.3, ease: "easeOut" }}
        className="h-[2px] bg-[#3ddab4] mt-3 mb-4"
      />
      
      <div className="text-[0.78rem] tracking-[0.08em] text-slate-500 dark:text-[#8f9ea3] uppercase font-mono">
        {title}
      </div>
    </motion.div>
  );
}

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="relative min-h-screen py-20 flex items-center bg-slate-50 dark:bg-[#0a0d10] border-y border-black/5 dark:border-white/5 overflow-hidden transition-colors duration-500 font-sans">
      
      {/* Grid Background with Radial Mask */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-50 transition-opacity duration-500"
        style={{
          backgroundImage: "linear-gradient(rgba(120,160,180,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(120,160,180,0.14) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 90%)",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 90%)"
        }} 
      />

      <div className="container mx-auto px-6 relative z-10 w-full max-w-[1180px]">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="font-mono text-[0.78rem] tracking-[0.2em] text-[#3ddab4] uppercase mb-2 before:content-['//_'] before:opacity-60">
            By the numbers
          </div>
          <h2 className="text-[1.5rem] md:text-[2.1rem] font-semibold text-slate-900 dark:text-[#eef2f2] mt-2">
            A decade of precision integration
          </h2>
        </div>

        {/* Track Line & Fill */}
        <div className="relative pt-0 hidden md:block">
          <div className="absolute top-[20px] left-0 right-0 h-[1px] bg-black/10 dark:bg-[#78a0b4]/15 z-0" />
          <motion.div 
            initial={{ width: "0%" }}
            animate={inView ? { width: "100%" } : { width: "0%" }}
            transition={{ duration: 1.6, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute top-[20px] left-0 h-[1px] bg-blue-500 dark:bg-[#3ddab4] z-0 shadow-[0_0_10px_rgba(59,130,246,0.8)] dark:shadow-[0_0_10px_#3ddab4]"
          />

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 relative z-10">
            <CounterCard value={10} suffix="+" title="Years since 2014" icon={Calendar} delay={0} />
            <CounterCard value={9} suffix="" title="Service verticals" icon={Layers} delay={0.15} />
            <CounterCard value={100} suffix="%" title="Client satisfaction" icon={CheckCircle2} delay={0.3} />
            <CounterCard value={200} suffix="+" title="Enterprise projects" icon={Building2} delay={0.45} />
          </div>
        </div>

        {/* Mobile Stats Grid (Without track line) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 relative z-10 md:hidden">
          <CounterCard value={10} suffix="+" title="Years since 2014" icon={Calendar} delay={0} />
          <CounterCard value={9} suffix="" title="Service verticals" icon={Layers} delay={0.15} />
          <CounterCard value={100} suffix="%" title="Client satisfaction" icon={CheckCircle2} delay={0.3} />
          <CounterCard value={200} suffix="+" title="Enterprise projects" icon={Building2} delay={0.45} />
        </div>

      </div>
    </section>
  );
}
