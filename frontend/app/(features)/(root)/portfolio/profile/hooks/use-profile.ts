"use client";

import { ChangeEvent, useCallback, useEffect, useState } from "react";

import { profileAPI, uploadAPI } from "@/app/(features)/(root)/portfolio/services/portfolio.service";
import { auth } from "@/shared/services/auth.service";

import { Profile } from "../interfaces/profile.d";
import { emptyProfile } from "../constants";

export function useProfile() {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = useCallback((field: keyof Profile, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSave = async () => {
    if (!user) return;

    if (!formData.nama || !formData.jabatan) {
      alert("Nama dan jabatan wajib diisi!");
      return;
    }

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

  const handleUploadPhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);

    try {
      const url = await uploadAPI.uploadProfilePhoto(file);
      const updatedData = { ...formData, fotoUrl: url };

      setFormData(updatedData);

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

  return {
    profile,
    formData,
    loading,
    saving,
    uploading,
    successMsg,
    error,
    handleChange,
    handleSave,
    handleUploadPhoto,
  };
}
