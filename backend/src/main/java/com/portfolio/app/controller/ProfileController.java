package com.portfolio.app.controller;

import com.portfolio.app.entity.Profile;
import com.portfolio.app.service.ProfileService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * ProfileController - REST API Controller untuk Profile
 *
 * Endpoint:
 * GET    /api/profiles        - Ambil semua profil
 * GET    /api/profiles/public - Ambil profil admin (buat halaman publik, tanpa login)
 * GET    /api/profiles/{id}   - Ambil profil by ID
 * POST   /api/profiles        - Tambah profil baru
 * PUT    /api/profiles/{id}   - Update profil
 * DELETE /api/profiles/{id}   - Hapus profil
 */
@RestController
@RequestMapping("/api/profiles")
@CrossOrigin(origins = "*")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    // GET semua profil
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllProfiles() {
        List<Profile> profiles = profileService.ambilSemuaProfile();
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("data", profiles);
        response.put("total", profiles.size());
        return ResponseEntity.ok(response);
    }

    // GET profile milik admin (pemilik portfolio) -> dipakai halaman publik
    // seperti /cv yang tidak ada konteks user login. Dicari lewat username
    // "admin", BUKAN nebak angka userId (karena bisa beda-beda tiap instalasi).
    @GetMapping("/public")
    public ResponseEntity<Map<String, Object>> getPublicProfile() {
        Map<String, Object> response = new HashMap<>();
        return profileService.ambilProfileAdmin()
                .map(profile -> {
                    response.put("status", "success");
                    response.put("data", profile);
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    response.put("status", "empty");
                    response.put("pesan", "Profile admin belum dibuat");
                    return ResponseEntity.ok(response);
                });
    }

    // GET profil by ID
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getProfileById(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        return profileService.ambilProfileById(id)
                .map(profile -> {
                    response.put("status", "success");
                    response.put("data", profile);
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    response.put("status", "error");
                    response.put("pesan", "Profil dengan ID " + id + " tidak ditemukan");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
                });
    }

    // PUT update profil
    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateProfile(@PathVariable Long id,
                                                              @Valid @RequestBody Profile profile) {
        Map<String, Object> response = new HashMap<>();
        return profileService.updateProfile(id, profile)
                .map(updated -> {
                    response.put("status", "success");
                    response.put("pesan", "Profil berhasil diupdate");
                    response.put("data", updated);
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    response.put("status", "error");
                    response.put("pesan", "Profil dengan ID " + id + " tidak ditemukan");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
                });
    }

    // GET profile milik user yang login
    @GetMapping("/me/{userId}")
    public ResponseEntity<Map<String, Object>> getMyProfile(@PathVariable Long userId) {
        Map<String, Object> response = new HashMap<>();
        return profileService.ambilProfileByUserId(userId)
                .map(profile -> {
                    response.put("status", "success");
                    response.put("data", profile);
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    response.put("status", "empty");
                    response.put("pesan", "Profile belum dibuat");
                    return ResponseEntity.ok(response);
                });
    }

    // PUT update profile milik user yang login
    @PutMapping("/me/{userId}")
    public ResponseEntity<Map<String, Object>> updateMyProfile(@PathVariable Long userId,
                                                                @RequestBody Profile profile) {
        Profile updated = profileService.simpanAtauUpdateProfileByUserId(userId, profile);
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("pesan", "Profile berhasil disimpan");
        response.put("data", updated);
        return ResponseEntity.ok(response);
    }
}
