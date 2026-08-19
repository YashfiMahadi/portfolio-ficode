// Interface / tipe data untuk fitur Portfolio (profile, skill, experience,
// education, project, certification). Dipakai oleh portfolio.service.ts
// dan halaman-halaman di app/(features)/(root)/portfolio/*.

export interface Profile {
  id: number;
  namaLengkap: string;
  headline?: string;
  bio?: string;
  fotoUrl?: string;
  email?: string;
  telepon?: string;
  lokasi?: string;
}

export interface Skill {
  id: number;
  nama: string;
  kategori?: string;
  level?: number; // 0-100
}

export interface Experience {
  id: number;
  posisi: string;
  perusahaan: string;
  lokasi?: string;
  tanggalMulai: string;
  tanggalSelesai?: string;
  deskripsi?: string;
}

export interface Education {
  id: number;
  institusi: string;
  jenjang: string;
  jurusan?: string;
  tanggalMulai: string;
  tanggalSelesai?: string;
}

export interface Project {
  id: number;
  nama: string;
  deskripsi?: string;
  teknologi?: string[];
  url?: string;
  gambarUrl?: string;
}

export interface Certification {
  id: number;
  nama: string;
  penerbit: string;
  tanggalTerbit?: string;
  tanggalKadaluarsa?: string;
  urlSertifikat?: string;
}

export interface ApiListResponse<T> {
  status: string;
  pesan?: string;
  data: T[];
}

export interface ApiItemResponse<T> {
  status: string;
  pesan?: string;
  data: T;
}
