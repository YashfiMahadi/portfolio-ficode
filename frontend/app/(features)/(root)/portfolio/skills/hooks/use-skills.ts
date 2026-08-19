"use client";

import { useEffect, useState } from "react";
import {
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { skillAPI } from "@/app/(features)/(root)/portfolio/services/portfolio.service";
import { Skill } from "../interfaces/skill.d";
import { emptySkill } from "../constants";
import { getSkillColumns } from "../components/skill-columns";

/**
 * Menyimpan seluruh state & logic untuk halaman Skills:
 * - fetch data dari backend
 * - buka/tutup modal tambah/edit
 * - simpan (create/update) & hapus data
 * - instance react-table (sorting, filter, pagination)
 */
export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<Skill>(emptySkill);
  const [editId, setEditId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  // ===== FETCH DATA =====
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

  // ===== MODAL =====
  const openAdd = () => {
    setForm({ ...emptySkill });
    setEditId(null);
    setShowModal(true);
  };

  const openEdit = (skill: Skill) => {
    setForm({ ...emptySkill, ...skill });
    setEditId(skill.id!);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setForm({ ...emptySkill });
    setEditId(null);
  };

  // ===== SAVE =====
  const handleSave = async () => {
    if (!form.namaSkill || !form.kategori) {
      alert("Nama skill dan kategori wajib diisi!");
      return;
    }

    setSaving(true);

    try {
      if (editId) {
        await skillAPI.update(editId, form);
      } else {
        await skillAPI.create(form);
      }

      closeModal();
      await fetchSkills();
    } catch {
      alert("Gagal menyimpan data.");
    } finally {
      setSaving(false);
    }
  };

  // ===== DELETE =====
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin hapus skill ini?")) return;

    try {
      await skillAPI.delete(id);
      await fetchSkills();
    } catch {
      alert("Gagal menghapus data.");
    }
  };

  // ===== TABLE =====
  const columns = getSkillColumns(openEdit, handleDelete);

  const table = useReactTable({
    data: skills,
    columns,

    state: { sorting, globalFilter },

    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    globalFilterFn: "includesString",

    initialState: {
      pagination: { pageSize: 5 },
    },
  });

  return {
    loading,
    error,
    table,
    globalFilter,
    setGlobalFilter,

    showModal,
    form,
    setForm,
    editId,
    saving,

    openAdd,
    closeModal,
    handleSave,
  };
}
