"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Loader2, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", organization: "", message: "" });
      
      // Reset success state after a few seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error: any) {
      console.error(error);
      setStatus("error");
      setErrorMessage(error.message || "An unexpected error occurred.");
    }
  };

  return (
    <section className="h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-black relative overflow-hidden transition-colors duration-500">
      
      {/* Background abstract elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0%,transparent_70%)] pointer-events-none transition-colors duration-500" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15)_0%,transparent_70%)] pointer-events-none transition-colors duration-500" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-center">
          
          <div className="w-full md:w-1/2">
            <h2 className="text-5xl md:text-7xl font-outfit font-black text-slate-900 dark:text-white mb-6 leading-tight">
              Let's Build <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                The Future.
              </span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-gray-400 font-light mb-12">
              Ready to upgrade your infrastructure? Our engineering team is standing by to design your next mission-critical deployment.
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-all bg-white dark:bg-transparent">
                  <Mail className="w-5 h-5 text-slate-500 dark:text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-widest text-slate-500 dark:text-gray-500 font-bold mb-1">Email Us</span>
                  <span className="text-slate-900 dark:text-white font-medium text-lg">info@jkagency.in</span>
                </div>
              </div>

              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-all bg-white dark:bg-transparent">
                  <MapPin className="w-5 h-5 text-slate-500 dark:text-gray-400 group-hover:text-purple-500 transition-colors" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-widest text-slate-500 dark:text-gray-500 font-bold mb-1">Headquarters</span>
                  <span className="text-slate-900 dark:text-white font-medium text-lg">Bhubaneswar, Odisha</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-8 md:p-10 rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-md shadow-xl dark:shadow-none transition-colors duration-500">
              <h3 className="text-2xl font-bold font-outfit text-slate-900 dark:text-white mb-6">Initiate Contact</h3>
              
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-slate-500 dark:text-gray-500 font-bold ml-2">Name *</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-slate-500 dark:text-gray-500 font-bold ml-2">Email *</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-slate-500 dark:text-gray-500 font-bold ml-2">Message *</label>
                <textarea 
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:border-blue-500 transition-colors resize-none"
                />
              </div>

              {status === "error" && (
                <div className="text-red-500 text-sm font-medium mt-2">{errorMessage}</div>
              )}

              <button 
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="mt-4 w-full bg-slate-900 dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-800 dark:hover:bg-gray-200 transition-all group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <>
                    Transmitting...
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </>
                ) : status === "success" ? (
                  <>
                    Sent Successfully
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  </>
                ) : (
                  <>
                    Send Transmission
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
