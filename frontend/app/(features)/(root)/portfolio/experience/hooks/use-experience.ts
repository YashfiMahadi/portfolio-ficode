"use client";

import { useEffect, useState } from "react";
import { experienceAPI } from "@/app/(features)/(root)/portfolio/services/portfolio.service";
import type { Experience } from "@/app/(features)/(root)/portfolio/experience/interfaces/experience";
import type { ExperienceFormValues } from "@/app/(features)/(root)/portfolio/experience/interfaces/experience-schema";

export const emptyExperience: ExperienceFormValues = {
  namaPerusahaan: "", posisi: "", lokasiPerusahaan: "",
  tanggalMulai: "", tanggalSelesai: "", deskripsi: "", jenisKerja: "",
};

export const jenisKerjaList = ["Full-time", "Part-time", "Freelance", "Magang", "Kontrak"];

export function useExperience() {
  const [data, setData] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<Experience | null>(null);
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

  const openAdd = () => { setEditItem(null); setShowModal(true); };
  const openEdit = (item: Experience) => { setEditItem(item); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditItem(null); };

  const handleSave = async (values: ExperienceFormValues) => {
    setSaving(true);
    try {
      if (editItem?.id) await experienceAPI.update(editItem.id, values);
      else await experienceAPI.create(values);
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
      await experienceAPI.delete(id);
      fetchData();
    } catch {
      alert("Gagal menghapus.");
    }
  };

  return { data, loading, error, showModal, editItem, saving, openAdd, openEdit, closeModal, handleSave, handleDelete };
}
