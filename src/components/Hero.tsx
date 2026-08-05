"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
// @ts-expect-error - maath does not have type definitions
import * as random from "maath/random/dist/maath-random.esm";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

function ParticleField(props: any) {
  const ref = useRef<any>(null);
  const [sphere] = useState(() => random.inSphere(new Float32Array(15000), { radius: 1.5 }) as Float32Array);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#3b82f6"
          size={0.006}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.9}
        />
      </Points>
    </group>
  );
}

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-50 dark:bg-black transition-colors duration-500">
      {/* Precision Blueprint Grid Background */}
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-10" style={{
        backgroundImage: `
          linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px), 
          linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        backgroundPosition: "center center"
      }} />

      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-80 mix-blend-multiply dark:mix-blend-normal">
        <Canvas camera={{ position: [0, 0, 1.2] }}>
          <ParticleField />
        </Canvas>
      </div>

      {/* Deep Gradient Overlay to ensure text legibility */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(248,250,252,0)_0%,rgba(248,250,252,0.9)_80%,rgba(248,250,252,1)_100%)] dark:bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.9)_80%,rgba(0,0,0,1)_100%)] pointer-events-none transition-colors duration-500" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-50/20 via-transparent to-slate-50 dark:from-black/20 dark:to-black pointer-events-none transition-colors duration-500" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-start justify-center h-full mt-12 md:mt-0">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 px-4 py-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-md mb-12"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
          <span className="text-xs font-bold tracking-[0.2em] text-slate-700 dark:text-gray-300 uppercase">JK Agency // Integration</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl lg:text-[10rem] font-outfit font-black tracking-tighter leading-[0.9] mb-8 text-slate-900 dark:text-white"
        >
          Engineering <br />
          <span className="text-black dark:text-white">Excellence.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="max-w-2xl text-xl md:text-3xl text-slate-600 dark:text-gray-400 font-light leading-relaxed border-l-2 border-blue-500 pl-6"
        >
          Precision infrastructure solutions for enterprise and government. <br className="hidden md:block" />
          Built to exact specifications. Delivered with absolute impact.
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-6 md:left-auto md:right-12 flex items-center gap-4 text-gray-500"
      >
        <span className="text-xs uppercase tracking-widest font-bold">Initiate Sequence</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-blue-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
