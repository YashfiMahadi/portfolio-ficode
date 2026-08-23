import { z } from "zod";

export const skillSchema = z.object({
  namaSkill: z.string().min(1, "Nama skill wajib diisi"),
  kategori: z.string().min(1, "Kategori wajib dipilih"),
  levelPersen: z.number().min(0).max(100),
  tingkat: z.string().optional(),
});

export type SkillFormValues = z.infer<typeof skillSchema>;
