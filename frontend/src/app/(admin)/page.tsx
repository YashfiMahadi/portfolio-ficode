import type { Metadata } from "next";
import PortfolioDashboard from "@/components/portfolio/PortfolioDashboard";

export const metadata: Metadata = {
  title: "Dashboard | Portfolio CV Digital",
};

export default function DashboardPage() {
  return <PortfolioDashboard />;
}
