package com.portfolio.app.service;

import com.portfolio.app.entity.Skill;
import com.portfolio.app.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * SkillService - Business logic untuk Skill
 *
 * Implementasi konsep UAS:
 * - Lambda Expression
 * - Stream API
 * - Collection Framework (List, Map, Set)
 */
@Service
public class SkillService {

    @Autowired
    private SkillRepository skillRepository;

    // ===== CREATE =====
    public Skill tambahSkill(Skill skill) {
        // Otomatis tentukan tingkat berdasarkan level persen
        skill.setTingkat(enentukanTingkat(skill.getLevelPersen()));
        return skillRepository.save(skill);
    }

    // ===== READ ALL =====
    public List<Skill> ambilSemuaSkill() {
        // Stream API: urutkan berdasarkan level tertinggi
        return skillRepository.findAll()
                .stream()
                .sorted(Comparator.comparingInt(Skill::getLevelPersen).reversed()) // Lambda
                .collect(Collectors.toList());
    }

    // ===== READ BY ID =====
    public Optional<Skill> ambilSkillById(Long id) {
        return skillRepository.findById(id);
    }

    // ===== READ BY KATEGORI =====
    public List<Skill> ambilSkillByKategori(String kategori) {
        return skillRepository.findByKategori(kategori);
    }

    // ===== UPDATE =====
    public Optional<Skill> updateSkill(Long id, Skill skillBaru) {
        return skillRepository.findById(id).map(skill -> {    // Lambda Expression
            skill.setNamaSkill(skillBaru.getNamaSkill());
            skill.setKategori(skillBaru.getKategori());
            skill.setLevelPersen(skillBaru.getLevelPersen());
            skill.setTingkat(enentukanTingkat(skillBaru.getLevelPersen()));
            return skillRepository.save(skill);
        });
    }

    // ===== DELETE =====
    public boolean hapusSkill(Long id) {
        if (skillRepository.existsById(id)) {
            skillRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // ===== STATISTIK: Skill per kategori (Collection Framework: Map) =====
    public Map<String, Long> statistikSkillPerKategori() {
        List<Skill> semuaSkill = skillRepository.findAll();

        // Stream API + Lambda + Collection Framework (Map)
        return semuaSkill.stream()
                .filter(s -> s.getKategori() != null)              // Lambda filter
                .collect(Collectors.groupingBy(
                        Skill::getKategori,                        // Method reference
                        Collectors.counting()
                ));
    }

    // ===== Ambil nama kategori unik (Collection Framework: Set) =====
    public Set<String> ambilKategoriUnik() {
        // Stream API + Lambda + Set (tidak ada duplikat)
        return skillRepository.findAll()
                .stream()
                .map(Skill::getKategori)                           // Method reference
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());
    }

    // ===== Rata-rata level skill =====
    public double rataRataLevel() {
        return skillRepository.findAll()
                .stream()
                .mapToInt(Skill::getLevelPersen)                   // Method reference
                .average()
                .orElse(0.0);
    }

    // ===== Helper: tentukan tingkat berdasarkan persen =====
    private String enentukanTingkat(Integer persen) {
        if (persen == null) return "Pemula";
        if (persen >= 80) return "Expert";
        if (persen >= 60) return "Mahir";
        if (persen >= 40) return "Menengah";
        return "Pemula";
    }
}
