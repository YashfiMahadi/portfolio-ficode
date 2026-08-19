"use client";

import { Education } from "../interfaces/cv.d";

interface EducationSectionProps {
  educations: Education[];
}

export function EducationSection({ educations }: EducationSectionProps) {
  return (
    <section id="education" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <p className="text-blue-400 text-sm font-medium mb-2">Latar Belakang</p>
          <h2 className="text-3xl font-bold">Riwayat Pendidikan</h2>
        </div>

        {educations.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada data pendidikan.</p>
        ) : (
          <div className="max-w-3xl mx-auto space-y-4">
            {educations.map((edu, i) => (
              <div key={i} className="flex gap-4 rounded-2xl bg-[#1e293b] p-5 border border-white/5">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-600/20 text-2xl">
                  🎓
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white">{edu.namaInstitusi}</h3>
                    {edu.jenjang && (
                      <span className="rounded-full bg-blue-600/20 px-2 py-0.5 text-xs text-blue-400">{edu.jenjang}</span>
                    )}
                  </div>
                  <p className="text-sm text-blue-400">{edu.jurusan}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {edu.lokasi && `${edu.lokasi} · `}
                    {edu.tanggalMulai} — {edu.tanggalSelesai || "Sekarang"}
                    {edu.ipk && ` · IPK ${edu.ipk}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
