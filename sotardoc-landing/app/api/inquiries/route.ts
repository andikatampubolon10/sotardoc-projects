import { NextRequest, NextResponse } from "next/server";
import { initDatabase, getLocalStore, saveLocalStore } from "@/lib/init-db";
import { query } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

// POST inquiry (Public from Contact Section)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company = "", serviceType, budget = "", message } = body;

    if (!name || !email || !serviceType || !message) {
      return NextResponse.json(
        { error: "Nama, email, jenis layanan, dan pesan konsultasi wajib diisi." },
        { status: 400 }
      );
    }

    const dbState = await initDatabase();
    const newInquiry = {
      name,
      email,
      company,
      service_type: serviceType,
      budget,
      message,
      status: "BARU",
      created_at: new Date().toISOString(),
    };

    if (dbState.mode === "mysql") {
      const res = await query<any>(
        `INSERT INTO inquiries (name, email, company, service_type, budget, message, status)
         VALUES (?, ?, ?, ?, ?, ?, 'BARU')`,
        [name, email, company, serviceType, budget, message]
      );
      return NextResponse.json({
        success: true,
        message: "Pemesanan konsultasi berhasil dikirim! Tim engineering kami akan segera merespon.",
        id: res.insertId,
      });
    } else {
      const store = getLocalStore();
      const id = Date.now();
      store.inquiries.unshift({ id, ...newInquiry });
      saveLocalStore(store);
      return NextResponse.json({
        success: true,
        message: "Pemesanan konsultasi berhasil dikirim! Tim engineering kami akan segera merespon.",
        id,
      });
    }
  } catch (err: any) {
    console.error("Inquiry submission error:", err);
    return NextResponse.json({ error: "Gagal mengirim pesan: " + err.message }, { status: 500 });
  }
}

// GET all inquiries (Admin only)
export async function GET(req: NextRequest) {
  try {
    const session = await getAdminSession(req);
    if (!session) {
      return NextResponse.json({ error: "Akses ditolak." }, { status: 401 });
    }

    const dbState = await initDatabase();
    let inquiries: any[] = [];

    if (dbState.mode === "mysql") {
      try {
        inquiries = await query<any[]>("SELECT * FROM inquiries ORDER BY created_at DESC");
      } catch (err) {
        console.warn("MySQL query failed, using local store:", err);
        const store = getLocalStore();
        inquiries = store.inquiries;
      }
    } else {
      const store = getLocalStore();
      inquiries = store.inquiries;
    }

    return NextResponse.json({ success: true, inquiries: inquiries || [] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
