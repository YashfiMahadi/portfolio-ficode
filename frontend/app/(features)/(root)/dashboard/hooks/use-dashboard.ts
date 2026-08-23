"use client";

import { useEffect, useState } from "react";
import {
  profileAPI,
  skillAPI,
  experienceAPI,
  educationAPI,
  projectAPI,
  certificationAPI,
} from "@/app/(features)/(root)/portfolio/services/portfolio.service";
import type { DashboardState, StatItem } from "@/app/(features)/(root)/dashboard/interfaces/dashboard";

/**
 * Hook untuk mengambil & menyusun seluruh data yang ditampilkan
 * di halaman Dashboard (stats, chart skill, chart proyek, dsb.).
 * Meniru pola menu-1/hooks/use-menu-1.ts pada standar Feature-First.
 */
export function useDashboard(): DashboardState {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [skillCategories, setSkillCategories] = useState<string[]>([]);
  const [skillCounts, setSkillCounts] = useState<number[]>([]);
  const [radarLabels, setRadarLabels] = useState<string[]>([]);
  const [radarData, setRadarData] = useState<number[]>([]);
  const [pieLabels, setPieLabels] = useState<string[]>([]);
  const [pieData, setPieData] = useState<number[]>([]);
  const [rataRata, setRataRata] = useState(0);
  const [totalSkill, setTotalSkill] = useState(0);
  const [profileName, setProfileName] = useState("");
  const [profileJob, setProfileJob] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [
          profiles,
          skills,
          experiences,
          educations,
          projects,
          certifications,
          skillStat,
          projStat,
        ] = await Promise.all([
          profileAPI.getAll(),
          skillAPI.getAll(),
          experienceAPI.getAll(),
          educationAPI.getAll(),
          projectAPI.getAll(),
          certificationAPI.getAll(),
          skillAPI.getStatistik(),
          projectAPI.getStatistik(),
        ]);

        if (profiles.data?.length > 0) {
          setProfileName(profiles.data[0].nama);
          setProfileJob(profiles.data[0].jabatan);
        }

        setStats([
          { label: "Skill", value: skills.data?.length || 0, icon: "⚡", href: "/portfolio/skills", color: "from-purple-500 to-purple-600" },
          { label: "Pengalaman", value: experiences.data?.length || 0, icon: "💼", href: "/portfolio/experience", color: "from-orange-500 to-orange-600" },
          { label: "Pendidikan", value: educations.data?.length || 0, icon: "🎓", href: "/portfolio/education", color: "from-green-500 to-green-600" },
          { label: "Proyek", value: projects.data?.length || 0, icon: "🚀", href: "/portfolio/projects", color: "from-red-500 to-red-600" },
          { label: "Sertifikasi", value: certifications.data?.length || 0, icon: "🏆", href: "/portfolio/certifications", color: "from-yellow-500 to-yellow-600" },
        ]);

        const skillPerKat = skillStat.skillPerKategori || {};
        setSkillCategories(Object.keys(skillPerKat));
        setSkillCounts(Object.values(skillPerKat) as number[]);
        setRataRata(Math.round(skillStat.rataRataLevel || 0));
        setTotalSkill(skills.data?.length || 0);

        const topSkills = (skills.data || [])
          .sort((a: { levelPersen: number }, b: { levelPersen: number }) => b.levelPersen - a.levelPersen)
          .slice(0, 6);
        setRadarLabels(topSkills.map((s: { namaSkill: string }) => s.namaSkill));
        setRadarData(topSkills.map((s: { levelPersen: number }) => s.levelPersen));

        const projPerKat = projStat.proyekPerKategori || {};
        setPieLabels(Object.keys(projPerKat));
        setPieData(Object.values(projPerKat) as number[]);
      } catch {
        // backend belum jalan
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  return {
    stats,
    skillCategories,
    skillCounts,
    radarLabels,
    radarData,
    pieLabels,
    pieData,
    rataRata,
    totalSkill,
    profileName,
    profileJob,
    loading,
  };
}
