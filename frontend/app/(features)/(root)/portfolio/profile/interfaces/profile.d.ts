// Tipe data untuk fitur Profile (portfolio).
// Dipakai oleh hooks/use-profile.ts, components/*, dan page.tsx
// pada app/(features)/(root)/portfolio/profile.

export interface Profile {
  id?: number;
  userId?: number;
  nama: string;
  jabatan: string;
  email: string;
  telepon: string;
  alamat: string;
  kota: string;
  provinsi: string;
  tentangSaya: string;
  linkedIn: string;
  github: string;
  website: string;
  fotoUrl: string;
}
