// ─────────────────────────────────────────────────────────────
// Single source of truth for personal info, links and content.
// Edit values here to update the whole site.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Fardin Hossain Tanmoy",
  firstName: "Fardin",
  role: "Data Scientist & ML Engineer",
  tagline: "Data scientist by day, debugging enthusiast by night.",
  blurb:
    "I'm pursuing my M.S. in Data Science at NYIT (4.0 GPA), where I build Python ETL pipelines and run statistical studies on institutional data. If it involves machine learning, causal inference, or turning messy data into decisions — I'm in.",
  location: "Brooklyn, NY",
  email: "fardintonu@gmail.com",
  available: true,
  // Drop a resume PDF at client/public/resume.pdf to enable the download button.
  resumeUrl: "",
};

export const socials = {
  github: "https://github.com/fardinhossain007",
  linkedin: "https://www.linkedin.com/in/fardin-hossain-tanmoy",
  email: `mailto:${profile.email}`,
};

// Headline numbers for the stats band. Use animated count-up where numeric.
export const stats = [
  { value: 96.6, suffix: "%", label: "Best-model accuracy", mono: "ACC" },
  { value: 16, suffix: "K+", label: "Student records analyzed", mono: "STUDY" },
  { value: 50, suffix: "%", label: "Manual analysis cut via automation", mono: "AUTO" },
  { value: 4, suffix: "", label: "Roles across research, IT & security", mono: "ROLES" },
];

export type SkillGroup = {
  title: string;
  accent: string; // css color var
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    accent: "var(--indigo)",
    skills: ["Python", "SQL", "R", "C / C++", "HTML / CSS"],
  },
  {
    title: "ML & Statistics",
    accent: "var(--violet)",
    skills: [
      "scikit-learn",
      "PyTorch",
      "Statistical Modeling",
      "Causal Inference",
      "EDA",
      "Feature Engineering",
      "A/B Testing",
    ],
  },
  {
    title: "LLMs & GenAI",
    accent: "var(--cyan)",
    skills: ["RAG", "LangChain", "ChromaDB", "Ollama", "FastAPI", "Streamlit"],
  },
  {
    title: "Data, Viz & Cloud",
    accent: "#34d399",
    skills: ["Plotly Dash", "Power BI", "Tableau", "MySQL", "PostgreSQL", "AWS S3", "Git"],
  },
];

// ── Projects ─────────────────────────────────────────────────
export type Project = {
  title: string;
  blurb: string;
  description: string;
  tech: string[];
  cover: "rag" | "pcb" | "f1" | "taxi" | "biopcb" | "meter";
  // Real cover image (relative to the site base, e.g. "projects/pcb.png").
  // Falls back to the generated SVG cover if missing/unset or it fails to load.
  image?: string;
  // How the image fills its frame: "cover" crops to fill (default), "contain"
  // shows the whole image letterboxed — better for detailed diagrams.
  fit?: "cover" | "contain";
  metric?: { value: string; label: string };
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Security Copilot — RAG",
    blurb: "Local-first RAG assistant that answers cybersecurity policy questions with inline citations.",
    description:
      "A local-first Retrieval-Augmented Generation pipeline for security teams, grounded in NIST and OWASP sources. It retrieves with ChromaDB + Max-Marginal-Relevance and generates citation-aware answers via a local Ollama (llama3.1:8b) model, served through Streamlit and FastAPI. A 15-question evaluation benchmark plus systematic tuning of chunk size, overlap and similarity thresholds lifted citation accuracy from 66.7% → 73.3% and semantic relevance from 0.63 → 0.72.",
    tech: ["Python", "LangChain", "ChromaDB", "Ollama", "FastAPI", "Streamlit"],
    cover: "rag",
    image: "projects/Security-Copilot.png",
    metric: { value: "73.3%", label: "citation accuracy ↑ from 66.7%" },
    githubUrl: "https://github.com/fardinhossain007/security-co-pilot-RAG",
    featured: true,
  },
  {
    title: "PCB Defect Detection",
    blurb: "End-to-end computer-vision system for automated PCB quality control.",
    description:
      "An end-to-end deep-learning system for automated PCB inspection. A ResNet-18 backbone (transfer learning, dropout + L2) classifies six defect types on the DeepPCB benchmark, deliberately optimised for recall to minimise false negatives in manufacturing QC — reaching 91.2% F1 at 98.3% recall and 20 ms/image. Benchmarking against a generic vision-language model (BLIP) validated the domain-specific design.",
    tech: ["Python", "PyTorch", "ResNet-18", "OpenCV", "Computer Vision"],
    cover: "pcb",
    image: "projects/pcb.webp",
    fit: "contain",
    metric: { value: "91.2%", label: "F1 · 98.3% recall" },
    githubUrl: "https://github.com/fardinhossain007/pcb-defect-detection",
    featured: true,
  },
  {
    title: "F1 Podium Predictor",
    blurb: "ML pipeline predicting Formula 1 podium finishers from five seasons of telemetry.",
    description:
      "A machine-learning pipeline predicting Formula 1 podium finishers from five seasons of FastF1 telemetry. Sixty-plus engineered features — driver momentum, team form, circuit history — feed an ensemble in which Random Forest reached 96.6% accuracy, beating XGBoost and a neural network. The takeaway: current form predicts better than career stats.",
    tech: ["Python", "Scikit-learn", "XGBoost", "FastF1", "Feature Engineering"],
    cover: "f1",
    image: "projects/f1.webp",
    fit: "contain",
    metric: { value: "96.6%", label: "accuracy · 88.9% P/R" },
    githubUrl: "https://github.com/fardinhossain007/f1-race-predictor",
    featured: true,
  },
  {
    title: "NYC Taxi Fare Prediction",
    blurb: "Fare model over 1M trips with rush-hour and 2016–2025 inflation tracking.",
    description:
      "A fare-prediction model over 1M+ NYC taxi trips with realistic airport handling, rush-hour comparison and 2016–2025 inflation tracking. Engineered geospatial and temporal features with outlier treatment feed regression models (Linear, Random Forest, Gradient Boosting); the Random Forest reached $1.79 RMSE (R² 0.85) with real-world fare constraints enforced.",
    tech: ["Python", "Random Forest", "Pandas", "Geospatial"],
    cover: "taxi",
    image: "projects/nyctaxi.webp",
    metric: { value: "$1.79", label: "RMSE · 0.853 R²" },
    githubUrl: "https://github.com/fardinhossain007/nyc-taxi-fare-prediction",
  },
  {
    title: "Biodegradable Flexible PCB",
    blurb: "Undergraduate thesis on cellulose-acetate substrates for eco-friendly flexible circuits.",
    description:
      "Undergraduate thesis at the University of Southampton exploring cellulose acetate as an eco-friendly substrate for flexible PCBs — designing and fabricating a working LED circuit on biodegradable material as a greener alternative to conventional polyimide.",
    tech: ["Materials Science", "Eagle PCB", "Circuit Design"],
    cover: "biopcb",
    image: "projects/biodegradable.png",
  },
  {
    title: "Smart Meter with Buck Converter",
    blurb: "230V AC → 5V DC buck-switching supply for a smart energy meter.",
    description:
      "A buck-switching power supply stepping 230 V AC down to 5 V DC for a smart energy meter with advanced energy management, with schematic and PCB layout designed in Cadence OrCAD.",
    tech: ["OrCAD", "Power Electronics", "Embedded"],
    cover: "meter",
    image: "projects/buckconverter.png",
    fit: "contain",
  },
];
