"use client";

import { Project } from "../interfaces/cv.d";

const statusBadgeClass: Record<string, string> = {
  Selesai: "bg-green-500/80 text-white",
  "Dalam Pengerjaan": "bg-blue-500/80 text-white",
};

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-20 bg-[#1e293b]">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <p className="text-blue-400 text-sm font-medium mb-2">Karya Saya</p>
          <h2 className="text-3xl font-bold">Proyek</h2>
          <p className="text-gray-400 mt-2">Beberapa proyek yang pernah dikembangkan</p>
        </div>

        {projects.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada data proyek.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((proj, i) => (
              <div
                key={i}
                className="group flex flex-col overflow-hidden rounded-2xl bg-[#0f172a] border border-white/5 hover:border-blue-500/30 transition"
              >
                <div className="relative h-44 bg-gradient-to-br from-blue-600/20 to-purple-600/20">
                  {proj.gambarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={proj.gambarUrl}
                      alt={proj.namaProyek}
                      className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-5xl opacity-50">🚀</div>
                  )}
                  {proj.statusProyek && (
                    <span
                      className={`absolute top-3 right-3 rounded-full px-2 py-0.5 text-xs font-medium ${
                        statusBadgeClass[proj.statusProyek] || "bg-gray-500/80 text-white"
                      }`}
                    >
                      {proj.statusProyek}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-semibold text-white mb-1">{proj.namaProyek}</h3>
                  {proj.kategori && <p className="text-xs text-blue-400 mb-2">{proj.kategori}</p>}
                  {proj.deskripsi && <p className="text-sm text-gray-400 line-clamp-2 mb-3">{proj.deskripsi}</p>}

                  {proj.teknologiDigunakan && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {proj.teknologiDigunakan.split(",").slice(0, 4).map((t, j) => (
                        <span key={j} className="rounded bg-white/5 px-2 py-0.5 text-xs text-gray-400 border border-white/10">
                          {t.trim()}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto flex gap-2">
                    {proj.linkGithub && (
                      <a
                        href={proj.linkGithub}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg border border-white/20 px-3 py-1.5 text-xs hover:bg-white/10 transition"
                      >
                        GitHub
                      </a>
                    )}
                    {proj.linkDemo && (
                      <a
                        href={proj.linkDemo}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs hover:bg-blue-700 transition"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
