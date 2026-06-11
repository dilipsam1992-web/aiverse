"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/** True only after mount — avoids SSR/client markup mismatches. */
export function useMounted() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

export function useIsMobile(breakpoint = 768) {
  return useMediaQuery(`(max-width: ${breakpoint - 1}px)`);
}

let webglCache: boolean | null = null;

function detectWebGL(): boolean {
  if (webglCache !== null) return webglCache;
  try {
    const canvas = document.createElement("canvas");
    webglCache = !!(
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
    );
  } catch {
    webglCache = false;
  }
  return webglCache;
}

/** null on the server / first paint, then a stable boolean. */
export function useWebGLAvailable(): boolean | null {
  const mounted = useMounted();
  return mounted ? detectWebGL() : null;
}

/**
 * Master gate for WebGL scenes: desktop + WebGL available + no reduced motion.
 * Returns null while undetermined (first paint) so callers can defer.
 */
export function useCanRender3D() {
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();
  const webgl = useWebGLAvailable();
  if (webgl === null) return null;
  return !isMobile && !reduced && webgl;
}

/** Deterministic PRNG (mulberry32) — render-safe randomness for particles. */
export function seededRandom(seed: number) {
  let a = seed >>> 0;
  return () => {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
