"use client";

import Image from "next/image";

import { Profile } from "../interfaces/cv.d";

interface AboutSectionProps {
  profile: Profile | null;
}

export function AboutSection({ profile }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 bg-[#1e293b]">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <p className="text-blue-400 text-sm font-medium mb-2">Siapa Saya</p>
          <h2 className="text-3xl font-bold">Tentang Saya</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            {profile?.fotoUrl ? (
              <Image
                src={profile.fotoUrl}
                alt="Foto"
                width={400}
                height={400}
                unoptimized
                className="rounded-2xl object-cover w-full max-h-80 shadow-xl"
              />
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
                <div className="flex gap-3">
                  <span className="text-gray-500 w-20">Email</span>
                  <span className="text-gray-300">{profile.email}</span>
                </div>
              )}
              {profile?.telepon && (
                <div className="flex gap-3">
                  <span className="text-gray-500 w-20">Telepon</span>
                  <span className="text-gray-300">{profile.telepon}</span>
                </div>
              )}
              {profile?.kota && (
                <div className="flex gap-3">
                  <span className="text-gray-500 w-20">Lokasi</span>
                  <span className="text-gray-300">
                    {profile.kota}
                    {profile.provinsi ? `, ${profile.provinsi}` : ""}
                  </span>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              {profile?.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10 transition"
                >
                  GitHub
                </a>
              )}
              {profile?.linkedIn && (
                <a
                  href={profile.linkedIn}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10 transition"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
