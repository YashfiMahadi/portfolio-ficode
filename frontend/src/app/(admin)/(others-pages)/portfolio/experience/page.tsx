"use client";
import React, { useEffect, useState } from "react";
import { experienceAPI } from "@/lib/api";

interface Experience {
  id?: number;
  namaPerusahaan: string;
  posisi: string;
  lokasiPerusahaan: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  deskripsi: string;
  jenisKerja: string;
}

const empty: Experience = {
  namaPerusahaan: "", posisi: "", lokasiPerusahaan: "",
  tanggalMulai: "", tanggalSelesai: "", deskripsi: "", jenisKerja: ""
};

const jenisKerjaList = ["Full-time", "Part-time", "Freelance", "Magang", "Kontrak"];

export default function ExperiencePage() {
  const [data, setData] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<Experience>(empty);
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

  useEffect(() => { fetchData(); }, []);

  const openAdd = () => { setForm(empty); setEditId(null); setShowModal(true); };
  const openEdit = (item: Experience) => { setForm({ ...empty, ...item }); setEditId(item.id!); setShowModal(true); };
  const closeModal = () => setShowModal(false);

  const handleSave = async () => {
    if (!form.namaPerusahaan || !form.posisi) return alert("Nama perusahaan dan posisi wajib diisi!");
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

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Pengalaman Kerja</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Kelola riwayat pekerjaan kamu</p>
        </div>
        <button onClick={openAdd} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          + Tambah
        </button>
      </div>

      {error && <div className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">{error}</div>}

      {/* Timeline cards */}
      <div className="space-y-4">
        {loading ? (
          <p className="text-gray-400">Memuat data...</p>
        ) : data.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center text-gray-400 dark:border-gray-700">
            Belum ada pengalaman kerja.
          </div>
        ) : (
          data.map(item => (
            <div key={item.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-gray-800 dark:text-white">{item.posisi}</h3>
                    {item.jenisKerja && (
                      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                        {item.jenisKerja}
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-sm font-medium text-blue-600 dark:text-blue-400">{item.namaPerusahaan}</p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {item.lokasiPerusahaan && `📍 ${item.lokasiPerusahaan} · `}
                    {item.tanggalMulai} — {item.tanggalSelesai || "Sekarang"}
                  </p>
                  {item.deskripsi && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{item.deskripsi}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(item)} className="rounded bg-yellow-600 px-3 py-1 text-xs font-medium text-yellow-50 hover:bg-yellow-700">Edit</button>
                  <button onClick={() => handleDelete(item.id!)} className="rounded bg-red-600 px-3 py-1 text-xs font-medium text-red-50 hover:bg-red-700">Hapus</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl dark:bg-gray-900 max-h-[90vh] overflow-y-auto">
            <h2 className="mb-4 text-lg font-bold text-gray-800 dark:text-white">
              {editId ? "Edit Pengalaman" : "Tambah Pengalaman"}
            </h2>
            <div className="space-y-3">
              {[
                { label: "Nama Perusahaan *", key: "namaPerusahaan", placeholder: "PT. Contoh" },
                { label: "Posisi/Jabatan *", key: "posisi", placeholder: "Backend Developer" },
                { label: "Lokasi", key: "lokasiPerusahaan", placeholder: "Bandung" },
                { label: "Tanggal Mulai", key: "tanggalMulai", placeholder: "2023-01" },
                { label: "Tanggal Selesai", key: "tanggalSelesai", placeholder: "2024-06 / Sekarang" },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
                  <input
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    value={(form[key as keyof Experience] ?? "") as string}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                  />
                </div>
              ))}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Jenis Kerja</label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  value={form.jenisKerja ?? ""}
                  onChange={e => setForm({ ...form, jenisKerja: e.target.value })}
                >
                  <option value="">-- Pilih --</option>
                  {jenisKerjaList.map(j => <option key={j} value={j}>{j}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Deskripsi</label>
                <textarea
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  value={form.deskripsi ?? ""}
                  onChange={e => setForm({ ...form, deskripsi: e.target.value })}
                  placeholder="Deskripsi pekerjaan..."
                />
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={closeModal} className="rounded-lg border border-gray-300 px-4 py-2 text-sm dark:border-gray-600 dark:text-gray-300">Batal</button>
              <button onClick={handleSave} disabled={saving} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">
                {saving ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
