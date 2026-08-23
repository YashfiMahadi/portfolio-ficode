"use client";

import { useEffect, useState } from "react";
import { projectAPI, uploadAPI } from "@/app/(features)/(root)/portfolio/services/portfolio.service";
import type { Project } from "@/app/(features)/(root)/portfolio/projects/interfaces/project";
import type { ProjectFormValues } from "@/app/(features)/(root)/portfolio/projects/interfaces/project-schema";

export const emptyProject: ProjectFormValues = {
  namaProyek: "", deskripsi: "", teknologiDigunakan: "", tanggalMulai: "",
  tanggalSelesai: "", linkGithub: "", linkDemo: "", gambarUrl: "", kategori: "", statusProyek: "",
};

export const kategoriList = ["Web", "Mobile", "Desktop", "Data Science", "IoT", "Game", "Lainnya"];
export const statusList = ["Selesai", "Dalam Pengerjaan", "Ditangguhkan"];

export const statusColor: Record<string, string> = {
  "Selesai": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  "Dalam Pengerjaan": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  "Ditangguhkan": "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
};

/**
 * Hook untuk halaman Projects: data list, pencarian, state modal
 * tambah/edit, upload thumbnail, serta operasi CRUD ke portfolio.service.
 * Validasi form dilakukan di komponen modal via react-hook-form + zod.
 */
export function useProjects() {
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await projectAPI.getAll();
      setData(res.data || []);
    } catch {
      setError("Gagal memuat data. Pastikan backend berjalan.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAdd = () => { setEditItem(null); setShowModal(true); };
  const openEdit = (item: Project) => { setEditItem(item); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditItem(null); };

  const handleSave = async (values: ProjectFormValues) => {
    setSaving(true);
    try {
      if (editItem?.id) await projectAPI.update(editItem.id, values);
      else await projectAPI.create(values);
      closeModal();
      fetchData();
    } catch {
      alert("Gagal menyimpan.");
    } finally {
      setSaving(false);
    }
  };

  const uploadThumbnail = async (file: File): Promise<string | null> => {
    setUploading(true);
    try {
      return await uploadAPI.uploadPhoto(file);
    } catch {
      alert("Gagal upload thumbnail.");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin hapus proyek ini?")) return;
    try {
      await projectAPI.delete(id);
      fetchData();
    } catch {
      alert("Gagal menghapus.");
    }
  };

  const filtered = data.filter(
    (p) =>
      p.namaProyek.toLowerCase().includes(search.toLowerCase()) ||
      p.teknologiDigunakan?.toLowerCase().includes(search.toLowerCase())
  );

  return {
    filtered,
    loading,
    error,
    showModal,
    editItem,
    saving,
    uploading,
    search,
    setSearch,
    openAdd,
    openEdit,
    closeModal,
    handleSave,
    uploadThumbnail,
    handleDelete,
  };
}
