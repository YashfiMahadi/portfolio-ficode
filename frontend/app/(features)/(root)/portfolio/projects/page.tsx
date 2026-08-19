"use client";

import { useProjects } from "./hooks/use-projects";
import { ProjectGrid } from "./components/project-grid";
import { ProjectFormModal } from "./components/project-form-modal";

export default function ProjectsPage() {
  const {
    loading,
    error,
    filtered,
    search,
    setSearch,
    showModal,
    form,
    setForm,
    editId,
    saving,
    uploading,
    openAdd,
    openEdit,
    closeModal,
    handleSave,
    handleDelete,
    handleUploadThumbnail,
  } = useProjects();

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Proyek</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Kelola portofolio proyek kamu</p>
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

      <div className="mb-4">
        <input
          className="w-full max-w-sm rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          placeholder="🔍 Cari proyek atau teknologi..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <ProjectGrid loading={loading} search={search} projects={filtered} onEdit={openEdit} onDelete={handleDelete} />

      <ProjectFormModal
        open={showModal}
        editId={editId}
        form={form}
        saving={saving}
        uploading={uploading}
        onChange={setForm}
        onUploadThumbnail={handleUploadThumbnail}
        onClose={closeModal}
        onSave={handleSave}
      />
    </div>
  );
}
