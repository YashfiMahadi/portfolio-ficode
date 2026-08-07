package com.portfolio.app.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

/**
 * Experience Entity - Menyimpan data pengalaman kerja
 * Konsep OOP: Encapsulation, Relasi Entity
 */
@Entity
@Table(name = "experiences")
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nama perusahaan tidak boleh kosong")
    private String namaPerusahaan;

    @NotBlank(message = "Posisi/jabatan tidak boleh kosong")
    private String posisi;

    private String lokasiPerusahaan;
    private String tanggalMulai;  // format: "2022-01"
    private String tanggalSelesai; // format: "2024-06" atau "Sekarang"

    @Column(length = 1000)
    private String deskripsi;

    private String jenisKerja; // Full-time, Part-time, Freelance, Magang

    // ===== Constructor =====
    public Experience() {}

    public Experience(String namaPerusahaan, String posisi, String tanggalMulai) {
        this.namaPerusahaan = namaPerusahaan;
        this.posisi = posisi;
        this.tanggalMulai = tanggalMulai;
    }

    // ===== Getter & Setter =====
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNamaPerusahaan() { return namaPerusahaan; }
    public void setNamaPerusahaan(String namaPerusahaan) { this.namaPerusahaan = namaPerusahaan; }

    public String getPosisi() { return posisi; }
    public void setPosisi(String posisi) { this.posisi = posisi; }

    public String getLokasiPerusahaan() { return lokasiPerusahaan; }
    public void setLokasiPerusahaan(String lokasiPerusahaan) { this.lokasiPerusahaan = lokasiPerusahaan; }

    public String getTanggalMulai() { return tanggalMulai; }
    public void setTanggalMulai(String tanggalMulai) { this.tanggalMulai = tanggalMulai; }

    public String getTanggalSelesai() { return tanggalSelesai; }
    public void setTanggalSelesai(String tanggalSelesai) { this.tanggalSelesai = tanggalSelesai; }

    public String getDeskripsi() { return deskripsi; }
    public void setDeskripsi(String deskripsi) { this.deskripsi = deskripsi; }

    public String getJenisKerja() { return jenisKerja; }
    public void setJenisKerja(String jenisKerja) { this.jenisKerja = jenisKerja; }

    @Override
    public String toString() {
        return "Experience{id=" + id + ", perusahaan='" + namaPerusahaan + "', posisi='" + posisi + "'}";
    }
}
