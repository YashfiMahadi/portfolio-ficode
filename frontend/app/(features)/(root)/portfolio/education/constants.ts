import { Education } from "./interfaces/education.d";

export const emptyEducation: Education = {
  namaInstitusi: "",
  jurusan: "",
  jenjang: "",
  tanggalMulai: "",
  tanggalSelesai: "",
  ipk: "",
  deskripsi: "",
  lokasi: "",
};

export const jenjangList = ["S2", "S1", "D4", "D3", "SMK", "SMA", "SMP", "SD"];

export const jenjangColor: Record<string, string> = {
  S2: "bg-purple-600 text-purple-50",
  S1: "bg-blue-600 text-blue-50",
  D4: "bg-blue-600 text-blue-50",
  D3: "bg-cyan-600 text-cyan-50",
  SMA: "bg-green-600 text-green-50",
  SMK: "bg-green-600 text-green-50",
  SMP: "bg-yellow-600 text-yellow-50",
  SD: "bg-orange-600 text-orange-50",
};
