"use client";

import { useEffect, useRef } from "react";
import { X, Globe, Code2 } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const isVisible = !!project;
  const overlayRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  // Animate open
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => {
        if (overlayRef.current) {
          overlayRef.current.style.opacity = "1";
        }
        if (boxRef.current) {
          boxRef.current.style.opacity = "1";
          boxRef.current.style.transform = "scale(1)";
        }
      });
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      id="project-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Detail proyek ${project.title}`}
    >
      {/* Backdrop */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md modal-backdrop"
        style={{ opacity: 0 }}
      />

      {/* Modal Box */}
      <div
        ref={boxRef}
        id="modal-box"
        className="relative z-10 w-full max-w-2xl bg-neutral-900 border border-gray-700 rounded-2xl shadow-2xl p-6 md:p-8 overflow-hidden modal-content-box max-h-[90vh] overflow-y-auto"
        style={{ opacity: 0, transform: "scale(0.95)" }}
      >
        {/* Close button */}
        <button
          id="modal-close-btn"
          aria-label="Tutup Modal"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-800 border border-gray-700 hover:border-white text-gray-300 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" aria-hidden />
        </button>

          {/* Graphic area */}
        <div className="aspect-video w-full rounded-xl bg-[#080808] border border-[#27272A] overflow-hidden mb-6 relative flex items-center justify-center">
          {/* Graphic or Image */}
          {project.svgGraphicModal?.trim().startsWith("<svg") ? (
            <div
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: project.svgGraphicModal }}
            />
          ) : (
            <img
              src={project.svgGraphicModal || "/file.svg"}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute bottom-3 left-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white" />
            <span className="text-xs font-inter font-mono text-gray-300">
              {project.category.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-inter text-2xl md:text-3xl font-bold text-white tracking-tight mb-3">
          {project.title}
        </h3>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full border border-gray-700 bg-neutral-800 text-xs font-inter font-medium text-gray-200"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Description */}
        <div className="mb-8">
          <h4 className="font-inter text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Ikhtisar &amp; Fitur Utama
          </h4>
          <p className="font-roboto text-sm md:text-base text-gray-300 leading-relaxed font-normal">
            {project.fullDesc}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-gray-800">
          <button
            id={`modal-visit-web-${project.id}`}
            onClick={() => alert("Mengarahkan ke live staging environment proyek...")}
            className="w-full sm:flex-1 py-3 px-5 rounded-lg bg-white text-black font-inter font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Kunjungi Web</span>
            <Globe className="w-4 h-4" aria-hidden />
          </button>
          <button
            id={`modal-source-code-${project.id}`}
            onClick={() => alert("Membuka repositori GitHub terverifikasi...")}
            className="w-full sm:flex-1 py-3 px-5 rounded-lg border border-white text-white font-inter font-bold text-xs uppercase tracking-wider bg-transparent hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Source Code</span>
            <Code2 className="w-4 h-4" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
