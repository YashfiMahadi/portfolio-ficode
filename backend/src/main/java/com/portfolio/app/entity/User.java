package com.portfolio.app.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

/**
 * User Entity - Menyimpan data akun untuk login
 * Konsep OOP: Encapsulation, Entity
 */
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Username tidak boleh kosong")
    @Column(nullable = false, unique = true)
    private String username;

    @NotBlank(message = "Password tidak boleh kosong")
    @Column(nullable = false)
    private String password;

    @Column(name = "nama_lengkap") // Tambahkan ini
    private String namaLengkap;

    private String role; // ADMIN, USER

    // ===== Constructor =====
    public User() {}

    public User(String username, String password, String namaLengkap, String role) {
        this.username = username;
        this.password = password;
        this.namaLengkap = namaLengkap;
        this.role = role;
    }

    // ===== Getter & Setter =====
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getNamaLengkap() { return namaLengkap; }
    public void setNamaLengkap(String namaLengkap) { this.namaLengkap = namaLengkap; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    @Override
    public String toString() {
        return "User{id=" + id + ", username='" + username + "', role='" + role + "'}";
    }
}
