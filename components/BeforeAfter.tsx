"use client";

import { useCallback, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";
import TiltCard from "./TiltCard";
import SectionHeading from "./SectionHeading";

/** The same ring artwork rendered in both halves — raw vs. cinematic. */
function RingArt({ luxury }: { luxury: boolean }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`h-40 w-40 sm:h-56 sm:w-56 ${
        luxury ? "drop-shadow-[0_0_28px_rgba(255,215,0,0.55)]" : ""
      }`}
      aria-hidden
    >
      <defs>
        <linearGradient id={`band-${luxury}`} x1="0" y1="0" x2="1" y2="1">
          {luxury ? (
            <>
              <stop offset="0%" stopColor="#fff3c4" />
              <stop offset="45%" stopColor="#ffd700" />
              <stop offset="100%" stopColor="#b8860b" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#c9b98a" />
              <stop offset="100%" stopColor="#8a7a4f" />
            </>
          )}
        </linearGradient>
        <linearGradient id={`gem-${luxury}`} x1="0" y1="0" x2="0" y2="1">
          {luxury ? (
            <>
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="55%" stopColor="#bfe0ff" />
              <stop offset="100%" stopColor="#1e88ff" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#e8e8e8" />
              <stop offset="100%" stopColor="#9aa4b0" />
            </>
          )}
        </linearGradient>
      </defs>
      <circle
        cx="100"
        cy="118"
        r="52"
        fill="none"
        stroke={`url(#band-${luxury})`}
        strokeWidth="14"
      />
      <polygon
        points="100,28 124,52 100,86 76,52"
        fill={`url(#gem-${luxury})`}
        stroke={luxury ? "#ffffff" : "#b8b8b8"}
        strokeWidth="1.5"
      />
      <polyline
        points="76,52 100,60 124,52"
        fill="none"
        stroke={luxury ? "#ffffff" : "#c5c5c5"}
        strokeWidth="1.5"
        opacity="0.8"
      />
      {luxury && (
        <>
          <circle cx="138" cy="40" r="2.5" fill="#fff" opacity="0.9" />
          <circle cx="62" cy="70" r="1.8" fill="#ffd700" opacity="0.9" />
          <circle cx="150" cy="140" r="2" fill="#ffd700" opacity="0.7" />
        </>
      )}
    </svg>
  );
}

export default function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50); // divider %, from left
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(96, Math.max(4, pct)));
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragging.current = true;
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      updateFromClientX(e.clientX);
    },
    [updateFromClientX]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (dragging.current) updateFromClientX(e.clientX);
    },
    [updateFromClientX]
  );

  const stopDrag = useCallback(() => {
    dragging.current = false;
  }, []);

  return (
    <section className="relative bg-plum-deep py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="The Transformation"
          title="From Product Image To Premium Advertisement"
          subtitle="Drag the divider to see how AI turns a plain product photo into a luxury campaign visual."
        />

        <div className="perspective-1600 mt-14">
          <TiltCard intensity={5} lift={10} glare={false}>
            <div
              ref={containerRef}
              className="glass relative h-[420px] cursor-ew-resize touch-none select-none overflow-hidden rounded-3xl luxury-shadow sm:h-[480px]"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={stopDrag}
              onPointerLeave={stopDrag}
              role="slider"
              aria-label="Before and after comparison"
              aria-valuenow={Math.round(pos)}
              aria-valuemin={0}
              aria-valuemax={100}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") setPos((p) => Math.max(4, p - 4));
                if (e.key === "ArrowRight") setPos((p) => Math.min(96, p + 4));
              }}
            >
              {/* BEFORE — raw product photo look */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#3a4150] to-[#272d38]">
                <RingArt luxury={false} />
                <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.3em] text-white/40">
                  Raw Product Image
                </p>
                <span className="absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/60">
                  Before
                </span>
              </div>

              {/* AFTER — luxury AI advertisement, clipped by divider */}
              <div
                className="absolute inset-0"
                style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center hero-aurora">
                  <div className="css-particles" />
                  <RingArt luxury />
                  <p className="mt-4 font-display text-2xl italic text-gradient-gold sm:text-3xl">
                    Eternal Radiance
                  </p>
                  <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.3em] text-white/70">
                    Luxury AI Advertisement
                  </p>
                  <span className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-electric to-violet px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white">
                    After — AIVERSE
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div
                className="absolute inset-y-0 z-10"
                style={{ left: `${pos}%` }}
              >
                <div className="absolute inset-y-0 -ml-px w-0.5 bg-white/80 shadow-[0_0_16px_rgba(30,136,255,0.9)]" />
                <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-electric to-violet p-3 shadow-[0_0_24px_rgba(30,136,255,0.8)]">
                  <MoveHorizontal size={18} className="text-white" />
                </div>
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
