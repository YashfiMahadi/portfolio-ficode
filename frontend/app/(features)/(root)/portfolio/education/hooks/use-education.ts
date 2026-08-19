"use client";

import { useEffect, useState } from "react";
import { educationAPI } from "@/app/(features)/(root)/portfolio/services/portfolio.service";

import { Education } from "../interfaces/education.d";
import { emptyEducation } from "../constants";

export function useEducation() {
  const [data, setData] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<Education>(emptyEducation);
  const [editId, setEditId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await educationAPI.getAll();
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
    setForm(emptyEducation);
    setEditId(null);
    setShowModal(true);
  };

  const openEdit = (item: Education) => {
    setForm({ ...emptyEducation, ...item, ipk: item.ipk?.toString() || "" });
    setEditId(item.id!);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleSave = async () => {
    if (!form.namaInstitusi || !form.jurusan) {
      alert("Nama institusi dan jurusan wajib diisi!");
      return;
    }

    setSaving(true);

    try {
      const payload = { ...form, ipk: form.ipk ? parseFloat(form.ipk) : null };

      if (editId) await educationAPI.update(editId, payload);
      else await educationAPI.create(payload);

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
      await educationAPI.delete(id);
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
