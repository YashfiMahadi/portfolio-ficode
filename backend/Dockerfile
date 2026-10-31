# Stage 1: Build aplikasi menggunakan Maven di dalam Docker
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app

# Salurkan seluruh isi folder backend ke dalam container
COPY . .

# Jalankan perintah package Maven untuk membuat file .jar (tanpa menjalankan tes)
RUN ./mvnw clean package -DskipTests

# Stage 2: Jalankan aplikasi menggunakan JRE yang ringan
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Salin file .jar hasil build dari Stage 1
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]