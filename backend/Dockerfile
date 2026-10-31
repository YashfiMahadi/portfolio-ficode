# Stage 1: Build aplikasi menggunakan Maven bawaan sistem
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app

# Salin seluruh isi project backend
COPY . .

# Install maven via apk alpine, lalu jalankan build maven
RUN apk add --no-cache maven && mvn clean package -DskipTests

# Stage 2: Jalankan aplikasi
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Salin file .jar hasil build dari Stage 1
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]