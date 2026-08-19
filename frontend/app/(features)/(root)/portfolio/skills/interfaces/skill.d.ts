// Tipe data untuk fitur Skills.
// Dipakai oleh hooks/use-skills.ts, components/*, dan page.tsx
// pada app/(features)/(root)/portfolio/skills.

export interface Skill {
  id?: number;
  namaSkill: string;
  kategori: string;
  levelPersen: number;
  tingkat?: string;
}
