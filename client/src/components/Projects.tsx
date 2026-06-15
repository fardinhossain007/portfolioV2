import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import ProjectSlideshow from "./ProjectSlideshow";
import ProjectMedia from "./ProjectMedia";
import { GithubIcon } from "./icons";
import { projects, type Project } from "@/siteConfig";

const ease = [0.16, 1, 0.3, 1] as const;

function GridCard({ p, i }: { p: Project; i: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: i * 0.06, ease }}
      className="glass-card group flex flex-col overflow-hidden"
    >
      {/* thumbnail */}
      <div className="relative aspect-[16/9] border-b border-border overflow-hidden">
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
          <ProjectMedia project={p} />
        </div>
        {p.metric && (
          <span className="absolute bottom-2 left-2 chip bg-black/40 backdrop-blur-md text-foreground">
            {p.metric.value} {p.metric.label.split(" · ")[0]}
          </span>
        )}
      </div>

      {/* body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-snug">{p.title}</h3>
          {p.githubUrl && (
            <a
              href={p.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.title} on GitHub`}
              className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
            >
              <GithubIcon className="h-[18px] w-[18px]" />
            </a>
          )}
        </div>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">
          {p.blurb}
        </p>
        <div className="mt-4 flex flex-wrap gap-x-2.5 gap-y-1">
          {p.tech.slice(0, 4).map((t) => (
            <span key={t} className="font-mono text-[0.7rem] text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeading index="04" kicker="projects" title="Things I've built" />

        {/* Slideshow — featured highlights */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
        >
          <ProjectSlideshow />
        </motion.div>

        {/* All projects */}
        <div className="mt-12 flex items-center gap-3 text-muted-foreground font-mono text-sm">
          <span className="h-px flex-1 bg-border" />
          all projects
          <span className="h-px flex-1 bg-border" />
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <GridCard key={p.title} p={p} i={i} />
          ))}
        </div>

        <a
          href="https://github.com/fardinhossain007"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-foreground transition-colors"
        >
          See more on GitHub
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
