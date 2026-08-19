"use client";

import { Profile } from "../interfaces/profile.d";
import { ProfileField } from "./profile-field";

interface ProfileEditFormProps {
  formData: Profile;
  saving: boolean;
  successMsg: string;
  error: string;
  onChange: (field: keyof Profile, value: string) => void;
  onSave: () => void;
}

export function ProfileEditForm({ formData, saving, successMsg, error, onChange, onSave }: ProfileEditFormProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
      <h2 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white">Edit Profile</h2>

      {successMsg && (
        <div className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-400">
          ✅ {successMsg}
        </div>
      )}
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">
          ❌ {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <ProfileField label="Nama Lengkap *" field="nama" placeholder="Nama kamu" value={formData.nama} onChange={onChange} />
        <ProfileField label="Jabatan *" field="jabatan" placeholder="Backend Developer" value={formData.jabatan} onChange={onChange} />
        <ProfileField label="Email" field="email" type="email" placeholder="email@kamu.com" value={formData.email} onChange={onChange} />
        <ProfileField label="Telepon" field="telepon" placeholder="08123456789" value={formData.telepon} onChange={onChange} />
        <ProfileField label="Kota" field="kota" placeholder="Bandung" value={formData.kota} onChange={onChange} />
        <ProfileField label="Provinsi" field="provinsi" placeholder="Jawa Barat" value={formData.provinsi} onChange={onChange} />

        <div className="sm:col-span-2">
          <ProfileField label="Alamat" field="alamat" placeholder="Jl. Contoh No. 1" value={formData.alamat} onChange={onChange} />
        </div>

        <ProfileField label="LinkedIn" field="linkedIn" placeholder="https://linkedin.com/in/..." value={formData.linkedIn} onChange={onChange} />
        <ProfileField label="GitHub" field="github" placeholder="https://github.com/..." value={formData.github} onChange={onChange} />

        <div className="sm:col-span-2">
          <ProfileField label="Website" field="website" placeholder="https://website.com" value={formData.website} onChange={onChange} />
        </div>

        <div className="sm:col-span-2">
          <ProfileField
            label="Tentang Saya"
            field="tentangSaya"
            type="textarea"
            placeholder="Deskripsi singkat tentang dirimu..."
            value={formData.tentangSaya}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          onClick={onSave}
          disabled={saving}
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Menyimpan..." : "Simpan Profile"}
        </button>
      </div>
    </div>
  );
}
