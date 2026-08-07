package com.portfolio.app.service;

import com.portfolio.app.entity.Education;
import com.portfolio.app.repository.EducationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * EducationService - Business logic untuk Education
 */
@Service
public class EducationService {

    @Autowired
    private EducationRepository educationRepository;

    public Education tambahEducation(Education education) {
        return educationRepository.save(education);
    }

    public List<Education> ambilSemuaEducation() {
        // Stream API: urutkan berdasarkan jenjang (S2 > S1 > D3 > SMA > SMP > SD)
        List<String> urutanJenjang = List.of("S2", "S1", "D3", "D4", "SMA", "SMK", "SMP", "SD");
        return educationRepository.findAll()
                .stream()
                .sorted(Comparator.comparingInt(e ->    // Lambda
                        urutanJenjang.contains(e.getJenjang())
                                ? urutanJenjang.indexOf(e.getJenjang())
                                : 99
                ))
                .collect(Collectors.toList());
    }

    public Optional<Education> ambilEducationById(Long id) {
        return educationRepository.findById(id);
    }

    public Optional<Education> updateEducation(Long id, Education eduBaru) {
        return educationRepository.findById(id).map(edu -> {   // Lambda
            edu.setNamaInstitusi(eduBaru.getNamaInstitusi());
            edu.setJurusan(eduBaru.getJurusan());
            edu.setJenjang(eduBaru.getJenjang());
            edu.setTanggalMulai(eduBaru.getTanggalMulai());
            edu.setTanggalSelesai(eduBaru.getTanggalSelesai());
            edu.setIpk(eduBaru.getIpk());
            edu.setDeskripsi(eduBaru.getDeskripsi());
            edu.setLokasi(eduBaru.getLokasi());
            return educationRepository.save(edu);
        });
    }

    public boolean hapusEducation(Long id) {
        if (educationRepository.existsById(id)) {
            educationRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
