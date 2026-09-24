-- ========================================================
-- SOTARDOC DATABASE SCHEMA & INITIAL SEED
-- Basis Data: sotardoc_projects
-- ========================================================

-- 1. Tabel Admin Dashboard
CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Tabel Portofolio Proyek
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

-- 3. Tabel Pemesanan Layanan / Pesan Klien (Inquiries)
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

-- 4. Masukkan Admin Default (Username: admin | Password: admin123456)
INSERT INTO admins (username, password_hash, name) 
VALUES ('admin', '$2b$10$I09abItNDgU2s0J4kbCu5eyZrgMVNfeswNmvpEHXB4QDjJi0g/7Vy', 'Sotardoc Administrator')
ON DUPLICATE KEY UPDATE username=username;
