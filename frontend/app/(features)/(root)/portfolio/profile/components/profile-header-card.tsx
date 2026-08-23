"use client";

import Image from "next/image";
import type { PortfolioProfile } from "@/app/(features)/(root)/portfolio/profile/interfaces/profile";

interface ProfileHeaderCardProps {
  profile: PortfolioProfile | null;
  uploading: boolean;
  onUploadPhoto: (file: File) => void;
}

export default function ProfileHeaderCard({ profile, uploading, onUploadPhoto }: ProfileHeaderCardProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUploadPhoto(file);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 overflow-hidden">
      <div className="h-28 bg-gradient-to-r from-blue-600 to-purple-600" />
      <div className="px-6 pb-6">
        <div className="-mt-12 mb-4 flex items-end justify-between">
          <div className="relative">
            {profile?.fotoUrl ? (
              <Image
                src={profile.fotoUrl}
                alt="Foto Profile"
                width={96}
                height={96}
                unoptimized
                className="h-24 w-24 rounded-full border-4 border-white object-cover dark:border-gray-900"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-blue-100 text-4xl font-bold text-blue-600 dark:border-gray-900 dark:bg-blue-900/30">
                {profile?.nama ? profile.nama.charAt(0).toUpperCase() : "?"}
              </div>
            )}
            <label className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-blue-600 p-1.5 text-white hover:bg-blue-700">
              <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </label>
          </div>
          {uploading && <p className="text-xs text-blue-500">Mengupload foto...</p>}
        </div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{profile?.nama || "Nama belum diisi"}</h1>
        <p className="text-blue-600 dark:text-blue-400">{profile?.jabatan || "Jabatan belum diisi"}</p>
        <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
          {profile?.email && <span>📧 {profile.email}</span>}
          {profile?.telepon && <span>📱 {profile.telepon}</span>}
          {profile?.kota && <span>📍 {profile.kota}{profile.provinsi ? `, ${profile.provinsi}` : ""}</span>}
          {profile?.github && <a href={profile.github} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">🐙 GitHub</a>}
          {profile?.linkedIn && <a href={profile.linkedIn} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">💼 LinkedIn</a>}
          {profile?.website && <a href={profile.website} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">🌐 Website</a>}
        </div>
        {profile?.tentangSaya && (
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{profile.tentangSaya}</p>
        )}
      </div>
    </div>
  );
}
