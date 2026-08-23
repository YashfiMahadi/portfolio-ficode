"use client";

import Checkbox from "@/shared/components/form/input/checkbox";
import Input from "@/shared/components/form/input/input-field";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/shared/components/icons/index";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth } from "@/shared/services/auth.service";
import {
  signUpSchema,
  type SignUpFormValues,
} from "@/app/(features)/(auth)/signup/interfaces/signup-schema";

export default function SignUpForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      namaLengkap: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      agree: false,
    },
  });

  const onSubmit = async (values: SignUpFormValues) => {
    setServerError("");
    setSuccessMsg("");
    const result = await auth.register({
      namaLengkap: values.namaLengkap,
      username: values.username,
      email: values.email,
      password: values.password,
    });
    if (result.success) {
      setSuccessMsg("Registrasi berhasil! Mengalihkan ke halaman masuk...");
      setTimeout(() => router.push("/signin"), 1200);
    } else {
      setServerError(result.pesan);
    }
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full overflow-y-auto no-scrollbar">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon />
          Back to dashboard
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Daftar akun untuk mulai membangun portfolio kamu
            </p>
          </div>

          {serverError && (
            <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
              ❌ {serverError}
            </div>
          )}
          {successMsg && (
            <div className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600 dark:bg-green-900/30 dark:text-green-400">
              ✅ {successMsg}
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-5">
                {/* Nama Lengkap */}
                <FormField
                  control={form.control}
                  name="namaLengkap"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Nama Lengkap<span className="text-error-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan nama lengkap" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Username */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Username<span className="text-error-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Email<span className="text-error-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Masukkan email" {...field} />
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
                      <FormLabel>
                        Password<span className="text-error-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Masukkan password"
                            type={showPassword ? "text" : "password"}
                            className="pr-11"
                            {...field}
                          />
                          <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                          >
                            {showPassword ? (
                              <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                            ) : (
                              <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                            )}
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Konfirmasi Password<span className="text-error-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ulangi password"
                          type={showPassword ? "text" : "password"}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Checkbox */}
                <FormField
                  control={form.control}
                  name="agree"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-3">
                        <Checkbox
                          className="w-5 h-5"
                          checked={field.value}
                          onChange={field.onChange}
                        />
                        <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                          By creating an account means you agree to the{" "}
                          <span className="text-gray-800 dark:text-white/90">
                            Terms and Conditions,
                          </span>{" "}
                          and our{" "}
                          <span className="text-gray-800 dark:text-white">
                            Privacy Policy
                          </span>
                        </p>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Button */}
                <div>
                  <button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600 disabled:opacity-60"
                  >
                    {form.formState.isSubmitting ? "Mendaftarkan..." : "Sign Up"}
                  </button>
                </div>
              </div>
            </form>
          </Form>

          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
