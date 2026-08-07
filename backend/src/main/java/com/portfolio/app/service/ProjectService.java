package com.portfolio.app.service;

import com.portfolio.app.entity.Project;
import com.portfolio.app.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * ProjectService - Business logic untuk Project
 * Implementasi: Lambda, Stream API, Collection Framework (Map)
 */
@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    private void hapusGambarLama(String gambarUrl) {
        if (gambarUrl == null || gambarUrl.isBlank()) return;

        try {
            // Ambil nama file dari URL (ambil bagian setelah /uploads/photos/)
            String namaFile;
            if (gambarUrl.contains("/uploads/photos/")) {
                namaFile = gambarUrl.substring(gambarUrl.lastIndexOf("/uploads/photos/") + "/uploads/photos/".length());
            } else {
                namaFile = Paths.get(gambarUrl).getFileName().toString();
            }

            Path path = Paths.get("uploads/photos", namaFile);
            Files.deleteIfExists(path);
            System.out.println("✅ Gambar dihapus: " + path);

        } catch (IOException e) {
            System.out.println("⚠️ Gagal hapus gambar: " + e.getMessage());
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
        // Stream API + Lambda: filter berdasarkan keyword di nama/deskripsi
        return projectRepository.findAll()
                .stream()
                .filter(p -> p.getNamaProyek().toLowerCase().contains(keyword.toLowerCase())  // Lambda
                        || (p.getDeskripsi() != null && p.getDeskripsi().toLowerCase().contains(keyword.toLowerCase())))
                .collect(Collectors.toList());
    }

    // Statistik proyek per kategori (Stream + Map)
    public Map<String, Long> statistikProjectPerKategori() {
        return projectRepository.findAll()
                .stream()
                .filter(p -> p.getKategori() != null)
                .collect(Collectors.groupingBy(Project::getKategori, Collectors.counting()));
    }

    public Optional<Project> updateProject(Long id, Project projBaru) {
        return projectRepository.findById(id).map(proj -> {   // Lambda

            // Hapus gambar lama jika diganti
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

            // Hapus gambar dari folder
            hapusGambarLama(project.getGambarUrl());

            projectRepository.delete(project);
            return true;

        }).orElse(false);
    }
}
