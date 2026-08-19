"use client";

import { Certification } from "../interfaces/certification.d";
import { penerbitColor } from "../constants";

interface CertificationGridProps {
  loading: boolean;
  data: Certification[];
  onEdit: (item: Certification) => void;
  onDelete: (id: number) => void;
}

export function CertificationGrid({ loading, data, onEdit, onDelete }: CertificationGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {loading ? (
        <p className="text-gray-400">Memuat data...</p>
      ) : data.length === 0 ? (
        <div className="col-span-3 rounded-xl border border-dashed border-gray-300 p-10 text-center text-gray-400 dark:border-gray-700">
          Belum ada sertifikasi.
        </div>
      ) : (
        data.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900"
          >
            <div className="mb-3 flex items-start gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 text-xl dark:bg-yellow-900/20">
                🏆
              </div>
              <div className="flex-1">
                <h3 className="font-semibold leading-tight text-gray-800 dark:text-white">{item.namaSertifikat}</h3>
                <span
                  className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                    penerbitColor[item.penerbit] || "bg-gray-600 text-gray-50"
                  }`}
                >
                  {item.penerbit}
                </span>
              </div>
            </div>

            <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
              {item.kategori && <p>🏷️ {item.kategori}</p>}
              {item.tanggalTerbit && <p>📅 Terbit: {item.tanggalTerbit}</p>}
              {item.tanggalKadaluarsa && <p>⏳ Kadaluarsa: {item.tanggalKadaluarsa}</p>}
              {item.nomorSertifikat && <p>🔢 No: {item.nomorSertifikat}</p>}
            </div>

            {item.linkSertifikat && (
              <a
                href={item.linkSertifikat}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-200"
              >
                Lihat Sertifikat →
              </a>
            )}

            <div className="mt-3 flex gap-2 border-t border-gray-100 pt-3 dark:border-gray-700">
              <button
                onClick={() => onEdit(item)}
                className="flex-1 rounded bg-yellow-600 py-1 text-xs font-medium text-yellow-50 hover:bg-yellow-700"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(item.id!)}
                className="flex-1 rounded bg-red-600 py-1 text-xs font-medium text-red-50 hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
