"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";

import { Skill } from "../interfaces/skill.d";

function getLevelColor(level: number) {
  if (level >= 80) return "bg-green-500";
  if (level >= 60) return "bg-blue-500";
  if (level >= 40) return "bg-yellow-500";
  return "bg-red-400";
}

function SortableHeader({
  label,
  column,
}: {
  label: string;
  column: { toggleSorting: (desc: boolean) => void; getIsSorted: () => string | false };
}) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="px-0 hover:bg-transparent"
    >
      {label}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}

export function getSkillColumns(
  onEdit: (skill: Skill) => void,
  onDelete: (id: number) => void
): ColumnDef<Skill>[] {
  return [
    {
      id: "no",
      header: "No",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "namaSkill",
      header: ({ column }) => <SortableHeader label="Nama Skill" column={column} />,
    },
    {
      accessorKey: "kategori",
      header: "Kategori",
      cell: ({ row }) => <Badge variant="secondary">{row.original.kategori}</Badge>,
    },
    {
      accessorKey: "levelPersen",
      header: ({ column }) => <SortableHeader label="Level" column={column} />,
      cell: ({ row }) => {
        const level = row.original.levelPersen || 0;

        return (
          <div className="flex min-w-[160px] items-center gap-3">
            <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className={`h-full rounded-full ${getLevelColor(level)}`}
                style={{ width: `${level}%` }}
              />
            </div>
            <span className="text-xs text-gray-500">{level}%</span>
          </div>
        );
      },
    },
    {
      accessorKey: "tingkat",
      header: "Tingkat",
      cell: ({ row }) => (
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {row.original.tingkat || "-"}
        </span>
      ),
    },
    {
      id: "aksi",
      header: "Aksi",
      cell: ({ row }) => {
        const skill = row.original;

        return (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => onEdit(skill)}>
              Edit
            </Button>
            <Button size="sm" variant="destructive" onClick={() => onDelete(skill.id!)}>
              Hapus
            </Button>
          </div>
        );
      },
    },
  ];
}
