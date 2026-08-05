"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function SlideTransition({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div ref={containerRef} data-slide="true" className="h-[100vh] w-full relative z-0">
      <motion.div 
        style={{ scale, opacity }}
        className="sticky top-0 h-[100vh] w-full overflow-hidden origin-top bg-slate-50 dark:bg-black transition-colors duration-500"
      >
        {children}
      </motion.div>
    </div>
  );
}
