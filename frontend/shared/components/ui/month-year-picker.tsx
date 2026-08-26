"use client"

import * as React from "react"

import { cn } from "@/shared/lib/utils"
import { parseMonthYear } from "@/shared/lib/parse-month-year"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import Checkbox from "@/shared/components/form/input/checkbox"

interface MonthYearPickerProps {
  /** Nilai dalam format "yyyy-MM", atau "Sekarang" jika allowPresent aktif. */
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  /** Tampilkan checkbox "Masih berlangsung" yang mengisi value dengan "Sekarang". */
  allowPresent?: boolean
  className?: string
  /** Disuntik otomatis oleh <FormControl> saat field ini invalid. */
  "aria-invalid"?: boolean | "true" | "false"
}

const BULAN = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

// Dipakai sebagai prop `items` pada <Select> di bawah, supaya
// <SelectValue> menampilkan LABEL bulan ("Januari"), bukan index
// mentahnya ("0") — tanpa ini Base UI Select cuma nampilin raw value.
const BULAN_ITEMS = Object.fromEntries(BULAN.map((bulan, index) => [String(index), bulan]));

const CURRENT_YEAR = new Date().getFullYear();
// Rentang tahun wajar untuk riwayat pendidikan/kerja/sertifikasi/proyek.
const TAHUN_LIST = Array.from({ length: 20 }, (_, i) => String(CURRENT_YEAR + 5 - i));

/**
 * Picker bulan + tahun (dua dropdown terpisah), pengganti input teks
 * "2024-01" manual. Dipakai untuk field seperti tanggalMulai/tanggalSelesai
 * di portfolio (education, experience, certifications, projects) — field
 * ini memang cuma butuh granularitas bulan-tahun, jadi kalender harian
 * (pilih tanggal) tidak relevan dan cuma bikin bingung.
 */
export function MonthYearPicker({
  value,
  onChange,
  placeholder = "Pilih bulan & tahun",
  allowPresent = false,
  className,
  "aria-invalid": ariaInvalid,
}: MonthYearPickerProps) {
  const isInvalid = ariaInvalid === true || ariaInvalid === "true";
  const isPresent = value === "Sekarang";

  // Backend/data lama kadang menyimpan format tanggal yang beda-beda
  // (dulu field ini masih input teks bebas). Parser di bawah ini
  // menangani beberapa variasi format supaya value lama tetap terbaca.
  const parsed = value && !isPresent ? parseMonthYear(value) : {};
  const selectedYear = parsed.year;
  const selectedMonthIndex = parsed.month;
  // Tahun ketemu tapi bulan tidak terbaca dari data lama -> beri tahu user.
  const monthUnknown = !!selectedYear && selectedMonthIndex === undefined;

  const setMonth = (monthIndex: number) => {
    const year = selectedYear ?? String(CURRENT_YEAR);
    onChange(`${year}-${String(monthIndex + 1).padStart(2, "0")}`);
  };

  const setYear = (year: string) => {
    const month = selectedMonthIndex ?? 0;
    onChange(`${year}-${String(month + 1).padStart(2, "0")}`);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="grid grid-cols-2 gap-2">
        <Select
          value={selectedMonthIndex !== undefined ? String(selectedMonthIndex) : ""}
          onValueChange={(v) => setMonth(Number(v))}
          disabled={isPresent}
          items={BULAN_ITEMS}
        >
          <SelectTrigger aria-invalid={isInvalid}>
            <SelectValue placeholder="Bulan" />
          </SelectTrigger>
          <SelectContent>
            {BULAN.map((bulan, index) => (
              <SelectItem key={bulan} value={String(index)}>{bulan}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedYear ?? ""} onValueChange={(v) => setYear(v as string)} disabled={isPresent}>
          <SelectTrigger aria-invalid={isInvalid}>
            <SelectValue placeholder="Tahun" />
          </SelectTrigger>
          <SelectContent>
            {TAHUN_LIST.map((tahun) => (
              <SelectItem key={tahun} value={tahun}>{tahun}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {!selectedYear && !isPresent && (
        <p className="text-xs text-gray-400">{placeholder}</p>
      )}
      {monthUnknown && (
        <p className="text-xs text-amber-500">
          Bulan tidak terbaca dari data lama, silakan pilih ulang bulannya.
        </p>
      )}

      {allowPresent && (
        <label className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <Checkbox
            className="h-4 w-4"
            checked={isPresent}
            onChange={(checked) => onChange(checked ? "Sekarang" : "")}
          />
          Masih berlangsung / sekarang
        </label>
      )}
    </div>
  )
}
