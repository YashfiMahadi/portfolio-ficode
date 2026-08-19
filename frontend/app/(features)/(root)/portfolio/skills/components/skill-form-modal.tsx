"use client";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

import { Skill } from "../interfaces/skill.d";
import { kategoriList } from "../constants";

interface SkillFormModalProps {
  open: boolean;
  editId: number | null;
  form: Skill;
  saving: boolean;
  onChange: (form: Skill) => void;
  onClose: () => void;
  onSave: () => void;
}

export function SkillFormModal({
  open,
  editId,
  form,
  saving,
  onChange,
  onClose,
  onSave,
}: SkillFormModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-gray-900">
        <h2 className="mb-4 text-lg font-bold text-gray-800 dark:text-white">
          {editId ? "Edit Skill" : "Tambah Skill"}
        </h2>

        <div className="space-y-4">
          {/* NAMA */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nama Skill *
            </label>
            <Input
              value={form.namaSkill}
              onChange={(e) => onChange({ ...form, namaSkill: e.target.value })}
              placeholder="Contoh: Java, React, MySQL..."
            />
          </div>

          {/* KATEGORI */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Kategori *
            </label>
            <select
              value={form.kategori}
              onChange={(e) => onChange({ ...form, kategori: e.target.value })}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            >
              <option value="">-- Pilih Kategori --</option>
              {kategoriList.map((kategori) => (
                <option key={kategori} value={kategori}>
                  {kategori}
                </option>
              ))}
            </select>
          </div>

          {/* LEVEL */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Level
              </label>
              <span className="text-sm font-semibold text-blue-600">
                {form.levelPersen}%
              </span>
            </div>

            <input
              type="range"
              min={0}
              max={100}
              value={form.levelPersen}
              onChange={(e) => onChange({ ...form, levelPersen: Number(e.target.value) })}
              className="w-full accent-blue-600"
            />

            <div className="mt-1 flex justify-between text-xs text-gray-400">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button onClick={onSave} disabled={saving}>
            {saving ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </div>
    </div>
  );
}
