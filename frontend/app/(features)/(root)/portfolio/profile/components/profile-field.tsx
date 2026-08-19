"use client";

import { Profile } from "../interfaces/profile.d";

interface FieldProps {
  label: string;
  field: keyof Profile;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (field: keyof Profile, value: string) => void;
}

// Didefinisikan sebagai komponen terpisah (di luar page) supaya tidak re-render ulang.
export function ProfileField({ label, field, type = "text", placeholder = "", value, onChange }: FieldProps) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      {type === "textarea" ? (
        <textarea
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          value={value ?? ""}
          onChange={(e) => onChange(field, e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          value={value ?? ""}
          onChange={(e) => onChange(field, e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
