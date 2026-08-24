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
import { Textarea } from "@/shared/components/ui/textarea";
import { MonthYearPicker } from "@/shared/components/ui/month-year-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
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
            {TEXT_FIELDS.slice(0, 3).map(({ label, key, placeholder }) => (
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

            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="tanggalMulai"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal Mulai</FormLabel>
                    <FormControl>
                      <MonthYearPicker value={field.value ?? ""} onChange={field.onChange} placeholder="Bulan & tahun mulai" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tanggalSelesai"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal Selesai</FormLabel>
                    <FormControl>
                      <MonthYearPicker value={field.value ?? ""} onChange={field.onChange} placeholder="Bulan & tahun selesai" allowPresent />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="ipk"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IPK (opsional)</FormLabel>
                  <FormControl>
                    <Input placeholder="3.75" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jenjang"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenjang</FormLabel>
                  <FormControl>
                    <Select value={field.value ?? ""} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="-- Pilih Jenjang --" />
                      </SelectTrigger>
                      <SelectContent>
                        {jenjangList.map((j) => (
                          <SelectItem key={j} value={j}>{j}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                    <Textarea
                      rows={3}
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
