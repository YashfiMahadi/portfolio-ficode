// lib/auth.ts
// Sistem login yang terhubung ke backend Spring Boot Java

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://portfolio-ficode-production.up.railway.app/api" || "http://127.0.0.1:8000/api";
const SESSION_KEY = "portfolio_user";

export const auth = {
  // Login: fetch ke POST /api/auth/login
  async login(username: string, password: string): Promise<{ success: boolean; pesan: string }> {
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.status === "success") {
        // Simpan data user ke localStorage
        localStorage.setItem(SESSION_KEY, JSON.stringify(data.data));
        return { success: true, pesan: data.pesan };
      } else {
        return { success: false, pesan: data.pesan || "Login gagal" };
      }
    } catch {
      return { success: false, pesan: "Tidak dapat terhubung ke server. Pastikan backend berjalan." };
    }
  },

  logout() {
    localStorage.removeItem(SESSION_KEY);
  },

  isLoggedIn(): boolean {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(SESSION_KEY) !== null;
  },

  getUser(): { id: number; username: string; namaLengkap: string; role: string } | null {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },
};
