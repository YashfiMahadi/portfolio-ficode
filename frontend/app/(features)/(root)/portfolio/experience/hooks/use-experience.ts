"use client";

import { useEffect, useState } from "react";
import { experienceAPI } from "@/app/(features)/(root)/portfolio/services/portfolio.service";

import { Experience } from "../interfaces/experience.d";
import { emptyExperience } from "../constants";

export function useExperience() {
  const [data, setData] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<Experience>(emptyExperience);
  const [editId, setEditId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await experienceAPI.getAll();
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
    setForm(emptyExperience);
    setEditId(null);
    setShowModal(true);
  };

  const openEdit = (item: Experience) => {
    setForm({ ...emptyExperience, ...item });
    setEditId(item.id!);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleSave = async () => {
    if (!form.namaPerusahaan || !form.posisi) {
      alert("Nama perusahaan dan posisi wajib diisi!");
      return;
    }

    setSaving(true);

    try {
      if (editId) await experienceAPI.update(editId, form);
      else await experienceAPI.create(form);

      closeModal();
      fetchData();
    } catch {
      alert("Gagal menyimpan.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin hapus?")) return;

    try {
      await experienceAPI.delete(id);
      fetchData();
    } catch {
      alert("Gagal menghapus.");
    }
  };

  return {
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
  };
}
