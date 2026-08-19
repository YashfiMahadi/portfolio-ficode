// Tipe data untuk fitur Projects.
// Dipakai oleh hooks/use-projects.ts, components/*, dan page.tsx
// pada app/(features)/(root)/portfolio/projects.

export interface Project {
  id?: number;
  namaProyek: string;
  deskripsi: string;
  teknologiDigunakan: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  linkGithub: string;
  linkDemo: string;
  gambarUrl: string;
  kategori: string;
  statusProyek: string;
}
