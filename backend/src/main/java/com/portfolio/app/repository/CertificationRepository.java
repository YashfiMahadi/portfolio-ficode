package com.portfolio.app.repository;

import com.portfolio.app.entity.Certification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * CertificationRepository - JPA Repository untuk Certification
 */
@Repository
public interface CertificationRepository extends JpaRepository<Certification, Long> {
    List<Certification> findByPenerbit(String penerbit);
    List<Certification> findByKategori(String kategori);
}
