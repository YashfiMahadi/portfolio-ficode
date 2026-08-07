"use client";
import React, { useEffect, useState } from "react";
import { certificationAPI } from "@/lib/api";

interface Certification {
  id?: number;
  namaSertifikat: string;
  penerbit: string;
  tanggalTerbit: string;
  tanggalKadaluarsa: string;
  nomorSertifikat: string;
  linkSertifikat: string;
  kategori: string;
}

const empty: Certification = {
  namaSertifikat: "", penerbit: "", tanggalTerbit: "",
  tanggalKadaluarsa: "", nomorSertifikat: "", linkSertifikat: "", kategori: ""
};

const kategoriList = ["Programming", "Cloud", "Database", "Design", "Network", "Data Science", "Lainnya"];

export default function CertificationsPage() {
  const [data, setData] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<Certification>(empty);
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

  useEffect(() => { fetchData(); }, []);

  const openAdd = () => { setForm(empty); setEditId(null); setShowModal(true); };
  const openEdit = (item: Certification) => { setForm({ ...empty, ...item }); setEditId(item.id!); setShowModal(true); };
  const closeModal = () => setShowModal(false);

  const handleSave = async () => {
    if (!form.namaSertifikat || !form.penerbit) return alert("Nama sertifikat dan penerbit wajib diisi!");
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

  const penerbitColor: Record<string, string> = {
    "Google": "bg-red-600 text-red-50",
    "Oracle": "bg-orange-600 text-orange-50",
    "Microsoft": "bg-blue-600 text-blue-50",
    "AWS": "bg-yellow-600 text-yellow-50",
    "Udemy": "bg-purple-600 text-purple-50",
    "Coursera": "bg-cyan-600 text-cyan-50",
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Sertifikasi</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Kelola sertifikat dan lisensi kamu</p>
        </div>
        <button onClick={openAdd} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          + Tambah
        </button>
      </div>

      {error && <div className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">{error}</div>}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {loading ? (
          <p className="text-gray-400">Memuat data...</p>
        ) : data.length === 0 ? (
          <div className="col-span-3 rounded-xl border border-dashed border-gray-300 p-10 text-center text-gray-400 dark:border-gray-700">
            Belum ada sertifikasi.
          </div>
        ) : (
          data.map(item => (
            <div key={item.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
              <div className="mb-3 flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 text-xl dark:bg-yellow-900/20">
                  🏆
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold leading-tight text-gray-800 dark:text-white">{item.namaSertifikat}</h3>
                  <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${penerbitColor[item.penerbit] || "bg-gray-600 text-gray-50"}`}>
                    {item.penerbit}
                  </span>
                </div>
              </div>
              <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                {item.kategori && <p>🏷️ {item.kategori}</p>}
                {item.tanggalTerbit && <p>📅 Terbit: {item.tanggalTerbit}</p>}
                {item.tanggalKadaluarsa && <p>⏳ Kadaluarsa: {item.tanggalKadaluarsa}</p>}
                {item.nomorSertifikat && <p>🔢 No: {item.nomorSertifikat}</p>}
              </div>
              {item.linkSertifikat && (
                <a href={item.linkSertifikat} target="_blank" rel="noreferrer"
                  className="mt-3 inline-block rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-200">
                  Lihat Sertifikat →
                </a>
              )}
              <div className="mt-3 flex gap-2 border-t border-gray-100 pt-3 dark:border-gray-700">
                <button onClick={() => openEdit(item)} className="flex-1 rounded bg-yellow-600 py-1 text-xs font-medium text-yellow-50 hover:bg-yellow-700">Edit</button>
                <button onClick={() => handleDelete(item.id!)} className="flex-1 rounded bg-red-600 py-1 text-xs font-medium text-red-50 hover:bg-red-700">Hapus</button>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl dark:bg-gray-900 max-h-[90vh] overflow-y-auto">
            <h2 className="mb-4 text-lg font-bold text-gray-800 dark:text-white">
              {editId ? "Edit Sertifikasi" : "Tambah Sertifikasi"}
            </h2>
            <div className="space-y-3">
              {[
                { label: "Nama Sertifikat *", key: "namaSertifikat", placeholder: "Java Programming Masterclass" },
                { label: "Penerbit *", key: "penerbit", placeholder: "Udemy / Google / Oracle" },
                { label: "Tanggal Terbit", key: "tanggalTerbit", placeholder: "2024-03" },
                { label: "Tanggal Kadaluarsa", key: "tanggalKadaluarsa", placeholder: "2027-03 (kosongkan jika selamanya)" },
                { label: "Nomor Sertifikat", key: "nomorSertifikat", placeholder: "UC-XXXXXXXX" },
                { label: "Link Sertifikat", key: "linkSertifikat", placeholder: "https://..." },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
                  <input
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    value={(form[key as keyof Certification] ?? "") as string}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                  />
                </div>
              ))}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Kategori</label>
                <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  value={form.kategori ?? ""} onChange={e => setForm({ ...form, kategori: e.target.value })}>
                  <option value="">-- Pilih Kategori --</option>
                  {kategoriList.map(k => <option key={k} value={k}>{k}</option>)}
                </select>
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
