"use client";

import { Cpu, ScanFace, Network, Boxes, Layout, Smartphone, ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

const iconMap: Record<number, React.ReactNode> = {
  0: <Cpu className="w-5 h-5 text-gray-400" aria-hidden />,
  1: <ScanFace className="w-5 h-5 text-gray-400" aria-hidden />,
  2: <Network className="w-5 h-5 text-gray-400" aria-hidden />,
  3: <Boxes className="w-5 h-5 text-gray-400" aria-hidden />,
  4: <Layout className="w-5 h-5 text-gray-400" aria-hidden />,
  5: <Smartphone className="w-5 h-5 text-gray-400" aria-hidden />,
};

const badgeColorMap = {
  emerald: "bg-emerald-400",
  cyan: "bg-cyan-400",
  violet: "bg-violet-400",
};

export default function ProjectCard({ project, onOpenModal }: ProjectCardProps) {
  return (
    <div
      className="group bg-[#0d0d0d] border border-gray-800 rounded-xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:border-gray-600 hover:shadow-[0_12px_32px_rgba(255,255,255,0.06)] relative overflow-hidden"
      data-category={project.filterCategory}
    >
      <div>
        {/* Image Area */}
        <div className="aspect-video w-full rounded-lg bg-[#18181b] border border-[#27272A]/60 mb-6 flex flex-col items-center justify-center relative overflow-hidden group-hover:border-gray-500 transition-colors">
          {/* SVG Graphic or Image */}
          {project.svgGraphicCard?.trim().startsWith("<svg") ? (
            <div
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: project.svgGraphicCard }}
            />
          ) : (
            <img
              src={project.svgGraphicCard || "/file.svg"}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent pointer-events-none" />

          {/* Status badge bottom-left */}
          <div className="absolute bottom-3 left-4 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${badgeColorMap[project.badgeColor]}`} />
            <span className="text-[11px] font-inter font-mono text-gray-300">
              {project.badgeLabel}
            </span>
          </div>

          {/* Icon top-right */}
          <div className="absolute top-4 right-4">
            {(iconMap as any)[project.id] || <Boxes className="w-5 h-5 text-gray-400" aria-hidden />}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-inter text-xl text-white mb-2 tracking-tight group-hover:text-[#F3F4F6] transition-colors font-normal">
          {project.title}
        </h3>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.stack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 rounded-full border border-gray-700 bg-neutral-900/80 text-xs font-inter font-medium text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="font-roboto text-sm text-gray-400 leading-relaxed font-normal mb-6">
          {project.shortDesc}
        </p>
      </div>

      {/* CTA */}
      <button
        id={`project-detail-btn-${project.id}`}
        onClick={() => onOpenModal(project)}
        className="w-full py-2.5 px-4 rounded-lg font-inter text-xs font-semibold uppercase tracking-wider text-white border border-white/80 bg-transparent hover:bg-white hover:text-black transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
      >
        <span>Lihat Detail</span>
        <ExternalLink className="w-3.5 h-3.5" aria-hidden />
      </button>
    </div>
  );
}
