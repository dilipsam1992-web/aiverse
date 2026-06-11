"use client";

import {
  useRef,
  useCallback,
  type ReactNode,
  type PointerEvent,
  type CSSProperties,
} from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Max tilt angle in degrees. Automatically reduced on coarse pointers. */
  intensity?: number;
  /** Z-lift in px applied while hovered. */
  lift?: number;
  /** Permanent base rotateX in degrees (e.g. the lead-form panel). */
  baseRotateX?: number;
  glare?: boolean;
  style?: CSSProperties;
};

/**
 * Mousemove-driven 3D tilt — cards feel like physical objects being picked up.
 * Pure CSS transforms (perspective + rotateX/rotateY + translateZ), no rAF loop:
 * writes happen only on pointer events, with a spring-out transition on leave.
 */
export default function TiltCard({
  children,
  className = "",
  intensity = 12,
  lift = 24,
  baseRotateX = 0,
  glare = true,
  style,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const setTransform = useCallback(
    (rx: number, ry: number, z: number, instant: boolean) => {
      const el = ref.current;
      if (!el) return;
      el.style.transition = instant
        ? "transform 0.08s ease-out"
        : "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
      el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(${z}px)`;
    },
    []
  );

  const onPointerMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduced) return;
      const max = coarse ? intensity * 0.4 : intensity;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      setTransform(
        baseRotateX + -py * max,
        px * max,
        coarse ? lift * 0.4 : lift,
        true
      );
      if (glareRef.current) {
        glareRef.current.style.opacity = "1";
        glareRef.current.style.background = `radial-gradient(circle at ${
          (px + 0.5) * 100
        }% ${(py + 0.5) * 100}%, rgba(255,255,255,0.14), transparent 55%)`;
      }
    },
    [intensity, lift, baseRotateX, setTransform]
  );

  const onPointerLeave = useCallback(() => {
    setTransform(baseRotateX, 0, 0, false);
    if (glareRef.current) glareRef.current.style.opacity = "0";
  }, [baseRotateX, setTransform]);

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={`relative preserve-3d will-change-transform ${className}`}
      style={{
        transform: baseRotateX
          ? `perspective(1000px) rotateX(${baseRotateX}deg)`
          : undefined,
        ...style,
      }}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500"
        />
      )}
    </div>
  );
}
