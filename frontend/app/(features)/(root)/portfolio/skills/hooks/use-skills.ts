"use client";

import { useEffect, useState } from "react";
import type { SortingState } from "@tanstack/react-table";
import { skillAPI } from "@/app/(features)/(root)/portfolio/services/portfolio.service";
import type { Skill } from "@/app/(features)/(root)/portfolio/skills/interfaces/skill";
import type { SkillFormValues } from "@/app/(features)/(root)/portfolio/skills/interfaces/skill-schema";

export const emptySkill: SkillFormValues = {
  namaSkill: "",
  kategori: "",
  levelPersen: 0,
  tingkat: "",
};

export const kategoriList: string[] = [
  "Backend",
  "Frontend",
  "Database",
  "Tools",
  "Mobile",
  "Soft Skill",
];

export function getLevelColor(level: number) {
  if (level >= 80) return "bg-green-500";
  if (level >= 60) return "bg-blue-500";
  if (level >= 40) return "bg-yellow-500";
  return "bg-red-400";
}

/**
 * Hook untuk halaman Skills: mengelola data list, state modal
 * tambah/edit, serta operasi create/update/delete ke portfolio.service.
 * Validasi form dilakukan di komponen modal via react-hook-form + zod;
 * hook ini hanya menerima values yang sudah tervalidasi lewat handleSave.
 */
export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<Skill | null>(null);
  const [saving, setSaving] = useState(false);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const fetchSkills = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await skillAPI.getAll();
      setSkills(res.data || []);
    } catch {
      setError("Gagal memuat data skill. Pastikan backend berjalan.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const openAdd = () => {
    setEditItem(null);
    setShowModal(true);
  };

  const openEdit = (skill: Skill) => {
    setEditItem(skill);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditItem(null);
  };

  const handleSave = async (values: SkillFormValues) => {
    setSaving(true);
    try {
      if (editItem?.id) {
        await skillAPI.update(editItem.id, values);
      } else {
        await skillAPI.create(values);
      }
      closeModal();
      await fetchSkills();
    } catch {
      alert("Gagal menyimpan data.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await skillAPI.delete(id);
      await fetchSkills();
    } catch {
      alert("Gagal menghapus data.");
    }
  };

  return {
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
  };
}
