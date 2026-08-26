import { z } from "zod";

export const certificationSchema = z.object({
  // Wajib: identitas inti sertifikat.
  namaSertifikat: z.string().min(1, "Nama sertifikat wajib diisi"),
  penerbit: z.string().min(1, "Penerbit wajib diisi"),
  tanggalTerbit: z.string().min(1, "Tanggal terbit wajib diisi"),
  // Opsional: banyak sertifikat tidak kadaluarsa / tidak selalu punya nomor & link publik.
  tanggalKadaluarsa: z.string().optional(),
  nomorSertifikat: z.string().optional(),
  linkSertifikat: z.string().optional(),
  kategori: z.string().optional(),
});

export type CertificationFormValues = z.infer<typeof certificationSchema>;
