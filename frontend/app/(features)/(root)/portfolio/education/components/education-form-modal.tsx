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
import type { Education } from "@/app/(features)/(root)/portfolio/education/interfaces/education";
import {
  educationSchema,
  type EducationFormValues,
} from "@/app/(features)/(root)/portfolio/education/interfaces/education-schema";
import { emptyEducation, jenjangList } from "@/app/(features)/(root)/portfolio/education/hooks/use-education";

interface EducationFormModalProps {
  editItem: Education | null;
  saving: boolean;
  onClose: () => void;
  onSave: (values: EducationFormValues) => void;
}

const TEXT_FIELDS: { label: string; key: keyof EducationFormValues; placeholder: string }[] = [
  { label: "Nama Institusi *", key: "namaInstitusi", placeholder: "STMIK Mardira Indonesia" },
  { label: "Jurusan *", key: "jurusan", placeholder: "Teknik Informatika" },
  { label: "Lokasi", key: "lokasi", placeholder: "Bandung" },
  { label: "Tanggal Mulai", key: "tanggalMulai", placeholder: "2022-09" },
  { label: "Tanggal Selesai", key: "tanggalSelesai", placeholder: "2026-07 / Sekarang" },
  { label: "IPK (opsional)", key: "ipk", placeholder: "3.75" },
];

export default function EducationFormModal({ editItem, saving, onClose, onSave }: EducationFormModalProps) {
  const form = useForm<EducationFormValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: editItem
      ? { ...emptyEducation, ...editItem, ipk: editItem.ipk?.toString() || "" }
      : emptyEducation,
  });

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl dark:bg-gray-900 max-h-[90vh] overflow-y-auto">
        <h2 className="mb-4 text-lg font-bold text-gray-800 dark:text-white">
          {editItem ? "Edit Pendidikan" : "Tambah Pendidikan"}
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSave)} className="space-y-3">
            {TEXT_FIELDS.map(({ label, key, placeholder }) => (
              <FormField
                key={key}
                control={form.control}
                name={key}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Input placeholder={placeholder} {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <FormField
              control={form.control}
              name="jenjang"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenjang</FormLabel>
                  <FormControl>
                    <select {...field} value={field.value ?? ""}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white">
                      <option value="">-- Pilih Jenjang --</option>
                      {jenjangList.map((j) => <option key={j} value={j}>{j}</option>)}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deskripsi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <textarea rows={3}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                      placeholder="Deskripsi tambahan..."
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-2 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>Batal</Button>
              <Button type="submit" disabled={saving}>{saving ? "Menyimpan..." : "Simpan"}</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
