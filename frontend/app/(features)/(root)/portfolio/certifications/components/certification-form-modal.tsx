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
import { MonthYearPicker } from "@/shared/components/ui/month-year-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import type { Certification } from "@/app/(features)/(root)/portfolio/certifications/interfaces/certification";
import {
  certificationSchema,
  type CertificationFormValues,
} from "@/app/(features)/(root)/portfolio/certifications/interfaces/certification-schema";
import { emptyCertification, kategoriList } from "@/app/(features)/(root)/portfolio/certifications/hooks/use-certifications";

interface CertificationFormModalProps {
  editItem: Certification | null;
  saving: boolean;
  onClose: () => void;
  onSave: (values: CertificationFormValues) => void;
}

const TOP_FIELDS: { label: string; key: keyof CertificationFormValues; placeholder: string; required?: boolean }[] = [
  { label: "Nama Sertifikat", key: "namaSertifikat", placeholder: "Java Programming Masterclass", required: true },
  { label: "Penerbit", key: "penerbit", placeholder: "Udemy / Google / Oracle", required: true },
];

const BOTTOM_FIELDS: { label: string; key: keyof CertificationFormValues; placeholder: string }[] = [
  { label: "Nomor Sertifikat", key: "nomorSertifikat", placeholder: "UC-XXXXXXXX" },
  { label: "Link Sertifikat", key: "linkSertifikat", placeholder: "https://..." },
];

export default function CertificationFormModal({ editItem, saving, onClose, onSave }: CertificationFormModalProps) {
  const form = useForm<CertificationFormValues>({
    resolver: zodResolver(certificationSchema),
    defaultValues: editItem ? { ...emptyCertification, ...editItem } : emptyCertification,
  });

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl dark:bg-gray-900 max-h-[90vh] overflow-y-auto">
        <h2 className="mb-4 text-lg font-bold text-gray-800 dark:text-white">
          {editItem ? "Edit Sertifikasi" : "Tambah Sertifikasi"}
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSave)} className="space-y-3">
            {TOP_FIELDS.map(({ label, key, placeholder, required }) => (
              <FormField
                key={key}
                control={form.control}
                name={key}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel aria-required={required}>{label}</FormLabel>
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
                name="tanggalTerbit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel aria-required>Tanggal Terbit</FormLabel>
                    <FormControl>
                      <MonthYearPicker value={field.value ?? ""} onChange={field.onChange} placeholder="Bulan & tahun terbit" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tanggalKadaluarsa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal Kadaluarsa</FormLabel>
                    <FormControl>
                      <MonthYearPicker value={field.value ?? ""} onChange={field.onChange} placeholder="Kosongkan jika selamanya" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {BOTTOM_FIELDS.map(({ label, key, placeholder }) => (
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
              name="kategori"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori</FormLabel>
                  <Select value={field.value ?? ""} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="-- Pilih Kategori --" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {kategoriList.map((k) => (
                        <SelectItem key={k} value={k}>{k}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
