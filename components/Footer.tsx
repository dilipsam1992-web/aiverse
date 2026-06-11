import { Mail } from "lucide-react";
import { LinkedinIcon, InstagramIcon, YoutubeIcon } from "./BrandIcons";
import Logo from "./Logo";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#contact", label: "Contact" },
];

const SOCIALS = [
  { icon: LinkedinIcon, label: "LinkedIn", href: "https://www.linkedin.com" },
  { icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com" },
  { icon: YoutubeIcon, label: "YouTube", href: "https://www.youtube.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-plum-deep">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <Logo className="h-11" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
            AI-powered advertising built exclusively for jewellery brands —
            luxury creative without luxury production costs.
          </p>
        </div>

        <nav aria-label="Footer">
          <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white/40">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-3">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-white/65 transition-colors hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white/40">
            Contact
          </h3>
          <a
            href="mailto:aiverse.ai1105@gmail.com"
            className="mt-4 inline-flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-electric"
          >
            <Mail size={16} />
            aiverse.ai1105@gmail.com
          </a>
          <div className="mt-6 flex gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="glass rounded-full p-3 text-white/70 transition-all duration-300 hover:scale-110 hover:text-white hover:shadow-[0_0_20px_-4px_rgba(30,136,255,0.6)]"
              >
                <s.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 py-5 text-center text-xs text-white/35">
        © 2026 AIVERSE.AI. All Rights Reserved.
      </div>
    </footer>
  );
}
