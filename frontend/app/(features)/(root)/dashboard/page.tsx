import type { Metadata } from "next";
import PortfolioDashboard from "@/app/(features)/(root)/dashboard/components/portfolio-dashboard";

export const metadata: Metadata = {
  title: "Dashboard | Portfolio CV Digital",
};

export default function DashboardPage() {
  return <PortfolioDashboard />;
}