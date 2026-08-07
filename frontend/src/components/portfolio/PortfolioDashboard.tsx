"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { profileAPI, skillAPI, experienceAPI, educationAPI, projectAPI, certificationAPI } from "@/lib/api";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface StatItem { label: string; value: number; icon: string; href: string; color: string; }

export default function PortfolioDashboard() {
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
        const [profiles, skills, experiences, educations, projects, certifications, skillStat, projStat] =
          await Promise.all([
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

  const barOptions: ApexOptions = {
    colors: ["#465fff"],
    chart: { fontFamily: "Outfit, sans-serif", type: "bar", height: 220, toolbar: { show: false } },
    plotOptions: { bar: { horizontal: false, columnWidth: "45%", borderRadius: 5, borderRadiusApplication: "end" } },
    dataLabels: { enabled: false },
    xaxis: { categories: skillCategories, axisBorder: { show: false }, axisTicks: { show: false } },
    grid: { yaxis: { lines: { show: true } } },
    tooltip: { y: { formatter: (v: number) => `${v} skill` } },
  };
  const barSeries = [{ name: "Jumlah Skill", data: skillCounts }];

  const radarOptions: ApexOptions = {
    chart: { fontFamily: "Outfit, sans-serif", type: "radar", height: 220, toolbar: { show: false } },
    colors: ["#465fff"],
    xaxis: { categories: radarLabels },
    yaxis: { max: 100, show: false },
    fill: { opacity: 0.3 },
    markers: { size: 4 },
    tooltip: { y: { formatter: (v: number) => `${v}%` } },
  };
  const radarSeries = [{ name: "Level", data: radarData }];

  const pieOptions: ApexOptions = {
    chart: { fontFamily: "Outfit, sans-serif", type: "donut", height: 200 },
    colors: ["#465fff", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#06b6d4"],
    labels: pieLabels,
    legend: { position: "bottom", fontSize: "11px" },
    dataLabels: { enabled: false },
    plotOptions: { pie: { donut: { size: "60%" } } },
    tooltip: { y: { formatter: (v: number) => `${v} proyek` } },
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 p-6 text-white shadow-lg">
        <div className="relative z-10">
          <p className="text-sm font-medium opacity-80">Selamat datang,</p>
          <h1 className="mt-1 text-3xl font-bold">{profileName || "Portfolio CV Digital"}</h1>
          {profileJob && <p className="mt-1 text-blue-100">{profileJob}</p>}
          <p className="mt-3 text-xs opacity-60">Portfolio digital yang mencerminkan dirimu · {new Date().getFullYear()}</p>
        </div>
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-8 right-20 h-24 w-24 rounded-full bg-white/10" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3 md:grid-cols-5">
        {loading
          ? Array(6).fill(0).map((_, i) => (
              <div key={i} className="h-28 animate-pulse rounded-xl bg-gray-100 dark:bg-gray-800" />
            ))
          : stats.map(s => (
              <a key={s.label} href={s.href}
                className="group relative overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:bg-gray-900 border border-gray-100 dark:border-gray-700">
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${s.color}`} />
                <div className="p-4 text-center">
                  <span className="text-3xl">{s.icon}</span>
                  <p className="mt-2 text-2xl font-bold text-gray-800 dark:text-white">{s.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
                </div>
              </a>
            ))
        }
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <div className="mb-4">
            <h2 className="font-semibold text-gray-800 dark:text-white">📊 Skill per Kategori</h2>
            <p className="text-xs text-gray-400">Jumlah skill berdasarkan kategori</p>
          </div>
          {loading ? (
            <div className="h-52 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800" />
          ) : skillCounts.length === 0 ? (
            <div className="flex h-52 items-center justify-center text-sm text-gray-400">Belum ada data skill</div>
          ) : (
            <ReactApexChart options={barOptions} series={barSeries} type="bar" height={220} />
          )}
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <div className="mb-4">
            <h2 className="font-semibold text-gray-800 dark:text-white">🎯 Level Top 6 Skill</h2>
            <p className="text-xs text-gray-400">Radar level skill tertinggi kamu</p>
          </div>
          {loading ? (
            <div className="h-52 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800" />
          ) : radarData.length === 0 ? (
            <div className="flex h-52 items-center justify-center text-sm text-gray-400">Belum ada data skill</div>
          ) : (
            <ReactApexChart options={radarOptions} series={radarSeries} type="radar" height={220} />
          )}
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <div className="mb-4">
            <h2 className="font-semibold text-gray-800 dark:text-white">🚀 Proyek per Kategori</h2>
            <p className="text-xs text-gray-400">Distribusi jenis proyek</p>
          </div>
          {loading ? (
            <div className="h-48 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800" />
          ) : pieData.length === 0 ? (
            <div className="flex h-48 items-center justify-center text-sm text-gray-400">Belum ada data proyek</div>
          ) : (
            <ReactApexChart options={pieOptions} series={pieData} type="donut" height={200} />
          )}
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <h2 className="mb-4 font-semibold text-gray-800 dark:text-white">📈 Statistik Skill</h2>
          <div className="space-y-3">
            <div className="rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 p-4 dark:from-purple-900/20 dark:to-blue-900/20">
              <p className="text-xs text-gray-500">Rata-rata Level Skill</p>
              <p className="mt-1 text-4xl font-bold text-purple-600 dark:text-purple-400">{rataRata}%</p>
              <div className="mt-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                <div className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all"
                  style={{ width: `${rataRata}%` }} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
                <p className="text-xs text-gray-400">Total Skill</p>
                <p className="text-xl font-bold text-green-600">{totalSkill}</p>
              </div>
              <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
                <p className="text-xs text-gray-400">Kategori</p>
                <p className="text-xl font-bold text-blue-600">{skillCategories.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <h2 className="mb-4 font-semibold text-gray-800 dark:text-white">⚡ Akses Cepat</h2>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Tambah Skill", href: "/portfolio/skills", icon: "⚡", color: "hover:bg-purple-50 dark:hover:bg-purple-900/20 border-purple-100 dark:border-purple-800" },
              { label: "Tambah Proyek", href: "/portfolio/projects", icon: "🚀", color: "hover:bg-red-50 dark:hover:bg-red-900/20 border-red-100 dark:border-red-800" },
              { label: "Edit Profil", href: "/portfolio/profile", icon: "👤", color: "hover:bg-blue-50 dark:hover:bg-blue-900/20 border-blue-100 dark:border-blue-800" },
              { label: "Pengalaman", href: "/portfolio/experience", icon: "💼", color: "hover:bg-orange-50 dark:hover:bg-orange-900/20 border-orange-100 dark:border-orange-800" },
              { label: "Pendidikan", href: "/portfolio/education", icon: "🎓", color: "hover:bg-green-50 dark:hover:bg-green-900/20 border-green-100 dark:border-green-800" },
              { label: "Sertifikasi", href: "/portfolio/certifications", icon: "🏆", color: "hover:bg-yellow-50 dark:hover:bg-yellow-900/20 border-yellow-100 dark:border-yellow-800" },
            ].map(item => (
              <a key={item.label} href={item.href}
                className={`flex flex-col items-center rounded-lg border p-3 text-center text-xs transition ${item.color}`}>
                <span className="text-xl">{item.icon}</span>
                <span className="mt-1 font-medium text-gray-600 dark:text-gray-300">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}