import { z } from "zod";

export const portfolioProfileSchema = z.object({
  // Wajib: identitas & kontak inti yang harus ada di sebuah portfolio/CV.
  nama: z.string().min(1, "Nama wajib diisi"),
  jabatan: z.string().min(1, "Jabatan wajib diisi"),
  email: z.string().min(1, "Email wajib diisi").email("Format email tidak valid"),
  telepon: z.string().min(1, "Nomor telepon wajib diisi"),
  tentangSaya: z.string().min(1, "Tentang Saya wajib diisi"),
  // Opsional: pelengkap, tidak setiap orang perlu mencantumkannya.
  alamat: z.string().optional(),
  kota: z.string().optional(),
  provinsi: z.string().optional(),
  linkedIn: z.string().optional(),
  github: z.string().optional(),
  website: z.string().optional(),
  fotoUrl: z.string().optional(),
});

export type PortfolioProfileFormValues = z.infer<typeof portfolioProfileSchema>;
