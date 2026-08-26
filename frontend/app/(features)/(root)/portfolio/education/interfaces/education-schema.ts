import { z } from "zod";

export const educationSchema = z.object({
  // Wajib: identitas inti riwayat pendidikan.
  namaInstitusi: z.string().min(1, "Nama institusi wajib diisi"),
  jurusan: z.string().min(1, "Jurusan wajib diisi"),
  jenjang: z.string().min(1, "Jenjang wajib dipilih"),
  tanggalMulai: z.string().min(1, "Tanggal mulai wajib diisi"),
  // Wajib diisi juga: kalau masih berlangsung, harus dicentang "Sekarang"
  // (bukan dibiarkan kosong tanpa sinyal apa-apa).
  tanggalSelesai: z.string().min(1, "Tanggal selesai wajib diisi, atau centang \"Masih berlangsung\" kalau belum lulus"),
  // Opsional: IPK/lokasi/deskripsi memang bukan info yang wajib dicantumkan.
  ipk: z.string().optional(),
  deskripsi: z.string().optional(),
  lokasi: z.string().optional(),
});

export type EducationFormValues = z.infer<typeof educationSchema>;
