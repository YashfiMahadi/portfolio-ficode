import * as React from "react"

import { cn } from "@/shared/lib/utils"

function Textarea({ className, "aria-invalid": ariaInvalid, ...props }: React.ComponentProps<"textarea">) {
  const isInvalid = ariaInvalid === true || ariaInvalid === "true";

  return (
    <textarea
      data-slot="textarea"
      aria-invalid={isInvalid}
      className={cn(
        "flex min-h-20 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 outline-none focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800",
        isInvalid &&
          "border-error-500 text-error-800 focus:border-error-500 focus:ring-error-500/10 dark:border-error-500 dark:text-error-400",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
