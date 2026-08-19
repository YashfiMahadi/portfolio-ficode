"use client";
import React, { useEffect, useState, useCallback } from "react";
import { profileAPI, uploadAPI } from "@/shared/services/api";
import { auth } from "@/shared/services/auth.service";
import Image from "next/image";

interface Profile {
  id?: number;
  userId?: number;
  nama: string;
  jabatan: string;
  email: string;
  telepon: string;
  alamat: string;
  kota: string;
  provinsi: string;
  tentangSaya: string;
  linkedIn: string;
  github: string;
  website: string;
  fotoUrl: string;
}

const emptyProfile: Profile = {
  nama: "", jabatan: "", email: "", telepon: "", alamat: "",
  kota: "", provinsi: "", tentangSaya: "", linkedIn: "", github: "", website: "", fotoUrl: ""
};

// ===== Field di LUAR komponen supaya tidak re-render =====
interface FieldProps {
  label: string;
  field: keyof Profile;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (field: keyof Profile, value: string) => void;
}

const Field = ({ label, field, type = "text", placeholder = "", value, onChange }: FieldProps) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    {type === "textarea" ? (
      <textarea
        rows={4}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        value={value ?? ""}
        onChange={e => onChange(field, e.target.value)}
        placeholder={placeholder}
      />
    ) : (
      <input
        type={type}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        value={value ?? ""}
        onChange={e => onChange(field, e.target.value)}
        placeholder={placeholder}
      />
    )}
  </div>
);

// ===== Komponen utama =====
export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [formData, setFormData] = useState<Profile>(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");

  const user = auth.getUser();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const res = await profileAPI.getMyProfile(user.id);
        if (res.status === "success" && res.data) {
          setProfile(res.data);
          setFormData(res.data);
        }
      } catch {
        setError("Gagal memuat profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = useCallback((field: keyof Profile, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSave = async () => {
      if (!user) return;

      console.log("Data yang dikirim:", formData);
      
      if (!formData.nama || !formData.jabatan) return alert("Nama dan jabatan wajib diisi!");
      setSaving(true);
      setSuccessMsg("");
      try {
        const res = await profileAPI.updateMyProfile(user.id, formData);
        if (res.status === "success") {
          setProfile(res.data);
          setFormData(res.data);
          setSuccessMsg("Profile berhasil disimpan!");
          setTimeout(() => setSuccessMsg(""), 3000);
        }
      } catch {
        alert("Gagal menyimpan profile.");
      } finally {
        setSaving(false);
      }
    };

    const handleUploadPhoto = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);

    try {
      // Upload foto
      const url = await uploadAPI.uploadPhoto(file);

      // Data baru
      const updatedData = {
        ...formData,
        fotoUrl: url,
      };

      // Update state
      setFormData(updatedData);

      // Langsung simpan ke database
      const res = await profileAPI.updateMyProfile(user.id, updatedData);

      if (res.status === "success") {
        setProfile(res.data);
        setFormData(res.data);
        setSuccessMsg("Foto profile berhasil diperbarui!");
        setTimeout(() => setSuccessMsg(""), 3000);
      }
    } catch (err) {
      console.error(err);
      alert("Gagal upload foto.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) return (
    <div className="flex h-64 items-center justify-center">
      <p className="text-gray-400">Memuat profile...</p>
    </div>
  );

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">

      {/* Tampilan Profile */}
      <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 overflow-hidden">
        <div className="h-28 bg-gradient-to-r from-blue-600 to-purple-600" />
        <div className="px-6 pb-6">
          <div className="-mt-12 mb-4 flex items-end justify-between">
            <div className="relative">
              {profile.fotoUrl ? (
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
                  {profile.nama ? profile.nama.charAt(0).toUpperCase() : "?"}
                </div>
              )}
              <label className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-blue-600 p-1.5 text-white hover:bg-blue-700">
                <input type="file" accept="image/*" className="hidden" onChange={handleUploadPhoto} />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </label>
            </div>
            {uploading && <p className="text-xs text-blue-500">Mengupload foto...</p>}
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {profile.nama || "Nama belum diisi"}
          </h1>
          <p className="text-blue-600 dark:text-blue-400">{profile.jabatan || "Jabatan belum diisi"}</p>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
            {profile.email && <span>📧 {profile.email}</span>}
            {profile.telepon && <span>📱 {profile.telepon}</span>}
            {profile.kota && <span>📍 {profile.kota}{profile.provinsi ? `, ${profile.provinsi}` : ""}</span>}
            {profile.github && <a href={profile.github} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">🐙 GitHub</a>}
            {profile.linkedIn && <a href={profile.linkedIn} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">💼 LinkedIn</a>}
            {profile.website && <a href={profile.website} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">🌐 Website</a>}
          </div>
          {profile.tentangSaya && (
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{profile.tentangSaya}</p>
          )}
        </div>
      </div>

      {/* Form Edit */}
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
          <Field label="Nama Lengkap *" field="nama" placeholder="Nama kamu" value={formData.nama} onChange={handleChange} />
          <Field label="Jabatan *" field="jabatan" placeholder="Backend Developer" value={formData.jabatan} onChange={handleChange} />
          <Field label="Email" field="email" type="email" placeholder="email@kamu.com" value={formData.email} onChange={handleChange} />
          <Field label="Telepon" field="telepon" placeholder="08123456789" value={formData.telepon} onChange={handleChange} />
          <Field label="Kota" field="kota" placeholder="Bandung" value={formData.kota} onChange={handleChange} />
          <Field label="Provinsi" field="provinsi" placeholder="Jawa Barat" value={formData.provinsi} onChange={handleChange} />
          <div className="sm:col-span-2">
            <Field label="Alamat" field="alamat" placeholder="Jl. Contoh No. 1" value={formData.alamat} onChange={handleChange} />
          </div>
          <Field label="LinkedIn" field="linkedIn" placeholder="https://linkedin.com/in/..." value={formData.linkedIn} onChange={handleChange} />
          <Field label="GitHub" field="github" placeholder="https://github.com/..." value={formData.github} onChange={handleChange} />
          <div className="sm:col-span-2">
            <Field label="Website" field="website" placeholder="https://website.com" value={formData.website} onChange={handleChange} />
          </div>
          <div className="sm:col-span-2">
            <Field label="Tentang Saya" field="tentangSaya" type="textarea" placeholder="Deskripsi singkat tentang dirimu..." value={formData.tentangSaya} onChange={handleChange} />
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button onClick={handleSave} disabled={saving}
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">
            {saving ? "Menyimpan..." : "Simpan Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}