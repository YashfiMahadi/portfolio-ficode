"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/app/(features)/(landing)/components/navbar";
import Footer from "@/app/(features)/(landing)/components/footer";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

async function apiFetch(endpoint: string) {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  if (!res.ok) throw new Error("API error");
  return res.json();
}

interface Profile {
  nama: string; jabatan: string; email: string; telepon: string;
  kota: string; provinsi: string; tentangSaya: string;
  linkedIn: string; github: string; website: string; fotoUrl: string;
}
interface Skill { namaSkill: string; kategori: string; levelPersen: number; }
interface Experience {
  namaPerusahaan: string; posisi: string; lokasiPerusahaan: string;
  tanggalMulai: string; tanggalSelesai: string; deskripsi: string; jenisKerja: string;
}
interface Education {
  namaInstitusi: string; jurusan: string; jenjang: string;
  tanggalMulai: string; tanggalSelesai: string; ipk: number; lokasi: string;
}
interface Project {
  namaProyek: string; deskripsi: string; teknologiDigunakan: string;
  linkGithub: string; linkDemo: string; gambarUrl: string; kategori: string; statusProyek: string;
}
interface Certification {
  namaSertifikat: string; penerbit: string; tanggalTerbit: string;
  linkSertifikat: string; kategori: string;
}


