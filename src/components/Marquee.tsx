"use client";

import { motion } from "framer-motion";

const clients = [
  "Paradip Port Authority", "Orissa High Court", "CSIR-IMMT", 
  "NALCO", "NTPC", "ODM Public School", 
  "Fortune Park (ITC)", "Indian Oil", "MCL Talcher"
];

export default function Marquee() {
  // Duplicate array for infinite loop effect
  const marqueeItems = [...clients, ...clients, ...clients];

  return (
    <section className="py-24 bg-black overflow-hidden border-y border-white/5">
      <div className="container mx-auto px-6 text-center mb-12">
        <h3 className="text-sm font-bold tracking-widest uppercase text-gray-500">Trusted Partners & Clients</h3>
      </div>
      
      <div className="relative flex whitespace-nowrap overflow-hidden group">
        <motion.div
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30, // Adjust speed
          }}
          className="flex gap-16 md:gap-32 px-8"
        >
          {marqueeItems.map((client, idx) => (
            <div 
              key={idx} 
              className="text-2xl md:text-4xl font-outfit font-bold text-gray-700 hover:text-white transition-colors duration-300 cursor-default"
            >
              {client}
            </div>
          ))}
        </motion.div>

        {/* Gradient fades for edges */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
