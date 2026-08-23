// Tipe data untuk fitur Dashboard.

export interface StatItem {
  label: string;
  value: number;
  icon: string;
  href: string;
  color: string;
}

export interface DashboardState {
  stats: StatItem[];
  skillCategories: string[];
  skillCounts: number[];
  radarLabels: string[];
  radarData: number[];
  pieLabels: string[];
  pieData: number[];
  rataRata: number;
  totalSkill: number;
  profileName: string;
  profileJob: string;
  loading: boolean;
}
