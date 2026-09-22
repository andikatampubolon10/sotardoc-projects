import { NextRequest, NextResponse } from "next/server";
import { initDatabase, getLocalStore, saveLocalStore } from "@/lib/init-db";
import { query } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

function formatProject(p: any) {
  let architecture = [];
  let metrics = [];
  let techStack = [];

  try {
    architecture = typeof p.architecture === "string" ? JSON.parse(p.architecture) : (p.architecture || []);
  } catch {
    architecture = p.architecture ? [p.architecture] : [];
  }

  try {
    metrics = typeof p.metrics === "string" ? JSON.parse(p.metrics) : (p.metrics || []);
  } catch {
    metrics = [];
  }

  try {
    techStack = typeof p.tech_stack === "string" ? JSON.parse(p.tech_stack) : (p.techStack || p.tech_stack || []);
  } catch {
    techStack = [];
  }

  return {
    id: p.id,
    title: p.title,
    category: p.category,
    image: p.image_url || p.image,
    summary: p.summary,
    description: p.description,
    client: p.client,
    duration: p.duration,
    architecture,
    metrics,
    techStack,
    liveUrl: p.live_url || p.liveUrl || "",
    isActive: Boolean(p.is_active ?? 1),
    sortOrder: p.sort_order ?? 0,
    createdAt: p.created_at,
    updatedAt: p.updated_at,
  };
}

// GET all projects
export async function GET() {
  try {
    const dbState = await initDatabase();
    let projectsList: any[] = [];

    if (dbState.mode === "mysql") {
      try {
        const rows = await query<any[]>(
          "SELECT * FROM projects WHERE is_active = 1 ORDER BY sort_order ASC, created_at DESC"
        );
        projectsList = (rows || []).map(formatProject);
      } catch (err) {
        console.warn("MySQL query failed, using local store:", err);
        const store = getLocalStore();
        projectsList = store.projects
          .filter((p) => p.is_active !== 0)
          .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
          .map(formatProject);
      }
    } else {
      const store = getLocalStore();
      projectsList = store.projects
        .filter((p) => p.is_active !== 0)
        .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
        .map(formatProject);
    }

    return NextResponse.json({ success: true, projects: projectsList, mode: dbState.mode });
  } catch (err: any) {
    console.error("Error fetching projects:", err);
    return NextResponse.json({ error: "Gagal mengambil data proyek: " + err.message }, { status: 500 });
  }
}

// POST new project (Admin only)
export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession(req);
    if (!session) {
      return NextResponse.json({ error: "Akses ditolak. Silakan login terlebih dahulu." }, { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      category,
      image,
      summary,
      description,
      client,
      duration,
      architecture = [],
      metrics = [],
      techStack = [],
      liveUrl = "",
    } = body;

    if (!title || !category || !summary || !description) {
      return NextResponse.json(
        { error: "Judul, kategori, ringkasan, dan deskripsi wajib diisi." },
        { status: 400 }
      );
    }

    // Generate safe ID from title
    const baseId = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const id = `${baseId}-${Date.now().toString().slice(-4)}`;

    const dbState = await initDatabase();

    const newProject = {
      id,
      title,
      category,
      image_url: image || "/file.svg",
      summary,
      description,
      client: client || "Enterprise Partner",
      duration: duration || "3 Bulan",
      architecture: JSON.stringify(architecture),
      metrics: JSON.stringify(metrics),
      tech_stack: JSON.stringify(techStack),
      live_url: liveUrl || "",
      is_active: 1,
      sort_order: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (dbState.mode === "mysql") {
      await query(
        `INSERT INTO projects (
          id, title, category, image_url, summary, description, client, duration,
          architecture, metrics, tech_stack, live_url, is_active, sort_order
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          newProject.id,
          newProject.title,
          newProject.category,
          newProject.image_url,
          newProject.summary,
          newProject.description,
          newProject.client,
          newProject.duration,
          newProject.architecture,
          newProject.metrics,
          newProject.tech_stack,
          newProject.live_url,
          newProject.is_active,
          newProject.sort_order,
        ]
      );
    } else {
      const store = getLocalStore();
      store.projects.unshift(newProject);
      saveLocalStore(store);
    }

    return NextResponse.json({
      success: true,
      message: "Proyek berhasil ditambahkan.",
      project: formatProject(newProject),
    });
  } catch (err: any) {
    console.error("Error creating project:", err);
    return NextResponse.json({ error: "Gagal menyimpan proyek: " + err.message }, { status: 500 });
  }
}
