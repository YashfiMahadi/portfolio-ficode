"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import Input from "@/shared/components/form/input/input-field";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import type { Skill } from "@/app/(features)/(root)/portfolio/skills/interfaces/skill";
import {
  skillSchema,
  type SkillFormValues,
} from "@/app/(features)/(root)/portfolio/skills/interfaces/skill-schema";
import { emptySkill, kategoriList } from "@/app/(features)/(root)/portfolio/skills/hooks/use-skills";

interface SkillFormModalProps {
  editItem: Skill | null;
  saving: boolean;
  onClose: () => void;
  onSave: (values: SkillFormValues) => void;
}

export default function SkillFormModal({ editItem, saving, onClose, onSave }: SkillFormModalProps) {
  const form = useForm<SkillFormValues>({
    resolver: zodResolver(skillSchema),
    defaultValues: editItem ? { ...emptySkill, ...editItem } : emptySkill,
  });

  const level = form.watch("levelPersen");

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-gray-900">
        <h2 className="mb-4 text-lg font-bold text-gray-800 dark:text-white">
          {editItem ? "Edit Skill" : "Tambah Skill"}
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSave)} className="space-y-4">
            {/* NAMA */}
            <FormField
              control={form.control}
              name="namaSkill"
              render={({ field }) => (
                <FormItem>
                  <FormLabel aria-required>Nama Skill</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: Java, React, MySQL..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* KATEGORI */}
            <FormField
              control={form.control}
              name="kategori"
              render={({ field }) => (
                <FormItem>
                  <FormLabel aria-required>Kategori</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="-- Pilih Kategori --" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {kategoriList.map((kategori) => (
                        <SelectItem key={kategori} value={kategori}>
                          {kategori}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* LEVEL */}
            <FormField
              control={form.control}
              name="levelPersen"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-2 flex items-center justify-between">
                    <FormLabel>Level</FormLabel>
                    <span className="text-sm font-semibold text-blue-600">{level}%</span>
                  </div>
                  <FormControl>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="w-full accent-blue-600"
                    />
                  </FormControl>
                  <div className="mt-1 flex justify-between text-xs text-gray-400">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* BUTTON */}
            <div className="mt-2 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Batal
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
