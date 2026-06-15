import { motion } from "framer-motion";
import { GraduationCap, Award, Sparkles } from "lucide-react";
import SectionHeading from "./SectionHeading";

const education = [
  {
    school: "New York Institute of Technology",
    degree: "M.S. Data Science",
    detail: "GPA 4.0 / 4.0",
    period: "Expected May 2027",
  },
  {
    school: "University of Southampton, UK",
    degree: "B.Eng. Electrical & Electronic Engineering",
    detail: "CGPA 3.5 / 4.0",
    period: "June 2023",
  },
];

const certifications = [
  "Google Data Analytics Professional Certificate",
  "NVIDIA DLI — Getting Started with Deep Learning",
  "Databricks Lakehouse Workshop (NYIT)",
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeading index="01" kicker="about" title="A bit about me" />

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-10">
          {/* Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
            className="space-y-5 text-foreground/85 leading-relaxed"
          >
            <p>
              I'm a data scientist who turns messy, multi-source data into models and
              decisions that hold up. I'm earning my{" "}
              <strong className="text-foreground">M.S. in Data Science</strong> at the{" "}
              <strong className="text-foreground">New York Institute of Technology</strong>{" "}
              (4.0 GPA), where I work as a{" "}
              <strong className="text-foreground">Research Assistant in Academic Affairs</strong>{" "}
              — running statistical and causal studies on tens of thousands of student
              records and building the Python ETL pipelines behind them.
            </p>
            <p>
              Before grad school I spent over a year across industry IT and cybersecurity —
              designing SQL databases, automating workflows in Python, and building Power BI
              and Plotly dashboards that turned manual reporting into same-day insight. I
              hold a{" "}
              <strong className="text-foreground">
                B.Eng. in Electrical &amp; Electronic Engineering
              </strong>{" "}
              from the University of Southampton.
            </p>

            <div className="glass-card p-5 flex gap-3 items-start">
              <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p className="text-muted-foreground italic">
                Outside of work I follow the latest in science, play a lot of video
                games, and write Python scripts to make my life easier. :)
              </p>
            </div>
          </motion.div>

          {/* Education timeline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 text-muted-foreground font-mono text-sm">
              <GraduationCap className="h-4 w-4 text-primary" />
              education
            </div>
            {education.map((e) => (
              <div key={e.school} className="glass-card p-5">
                <p className="font-semibold">{e.degree}</p>
                <p className="text-sm text-foreground/70 mt-1">{e.school}</p>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <span className="font-mono text-xs text-primary">{e.period}</span>
                  <span className="font-mono text-xs text-accent">{e.detail}</span>
                </div>
              </div>
            ))}

            <div className="glass-card p-5">
              <div className="flex items-center gap-2 text-muted-foreground font-mono text-sm mb-3">
                <Award className="h-4 w-4 text-accent" />
                certifications
              </div>
              <ul className="space-y-2">
                {certifications.map((c) => (
                  <li key={c} className="flex gap-2 text-sm text-foreground/80">
                    <span className="text-accent mt-0.5">▹</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
