import { Certification } from "./interfaces/certification.d";

export const emptyCertification: Certification = {
  namaSertifikat: "",
  penerbit: "",
  tanggalTerbit: "",
  tanggalKadaluarsa: "",
  nomorSertifikat: "",
  linkSertifikat: "",
  kategori: "",
};

export const kategoriList = ["Programming", "Cloud", "Database", "Design", "Network", "Data Science", "Lainnya"];

export const penerbitColor: Record<string, string> = {
  Google: "bg-red-600 text-red-50",
  Oracle: "bg-orange-600 text-orange-50",
  Microsoft: "bg-blue-600 text-blue-50",
  AWS: "bg-yellow-600 text-yellow-50",
  Udemy: "bg-purple-600 text-purple-50",
  Coursera: "bg-cyan-600 text-cyan-50",
};
