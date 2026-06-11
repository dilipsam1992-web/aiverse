"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Mail, Sparkles } from "lucide-react";
import { useCanRender3D } from "@/lib/hooks";

const ParticleField = dynamic(() => import("./three/ParticleField"), {
  ssr: false,
});

export default function FinalCTA() {
  const can3D = useCanRender3D();

  return (
    <section className="relative overflow-hidden bg-plum py-32">
      {/* Gold particle field — WebGL on desktop, CSS fallback otherwise */}
      {can3D ? (
        <ParticleField />
      ) : (
        <div className="css-particles" aria-hidden />
      )}
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-72 w-[720px] -translate-x-1/2 rounded-full bg-gradient-to-r from-electric/20 to-violet/20 blur-[100px]"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl"
        >
          Ready To Elevate Your{" "}
          <span className="text-gradient-gold animate-shimmer">
            Jewellery Brand?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mx-auto mt-6 max-w-2xl text-base text-white/65 sm:text-lg"
        >
          Create premium advertisements that attract attention, build trust,
          and increase sales.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-electric to-violet px-9 py-4 text-sm font-bold text-white transition-all duration-300 hover:scale-105 glow-electric sm:text-base"
          >
            <Sparkles size={18} />
            Request Free Sample Ad
          </a>
          <a
            href="mailto:aiverse.ai1105@gmail.com"
            className="glass glow-border inline-flex items-center gap-2 rounded-full px-9 py-4 text-sm font-bold text-white/90 transition-all duration-300 hover:scale-105 hover:text-white sm:text-base"
          >
            <Mail size={18} />
            Email Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
