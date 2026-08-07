package com.portfolio.app.service;

import com.portfolio.app.entity.User;
import com.portfolio.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 * AuthService - Business logic untuk autentikasi
 *
 * Implementasi konsep:
 * - OOP: Service class
 * - Collection Framework: Map untuk response
 * - Lambda Expression: di method login
 */
@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    // Tambahkan BCryptPasswordEncoder
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // ===== LOGIN =====
    public Map<String, Object> login(String username, String password) {
        Map<String, Object> response = new HashMap<>(); // Collection Framework: Map

        // Lambda + Stream: cari user by username
        Optional<User> userOpt = userRepository.findByUsername(username);

        if (userOpt.isEmpty()) {
            response.put("status", "error");
            response.put("pesan", "Username tidak ditemukan");
            return response;
        }

        User user = userOpt.get();

        // Cek password dengan BCrypt
        if (!passwordEncoder.matches(password, user.getPassword())) {
            response.put("status", "error");
            response.put("pesan", "Password salah");
            return response;
        }

        // Login berhasil - buat response tanpa password
        Map<String, Object> userData = new HashMap<>(); // Collection Framework: Map
        userData.put("id", user.getId());
        userData.put("username", user.getUsername());
        userData.put("namaLengkap", user.getNamaLengkap());
        userData.put("role", user.getRole());

        response.put("status", "success");
        response.put("pesan", "Login berhasil");
        response.put("data", userData);
        return response;
    }

    // ===== Buat user default saat pertama kali jalan =====
    @Bean
    public CommandLineRunner buatUserDefault() {
        return args -> {
            // Lambda Expression: cek dan buat user default jika belum ada
            if (!userRepository.existsByUsername("admin")) {
                String encodedPassword = passwordEncoder.encode("admin123");
                User admin = new User("admin", encodedPassword, "Administrator", "ADMIN");
                userRepository.save(admin);
                System.out.println("✅ User default dibuat: admin / admin123");
            }
        };
    }
}