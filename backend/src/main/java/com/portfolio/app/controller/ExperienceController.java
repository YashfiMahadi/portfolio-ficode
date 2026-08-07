package com.portfolio.app.controller;

import com.portfolio.app.entity.Experience;
import com.portfolio.app.service.ExperienceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * ExperienceController - REST API untuk Pengalaman Kerja
 *
 * GET    /api/experiences
 * GET    /api/experiences/{id}
 * GET    /api/experiences/jenis/{jenisKerja}
 * POST   /api/experiences
 * PUT    /api/experiences/{id}
 * DELETE /api/experiences/{id}
 */
@RestController
@RequestMapping("/api/experiences")
@CrossOrigin(origins = "*")
public class ExperienceController {

    @Autowired
    private ExperienceService experienceService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAll() {
        List<Experience> data = experienceService.ambilSemuaExperience();
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("data", data);
        response.put("total", data.size());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getById(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        return experienceService.ambilExperienceById(id)
                .map(exp -> {
                    response.put("status", "success");
                    response.put("data", exp);
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    response.put("status", "error");
                    response.put("pesan", "Experience ID " + id + " tidak ditemukan");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
                });
    }

    @GetMapping("/jenis/{jenisKerja}")
    public ResponseEntity<Map<String, Object>> getByJenisKerja(@PathVariable String jenisKerja) {
        List<Experience> data = experienceService.ambilByJenisKerja(jenisKerja);
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("data", data);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> create(@Valid @RequestBody Experience experience) {
        Experience baru = experienceService.tambahExperience(experience);
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("pesan", "Pengalaman kerja berhasil ditambahkan");
        response.put("data", baru);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> update(@PathVariable Long id,
                                                       @Valid @RequestBody Experience experience) {
        Map<String, Object> response = new HashMap<>();
        return experienceService.updateExperience(id, experience)
                .map(updated -> {
                    response.put("status", "success");
                    response.put("pesan", "Pengalaman kerja berhasil diupdate");
                    response.put("data", updated);
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    response.put("status", "error");
                    response.put("pesan", "Experience ID " + id + " tidak ditemukan");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
                });
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        if (experienceService.hapusExperience(id)) {
            response.put("status", "success");
            response.put("pesan", "Pengalaman kerja berhasil dihapus");
            return ResponseEntity.ok(response);
        }
        response.put("status", "error");
        response.put("pesan", "Experience ID " + id + " tidak ditemukan");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }
}
