import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import LiveTrainingHero from "./LiveTrainingHero";
import { GithubIcon, LinkedinIcon } from "./icons";
import { profile, socials } from "@/siteConfig";

export default function Hero() {
  const fullText = `hey, I'm ${profile.firstName}.`;
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(id);
    }, 70);
    return () => clearInterval(id);
  }, [fullText]);

  const scrollTo = (sel: string) =>
    document.querySelector(sel)?.scrollIntoView({ behavior: "smooth" });

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden"
    >
      {/* Hero backdrop — masks the site-wide neural net behind the hero only,
          fading it back in toward the bottom. Subtle glow keeps it from going flat. */}
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(110% 80% at 78% -5%, rgba(129,140,248,0.12), transparent 55%), var(--background)",
          maskImage: "linear-gradient(to bottom, #000 82%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, #000 82%, transparent)",
        }}
      />
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-10 items-center">
          {/* content */}
          <div>
            {profile.available && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease }}
                className="chip mb-6"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Open to 2026 internships
              </motion.div>
            )}

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.04] min-h-[1.1em]">
              <span>{typed.slice(0, 9)}</span>
              <span className="text-gradient">{typed.slice(9)}</span>
              <span className="text-primary animate-blink">|</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mt-5 text-xl md:text-2xl text-foreground/80 font-display"
            >
              {profile.role}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.6, ease }}
              className="mt-5 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed"
            >
              {profile.blurb}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6, ease }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button
                size="lg"
                className="btn-glow bg-primary text-primary-foreground hover:bg-primary/90 group"
                onClick={() => (window.location.href = socials.email)}
              >
                <Mail className="mr-2 h-4 w-4 group-hover:-rotate-12 transition-transform" />
                Get in touch
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border bg-white/[0.02] hover:bg-white/[0.06]"
                onClick={() => scrollTo("#projects")}
              >
                View projects
              </Button>

              <div className="flex items-center gap-1 ml-1">
                <IconLink href={socials.github} label="GitHub">
                  <GithubIcon className="h-5 w-5" />
                </IconLink>
                <IconLink href={socials.linkedin} label="LinkedIn">
                  <LinkedinIcon className="h-5 w-5" />
                </IconLink>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="mt-6 flex items-center gap-2 text-sm text-muted-foreground font-mono"
            >
              <MapPin className="h-4 w-4 text-primary" />
              {profile.location}
            </motion.p>
          </div>

          {/* interactive live-training viz */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease }}
            className="hidden md:block"
          >
            <LiveTrainingHero />
          </motion.div>
        </div>
      </div>

      {/* scroll cue */}
      <button
        onClick={() => scrollTo("#about")}
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-muted-foreground hover:text-primary transition-colors animate-pulse-glow"
      >
        <ArrowDown className="h-6 w-6" />
      </button>
    </section>
  );
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid place-items-center h-10 w-10 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/[0.06] border border-transparent hover:border-border transition-colors"
    >
      {children}
    </a>
  );
}
