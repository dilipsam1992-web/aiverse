"use client";

import { motion } from "framer-motion";
import { XCircle, CheckCircle2, TrendingUp } from "lucide-react";
import TiltCard from "./TiltCard";
import SectionHeading from "./SectionHeading";

const TRADITIONAL = [
  "Expensive Shoots",
  "Models Required",
  "Long Production Cycles",
  "Higher Costs",
];

const AIVERSE = [
  "Faster Production",
  "Lower Cost",
  "Unlimited Variations",
  "Consistent Branding",
  "Scalable Content Creation",
];

export default function ResultsSection() {
  return (
    <section className="relative bg-plum-deep py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="The Shift"
          title="Why Businesses Are Switching To AI Advertising"
        />

        <div className="perspective-1600 mt-14 grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          {/* Traditional — recedes */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
          >
            <TiltCard
              intensity={6}
              lift={8}
              className="rounded-3xl border border-white/10 bg-plum-light/30 p-8 opacity-80 sm:p-10"
            >
              <h3 className="font-display text-2xl text-white/70">
                Traditional Advertising
              </h3>
              <ul className="mt-6 space-y-4">
                {TRADITIONAL.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-white/50"
                  >
                    <XCircle size={18} className="shrink-0 text-red-400/70" />
                    {item}
                  </li>
                ))}
              </ul>
            </TiltCard>
          </motion.div>

          {/* AIVERSE — dominant, tilts forward */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <TiltCard
              intensity={14}
              lift={40}
              baseRotateX={-2}
              className="glass-strong glow-border rounded-3xl p-8 luxury-shadow glow-electric sm:p-10"
            >
              <div
                className="flex items-center gap-3"
                style={{ transform: "translateZ(24px)" }}
              >
                <span className="rounded-xl bg-gradient-to-br from-electric to-violet p-2.5">
                  <TrendingUp size={20} className="text-white" />
                </span>
                <h3 className="font-display text-2xl text-white">
                  AIVERSE Advertising
                </h3>
              </div>
              <ul className="mt-6 space-y-4">
                {AIVERSE.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm font-semibold text-white/90"
                  >
                    <CheckCircle2 size={18} className="shrink-0 text-gold" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="mt-8 inline-block rounded-full bg-gradient-to-r from-electric to-violet px-6 py-3 text-sm font-bold text-white transition-transform duration-300 hover:scale-105"
                style={{ transform: "translateZ(20px)" }}
              >
                Make The Switch
              </a>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
