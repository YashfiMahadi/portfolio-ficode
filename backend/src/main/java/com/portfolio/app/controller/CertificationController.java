package com.portfolio.app.controller;

import com.portfolio.app.entity.Certification;
import com.portfolio.app.service.CertificationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * CertificationController - REST API untuk Sertifikasi
 */
@RestController
@RequestMapping("/api/certifications")
@CrossOrigin(origins = "*")
public class CertificationController {

    @Autowired
    private CertificationService certificationService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAll() {
        List<Certification> data = certificationService.ambilSemuaCertification();
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("data", data);
        response.put("total", data.size());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getById(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        return certificationService.ambilCertificationById(id)
                .map(cert -> {
                    response.put("status", "success");
                    response.put("data", cert);
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    response.put("status", "error");
                    response.put("pesan", "Sertifikasi ID " + id + " tidak ditemukan");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
                });
    }

    @GetMapping("/penerbit/{penerbit}")
    public ResponseEntity<Map<String, Object>> getByPenerbit(@PathVariable String penerbit) {
        List<Certification> data = certificationService.ambilByPenerbit(penerbit);
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("data", data);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> create(@Valid @RequestBody Certification certification) {
        Certification baru = certificationService.tambahCertification(certification);
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("pesan", "Sertifikasi berhasil ditambahkan");
        response.put("data", baru);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> update(@PathVariable Long id,
                                                       @Valid @RequestBody Certification certification) {
        Map<String, Object> response = new HashMap<>();
        return certificationService.updateCertification(id, certification)
                .map(updated -> {
                    response.put("status", "success");
                    response.put("pesan", "Sertifikasi berhasil diupdate");
                    response.put("data", updated);
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    response.put("status", "error");
                    response.put("pesan", "Sertifikasi ID " + id + " tidak ditemukan");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
                });
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        if (certificationService.hapusCertification(id)) {
            response.put("status", "success");
            response.put("pesan", "Sertifikasi berhasil dihapus");
            return ResponseEntity.ok(response);
        }
        response.put("status", "error");
        response.put("pesan", "Sertifikasi ID " + id + " tidak ditemukan");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }
}
