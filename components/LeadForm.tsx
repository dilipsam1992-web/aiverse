"use client";

import { useMemo, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, PartyPopper, Send } from "lucide-react";
import TiltCard from "./TiltCard";
import SectionHeading from "./SectionHeading";
import { seededRandom } from "@/lib/hooks";

const CONTACT_EMAIL = "aiverse.ai1105@gmail.com";

const FIELDS = [
  { name: "name", label: "Full Name", type: "text", placeholder: "Your name" },
  {
    name: "brand",
    label: "Jewellery Brand Name",
    type: "text",
    placeholder: "Your brand or store name",
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "you@brand.com",
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    placeholder: "+91 98765 43210",
  },
] as const;

/** Confetti burst rendered on success — pure Framer Motion particles. */
function ConfettiBurst() {
  const pieces = useMemo(() => {
    const rand = seededRandom(1105);
    return Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: (rand() - 0.5) * 360,
      y: -(60 + rand() * 260),
      rotate: (rand() - 0.5) * 540,
      scale: 0.6 + rand() * 0.9,
      color: ["#ffd700", "#1e88ff", "#7b3ff2", "#ffffff"][i % 4],
      delay: rand() * 0.15,
    }));
  }, []);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: p.scale }}
          animate={{ x: p.x, y: p.y, opacity: 0, rotate: p.rotate }}
          transition={{ duration: 1.6, delay: p.delay, ease: "easeOut" }}
          className="absolute left-1/2 top-2/3 h-2.5 w-1.5 rounded-sm"
          style={{ backgroundColor: p.color }}
        />
      ))}
    </div>
  );
}

export default function LeadForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: "New AIVERSE Sample Ad Request",
          _template: "table",
          ...data,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      form.reset();
    } catch {
      // Graceful fallback — open the visitor's mail client pre-filled.
      const body = encodeURIComponent(
        `Name: ${data.name}\nBrand: ${data.brand}\nEmail: ${data.email}\nPhone: ${data.phone}\n\nRequirement:\n${data.requirement}`
      );
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        "Sample Ad Request — " + data.brand
      )}&body=${body}`;
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-plum-deep py-24">
      {/* Ambient glow behind the panel */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[480px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-electric/25 to-violet/25 animate-pulse-glow"
      />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Free Sample"
          title="Request Your Free Sample Ad"
          subtitle="Send your jewellery details and we'll show you how AI can transform your advertising."
        />

        <div className="perspective-1600 mt-12">
          {/* Floating tablet panel — permanent -2° tilt */}
          <TiltCard
            intensity={4}
            lift={12}
            baseRotateX={-2}
            glare={false}
            className="glass-strong relative rounded-3xl p-7 luxury-shadow sm:p-10"
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  className="relative py-14 text-center"
                  role="status"
                >
                  <ConfettiBurst />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
                    className="mx-auto mb-6 inline-flex rounded-full bg-gradient-to-br from-electric to-violet p-5 glow-electric"
                  >
                    <PartyPopper size={34} className="text-white" />
                  </motion.div>
                  <h3 className="font-display text-2xl text-white sm:text-3xl">
                    Thank you.
                  </h3>
                  <p className="mt-3 text-white/70">
                    Our team will contact you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  onSubmit={onSubmit}
                  className="grid grid-cols-1 gap-5 sm:grid-cols-2"
                >
                  {FIELDS.map((f) => (
                    <div key={f.name} className="flex flex-col gap-1.5">
                      <label
                        htmlFor={f.name}
                        className="text-xs font-bold uppercase tracking-wider text-white/60"
                      >
                        {f.label}
                      </label>
                      <input
                        id={f.name}
                        name={f.name}
                        type={f.type}
                        required
                        placeholder={f.placeholder}
                        className="rounded-xl border border-white/15 bg-plum-deep/50 px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none transition-all duration-300 focus:border-electric focus:shadow-[0_0_20px_-4px_rgba(30,136,255,0.5)]"
                      />
                    </div>
                  ))}
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label
                      htmlFor="requirement"
                      className="text-xs font-bold uppercase tracking-wider text-white/60"
                    >
                      Requirement
                    </label>
                    <textarea
                      id="requirement"
                      name="requirement"
                      required
                      rows={4}
                      placeholder="Tell us about your jewellery and the kind of ads you need…"
                      className="resize-none rounded-xl border border-white/15 bg-plum-deep/50 px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none transition-all duration-300 focus:border-electric focus:shadow-[0_0_20px_-4px_rgba(30,136,255,0.5)]"
                    />
                  </div>
                  {status === "error" && (
                    <p className="text-xs text-red-300 sm:col-span-2" role="alert">
                      Direct submission failed — we opened your email app instead, or
                      write to us at {CONTACT_EMAIL}.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-electric to-violet px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02] glow-electric disabled:opacity-60 sm:col-span-2 sm:text-base"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Request Sample Ad
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
