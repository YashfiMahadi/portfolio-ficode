"use client";

import { Experience } from "../interfaces/cv.d";

interface ExperienceSectionProps {
  experiences: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-20 bg-[#1e293b]">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <p className="text-blue-400 text-sm font-medium mb-2">Perjalanan Karir</p>
          <h2 className="text-3xl font-bold">Pengalaman Kerja</h2>
        </div>

        {experiences.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada data pengalaman.</p>
        ) : (
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-5 top-0 h-full w-px bg-blue-600/30" />
            <div className="space-y-6">
              {experiences.map((exp, i) => (
                <div key={i} className="relative pl-14">
                  <div className="absolute left-3 top-2 h-4 w-4 rounded-full border-2 border-blue-500 bg-[#1e293b]" />
                  <div className="rounded-2xl bg-[#0f172a] p-5 border border-white/5">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                      <div>
                        <h3 className="font-semibold text-white">{exp.posisi}</h3>
                        <p className="text-blue-400 text-sm">{exp.namaPerusahaan}</p>
                      </div>
                      {exp.jenisKerja && (
                        <span className="rounded-full bg-blue-600/20 px-2 py-0.5 text-xs text-blue-400">{exp.jenisKerja}</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mb-2">
                      {exp.lokasiPerusahaan && `${exp.lokasiPerusahaan} · `}
                      {exp.tanggalMulai} — {exp.tanggalSelesai || "Sekarang"}
                    </p>
                    {exp.deskripsi && <p className="text-sm text-gray-400">{exp.deskripsi}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
