import { motion } from "framer-motion";

interface Props {
  index: string; // e.g. "01"
  kicker: string; // e.g. "about"
  title: string;
}

export default function SectionHeading({ index, kicker, title }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mb-12 md:mb-16"
    >
      <span className="eyebrow">
        <span className="font-mono text-gradient">{index}.</span>
        <span className="h-px w-8 bg-border" />
        {kicker}
      </span>
      <h2 className="mt-3 text-3xl md:text-5xl font-bold">{title}</h2>
    </motion.div>
  );
}
