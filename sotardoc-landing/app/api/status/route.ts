import { NextResponse } from "next/server";
import { testConnection } from "@/lib/db";
import { initDatabase } from "@/lib/init-db";

export async function GET() {
  const dbStatus = await testConnection();
  const init = await initDatabase();
  return NextResponse.json({
    database: {
      host: process.env.DB_HOST,
      name: process.env.DB_NAME,
      user: process.env.DB_USER,
      connected: dbStatus.ok,
      message: dbStatus.message,
    },
    activeMode: init.mode,
  });
}
