import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { skillGroups } from "@/siteConfig";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeading index="02" kicker="skills" title="Tools I work with" />

        <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: gi * 0.08, ease }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    background: group.accent,
                    boxShadow: `0 0 12px ${group.accent}`,
                  }}
                />
                <h3 className="font-display font-semibold text-lg">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="chip">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
