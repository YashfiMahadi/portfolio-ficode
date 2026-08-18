package com.portfolio.app.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

/**
 * Education Entity - Menyimpan data riwayat pendidikan
 * Konsep OOP: Encapsulation, Entity
 */
@Entity
@Table(name = "educations")
public class Education {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nama institusi tidak boleh kosong")
    @Column(name = "nama_institusi", nullable = false) // Sesuaikan
    private String namaInstitusi; // Nama sekolah/universitas

    @NotBlank(message = "Jurusan tidak boleh kosong")
    @Column(nullable = false)
    private String jurusan;

    @Column(name = "jenjang")
    private String jenjang; // SD, SMP, SMA, D3, S1, S2, S3

    @Column(name = "tanggal_mulai") // Sesuaikan
    private String tanggalMulai;

    @Column(name = "tanggal_selesai") // Sesuaikan
    private String tanggalSelesai;

    @Column(name = "ipk")
    private Double ipk; // untuk universitas

    @Column(name = "deskripsi", length = 500)
    private String deskripsi;

    @Column(name = "lokasi")
    private String lokasi;

    // ===== Constructor =====
    public Education() {}

    public Education(String namaInstitusi, String jurusan, String jenjang) {
        this.namaInstitusi = namaInstitusi;
        this.jurusan = jurusan;
        this.jenjang = jenjang;
    }

    // ===== Getter & Setter =====
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNamaInstitusi() { return namaInstitusi; }
    public void setNamaInstitusi(String namaInstitusi) { this.namaInstitusi = namaInstitusi; }

    public String getJurusan() { return jurusan; }
    public void setJurusan(String jurusan) { this.jurusan = jurusan; }

    public String getJenjang() { return jenjang; }
    public void setJenjang(String jenjang) { this.jenjang = jenjang; }

    public String getTanggalMulai() { return tanggalMulai; }
    public void setTanggalMulai(String tanggalMulai) { this.tanggalMulai = tanggalMulai; }

    public String getTanggalSelesai() { return tanggalSelesai; }
    public void setTanggalSelesai(String tanggalSelesai) { this.tanggalSelesai = tanggalSelesai; }

    public Double getIpk() { return ipk; }
    public void setIpk(Double ipk) { this.ipk = ipk; }

    public String getDeskripsi() { return deskripsi; }
    public void setDeskripsi(String deskripsi) { this.deskripsi = deskripsi; }

    public String getLokasi() { return lokasi; }
    public void setLokasi(String lokasi) { this.lokasi = lokasi; }

    @Override
    public String toString() {
        return "Education{id=" + id + ", institusi='" + namaInstitusi + "', jenjang='" + jenjang + "'}";
    }
}
