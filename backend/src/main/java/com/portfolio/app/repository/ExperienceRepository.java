package com.portfolio.app.repository;

import com.portfolio.app.entity.Experience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * ExperienceRepository - JPA Repository untuk Experience
 */
@Repository
public interface ExperienceRepository extends JpaRepository<Experience, Long> {
    List<Experience> findByJenisKerja(String jenisKerja);
    List<Experience> findByNamaPerusahaanContainingIgnoreCase(String keyword);
}
