"use client";

import { usePortfolioProfile } from "@/app/(features)/(root)/portfolio/profile/hooks/use-portfolio-profile";
import ProfileHeaderCard from "@/app/(features)/(root)/portfolio/profile/components/profile-header-card";
import ProfileEditForm from "@/app/(features)/(root)/portfolio/profile/components/profile-edit-form";

export default function PortfolioProfilePage() {
  const {
    profile,
    loading,
    saving,
    uploading,
    successMsg,
    error,
    handleSave,
    uploadPhoto,
  } = usePortfolioProfile();

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-gray-400">Memuat profile...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
      <ProfileHeaderCard profile={profile} uploading={uploading} onUploadPhoto={uploadPhoto} />
      <ProfileEditForm
        profile={profile}
        saving={saving}
        successMsg={successMsg}
        error={error}
        onSave={handleSave}
      />
    </div>
  );
}
