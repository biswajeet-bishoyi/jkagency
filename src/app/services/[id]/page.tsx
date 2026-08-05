"use client";

import { useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { MonitorPlay, Thermometer, Zap, Sofa, ArrowLeft } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

gsap.registerPlugin(ScrollTrigger);

// Note: In a real app this data should be fetched from a CMS or an API.
const servicesData: Record<string, any> = {
  av: {
    title: "Audio-Visual Systems",
    description: "Command center video walls, interactive boardrooms, and immersive audio distribution built for mission-critical reliability.",
    icon: MonitorPlay,
    features: ["Active LED Video Walls", "Enterprise Video Conferencing", "Dolby Atmos Home Theatres", "PA & BGM Systems"],
    color: "blue",
    projects: ["Orissa High Court", "CSIR-IMMT", "MBC TV", "Paradip Port"]
  },
  hvac: {
    title: "HVAC Solutions",
    description: "Industrial-grade VRF/VRV systems, precision ducting, and thermal regulation for large-scale enterprise environments.",
    icon: Thermometer,
    features: ["VRF/VRV Multi-zone Systems", "Industrial Ventilation", "Cold Room Installation", "Energy Auditing & Retrofitting"],
    color: "cyan",
    projects: ["NALCO", "Fortune Park ITC", "IIT Mumbai", "MCL Talcher"]
  },
  electrical: {
    title: "Electrical Infrastructure",
    description: "Robust power distribution, high-capacity backup generation, and seamless integrated electronics.",
    icon: Zap,
    features: ["Power Distribution Systems", "CCTV & IP Surveillance", "Fire Detection & Alarm", "Access Control Biometrics"],
    color: "purple",
    projects: ["Gopalpur Port", "KIIT University", "East Coast Railway", "Odisha Secretariat"]
  },
  interior: {
    title: "Interior Execution",
    description: "Precision architectural fit-outs and modular furniture designed to withstand high-traffic commercial use.",
    icon: Sofa,
    features: ["Acoustic Treatment", "Modular Office Workstations", "Auditorium Seating", "False Ceiling & Partitioning"],
    color: "emerald",
    projects: ["Tech Mahindra", "Infosys", "Reserve Bank of India", "SBI Regional Hub"]
  }
};

export default function ServicePage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const service = servicesData[id];

  useEffect(() => {
    if (!service) {
      router.push("/");
    }
  }, [service, router]);

  if (!service) return null;

  const Icon = service.icon;

  // Tailwind needs static class references to not purge them
  const colorStyles: Record<string, { bg: string; border: string; text: string; bullet: string }> = {
    blue: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      text: "text-blue-600 dark:text-blue-400",
      bullet: "bg-blue-500"
    },
    cyan: {
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
      text: "text-cyan-600 dark:text-cyan-400",
      bullet: "bg-cyan-500"
    },
    purple: {
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      text: "text-purple-600 dark:text-purple-400",
      bullet: "bg-purple-500"
    },
    emerald: {
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      text: "text-emerald-600 dark:text-emerald-400",
      bullet: "bg-emerald-500"
    }
  };

  const currentColors = colorStyles[service.color] || colorStyles.blue;

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50 dark:bg-black transition-colors duration-500 overflow-hidden">
      
      {/* Navigation Bar for inner page */}
      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference text-white">
        <Link href="/" className="flex items-center gap-2 group text-sm font-bold uppercase tracking-widest cursor-pointer">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        <ThemeToggle />
      </nav>

      {/* Hero Section */}
      <motion.section style={{ y, opacity }} className="relative h-[80vh] flex flex-col justify-center items-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={cn("p-6 rounded-3xl border mb-8", currentColors.bg, currentColors.border, currentColors.text)}
        >
          <Icon className="w-16 h-16" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl md:text-7xl font-outfit font-black text-slate-900 dark:text-white mb-6"
        >
          {service.title}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl md:text-2xl text-slate-600 dark:text-gray-400 font-light max-w-2xl"
        >
          {service.description}
        </motion.p>
      </motion.section>

      {/* Content Section */}
      <section className="relative z-10 bg-white dark:bg-black border-t border-black/5 dark:border-white/5 py-24 px-6 rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_-20px_40px_rgba(255,255,255,0.02)] transition-colors duration-500">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row gap-16">
          
          <div className="flex-1">
            <h2 className="text-3xl font-outfit font-bold text-slate-900 dark:text-white mb-8">Key Capabilities</h2>
            <div className="space-y-4">
              {service.features.map((feature: string, i: number) => (
                <div key={i} className="p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center gap-4">
                  <div className={cn("w-3 h-3 rounded-full shrink-0", currentColors.bullet)} />
                  <span className="text-lg text-slate-700 dark:text-gray-200 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-outfit font-bold text-slate-900 dark:text-white mb-8">Featured Projects</h2>
            <div className="grid grid-cols-1 gap-4">
              {service.projects.map((project: string, i: number) => (
                <div key={i} className="p-6 rounded-2xl bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white font-outfit font-bold">
                  {project}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
