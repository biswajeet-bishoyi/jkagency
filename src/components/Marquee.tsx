"use client";

import { motion } from "framer-motion";

const clients = [
  "Paradip Port Authority",
  "Orissa High Court",
  "CSIR-IMMT",
  "NALCO",
  "Fortune Park (ITC)",
  "Indian Oil",
  "NISER Odisha",
  "MBC TV",
  "ODM Public School",
  "MDRFM Bhubaneswar",
  "RCM College",
  "5T Schools Odisha"
];

export default function Marquee() {
  // Triple the array to ensure completely seamless looping
  const duplicatedClients = [...clients, ...clients, ...clients];

  return (
    <section className="py-24 bg-slate-50 dark:bg-black overflow-hidden relative border-y border-black/5 dark:border-white/5 transition-colors duration-500 flex flex-col justify-center h-full min-h-screen">
      <div className="container mx-auto px-6 text-center mb-16 relative z-10">
        <h2 className="text-sm font-bold tracking-widest uppercase text-blue-500 mb-4">Trusted By</h2>
        <h3 className="text-4xl md:text-5xl font-outfit font-bold text-slate-900 dark:text-white">Enterprise & <span className="text-gradient">Government.</span></h3>
      </div>

      <div className="relative flex flex-col gap-6 w-[110vw] -ml-[5vw]">
        {/* Top Row - Moves Left */}
        <div className="relative w-full overflow-hidden flex">
          <motion.div
            animate={{ x: [0, -1035] }} // Adjust based on total width of one set
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 30, // Slow, premium speed
            }}
            className="flex gap-6 whitespace-nowrap pl-6"
          >
            {duplicatedClients.map((client, index) => (
              <div 
                key={`top-${index}`} 
                className="flex items-center justify-center px-10 py-6 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl min-w-[250px] shadow-sm dark:shadow-none transition-colors duration-500 group hover:bg-black/5 dark:hover:bg-white/10 hover:-translate-y-1"
              >
                <span className="text-xl font-bold font-outfit text-slate-400 dark:text-gray-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">
                  {client}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Row - Moves Right */}
        <div className="relative w-full overflow-hidden flex">
          <motion.div
            animate={{ x: [-1035, 0] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 35, // Slightly different speed for parallax feel
            }}
            className="flex gap-6 whitespace-nowrap pr-6"
          >
            {duplicatedClients.reverse().map((client, index) => (
              <div 
                key={`bottom-${index}`} 
                className="flex items-center justify-center px-10 py-6 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl min-w-[250px] shadow-sm dark:shadow-none transition-colors duration-500 group hover:bg-black/5 dark:hover:bg-white/10 hover:-translate-y-1"
              >
                <span className="text-xl font-bold font-outfit text-slate-400 dark:text-gray-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">
                  {client}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Gradient Edges for seamless fade out */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-slate-50 dark:from-black to-transparent z-10 transition-colors duration-500" />
        <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-slate-50 dark:from-black to-transparent z-10 transition-colors duration-500" />
      </div>
    </section>
  );
}
