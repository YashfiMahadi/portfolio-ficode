package com.portfolio.app.service;

import com.portfolio.app.entity.Certification;
import com.portfolio.app.repository.CertificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * CertificationService - Business logic untuk Certification
 */
@Service
public class CertificationService {

    @Autowired
    private CertificationRepository certificationRepository;

    public Certification tambahCertification(Certification certification) {
        return certificationRepository.save(certification);
    }

    public List<Certification> ambilSemuaCertification() {
        // Stream API: urutkan berdasarkan tanggal terbit terbaru
        return certificationRepository.findAll()
                .stream()
                .sorted((c1, c2) -> {  // Lambda Comparator
                    if (c1.getTanggalTerbit() == null) return 1;
                    if (c2.getTanggalTerbit() == null) return -1;
                    return c2.getTanggalTerbit().compareTo(c1.getTanggalTerbit());
                })
                .collect(Collectors.toList());
    }

    public Optional<Certification> ambilCertificationById(Long id) {
        return certificationRepository.findById(id);
    }

    public List<Certification> ambilByPenerbit(String penerbit) {
        return certificationRepository.findByPenerbit(penerbit);
    }

    public Optional<Certification> updateCertification(Long id, Certification certBaru) {
        return certificationRepository.findById(id).map(cert -> {  // Lambda
            cert.setNamaSertifikat(certBaru.getNamaSertifikat());
            cert.setPenerbit(certBaru.getPenerbit());
            cert.setTanggalTerbit(certBaru.getTanggalTerbit());
            cert.setTanggalKadaluarsa(certBaru.getTanggalKadaluarsa());
            cert.setNomorSertifikat(certBaru.getNomorSertifikat());
            cert.setLinkSertifikat(certBaru.getLinkSertifikat());
            cert.setKategori(certBaru.getKategori());
            return certificationRepository.save(cert);
        });
    }

    public boolean hapusCertification(Long id) {
        if (certificationRepository.existsById(id)) {
            certificationRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
