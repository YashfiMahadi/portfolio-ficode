"use client";
import React, { useEffect, useState } from "react";
import { educationAPI } from "@/lib/api";

interface Education {
  id?: number;
  namaInstitusi: string;
  jurusan: string;
  jenjang: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  ipk: string;
  deskripsi: string;
  lokasi: string;
}

const empty: Education = {
  namaInstitusi: "", jurusan: "", jenjang: "", tanggalMulai: "",
  tanggalSelesai: "", ipk: "", deskripsi: "", lokasi: ""
};

const jenjangList = ["S2", "S1", "D4", "D3", "SMK", "SMA", "SMP", "SD"];

export default function EducationPage() {
  const [data, setData] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<Education>(empty);
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

  useEffect(() => { fetchData(); }, []);

  const openAdd = () => { setForm(empty); setEditId(null); setShowModal(true); };
  const openEdit = (item: Education) => { setForm({ ...empty, ...item, ipk: item.ipk?.toString() || "" }); setEditId(item.id!); setShowModal(true); };
  const closeModal = () => setShowModal(false);

  const handleSave = async () => {
    if (!form.namaInstitusi || !form.jurusan) return alert("Nama institusi dan jurusan wajib diisi!");
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

  const jenjangColor: Record<string, string> = {
    "S2": "bg-purple-600 text-purple-50", "S1": "bg-blue-600 text-blue-50",
    "D4": "bg-blue-600 text-blue-50", "D3": "bg-cyan-600 text-cyan-50",
    "SMA": "bg-green-600 text-green-50", "SMK": "bg-green-600 text-green-50",
    "SMP": "bg-yellow-600 text-yellow-50", "SD": "bg-orange-600 text-orange-50",
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Riwayat Pendidikan</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Kelola data pendidikan kamu</p>
        </div>
        <button onClick={openAdd} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          + Tambah
        </button>
      </div>

      {error && <div className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">{error}</div>}

      <div className="space-y-4">
        {loading ? (
          <p className="text-gray-400">Memuat data...</p>
        ) : data.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center text-gray-400 dark:border-gray-700">
            Belum ada data pendidikan.
          </div>
        ) : (
          data.map(item => (
            <div key={item.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20">
                    <span className="text-lg">🎓</span>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-gray-800 dark:text-white">{item.namaInstitusi}</h3>
                      {item.jenjang && (
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${jenjangColor[item.jenjang] || "bg-gray-600 text-gray-50"}`}>
                          {item.jenjang}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-sm text-blue-600 dark:text-blue-400">{item.jurusan}</p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      {item.lokasi && `📍 ${item.lokasi} · `}
                      {item.tanggalMulai} — {item.tanggalSelesai || "Sekarang"}
                      {item.ipk && ` · IPK: ${item.ipk}`}
                    </p>
                    {item.deskripsi && <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{item.deskripsi}</p>}
                  </div>
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

      {showModal && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl dark:bg-gray-900 max-h-[90vh] overflow-y-auto">
            <h2 className="mb-4 text-lg font-bold text-gray-800 dark:text-white">
              {editId ? "Edit Pendidikan" : "Tambah Pendidikan"}
            </h2>
            <div className="space-y-3">
              {[
                { label: "Nama Institusi *", key: "namaInstitusi", placeholder: "STMIK Mardira Indonesia" },
                { label: "Jurusan *", key: "jurusan", placeholder: "Teknik Informatika" },
                { label: "Lokasi", key: "lokasi", placeholder: "Bandung" },
                { label: "Tanggal Mulai", key: "tanggalMulai", placeholder: "2022-09" },
                { label: "Tanggal Selesai", key: "tanggalSelesai", placeholder: "2026-07 / Sekarang" },
                { label: "IPK (opsional)", key: "ipk", placeholder: "3.75" },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
                  <input
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    value={(form[key as keyof Education] ?? "") as string}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                  />
                </div>
              ))}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Jenjang</label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  value={form.jenjang ?? ""}
                  onChange={e => setForm({ ...form, jenjang: e.target.value })}
                >
                  <option value="">-- Pilih Jenjang --</option>
                  {jenjangList.map(j => <option key={j} value={j}>{j}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Deskripsi</label>
                <textarea rows={3}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  value={form.deskripsi ?? ""}
                  onChange={e => setForm({ ...form, deskripsi: e.target.value })}
                  placeholder="Deskripsi tambahan..."
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
