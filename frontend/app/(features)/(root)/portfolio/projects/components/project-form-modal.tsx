"use client";

import Image from "next/image";
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
import type { Project } from "@/app/(features)/(root)/portfolio/projects/interfaces/project";
import {
  projectSchema,
  type ProjectFormValues,
} from "@/app/(features)/(root)/portfolio/projects/interfaces/project-schema";
import { emptyProject, kategoriList, statusList } from "@/app/(features)/(root)/portfolio/projects/hooks/use-projects";

interface ProjectFormModalProps {
  editItem: Project | null;
  saving: boolean;
  uploading: boolean;
  onUploadThumbnail: (file: File) => Promise<string | null>;
  onClose: () => void;
  onSave: (values: ProjectFormValues) => void;
}

const TEXT_FIELDS: { label: string; key: keyof ProjectFormValues; placeholder: string }[] = [
  { label: "Nama Proyek *", key: "namaProyek", placeholder: "Portfolio CV Digital" },
  { label: "Teknologi Digunakan", key: "teknologiDigunakan", placeholder: "Java, Spring Boot, MySQL, React" },
  { label: "Link GitHub", key: "linkGithub", placeholder: "https://github.com/..." },
  { label: "Link Demo", key: "linkDemo", placeholder: "https://..." },
];

export default function ProjectFormModal({
  editItem, saving, uploading, onUploadThumbnail, onClose, onSave,
}: ProjectFormModalProps) {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: editItem ? { ...emptyProject, ...editItem } : emptyProject,
  });

  const gambarUrl = form.watch("gambarUrl");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await onUploadThumbnail(file);
    if (url) form.setValue("gambarUrl", url);
  };

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl dark:bg-gray-900 max-h-[90vh] overflow-y-auto">
        <h2 className="mb-4 text-lg font-bold text-gray-800 dark:text-white">
          {editItem ? "Edit Proyek" : "Tambah Proyek"}
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSave)} className="space-y-3">
            {/* Thumbnail Upload */}
            <div>
              <FormLabel>Thumbnail Proyek</FormLabel>
              <div className="flex items-center gap-3">
                <div className="h-16 w-24 overflow-hidden rounded-lg border border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-700">
                  {gambarUrl ? (
                    <Image src={gambarUrl} alt="thumbnail" width={96} height={64} unoptimized className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-2xl">🚀</div>
                  )}
                </div>
                <label className="cursor-pointer rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                  {uploading ? "Mengupload..." : "📁 Pilih Foto"}
                </label>
                {gambarUrl && (
                  <button type="button" onClick={() => form.setValue("gambarUrl", "")}
                    className="text-xs text-red-500 hover:text-red-700">
                    Hapus
                  </button>
                )}
              </div>
            </div>

            {TEXT_FIELDS.slice(0, 2).map(({ label, key, placeholder }) => (
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

            {TEXT_FIELDS.slice(2).map(({ label, key, placeholder }) => (
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
                name="kategori"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori</FormLabel>
                    <FormControl>
                      <Select value={field.value ?? ""} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="-- Pilih --" />
                        </SelectTrigger>
                        <SelectContent>
                          {kategoriList.map((k) => (
                            <SelectItem key={k} value={k}>{k}</SelectItem>
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
                name="statusProyek"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select value={field.value ?? ""} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="-- Pilih --" />
                        </SelectTrigger>
                        <SelectContent>
                          {statusList.map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="deskripsi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder="Deskripsi proyek..."
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
