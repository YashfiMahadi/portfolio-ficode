"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth } from "@/shared/services/auth.service";
import { EyeCloseIcon, EyeIcon } from "@/shared/components/icons/index";
import Input from "@/shared/components/form/input/input-field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import {
  signInSchema,
  type SignInFormValues,
} from "@/app/(features)/(auth)/signin/interfaces/signin-schema";

export default function SignInForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = async (values: SignInFormValues) => {
    setServerError("");
    const result = await auth.login(values.username, values.password);
    if (result.success) {
      router.push("/");
    } else {
      setServerError(result.pesan);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
      <div className="w-full max-w-md">
        {/* Logo / Title */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-3xl shadow-lg">
            💼
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Portfolio CV Digital
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Bangun identitas profesionalmu dengan mudah
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <h2 className="mb-1 text-xl font-semibold text-gray-800 dark:text-white">
            Masuk ke Dashboard
          </h2>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Masukkan username dan password untuk melanjutkan
          </p>

          {serverError && (
            <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
              ❌ {serverError}
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Username */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Masukkan password"
                          className="pr-11"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {showPassword ? (
                            <EyeIcon className="h-5 w-5 fill-gray-400" />
                          ) : (
                            <EyeCloseIcon className="h-5 w-5 fill-gray-400" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit */}
              <button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="mt-2 w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
              >
                {form.formState.isSubmitting ? "Memverifikasi..." : "Masuk →"}
              </button>
            </form>
          </Form>
        </div>

        <p className="mt-4 text-center text-xs text-gray-400">
          © 2025 Portfolio CV Digital · Pemrograman Java Lanjut
        </p>
      </div>
    </div>
  );
}
