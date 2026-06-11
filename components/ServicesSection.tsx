"use client";

import { motion } from "framer-motion";
import {
  Clapperboard,
  Gem,
  PartyPopper,
  UserRound,
  Megaphone,
} from "lucide-react";
import { InstagramIcon } from "./BrandIcons";
import TiltCard from "./TiltCard";
import SectionHeading from "./SectionHeading";

const SERVICES = [
  {
    icon: Clapperboard,
    title: "AI UGC Ads",
    desc: "Authentic influencer-style video ads created entirely with AI — real engagement without paying creators.",
  },
  {
    icon: Gem,
    title: "Luxury Product Showcase Videos",
    desc: "Cinematic close-ups with studio lighting, reflections and macro detail that make every stone shine.",
  },
  {
    icon: PartyPopper,
    title: "Festival Campaign Creatives",
    desc: "Diwali, Akshaya Tritiya, wedding season — timely campaign visuals ready before the rush.",
  },
  {
    icon: UserRound,
    title: "AI Model Photoshoots",
    desc: "Photorealistic AI models wearing your pieces — every skin tone, every style, zero booking fees.",
  },
  {
    icon: InstagramIcon,
    title: "Instagram Reels Packages",
    desc: "Scroll-stopping vertical video packages designed for discovery, saves and shares.",
  },
  {
    icon: Megaphone,
    title: "Meta & Social Media Ad Creatives",
    desc: "Conversion-tested static and video creatives sized and optimized for every placement.",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative bg-plum py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="What We Do"
          title="AI Advertising Services"
          subtitle="A full creative department for your jewellery brand — powered by AI, directed by humans."
        />

        <div className="perspective-1600 mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.12 }}
            >
              <TiltCard
                intensity={12}
                className="glass glow-border h-full rounded-3xl p-8 luxury-shadow"
              >
                {/* Icon floats forward on its own Z-layer */}
                <div
                  className="mb-6 inline-flex rounded-2xl bg-gradient-to-br from-electric/30 to-violet/30 p-4"
                  style={{ transform: "translateZ(28px)" }}
                >
                  <s.icon size={28} className="text-electric" />
                </div>
                <h3
                  className="font-display text-xl font-semibold text-white"
                  style={{ transform: "translateZ(16px)" }}
                >
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {s.desc}
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
