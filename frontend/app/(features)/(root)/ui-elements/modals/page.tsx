import PageBreadcrumb from "@/shared/components/common/page-bread-crumb";
import DefaultModal from "@/app/(features)/(root)/ui-elements/modals/components/default-modal";
import FormInModal from "@/app/(features)/(root)/ui-elements/modals/components/form-in-modal";
import FullScreenModal from "@/app/(features)/(root)/ui-elements/modals/components/full-screen-modal";
import ModalBasedAlerts from "@/app/(features)/(root)/ui-elements/modals/components/modal-based-alerts";
import VerticallyCenteredModal from "@/app/(features)/(root)/ui-elements/modals/components/vertically-centered-modal";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js Modals | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Modals page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
  // other metadata
};

export default function Modals() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Modals" />
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2 xl:gap-6">
        <DefaultModal />
        <VerticallyCenteredModal />
        <FormInModal />
        <FullScreenModal />
        <ModalBasedAlerts />
      </div>
    </div>
  );
}
