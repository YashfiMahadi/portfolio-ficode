"use client";

import { Certification } from "../interfaces/certification.d";
import { kategoriList } from "../constants";

const textFields: { label: string; key: keyof Certification; placeholder: string }[] = [
  { label: "Nama Sertifikat *", key: "namaSertifikat", placeholder: "Java Programming Masterclass" },
  { label: "Penerbit *", key: "penerbit", placeholder: "Udemy / Google / Oracle" },
  { label: "Tanggal Terbit", key: "tanggalTerbit", placeholder: "2024-03" },
  { label: "Tanggal Kadaluarsa", key: "tanggalKadaluarsa", placeholder: "2027-03 (kosongkan jika selamanya)" },
  { label: "Nomor Sertifikat", key: "nomorSertifikat", placeholder: "UC-XXXXXXXX" },
  { label: "Link Sertifikat", key: "linkSertifikat", placeholder: "https://..." },
];

interface CertificationFormModalProps {
  open: boolean;
  editId: number | null;
  form: Certification;
  saving: boolean;
  onChange: (form: Certification) => void;
  onClose: () => void;
  onSave: () => void;
}

export function CertificationFormModal({
  open,
  editId,
  form,
  saving,
  onChange,
  onClose,
  onSave,
}: CertificationFormModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl dark:bg-gray-900">
        <h2 className="mb-4 text-lg font-bold text-gray-800 dark:text-white">
          {editId ? "Edit Sertifikasi" : "Tambah Sertifikasi"}
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
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Kategori</label>
            <select
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              value={form.kategori ?? ""}
              onChange={(e) => onChange({ ...form, kategori: e.target.value })}
            >
              <option value="">-- Pilih Kategori --</option>
              {kategoriList.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
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
