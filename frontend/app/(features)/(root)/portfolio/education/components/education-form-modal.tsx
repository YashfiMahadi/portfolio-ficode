"use client";

import { Education } from "../interfaces/education.d";
import { jenjangList } from "../constants";

const textFields: { label: string; key: keyof Education; placeholder: string }[] = [
  { label: "Nama Institusi *", key: "namaInstitusi", placeholder: "STMIK Mardira Indonesia" },
  { label: "Jurusan *", key: "jurusan", placeholder: "Teknik Informatika" },
  { label: "Lokasi", key: "lokasi", placeholder: "Bandung" },
  { label: "Tanggal Mulai", key: "tanggalMulai", placeholder: "2022-09" },
  { label: "Tanggal Selesai", key: "tanggalSelesai", placeholder: "2026-07 / Sekarang" },
  { label: "IPK (opsional)", key: "ipk", placeholder: "3.75" },
];

interface EducationFormModalProps {
  open: boolean;
  editId: number | null;
  form: Education;
  saving: boolean;
  onChange: (form: Education) => void;
  onClose: () => void;
  onSave: () => void;
}

export function EducationFormModal({ open, editId, form, saving, onChange, onClose, onSave }: EducationFormModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl dark:bg-gray-900">
        <h2 className="mb-4 text-lg font-bold text-gray-800 dark:text-white">
          {editId ? "Edit Pendidikan" : "Tambah Pendidikan"}
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
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Jenjang</label>
            <select
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              value={form.jenjang ?? ""}
              onChange={(e) => onChange({ ...form, jenjang: e.target.value })}
            >
              <option value="">-- Pilih Jenjang --</option>
              {jenjangList.map((j) => (
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
              placeholder="Deskripsi tambahan..."
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
