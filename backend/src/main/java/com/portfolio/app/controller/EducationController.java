package com.portfolio.app.controller;

import com.portfolio.app.entity.Education;
import com.portfolio.app.service.EducationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * EducationController - REST API untuk Riwayat Pendidikan
 */
@RestController
@RequestMapping("/api/educations")
@CrossOrigin(origins = "*")
public class EducationController {

    @Autowired
    private EducationService educationService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAll() {
        List<Education> data = educationService.ambilSemuaEducation();
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("data", data);
        response.put("total", data.size());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getById(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        return educationService.ambilEducationById(id)
                .map(edu -> {
                    response.put("status", "success");
                    response.put("data", edu);
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    response.put("status", "error");
                    response.put("pesan", "Education ID " + id + " tidak ditemukan");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
                });
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> create(@Valid @RequestBody Education education) {
        Education baru = educationService.tambahEducation(education);
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("pesan", "Data pendidikan berhasil ditambahkan");
        response.put("data", baru);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> update(@PathVariable Long id,
                                                       @Valid @RequestBody Education education) {
        Map<String, Object> response = new HashMap<>();
        return educationService.updateEducation(id, education)
                .map(updated -> {
                    response.put("status", "success");
                    response.put("pesan", "Data pendidikan berhasil diupdate");
                    response.put("data", updated);
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    response.put("status", "error");
                    response.put("pesan", "Education ID " + id + " tidak ditemukan");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
                });
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        if (educationService.hapusEducation(id)) {
            response.put("status", "success");
            response.put("pesan", "Data pendidikan berhasil dihapus");
            return ResponseEntity.ok(response);
        }
        response.put("status", "error");
        response.put("pesan", "Education ID " + id + " tidak ditemukan");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }
}
