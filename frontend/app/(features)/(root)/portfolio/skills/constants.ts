// Konstanta yang dipakai di fitur Skills (nilai awal form & daftar kategori).

import { Skill } from "./interfaces/skill.d";

export const emptySkill: Skill = {
  namaSkill: "",
  kategori: "",
  levelPersen: 0,
};

export const kategoriList = [
  "Backend",
  "Frontend",
  "Database",
  "Tools",
  "Mobile",
  "Soft Skill",
];
