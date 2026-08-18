package com.portfolio.app.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/**
 * Profile Entity - Menyimpan data biodata/profil utama
 * Konsep OOP: Encapsulation (getter/setter), Entity class
 */
@Entity
@Table(name = "profiles")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @NotBlank(message = "Nama tidak boleh kosong")
    @Column(nullable = false)
    private String nama;

    @NotBlank(message = "Jabatan tidak boleh kosong")
    private String jabatan; // contoh: "Backend Developer"

    @Email(message = "Format email tidak valid")
    @Column(unique = true)
    private String email;

    private String telepon;
    private String alamat;
    private String kota;
    private String provinsi;

    @Column(name = "tentang_saya", length = 1000)
    private String tentangSaya; // ringkasan/deskripsi diri

    private String linkedIn;
    private String github;
    private String website;
    private String fotoUrl;

    // ===== Constructor =====
    public Profile() {}

    public Profile(String nama, String jabatan, String email) {
        this.nama = nama;
        this.jabatan = jabatan;
        this.email = email;
    }

    // ===== Getter & Setter (Encapsulation) =====
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getNama() { return nama; }
    public void setNama(String nama) { this.nama = nama; }

    public String getJabatan() { return jabatan; }
    public void setJabatan(String jabatan) { this.jabatan = jabatan; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTelepon() { return telepon; }
    public void setTelepon(String telepon) { this.telepon = telepon; }

    public String getAlamat() { return alamat; }
    public void setAlamat(String alamat) { this.alamat = alamat; }

    public String getKota() { return kota; }
    public void setKota(String kota) { this.kota = kota; }

    public String getProvinsi() { return provinsi; }
    public void setProvinsi(String provinsi) { this.provinsi = provinsi; }

    public String getTentangSaya() { return tentangSaya; }
    public void setTentangSaya(String tentangSaya) { this.tentangSaya = tentangSaya; }

    public String getLinkedIn() { return linkedIn; }
    public void setLinkedIn(String linkedIn) { this.linkedIn = linkedIn; }

    public String getGithub() { return github; }
    public void setGithub(String github) { this.github = github; }

    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }

    public String getFotoUrl() { return fotoUrl; }
    public void setFotoUrl(String fotoUrl) { this.fotoUrl = fotoUrl; }

    @Override
    public String toString() {
        return "Profile{id=" + id + ", nama='" + nama + "', email='" + email + "'}";
    }
}
