package com.portfolio.app.controller;

import com.portfolio.app.entity.Project;
import com.portfolio.app.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * ProjectController - REST API untuk Proyek
 *
 * GET    /api/projects
 * GET    /api/projects/{id}
 * GET    /api/projects/cari?keyword=xxx
 * GET    /api/projects/statistik
 * POST   /api/projects
 * PUT    /api/projects/{id}
 * DELETE /api/projects/{id}
 */
@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAll() {
        List<Project> data = projectService.ambilSemuaProject();
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("data", data);
        response.put("total", data.size());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getById(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        return projectService.ambilProjectById(id)
                .map(proj -> {
                    response.put("status", "success");
                    response.put("data", proj);
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    response.put("status", "error");
                    response.put("pesan", "Project ID " + id + " tidak ditemukan");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
                });
    }

    // Pencarian proyek menggunakan Stream API + Lambda
    @GetMapping("/cari")
    public ResponseEntity<Map<String, Object>> cariProject(@RequestParam String keyword) {
        List<Project> data = projectService.cariProject(keyword);
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("keyword", keyword);
        response.put("data", data);
        response.put("total", data.size());
        return ResponseEntity.ok(response);
    }

    // Statistik proyek per kategori
    @GetMapping("/statistik")
    public ResponseEntity<Map<String, Object>> statistik() {
        Map<String, Long> stat = projectService.statistikProjectPerKategori();
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("proyekPerKategori", stat);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> create(@Valid @RequestBody Project project) {
        Project baru = projectService.tambahProject(project);
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("pesan", "Proyek berhasil ditambahkan");
        response.put("data", baru);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> update(@PathVariable Long id,
                                                       @Valid @RequestBody Project project) {
        Map<String, Object> response = new HashMap<>();
        return projectService.updateProject(id, project)
                .map(updated -> {
                    response.put("status", "success");
                    response.put("pesan", "Proyek berhasil diupdate");
                    response.put("data", updated);
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    response.put("status", "error");
                    response.put("pesan", "Project ID " + id + " tidak ditemukan");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
                });
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            if (projectService.hapusProject(id)) {
                response.put("status", "success");
                response.put("pesan", "Proyek berhasil dihapus");
                return ResponseEntity.ok(response);
            }
            response.put("status", "error");
            response.put("pesan", "Project ID " + id + " tidak ditemukan");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } catch (Exception e) {
            response.put("status", "error");
            response.put("pesan", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
