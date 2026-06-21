"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import SectionHeading from "./SectionHeading";

type PortfolioItem = {
  title: string;
  tag: string;
  src?: string; // undefined = coming soon
};

const ITEMS: PortfolioItem[] = [
  {
    title: "Classy Jewellery Ad",
    tag: "AI UGC Ad",
    src: "/videos/jewellery-ad-1.mp4",
  },
  {
    title: "For All Occasions",
    tag: "Festival Campaign",
    src: "/videos/jewellery-ad-2.mp4",
  },
  {
    title: "Light to Gold",
    tag: "Luxury Showcase",
    src: "/videos/jewellery-ad-3.mp4",
  },
  {
    title: "Traditional Ad",
    tag: "Product Showcase",
    src: "/videos/jewellery-ad-4.mp4",
  },
];

function VideoModal({
  item,
  onClose,
}: {
  item: PortfolioItem;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-plum-deep/90 p-4 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <motion.div
        initial={{ scale: 0.92, y: 24 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 24 }}
        transition={{ type: "spring", stiffness: 240, damping: 24 }}
        className="glass-strong relative w-full max-w-md overflow-hidden rounded-3xl luxury-shadow sm:max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close video"
          className="absolute right-3 top-3 z-10 rounded-full bg-plum-deep/70 p-2 text-white transition-colors hover:bg-electric"
        >
          <X size={18} />
        </button>
        <video
          src={item.src}
          controls
          autoPlay
          playsInline
          className="aspect-[9/16] w-full bg-black object-contain"
        />
        <div className="px-5 py-4">
          <p className="text-xs font-bold uppercase tracking-widest text-electric">
            {item.tag}
          </p>
          <h3 className="mt-1 font-display text-lg text-white">{item.title}</h3>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function PortfolioSection() {
  const [active, setActive] = useState<PortfolioItem | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <section id="portfolio" className="relative bg-plum py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Featured Portfolio"
          title="See What AI Can Create"
          subtitle="Premium advertisement examples created using AI."
        />

        <div className="perspective-1600 mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={
                item.src ? { scale: 1.04, z: 40, y: -8 } : undefined
              }
              className="preserve-3d"
            >
              {item.src ? (
                <button
                  onClick={() => setActive(item)}
                  className="glass glow-border group relative block w-full overflow-hidden rounded-2xl text-left luxury-shadow"
                  aria-label={`Play ${item.title}`}
                >
                  <div className="relative aspect-[9/16] overflow-hidden bg-plum-deep">
                    <video
                      src={`${item.src}#t=0.5`}
                      muted
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-plum-deep/90 via-transparent to-transparent" />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="rounded-full bg-white/15 p-5 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-electric/80">
                        <Play size={26} className="ml-0.5 text-white" fill="white" />
                      </span>
                    </span>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-electric">
                      {item.tag}
                    </p>
                    <h3 className="mt-1 text-sm font-bold text-white">
                      {item.title}
                    </h3>
                  </div>
                </button>
              ) : (
                <div className="glass relative block w-full overflow-hidden rounded-2xl opacity-70 luxury-shadow">
                  <div className="relative flex aspect-[9/16] items-center justify-center bg-gradient-to-br from-plum-light/60 to-plum-deep">
                    <div className="text-center">
                      <Hourglass size={30} className="mx-auto text-gold/70" />
                      <p className="mt-3 text-xs font-bold uppercase tracking-widest text-white/50">
                        Coming Soon
                      </p>
                    </div>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gold/80">
                      {item.tag}
                    </p>
                    <h3 className="mt-1 text-sm font-bold text-white/70">
                      {item.title}
                    </h3>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && <VideoModal item={active} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}
