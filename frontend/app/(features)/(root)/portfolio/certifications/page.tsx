"use client";

import { useCertifications } from "@/app/(features)/(root)/portfolio/certifications/hooks/use-certifications";
import CertificationGrid from "@/app/(features)/(root)/portfolio/certifications/components/certification-grid";
import CertificationFormModal from "@/app/(features)/(root)/portfolio/certifications/components/certification-form-modal";

export default function CertificationsPage() {
  const { data, loading, error, showModal, editItem, saving, openAdd, openEdit, closeModal, handleSave, handleDelete } = useCertifications();

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Sertifikasi</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Kelola sertifikat dan lisensi kamu</p>
        </div>
        <button onClick={openAdd} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          + Tambah
        </button>
      </div>

      {error && <div className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">{error}</div>}

      <CertificationGrid loading={loading} data={data} onEdit={openEdit} onDelete={handleDelete} />

      {showModal && (
        <CertificationFormModal editItem={editItem} saving={saving} onClose={closeModal} onSave={handleSave} />
      )}
    </div>
  );
}
