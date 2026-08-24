"use client";

import { useEffect } from "react";
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
import type { PortfolioProfile } from "@/app/(features)/(root)/portfolio/profile/interfaces/profile";
import {
  portfolioProfileSchema,
  type PortfolioProfileFormValues,
} from "@/app/(features)/(root)/portfolio/profile/interfaces/profile-schema";
import { emptyProfile } from "@/app/(features)/(root)/portfolio/profile/hooks/use-portfolio-profile";

interface ProfileEditFormProps {
  profile: PortfolioProfile | null;
  saving: boolean;
  successMsg: string;
  error: string;
  onSave: (values: PortfolioProfileFormValues) => void;
}

const TEXT_FIELDS: { label: string; key: keyof PortfolioProfileFormValues; placeholder: string; span?: boolean }[] = [
  { label: "Nama Lengkap *", key: "nama", placeholder: "Nama kamu" },
  { label: "Jabatan *", key: "jabatan", placeholder: "Backend Developer" },
  { label: "Email", key: "email", placeholder: "email@kamu.com" },
  { label: "Telepon", key: "telepon", placeholder: "08123456789" },
  { label: "Kota", key: "kota", placeholder: "Bandung" },
  { label: "Provinsi", key: "provinsi", placeholder: "Jawa Barat" },
  { label: "Alamat", key: "alamat", placeholder: "Jl. Contoh No. 1", span: true },
  { label: "LinkedIn", key: "linkedIn", placeholder: "https://linkedin.com/in/..." },
  { label: "GitHub", key: "github", placeholder: "https://github.com/..." },
  { label: "Website", key: "website", placeholder: "https://website.com", span: true },
];

export default function ProfileEditForm({ profile, saving, successMsg, error, onSave }: ProfileEditFormProps) {
  const form = useForm<PortfolioProfileFormValues>({
    resolver: zodResolver(portfolioProfileSchema),
    defaultValues: emptyProfile,
  });

  // Sinkronkan form begitu data profile selesai di-fetch dari server.
  useEffect(() => {
    if (profile) form.reset({ ...emptyProfile, ...profile });
  }, [profile]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
      <h2 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white">Edit Profile</h2>

      {successMsg && (
        <div className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-400">
          ✅ {successMsg}
        </div>
      )}
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">
          ❌ {error}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSave)}>
          <div className="grid gap-4 sm:grid-cols-2">
            {TEXT_FIELDS.map(({ label, key, placeholder, span }) => (
              <FormField
                key={key}
                control={form.control}
                name={key}
                render={({ field }) => (
                  <FormItem className={span ? "sm:col-span-2" : ""}>
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
              name="tentangSaya"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Tentang Saya</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Deskripsi singkat tentang dirimu..."
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-5 flex justify-end">
            <Button type="submit" disabled={saving}>
              {saving ? "Menyimpan..." : "Simpan Profile"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
