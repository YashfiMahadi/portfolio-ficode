"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { projectAPI, uploadAPI } from "@/app/(features)/(root)/portfolio/services/portfolio.service";

import { Project } from "../interfaces/project.d";
import { emptyProject } from "../constants";

export function useProjects() {
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<Project>(emptyProject);
  const [editId, setEditId] = useState<number | null>(null);
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

  const openAdd = () => {
    setForm(emptyProject);
    setEditId(null);
    setShowModal(true);
  };

  const openEdit = (item: Project) => {
    setForm({ ...emptyProject, ...item });
    setEditId(item.id!);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleSave = async () => {
    if (!form.namaProyek) {
      alert("Nama proyek wajib diisi!");
      return;
    }

    setSaving(true);

    try {
      if (editId) await projectAPI.update(editId, form);
      else await projectAPI.create(form);

      closeModal();
      fetchData();
    } catch {
      alert("Gagal menyimpan.");
    } finally {
      setSaving(false);
    }
  };

  const handleUploadThumbnail = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const url = await uploadAPI.uploadProjectPhoto(file);
      setForm((prev) => ({ ...prev, gambarUrl: url }));
    } catch {
      alert("Gagal upload thumbnail.");
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
  };
}
