"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring, motion } from "framer-motion";

function Counter({ value, suffix = "", title }: { value: number; suffix?: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
    duration: 3000,
  });

  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplay(Math.floor(latest).toString());
    });
  }, [springValue]);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="text-6xl md:text-8xl font-outfit font-bold text-white mb-2 tracking-tighter">
        {display}<span className="text-blue-500">{suffix}</span>
      </div>
      <div className="text-gray-400 text-sm md:text-base uppercase tracking-widest font-semibold">{title}</div>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="relative py-32 bg-black border-y border-white/5 overflow-hidden">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 z-0 opacity-10" style={{
        backgroundImage: "linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)",
        backgroundSize: "40px 40px"
      }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          <Counter value={10} suffix="+" title="Years Since 2014" />
          <Counter value={9} suffix="+" title="Service Verticals" />
          <Counter value={100} suffix="%" title="Client Satisfaction" />
          <Counter value={50} suffix="+" title="Enterprise Projects" />
        </div>
      </div>
    </section>
  );
}
