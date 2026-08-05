"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MonitorPlay, Thermometer, Zap, Sofa, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const services = [
  {
    id: "av",
    title: "Audio-Visual Systems",
    short: "AV Integration",
    description: "Command center video walls, interactive boardrooms, and immersive audio distribution built for mission-critical reliability.",
    icon: MonitorPlay,
    color: "bg-blue-500",
    gradient: "from-blue-500/20 to-blue-900/20",
    vignette: (
      <svg viewBox="0 0 100 100" className="w-full h-full stroke-blue-500 stroke-[2] fill-none">
        <motion.path 
          d="M 20 50 L 40 50 L 50 20 L 60 80 L 70 50 L 80 50" 
          initial={{ pathLength: 0 }} 
          animate={{ pathLength: 1 }} 
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }} 
        />
        <rect x="10" y="20" width="80" height="60" rx="4" className="stroke-blue-500/30" />
      </svg>
    )
  },
  {
    id: "hvac",
    title: "HVAC Solutions",
    short: "Climate Control",
    description: "Industrial-grade VRF/VRV systems, precision ducting, and thermal regulation for large-scale enterprise environments.",
    icon: Thermometer,
    color: "bg-cyan-500",
    gradient: "from-cyan-500/20 to-cyan-900/20",
    vignette: (
      <svg viewBox="0 0 100 100" className="w-full h-full stroke-cyan-500 stroke-[3] fill-none" strokeLinecap="round" strokeLinejoin="round">
        {/* Top Breeze Line */}
        <motion.path 
          d="M 10 35 Q 30 15 50 35 T 90 35" 
          initial={{ pathLength: 0, opacity: 0 }} 
          animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }} 
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} 
        />
        {/* Middle Breeze Line */}
        <motion.path 
          d="M 20 55 Q 40 35 60 55 T 100 55" 
          initial={{ pathLength: 0, opacity: 0 }} 
          animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }} 
          transition={{ duration: 2.2, delay: 0.4, repeat: Infinity, ease: "easeInOut" }} 
          className="stroke-cyan-400/80"
        />
        {/* Bottom Breeze Line */}
        <motion.path 
          d="M 5 75 Q 25 55 45 75 T 85 75" 
          initial={{ pathLength: 0, opacity: 0 }} 
          animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }} 
          transition={{ duration: 1.8, delay: 0.8, repeat: Infinity, ease: "easeInOut" }} 
          className="stroke-cyan-300/60"
        />
      </svg>
    )
  },
  {
    id: "electrical",
    title: "Electrical Infrastructure",
    short: "Power Systems",
    description: "Robust power distribution, high-capacity backup generation, and seamless integrated electronics.",
    icon: Zap,
    color: "bg-purple-500",
    gradient: "from-purple-500/20 to-purple-900/20",
    vignette: (
      <svg viewBox="0 0 100 100" className="w-full h-full stroke-purple-500 stroke-[2] fill-none">
        <motion.path 
          d="M 50 10 L 30 50 L 55 50 L 50 90 L 70 45 L 45 45 Z" 
          initial={{ pathLength: 0, fill: "rgba(168,85,247,0)" }} 
          animate={{ pathLength: 1, fill: "rgba(168,85,247,0.2)" }} 
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }} 
        />
      </svg>
    )
  },
  {
    id: "interior",
    title: "Interior Execution",
    short: "Space Fit-Outs",
    description: "Precision architectural fit-outs and modular furniture designed to withstand high-traffic commercial use.",
    icon: Sofa,
    color: "bg-emerald-500",
    gradient: "from-emerald-500/20 to-emerald-900/20",
    vignette: (
      <svg viewBox="0 0 100 100" className="w-full h-full stroke-emerald-500 stroke-[2] fill-none">
        <motion.rect x="20" y="20" width="60" height="60" rx="2"
          initial={{ strokeDasharray: "0 240" }}
          animate={{ strokeDasharray: "240 0" }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <line x1="20" y1="50" x2="80" y2="50" className="stroke-emerald-500/30" />
        <line x1="50" y1="20" x2="50" y2="80" className="stroke-emerald-500/30" />
      </svg>
    )
  },
];

export default function Services() {
  const [activeId, setActiveId] = useState<string>("av");

  return (
    <section className="h-screen w-full flex flex-col justify-center bg-slate-50 dark:bg-black relative py-8 transition-colors duration-500">
      <div className="container mx-auto px-6 mb-8 text-center">
        <h2 className="text-sm font-bold tracking-widest uppercase text-slate-500 dark:text-gray-500 mb-4">Core Competencies</h2>
        <h3 className="text-4xl md:text-5xl font-outfit font-bold text-slate-900 dark:text-white">Infrastructure <span className="text-gradient">Engineered.</span></h3>
      </div>

      <div className="container mx-auto px-6 h-[60vh] min-h-[400px]">
        <div className="flex flex-col md:flex-row gap-4 h-full w-full">
          {services.map((service) => {
            const isActive = activeId === service.id;
            const Icon = service.icon;

            return (
              <motion.div
                key={service.id}
                layout
                onClick={() => setActiveId(service.id)}
                onHoverStart={() => setActiveId(service.id)}
                className={cn(
                  "relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-in-out border border-black/5 dark:border-white/5",
                  isActive ? "md:flex-[3] flex-[3] bg-black/5 dark:bg-white/5" : "md:flex-[1] flex-[1] bg-white dark:bg-black hover:bg-black/5 dark:hover:bg-white/[0.02]"
                )}
              >
                {/* Background Gradient when active */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={cn("absolute inset-0 bg-gradient-to-br opacity-20 dark:opacity-50", service.gradient)}
                    />
                  )}
                </AnimatePresence>

                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-10">
                  <div className="flex items-center gap-4">
                    <div className={cn("p-3 rounded-2xl border backdrop-blur-md", isActive ? "bg-white/50 dark:bg-black/50 border-black/10 dark:border-white/10" : "opacity-70 border-transparent")}>
                      <Icon className={cn("w-6 h-6", isActive ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-gray-400")} />
                    </div>
                    {/* Only show short title when collapsed on desktop, or always show if space permits */}
                    <h4 className={cn("font-outfit font-bold whitespace-nowrap transition-colors", isActive ? "text-xl text-slate-900 dark:text-white" : "text-lg text-slate-500 dark:text-gray-500 md:hidden xl:block")}>
                      {isActive ? service.title : service.short}
                    </h4>
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col md:flex-row gap-8 items-end justify-between"
                      >
                        <div className="max-w-md">
                          <p className="text-slate-600 dark:text-gray-300 font-light text-lg mb-6 leading-relaxed">
                            {service.description}
                          </p>
                          <Link href={`/services/${service.id}`} className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white group cursor-pointer hover:text-blue-500 transition-colors">
                            Explore Capability 
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>

                        {/* Visual Vignette */}
                        <div className="w-32 h-32 hidden lg:block shrink-0 opacity-80 mix-blend-multiply dark:mix-blend-screen">
                          {service.vignette}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
