"use client";

import { Certification } from "../interfaces/cv.d";

interface CertificationsSectionProps {
  certifications: Certification[];
}

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
  return (
    <section id="certifications" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <p className="text-blue-400 text-sm font-medium mb-2">Pencapaian</p>
          <h2 className="text-3xl font-bold">Sertifikasi</h2>
        </div>

        {certifications.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada data sertifikasi.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {certifications.map((cert, i) => (
              <div
                key={i}
                className="flex gap-3 rounded-2xl bg-[#1e293b] p-4 border border-white/5 hover:border-blue-500/30 transition"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-yellow-500/20 text-xl">
                  🏆
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-white text-sm truncate">{cert.namaSertifikat}</h3>
                  <p className="text-xs text-blue-400">{cert.penerbit}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-gray-500">{cert.tanggalTerbit}</p>
                    {cert.linkSertifikat && (
                      <a href={cert.linkSertifikat} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:text-blue-300">
                        Lihat →
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
