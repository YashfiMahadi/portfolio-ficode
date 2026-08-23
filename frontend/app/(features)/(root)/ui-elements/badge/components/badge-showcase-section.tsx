import Badge from "@/shared/components/ui/badge/badge";
import { PlusIcon } from "@/shared/components/icons/index";

const COLORS = ["primary", "success", "error", "warning", "info", "light", "dark"] as const;

interface BadgeShowcaseSectionProps {
  title: string;
  variant: "light" | "solid";
  icon?: "start" | "end" | "none";
}

export default function BadgeShowcaseSection({ title, variant, icon = "none" }: BadgeShowcaseSectionProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-6 py-5">
        <h3 className="text-base font-medium text-gray-800 dark:text-white/90">{title}</h3>
      </div>
      <div className="p-6 border-t border-gray-100 dark:border-gray-800 xl:p-10">
        <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
          {COLORS.map((color) => (
            <Badge
              key={color}
              variant={variant}
              color={color}
              startIcon={icon === "start" ? <PlusIcon /> : undefined}
              endIcon={icon === "end" ? <PlusIcon /> : undefined}
            >
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
