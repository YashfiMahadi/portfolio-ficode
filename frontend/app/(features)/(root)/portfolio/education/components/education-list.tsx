"use client";

import type { Education } from "@/app/(features)/(root)/portfolio/education/interfaces/education";
import { jenjangColor } from "@/app/(features)/(root)/portfolio/education/hooks/use-education";
import ConfirmDeleteDialog from "@/shared/components/common/confirm-delete-dialog";

interface EducationListProps {
  loading: boolean;
  data: Education[];
  onEdit: (item: Education) => void;
  onDelete: (id: number) => void;
}

export default function EducationList({ loading, data, onEdit, onDelete }: EducationListProps) {
  if (loading) return <p className="text-gray-400">Memuat data...</p>;

  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center text-gray-400 dark:border-gray-700">
        Belum ada data pendidikan.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <div className="flex items-start justify-between gap-3">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20">
                <span className="text-lg">🎓</span>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-gray-800 dark:text-white">{item.namaInstitusi}</h3>
                  {item.jenjang && (
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${jenjangColor[item.jenjang] || "bg-gray-600 text-gray-50"}`}>
                      {item.jenjang}
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-sm text-blue-600 dark:text-blue-400">{item.jurusan}</p>
                <p className="mt-0.5 text-xs text-gray-500">
                  {item.lokasi && `📍 ${item.lokasi} · `}
                  {item.tanggalMulai} — {item.tanggalSelesai || "Sekarang"}
                  {item.ipk && ` · IPK: ${item.ipk}`}
                </p>
                {item.deskripsi && <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{item.deskripsi}</p>}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => onEdit(item)} className="rounded bg-yellow-600 px-3 py-1 text-xs font-medium text-yellow-50 hover:bg-yellow-700">Edit</button>
              <ConfirmDeleteDialog
                trigger={<button className="rounded bg-red-600 px-3 py-1 text-xs font-medium text-red-50 hover:bg-red-700">Hapus</button>}
                description={`Riwayat pendidikan di "${item.namaInstitusi}" akan dihapus secara permanen.`}
                onConfirm={() => onDelete(item.id!)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
