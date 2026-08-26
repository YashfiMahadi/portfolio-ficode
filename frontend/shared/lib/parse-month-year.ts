const BULAN_ID = [
  "januari", "februari", "maret", "april", "mei", "juni",
  "juli", "agustus", "september", "oktober", "november", "desember",
];

export interface ParsedMonthYear {
  year?: string;
  /** Index 0-11 (Januari = 0), atau undefined kalau bulan tidak terbaca dari data lama. */
  month?: number;
}

/**
 * Parse berbagai format tanggal yang mungkin ada di data lama (sebelum
 * field ini pakai dropdown Bulan/Tahun, dulu masih input teks bebas
 * dengan placeholder "2024-01"), supaya value lama tetap terbaca saat
 * dibuka untuk edit alih-alih tampil kosong.
 *
 * Format yang didukung: "yyyy-MM", "yyyy-MM-dd", ISO timestamp,
 * "yyyy/MM", "MM/yyyy", "MM-yyyy", "Januari 2024", atau minimal "2024"
 * saja (bulan jadi tidak terisi, tapi tahun tetap kepilih).
 */
export function parseMonthYear(raw?: string | null): ParsedMonthYear {
  if (!raw) return {};
  const value = raw.trim();
  if (!value) return {};

  // yyyy-MM, yyyy-MM-dd, atau ISO timestamp (yyyy-MM-ddTHH:mm:ss...)
  let m = value.match(/^(\d{4})-(0?[1-9]|1[0-2])\b/);
  if (m) return { year: m[1], month: Number(m[2]) - 1 };

  // yyyy/MM atau yyyy.MM
  m = value.match(/^(\d{4})[/.](0?[1-9]|1[0-2])\b/);
  if (m) return { year: m[1], month: Number(m[2]) - 1 };

  // MM/yyyy atau MM-yyyy
  m = value.match(/^(0?[1-9]|1[0-2])[/-](\d{4})\b/);
  if (m) return { year: m[2], month: Number(m[1]) - 1 };

  // Nama bulan Indonesia, mis. "Januari 2024"
  const lower = value.toLowerCase();
  for (let i = 0; i < BULAN_ID.length; i++) {
    if (lower.includes(BULAN_ID[i])) {
      const yearMatch = value.match(/\d{4}/);
      if (yearMatch) return { year: yearMatch[0], month: i };
    }
  }

  // Fallback: cuma tahun yang berhasil ditemukan, bulan tidak diketahui.
  const yearOnly = value.match(/\d{4}/);
  if (yearOnly) return { year: yearOnly[0] };

  return {};
}
