import { z } from "zod";

export const experienceSchema = z.object({
  // Wajib: identitas inti pengalaman kerja.
  namaPerusahaan: z.string().min(1, "Nama perusahaan wajib diisi"),
  posisi: z.string().min(1, "Posisi wajib diisi"),
  tanggalMulai: z.string().min(1, "Tanggal mulai wajib diisi"),
  jenisKerja: z.string().min(1, "Jenis kerja wajib dipilih"),
  // Wajib diisi juga: kalau masih bekerja di sana, harus dicentang "Sekarang"
  // (bukan dibiarkan kosong tanpa sinyal apa-apa).
  tanggalSelesai: z.string().min(1, "Tanggal selesai wajib diisi, atau centang \"Masih berlangsung\" kalau masih bekerja di sana"),
  // Opsional: lokasi/deskripsi tambahan.
  lokasiPerusahaan: z.string().optional(),
  deskripsi: z.string().optional(),
});

export type ExperienceFormValues = z.infer<typeof experienceSchema>;
