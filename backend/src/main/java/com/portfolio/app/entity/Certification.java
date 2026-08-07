package com.portfolio.app.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

/**
 * Certification Entity - Menyimpan data sertifikat/sertifikasi
 * Konsep OOP: Encapsulation, Entity
 */
@Entity
@Table(name = "certifications")
public class Certification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nama sertifikat tidak boleh kosong")
    @Column(nullable = false)
    private String namaSertifikat;

    @NotBlank(message = "Penerbit tidak boleh kosong")
    private String penerbit; // contoh: "Oracle", "Google", "Udemy"

    private String tanggalTerbit;
    private String tanggalKadaluarsa; // opsional, bisa null jika tidak kadaluarsa

    private String nomorSertifikat;
    private String linkSertifikat; // link verifikasi online

    private String kategori; // Programming, Cloud, Database, Design, dll

    // ===== Constructor =====
    public Certification() {}

    public Certification(String namaSertifikat, String penerbit, String tanggalTerbit) {
        this.namaSertifikat = namaSertifikat;
        this.penerbit = penerbit;
        this.tanggalTerbit = tanggalTerbit;
    }

    // ===== Getter & Setter =====
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNamaSertifikat() { return namaSertifikat; }
    public void setNamaSertifikat(String namaSertifikat) { this.namaSertifikat = namaSertifikat; }

    public String getPenerbit() { return penerbit; }
    public void setPenerbit(String penerbit) { this.penerbit = penerbit; }

    public String getTanggalTerbit() { return tanggalTerbit; }
    public void setTanggalTerbit(String tanggalTerbit) { this.tanggalTerbit = tanggalTerbit; }

    public String getTanggalKadaluarsa() { return tanggalKadaluarsa; }
    public void setTanggalKadaluarsa(String tanggalKadaluarsa) { this.tanggalKadaluarsa = tanggalKadaluarsa; }

    public String getNomorSertifikat() { return nomorSertifikat; }
    public void setNomorSertifikat(String nomorSertifikat) { this.nomorSertifikat = nomorSertifikat; }

    public String getLinkSertifikat() { return linkSertifikat; }
    public void setLinkSertifikat(String linkSertifikat) { this.linkSertifikat = linkSertifikat; }

    public String getKategori() { return kategori; }
    public void setKategori(String kategori) { this.kategori = kategori; }

    @Override
    public String toString() {
        return "Certification{id=" + id + ", nama='" + namaSertifikat + "', penerbit='" + penerbit + "'}";
    }
}
