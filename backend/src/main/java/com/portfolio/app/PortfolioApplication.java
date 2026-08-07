package com.portfolio.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * PortfolioApplication - Main class untuk menjalankan aplikasi Spring Boot
 * UAS Pemrograman Java Lanjut - STMIK Mardira Indonesia
 */
@SpringBootApplication
public class PortfolioApplication {

    public static void main(String[] args) {
        SpringApplication.run(PortfolioApplication.class, args);
        System.out.println("===========================================");
        System.out.println("  Portfolio CV Digital API is running...  ");
        System.out.println("  http://localhost:8080/api               ");
        System.out.println("===========================================");
    }
}
