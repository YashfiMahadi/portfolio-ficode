package com.portfolio.app.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.portfolio.app.entity.Project;
import com.portfolio.app.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private Cloudinary cloudinary;

    private void hapusGambarLama(String gambarUrl) {
        if (gambarUrl == null || gambarUrl.isBlank()) return;

        try {
            String publicId = extractPublicIdFromUrl(gambarUrl);
            if (publicId != null) {
                cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
                System.out.println("✅ Gambar Cloudinary dihapus: " + publicId);
            }
        } catch (Exception e) {
            System.out.println("⚠️ Gagal hapus gambar dari Cloudinary: " + e.getMessage());
        }
    }

    private String extractPublicIdFromUrl(String url) {
        try {
            int uploadIndex = url.indexOf("/upload/");
            if (uploadIndex == -1) return null;
            
            String afterUpload = url.substring(uploadIndex + 8);
            if (afterUpload.startsWith("v")) {
                int slashIndex = afterUpload.indexOf('/');
                if (slashIndex != -1) {
                    afterUpload = afterUpload.substring(slashIndex + 1);
                }
            }
            int dotIndex = afterUpload.lastIndexOf('.');
            if (dotIndex != -1) {
                afterUpload = afterUpload.substring(0, dotIndex);
            }
            return afterUpload;
        } catch (Exception e) {
            return null;
        }
    }

    public Project tambahProject(Project project) {
        return projectRepository.save(project);
    }

    public List<Project> ambilSemuaProject() {
        return projectRepository.findAll();
    }

    public Optional<Project> ambilProjectById(Long id) {
        return projectRepository.findById(id);
    }

    public List<Project> ambilByKategori(String kategori) {
        return projectRepository.findByKategori(kategori);
    }

    public List<Project> cariProject(String keyword) {
        return projectRepository.findAll()
                .stream()
                .filter(p -> p.getNamaProyek().toLowerCase().contains(keyword.toLowerCase())
                        || (p.getDeskripsi() != null && p.getDeskripsi().toLowerCase().contains(keyword.toLowerCase())))
                .collect(Collectors.toList());
    }

    public Map<String, Long> statistikProjectPerKategori() {
        return projectRepository.findAll()
                .stream()
                .filter(p -> p.getKategori() != null)
                .collect(Collectors.groupingBy(Project::getKategori, Collectors.counting()));
    }

    public Optional<Project> updateProject(Long id, Project projBaru) {
        return projectRepository.findById(id).map(proj -> {

            if (projBaru.getGambarUrl() != null &&
                !projBaru.getGambarUrl().equals(proj.getGambarUrl())) {

                hapusGambarLama(proj.getGambarUrl());
            }

            proj.setNamaProyek(projBaru.getNamaProyek());
            proj.setDeskripsi(projBaru.getDeskripsi());
            proj.setTeknologiDigunakan(projBaru.getTeknologiDigunakan());
            proj.setTanggalMulai(projBaru.getTanggalMulai());
            proj.setTanggalSelesai(projBaru.getTanggalSelesai());
            proj.setLinkGithub(projBaru.getLinkGithub());
            proj.setLinkDemo(projBaru.getLinkDemo());
            proj.setGambarUrl(projBaru.getGambarUrl());
            proj.setKategori(projBaru.getKategori());
            proj.setStatusProyek(projBaru.getStatusProyek());
            return projectRepository.save(proj);
        });
    }

    public boolean hapusProject(Long id) {
        return projectRepository.findById(id).map(project -> {
            hapusGambarLama(project.getGambarUrl());
            projectRepository.delete(project);
            return true;
        }).orElse(false);
    }
}