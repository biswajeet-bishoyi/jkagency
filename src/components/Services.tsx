"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MonitorPlay, Thermometer, Zap, Sofa } from "lucide-react";

const services = [
  {
    id: "av",
    title: "Audio-Visual Systems",
    description: "Cutting-edge AV solutions for auditoriums, boardrooms, and command centers.",
    icon: <MonitorPlay className="w-12 h-12 text-blue-500" />,
    features: ["Active LED & Video Walls", "Conference Integration", "Smart Classrooms", "Premium Home Theatres"],
    color: "from-blue-500 to-blue-900",
  },
  {
    id: "hvac",
    title: "HVAC Solutions",
    description: "End-to-end climate control and air conditioning systems for commercial & industrial facilities.",
    icon: <Thermometer className="w-12 h-12 text-cyan-500" />,
    features: ["VRF/VRV System Installation", "Professional Ducting", "Cold Room Construction", "Energy Retrofitting"],
    color: "from-cyan-500 to-cyan-900",
  },
  {
    id: "electrical",
    title: "Electrical & Electronics",
    description: "Complete electrical infrastructure, backup power, and digital displays.",
    icon: <Zap className="w-12 h-12 text-purple-500" />,
    features: ["Electrical Installations", "Access Control Systems", "Diesel Generators", "Commercial Displays"],
    color: "from-purple-500 to-purple-900",
  },
  {
    id: "interior",
    title: "Interior & Furniture",
    description: "Premium fit-outs and modular furniture execution for commercial and hospitality sectors.",
    icon: <Sofa className="w-12 h-12 text-emerald-500" />,
    features: ["Civil Execution", "Modular Furniture", "Laundry Equipment", "Turnkey Fit-Outs"],
    color: "from-emerald-500 to-emerald-900",
  },
];

function ServiceCard({ service, index, progress }: { service: typeof services[0]; index: number; progress: any }) {
  const targetScale = 1 - (services.length - index) * 0.05;
  const scale = useTransform(progress, [index * 0.25, 1], [1, targetScale]);
  const opacity = useTransform(progress, [index * 0.25, 1], [1, 0.5]);

  return (
    <div className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        style={{ scale, opacity, top: `calc(10vh + ${index * 20}px)` }}
        className={`relative w-full max-w-5xl h-[70vh] rounded-3xl p-12 overflow-hidden flex flex-col md:flex-row items-center border border-white/10 bg-black/50 backdrop-blur-3xl shadow-2xl origin-top`}
      >
        {/* Animated Background Gradient */}
        <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${service.color} blur-3xl`} />

        <div className="relative z-10 flex-1 pr-12">
          <div className="mb-6">{service.icon}</div>
          <h2 className="text-4xl md:text-6xl font-outfit font-bold text-white mb-6 leading-tight">
            {service.title}
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-lg font-light leading-relaxed">
            {service.description}
          </p>
          <ul className="space-y-4">
            {service.features.map((feature, i) => (
              <li key={i} className="flex items-center text-gray-400 text-lg">
                <span className="w-2 h-2 bg-white/50 rounded-full mr-4" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative z-10 flex-1 h-full hidden md:flex items-center justify-center">
           <div className={`w-full h-full rounded-2xl bg-gradient-to-br ${service.color} opacity-10`} />
        </div>
      </motion.div>
    </div>
  );
}

export default function Services() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} className="relative bg-black pb-32">
      <div className="pt-32 pb-16 text-center">
        <h2 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-4">Our Expertise</h2>
        <h3 className="text-4xl md:text-5xl font-outfit font-bold">Integrated <span className="text-gradient">Capabilities</span></h3>
      </div>
      
      <div className="relative mt-12">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
