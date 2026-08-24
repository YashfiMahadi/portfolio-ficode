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
import type { Experience } from "@/app/(features)/(root)/portfolio/experience/interfaces/experience";
import {
  experienceSchema,
  type ExperienceFormValues,
} from "@/app/(features)/(root)/portfolio/experience/interfaces/experience-schema";
import { emptyExperience, jenisKerjaList } from "@/app/(features)/(root)/portfolio/experience/hooks/use-experience";

interface ExperienceFormModalProps {
  editItem: Experience | null;
  saving: boolean;
  onClose: () => void;
  onSave: (values: ExperienceFormValues) => void;
}

const TEXT_FIELDS: { label: string; key: keyof ExperienceFormValues; placeholder: string }[] = [
  { label: "Nama Perusahaan *", key: "namaPerusahaan", placeholder: "PT. Contoh" },
  { label: "Posisi/Jabatan *", key: "posisi", placeholder: "Backend Developer" },
  { label: "Lokasi", key: "lokasiPerusahaan", placeholder: "Bandung" },
];

export default function ExperienceFormModal({ editItem, saving, onClose, onSave }: ExperienceFormModalProps) {
  const toMonthYear = (value?: string | null) => {
    if (!value) return "";
    if (value === "Sekarang") return value;

    // API bisa mengirim yyyy-MM, yyyy-MM-dd, atau ISO timestamp.
    // Form ini hanya menyimpan bulan + tahun.
    const match = value.match(/^(\d{4})-(0[1-9]|1[0-2])/);
    return match ? `${match[1]}-${match[2]}` : "";
  };

  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: editItem
      ? {
          ...emptyExperience,
          ...editItem,
          tanggalMulai: toMonthYear(editItem.tanggalMulai),
          tanggalSelesai: toMonthYear(editItem.tanggalSelesai),
        }
      : emptyExperience,
  });

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl dark:bg-gray-900 max-h-[90vh] overflow-y-auto">
        <h2 className="mb-4 text-lg font-bold text-gray-800 dark:text-white">
          {editItem ? "Edit Pengalaman" : "Tambah Pengalaman"}
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
              name="jenisKerja"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenis Kerja</FormLabel>
                  <FormControl>
                    <Select value={field.value ?? ""} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="-- Pilih --" />
                      </SelectTrigger>
                      <SelectContent>
                        {jenisKerjaList.map((j) => (
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
                      placeholder="Deskripsi pekerjaan..."
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
