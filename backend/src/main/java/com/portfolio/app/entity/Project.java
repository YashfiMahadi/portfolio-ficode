package com.portfolio.app.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

/**
 * Project Entity - Menyimpan data proyek yang pernah dikerjakan
 * Konsep OOP: Encapsulation, Entity
 */
@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nama proyek tidak boleh kosong")
    @Column(name = "nama_proyek", nullable = false) // Sesuaikan
    private String namaProyek;

    @Column(name = "deskripsi", length = 1000)
    private String deskripsi;

    @Column(name = "teknologi_digunakan") // Sesuaikan
    private String teknologiDigunakan; // contoh: "Java, Spring Boot, MySQL, React"

    @Column(name = "tanggal_mulai") // Sesuaikan
    private String tanggalMulai;

    @Column(name = "tanggal_selesai") // Sesuaikan
    private String tanggalSelesai;

    @Column(name = "link_github") // Sesuaikan
    private String linkGithub;

    @Column(name = "link_demo") // Sesuaikan
    private String linkDemo;

    @Column(name = "gambar_url") // Sesuaikan
    private String gambarUrl;

    @Column(name = "kategori")
    private String kategori; // Web, Mobile, Desktop, Data Science, dll

    @Column(name = "status_proyek") // Sesuaikan
    private String statusProyek; // Selesai, Dalam Pengerjaan, Ditangguhkan

    // ===== Constructor =====
    public Project() {}

    public Project(String namaProyek, String deskripsi, String teknologiDigunakan) {
        this.namaProyek = namaProyek;
        this.deskripsi = deskripsi;
        this.teknologiDigunakan = teknologiDigunakan;
    }

    // ===== Getter & Setter =====
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNamaProyek() { return namaProyek; }
    public void setNamaProyek(String namaProyek) { this.namaProyek = namaProyek; }

    public String getDeskripsi() { return deskripsi; }
    public void setDeskripsi(String deskripsi) { this.deskripsi = deskripsi; }

    public String getTeknologiDigunakan() { return teknologiDigunakan; }
    public void setTeknologiDigunakan(String teknologiDigunakan) { this.teknologiDigunakan = teknologiDigunakan; }

    public String getTanggalMulai() { return tanggalMulai; }
    public void setTanggalMulai(String tanggalMulai) { this.tanggalMulai = tanggalMulai; }

    public String getTanggalSelesai() { return tanggalSelesai; }
    public void setTanggalSelesai(String tanggalSelesai) { this.tanggalSelesai = tanggalSelesai; }

    public String getLinkGithub() { return linkGithub; }
    public void setLinkGithub(String linkGithub) { this.linkGithub = linkGithub; }

    public String getLinkDemo() { return linkDemo; }
    public void setLinkDemo(String linkDemo) { this.linkDemo = linkDemo; }

    public String getGambarUrl() { return gambarUrl; }
    public void setGambarUrl(String gambarUrl) { this.gambarUrl = gambarUrl; }

    public String getKategori() { return kategori; }
    public void setKategori(String kategori) { this.kategori = kategori; }

    public String getStatusProyek() { return statusProyek; }
    public void setStatusProyek(String statusProyek) { this.statusProyek = statusProyek; }

    @Override
    public String toString() {
        return "Project{id=" + id + ", nama='" + namaProyek + "', status='" + statusProyek + "'}";
    }
}
