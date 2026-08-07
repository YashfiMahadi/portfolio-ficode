package com.portfolio.app.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

/**
 * Skill Entity - Menyimpan data keahlian/kemampuan
 * Konsep OOP: Encapsulation, Entity dengan validasi
 */
@Entity
@Table(name = "skills")
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nama skill tidak boleh kosong")
    @Column(nullable = false)
    private String namaSkill; // contoh: "Java", "Spring Boot", "MySQL"

    private String kategori; // Backend, Frontend, Database, Tools, Soft Skill

    @Min(value = 0, message = "Level minimal 0")
    @Max(value = 100, message = "Level maksimal 100")
    private Integer levelPersen; // 0-100 persen kemampuan

    private String tingkat; // Pemula, Menengah, Mahir, Expert

    // ===== Constructor =====
    public Skill() {}

    public Skill(String namaSkill, String kategori, Integer levelPersen) {
        this.namaSkill = namaSkill;
        this.kategori = kategori;
        this.levelPersen = levelPersen;
    }

    // ===== Getter & Setter =====
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNamaSkill() { return namaSkill; }
    public void setNamaSkill(String namaSkill) { this.namaSkill = namaSkill; }

    public String getKategori() { return kategori; }
    public void setKategori(String kategori) { this.kategori = kategori; }

    public Integer getLevelPersen() { return levelPersen; }
    public void setLevelPersen(Integer levelPersen) { this.levelPersen = levelPersen; }

    public String getTingkat() { return tingkat; }
    public void setTingkat(String tingkat) { this.tingkat = tingkat; }

    @Override
    public String toString() {
        return "Skill{id=" + id + ", nama='" + namaSkill + "', level=" + levelPersen + "%}";
    }
}
