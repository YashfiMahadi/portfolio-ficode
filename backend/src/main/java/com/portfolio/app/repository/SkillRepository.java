package com.portfolio.app.repository;

import com.portfolio.app.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * SkillRepository - JPA Repository untuk Skill
 */
@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {
    List<Skill> findByKategori(String kategori);
    List<Skill> findByLevelPersenGreaterThanEqual(Integer minLevel);
}
