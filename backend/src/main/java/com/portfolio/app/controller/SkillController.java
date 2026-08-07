package com.portfolio.app.controller;

import com.portfolio.app.entity.Skill;
import com.portfolio.app.service.SkillService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * SkillController - REST API Controller untuk Skill
 *
 * Endpoint:
 * GET    /api/skills                  - Semua skill (urut level tertinggi)
 * GET    /api/skills/{id}             - Skill by ID
 * GET    /api/skills/kategori/{kat}   - Skill by kategori
 * GET    /api/skills/statistik        - Jumlah skill per kategori (Map)
 * GET    /api/skills/kategori-list    - Daftar kategori unik (Set)
 * GET    /api/skills/rata-rata        - Rata-rata level skill
 * POST   /api/skills                  - Tambah skill
 * PUT    /api/skills/{id}             - Update skill
 * DELETE /api/skills/{id}             - Hapus skill
 */
@RestController
@RequestMapping("/api/skills")
@CrossOrigin(origins = "*")
public class SkillController {

    @Autowired
    private SkillService skillService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllSkills() {
        List<Skill> skills = skillService.ambilSemuaSkill();
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("data", skills);
        response.put("total", skills.size());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getSkillById(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        return skillService.ambilSkillById(id)
                .map(skill -> {
                    response.put("status", "success");
                    response.put("data", skill);
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    response.put("status", "error");
                    response.put("pesan", "Skill dengan ID " + id + " tidak ditemukan");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
                });
    }

    @GetMapping("/kategori/{kategori}")
    public ResponseEntity<Map<String, Object>> getSkillByKategori(@PathVariable String kategori) {
        List<Skill> skills = skillService.ambilSkillByKategori(kategori);
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("data", skills);
        response.put("total", skills.size());
        return ResponseEntity.ok(response);
    }

    // Statistik jumlah skill per kategori - menggunakan Collection Framework (Map)
    @GetMapping("/statistik")
    public ResponseEntity<Map<String, Object>> getStatistikSkill() {
        Map<String, Long> statistik = skillService.statistikSkillPerKategori();
        double rataRata = skillService.rataRataLevel();
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("skillPerKategori", statistik);     // Map<String, Long>
        response.put("rataRataLevel", rataRata);
        return ResponseEntity.ok(response);
    }

    // Daftar kategori unik - menggunakan Collection Framework (Set)
    @GetMapping("/kategori-list")
    public ResponseEntity<Map<String, Object>> getKategoriList() {
        Set<String> kategoriList = skillService.ambilKategoriUnik();
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("data", kategoriList);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createSkill(@Valid @RequestBody Skill skill) {
        Skill skillBaru = skillService.tambahSkill(skill);
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("pesan", "Skill berhasil ditambahkan");
        response.put("data", skillBaru);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateSkill(@PathVariable Long id,
                                                            @Valid @RequestBody Skill skill) {
        Map<String, Object> response = new HashMap<>();
        return skillService.updateSkill(id, skill)
                .map(updated -> {
                    response.put("status", "success");
                    response.put("pesan", "Skill berhasil diupdate");
                    response.put("data", updated);
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    response.put("status", "error");
                    response.put("pesan", "Skill dengan ID " + id + " tidak ditemukan");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
                });
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteSkill(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        if (skillService.hapusSkill(id)) {
            response.put("status", "success");
            response.put("pesan", "Skill berhasil dihapus");
            return ResponseEntity.ok(response);
        } else {
            response.put("status", "error");
            response.put("pesan", "Skill dengan ID " + id + " tidak ditemukan");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
}
