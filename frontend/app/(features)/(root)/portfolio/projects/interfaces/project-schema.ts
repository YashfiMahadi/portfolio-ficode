import { z } from "zod";

export const projectSchema = z.object({
  namaProyek: z.string().min(1, "Nama proyek wajib diisi"),
  deskripsi: z.string().optional(),
  teknologiDigunakan: z.string().optional(),
  tanggalMulai: z.string().optional(),
  tanggalSelesai: z.string().optional(),
  linkGithub: z.string().optional(),
  linkDemo: z.string().optional(),
  gambarUrl: z.string().optional(),
  kategori: z.string().optional(),
  statusProyek: z.string().optional(),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
