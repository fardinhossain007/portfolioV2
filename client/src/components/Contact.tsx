import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "./icons";
import { profile, socials } from "@/siteConfig";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
          className="glass-card relative overflow-hidden p-8 md:p-14 text-center"
        >
          {/* glow accent */}
          <div
            className="absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-[80%] blur-3xl opacity-40 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(129,140,248,0.5), transparent 70%)",
            }}
          />

          <span className="eyebrow justify-center">
            <span className="font-mono text-gradient">05.</span> what's next
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold">
            Let's <span className="text-gradient">build</span> something
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-muted-foreground leading-relaxed">
            I'm currently open to 2026 data science &amp; ML internships and
            collaborations. Got an interesting dataset or problem? My inbox is open.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              className="btn-glow bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => (window.location.href = socials.email)}
            >
              <Mail className="mr-2 h-4 w-4" />
              Say hello
            </Button>
            {profile.resumeUrl && (
              <Button
                size="lg"
                variant="outline"
                className="border-border bg-white/[0.02] hover:bg-white/[0.06]"
                asChild
              >
                <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
                  Résumé <ArrowUpRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            )}
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <SocialLink href={socials.github} label="GitHub">
              <GithubIcon className="h-5 w-5" />
            </SocialLink>
            <SocialLink href={socials.linkedin} label="LinkedIn">
              <LinkedinIcon className="h-5 w-5" />
            </SocialLink>
            <SocialLink href={socials.email} label="Email">
              <Mail className="h-5 w-5" />
            </SocialLink>
          </div>

          <p className="mt-6 font-mono text-sm text-muted-foreground">
            {profile.email}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function SocialLink({
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
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      aria-label={label}
      className="grid place-items-center h-11 w-11 rounded-full glass text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
    >
      {children}
    </a>
  );
}
