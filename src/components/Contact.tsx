"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  return (
    <footer className="relative bg-black pt-32 pb-16 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-16 mb-24">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-outfit font-bold text-white mb-8 leading-tight">
              Let's engineer <br />
              <span className="text-gradient">the future.</span>
            </h2>
            <a 
              href="mailto:jk.agency.bbsr@gmail.com"
              className="inline-flex items-center gap-4 text-2xl font-bold hover:text-blue-400 transition-colors group"
            >
              Get in touch
              <span className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                <ArrowRight className="w-6 h-6" />
              </span>
            </a>
          </div>

          <div className="flex flex-col gap-6 text-gray-400 font-light">
            <a href="mailto:jk.agency.bbsr@gmail.com" className="flex items-center gap-4 hover:text-white transition-colors">
              <Mail className="w-5 h-5 text-blue-500" /> jk.agency.bbsr@gmail.com
            </a>
            <a href="tel:+916370701410" className="flex items-center gap-4 hover:text-white transition-colors">
              <Phone className="w-5 h-5 text-blue-500" /> +91 63707 01410
            </a>
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-blue-500 shrink-0" />
              <span>Plot A/5, Kalimandir Road,<br/>Satyanagar, Bhubaneswar - 751007</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} JK Agency. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
