import PageBreadcrumb from "@/shared/components/common/page-bread-crumb";
import { Metadata } from "next";
import React from "react";
import BadgeShowcaseSection from "@/app/(features)/(root)/ui-elements/badge/components/badge-showcase-section";

export const metadata: Metadata = {
  title: "Next.js Badge | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Badge page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default function BadgePage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Badges" />
      <div className="space-y-5 sm:space-y-6">
        <BadgeShowcaseSection title="With Light Background" variant="light" />
        <BadgeShowcaseSection title="With Solid Background" variant="solid" />
        <BadgeShowcaseSection title="Light Background with Left Icon" variant="light" icon="start" />
        <BadgeShowcaseSection title="Solid Background with Left Icon" variant="solid" icon="start" />
        <BadgeShowcaseSection title="Light Background with Right Icon" variant="light" icon="end" />
        <BadgeShowcaseSection title="Solid Background with Right Icon" variant="solid" icon="end" />
      </div>
    </div>
  );
}
