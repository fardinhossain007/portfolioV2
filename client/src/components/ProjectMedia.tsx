import { useState } from "react";
import ProjectCover from "./ProjectCover";
import type { Project } from "@/siteConfig";

// Renders a project's real cover photo when available, normalized to the
// container's aspect ratio via object-cover (no distortion). If the image is
// unset or fails to load, it falls back to the generated SVG cover art.
export default function ProjectMedia({
  project,
  position = "center",
}: {
  project: Project;
  position?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (project.image && !failed) {
    const fit = project.fit === "contain" ? "object-contain" : "object-cover";
    return (
      <img
        src={`${import.meta.env.BASE_URL}${project.image}`}
        alt={`${project.title} preview`}
        loading="lazy"
        onError={() => setFailed(true)}
        className={`h-full w-full ${fit}`}
        style={{ objectPosition: position }}
      />
    );
  }
  return <ProjectCover cover={project.cover} />;
}
