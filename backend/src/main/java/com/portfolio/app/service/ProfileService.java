package com.portfolio.app.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.portfolio.app.entity.Profile;
import com.portfolio.app.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private Cloudinary cloudinary;

    private void hapusFileFoto(String fotoUrl) {
        if (fotoUrl == null || fotoUrl.isEmpty()) return;

        try {
            // Ekstrak public_id dari URL Cloudinary untuk proses penghapusan
            // Contoh URL: https://res.cloudinary.com/.../image/upload/v123456/folder/sample.jpg
            String publicId = extractPublicIdFromUrl(fotoUrl);
            if (publicId != null) {
                cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
                System.out.println("✅ Foto Cloudinary berhasil dihapus: " + publicId);
            }
        } catch (Exception e) {
            System.out.println("⚠️ Gagal menghapus foto dari Cloudinary: " + e.getMessage());
        }
    }

    // Helper untuk mengambil public_id dari URL Cloudinary
    private String extractPublicIdFromUrl(String url) {
        try {
            int uploadIndex = url.indexOf("/upload/");
            if (uploadIndex == -1) return null;
            
            String afterUpload = url.substring(uploadIndex + 8); // Lewati "/upload/"
            // Hilangkan versi jika ada (misal: v12345678/)
            if (afterUpload.startsWith("v")) {
                int slashIndex = afterUpload.indexOf('/');
                if (slashIndex != -1) {
                    afterUpload = afterUpload.substring(slashIndex + 1);
                }
            }
            // Hilangkan ekstensi file (.jpg, .png, dll)
            int dotIndex = afterUpload.lastIndexOf('.');
            if (dotIndex != -1) {
                afterUpload = afterUpload.substring(0, dotIndex);
            }
            return afterUpload;
        } catch (Exception e) {
            return null;
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

            // Kalau foto berubah, hapus foto lama dari Cloudinary
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