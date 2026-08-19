"use client";
import React, { useEffect, useState } from "react";
import { projectAPI, uploadAPI } from "@/shared/services/api";

interface Project {
  id?: number;
  namaProyek: string;
  deskripsi: string;
  teknologiDigunakan: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  linkGithub: string;
  linkDemo: string;
  gambarUrl: string;
  kategori: string;
  statusProyek: string;
}

const empty: Project = {
  namaProyek: "", deskripsi: "", teknologiDigunakan: "", tanggalMulai: "",
  tanggalSelesai: "", linkGithub: "", linkDemo: "", gambarUrl: "", kategori: "", statusProyek: ""
};

const kategoriList = ["Web", "Mobile", "Desktop", "Data Science", "IoT", "Game", "Lainnya"];
const statusList = ["Selesai", "Dalam Pengerjaan", "Ditangguhkan"];

export default function ProjectsPage() {
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<Project>(empty);
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

  useEffect(() => { fetchData(); }, []);

  const openAdd = () => { setForm(empty); setEditId(null); setShowModal(true); };
  const openEdit = (item: Project) => { setForm({ ...empty, ...item }); setEditId(item.id!); setShowModal(true); };
  const closeModal = () => setShowModal(false);

  const handleSave = async () => {
    if (!form.namaProyek) return alert("Nama proyek wajib diisi!");
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

  const handleUploadThumbnail = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadAPI.uploadPhoto(file);
      setForm(prev => ({ ...prev, gambarUrl: url }));
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

  const statusColor: Record<string, string> = {
    "Selesai": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    "Dalam Pengerjaan": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    "Ditangguhkan": "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
  };

  const filtered = data.filter(p =>
    p.namaProyek.toLowerCase().includes(search.toLowerCase()) ||
    p.teknologiDigunakan?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Proyek</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Kelola portofolio proyek kamu</p>
        </div>
        <button onClick={openAdd} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          + Tambah
        </button>
      </div>

      {error && <div className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">{error}</div>}

      <div className="mb-4">
        <input
          className="w-full max-w-sm rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          placeholder="🔍 Cari proyek atau teknologi..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {loading ? (
          <p className="text-gray-400">Memuat data...</p>
        ) : filtered.length === 0 ? (
          <div className="col-span-3 rounded-xl border border-dashed border-gray-300 p-10 text-center text-gray-400 dark:border-gray-700">
            {search ? "Tidak ada proyek yang cocok." : "Belum ada proyek."}
          </div>
        ) : (
          filtered.map(item => (
            <div key={item.id} className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
              <div className="relative h-32 rounded-t-xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
                {item.gambarUrl ? (
                  <img src={item.gambarUrl} alt={item.namaProyek} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="text-4xl">🚀</span>
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-gray-800 dark:text-white">{item.namaProyek}</h3>
                  {item.statusProyek && (
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap ${statusColor[item.statusProyek] || "bg-gray-100 text-gray-600"}`}>
                      {item.statusProyek}
                    </span>
                  )}
                </div>
                {item.kategori && <p className="mt-0.5 text-xs text-gray-400">{item.kategori}</p>}
                {item.deskripsi && (
                  <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">{item.deskripsi}</p>
                )}
                {item.teknologiDigunakan && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {item.teknologiDigunakan.split(",").map((t, i) => (
                      <span key={i} className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                        {t.trim()}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-3 flex gap-2">
                  {item.linkGithub && (
                    <a href={item.linkGithub} target="_blank" rel="noreferrer"
                      className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300">
                      GitHub
                    </a>
                  )}
                  {item.linkDemo && (
                    <a href={item.linkDemo} target="_blank" rel="noreferrer"
                      className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-200">
                      Demo
                    </a>
                  )}
                </div>
                <div className="mt-3 flex gap-2 border-t border-gray-100 pt-3 dark:border-gray-700">
                  <button onClick={() => openEdit(item)} className="flex-1 rounded bg-yellow-600 py-1 text-xs font-medium text-yellow-50 hover:bg-yellow-700">Edit</button>
                  <button onClick={() => handleDelete(item.id!)} className="flex-1 rounded bg-red-600 py-1 text-xs font-medium text-red-50 hover:bg-red-700">Hapus</button>
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
              {editId ? "Edit Proyek" : "Tambah Proyek"}
            </h2>
            <div className="space-y-3">

              {/* Thumbnail Upload */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Thumbnail Proyek
                </label>
                <div className="flex items-center gap-3">
                  <div className="h-16 w-24 overflow-hidden rounded-lg border border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-700">
                    {form.gambarUrl ? (
                      <img src={form.gambarUrl} alt="thumbnail" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-2xl">🚀</div>
                    )}
                  </div>
                  <label className="cursor-pointer rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
                    <input type="file" accept="image/*" className="hidden" onChange={handleUploadThumbnail} />
                    {uploading ? "Mengupload..." : "📁 Pilih Foto"}
                  </label>
                  {form.gambarUrl && (
                    <button type="button" onClick={() => setForm({ ...form, gambarUrl: "" })}
                      className="text-xs text-red-500 hover:text-red-700">
                      Hapus
                    </button>
                  )}
                </div>
              </div>

              {[
                { label: "Nama Proyek *", key: "namaProyek", placeholder: "Portfolio CV Digital" },
                { label: "Teknologi Digunakan", key: "teknologiDigunakan", placeholder: "Java, Spring Boot, MySQL, React" },
                { label: "Tanggal Mulai", key: "tanggalMulai", placeholder: "2024-01" },
                { label: "Tanggal Selesai", key: "tanggalSelesai", placeholder: "2024-06 / Sekarang" },
                { label: "Link GitHub", key: "linkGithub", placeholder: "https://github.com/..." },
                { label: "Link Demo", key: "linkDemo", placeholder: "https://..." },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
                  <input
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    value={(form[key as keyof Project] ?? "") as string}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                  />
                </div>
              ))}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Kategori</label>
                  <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    value={form.kategori ?? ""} onChange={e => setForm({ ...form, kategori: e.target.value })}>
                    <option value="">-- Pilih --</option>
                    {kategoriList.map(k => <option key={k} value={k}>{k}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                  <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    value={form.statusProyek ?? ""} onChange={e => setForm({ ...form, statusProyek: e.target.value })}>
                    <option value="">-- Pilih --</option>
                    {statusList.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Deskripsi</label>
                <textarea rows={3}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  value={form.deskripsi ?? ""}
                  onChange={e => setForm({ ...form, deskripsi: e.target.value })}
                  placeholder="Deskripsi proyek..."
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