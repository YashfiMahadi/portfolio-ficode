"use client";

import { Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useSkills } from "@/app/(features)/(root)/portfolio/skills/hooks/use-skills";
import { getSkillColumns } from "@/app/(features)/(root)/portfolio/skills/components/columns";
import SkillsDataTable from "@/app/(features)/(root)/portfolio/skills/components/skills-data-table";
import SkillFormModal from "@/app/(features)/(root)/portfolio/skills/components/skill-form-modal";

export default function SkillsPage() {
  const {
    skills,
    loading,
    error,
    showModal,
    editItem,
    saving,
    sorting,
    setSorting,
    globalFilter,
    setGlobalFilter,
    openAdd,
    openEdit,
    closeModal,
    handleSave,
    handleDelete,
  } = useSkills();

  const columns = getSkillColumns({ onEdit: openEdit, onDelete: handleDelete });

  return (
    <div className="p-4 md:p-6">
      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Keahlian / Skill</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Kelola data keahlian kamu</p>
        </div>
        <Button onClick={openAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Skill
        </Button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">
          {error}
        </div>
      )}

      {/* DATATABLE */}
      <SkillsDataTable
        data={skills}
        columns={columns}
        loading={loading}
        sorting={sorting}
        onSortingChange={setSorting}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
      />

      {/* MODAL */}
      {showModal && (
        <SkillFormModal
          editItem={editItem}
          saving={saving}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
