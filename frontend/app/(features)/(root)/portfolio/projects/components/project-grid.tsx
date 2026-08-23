"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/app/(features)/(root)/portfolio/projects/interfaces/project";
import { statusColor } from "@/app/(features)/(root)/portfolio/projects/hooks/use-projects";

interface ProjectGridProps {
  loading: boolean;
  search: string;
  filtered: Project[];
  onEdit: (item: Project) => void;
  onDelete: (id: number) => void;
}

export default function ProjectGrid({ loading, search, filtered, onEdit, onDelete }: ProjectGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {loading ? (
        <p className="text-gray-400">Memuat data...</p>
      ) : filtered.length === 0 ? (
        <div className="col-span-3 rounded-xl border border-dashed border-gray-300 p-10 text-center text-gray-400 dark:border-gray-700">
          {search ? "Tidak ada proyek yang cocok." : "Belum ada proyek."}
        </div>
      ) : (
        filtered.map((item) => (
          <div key={item.id} className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <div className="relative h-32 rounded-t-xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
              {item.gambarUrl ? (
                <Image src={item.gambarUrl} alt={item.namaProyek} fill unoptimized className="object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="text-4xl">🚀</span>
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-gray-800 dark:text-white">{item.namaProyek}</h3>
                {item.statusProyek && (
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap ${statusColor[item.statusProyek] || "bg-gray-100 text-gray-600"}`}>
                    {item.statusProyek}
                  </span>
                )}
              </div>
              {item.kategori && <p className="mt-0.5 text-xs text-gray-400">{item.kategori}</p>}
              {item.deskripsi && (
                <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">{item.deskripsi}</p>
              )}
              {item.teknologiDigunakan && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {item.teknologiDigunakan.split(",").map((t, i) => (
                    <span key={i} className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                      {t.trim()}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-3 flex gap-2">
                {item.linkGithub && (
                  <a href={item.linkGithub} target="_blank" rel="noreferrer"
                    className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300">
                    GitHub
                  </a>
                )}
                {item.linkDemo && (
                  <a href={item.linkDemo} target="_blank" rel="noreferrer"
                    className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-200">
                    Demo
                  </a>
                )}
              </div>
              <div className="mt-3 flex gap-2 border-t border-gray-100 pt-3 dark:border-gray-700">
                <button onClick={() => onEdit(item)} className="flex-1 rounded bg-yellow-600 py-1 text-xs font-medium text-yellow-50 hover:bg-yellow-700">Edit</button>
                <button onClick={() => onDelete(item.id!)} className="flex-1 rounded bg-red-600 py-1 text-xs font-medium text-red-50 hover:bg-red-700">Hapus</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
