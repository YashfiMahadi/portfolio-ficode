# 💼 Portfolio CV Digital

Platform manajemen portfolio dan CV digital berbasis web yang dibangun menggunakan **Spring Boot** (Backend) dan **Next.js** (Frontend), terhubung ke database **MySQL**.

---

## 📋 Deskripsi

Aplikasi Portfolio CV Digital memungkinkan pengguna untuk mengelola data portfolio pribadi melalui dashboard admin yang dilindungi autentikasi, serta menampilkannya ke publik melalui halaman landing page yang dapat dibagikan kepada recruiter atau klien.

---

## ✨ Fitur

- 🔐 **Login & Autentikasi** — enkripsi password BCrypt, session management
- 📊 **Dashboard Grafik** — Bar Chart, Radar Chart, Donut Chart (ApexCharts)
- 👤 **Kelola Profil** — biodata lengkap + upload foto profil
- ⚡ **Kelola Skill** — level persentase, kategori, statistik
- 💼 **Kelola Pengalaman Kerja** — timeline, jenis kerja
- 🎓 **Kelola Pendidikan** — jenjang, IPK, sorting otomatis
- 🚀 **Kelola Proyek** — thumbnail upload, link GitHub/Demo
- 🏆 **Kelola Sertifikasi** — link verifikasi, tanggal kadaluarsa
- 🌐 **Landing Page Publik** — tampilan portfolio tanpa login
- 📁 **Upload Foto** — foto profil dan thumbnail proyek

---

## 🛠️ Teknologi

### Backend
| Teknologi | Versi | Keterangan |
|-----------|-------|-----------|
| Java | 17 | Bahasa pemrograman utama |
| Spring Boot | 3.2.5 | Framework backend |
| Maven | 3.x | Build tool |
| Spring Data JPA | - | ORM database |
| MySQL | 8.x | Database |
| BCrypt | - | Enkripsi password |

### Frontend
| Teknologi | Versi | Keterangan |
|-----------|-------|-----------|
| Next.js | 14 | React framework |
| TypeScript | 5.x | Typed JavaScript |
| Tailwind CSS | 3.x | CSS framework |
| ApexCharts | - | Library grafik |
| TailAdmin | - | Template dashboard |

---

## 📁 Struktur Project

```
portfolio/
├── backend/                          # Spring Boot Backend
│   ├── src/main/java/com/portfolio/app/
│   │   ├── config/
│   │   │   └── CorsConfig.java
│   │   ├── controller/
│   │   │   ├── AuthController.java
│   │   │   ├── ProfileController.java
│   │   │   ├── SkillController.java
│   │   │   ├── ExperienceController.java
│   │   │   ├── EducationController.java
│   │   │   ├── ProjectController.java
│   │   │   ├── CertificationController.java
│   │   │   └── FileUploadController.java
│   │   ├── entity/
│   │   │   ├── User.java
│   │   │   ├── Profile.java
│   │   │   ├── Skill.java
│   │   │   ├── Experience.java
│   │   │   ├── Education.java
│   │   │   ├── Project.java
│   │   │   └── Certification.java
│   │   ├── repository/
│   │   │   ├── UserRepository.java
│   │   │   ├── ProfileRepository.java
│   │   │   ├── SkillRepository.java
│   │   │   ├── ExperienceRepository.java
│   │   │   ├── EducationRepository.java
│   │   │   ├── ProjectRepository.java
│   │   │   └── CertificationRepository.java
│   │   ├── service/
│   │   │   ├── AuthService.java
│   │   │   ├── ProfileService.java
│   │   │   ├── SkillService.java
│   │   │   ├── ExperienceService.java
│   │   │   ├── EducationService.java
│   │   │   ├── ProjectService.java
│   │   │   └── CertificationService.java
│   │   └── PortfolioApplication.java
│   ├── src/main/resources/
│   │   └── application.properties
│   ├── uploads/photos/               # Folder foto upload
│   ├── database.sql                  # Script database
│   └── pom.xml
│
└── frontend/                         # Next.js Frontend
    ├── src/
    │   ├── app/
    │   │   ├── (admin)/
    │   │   │   ├── page.tsx          # Dashboard
    │   │   │   ├── layout.tsx        # Auth guard
    │   │   │   └── (others-pages)/portfolio/
    │   │   │       ├── profile/
    │   │   │       ├── skills/
    │   │   │       ├── experience/
    │   │   │       ├── education/
    │   │   │       ├── projects/
    │   │   │       └── certifications/
    │   │   ├── (full-width-pages)/(auth)/signin/
    │   │   ├── (landing)/cv/         # Landing page publik
    │   │   └── page.tsx              # Root redirect
    │   ├── components/
    │   │   ├── portfolio/
    │   │   │   └── PortfolioDashboard.tsx
    │   │   ├── landing/
    │   │   │   ├── Navbar.tsx
    │   │   │   └── Footer.tsx
    │   │   └── header/
    │   │       └── UserDropdown.tsx
    │   ├── layout/
    │   │   ├── AppHeader.tsx
    │   │   └── AppSidebar.tsx
    │   └── lib/
    │       ├── api.ts                # Service layer API
    │       └── auth.ts               # Autentikasi
    ├── .env.local                    # Environment variables
    ├── next.config.ts
    └── package.json
```

