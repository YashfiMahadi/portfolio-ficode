"use client";

import { useEffect, useState } from "react";
import { educationAPI } from "@/app/(features)/(root)/portfolio/services/portfolio.service";
import type { Education } from "@/app/(features)/(root)/portfolio/education/interfaces/education";
import type { EducationFormValues } from "@/app/(features)/(root)/portfolio/education/interfaces/education-schema";

export const emptyEducation: EducationFormValues = {
  namaInstitusi: "", jurusan: "", jenjang: "", tanggalMulai: "",
  tanggalSelesai: "", ipk: "", deskripsi: "", lokasi: "",
};

export const jenjangList = ["S2", "S1", "D4", "D3", "SMK", "SMA", "SMP", "SD"];

export const jenjangColor: Record<string, string> = {
  "S2": "bg-purple-600 text-purple-50", "S1": "bg-blue-600 text-blue-50",
  "D4": "bg-blue-600 text-blue-50", "D3": "bg-cyan-600 text-cyan-50",
  "SMA": "bg-green-600 text-green-50", "SMK": "bg-green-600 text-green-50",
  "SMP": "bg-yellow-600 text-yellow-50", "SD": "bg-orange-600 text-orange-50",
};

export function useEducation() {
  const [data, setData] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<Education | null>(null);
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

  const openAdd = () => { setEditItem(null); setShowModal(true); };
  const openEdit = (item: Education) => { setEditItem(item); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditItem(null); };

  const handleSave = async (values: EducationFormValues) => {
    setSaving(true);
    try {
      const payload = { ...values, ipk: values.ipk ? parseFloat(values.ipk) : null };
      if (editItem?.id) await educationAPI.update(editItem.id, payload);
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
    try {
      await educationAPI.delete(id);
      fetchData();
    } catch {
      alert("Gagal menghapus.");
    }
  };

  return { data, loading, error, showModal, editItem, saving, openAdd, openEdit, closeModal, handleSave, handleDelete };
}
