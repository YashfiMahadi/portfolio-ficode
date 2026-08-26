import { z } from "zod";

export const projectSchema = z.object({
  // Wajib: info inti yang bikin proyek bisa dipahami orang lain di CV.
  namaProyek: z.string().min(1, "Nama proyek wajib diisi"),
  deskripsi: z.string().min(1, "Deskripsi proyek wajib diisi"),
  teknologiDigunakan: z.string().min(1, "Teknologi yang digunakan wajib diisi"),
  tanggalMulai: z.string().min(1, "Tanggal mulai wajib diisi"),
  statusProyek: z.string().min(1, "Status proyek wajib dipilih"),
  // Wajib diisi juga: kalau proyek masih berjalan, harus dicentang
  // "Sekarang" (bukan dibiarkan kosong tanpa sinyal apa-apa). Status
  // proyek otomatis ikut disinkronkan berdasarkan field ini di form.
  tanggalSelesai: z.string().min(1, "Tanggal selesai wajib diisi, atau centang \"Masih berlangsung\" kalau proyek belum selesai"),
  // Opsional: tidak semua proyek punya repo/demo publik, thumbnail &
  // kategori juga pemanis, bukan keharusan.
  linkGithub: z.string().optional(),
  linkDemo: z.string().optional(),
  gambarUrl: z.string().optional(),
  kategori: z.string().optional(),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
