package com.portfolio.app.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin(origins = "*")
public class FileUploadController {

    @Autowired
    private Cloudinary cloudinary;

    // Endpoint khusus untuk foto Profil -> Masuk ke folder "profile" di Cloudinary
    @PostMapping("/profile")
    public ResponseEntity<Map<String, Object>> uploadProfilePhoto(@RequestParam("file") MultipartFile file) {
        return uploadToCloudinary(file, "profile");
    }

    // Endpoint khusus untuk foto Project -> Masuk ke folder "project" di Cloudinary
    @PostMapping("/project")
    public ResponseEntity<Map<String, Object>> uploadProjectPhoto(@RequestParam("file") MultipartFile file) {
        return uploadToCloudinary(file, "project");
    }

    // Method pembantu (helper) supaya tidak menulis kode berulang kali
    private ResponseEntity<Map<String, Object>> uploadToCloudinary(MultipartFile file, String folderName) {
        Map<String, Object> response = new HashMap<>();

        // Validasi tipe file
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            response.put("status", "error");
            response.put("pesan", "File harus berupa gambar");
            return ResponseEntity.badRequest().body(response);
        }

        try {
            // Upload file ke Cloudinary dengan memasukkan parameter folder
            Map<?, ?> uploadResult = cloudinary.uploader().upload(
                file.getBytes(), 
                ObjectUtils.asMap("folder", folderName)
            );
            
            // Ambil URL aman (HTTPS) dari hasil upload
            String fileUrl = (String) uploadResult.get("url");

            response.put("status", "success");
            response.put("pesan", "Foto berhasil diupload ke folder " + folderName);
            response.put("url", fileUrl);
            return ResponseEntity.ok(response);

        } catch (IOException e) {
            response.put("status", "error");
            response.put("pesan", "Gagal upload foto: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }
}