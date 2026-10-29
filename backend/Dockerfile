# Menggunakan Java 17 (Sesuaikan jika project Anda memakai Java 11/21)
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Mengambil file .jar hasil build
COPY target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]