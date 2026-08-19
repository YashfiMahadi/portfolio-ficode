"use client";

import { Skill } from "../interfaces/cv.d";

interface SkillsSectionProps {
  skillByKategori: Record<string, Skill[]>;
}

export function SkillsSection({ skillByKategori }: SkillsSectionProps) {
  const kategoriEntries = Object.entries(skillByKategori);

  return (
    <section id="skills" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <p className="text-blue-400 text-sm font-medium mb-2">Apa yang Saya Kuasai</p>
          <h2 className="text-3xl font-bold">Keahlian & Tech Stack</h2>
        </div>

        {kategoriEntries.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada data skill.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {kategoriEntries.map(([kategori, items]) => (
              <div key={kategori} className="rounded-2xl bg-[#1e293b] p-6 border border-white/5">
                <h3 className="text-blue-400 font-semibold mb-5">{kategori}</h3>
                <div className="space-y-4">
                  {items.map((skill, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-gray-300 font-medium">{skill.namaSkill}</span>
                        <span className="text-gray-500">{skill.levelPersen}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/10">
                        <div
                          className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all"
                          style={{ width: `${skill.levelPersen}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
