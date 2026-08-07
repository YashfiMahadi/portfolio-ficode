package com.portfolio.app.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin(origins = "*")
public class FileUploadController {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @PostMapping("/photo")
    public ResponseEntity<Map<String, Object>> uploadPhoto(
            @RequestParam("file") MultipartFile file) {

        Map<String, Object> response = new HashMap<>();

        // Validasi tipe file
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            response.put("status", "error");
            response.put("pesan", "File harus berupa gambar");
            return ResponseEntity.badRequest().body(response);
        }

        try {
            // Buat folder jika belum ada
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Generate nama file unik
            String ext = file.getOriginalFilename()
                    .substring(file.getOriginalFilename().lastIndexOf("."));
            String fileName = UUID.randomUUID().toString() + ext;

            // Simpan file
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Return URL foto
            String fileUrl = "http://localhost:8080/uploads/photos/" + fileName;

            response.put("status", "success");
            response.put("pesan", "Foto berhasil diupload");
            response.put("url", fileUrl);
            return ResponseEntity.ok(response);

        } catch (IOException e) {
            response.put("status", "error");
            response.put("pesan", "Gagal upload foto: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }
}