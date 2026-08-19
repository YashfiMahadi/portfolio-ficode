"use client";

import { useExperience } from "./hooks/use-experience";
import { ExperienceList } from "./components/experience-list";
import { ExperienceFormModal } from "./components/experience-form-modal";

export default function ExperiencePage() {
  const {
    data,
    loading,
    error,
    showModal,
    form,
    setForm,
    editId,
    saving,
    openAdd,
    openEdit,
    closeModal,
    handleSave,
    handleDelete,
  } = useExperience();

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Pengalaman Kerja</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Kelola riwayat pekerjaan kamu</p>
        </div>
        <button
          onClick={openAdd}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          + Tambah
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">
          {error}
        </div>
      )}

      <ExperienceList loading={loading} data={data} onEdit={openEdit} onDelete={handleDelete} />

      <ExperienceFormModal
        open={showModal}
        editId={editId}
        form={form}
        saving={saving}
        onChange={setForm}
        onClose={closeModal}
        onSave={handleSave}
      />
    </div>
  );
}
