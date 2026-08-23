import { z } from "zod";

export const certificationSchema = z.object({
  namaSertifikat: z.string().min(1, "Nama sertifikat wajib diisi"),
  penerbit: z.string().min(1, "Penerbit wajib diisi"),
  tanggalTerbit: z.string().optional(),
  tanggalKadaluarsa: z.string().optional(),
  nomorSertifikat: z.string().optional(),
  linkSertifikat: z.string().optional(),
  kategori: z.string().optional(),
});

export type CertificationFormValues = z.infer<typeof certificationSchema>;
