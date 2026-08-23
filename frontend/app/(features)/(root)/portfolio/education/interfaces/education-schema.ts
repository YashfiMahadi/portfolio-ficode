import { z } from "zod";

export const educationSchema = z.object({
  namaInstitusi: z.string().min(1, "Nama institusi wajib diisi"),
  jurusan: z.string().min(1, "Jurusan wajib diisi"),
  jenjang: z.string().optional(),
  tanggalMulai: z.string().optional(),
  tanggalSelesai: z.string().optional(),
  ipk: z.string().optional(),
  deskripsi: z.string().optional(),
  lokasi: z.string().optional(),
});

export type EducationFormValues = z.infer<typeof educationSchema>;
