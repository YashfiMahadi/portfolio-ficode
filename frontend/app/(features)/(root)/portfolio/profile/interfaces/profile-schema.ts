import { z } from "zod";

export const portfolioProfileSchema = z.object({
  nama: z.string().min(1, "Nama wajib diisi"),
  jabatan: z.string().min(1, "Jabatan wajib diisi"),
  email: z.string().email("Format email tidak valid").optional().or(z.literal("")),
  telepon: z.string().optional(),
  alamat: z.string().optional(),
  kota: z.string().optional(),
  provinsi: z.string().optional(),
  tentangSaya: z.string().optional(),
  linkedIn: z.string().optional(),
  github: z.string().optional(),
  website: z.string().optional(),
  fotoUrl: z.string().optional(),
});

export type PortfolioProfileFormValues = z.infer<typeof portfolioProfileSchema>;
