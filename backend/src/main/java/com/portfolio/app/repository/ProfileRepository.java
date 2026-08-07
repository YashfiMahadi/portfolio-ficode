package com.portfolio.app.repository;

import com.portfolio.app.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * ProfileRepository - JPA Repository untuk Profile
 * Konsep: JPA Repository (extend JpaRepository untuk CRUD otomatis)
 */
@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Optional<Profile> findByEmail(String email);
    Optional<Profile> findByUserId(Long userId);
    boolean existsByUserId(Long userId);
}
