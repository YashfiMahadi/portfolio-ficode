"use client";

import { useEffect, useState } from "react";
import { certificationAPI } from "@/app/(features)/(root)/portfolio/services/portfolio.service";
import type { Certification } from "@/app/(features)/(root)/portfolio/certifications/interfaces/certification";
import type { CertificationFormValues } from "@/app/(features)/(root)/portfolio/certifications/interfaces/certification-schema";

export const emptyCertification: CertificationFormValues = {
  namaSertifikat: "", penerbit: "", tanggalTerbit: "",
  tanggalKadaluarsa: "", nomorSertifikat: "", linkSertifikat: "", kategori: "",
};

export const kategoriList = ["Programming", "Cloud", "Database", "Design", "Network", "Data Science", "Lainnya"];

export const penerbitColor: Record<string, string> = {
  "Google": "bg-red-600 text-red-50",
  "Oracle": "bg-orange-600 text-orange-50",
  "Microsoft": "bg-blue-600 text-blue-50",
  "AWS": "bg-yellow-600 text-yellow-50",
  "Udemy": "bg-purple-600 text-purple-50",
  "Coursera": "bg-cyan-600 text-cyan-50",
};

export function useCertifications() {
  const [data, setData] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<Certification | null>(null);
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

  const openAdd = () => { setEditItem(null); setShowModal(true); };
  const openEdit = (item: Certification) => { setEditItem(item); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditItem(null); };

  const handleSave = async (values: CertificationFormValues) => {
    setSaving(true);
    try {
      if (editItem?.id) await certificationAPI.update(editItem.id, values);
      else await certificationAPI.create(values);
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
      await certificationAPI.delete(id);
      fetchData();
    } catch {
      alert("Gagal menghapus.");
    }
  };

  return { data, loading, error, showModal, editItem, saving, openAdd, openEdit, closeModal, handleSave, handleDelete };
}
