import { Project } from "./interfaces/project.d";

export const emptyProject: Project = {
  namaProyek: "",
  deskripsi: "",
  teknologiDigunakan: "",
  tanggalMulai: "",
  tanggalSelesai: "",
  linkGithub: "",
  linkDemo: "",
  gambarUrl: "",
  kategori: "",
  statusProyek: "",
};

export const kategoriList = ["Web", "Mobile", "Desktop", "Data Science", "IoT", "Game", "Lainnya"];
export const statusList = ["Selesai", "Dalam Pengerjaan", "Ditangguhkan"];

export const statusColor: Record<string, string> = {
  "Selesai": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  "Dalam Pengerjaan": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  "Ditangguhkan": "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
};
