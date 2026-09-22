import mysql from "mysql2/promise";

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306", 10),
  user: process.env.DB_USER || "sotardoc_dbadmin",
  password: process.env.DB_PASSWORD || "parlinggoman10",
  database: process.env.DB_NAME || "sotardoc_projects",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
};

let pool: mysql.Pool | null = null;

export function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
  }
  return pool;
}

export async function testConnection(): Promise<{ ok: boolean; message: string }> {
  try {
    const p = getPool();
    const conn = await p.getConnection();
    conn.release();
    return { ok: true, message: "Koneksi database MySQL berhasil terhubung." };
  } catch (err: any) {
    return {
      ok: false,
      message: `Gagal terhubung ke MySQL (${dbConfig.host}:${dbConfig.port}): ${err.message}`,
    };
  }
}

export async function query<T = any>(sql: string, params?: any[]): Promise<T> {
  const p = getPool();
  const [results] = await p.execute(sql, params);
  return results as T;
}
