"use client";

import { useState, useMemo, useEffect } from "react";
import { projects } from "@/data/projects";
import type { Project } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type FilterCategory = "all" | "ai" | "cloud" | "ui-ux";

const filters: { label: string; value: FilterCategory }[] = [
  { label: "Semua", value: "all" },
  { label: "AI / Machine Learning", value: "ai" },
  { label: "Cloud & Architecture", value: "cloud" },
  { label: "UI/UX Design", value: "ui-ux" },
];

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const [projectList, setProjectList] = useState<Project[]>(projects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number | string>>(new Set());

  const headerRef = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const filterRef = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  // Fetch dynamic projects from DB/API
  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.projects && data.projects.length > 0) {
          const mapped: Project[] = data.projects.map((p: any, idx: number) => {
            const cat = (p.category || "").toLowerCase();
            const filterCategory: FilterCategory = cat.includes("ai") || cat.includes("machine")
              ? "ai"
              : cat.includes("cloud") || cat.includes("micro")
              ? "cloud"
              : "ui-ux";

            const badgeColor = filterCategory === "ai" ? "emerald" : filterCategory === "cloud" ? "cyan" : "violet";

            return {
              id: p.id || idx,
              title: p.title,
              stack: p.techStack || p.stack || [],
              filterCategory,
              category: p.category,
              shortDesc: p.summary || p.shortDesc || "",
              fullDesc: p.description || p.fullDesc || "",
              badgeLabel: p.client ? `KLIEN: ${p.client.toUpperCase()}` : "ENTERPRISE",
              badgeColor,
              svgGraphicCard: p.image || p.svgGraphicCard || "",
              svgGraphicModal: p.image || p.svgGraphicModal || "",
            };
          });
          setProjectList(mapped);
        }
      })
      .catch((err) => console.log("Using static projects fallback:", err));
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projectList;
    return projectList.filter((p) => p.filterCategory === activeFilter);
  }, [activeFilter, projectList]);

  // Staggered cards: reveal each card with a delay
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    const initTimer = setTimeout(() => {
      setVisibleCards(new Set());
      filteredProjects.forEach((p, i) => {
        const t = setTimeout(() => {
          setVisibleCards((prev) => new Set([...prev, p.id]));
        }, i * 110);
        timers.push(t);
      });
    }, 0);
    timers.push(initTimer);

    return () => timers.forEach(clearTimeout);
  }, [activeFilter, filteredProjects]);

  return (
    <section id="proyek" className="py-20 px-6 max-w-7xl mx-auto relative">

      {/* Section Header — scroll reveal */}
      <div
        ref={headerRef}
        className="reveal flex flex-col md:flex-row md:items-end justify-between mb-12"
      >
        <div>
          <div className="text-xs uppercase tracking-widest font-inter font-semibold mb-2 flex items-center gap-2">
            <span className="w-5 h-[1px] bg-white inline-block" />
            <span className="text-shimmer">Portofolio Terpilih</span>
          </div>
          <h2 className="font-inter text-4xl text-white tracking-tight font-normal">
            Proyek Utama Kami
          </h2>
        </div>
      </div>

      {/* Filter Buttons — scroll reveal */}
      <div
        ref={filterRef}
        className="reveal flex flex-wrap items-center gap-3 mb-10"
        id="project-filter-container"
      >
        {filters.map((f) => (
          <button
            key={f.value}
            id={`filter-btn-${f.value}`}
            type="button"
            onClick={() => setActiveFilter(f.value)}
            className={`btn-magnetic px-5 py-2 rounded-full font-inter font-medium text-sm transition-all duration-200 cursor-pointer ${
              activeFilter === f.value
                ? "bg-white text-black shadow-sm shadow-white/20"
                : "bg-transparent border border-neutral-800 text-gray-400 hover:text-white hover:border-neutral-600"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Project Grid — staggered entrance */}
      <div id="projects-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={`${activeFilter}-${project.id}`}
            className={`project-card-enter ${
              visibleCards.has(project.id) ? "card-visible" : ""
            }`}
          >
            <ProjectCard project={project} onOpenModal={setSelectedProject} />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
