// Tipe data untuk fitur Certifications.

export interface Certification {
  id?: number;
  namaSertifikat: string;
  penerbit: string;
  tanggalTerbit: string;
  tanggalKadaluarsa: string;
  nomorSertifikat: string;
  linkSertifikat: string;
  kategori: string;
}
