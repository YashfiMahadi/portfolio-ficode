"use client";

import { Profile } from "../interfaces/cv.d";

interface ContactSectionProps {
  profile: Profile | null;
}

export function ContactSection({ profile }: ContactSectionProps) {
  return (
    <section id="contact" className="py-20 bg-[#1e293b]">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <p className="text-blue-400 text-sm font-medium mb-2">Tertarik Bekerja Sama?</p>
        <h2 className="text-3xl font-bold mb-4">Hubungi Saya</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Saya selalu terbuka untuk kolaborasi, diskusi proyek, atau peluang profesional baru.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {profile?.telepon && (
            <a
              href={`tel:${profile.telepon}`}
              className="flex items-center gap-2 rounded-lg border border-white/20 px-5 py-3 hover:bg-white/10 transition"
            >
              📱 <span>{profile.telepon}</span>
            </a>
          )}
          {profile?.email && (
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 hover:bg-blue-700 transition"
            >
              📧 <span>{profile.email}</span>
            </a>
          )}
        </div>

        <div className="flex justify-center gap-4">
          {profile?.github && (
            <a href={profile.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition">
              GitHub
            </a>
          )}
          {profile?.linkedIn && (
            <a href={profile.linkedIn} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition">
              LinkedIn
            </a>
          )}
          {profile?.website && (
            <a href={profile.website} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition">
              Website
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
