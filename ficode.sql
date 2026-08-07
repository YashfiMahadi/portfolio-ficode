/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80030 (8.0.30)
 Source Host           : localhost:3306
 Source Schema         : ficode

 Target Server Type    : MySQL
 Target Server Version : 80030 (8.0.30)
 File Encoding         : 65001

 Date: 30/06/2026 11:10:48
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for cache
-- ----------------------------
DROP TABLE IF EXISTS `cache`;
CREATE TABLE `cache`  (
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cache
-- ----------------------------

-- ----------------------------
-- Table structure for cache_locks
-- ----------------------------
DROP TABLE IF EXISTS `cache_locks`;
CREATE TABLE `cache_locks`  (
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cache_locks
-- ----------------------------

-- ----------------------------
-- Table structure for failed_jobs
-- ----------------------------
DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE `failed_jobs`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `failed_jobs_uuid_unique`(`uuid` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of failed_jobs
-- ----------------------------

-- ----------------------------
-- Table structure for job_batches
-- ----------------------------
DROP TABLE IF EXISTS `job_batches`;
CREATE TABLE `job_batches`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `cancelled_at` int NULL DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of job_batches
-- ----------------------------

-- ----------------------------
-- Table structure for jobs
-- ----------------------------
DROP TABLE IF EXISTS `jobs`;
CREATE TABLE `jobs`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED NULL DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `jobs_queue_index`(`queue` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of jobs
-- ----------------------------

-- ----------------------------
-- Table structure for migrations
-- ----------------------------
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of migrations
-- ----------------------------
INSERT INTO `migrations` VALUES (1, '0001_01_01_000000_create_users_table', 1);
INSERT INTO `migrations` VALUES (2, '0001_01_01_000001_create_cache_table', 1);
INSERT INTO `migrations` VALUES (3, '0001_01_01_000002_create_jobs_table', 1);
INSERT INTO `migrations` VALUES (4, '2026_06_29_150424_create_tasks_table', 1);
INSERT INTO `migrations` VALUES (5, '2026_06_29_150540_create_portfolios_table', 1);
INSERT INTO `migrations` VALUES (6, '2026_06_29_150623_create_skills_table', 1);

-- ----------------------------
-- Table structure for password_reset_tokens
-- ----------------------------
DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE `password_reset_tokens`  (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of password_reset_tokens
-- ----------------------------

-- ----------------------------
-- Table structure for portfolios
-- ----------------------------
DROP TABLE IF EXISTS `portfolios`;
CREATE TABLE `portfolios`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `project_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `github_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `technology` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `status` enum('draft','published') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'published',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `portfolios_slug_unique`(`slug` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of portfolios
-- ----------------------------
INSERT INTO `portfolios` VALUES (1, 'Website Personal Profile', 'website-personal-profile', 'Website profil pribadi yang menampilkan informasi diri, skill, portfolio, dan kontak.', NULL, 'https://example.com', 'https://github.com/username/personal-profile', 'Laravel, Bootstrap, MySQL', 'published', '2026-06-30 03:57:52', '2026-06-30 03:57:52');
INSERT INTO `portfolios` VALUES (2, 'Aplikasi Manajemen Tugas', 'aplikasi-manajemen-tugas', 'Aplikasi CRUD sederhana untuk mengelola daftar tugas, status tugas, deadline, dan file.', NULL, NULL, 'https://github.com/username/task-management', 'Laravel, PHP, MySQL', 'published', '2026-06-30 03:57:52', '2026-06-30 03:57:52');
INSERT INTO `portfolios` VALUES (3, 'Dashboard Admin Portfolio', 'dashboard-admin-portfolio', 'Dashboard admin untuk mengelola profil, skill, portfolio, dan tugas.', NULL, NULL, NULL, 'Laravel, Bootstrap 5', 'draft', '2026-06-30 03:57:52', '2026-06-30 03:57:52');

-- ----------------------------
-- Table structure for sessions
-- ----------------------------
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED NULL DEFAULT NULL,
  `ip_address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `user_agent` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `sessions_user_id_index`(`user_id` ASC) USING BTREE,
  INDEX `sessions_last_activity_index`(`last_activity` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sessions
-- ----------------------------
INSERT INTO `sessions` VALUES ('stpc72Dc3QX75A0lHoOjA6nw0GQeGETafT8xT1SG', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36 Edg/149.0.0.0', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiNXhlVzBUbGxBeFprSXlnZ0J4ZzllcUlkOWp6TE02aEd5WHF5UU5JdiI7czozOiJ1cmwiO2E6MDp7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjMyOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYWRtaW4vdGFzayI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjE7fQ==', 1782792124);

-- ----------------------------
-- Table structure for skills
-- ----------------------------
DROP TABLE IF EXISTS `skills`;
CREATE TABLE `skills`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `percentage` int NOT NULL DEFAULT 0,
  `level` enum('beginner','intermediate','advanced') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'beginner',
  `status` enum('draft','published') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'published',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of skills
-- ----------------------------
INSERT INTO `skills` VALUES (1, 'Laravel', 'ti ti-brand-laravel', 85, 'intermediate', 'published', '2026-06-30 03:57:52', '2026-06-30 03:57:52');
INSERT INTO `skills` VALUES (2, 'PHP', 'ti ti-brand-php', 90, 'advanced', 'published', '2026-06-30 03:57:52', '2026-06-30 03:57:52');
INSERT INTO `skills` VALUES (3, 'ReactJS', 'ti ti-brand-react', 70, 'intermediate', 'published', '2026-06-30 03:57:52', '2026-06-30 03:57:52');
INSERT INTO `skills` VALUES (4, 'MySQL', 'ti ti-database', 80, 'intermediate', 'published', '2026-06-30 03:57:52', '2026-06-30 03:57:52');
INSERT INTO `skills` VALUES (5, 'HTML & CSS', 'ti ti-brand-html5', 95, 'advanced', 'published', '2026-06-30 03:57:52', '2026-06-30 03:57:52');
INSERT INTO `skills` VALUES (6, 'Python', 'ti ti-brand-python', 45, 'beginner', 'draft', '2026-06-30 03:57:52', '2026-06-30 03:57:52');

-- ----------------------------
-- Table structure for tasks
-- ----------------------------
DROP TABLE IF EXISTS `tasks`;
CREATE TABLE `tasks`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `file` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `gdrive_link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `type` enum('file','tanpa_file') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'tanpa_file',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `status` enum('belum','proses','selesai') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'belum',
  `priority` enum('rendah','sedang','tinggi') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'sedang',
  `deadline` date NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tasks
-- ----------------------------
INSERT INTO `tasks` VALUES (1, 'Setup Repository dan Environment Laravel', 'Melakukan inisialisasi git repository proyek portofolio, setup file .env, dan install dependensi awal.', NULL, NULL, 'tanpa_file', 1, 'selesai', 'tinggi', '2026-07-02', '2026-06-30 03:57:52', '2026-06-30 03:57:52');
INSERT INTO `tasks` VALUES (2, 'Slicing Landing Page Portofolio', 'Mengubah desain Figma landing page ke dalam komponen Blade Laravel menggunakan Bootstrap.', 'panduan_slicing_v1.pdf', 'https://drive.google.com/file/d/EXAMPLE_SLICE/view', 'file', 1, 'proses', 'tinggi', '2026-07-05', '2026-06-30 03:57:52', '2026-06-30 03:57:52');
INSERT INTO `tasks` VALUES (3, 'Membuat CRUD Fitur Skill Admin', 'Membuat backend controller, request validation, dan view untuk manajemen data Skill.', NULL, NULL, 'tanpa_file', 1, 'proses', 'sedang', '2026-07-07', '2026-06-30 03:57:52', '2026-06-30 03:57:52');
INSERT INTO `tasks` VALUES (4, 'Integrasi Payment Gateway', 'Menghubungkan sistem checkout web dengan sandbox Midtrans.', 'dokumentasi_api_midtrans.pdf', 'https://drive.google.com/file/d/EXAMPLE_MIDTRANS/view', 'file', 0, 'belum', 'tinggi', '2026-07-14', '2026-06-30 03:57:52', '2026-06-30 03:57:52');
INSERT INTO `tasks` VALUES (5, 'Optimasi Query Database Dashboard', 'Memperbaiki query yang lambat menggunakan eager loading untuk menghindari N+1 problem.', NULL, NULL, 'tanpa_file', 1, 'belum', 'rendah', '2026-07-10', '2026-06-30 03:57:52', '2026-06-30 03:57:52');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `profession` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `photo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `bio` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `github` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `linkedin` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `instagram` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `users_email_unique`(`email` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'Admin Yashfi', 'admin@gmail.com', '2026-06-30 03:57:52', '$2y$12$h3tzT9FF/khKxvGBTUNSSedmIHJFUh9oaopatL12mbTEaBuI6GZte', 'Fullstack Web Developer', '081234567890', 'Bandung, Indonesia', 'uploads/profiles/1782792086_WhatsApp Image 2026-05-17 at 22.10.46 (1).jpeg', 'Seorang developer yang antusias dengan Laravel, Tailwind CSS, dan ekosistem modern web development.', 'https://github.com/yashfimahadi', 'https://linkedin.com/in/yashfi', 'https://instagram.com/yashfi2606', NULL, '2026-06-30 03:57:52', '2026-06-30 04:01:48');

SET FOREIGN_KEY_CHECKS = 1;
