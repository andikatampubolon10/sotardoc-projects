import { NextRequest, NextResponse } from "next/server";
import { initDatabase, getLocalStore, saveLocalStore } from "@/lib/init-db";
import { query } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

interface Context {
  params: Promise<{ id: string }>;
}

// PATCH update status
export async function PATCH(req: NextRequest, context: Context) {
  try {
    const session = await getAdminSession(req);
    if (!session) {
      return NextResponse.json({ error: "Akses ditolak." }, { status: 401 });
    }

    const { id } = await context.params;
    const { status } = await req.json();

    const allowed = ["BARU", "DIPROSES", "SELESAI", "ARSIP"];
    if (!allowed.includes(status)) {
      return NextResponse.json({ error: "Status tidak valid." }, { status: 400 });
    }

    const dbState = await initDatabase();

    if (dbState.mode === "mysql") {
      await query("UPDATE inquiries SET status = ? WHERE id = ?", [status, id]);
    } else {
      const store = getLocalStore();
      const item = store.inquiries.find((i) => String(i.id) === String(id));
      if (item) {
        item.status = status;
        saveLocalStore(store);
      }
    }

    return NextResponse.json({ success: true, message: `Status diperbarui menjadi ${status}.` });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE inquiry
export async function DELETE(req: NextRequest, context: Context) {
  try {
    const session = await getAdminSession(req);
    if (!session) {
      return NextResponse.json({ error: "Akses ditolak." }, { status: 401 });
    }

    const { id } = await context.params;
    const dbState = await initDatabase();

    if (dbState.mode === "mysql") {
      await query("DELETE FROM inquiries WHERE id = ?", [id]);
    } else {
      const store = getLocalStore();
      store.inquiries = store.inquiries.filter((i) => String(i.id) !== String(id));
      saveLocalStore(store);
    }

    return NextResponse.json({ success: true, message: "Pesanan berhasil dihapus." });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
