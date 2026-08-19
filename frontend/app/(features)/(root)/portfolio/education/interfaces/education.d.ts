// Tipe data untuk fitur Education (riwayat pendidikan).

export interface Education {
  id?: number;
  namaInstitusi: string;
  jurusan: string;
  jenjang: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  ipk: string;
  deskripsi: string;
  lokasi: string;
}
