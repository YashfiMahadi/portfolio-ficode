package com.portfolio.app.repository;

import com.portfolio.app.entity.Education;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * EducationRepository - JPA Repository untuk Education
 */
@Repository
public interface EducationRepository extends JpaRepository<Education, Long> {
    List<Education> findByJenjang(String jenjang);
}
