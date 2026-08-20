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
            // Upload file langsung ke Cloudinary
            Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            
            // Ambil URL aman (HTTPS) dan public_id dari Cloudinary
            String fileUrl = (String) uploadResult.get("url");

            response.put("status", "success");
            response.put("pesan", "Foto berhasil diupload ke Cloudinary");
            response.put("url", fileUrl);
            return ResponseEntity.ok(response);

        } catch (IOException e) {
            response.put("status", "error");
            response.put("pesan", "Gagal upload foto: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }
}