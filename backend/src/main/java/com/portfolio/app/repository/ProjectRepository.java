package com.portfolio.app.repository;

import com.portfolio.app.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * ProjectRepository - JPA Repository untuk Project
 */
@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByKategori(String kategori);
    List<Project> findByStatusProyek(String status);
    List<Project> findByNamaProyekContainingIgnoreCase(String keyword);
}
