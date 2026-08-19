"use client";

import { ChangeEvent } from "react";

import { Project } from "../interfaces/project.d";
import { kategoriList, statusList } from "../constants";

const textFields: { label: string; key: keyof Project; placeholder: string }[] = [
  { label: "Nama Proyek *", key: "namaProyek", placeholder: "Portfolio CV Digital" },
  { label: "Teknologi Digunakan", key: "teknologiDigunakan", placeholder: "Java, Spring Boot, MySQL, React" },
  { label: "Tanggal Mulai", key: "tanggalMulai", placeholder: "2024-01" },
  { label: "Tanggal Selesai", key: "tanggalSelesai", placeholder: "2024-06 / Sekarang" },
  { label: "Link GitHub", key: "linkGithub", placeholder: "https://github.com/..." },
  { label: "Link Demo", key: "linkDemo", placeholder: "https://..." },
];

interface ProjectFormModalProps {
  open: boolean;
  editId: number | null;
  form: Project;
  saving: boolean;
  uploading: boolean;
  onChange: (form: Project) => void;
  onUploadThumbnail: (e: ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  onSave: () => void;
}

export function ProjectFormModal({
  open,
  editId,
  form,
  saving,
  uploading,
  onChange,
  onUploadThumbnail,
  onClose,
  onSave,
}: ProjectFormModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl dark:bg-gray-900">
        <h2 className="mb-4 text-lg font-bold text-gray-800 dark:text-white">
          {editId ? "Edit Proyek" : "Tambah Proyek"}
        </h2>

        <div className="space-y-3">
          {/* Thumbnail Upload */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Thumbnail Proyek
            </label>
            <div className="flex items-center gap-3">
              <div className="h-16 w-24 overflow-hidden rounded-lg border border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-700">
                {form.gambarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={form.gambarUrl} alt="thumbnail" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-2xl">🚀</div>
                )}
              </div>

              <label className="cursor-pointer rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
                <input type="file" accept="image/*" className="hidden" onChange={onUploadThumbnail} />
                {uploading ? "Mengupload..." : "📁 Pilih Foto"}
              </label>

              {form.gambarUrl && (
                <button
                  type="button"
                  onClick={() => onChange({ ...form, gambarUrl: "" })}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  Hapus
                </button>
              )}
            </div>
          </div>

          {textFields.map(({ label, key, placeholder }) => (
            <div key={key}>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
              <input
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                value={(form[key] ?? "") as string}
                onChange={(e) => onChange({ ...form, [key]: e.target.value })}
                placeholder={placeholder}
              />
            </div>
          ))}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Kategori</label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                value={form.kategori ?? ""}
                onChange={(e) => onChange({ ...form, kategori: e.target.value })}
              >
                <option value="">-- Pilih --</option>
                {kategoriList.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                value={form.statusProyek ?? ""}
                onChange={(e) => onChange({ ...form, statusProyek: e.target.value })}
              >
                <option value="">-- Pilih --</option>
                {statusList.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Deskripsi</label>
            <textarea
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              value={form.deskripsi ?? ""}
              onChange={(e) => onChange({ ...form, deskripsi: e.target.value })}
              placeholder="Deskripsi proyek..."
            />
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm dark:border-gray-600 dark:text-gray-300"
          >
            Batal
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}
