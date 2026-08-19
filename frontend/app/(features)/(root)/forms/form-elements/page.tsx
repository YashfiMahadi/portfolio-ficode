import PageBreadcrumb from "@/shared/components/common/page-bread-crumb";
import CheckboxComponents from "@/app/(features)/(root)/forms/form-elements/components/checkbox-components";
import DefaultInputs from "@/app/(features)/(root)/forms/form-elements/components/default-inputs";
import DropzoneComponent from "@/app/(features)/(root)/forms/form-elements/components/drop-zone";
import FileInputExample from "@/app/(features)/(root)/forms/form-elements/components/file-input-example";
import InputGroup from "@/app/(features)/(root)/forms/form-elements/components/input-group";
import InputStates from "@/app/(features)/(root)/forms/form-elements/components/input-states";
import RadioButtons from "@/app/(features)/(root)/forms/form-elements/components/radio-buttons";
import SelectInputs from "@/app/(features)/(root)/forms/form-elements/components/select-inputs";
import TextAreaInput from "@/app/(features)/(root)/forms/form-elements/components/text-area-input";
import ToggleSwitch from "@/app/(features)/(root)/forms/form-elements/components/toggle-switch";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js Form Elements | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default function FormElements() {
  return (
    <div>
      <PageBreadcrumb pageTitle="From Elements" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <DefaultInputs />
          <SelectInputs />
          <TextAreaInput />
          <InputStates />
        </div>
        <div className="space-y-6">
          <InputGroup />
          <FileInputExample />
          <CheckboxComponents />
          <RadioButtons />
          <ToggleSwitch />
          <DropzoneComponent />
        </div>
      </div>
    </div>
  );
}
