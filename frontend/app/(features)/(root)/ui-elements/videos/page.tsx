import PageBreadcrumb from "@/shared/components/common/page-bread-crumb";
import VideosExample from "@/shared/components/ui/video/videos-example";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js Videos | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Videos page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default function VideoPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Videos" />

      <VideosExample />
    </div>
  );
}