export default function LandingPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiFetch("/profiles"), apiFetch("/skills"), apiFetch("/experiences"),
      apiFetch("/educations"), apiFetch("/projects"), apiFetch("/certifications"),
    ]).then(([p, s, e, ed, pr, c]) => {
      if (p.data?.length > 0) setProfile(p.data[0]);
      setSkills(s.data || []);
      setExperiences(e.data || []);
      setEducations(ed.data || []);
      setProjects(pr.data || []);
      setCertifications(c.data || []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const skillByKategori = skills.reduce((acc, s) => {
    if (!acc[s.kategori]) acc[s.kategori] = [];
    acc[s.kategori].push(s);
    return acc;
  }, {} as Record<string, Skill[]>);

  if (loading) return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f172a]">
      <div className="text-center">
        <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        <p className="text-sm text-gray-400">Memuat portfolio...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <Navbar profileName={profile?.nama} />

      {/* HERO */}
      <section id="hero" className="min-h-screen flex items-center pt-16">
        <div className="mx-auto max-w-6xl px-4 w-full">
          <div className="flex flex-col-reverse md:flex-row items-center gap-12">
            <div className="flex-1">
              <p className="text-blue-400 font-medium mb-2">Halo Semua 👋, Saya</p>
              <h1 className="text-4xl md:text-6xl font-bold mb-3 leading-tight">
                {profile?.nama || "Nama Kamu"}
              </h1>
              <h2 className="text-xl md:text-2xl text-gray-400 mb-6">
                {profile?.jabatan || "Jabatan"}
              </h2>
              {profile?.tentangSaya && (
                <p className="text-gray-400 leading-relaxed mb-8 max-w-lg line-clamp-3">
                  {profile.tentangSaya}
                </p>
              )}
              <div className="flex flex-wrap gap-3">
                <button onClick={() => scrollTo("contact")}
                  className="rounded-lg bg-blue-600 px-6 py-3 font-medium hover:bg-blue-700 transition">
                  Hubungi Saya
                </button>
                <button onClick={() => scrollTo("projects")}
                  className="rounded-lg border border-white/20 px-6 py-3 font-medium hover:bg-white/10 transition">
                  Lihat Proyek
                </button>
              </div>
              <div className="flex gap-4 mt-8">
                {profile?.github && (
                  <a href={profile.github} target="_blank" rel="noreferrer"
                    className="text-gray-400 hover:text-white transition text-sm">GitHub</a>
                )}
                {profile?.linkedIn && (
                  <a href={profile.linkedIn} target="_blank" rel="noreferrer"
                    className="text-gray-400 hover:text-white transition text-sm">LinkedIn</a>
                )}
                {profile?.website && (
                  <a href={profile.website} target="_blank" rel="noreferrer"
                    className="text-gray-400 hover:text-white transition text-sm">Website</a>
                )}
              </div>
            </div>
            <div className="flex-shrink-0">
              {profile?.fotoUrl ? (
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-blue-600/20 blur-3xl" />
                  <Image src={profile.fotoUrl} alt="Foto" width={280} height={280} 
                    unoptimized
                    className="relative h-56 w-56 md:h-72 md:w-72 rounded-full object-cover border-4 border-blue-600/30 shadow-2xl" />
                </div>
              ) : (
                <div className="flex h-56 w-56 md:h-72 md:w-72 items-center justify-center rounded-full bg-blue-600/20 border-4 border-blue-600/30 text-7xl font-bold text-blue-400">
                  {profile?.nama?.charAt(0).toUpperCase() || "?"}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 bg-[#1e293b]">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <p className="text-blue-400 text-sm font-medium mb-2">Siapa Saya</p>
            <h2 className="text-3xl font-bold">Tentang Saya</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              {profile?.fotoUrl ? (
                <Image src={profile.fotoUrl} alt="Foto" width={400} height={400}
                  unoptimized
                  className="rounded-2xl object-cover w-full max-h-80 shadow-xl" />
              ) : (
                <div className="flex h-64 items-center justify-center rounded-2xl bg-blue-600/10 border border-blue-600/20 text-6xl">
                  👤
                </div>
              )}
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">{profile?.jabatan || "Developer"}</h3>
              <p className="text-gray-400 leading-relaxed mb-6">{profile?.tentangSaya || "Deskripsi belum diisi."}</p>
              <div className="space-y-2 text-sm">
                {profile?.email && (
                  <div className="flex gap-3"><span className="text-gray-500 w-20">Email</span><span className="text-gray-300">{profile.email}</span></div>
                )}
                {profile?.telepon && (
                  <div className="flex gap-3"><span className="text-gray-500 w-20">Telepon</span><span className="text-gray-300">{profile.telepon}</span></div>
                )}
                {profile?.kota && (
                  <div className="flex gap-3"><span className="text-gray-500 w-20">Lokasi</span><span className="text-gray-300">{profile.kota}{profile.provinsi ? `, ${profile.provinsi}` : ""}</span></div>
                )}
              </div>
              <div className="flex gap-3 mt-6">
                {profile?.github && (
                  <a href={profile.github} target="_blank" rel="noreferrer"
                    className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10 transition">GitHub</a>
                )}
                {profile?.linkedIn && (
                  <a href={profile.linkedIn} target="_blank" rel="noreferrer"
                    className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10 transition">LinkedIn</a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <p className="text-blue-400 text-sm font-medium mb-2">Apa yang Saya Kuasai</p>
            <h2 className="text-3xl font-bold">Keahlian & Tech Stack</h2>
          </div>
          {Object.keys(skillByKategori).length === 0 ? (
            <p className="text-center text-gray-500">Belum ada data skill.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {Object.entries(skillByKategori).map(([kategori, items]) => (
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
                          <div className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all"
                            style={{ width: `${skill.levelPersen}%` }} />
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

      {/* PROJECTS */}
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
                <div key={i} className="group flex flex-col overflow-hidden rounded-2xl bg-[#0f172a] border border-white/5 hover:border-blue-500/30 transition">
                  <div className="relative h-44 bg-gradient-to-br from-blue-600/20 to-purple-600/20">
                    {proj.gambarUrl
                      ? <img src={proj.gambarUrl} alt={proj.namaProyek} className="h-full w-full object-cover group-hover:scale-105 transition duration-300" />
                      : <div className="flex h-full items-center justify-center text-5xl opacity-50">🚀</div>
                    }
                    {proj.statusProyek && (
                      <span className={`absolute top-3 right-3 rounded-full px-2 py-0.5 text-xs font-medium ${
                        proj.statusProyek === "Selesai" ? "bg-green-500/80 text-white"
                        : proj.statusProyek === "Dalam Pengerjaan" ? "bg-blue-500/80 text-white"
                        : "bg-gray-500/80 text-white"}`}>
                        {proj.statusProyek}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-semibold text-white mb-1">{proj.namaProyek}</h3>
                    {proj.kategori && <p className="text-xs text-blue-400 mb-2">{proj.kategori}</p>}
                    {proj.deskripsi && (
                      <p className="text-sm text-gray-400 line-clamp-2 mb-3">{proj.deskripsi}</p>
                    )}
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
                        <a href={proj.linkGithub} target="_blank" rel="noreferrer"
                          className="rounded-lg border border-white/20 px-3 py-1.5 text-xs hover:bg-white/10 transition">
                          GitHub
                        </a>
                      )}
                      {proj.linkDemo && (
                        <a href={proj.linkDemo} target="_blank" rel="noreferrer"
                          className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs hover:bg-blue-700 transition">
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

      {/* EDUCATION */}
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
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-600/20 text-2xl">🎓</div>
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

      {/* EXPERIENCE */}
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

      {/* CERTIFICATIONS */}
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
                <div key={i} className="flex gap-3 rounded-2xl bg-[#1e293b] p-4 border border-white/5 hover:border-blue-500/30 transition">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-yellow-500/20 text-xl">🏆</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white text-sm truncate">{cert.namaSertifikat}</h3>
                    <p className="text-xs text-blue-400">{cert.penerbit}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-500">{cert.tanggalTerbit}</p>
                      {cert.linkSertifikat && (
                        <a href={cert.linkSertifikat} target="_blank" rel="noreferrer"
                          className="text-xs text-blue-400 hover:text-blue-300">Lihat →</a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 bg-[#1e293b]">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <p className="text-blue-400 text-sm font-medium mb-2">Tertarik Bekerja Sama?</p>
          <h2 className="text-3xl font-bold mb-4">Hubungi Saya</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Saya selalu terbuka untuk kolaborasi, diskusi proyek, atau peluang profesional baru.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {profile?.telepon && (
              <a href={`tel:${profile.telepon}`}
                className="flex items-center gap-2 rounded-lg border border-white/20 px-5 py-3 hover:bg-white/10 transition">
                📱 <span>{profile.telepon}</span>
              </a>
            )}
            {profile?.email && (
              <a href={`mailto:${profile.email}`}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 hover:bg-blue-700 transition">
                📧 <span>{profile.email}</span>
              </a>
            )}
          </div>
          <div className="flex justify-center gap-4">
            {profile?.github && (
              <a href={profile.github} target="_blank" rel="noreferrer"
                className="text-gray-400 hover:text-white transition">GitHub</a>
            )}
            {profile?.linkedIn && (
              <a href={profile.linkedIn} target="_blank" rel="noreferrer"
                className="text-gray-400 hover:text-white transition">LinkedIn</a>
            )}
            {profile?.website && (
              <a href={profile.website} target="_blank" rel="noreferrer"
                className="text-gray-400 hover:text-white transition">Website</a>
            )}
          </div>
        </div>
      </section>

      <Footer profileName={profile?.nama} />
    </div>
  );
}