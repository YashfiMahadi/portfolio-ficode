"use client";

import { useEffect, useState } from "react";
import { profileAPI, uploadAPI } from "@/app/(features)/(root)/portfolio/services/portfolio.service";
import { auth } from "@/shared/services/auth.service";
import type { PortfolioProfile } from "@/app/(features)/(root)/portfolio/profile/interfaces/profile";
import type { PortfolioProfileFormValues } from "@/app/(features)/(root)/portfolio/profile/interfaces/profile-schema";

export const emptyProfile: PortfolioProfileFormValues = {
  nama: "", jabatan: "", email: "", telepon: "", alamat: "",
  kota: "", provinsi: "", tentangSaya: "", linkedIn: "", github: "", website: "", fotoUrl: "",
};

/**
 * Hook untuk halaman Profile (portfolio): mengambil, mengedit, dan
 * menyimpan data profile milik user yang sedang login, termasuk upload foto.
 * Validasi form dilakukan di komponen form via react-hook-form + zod.
 */
export function usePortfolioProfile() {
  const [profile, setProfile] = useState<PortfolioProfile | null>(null);
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
        }
      } catch {
        setError("Gagal memuat profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async (values: PortfolioProfileFormValues) => {
    if (!user) return;
    setSaving(true);
    setSuccessMsg("");
    try {
      const res = await profileAPI.updateMyProfile(user.id, values);
      if (res.status === "success") {
        setProfile(res.data);
        setSuccessMsg("Profile berhasil disimpan!");
        setTimeout(() => setSuccessMsg(""), 3000);
      }
    } catch {
      alert("Gagal menyimpan profile.");
    } finally {
      setSaving(false);
    }
  };

  /** Upload foto lalu langsung simpan fotoUrl-nya ke backend. */
  const uploadPhoto = async (file: File): Promise<void> => {
    if (!user) return;
    setUploading(true);
    try {
      const url = await uploadAPI.uploadProfilePhoto(file);
      const updated = { ...emptyProfile, ...profile, fotoUrl: url };
      const res = await profileAPI.updateMyProfile(user.id, updated);
      if (res.status === "success") {
        setProfile(res.data);
        setSuccessMsg("Foto profile berhasil diperbarui!");
        setTimeout(() => setSuccessMsg(""), 3000);
      }
    } catch {
      alert("Gagal upload foto.");
    } finally {
      setUploading(false);
    }
  };

  return {
    profile,
    loading,
    saving,
    uploading,
    successMsg,
    error,
    handleSave,
    uploadPhoto,
  };
}
