import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { socials } from "@/siteConfig";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#about");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      // active-section detection
      let current = "#about";
      for (const item of navItems) {
        const el = document.querySelector(item.href);
        if (el && el.getBoundingClientRect().top <= 120) current = item.href;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-[72px]">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              go("#home");
            }}
            className="font-display font-bold text-xl md:text-2xl tracking-tight"
          >
            <span className="text-gradient">F</span>ardin
            <span className="text-primary">.</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, i) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.href);
                }}
                className={`px-3.5 py-2 text-[0.95rem] font-medium rounded-md transition-colors ${
                  active === item.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="font-mono text-[0.8rem] text-primary mr-1">
                  0{i + 1}.
                </span>
                {item.name}
              </a>
            ))}

            <div className="mx-2 h-5 w-px bg-border" />

            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="grid place-items-center h-9 w-9 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-colors"
            >
              <GithubIcon className="h-[18px] w-[18px]" />
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="grid place-items-center h-9 w-9 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-colors"
            >
              <LinkedinIcon className="h-[18px] w-[18px]" />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden grid place-items-center h-10 w-10 rounded-md text-foreground hover:bg-white/[0.06]"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-5 pt-2">
            <div className="glass rounded-xl p-2 flex flex-col">
              {navItems.map((item, i) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(item.href);
                  }}
                  className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-white/[0.05] rounded-lg transition-colors"
                >
                  <span className="font-mono text-xs text-primary mr-2">0{i + 1}.</span>
                  {item.name}
                </a>
              ))}
              <div className="flex items-center gap-2 px-3 pt-3 mt-1 border-t border-border">
                <a href={socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid place-items-center h-10 w-10 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/[0.06]">
                  <GithubIcon className="h-5 w-5" />
                </a>
                <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid place-items-center h-10 w-10 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/[0.06]">
                  <LinkedinIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
