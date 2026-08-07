"use client";
import React, { useEffect, useState } from "react";
import { skillAPI } from "@/lib/api";

interface Skill {
  id?: number;
  namaSkill: string;
  kategori: string;
  levelPersen: number;
  tingkat?: string;
}

const emptySkill: Skill = { namaSkill: "", kategori: "", levelPersen: 0 };
const kategoriList = ["Backend", "Frontend", "Database", "Tools", "Mobile", "Soft Skill"];

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<Skill>(emptySkill);
  const [editId, setEditId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const res = await skillAPI.getAll();
      setSkills(res.data || []);
    } catch {
      setError("Gagal memuat data skill. Pastikan backend berjalan.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSkills(); }, []);

  const openAdd = () => { setForm(emptySkill); setEditId(null); setShowModal(true); };
  const openEdit = (s: Skill) => { setForm({ ...emptySkill, ...s }); setEditId(s.id!); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setForm(emptySkill); };

  const handleSave = async () => {
    if (!form.namaSkill || !form.kategori) return alert("Nama skill dan kategori wajib diisi!");
    setSaving(true);
    try {
      if (editId) {
        await skillAPI.update(editId, form);
      } else {
        await skillAPI.create(form);
      }
      closeModal();
      fetchSkills();
    } catch {
      alert("Gagal menyimpan data.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin hapus skill ini?")) return;
    try {
      await skillAPI.delete(id);
      fetchSkills();
    } catch {
      alert("Gagal menghapus data.");
    }
  };

  const getLevelColor = (level: number) => {
    if (level >= 80) return "bg-green-500";
    if (level >= 60) return "bg-blue-500";
    if (level >= 40) return "bg-yellow-500";
    return "bg-red-400";
  };

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Keahlian / Skill</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Kelola data keahlian kamu</p>
        </div>
        <button
          onClick={openAdd}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          + Tambah Skill
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">No</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">Nama Skill</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">Kategori</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">Level</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">Tingkat</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {loading ? (
                <tr><td colSpan={6} className="py-8 text-center text-gray-400">Memuat data...</td></tr>
              ) : skills.length === 0 ? (
                <tr><td colSpan={6} className="py-8 text-center text-gray-400">Belum ada data skill</td></tr>
              ) : (
                skills.map((s, i) => (
                  <tr key={s.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                    <td className="px-4 py-3 font-medium text-gray-800 dark:text-white">{s.namaSkill}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                        {s.kategori}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 rounded-full bg-gray-200 dark:bg-gray-700">
                          <div
                            className={`h-2 rounded-full ${getLevelColor(s.levelPersen)}`}
                            style={{ width: `${s.levelPersen}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{s.levelPersen}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{s.tingkat}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(s)} className="rounded bg-yellow-600 px-3 py-1 text-xs font-medium text-yellow-50 hover:bg-yellow-700">Edit</button>
                        <button onClick={() => handleDelete(s.id!)} className="rounded bg-red-600 px-3 py-1 text-xs font-medium text-red-50 hover:bg-red-700">Hapus</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-gray-900">
            <h2 className="mb-4 text-lg font-bold text-gray-800 dark:text-white">
              {editId ? "Edit Skill" : "Tambah Skill"}
            </h2>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Skill *</label>
                <input
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  value={form.namaSkill ?? ""}
                  onChange={e => setForm({ ...form, namaSkill: e.target.value })}
                  placeholder="contoh: Java, React, MySQL..."
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Kategori *</label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  value={form.kategori ?? ""}
                  onChange={e => setForm({ ...form, kategori: e.target.value })}
                >
                  <option value="">-- Pilih Kategori --</option>
                  {kategoriList.map(k => <option key={k} value={k}>{k}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Level: {form.levelPersen ?? 0}%
                </label>
                <input
                  type="range" min={0} max={100}
                  className="w-full accent-blue-600"
                  value={form.levelPersen ?? 0}
                  onChange={e => setForm({ ...form, levelPersen: Number(e.target.value) })}
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>0%</span><span>50%</span><span>100%</span>
                </div>
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={closeModal} className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
                Batal
              </button>
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
