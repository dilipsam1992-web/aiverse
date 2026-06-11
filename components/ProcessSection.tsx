"use client";

import { motion } from "framer-motion";
import { Upload, Lightbulb, Wand2, PackageCheck } from "lucide-react";
import SectionHeading from "./SectionHeading";

const STEPS = [
  {
    icon: Upload,
    title: "Send Product Images",
    desc: "Share simple photos of your jewellery — phone shots are perfectly fine.",
  },
  {
    icon: Lightbulb,
    title: "We Create Ad Concepts",
    desc: "Our creative team designs campaign concepts tailored to your brand.",
  },
  {
    icon: Wand2,
    title: "AI Production & Editing",
    desc: "AI generates cinematic visuals, models and videos — refined by editors.",
  },
  {
    icon: PackageCheck,
    title: "Receive Ready-To-Publish Ads",
    desc: "Final ads delivered in every format, ready for Instagram, Meta & more.",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="relative overflow-hidden bg-plum py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="The Process"
          title="How It Works"
          subtitle="From product photo to published advertisement in four simple steps."
        />

        <div className="perspective-1600 relative mt-16">
          {/* Horizontal track */}
          <div className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-gradient-to-r from-electric/0 via-electric/60 to-violet/0 lg:block" />

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, rotateY: 90 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="preserve-3d relative text-center"
              >
                {/* 3D step node */}
                <div className="relative z-10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-electric to-violet luxury-shadow glow-electric">
                  <step.icon size={26} className="text-white" />
                  <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-gold text-xs font-extrabold text-plum-deep">
                    {i + 1}
                  </span>
                </div>
                <div className="glass rounded-2xl px-6 py-6 luxury-shadow">
                  <h3 className="text-base font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/55">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
