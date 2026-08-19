"use client";

import Image from "next/image";

import { Profile } from "../interfaces/cv.d";

interface HeroSectionProps {
  profile: Profile | null;
  onScrollTo: (id: string) => void;
}

export function HeroSection({ profile, onScrollTo }: HeroSectionProps) {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-16">
      <div className="mx-auto max-w-6xl px-4 w-full">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12">
          <div className="flex-1">
            <p className="text-blue-400 font-medium mb-2">Halo Semua 👋, Saya</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-3 leading-tight">
              {profile?.nama || "Nama Kamu"}
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-400 mb-6">{profile?.jabatan || "Jabatan"}</h2>

            {profile?.tentangSaya && (
              <p className="text-gray-400 leading-relaxed mb-8 max-w-lg line-clamp-3">{profile.tentangSaya}</p>
            )}

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onScrollTo("contact")}
                className="rounded-lg bg-blue-600 px-6 py-3 font-medium hover:bg-blue-700 transition"
              >
                Hubungi Saya
              </button>
              <button
                onClick={() => onScrollTo("projects")}
                className="rounded-lg border border-white/20 px-6 py-3 font-medium hover:bg-white/10 transition"
              >
                Lihat Proyek
              </button>
            </div>

            <div className="flex gap-4 mt-8">
              {profile?.github && (
                <a href={profile.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition text-sm">
                  GitHub
                </a>
              )}
              {profile?.linkedIn && (
                <a href={profile.linkedIn} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition text-sm">
                  LinkedIn
                </a>
              )}
              {profile?.website && (
                <a href={profile.website} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition text-sm">
                  Website
                </a>
              )}
            </div>
          </div>

          <div className="flex-shrink-0">
            {profile?.fotoUrl ? (
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-blue-600/20 blur-3xl" />
                <Image
                  src={profile.fotoUrl}
                  alt="Foto"
                  width={280}
                  height={280}
                  unoptimized
                  className="relative h-56 w-56 md:h-72 md:w-72 rounded-full object-cover border-4 border-blue-600/30 shadow-2xl"
                />
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
  );
}
