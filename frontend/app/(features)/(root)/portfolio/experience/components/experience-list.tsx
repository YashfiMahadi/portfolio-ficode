"use client";

import { Experience } from "../interfaces/experience.d";

interface ExperienceListProps {
  loading: boolean;
  data: Experience[];
  onEdit: (item: Experience) => void;
  onDelete: (id: number) => void;
}

export function ExperienceList({ loading, data, onEdit, onDelete }: ExperienceListProps) {
  return (
    <div className="space-y-4">
      {loading ? (
        <p className="text-gray-400">Memuat data...</p>
      ) : data.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center text-gray-400 dark:border-gray-700">
          Belum ada pengalaman kerja.
        </div>
      ) : (
        data.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-gray-800 dark:text-white">{item.posisi}</h3>
                  {item.jenisKerja && (
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                      {item.jenisKerja}
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-sm font-medium text-blue-600 dark:text-blue-400">{item.namaPerusahaan}</p>
                <p className="mt-0.5 text-xs text-gray-500">
                  {item.lokasiPerusahaan && `📍 ${item.lokasiPerusahaan} · `}
                  {item.tanggalMulai} — {item.tanggalSelesai || "Sekarang"}
                </p>
                {item.deskripsi && (
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{item.deskripsi}</p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(item)}
                  className="rounded bg-yellow-600 px-3 py-1 text-xs font-medium text-yellow-50 hover:bg-yellow-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(item.id!)}
                  className="rounded bg-red-600 px-3 py-1 text-xs font-medium text-red-50 hover:bg-red-700"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
