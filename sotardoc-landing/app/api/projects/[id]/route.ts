import { NextRequest, NextResponse } from "next/server";
import { initDatabase, getLocalStore, saveLocalStore } from "@/lib/init-db";
import { query } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

interface Context {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, context: Context) {
  try {
    const { id } = await context.params;
    const dbState = await initDatabase();
    let project: any = null;

    if (dbState.mode === "mysql") {
      const rows = await query<any[]>("SELECT * FROM projects WHERE id = ? LIMIT 1", [id]);
      if (rows && rows.length > 0) project = rows[0];
    } else {
      const store = getLocalStore();
      project = store.projects.find((p) => p.id === id);
    }

    if (!project) {
      return NextResponse.json({ error: "Proyek tidak ditemukan." }, { status: 404 });
    }

    return NextResponse.json({ success: true, project });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: Context) {
  try {
    const session = await getAdminSession(req);
    if (!session) {
      return NextResponse.json({ error: "Akses ditolak." }, { status: 401 });
    }

    const { id } = await context.params;
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

    const dbState = await initDatabase();

    if (dbState.mode === "mysql") {
      await query(
        `UPDATE projects SET 
          title = ?, category = ?, image_url = ?, summary = ?, description = ?,
          client = ?, duration = ?, architecture = ?, metrics = ?, tech_stack = ?, live_url = ?
        WHERE id = ?`,
        [
          title,
          category,
          image,
          summary,
          description,
          client,
          duration,
          JSON.stringify(architecture),
          JSON.stringify(metrics),
          JSON.stringify(techStack),
          liveUrl,
          id,
        ]
      );
    } else {
      const store = getLocalStore();
      const idx = store.projects.findIndex((p) => p.id === id);
      if (idx !== -1) {
        store.projects[idx] = {
          ...store.projects[idx],
          title,
          category,
          image_url: image,
          summary,
          description,
          client,
          duration,
          architecture: JSON.stringify(architecture),
          metrics: JSON.stringify(metrics),
          tech_stack: JSON.stringify(techStack),
          live_url: liveUrl,
          updated_at: new Date().toISOString(),
        };
        saveLocalStore(store);
      }
    }

    return NextResponse.json({ success: true, message: "Proyek berhasil diperbarui." });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: Context) {
  try {
    const session = await getAdminSession(req);
    if (!session) {
      return NextResponse.json({ error: "Akses ditolak." }, { status: 401 });
    }

    const { id } = await context.params;
    const dbState = await initDatabase();

    if (dbState.mode === "mysql") {
      await query("DELETE FROM projects WHERE id = ?", [id]);
    } else {
      const store = getLocalStore();
      store.projects = store.projects.filter((p) => p.id !== id);
      saveLocalStore(store);
    }

    return NextResponse.json({ success: true, message: "Proyek berhasil dihapus." });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
