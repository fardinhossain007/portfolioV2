import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./icons";
import ProjectMedia from "./ProjectMedia";
import { projects } from "@/siteConfig";

const slides = projects.filter((p) => p.featured);
const AUTOPLAY_MS = 6000;
const ease = [0.16, 1, 0.3, 1] as const;

export default function ProjectSlideshow() {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (d: number) => setState(([i]) => [(i + d + slides.length) % slides.length, d]),
    []
  );
  const jump = (i: number) => setState(([cur]) => [i, i > cur ? 1 : -1]);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, paused, go]);

  const p = slides[index];

  return (
    <div
      className="glass-card relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={index}
          custom={dir}
          initial={{ opacity: 0, x: dir >= 0 ? 60 : -60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir >= 0 ? -60 : 60 }}
          transition={{ duration: 0.5, ease }}
          className="grid md:grid-cols-2"
        >
          {/* cover */}
          <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[340px] border-b md:border-b-0 md:border-r border-border overflow-hidden">
            <ProjectMedia project={p} />
          </div>

          {/* details */}
          <div className="p-7 md:p-10 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="chip border-primary/40 text-primary">★ Featured</span>
              <span className="font-mono text-xs text-muted-foreground">
                {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </span>
            </div>

            {p.metric && (
              <div className="mt-5">
                <div className="text-4xl font-bold text-gradient font-display">
                  {p.metric.value}
                </div>
                <div className="font-mono text-xs text-muted-foreground mt-1">
                  {p.metric.label}
                </div>
              </div>
            )}

            <h3 className="mt-4 text-2xl font-semibold">{p.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
              {p.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>

            {p.githubUrl && (
              <a
                href={p.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-foreground transition-colors w-fit"
              >
                <GithubIcon className="h-4 w-4" />
                View on GitHub
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* arrows */}
      <button
        onClick={() => go(-1)}
        aria-label="Previous project"
        className="absolute left-3 top-1/2 -translate-y-1/2 grid place-items-center h-10 w-10 rounded-full glass text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors z-10"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Next project"
        className="absolute right-3 top-1/2 -translate-y-1/2 grid place-items-center h-10 w-10 rounded-full glass text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors z-10"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => jump(i)}
            aria-label={`Go to project ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-7 bg-primary" : "w-1.5 bg-white/25 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
