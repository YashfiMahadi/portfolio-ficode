package com.portfolio.app.service;

import com.portfolio.app.entity.Profile;
import com.portfolio.app.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

/**
 * ProfileService - Business logic untuk Profile
 * Konsep OOP: Service layer memisahkan logika bisnis dari controller
 */
@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    private void hapusFileFoto(String fotoUrl) {
        if (fotoUrl == null || fotoUrl.isEmpty()) return;

        try {
            String namaFile = fotoUrl.substring(fotoUrl.lastIndexOf("/") + 1);

            Path path = Paths.get("uploads/photos", namaFile);

            Files.deleteIfExists(path);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<Profile> ambilSemuaProfile() {
        return profileRepository.findAll();
    }

    public Optional<Profile> ambilProfileById(Long id) {
        return profileRepository.findById(id);
    }

    public Optional<Profile> ambilProfileByUserId(Long userId) {
        return profileRepository.findByUserId(userId);
    }

    public Optional<Profile> updateProfile(Long id, Profile profileBaru) {
        return profileRepository.findById(id).map(profile -> {
            profile.setNama(profileBaru.getNama());
            profile.setJabatan(profileBaru.getJabatan());
            profile.setEmail(profileBaru.getEmail());
            profile.setTelepon(profileBaru.getTelepon());
            profile.setAlamat(profileBaru.getAlamat());
            profile.setKota(profileBaru.getKota());
            profile.setProvinsi(profileBaru.getProvinsi());
            profile.setTentangSaya(profileBaru.getTentangSaya());
            profile.setLinkedIn(profileBaru.getLinkedIn());
            profile.setGithub(profileBaru.getGithub());
            profile.setWebsite(profileBaru.getWebsite());

            // Kalau foto berubah, hapus foto lama
            if (profile.getFotoUrl() != null &&
                profileBaru.getFotoUrl() != null &&
                !profile.getFotoUrl().equals(profileBaru.getFotoUrl())) {

                hapusFileFoto(profile.getFotoUrl());
            }

            profile.setFotoUrl(profileBaru.getFotoUrl());
            return profileRepository.save(profile);
        });
    }

    public Profile simpanAtauUpdateProfileByUserId(Long userId, Profile profileBaru) {
        return profileRepository.findByUserId(userId)
            .map(profile -> {
                profile.setNama(profileBaru.getNama());
                profile.setJabatan(profileBaru.getJabatan());
                profile.setEmail(profileBaru.getEmail());
                profile.setTelepon(profileBaru.getTelepon());
                profile.setAlamat(profileBaru.getAlamat());
                profile.setKota(profileBaru.getKota());
                profile.setProvinsi(profileBaru.getProvinsi());
                profile.setTentangSaya(profileBaru.getTentangSaya());
                profile.setLinkedIn(profileBaru.getLinkedIn());
                profile.setGithub(profileBaru.getGithub());
                profile.setWebsite(profileBaru.getWebsite());

                if (profile.getFotoUrl() != null &&
                   profileBaru.getFotoUrl() != null &&
                    !profile.getFotoUrl().equals(profileBaru.getFotoUrl())) {

                    hapusFileFoto(profile.getFotoUrl());
                }

                profile.setFotoUrl(profileBaru.getFotoUrl());

                return profileRepository.save(profile);
            })
            .orElseGet(() -> {
                profileBaru.setUserId(userId);
                return profileRepository.save(profileBaru);
            });
    }
}
