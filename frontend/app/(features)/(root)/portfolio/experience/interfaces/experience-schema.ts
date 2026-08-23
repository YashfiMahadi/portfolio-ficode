import { z } from "zod";

export const experienceSchema = z.object({
  namaPerusahaan: z.string().min(1, "Nama perusahaan wajib diisi"),
  posisi: z.string().min(1, "Posisi wajib diisi"),
  lokasiPerusahaan: z.string().optional(),
  tanggalMulai: z.string().optional(),
  tanggalSelesai: z.string().optional(),
  deskripsi: z.string().optional(),
  jenisKerja: z.string().optional(),
});

export type ExperienceFormValues = z.infer<typeof experienceSchema>;
