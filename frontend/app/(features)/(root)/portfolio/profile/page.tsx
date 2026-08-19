"use client";

import { useProfile } from "./hooks/use-profile";
import { ProfileHeaderCard } from "./components/profile-header-card";
import { ProfileEditForm } from "./components/profile-edit-form";

export default function ProfilePage() {
  const {
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
  } = useProfile();

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-gray-400">Memuat profile...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 md:p-6">
      <ProfileHeaderCard profile={profile} uploading={uploading} onUploadPhoto={handleUploadPhoto} />

      <ProfileEditForm
        formData={formData}
        saving={saving}
        successMsg={successMsg}
        error={error}
        onChange={handleChange}
        onSave={handleSave}
      />
    </div>
  );
}
