package com.portfolio.app.controller;

import com.portfolio.app.entity.User;
import com.portfolio.app.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * AuthController - REST API untuk autentikasi
 *
 * Endpoint:
 * POST /api/auth/login    - Login dengan username & password
 * POST /api/auth/register - Daftar user baru
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    // POST /api/auth/login
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");

        if (username == null || username.isEmpty() || password == null || password.isEmpty()) {
            return ResponseEntity.badRequest().body(
                Map.of("status", "error", "pesan", "Username dan password wajib diisi")
            );
        }

        Map<String, Object> result = authService.login(username, password);

        if ("success".equals(result.get("status"))) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }

}
