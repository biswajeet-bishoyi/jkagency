"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  { num: "01", title: "Site Profiling", description: "Rigorous topological and acoustical mapping of the deployment zone. We analyze ambient interference, structural load limits, and legacy system compatibility before laying a single cable." },
  { num: "02", title: "Systems Engineering", description: "Developing a unified schematic. We select enterprise-grade components from Crestron, Extron, and Biamp, ensuring they interlock flawlessly within a custom control logic framework." },
  { num: "03", title: "Precision Deployment", description: "Our certified integration teams execute the blueprint with zero tolerance for error. Mil-spec cable dressing, thermal management, and secure power sequencing are standard protocol." },
  { num: "04", title: "Optimization & Handover", description: "Extensive stress-testing and calibration. We tune the acoustics, align the video matrices, and train your personnel on the unified interface until the system feels invisible." }
];

export default function Process() {
  const containerRef = useRef(null);
  
  // Track scroll through the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Calculate the height of the SVG line drawing
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={containerRef} data-slide="true" className="py-20 bg-slate-50 dark:bg-black relative transition-colors duration-500">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-20 text-center md:text-left">
          <h2 className="text-sm font-bold tracking-widest uppercase text-purple-500 mb-4">Integration Architecture</h2>
          <h3 className="text-4xl md:text-6xl font-outfit font-bold text-slate-900 dark:text-white leading-tight">
            The Protocol for <br className="hidden md:block" /> <span className="text-slate-500 dark:text-gray-600">Absolute Precision.</span>
          </h3>
        </div>

        <div className="relative">
          
          {/* Circuit Trace Background (Dim) */}
          <div className="absolute top-0 bottom-0 left-6 md:left-12 w-1 -translate-x-1/2 bg-black/5 dark:bg-white/5 rounded-full" />

          {/* Circuit Trace Foreground (Animated) */}
          <motion.div 
            style={{ scaleY: pathLength }}
            className="absolute top-0 bottom-0 left-6 md:left-12 w-1 -translate-x-1/2 bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500 rounded-full origin-top"
          />

          <div className="space-y-24 pb-8">
            {steps.map((step, index) => (
              <ProcessStep key={step.num} step={step} index={index} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({ step, index, scrollYProgress }: { step: any, index: number, scrollYProgress: any }) {
  const stepStart = index * 0.25;
  const stepActive = useTransform(scrollYProgress, 
    [Math.max(0, stepStart - 0.2), stepStart + 0.05], 
    [0, 1]
  );
  
  const color = useTransform(scrollYProgress,
    [Math.max(0, stepStart - 0.2), stepStart + 0.05],
    ["rgba(100,116,139,0.2)", "rgba(168,85,247,1)"] // lights up purple
  );

  return (
    <div className="relative pl-16 md:pl-32">
      {/* Node Dot */}
      <motion.div 
        style={{ borderColor: color }}
        className="absolute left-6 md:left-12 top-8 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 z-10 bg-slate-50 dark:bg-black transition-colors duration-500"
      />
      
      {/* Glowing Node Dot (inner) */}
      <motion.div 
        style={{ opacity: stepActive }}
        className="absolute left-6 md:left-12 top-8 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-purple-500 z-20 shadow-[0_0_15px_rgba(168,85,247,0.8)]"
      />

      <motion.div
        style={{ opacity: stepActive, x: useTransform(stepActive, [0, 1], [-20, 0]) }}
      >
        <div className="text-7xl md:text-8xl font-outfit font-black text-black/[0.03] dark:text-white/[0.03] absolute -top-10 md:-top-12 left-8 md:left-16 pointer-events-none select-none transition-colors duration-500">
          {step.num}
        </div>
        
        <div className="relative z-10 bg-white dark:bg-white/5 p-6 md:p-8 rounded-2xl border border-black/5 dark:border-white/5 backdrop-blur-sm shadow-xl dark:shadow-none transition-colors duration-500">
          <span className="text-purple-500 font-bold uppercase tracking-widest text-xs mb-3 block">Phase {step.num}</span>
          <h4 className="text-2xl md:text-3xl font-outfit font-bold text-slate-900 dark:text-white mb-4">{step.title}</h4>
          <p className="text-slate-600 dark:text-gray-400 font-light leading-relaxed text-base md:text-lg">
            {step.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
