"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  { num: "01", title: "Consultation & Audit", desc: "Understanding your infrastructure needs, constraints, and operational goals." },
  { num: "02", title: "Engineering & Design", desc: "Crafting a scalable blueprint with precise technical specifications." },
  { num: "03", title: "Execution & Integration", desc: "Deploying the systems with zero downtime and strict ISO compliance." },
  { num: "04", title: "Maintenance & AMC", desc: "Ensuring long-term reliability through proactive monitoring and support." },
];

export default function Process() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section ref={containerRef} className="py-32 bg-black relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-24">
          <h2 className="text-sm font-bold tracking-widest uppercase text-purple-500 mb-4">Our Process</h2>
          <h3 className="text-4xl md:text-5xl font-outfit font-bold">The Integration <span className="text-gradient">Workflow</span></h3>
        </div>

        <div className="relative border-l border-white/10 ml-4 md:ml-0 md:pl-12 space-y-24">
          {steps.map((step, index) => (
            <div key={step.num} className="relative pl-12 md:pl-0 group">
              <div className="absolute left-[-50px] md:left-[-56px] top-0 w-6 h-6 rounded-full bg-black border-2 border-white/20 group-hover:border-purple-500 group-hover:bg-purple-500/20 transition-colors duration-500" />
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-6xl font-outfit font-black text-white/5 mb-4">{step.num}</div>
                <h4 className="text-2xl font-bold text-white mb-2">{step.title}</h4>
                <p className="text-gray-400 font-light text-lg">{step.desc}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
