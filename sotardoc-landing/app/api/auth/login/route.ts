import { NextRequest, NextResponse } from "next/server";
import { initDatabase, getLocalStore } from "@/lib/init-db";
import { query } from "@/lib/db";
import { comparePassword, createSessionToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username dan password wajib diisi." },
        { status: 400 }
      );
    }

    const dbState = await initDatabase();
    let admin: any = null;

    if (dbState.mode === "mysql") {
      try {
        const rows = await query<any[]>(
          "SELECT id, username, password_hash, name FROM admins WHERE username = ? LIMIT 1",
          [username]
        );
        if (rows && rows.length > 0) {
          admin = rows[0];
        }
      } catch (dbErr) {
        console.warn("MySQL query failed during login, using local fallback:", dbErr);
        const store = getLocalStore();
        admin = store.admins.find((a) => a.username === username);
      }
    } else {
      const store = getLocalStore();
      admin = store.admins.find((a) => a.username === username);
    }

    if (!admin) {
      return NextResponse.json(
        { error: "Username atau password salah." },
        { status: 401 }
      );
    }

    const isValid = await comparePassword(password, admin.password_hash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Username atau password salah." },
        { status: 401 }
      );
    }

    // Create session token
    const token = await createSessionToken({
      id: admin.id,
      username: admin.username,
      name: admin.name,
    });

    const response = NextResponse.json({
      success: true,
      user: { id: admin.id, username: admin.username, name: admin.name },
      mode: dbState.mode,
    });

    // Set HTTP-only session cookie
    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (err: any) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server saat login: " + err.message },
      { status: 500 }
    );
  }
}
