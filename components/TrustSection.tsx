"use client";

import { motion } from "framer-motion";
import {
  Clapperboard,
  Gem,
  PartyPopper,
  Megaphone,
  UserRound,
  Film,
} from "lucide-react";
import { InstagramIcon } from "./BrandIcons";
import TiltCard from "./TiltCard";
import SectionHeading from "./SectionHeading";

const ITEMS = [
  { icon: Clapperboard, label: "AI UGC Ads" },
  { icon: Film, label: "Product Showcase Videos" },
  { icon: PartyPopper, label: "Festival Campaigns" },
  { icon: InstagramIcon, label: "Instagram Reels" },
  { icon: Megaphone, label: "Meta Ad Creatives" },
  { icon: UserRound, label: "AI Model Photoshoots" },
  { icon: Gem, label: "Luxury Product Videos" },
];

export default function TrustSection() {
  return (
    <section className="relative bg-plum-deep py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="What We Deliver"
          title="Trusted AI Advertising Solutions For Modern Jewellery Brands"
        />

        <div className="mt-14 flex flex-wrap justify-center gap-5">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.07 }}
            >
              <TiltCard
                intensity={16}
                className="glass glow-border rounded-2xl px-7 py-6 luxury-shadow"
              >
                <div
                  className="flex items-center gap-3"
                  style={{ transform: "translateZ(20px)" }}
                >
                  <span className="rounded-lg bg-gradient-to-br from-electric/25 to-violet/25 p-2.5">
                    <item.icon size={20} className="text-electric" />
                  </span>
                  <span className="text-sm font-bold text-white/90">
                    {item.label}
                  </span>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
