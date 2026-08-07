# 📁 Portfolio CV Digital - Backend API
**UAS Pemrograman Java Lanjut | STMIK Mardira Indonesia**

---

## 🗂️ Struktur Project
```
portfolio-backend/
├── src/main/java/com/portfolio/app/
│   ├── PortfolioApplication.java       ← Main class
│   ├── config/
│   │   └── CorsConfig.java             ← Konfigurasi CORS
│   ├── entity/
│   │   ├── Profile.java                ← Biodata
│   │   ├── Experience.java             ← Pengalaman Kerja
│   │   ├── Education.java              ← Pendidikan
│   │   ├── Skill.java                  ← Keahlian
│   │   ├── Project.java                ← Proyek
│   │   └── Certification.java          ← Sertifikasi
│   ├── repository/
│   │   ├── ProfileRepository.java
│   │   ├── ExperienceRepository.java
│   │   ├── EducationRepository.java
│   │   ├── SkillRepository.java
│   │   ├── ProjectRepository.java
│   │   └── CertificationRepository.java
│   ├── service/
│   │   ├── ProfileService.java
│   │   ├── ExperienceService.java
│   │   ├── EducationService.java
│   │   ├── SkillService.java           ← Lambda + Stream + Collection
│   │   ├── ProjectService.java
│   │   └── CertificationService.java
│   └── controller/
│       ├── ProfileController.java
│       ├── ExperienceController.java
│       ├── EducationController.java
│       ├── SkillController.java
│       ├── ProjectController.java
│       └── CertificationController.java
├── src/main/resources/
│   └── application.properties          ← Konfigurasi DB
├── database.sql                        ← Script buat database
└── pom.xml                             ← Maven dependencies
```

---

## ⚙️ Cara Menjalankan

### 1. Siapkan Database (phpMyAdmin XAMPP)
- Buka XAMPP → Start **Apache** dan **MySQL**
- Buka browser: `http://localhost/phpmyadmin`
- Klik **SQL** → copy-paste isi file `database.sql` → klik **Go**

### 2. Buka Project di VS Code
```bash
code portfolio-backend
```

### 3. Jalankan Aplikasi
```bash
mvn spring-boot:run
```
atau klik **Run** pada file `PortfolioApplication.java`

### 4. Test API
Buka browser atau Postman:
- `http://localhost:8080/api/profiles`
- `http://localhost:8080/api/skills`
- `http://localhost:8080/api/projects`

---

## 📡 Daftar Endpoint REST API

### Profile (Biodata)
| Method | URL | Keterangan |
|--------|-----|-----------|
| GET | /api/profiles | Semua profil |
| GET | /api/profiles/{id} | Profil by ID |
| POST | /api/profiles | Tambah profil |
| PUT | /api/profiles/{id} | Update profil |
| DELETE | /api/profiles/{id} | Hapus profil |

### Skill (Keahlian)
| Method | URL | Keterangan |
|--------|-----|-----------|
| GET | /api/skills | Semua skill (urut level) |
| GET | /api/skills/statistik | Jumlah skill per kategori |
| GET | /api/skills/kategori-list | Daftar kategori unik |
| GET | /api/skills/kategori/{kat} | Filter by kategori |
| POST | /api/skills | Tambah skill |
| PUT | /api/skills/{id} | Update skill |
| DELETE | /api/skills/{id} | Hapus skill |

### Experience (Pengalaman Kerja)
| Method | URL | Keterangan |
|--------|-----|-----------|
| GET | /api/experiences | Semua (aktif duluan) |
| GET | /api/experiences/jenis/{jenis} | Filter jenis kerja |
| POST | /api/experiences | Tambah |
| PUT | /api/experiences/{id} | Update |
| DELETE | /api/experiences/{id} | Hapus |

### Education, Project, Certification
> Endpoint serupa: `/api/educations`, `/api/projects`, `/api/certifications`
> Project: GET `/api/projects/cari?keyword=xxx` dan `/api/projects/statistik`

---

## ✅ Konsep UAS yang Diimplementasikan

| No | Konsep | Implementasi |
|----|--------|-------------|
| 1 | OOP | Entity class, Service, Controller (Encapsulation, Abstraction) |
| 2 | Collection Framework | List, Map, Set di SkillService & ProjectService |
| 3 | Lambda Expression | `.map()`, `.filter()`, `.sorted()` di semua Service |
| 4 | Stream API | `stream().filter().collect()` di semua Service |
| 5 | RESTful API | @RestController, @GetMapping, @PostMapping, dll |
| 6 | Spring Boot | @SpringBootApplication, @Service, @Repository |
| 7 | JPA Repository | Extend JpaRepository, custom query methods |
| 8 | Database MySQL | MySQL via XAMPP, konfigurasi di application.properties |
| 9 | Integrasi FE-BE | CORS dikonfigurasi, API siap diakses frontend |
