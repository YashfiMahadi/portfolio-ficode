// lib/api.ts
// Service layer untuk komunikasi dengan backend Spring Boot
// Base URL backend

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

// ===== Helper fetch =====
async function apiFetch(endpoint: string, options?: RequestInit) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

// ===== PROFILE =====
export const profileAPI = {
  getAll: () => apiFetch("/profiles"),
  getById: (id: number) => apiFetch(`/profiles/${id}`),
  create: (data: unknown) => apiFetch("/profiles", { method: "POST", body: JSON.stringify(data) }),
  update: (id: number, data: unknown) => apiFetch(`/profiles/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: number) => apiFetch(`/profiles/${id}`, { method: "DELETE" }),
  getMyProfile: (userId: number) => apiFetch(`/profiles/me/${userId}`),
  updateMyProfile: (userId: number, data: unknown) => apiFetch(`/profiles/me/${userId}`, { method: "PUT", body: JSON.stringify(data) }),
};

// ===== SKILL =====
export const skillAPI = {
  getAll: () => apiFetch("/skills"),
  getById: (id: number) => apiFetch(`/skills/${id}`),
  getStatistik: () => apiFetch("/skills/statistik"),
  create: (data: unknown) => apiFetch("/skills", { method: "POST", body: JSON.stringify(data) }),
  update: (id: number, data: unknown) => apiFetch(`/skills/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: number) => apiFetch(`/skills/${id}`, { method: "DELETE" }),
};

// ===== EXPERIENCE =====
export const experienceAPI = {
  getAll: () => apiFetch("/experiences"),
  getById: (id: number) => apiFetch(`/experiences/${id}`),
  create: (data: unknown) => apiFetch("/experiences", { method: "POST", body: JSON.stringify(data) }),
  update: (id: number, data: unknown) => apiFetch(`/experiences/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: number) => apiFetch(`/experiences/${id}`, { method: "DELETE" }),
};

// ===== EDUCATION =====
export const educationAPI = {
  getAll: () => apiFetch("/educations"),
  getById: (id: number) => apiFetch(`/educations/${id}`),
  create: (data: unknown) => apiFetch("/educations", { method: "POST", body: JSON.stringify(data) }),
  update: (id: number, data: unknown) => apiFetch(`/educations/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: number) => apiFetch(`/educations/${id}`, { method: "DELETE" }),
};

// ===== PROJECT =====
export const projectAPI = {
  getAll: () => apiFetch("/projects"),
  getById: (id: number) => apiFetch(`/projects/${id}`),
  getStatistik: () => apiFetch("/projects/statistik"),
  cari: (keyword: string) => apiFetch(`/projects/cari?keyword=${keyword}`),
  create: (data: unknown) => apiFetch("/projects", { method: "POST", body: JSON.stringify(data) }),
  update: (id: number, data: unknown) => apiFetch(`/projects/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: number) => apiFetch(`/projects/${id}`, { method: "DELETE" }),
};

// ===== CERTIFICATION =====
export const certificationAPI = {
  getAll: () => apiFetch("/certifications"),
  getById: (id: number) => apiFetch(`/certifications/${id}`),
  create: (data: unknown) => apiFetch("/certifications", { method: "POST", body: JSON.stringify(data) }),
  update: (id: number, data: unknown) => apiFetch(`/certifications/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: number) => apiFetch(`/certifications/${id}`, { method: "DELETE" }),
};

// ===== UPLOAD =====
export const uploadAPI = {
  uploadPhoto: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("http://localhost:8080/api/upload/photo", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.status === "success") return data.url;
    throw new Error(data.pesan);
  },
};