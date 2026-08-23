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

const TEXT_FIELDS: { label: string; key: keyof CertificationFormValues; placeholder: string }[] = [
  { label: "Nama Sertifikat *", key: "namaSertifikat", placeholder: "Java Programming Masterclass" },
  { label: "Penerbit *", key: "penerbit", placeholder: "Udemy / Google / Oracle" },
  { label: "Tanggal Terbit", key: "tanggalTerbit", placeholder: "2024-03" },
  { label: "Tanggal Kadaluarsa", key: "tanggalKadaluarsa", placeholder: "2027-03 (kosongkan jika selamanya)" },
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
              name="kategori"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori</FormLabel>
                  <FormControl>
                    <select {...field} value={field.value ?? ""}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white">
                      <option value="">-- Pilih Kategori --</option>
                      {kategoriList.map((k) => <option key={k} value={k}>{k}</option>)}
                    </select>
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
