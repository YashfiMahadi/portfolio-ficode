"use client";

import { useEffect, useState } from "react";
import { certificationAPI } from "@/app/(features)/(root)/portfolio/services/portfolio.service";

import { Certification } from "../interfaces/certification.d";
import { emptyCertification } from "../constants";

export function useCertifications() {
  const [data, setData] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<Certification>(emptyCertification);
  const [editId, setEditId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await certificationAPI.getAll();
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
    setForm(emptyCertification);
    setEditId(null);
    setShowModal(true);
  };

  const openEdit = (item: Certification) => {
    setForm({ ...emptyCertification, ...item });
    setEditId(item.id!);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleSave = async () => {
    if (!form.namaSertifikat || !form.penerbit) {
      alert("Nama sertifikat dan penerbit wajib diisi!");
      return;
    }

    setSaving(true);

    try {
      if (editId) await certificationAPI.update(editId, form);
      else await certificationAPI.create(form);

      closeModal();
      fetchData();
    } catch {
      alert("Gagal menyimpan.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin hapus sertifikasi ini?")) return;

    try {
      await certificationAPI.delete(id);
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
