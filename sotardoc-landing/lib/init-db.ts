import { query, testConnection } from "./db";
import { hashPassword } from "./auth";
import { projects as defaultProjects } from "@/data/projects";
import fs from "fs";
import path from "path";

// Local fallback store path
const LOCAL_STORE_PATH = path.join(process.cwd(), "data", "local-store.json");

export interface LocalStoreData {
  admins: Array<{ id: number; username: string; password_hash: string; name: string }>;
  projects: Array<any>;
  inquiries: Array<any>;
}

export function getLocalStore(): LocalStoreData {
  try {
    if (fs.existsSync(LOCAL_STORE_PATH)) {
      const data = fs.readFileSync(LOCAL_STORE_PATH, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading local store:", err);
  }

  // Initial fallback store
  const initial: LocalStoreData = {
    admins: [],
    projects: defaultProjects.map((p, idx) => ({
      id: String(p.id),
      title: p.title,
      category: p.category,
      image_url: p.svgGraphicCard,
      summary: p.shortDesc,
      description: p.fullDesc,
      client: p.badgeLabel || "Enterprise Partner",
      duration: "3 Bulan",
      architecture: JSON.stringify(["Arsitektur Terdistribusi", "Observabilitas Real-Time", "Keamanan Tingkat Lanjut"]),
      metrics: JSON.stringify([{ label: "Peningkatan Performa", value: "+38%" }]),
      tech_stack: JSON.stringify(p.stack),
      live_url: "",
      is_active: 1,
      sort_order: idx,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })),
    inquiries: [],
  };

  saveLocalStore(initial);
  return initial;
}

export function saveLocalStore(data: LocalStoreData) {
  try {
    const dir = path.dirname(LOCAL_STORE_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(LOCAL_STORE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving local store:", err);
  }
}

let isInitialized = false;
let activeMode: "mysql" | "local" = "local";
let initMessage = "";

export async function initDatabase(): Promise<{ mode: "mysql" | "local"; message: string }> {
  if (isInitialized) {
    return { mode: activeMode, message: initMessage };
  }

  const connTest = await testConnection();

  if (!connTest.ok) {
    console.warn("⚠️ MySQL belum tersambung:", connTest.message);
    console.log("ℹ️ Mengaktifkan Local Storage Fallback untuk memastikan dashboard dan data tetap berfungsi.");
    
    // Ensure default admin exists in local store
    const store = getLocalStore();
    if (!store.admins || store.admins.length === 0) {
      const hashed = await hashPassword(process.env.DEFAULT_ADMIN_PASSWORD || "admin123456");
      store.admins = [
        {
          id: 1,
          username: process.env.DEFAULT_ADMIN_USERNAME || "admin",
          password_hash: hashed,
          name: process.env.DEFAULT_ADMIN_NAME || "Sotardoc Administrator",
        },
      ];
      saveLocalStore(store);
    }

    activeMode = "local";
    initMessage = connTest.message;
    isInitialized = true;
    return { mode: "local", message: connTest.message };
  }

  try {
    // 1. Create Admins Table
    await query(`
      CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 2. Create Projects Table
    await query(`
      CREATE TABLE IF NOT EXISTS projects (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        image_url TEXT NOT NULL,
        summary TEXT NOT NULL,
        description TEXT NOT NULL,
        client VARCHAR(100),
        duration VARCHAR(50),
        architecture TEXT,
        metrics TEXT,
        tech_stack TEXT,
        live_url VARCHAR(255),
        is_active BOOLEAN DEFAULT TRUE,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 3. Create Inquiries Table
    await query(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL,
        company VARCHAR(150),
        service_type VARCHAR(100) NOT NULL,
        budget VARCHAR(100),
        message TEXT NOT NULL,
        status ENUM('BARU', 'DIPROSES', 'SELESAI', 'ARSIP') DEFAULT 'BARU',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 4. Seed default admin if empty
    const adminRows = await query<any[]>("SELECT id FROM admins LIMIT 1");
    if (!adminRows || adminRows.length === 0) {
      const defaultUser = process.env.DEFAULT_ADMIN_USERNAME || "admin";
      const defaultPass = process.env.DEFAULT_ADMIN_PASSWORD || "admin123456";
      const defaultName = process.env.DEFAULT_ADMIN_NAME || "Sotardoc Administrator";
      const hashed = await hashPassword(defaultPass);

      await query(
        "INSERT INTO admins (username, password_hash, name) VALUES (?, ?, ?)",
        [defaultUser, hashed, defaultName]
      );
      console.log("✅ Admin default berhasil dibuat di MySQL:", defaultUser);
    }

    // 5. Seed default projects if empty
    const projectRows = await query<any[]>("SELECT id FROM projects LIMIT 1");
    if (!projectRows || projectRows.length === 0) {
      for (let i = 0; i < defaultProjects.length; i++) {
        const p = defaultProjects[i];
        await query(
          `INSERT INTO projects (
            id, title, category, image_url, summary, description, client, duration,
            architecture, metrics, tech_stack, live_url, is_active, sort_order
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            String(p.id),
            p.title,
            p.category,
            p.svgGraphicCard,
            p.shortDesc,
            p.fullDesc,
            p.badgeLabel || "Enterprise Partner",
            "3 Bulan",
            JSON.stringify(["Arsitektur Terdistribusi", "Observabilitas Real-Time", "Keamanan Tingkat Lanjut"]),
            JSON.stringify([{ label: "Peningkatan Performa", value: "+38%" }]),
            JSON.stringify(p.stack),
            "",
            1,
            i,
          ]
        );
      }
      console.log(`✅ ${defaultProjects.length} proyek bawaan berhasil di-seed ke MySQL.`);
    }

    activeMode = "mysql";
    initMessage = "Inisialisasi tabel MySQL sukses.";
    isInitialized = true;
    return { mode: "mysql", message: initMessage };
  } catch (err: any) {
    console.error("Kesalahan migrasi MySQL:", err);
    activeMode = "local";
    initMessage = err.message;
    isInitialized = true;
    return { mode: "local", message: err.message };
  }
}
