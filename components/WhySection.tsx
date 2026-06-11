"use client";

import { motion } from "framer-motion";
import {
  Timer,
  CameraOff,
  UserX,
  Infinity as InfinityIcon,
  Crown,
  Cpu,
  Wallet,
  Share2,
} from "lucide-react";
import TiltCard from "./TiltCard";
import SectionHeading from "./SectionHeading";

const REASONS = [
  { icon: Timer, label: "48 Hour Delivery" },
  { icon: CameraOff, label: "No Studio Shoots Required" },
  { icon: UserX, label: "No Models Required" },
  { icon: InfinityIcon, label: "Unlimited Creative Concepts" },
  { icon: Crown, label: "Luxury Cinematic Quality" },
  { icon: Cpu, label: "AI Powered Production" },
  { icon: Wallet, label: "Cost Effective" },
  { icon: Share2, label: "Built For Social Media" },
];

export default function WhySection() {
  return (
    <section className="relative bg-plum-deep py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="The AIVERSE Advantage"
          title="Why Jewellery Brands Choose AIVERSE"
        />

        <div className="perspective-1600 mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {REASONS.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <TiltCard
                intensity={14}
                className="glass glow-border h-full rounded-2xl p-6 text-center luxury-shadow"
              >
                <div
                  className="mx-auto mb-4 inline-flex rounded-xl bg-gradient-to-br from-gold/25 to-electric/20 p-3"
                  style={{ transform: "translateZ(22px)" }}
                >
                  <r.icon size={22} className="text-gold" />
                </div>
                <p className="text-sm font-bold text-white/90">{r.label}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
