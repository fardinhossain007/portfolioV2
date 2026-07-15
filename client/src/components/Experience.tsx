import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, MapPin } from "lucide-react";
import SectionHeading from "./SectionHeading";

interface ExperienceItem {
  tab: string;
  company: string;
  role: string;
  period: string;
  location: string;
  responsibilities: string[];
}

const experiences: ExperienceItem[] = [
  {
    tab: "NYIT · Summer Researcher",
    company: "New York Institute of Technology",
    role: "Summer Researcher",
    period: "JUN 2026 – PRESENT",
    location: "New York, NY",
    responsibilities: [
      "Conducting grant-funded research at NYIT to improve EV charging-demand forecasting by developing demographic-informed machine learning methods.",
    ],
  },
  {
    tab: "NYIT · Research Assistant",
    company: "New York Institute of Technology",
    role: "Research Assistant",
    period: "MAR 2026 – JUN 2026",
    location: "New York, NY",
    responsibilities: [
      "Conducted an observational study on 16,000+ student records: applied EDA and statistical testing to isolate the effect of schedule gaps on GPA, finding no significant causal link, redirecting institutional policy toward retention-focused interventions.",
      "Built a Python ETL pipeline to clean and normalize raw scheduling data, then developed and deployed an interactive Plotly dashboard (live on Render) used by stakeholders across all NYIT schools.",
    ],
  },
  {
    tab: "NYIT · Inst. Research",
    company: "New York Institute of Technology",
    role: "Student Worker",
    period: "JAN 2026 – MAR 2026",
    location: "New York, NY",
    responsibilities: [
      "Transformed unstructured institutional data (using camelot-py & pandas) into structured analytical datasets and built a course-flow visualizer, surfacing co-/pre-requisite redundancies across degree programs to inform curriculum optimization.",
      "Integrated the Google Distance Matrix API to collect commute data for 3,500+ students; conducted multi-dimensional EDA (time, distance, transit mode) and delivered findings via an interactive dashboard using Looker Studio, enabling data-driven early/late scheduling decisions.",
    ],
  },
  {
    tab: "Air Alliance",
    company: "Air Alliance Ltd. (UPS Authorized Contractor)",
    role: "Management Trainee – IT",
    period: "AUG 2024 – AUG 2025",
    location: "Dhaka, Bangladesh",
    responsibilities: [
      "Designed and queried a MySQL relational database tracking 500+ assets across departments, writing reproducible SQL for audit reporting and asset-lifecycle analysis to replace manual spreadsheet workflows with a structured, queryable system.",
      "Built Python + SQL backend logic to automate receipt-voiding workflows (~100–150 requests/month) across multi-department approval chains, reducing processing errors across Operations and Finance.",
    ],
  },
  {
    tab: "Robi Axiata",
    company: "Robi Axiata Ltd.",
    role: "Risk & Compliance Intern – Cybersecurity",
    period: "APR 2024 – JUL 2024",
    location: "Dhaka, Bangladesh",
    responsibilities: [
      "Automated large-scale data extraction via the Tenable.sc API in Python, processing vulnerability records across 500+ enterprise assets — cutting manual analysis time by 50% and enabling same-day statistical risk assessments.",
      "Built Power BI dashboards visualizing severity distributions and remediation trends across asset cohorts, helping executives identify high-risk exposure patterns and prioritize patch actions with data-driven metrics.",
    ],
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Experience() {
  const [active, setActive] = useState(0);
  const exp = experiences[active];

  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHeading index="03" kicker="experience" title="Where I've worked" />

        <div className="flex flex-col md:flex-row gap-6 md:gap-10">
          {/* Tabs */}
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible md:min-w-[230px] pb-2 md:pb-0">
            {experiences.map((e, i) => {
              const isActive = active === i;
              return (
                <button
                  key={e.tab}
                  onClick={() => setActive(i)}
                  className={`relative text-left whitespace-nowrap md:whitespace-normal rounded-lg px-4 py-3 font-mono text-sm transition-colors ${
                    isActive
                      ? "text-foreground bg-white/[0.05]"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/[0.03]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="exp-active"
                      className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full"
                      style={{ background: "linear-gradient(var(--indigo), var(--cyan))" }}
                    />
                  )}
                  {e.tab}
                </button>
              );
            })}
          </div>

          {/* Detail */}
          <div className="flex-1 min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease }}
                className="glass-card p-6 md:p-8"
              >
                <h3 className="text-xl font-semibold">
                  {exp.role}{" "}
                  <span className="text-gradient">@ {exp.company}</span>
                </h3>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground">
                  <span className="text-primary">{exp.period}</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {exp.location}
                  </span>
                </div>

                <ul className="mt-6 space-y-3">
                  {exp.responsibilities.map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-foreground/80 leading-relaxed">
                      <ChevronRight className="h-4 w-4 text-accent shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
