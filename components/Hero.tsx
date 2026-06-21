"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  Check,
  Clapperboard,
  Gem,
  PartyPopper,
  PlayCircle,
  Sparkles,
  UserRound,
} from "lucide-react";
import TiltCard from "./TiltCard";
import { useCanRender3D, useWebGLAvailable, useIsMobile, useMounted } from "@/lib/hooks";

const HeroScene = dynamic(() => import("./three/HeroScene"), { ssr: false });

const TRUST_POINTS = [
  "48 Hour Delivery",
  "No Expensive Photoshoots",
  "Luxury Cinematic Quality",
  "AI Powered Production",
];

const FLOATING_CARDS = [
  {
    icon: Clapperboard,
    title: "AI UGC Video",
    desc: "Influencer-style ads, no influencer needed",
    delay: 0,
  },
  {
    icon: Gem,
    title: "Product Showcase",
    desc: "Cinematic close-ups with studio lighting",
    delay: 0.15,
  },
  {
    icon: UserRound,
    title: "AI Model Photoshoot",
    desc: "Photoreal models wearing your pieces",
    delay: 0.3,
  },
  {
    icon: PartyPopper,
    title: "Festival Campaign",
    desc: "Diwali, weddings & seasonal creatives",
    delay: 0.45,
  },
];

function HeroBackground() {
  const can3D = useCanRender3D();
  const webgl = useWebGLAvailable();
  const isMobile = useIsMobile();
  const mounted = useMounted();

  if (!mounted || can3D === null) {
    return <div className="absolute inset-0 hero-aurora" aria-hidden />;
  }

  if (can3D) {
    return (
      <>
        <div className="absolute inset-0 hero-aurora" aria-hidden />
        <HeroScene />
      </>
    );
  }

  // Desktop without WebGL: cinematic jewellery ad video under a dark overlay.
  if (!isMobile && webgl === false) {
    return (
      <div className="absolute inset-0" aria-hidden>
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          src="/videos/jewellery-ad-1.mp4"
        />
        <div className="absolute inset-0 bg-plum-deep/80" />
      </div>
    );
  }

  // Mobile / reduced motion: pure CSS luxury fallback.
  return (
    <div className="absolute inset-0 hero-aurora" aria-hidden>
      <div className="css-particles" />
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <HeroBackground />

      {/* Bottom fade into the next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-b from-transparent to-plum-deep" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-4 py-24 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-0">
        {/* ---- Left: messaging ---- */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white/90"
          >
            <Sparkles size={14} className="text-gold" />
            AI-Powered Jewellery Advertising
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 font-display text-4xl font-semibold leading-[1.08] sm:text-6xl lg:text-7xl"
            style={{ textShadow: "0 8px 40px rgba(3,11,28,0.8)" }}
          >
            Luxury Jewellery Ads{" "}
            <span className="text-gradient">Created With AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
          >
            Transform ordinary jewellery product images into premium cinematic
            advertisements, AI influencer videos, social media campaigns, and
            luxury brand content — in days instead of weeks.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#contact"
              className="rounded-full bg-gradient-to-r from-electric to-violet px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:scale-105 glow-electric sm:text-base"
            >
              Request Free Sample Ad
            </a>
            <a
              href="#portfolio"
              className="glass glow-border inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-white/90 transition-all duration-300 hover:scale-105 hover:text-white sm:text-base"
            >
              <PlayCircle size={18} />
              View Portfolio
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3"
          >
            {TRUST_POINTS.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2 text-xs font-semibold text-white/70 sm:text-sm"
              >
                <Check size={15} className="text-gold" strokeWidth={3} />
                {point}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* ---- Right: floating glass cards ---- */}
        <div className="perspective-1600 hidden gap-5 sm:grid sm:grid-cols-2 lg:grid">
          {FLOATING_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 60, rotateY: -18 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 0.9, delay: 0.5 + card.delay }}
              className={i % 2 === 1 ? "lg:translate-y-10" : ""}
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 6 + i * 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.6,
                }}
              >
                <TiltCard
                  intensity={14}
                  className="glass glow-border rounded-2xl p-6 luxury-shadow"
                >
                  <div
                    className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-electric/30 to-violet/30 p-3"
                    style={{ transform: "translateZ(24px)" }}
                  >
                    <card.icon size={24} className="text-electric" />
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {card.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/55">
                    {card.desc}
                  </p>
                </TiltCard>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
