"use client";

import { useEffect, useState } from "react";

import {
  Certification,
  Education,
  Experience,
  Profile,
  Project,
  Skill,
} from "../interfaces/cv.d";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

async function apiFetch(endpoint: string) {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  if (!res.ok) throw new Error("API error");
  return res.json();
}

/**
 * Mengambil seluruh data publik (profile, skill, pengalaman, pendidikan,
 * proyek, sertifikasi) yang ditampilkan di halaman CV / landing page.
 */
export function useCvData() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiFetch("/profiles"),
      apiFetch("/skills"),
      apiFetch("/experiences"),
      apiFetch("/educations"),
      apiFetch("/projects"),
      apiFetch("/certifications"),
    ])
      .then(([p, s, e, ed, pr, c]) => {
        if (p.data?.length > 0) setProfile(p.data[0]);
        setSkills(s.data || []);
        setExperiences(e.data || []);
        setEducations(ed.data || []);
        setProjects(pr.data || []);
        setCertifications(c.data || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const skillByKategori = skills.reduce((acc, s) => {
    if (!acc[s.kategori]) acc[s.kategori] = [];
    acc[s.kategori].push(s);
    return acc;
  }, {} as Record<string, Skill[]>);

  return {
    profile,
    skills,
    skillByKategori,
    experiences,
    educations,
    projects,
    certifications,
    loading,
  };
}
