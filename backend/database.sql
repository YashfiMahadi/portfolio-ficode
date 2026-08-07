-- ============================================
-- Script Database Portfolio CV Digital
-- UAS Pemrograman Java Lanjut - STMIK Mardira
-- Jalankan di phpMyAdmin XAMPP
-- ============================================

-- Buat database
CREATE DATABASE IF NOT EXISTS portfolio_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE portfolio_db;

-- ============================================
-- Tabel profiles
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    jabatan VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    telepon VARCHAR(20),
    alamat VARCHAR(255),
    kota VARCHAR(50),
    provinsi VARCHAR(50),
    tentang_saya TEXT,
    linked_in VARCHAR(255),
    github VARCHAR(255),
    website VARCHAR(255),
    foto_url VARCHAR(255)
);

-- ============================================
-- Tabel experiences (pengalaman kerja)
-- ============================================
CREATE TABLE IF NOT EXISTS experiences (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nama_perusahaan VARCHAR(100) NOT NULL,
    posisi VARCHAR(100) NOT NULL,
    lokasi_perusahaan VARCHAR(100),
    tanggal_mulai VARCHAR(20),
    tanggal_selesai VARCHAR(20),
    deskripsi TEXT,
    jenis_kerja VARCHAR(50)
);

-- ============================================
-- Tabel educations (riwayat pendidikan)
-- ============================================
CREATE TABLE IF NOT EXISTS educations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nama_institusi VARCHAR(150) NOT NULL,
    jurusan VARCHAR(100) NOT NULL,
    jenjang VARCHAR(10),
    tanggal_mulai VARCHAR(20),
    tanggal_selesai VARCHAR(20),
    ipk DOUBLE,
    deskripsi TEXT,
    lokasi VARCHAR(100)
);

-- ============================================
-- Tabel skills (keahlian)
-- ============================================
CREATE TABLE IF NOT EXISTS skills (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nama_skill VARCHAR(100) NOT NULL,
    kategori VARCHAR(50),
    level_persen INT CHECK (level_persen BETWEEN 0 AND 100),
    tingkat VARCHAR(20)
);

-- ============================================
-- Tabel projects (proyek)
-- ============================================
CREATE TABLE IF NOT EXISTS projects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nama_proyek VARCHAR(150) NOT NULL,
    deskripsi TEXT,
    teknologi_digunakan VARCHAR(255),
    tanggal_mulai VARCHAR(20),
    tanggal_selesai VARCHAR(20),
    link_github VARCHAR(255),
    link_demo VARCHAR(255),
    gambar_url VARCHAR(255),
    kategori VARCHAR(50),
    status_proyek VARCHAR(30)
);

-- ============================================
-- Tabel certifications (sertifikasi)
-- ============================================
CREATE TABLE IF NOT EXISTS certifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nama_sertifikat VARCHAR(150) NOT NULL,
    penerbit VARCHAR(100) NOT NULL,
    tanggal_terbit VARCHAR(20),
    tanggal_kadaluarsa VARCHAR(20),
    nomor_sertifikat VARCHAR(100),
    link_sertifikat VARCHAR(255),
    kategori VARCHAR(50)
);

-- ============================================
-- Data Contoh (Sample Data) - Edit sesuai data kamu!
-- ============================================

INSERT INTO profiles (nama, jabatan, email, telepon, kota, provinsi, tentang_saya, github)
VALUES (
    'Yashfi Mahadi',
    'Backend Developer',
    'email@kamu.com',
    '08123456789',
    'Bandung',
    'Jawa Barat',
    'Mahasiswa Teknik Informatika yang antusias di bidang pengembangan backend dengan Java dan Spring Boot.',
    'https://github.com/usernamekamu'
);

INSERT INTO educations (nama_institusi, jurusan, jenjang, tanggal_mulai, tanggal_selesai, ipk, lokasi)
VALUES
    ('STMIK Mardira Indonesia', 'Teknik Informatika', 'S1', '2022-09', 'Sekarang', 3.75, 'Bandung'),
    ('SMA Negeri 1 Bandung', 'IPA', 'SMA', '2019-07', '2022-06', NULL, 'Bandung');

INSERT INTO skills (nama_skill, kategori, level_persen, tingkat)
VALUES
    ('Java', 'Backend', 85, 'Expert'),
    ('Spring Boot', 'Backend', 80, 'Expert'),
    ('MySQL', 'Database', 75, 'Mahir'),
    ('HTML & CSS', 'Frontend', 70, 'Mahir'),
    ('JavaScript', 'Frontend', 65, 'Mahir'),
    ('REST API', 'Backend', 80, 'Expert'),
    ('Git', 'Tools', 75, 'Mahir');

INSERT INTO experiences (nama_perusahaan, posisi, lokasi_perusahaan, tanggal_mulai, tanggal_selesai, deskripsi, jenis_kerja)
VALUES
    ('PT. Contoh Teknologi', 'Backend Developer Intern', 'Bandung', '2024-07', '2024-12',
     'Mengembangkan REST API menggunakan Spring Boot dan MySQL', 'Magang');

INSERT INTO projects (nama_proyek, deskripsi, teknologi_digunakan, tanggal_mulai, tanggal_selesai, kategori, status_proyek)
VALUES
    ('Portfolio CV Digital', 'Aplikasi portfolio berbasis web dengan Spring Boot backend',
     'Java, Spring Boot, MySQL, HTML, CSS, JavaScript', '2025-01', '2025-06', 'Web', 'Selesai');

INSERT INTO certifications (nama_sertifikat, penerbit, tanggal_terbit, kategori)
VALUES
    ('Java Programming Masterclass', 'Udemy', '2024-03', 'Programming'),
    ('Spring Boot Fundamentals', 'Coursera', '2024-06', 'Programming');

-- ============================================
-- Tabel users (untuk login)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    nama_lengkap VARCHAR(100),
    role VARCHAR(20) DEFAULT 'ADMIN'
);

-- User default (dibuat otomatis oleh Spring Boot saat pertama jalan)
-- username: admin | password: admin123
-- Tapi kalau mau insert manual:
-- INSERT INTO users (username, password, nama_lengkap, role)
-- VALUES ('admin', 'admin123', 'Administrator', 'ADMIN');

-- Konfirmasi
SELECT 'Database portfolio_db berhasil dibuat!' AS pesan;
SHOW TABLES;
