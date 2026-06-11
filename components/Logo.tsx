type LogoProps = {
  className?: string;
  withWordmark?: boolean;
};

/** AIVERSE mark — gradient "A" with swoosh and digital pixel accents. */
export default function Logo({ className = "h-9", withWordmark = true }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="h-full w-auto"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="aiv-a" x1="20%" y1="100%" x2="85%" y2="0%">
            <stop offset="0%" stopColor="#0b1f5e" />
            <stop offset="45%" stopColor="#1e88ff" />
            <stop offset="100%" stopColor="#7b3ff2" />
          </linearGradient>
          <linearGradient id="aiv-swoosh" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e88ff" />
            <stop offset="100%" stopColor="#7b3ff2" />
          </linearGradient>
        </defs>
        {/* Letter A */}
        <path
          d="M50 8 L83 92 L68 92 L50 40 L32 92 L17 92 Z"
          fill="url(#aiv-a)"
        />
        {/* Crossbar swoosh */}
        <path
          d="M24 70 C 40 64, 58 66, 78 46 C 64 58, 46 56, 28 62 Z"
          fill="url(#aiv-swoosh)"
          opacity="0.95"
        />
        {/* Pixel accents */}
        <rect x="80" y="22" width="9" height="9" rx="1.5" fill="#1e88ff" />
        <rect x="91" y="12" width="6" height="6" rx="1.2" fill="#7b3ff2" />
        <rect x="88" y="32" width="5" height="5" rx="1" fill="#1e88ff" opacity="0.8" />
      </svg>
      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span className="text-lg font-extrabold tracking-[0.18em] text-white">
            AIVERSE<span className="text-gradient">.AI</span>
          </span>
          <span className="mt-1 text-[8px] font-medium uppercase tracking-[0.32em] text-white/50">
            AI Solutions. Real Impact.
          </span>
        </span>
      )}
    </span>
  );
}
