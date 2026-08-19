"use client";

import { Experience } from "../interfaces/experience.d";
import { jenisKerjaList } from "../constants";

const textFields: { label: string; key: keyof Experience; placeholder: string }[] = [
  { label: "Nama Perusahaan *", key: "namaPerusahaan", placeholder: "PT. Contoh" },
  { label: "Posisi/Jabatan *", key: "posisi", placeholder: "Backend Developer" },
  { label: "Lokasi", key: "lokasiPerusahaan", placeholder: "Bandung" },
  { label: "Tanggal Mulai", key: "tanggalMulai", placeholder: "2023-01" },
  { label: "Tanggal Selesai", key: "tanggalSelesai", placeholder: "2024-06 / Sekarang" },
];

interface ExperienceFormModalProps {
  open: boolean;
  editId: number | null;
  form: Experience;
  saving: boolean;
  onChange: (form: Experience) => void;
  onClose: () => void;
  onSave: () => void;
}

export function ExperienceFormModal({
  open,
  editId,
  form,
  saving,
  onChange,
  onClose,
  onSave,
}: ExperienceFormModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl dark:bg-gray-900">
        <h2 className="mb-4 text-lg font-bold text-gray-800 dark:text-white">
          {editId ? "Edit Pengalaman" : "Tambah Pengalaman"}
        </h2>

        <div className="space-y-3">
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

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Jenis Kerja</label>
            <select
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              value={form.jenisKerja ?? ""}
              onChange={(e) => onChange({ ...form, jenisKerja: e.target.value })}
            >
              <option value="">-- Pilih --</option>
              {jenisKerjaList.map((j) => (
                <option key={j} value={j}>
                  {j}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Deskripsi</label>
            <textarea
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              value={form.deskripsi ?? ""}
              onChange={(e) => onChange({ ...form, deskripsi: e.target.value })}
              placeholder="Deskripsi pekerjaan..."
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