---

## ⚙️ Cara Menjalankan

### Prasyarat
- Java 17
- Node.js 18+
- XAMPP (MySQL)
- VS Code

---

### 1. Setup Database

Buka XAMPP → Start **Apache** dan **MySQL**

Buka `http://localhost/phpmyadmin` → tab **SQL** → jalankan:

```sql
CREATE DATABASE portfolio_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

---

### 2. Jalankan Backend

```bash
cd backend
mvn spring-boot:run
```

Backend berjalan di `http://localhost:8080`

> Saat pertama kali dijalankan, tabel otomatis dibuat dan user default `admin/admin123` dibuat di database.

---

### 3. Jalankan Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend berjalan di `http://localhost:3000`

---

### 4. Akses Aplikasi

| URL | Keterangan |
|-----|-----------|
| `http://localhost:3000` | Redirect ke landing page |
| `http://localhost:3000/cv` | Landing page publik |
| `http://localhost:3000/signin` | Halaman login |
| `http://localhost:3000/dashboard` | Dashboard admin |

**Kredensial Login:**
```
Username : admin
Password : admin123
```

---

## 🌐 Akses dari Perangkat Lain (HP/Tablet)

1. Pastikan perangkat tersambung WiFi yang sama
2. Cari IP laptop: `ipconfig` (Windows) → lihat IPv4
3. Update `.env.local`:
```
NEXT_PUBLIC_API_URL=http://[IP_LAPTOP]:8080/api
```
4. Jalankan frontend:
```bash
npm run dev -- --hostname 0.0.0.0
```
5. Akses dari HP: `http://[IP_LAPTOP]:3000/cv`

---

## 📡 Daftar Endpoint API

### Auth
| Method | Endpoint | Keterangan |
|--------|----------|-----------|
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/register` | Register |

### Profile
| Method | Endpoint | Keterangan |
|--------|----------|-----------|
| GET | `/api/profiles` | Semua profil |
| GET | `/api/profiles/me/{userId}` | Profil user login |
| PUT | `/api/profiles/me/{userId}` | Update profil |

### Skill
| Method | Endpoint | Keterangan |
|--------|----------|-----------|
| GET | `/api/skills` | Semua skill |
| GET | `/api/skills/statistik` | Statistik per kategori |
| GET | `/api/skills/kategori-list` | Daftar kategori |
| POST | `/api/skills` | Tambah skill |
| PUT | `/api/skills/{id}` | Update skill |
| DELETE | `/api/skills/{id}` | Hapus skill |

### Experience
| Method | Endpoint | Keterangan |
|--------|----------|-----------|
| GET | `/api/experiences` | Semua pengalaman |
| POST | `/api/experiences` | Tambah |
| PUT | `/api/experiences/{id}` | Update |
| DELETE | `/api/experiences/{id}` | Hapus |

### Education
| Method | Endpoint | Keterangan |
|--------|----------|-----------|
| GET | `/api/educations` | Semua pendidikan |
| POST | `/api/educations` | Tambah |
| PUT | `/api/educations/{id}` | Update |
| DELETE | `/api/educations/{id}` | Hapus |

### Project
| Method | Endpoint | Keterangan |
|--------|----------|-----------|
| GET | `/api/projects` | Semua proyek |
| GET | `/api/projects/cari?keyword=` | Cari proyek |
| GET | `/api/projects/statistik` | Statistik kategori |
| POST | `/api/projects` | Tambah |
| PUT | `/api/projects/{id}` | Update |
| DELETE | `/api/projects/{id}` | Hapus |

### Certification
| Method | Endpoint | Keterangan |
|--------|----------|-----------|
| GET | `/api/certifications` | Semua sertifikasi |
| POST | `/api/certifications` | Tambah |
| PUT | `/api/certifications/{id}` | Update |
| DELETE | `/api/certifications/{id}` | Hapus |

### Upload
| Method | Endpoint | Keterangan |
|--------|----------|-----------|
| POST | `/api/upload/photo` | Upload foto/thumbnail |

---

## 🧠 Konsep yang Diimplementasikan

| No | Konsep | Implementasi |
|----|--------|-------------|
| 1 | OOP (Encapsulation) | Entity class dengan private field + getter/setter |
| 2 | Collection Framework | List, Map, Set di semua Service class |
| 3 | Lambda Expression | `.filter()`, `.map()`, `.sorted()` di Service class |
| 4 | Stream API | `stream().filter().collect()` di semua Service |
| 5 | RESTful API | @RestController dengan GET/POST/PUT/DELETE |
| 6 | Spring Boot | Framework utama dengan auto-configuration |
| 7 | JPA Repository | Extend JpaRepository + custom query method |
| 8 | Database MySQL | 7 tabel di portfolio_db |
| 9 | Integrasi FE-BE | Next.js ↔ Spring Boot via REST API + CORS |

---

## 👤 Developer

**Yashfi Mahadi**
NIM: 23110256 | Kelas: G2023

Program Studi Teknik Informatika
STMIK Mardira Indonesia — 2026
