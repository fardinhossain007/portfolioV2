import { GithubIcon, LinkedinIcon } from "./icons";
import { Mail } from "lucide-react";
import { profile, socials } from "@/siteConfig";

export default function Footer() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground font-mono">
          © {new Date().getFullYear()} {profile.name}
        </p>

        <p className="text-xs text-muted-foreground/70 font-mono order-last sm:order-none">
          Built with React, Tailwind &amp; <span className="text-gradient">framer-motion</span>
        </p>

        <div className="flex items-center gap-4">
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <GithubIcon className="h-5 w-5" />
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <LinkedinIcon className="h-5 w-5" />
          </a>
          <a
            href={socials.email}
            aria-label="Email"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
