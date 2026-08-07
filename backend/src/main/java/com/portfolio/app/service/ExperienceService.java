package com.portfolio.app.service;

import com.portfolio.app.entity.Experience;
import com.portfolio.app.repository.ExperienceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * ExperienceService - Business logic untuk Experience
 * Implementasi: Lambda Expression, Stream API
 */
@Service
public class ExperienceService {

    @Autowired
    private ExperienceRepository experienceRepository;

    public Experience tambahExperience(Experience experience) {
        return experienceRepository.save(experience);
    }

    public List<Experience> ambilSemuaExperience() {
        // Stream API: filter yang masih aktif (tanggalSelesai = "Sekarang") ke atas
        List<Experience> semua = experienceRepository.findAll();
        List<Experience> aktif = semua.stream()
                .filter(e -> "Sekarang".equalsIgnoreCase(e.getTanggalSelesai())) // Lambda
                .collect(Collectors.toList());
        List<Experience> selesai = semua.stream()
                .filter(e -> !"Sekarang".equalsIgnoreCase(e.getTanggalSelesai())) // Lambda
                .collect(Collectors.toList());

        // Collection Framework: gabungkan (aktif di atas, lalu yang sudah selesai)
        aktif.addAll(selesai);
        return aktif;
    }

    public Optional<Experience> ambilExperienceById(Long id) {
        return experienceRepository.findById(id);
    }

    public List<Experience> ambilByJenisKerja(String jenisKerja) {
        return experienceRepository.findByJenisKerja(jenisKerja);
    }

    public Optional<Experience> updateExperience(Long id, Experience expBaru) {
        return experienceRepository.findById(id).map(exp -> {  // Lambda
            exp.setNamaPerusahaan(expBaru.getNamaPerusahaan());
            exp.setPosisi(expBaru.getPosisi());
            exp.setLokasiPerusahaan(expBaru.getLokasiPerusahaan());
            exp.setTanggalMulai(expBaru.getTanggalMulai());
            exp.setTanggalSelesai(expBaru.getTanggalSelesai());
            exp.setDeskripsi(expBaru.getDeskripsi());
            exp.setJenisKerja(expBaru.getJenisKerja());
            return experienceRepository.save(exp);
        });
    }

    public boolean hapusExperience(Long id) {
        if (experienceRepository.existsById(id)) {
            experienceRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
