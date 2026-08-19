// Tipe data untuk halaman CV / landing page portfolio publik.

export interface Profile {
  nama: string;
  jabatan: string;
  email: string;
  telepon: string;
  kota: string;
  provinsi: string;
  tentangSaya: string;
  linkedIn: string;
  github: string;
  website: string;
  fotoUrl: string;
}

export interface Skill {
  namaSkill: string;
  kategori: string;
  levelPersen: number;
}

export interface Experience {
  namaPerusahaan: string;
  posisi: string;
  lokasiPerusahaan: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  deskripsi: string;
  jenisKerja: string;
}

export interface Education {
  namaInstitusi: string;
  jurusan: string;
  jenjang: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  ipk: number;
  lokasi: string;
}

export interface Project {
  namaProyek: string;
  deskripsi: string;
  teknologiDigunakan: string;
  linkGithub: string;
  linkDemo: string;
  gambarUrl: string;
  kategori: string;
  statusProyek: string;
}

export interface Certification {
  namaSertifikat: string;
  penerbit: string;
  tanggalTerbit: string;
  linkSertifikat: string;
  kategori: string;
}
